import { CONTACT_TOPICS, type ContactForm } from "./schema";

/**
 * Envío del mensaje de contacto por la API de Resend (https://resend.com/docs/api-reference/emails/send-email).
 *
 * - Solo texto plano: nada de lo que escribe el visitante se interpreta como HTML en el correo.
 * - El asunto sale de una lista fija (el motivo), nunca de texto libre.
 * - `reply_to` es el email del visitante: al responder desde tu bandeja le contestas directo, sin que conozca tu correo.
 * - Sin dominio propio, Resend solo permite enviar desde onboarding@resend.dev al email dueño de la cuenta.
 */
export interface ContactMailer {
  send(form: ContactForm): Promise<void>;
}

export interface ResendMailerOptions {
  apiKey: string;
  /** Tu email (el de la cuenta de Resend). Solo vive en el servidor. */
  to: string;
  from?: string;
  timeoutMs?: number;
  fetch?: typeof globalThis.fetch;
}

export class ContactMailerError extends Error {
  override readonly name = "ContactMailerError";
}

const RESEND_ENDPOINT = "https://api.resend.com/emails";
const DEFAULT_FROM = "Portafolio AndrewsB <onboarding@resend.dev>";

export function buildContactEmail(form: ContactForm): { subject: string; text: string } {
  const topic = CONTACT_TOPICS[form.topic];
  return {
    subject: `[Portafolio] ${topic}`,
    text: [
      `Motivo: ${topic}`,
      `Nombre: ${form.name === "" ? "(no lo indicó)" : form.name}`,
      `Email: ${form.email}`,
      "",
      form.message,
      "",
      "—",
      "Enviado desde el formulario de contacto del portafolio.",
      "Responde este correo para contestarle directamente.",
    ].join("\n"),
  };
}

export function createResendMailer({
  apiKey,
  to,
  from = DEFAULT_FROM,
  timeoutMs = 8_000,
  fetch = globalThis.fetch,
}: ResendMailerOptions): ContactMailer {
  return {
    async send(form) {
      const { subject, text } = buildContactEmail(form);
      let response: Response;
      try {
        response = await fetch(RESEND_ENDPOINT, {
          method: "POST",
          headers: { authorization: `Bearer ${apiKey}`, "content-type": "application/json" },
          body: JSON.stringify({ from, to: [to], reply_to: form.email, subject, text }),
          signal: AbortSignal.timeout(timeoutMs),
        });
      } catch (error) {
        throw new ContactMailerError("No se pudo conectar con Resend", { cause: error });
      }
      if (!response.ok) {
        // El cuerpo puede traer detalles de la cuenta: solo se registra el status.
        throw new ContactMailerError(`Resend respondió ${response.status}`);
      }
    },
  };
}
