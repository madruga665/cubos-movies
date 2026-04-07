import { getMovieListRepository } from '@/repositories/movies';

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
