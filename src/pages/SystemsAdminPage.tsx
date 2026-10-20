import { useEffect, useMemo, useState, type DragEvent, type FormEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import { systemsCurriculum } from '../data/systemsCurriculum';
import {
  Activity, ArrowRight, Bell, BookOpen, CalendarDays, Check, ChevronDown, ChevronRight, CircleHelp,
  Clock3, FileText, GraduationCap, Image, Link as LinkIcon, LockKeyhole, LogOut, Menu, Plus,
  Search, Settings, ShieldCheck, Trash2, UserRound, Users, X, Pencil, Eye, LayoutDashboard,
} from 'lucide-react';

type AdminUser = { id: string; displayName: string; email: string; role: string; careerId: string | null; careerName: string | null; roleName?: string };
type Section = 'dashboard' | 'news' | 'gallery' | 'profile' | 'semesters' | 'subjects' | 'schedules' | 'teachers' | 'teacherAccounts' | 'links' | 'users' | 'roles';
type Row = Record<string, any> & { id: string; active?: boolean };
type Field = { key: string; label: string; type?: 'text' | 'email' | 'url' | 'number' | 'time' | 'password' | 'textarea' | 'select'; required?: boolean; options?: { value: string; label: string }[]; placeholder?: string; wide?: boolean; min?: number; max?: number };

const days = [
  { value: '1', label: 'Lunes' }, { value: '2', label: 'Martes' }, { value: '3', label: 'Miércoles' },
  { value: '4', label: 'Jueves' }, { value: '5', label: 'Viernes' },
];
const newsCategories = ['Eventos', 'Academia', 'Investigación', 'Tecnología', 'Institucional', 'Convocatorias'].map((label) => ({ value: label.toUpperCase(), label }));
const roleOptions = [
  { value: 'CAREER_ADMIN', label: 'Administrador de Carrera' }, { value: 'CONTENT_EDITOR', label: 'Editor de Contenido' },
  { value: 'SCHEDULE_MANAGER', label: 'Gestor de Horarios' }, { value: 'TEACHER_MANAGER', label: 'Gestor de Profesores' },
  { value: 'CONSULTANT', label: 'Consultor' }, { value: 'USER', label: 'Usuario general' },
];
const allSections: Section[] = ['dashboard', 'news', 'gallery', 'profile', 'semesters', 'subjects', 'schedules', 'teachers', 'teacherAccounts', 'links', 'users', 'roles'];
function canViewSection(role: string, section: Section) {
  if (role === 'SUPER_ADMIN' || role === 'CAREER_ADMIN') return true;
  if (section === 'teacherAccounts') return false;
  const read: Record<string, Section[]> = {
    CONTENT_EDITOR: ['dashboard', 'news', 'gallery', 'profile', 'links'],
    SCHEDULE_MANAGER: ['dashboard', 'semesters', 'subjects', 'schedules'],
    TEACHER_MANAGER: ['dashboard', 'teachers'],
    CONSULTANT: ['dashboard', 'news', 'gallery', 'profile', 'semesters', 'schedules', 'teachers', 'links'],
  };
  return Boolean(read[role]?.includes(section));
}
function canWriteSection(role: string, section: Section) {
  if (role === 'SUPER_ADMIN' || role === 'CAREER_ADMIN') return true;
  if (section === 'teacherAccounts') return false;
  const write: Record<string, Section[]> = {
    CONTENT_EDITOR: ['news', 'gallery', 'profile', 'links'],
    SCHEDULE_MANAGER: ['semesters', 'schedules'],
    TEACHER_MANAGER: ['teachers'],
  };
  return Boolean(write[role]?.includes(section));
}
const nav: { key: Section; label: string; icon: typeof LayoutDashboard; group?: string }[] = [
  { key: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { key: 'news', label: 'Noticias', icon: FileText, group: 'CONTENIDO' },
  { key: 'gallery', label: 'Imágenes', icon: Image },
  { key: 'profile', label: 'Carrera', icon: GraduationCap },
  { key: 'semesters', label: 'Semestres', icon: BookOpen },
  { key: 'subjects', label: 'Materias', icon: BookOpen },
  { key: 'schedules', label: 'Horarios', icon: CalendarDays },
  { key: 'teachers', label: 'Profesores', icon: Users },
  { key: 'teacherAccounts', label: 'Profesores y cuentas', icon: UserRound, group: 'ACCESOS DOCENTES' },
  { key: 'links', label: 'Enlaces', icon: LinkIcon },
  { key: 'users', label: 'Usuarios', icon: UserRound, group: 'USUARIOS Y ROLES' },
  { key: 'roles', label: 'Roles', icon: ShieldCheck },
];
const sectionTitles: Record<Section, string> = {
  dashboard: 'Dashboard', news: 'Noticias', gallery: 'Imágenes de la carrera', profile: 'Información de la carrera',
  semesters: 'Semestres académicos', subjects: 'Materias del programa', schedules: 'Horarios de clase', teachers: 'Profesores', teacherAccounts: 'Profesores y cuentas', links: 'Enlaces útiles',
  users: 'Usuarios y administradores', roles: 'Roles de acceso',
};
const weekdays: Record<number, string> = { 1: 'Lunes', 2: 'Martes', 3: 'Miércoles', 4: 'Jueves', 5: 'Viernes' };

function formatDate(value?: string) {
  if (!value) return '—';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString('es-CO', { day: '2-digit', month: 'short', year: 'numeric', timeZone: 'America/Bogota' });
}

export default function SystemsAdminPage({ user }: { user: AdminUser }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSection = searchParams.get('section') as Section | null;
  const [section, setSectionState] = useState<Section>(initialSection && allSections.includes(initialSection) ? initialSection : 'dashboard');
  const [data, setData] = useState<{ items?: Row[]; accounts?: Row[]; item?: Row; stats?: Record<string, number>; recentNews?: Row[] }>({});
  const [semesters, setSemesters] = useState<Row[]>([]);
  const [teacherOptions, setTeacherOptions] = useState<Row[]>([]);
  const [search, setSearch] = useState('');
  const [collapsed, setCollapsed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [dialog, setDialog] = useState(false);
  const [editRow, setEditRow] = useState<Row | null>(null);
  const [form, setForm] = useState<Record<string, string>>({});
  const [notice, setNotice] = useState('');
  const [error, setError] = useState('');
  const [dragUserId, setDragUserId] = useState('');
  const [roleBusyId, setRoleBusyId] = useState('');
  const [accountBusyId, setAccountBusyId] = useState('');

  function setSection(target: Section) {
    setSectionState(target);
    setSearchParams({ section: target });
  }

  async function load(target: Section = section) {
    setLoading(true); setError('');
    try {
      if (target === 'subjects') {
        const items = Object.entries(systemsCurriculum).flatMap(([semester, courses]) => courses.map((course, index) => ({ id: `${semester}-${index}`, semester: Number(semester), name: course.name, credits: course.credits })));
        setData({ items });
        return;
      }
      const response = await fetch(`/api/systems/manage?section=${target}`);
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'No se pudo cargar la información.');
      if (target === 'roles') {
        const usersResponse = await fetch('/api/systems/manage?section=users');
        const usersResult = await usersResponse.json();
        if (!usersResponse.ok) throw new Error(usersResult.error || 'No se pudieron cargar las cuentas para asignar permisos.');
        setData({ ...result, accounts: usersResult.items || [] });
      } else if (target === 'teacherAccounts') {
        const usersResponse = await fetch('/api/systems/manage?section=users');
        const usersResult = await usersResponse.json();
        if (!usersResponse.ok) throw new Error(usersResult.error || 'No se pudieron cargar las cuentas para asignar a profesores.');
        setData({ ...result, accounts: usersResult.items || [] });
      } else setData(result);
      if (target === 'semesters') setSemesters(result.items || []);
      if (target === 'schedules') {
        const teachersResponse = await fetch('/api/systems/public?section=teachers');
        const teachersResult = await teachersResponse.json();
        if (teachersResponse.ok) setTeacherOptions(teachersResult.items || []);
      }
      if (target === 'dashboard' || target === 'schedules') {
        const semestersResponse = await fetch('/api/systems/manage?section=semesters');
        const semestersData = await semestersResponse.json();
        if (semestersResponse.ok) setSemesters(semestersData.items || []);
      }
    } catch (cause) { setError(cause instanceof Error ? cause.message : 'No se pudo conectar.'); }
    finally { setLoading(false); }
  }

  useEffect(() => {
    const requested = searchParams.get('section') as Section | null;
    const valid = requested && allSections.includes(requested) ? requested : 'dashboard';
    if (valid !== section) setSectionState(valid);
  }, [searchParams]);
  useEffect(() => {
    if (!canViewSection(user.role, section)) { setError('Tu rol no tiene acceso a esta sección.'); setSection('dashboard'); return; }
    void load(section);
  }, [section, user.role]);

  const visibleItems = useMemo(() => (data.items || []).filter((item) => {
    const text = Object.values(item).filter((value) => typeof value === 'string' || typeof value === 'number').join(' ').toLocaleLowerCase('es');
    return text.includes(search.toLocaleLowerCase('es'));
  }), [data.items, search]);

  function fieldsFor(target: Section): Field[] {
    const selectedSemesterNumber = semesters.find((item) => item.id === form.semesterId)?.number || 0;
    const subjectOptions = (systemsCurriculum[selectedSemesterNumber] || []).map((item) => ({ value: item.name, label: `${item.name} · ${item.credits} cr.` }));
    if (form.subject && !subjectOptions.some((item) => item.value === form.subject)) subjectOptions.unshift({ value: form.subject, label: `${form.subject} (actual)` });
    if (target === 'news') return [
      { key: 'title', label: 'Título', required: true, wide: true, placeholder: 'Título de la noticia' },
      { key: 'category', label: 'Categoría', type: 'select', required: true, options: newsCategories },
      { key: 'status', label: 'Publicación', type: 'select', required: true, options: [{ value: 'DRAFT', label: 'Borrador' }, { value: 'PUBLISHED', label: 'Publicada' }] },
      { key: 'summary', label: 'Resumen', type: 'textarea', required: true, wide: true, placeholder: 'Texto corto que se verá en las tarjetas' },
      { key: 'body', label: 'Contenido completo', type: 'textarea', required: true, wide: true, placeholder: 'Desarrolla la noticia para la vista completa' },
      { key: 'imageUrl', label: 'Imagen (URL https o imagen del sitio)', type: 'text', required: true, wide: true, placeholder: '/images/systems-lab.png' },
    ];
    if (target === 'gallery') return [
      { key: 'title', label: 'Título', required: true, wide: true }, { key: 'category', label: 'Categoría', placeholder: 'Campus, Laboratorios, Proyectos' },
      { key: 'description', label: 'Descripción', type: 'textarea', wide: true }, { key: 'imageUrl', label: 'Imagen (URL https o imagen del sitio)', type: 'text', required: true, wide: true, placeholder: '/images/systems-lab.png' },
    ];
    if (target === 'semesters') return [
      { key: 'number', label: 'Número de semestre', type: 'number', required: true, min: 1, max: 9 },
      { key: 'academicPeriod', label: 'Periodo académico', required: true, placeholder: '2026-1' }, { key: 'name', label: 'Nombre', required: true, wide: true, placeholder: 'Primer semestre' },
    ];
    if (target === 'schedules') return [
      { key: 'semesterId', label: 'Semestre', type: 'select', required: true, options: semesters.map((item) => ({ value: item.id, label: `${item.number}.° · ${item.name} · ${item.academicPeriod}` })) },
      { key: 'subject', label: 'Materia', type: 'select', required: true, options: subjectOptions },
      { key: 'teacherName', label: 'Profesor', type: 'select', options: teacherOptions.map((teacher) => ({ value: teacher.displayName, label: teacher.displayName })) }, { key: 'weekday', label: 'Día', type: 'select', required: true, options: days },
      { key: 'startTime', label: 'Hora de inicio', type: 'time', required: true }, { key: 'endTime', label: 'Hora de fin', type: 'time', required: true },
      { key: 'classroom', label: 'Salón', placeholder: 'Bloque y aula' }, { key: 'scheduleType', label: 'Tipo', type: 'select', options: [{ value: 'CLASS', label: 'Clase' }, { value: 'OFFICE_HOURS', label: 'Atención docente' }, { value: 'ADVISORY', label: 'Asesoría' }] },
    ];
    if (target === 'teachers') return [
      { key: 'displayName', label: 'Nombre completo', required: true, wide: true }, { key: 'email', label: 'Correo electrónico', type: 'email' },
      { key: 'specialty', label: 'Área / especialidad' }, { key: 'office', label: 'Oficina / ubicación' },
      { key: 'officeHours', label: 'Horario de atención', type: 'textarea', wide: true }, { key: 'photoUrl', label: 'Foto (URL)', type: 'text', wide: true },
    ];
    if (target === 'links') return [
      { key: 'title', label: 'Nombre del enlace', required: true }, { key: 'url', label: 'Dirección HTTPS', type: 'url', required: true },
      { key: 'description', label: 'Descripción', type: 'textarea', wide: true },
    ];
    if (target === 'users') return [
      { key: 'displayName', label: 'Nombre completo', required: true, wide: true }, { key: 'email', label: 'Correo electrónico', type: 'email', required: true, wide: true },
      { key: 'password', label: 'Contraseña inicial', type: 'password', required: true, wide: true },
      { key: 'role', label: 'Rol', type: 'select', required: true, options: roleOptions },
    ];
    if (target === 'profile') return [
      { key: 'displayName', label: 'Nombre de la carrera', required: true, wide: true }, { key: 'motto', label: 'Lema', required: true, wide: true },
      { key: 'description', label: 'Descripción', type: 'textarea', required: true, wide: true }, { key: 'contactEmail', label: 'Correo de contacto', type: 'email' },
      { key: 'heroImageUrl', label: 'Imagen principal (URL)', type: 'text', required: true, wide: true },
    ];
    return [];
  }

  function openCreate(target: Section = section) {
    const defaults: Record<string, string> = { status: 'DRAFT', category: 'ACADEMIA', imageUrl: '/images/systems-lab.png', heroImageUrl: '/images/systems-lab.png', photoUrl: '', scheduleType: 'CLASS', weekday: '1', number: '1', academicPeriod: '2026-2', role: 'CAREER_ADMIN', contactEmail: '' };
    setSection(target); setEditRow(null); setForm(Object.fromEntries(fieldsFor(target).map((field) => [field.key, defaults[field.key] || '']))); setDialog(true);
  }

  function openEdit(item: Row) {
    const targetFields = fieldsFor(section);
    const source: Record<string, unknown> = { ...item };
    setEditRow(item); setForm(Object.fromEntries(targetFields.map((field) => [field.key, source[field.key] == null ? '' : String(source[field.key])]))); setDialog(true);
  }

  async function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setSaving(true); setError(''); setNotice('');
    const isProfile = section === 'profile';
    const url = editRow && !isProfile ? `/api/systems/manage/${section}/${encodeURIComponent(editRow.id)}` : '/api/systems/manage';
    const method = editRow && !isProfile ? 'PATCH' : 'POST';
    try {
      const response = await fetch(url, { method, headers: { 'content-type': 'application/json' }, body: JSON.stringify({ section, data: form }) });
      const result = await response.json(); if (!response.ok) throw new Error(result.error || 'No se pudo guardar.');
      setDialog(false); setEditRow(null); setNotice(isProfile ? 'La ficha de Ingeniería de Sistemas se actualizó.' : editRow ? 'Los cambios quedaron guardados.' : 'El registro se creó correctamente.');
      await load(section);
    } catch (cause) { setError(cause instanceof Error ? cause.message : 'No se pudo conectar.'); }
    finally { setSaving(false); }
  }

  async function toggleActive(item: Row, target = section) {
    try {
      const response = await fetch(`/api/systems/manage/${target}/${encodeURIComponent(item.id)}`, { method: 'PATCH', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ data: { active: !item.active } }) });
      const result = await response.json(); if (!response.ok) throw new Error(result.error || 'No se pudo actualizar el estado.');
      setNotice(item.active ? 'Se desactivó el registro.' : 'Se activó el registro.'); await load(target);
    } catch (cause) { setError(cause instanceof Error ? cause.message : 'No se pudo conectar.'); }
  }

  async function assignRole(account: Row, role: string) {
    if (account.role === role || roleBusyId) return;
    setRoleBusyId(account.id); setError(''); setNotice('');
    try {
      const response = await fetch(`/api/systems/manage/users/${encodeURIComponent(account.id)}`, { method: 'PATCH', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ data: { role } }) });
      const result = await response.json(); if (!response.ok) throw new Error(result.error || 'No se pudo cambiar el rol.');
      const roleName = roleOptions.find((item) => item.value === role)?.label || role;
      setData((current) => ({ ...current, accounts: (current.accounts || []).map((item) => item.id === account.id ? { ...item, role, roleName } : item) }));
      setNotice(`Permisos de ${account.displayName} actualizados.`);
    } catch (cause) { setError(cause instanceof Error ? cause.message : 'No se pudo conectar.'); }
    finally { setRoleBusyId(''); setDragUserId(''); }
  }

  async function assignTeacherAccount(teacher: Row, accountUserId: string) {
    setAccountBusyId(teacher.id); setError(''); setNotice('');
    try {
      const response = await fetch(`/api/systems/manage/teacherAccounts/${encodeURIComponent(teacher.id)}`, { method: 'PATCH', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ data: { accountUserId } }) });
      const result = await response.json(); if (!response.ok) throw new Error(result.error || 'No se pudo asociar la cuenta.');
      setNotice(accountUserId ? `Cuenta vinculada a ${teacher.displayName}.` : `Se quitó la cuenta asociada a ${teacher.displayName}.`);
      await load('teacherAccounts');
    } catch (cause) { setError(cause instanceof Error ? cause.message : 'No se pudo conectar.'); }
    finally { setAccountBusyId(''); }
  }

  async function deleteItem(item: Row) {
    if (!window.confirm(`¿Eliminar “${item.title || item.name || item.subject || item.displayName || 'este registro'}”?`)) return;
    try {
      const response = await fetch(`/api/systems/manage/${section}/${encodeURIComponent(item.id)}`, { method: 'DELETE' });
      const result = await response.json(); if (!response.ok) throw new Error(result.error || 'No se pudo eliminar.');
      setNotice('Registro eliminado.'); await load(section);
    } catch (cause) { setError(cause instanceof Error ? cause.message : 'No se pudo conectar.'); }
  }

  async function logout() { await fetch('/api/auth/logout', { method: 'POST' }); window.location.assign('/login'); }

  function renderTable() {
    const items = visibleItems;
    const canEdit = canWriteSection(user.role, section);
    if (loading) return <div className="systems-admin-empty">Cargando información de Sistemas…</div>;
    if (!items.length) return <div className="systems-admin-empty"><FileText size={27} /><strong>No hay registros aquí todavía</strong><span>Agrega la primera información de Ingeniería de Sistemas.</span>{section !== 'teacherAccounts' && canEdit && <button onClick={() => openCreate()}><Plus size={16} /> Crear registro</button>}</div>;
    if (section === 'news') return <div className="systems-admin-table-wrap"><table className="systems-admin-table"><thead><tr><th>Noticia</th><th>Categoría</th><th>Estado</th><th>Actualización</th><th>Acciones</th></tr></thead><tbody>{items.map((item) => <tr key={item.id}><td><span className="systems-admin-article"><img src={item.imageUrl} alt="" /><span><strong>{item.title}</strong><small>{item.summary}</small></span></span></td><td><span className="systems-admin-chip">{item.category}</span></td><td><span className={`systems-admin-status ${item.status === 'PUBLISHED' ? 'published' : 'draft'}`}>{item.status === 'PUBLISHED' ? 'Publicada' : 'Borrador'}</span></td><td>{formatDate(item.updatedAt)}</td><td><RowActions disabled={!canEdit} onEdit={() => openEdit(item)} onDelete={() => deleteItem(item)} /></td></tr>)}</tbody></table></div>;
    if (section === 'gallery') return <div className="systems-admin-gallery-grid">{items.map((item) => <article className={`systems-admin-gallery-card ${item.active ? '' : 'is-inactive'}`} key={item.id}><img src={item.imageUrl} alt={item.title} /><div><span className="systems-admin-chip">{item.category}</span><strong>{item.title}</strong><small>{item.description}</small><RowActions disabled={!canEdit} onEdit={() => openEdit(item)} onDelete={() => deleteItem(item)} /></div></article>)}</div>;
    if (section === 'semesters') return <div className="systems-admin-table-wrap"><table className="systems-admin-table"><thead><tr><th>Semestre</th><th>Periodo académico</th><th>Estado</th><th>Acciones</th></tr></thead><tbody>{items.map((item) => <tr key={item.id}><td><strong>{item.number}.° · {item.name}</strong></td><td>{item.academicPeriod}</td><td><ActiveBadge active={item.active} /></td><td><RowActions disabled={!canEdit} onEdit={() => openEdit(item)} onToggle={() => toggleActive(item)} active={item.active} onDelete={() => deleteItem(item)} /></td></tr>)}</tbody></table></div>;
    if (section === 'subjects') return <div className="systems-admin-table-wrap"><table className="systems-admin-table"><thead><tr><th>Materia</th><th>Semestre</th><th>Créditos</th></tr></thead><tbody>{items.map((item) => <tr key={item.id}><td><strong>{item.name}</strong></td><td>{item.semester}.° semestre</td><td>{item.credits}</td></tr>)}</tbody></table></div>;
    if (section === 'schedules') return <div className="systems-admin-table-wrap"><table className="systems-admin-table"><thead><tr><th>Materia</th><th>Semestre</th><th>Día y hora</th><th>Profesor</th><th>Salón</th><th>Acciones</th></tr></thead><tbody>{items.map((item) => <tr key={item.id}><td><strong>{item.subject}</strong><small className="systems-admin-subcell">{item.scheduleType === 'CLASS' ? 'Clase' : item.scheduleType === 'ADVISORY' ? 'Asesoría' : 'Atención docente'}</small></td><td>{item.semester} <small className="systems-admin-subcell">{item.academicPeriod}</small></td><td>{weekdays[item.weekday]}<small className="systems-admin-subcell">{item.startTime}–{item.endTime}</small></td><td>{item.teacherName || 'Por asignar'}</td><td>{item.classroom || '—'}</td><td><RowActions disabled={!canEdit} onEdit={() => openEdit(item)} onToggle={() => toggleActive(item)} active={item.active} onDelete={() => deleteItem(item)} /></td></tr>)}</tbody></table></div>;
    if (section === 'teacherAccounts') return <div className="systems-admin-table-wrap"><table className="systems-admin-table"><thead><tr><th>Profesor</th><th>Correo institucional</th><th>Cuenta asociada</th><th>Rol</th><th>Estado</th></tr></thead><tbody>{items.map((item) => <tr key={item.id}><td><span className="systems-admin-person">{item.photoUrl ? <img src={item.photoUrl} alt="" /> : <span><UserRound size={18} /></span>}<strong>{item.displayName}</strong></span></td><td>{item.email || '—'}</td><td><select className="systems-admin-account-select" value={item.accountUserId || ''} disabled={!canEdit || accountBusyId === item.id} onChange={(event) => void assignTeacherAccount(item, event.target.value)}><option value="">Sin cuenta vinculada</option>{(data.accounts || []).filter((account) => account.role !== 'USER' && (account.role !== 'CAREER_ADMIN' || item.accountUserId === account.id) && (account.active || item.accountUserId === account.id)).map((account) => <option key={account.id} value={account.id}>{account.displayName} · {account.email}</option>)}</select></td><td>{item.accountRoleName || '—'}</td><td>{item.accountUserId ? <ActiveBadge active={item.accountActive} label={item.accountActive ? 'Activa' : 'Inactiva'} /> : '—'}</td></tr>)}</tbody></table></div>;
    if (section === 'teachers') return <div className="systems-admin-table-wrap"><table className="systems-admin-table"><thead><tr><th>Profesor</th><th>Especialidad</th><th>Contacto</th><th>Atención / oficina</th><th>Estado</th><th>Acciones</th></tr></thead><tbody>{items.map((item) => <tr key={item.id}><td><span className="systems-admin-person">{item.photoUrl ? <img src={item.photoUrl} alt="" /> : <span><UserRound size={18} /></span>}<strong>{item.displayName}</strong></span></td><td>{item.specialty || '—'}</td><td>{item.email || '—'}</td><td>{item.officeHours || item.office || '—'}</td><td><ActiveBadge active={item.active} /></td><td><RowActions disabled={!canEdit} onEdit={() => openEdit(item)} onToggle={() => toggleActive(item)} active={item.active} onDelete={() => deleteItem(item)} /></td></tr>)}</tbody></table></div>;
    if (section === 'links') return <div className="systems-admin-table-wrap"><table className="systems-admin-table"><thead><tr><th>Enlace</th><th>Dirección</th><th>Descripción</th><th>Estado</th><th>Acciones</th></tr></thead><tbody>{items.map((item) => <tr key={item.id}><td><strong>{item.title}</strong></td><td><a href={item.url} target="_blank" rel="noreferrer">{item.url}</a></td><td>{item.description}</td><td><ActiveBadge active={item.active} /></td><td><RowActions disabled={!canEdit} onEdit={() => openEdit(item)} onToggle={() => toggleActive(item)} active={item.active} onDelete={() => deleteItem(item)} /></td></tr>)}</tbody></table></div>;
    if (section === 'users') return <div className="systems-admin-table-wrap"><table className="systems-admin-table"><thead><tr><th>Usuario</th><th>Rol</th><th>Estado</th><th>Cuenta</th><th>Acciones</th></tr></thead><tbody>{items.map((item) => <tr key={item.id}><td><span className="systems-admin-person"><span className="systems-admin-user-initials">{item.displayName.split(/\s+/).map((part: string) => part[0]).slice(0, 2).join('').toUpperCase()}</span><span><strong>{item.displayName}</strong><small>{item.email}</small></span></span></td><td>{item.roleName}</td><td><ActiveBadge active={item.active} /></td><td>{item.role === 'CAREER_ADMIN' ? 'Administrador' : 'Colaborador'}</td><td><RowActions onToggle={() => toggleActive(item)} active={item.active} /></td></tr>)}</tbody></table></div>;
    return null;
  }

  function renderDashboard() {
    const stats = data.stats || {};
    const quick = [
      { section: 'news' as Section, title: 'Nueva noticia', icon: Plus, tint: 'blue' },
      { section: 'gallery' as Section, title: 'Agregar imagen', icon: Image, tint: 'green' },
      { section: 'profile' as Section, title: 'Ficha de Sistemas', icon: GraduationCap, tint: 'violet' },
      { section: 'schedules' as Section, title: 'Gestionar horarios', icon: CalendarDays, tint: 'orange' },
      { section: 'teachers' as Section, title: 'Agregar profesor', icon: Users, tint: 'sky' },
      { section: 'links' as Section, title: 'Crear enlace', icon: LinkIcon, tint: 'slate' },
    ];
    return <>
      <div className="systems-admin-stats">
        <StatCard icon={FileText} value={stats.news ?? 0} label="Noticias" detail={`${stats.publishedNews ?? 0} publicadas · ${(stats.news ?? 0) - (stats.publishedNews ?? 0)} en borrador`} tint="blue" />
        <StatCard icon={GraduationCap} value="1" label="Carrera activa" detail="Ingeniería de Sistemas" tint="green" />
        <StatCard icon={CalendarDays} value={stats.schedules ?? 0} label="Horarios" detail={`${stats.semesters ?? 0} semestres activos`} tint="violet" />
        <StatCard icon={Users} value={stats.teachers ?? 0} label="Profesores" detail={`${stats.users ?? 0} cuentas asignadas a Sistemas`} tint="orange" />
      </div>
      <div className="systems-admin-dashboard-grid">
        <section className="systems-admin-card systems-admin-news-overview"><header className="systems-admin-card-header"><span className="systems-admin-heading-icon blue"><FileText size={22} /></span><div><h2>Noticias recientes</h2><p>Últimas noticias creadas o actualizadas para Ingeniería de Sistemas</p></div>{canWriteSection(user.role, 'news') && <button className="systems-admin-primary small" onClick={() => { setSection('news'); openCreate('news'); }}><Plus size={16} /> Nueva noticia</button>}</header>
          {(data.recentNews || []).length ? <div className="systems-admin-recent-news">{(data.recentNews || []).slice(0, 4).map((item) => <article key={item.id}><img src={item.imageUrl} alt="" /><span><strong>{item.title}</strong><small>{item.category}</small></span><ActiveBadge active={item.status === 'PUBLISHED'} label={item.status === 'PUBLISHED' ? 'Publicada' : 'Borrador'} />{canWriteSection(user.role, 'news') && <button className="systems-admin-icon-button" onClick={async () => { const response = await fetch('/api/systems/manage?section=news'); const result = await response.json(); if (response.ok) { const found = result.items?.find((row: Row) => row.id === item.id); setSection('news'); setData(result); if (found) { setEditRow(found); setForm(Object.fromEntries(fieldsFor('news').map((field) => [field.key, found[field.key] == null ? '' : String(found[field.key])]))); setDialog(true); } } }} aria-label={`Editar ${item.title}`}><Pencil size={16} /></button>}</article>)}</div> : <p className="systems-admin-no-recent">Las noticias que agregues aparecerán aquí.</p>}
          <button className="systems-admin-text-link" onClick={() => setSection('news')}>Ver todas las noticias <ArrowRight size={16} /></button>
        </section>
        <div className="systems-admin-side-stack">
          <section className="systems-admin-card systems-admin-quick"><header><span className="systems-admin-lightning">ϟ</span><h2>Acciones rápidas</h2></header><div className="systems-admin-quick-grid">{quick.filter(({ section: target }) => canWriteSection(user.role, target)).map(({ section: target, title, icon: Icon, tint }) => <button className={`quick-${tint}`} key={target} onClick={() => { setSection(target); if (target === 'profile') { void fetch('/api/systems/manage?section=profile').then((r) => r.json()).then((d) => { setEditRow(d.item); setForm(Object.fromEntries(fieldsFor('profile').map((field) => [field.key, d.item?.[field.key] ?? '']))); setDialog(true); }); } else { if (target === 'schedules' && !semesters.length) setNotice('Primero crea un semestre para registrar horarios.'); else openCreate(target); } }}><Icon size={19} /><span>{title}</span></button>)}</div></section>
          <section className="systems-admin-card systems-admin-health"><header><Activity size={19} /><h2>Estado del sistema</h2></header><HealthRow icon={BookOpen} label="Base de datos D1" /><HealthRow icon={LinkIcon} label="API de Sistemas" /><HealthRow icon={ShieldCheck} label="Autenticación" /></section>
        </div>
      </div>
      <div className="systems-admin-lower-grid">
        <section className="systems-admin-card systems-admin-summary"><header><span className="systems-admin-heading-icon blue"><GraduationCap size={20} /></span><div><h2>Carrera</h2><p>Administración del programa</p></div><button className="systems-admin-inline-link" onClick={() => setSection('profile')}>Gestionar</button></header><div className="systems-admin-summary-row"><span className="systems-admin-summary-image"><GraduationCap /></span><span><strong>Ingeniería de Sistemas</strong><small>Tecnología · Innovación · Futuro</small></span><ChevronRight size={18} /></div></section>
        <section className="systems-admin-card systems-admin-summary"><header><span className="systems-admin-heading-icon violet"><CalendarDays size={20} /></span><div><h2>Horarios de semestres</h2><p>Información del periodo académico</p></div><button className="systems-admin-inline-link" onClick={() => setSection('semesters')}>Ver todos</button></header>{semesters.slice(0, 3).length ? semesters.slice(0, 3).map((item) => <div className="systems-admin-semester-row" key={item.id}><span>{item.number}</span><strong>{item.name}</strong><small>{item.academicPeriod}</small></div>) : <div className="systems-admin-summary-empty">Aún no se han creado semestres.</div>}</section>
        <section className="systems-admin-card systems-admin-summary"><header><span className="systems-admin-heading-icon sky"><Users size={20} /></span><div><h2>Usuarios de Sistemas</h2><p>Cuentas asociadas a la carrera</p></div><button className="systems-admin-inline-link" onClick={() => setSection('users')}>Ver todos</button></header><button className="systems-admin-add-user" onClick={() => openCreate('users')}><Plus size={15} /> Crear cuenta para Sistemas</button><p className="systems-admin-summary-empty">Los administradores y colaboradores se asignan a Ingeniería de Sistemas desde este panel.</p></section>
      </div>
    </>;
  }

  return <main className={`systems-admin-shell ${collapsed ? 'systems-admin-collapsed' : ''}`}>
    <aside className="systems-admin-sidebar"><div className="systems-admin-brand"><span className="systems-admin-seal"><GraduationCap size={28} /></span><span><strong>CampusTouch</strong><small>Administración</small></span></div><nav className="systems-admin-nav" aria-label="Administración de Sistemas">
      {nav.filter((item) => canViewSection(user.role, item.key)).map((item) => { const Icon = item.icon; return <div key={item.key}>{item.group && <p className="systems-admin-nav-group">{item.group}</p>}<button className={`systems-admin-nav-item ${section === item.key ? 'active' : ''}`} onClick={() => setSection(item.key)} title={collapsed ? item.label : undefined}><Icon size={19} /><span>{item.label}</span></button></div>; })}
    </nav><div className="systems-admin-sidebar-campus"><span>Facultad de Ingeniería<br /><small>Universidad Mariana</small></span><small>Conocimiento que construye el futuro</small></div></aside>
    <section className="systems-admin-workspace"><header className="systems-admin-topbar"><button className="systems-admin-menu-button" onClick={() => setCollapsed((value) => !value)} aria-label="Contraer menú"><Menu size={21} /></button><div className="systems-admin-topbar-title"><strong>Facultad de Ingeniería</strong><span>Panel de Administración · Ingeniería de Sistemas</span></div><label className="systems-admin-search"><Search size={17} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Buscar en Sistemas..." /></label><button className="systems-admin-icon-button" aria-label="Notificaciones"><Bell size={19} /></button><button className="systems-admin-user-menu" onClick={logout}><span className="systems-admin-user-avatar">{user.displayName.split(/\s+/).map((part) => part[0]).slice(0,2).join('').toUpperCase()}</span><span><strong>{user.displayName}</strong><small>{user.roleName || 'Administrador'}</small></span><ChevronDown size={16} /></button></header>
      <div className="systems-admin-main"><div className="systems-admin-page-heading"><div><h1>{section === 'dashboard' ? 'Bienvenido al Panel de Administración' : sectionTitles[section]}</h1><p>{section === 'dashboard' ? 'Gestiona el contenido de CampusTouch de Ingeniería de Sistemas' : descriptions[section]}</p></div><div className="systems-admin-date"><CalendarDays size={19} /><span>{new Intl.DateTimeFormat('es-CO',{weekday:'long',day:'2-digit',month:'long',year:'numeric',timeZone:'America/Bogota'}).format(new Date())}<strong>{new Intl.DateTimeFormat('es-CO',{hour:'2-digit',minute:'2-digit',hour12:false,timeZone:'America/Bogota'}).format(new Date())}</strong></span></div></div>
        {section === 'dashboard' ? renderDashboard() : section === 'profile' ? <ProfileSection item={data.item} loading={loading} onEdit={() => { setEditRow(data.item || null); setForm(Object.fromEntries(fieldsFor('profile').map((field) => [field.key, data.item?.[field.key] ?? '']))); setDialog(true); }} /> : section === 'roles' ? <RolesSection accounts={data.accounts || []} canAssign={user.role === 'SUPER_ADMIN' || user.role === 'CAREER_ADMIN'} busyId={roleBusyId} dragId={dragUserId} onDragStart={(id) => setDragUserId(id)} onDragEnd={() => setDragUserId('')} onDropRole={assignRole} /> : <section className="systems-admin-card systems-admin-module"><header className="systems-admin-card-header"><span className="systems-admin-heading-icon blue">{(() => { const Icon = nav.find((item) => item.key === section)?.icon || FileText; return <Icon size={21} />; })()}</span><div><h2>{sectionTitles[section]}</h2><p>{section === 'news' ? `${visibleItems.length} noticias · publica o guarda borradores` : `${visibleItems.length} registros en Ingeniería de Sistemas`}</p></div>{canWriteSection(user.role, section) && section !== 'teacherAccounts' && section !== 'subjects' && <button className="systems-admin-primary small" onClick={() => openCreate()}><Plus size={16} />{section === 'news' ? 'Nueva noticia' : section === 'users' ? 'Nueva cuenta' : 'Agregar'}</button>}</header>{error && <div className="systems-admin-error-inline">{error}</div>}{renderTable()}</section>}
      </div>
    </section>
    {(notice || (error && section === 'dashboard')) && <div className={`systems-admin-toast ${error ? 'error' : ''}`} role="status">{error ? <X size={17} /> : <Check size={17} />}{error || notice}<button onClick={() => { setNotice(''); setError(''); }} aria-label="Cerrar aviso"><X size={15} /></button></div>}
    {dialog && <div className="systems-admin-dialog-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setDialog(false); }}><section className="systems-admin-dialog" role="dialog" aria-modal="true" aria-labelledby="systems-dialog-title"><header><div><span>{sectionTitles[section]}</span><h2 id="systems-dialog-title">{section === 'profile' ? 'Editar información' : editRow ? 'Editar registro' : `Crear ${singular[section] || 'registro'}`}</h2></div><button className="systems-admin-icon-button" onClick={() => setDialog(false)} aria-label="Cerrar"><X /></button></header><form onSubmit={submitForm}><div className="systems-admin-form-grid">{fieldsFor(section).map((field) => <label className={field.wide ? 'wide' : ''} key={field.key}>{field.label}{field.type === 'textarea' ? <textarea required={field.required} maxLength={field.key === 'body' || field.key === 'description' ? 5000 : 500} value={form[field.key] || ''} placeholder={field.placeholder} onChange={(event) => setForm((current) => ({ ...current, [field.key]: event.target.value }))} /> : field.type === 'select' ? <select required={field.required} value={form[field.key] || ''} onChange={(event) => setForm((current) => ({ ...current, [field.key]: event.target.value, ...(field.key === 'semesterId' ? { subject: '' } : {}) }))}><option value="">Selecciona...</option>{field.options?.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select> : <input required={field.required} type={field.type || 'text'} min={field.min} max={field.max} maxLength={field.type === 'password' ? 128 : 500} value={form[field.key] || ''} placeholder={field.placeholder} onChange={(event) => setForm((current) => ({ ...current, [field.key]: event.target.value }))} />}</label>)}</div>{error && <p className="systems-admin-form-error" role="alert">{error}</p>}<footer><span><LockKeyhole size={15} />Los cambios se guardan en la base de datos D1.</span><button type="button" className="systems-admin-secondary" onClick={() => setDialog(false)}>Cancelar</button><button type="submit" className="systems-admin-primary" disabled={saving}>{saving ? 'Guardando…' : 'Guardar cambios'}</button></footer></form></section></div>}
  </main>;
}

const descriptions: Record<Section, string> = {
  dashboard: 'Resumen general de Ingeniería de Sistemas.', news: 'Redacta, publica y organiza las noticias que ve la comunidad.', gallery: 'Administra imágenes para la página de Ingeniería de Sistemas.',
  profile: 'Actualiza los datos, el lema y la presentación pública de la carrera.', semesters: 'Organiza los periodos académicos y semestres activos.', subjects: 'Consulta las materias y créditos oficiales del plan de estudios, organizados por semestre.', schedules: 'Registra horarios de materias, atención y asesorías de lunes a viernes por semestre.',
  teachers: 'Administra la información de profesores y sus horarios de atención.', teacherAccounts: 'Consulta todos los profesores y vincula sus cuentas de CampusTouch.', links: 'Mantén los enlaces útiles de la página de Sistemas.', users: 'Crea cuentas para esta carrera y habilita o revoca su acceso.', roles: 'Consulta los roles disponibles para las cuentas de la carrera.',
};
const singular: Partial<Record<Section, string>> = { news: 'noticia', gallery: 'imagen', semesters: 'semestre', schedules: 'horario', teachers: 'profesor', links: 'enlace', users: 'cuenta' };

function StatCard({ icon: Icon, value, label, detail, tint }: { icon: typeof FileText; value: string | number; label: string; detail: string; tint: string }) {
  return <article className="systems-admin-stat"><span className={`systems-admin-stat-icon ${tint}`}><Icon size={27} /></span><span><strong>{value}</strong><b>{label}</b><small>{detail}</small></span></article>;
}
function ActiveBadge({ active, label }: { active?: boolean; label?: string }) { return <span className={`systems-admin-status ${active ? 'published' : 'draft'}`}>{label || (active ? 'Activo' : 'Inactivo')}</span>; }
function HealthRow({ icon: Icon, label }: { icon: typeof BookOpen; label: string }) { return <div className="systems-admin-health-row"><Icon size={16} /><span>{label}</span><small><i /> Operativo</small></div>; }
function RowActions({ onEdit, onDelete, onToggle, active, disabled = false }: { onEdit?: () => void; onDelete?: () => void; onToggle?: () => void; active?: boolean; disabled?: boolean }) {
  return <span className="systems-admin-row-actions">{onEdit && <button disabled={disabled} onClick={onEdit} aria-label="Editar"><Pencil size={15} /></button>}{onToggle && <button disabled={disabled} onClick={onToggle} aria-label={active ? 'Desactivar' : 'Activar'}>{active ? <Eye size={15} /> : <X size={15} />}</button>}{onDelete && <button disabled={disabled} onClick={onDelete} aria-label="Eliminar"><Trash2 size={15} /></button>}</span>;
}
function ProfileSection({ item, loading, onEdit }: { item?: Row; loading: boolean; onEdit: () => void }) {
  return <section className="systems-admin-card systems-admin-profile-card">{loading ? <div className="systems-admin-empty">Cargando ficha…</div> : item ? <><div className="systems-admin-profile-cover" style={{ backgroundImage: `linear-gradient(90deg,#061a2ce8,#071b2d55),url(${item.heroImageUrl})` }}><span>INGENIERÍA DE SISTEMAS</span><h2>{item.displayName}</h2><p>{item.motto}</p></div><div className="systems-admin-profile-body"><div><h3>Presentación pública</h3><p>{item.description}</p><small>Contacto: {item.contactEmail || 'Sin correo de contacto'}</small></div><button className="systems-admin-primary" onClick={onEdit}><Pencil size={16} /> Editar ficha</button></div></> : <div className="systems-admin-empty">No se encontró información para la carrera.</div>}</section>;
}
function RolesSection({ accounts, canAssign, busyId, dragId, onDragStart, onDragEnd, onDropRole }: { accounts: Row[]; canAssign: boolean; busyId: string; dragId: string; onDragStart: (id: string) => void; onDragEnd: () => void; onDropRole: (account: Row, role: string) => void }) {
  const roleDescriptions: Record<string, string> = {
    CAREER_ADMIN: 'Acceso completo a la administración de Ingeniería de Sistemas.',
    CONTENT_EDITOR: 'Puede editar noticias, imágenes, ficha de la carrera y enlaces.',
    SCHEDULE_MANAGER: 'Puede administrar semestres y horarios académicos.',
    TEACHER_MANAGER: 'Puede mantener el directorio y los datos de profesores.',
    CONSULTANT: 'Puede consultar la información, sin crear ni modificar registros.',
    USER: 'Sin acceso administrativo; ingresa al portal público.',
  };
  function allowDrop(event: DragEvent<HTMLElement>) { event.preventDefault(); event.dataTransfer.dropEffect = 'move'; event.currentTarget.classList.add('drag-over'); }
  function dropRole(event: DragEvent<HTMLElement>, role: string) {
    event.preventDefault(); event.currentTarget.classList.remove('drag-over');
    const accountId = event.dataTransfer.getData('text/plain') || dragId;
    const account = accounts.find((item) => item.id === accountId);
    if (account && account.role !== role) onDropRole(account, role);
  }
  return <section className="systems-admin-roles-workspace"><div className="systems-admin-roles-intro"><span><ShieldCheck size={20} /></span><div><h2>Permisos por cuenta</h2><p>Arrastra cada cuenta a la categoría de permisos que le corresponde. Los cambios se guardan en la base de datos.</p></div></div><div className="systems-admin-role-grid">{roleOptions.map((role) => {
    const members = accounts.filter((account) => account.role === role.value);
    return <article className={`systems-admin-card systems-admin-role-card ${dragId ? 'has-drag' : ''}`} key={role.value} onDragOver={allowDrop} onDragLeave={(event) => event.currentTarget.classList.remove('drag-over')} onDrop={(event) => dropRole(event, role.value)}><header><span><ShieldCheck size={20} /></span><div><h2>{role.label}</h2><p>{roleDescriptions[role.value]}</p></div><b>{members.length}</b></header><div className={`systems-admin-role-dropzone ${dragId ? 'ready' : ''}`}>{members.map((account) => <div key={account.id} className={`systems-admin-role-member ${dragId === account.id ? 'dragging' : ''}`} draggable={canAssign && !busyId} onDragStart={(event) => { event.dataTransfer.setData('text/plain', account.id); event.dataTransfer.effectAllowed = 'move'; onDragStart(account.id); }} onDragEnd={onDragEnd}><span className="systems-admin-role-member-avatar">{account.displayName.split(/\s+/).map((part: string) => part[0]).slice(0, 2).join('').toUpperCase()}</span><span><strong>{account.displayName}</strong><small>{account.email}</small></span>{busyId === account.id && <small>Guardando…</small>}</div>)}{members.length === 0 && <span className="systems-admin-role-empty">Suelta aquí una cuenta</span>}</div></article>;
  })}</div>{!canAssign && <p className="systems-admin-role-readonly">Tu cuenta puede consultar estos permisos, pero no puede reasignarlos.</p>}</section>;
}
