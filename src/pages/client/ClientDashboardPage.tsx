import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Plus,
  Upload,
  Scale,
  MessageSquare,
  Users,
  ArrowRight,
  FileText,
  Clock,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useAppData } from '../../hooks/useAppData';
import { PageHeader } from '../../components/common/PageHeader';
import { StatCard, StatusText } from '../../components/common/StatCard';
import { Button } from '../../components/ui/button';
import { formatDate, formatRelativeTime } from '../../utils/formatters';

export const ClientDashboardPage: React.FC = () => {
  const { user } = useAuth();
  const { cases, documents, analysisReports, savedAdvocateIds, notifications } = useAppData();
  const navigate = useNavigate();

  const firstName = user?.name?.split(' ')[0] || 'Varun';
  const clientActivities = notifications.filter((n) => n.role === 'client').slice(0, 5);

  return (
    <div className="space-y-6">
      <PageHeader
        meta="Client Workspace · Demonstration Data"
        title={`Welcome back, ${firstName}`}
        description="Your legal information and case insights, organised in one place."
        actions={
          <Button asChild>
            <Link to="/client/cases/new">
              <Plus className="h-4 w-4" />
              Create New Case
            </Link>
          </Button>
        }
      />

      {/* 4 Statistics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Total Cases"
          value={cases.length}
          detail={`${cases.filter((c) => c.status !== 'Archived').length} active matters`}
        />
        <StatCard
          label="Documents Uploaded"
          value={documents.length}
          detail="Simulated document storage"
        />
        <StatCard
          label="Analyses Completed"
          value={analysisReports.length}
          detail="Demonstration reports ready"
        />
        <StatCard
          label="Saved Advocates"
          value={savedAdvocateIds.length}
          detail="Shortlisted demo profiles"
        />
      </div>

      {/* Quick Actions */}
      <section className="rounded-lg border border-[#E5E9EF] bg-white p-5">
        <h2 className="text-sm font-semibold text-[#14243A] mb-3.5">Quick Actions</h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {[
            { label: 'Create New Case', to: '/client/cases/new', icon: Plus },
            { label: 'Upload Document', to: '/client/documents', icon: Upload },
            { label: 'Analyse Documents', to: '/client/analysis', icon: Scale },
            { label: 'Ask Justice AI', to: '/client/assistant', icon: MessageSquare },
            { label: 'Find Advocate', to: '/client/advocates', icon: Users },
          ].map((action) => {
            const Icon = action.icon;
            return (
              <Link
                key={action.label}
                to={action.to}
                className="flex items-center gap-3 rounded-md border border-[#E5E9EF] bg-[#F7F8FA] px-4 py-3 text-sm font-medium text-[#14243A] hover:border-[#14243A] hover:bg-white transition-colors"
              >
                <Icon className="h-4 w-4 shrink-0 text-[#D9874D]" />
                <span className="truncate">{action.label}</span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Recent Cases Table */}
      <section className="rounded-lg border border-[#E5E9EF] bg-white overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E5E9EF]">
          <div>
            <h2 className="text-base font-semibold text-[#14243A]">Recent Cases</h2>
            <p className="text-xs text-[#697586]">
              Fictional demonstration matters organised in your workspace
            </p>
          </div>
          <Link
            to="/client/cases"
            className="text-xs font-semibold text-[#14243A] hover:text-[#D9874D] inline-flex items-center gap-1 whitespace-nowrap"
          >
            View all
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#E5E9EF] bg-[#F7F8FA] text-xs font-medium text-[#697586]">
                <th className="px-6 py-3">Case Title</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Your Role</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Docs</th>
                <th className="px-6 py-3 text-right">Last Updated</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E9EF] text-sm">
              {cases.slice(0, 4).map((item) => (
                <tr
                  key={item.id}
                  onClick={() => navigate(`/client/cases/${item.id}`)}
                  className="hover:bg-[#F7F8FA] transition-colors cursor-pointer"
                >
                  <td className="px-6 py-3.5">
                    <p className="font-medium text-[#14243A]">{item.title}</p>
                    <p className="text-xs font-mono text-[#697586] tabular-nums">
                      {item.caseNumber}
                    </p>
                  </td>
                  <td className="px-4 py-3.5 text-xs text-[#202936] whitespace-nowrap">
                    {item.category}
                  </td>
                  <td className="px-4 py-3.5 text-xs text-[#697586] whitespace-nowrap">
                    {item.userRole}
                  </td>
                  <td className="px-4 py-3.5">
                    <StatusText status={item.status} />
                  </td>
                  <td className="px-4 py-3.5 text-right text-xs font-mono text-[#14243A] tabular-nums">
                    {item.documentCount}
                  </td>
                  <td className="px-6 py-3.5 text-right text-xs text-[#697586] whitespace-nowrap tabular-nums">
                    {formatDate(item.lastUpdated)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Recent Analysis & Recent Activity */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <section className="lg:col-span-7 rounded-lg border border-[#E5E9EF] bg-white">
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#E5E9EF]">
            <div>
              <h2 className="text-base font-semibold text-[#14243A]">Recent Analysis</h2>
              <p className="text-xs text-[#697586]">
                Demonstration AI reports generated from sample documents
              </p>
            </div>
            <Link
              to="/client/analysis"
              className="text-xs font-semibold text-[#14243A] hover:text-[#D9874D]"
            >
              Open studio
            </Link>
          </div>
          <div className="divide-y divide-[#E5E9EF]">
            {analysisReports.map((report) => (
              <div
                key={report.id}
                className="px-6 py-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2 text-xs text-[#697586]">
                    <FileText className="h-3.5 w-3.5 text-[#D9874D] shrink-0" />
                    <span className="truncate">{report.caseTitle}</span>
                    <span aria-hidden="true">·</span>
                    <span className="tabular-nums shrink-0">{formatDate(report.generatedDate)}</span>
                  </div>
                  <p className="text-sm font-medium text-[#14243A]">{report.reportTitle}</p>
                  <div className="flex items-center gap-3 text-xs text-[#697586]">
                    <StatusText status={report.status} />
                    <span aria-hidden="true">·</span>
                    <span className="tabular-nums">
                      {report.contradictions.length} potential contradiction(s)
                    </span>
                  </div>
                </div>
                <Button asChild variant="outline" size="sm" className="shrink-0 self-start sm:self-center">
                  <Link to={`/client/analysis?caseId=${report.caseId}`}>View Report</Link>
                </Button>
              </div>
            ))}
          </div>
        </section>

        <section className="lg:col-span-5 rounded-lg border border-[#E5E9EF] bg-white">
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#E5E9EF]">
            <div>
              <h2 className="text-base font-semibold text-[#14243A]">Recent Activity</h2>
              <p className="text-xs text-[#697586]">Uploads, updates, and analysis events</p>
            </div>
            <Link
              to="/client/notifications"
              className="text-xs font-semibold text-[#14243A] hover:text-[#D9874D]"
            >
              All activity
            </Link>
          </div>
          <div className="divide-y divide-[#E5E9EF]">
            {clientActivities.map((item) => (
              <div key={item.id} className="px-6 py-3.5 space-y-1">
                <div className="flex items-center justify-between gap-2 text-xs text-[#697586]">
                  <span className="font-medium text-[#14243A]">{item.category}</span>
                  <span className="inline-flex items-center gap-1 tabular-nums">
                    <Clock className="h-3 w-3" />
                    {formatRelativeTime(item.timestamp)}
                  </span>
                </div>
                <p className="text-xs font-medium text-[#202936]">{item.title}</p>
                <p className="text-xs text-[#697586] leading-relaxed">{item.message}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
