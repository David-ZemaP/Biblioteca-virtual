import './About.scss';

export default function About() {
  return (
    <div className="about-container">
      <div className="about-content">
        <header className="about-header">
          <h1>📚 Biblioteca Inteligente</h1>
          <p className="about-subtitle">Descubre y explora millones de libros</p>
        </header>

        <section className="about-section">
          <h2>¿Qué es Biblioteca Inteligente?</h2>
          <p>
            Biblioteca Inteligente es una aplicación web moderna que te permite buscar, 
            descubrir y guardar tus libros favoritos de una forma fácil e intuitiva. 
            Nuestra plataforma está diseñada para que los amantes de la lectura puedan 
            acceder a información detallada sobre millones de obras literarias.
          </p>
        </section>

        <section className="about-section">
          <h2>📖 Características Principales</h2>
          <ul className="features-list">
            <li>🔍 <strong>Búsqueda Avanzada:</strong> Encuentra libros por título, autor o tema</li>
            <li>❤️ <strong>Guardar Favoritos:</strong> Crea tu propia colección de libros preferidos</li>
            <li>✨ <strong>Información Detallada:</strong> Portadas, sinopsis, fechas de publicación y más</li>
            <li>🌙 <strong>Modo Oscuro:</strong> Interfaz adaptada para cualquier momento del día</li>
            <li>📱 <strong>Diseño Responsive:</strong> Accede desde cualquier dispositivo</li>
          </ul>
        </section>

        <section className="about-section">
          <h2>🌐 Fuente de Datos</h2>
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
          <h2>💻 Tecnología</h2>
          <p>
            Biblioteca Inteligente está construida con tecnologías modernas del frontend:
          </p>
          <ul className="tech-list">
            <li><strong>React:</strong> Biblioteca JavaScript para interfaces de usuario</li>
            <li><strong>TypeScript:</strong> Tipado estático para mayor confiabilidad</li>
            <li><strong>Vite:</strong> Herramienta de construcción rápida y moderna</li>
            <li><strong>React Router:</strong> Navegación declarativa entre páginas</li>
            <li><strong>CSS Puro:</strong> Estilos eficientes y sin dependencias</li>
          </ul>
        </section>

        <section className="about-section">
          <h2>📜 Licencia y Atribuciones</h2>
          <p>
            Este proyecto es un ejemplo educativo que demuestra las mejores prácticas 
            en desarrollo web con React y TypeScript. Los datos provienen de Open Library, 
            que está disponible bajo la licencia Open Data Commons.
          </p>
        </section>

        <footer className="about-footer">
          <p>
            💡 <em>Construido con pasión por aprender React y TypeScript</em>
          </p>
        </footer>
      </div>
    </div>
  );
}
