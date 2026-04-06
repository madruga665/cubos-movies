import { render, screen } from '@testing-library/react';
import { Topbar } from './top-bar';
import { usePathname } from 'next/navigation';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

jest.mock('@/app/(auth)/actions', () => ({
  logoutAction: jest.fn(),
}));

describe('Topbar component', () => {
  function renderTopbar() {
    return render(<Topbar />);
  }

  it('renders Logo components', () => {
    renderTopbar();

    expect(screen.getByText('Movies')).toBeInTheDocument();
  });

  it('renders Logout button', () => {
    (usePathname as jest.Mock).mockReturnValue('/dashboard');
    renderTopbar();

    expect(screen.getByText('Logout')).toBeInTheDocument();
  });
});
