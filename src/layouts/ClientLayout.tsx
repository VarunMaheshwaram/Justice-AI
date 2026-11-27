import React from 'react';
import { Outlet } from 'react-router-dom';
import {
  LayoutDashboard,
  Briefcase,
  FileText,
  Scale,
  AlertTriangle,
  ListChecks,
  Compass,
  MessageSquare,
  BookOpen,
  CalendarClock,
  Users,
  Bookmark,
  Mail,
  Bell,
  UserCircle,
  Settings,
} from 'lucide-react';
import { DashboardShell, NavItemConfig } from '../components/navigation/DashboardShell';

const CLIENT_NAV: NavItemConfig[] = [
  { to: '/client/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/client/cases', label: 'My Cases', icon: Briefcase },
  { to: '/client/documents', label: 'Documents', icon: FileText },
  { to: '/client/analysis', label: 'AI Legal Analysis', icon: Scale },
  { to: '/client/important-points', label: 'Important Points', icon: ListChecks },
  { to: '/client/contradictions', label: 'Contradictions', icon: AlertTriangle },
  { to: '/client/perspective', label: 'Perspective Analysis', icon: Compass },
  { to: '/client/assistant', label: 'Ask Justice AI', icon: MessageSquare },
  { to: '/client/legal-knowledge', label: 'Indian Legal Knowledge', icon: BookOpen },
  { to: '/client/timeline', label: 'Case Timeline', icon: CalendarClock },
  { to: '/client/advocates', label: 'Find Advocates', icon: Users },
  { to: '/client/saved-advocates', label: 'Saved Advocates', icon: Bookmark },
  { to: '/client/enquiries', label: 'Enquiries', icon: Mail },
  { to: '/client/notifications', label: 'Notifications', icon: Bell },
  { to: '/client/profile', label: 'Profile', icon: UserCircle },
  { to: '/client/settings', label: 'Settings', icon: Settings },
];

export const ClientLayout: React.FC = () => {
  return (
    <DashboardShell
      role="client"
      roleLabel="Client Workspace"
      navItems={CLIENT_NAV}
      profilePath="/client/profile"
      settingsPath="/client/settings"
      notificationsPath="/client/notifications"
    >
      <Outlet />
    </DashboardShell>
  );
};
