import React, { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Plus, Trash2, CheckCircle2, XCircle } from 'lucide-react';
import { toast } from 'sonner';
import { LEGAL_KNOWLEDGE_CATEGORIES } from '../../constants';
import { useAppData } from '../../hooks/useAppData';
import { LegalKnowledgeItem } from '../../types';
import { PageHeader } from '../../components/common/PageHeader';
import { StatusText } from '../../components/common/StatCard';
import { Button } from '../../components/ui/button';
import { Input, Label, Select, Textarea } from '../../components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../../components/ui/dialog';
import { formatDate, formatINR } from '../../utils/formatters';

export const AdminUsersPage: React.FC = () => {
  const { users, updateUserStatus } = useAppData();
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('q') || '');
  const [roleFilter, setRoleFilter] = useState('All');

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return users.filter((u) => {
      if (roleFilter !== 'All' && u.role !== roleFilter) return false;
      if (
        q &&
        !u.name.toLowerCase().includes(q) &&
        !u.email.toLowerCase().includes(q) &&
        !u.city.toLowerCase().includes(q)
      ) {
        return false;
      }
      return true;
    });
  }, [roleFilter, search, users]);

  return (
    <div className="space-y-6">
      <PageHeader
        meta="Administrator Console · Demo User Accounts"
        title="User Management"
        description="Browse registered client, advocate, and administrator demonstration accounts and manage account status."
      />

      <div className="rounded-lg border border-[#E5E9EF] bg-white p-4 grid grid-cols-1 gap-3 sm:grid-cols-2 max-w-2xl">
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search name, email, or city..."
        />
        <Select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}>
          <option value="All">All Roles</option>
          <option value="client">Clients</option>
          <option value="advocate">Advocates</option>
          <option value="admin">Admins</option>
        </Select>
      </div>

      <div className="rounded-lg border border-[#E5E9EF] bg-white overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#E5E9EF] bg-[#F7F8FA] text-xs font-medium text-[#697586]">
                <th className="px-6 py-3">User</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">Location</th>
                <th className="px-4 py-3">Joined</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-6 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E9EF] text-sm">
              {filtered.map((u) => (
                <tr key={u.id} className="hover:bg-[#F7F8FA]">
                  <td className="px-6 py-3.5">
                    <p className="font-medium text-[#14243A]">{u.name}</p>
                    <p className="text-xs text-[#697586]">{u.email}</p>
                  </td>
                  <td className="px-4 py-3.5 text-xs capitalize text-[#202936]">{u.role}</td>
                  <td className="px-4 py-3.5 text-xs text-[#697586]">
                    {u.city}, {u.state}
                  </td>
                  <td className="px-4 py-3.5 text-xs text-[#697586] tabular-nums">
                    {formatDate(u.createdAt)}
                  </td>
                  <td className="px-4 py-3.5">
                    <StatusText status={u.status} />
                  </td>
                  <td className="px-6 py-3.5 text-right whitespace-nowrap">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        const next = u.status === 'Active' ? 'Suspended' : 'Active';
                        updateUserStatus(u.id, next);
                        toast.success(`Updated ${u.name} status to ${next}.`);
                      }}
                    >
                      {u.status === 'Active' ? 'Suspend' : 'Activate'}
                    </Button>
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

export const AdminAdvocatesPage: React.FC = () => {
  const { advocates } = useAppData();
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return advocates.filter(
      (a) =>
        !q ||
        a.name.toLowerCase().includes(q) ||
        a.city.toLowerCase().includes(q) ||
        a.enrolmentNumber.toLowerCase().includes(q)
    );
  }, [advocates, search]);

  return (
    <div className="space-y-6">
      <PageHeader
        meta="Administrator Console · Directory Management"
        title="Advocate Management"
        description="Inspect demonstration advocate profiles, enrolment numbers, practice areas, and directory status."
      />

      <div className="rounded-lg border border-[#E5E9EF] bg-white p-4 max-w-md">
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search advocate, city, or enrolment no..."
        />
      </div>

      <div className="rounded-lg border border-[#E5E9EF] bg-white overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#E5E9EF] bg-[#F7F8FA] text-xs font-medium text-[#697586]">
                <th className="px-6 py-3">Advocate</th>
                <th className="px-4 py-3">Enrolment (Demo)</th>
                <th className="px-4 py-3">Practice Areas</th>
                <th className="px-4 py-3">City</th>
                <th className="px-4 py-3 text-right">Fee</th>
                <th className="px-6 py-3 text-right">Verification</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E9EF] text-sm">
              {filtered.map((adv) => (
                <tr key={adv.id} className="hover:bg-[#F7F8FA]">
                  <td className="px-6 py-3.5">
                    <p className="font-medium text-[#14243A]">{adv.name}</p>
                    <p className="text-xs text-[#697586]">{adv.email}</p>
                  </td>
                  <td className="px-4 py-3.5 font-mono text-xs text-[#202936]">
                    {adv.enrolmentNumber}
                  </td>
                  <td className="px-4 py-3.5 text-xs text-[#697586] max-w-[220px] truncate">
                    {adv.specializations.join(', ')}
                  </td>
                  <td className="px-4 py-3.5 text-xs text-[#202936]">{adv.city}</td>
                  <td className="px-4 py-3.5 text-right font-mono text-xs tabular-nums">
                    {formatINR(adv.indicativeFee)}
                  </td>
                  <td className="px-6 py-3.5 text-right">
                    <StatusText status={adv.verificationStatus} />
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

export const AdminVerificationsPage: React.FC = () => {
  const { verificationRequests, updateVerificationRequest } = useAppData();

  return (
    <div className="space-y-6">
      <PageHeader
        meta="Administrator Console · Simulated Bar Review"
        title="Verification Requests"
        description="Review advocate enrolment submissions and update their directory verification state in demonstration mode."
      />

      <div className="space-y-4">
        {verificationRequests.map((req) => (
          <article
            key={req.id}
            className="rounded-lg border border-[#E5E9EF] bg-white p-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
          >
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2 text-xs text-[#697586]">
                <span className="font-mono text-[#14243A]">{req.enrolmentNumber}</span>
                <span>·</span>
                <span>{req.city}</span>
                <span>·</span>
                <span className="tabular-nums">Submitted {formatDate(req.submittedAt)}</span>
              </div>
              <h2 className="text-base font-semibold text-[#14243A]">{req.advocateName}</h2>
              <p className="text-xs text-[#697586]">{req.barCouncil}</p>
              <p className="text-xs text-[#202936]">
                Demo attachments: {req.documentsAttached.join(', ')}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 shrink-0">
              <StatusText status={req.status} />
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  updateVerificationRequest(
                    req.id,
                    'Approved',
                    'Approved in demonstration console.'
                  );
                  toast.success(`Approved ${req.advocateName} (demo mode).`);
                }}
              >
                <CheckCircle2 className="h-4 w-4 text-[#24845D]" />
                Approve
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  updateVerificationRequest(
                    req.id,
                    'Rejected',
                    'Additional enrolment documentation requested (demo).'
                  );
                  toast.info(`Marked ${req.advocateName} as Rejected (demo mode).`);
                }}
              >
                <XCircle className="h-4 w-4 text-[#C94D4D]" />
                Reject
              </Button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export const AdminLegalSourcesPage: React.FC = () => {
  const { legalSources, addLegalSource, deleteLegalSource } = useAppData();
  const [modalOpen, setModalOpen] = useState(false);

  const [title, setTitle] = useState('');
  const [type, setType] = useState<LegalKnowledgeItem['type']>('Act & Legislation');
  const [category, setCategory] = useState<string>('Civil Law');
  const [jurisdiction, setJurisdiction] = useState('India (Central Legislation)');
  const [description, setDescription] = useState('');
  const [detailedNotes, setDetailedNotes] = useState('');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      toast.error('Please enter a title and description.');
      return;
    }
    addLegalSource({
      title: title.trim(),
      type,
      category,
      jurisdiction,
      description: description.trim(),
      detailedNotes: detailedNotes.trim() || description.trim(),
      source: 'Illustrative Admin Demo Entry (Non-Verified)',
      date: new Date().toISOString().slice(0, 10),
    });
    toast.success('Demonstration legal source added.');
    setTitle('');
    setDescription('');
    setDetailedNotes('');
    setModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        meta="Administrator Console · Knowledge Library"
        title="Legal Sources"
        description="Manage sample Indian legislation summaries, legal definitions, and educational notes available to users."
        actions={
          <Button onClick={() => setModalOpen(true)}>
            <Plus className="h-4 w-4" />
            Add Demo Record
          </Button>
        }
      />

      <div className="rounded-lg border border-[#E5E9EF] bg-white overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#E5E9EF] bg-[#F7F8FA] text-xs font-medium text-[#697586]">
                <th className="px-6 py-3">Title</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Updated</th>
                <th className="px-6 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E9EF] text-sm">
              {legalSources.map((src) => (
                <tr key={src.id} className="hover:bg-[#F7F8FA]">
                  <td className="px-6 py-3.5">
                    <p className="font-medium text-[#14243A]">{src.title}</p>
                    <p className="text-xs text-[#697586] line-clamp-1">{src.source}</p>
                  </td>
                  <td className="px-4 py-3.5 text-xs text-[#202936] whitespace-nowrap">{src.type}</td>
                  <td className="px-4 py-3.5 text-xs text-[#697586] whitespace-nowrap">
                    {src.category}
                  </td>
                  <td className="px-4 py-3.5 text-xs text-[#697586] tabular-nums whitespace-nowrap">
                    {formatDate(src.lastUpdated)}
                  </td>
                  <td className="px-6 py-3.5 text-right">
                    <button
                      type="button"
                      onClick={() => {
                        deleteLegalSource(src.id);
                        toast.success('Demo legal record removed.');
                      }}
                      className="inline-flex items-center gap-1 text-xs font-medium text-[#C94D4D] hover:underline cursor-pointer"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Add Demonstration Legal Source</DialogTitle>
            <DialogDescription>
              Entries are labelled as illustrative demo summaries and must not fabricate verified
              citations.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleCreate} className="space-y-4">
            <div className="space-y-1.5">
              <Label>Title</Label>
              <Input value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>Type</Label>
                <Select
                  value={type}
                  onChange={(e) => setType(e.target.value as LegalKnowledgeItem['type'])}
                >
                  <option value="Act & Legislation">Act & Legislation</option>
                  <option value="Legal Section">Legal Section</option>
                  <option value="Court Judgment">Court Judgment</option>
                  <option value="Legal Definition">Legal Definition</option>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>Category</Label>
                <Select value={category} onChange={(e) => setCategory(e.target.value)}>
                  {LEGAL_KNOWLEDGE_CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </Select>
              </div>
            </div>
            <div className="space-y-1.5">
              <Label>Jurisdiction</Label>
              <Input value={jurisdiction} onChange={(e) => setJurisdiction(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Summary Description</Label>
              <Textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Detailed Plain-Language Notes</Label>
              <Textarea
                rows={3}
                value={detailedNotes}
                onChange={(e) => setDetailedNotes(e.target.value)}
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => setModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Publish Demo Record</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
