const BASE_URL = 'https://openlibrary.org';

export const getPopularBooks = async () => {
  const response = await fetch(`${BASE_URL}/search.json?q=programming&limit=12`);
  if (!response.ok) {
    throw new Error('Error al cargar los libros populares');
  }
  return response.json();
};

export const searchBooks = async (params: { query?: string; title?: string; author?: string }) => {
  const queryParts = [];
  
  if (params.query) queryParts.push(`q=${encodeURIComponent(params.query)}`);
  if (params.title) queryParts.push(`title=${encodeURIComponent(params.title)}`);
  if (params.author) queryParts.push(`author=${encodeURIComponent(params.author)}`);

  if (queryParts.length === 0) return { docs: [] };

  const url = `${BASE_URL}/search.json?${queryParts.join('&')}&limit=40`;
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error('Error al realizar la búsqueda');
  }
  
  return response.json();
};