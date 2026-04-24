import React from 'react';
import { render, screen } from '@testing-library/react';
import { Footer } from './footer';

describe('Footer component', () => {
  it('renders copyright text', () => {
    render(<Footer />);
    expect(screen.getByText(/Todos os direitos reservados a/)).toBeInTheDocument();
  });

  it('renders brand name', () => {
    render(<Footer />);
    expect(screen.getByText('Cubos Movies')).toBeInTheDocument();
  });
});
