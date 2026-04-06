'use client';
import { Logo } from '@/components/ui/logo/logo';
import { Button } from '@/components/ui/button/button';
import { useTheme } from 'next-themes';
import { useSyncExternalStore } from 'react';
import { logoutAction } from '@/app/(auth)/actions';
import { redirect, usePathname } from 'next/navigation';

function useHasMounted() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

export function Topbar() {
  const mounted = useHasMounted();
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const isDashboard = pathname === '/dashboard';

  if (!mounted) return null;

  async function onLogout() {
    await logoutAction();

    redirect('/');
  }

  return (
    <header className="bg-background light:bg-background backdrop-blur-[2px] light:backdrop-blur-0 border-b border-border-custom flex h-18 items-center justify-between px-4 w-full">
      <div className="flex items-center">
        <Logo />
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          aria-label="Toggle Theme"
        >
          <div className="w-4.5 h-4.5 flex items-center justify-center">
            {theme === 'dark' ? (
              /* Sun Icon for switching to light */
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="#ffffff"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="9" cy="9" r="4.5" stroke="#ffffff" strokeWidth="0.6" />
                <path
                  d="M9 1V3M9 15V17M17 9H15M3 9H1M14.6569 3.34315L13.2426 4.75736M4.75736 13.2426L3.34315 14.6569M14.6569 14.6569L13.2426 13.2426M4.75736 4.75736L3.34315 3.34315"
                  stroke="#ffffff"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
            ) : (
              /* Moon Icon for switching to dark */
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            )}
          </div>
        </Button>
        {isDashboard && <Button onClick={onLogout}>Logout</Button>}
      </div>
    </header>
  );
}
