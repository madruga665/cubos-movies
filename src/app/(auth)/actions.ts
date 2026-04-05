'use server';

import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { LoginFormValues } from './login/_components/login-form/login-schema';
import { headers } from 'next/headers';
import { SignupFormValues } from './cadastro/_components/signup-form/signup-schema';
import { APIError } from 'better-auth';

type ActionResult = {
  success: boolean;
  error: string | null;
};

const errorMessages = {
  generic: 'Um erro ocorreu, tente novamente mais tarde',
  invalidEmailOrPassword: 'E-mail ou senha incorretos',
  emailAlreadyInUse: 'Email já cadastrado',
};

const betterAuthErrorCodes = {
  invalidEmailOrPassword: 'INVALID_EMAIL_OR_PASSWORD',
  userAlreadyExists: 'USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL',
};

export async function loginAction(formData: LoginFormValues): Promise<ActionResult> {
  try {
    const { email, password } = formData;
    await auth.api.signInEmail({
      body: {
        email,
        password,
      },
    });

    return { success: true, error: null };
  } catch (error) {
    if (
      error instanceof APIError &&
      error.body?.code === betterAuthErrorCodes.invalidEmailOrPassword
    ) {
      return {
        success: false,
        error: errorMessages.invalidEmailOrPassword,
      };
    }

    return {
      success: false,
      error: errorMessages.generic,
    };
  }
}

export async function logoutAction() {
  await auth.api.signOut({
    headers: await headers(),
  });

  redirect('/');
}

export async function signupAction(formData: SignupFormValues): Promise<ActionResult> {
  try {
    const { name, email, password } = formData;

    await auth.api.signUpEmail({
      body: {
        name,
        email,
        password,
      },
    });

    return { success: true, error: null };
  } catch (error) {
    if (error instanceof APIError && error.body?.code === betterAuthErrorCodes.userAlreadyExists) {
      return {
        success: false,
        error: errorMessages.emailAlreadyInUse,
      };
    }

    return {
      success: false,
      error: errorMessages.generic,
    };
  }
}
