import { z } from "zod";

/**
 * Motivos del formulario. El visitante elige uno; este texto se usa en el asunto del email (nunca texto libre).
 * Lo que ve el visitante sale de `contact.topics` en las traducciones.
 */
export const CONTACT_TOPICS = {
  job: "Oferta laboral o entrevista",
  freelance: "Proyecto freelance",
  collab: "Colaboración",
  other: "Otro tema",
} as const;

export type ContactTopic = keyof typeof CONTACT_TOPICS;

export const MESSAGE_MIN = 20;
export const MESSAGE_MAX = 2_000;
export const NAME_MAX = 80;

/** Quita caracteres de control (salvo saltos de línea y tabs en el mensaje) y espacios de los extremos. */
const cleanLine = (value: string): string => value.replace(/[\u0000-\u001f\u007f]/g, " ").trim();
const cleanText = (value: string): string =>
  value
    .replace(/\r\n?/g, "\n")
    .replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, "")
    .trim();

/**
 * Campos del formulario. Todo llega como texto desde `FormData`, así que se limpia y se limita el largo antes de
 * cualquier otra cosa. El email se valida con zod (sin saltos de línea: no se puede inyectar nada en el "Reply-To").
 * Los mensajes de error que ve el visitante salen de `contact.errors` en las traducciones (uno por campo).
 */
export const contactFormSchema = z.object({
  name: z.string().transform(cleanLine).pipe(z.string().max(NAME_MAX)),
  email: z.string().transform(cleanLine).pipe(z.email().max(254)),
  topic: z.enum(Object.keys(CONTACT_TOPICS) as [ContactTopic, ...ContactTopic[]]),
  message: z.string().transform(cleanText).pipe(z.string().min(MESSAGE_MIN).max(MESSAGE_MAX)),
});

export type ContactForm = z.infer<typeof contactFormSchema>;

/** Valores tal como los escribió el visitante, para volver a mostrarlos si hay un error. */
export interface ContactFormValues {
  name: string;
  email: string;
  topic: string;
  message: string;
}

export type ContactField = keyof ContactFormValues;
