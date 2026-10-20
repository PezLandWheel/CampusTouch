import { cleanText, createSession, isSameOrigin, json, readJson, validEmail, verifyPassword } from '../../_shared/auth.js';

async function digest(text) {
  const bytes = new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text)));
  let binary = '';
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

export async function onRequestPost({ request, env }) {
  if (!isSameOrigin(request)) return json({ error: 'Origen no permitido.' }, 403);
  let body;
  try { body = await readJson(request); } catch (error) { return json({ error: error.message }, 400); }
  const email = cleanText(body.email, 254).toLowerCase();
  const password = typeof body.password === 'string' ? body.password : '';
  if (!validEmail(email) || password.length > 128) return json({ error: 'Correo o contraseña incorrectos.' }, 401);

  const ip = request.headers.get('cf-connecting-ip') || 'unknown';
  const identifier = await digest(`${email}|${ip}`);
  const now = new Date();
  const attempt = await env.DB.prepare('SELECT attempt_count AS count, locked_until AS lockedUntil FROM login_attempts WHERE identifier = ?').bind(identifier).first();
  if (attempt?.lockedUntil && new Date(attempt.lockedUntil).getTime() > now.getTime()) {
    return json({ error: 'Demasiados intentos. Intenta de nuevo en unos minutos.' }, 429);
  }

  const user = await env.DB.prepare(`SELECT id, display_name AS displayName, email, password_salt AS salt, password_hash AS passwordHash, role, career_id AS careerId, is_active AS active
    FROM users WHERE email = ? LIMIT 1`).bind(email).first();
  const valid = user ? await verifyPassword(password, user.salt, user.passwordHash) : await verifyPassword(password || 'invalid-placeholder-password', 'AA', 'AA');
  if (!user || !valid || user.active !== 1) {
    await env.DB.prepare(`INSERT INTO login_attempts (identifier, attempt_count, locked_until, updated_at) VALUES (?, 1, NULL, ?)
      ON CONFLICT(identifier) DO UPDATE SET attempt_count = CASE WHEN login_attempts.locked_until IS NOT NULL AND login_attempts.locked_until <= ? THEN 1 ELSE login_attempts.attempt_count + 1 END,
      locked_until = CASE WHEN (CASE WHEN login_attempts.locked_until IS NOT NULL AND login_attempts.locked_until <= ? THEN 1 ELSE login_attempts.attempt_count + 1 END) >= 5 THEN ? ELSE NULL END, updated_at = ?`)
      .bind(identifier, now.toISOString(), now.toISOString(), now.toISOString(), new Date(now.getTime() + 15 * 60 * 1000).toISOString(), now.toISOString()).run();
    return json({ error: 'Correo o contraseña incorrectos.' }, 401);
  }

  await env.DB.prepare('DELETE FROM login_attempts WHERE identifier = ?').bind(identifier).run();
  await env.DB.prepare('DELETE FROM user_sessions WHERE expires_at <= ?').bind(now.toISOString()).run();
  const cookie = await createSession(env.DB, user.id, body.remember === true);
  const { salt, passwordHash, active, ...safeUser } = user;
  if (safeUser.careerId) {
    const career = await env.DB.prepare('SELECT name FROM careers WHERE id = ?').bind(safeUser.careerId).first();
    safeUser.careerName = career?.name || null;
  } else safeUser.careerName = null;
  return json({ user: safeUser }, 200, { 'set-cookie': cookie });
}
