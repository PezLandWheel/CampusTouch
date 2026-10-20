import { cleanText, hashPassword, isSameOrigin, json, passwordIsStrong, readJson, requirePrincipal, roleNames, validEmail } from '../../_shared/auth.js';

const allowedRoles = new Set(['CAREER_ADMIN', 'CONTENT_EDITOR', 'SCHEDULE_MANAGER', 'TEACHER_MANAGER', 'CONSULTANT', 'USER']);

export async function onRequestGet({ request, env }) {
  const auth = await requirePrincipal(request, env);
  if (auth.response) return auth.response;
  const result = await env.DB.prepare(`SELECT u.id, u.display_name AS displayName, u.email, u.photo_url AS photoUrl, u.role, u.career_id AS careerId,
      c.name AS careerName, u.is_active AS active, u.created_at AS createdAt
    FROM users u LEFT JOIN careers c ON c.id = u.career_id ORDER BY u.created_at DESC`).all();
  return json({ users: result.results.map((user) => ({ ...user, active: user.active === 1, roleName: roleNames[user.role] })) });
}

export async function onRequestPost({ request, env }) {
  if (!isSameOrigin(request)) return json({ error: 'Origen no permitido.' }, 403);
  const auth = await requirePrincipal(request, env);
  if (auth.response) return auth.response;
  let body;
  try { body = await readJson(request); } catch (error) { return json({ error: error.message }, 400); }
  const displayName = cleanText(body.displayName, 100);
  const email = cleanText(body.email, 254).toLowerCase();
  const password = typeof body.password === 'string' ? body.password : '';
  const role = cleanText(body.role, 40);
  const careerId = cleanText(body.careerId, 80) || null;
  if (displayName.length < 2 || !validEmail(email) || !passwordIsStrong(password) || !allowedRoles.has(role)) {
    return json({ error: 'Revisa los datos. La contraseña debe tener 12 caracteres como mínimo, incluyendo letras y números.' }, 400);
  }
  if (role === 'USER' && careerId) return json({ error: 'Una cuenta de usuario general no lleva carrera asignada.' }, 400);
  if (role !== 'USER' && !careerId) return json({ error: 'Selecciona la carrera a la que pertenecerá esta cuenta.' }, 400);
  if (careerId) {
    const career = await env.DB.prepare('SELECT id FROM careers WHERE id = ? AND is_active = 1').bind(careerId).first();
    if (!career) return json({ error: 'La carrera seleccionada no existe o está inactiva.' }, 400);
  }
  const credentials = await hashPassword(password);
  const userId = crypto.randomUUID();
  const now = new Date().toISOString();
  try {
    await env.DB.prepare(`INSERT INTO users (id, display_name, email, password_salt, password_hash, role, career_id, is_active, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, 1, ?, ?)`).bind(userId, displayName, email, credentials.salt, credentials.hash, role, careerId, now, now).run();
  } catch (error) {
    if (String(error).includes('UNIQUE')) return json({ error: 'Ya existe una cuenta con ese correo.' }, 409);
    throw error;
  }
  const career = careerId ? await env.DB.prepare('SELECT name FROM careers WHERE id = ?').bind(careerId).first() : null;
  return json({ user: { id: userId, displayName, email, photoUrl: '', role, roleName: roleNames[role], careerId, careerName: career?.name || null, active: true, createdAt: now } }, 201);
}
