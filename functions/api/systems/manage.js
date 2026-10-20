import { canAccessSystemsSection, cleanText, hashPassword, isSameOrigin, json, passwordIsStrong, readJson, requireSystemsAdmin, roleNames, validEmail } from '../../_shared/auth.js';

const CAREER = 'ingenieria-sistemas';
const roles = new Set(['CAREER_ADMIN', 'CONTENT_EDITOR', 'SCHEDULE_MANAGER', 'TEACHER_MANAGER', 'CONSULTANT', 'USER']);
const allowedSections = new Set(['dashboard', 'news', 'gallery', 'semesters', 'schedules', 'teachers', 'teacherAccounts', 'links', 'profile', 'users', 'roles']);
const values = (body, keys) => Object.fromEntries(keys.map((key) => [key, cleanText(body[key], key === 'body' || key === 'description' ? 5000 : 500)]));
const required = (...items) => items.every((item) => item && item.trim().length > 0);
const validImage = (value) => value.startsWith('/images/') || /^https:\/\//i.test(value);
const validUrl = (value) => /^https:\/\//i.test(value);

async function listSection(env, section) {
  if (section === 'dashboard') {
    const [news, published, semesters, schedules, teachers, users, recentNews] = await Promise.all([
      env.DB.prepare('SELECT COUNT(*) AS count FROM systems_news WHERE career_id = ?').bind(CAREER).first(),
      env.DB.prepare("SELECT COUNT(*) AS count FROM systems_news WHERE career_id = ? AND status = 'PUBLISHED'").bind(CAREER).first(),
      env.DB.prepare('SELECT COUNT(*) AS count FROM systems_semesters WHERE career_id = ? AND is_active = 1').bind(CAREER).first(),
      env.DB.prepare('SELECT COUNT(*) AS count FROM systems_schedules WHERE career_id = ? AND is_active = 1').bind(CAREER).first(),
      env.DB.prepare('SELECT COUNT(*) AS count FROM systems_teachers WHERE career_id = ? AND is_active = 1').bind(CAREER).first(),
      env.DB.prepare('SELECT COUNT(*) AS count FROM users WHERE career_id = ? AND is_active = 1').bind(CAREER).first(),
      env.DB.prepare('SELECT id, title, category, status, updated_at AS updatedAt, image_url AS imageUrl FROM systems_news WHERE career_id = ? ORDER BY updated_at DESC LIMIT 5').bind(CAREER).all()
    ]);
    return { stats: { news: news.count, publishedNews: published.count, semesters: semesters.count, schedules: schedules.count, teachers: teachers.count, users: users.count }, recentNews: recentNews.results };
  }
  if (section === 'news') {
    const result = await env.DB.prepare('SELECT id, category, title, summary, body, image_url AS imageUrl, status, published_at AS publishedAt, created_at AS createdAt, updated_at AS updatedAt FROM systems_news WHERE career_id = ? ORDER BY updated_at DESC').bind(CAREER).all();
    return { items: result.results };
  }
  if (section === 'semesters') {
    const result = await env.DB.prepare('SELECT id, number, name, academic_period AS academicPeriod, is_active AS active FROM systems_semesters WHERE career_id = ? ORDER BY academic_period DESC, number').bind(CAREER).all();
    return { items: result.results.map((item) => ({ ...item, active: item.active === 1 })) };
  }
  if (section === 'schedules') {
    const result = await env.DB.prepare(`SELECT s.id, s.semester_id AS semesterId, m.name AS semester, m.academic_period AS academicPeriod,
      s.subject, s.teacher_name AS teacherName, s.weekday, s.start_time AS startTime, s.end_time AS endTime,
      s.classroom, s.schedule_type AS scheduleType, s.is_active AS active FROM systems_schedules s
      JOIN systems_semesters m ON m.id = s.semester_id WHERE s.career_id = ? ORDER BY m.number, s.weekday, s.start_time`).bind(CAREER).all();
    return { items: result.results.map((item) => ({ ...item, active: item.active === 1 })) };
  }
  if (section === 'teachers') {
    const result = await env.DB.prepare('SELECT id, display_name AS displayName, email, specialty, office, office_hours AS officeHours, photo_url AS photoUrl, is_active AS active FROM systems_teachers WHERE career_id = ? ORDER BY display_name').bind(CAREER).all();
    return { items: result.results.map((item) => ({ ...item, active: item.active === 1 })) };
  }
  if (section === 'teacherAccounts') {
    const result = await env.DB.prepare(`SELECT t.id, t.display_name AS displayName, t.email, t.specialty, t.photo_url AS photoUrl,
      t.account_user_id AS accountUserId, u.display_name AS accountDisplayName, u.email AS accountEmail, u.role AS accountRole,
      u.is_active AS accountActive FROM systems_teachers t LEFT JOIN users u ON u.id = t.account_user_id
      WHERE t.career_id = ? AND t.is_active = 1 ORDER BY t.display_name`).bind(CAREER).all();
    return { items: result.results.map((item) => ({ ...item, accountActive: item.accountActive === 1, accountRoleName: roleNames[item.accountRole] || '' })) };
  }
  if (section === 'gallery') {
    const result = await env.DB.prepare('SELECT id, title, description, image_url AS imageUrl, category, is_active AS active FROM systems_gallery WHERE career_id = ? ORDER BY updated_at DESC').bind(CAREER).all();
    return { items: result.results.map((item) => ({ ...item, active: item.active === 1 })) };
  }
  if (section === 'links') {
    const result = await env.DB.prepare('SELECT id, title, url, description, is_active AS active FROM systems_links WHERE career_id = ? ORDER BY title').bind(CAREER).all();
    return { items: result.results.map((item) => ({ ...item, active: item.active === 1 })) };
  }
  if (section === 'profile') {
    return { item: await env.DB.prepare('SELECT career_id AS careerId, display_name AS displayName, motto, description, contact_email AS contactEmail, hero_image_url AS heroImageUrl FROM systems_profile WHERE career_id = ?').bind(CAREER).first() };
  }
  if (section === 'users') {
    const result = await env.DB.prepare(`SELECT id, display_name AS displayName, email, role, career_id AS careerId, is_active AS active, created_at AS createdAt
      FROM users WHERE career_id = ? ORDER BY created_at DESC`).bind(CAREER).all();
    return { items: result.results.map((item) => ({ ...item, active: item.active === 1, roleName: roleNames[item.role] })) };
  }
  if (section === 'roles') return { items: [...roles].map((role) => ({ id: role, role, roleName: roleNames[role] })) };
  return null;
}

export async function onRequestGet({ request, env }) {
  const auth = await requireSystemsAdmin(request, env);
  if (auth.response) return auth.response;
  const section = new URL(request.url).searchParams.get('section') || 'dashboard';
  if (!allowedSections.has(section)) return json({ error: 'Sección no disponible.' }, 400);
  if (!canAccessSystemsSection(auth.user.role, section)) return json({ error: 'Tu rol no tiene permiso para consultar esta sección.' }, 403);
  return json(await listSection(env, section));
}

export async function onRequestPost({ request, env }) {
  if (!isSameOrigin(request)) return json({ error: 'Origen no permitido.' }, 403);
  const auth = await requireSystemsAdmin(request, env);
  if (auth.response) return auth.response;
  let body;
  try { body = await readJson(request); } catch (error) { return json({ error: error.message }, 400); }
  const section = cleanText(body.section, 40);
  if (!allowedSections.has(section) || ['dashboard', 'roles', 'teacherAccounts'].includes(section)) return json({ error: 'No se puede editar esta sección.' }, 400);
  if (!canAccessSystemsSection(auth.user.role, section, true)) return json({ error: 'Tu rol no tiene permiso para crear registros en esta sección.' }, 403);
  const id = crypto.randomUUID(); const now = new Date().toISOString(); const data = body.data || {};
  try {
    if (section === 'news') {
      const item = values(data, ['title', 'category', 'summary', 'body', 'imageUrl']); const status = data.status === 'PUBLISHED' ? 'PUBLISHED' : 'DRAFT';
      if (!required(item.title, item.category, item.summary, item.body, item.imageUrl) || !validImage(item.imageUrl)) return json({ error: 'Completa los campos y utiliza una imagen segura (HTTPS o una imagen del sitio).' }, 400);
      await env.DB.prepare(`INSERT INTO systems_news (id, career_id, category, title, summary, body, image_url, status, published_at, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`).bind(id, CAREER, item.category, item.title, item.summary, item.body, item.imageUrl, status, status === 'PUBLISHED' ? now : null, now, now).run();
    } else if (section === 'semesters') {
      const item = values(data, ['name', 'academicPeriod']); const number = Number(data.number);
      if (!required(item.name, item.academicPeriod) || !Number.isInteger(number) || number < 1 || number > 9) return json({ error: 'Ingresa un número de semestre, periodo y nombre válidos.' }, 400);
      await env.DB.prepare(`INSERT INTO systems_semesters (id, career_id, number, name, academic_period, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)`)
        .bind(id, CAREER, number, item.name, item.academicPeriod, now, now).run();
    } else if (section === 'schedules') {
      const item = values(data, ['semesterId', 'subject', 'teacherName', 'startTime', 'endTime', 'classroom', 'scheduleType']); const weekday = Number(data.weekday);
      const semester = await env.DB.prepare('SELECT id FROM systems_semesters WHERE id = ? AND career_id = ? AND is_active = 1').bind(item.semesterId, CAREER).first();
      if (!semester || !required(item.subject, item.startTime, item.endTime) || weekday < 1 || weekday > 5 || item.startTime >= item.endTime) return json({ error: 'Completa la materia, semestre, un día entre lunes y viernes y un rango de horas válido.' }, 400);
      if (item.teacherName && !await env.DB.prepare('SELECT id FROM systems_teachers WHERE career_id = ? AND is_active = 1 AND display_name = ? COLLATE NOCASE').bind(CAREER, item.teacherName).first()) return json({ error: 'Selecciona un profesor registrado y activo.' }, 400);
      const type = ['CLASS', 'OFFICE_HOURS', 'ADVISORY'].includes(item.scheduleType) ? item.scheduleType : 'CLASS';
      await env.DB.prepare(`INSERT INTO systems_schedules (id, career_id, semester_id, subject, parallel, teacher_name, weekday, start_time, end_time, classroom, schedule_type, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`).bind(id, CAREER, item.semesterId, item.subject, '', item.teacherName, weekday, item.startTime, item.endTime, item.classroom, type, now, now).run();
    } else if (section === 'teachers') {
      const item = values(data, ['displayName', 'email', 'specialty', 'office', 'officeHours', 'photoUrl']);
      if (!required(item.displayName) || (item.photoUrl && !validImage(item.photoUrl))) return json({ error: 'Ingresa el nombre y una imagen válida (HTTPS o del sitio).' }, 400);
      await env.DB.prepare(`INSERT INTO systems_teachers (id, career_id, display_name, email, specialty, office, office_hours, photo_url, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`)
        .bind(id, CAREER, item.displayName, item.email, item.specialty, item.office, item.officeHours, item.photoUrl, now, now).run();
    } else if (section === 'gallery') {
      const item = values(data, ['title', 'description', 'imageUrl', 'category']);
      if (!required(item.title, item.imageUrl) || !validImage(item.imageUrl)) return json({ error: 'Agrega un título y una URL segura para la imagen.' }, 400);
      await env.DB.prepare('INSERT INTO systems_gallery (id, career_id, title, description, image_url, category, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)')
        .bind(id, CAREER, item.title, item.description, item.imageUrl, item.category || 'Campus', now, now).run();
    } else if (section === 'links') {
      const item = values(data, ['title', 'url', 'description']);
      if (!required(item.title, item.url) || !validUrl(item.url)) return json({ error: 'El enlace debe tener una dirección HTTPS válida.' }, 400);
      await env.DB.prepare('INSERT INTO systems_links (id, career_id, title, url, description, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)')
        .bind(id, CAREER, item.title, item.url, item.description, now, now).run();
    } else if (section === 'profile') {
      const item = values(data, ['displayName', 'motto', 'description', 'contactEmail', 'heroImageUrl']);
      if (!required(item.displayName, item.motto, item.description, item.heroImageUrl) || !validImage(item.heroImageUrl)) return json({ error: 'Completa los datos de la carrera e ingresa una imagen segura.' }, 400);
      await env.DB.prepare(`UPDATE systems_profile SET display_name = ?, motto = ?, description = ?, contact_email = ?, hero_image_url = ?, updated_at = ? WHERE career_id = ?`)
        .bind(item.displayName, item.motto, item.description, item.contactEmail, item.heroImageUrl, now, CAREER).run();
      return json({ ok: true });
    } else if (section === 'users') {
      const item = values(data, ['displayName', 'email', 'role']); const password = typeof data.password === 'string' ? data.password : '';
      if (!required(item.displayName) || !validEmail(item.email.toLowerCase()) || !roles.has(item.role) || !passwordIsStrong(password)) return json({ error: 'Revisa nombre, correo, rol y contraseña (12 caracteres, letras y números).' }, 400);
      const credentials = await hashPassword(password);
      await env.DB.prepare(`INSERT INTO users (id, display_name, email, password_salt, password_hash, role, career_id, is_active, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, 1, ?, ?)`).bind(id, item.displayName, item.email.toLowerCase(), credentials.salt, credentials.hash, item.role, CAREER, now, now).run();
    }
  } catch (error) {
    if (String(error).includes('UNIQUE')) return json({ error: 'Ya existe una cuenta o registro con esos datos.' }, 409);
    throw error;
  }
  const refreshed = await listSection(env, section);
  return json({ ok: true, ...refreshed }, 201);
}
