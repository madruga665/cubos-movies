import React from 'react';
import { render, screen } from '@testing-library/react';
import { MovieCard } from './movie-card';

describe('MovieCard component', () => {
  const mockProps = {
    title: 'Test Movie',
    genres: 'Action, Comedy',
    rating: 85,
    posterUrl: '/test.jpg'
  };

  it('renders title and genres', () => {
    render(<MovieCard {...mockProps} />);
    expect(screen.getByText('Test Movie')).toBeInTheDocument();
    expect(screen.getByText('Action, Comedy')).toBeInTheDocument();
  });
});
