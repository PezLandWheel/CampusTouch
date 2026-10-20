import { canAccessSystemsSection, cleanText, hashPassword, isSameOrigin, json, passwordIsStrong, readJson, requireSystemsAdmin, roleNames } from '../../../../_shared/auth.js';

const CAREER = 'ingenieria-sistemas';
const roleSet = new Set(['CAREER_ADMIN', 'CONTENT_EDITOR', 'SCHEDULE_MANAGER', 'TEACHER_MANAGER', 'CONSULTANT', 'USER']);
const values = (body, keys) => Object.fromEntries(keys.map((key) => [key, cleanText(body[key], key === 'body' || key === 'description' ? 5000 : 500)]));
const required = (...items) => items.every((item) => item && item.trim().length > 0);
const validImage = (value) => value.startsWith('/images/') || /^https:\/\//i.test(value);
const validUrl = (value) => /^https:\/\//i.test(value);

export async function onRequestPatch({ request, env, params }) {
  if (!isSameOrigin(request)) return json({ error: 'Origen no permitido.' }, 403);
  const auth = await requireSystemsAdmin(request, env); if (auth.response) return auth.response;
  let body; try { body = await readJson(request); } catch (error) { return json({ error: error.message }, 400); }
  const { section } = params; const id = params.id; const data = body.data || {};
  if (!canAccessSystemsSection(auth.user.role, section, true)) return json({ error: 'Tu rol no tiene permiso para modificar esta sección.' }, 403);
  const now = new Date().toISOString();
  if (section === 'users') {
    if (typeof data.role === 'string') {
      if (!roleSet.has(data.role)) return json({ error: 'El rol seleccionado no es válido.' }, 400);
      const target = await env.DB.prepare('SELECT id FROM users WHERE id = ? AND career_id = ? AND role <> ?').bind(id, CAREER, 'SUPER_ADMIN').first();
      if (!target) return json({ error: 'La cuenta no existe o no pertenece a Ingeniería de Sistemas.' }, 404);
      await env.DB.prepare('UPDATE users SET role = ?, updated_at = ? WHERE id = ? AND career_id = ?').bind(data.role, now, id, CAREER).run();
      return json({ ok: true, role: data.role });
    }
    if (typeof data.active !== 'boolean') return json({ error: 'Estado no válido.' }, 400);
    const target = await env.DB.prepare('SELECT role FROM users WHERE id = ? AND career_id = ?').bind(id, CAREER).first();
    if (!target || target.role === 'SUPER_ADMIN') return json({ error: 'La cuenta no existe o no se puede modificar.' }, 404);
    await env.DB.prepare('UPDATE users SET is_active = ?, updated_at = ? WHERE id = ? AND career_id = ?').bind(data.active ? 1 : 0, now, id, CAREER).run();
    if (!data.active) await env.DB.prepare('DELETE FROM user_sessions WHERE user_id = ?').bind(id).run();
    return json({ ok: true });
  }
  if (section === 'teacherAccounts') {
    const accountUserId = typeof data.accountUserId === 'string' && data.accountUserId ? data.accountUserId : null;
    const teacher = await env.DB.prepare('SELECT id FROM systems_teachers WHERE id = ? AND career_id = ?').bind(id, CAREER).first();
    if (!teacher) return json({ error: 'El profesor no existe en IngenierÃ­a de Sistemas.' }, 404);
    if (accountUserId) {
      const account = await env.DB.prepare(`SELECT id FROM users WHERE id = ? AND career_id = ? AND is_active = 1 AND role NOT IN ('USER', 'SUPER_ADMIN', 'CAREER_ADMIN')`).bind(accountUserId, CAREER).first();
      if (!account) return json({ error: 'Selecciona una cuenta activa de administrador o colaborador de Sistemas.' }, 400);
      const linked = await env.DB.prepare('SELECT id FROM systems_teachers WHERE account_user_id = ? AND id <> ? LIMIT 1').bind(accountUserId, id).first();
      if (linked) return json({ error: 'Esa cuenta ya está vinculada a otro profesor.' }, 409);
    }
    await env.DB.prepare('UPDATE systems_teachers SET account_user_id = ?, updated_at = ? WHERE id = ? AND career_id = ?')
      .bind(accountUserId, now, id, CAREER).run();
    return json({ ok: true });
  }
  if (section === 'news') {
    const item = values(data, ['title', 'category', 'summary', 'body', 'imageUrl']); const status = data.status === 'PUBLISHED' ? 'PUBLISHED' : 'DRAFT';
    if (!required(item.title, item.category, item.summary, item.body, item.imageUrl) || !(item.imageUrl.startsWith('/images/') || /^https:\/\//i.test(item.imageUrl))) return json({ error: 'Revisa los campos e imagen de la noticia.' }, 400);
    const prior = await env.DB.prepare('SELECT published_at AS publishedAt FROM systems_news WHERE id = ? AND career_id = ?').bind(id, CAREER).first();
    if (!prior) return json({ error: 'La noticia no existe.' }, 404);
    await env.DB.prepare(`UPDATE systems_news SET title=?,category=?,summary=?,body=?,image_url=?,status=?,published_at=?,updated_at=? WHERE id=? AND career_id=?`)
      .bind(item.title, item.category, item.summary, item.body, item.imageUrl, status, status === 'PUBLISHED' ? (prior.publishedAt || now) : null, now, id, CAREER).run();
    return json({ ok: true });
  }
  if (section === 'semesters') {
    if (typeof data.active === 'boolean') await env.DB.prepare('UPDATE systems_semesters SET is_active=?,updated_at=? WHERE id=? AND career_id=?').bind(data.active ? 1 : 0, now, id, CAREER).run();
    else {
      const item = values(data, ['name', 'academicPeriod']); const number = Number(data.number);
      if (!required(item.name, item.academicPeriod) || !Number.isInteger(number) || number < 1 || number > 9) return json({ error: 'Ingresa un semestre y periodo válidos.' }, 400);
      await env.DB.prepare('UPDATE systems_semesters SET number=?,name=?,academic_period=?,updated_at=? WHERE id=? AND career_id=?').bind(number, item.name, item.academicPeriod, now, id, CAREER).run();
    }
    return json({ ok: true });
  }
  const activeTables = { schedules: 'systems_schedules', teachers: 'systems_teachers', gallery: 'systems_gallery', links: 'systems_links' };
  if (Object.hasOwn(activeTables, section) && typeof data.active === 'boolean') {
    const table = activeTables[section];
    await env.DB.prepare(`UPDATE ${table} SET is_active=?,updated_at=? WHERE id=? AND career_id=?`).bind(data.active ? 1 : 0, now, id, CAREER).run();
    return json({ ok: true });
  }
  if (section === 'gallery') {
    const item = values(data, ['title','description','imageUrl','category']); if (!required(item.title,item.imageUrl) || !validImage(item.imageUrl)) return json({ error:'Título o imagen inválida.' },400);
    await env.DB.prepare('UPDATE systems_gallery SET title=?,description=?,image_url=?,category=?,updated_at=? WHERE id=? AND career_id=?').bind(item.title,item.description,item.imageUrl,item.category,now,id,CAREER).run();
    return json({ ok:true });
  }
  if (section === 'links') {
    const item = values(data, ['title','url','description']); if (!required(item.title,item.url) || !validUrl(item.url)) return json({ error:'El enlace debe usar HTTPS.' },400);
    await env.DB.prepare('UPDATE systems_links SET title=?,url=?,description=?,updated_at=? WHERE id=? AND career_id=?').bind(item.title,item.url,item.description,now,id,CAREER).run();
    return json({ ok:true });
  }
  if (section === 'teachers') {
    const item = values(data, ['displayName','email','specialty','office','officeHours','photoUrl']); if (!required(item.displayName) || (item.photoUrl && !validImage(item.photoUrl))) return json({ error:'Ingresa nombre e imagen válidos.' },400);
    await env.DB.prepare('UPDATE systems_teachers SET display_name=?,email=?,specialty=?,office=?,office_hours=?,photo_url=?,updated_at=? WHERE id=? AND career_id=?').bind(item.displayName,item.email,item.specialty,item.office,item.officeHours,item.photoUrl,now,id,CAREER).run();
    return json({ ok:true });
  }
  if (section === 'schedules') {
    const item = values(data, ['semesterId','subject','teacherName','startTime','endTime','classroom','scheduleType']); const weekday = Number(data.weekday);
    const sem = await env.DB.prepare('SELECT id FROM systems_semesters WHERE id=? AND career_id=?').bind(item.semesterId,CAREER).first();
    if (!sem || !required(item.subject,item.startTime,item.endTime) || weekday<1 || weekday>5 || item.startTime>=item.endTime) return json({error:'Revisa materia, semestre, día entre lunes y viernes y hora.'},400);
    if (item.teacherName && !await env.DB.prepare('SELECT id FROM systems_teachers WHERE career_id = ? AND is_active = 1 AND display_name = ? COLLATE NOCASE').bind(CAREER, item.teacherName).first()) return json({ error: 'Selecciona un profesor registrado y activo.' }, 400);
    const type = ['CLASS','OFFICE_HOURS','ADVISORY'].includes(item.scheduleType) ? item.scheduleType : 'CLASS';
    await env.DB.prepare('UPDATE systems_schedules SET semester_id=?,subject=?,parallel=?,teacher_name=?,weekday=?,start_time=?,end_time=?,classroom=?,schedule_type=?,updated_at=? WHERE id=? AND career_id=?').bind(item.semesterId,item.subject,'',item.teacherName,weekday,item.startTime,item.endTime,item.classroom,type,now,id,CAREER).run();
    return json({ok:true});
  }
  return json({ error: 'No se puede modificar este registro.' }, 400);
}

export async function onRequestDelete({ request, env, params }) {
  if (!isSameOrigin(request)) return json({ error: 'Origen no permitido.' }, 403);
  const auth = await requireSystemsAdmin(request, env); if (auth.response) return auth.response;
  if (!canAccessSystemsSection(auth.user.role, params.section, true)) return json({ error: 'Tu rol no tiene permiso para eliminar registros de esta sección.' }, 403);
  const tables = { news: 'systems_news', semesters: 'systems_semesters', schedules: 'systems_schedules', teachers: 'systems_teachers', gallery: 'systems_gallery', links: 'systems_links' };
  const table = tables[params.section]; if (!table) return json({ error: 'No se puede eliminar este registro.' }, 400);
  try { await env.DB.prepare(`DELETE FROM ${table} WHERE id=? AND career_id=?`).bind(params.id, CAREER).run(); }
  catch { return json({ error: 'No se puede eliminar: hay otros datos relacionados.' }, 409); }
  return json({ ok: true });
}
