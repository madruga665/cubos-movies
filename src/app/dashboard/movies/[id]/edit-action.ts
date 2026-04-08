'use server';
import { updateMovieService } from '../../services/movies.service';
import { CreateMovieFormValues } from '../../adicionar-filme/_components/create-movie-form/create-movie-schema';

type ActionResult = {
  success: boolean;
  error: string | null;
};

export async function updateMovieAction(id: string, formData: CreateMovieFormValues): Promise<ActionResult> {
  try {
    const movieData = {
      ...formData,
      genres: formData.genres.split(',').map((g) => g.trim()),
    };

    const response = await updateMovieService(id, movieData);

    if (response.status !== 200 && response.status !== 204) {
      return {
        success: false,
        error: response.error || 'Erro ao atualizar filme',
      };
    }

    return { success: true, error: null };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'Um erro aconteceu tente novamente mais tarde',
    };
  }
}
