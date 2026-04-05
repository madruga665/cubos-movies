import { render, screen } from '@testing-library/react';
import { Input } from './input';

describe('Input component', () => {
  it('renders correctly with label', () => {
    render(<Input label="Username" />);
    expect(screen.getByText('Username')).toBeInTheDocument();
  });

  it('renders with placeholder', () => {
    render(<Input label="Username" placeholder="Enter username" />);
    expect(screen.getByPlaceholderText('Enter username')).toBeInTheDocument();
  });
});
