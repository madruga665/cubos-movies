import { render, screen } from '@testing-library/react';
import { SearchInput } from './search-input';

describe('SearchInput component', () => {
  it('renders correctly', () => {
    render(<SearchInput />);
    expect(screen.getByPlaceholderText('Pesquise por filmes')).toBeInTheDocument();
  });

  it('renders the spinner when loading is true', () => {
    const { container } = render(<SearchInput loading />);
    const spinner = container.querySelector('.animate-spin');
    expect(spinner).toBeInTheDocument();
  });

  it('does not render the spinner when loading is false', () => {
    const { container } = render(<SearchInput loading={false} />);
    const spinner = container.querySelector('.animate-spin');
    expect(spinner).not.toBeInTheDocument();
  });
});
