import type { APIRoute } from 'astro';

// RFC 9116: cómo reportar un problema de seguridad. Se genera en el servidor para que el dominio salga del
// request (sirve en cualquier URL de Vercel) y `Expires` nunca quede vencido.
export const prerender = false;

const VALID_DAYS = 180;

export const GET: APIRoute = ({ url }) => {
	const expires = new Date(Date.now() + VALID_DAYS * 24 * 60 * 60 * 1_000);
	expires.setUTCHours(0, 0, 0, 0);
	const body = [
		`Contact: ${url.origin}/contacto`,
		`Expires: ${expires.toISOString()}`,
		'Preferred-Languages: es, en',
		`Canonical: ${url.origin}/.well-known/security.txt`,
		'',
	].join('\n');

	return new Response(body, {
		headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'public, max-age=86400' },
	});
};
