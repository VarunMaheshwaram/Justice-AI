import React from 'react';
import { Outlet } from 'react-router-dom';
import {
  LayoutDashboard,
  UserCheck,
  Edit3,
  Briefcase,
  ShieldCheck,
  Mail,
  Inbox,
  Calendar,
  Bell,
  Settings,
} from 'lucide-react';
import { DashboardShell, NavItemConfig } from '../components/navigation/DashboardShell';

const ADVOCATE_NAV: NavItemConfig[] = [
  { to: '/advocate/dashboard', label: 'Overview', icon: LayoutDashboard },
  { to: '/advocate/profile', label: 'My Profile', icon: UserCheck },
  { to: '/advocate/edit-profile', label: 'Edit Profile', icon: Edit3 },
  { to: '/advocate/practice-areas', label: 'Practice Areas', icon: Briefcase },
  { to: '/advocate/verification', label: 'Verification', icon: ShieldCheck },
  { to: '/advocate/enquiries', label: 'Enquiries', icon: Mail },
  { to: '/advocate/client-requests', label: 'Client Requests', icon: Inbox },
  { to: '/advocate/availability', label: 'Availability', icon: Calendar },
  { to: '/advocate/notifications', label: 'Notifications', icon: Bell },
  { to: '/advocate/settings', label: 'Settings', icon: Settings },
];

export const AdvocateLayout: React.FC = () => {
  return (
    <DashboardShell
      role="advocate"
      roleLabel="Advocate Portal"
      navItems={ADVOCATE_NAV}
      profilePath="/advocate/profile"
      settingsPath="/advocate/settings"
      notificationsPath="/advocate/notifications"
    >
      <Outlet />
    </DashboardShell>
  );
};
