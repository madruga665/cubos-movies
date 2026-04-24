import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { LoginForm } from './login-form';
import { loginAction } from '../../actions';
import { toast } from 'sonner';
import { redirect } from 'next/navigation';

jest.mock('../../actions', () => ({
  loginAction: jest.fn(),
}));

jest.mock('sonner', () => ({
  toast: {
    error: jest.fn(),
  },
}));

jest.mock('next/navigation', () => ({
  redirect: jest.fn(),
}));

describe('LoginForm', () => {
  it('should render the login form', () => {
    render(<LoginForm />);
    expect(screen.getByLabelText(/e-mail/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/senha/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /entrar/i })).toBeInTheDocument();
  });

  it('should show validation errors', async () => {
    render(<LoginForm />);
    fireEvent.click(screen.getByRole('button', { name: /entrar/i }));

    expect(await screen.findByText(/formato de e-mail inválido/i)).toBeInTheDocument();
    expect(await screen.findByText(/a senha deve ter pelo menos 6 caracteres/i)).toBeInTheDocument();
  });

  it('should call loginAction and redirect on success', async () => {
    (loginAction as jest.Mock).mockResolvedValue({ success: true, error: null });
    render(<LoginForm />);

    fireEvent.change(screen.getByLabelText(/e-mail/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/senha/i), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /entrar/i }));

    await waitFor(() => {
      expect(loginAction).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
      });
      expect(redirect).toHaveBeenCalledWith('/dashboard');
    });
  });

  it('should show error toast if loginAction returns an error', async () => {
    (loginAction as jest.Mock).mockResolvedValue({ success: false, error: 'E-mail ou senha incorretos' });
    render(<LoginForm />);

    fireEvent.change(screen.getByLabelText(/e-mail/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/senha/i), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /entrar/i }));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('E-mail ou senha incorretos');
    });
  });
});
