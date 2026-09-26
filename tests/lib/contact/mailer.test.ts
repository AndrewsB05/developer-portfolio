import { describe, expect, it, vi } from "vitest";
import { buildContactEmail, ContactMailerError, createResendMailer } from "../../../src/lib/contact/mailer";
import type { ContactForm } from "../../../src/lib/contact/schema";

const form: ContactForm = {
  name: "Ash",
  email: "ash@example.cl",
  topic: "freelance",
  message: "Necesito una API REST para mi tienda online, ¿tienes disponibilidad? <script>alert(1)</script>",
};

describe("buildContactEmail", () => {
  it("usa un asunto fijo por motivo (nunca texto del visitante) y el mensaje tal cual en texto plano", () => {
    const email = buildContactEmail(form);
    expect(email.subject).toBe("[Portafolio] Proyecto freelance");
    expect(email.text).toContain("Email: ash@example.cl");
    expect(email.text).toContain("<script>alert(1)</script>"); // texto plano: no se interpreta como HTML
  });
});

describe("createResendMailer", () => {
  it("envía a tu email con reply_to del visitante y solo texto (sin html)", async () => {
    const fetch = vi.fn<typeof globalThis.fetch>(async () => new Response("{}", { status: 200 }));
    await createResendMailer({ apiKey: "re_test", to: "yo@example.cl", fetch }).send(form);

    const [url, init] = fetch.mock.calls[0] ?? [];
    expect(String(url)).toBe("https://api.resend.com/emails");
    expect(new Headers(init?.headers).get("authorization")).toBe("Bearer re_test");
    const body = JSON.parse(String(init?.body)) as Record<string, unknown>;
    expect(body).toMatchObject({ to: ["yo@example.cl"], reply_to: "ash@example.cl" });
    expect(body).not.toHaveProperty("html");
  });

  it("lanza ContactMailerError si Resend responde un error o no hay conexión", async () => {
    const rejected = createResendMailer({ apiKey: "re_test", to: "yo@example.cl", fetch: async () => new Response("{}", { status: 422 }) });
    await expect(rejected.send(form)).rejects.toBeInstanceOf(ContactMailerError);

    const offline = createResendMailer({
      apiKey: "re_test",
      to: "yo@example.cl",
      fetch: async () => {
        throw new TypeError("fetch failed");
      },
    });
    await expect(offline.send(form)).rejects.toBeInstanceOf(ContactMailerError);
  });
});
