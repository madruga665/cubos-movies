import { getMovieByIdRepository, getMovieListRepository } from '@/repositories/movies';

function formatCurrency(value: number | null) {
  if (!value) return '0';

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    notation: 'compact',
    maximumFractionDigits: 2,
  }).format(value);
}

function formatRuntime(minutes: number) {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
}

export type MovieViewModel = {
  id: string;
  title: string;
  originalTitle: string;
  tagline: string | null;
  overview: string;
  posterUrl: string | null;
  backdropUrl: string | null;
  trailerUrl: string | null;

  releaseDate: string;
  runtime: string;
  status: string;
  originalLanguage: string;

  certification: string | null;
  voteCount: number;
  voteAverage: number;

  budget: string | null;
  revenue: string | null;
  profit: string | null;

  genres: string[];
};

export async function getMovieByIdService(id: string): Promise<MovieViewModel | null> {
  const response = await getMovieByIdRepository(id);

  if (!response?.data) return null;

  const movie = response.data;

  return {
    ...movie,
    profit: formatCurrency(response.data.profit),
    revenue: formatCurrency(response.data.revenue),
    budget: formatCurrency(response.data.budget),
    releaseDate: new Date(movie.releaseDate).toLocaleDateString('pt-BR'),
    runtime: formatRuntime(movie.runtime),
  };
}

export async function getMovieListService(page?: number, title?: string) {
  const response = await getMovieListRepository(page, title);

  const movieList = response?.data?.result.map((movie) => ({
    id: movie.id,
    title: movie.title,
    genres: movie.genres.join(', '),
    voteAverage: movie.voteAverage,
    posterUrl: movie.posterUrl,
  }));

  return {
    movieList,
    paginationData: response?.data?.metadata,
  };
}
