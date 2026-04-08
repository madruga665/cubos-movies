import { getMovieByIdService } from '@/app/dashboard/services/movies.service';
import { MovieDetails } from '@/components/movie-details/movie-details';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

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

  console.log('movie na page', movie);

  if (!movie) {
    notFound();
  }

  return <MovieDetails movie={movie} />;
}
