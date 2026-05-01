import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BookCard from '../components/BookCard';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import './Home.scss';

export function Home() {
  const [books, setBooks] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInitialBooks = async () => {
      try {
        const response = await fetch('https://openlibrary.org/search.json?q=programming&limit=12');
        if (!response.ok) {
          throw new Error('Error de red al cargar los libros');
        }
        const data = await response.json();
        setBooks(data.docs);
      } catch (err) {
        setError('No se pudieron cargar los libros populares.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialBooks();
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
          <h2>Libros Populares: Programming</h2>
        </div>
        
        {isLoading && <Loading isSkeleton={true} />}
        {error && <ErrorMessage message={error} />}
        
        {!isLoading && !error && (
          <div className="books-grid">
            {books.map((book, index) => (
              <BookCard 
                key={index} 
                id={book.key ? book.key.replace('/works/', '') : String(index)} 
                title={book.title}
                author={book.author_name ? book.author_name[0] : "Autor desconocido"}
                coverId={book.cover_i}
                year={book.first_publish_year}
                editionCount={book.edition_count}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default Home;