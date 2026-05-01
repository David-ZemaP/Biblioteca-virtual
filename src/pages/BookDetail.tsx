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
        
        const response = await fetch(`https://openlibrary.org/works/${workId}.json`);
        
        if (!response.ok) {
          throw new Error('No se pudo cargar el libro');
        }
        
        const data: any = await response.json();

        if (data.authors && data.authors.length > 0) {
          try {
            const authorPromises = data.authors.map(async (a: any) => {
              if (a.author && a.author.key) {
                const authorRes = await fetch(`https://openlibrary.org${a.author.key}.json`);
                if (authorRes.ok) {
                  const authorData = await authorRes.json();
                  return { name: authorData.name || authorData.personal_name };
                }
              }
              return { name: "Autor desconocido" };
            });
            data.authors = await Promise.all(authorPromises);
          } catch (e) {
            data.authors = [{ name: "Autor desconocido" }];
          }
        }
        
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
        ? parseInt(book.first_publish_date.match(/\d{4}/)?.[0] || '0') 
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
        <button onClick={() => navigate(-1)} className="btn btn-secondary btn-back">
          <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Volver
        </button>
        <ErrorMessage message={error || 'Libro no encontrado'} />
      </div>
    );
  }

  const descriptionText = getDescriptionText(book.description);
  const coverUrl = getCoverUrl(book.covers?.[0]);
  const publishDate = book.first_publish_date || null;

  return (
    <div className="book-detail-container">
      <button onClick={() => navigate(-1)} className="btn btn-secondary btn-back">
        <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
        Volver
      </button>

      <article className="book-detail-content">
        <div className="book-detail-grid">
          <div className="book-cover-section">
            {coverUrl ? (
              <img src={coverUrl} alt={book.title} className="book-cover-image" />
            ) : (
              <div className="book-cover-placeholder">
                <svg viewBox="0 0 24 24" width="64" height="64" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                </svg>
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

            {publishDate && (
              <div className="book-meta">
                <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="meta-icon">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                <span className="meta-label">Publicado:</span>
                <span className="meta-value">{publishDate}</span>
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
                  {book.subjects.slice(0, 15).map((subject, index) => (
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
                <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill={isFav ? "currentColor" : "none"} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
                {isFav ? 'Favorito' : 'Agregar a Favoritos'}
              </button>
              
              <a 
                href={`https://openlibrary.org/works/${workId}`} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-outline-primary"
              >
                <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
                Ver en Open Library
              </a>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}