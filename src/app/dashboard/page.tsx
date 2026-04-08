import { Button } from '@/components/ui/button/button';
import { SearchForm } from '@/components/ui/search-input/search-form';
import { MovieCard } from '@/components/movie-card/movie-card';
import { Pagination } from '@/components/ui/pagination/pagination';
import { getMovieListService } from './services/movies.service';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cubos Movies | Dashboard',
};

export default async function DashboardPage(props: {
  searchParams: Promise<{ page?: string; search?: string }>;
}) {
  const searchParams = await props.searchParams;
  const currentPage = Number(searchParams.page) || 1;
  const searchTerm = searchParams.search;
  const { movieList, paginationData } = await getMovieListService(currentPage, searchTerm);
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) redirect('/');

  return (
    <div className="relative min-h-screen flex flex-col bg-background">
      <main className="relative z-30 flex-1 flex flex-col items-center justify-start w-full">
        <div className="flex flex-col md:flex-row items-center justify-end gap-4 p-4 md:p-6 w-full max-w-341.5">
          <SearchForm defaultValue={searchTerm} />
          <div className="flex gap-2 w-full md:w-auto">
            <Button variant="ghost" className="flex-1 md:flex-none">
              Filtros
            </Button>
            <Button className="flex-2 md:flex-none">Adicionar Filme</Button>
          </div>
        </div>

        {/* Movies Grid */}
        <div className="bg-card/40 backdrop-blur-xs rounded-sm p-4 md:p-6 w-full max-w-341.5">
          {movieList && movieList.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 justify-items-center">
              {movieList.map((movie) => (
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
              <p className="text-xl font-bold text-foreground opacity-60">
                Nenhum filme encontrado
              </p>
            </div>
          )}
        </div>
        <Pagination currentPage={paginationData?.page} totalPages={paginationData?.totalPages} />
      </main>
    </div>
  );
}
