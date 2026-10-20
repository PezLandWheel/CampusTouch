import { json } from '../../_shared/auth.js';

export async function onRequestGet({ env }) {
  const principal = await env.DB.prepare("SELECT 1 FROM users WHERE role = 'SUPER_ADMIN' LIMIT 1").first();
  return json({ setupRequired: !principal, bootstrapEnabled: Boolean(env.BOOTSTRAP_TOKEN) });
}
