import { Movie } from '../models';

export async function fetchMoviesHelper(url: string): Promise<Movie[]> {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error - ${response.status}`);
    }

    const data = await response.json();

    return data.filmes;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}
