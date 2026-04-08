import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { DeleteMovieButton } from './delete-movie-button';
import { useRouter } from 'next/navigation';
import { deleteMovieAction } from '@/app/dashboard/movies/[id]/delete-action';
import { toast } from 'sonner';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@/app/dashboard/movies/[id]/delete-action', () => ({
  deleteMovieAction: jest.fn(),
}));

jest.mock('sonner', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
    info: jest.fn(),
  },
}));

describe('DeleteMovieButton', () => {
  const movieId = '123';
  const push = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
    (useRouter as jest.Mock).mockReturnValue({ push });
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('renders correctly', () => {
    render(<DeleteMovieButton movieId={movieId} />);
    expect(screen.getByRole('button', { name: /deletar/i })).toBeInTheDocument();
  });

  it('opens confirmation modal on click', async () => {
    render(<DeleteMovieButton movieId={movieId} />);
    const button = screen.getByRole('button', { name: /deletar/i });
    
    fireEvent.click(button);
    expect(screen.getByText('Excluir Filme')).toBeInTheDocument();
    expect(screen.getByText(/Tem certeza que deseja excluir este filme?/i)).toBeInTheDocument();
  });

  it('calls deleteMovieAction and redirects after delay on success when confirmed', async () => {
    (deleteMovieAction as jest.Mock).mockResolvedValue({ success: true });
    
    render(<DeleteMovieButton movieId={movieId} />);
    
    // Open modal
    fireEvent.click(screen.getByRole('button', { name: /deletar/i }));
    
    // Click confirm in modal
    const confirmButton = screen.getByRole('button', { name: /excluir/i });
    fireEvent.click(confirmButton);
    
    await waitFor(() => {
      expect(deleteMovieAction).toHaveBeenCalledWith(movieId);
      expect(toast.success).toHaveBeenCalledWith('Filme excluído com sucesso!');
    });

    // Info toast and push should NOT have been called yet
    expect(toast.info).not.toHaveBeenCalled();
    expect(push).not.toHaveBeenCalled();

    // Fast-forward time
    act(() => {
      jest.advanceTimersByTime(2000);
    });

    expect(toast.info).toHaveBeenCalledWith('Redirecionando para a dashboard...');
    expect(push).toHaveBeenCalledWith('/dashboard');
  });

  it('shows error toast on failure', async () => {
    (deleteMovieAction as jest.Mock).mockResolvedValue({ success: false, error: 'Erro ao deletar' });
    
    render(<DeleteMovieButton movieId={movieId} />);
    
    fireEvent.click(screen.getByRole('button', { name: /deletar/i }));
    fireEvent.click(screen.getByRole('button', { name: /excluir/i }));
    
    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Erro ao deletar');
    });
  });

  it('closes modal when cancel is clicked', async () => {
    render(<DeleteMovieButton movieId={movieId} />);
    
    fireEvent.click(screen.getByRole('button', { name: /deletar/i }));
    
    const cancelButton = screen.getByRole('button', { name: /cancelar/i });
    fireEvent.click(cancelButton);
    
    await waitFor(() => {
      expect(screen.queryByText('Excluir Filme')).not.toBeInTheDocument();
    });
    
    expect(deleteMovieAction).not.toHaveBeenCalled();
  });
});
