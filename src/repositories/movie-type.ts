export type Movie = {
  id: string;
  title: string;
  originalTitle: string;
  tagline?: string | null;
  overview: string;
  posterUrl?: string | null;
  backdropUrl?: string | null;
  trailerUrl?: string | null;
  releaseDate: string; // ISO 8601 string
  runtime: number; // Duração em minutos
  status: string;
  originalLanguage: string;
  certification?: string | null;
  voteCount: number;
  voteAverage: number;
  budget?: string | null; // BigInt convertido para string para o front-end
  revenue?: string | null;
  profit?: string | null;
  genres: string[];
  createdAt: string;
  updatedAt: string;
  userId: string;
};
