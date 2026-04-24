import { headers } from 'next/headers';
import { LoginForm } from '@/features/auth/components/login-form/login-form';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';

export const metadata: Metadata = {
  title: 'Cubos Movies | Login',
};

export default async function LoginPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) redirect('/dashboard');

  return <LoginForm />;
}
