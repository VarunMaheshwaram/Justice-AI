import React, { useMemo, useState } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
} from 'recharts';
import { FileBarChart } from 'lucide-react';
import { useAppData } from '../../hooks/useAppData';
import { mockCategoryDistribution, mockMonthlyAnalytics } from '../../data/mockAdminData';
import { PageHeader } from '../../components/common/PageHeader';
import { StatusText } from '../../components/common/StatCard';
import { ReportPreviewModal, ReportSection } from '../../components/common/ReportPreviewModal';
import { SharedSettingsView } from '../client/ClientProfileSettingsPages';
import { Button } from '../../components/ui/button';
import { Input, Select } from '../../components/ui/input';
import { formatDateTime } from '../../utils/formatters';

export const AdminReportsPage: React.FC = () => {
  const { users, advocates, cases, documents, analysisReports } = useAppData();
  const [previewData, setPreviewData] = useState<{
    title: string;
    caseTitle: string;
    sections: ReportSection[];
    sources: string[];
  } | null>(null);

  const reportTemplates = [
    {
      id: 'rep-case',
      title: 'Case Summary Report Template',
      desc: 'Consolidated view of active demonstration cases, categories, and filing stages.',
      build: () => ({
        title: 'Platform Case Summary Report (Demo)',
        caseTitle: 'All Demonstration Workspaces',
        sections: [
          {
            heading: 'Case Inventory',
            items: cases.map((c) => `${c.title} (${c.caseNumber}) — ${c.category} · ${c.status}`),
          },
        ],
        sources: ['Local Demonstration Case Registry'],
      }),
    },
    {
      id: 'rep-analysis',
      title: 'Document Analysis Overview Report',
      desc: 'Summary of simulated OCR documents and demonstration AI analyses generated.',
      build: () => ({
        title: 'Document Analysis Overview (Demo)',
        caseTitle: `${documents.length} Simulated Documents · ${analysisReports.length} Reports`,
        sections: [
          {
            heading: 'Generated Demonstration Analyses',
            items: analysisReports.map((r) => `${r.reportTitle} — ${r.caseTitle}`),
          },
        ],
        sources: documents.map((d) => `${d.fileName} (${d.status})`),
      }),
    },
    {
      id: 'rep-directory',
      title: 'Advocate Verification & Directory Report',
      desc: 'Audit summary of registered demo advocates and verification statuses.',
      build: () => ({
        title: 'Advocate Directory Audit Report (Demo)',
        caseTitle: `${advocates.length} Registered Demo Advocates`,
        sections: [
          {
            heading: 'Directory Breakdown',
            items: advocates.map(
              (a) =>
                `${a.name} (${a.city}) — ${a.verificationStatus} · ${a.specializations.join(', ')}`
            ),
          },
          {
            heading: 'User Summary',
            items: [`Total demo accounts: ${users.length}`],
          },
        ],
        sources: ['Demonstration Advocate Directory'],
      }),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        meta="Administrator Console · Printable Previews"
        title="Platform Reports"
        description="Preview and print structured demonstration reports. Reports are informational snapshots and not official court documents."
      />

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {reportTemplates.map((tpl) => (
          <div
            key={tpl.id}
            className="rounded-lg border border-[#E5E9EF] bg-white p-6 flex flex-col justify-between gap-5"
          >
            <div className="space-y-2">
              <FileBarChart className="h-5 w-5 text-[#D9874D]" />
              <h2 className="text-base font-semibold text-[#14243A]">{tpl.title}</h2>
              <p className="text-sm text-[#697586] leading-relaxed">{tpl.desc}</p>
            </div>
            <Button variant="outline" onClick={() => setPreviewData(tpl.build())}>
              Open Report Preview
            </Button>
          </div>
        ))}
      </div>

      {previewData && (
        <ReportPreviewModal
          open={Boolean(previewData)}
          onOpenChange={(o) => !o && setPreviewData(null)}
          reportTitle={previewData.title}
          caseTitle={previewData.caseTitle}
          sections={previewData.sections}
          sources={previewData.sources}
        />
      )}
    </div>
  );
};

export const AdminAnalyticsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        meta="Administrator Console · Illustrative Trends"
        title="Platform Analytics"
        description="Explore simulated monthly growth metrics across user registrations, case workspaces, document volumes, and AI analyses."
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <section className="rounded-lg border border-[#E5E9EF] bg-white p-6 space-y-4">
          <h2 className="text-base font-semibold text-[#14243A]">
            User & Case Workspace Adoption (Demo)
          </h2>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockMonthlyAnalytics} margin={{ top: 8, right: 16, left: -12, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E9EF" />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#697586' }} />
                <YAxis tick={{ fontSize: 12, fill: '#697586' }} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="users"
                  name="Users"
                  stroke="#14243A"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="cases"
                  name="Cases"
                  stroke="#D9874D"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="rounded-lg border border-[#E5E9EF] bg-white p-6 space-y-4">
          <h2 className="text-base font-semibold text-[#14243A]">
            Case Categories Distribution (Demo)
          </h2>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockCategoryDistribution} margin={{ top: 8, right: 16, left: -12, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E9EF" />
                <XAxis dataKey="category" tick={{ fontSize: 12, fill: '#697586' }} />
                <YAxis tick={{ fontSize: 12, fill: '#697586' }} />
                <Tooltip />
                <Bar dataKey="count" name="Matters" fill="#203650" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>
    </div>
  );
};

export const AdminAuditLogsPage: React.FC = () => {
  const { auditLogs } = useAppData();
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return auditLogs.filter((entry) => {
      if (roleFilter !== 'All' && entry.actorRole !== roleFilter) return false;
      if (
        q &&
        !entry.actor.toLowerCase().includes(q) &&
        !entry.action.toLowerCase().includes(q) &&
        !entry.resource.toLowerCase().includes(q)
      ) {
        return false;
      }
      return true;
    });
  }, [auditLogs, roleFilter, search]);

  return (
    <div className="space-y-6">
      <PageHeader
        meta="Administrator Console · Activity Trace"
        title="Audit Logs"
        description="Chronological log of demonstration workspace actions across client, advocate, and administrator roles."
      />

      <div className="rounded-lg border border-[#E5E9EF] bg-white p-4 grid grid-cols-1 gap-3 sm:grid-cols-2 max-w-2xl">
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search actor, action, or resource..."
        />
        <Select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}>
          <option value="All">All Actor Roles</option>
          <option value="client">Client</option>
          <option value="advocate">Advocate</option>
          <option value="admin">Admin</option>
        </Select>
      </div>

      <div className="rounded-lg border border-[#E5E9EF] bg-white overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#E5E9EF] bg-[#F7F8FA] text-xs font-medium text-[#697586]">
                <th className="px-6 py-3">Timestamp</th>
                <th className="px-4 py-3">Actor</th>
                <th className="px-4 py-3">Action</th>
                <th className="px-4 py-3">Resource</th>
                <th className="px-4 py-3">Outcome</th>
                <th className="px-6 py-3 text-right">IP (Masked)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E9EF] text-sm">
              {filtered.map((log) => (
                <tr key={log.id} className="hover:bg-[#F7F8FA]">
                  <td className="px-6 py-3.5 font-mono text-xs text-[#697586] whitespace-nowrap tabular-nums">
                    {formatDateTime(log.timestamp)}
                  </td>
                  <td className="px-4 py-3.5">
                    <p className="text-xs font-medium text-[#14243A]">{log.actor}</p>
                    <p className="text-[11px] capitalize text-[#697586]">{log.actorRole}</p>
                  </td>
                  <td className="px-4 py-3.5 text-xs text-[#202936]">{log.action}</td>
                  <td className="px-4 py-3.5 text-xs text-[#697586]">{log.resource}</td>
                  <td className="px-4 py-3.5">
                    <StatusText status={log.outcome} />
                  </td>
                  <td className="px-6 py-3.5 text-right font-mono text-xs text-[#697586] tabular-nums">
                    {log.ipMasked}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export const AdminSettingsPage: React.FC = () => (
  <SharedSettingsView roleLabel="Admin Console" />
);
