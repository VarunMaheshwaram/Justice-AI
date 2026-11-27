import React from 'react';
import { Outlet } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Scale,
  ShieldAlert,
  BookOpen,
  FileBarChart,
  BarChart3,
  ClipboardList,
  Settings,
} from 'lucide-react';
import { DashboardShell, NavItemConfig } from '../components/navigation/DashboardShell';

const ADMIN_NAV: NavItemConfig[] = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/admin/users', label: 'Users', icon: Users },
  { to: '/admin/advocates', label: 'Advocates', icon: Scale },
  { to: '/admin/verifications', label: 'Verification Requests', icon: ShieldAlert },
  { to: '/admin/legal-sources', label: 'Legal Sources', icon: BookOpen },
  { to: '/admin/reports', label: 'Reports', icon: FileBarChart },
  { to: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
  { to: '/admin/audit-logs', label: 'Audit Logs', icon: ClipboardList },
  { to: '/admin/settings', label: 'Settings', icon: Settings },
];

export const AdminLayout: React.FC = () => {
  return (
    <DashboardShell
      role="admin"
      roleLabel="Admin Console"
      navItems={ADMIN_NAV}
      profilePath="/admin/settings"
      settingsPath="/admin/settings"
      notificationsPath="/admin/audit-logs"
    >
      <Outlet />
    </DashboardShell>
  );
};
