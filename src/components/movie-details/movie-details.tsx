import Image from 'next/image';
import Link from 'next/link';
import { MovieViewModel } from '@/app/dashboard/services/movies.service';
import { MonetaryInfo } from './components/monetary-info';
import { MovieInfo } from './components/movie-info';
import { RatingInfo } from './components/rating-info';
import { Button } from '../ui/button/button';
import { MovieOverview } from './components/movie-overview';
import { DeleteMovieButton } from './components/delete-movie-button';

interface MovieDetailsProps {
  movie: MovieViewModel | null;
}

export function MovieDetails({ movie }: MovieDetailsProps) {
  if (!movie) {
    return (
      <div className="flex w-full h-full items-center justify-center">
        <h2 className="heading2 text-5xl">filme não encontrado</h2>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center w-dvw max-h-max p-4 gap-4 font-montserrat relative">
      {/* Back Button */}
      <div className="absolute top-4 left-4 z-50 md:top-0 md:left-8">
        <Link href="/dashboard" passHref>
          <Button
            variant="ghost"
            className="flex items-center gap-2 bg-black/40 hover:bg-black/60 backdrop-blur-md text-white border border-white/10 px-4 py-2 rounded-full transition-all group/back"
            aria-label="Voltar para Dashboard"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-transform group-hover/back:-translate-x-1"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            <span className="font-montserrat font-bold text-sm uppercase tracking-wider hidden md:inline">
              Dashboard
            </span>
          </Button>
        </Link>
      </div>

      {/* mobile */}
      <div className="flex flex-col items-center justify-center gap-4 md:hidden">
        <div>
          <Image
            src={movie.posterUrl || '/default-poster.webp'}
            alt={`Pôster de ${movie.title}`}
            width={382}
            height={582}
            className="w-95.5 h-145.5"
          />
        </div>

        <div className="flex gap-2 w-full md:w-auto">
          <DeleteMovieButton movieId={movie.id} className="flex-1 md:flex-none" />
          <Button className="flex-2 md:flex-none">Editar</Button>
        </div>

        <div className="flex flex-col justify-center items-center">
          <h1 className="text-3xl md:text-5xl font-bold">{movie.title}</h1>
          <p className="text-lg md:text-xl italic opacity-70">
            {movie.originalTitle && `Titulo original: ${movie.originalTitle}`}
          </p>
        </div>

        <RatingInfo
          certification={movie.certification}
          voteAverage={movie.voteAverage}
          voteCount={movie.voteCount}
          ratingIndicatorSize="size-17.25"
        />

        <MovieOverview genres={movie.genres} overview={movie.overview} tagline={movie.tagline} />

        <MovieInfo
          originalLanguage={movie.originalLanguage}
          releaseDate={movie.releaseDate}
          runtime={movie.runtime}
          status={movie.runtime}
        />

        <MonetaryInfo budget={movie.budget} profit={movie.profit} revenue={movie.revenue} />
      </div>

      {/* desktop */}
      <div className="hidden gap-4 bg-background text-foreground relative p-[39.5px] max-w-325.5 md:flex md:flex-col">
        <div className="absolute inset-0 z-0 h-141 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-[#121113]/60 z-10" />
          <Image
            src={movie.backdropUrl || movie.posterUrl || '/background.webp'}
            alt="Background"
            fill
            priority
            className="object-cover object-top opacity-40"
          />
          <div className="absolute inset-0 bg-linear-to-b from-transparent to-background z-20" />
        </div>

        {/* Titulo e botões */}
        <div className="z-1 gap-4 sm">
          <div className="flex flex-col justify-center items-start">
            <div className="flex w-full items-center justify-between">
              <div>
                <h2 className="text-[32px] font-bold">{movie.title}</h2>
                <p className="text-[16px] opacity-70">
                  {movie.originalTitle && `Titulo original: ${movie.originalTitle}`}
                </p>
              </div>
              <div className="flex gap-2 w-auto">
                <DeleteMovieButton movieId={movie.id} className="flex-none" />
                <Button className="flex-none">Editar</Button>
              </div>
            </div>
          </div>

          <div className="flex mt-4 gap-4">
            <Image
              src={movie.posterUrl || '/default-poster.webp'}
              alt={`Pôster de ${movie.title}`}
              width={382}
              height={582}
              className="w-95.5 h-145.5"
            />

            <MovieOverview
              genres={movie.genres}
              overview={movie.overview}
              tagline={movie.tagline}
            />

            <div className="flex flex-col w-full gap-4">
              <RatingInfo
                certification={movie.certification}
                voteAverage={movie.voteAverage}
                voteCount={movie.voteCount}
                ratingIndicatorSize="md:size-24.5"
              />

              <MovieInfo
                originalLanguage={movie.originalLanguage}
                releaseDate={movie.releaseDate}
                runtime={movie.runtime}
                status={movie.runtime}
              />

              <MonetaryInfo budget={movie.budget} profit={movie.profit} revenue={movie.revenue} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
