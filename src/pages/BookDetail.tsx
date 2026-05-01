import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import { isFavorite, addFavorite, removeFavorite, type Book } from '../utils/storage';
import './BookDetail.scss';

interface OpenLibraryBook {
  key: string;
  title: string;
  description?: string | { value: string };
  first_publish_date?: string;
  covers?: number[];
  subject_places?: string[];
  subjects?: string[];
  authors?: Array<{ name: string }>;
}

export default function BookDetail() {
  const { workId } = useParams<{ workId: string }>();
  const navigate = useNavigate();
  
  const [book, setBook] = useState<OpenLibraryBook | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    if (!workId) {
      setError('ID del libro no encontrado');
      setLoading(false);
      return;
    }

    const fetchBook = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(
          `https://openlibrary.org/works/${workId}.json`
        );
        
        if (!response.ok) {
          throw new Error('No se pudo cargar el libro');
        }
        
        const data: OpenLibraryBook = await response.json();
        setBook(data);
        
        setIsFav(isFavorite(workId));
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
        setError(`Error al cargar el libro: ${errorMessage}`);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [workId]);

  const handleToggleFavorite = () => {
    if (!workId || !book) return;

    const bookToSave: Book = {
      id: workId,
      title: book.title,
      author: book.authors?.[0]?.name,
      cover_id: book.covers?.[0],
      first_publish_year: book.first_publish_date
        ? new Date(book.first_publish_date).getFullYear()
        : undefined,
      description: getDescriptionText(book.description),
    };

    if (isFav) {
      removeFavorite(workId);
      setIsFav(false);
    } else {
      addFavorite(bookToSave);
      setIsFav(true);
    }
  };

  const getDescriptionText = (
    description: string | { value: string } | undefined
  ): string | undefined => {
    if (!description) return undefined;
    if (typeof description === 'string') return description;
    if (typeof description === 'object' && 'value' in description) {
      return description.value;
    }
    return undefined;
  };

  const getCoverUrl = (coverId: number | undefined): string | null => {
    if (!coverId) return null;
    return `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`;
  };

  if (loading) {
    return (
      <div className="book-detail-container">
        <Loading isSkeleton={true} />
      </div>
    );
  }

  if (error || !book) {
    return (
      <div className="book-detail-container">
        <button
          onClick={() => navigate(-1)}
          className="btn btn-secondary btn-back"
        >
          ← Volver
        </button>
        <ErrorMessage message={error || 'Libro no encontrado'} />
      </div>
    );
  }

  const descriptionText = getDescriptionText(book.description);
  const coverUrl = getCoverUrl(book.covers?.[0]);
  const publishYear = book.first_publish_date
    ? new Date(book.first_publish_date).getFullYear()
    : null;

  return (
    <div className="book-detail-container">
      <button
        onClick={() => navigate(-1)}
        className="btn btn-secondary btn-back"
      >
        ← Volver
      </button>

      <article className="book-detail-content">
        <div className="book-detail-grid">
          <div className="book-cover-section">
            {coverUrl ? (
              <img
                src={coverUrl}
                alt={book.title}
                className="book-cover-image"
              />
            ) : (
              <div className="book-cover-placeholder">
                <span>📖</span>
              </div>
            )}
          </div>

          <div className="book-info-section">
            <header className="book-header">
              <h1 className="book-title">{book.title}</h1>
              {book.authors && book.authors.length > 0 && (
                <p className="book-author">
                  por <strong>{book.authors.map(a => a.name).join(', ')}</strong>
                </p>
              )}
            </header>

            {publishYear && (
              <div className="book-meta">
                <span className="meta-label">📅 Publicado:</span>
                <span className="meta-value">{publishYear}</span>
              </div>
            )}

            {descriptionText && (
              <div className="book-description">
                <h2>Sinopsis</h2>
                <p>{descriptionText}</p>
              </div>
            )}

            {book.subjects && book.subjects.length > 0 && (
              <div className="book-subjects">
                <h2>Temas</h2>
                <div className="subjects-list">
                  {book.subjects.slice(0, 10).map((subject, index) => (
                    <span key={index} className="subject-tag">
                      {subject}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {book.subject_places && book.subject_places.length > 0 && (
              <div className="book-places">
                <h2>Lugares</h2>
                <div className="places-list">
                  {book.subject_places.slice(0, 5).map((place, index) => (
                    <span key={index} className="place-tag">
                      {place}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="book-actions">
              <button
                onClick={handleToggleFavorite}
                className={`btn btn-favorite ${isFav ? 'active' : ''}`}
                title={isFav ? 'Quitar de favoritos' : 'Agregar a favoritos'}
              >
                {isFav ? '❤️ Favorito' : '🤍 Agregar a Favoritos'}
              </button>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
