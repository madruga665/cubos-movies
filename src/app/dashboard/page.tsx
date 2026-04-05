import { auth } from '@/lib/auth';
import { Metadata } from 'next';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Cubos Movies | Dashboard',
  description: 'Desafio Cubos - Fullstack',
};

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect('/');
  }

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <h1>Bem vindo!</h1>
    </div>
  );
}
