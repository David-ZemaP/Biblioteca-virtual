import { Link } from 'react-router-dom';
import { isFavorite, addFavorite, removeFavorite, type Book } from '../utils/storage';
import { useState } from 'react';
import './BookCard.scss';

interface BookCardProps {
  id: string;
  title: string;
  author?: string;
  coverId?: number;
  year?: number;
  description?: string;
}

export default function BookCard({
  id,
  title,
  author,
  coverId,
  year,
  description,
}: BookCardProps) {
  const [isFav, setIsFav] = useState(isFavorite(id));

  const coverUrl = coverId
    ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
    : null;

  const handleToggleFavorite = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const bookData: Book = {
      id,
      title,
      author,
      cover_id: coverId,
      first_publish_year: year,
      description,
    };

    if (isFav) {
      removeFavorite(id);
      setIsFav(false);
    } else {
      addFavorite(bookData);
      setIsFav(true);
    }
  };

  return (
    <Link to={`/libro/${id}`} className="book-card-link">
      <div className="book-card">
        {/* Cover Image */}
        <div className="book-card-image">
          {coverUrl ? (
            <img src={coverUrl} alt={title} loading="lazy" />
          ) : (
            <div className="book-card-placeholder">📖</div>
          )}

          {/* Favorite Button */}
          <button
            className={`book-card-favorite ${isFav ? 'active' : ''}`}
            onClick={handleToggleFavorite}
            title={isFav ? 'Quitar de favoritos' : 'Agregar a favoritos'}
            type="button"
          >
            {isFav ? '❤️' : '🤍'}
          </button>
        </div>

        {/* Card Content */}
        <div className="book-card-content">
          <h3 className="book-card-title" title={title}>
            {title.length > 50 ? `${title.substring(0, 50)}...` : title}
          </h3>

          {author && (
            <p className="book-card-author" title={author}>
              {author.length > 40 ? `${author.substring(0, 40)}...` : author}
            </p>
          )}

          {year && <p className="book-card-year">{year}</p>}

          {description && (
            <p className="book-card-description">
              {description.substring(0, 80)}...
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
