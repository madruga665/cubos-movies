'use server';

import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { LoginFormValues } from './schemas/loginSchema';
import { headers } from 'next/headers';

export async function loginAction(formData: LoginFormValues) {
  const { email, password } = formData;

  await auth.api.signInEmail({
    body: {
      email,
      password,
    },
  });

  redirect('/dashboard');
}

export async function logoutAction() {
  await auth.api.signOut({
    headers: await headers(),
  });

  redirect('/');
}
