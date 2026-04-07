import React from 'react';
import { render, screen } from '@testing-library/react';
import { SearchInput } from './search-input';

describe('SearchInput component', () => {
  it('renders correctly', () => {
    render(<SearchInput />);
    expect(screen.getByPlaceholderText('Pesquise por filmes')).toBeInTheDocument();
  });
});
