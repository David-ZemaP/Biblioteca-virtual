import { useState } from 'react';
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

export function FilterPanel({ onFilterChange }: FilterPanelProps) {
  const [minYear, setMinYear] = useState('');
  const [maxYear, setMaxYear] = useState('');
  const [language, setLanguage] = useState('');
  const [sortBy, setSortBy] = useState('');

  const handleApplyFilters = () => {
    onFilterChange({ minYear, maxYear, language, sortBy });
  };

  return (
    <div className="filter-panel">
      <div className="filter-group">
        <input
          className="filter-input"
          type="number"
          placeholder="Año mínimo"
          value={minYear}
          onChange={(e) => setMinYear(e.target.value)}
        />
        <input
          className="filter-input"
          type="number"
          placeholder="Año máximo"
          value={maxYear}
          onChange={(e) => setMaxYear(e.target.value)}
        />
      </div>
      <div className="filter-group">
        <select className="filter-select" value={language} onChange={(e) => setLanguage(e.target.value)}>
          <option value="">Cualquier idioma</option>
          <option value="eng">Inglés</option>
          <option value="spa">Español</option>
        </select>
        <select className="filter-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="">Relevancia</option>
          <option value="first_publish_year">Año de publicación</option>
          <option value="edition_count">Cantidad de ediciones</option>
        </select>
      </div>
      <button className="filter-btn" onClick={handleApplyFilters}>Aplicar Filtros</button>
    </div>
  );
}