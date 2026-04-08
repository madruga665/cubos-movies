import React from 'react';
import { render, screen } from '@testing-library/react';
import { MovieDetails } from './movie-details';

describe('MovieDetails component', () => {
  const mockMovie = {
    title: 'Interstellar',
    tagline: 'O fim da Terra não será o nosso fim.',
    overview: 'As reservas naturais da Terra estão chegando ao fim...',
    posterUrl: '/poster.jpg',
    backdropUrl: '/backdrop.jpg',
    releaseDate: '06/11/2014',
    runtime: 169,
    voteAverage: 84,
    genres: 'Ficção científica, Drama, Aventura',
    certification: '12',
  };

  it('renders movie information correctly', () => {
    render(<MovieDetails movie={mockMovie} />);

    expect(screen.getByText('Interstellar')).toBeInTheDocument();
    expect(screen.getByText('"O fim da Terra não será o nosso fim."')).toBeInTheDocument();
    expect(screen.getByText('As reservas naturais da Terra estão chegando ao fim...')).toBeInTheDocument();
    expect(screen.getByText('Ficção científica, Drama, Aventura')).toBeInTheDocument();
    expect(screen.getByText('12')).toBeInTheDocument();
    expect(screen.getByText('2h 49m')).toBeInTheDocument();
    expect(screen.getByText('06/11/2014 (BR)')).toBeInTheDocument();
  });

  it('renders the back button to dashboard', () => {
    render(<MovieDetails movie={mockMovie} />);
    // In JSDOM with Next.js Link + Button, it might be rendered as a button with a href attribute
    // or just a button depending on how Link is mocked or handled.
    // Based on the error log, it's a button with an aria-label and a href.
    const backButton = screen.getByRole('button', { name: /voltar para dashboard/i });
    expect(backButton).toHaveAttribute('href', '/dashboard');
  });

  it('renders the rating percentage', () => {
    render(<MovieDetails movie={mockMovie} />);
    expect(screen.getByText('84')).toBeInTheDocument();
    expect(screen.getByText('%')).toBeInTheDocument();
  });

  it('renders default poster when posterUrl is not provided', () => {
    const movieWithoutPoster = { ...mockMovie, posterUrl: null };
    render(<MovieDetails movie={movieWithoutPoster} />);
    const poster = screen.getByAltText('Pôster de Interstellar');
    // Next.js Image component in tests might have a specific src format
    expect(poster.getAttribute('src')).toContain('default-poster.webp');
  });
});
