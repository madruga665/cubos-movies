import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Pagination } from './pagination';
import { useRouter, useSearchParams } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}));

describe('Pagination component', () => {
  it('renders pages', () => {
    const push = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push });
    (useSearchParams as jest.Mock).mockReturnValue({
      toString: () => '',
    });

    render(<Pagination currentPage={2} totalPages={5} />);

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();

    fireEvent.click(screen.getByText('3'));
    expect(push).toHaveBeenCalledWith('?page=3');
  });

  it('navigates to previous page', () => {
    const push = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push });
    (useSearchParams as jest.Mock).mockReturnValue({
      toString: () => 'page=2',
    });

    render(<Pagination currentPage={2} totalPages={5} />);

    const prevButton = screen.getByLabelText('Página anterior');
    fireEvent.click(prevButton);
    expect(push).toHaveBeenCalledWith('?page=1');
  });

  it('navigates to next page', () => {
    const push = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push });
    (useSearchParams as jest.Mock).mockReturnValue({
      toString: () => 'page=2',
    });

    render(<Pagination currentPage={2} totalPages={5} />);

    const nextButton = screen.getByLabelText('Próxima página');
    fireEvent.click(nextButton);
    expect(push).toHaveBeenCalledWith('?page=3');
  });

  it('disables previous button on first page', () => {
    const push = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push });
    (useSearchParams as jest.Mock).mockReturnValue({
      toString: () => 'page=1',
    });

    render(<Pagination currentPage={1} totalPages={5} />);

    const prevButton = screen.getByLabelText('Página anterior');
    expect(prevButton).toBeDisabled();
  });

  it('disables next button on last page', () => {
    const push = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push });
    (useSearchParams as jest.Mock).mockReturnValue({
      toString: () => 'page=5',
    });

    render(<Pagination currentPage={5} totalPages={5} />);

    const nextButton = screen.getByLabelText('Próxima página');
    expect(nextButton).toBeDisabled();
  });
});
