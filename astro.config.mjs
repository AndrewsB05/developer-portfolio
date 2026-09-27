// @ts-check
import { defineConfig, envField } from 'astro/config';
import vercel from '@astrojs/vercel';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // El sitio es estático; solo /contacto (prerender = false) corre como función de Vercel para procesar el formulario.
  adapter: vercel(),
  env: {
    schema: {
      // Formulario de contacto (/contacto). Opcionales: sin ellas la página muestra "no disponible".
      // "secret" = se leen en runtime y solo existen en el servidor: tu email y la API key nunca llegan al navegador.
      RESEND_API_KEY: envField.string({ context: 'server', access: 'secret', optional: true, startsWith: 're_' }),
      CONTACT_TO_EMAIL: envField.string({ context: 'server', access: 'secret', optional: true, includes: '@' }),
      CONTACT_FORM_SECRET: envField.string({ context: 'server', access: 'secret', optional: true, min: 32 }),
    },
    validateSecrets: true,
  },
  // Content-Security-Policy: Astro agrega un <meta> con hashes de sus scripts y estilos (script-src/style-src).
  // Todo se sirve desde el propio sitio (fuentes autoalojadas, sin CDN). frame-ancestors no funciona en <meta>:
  // va como cabecera en vercel.json, junto con el resto de cabeceras de seguridad.
  security: {
    csp: {
      directives: [
        "default-src 'self'",
        "img-src 'self' data:",
        "font-src 'self'",
        "connect-src 'self'",
        "object-src 'none'",
        "base-uri 'self'",
        "form-action 'self'",
        "frame-src 'none'",
        "upgrade-insecure-requests",
      ],
    },
  },
  // Sin Markdown con código: se desactiva Shiki, que usa estilos en línea incompatibles con la CSP.
  markdown: { syntaxHighlight: false },
  vite: {
    plugins: [tailwindcss()],
  },
});
