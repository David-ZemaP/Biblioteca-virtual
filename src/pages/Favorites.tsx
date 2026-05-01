import { useState, useEffect } from 'react';
import { getFavorites } from '../utils/storage';
import type { Book } from '../utils/storage';
import BookCard from '../components/BookCard';
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
        <p>Cargando...</p>
      </div>
    );
  }

  if (favorites.length === 0) {
    return (
      <div className="favorites-container">
        <div className="empty-state">
          <div className="empty-icon">📚</div>
          <h1>No hay favoritos aún</h1>
          <p>
            Comienza a buscar libros y agrega tus favoritos haciendo clic en el botón de corazón.
          </p>
          <a href="/buscar" className="btn btn-primary">
            Buscar Libros
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="favorites-container">
      <header className="favorites-header">
        <h1>❤️ Mis Favoritos</h1>
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
