import { defineMiddleware } from 'astro:middleware';

/**
 * En las páginas generadas en el servidor (/contacto), Astro envía la CSP como cabecera y esa cabecera reemplaza la
 * de vercel.json, que solo trae `frame-ancestors`. Aquí se agrega `frame-ancestors 'none'` a la CSP de Astro para
 * que esas páginas tampoco se puedan cargar dentro de un iframe (clickjacking). Las páginas estáticas no pasan por
 * aquí: reciben la cabecera de vercel.json (frame-ancestors no funciona en el <meta> que usa Astro para ellas).
 */
export const onRequest = defineMiddleware(async (context, next) => {
	const response = await next();
	if (context.isPrerendered) return response;

	const csp = response.headers.get('content-security-policy');
	if (csp === null || csp.includes('frame-ancestors')) return response;
	try {
		response.headers.set('content-security-policy', `${csp.trim().replace(/;?$/, ';')} frame-ancestors 'none';`);
	} catch {
		// Algunas respuestas (p. ej. redirecciones) tienen cabeceras inmutables; X-Frame-Options sigue protegiendo.
	}
	return response;
});
