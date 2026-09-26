/**
 * Token del formulario de contacto: `<emitido en ms>.<nonce>.<firma HMAC-SHA256>`.
 *
 * Se genera al mostrar el formulario y se verifica al enviarlo. Sirve para tres cosas sin guardar estado:
 * - Solo se puede enviar un formulario que salió de este sitio (un bot que postea directo no tiene token válido).
 * - Tiempo mínimo: una persona tarda más de unos segundos en escribir; un bot envía al instante.
 * - Caducidad: un token viejo o reutilizado mucho después no sirve.
 *
 * Usa Web Crypto (Node 22 y Vercel); `crypto.subtle.verify` compara la firma en tiempo constante.
 */

export const MIN_FILL_MS = 3_000;
export const MAX_AGE_MS = 2 * 60 * 60 * 1_000;

export type TokenCheck = { valid: true } | { valid: false; reason: "malformed" | "bad-signature" | "too-fast" | "expired" };

const encoder = new TextEncoder();

function toBase64Url(bytes: Uint8Array): string {
  return btoa(String.fromCharCode(...bytes)).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(text: string): Uint8Array<ArrayBuffer> {
  const binary = atob(text.replace(/-/g, "+").replace(/_/g, "/"));
  return Uint8Array.from(binary, (char) => char.charCodeAt(0));
}

async function importKey(secret: string): Promise<CryptoKey> {
  return crypto.subtle.importKey("raw", encoder.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign", "verify"]);
}

export async function createFormToken(secret: string, now: number = Date.now()): Promise<string> {
  const nonce = toBase64Url(crypto.getRandomValues(new Uint8Array(12)));
  const payload = `${now}.${nonce}`;
  const signature = new Uint8Array(await crypto.subtle.sign("HMAC", await importKey(secret), encoder.encode(payload)));
  return `${payload}.${toBase64Url(signature)}`;
}

export async function verifyFormToken(token: string, secret: string, now: number = Date.now()): Promise<TokenCheck> {
  const match = /^(\d{13})\.([A-Za-z0-9_-]{16})\.([A-Za-z0-9_-]{43})$/.exec(token);
  if (match?.[1] === undefined || match[2] === undefined || match[3] === undefined) return { valid: false, reason: "malformed" };

  const signature = fromBase64Url(match[3]);
  const signed = await crypto.subtle.verify("HMAC", await importKey(secret), signature, encoder.encode(`${match[1]}.${match[2]}`));
  if (!signed) return { valid: false, reason: "bad-signature" };

  const age = now - Number(match[1]);
  if (age < MIN_FILL_MS) return { valid: false, reason: "too-fast" };
  if (age > MAX_AGE_MS) return { valid: false, reason: "expired" };
  return { valid: true };
}
