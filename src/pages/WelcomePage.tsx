import { ArrowRight, GraduationCap, Newspaper } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Background, CareerCard, Header, NewsCard } from '../components';
import { careers } from '../data/careers';
import { news } from '../data/news';

export default function WelcomePage() {
  return (
    <main className="screen welcome-screen">
      <Background />
      <div className="screen-inner welcome-inner">
        <Header />

        <div className="welcome-grid">
          <section className="glass-panel welcome-panel welcome-news" aria-labelledby="news-title">
            <div className="welcome-panel-heading">
              <Newspaper className="welcome-heading-icon" aria-hidden="true" />
              <div>
                <h1 id="news-title">Noticias destacadas</h1>
                <p>Entérate de lo último en la Facultad de Ingeniería</p>
              </div>
              <button className="see-all" type="button" aria-label="Ver todas las noticias">
                Ver todas <ArrowRight size={17} />
              </button>
            </div>
            <div className="news-stack">
              {news.map((item, index) => (
                <NewsCard key={item.title} item={item} featured={index === 0} />
              ))}
            </div>
          </section>

          <section className="glass-panel welcome-panel career-panel" aria-labelledby="careers-title">
            <div className="welcome-panel-heading">
              <GraduationCap className="welcome-heading-icon" aria-hidden="true" />
              <div>
                <h2 id="careers-title">Nuestras carreras</h2>
                <p>Selecciona una carrera para conocer más información</p>
              </div>
            </div>
            <div className="career-list">
              {careers.map((career) => (
                <CareerCard key={career} name={career} active={career === 'Ingeniería de Sistemas'} to={career === 'Ingeniería de Sistemas' ? '/carreras/sistemas' : undefined} />
              ))}
            </div>
          </section>
        </div>

        <footer className="screen-footer welcome-footer">
          <span>FACULTAD DE INGENIERÍA</span>
          <span><Link className="welcome-admin-link" to="/login">ACCESO A CAMPUS TOUCH <ArrowRight size={14} /></Link></span>
        </footer>
      </div>
    </main>
  );
}
