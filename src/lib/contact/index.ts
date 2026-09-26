import { CONTACT_FORM_SECRET, CONTACT_TO_EMAIL, RESEND_API_KEY } from "astro:env/server";
import type { ContactDeps } from "./handler";
import { createResendMailer } from "./mailer";
import { createRateLimiter } from "./rate-limit";

/** 5 mensajes válidos por IP cada 10 minutos (por instancia; ver rate-limit.ts). */
const rateLimiter = createRateLimiter({ limit: 5, windowMs: 10 * 60 * 1_000 });

/**
 * Dependencias del formulario de contacto, configuradas con astro:env. null si falta alguna variable:
 * la página muestra el formulario como no disponible en vez de fallar.
 */
export const contactDeps: ContactDeps | null =
  RESEND_API_KEY === undefined || CONTACT_TO_EMAIL === undefined || CONTACT_FORM_SECRET === undefined
    ? null
    : {
        secret: CONTACT_FORM_SECRET,
        mailer: createResendMailer({ apiKey: RESEND_API_KEY, to: CONTACT_TO_EMAIL }),
        rateLimiter,
      };

export { createFormToken } from "./token";
export { handleContactSubmission, HONEYPOT_FIELD, MAX_BODY_BYTES, TOKEN_FIELD } from "./handler";
export { CONTACT_TOPICS, MESSAGE_MAX, MESSAGE_MIN, NAME_MAX, type ContactField, type ContactFormValues } from "./schema";
