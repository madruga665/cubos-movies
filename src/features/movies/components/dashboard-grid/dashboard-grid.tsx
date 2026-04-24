'use client';
import { Metadata } from '../../repositories/movies';
import { MovieCard } from '../movie-card/movie-card';
import { Button } from '@/components/ui/button/button';
import { Pagination } from '@/components/ui/pagination/pagination';
import { SearchForm } from '../search-input/search-form';
import { useRouter } from 'next/navigation';
import { useState, Suspense } from 'react';
import { FilterSection } from './filter-section';

type MovieList = {
  id: string;
  title: string;
  genres: string;
  voteAverage: number;
  posterUrl: string | null;
};

type DashboardGridProps = {
  movieList?: MovieList[];
  paginationData?: Metadata;
  allGenres: string[];
  searchTerm?: string;
};

export function DashboardGrid({
  movieList,
  paginationData,
  allGenres,
  searchTerm,
}: DashboardGridProps) {
  const router = useRouter();

  const [showFilters, setShowFilters] = useState(false);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

  const filteredMovies = movieList?.filter((movie) => {
    const matchesGenres =
      selectedGenres.length === 0 || selectedGenres.some((genre) => movie.genres.includes(genre));

    return matchesGenres;
  });

  function handleCreateMovie() {
    router.push('/dashboard/adicionar-filme');
  }

  function handleApplyFilters(genres: string[]) {
    setSelectedGenres(genres);
    setShowFilters(false);
  }

  function handleClearFilters() {
    setSelectedGenres([]);
    setShowFilters(false);
  }

  return (
    <main className="relative z-30 flex-1 flex flex-col items-center justify-start w-full">
      <div className="flex flex-col md:flex-row items-center justify-end gap-4 p-4 md:p-6 w-full max-w-341.5">
        <Suspense fallback={<div className="h-11 w-full md:w-122 bg-input-bg animate-pulse rounded-sm" />}>
          <SearchForm defaultValue={searchTerm} />
        </Suspense>
        <div className="flex gap-2 w-full md:w-auto">
          <Button
            variant={showFilters ? 'primary' : 'ghost'}
            className="flex-1 md:flex-none"
            onClick={() => setShowFilters(!showFilters)}
          >
            Filtros
          </Button>
          <Button className="flex-2 md:flex-none" onClick={handleCreateMovie}>
            Adicionar Filme
          </Button>
        </div>
      </div>

      {showFilters && (
        <FilterSection
          genres={allGenres}
          selectedGenres={selectedGenres}
          onApplyFilters={handleApplyFilters}
          onClearFilters={handleClearFilters}
        />
      )}

      {/* Movies Grid */}
      <div className="bg-card/40 backdrop-blur-xs rounded-sm p-4 md:p-6 w-full max-w-341.5">
        {filteredMovies && filteredMovies.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 justify-items-center">
            {filteredMovies.map((movie) => (
              <MovieCard
                key={movie.id}
                id={movie.id}
                title={movie.title}
                genres={movie.genres}
                voteAvarege={movie.voteAverage}
                posterUrl={movie.posterUrl}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-12 text-center">
            <p className="text-xl font-bold text-foreground opacity-60">Nenhum filme encontrado</p>
          </div>
        )}
      </div>

      <Pagination currentPage={paginationData?.page} totalPages={paginationData?.totalPages} />
    </main>
  );
}
