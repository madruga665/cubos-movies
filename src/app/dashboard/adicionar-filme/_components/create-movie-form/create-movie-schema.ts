import { z } from 'zod';

export const createMovieSchema = z.object({
  title: z.string().min(1, 'O título é obrigatório'),
  originalTitle: z.string().min(1, 'O título original é obrigatório'),
  overview: z.string().min(1, 'A sinopse é obrigatória'),
  releaseDate: z.string().min(1, 'A data de lançamento é obrigatória'),
  runtime: z.number().int().positive('A duração deve ser um número positivo'),
  status: z.string().min(1, 'O status é obrigatório'),
  originalLanguage: z.string().min(1, 'O idioma original é obrigatório'),
  genres: z.string().min(1, 'Pelo menos um gênero deve ser informado'),
});

export type CreateMovieFormValues = z.infer<typeof createMovieSchema>;
