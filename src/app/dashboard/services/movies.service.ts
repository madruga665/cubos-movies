import { getMovieListRepository } from '@/repositories/movies';

export async function getMovieListService() {
  const response = await getMovieListRepository();

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
