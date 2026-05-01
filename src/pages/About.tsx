import './About.scss';

export default function About() {
  return (
    <div className="about-container">
      <div className="about-content">
        <header className="about-header">
          <h1>
            <svg viewBox="0 0 24 24" width="36" height="36" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" className="header-icon">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
            </svg>
            Biblioteca Inteligente
          </h1>
          <p className="about-subtitle">Descubre y explora millones de libros</p>
        </header>

        <section className="about-section">
          <h2>
            <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="section-icon">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="16" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12.01" y2="8"></line>
            </svg>
            ¿Qué es Biblioteca Inteligente?
          </h2>
          <p>
            Biblioteca Inteligente es una aplicación web moderna que te permite buscar, 
            descubrir y guardar tus libros favoritos de una forma fácil e intuitiva. 
            Nuestra plataforma está diseñada para que los amantes de la lectura puedan 
            acceder a información detallada sobre millones de obras literarias.
          </p>
        </section>

        <section className="about-section">
          <h2>
            <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="section-icon">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
            Características Principales
          </h2>
          <ul className="features-list">
            <li>
              <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="list-icon">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <span><strong>Búsqueda Avanzada:</strong> Encuentra libros por título, autor o tema</span>
            </li>
            <li>
              <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="list-icon">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
              <span><strong>Guardar Favoritos:</strong> Crea tu propia colección de libros preferidos</span>
            </li>
            <li>
              <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="list-icon">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
              <span><strong>Información Detallada:</strong> Portadas, sinopsis, fechas de publicación y más</span>
            </li>
            <li>
              <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="list-icon">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
              <span><strong>Modo Oscuro:</strong> Interfaz adaptada para cualquier momento del día</span>
            </li>
            <li>
              <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="list-icon">
                <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
                <line x1="12" y1="18" x2="12.01" y2="18"></line>
              </svg>
              <span><strong>Diseño Responsive:</strong> Accede desde cualquier dispositivo</span>
            </li>
          </ul>
        </section>

        <section className="about-section">
          <h2>
            <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="section-icon">
              <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
              <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
              <line x1="6" y1="6" x2="6.01" y2="6"></line>
              <line x1="6" y1="18" x2="6.01" y2="18"></line>
            </svg>
            Fuente de Datos
          </h2>
          <p>
            Biblioteca Inteligente utiliza la <strong>API pública de Open Library</strong>, 
            un proyecto sin fines de lucro que proporciona acceso a información bibliográfica 
            de millones de libros de todo el mundo. Open Library es mantenida por la 
            <a href="https://archive.org/" target="_blank" rel="noopener noreferrer"> 
              {' '}Internet Archive
            </a> y ofrece datos de manera abierta y gratuita.
          </p>
          <p className="api-info">
            <strong>Endpoint de API:</strong> <code>https://openlibrary.org/api/</code>
          </p>
        </section>

        <section className="about-section">
          <h2>
            <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="section-icon">
              <polyline points="16 18 22 12 16 6"></polyline>
              <polyline points="8 6 2 12 8 18"></polyline>
            </svg>
            Tecnología
          </h2>
          <p>
            Biblioteca Inteligente está construida con tecnologías modernas del frontend:
          </p>
          <ul className="tech-list">
            <li><strong>React:</strong> Biblioteca JavaScript para interfaces de usuario</li>
            <li><strong>TypeScript:</strong> Tipado estático para mayor confiabilidad</li>
            <li><strong>Vite:</strong> Herramienta de construcción rápida y moderna</li>
            <li><strong>React Router:</strong> Navegación declarativa entre páginas</li>
            <li><strong>SCSS:</strong> Estilos eficientes y modulares</li>
          </ul>
        </section>

        <footer className="about-footer">
          <p>
            <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline', verticalAlign: 'middle', marginRight: '6px' }}>
              <polyline points="20 12 20 22.5 12 18.5 4 22.5 4 12"></polyline>
              <rect x="2" y="2" width="20" height="10" rx="2" ry="2"></rect>
              <line x1="12" y1="2" x2="12" y2="12"></line>
            </svg>
            <em>Construido con pasión por aprender React y TypeScript</em>
          </p>
        </footer>
      </div>
    </div>
  );
}