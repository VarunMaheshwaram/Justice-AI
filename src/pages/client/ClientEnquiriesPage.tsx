import React from 'react';
import { Link } from 'react-router-dom';
import { Mail } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useAppData } from '../../hooks/useAppData';
import { PageHeader } from '../../components/common/PageHeader';
import { StatusText } from '../../components/common/StatCard';
import { EmptyState } from '../../components/common/EmptyState';
import { Button } from '../../components/ui/button';
import { formatDateTime } from '../../utils/formatters';

export const ClientEnquiriesPage: React.FC = () => {
  const { user } = useAuth();
  const { enquiries } = useAppData();

  const myEnquiries = enquiries.filter(
    (e) => e.clientId === user?.id || e.clientEmail === user?.email
  );

  return (
    <div className="space-y-6">
      <PageHeader
        meta="Consultation Requests · Demo Mode"
        title="My Enquiries"
        description="Track consultation enquiries sent to advocates and read replies. Case documents remain strictly private until you choose to share them directly."
        actions={
          <Button asChild>
            <Link to="/client/advocates">Find Advocates</Link>
          </Button>
        }
      />

      {myEnquiries.length === 0 ? (
        <EmptyState
          icon={Mail}
          title="No enquiries sent yet"
          description="Explore the advocate directory to initiate a consultation request."
          action={
            <Button asChild>
              <Link to="/client/advocates">Browse Directory</Link>
            </Button>
          }
        />
      ) : (
        <div className="space-y-4">
          {myEnquiries.map((enq) => (
            <article
              key={enq.id}
              className="rounded-lg border border-[#E5E9EF] bg-white p-6 space-y-3"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="text-xs text-[#697586]">
                    To <strong className="text-[#14243A]">{enq.advocateName}</strong> ·{' '}
                    {enq.caseTitle} · {enq.preferredMode}
                  </p>
                  <h2 className="text-base font-semibold text-[#14243A] mt-0.5">{enq.subject}</h2>
                </div>
                <div className="flex items-center gap-3">
                  <StatusText status={enq.status} />
                  <span className="text-xs text-[#697586] tabular-nums">
                    {formatDateTime(enq.createdAt)}
                  </span>
                </div>
              </div>
              <p className="text-sm text-[#202936] leading-relaxed">{enq.message}</p>
              {enq.responseNote && (
                <div className="rounded-md border border-[#E5E9EF] bg-[#F7F8FA] p-4 space-y-1">
                  <p className="text-xs font-semibold text-[#24845D]">Advocate Response (Demo)</p>
                  <p className="text-sm text-[#202936] leading-relaxed">{enq.responseNote}</p>
                </div>
              )}
            </article>
          ))}
        </div>
      )}
    </div>
  );
};
