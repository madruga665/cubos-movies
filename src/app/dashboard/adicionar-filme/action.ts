'use server';
import { fetchAdapter } from '@/adapter/fetch-adapter';
import { CreateMovieFormValues } from './_components/create-movie-form/create-movie-schema';

type ActionResult = {
  success: boolean;
  error: string | null;
};

export async function createMovieAction(formData: CreateMovieFormValues): Promise<ActionResult> {
  try {
    const body = JSON.stringify({
      ...formData,
      genres: formData.genres.split(',').map((g) => g.trim()),
    });

    await fetchAdapter({
      url: '/api/v1/movies',
      options: { method: 'POST', body },
    });

    return { success: true, error: null };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'Um erro aconteceu tente novamente mais tarde',
    };
  }
}
