export interface Book {
  id: string;
  title: string;
  author?: string;
  cover_id?: number;
  first_publish_year?: number;
  description?: string;
  edition_count?: number;
}

const STORAGE_KEY = 'smart_library_favorites';

export function getFavorites(): Book[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error reading favorites from localStorage:', error);
    return [];
  }
}

export function addFavorite(book: Book): boolean {
  try {
    const favorites = getFavorites();
    
    if (favorites.some(fav => fav.id === book.id)) {
      return false;
    }
    
    favorites.push(book);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    return true;
  } catch (error) {
    console.error('Error adding favorite to localStorage:', error);
    return false;
  }
}

export function removeFavorite(id: string): boolean {
  try {
    const favorites = getFavorites();
    const filtered = favorites.filter(fav => fav.id !== id);
    
    if (filtered.length === favorites.length) {
      return false; 
    }
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    return true;
  } catch (error) {
    console.error('Error removing favorite from localStorage:', error);
    return false;
  }
}

export function isFavorite(id: string): boolean {
  try {
    const favorites = getFavorites();
    return favorites.some(fav => fav.id === id);
  } catch (error) {
    console.error('Error checking if book is favorite:', error);
    return false;
  }
}

export function clearFavorites(): boolean {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (error) {
    console.error('Error clearing favorites:', error);
    return false;
  }
}
