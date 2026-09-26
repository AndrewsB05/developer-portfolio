import { describe, expect, it } from "vitest";
import { createFormToken, MAX_AGE_MS, MIN_FILL_MS, verifyFormToken } from "../../../src/lib/contact/token";

const SECRET = "secreto-de-prueba-de-al-menos-32-caracteres";
const T0 = 1_790_000_000_000;

describe("token del formulario", () => {
  it("es válido entre el tiempo mínimo de llenado y la caducidad", async () => {
    const token = await createFormToken(SECRET, T0);
    expect(await verifyFormToken(token, SECRET, T0 + MIN_FILL_MS)).toEqual({ valid: true });
    expect(await verifyFormToken(token, SECRET, T0 + MAX_AGE_MS)).toEqual({ valid: true });
  });

  it("rechaza envíos demasiado rápidos (bots) y tokens vencidos", async () => {
    const token = await createFormToken(SECRET, T0);
    expect(await verifyFormToken(token, SECRET, T0 + 500)).toEqual({ valid: false, reason: "too-fast" });
    expect(await verifyFormToken(token, SECRET, T0 + MAX_AGE_MS + 1)).toEqual({ valid: false, reason: "expired" });
  });

  it("rechaza tokens firmados con otra clave o alterados", async () => {
    const token = await createFormToken(SECRET, T0);
    const later = T0 + 10_000;
    expect(await verifyFormToken(token, "otra-clave-distinta-de-al-menos-32-caracteres", later)).toEqual({
      valid: false,
      reason: "bad-signature",
    });
    // Cambiar la fecha de emisión (para saltarse el tiempo mínimo) invalida la firma.
    const forged = token.replace(/^\d{13}/, String(T0 - 60_000));
    expect(await verifyFormToken(forged, SECRET, later)).toEqual({ valid: false, reason: "bad-signature" });
  });

  it("rechaza tokens mal formados sin lanzar errores", async () => {
    for (const bad of ["", "abc", "1.2.3", "<script>", `${T0}.nonce.firma`]) {
      expect(await verifyFormToken(bad, SECRET, T0)).toEqual({ valid: false, reason: "malformed" });
    }
  });
});
