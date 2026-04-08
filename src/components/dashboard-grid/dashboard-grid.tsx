'use client';
import { Metadata } from '@/repositories/movies';
import { MovieCard } from '../movie-card/movie-card';
import { Button } from '../ui/button/button';
import { Pagination } from '../ui/pagination/pagination';
import { SearchInput } from '../ui/search-input/search-input';
import { useState } from 'react';
import { redirect } from 'next/navigation';

type MovieList = {
  id: string;
  title: string;
  genres: string;
  voteAverage: number;
  posterUrl: string | null;
};

type DasboardGridProps = {
  movieList?: MovieList[];
  paginationData?: Metadata;
};

export function DashboardGrid({ movieList, paginationData }: DasboardGridProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMovies = movieList?.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  function handleCreateMovie() {
    redirect('/dashboard/adicionar-filme');
  }
  return (
    <main className="relative z-30 flex-1 flex flex-col items-center justify-start w-full">
      <div className="flex flex-col md:flex-row items-center justify-end gap-4 p-4 md:p-6 w-full max-w-341.5">
        <SearchInput onChange={(event) => setSearchQuery(event.target.value)} />
        <div className="flex gap-2 w-full md:w-auto">
          <Button variant="ghost" className="flex-1 md:flex-none">
            Filtros
          </Button>
          <Button className="flex-2 md:flex-none" onClick={handleCreateMovie}>
            Adicionar Filme
          </Button>
        </div>
      </div>

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
