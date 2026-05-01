import { useState } from 'react';

export interface SearchParams {
  query: string;
  title: string;
  author: string;
}

interface SearchBarProps {
  onSearch: (params: SearchParams) => void;
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({ query, title, author });
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Tema o palabra clave..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <input
        type="text"
        placeholder="Título del libro..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Autor..."
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />
      <button type="submit">Buscar</button>
    </form>
  );
}