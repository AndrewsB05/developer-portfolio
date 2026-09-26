import { ContactMailerError, type ContactMailer } from "./mailer";
import { moderateMessage, type ModerationReason } from "./moderation";
import type { RateLimiter } from "./rate-limit";
import { contactFormSchema, type ContactField, type ContactFormValues } from "./schema";
import { verifyFormToken } from "./token";

/** Nombre del campo trampa: invisible para personas, los bots lo llenan. Tiene nombre creíble a propósito. */
export const HONEYPOT_FIELD = "website";
export const TOKEN_FIELD = "token";
/** Un formulario de contacto no pesa más que esto; lo demás es abuso. */
export const MAX_BODY_BYTES = 16 * 1024;

const FIELDS: readonly ContactField[] = ["name", "email", "topic", "message"];

/**
 * Resultado del envío. No trae textos: la página los toma de las traducciones (ES/EN) según el estado y el motivo.
 */
export type ContactResult =
  /** Enviado. También se responde así a los bots descartados, para no darles pistas. */
  | { status: "sent"; dropped?: "honeypot" | "token" }
  | { status: "forbidden" }
  | { status: "too-large" }
  | { status: "rate-limited"; values: ContactFormValues }
  | { status: "invalid"; fields: ContactField[]; values: ContactFormValues }
  /** "expired": una persona que dejó la pestaña abierta; se le pide reenviar. El resto viene de la moderación. */
  | { status: "rejected"; reason: "expired" | ModerationReason; values: ContactFormValues }
  | { status: "error"; values: ContactFormValues };

export interface ContactRequest {
  formData: FormData;
  /** Origen del sitio (`https://…vercel.app`). */
  siteOrigin: string;
  /** Cabeceras `Origin` y `Referer` del envío (null si no vinieron). */
  origin: string | null;
  referer: string | null;
  contentLength: number | null;
  /** IP del visitante para el límite de envíos. */
  clientKey: string;
}

export interface ContactDeps {
  secret: string;
  mailer: ContactMailer;
  rateLimiter: RateLimiter;
  now?: () => number;
}

const field = (formData: FormData, name: string): string => {
  const value = formData.get(name);
  return typeof value === "string" ? value.slice(0, 5_000) : "";
};

/**
 * El envío tiene que venir de una página de este sitio. Los navegadores mandan `Origin` en todo POST; si una
 * extensión de privacidad lo quita, se acepta un `Referer` del mismo origen. Frena formularios de otros sitios (CSRF).
 */
export function isSameOrigin(siteOrigin: string, origin: string | null, referer: string | null): boolean {
  if (origin !== null && origin !== "null") return origin === siteOrigin;
  if (referer === null) return false;
  try {
    return new URL(referer).origin === siteOrigin;
  } catch {
    return false;
  }
}

export async function handleContactSubmission(request: ContactRequest, deps: ContactDeps): Promise<ContactResult> {
  const now = deps.now ?? Date.now;

  if (request.contentLength !== null && request.contentLength > MAX_BODY_BYTES) return { status: "too-large" };
  if (!isSameOrigin(request.siteOrigin, request.origin, request.referer)) return { status: "forbidden" };

  const { formData } = request;
  const values: ContactFormValues = {
    name: field(formData, "name"),
    email: field(formData, "email"),
    topic: field(formData, "topic"),
    message: field(formData, "message"),
  };

  // Bots: se descartan en silencio (responden "enviado" y no se manda nada).
  if (field(formData, HONEYPOT_FIELD) !== "") return { status: "sent", dropped: "honeypot" };
  const token = await verifyFormToken(field(formData, TOKEN_FIELD), deps.secret, now());
  if (!token.valid) {
    // Un token vencido puede ser una persona que dejó la pestaña abierta: se le pide reenviar con uno nuevo.
    if (token.reason === "expired") return { status: "rejected", reason: "expired", values };
    return { status: "sent", dropped: "token" };
  }

  const parsed = contactFormSchema.safeParse(values);
  if (!parsed.success) {
    const invalid = new Set(parsed.error.issues.map((issue) => issue.path[0]));
    return { status: "invalid", fields: FIELDS.filter((name) => invalid.has(name)), values };
  }

  const moderation = moderateMessage(parsed.data.message);
  if (!moderation.ok) return { status: "rejected", reason: moderation.reason, values };

  // El límite se descuenta solo con mensajes válidos: un error de tipeo no le quita intentos a una persona.
  if (!deps.rateLimiter.allow(request.clientKey)) return { status: "rate-limited", values };

  try {
    await deps.mailer.send(parsed.data);
  } catch (error) {
    if (error instanceof ContactMailerError) return { status: "error", values };
    throw error;
  }
  return { status: "sent" };
}
