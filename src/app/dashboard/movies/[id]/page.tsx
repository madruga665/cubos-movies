import { getMovieByIdService } from '@/features/movies/services/movies.service';
import { MovieDetails } from '@/features/movies/components/movie-details/movie-details';
import { Metadata } from 'next';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const movie = await getMovieByIdService(id);

  if (!movie) {
    return {
      title: 'Filme não encontrado | Cubos Movies',
    };
  }

  return {
    title: `${movie.title} | Cubos Movies`,
    description: movie.overview,
  };
}

export default async function MovieDetailsPage({ params }: Props) {
  const { id } = await params;
  const movie = await getMovieByIdService(id);

  return <MovieDetails movie={movie} />;
}
