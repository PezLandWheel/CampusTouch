import { Fragment, useEffect, useMemo, useState, type CSSProperties } from 'react';
import { CalendarDays, Clock3, GraduationCap, MapPin, Search } from 'lucide-react';

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

  useEffect(() => {
    Promise.all([
      fetch('/api/systems/public?section=semesters').then((response) => response.json()),
      fetch('/api/systems/public?section=schedules').then((response) => response.json()),
    ]).then(([semesterData, scheduleData]) => {
      setSemesters(semesterData.items || []);
      setSchedules(scheduleData.items || []);
      if (semesterData.items?.length) setSemester(semesterData.items[0].id);
    }).catch(() => undefined).finally(() => setLoading(false));
  }, []);

  useEffect(() => { const timer = window.setInterval(() => setNow(new Date()), 60_000); return () => window.clearInterval(timer); }, []);

  const filtered = useMemo(() => schedules.filter((item) =>
    (!semester || item.semesterId === semester) && (!day || String(item.weekday) === day) &&
    `${item.subject} ${item.teacherName} ${item.classroom}`.toLocaleLowerCase('es').includes(search.toLocaleLowerCase('es')),
  ), [schedules, semester, day, search]);
  const startHour = Math.min(7, ...filtered.map((item) => Math.floor(timeInMinutes(item.startTime) / 60)));
  const endHour = Math.max(16, ...filtered.map((item) => Math.ceil(timeInMinutes(item.endTime) / 60)));
  const slots = Array.from({ length: Math.max(1, (endHour - startHour) * 2) }, (_, index) => index);
  const visibleDays = days.filter((item) => !day || String(item.number) === day);

  return <main className="screen systems-catalog-screen systems-schedule-screen systems-schedule-reference">
    <header className="systems-schedule-banner"><div className="systems-schedule-banner-inner">
      <div className="systems-schedule-brand"><span className="systems-schedule-crest"><GraduationCap size={35} /></span><span><small>Universidad</small><strong>Facultad de Ingeniería</strong><em>Conocimiento que construye el futuro</em></span></div>
      <div className="systems-schedule-date"><CalendarDays size={26} /><span><strong>{new Intl.DateTimeFormat('es-CO', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'America/Bogota' }).format(now)}</strong><small>{new Intl.DateTimeFormat('es-CO', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric', timeZone: 'America/Bogota' }).format(now)}</small></span></div>
    </div></header>

    <div className="systems-catalog-inner">
      <section className="systems-catalog-panel systems-schedule-panel">
        <div className="systems-schedule-controls-row">
          <div className="systems-schedule-title"><h1>Horarios de Semestres</h1><p>Consulta los horarios de tu carrera y semestre.</p></div>
          <div className="systems-schedule-filters">
            <label><span>Periodo y semestre</span><select value={semester} onChange={(event) => setSemester(event.target.value)}><option value="">Todos los semestres</option>{semesters.map((item) => <option key={item.id} value={item.id}>{item.number}.° · {item.name} · {item.academicPeriod}</option>)}</select></label>
            <label><span>Día de la semana</span><select value={day} onChange={(event) => setDay(event.target.value)}><option value="">Toda la semana</option>{days.map((item) => <option key={item.number} value={item.number}>{item.name}</option>)}</select></label>
            <label className="systems-schedule-search"><span>Buscar en el horario</span><span className="systems-schedule-search-input"><Search size={17} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Materia, docente o salón" /></span></label>
          </div>
        </div>

        {loading ? <div className="systems-catalog-empty">Cargando horarios…</div> : filtered.length ? <div className="systems-timetable-scroll"><div className={`systems-main-timetable ${day ? 'one-day' : ''}`} style={{ '--timetable-rows': slots.length, '--day-count': visibleDays.length } as CSSProperties}>
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
            return <article className={`systems-timetable-class tone-${subjectTone(item.subject)} ${duration <= 2 ? 'compact' : ''}`} key={item.id} style={{ gridColumn: dayColumn, gridRow: `${firstSlot + 2} / span ${duration}` }} title={`${item.subject} · ${item.startTime}–${item.endTime}`}>
              <div className="systems-timetable-class-time"><Clock3 size={12} /><strong>{item.startTime}–{item.endTime}</strong></div><h2>{item.subject}</h2><p>{item.teacherName || 'Docente por asignar'}</p><span className="systems-timetable-room"><MapPin size={12} />{item.classroom || 'Salón por definir'}</span>
            </article>;
          })}
        </div></div> : <div className="systems-catalog-empty systems-schedule-empty"><CalendarDays size={30} /><strong>{schedules.length ? 'No hay clases para estos filtros' : 'Aún no se han publicado horarios'}</strong><span>{schedules.length ? 'Prueba cambiando el semestre, el día o la búsqueda.' : 'Los horarios aparecerán aquí cuando el administrador de Sistemas los registre.'}</span></div>}
      </section>
    </div>
  </main>;
}
