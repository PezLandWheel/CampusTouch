import { json, requirePrincipal } from '../../_shared/auth.js';

export async function onRequestGet({ request, env }) {
  const auth = await requirePrincipal(request, env);
  if (auth.response) return auth.response;
  const result = await env.DB.prepare('SELECT id, name FROM careers WHERE is_active = 1 ORDER BY name').all();
  return json({ careers: result.results });
}
