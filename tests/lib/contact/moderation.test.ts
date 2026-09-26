import { describe, expect, it } from "vitest";
import { moderateMessage } from "../../../src/lib/contact/moderation";

describe("moderateMessage", () => {
  it.each([
    "Hola Benjamin, vi tu portafolio y nos gustaría agendar una entrevista para un cargo de backend.",
    "Hi Benjamin, I'm a recruiter at a fintech in Santiago and would love to chat about a Node.js role.",
    "Tengo una pyme y necesito una API para conectar mi inventario con la tienda online. ¿Haces proyectos freelance?",
    "Me gustó tu proyecto del comparador de precios, ¿te interesaría colaborar en algo parecido?",
    "Hola! Somos de la universidad y queremos invitarte a dar una charla sobre scraping responsable.",
    "Te dejo el link de la oferta: https://www.getonbrd.com/jobs/backend-developer y mi LinkedIn.",
  ])("acepta mensajes normales, incluso fuera de un tema fijo: %s", (message) => {
    expect(moderateMessage(message)).toEqual({ ok: true });
  });

  it.each([
    ["Ctm este portafolio es una mierda, no sabes programar", "insult"],
    ["You are a fucking idiot, your code is garbage", "insult"],
    ["Compra seguidores baratos en https://a.ru https://b.ru https://c.ru ahora mismo", "too-many-links"],
    ["asdfgh qwrtyp zxcvbn sdfghj asdkjh qwerty", "gibberish"],
    ["holaaaaaaaaa como estas todo bien por aca", "gibberish"],
    ["CONTRATA A ALGUIEN QUE SEPA PROGRAMAR DE VERDAD YA", "shouting"],
  ])("rechaza: %s (%s)", (message, reason) => {
    expect(moderateMessage(message)).toEqual({ ok: false, reason });
  });
});
