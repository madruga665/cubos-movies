import { Movie } from './movie-type';
import { fetchAdapter } from '@/adapters/fetch-adapter';

export type Metadata = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

type MovieResponse = {
  result: Movie[];
  metadata: Metadata;
};

export async function createMovieRepository(movieData: Partial<Movie>) {
  const requestOptions = {
    method: 'POST',
    body: JSON.stringify(movieData),
  };
  try {
    return await fetchAdapter<Movie>({
      url: `/api/v1/movies`,
      options: requestOptions,
    });
  } catch (error) {
    console.error(`[createMovieRepository] - Unexpected error:`, error);
    return {
      data: null,
      status: 500,
      error: error instanceof Error ? error.message : 'Internal server error',
    };
  }
}

export async function deleteMovieRepository(id: string) {
  const requestOptions = { method: 'DELETE' };
  try {
    return await fetchAdapter<null>({
      url: `/api/v1/movies/${id}`,
      options: requestOptions,
    });
  } catch (error) {
    console.error(`[deleteMovieRepository] - Unexpected error:`, error);
    return {
      data: null,
      status: 500,
      error: error instanceof Error ? error.message : 'Internal server error',
    };
  }
}

export async function getMovieByIdRepository(id: string) {
  const requestOptions = { method: 'GET' };
  try {
    return await fetchAdapter<Movie>({
      url: `/api/v1/movies/${id}`,
      options: requestOptions,
    });
  } catch (error) {
    console.error(`[getMovieByIdRepository] - Unexpected error:`, error);
    return {
      data: null,
      status: 500,
      error: error instanceof Error ? error.message : 'Internal server error',
    };
  }
}

export async function getMovieListRepository(page?: number, title?: string) {
  const requestOptions = { method: 'GET' };
  try {
    const params = new URLSearchParams();
    if (page) params.append('page', page.toString());
    if (title) params.append('title', title);

    const queryString = params.toString();
    const urlWithParams = `/api/v1/movies${queryString ? `?${queryString}` : ''}`;

    return await fetchAdapter<MovieResponse>({
      url: urlWithParams,
      options: requestOptions,
    });
  } catch (error) {
    console.error(`[getMovieListRepository] - Unexpected error:`, error);
    return {
      data: null,
      status: 500,
      error: error instanceof Error ? error.message : 'Internal server error',
    };
  }
}

export async function getOnboardingStatusRepository() {
  const requestOptions = { method: 'GET' };
  try {
    return await fetchAdapter<{ isPopulated: boolean }>({
      url: `/api/v1/movies/onboarding-status`,
      options: requestOptions,
    });
  } catch (error) {
    console.error(`[getOnboardingStatusRepository] - Unexpected error:`, error);
    return {
      data: null,
      status: 500,
      error: error instanceof Error ? error.message : 'Internal server error',
    };
  }
}

export async function populateMoviesRepository() {
  const requestOptions = { method: 'POST' };
  try {
    return await fetchAdapter<null>({
      url: `/api/v1/movies/populate`,
      options: requestOptions,
    });
  } catch (error) {
    console.error(`[populateMoviesRepository] - Unexpected error:`, error);
    return {
      data: null,
      status: 500,
      error: error instanceof Error ? error.message : 'Internal server error',
    };
  }
}

export async function updateMovieRepository(id: string, movieData: Partial<Movie>) {
  const requestOptions = {
    method: 'PATCH',
    body: JSON.stringify(movieData),
  };
  try {
    return await fetchAdapter<Movie>({
      url: `/api/v1/movies/${id}`,
      options: requestOptions,
    });
  } catch (error) {
    console.error(`[updateMovieRepository] - Unexpected error:`, error);
    return {
      data: null,
      status: 500,
      error: error instanceof Error ? error.message : 'Internal server error',
    };
  }
}
