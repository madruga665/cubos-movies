import React from 'react';
import { render, screen } from '@testing-library/react';
import { Logo } from './logo';

describe('Logo component', () => {
  it('renders "Movies" text', () => {
    render(<Logo />);
    expect(screen.getByText('Movies')).toBeInTheDocument();
  });
});
