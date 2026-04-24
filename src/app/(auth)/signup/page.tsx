import { SignupForm } from '@/features/auth/components/signup-form/signup-form';
import { headers } from 'next/headers';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cubos Movies | Cadastro',
};

export default async function SignupPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) redirect('/dashboard');

  return <SignupForm />;
}
