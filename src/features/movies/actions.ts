'use server';

import { 
  createMovieService, 
  deleteMovieService, 
  populateMoviesService, 
  updateMovieService 
} from './services/movies.service';
import { CreateMovieFormValues } from './schemas';
import { revalidatePath } from 'next/cache';

type ActionResult = {
  success: boolean;
  error: string | null;
};

export async function createMovieAction(formData: CreateMovieFormValues): Promise<ActionResult> {
  try {
    const movieData = {
      ...formData,
      genres: formData.genres.split(',').map((g) => g.trim()),
    };

    const response = await createMovieService(movieData);

    if (response.status !== 201 && response.status !== 200) {
      return {
        success: false,
        error: response.error || 'Erro ao criar filme',
      };
    }

    revalidatePath('/dashboard');
    return { success: true, error: null };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Um erro aconteceu tente novamente mais tarde',
    };
  }
}

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

    revalidatePath('/dashboard');
    revalidatePath(`/dashboard/movies/${id}`);
    return { success: true, error: null };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Um erro aconteceu tente novamente mais tarde',
    };
  }
}

export async function deleteMovieAction(id: string): Promise<ActionResult> {
  try {
    const response = await deleteMovieService(id);

    if (response?.error) {
      return { success: false, error: response.error };
    }

    revalidatePath('/dashboard');
    return { success: true, error: null };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Erro ao deletar filme',
    };
  }
}

export async function populateMoviesAction(): Promise<ActionResult> {
  const response = await populateMoviesService();

  if (response.status !== 201 && response.status !== 200) {
    return {
      success: false,
      error: response.error || 'Erro ao popular filmes',
    };
  }

  revalidatePath('/dashboard');
  return {
    success: true,
    error: null,
  };
}
