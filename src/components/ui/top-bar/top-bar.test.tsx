import { render, screen } from '@testing-library/react';
import { Topbar } from './top-bar';

const mockSession = {
  session: {
    expiresAt: new Date('2026-04-12T00:08:12.464Z'),
    token: 'lh9OPZoBPdvsj1G8F7w1xUYMdE18eRUg',
    createdAt: new Date('2026-04-05T00:08:12.464Z'),
    updatedAt: new Date('2026-04-05T00:08:12.464Z'),
    ipAddress: '',
    userAgent: '',
    userId: 'nfH2ZumlYHe6QEzTwNPZvmotyMRx0swF',
    id: 'pJRFgic98DRKHQIsu3Ll76xMdhHwvksC',
  },
  user: {
    name: 'john doe',
    email: 'user@example.com',
    emailVerified: false,
    image: null,
    createdAt: new Date('2026-04-03T21:19:37.113Z'),
    updatedAt: new Date('2026-04-03T21:19:37.113Z'),
    id: 'nfH2ZumlYHe6QEzTwNPZvmotyMRx0swF',
  },
};

jest.mock('@/app/(auth)/actions', () => ({
  logoutAction: jest.fn(),
}));

jest.mock('@/lib/auth', () => ({
  auth: {
    api: {
      getSession: jest.fn().mockResolvedValue({ session: () => mockSession }),
    },
  },
}));

describe('Topbar component', () => {
  function renderTopbar() {
    return render(<Topbar session={mockSession} />);
  }

  it('renders Logo components', () => {
    renderTopbar();

    expect(screen.getByText('Movies')).toBeInTheDocument();
  });

  it('renders Logout button', () => {
    renderTopbar();

    expect(screen.getByText('Logout')).toBeInTheDocument();
  });
});
