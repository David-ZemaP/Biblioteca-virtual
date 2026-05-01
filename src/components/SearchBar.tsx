import { useState, useRef, useEffect } from 'react';
import './SearchBar.scss';

export interface SearchParams {
  query: string;
  title: string;
  author: string;
}

interface SearchBarProps { //s
  onSearch: (params: SearchParams) => void;
}

type SearchType = 'query' | 'title' | 'author';

export function SearchBar({ onSearch }: SearchBarProps) {
  const [searchType, setSearchType] = useState<SearchType>('query');
  const [searchValue, setSearchValue] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({
      query: searchType === 'query' ? searchValue : '',
      title: searchType === 'title' ? searchValue : '',
      author: searchType === 'author' ? searchValue : '',
    });
  };

  const getPlaceholder = () => {
    if (searchType === 'title') return 'Ej: Clean Code...';
    if (searchType === 'author') return 'Ej: Franz Kafka...';
    return 'Ej: Artificial Intelligence...';
  };

  const getTypeLabel = () => {
    if (searchType === 'title') return 'Título del libro';
    if (searchType === 'author') return 'Autor';
    return 'Tema o palabra clave';
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <form className="search-bar-form" onSubmit={handleSubmit}>
      <div className="search-bar-wrapper">
        
        <div className="input-group">
          <span className="search-icon">
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </span>
          <input
            className="search-input"
            type="text"
            placeholder={getPlaceholder()}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>

        <div className="input-divider"></div>

        <div className="custom-dropdown" ref={dropdownRef}>
          <button 
            type="button" 
            className="dropdown-trigger"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            {getTypeLabel()}
            <span className={`dropdown-arrow ${isDropdownOpen ? 'open' : ''}`}>▼</span>
          </button>
          
          {isDropdownOpen && (
            <ul className="dropdown-menu">
              <li 
                className={searchType === 'query' ? 'active' : ''}
                onClick={() => { setSearchType('query'); setIsDropdownOpen(false); }}
              >
                Tema o palabra clave
              </li>
              <li 
                className={searchType === 'title' ? 'active' : ''}
                onClick={() => { setSearchType('title'); setIsDropdownOpen(false); }}
              >
                Título del libro
              </li>
              <li 
                className={searchType === 'author' ? 'active' : ''}
                onClick={() => { setSearchType('author'); setIsDropdownOpen(false); }}
              >
                Autor
              </li>
            </ul>
          )}
        </div>

      </div>
    </form>
  );
}