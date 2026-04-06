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

    return await fetchAdapter<MovieResponse>({
      url: urlWithParams,
      options: requestOptions,
    });
  } catch (error) {
    console.error(`[getMovieListRepository] - Erro inesperado:`, error);
    return {
      data: null,
      status: 500,
      error: error instanceof Error ? error.message : 'Erro interno do servidor',
    };
  }
}
