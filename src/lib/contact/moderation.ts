/**
 * Filtro de trolls del formulario de contacto (función pura).
 *
 * Corta lo evidente (insultos, golpes al teclado, spam con links, gritos) sin frenar a quien escribe en serio.
 * A diferencia del Pokémon Tracker no rechaza mensajes "fuera de tema": en un portafolio un falso positivo puede ser
 * el mensaje de un reclutador, y eso cuesta más que leer un mensaje irrelevante.
 * Devuelve el motivo; el texto que ve la persona sale de `contact.alerts` en las traducciones.
 */

export type ModerationReason = "insult" | "too-many-links" | "gibberish" | "shouting";
export type ModerationResult = { ok: true } | { ok: false; reason: ModerationReason };

/** Sin tildes y en minúsculas, para comparar palabras. */
export function normalizeForModeration(text: string): string {
  return text.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
}

/**
 * Insultos y groserías frecuentes en Chile y en inglés (se buscan como palabras completas, sin tildes).
 * No incluye palabras que también tienen usos normales ("huevo", "pico" en "pico de demanda"…).
 */
const INSULTS = [
  "conchetumare", "conchatumare", "conchesumare", "ctm", "csm", "ctmre", "culiao", "culiado", "culia", "weon culiao",
  "maricon", "maraco", "aweonao", "ahueonao", "aweonado", "sacowea", "saco wea", "chupalo", "chupala",
  "chupa el pico", "tula", "zorra", "puta", "putas", "puto", "hijo de puta", "hdp", "mierda", "imbecil", "idiota",
  "estupido", "estupida", "retrasado", "subnormal", "pendejo", "gil culiao", "mongolo",
  "fuck", "fucking", "motherfucker", "shit", "bitch", "asshole", "dickhead", "cunt", "retard",
];
const INSULT_PATTERN = new RegExp(`\\b(${INSULTS.map((word) => word.replace(/ /g, "\\s+")).join("|")})\\b`);

/** Un link completo cuenta una vez: "https://www.sitio.com/ruta" es un solo match, no tres. */
const URL_PATTERN = /(?:\bhttps?:\/\/|\bwww\.)\S+|\b[a-z0-9-]+\.(?:com|cl|net|org|io|ru|xyz|top|info|biz|shop|site)\b\S*/gi;
export const MAX_LINKS = 2;

/** Un "golpe al teclado": palabras largas casi sin vocales, letras repetidas muchas veces o sin espacios. */
function looksLikeGibberish(normalized: string): boolean {
  if (/(.)\1{5,}/.test(normalized)) return true; // "aaaaaaa", "!!!!!!!"
  if (/\S{35,}/.test(normalized.replace(URL_PATTERN, ""))) return true; // un bloque enorme sin espacios
  const words = normalized.match(/[a-z]{5,}/g) ?? [];
  if (words.length === 0) return true; // ninguna palabra real
  // Filas del teclado ("qwerty", "asdfgh", "zxcvbn"): no aparecen dentro de palabras reales.
  const keyboardRows = words.filter((word) => /qwer|asdf|zxcv|hjkl|sdfg|xcvb/.test(word)).length;
  if (keyboardRows >= 2) return true;
  // Sin vocales o con 5+ consonantes seguidas: casi no pasa en español ni en inglés ("strengths" es la excepción).
  const noVowels = words.filter((word) => !/[aeiouy]/.test(word) || /[^aeiouy]{5,}/.test(word)).length;
  return noVowels / words.length > 0.4;
}

/** Más del 70% de las letras en mayúsculas (con al menos 20 letras): gritar. */
function isShouting(text: string): boolean {
  const letters = text.match(/\p{L}/gu) ?? [];
  if (letters.length < 20) return false;
  const upper = letters.filter((letter) => letter !== letter.toLowerCase()).length;
  return upper / letters.length > 0.7;
}

export function moderateMessage(message: string): ModerationResult {
  const normalized = normalizeForModeration(message);

  if (INSULT_PATTERN.test(normalized)) return { ok: false, reason: "insult" };
  if ((message.match(URL_PATTERN) ?? []).length > MAX_LINKS) return { ok: false, reason: "too-many-links" };
  if (looksLikeGibberish(normalized)) return { ok: false, reason: "gibberish" };
  if (isShouting(message)) return { ok: false, reason: "shouting" };
  return { ok: true };
}
