'use server';

import { populateMoviesService } from './services/movies.service';

export async function populateMoviesAction() {
  const response = await populateMoviesService();

  if (response.status !== 201 && response.status !== 200) {
    return {
      success: false,
      error: response.error || 'Erro ao popular filmes',
    };
  }

  return {
    success: true,
    error: null,
  };
}
