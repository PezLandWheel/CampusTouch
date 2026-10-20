import { currentUser, expiredCookie, isSameOrigin, json } from '../../_shared/auth.js';

export async function onRequestPost({ request, env }) {
  if (!isSameOrigin(request)) return json({ error: 'Origen no permitido.' }, 403);
  const user = await currentUser(request, env.DB);
  if (user) {
    const token = (request.headers.get('cookie') || '').split(';').map((part) => part.trim()).find((part) => part.startsWith('campustouch_session='))?.slice('campustouch_session='.length);
    if (token) {
      const bytes = new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(token)));
      let binary = '';
      for (const byte of bytes) binary += String.fromCharCode(byte);
      const tokenHash = btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
      await env.DB.prepare('DELETE FROM user_sessions WHERE token_hash = ?').bind(tokenHash).run();
    }
  }
  return json({ ok: true }, 200, { 'set-cookie': expiredCookie() });
}
