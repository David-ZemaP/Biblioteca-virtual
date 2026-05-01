import { useState, useEffect } from 'react';
import { SearchBar, type SearchParams } from '../components/SearchBar';
import { FilterPanel, type FilterParams } from '../components/FilterPanel';
import BookCard from '../components/BookCard';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import { searchBooks } from '../services/openLibraryService';
import './Search.scss';

export function Search() {
  const [books, setBooks] = useState<any[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filterParams, setFilterParams] = useState<FilterParams>({
    minYear: '',
    maxYear: '',
    language: '',
    sortBy: ''
  });
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (params: SearchParams) => {
    setHasSearched(true);
    
    if (!params.query && !params.title && !params.author) return;

    setIsLoading(true);
    setError(null);

    try {
      const data = await searchBooks(params);
      setBooks(data.docs || []);
    } catch (err) {
      setError('Ocurrió un error al buscar los libros.');
      setBooks([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilterChange = (filters: FilterParams) => {
    setFilterParams(filters);
  };

  useEffect(() => {
    let result = [...books];

    if (filterParams.minYear) {
      const min = parseInt(filterParams.minYear, 10);
      result = result.filter(b => b.first_publish_year >= min);
    }

    if (filterParams.maxYear) {
      const max = parseInt(filterParams.maxYear, 10);
      result = result.filter(b => b.first_publish_year <= max);
    }

    if (filterParams.language) {
      result = result.filter(b => b.language && b.language.includes(filterParams.language));
    }

    if (filterParams.sortBy === 'first_publish_year') {
      result.sort((a, b) => (b.first_publish_year || 0) - (a.first_publish_year || 0));
    } else if (filterParams.sortBy === 'edition_count') {
      result.sort((a, b) => (b.edition_count || 0) - (a.edition_count || 0));
    }

    setFilteredBooks(result);
  }, [books, filterParams]);

  return (
    <main className="search-page-container">
      <section className="search-header-section">
        <h1>Buscador Avanzado</h1>
        <SearchBar onSearch={handleSearch} />
      </section>

      <div className="search-layout">
        <aside className="search-sidebar">
          <FilterPanel onFilterChange={handleFilterChange} />
        </aside>

        <section className="search-results-section">
          {isLoading && <Loading isSkeleton={true} />}
          {error && <ErrorMessage message={error} />}

          {!isLoading && !error && hasSearched && books.length === 0 && (
            <div className="no-results-state">
              <p>No se encontraron resultados para tu búsqueda.</p>
            </div>
          )}

          {!isLoading && !error && filteredBooks.length > 0 && (
            <div className="books-grid">
              {filteredBooks.map((book, index) => (
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
      </div>
    </main>
  );
}

export default Search;