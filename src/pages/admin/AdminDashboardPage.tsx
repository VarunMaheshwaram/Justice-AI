import React from 'react';
import { Link } from 'react-router-dom';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
} from 'recharts';
import { ArrowRight } from 'lucide-react';
import { useAppData } from '../../hooks/useAppData';
import { mockMonthlyAnalytics, mockCategoryDistribution } from '../../data/mockAdminData';
import { PageHeader } from '../../components/common/PageHeader';
import { StatCard, StatusText } from '../../components/common/StatCard';
import { formatDate } from '../../utils/formatters';

export const AdminDashboardPage: React.FC = () => {
  const { users, advocates, verificationRequests, cases, documents, analysisReports } =
    useAppData();

  const activeUsers = users.filter((u) => u.status === 'Active').length;
  const pendingVerifications = verificationRequests.filter(
    (v) => v.status === 'Pending Review'
  ).length;

  return (
    <div className="space-y-6">
      <PageHeader
        meta="Administrator Console · Demonstration Platform Telemetry"
        title="Platform Overview"
        description="Monitor demonstration user activity, advocate verification queues, case volume, and simulated AI analysis adoption."
      />

      {/* All 7 Required Admin Statistics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Users" value={users.length} detail="Registered demo accounts" />
        <StatCard label="Active Users" value={activeUsers} detail="Currently active accounts" />
        <StatCard label="Registered Advocates" value={advocates.length} detail="Directory demo profiles" />
        <StatCard
          label="Pending Verification"
          value={pendingVerifications}
          detail="Awaiting admin review"
        />
        <StatCard label="Total Cases" value={cases.length} detail="Active & archived matters" />
        <StatCard
          label="Documents Uploaded"
          value={documents.length}
          detail="Simulated file records"
        />
        <StatCard
          label="Analyses Generated"
          value={analysisReports.length}
          detail="Demonstration AI reports"
        />
        <StatCard label="Platform Mode" value="Demo" detail="Frontend-only environment" />
      </div>

      {/* Analytics Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <section className="lg:col-span-7 rounded-lg border border-[#E5E9EF] bg-white p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold text-[#14243A]">
                Monthly Platform Growth (Illustrative Data)
              </h2>
              <p className="text-xs text-[#697586]">
                Simulated trend of users, uploaded documents, and completed analyses
              </p>
            </div>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockMonthlyAnalytics} margin={{ top: 8, right: 12, left: -12, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E9EF" />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#697586' }} />
                <YAxis tick={{ fontSize: 12, fill: '#697586' }} />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="documents"
                  name="Documents"
                  stroke="#14243A"
                  fill="#14243A"
                  fillOpacity={0.1}
                  strokeWidth={2}
                />
                <Area
                  type="monotone"
                  dataKey="analyses"
                  name="Analyses"
                  stroke="#D9874D"
                  fill="#D9874D"
                  fillOpacity={0.18}
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="lg:col-span-5 rounded-lg border border-[#E5E9EF] bg-white p-6 space-y-4">
          <div>
            <h2 className="text-base font-semibold text-[#14243A]">
              Cases by Legal Category (Demo)
            </h2>
            <p className="text-xs text-[#697586]">Illustrative distribution across India</p>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={mockCategoryDistribution}
                layout="vertical"
                margin={{ top: 4, right: 16, left: 16, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E9EF" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 12, fill: '#697586' }} />
                <YAxis
                  dataKey="category"
                  type="category"
                  tick={{ fontSize: 12, fill: '#202936' }}
                  width={84}
                />
                <Tooltip />
                <Bar dataKey="count" name="Cases" fill="#14243A" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>

      {/* Pending Verification Queue Snapshot */}
      <section className="rounded-lg border border-[#E5E9EF] bg-white overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E5E9EF]">
          <div>
            <h2 className="text-base font-semibold text-[#14243A]">Verification Requests Queue</h2>
            <p className="text-xs text-[#697586]">Demo advocate submissions pending action</p>
          </div>
          <Link
            to="/admin/verifications"
            className="text-xs font-semibold text-[#14243A] hover:text-[#D9874D] inline-flex items-center gap-1"
          >
            Review queue
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#E5E9EF] bg-[#F7F8FA] text-xs font-medium text-[#697586]">
                <th className="px-6 py-3">Advocate</th>
                <th className="px-4 py-3">Enrolment No.</th>
                <th className="px-4 py-3">Bar Council</th>
                <th className="px-4 py-3">Submitted</th>
                <th className="px-6 py-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E9EF] text-sm">
              {verificationRequests.map((req) => (
                <tr key={req.id} className="hover:bg-[#F7F8FA]">
                  <td className="px-6 py-3.5 font-medium text-[#14243A]">{req.advocateName}</td>
                  <td className="px-4 py-3.5 font-mono text-xs text-[#202936]">
                    {req.enrolmentNumber}
                  </td>
                  <td className="px-4 py-3.5 text-xs text-[#697586]">{req.barCouncil}</td>
                  <td className="px-4 py-3.5 text-xs text-[#697586] tabular-nums">
                    {formatDate(req.submittedAt)}
                  </td>
                  <td className="px-6 py-3.5 text-right">
                    <StatusText status={req.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};
