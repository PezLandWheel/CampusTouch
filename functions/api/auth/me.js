import { currentUser, json } from '../../_shared/auth.js';

export async function onRequestGet({ request, env }) {
  const user = await currentUser(request, env.DB);
  if (!user) return json({ user: null }, 401);
  return json({ user });
}
