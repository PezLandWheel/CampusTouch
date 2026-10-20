import { json } from '../../_shared/auth.js';

const CAREER = 'ingenieria-sistemas';
export async function onRequestGet({ request, env }) {
  const section = new URL(request.url).searchParams.get('section') || 'news';
  if (section === 'news') {
    const result = await env.DB.prepare(`SELECT id, category, title, summary, body, image_url AS image, published_at AS publishedAt
      FROM systems_news WHERE career_id=? AND status='PUBLISHED' ORDER BY published_at DESC`).bind(CAREER).all();
    return json({ items: result.results });
  }
  if (section === 'semesters') {
    const result = await env.DB.prepare('SELECT id, number, name, academic_period AS academicPeriod FROM systems_semesters WHERE career_id=? AND is_active=1 ORDER BY academic_period DESC,number').bind(CAREER).all();
    return json({ items: result.results });
  }
  if (section === 'schedules') {
    const result = await env.DB.prepare(`SELECT s.id,s.semester_id AS semesterId,s.subject,s.teacher_name AS teacherName,s.weekday,s.start_time AS startTime,s.end_time AS endTime,s.classroom,s.schedule_type AS scheduleType,m.name AS semester,m.academic_period AS academicPeriod,m.number AS semesterNumber
      FROM systems_schedules s JOIN systems_semesters m ON m.id=s.semester_id WHERE s.career_id=? AND s.is_active=1 AND m.is_active=1 AND s.weekday BETWEEN 1 AND 5 ORDER BY m.academic_period DESC,m.number,s.weekday,s.start_time`).bind(CAREER).all();
    return json({ items: result.results });
  }
  if (section === 'teachers') {
    const result = await env.DB.prepare('SELECT id,display_name AS displayName,email,specialty,office,office_hours AS officeHours,photo_url AS photoUrl FROM systems_teachers WHERE career_id=? AND is_active=1 ORDER BY display_name').bind(CAREER).all();
    return json({ items: result.results });
  }
  if (section === 'gallery') {
    const result = await env.DB.prepare('SELECT id,title,description,image_url AS imageUrl,category FROM systems_gallery WHERE career_id=? AND is_active=1 ORDER BY updated_at DESC').bind(CAREER).all();
    return json({ items: result.results });
  }
  if (section === 'links') {
    const result = await env.DB.prepare('SELECT id,title,url,description FROM systems_links WHERE career_id=? AND is_active=1 ORDER BY title').bind(CAREER).all();
    return json({ items: result.results });
  }
  if (section === 'profile') {
    const item = await env.DB.prepare('SELECT display_name AS displayName,motto,description,contact_email AS contactEmail,hero_image_url AS heroImageUrl FROM systems_profile WHERE career_id=?').bind(CAREER).first();
    return json({ item });
  }
  return json({ error: 'Sección no disponible.' }, 404);
}
