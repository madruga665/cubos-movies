import { render, screen } from '@testing-library/react';
import { Topbar } from './top-bar';
import { usePathname } from 'next/navigation';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

jest.mock('@/features/auth/actions', () => ({
  logoutAction: jest.fn(),
}));

jest.mock('next-themes', () => ({
  useTheme: () => ({
    theme: 'dark',
    setTheme: jest.fn(),
  }),
}));

describe('Topbar component', () => {
  function renderTopbar() {
    return render(<Topbar />);
  }

  it('renders Logo components', () => {
    (usePathname as jest.Mock).mockReturnValue('/');
    renderTopbar();

    expect(screen.getByText('Movies')).toBeInTheDocument();
  });

  it('renders Logout button on dashboard root', () => {
    (usePathname as jest.Mock).mockReturnValue('/dashboard');
    renderTopbar();

    expect(screen.getByText('Logout')).toBeInTheDocument();
  });

  it('renders Logout button on dashboard subroutes', () => {
    (usePathname as jest.Mock).mockReturnValue('/dashboard/movies/123');
    renderTopbar();

    expect(screen.getByText('Logout')).toBeInTheDocument();
  });

  it('does not render Logout button on other routes', () => {
    (usePathname as jest.Mock).mockReturnValue('/login');
    renderTopbar();

    expect(screen.queryByText('Logout')).not.toBeInTheDocument();
  });
});
