import React from 'react';
import { render, screen } from '@testing-library/react';
import { MovieCard } from './movie-card';

describe('MovieCard component', () => {
  const mockProps = {
    id: '123',
    title: 'Test Movie',
    genres: 'Action, Comedy',
    voteAvarege: 85,
    posterUrl: '/test.jpg'
  };

  it('renders title and genres', () => {
    render(<MovieCard {...mockProps} />);
    expect(screen.getByText('Test Movie')).toBeInTheDocument();
    expect(screen.getByText('Action, Comedy')).toBeInTheDocument();
  });

  it('has a link to the movie details page', () => {
    render(<MovieCard {...mockProps} />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/dashboard/movies/123');
  });
});
