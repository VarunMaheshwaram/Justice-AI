import React, { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ShieldCheck, Upload, Send } from 'lucide-react';
import { toast } from 'sonner';
import { useAppData } from '../../hooks/useAppData';
import { EnquiryStatus, VerificationStatus } from '../../types';
import { PageHeader } from '../../components/common/PageHeader';
import { StatusText } from '../../components/common/StatCard';
import { Button } from '../../components/ui/button';
import { Input, Label, Select, Textarea } from '../../components/ui/input';
import {
  NotificationsCenterView,
  SharedSettingsView,
} from '../client/ClientProfileSettingsPages';
import { formatDateTime } from '../../utils/formatters';

export const AdvocateVerificationPage: React.FC = () => {
  const { advocates, updateAdvocateProfile } = useAppData();
  const profile = advocates[0];
  const [enrolmentNo, setEnrolmentNo] = useState(profile.enrolmentNumber);
  const [barCouncil, setBarCouncil] = useState(profile.barCouncil);

  const setDemoStatus = (status: VerificationStatus) => {
    updateAdvocateProfile(profile.id, {
      enrolmentNumber: enrolmentNo,
      barCouncil,
      verificationStatus: status,
    });
    toast.success(`Verification status set to "${status}" (demo state).`);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <PageHeader
        meta="Advocate Verification · Simulated Workflow"
        title="Credential Verification"
        description="Submit Bar Council enrolment details for directory review. Note: Live Bar Council verification is not active in this frontend demonstration phase."
      />

      <div className="rounded-lg border border-[#E5E9EF] bg-white p-6 space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E5E9EF] pb-4">
          <div className="flex items-center gap-3">
            <ShieldCheck className="h-6 w-6 text-[#D9874D]" />
            <div>
              <p className="text-xs text-[#697586]">Current Status (Demo Mode)</p>
              <StatusText status={profile.verificationStatus} className="text-sm" />
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-1.5">
            {(['Not Submitted', 'Pending Review', 'Approved', 'Rejected'] as VerificationStatus[]).map(
              (st) => (
                <button
                  key={st}
                  type="button"
                  onClick={() => setDemoStatus(st)}
                  className={`rounded-md border px-2.5 py-1 text-xs font-medium cursor-pointer ${
                    profile.verificationStatus === st
                      ? 'border-[#14243A] bg-[#14243A] text-white'
                      : 'border-[#E5E9EF] bg-[#F7F8FA] text-[#697586] hover:text-[#14243A]'
                  }`}
                >
                  {st}
                </button>
              )
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="ver-enrol">State Bar Council Enrolment Number</Label>
            <Input
              id="ver-enrol"
              value={enrolmentNo}
              onChange={(e) => setEnrolmentNo(e.target.value)}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="ver-council">State Bar Council</Label>
            <Input
              id="ver-council"
              value={barCouncil}
              onChange={(e) => setBarCouncil(e.target.value)}
            />
          </div>
        </div>

        <div className="rounded-md border border-dashed border-[#E5E9EF] bg-[#F7F8FA] p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="text-xs text-[#697586]">
            <p className="font-semibold text-[#14243A]">
              Simulated Certificate Attachment (Do not upload real ID cards)
            </p>
            <p className="mt-0.5">Bar_Enrolment_Certificate_Demo.pdf · Simulated attachment</p>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setDemoStatus('Pending Review')}
          >
            <Upload className="h-4 w-4" />
            Submit for Demo Review
          </Button>
        </div>
      </div>
    </div>
  );
};

export const AdvocateEnquiriesPage: React.FC<{ onlyNew?: boolean }> = ({ onlyNew = false }) => {
  const { advocates, enquiries, updateEnquiryStatus } = useAppData();
  const [searchParams] = useSearchParams();
  const profile = advocates[0];

  const [statusFilter, setStatusFilter] = useState<string>(onlyNew ? 'New' : 'All');
  const [search, setSearch] = useState(searchParams.get('q') || '');
  const [replyDrafts, setReplyDrafts] = useState<Record<string, string>>({});

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return enquiries.filter((e) => {
      if (e.advocateId !== profile.id) return false;
      if (onlyNew && e.status !== 'New' && e.status !== 'Reviewed') return false;
      if (!onlyNew && statusFilter !== 'All' && e.status !== statusFilter) return false;
      if (
        q &&
        !e.clientName.toLowerCase().includes(q) &&
        !e.subject.toLowerCase().includes(q) &&
        !e.caseTitle.toLowerCase().includes(q)
      ) {
        return false;
      }
      return true;
    });
  }, [enquiries, onlyNew, profile.id, search, statusFilter]);

  const handleSendReply = (enquiryId: string) => {
    const reply = (replyDrafts[enquiryId] || '').trim();
    if (!reply) {
      toast.error('Please enter a response note before sending.');
      return;
    }
    updateEnquiryStatus(enquiryId, 'Responded', reply);
    setReplyDrafts((prev) => ({ ...prev, [enquiryId]: '' }));
    toast.success('Response saved and enquiry marked Responded (demo mode).');
  };

  return (
    <div className="space-y-6">
      <PageHeader
        meta="Advocate Portal · Consultation Workflow"
        title={onlyNew ? 'Client Requests' : 'Enquiries'}
        description={
          onlyNew
            ? 'New and unresponded client consultation requests awaiting your initial review.'
            : 'Track all client enquiries across New, Reviewed, Responded, and Closed statuses.'
        }
      />

      <div className="rounded-lg border border-[#E5E9EF] bg-white p-4 grid grid-cols-1 gap-3 sm:grid-cols-2 max-w-2xl">
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search client name, case, or subject..."
        />
        {!onlyNew && (
          <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="All">All Statuses</option>
            <option value="New">New</option>
            <option value="Reviewed">Reviewed</option>
            <option value="Responded">Responded</option>
            <option value="Closed">Closed</option>
          </Select>
        )}
      </div>

      <div className="space-y-4">
        {filtered.map((enq) => (
          <article
            key={enq.id}
            className="rounded-lg border border-[#E5E9EF] bg-white p-6 space-y-4"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-xs text-[#697586]">
                  From <strong className="text-[#14243A]">{enq.clientName}</strong> ({enq.clientEmail}) ·{' '}
                  {enq.preferredMode}
                </p>
                <h2 className="text-base font-semibold text-[#14243A] mt-0.5">{enq.subject}</h2>
                <p className="text-xs text-[#697586] mt-0.5">
                  Matter: {enq.caseTitle} · Received {formatDateTime(enq.createdAt)}
                </p>
              </div>
              <div className="flex items-center gap-2.5">
                <StatusText status={enq.status} />
                <Select
                  value={enq.status}
                  onChange={(e) => {
                    updateEnquiryStatus(enq.id, e.target.value as EnquiryStatus);
                    toast.success(`Enquiry status updated to ${e.target.value}.`);
                  }}
                  className="h-8 text-xs w-36"
                  aria-label="Update enquiry status"
                >
                  <option value="New">New</option>
                  <option value="Reviewed">Reviewed</option>
                  <option value="Responded">Responded</option>
                  <option value="Closed">Closed</option>
                </Select>
              </div>
            </div>

            <p className="text-sm text-[#202936] leading-relaxed">{enq.message}</p>

            {enq.responseNote && (
              <div className="rounded-md bg-[#F7F8FA] border border-[#E5E9EF] p-3.5 text-xs space-y-1">
                <p className="font-semibold text-[#24845D]">Your Recorded Response</p>
                <p className="text-[#202936] leading-relaxed">{enq.responseNote}</p>
              </div>
            )}

            <div className="border-t border-[#E5E9EF] pt-4 flex flex-col sm:flex-row gap-2.5">
              <Textarea
                rows={2}
                value={replyDrafts[enq.id] || ''}
                onChange={(e) =>
                  setReplyDrafts((prev) => ({ ...prev, [enq.id]: e.target.value }))
                }
                placeholder="Write a consultation response or propose an appointment slot..."
                className="min-h-[64px] flex-1"
              />
              <Button
                type="button"
                size="sm"
                className="self-end"
                onClick={() => handleSendReply(enq.id)}
              >
                <Send className="h-3.5 w-3.5" />
                Send Reply
              </Button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export const AdvocateClientRequestsPage: React.FC = () => <AdvocateEnquiriesPage onlyNew />;
export const AdvocateNotificationsPage: React.FC = () => (
  <NotificationsCenterView role="advocate" />
);
export const AdvocateSettingsPage: React.FC = () => (
  <SharedSettingsView roleLabel="Advocate Portal" />
);
