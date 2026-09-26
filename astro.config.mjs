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
  vite: {
    plugins: [tailwindcss()],
    server: {
      cors: true,
      allowedHosts: true
    }
  }
});
