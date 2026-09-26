/**
 * Límite de envíos por IP en memoria (ventana fija).
 *
 * En Vercel cada instancia de la función tiene su propia memoria, así que es un freno "de mejor esfuerzo": corta
 * ráfagas contra una misma instancia, no un ataque distribuido. El tope duro lo pone Resend (100 emails al día en el
 * plan gratis), así que en el peor caso se pierde la cuota del día, nunca plata.
 */
export interface RateLimiter {
  /** true si la IP todavía puede enviar (y descuenta el intento). */
  allow(key: string): boolean;
}

export interface RateLimiterOptions {
  limit: number;
  windowMs: number;
  now?: () => number;
  /** Máximo de IPs recordadas, para que la memoria no crezca sin límite. */
  maxKeys?: number;
}

export function createRateLimiter({ limit, windowMs, now = Date.now, maxKeys = 5_000 }: RateLimiterOptions): RateLimiter {
  const hits = new Map<string, { count: number; resetAt: number }>();

  return {
    allow(key) {
      const time = now();
      const entry = hits.get(key);
      if (entry === undefined || entry.resetAt <= time) {
        if (hits.size >= maxKeys) {
          for (const [storedKey, stored] of hits) if (stored.resetAt <= time) hits.delete(storedKey);
          if (hits.size >= maxKeys) hits.clear();
        }
        hits.set(key, { count: 1, resetAt: time + windowMs });
        return true;
      }
      entry.count++;
      return entry.count <= limit;
    },
  };
}
