import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getFavorites } from '../utils/storage';
import type { Book } from '../utils/storage';
import BookCard from '../components/BookCard';
import Loading from '../components/Loading';
import './Favorites.scss';

export default function Favorites() {
  const [favorites, setFavorites] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadedFavorites = getFavorites();
    setFavorites(loadedFavorites);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      const updated = getFavorites();
      setFavorites(updated);
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  if (isLoading) {
    return (
      <div className="favorites-container">
        <Loading />
      </div>
    );
  }

  if (favorites.length === 0) {
    return (
      <div className="favorites-container">
        <div className="empty-state">
          <svg className="empty-icon" viewBox="0 0 24 24" width="64" height="64" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
          </svg>
          <h1>Tu colección está vacía</h1>
          <p>
            Comienza a explorar libros y agrégalos a tus favoritos haciendo clic en el ícono de corazón.
          </p>
          <Link to="/buscar" className="btn btn-primary">
            Explorar libros
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="favorites-container">
      <header className="favorites-header">
        <h1>
          <svg viewBox="0 0 24 24" width="32" height="32" stroke="currentColor" strokeWidth="2.5" fill="currentColor" strokeLinecap="round" strokeLinejoin="round" className="title-icon">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
          Mis Favoritos
        </h1>
        <p className="favorites-count">
          Tienes <strong>{favorites.length}</strong> {favorites.length === 1 ? 'libro' : 'libros'} guardado(s)
        </p>
      </header>

      <div className="books-grid">
        {favorites.map((book) => (
          <BookCard
            key={book.id}
            id={book.id}
            title={book.title}
            author={book.author}
            coverId={book.cover_id}
            year={book.first_publish_year}
            description={book.description}
          />
        ))}
      </div>
    </div>
  );
}