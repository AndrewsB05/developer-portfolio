import { describe, expect, it, vi } from "vitest";
import { handleContactSubmission, isSameOrigin, type ContactDeps } from "../../../src/lib/contact/handler";
import { ContactMailerError, type ContactMailer } from "../../../src/lib/contact/mailer";
import { createRateLimiter } from "../../../src/lib/contact/rate-limit";
import { createFormToken } from "../../../src/lib/contact/token";

const SECRET = "secreto-de-prueba-de-al-menos-32-caracteres";
const SITE = "https://portafolio-andrewsb.vercel.app";
const T0 = 1_790_000_000_000;
const LATER = T0 + 30_000; // la persona tardó 30 s en escribir

const valid = {
  name: "Misty",
  email: "misty@example.cl",
  topic: "job",
  message: "Hola Benjamin, vi tu portafolio y nos gustaría conversar sobre un cargo de backend en nuestro equipo.",
};

async function submit(fields: Record<string, string>, overrides: Partial<Parameters<typeof handleContactSubmission>[0]> = {}, deps: Partial<ContactDeps> = {}) {
  const formData = new FormData();
  for (const [key, value] of Object.entries({ token: await createFormToken(SECRET, T0), website: "", ...fields })) formData.set(key, value);
  const mailer: ContactMailer = { send: vi.fn(async () => undefined) };
  const allDeps: ContactDeps = {
    secret: SECRET,
    mailer,
    rateLimiter: createRateLimiter({ limit: 5, windowMs: 60_000 }),
    now: () => LATER,
    ...deps,
  };
  const result = await handleContactSubmission(
    { formData, siteOrigin: SITE, origin: SITE, referer: null, contentLength: 500, clientKey: "1.1.1.1", ...overrides },
    allDeps,
  );
  return { result, mailer: allDeps.mailer };
}

describe("handleContactSubmission", () => {
  it("envía un mensaje válido con los datos limpios", async () => {
    const { result, mailer } = await submit({ ...valid, email: "  misty@example.cl ", name: "Misty\u0000" });
    expect(result).toEqual({ status: "sent" });
    expect(mailer.send).toHaveBeenCalledWith({ ...valid, name: "Misty" });
  });

  it("descarta en silencio a los bots: campo trampa, token falso o envío instantáneo", async () => {
    const honeypot = await submit({ ...valid, website: "http://spam.example" });
    const noToken = await submit({ ...valid, token: "falso" });
    const tooFast = await submit(valid, {}, { now: () => T0 + 100 });

    for (const { result, mailer } of [honeypot, noToken, tooFast]) {
      expect(result).toMatchObject({ status: "sent" }); // el bot no sabe que se descartó
      expect(mailer.send).not.toHaveBeenCalled();
    }
    expect(honeypot.result).toEqual({ status: "sent", dropped: "honeypot" });
    expect(noToken.result).toEqual({ status: "sent", dropped: "token" });
  });

  it("bloquea envíos desde otros sitios (CSRF) y cuerpos demasiado grandes", async () => {
    expect((await submit(valid, { origin: "https://sitio-malicioso.example" })).result).toEqual({ status: "forbidden" });
    expect((await submit(valid, { origin: null, referer: null })).result).toEqual({ status: "forbidden" });
    expect((await submit(valid, { contentLength: 1_000_000 })).result).toEqual({ status: "too-large" });
  });

  it("devuelve los campos inválidos sin enviar nada", async () => {
    const { result, mailer } = await submit({ ...valid, email: "no-es-email\r\nBcc: victima@example.cl", topic: "hackeo", message: "hola" });
    expect(result).toMatchObject({ status: "invalid", fields: ["email", "topic", "message"] });
    expect(mailer.send).not.toHaveBeenCalled();
  });

  it("rechaza mensajes de trolls con el motivo y conserva lo escrito", async () => {
    const { result, mailer } = await submit({ ...valid, message: "Ctm tu portafolio es una mierda, dedícate a otra cosa weon" });
    expect(result).toMatchObject({ status: "rejected", reason: "insult", values: { email: valid.email } });
    expect(mailer.send).not.toHaveBeenCalled();
  });

  it("limita los envíos por IP", async () => {
    const rateLimiter = createRateLimiter({ limit: 1, windowMs: 60_000, now: () => LATER });
    expect((await submit(valid, {}, { rateLimiter })).result).toEqual({ status: "sent" });
    expect((await submit(valid, {}, { rateLimiter })).result).toMatchObject({ status: "rate-limited" });
    // Otra IP sigue pudiendo enviar.
    expect((await submit(valid, { clientKey: "2.2.2.2" }, { rateLimiter })).result).toEqual({ status: "sent" });
  });

  it("si Resend falla responde error (sin exponer detalles)", async () => {
    const mailer: ContactMailer = { send: async () => { throw new ContactMailerError("Resend respondió 500"); } };
    expect((await submit(valid, {}, { mailer })).result).toMatchObject({ status: "error" });
  });

  it("un token vencido pide reenviar en vez de descartar en silencio (puede ser una persona)", async () => {
    const { result } = await submit(valid, {}, { now: () => T0 + 3 * 60 * 60 * 1_000 });
    expect(result).toMatchObject({ status: "rejected", reason: "expired" });
  });
});

describe("isSameOrigin", () => {
  it("acepta el Origin del sitio, o el Referer si el navegador no mandó Origin", () => {
    expect(isSameOrigin(SITE, SITE, null)).toBe(true);
    expect(isSameOrigin(SITE, null, `${SITE}/contacto`)).toBe(true);
    expect(isSameOrigin(SITE, "null", `${SITE}/contacto`)).toBe(true);
    expect(isSameOrigin(SITE, `${SITE}.evil.example`, null)).toBe(false);
    expect(isSameOrigin(SITE, null, `https://evil.example/?u=${SITE}`)).toBe(false);
    expect(isSameOrigin(SITE, null, "no es una url")).toBe(false);
  });
});
