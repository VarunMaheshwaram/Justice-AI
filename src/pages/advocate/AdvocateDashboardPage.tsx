import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Edit3, ShieldCheck } from 'lucide-react';
import { useAppData } from '../../hooks/useAppData';
import { PageHeader } from '../../components/common/PageHeader';
import { StatCard, StatusText } from '../../components/common/StatCard';
import { Button } from '../../components/ui/button';
import { formatDateTime } from '../../utils/formatters';

export const AdvocateDashboardPage: React.FC = () => {
  const { advocates, enquiries } = useAppData();
  const profile = advocates[0]; // Demo advocate: Adv. Meera Deshmukh
  const myEnquiries = enquiries.filter((e) => e.advocateId === profile.id);
  const pendingCount = myEnquiries.filter((e) => e.status === 'New' || e.status === 'Reviewed').length;

  return (
    <div className="space-y-6">
      <PageHeader
        meta="Advocate Portal · Fictional Demonstration Profile"
        title={`Welcome, ${profile.name}`}
        description="Manage your professional directory presence, practice areas, verification documentation, and incoming client consultation enquiries."
        actions={
          <Button asChild>
            <Link to="/advocate/edit-profile">
              <Edit3 className="h-4 w-4" />
              Edit Profile
            </Link>
          </Button>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Profile Completion"
          value={`${profile.profileCompletion}%`}
          detail="Directory readiness (demo)"
        />
        <StatCard
          label="Total Enquiries"
          value={myEnquiries.length}
          detail="Incoming consultation requests"
        />
        <StatCard
          label="Pending Enquiries"
          value={pendingCount}
          detail="Awaiting review or reply"
        />
        <StatCard
          label="Profile Views"
          value={profile.profileViews}
          detail="Illustrative 30-day directory views"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <section className="lg:col-span-8 rounded-lg border border-[#E5E9EF] bg-white overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#E5E9EF]">
            <div>
              <h2 className="text-base font-semibold text-[#14243A]">Recent Client Enquiries</h2>
              <p className="text-xs text-[#697586]">
                Review and respond to incoming demonstration requests
              </p>
            </div>
            <Link
              to="/advocate/enquiries"
              className="text-xs font-semibold text-[#14243A] hover:text-[#D9874D] inline-flex items-center gap-1"
            >
              Manage all
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="divide-y divide-[#E5E9EF]">
            {myEnquiries.map((enq) => (
              <div key={enq.id} className="px-6 py-4 space-y-1.5">
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                  <span className="font-semibold text-[#14243A]">
                    {enq.clientName}{' '}
                    <span className="font-normal text-[#697586]">· {enq.preferredMode}</span>
                  </span>
                  <div className="flex items-center gap-3">
                    <StatusText status={enq.status} />
                    <span className="text-[#697586] tabular-nums">
                      {formatDateTime(enq.createdAt)}
                    </span>
                  </div>
                </div>
                <p className="text-sm font-medium text-[#202936]">{enq.subject}</p>
                <p className="text-xs text-[#697586] line-clamp-2">{enq.message}</p>
              </div>
            ))}
          </div>
        </section>

        <aside className="lg:col-span-4 space-y-5">
          <div className="rounded-lg border border-[#E5E9EF] bg-white p-6 space-y-4">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-[#24845D]" />
              <h2 className="text-base font-semibold text-[#14243A]">Verification Status</h2>
            </div>
            <div className="space-y-1 text-xs">
              <StatusText status={`${profile.verificationStatus} (Demo Mode)`} />
              <p className="text-[#697586] leading-relaxed pt-1">
                Bar Council enrolment number <span className="font-mono">{profile.enrolmentNumber}</span> is stored as a demonstration record. Live Bar Council verification is not active in this frontend release.
              </p>
            </div>
            <Button asChild variant="outline" size="sm" className="w-full">
              <Link to="/advocate/verification">View Verification Details</Link>
            </Button>
          </div>

          <div className="rounded-lg border border-[#E5E9EF] bg-white p-6 space-y-3 text-xs">
            <h2 className="text-sm font-semibold text-[#14243A]">Practice Areas Active</h2>
            <p className="text-[#202936] leading-relaxed">{profile.specializations.join(' · ')}</p>
            <p className="text-[#697586]">
              Consultation hours: {profile.availability.hours}
            </p>
            <Link
              to="/advocate/practice-areas"
              className="inline-block font-semibold text-[#D9874D] hover:underline pt-1"
            >
              Update practice areas →
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
};
