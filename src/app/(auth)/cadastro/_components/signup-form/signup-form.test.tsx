import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { SignupForm } from './signup-form';
import { signupAction } from '@/app/(auth)/actions';
import { toast } from 'sonner';
import { redirect } from 'next/navigation';

jest.mock('@/app/(auth)/actions', () => ({
  signupAction: jest.fn(),
}));

jest.mock('sonner', () => ({
  toast: {
    error: jest.fn(),
  },
}));

jest.mock('next/navigation', () => ({
  redirect: jest.fn(),
}));

describe('SignupForm', () => {
  it('should render the signup form', () => {
    render(<SignupForm />);
    expect(screen.getByLabelText(/nome/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/e-mail/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^senha/i)).toBeInTheDocument(); // Exact match to avoid confirmPassword
    expect(screen.getByLabelText(/confirmação de senha/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /cadastrar/i })).toBeInTheDocument();
  });

  it('should show validation errors', async () => {
    render(<SignupForm />);
    fireEvent.click(screen.getByRole('button', { name: /cadastrar/i }));

    expect(await screen.findByText(/nome é obrigatório/i)).toBeInTheDocument();
    expect(await screen.findByText(/formato de e-mail inválido/i)).toBeInTheDocument();
    expect(await screen.findByText(/a senha deve ter pelo menos 6 caracteres/i)).toBeInTheDocument();
  });

  it('should show error if passwords do not match', async () => {
    render(<SignupForm />);
    fireEvent.change(screen.getByLabelText(/nome/i), { target: { value: 'Test' } });
    fireEvent.change(screen.getByLabelText(/e-mail/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/^senha/i), { target: { value: 'password123' } });
    fireEvent.change(screen.getByLabelText(/confirmação de senha/i), { target: { value: 'password321' } });
    fireEvent.click(screen.getByRole('button', { name: /cadastrar/i }));

    expect(await screen.findByText(/as senhas devem ser iguais/i)).toBeInTheDocument();
  });

  it('should call signupAction and redirect on success', async () => {
    (signupAction as jest.Mock).mockResolvedValue({ success: true, error: null });
    render(<SignupForm />);

    fireEvent.change(screen.getByLabelText(/nome/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/e-mail/i), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText(/^senha/i), { target: { value: 'password123' } });
    fireEvent.change(screen.getByLabelText(/confirmação de senha/i), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /cadastrar/i }));

    await waitFor(() => {
      expect(signupAction).toHaveBeenCalledWith({
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        confirmPassword: 'password123',
      });
      expect(redirect).toHaveBeenCalledWith('/dashboard');
    });
  });

  it('should show error toast if signupAction returns an error', async () => {
    (signupAction as jest.Mock).mockResolvedValue({ success: false, error: 'Email já cadastrado' });
    render(<SignupForm />);

    fireEvent.change(screen.getByLabelText(/nome/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/e-mail/i), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText(/^senha/i), { target: { value: 'password123' } });
    fireEvent.change(screen.getByLabelText(/confirmação de senha/i), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /cadastrar/i }));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Email já cadastrado');
    });
  });
});
