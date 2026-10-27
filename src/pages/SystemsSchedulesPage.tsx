import { Fragment, useEffect, useMemo, useState, type CSSProperties } from 'react';
import { ArrowLeft, CalendarDays, Clock3, GraduationCap, MapPin, Search, X } from 'lucide-react';
import { Link } from 'react-router-dom';

type Semester = { id: string; number: number; name: string; academicPeriod: string };
type Schedule = { id: string; semester: string; semesterId: string; academicPeriod: string; semesterNumber: number; subject: string; teacherName: string; weekday: number; startTime: string; endTime: string; classroom: string; scheduleType: string };
const days = [
  { number: 1, name: 'Lunes' }, { number: 2, name: 'Martes' }, { number: 3, name: 'Miércoles' },
  { number: 4, name: 'Jueves' }, { number: 5, name: 'Viernes' },
];
const subjectTones = ['cyan', 'green', 'violet', 'orange', 'pink', 'blue'];
function timeInMinutes(value: string) { const [hours, minutes] = value.split(':').map(Number); return hours * 60 + minutes; }
function subjectTone(value: string) { return subjectTones[[...value].reduce((total, character) => total + character.charCodeAt(0), 0) % subjectTones.length]; }

export default function SystemsSchedulesPage() {
  const [semesters, setSemesters] = useState<Semester[]>([]);
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [semester, setSemester] = useState('');
  const [day, setDay] = useState('');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [now, setNow] = useState(new Date());
  const [selectedSchedule, setSelectedSchedule] = useState<Schedule | null>(null);

  useEffect(() => {
    Promise.all([
      fetch('/api/systems/public?section=semesters').then((response) => response.json()),
      fetch('/api/systems/public?section=schedules').then((response) => response.json()),
    ]).then(([semesterData, scheduleData]) => {
      setSemesters(semesterData.items || []);
      setSchedules(scheduleData.items || []);
    }).catch(() => undefined).finally(() => setLoading(false));
  }, []);

  useEffect(() => { const timer = window.setInterval(() => setNow(new Date()), 60_000); return () => window.clearInterval(timer); }, []);

  useEffect(() => {
    if (!selectedSchedule) return;
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === 'Escape') setSelectedSchedule(null); };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [selectedSchedule]);

  const filtered = useMemo(() => schedules.filter((item) =>
    (!semester || item.semesterId === semester) && (!day || String(item.weekday) === day) &&
    `${item.subject} ${item.teacherName} ${item.classroom}`.toLocaleLowerCase('es').includes(search.toLocaleLowerCase('es')),
  ), [schedules, semester, day, search]);
  const startHour = Math.min(7, ...filtered.map((item) => Math.floor(timeInMinutes(item.startTime) / 60)));
  const endHour = Math.max(16, ...filtered.map((item) => Math.ceil(timeInMinutes(item.endTime) / 60)));
  const slots = Array.from({ length: Math.max(1, (endHour - startHour) * 2) }, (_, index) => index);
  const visibleDays = days.filter((item) => !day || String(item.number) === day);
  const selectedSemester = semesters.find((item) => item.id === semester);
  const selectedSemesterSchedules = schedules.filter((item) => item.semesterId === semester);

  return <main className={`screen systems-catalog-screen systems-schedule-screen systems-schedule-reference ${semester ? 'systems-schedule-expanded' : ''}`}>
    <header className="systems-schedule-banner"><div className="systems-schedule-banner-inner">
      <div className="systems-schedule-brand"><span className="systems-schedule-crest"><GraduationCap size={35} /></span><span><small>Universidad</small><strong>Facultad de Ingeniería</strong><em>Conocimiento que construye el futuro</em></span></div>
      <div className="systems-schedule-date"><CalendarDays size={26} /><span><strong>{new Intl.DateTimeFormat('es-CO', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'America/Bogota' }).format(now)}</strong><small>{new Intl.DateTimeFormat('es-CO', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric', timeZone: 'America/Bogota' }).format(now)}</small></span></div>
    </div></header>

    <div className="systems-catalog-inner">
      <section className="systems-catalog-panel systems-schedule-panel">
        {loading ? <div className="systems-catalog-empty">Cargando horarios…</div> : !semester ? <>
          <div className="systems-schedule-semester-heading"><div className="systems-schedule-list-heading-copy"><Link className="systems-schedule-back" to="/carreras/sistemas/inicio"><ArrowLeft size={17} /> Volver a Ingeniería de Sistemas</Link><div className="systems-schedule-title"><h1>Horarios de Semestres</h1><p>Selecciona un semestre para consultar todos sus horarios.</p></div></div><span>{semesters.length} {semesters.length === 1 ? 'semestre disponible' : 'semestres disponibles'}</span></div>
          {semesters.length ? <div className="systems-schedule-semester-grid">{semesters.map((item) => {
            const semesterSchedules = schedules.filter((schedule) => schedule.semesterId === item.id);
            return <button className="systems-schedule-semester-card" key={item.id} type="button" onClick={() => { setSemester(item.id); setDay(''); setSearch(''); }}>
              <span className="systems-schedule-semester-number">{item.number}.°</span>
              <span className="systems-schedule-semester-card-title"><strong>{item.name}</strong><small>Periodo {item.academicPeriod}</small></span>
              <span className="systems-schedule-semester-count"><CalendarDays size={17} />{semesterSchedules.length} {semesterSchedules.length === 1 ? 'clase' : 'clases'}</span>
              <span className="systems-schedule-semester-action">Ver horario <span aria-hidden="true">→</span></span>
            </button>;
          })}</div> : <div className="systems-catalog-empty systems-schedule-empty"><CalendarDays size={30} /><strong>Aún no hay semestres disponibles</strong><span>Los semestres aparecerán aquí cuando sean publicados.</span></div>}
        </> : <>
          <div className="systems-schedule-controls-row">
            <div className="systems-schedule-selected-title"><button className="systems-schedule-back" type="button" onClick={() => { setSemester(''); setDay(''); setSearch(''); }}><ArrowLeft size={17} /> Todos los semestres</button><div className="systems-schedule-title"><h1>{selectedSemester?.name || 'Horario del semestre'} · {selectedSemester?.academicPeriod}</h1><p>Consulta todas las clases de la semana.</p></div></div>
            <div className="systems-schedule-filters">
              <label><span>Día de la semana</span><select value={day} onChange={(event) => setDay(event.target.value)}><option value="">Toda la semana</option>{days.map((item) => <option key={item.number} value={item.number}>{item.name}</option>)}</select></label>
              <label className="systems-schedule-search"><span>Buscar en el horario</span><span className="systems-schedule-search-input"><Search size={17} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Materia, docente o salón" /></span></label>
            </div>
          </div>

          {filtered.length ? <div className="systems-timetable-scroll"><div className={`systems-main-timetable ${day ? 'one-day' : ''}`} style={{ '--timetable-rows': slots.length, '--day-count': visibleDays.length } as CSSProperties}>
          <div className="systems-timetable-corner">Hora</div>
          {visibleDays.map((item) => <div className="systems-timetable-day-heading" key={item.number}><strong>{item.name}</strong></div>)}
          {slots.map((slot) => <Fragment key={`slot-${slot}`}>
            <div className={`systems-timetable-time ${slot % 2 ? 'half-hour' : ''}`} style={{ gridColumn: 1, gridRow: slot + 2 }}>{slot % 2 === 0 ? `${String(startHour + slot / 2).padStart(2, '0')}:00` : ''}</div>
            {visibleDays.map((item, index) => <div className="systems-timetable-cell" key={`${item.number}-${slot}`} style={{ gridColumn: index + 2, gridRow: slot + 2 }} />)}
          </Fragment>)}
          {filtered.map((item) => {
            const dayColumn = visibleDays.findIndex((visibleDay) => visibleDay.number === item.weekday) + 2;
            const firstSlot = Math.max(0, Math.floor((timeInMinutes(item.startTime) - startHour * 60) / 30));
            const lastSlot = Math.max(firstSlot + 1, Math.ceil((timeInMinutes(item.endTime) - startHour * 60) / 30));
            const duration = lastSlot - firstSlot;
            return <article className={`systems-timetable-class tone-${subjectTone(item.subject)} ${duration <= 2 ? 'compact' : ''}`} key={item.id} style={{ gridColumn: dayColumn, gridRow: `${firstSlot + 2} / span ${duration}` }} title={`${item.subject} · ${item.startTime}–${item.endTime}`} role="button" tabIndex={0} aria-label={`Ver detalles de ${item.subject}`} onClick={() => setSelectedSchedule(item)} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); setSelectedSchedule(item); } }}>
              <div className="systems-timetable-class-time"><Clock3 size={12} /><strong>{item.startTime}–{item.endTime}</strong></div><h2>{item.subject}</h2><p>{item.teacherName || 'Docente por asignar'}</p><span className="systems-timetable-room"><MapPin size={12} />{item.classroom || 'Salón por definir'}</span>
            </article>;
          })}
          </div></div> : <div className="systems-catalog-empty systems-schedule-empty"><CalendarDays size={30} /><strong>{selectedSemesterSchedules.length ? 'No hay clases para estos filtros' : 'Aún no se han publicado horarios para este semestre'}</strong><span>{selectedSemesterSchedules.length ? 'Prueba cambiando el día o la búsqueda.' : 'Los horarios aparecerán aquí cuando el administrador de Sistemas los registre.'}</span></div>}
        </>}
      </section>
    </div>
    {selectedSchedule && <div className="systems-schedule-modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setSelectedSchedule(null); }}>
      <section className={`systems-schedule-modal tone-${subjectTone(selectedSchedule.subject)}`} role="dialog" aria-modal="true" aria-labelledby="systems-schedule-modal-title">
        <button className="systems-schedule-modal-close" type="button" aria-label="Cerrar detalles" onClick={() => setSelectedSchedule(null)}><X size={22} /></button>
        <span className="systems-schedule-modal-day">{days.find((item) => item.number === selectedSchedule.weekday)?.name || 'Día por confirmar'} · {selectedSchedule.semester}</span>
        <h2 id="systems-schedule-modal-title">{selectedSchedule.subject}</h2>
        <div className="systems-schedule-modal-detail"><Clock3 /><span><small>Horario</small><strong>{selectedSchedule.startTime} – {selectedSchedule.endTime}</strong></span></div>
        <div className="systems-schedule-modal-detail"><GraduationCap /><span><small>Docente</small><strong>{selectedSchedule.teacherName || 'Por asignar'}</strong></span></div>
        <div className="systems-schedule-modal-detail"><MapPin /><span><small>Salón</small><strong>{selectedSchedule.classroom || 'Por definir'}</strong></span></div>
      </section>
    </div>}
  </main>;
}
