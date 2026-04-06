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

export async function getMovieListRepository(page?: number, title?: string) {
  const requestOptions = { method: 'GET' };
  try {
    const params = new URLSearchParams();
    if (page) params.append('page', page.toString());
    if (title) params.append('title', title);

    const queryString = params.toString();
    const urlWithParams = `/api/v1/movies${queryString ? `?${queryString}` : ''}`;

    const response = await fetchAdapter<MovieResponse>({
      url: urlWithParams,
      options: requestOptions,
    });

    return response;
  } catch (error) {
    console.error(error);
  }
}
