import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, CheckCheck } from 'lucide-react';
import { toast } from 'sonner';
import { INDIAN_STATES, LANGUAGES } from '../../constants';
import { useAuth } from '../../context/AuthContext';
import { useAppData } from '../../hooks/useAppData';
import { PageHeader } from '../../components/common/PageHeader';
import { EmptyState } from '../../components/common/EmptyState';
import { Button } from '../../components/ui/button';
import { Input, Label, Select } from '../../components/ui/input';
import { Switch } from '../../components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { UserRole } from '../../types';
import { formatDateTime, getInitials } from '../../utils/formatters';

export const NotificationsCenterView: React.FC<{ role: UserRole }> = ({ role }) => {
  const { notifications, markNotificationRead, markAllNotificationsRead } = useAppData();
  const [filter, setFilter] = useState<'all' | 'unread'>('all');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const navigate = useNavigate();

  const items = useMemo(() => {
    return notifications.filter((n) => {
      if (n.role !== role) return false;
      if (filter === 'unread' && n.read) return false;
      if (categoryFilter !== 'All' && n.category !== categoryFilter) return false;
      return true;
    });
  }, [categoryFilter, filter, notifications, role]);

  return (
    <div className="space-y-6">
      <PageHeader
        meta="Activity & Alerts · Demo Mode"
        title="Notifications"
        description="Track document uploads, completed demonstration analyses, case updates, and consultation enquiries."
        actions={
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              markAllNotificationsRead(role);
              toast.success('All notifications marked as read.');
            }}
          >
            <CheckCheck className="h-4 w-4" />
            Mark All as Read
          </Button>
        }
      />

      <div className="rounded-lg border border-[#E5E9EF] bg-white p-4 flex flex-wrap items-center justify-between gap-3">
        <div className="inline-flex items-center gap-1 rounded-md bg-[#F7F8FA] p-1 border border-[#E5E9EF]">
          {(['all', 'unread'] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setFilter(tab)}
              className={`rounded px-3 py-1.5 text-xs font-medium capitalize cursor-pointer ${
                filter === tab ? 'bg-[#14243A] text-white' : 'text-[#697586] hover:text-[#14243A]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <Select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="w-56"
          aria-label="Filter notification category"
        >
          <option value="All">All Categories</option>
          <option value="Document Uploaded">Document Uploaded</option>
          <option value="Analysis Completed">Analysis Completed</option>
          <option value="Processing Failed">Processing Failed</option>
          <option value="Case Updated">Case Updated</option>
          <option value="New Enquiry">New Enquiry</option>
          <option value="Profile Updated">Profile Updated</option>
          <option value="Verification Updated">Verification Updated</option>
        </Select>
      </div>

      {items.length === 0 ? (
        <EmptyState
          icon={Bell}
          title="No notifications to show"
          description="You are all caught up across your demonstration workspace."
        />
      ) : (
        <div className="rounded-lg border border-[#E5E9EF] bg-white divide-y divide-[#E5E9EF]">
          {items.map((ntf) => (
            <div
              key={ntf.id}
              className={`p-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between ${
                !ntf.read ? 'bg-[#F5E4D6]/20' : ''
              }`}
            >
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2 text-xs text-[#697586]">
                  <span className="font-semibold text-[#D9874D]">{ntf.category}</span>
                  <span aria-hidden="true">·</span>
                  <span className="tabular-nums">{formatDateTime(ntf.timestamp)}</span>
                  {!ntf.read && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span className="font-semibold text-[#14243A]">Unread</span>
                    </>
                  )}
                </div>
                <p className="text-sm font-semibold text-[#14243A]">{ntf.title}</p>
                <p className="text-sm text-[#697586]">{ntf.message}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {ntf.link && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      markNotificationRead(ntf.id);
                      navigate(ntf.link!);
                    }}
                  >
                    Open
                  </Button>
                )}
                {!ntf.read && (
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => {
                      markNotificationRead(ntf.id);
                      toast.success('Marked as read.');
                    }}
                  >
                    Mark as Read
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export const ClientNotificationsPage: React.FC = () => <NotificationsCenterView role="client" />;

export const ClientProfilePage: React.FC = () => {
  const { user, updateCurrentUser } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [city, setCity] = useState(user?.city || 'Hyderabad');
  const [stateVal, setStateVal] = useState(user?.state || 'Telangana');
  const [preferredLanguage, setPreferredLanguage] = useState(user?.preferredLanguage || 'English');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateCurrentUser({ name, email, phone, city, state: stateVal, preferredLanguage });
    toast.success('Client profile updated in local demo session.');
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <PageHeader
        meta="Account Profile · Local Demo Storage"
        title="My Profile"
        description="Manage your personal contact information, location, and language preferences."
      />

      <form
        onSubmit={handleSave}
        className="rounded-lg border border-[#E5E9EF] bg-white p-6 space-y-6"
      >
        <div className="flex items-center gap-4 border-b border-[#E5E9EF] pb-5">
          <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-[#14243A] text-lg font-semibold text-white">
            {getInitials(name || 'User')}
          </div>
          <div>
            <p className="text-base font-semibold text-[#14243A]">{name}</p>
            <p className="text-xs text-[#697586]">Client Demo Account · {email}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="prof-name">Full Name</Label>
            <Input id="prof-name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="prof-email">Email</Label>
            <Input
              id="prof-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="prof-phone">Phone</Label>
            <Input id="prof-phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="prof-lang">Preferred Language</Label>
            <Select
              id="prof-lang"
              value={preferredLanguage}
              onChange={(e) => setPreferredLanguage(e.target.value)}
            >
              {LANGUAGES.map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="prof-city">City</Label>
            <Input id="prof-city" value={city} onChange={(e) => setCity(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="prof-state">State</Label>
            <Select id="prof-state" value={stateVal} onChange={(e) => setStateVal(e.target.value)}>
              {INDIAN_STATES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </Select>
          </div>
        </div>

        <div className="flex justify-end border-t border-[#E5E9EF] pt-4">
          <Button type="submit">Save Profile Changes</Button>
        </div>
      </form>
    </div>
  );
};

export const SharedSettingsView: React.FC<{ roleLabel: string }> = ({ roleLabel }) => {
  const { user, updateCurrentUser } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [analysisAlerts, setAnalysisAlerts] = useState(true);
  const [enquiryAlerts, setEnquiryAlerts] = useState(true);
  const [privateWorkspace, setPrivateWorkspace] = useState(true);
  const [compactTables, setCompactTables] = useState(false);

  return (
    <div className="space-y-6 max-w-4xl">
      <PageHeader
        meta={`${roleLabel} · Preferences`}
        title="Settings"
        description="Configure personal information, account preferences, notifications, privacy controls, appearance, and security information."
      />

      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="personal">Personal Info</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="personal">
          <div className="rounded-lg border border-[#E5E9EF] bg-white p-6 space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label>Display Name</Label>
                <Input value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label>Phone Number</Label>
                <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
              </div>
            </div>
            <Button
              onClick={() => {
                updateCurrentUser({ name, phone });
                toast.success('Personal information saved.');
              }}
            >
              Update Information
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="account">
          <div className="rounded-lg border border-[#E5E9EF] bg-white p-6 space-y-4 text-sm">
            <div className="flex justify-between border-b border-[#E5E9EF] pb-3">
              <span className="text-[#697586]">Active Role</span>
              <span className="font-semibold text-[#14243A]">{roleLabel}</span>
            </div>
            <div className="flex justify-between border-b border-[#E5E9EF] pb-3">
              <span className="text-[#697586]">Environment Mode</span>
              <span className="font-medium text-[#D9874D]">Frontend Demonstration Mode</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#697586]">Time Zone</span>
              <span className="font-mono text-xs text-[#14243A]">Asia/Kolkata (IST, UTC+05:30)</span>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="notifications">
          <div className="rounded-lg border border-[#E5E9EF] bg-white p-6 space-y-5">
            {[
              {
                label: 'Email notifications for case updates',
                desc: 'Receive summaries when documents finish processing or hearings approach.',
                checked: emailAlerts,
                onChange: setEmailAlerts,
              },
              {
                label: 'AI analysis completion alerts',
                desc: 'Notify when demonstration analysis reports or contradiction scans finish.',
                checked: analysisAlerts,
                onChange: setAnalysisAlerts,
              },
              {
                label: 'Advocate enquiry updates',
                desc: 'Alert immediately when an advocate responds or a new enquiry arrives.',
                checked: enquiryAlerts,
                onChange: setEnquiryAlerts,
              },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-[#14243A]">{item.label}</p>
                  <p className="text-xs text-[#697586]">{item.desc}</p>
                </div>
                <Switch
                  checked={item.checked}
                  onCheckedChange={(v) => {
                    item.onChange(v);
                    toast.success('Notification preference updated.');
                  }}
                />
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="privacy">
          <div className="rounded-lg border border-[#E5E9EF] bg-white p-6 space-y-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-[#14243A]">
                  Strict Private Document Isolation
                </p>
                <p className="text-xs text-[#697586]">
                  Prevent automatic document sharing with directory advocates during enquiries.
                </p>
              </div>
              <Switch
                checked={privateWorkspace}
                onCheckedChange={(v) => {
                  setPrivateWorkspace(v);
                  toast.success('Privacy preference saved.');
                }}
              />
            </div>
            <p className="text-xs text-[#697586] border-t border-[#E5E9EF] pt-4 leading-relaxed">
              In this frontend demonstration phase, all data remains locally in your browser session
              and is never uploaded to external servers.
            </p>
          </div>
        </TabsContent>

        <TabsContent value="appearance">
          <div className="rounded-lg border border-[#E5E9EF] bg-white p-6 space-y-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-[#14243A]">Compact Table Density</p>
                <p className="text-xs text-[#697586]">
                  Prefer tighter row spacing for high-density document and case tables.
                </p>
              </div>
              <Switch
                checked={compactTables}
                onCheckedChange={(v) => {
                  setCompactTables(v);
                  toast.success('Display density updated.');
                }}
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="security">
          <div className="rounded-lg border border-[#E5E9EF] bg-white p-6 space-y-4 text-sm">
            <h3 className="font-semibold text-[#14243A]">Security & Authentication Information</h3>
            <p className="text-xs text-[#697586] leading-relaxed">
              Current session uses browser local demonstration storage. When connected to the
              planned Python FastAPI + Supabase Auth backend, multi-factor authentication,
              encrypted JWT sessions, and private presigned document URLs will be enforced.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => toast.info('Demo Mode: No active backend sessions to revoke.')}
            >
              Review Active Sessions (Demo)
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export const ClientSettingsPage: React.FC = () => (
  <SharedSettingsView roleLabel="Client Workspace" />
);
