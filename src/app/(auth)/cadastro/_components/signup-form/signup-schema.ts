import * as z from 'zod';

export const signupSchema = z
  .object({
    name: z.string().min(1, { message: 'Nome é obrigatório' }),
    email: z.email('Formato de e-mail inválido'),
    password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas devem ser iguais',
    path: ['confirmPassword'],
  });

export type SignupFormValues = z.infer<typeof signupSchema>;
