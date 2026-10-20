import { cleanText, createSession, hashPassword, isSameOrigin, json, passwordIsStrong, readJson, validEmail } from '../../_shared/auth.js';

function constantTimeTextEqual(left, right) {
  const encoder = new TextEncoder();
  const a = encoder.encode(left);
  const b = encoder.encode(right);
  const size = Math.max(a.length, b.length);
  let difference = a.length ^ b.length;
  for (let index = 0; index < size; index += 1) difference |= (a[index] || 0) ^ (b[index] || 0);
  return difference === 0;
}

async function digest(text) {
  const bytes = new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text)));
  let binary = '';
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

export async function onRequestPost({ request, env }) {
  if (!isSameOrigin(request)) return json({ error: 'Origen no permitido.' }, 403);
  if (!env.BOOTSTRAP_TOKEN) return json({ error: 'La configuración inicial aún no está habilitada.' }, 503);
  let body;
  try { body = await readJson(request); } catch (error) { return json({ error: error.message }, 400); }
  const token = cleanText(body.token, 500);
  const displayName = cleanText(body.displayName, 100);
  const email = cleanText(body.email, 254).toLowerCase();
  const password = typeof body.password === 'string' ? body.password : '';
  const nowDate = new Date();
  const ipKey = await digest(`bootstrap|${request.headers.get('cf-connecting-ip') || 'unknown'}`);
  const priorAttempt = await env.DB.prepare('SELECT attempt_count AS count, locked_until AS lockedUntil FROM login_attempts WHERE identifier = ?').bind(ipKey).first();
  if (priorAttempt?.lockedUntil && new Date(priorAttempt.lockedUntil).getTime() > nowDate.getTime()) return json({ error: 'Demasiados intentos de configuración. Intenta de nuevo en unos minutos.' }, 429);
  if (!constantTimeTextEqual(token, env.BOOTSTRAP_TOKEN)) {
    const now = nowDate.toISOString();
    await env.DB.prepare(`INSERT INTO login_attempts (identifier, attempt_count, locked_until, updated_at) VALUES (?, 1, NULL, ?)
      ON CONFLICT(identifier) DO UPDATE SET attempt_count = CASE WHEN login_attempts.locked_until IS NOT NULL AND login_attempts.locked_until <= ? THEN 1 ELSE login_attempts.attempt_count + 1 END,
      locked_until = CASE WHEN (CASE WHEN login_attempts.locked_until IS NOT NULL AND login_attempts.locked_until <= ? THEN 1 ELSE login_attempts.attempt_count + 1 END) >= 5 THEN ? ELSE NULL END, updated_at = ?`)
      .bind(ipKey, now, now, now, new Date(nowDate.getTime() + 15 * 60 * 1000).toISOString(), now).run();
    return json({ error: 'El código de configuración no es correcto.' }, 401);
  }
  if (displayName.length < 2 || !validEmail(email) || !passwordIsStrong(password)) {
    return json({ error: 'Revisa el nombre, el correo y la contraseña. Usa al menos 12 caracteres con letras y números.' }, 400);
  }

  let stage = 'password-hash';
  try {
    const credentials = await hashPassword(password);
    stage = 'clear-attempts';
    await env.DB.prepare('DELETE FROM login_attempts WHERE identifier = ?').bind(ipKey).run();
    const userId = crypto.randomUUID();
    const now = new Date().toISOString();
    stage = 'create-admin';
    const inserted = await env.DB.prepare(`INSERT INTO users (id, display_name, email, password_salt, password_hash, role, career_id, is_active, created_at, updated_at)
      SELECT ?, ?, ?, ?, ?, 'SUPER_ADMIN', NULL, 1, ?, ? WHERE NOT EXISTS (SELECT 1 FROM users WHERE role = 'SUPER_ADMIN')`)
      .bind(userId, displayName, email, credentials.salt, credentials.hash, now, now).run();
    if (!inserted.meta.changes) return json({ error: 'La cuenta principal ya fue configurada. Inicia sesión.' }, 409);
    stage = 'create-session';
    const cookie = await createSession(env.DB, userId, true);
    return json({ user: { id: userId, displayName, email, role: 'SUPER_ADMIN', careerId: null, careerName: null } }, 201, { 'set-cookie': cookie });
  } catch (error) {
    const errorType = error instanceof Error ? error.name : 'UnknownError';
    console.error('[auth/bootstrap] Error en etapa', stage, errorType);
    return json({ error: `El alta falló durante ${stage} (${errorType}). No vuelvas a enviar el formulario varias veces; revisa ese paso.` }, 500);
  }
}
