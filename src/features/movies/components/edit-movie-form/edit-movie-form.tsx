'use client';
import { Input } from '@/components/ui/input/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button/button';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { MovieViewModel } from '../../services/movies.service';
import { CreateMovieFormValues, createMovieSchema } from '../../schemas';
import { updateMovieAction } from '../../actions';

interface EditMovieFormProps {
  movie: MovieViewModel;
}

export function EditMovieForm({ movie }: EditMovieFormProps) {
  const router = useRouter();

  // Helper to format date from DD/MM/YYYY to YYYY-MM-DD for input[type="date"]
  const formatDateForInput = (dateStr: string) => {
    const [day, month, year] = dateStr.split('/');
    return `${year}-${month}-${day}`;
  };

  // Helper to extract number from formatted currency or string
  const parseRuntime = (runtimeStr: string) => {
    const match = runtimeStr.match(/(\d+)h (\d+)m/);
    if (match) {
      return parseInt(match[1]) * 60 + parseInt(match[2]);
    }
    return 0;
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateMovieFormValues>({
    resolver: zodResolver(createMovieSchema),
    defaultValues: {
      title: movie.title,
      originalTitle: movie.originalTitle,
      overview: movie.overview,
      releaseDate: formatDateForInput(movie.releaseDate),
      runtime: parseRuntime(movie.runtime),
      status: movie.status,
      originalLanguage: movie.originalLanguage,
      genres: movie.genres.join(', '),
    },
  });

  async function onSubmit(data: CreateMovieFormValues) {
    const { success, error } = await updateMovieAction(movie.id, data);

    if (success) {
      toast.success('Filme atualizado com sucesso!');
      router.refresh();
      router.push(`/dashboard/movies/${movie.id}`);
      return;
    }

    if (error) {
      toast.error(error);
    }
  }

  return (
    <div className="flex flex-col p-4 gap-6 w-full max-w-103 text-foreground">
      <h1 className="text-2xl font-bold">Editar filme</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-card p-6 rounded-sm flex flex-col gap-4 w-full"
      >
        <Input
          label="Título do filme"
          type="text"
          placeholder="Digite o título"
          {...register('title')}
          error={errors.title?.message}
        />
        <Input
          label="Título original"
          type="text"
          placeholder="Digite o título original"
          {...register('originalTitle')}
          error={errors.originalTitle?.message}
        />
        <Input
          label="Sinopse/Resumo"
          type="text"
          placeholder="Digite a sinopse"
          {...register('overview')}
          error={errors.overview?.message}
        />
        <Input
          label="Data de lançamento"
          type="date"
          {...register('releaseDate')}
          error={errors.releaseDate?.message}
        />

        <Input
          label="Duração (em minutos)"
          type="number"
          placeholder="Ex: 120"
          {...register('runtime', { valueAsNumber: true })}
          error={errors.runtime?.message}
        />

        <Input
          label="Status"
          type="text"
          placeholder="Ex: Lançado"
          {...register('status')}
          error={errors.status?.message}
        />

        <Input
          label="Idioma original"
          type="text"
          placeholder="Ex: Inglês"
          {...register('originalLanguage')}
          error={errors.originalLanguage?.message}
        />

        <Input
          label="Gêneros (separados por vírgula)"
          type="text"
          placeholder="Ex: Ação, Aventura"
          {...register('genres')}
          error={errors.genres?.message}
        />

        <div className="flex items-center justify-end w-full mt-4 gap-3">
          <Button
            variant="ghost"
            type="button"
            onClick={() => router.push(`/dashboard/movies/${movie.id}`)}
            disabled={isSubmitting}
          >
            Cancelar
          </Button>
          <Button type="submit" isLoading={isSubmitting}>
            Salvar Alterações
          </Button>
        </div>
      </form>
    </div>
  );
}
