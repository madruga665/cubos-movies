import { getMovieListService, getOnboardingStatusService } from './services/movies.service';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import { Metadata } from 'next';
import { DashboardGrid } from '@/components/dashboard-grid/dashboard-grid';
import { OnboardingModal } from '@/components/ui/modal/onboarding-modal';
import { populateMoviesAction } from './onboarding-action';

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

  const isPopulated = await getOnboardingStatusService();

  return (
    <div className="relative min-h-screen flex flex-col bg-background">
      {!isPopulated && <OnboardingModal onConfirm={populateMoviesAction} />}
      <DashboardGrid movieList={movieList} paginationData={paginationData} />
    </div>
  );
}
