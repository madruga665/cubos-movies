'use client';
import { Input } from '@/components/ui/input/input';
import { Button } from '@/components/ui/button/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginAction } from '../../actions';
import { LoginFormValues, loginSchema } from '../../schemas';
import { toast } from 'sonner';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    shouldFocusError: false,
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(loginData: LoginFormValues) {
    const { success, error } = await loginAction(loginData);

    if (success) {
      redirect('/dashboard');
    } else {
      return toast.error(error);
    }
  }

  return (
    <div className="flex flex-col p-4 w-full justify-center items-center gap-6">
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

        <div className="flex items-center justify-between w-full mt-2">
          <Link
            href="#"
            className="font-roboto font-normal text-primary text-base underline decoration-solid decoration-primary underline-offset-4"
          >
            Esqueci minha senha
          </Link>
          <Button type="submit" isLoading={isSubmitting}>
            Entrar
          </Button>
        </div>
      </form>
      <div className="flex gap-2 items-center justify-center">
        <p>Ainda não é cadastrado?</p>
        <Link
          href="/signup"
          className="font-roboto font-normal text-primary text-base underline decoration-solid decoration-primary underline-offset-4"
        >
          Crie sua conta aqui
        </Link>
      </div>
    </div>
  );
}
