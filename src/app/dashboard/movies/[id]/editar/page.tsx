import { getMovieByIdService } from '@/features/movies/services/movies.service';
import { EditMovieForm } from '@/features/movies/components/edit-movie-form/edit-movie-form';
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
    title: `Editar ${movie.title} | Cubos Movies`,
  };
}

export default async function EditMoviePage({ params }: Props) {
  const { id } = await params;
  const movie = await getMovieByIdService(id);

  if (!movie) {
    return notFound();
  }

  return (
    <div className="flex w-full justify-center">
      <EditMovieForm movie={movie} />
    </div>
  );
}
