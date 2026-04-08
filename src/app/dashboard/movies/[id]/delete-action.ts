'use server';

import { deleteMovieService } from '@/app/dashboard/services/movies.service';
import { revalidatePath } from 'next/cache';

export async function deleteMovieAction(id: string) {
  try {
    const response = await deleteMovieService(id);

    if (response?.error) {
      return { success: false, error: response.error };
    }

    revalidatePath('/dashboard');
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Erro ao deletar filme',
    };
  }
}
