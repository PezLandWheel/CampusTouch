import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, Building2, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { MenuOption } from '../components';
import { slides, menuOptions } from '../data/systems';

const slideLabels = ['Campus', 'Estudiantes', 'Desarrollo', 'Infraestructura'];
const slideImages = [
  '/images/campus-engineering.png',
  '/images/systems-lab.png',
  '/images/systems-lab.png',
  '/images/campus-engineering.png',
];

export default function SystemsHomePage() {
  const [slide, setSlide] = useState(0);
  const nextSlide = () => setSlide((current) => (current + 1) % slides.length);
  const previousSlide = () => setSlide((current) => (current + slides.length - 1) % slides.length);

  useEffect(() => {
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <main className="screen systems-screen systems-reference-screen">
      <div className="systems-backdrop" aria-hidden="true" />
      <div className="systems-inner">
        <header className="systems-reference-header">
          <Link className="systems-return" to="/carreras/sistemas"><ChevronLeft size={22} /> Volver a carreras</Link>
          <div className="systems-institution">
            <span className="systems-seal"><Building2 size={36} /></span>
            <span><small>Universidad</small><strong>Facultad de Ingeniería</strong><em>Conocimiento que construye el futuro</em></span>
          </div>
          <div className="systems-reference-clock"><strong>{new Intl.DateTimeFormat('es-CO', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'America/Bogota' }).format(new Date())}</strong><span>{new Intl.DateTimeFormat('es-CO', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric', timeZone: 'America/Bogota' }).format(new Date())}</span></div>
        </header>

        <div className="systems-reference-content">
          <section className="systems-showcase" aria-label="Ingeniería de Sistemas">
            <div className="systems-showcase-image" style={{ backgroundImage: `linear-gradient(90deg,rgba(3,12,21,.8),rgba(3,12,21,.08) 82%),linear-gradient(0deg,rgba(2,10,18,.88),transparent 60%),url(${slides[slide].image})` }}>
              <div className="systems-showcase-copy">
                <span className="systems-blue-rule" />
                <span className="systems-program-label">Ingeniería de</span>
                <h1>Sistemas</h1>
                <p className="systems-motto">Tecnología <i /> Innovación <i /> Futuro</p>
                <p className="systems-description">Formamos profesionales capaces de diseñar, desarrollar e innovar soluciones tecnológicas para la sociedad.</p>
                <a className="systems-more" href="#opciones">Conoce más <ChevronRight size={23} /></a>
              </div>
            </div>
            <div className="systems-gallery">
              <button className="systems-gallery-arrow" onClick={previousSlide} aria-label="Imagen anterior"><ChevronLeft /></button>
              <div className="systems-thumbnails">
                {slideLabels.map((label, index) => (
                  <button key={label} className={`systems-thumbnail ${slide === index ? 'selected' : ''}`} onClick={() => setSlide(index)} aria-label={`Mostrar ${label}`}>
                    <img src={slideImages[index]} alt="" />
                    <span>{label}</span>
                  </button>
                ))}
              </div>
              <button className="systems-gallery-arrow" onClick={nextSlide} aria-label="Siguiente imagen"><ChevronRight /></button>
            </div>
            <div className="systems-slide-dots" aria-label={`Imagen ${slide + 1} de ${slides.length}`}>
              {slides.map((item, index) => <button key={item.title} className={slide === index ? 'selected' : ''} onClick={() => setSlide(index)} aria-label={`Ir a imagen ${index + 1}`} />)}
            </div>
          </section>

          <section className="systems-reference-menu" id="opciones" aria-label="Opciones de Ingeniería de Sistemas">
            <div className="systems-reference-options">
              {menuOptions.map((item, index) => (
                <MenuOption key={item.title} item={{ ...item, subtitle: [
                  'Entérate de las últimas novedades',
                  'Consulta los horarios académicos',
                  'Horarios de clase, atención y asesorías',
                  'Accede al portal oficial de la Universidad',
                  'Inicia sesión para ver tu información',
                ][index] }} />
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
