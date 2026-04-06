import { Movie } from './movie-type';
import { fetchAdapter } from '@/adapter/fetch-adapter';

type Metadata = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

type MovieResponse = {
  result: Movie[];
  metadata: Metadata;
};

export async function getMovieListRepository() {
  const requestOptions = { method: 'GET' };
  try {
    const response = await fetchAdapter<MovieResponse>({
      url: '/api/v1/movies',
      options: requestOptions,
    });

    return response;
  } catch (error) {
    console.error(error);
  }
}
