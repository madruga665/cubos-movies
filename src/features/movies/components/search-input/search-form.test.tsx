import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { SearchForm } from './search-form';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}));

describe('SearchForm component', () => {
  const mockReplace = jest.fn();
  const mockPathname = '/dashboard';
  const mockSearchParams = new URLSearchParams('');

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ replace: mockReplace });
    (usePathname as jest.Mock).mockReturnValue(mockPathname);
    (useSearchParams as jest.Mock).mockReturnValue(mockSearchParams);
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.useRealTimers();
  });

  it('renders correctly with defaultValue', () => {
    render(<SearchForm defaultValue="Batman" />);
    const input = screen.getByPlaceholderText('Pesquise por filmes');
    expect(input).toHaveValue('Batman');
  });

  it('triggers search with debounce after typing', async () => {
    render(<SearchForm />);
    const input = screen.getByPlaceholderText('Pesquise por filmes');

    fireEvent.change(input, { target: { value: 'Inception' } });

    // Should not trigger search immediately (debounce 300ms)
    expect(mockReplace).not.toHaveBeenCalled();

    // Fast-forward time
    act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(mockReplace).toHaveBeenCalledWith('/dashboard?search=Inception&page=1');
  });

  it('clears query parameter when search is empty', async () => {
    const existingParams = new URLSearchParams('search=Batman&page=1');
    (useSearchParams as jest.Mock).mockReturnValue(existingParams);

    render(<SearchForm defaultValue="Batman" />);
    const input = screen.getByPlaceholderText('Pesquise por filmes');

    fireEvent.change(input, { target: { value: '' } });

    act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(mockReplace).toHaveBeenCalledWith('/dashboard?page=1');
  });
});
