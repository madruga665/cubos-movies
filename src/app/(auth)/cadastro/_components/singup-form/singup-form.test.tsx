import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { SingupForm } from './singup-form';
import { singupAction } from '@/app/(auth)/actions';

jest.mock('@/app/(auth)/actions', () => ({
  singupAction: jest.fn(),
}));

describe('SingupForm', () => {
  it('should render the singup form', () => {
    render(<SingupForm />);
    expect(screen.getByLabelText(/nome/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/e-mail/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^senha/i)).toBeInTheDocument(); // Exact match to avoid confirmPassword
    expect(screen.getByLabelText(/confirmação de senha/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /cadastrar/i })).toBeInTheDocument();
  });

  it('should show validation errors', async () => {
    render(<SingupForm />);
    fireEvent.click(screen.getByRole('button', { name: /cadastrar/i }));

    expect(await screen.findByText(/nome é obrigatório/i)).toBeInTheDocument();
    expect(await screen.findByText(/formato de e-mail inválido/i)).toBeInTheDocument();
    expect(await screen.findByText(/a senha deve ter pelo menos 6 caracteres/i)).toBeInTheDocument();
  });

  it('should show error if passwords do not match', async () => {
    render(<SingupForm />);
    fireEvent.change(screen.getByLabelText(/nome/i), { target: { value: 'Test' } });
    fireEvent.change(screen.getByLabelText(/e-mail/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/^senha/i), { target: { value: 'password123' } });
    fireEvent.change(screen.getByLabelText(/confirmação de senha/i), { target: { value: 'password321' } });
    fireEvent.click(screen.getByRole('button', { name: /cadastrar/i }));

    expect(await screen.findByText(/as senhas devem ser iguais/i)).toBeInTheDocument();
  });

  it('should call singupAction with correct data', async () => {
    (singupAction as jest.Mock).mockResolvedValue(undefined);
    render(<SingupForm />);

    fireEvent.change(screen.getByLabelText(/nome/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/e-mail/i), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText(/^senha/i), { target: { value: 'password123' } });
    fireEvent.change(screen.getByLabelText(/confirmação de senha/i), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /cadastrar/i }));

    await waitFor(() => {
      expect(singupAction).toHaveBeenCalledWith({
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        confirmPassword: 'password123',
      });
    });
  });
});
