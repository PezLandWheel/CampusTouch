export type SystemsNewsItem = {
  id: number | string;
  category: string;
  title: string;
  summary: string;
  date: string;
  image: string;
  body: string;
  publishedAt?: string | null;
};

export const systemsNews: SystemsNewsItem[] = [
  {
    id: 1,
    category: 'ACADEMIA',
    title: 'Semana de la Ingeniería 2024',
    summary: 'Conferencias, talleres y actividades para toda la comunidad estudiantil.',
    date: '03 oct. 2024',
    image: '/images/systems-lab.png',
    body: 'La Semana de la Ingeniería reúne a estudiantes y docentes en una agenda de conferencias, talleres prácticos y espacios de encuentro. Una oportunidad para compartir proyectos y conocer nuevas áreas de la ingeniería de sistemas.',
  },
  {
    id: 2,
    category: 'EVENTOS',
    title: 'Proyecto de innovación estudiantil',
    summary: 'Estudiantes de la carrera desarrollan soluciones tecnológicas para la sociedad.',
    date: '28 sep. 2024',
    image: '/images/campus-engineering.png',
    body: 'Los equipos estudiantiles presentaron propuestas que aplican tecnología a desafíos de su entorno. La jornada incluyó demostraciones, asesoría docente y comentarios de la comunidad universitaria.',
  },
  {
    id: 3,
    category: 'INVESTIGACIÓN',
    title: 'Nuevo laboratorio de desarrollo',
    summary: 'La carrera inaugura un espacio con tecnología de última generación.',
    date: '20 sep. 2024',
    image: '/images/systems-lab.png',
    body: 'El nuevo espacio facilita el trabajo colaborativo en programación, pruebas de software y prototipado. Estará disponible para cursos, semilleros y proyectos de investigación de la carrera.',
  },
  {
    id: 4,
    category: 'CONVENIO',
    title: 'Nuevos convenios internacionales',
    summary: 'La Facultad fortalece sus lazos con universidades de la región.',
    date: '15 sep. 2024',
    image: '/images/campus-engineering.png',
    body: 'Los nuevos acuerdos amplían las oportunidades de colaboración académica e intercambio. La Facultad compartirá próximamente información sobre convocatorias y requisitos para estudiantes interesados.',
  },
  {
    id: 5,
    category: 'TECNOLOGÍA',
    title: 'Taller de Inteligencia Artificial',
    summary: 'Participa en el taller práctico sobre IA y sus aplicaciones en la industria.',
    date: '10 sep. 2024',
    image: '/images/systems-lab.png',
    body: 'El taller presenta fundamentos de inteligencia artificial y ejercicios guiados con casos de uso. La actividad está dirigida a estudiantes que quieran explorar herramientas y aplicaciones actuales.',
  },
  {
    id: 6,
    category: 'INSTITUCIONAL',
    title: 'Reconocimiento a nuestros estudiantes',
    summary: 'Estudiantes de la carrera obtienen premios en competencia nacional.',
    date: '02 sep. 2024',
    image: '/images/campus-engineering.png',
    body: 'La comunidad de Ingeniería de Sistemas celebra el reconocimiento obtenido por sus estudiantes en una competencia nacional. El resultado destaca el trabajo en equipo y la dedicación a sus proyectos.',
  },
  {
    id: 7,
    category: 'CONVOCATORIAS',
    title: 'Inscripciones abiertas para semilleros',
    summary: 'Conoce los grupos de investigación y encuentra un proyecto para participar.',
    date: '27 ago. 2024',
    image: '/images/systems-lab.png',
    body: 'Los semilleros de la carrera reciben nuevos integrantes para el próximo periodo. Cada grupo realizará una sesión informativa para presentar sus líneas y proyectos activos.',
  },
  {
    id: 8,
    category: 'ACADEMIA',
    title: 'Encuentro de egresados en tecnología',
    summary: 'Profesionales egresados compartirán sus experiencias en el sector.',
    date: '19 ago. 2024',
    image: '/images/campus-engineering.png',
    body: 'El encuentro conecta a estudiantes con egresados que trabajan en distintos campos tecnológicos. Habrá conversaciones sobre trayectorias profesionales, habilidades y retos de la industria.',
  },
  {
    id: 9,
    category: 'EVENTOS',
    title: 'Maratón universitaria de programación',
    summary: 'Forma un equipo y resuelve retos de programación durante la jornada.',
    date: '12 ago. 2024',
    image: '/images/systems-lab.png',
    body: 'La maratón propone retos de lógica y programación para equipos de distintos semestres. La inscripción se realiza en grupos y no requiere experiencia previa en competencias.',
  },
  {
    id: 10,
    category: 'INVESTIGACIÓN',
    title: 'Prototipos para ciudades inteligentes',
    summary: 'Un proyecto de aula explora sensores y datos para mejorar servicios urbanos.',
    date: '05 ago. 2024',
    image: '/images/campus-engineering.png',
    body: 'El proyecto integra dispositivos conectados y análisis de datos para crear prototipos de soluciones urbanas. Los equipos presentarán sus avances al cierre del semestre.',
  },
  {
    id: 11,
    category: 'TECNOLOGÍA',
    title: 'Clínica de desarrollo web',
    summary: 'Sesiones de acompañamiento para llevar tus ideas web a un prototipo.',
    date: '29 jul. 2024',
    image: '/images/systems-lab.png',
    body: 'La clínica ofrece sesiones prácticas para planear interfaces, construir prototipos y recibir retroalimentación. Los participantes pueden asistir con una idea propia o sumarse a un equipo.',
  },
  {
    id: 12,
    category: 'CONVENIO',
    title: 'Colaboración con empresas del sector',
    summary: 'Nuevos espacios de mentoría acercan a estudiantes al entorno profesional.',
    date: '22 jul. 2024',
    image: '/images/campus-engineering.png',
    body: 'La iniciativa contempla encuentros de mentoría y charlas técnicas con profesionales de empresas del sector. Se publicarán las fechas de inscripción por los canales institucionales.',
  },
];
