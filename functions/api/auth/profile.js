import { cleanText, createSession, hashPassword, isSameOrigin, json, passwordIsStrong, readJson, requirePrincipal, validEmail, verifyPassword } from '../../_shared/auth.js';

export async function onRequestPatch({ request, env }) {
  if (!isSameOrigin(request)) return json({ error: 'Origen no permitido.' }, 403);
  const auth = await requirePrincipal(request, env);
  if (auth.response) return auth.response;

  let body;
  try { body = await readJson(request); } catch (error) { return json({ error: error.message }, 400); }

  const displayName = cleanText(body.displayName, 100);
  const email = cleanText(body.email, 254).toLowerCase();
  const password = typeof body.password === 'string' ? body.password : '';
  const currentPassword = typeof body.currentPassword === 'string' ? body.currentPassword : '';
  if (displayName.length < 2 || !validEmail(email)) return json({ error: 'Revisa el nombre y el correo electrónico.' }, 400);
  if (password && !passwordIsStrong(password)) return json({ error: 'La nueva contraseña debe tener al menos 12 caracteres, con letras y números.' }, 400);

  const current = await env.DB.prepare('SELECT password_salt AS salt, password_hash AS hash FROM users WHERE id = ? AND role = \'SUPER_ADMIN\'')
    .bind(auth.user.id).first();
  if (!current) return json({ error: 'No se encontró la cuenta principal.' }, 404);
  if (password && !(await verifyPassword(currentPassword, current.salt, current.hash))) {
    return json({ error: 'La contraseña actual no coincide.' }, 403);
  }

  const now = new Date().toISOString();
  try {
    if (password) {
      const credentials = await hashPassword(password);
      await env.DB.prepare('UPDATE users SET display_name = ?, email = ?, password_salt = ?, password_hash = ?, updated_at = ? WHERE id = ?')
        .bind(displayName, email, credentials.salt, credentials.hash, now, auth.user.id).run();
      await env.DB.prepare('DELETE FROM user_sessions WHERE user_id = ?').bind(auth.user.id).run();
      const cookie = await createSession(env.DB, auth.user.id, true);
      return json({ user: { ...auth.user, displayName, email } }, 200, { 'set-cookie': cookie });
    }
    await env.DB.prepare('UPDATE users SET display_name = ?, email = ?, updated_at = ? WHERE id = ?')
      .bind(displayName, email, now, auth.user.id).run();
    return json({ user: { ...auth.user, displayName, email } });
  } catch (error) {
    if (String(error).includes('UNIQUE')) return json({ error: 'Ya existe una cuenta con ese correo.' }, 409);
    throw error;
  }
}
