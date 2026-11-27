import React, { useState, useMemo } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  Bell,
  ChevronLeft,
  ChevronRight,
  LogOut,
  LucideIcon,
  Menu,
  Search,
  Settings,
  User as UserIcon,
  X,
} from 'lucide-react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { JusticeLogo } from '../common/JusticeLogo';
import { DisclaimerBanner } from '../common/DisclaimerBanner';
import { useAuth } from '../../context/AuthContext';
import { useAppData } from '../../hooks/useAppData';
import { UserRole } from '../../types';
import { formatRelativeTime, getInitials } from '../../utils/formatters';
import { cn } from '../../utils/cn';

export interface NavItemConfig {
  to: string;
  label: string;
  icon: LucideIcon;
  section?: string;
}

interface DashboardShellProps {
  role: UserRole;
  roleLabel: string;
  navItems: NavItemConfig[];
  profilePath: string;
  settingsPath: string;
  notificationsPath: string;
  children: React.ReactNode;
}

export const DashboardShell: React.FC<DashboardShellProps> = ({
  role,
  roleLabel,
  navItems,
  profilePath,
  settingsPath,
  notificationsPath,
  children,
}) => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [globalSearch, setGlobalSearch] = useState('');
  const { user, logout } = useAuth();
  const { notifications, markNotificationRead, markAllNotificationsRead } = useAppData();
  const location = useLocation();
  const navigate = useNavigate();

  const roleNotifications = useMemo(
    () => notifications.filter((n) => n.role === role),
    [notifications, role]
  );
  const unreadCount = roleNotifications.filter((n) => !n.read).length;

  const activeNav = useMemo(() => {
    const exact = navItems.find((item) => item.to === location.pathname);
    if (exact) return exact;
    return navItems.find(
      (item) => item.to !== `/${role}/dashboard` && location.pathname.startsWith(item.to)
    );
  }, [location.pathname, navItems, role]);

  const pageTitle = activeNav?.label || 'Dashboard';

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const handleGlobalSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = globalSearch.trim();
    if (!q) return;
    if (role === 'client') {
      navigate(`/client/cases?q=${encodeURIComponent(q)}`);
    } else if (role === 'advocate') {
      navigate(`/advocate/enquiries?q=${encodeURIComponent(q)}`);
    } else {
      navigate(`/admin/users?q=${encodeURIComponent(q)}`);
    }
    setGlobalSearch('');
  };

  const renderSidebarLinks = (isMobile = false) => (
    <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1" aria-label={`${roleLabel} navigation`}>
      {navItems.map((item) => {
        const Icon = item.icon;
        return (
          <NavLink
            key={item.to}
            to={item.to}
            onClick={() => isMobile && setMobileMenuOpen(false)}
            title={collapsed && !isMobile ? item.label : undefined}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-[#203650] text-white'
                  : 'text-slate-300 hover:bg-white/5 hover:text-white',
                collapsed && !isMobile && 'justify-center px-2'
              )
            }
          >
            <Icon className="h-4 w-4 shrink-0 text-[#D9874D]" />
            {(!collapsed || isMobile) && <span className="truncate">{item.label}</span>}
          </NavLink>
        );
      })}
    </nav>
  );

  return (
    <div className="min-h-screen bg-[#F7F8FA] flex">
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          'hidden lg:flex lg:flex-col lg:fixed lg:inset-y-0 lg:left-0 bg-[#14243A] text-white border-r border-[#0D1929] transition-all duration-200 z-30 no-print',
          collapsed ? 'w-[72px]' : 'w-64'
        )}
      >
        <div className="flex h-16 items-center justify-between px-4 border-b border-white/10">
          <Link to={`/${role}/dashboard`} className="overflow-hidden">
            <JusticeLogo variant="light" compact={collapsed} />
          </Link>
          <button
            type="button"
            onClick={() => setCollapsed((prev) => !prev)}
            className="rounded-md p-1.5 text-slate-300 hover:bg-white/10 hover:text-white"
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </button>
        </div>

        {!collapsed && (
          <div className="px-4 py-2.5 border-b border-white/10">
            <p className="text-xs font-medium text-slate-300">{roleLabel} · Demo Mode</p>
          </div>
        )}

        {renderSidebarLinks(false)}

        <div className="border-t border-white/10 p-3 space-y-2">
          {!collapsed && (
            <div className="flex items-center gap-2.5 px-2 py-1.5">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-[#203650] text-xs font-semibold text-white">
                {getInitials(user?.name || 'User')}
              </div>
              <div className="min-w-0">
                <p className="truncate text-xs font-medium text-white">{user?.name}</p>
                <p className="truncate text-[11px] text-slate-400">{user?.email}</p>
              </div>
            </div>
          )}
          <button
            type="button"
            onClick={handleLogout}
            className={cn(
              'flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-xs font-medium text-slate-300 hover:bg-white/10 hover:text-white transition-colors cursor-pointer',
              collapsed && 'justify-center px-2'
            )}
          >
            <LogOut className="h-4 w-4 shrink-0" />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden no-print">
          <div
            className="fixed inset-0 bg-[#0D1929]/60"
            onClick={() => setMobileMenuOpen(false)}
          />
          <aside className="fixed inset-y-0 left-0 flex w-72 max-w-[85vw] flex-col bg-[#14243A] text-white shadow-xl">
            <div className="flex h-16 items-center justify-between px-4 border-b border-white/10">
              <JusticeLogo variant="light" />
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-md p-2 text-slate-300 hover:bg-white/10"
                aria-label="Close sidebar"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="px-4 py-2.5 border-b border-white/10">
              <p className="text-xs font-medium text-slate-300">{roleLabel} · Demo Mode</p>
            </div>
            {renderSidebarLinks(true)}
            <div className="border-t border-white/10 p-3">
              <button
                type="button"
                onClick={handleLogout}
                className="flex w-full items-center gap-2.5 rounded-md px-3 py-2.5 text-sm font-medium text-slate-200 hover:bg-white/10"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* Main Content Area */}
      <div
        className={cn(
          'flex-1 flex flex-col min-w-0 transition-all duration-200',
          collapsed ? 'lg:pl-[72px]' : 'lg:pl-64'
        )}
      >
        {/* Top Header */}
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between gap-4 border-b border-[#E5E9EF] bg-white px-4 sm:px-6 no-print">
          <div className="flex items-center gap-3 min-w-0">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-md text-[#14243A] hover:bg-[#F7F8FA] lg:hidden shrink-0"
              aria-label="Open navigation menu"
            >
              <Menu className="h-5 w-5" />
            </button>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 text-xs text-[#697586] truncate">
                <Link to={`/${role}/dashboard`} className="hover:text-[#14243A]">
                  {roleLabel}
                </Link>
                <span aria-hidden="true">/</span>
                <span className="font-medium text-[#14243A] truncate">{pageTitle}</span>
              </div>
              <p className="text-sm font-semibold text-[#14243A] truncate sm:hidden">
                {pageTitle}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <form onSubmit={handleGlobalSearch} className="hidden md:flex items-center relative">
              <Search className="pointer-events-none absolute left-3 h-4 w-4 text-[#697586]" />
              <input
                type="search"
                value={globalSearch}
                onChange={(e) => setGlobalSearch(e.target.value)}
                placeholder="Search workspace..."
                aria-label="Search workspace"
                className="h-9 w-56 lg:w-64 rounded-md border border-[#E5E9EF] bg-[#F7F8FA] pl-9 pr-3 text-xs text-[#202936] placeholder:text-[#697586] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#14243A]"
              />
            </form>

            {/* Notifications Dropdown */}
            <DropdownMenu.Root>
              <DropdownMenu.Trigger asChild>
                <button
                  type="button"
                  className="relative inline-flex h-10 w-10 items-center justify-center rounded-md border border-[#E5E9EF] bg-white text-[#202936] hover:bg-[#F7F8FA] cursor-pointer"
                  aria-label="Notifications"
                >
                  <Bell className="h-4 w-4" />
                  {unreadCount > 0 && (
                    <span className="absolute -right-1 -top-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-[#D9874D] px-1 text-[10px] font-semibold text-white tabular-nums">
                      {unreadCount}
                    </span>
                  )}
                </button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Portal>
                <DropdownMenu.Content
                  align="end"
                  sideOffset={8}
                  className="z-50 w-80 sm:w-96 rounded-lg border border-[#E5E9EF] bg-white p-0 shadow-lg"
                >
                  <div className="flex items-center justify-between border-b border-[#E5E9EF] px-4 py-3">
                    <span className="text-sm font-semibold text-[#14243A]">Notifications</span>
                    {unreadCount > 0 && (
                      <button
                        type="button"
                        onClick={() => markAllNotificationsRead(role)}
                        className="text-xs font-medium text-[#D9874D] hover:underline cursor-pointer"
                      >
                        Mark all read
                      </button>
                    )}
                  </div>
                  <div className="max-h-80 overflow-y-auto divide-y divide-[#E5E9EF]">
                    {roleNotifications.slice(0, 5).map((ntf) => (
                      <button
                        key={ntf.id}
                        type="button"
                        onClick={() => {
                          markNotificationRead(ntf.id);
                          if (ntf.link) navigate(ntf.link);
                        }}
                        className={cn(
                          'w-full text-left px-4 py-3 hover:bg-[#F7F8FA] transition-colors cursor-pointer',
                          !ntf.read && 'bg-[#F5E4D6]/25'
                        )}
                      >
                        <div className="flex items-center justify-between gap-2 text-xs text-[#697586]">
                          <span className="font-medium text-[#14243A]">{ntf.category}</span>
                          <span className="tabular-nums">{formatRelativeTime(ntf.timestamp)}</span>
                        </div>
                        <p className="mt-1 text-xs font-medium text-[#202936]">{ntf.title}</p>
                        <p className="mt-0.5 text-xs text-[#697586] line-clamp-2">{ntf.message}</p>
                      </button>
                    ))}
                  </div>
                  <div className="border-t border-[#E5E9EF] px-4 py-2.5 text-center">
                    <Link
                      to={notificationsPath}
                      className="text-xs font-medium text-[#14243A] hover:text-[#D9874D]"
                    >
                      View all notifications
                    </Link>
                  </div>
                </DropdownMenu.Content>
              </DropdownMenu.Portal>
            </DropdownMenu.Root>

            {/* User Profile Dropdown */}
            <DropdownMenu.Root>
              <DropdownMenu.Trigger asChild>
                <button
                  type="button"
                  className="flex items-center gap-2.5 rounded-md border border-[#E5E9EF] bg-white px-2.5 py-1.5 hover:bg-[#F7F8FA] cursor-pointer"
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-md bg-[#14243A] text-xs font-semibold text-white">
                    {getInitials(user?.name || 'User')}
                  </span>
                  <span className="hidden sm:block text-left">
                    <span className="block text-xs font-semibold text-[#14243A] leading-tight max-w-[130px] truncate">
                      {user?.name}
                    </span>
                    <span className="block text-[11px] text-[#697586] leading-tight">
                      {roleLabel}
                    </span>
                  </span>
                </button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Portal>
                <DropdownMenu.Content
                  align="end"
                  sideOffset={8}
                  className="z-50 w-56 rounded-lg border border-[#E5E9EF] bg-white p-1.5 shadow-lg"
                >
                  <div className="px-2.5 py-2 border-b border-[#E5E9EF] mb-1">
                    <p className="text-xs font-semibold text-[#14243A] truncate">{user?.name}</p>
                    <p className="text-[11px] text-[#697586] truncate">{user?.email}</p>
                  </div>
                  <DropdownMenu.Item asChild>
                    <Link
                      to={profilePath}
                      className="flex items-center gap-2 rounded-md px-2.5 py-2 text-xs font-medium text-[#202936] hover:bg-[#F7F8FA] outline-none"
                    >
                      <UserIcon className="h-3.5 w-3.5 text-[#697586]" />
                      Profile
                    </Link>
                  </DropdownMenu.Item>
                  <DropdownMenu.Item asChild>
                    <Link
                      to={settingsPath}
                      className="flex items-center gap-2 rounded-md px-2.5 py-2 text-xs font-medium text-[#202936] hover:bg-[#F7F8FA] outline-none"
                    >
                      <Settings className="h-3.5 w-3.5 text-[#697586]" />
                      Settings
                    </Link>
                  </DropdownMenu.Item>
                  <DropdownMenu.Separator className="my-1 h-px bg-[#E5E9EF]" />
                  <DropdownMenu.Item
                    onSelect={handleLogout}
                    className="flex items-center gap-2 rounded-md px-2.5 py-2 text-xs font-medium text-[#C94D4D] hover:bg-[#F7F8FA] outline-none cursor-pointer"
                  >
                    <LogOut className="h-3.5 w-3.5" />
                    Logout
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Portal>
            </DropdownMenu.Root>
          </div>
        </header>

        {/* Page Viewport */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-[1400px] w-full mx-auto space-y-6">
          {children}
          <div className="pt-4 no-print">
            <DisclaimerBanner compact />
          </div>
        </main>
      </div>
    </div>
  );
};
