export type Movie = {
  id: string;
  title: string;
  originalTitle: string;
  tagline: string | null;
  overview: string;
  posterUrl: string | null;
  backdropUrl: string | null;
  trailerUrl: string | null;

  releaseDate: string;
  runtime: number;
  status: string;
  originalLanguage: string;

  certification: string | null;
  voteCount: number;
  voteAverage: number;

  budget: number | null;
  revenue: number | null;
  profit: number | null;

  genres: string[];

  createdAt: string;
  updatedAt: string;

  userId: string;
};
