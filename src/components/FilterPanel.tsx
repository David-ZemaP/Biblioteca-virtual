import { useState, useRef, useEffect } from 'react';
import './FilterPanel.scss';

export interface FilterParams {
  minYear: string;
  maxYear: string;
  language: string;
  sortBy: string;
}

interface FilterPanelProps {
  onFilterChange: (filters: FilterParams) => void;
}

interface Option {
  value: string;
  label: string;
}

interface CustomDropdownProps {
  value: string;
  options: Option[];
  onChange: (value: string) => void;
  placeholder: string;
}

function CustomDropdown({ value, options, onChange, placeholder }: CustomDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find(opt => opt.value === value);

  return (
    <div className="custom-dropdown" ref={dropdownRef}>
      <button
        type="button"
        className="dropdown-trigger"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="dropdown-value">
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <span className={`dropdown-arrow ${isOpen ? 'open' : ''}`}>▼</span>
      </button>
      
      {isOpen && (
        <ul className="dropdown-menu">
          {options.map((opt) => (
            <li
              key={opt.value}
              className={value === opt.value ? 'active' : ''}
              onClick={() => {
                onChange(opt.value);
                setIsOpen(false);
              }}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function FilterPanel({ onFilterChange }: FilterPanelProps) {
  const [minYear, setMinYear] = useState('');
  const [maxYear, setMaxYear] = useState('');
  const [language, setLanguage] = useState('');
  const [sortBy, setSortBy] = useState('');

  const currentYear = new Date().getFullYear();
  
  const yearOptions: Option[] = [
    { value: '', label: 'Cualquier año' },
    ...Array.from(new Array(currentYear - 1899), (_, index) => {
      const y = String(currentYear - index);
      return { value: y, label: y };
    })
  ];

  const languageOptions: Option[] = [
    { value: '', label: 'Todos los idiomas' },
    { value: 'eng', label: 'Inglés' },
    { value: 'spa', label: 'Español' },
    { value: 'fre', label: 'Francés' },
    { value: 'ger', label: 'Alemán' },
  ];

  const sortOptions: Option[] = [
    { value: '', label: 'Relevancia' },
    { value: 'first_publish_year', label: 'Año de publicación' },
    { value: 'edition_count', label: 'Cantidad de ediciones' },
  ];

  const handleApplyFilters = () => {
    onFilterChange({ minYear, maxYear, language, sortBy });
  };

  return (
    <div className="filter-panel">
      <div className="filter-header">
        <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
        </svg>
        <h2>Filtros</h2>
      </div>
      
      <div className="filter-content">
        <div className="filter-group">
          <label>Año mínimo</label>
          <CustomDropdown 
            value={minYear} 
            options={yearOptions} 
            onChange={setMinYear} 
            placeholder="Cualquier año" 
          />
        </div>

        <div className="filter-group">
          <label>Año máximo</label>
          <CustomDropdown 
            value={maxYear} 
            options={yearOptions} 
            onChange={setMaxYear} 
            placeholder="Cualquier año" 
          />
        </div>

        <div className="filter-group">
          <label>Idioma</label>
          <CustomDropdown 
            value={language} 
            options={languageOptions} 
            onChange={setLanguage} 
            placeholder="Todos los idiomas" 
          />
        </div>

        <div className="filter-group">
          <label>Ordenar por</label>
          <CustomDropdown 
            value={sortBy} 
            options={sortOptions} 
            onChange={setSortBy} 
            placeholder="Relevancia" 
          />
        </div>
      </div>

      <button className="filter-btn" onClick={handleApplyFilters}>
        Aplicar Filtros
      </button>
    </div>
  );
}