'use server';

import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { LoginFormValues } from './login/_components/login-form/login-schema';
import { headers } from 'next/headers';
import { SignupFormValues } from './cadastro/_components/signup-form/signup-schema';
import { APIError } from 'better-auth';

export async function loginAction(formData: LoginFormValues): Promise<void | { message: string }> {
  try {
    const { email, password } = formData;
    await auth.api.signInEmail({
      body: {
        email,
        password,
      },
    });

    redirect('/dashboard');
  } catch (error) {
    if (error instanceof APIError && error.body?.code === 'INVALID_EMAIL_OR_PASSWORD') {
      return {
        message: 'E-mail ou senha incorretos',
      };
    }
    redirect('/login');
  }
}

export async function logoutAction() {
  await auth.api.signOut({
    headers: await headers(),
  });

  redirect('/');
}

export async function signupAction(formData: SignupFormValues) {
  const { name, email, password } = formData;

  await auth.api.signUpEmail({
    body: {
      name,
      email,
      password,
    },
  });

  redirect('/dashboard');
}
