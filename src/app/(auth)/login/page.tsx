import { headers } from 'next/headers';
import { LoginForm } from './_components/login-form/login-form';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Cubos Movies | Login',
  description: 'Desafio Cubos - Fullstack',
};

export default async function LoginPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    redirect('/dashboard');
  }

  return (
    <div className="flex flex-col p-4 w-full justify-center items-center gap-6">
      <LoginForm />
      <div className="flex gap-2 items-center justify-center">
        <p>Ainda não é cadastrado?</p>
        <Link
          href="/cadastro"
          className="font-roboto font-normal text-primary text-base underline decoration-solid decoration-primary underline-offset-4"
        >
          Crie sua conta aqui
        </Link>
      </div>
    </div>
  );
}
