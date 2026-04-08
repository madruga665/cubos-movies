import React from 'react';
import { render, screen } from '@testing-library/react';
import { MovieDetails } from './movie-details';
import { MovieViewModel } from '@/app/dashboard/services/movies.service';

describe('MovieDetails component', () => {
  const mockMovie: MovieViewModel = {
    id: '1',
    title: 'Interstellar',
    originalTitle: 'Interstellar Original',
    tagline: 'O fim da Terra não será o nosso fim.',
    overview: 'As reservas naturais da Terra estão chegando ao fim...',
    posterUrl: '/poster.jpg',
    backdropUrl: '/backdrop.jpg',
    trailerUrl: null,
    releaseDate: '06/11/2014',
    runtime: '2h 49m',
    status: 'Released',
    originalLanguage: 'English',
    certification: '12',
    voteCount: 1000,
    voteAverage: 84,
    budget: '$165.00M',
    revenue: '$675.12M',
    profit: '$510.12M',
    genres: ['Ficção científica', 'Drama', 'Aventura'],
  };

  it('renders movie information correctly', () => {
    render(<MovieDetails movie={mockMovie} />);

    // Check title in both mobile and desktop (might be multiple instances)
    const titles = screen.getAllByText('Interstellar');
    expect(titles.length).toBeGreaterThan(0);

    // Check original title
    const originalTitles = screen.getAllByText(/Titulo original: Interstellar Original/i);
    expect(originalTitles.length).toBeGreaterThan(0);

    // Check overview and tagline
    const overviews = screen.getAllByText('As reservas naturais da Terra estão chegando ao fim...');
    expect(overviews.length).toBeGreaterThan(0);

    const taglines = screen.getAllByText(/O fim da Terra não será o nosso fim./i);
    expect(taglines.length).toBeGreaterThan(0);

    // Check buttons
    const deleteButtons = screen.getAllByRole('button', { name: /deletar/i });
    expect(deleteButtons.length).toBeGreaterThan(0);

    const editButtons = screen.getAllByRole('button', { name: /editar/i });
    expect(editButtons.length).toBeGreaterThan(0);
  });

  it('renders the back button to dashboard', () => {
    render(<MovieDetails movie={mockMovie} />);
    const backButton = screen.getAllByRole('button', { name: /voltar para dashboard/i })[0];
    expect(backButton).toBeInTheDocument();
  });

  it('renders rating information', () => {
    render(<MovieDetails movie={mockMovie} />);
    // Percentage usually shown in RatingIndicator
    const ratings = screen.getAllByText('84');
    expect(ratings.length).toBeGreaterThan(0);
  });

  it('renders monetary information', () => {
    render(<MovieDetails movie={mockMovie} />);
    expect(screen.getAllByText('$165.00M').length).toBeGreaterThan(0);
    expect(screen.getAllByText('$675.12M').length).toBeGreaterThan(0);
    expect(screen.getAllByText('$510.12M').length).toBeGreaterThan(0);
  });
});
