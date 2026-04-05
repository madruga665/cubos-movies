'use client';
import { Input } from '@/components/ui/input/input';
import { Button } from '@/components/ui/button/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { loginAction } from '../../actions';
import { useState } from 'react';
import { LoginFormValues, loginSchema } from '../../schemas/loginSchema';

export function LoginForm() {
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(loginData: LoginFormValues) {
    setServerError(null);
    const result = await loginAction(loginData);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-card p-4 rounded-sm flex flex-col gap-4 w-full max-w-103"
    >
      <Input
        label="E-mail"
        type="email"
        placeholder="Digite seu e-mail"
        {...register('email')}
        error={errors.email?.message}
      />
      <Input
        label="Senha"
        type="password"
        placeholder="Digite sua senha"
        {...register('password')}
        error={errors.password?.message}
      />

      {serverError && <span className="text-red-500 text-sm font-roboto">{serverError}</span>}

      <div className="flex items-center justify-between w-full mt-2">
        <Link
          href="#"
          className="font-roboto font-normal text-primary text-base underline decoration-solid decoration-primary underline-offset-4"
        >
          Esqueci minha senha
        </Link>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Entrando...' : 'Entrar'}
        </Button>
      </div>
    </form>
  );
}
