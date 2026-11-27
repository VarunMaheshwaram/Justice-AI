import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { JusticeLogo } from '../common/JusticeLogo';
import { Button } from '../ui/button';
import { useAuth } from '../../context/AuthContext';
import { cn } from '../../utils/cn';

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/features', label: 'Features' },
  { to: '/how-it-works', label: 'How It Works' },
  { to: '/find-advocates', label: 'Find Advocates' },
  { to: '/about', label: 'About' },
];

export const PublicNavbar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const dashboardRoute =
    user?.role === 'advocate'
      ? '/advocate/dashboard'
      : user?.role === 'admin'
        ? '/admin/dashboard'
        : '/client/dashboard';

  return (
    <header className="sticky top-0 z-40 border-b border-[#E5E9EF] bg-white/95 backdrop-blur-sm no-print">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
        <Link to="/" className="shrink-0 focus-visible:outline-none">
          <JusticeLogo />
        </Link>

        <nav className="hidden md:flex items-center gap-7" aria-label="Primary navigation">
          {NAV_LINKS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                cn(
                  'text-sm font-medium whitespace-nowrap shrink-0 transition-colors hover:text-[#14243A]',
                  isActive
                    ? 'text-[#14243A] underline underline-offset-8 decoration-2 decoration-[#D9874D]'
                    : 'text-[#697586]'
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4 shrink-0">
          {user ? (
            <Button onClick={() => navigate(dashboardRoute)} size="sm">
              Open Workspace
            </Button>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm font-medium text-[#202936] hover:text-[#14243A] whitespace-nowrap shrink-0"
              >
                Login
              </Link>
              <Button asChild size="sm">
                <Link to="/register">Get Started</Link>
              </Button>
            </>
          )}
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-md text-[#14243A] hover:bg-[#F7F8FA] md:hidden"
          aria-label="Toggle navigation menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-[#E5E9EF] bg-white px-4 py-4 md:hidden">
          <nav className="flex flex-col space-y-1">
            {NAV_LINKS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  cn(
                    'rounded-md px-3 py-2.5 text-sm font-medium',
                    isActive
                      ? 'bg-[#F7F8FA] text-[#14243A]'
                      : 'text-[#697586] hover:bg-[#F7F8FA] hover:text-[#14243A]'
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
          <div className="mt-4 flex flex-col gap-2 border-t border-[#E5E9EF] pt-4">
            {user ? (
              <Button
                onClick={() => {
                  setMobileOpen(false);
                  navigate(dashboardRoute);
                }}
                className="w-full"
              >
                Open Workspace
              </Button>
            ) : (
              <>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/login" onClick={() => setMobileOpen(false)}>
                    Login
                  </Link>
                </Button>
                <Button asChild className="w-full">
                  <Link to="/register" onClick={() => setMobileOpen(false)}>
                    Get Started
                  </Link>
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
