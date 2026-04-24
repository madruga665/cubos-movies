'use client';
import { Input } from '@/components/ui/input/input';
import { useForm } from 'react-hook-form';
import { CreateMovieFormValues, createMovieSchema } from '../../schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button/button';
import { createMovieAction } from '../../actions';
import { toast } from 'sonner';
import { redirect } from 'next/navigation';

export function CreateMovieForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateMovieFormValues>({
    resolver: zodResolver(createMovieSchema),
  });

  async function onSubmit(data: CreateMovieFormValues) {
    const { success, error } = await createMovieAction(data);

    if (success) {
      return redirect('/dashboard');
    }

    if (error) {
      toast.error(error);
    }
  }

  return (
    <div className="flex flex-col p-4 gap-6 w-full max-w-103 text-foreground">
      <h1 className="text-2xl font-bold">Adicionar novo filme</h1>
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

        <div className="flex items-center justify-end w-full mt-4">
          <Button type="submit" isLoading={isSubmitting}>
            Adicionar Filme
          </Button>
        </div>
      </form>
    </div>
  );
}
