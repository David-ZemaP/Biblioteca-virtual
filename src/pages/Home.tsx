import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BookCard from '../components/BookCard';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import './Home.scss';

export function Home() {
  const [books] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error] = useState<string | null>(null);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  return (
    <main className="home-container">
      <section className="home-hero">
        <p className="subtitle">Biblioteca Inteligente</p>
        <h1>Encuentra libros y guarda tus favoritos</h1>
        <p className="description">
          Explora libros populares o utiliza nuestra búsqueda avanzada para encontrar exactamente lo que necesitas en la API de Open Library.
        </p>
        <div className="action-buttons">
          <Link to="/buscar" className="btn-primary">
            Ir a buscar
          </Link>
          <Link to="/favoritos" className="btn-secondary">
            Ver favoritos
          </Link>
        </div>
      </section>

      <section className="books-section">
        <div className="section-header">
          <h2>Libros Populares</h2>
        </div>
        
        {isLoading && <Loading isSkeleton={true} />}
        {error && <ErrorMessage message={error} />}
        
        {!isLoading && !error && (
          <div className="books-grid">
            {books.map((book, index) => (
              <BookCard 
                key={index} 
                id={book.id || String(index)} 
                title={book.title || "Título de prueba"}
                author={book.author || "Autor de prueba"}
                coverId={book.cover_id}
                year={book.first_publish_year}
                description={book.description}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default Home;