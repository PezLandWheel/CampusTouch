import { useEffect, useMemo, useState } from 'react';
import {
  ArrowRight,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Cpu,
  FlaskConical,
  GraduationCap,
  Landmark,
  Megaphone,
  Newspaper,
  Search,
  X,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { systemsNews, type SystemsNewsItem } from '../data/systemsNews';

const PAGE_SIZE = 6;

const categories: { name: string; icon: LucideIcon }[] = [
  { name: 'Todas las noticias', icon: Newspaper },
  { name: 'Eventos', icon: CalendarDays },
  { name: 'Academia', icon: GraduationCap },
  { name: 'Investigación', icon: FlaskConical },
  { name: 'Tecnología', icon: Cpu },
  { name: 'Institucional', icon: Landmark },
  { name: 'Convocatorias', icon: Megaphone },
];

function formatDate(value: Date) {
  return value.toLocaleDateString('es-CO', {
    weekday: 'short', day: '2-digit', month: 'short', year: 'numeric', timeZone: 'America/Bogota',
  });
}

export default function SystemsNewsPage() {
  const [now, setNow] = useState(new Date());
  const [newsItems, setNewsItems] = useState<SystemsNewsItem[]>(systemsNews);
  const [category, setCategory] = useState('Todas las noticias');
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [selectedNews, setSelectedNews] = useState<SystemsNewsItem | null>(null);

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 30_000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    fetch('/api/systems/public?section=news').then(async (response) => response.ok ? response.json() : null).then((data) => {
      if (!data?.items?.length) return;
      setNewsItems(data.items.map((item: SystemsNewsItem) => ({ ...item, date: item.publishedAt ? formatDate(new Date(item.publishedAt)) : '' })));
    }).catch(() => undefined);
  }, []);

  const filteredNews = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase('es');
    return newsItems.filter((item) => {
      const matchesCategory = category === 'Todas las noticias' || item.category.toLocaleLowerCase('es') === category.toLocaleLowerCase('es');
      const searchableText = `${item.title} ${item.summary} ${item.category}`.toLocaleLowerCase('es');
      return matchesCategory && (!normalizedQuery || searchableText.includes(normalizedQuery));
    });
  }, [category, query, newsItems]);

  const totalPages = Math.max(1, Math.ceil(filteredNews.length / PAGE_SIZE));
  const visibleNews = filteredNews.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function changeCategory(nextCategory: string) {
    setCategory(nextCategory);
    setPage(1);
  }

  function changeQuery(value: string) {
    setQuery(value);
    setPage(1);
  }

  function goToPage(nextPage: number) {
    setPage(Math.max(1, Math.min(totalPages, nextPage)));
  }

  return (
    <main className="screen systems-news-screen">
      <div className="systems-news-backdrop" aria-hidden="true" />
      <div className="systems-news-inner">
        <header className="systems-reference-header news-reference-header">
          <Link className="systems-return news-return" to="/carreras/sistemas/inicio">
            <ChevronLeft size={22} /> <span>Volver a Ingeniería<br />de Sistemas</span>
          </Link>
          <div className="systems-institution">
            <span className="systems-seal"><Landmark size={36} /></span>
            <span><small>Universidad</small><strong>Facultad de Ingeniería</strong><em>Conocimiento que construye el futuro</em></span>
          </div>
          <div className="systems-reference-clock">
            <strong>{new Intl.DateTimeFormat('es-CO', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'America/Bogota' }).format(now)}</strong>
            <span>{formatDate(now)}</span>
          </div>
        </header>

        <div className="systems-news-layout">
          <section className="systems-news-main" aria-labelledby="systems-news-title">
            <div className="systems-news-heading">
              <Newspaper className="systems-news-heading-icon" aria-hidden="true" />
              <div>
                <h1 id="systems-news-title">Noticias de Ingeniería de Sistemas</h1>
                <p>Entérate de las últimas novedades, eventos, proyectos y oportunidades.</p>
              </div>
            </div>

            {visibleNews.length > 0 ? (
              <div className="systems-news-grid">
                {visibleNews.map((item, index) => (
                  <article className="systems-news-card" key={item.id}>
                    <div className={`systems-news-photo news-photo-${index % 6}`}>
                      <img src={item.image} alt="" />
                    </div>
                    <div className="systems-news-card-body">
                      <div className="systems-news-meta">
                        <span className={`news-category-chip chip-${item.category.toLowerCase().replace(/\s+/g, '-')}`}>{item.category}</span>
                        <time><CalendarDays size={15} /> {item.date}</time>
                      </div>
                      <h2>{item.title}</h2>
                      <p>{item.summary}</p>
                      <button className="systems-news-readmore" onClick={() => setSelectedNews(item)}>
                        Leer más <ArrowRight size={17} />
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="systems-news-empty">
                <Search size={30} />
                <h2>No encontramos noticias</h2>
                <p>Prueba con otra búsqueda o selecciona una categoría diferente.</p>
              </div>
            )}

            <nav className="systems-news-pagination" aria-label="Paginación de noticias">
              <button onClick={() => goToPage(page - 1)} disabled={page === 1} aria-label="Página anterior"><ChevronLeft /></button>
              {Array.from({ length: totalPages }, (_, index) => index + 1).map((number) => (
                <button key={number} className={page === number ? 'current' : ''} onClick={() => goToPage(number)} aria-current={page === number ? 'page' : undefined}>{number}</button>
              ))}
              <button onClick={() => goToPage(page + 1)} disabled={page === totalPages} aria-label="Página siguiente"><ChevronRight /></button>
            </nav>
          </section>

          <aside className="systems-news-sidebar" aria-label="Buscar y filtrar noticias">
            <div className="systems-news-search">
              <Search size={25} aria-hidden="true" />
              <input value={query} onChange={(event) => changeQuery(event.target.value)} placeholder="Buscar noticias..." aria-label="Buscar noticias" />
              {query && <button onClick={() => changeQuery('')} aria-label="Limpiar búsqueda"><X size={17} /></button>}
            </div>
            <h2>Categorías</h2>
            <div className="systems-news-categories">
              {categories.map(({ name, icon: Icon }) => (
                <button key={name} className={`systems-news-category ${category === name ? 'active' : ''}`} onClick={() => changeCategory(name)} aria-pressed={category === name}>
                  <Icon size={27} /> <span>{name}</span> <ChevronRight size={21} />
                </button>
              ))}
            </div>
          </aside>
        </div>
      </div>

      {selectedNews && (
        <div className="systems-news-modal-backdrop" role="presentation" onClick={() => setSelectedNews(null)}>
          <article className="systems-news-modal" role="dialog" aria-modal="true" aria-labelledby="news-modal-title" onClick={(event) => event.stopPropagation()}>
            <button className="systems-news-modal-close" onClick={() => setSelectedNews(null)} aria-label="Cerrar noticia"><X /></button>
            <img src={selectedNews.image} alt="" />
            <span className="news-category-chip">{selectedNews.category}</span>
            <h2 id="news-modal-title">{selectedNews.title}</h2>
            <time>{selectedNews.date}</time>
            <p>{selectedNews.body}</p>
          </article>
        </div>
      )}
    </main>
  );
}
