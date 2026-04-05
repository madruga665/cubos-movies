'use client';
import { Input } from '@/components/ui/input/input';
import { Button } from '@/components/ui/button/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SingupFormValues, singupSchema } from './singup-schema';
import { singupAction } from '@/app/(auth)/actions';

export function SingupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SingupFormValues>({
    resolver: zodResolver(singupSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  async function onSubmit(singupData: SingupFormValues) {
    await singupAction(singupData);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-card p-4 rounded-sm flex flex-col gap-4 w-full max-w-103"
    >
      <Input
        label="Nome"
        type="text"
        placeholder="Digite seu nome"
        {...register('name')}
        error={errors.name?.message}
      />
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
      <Input
        label="Confirmação de senha"
        type="password"
        placeholder="Digite sua senha novamente"
        {...register('confirmPassword')}
        error={errors.confirmPassword?.message}
      />

      <div className="flex items-center justify-end w-full mt-2">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Cadastrando...' : 'Cadastrar'}
        </Button>
      </div>
    </form>
  );
}
