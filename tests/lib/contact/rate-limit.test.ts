import { describe, expect, it } from "vitest";
import { createRateLimiter } from "../../../src/lib/contact/rate-limit";

describe("createRateLimiter", () => {
  it("permite `limit` envíos por IP en la ventana y se reinicia al terminar", () => {
    let time = 0;
    const limiter = createRateLimiter({ limit: 2, windowMs: 1_000, now: () => time });

    expect([limiter.allow("1.1.1.1"), limiter.allow("1.1.1.1"), limiter.allow("1.1.1.1")]).toEqual([true, true, false]);
    expect(limiter.allow("2.2.2.2")).toBe(true); // otra IP no se ve afectada
    time = 1_000;
    expect(limiter.allow("1.1.1.1")).toBe(true);
  });

  it("no crece sin límite en memoria", () => {
    const limiter = createRateLimiter({ limit: 1, windowMs: 60_000, now: () => 0, maxKeys: 3 });
    for (const ip of ["a", "b", "c", "d", "e"]) expect(limiter.allow(ip)).toBe(true);
  });
});
