import { cleanText, hashPassword, isSameOrigin, json, passwordIsStrong, readJson, requirePrincipal, validEmail } from '../../../_shared/auth.js';

function cookieToken(request) {
  const cookies = request.headers.get('cookie') || '';
  for (const item of cookies.split(';')) {
    const [key, ...rest] = item.trim().split('=');
    if (key === 'campustouch_session') return rest.join('=');
  }
  return '';
}

async function sessionTokenHash(request) {
  const token = cookieToken(request);
  if (!token) return '';
  const digest = new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(token)));
  let binary = '';
  for (const byte of digest) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

function validPhotoUrl(value) {
  if (!value) return true;
  if (value.startsWith('/') && !value.startsWith('//')) return true;
  try { return new URL(value).protocol === 'https:'; } catch { return false; }
}

export async function onRequestPatch({ request, env, params }) {
  if (!isSameOrigin(request)) return json({ error: 'Origen no permitido.' }, 403);
  const auth = await requirePrincipal(request, env);
  if (auth.response) return auth.response;
  let body;
  try { body = await readJson(request); } catch (error) { return json({ error: error.message }, 400); }

  const target = await env.DB.prepare(`SELECT id, display_name AS displayName, email, role, career_id AS careerId
    FROM users WHERE id = ?`).bind(params.id).first();
  if (!target) return json({ error: 'La cuenta no existe.' }, 404);
  const now = new Date().toISOString();

  if (typeof body.active === 'boolean') {
    if (target.role === 'SUPER_ADMIN') return json({ error: 'La cuenta principal no se puede desactivar desde este panel.' }, 403);
    await env.DB.prepare('UPDATE users SET is_active = ?, updated_at = ? WHERE id = ?').bind(body.active ? 1 : 0, now, params.id).run();
    if (!body.active) await env.DB.prepare('DELETE FROM user_sessions WHERE user_id = ?').bind(params.id).run();
    return json({ ok: true });
  }

  const displayName = cleanText(body.displayName, 100);
  const email = cleanText(body.email, 254).toLowerCase();
  const photoUrl = cleanText(body.photoUrl, 1000);
  const password = typeof body.password === 'string' ? body.password : '';
  if (displayName.length < 2 || !validEmail(email)) return json({ error: 'Revisa el nombre y el correo electrónico.' }, 400);
  if (!validPhotoUrl(photoUrl)) return json({ error: 'La foto debe usar una dirección HTTPS o una ruta local del sitio.' }, 400);
  if (password && !passwordIsStrong(password)) return json({ error: 'La contraseña debe tener al menos 12 caracteres, con letras y números.' }, 400);

  try {
    if (password) {
      const credentials = await hashPassword(password);
      await env.DB.prepare(`UPDATE users SET display_name = ?, email = ?, photo_url = ?, password_salt = ?, password_hash = ?, updated_at = ? WHERE id = ?`)
        .bind(displayName, email, photoUrl, credentials.salt, credentials.hash, now, params.id).run();
      const currentTokenHash = await sessionTokenHash(request);
      await env.DB.prepare('DELETE FROM user_sessions WHERE user_id = ? AND token_hash <> ?').bind(params.id, currentTokenHash).run();
    } else {
      await env.DB.prepare('UPDATE users SET display_name = ?, email = ?, photo_url = ?, updated_at = ? WHERE id = ?')
        .bind(displayName, email, photoUrl, now, params.id).run();
    }
  } catch (error) {
    if (String(error).includes('UNIQUE')) return json({ error: 'Ya existe una cuenta con ese correo.' }, 409);
    throw error;
  }

  const career = target.careerId ? await env.DB.prepare('SELECT name FROM careers WHERE id = ?').bind(target.careerId).first() : null;
  return json({ user: { ...target, displayName, email, photoUrl, careerName: career?.name || null, roleName: { SUPER_ADMIN: 'Administrador Principal', CAREER_ADMIN: 'Administrador de Carrera', CONTENT_EDITOR: 'Editor de Contenido', SCHEDULE_MANAGER: 'Gestor de Horarios', TEACHER_MANAGER: 'Gestor de Profesores', CONSULTANT: 'Consultor', USER: 'Usuario' }[target.role] } });
}
