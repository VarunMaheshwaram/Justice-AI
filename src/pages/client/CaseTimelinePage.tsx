import React, { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Plus, Search, Edit3, Trash2, FileText, FileBarChart, CalendarClock } from 'lucide-react';
import { toast } from 'sonner';
import { TIMELINE_EVENT_TYPES } from '../../constants';
import { useAppData } from '../../hooks/useAppData';
import { TimelineEvent, TimelineSourceType } from '../../types';
import { PageHeader } from '../../components/common/PageHeader';
import { StatusText } from '../../components/common/StatCard';
import { EmptyState } from '../../components/common/EmptyState';
import { ReportPreviewModal } from '../../components/common/ReportPreviewModal';
import { Button } from '../../components/ui/button';
import { Input, Label, Select, Textarea } from '../../components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../../components/ui/dialog';
import { formatDate } from '../../utils/formatters';

export const CaseTimelinePage: React.FC = () => {
  const { cases, timelineEvents, addTimelineEvent, updateTimelineEvent, deleteTimelineEvent } =
    useAppData();
  const [searchParams] = useSearchParams();

  const [selectedCaseId, setSelectedCaseId] = useState(
    searchParams.get('caseId') || cases[0]?.id || 'All'
  );
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [sourceFilter, setSourceFilter] = useState('All');

  const [modalOpen, setModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<TimelineEvent | null>(null);
  const [sourceModalEvent, setSourceModalEvent] = useState<TimelineEvent | null>(null);
  const [reportOpen, setReportOpen] = useState(false);

  // Form state
  const [formCaseId, setFormCaseId] = useState(cases[0]?.id || '');
  const [formDate, setFormDate] = useState(new Date().toISOString().slice(0, 10));
  const [formTitle, setFormTitle] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formSourceDoc, setFormSourceDoc] = useState('');
  const [formCategory, setFormCategory] = useState<TimelineEvent['eventCategory']>('Hearing');
  const [formStatus, setFormStatus] = useState<TimelineSourceType>('User-entered');

  const filteredEvents = useMemo(() => {
    const q = search.trim().toLowerCase();
    return timelineEvents.filter((evt) => {
      if (selectedCaseId !== 'All' && evt.caseId !== selectedCaseId) return false;
      if (categoryFilter !== 'All' && evt.eventCategory !== categoryFilter) return false;
      if (sourceFilter !== 'All' && evt.verificationStatus !== sourceFilter) return false;
      if (
        q &&
        !evt.title.toLowerCase().includes(q) &&
        !evt.description.toLowerCase().includes(q) &&
        !evt.sourceDocument.toLowerCase().includes(q)
      ) {
        return false;
      }
      return true;
    });
  }, [categoryFilter, search, selectedCaseId, sourceFilter, timelineEvents]);

  const openAddModal = () => {
    setEditingEvent(null);
    setFormCaseId(selectedCaseId === 'All' ? cases[0]?.id || '' : selectedCaseId);
    setFormDate(new Date().toISOString().slice(0, 10));
    setFormTitle('');
    setFormDescription('');
    setFormSourceDoc('User_Entered_Note.pdf');
    setFormCategory('Hearing');
    setFormStatus('User-entered');
    setModalOpen(true);
  };

  const openEditModal = (evt: TimelineEvent) => {
    setEditingEvent(evt);
    setFormCaseId(evt.caseId);
    setFormDate(evt.date);
    setFormTitle(evt.title);
    setFormDescription(evt.description);
    setFormSourceDoc(evt.sourceDocument);
    setFormCategory(evt.eventCategory);
    setFormStatus(evt.verificationStatus);
    setModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim() || !formDate) {
      toast.error('Please enter both a date and an event title.');
      return;
    }
    if (editingEvent) {
      updateTimelineEvent(editingEvent.id, {
        caseId: formCaseId,
        date: formDate,
        title: formTitle.trim(),
        description: formDescription.trim(),
        sourceDocument: formSourceDoc.trim() || 'User-entered record',
        eventCategory: formCategory,
        verificationStatus: formStatus,
      });
      toast.success('Timeline event updated.');
    } else {
      addTimelineEvent({
        caseId: formCaseId,
        date: formDate,
        title: formTitle.trim(),
        description: formDescription.trim(),
        sourceDocument: formSourceDoc.trim() || 'User-entered record',
        eventCategory: formCategory,
        verificationStatus: formStatus,
      });
      toast.success('Timeline event added.');
    }
    setModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        meta="Chronology Workspace · Fictional Demonstration Data"
        title="Case Timeline"
        description="Track filings, notices, replies, hearings, and orders chronologically. Clearly distinguishes user-entered, AI-extracted, and court-confirmed dates."
        actions={
          <>
            <Button variant="outline" onClick={() => setReportOpen(true)}>
              <FileBarChart className="h-4 w-4" />
              Timeline Report
            </Button>
            <Button onClick={openAddModal}>
              <Plus className="h-4 w-4" />
              Add Event
            </Button>
          </>
        }
      />

      {/* Filter Bar */}
      <div className="rounded-lg border border-[#E5E9EF] bg-white p-4 grid grid-cols-1 gap-3 md:grid-cols-12">
        <div className="md:col-span-3">
          <Select value={selectedCaseId} onChange={(e) => setSelectedCaseId(e.target.value)}>
            <option value="All">All Cases</option>
            {cases.map((c) => (
              <option key={c.id} value={c.id}>
                {c.title}
              </option>
            ))}
          </Select>
        </div>
        <div className="md:col-span-3 relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#697586]" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search events or source..."
            className="pl-9"
          />
        </div>
        <div className="md:col-span-3">
          <Select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
            <option value="All">All Event Types</option>
            {TIMELINE_EVENT_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </Select>
        </div>
        <div className="md:col-span-3">
          <Select value={sourceFilter} onChange={(e) => setSourceFilter(e.target.value)}>
            <option value="All">All Verification Sources</option>
            <option value="User-entered">User-entered</option>
            <option value="AI-extracted">AI-extracted</option>
            <option value="Court-confirmed">Court-confirmed</option>
          </Select>
        </div>
      </div>

      {/* Visual Timeline */}
      {filteredEvents.length === 0 ? (
        <EmptyState
          icon={CalendarClock}
          title="No timeline events match"
          description="Add a new milestone or relax your active filters to view demonstration chronology."
          action={<Button onClick={openAddModal}>Add First Event</Button>}
        />
      ) : (
        <div className="rounded-lg border border-[#E5E9EF] bg-white p-6">
          <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-2.5 sm:before:left-3 before:top-2 before:bottom-2 before:w-px before:bg-[#E5E9EF]">
            {filteredEvents.map((evt) => {
              const parentCase = cases.find((c) => c.id === evt.caseId);
              return (
                <div key={evt.id} className="relative">
                  <span
                    className={`absolute -left-[19px] sm:-left-[25px] top-1.5 h-3 w-3 rounded-full border-2 border-white ${
                      evt.verificationStatus === 'Court-confirmed'
                        ? 'bg-[#24845D]'
                        : evt.verificationStatus === 'AI-extracted'
                          ? 'bg-[#D9874D]'
                          : 'bg-[#14243A]'
                    }`}
                    aria-hidden="true"
                  />
                  <div className="rounded-lg border border-[#E5E9EF] bg-[#F7F8FA] p-4 sm:p-5 space-y-2.5">
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                      <div className="flex flex-wrap items-center gap-2 text-[#697586]">
                        <span className="font-mono font-semibold text-[#14243A] tabular-nums">
                          {formatDate(evt.date)}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span className="font-medium text-[#202936]">{evt.eventCategory}</span>
                        <span aria-hidden="true">·</span>
                        <StatusText status={evt.verificationStatus} />
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setSourceModalEvent(evt)}
                          className="inline-flex items-center gap-1 text-xs font-medium text-[#14243A] hover:text-[#D9874D] cursor-pointer"
                        >
                          <FileText className="h-3.5 w-3.5" />
                          View Source
                        </button>
                        <button
                          type="button"
                          onClick={() => openEditModal(evt)}
                          className="inline-flex items-center gap-1 text-xs font-medium text-[#697586] hover:text-[#14243A] cursor-pointer"
                        >
                          <Edit3 className="h-3.5 w-3.5" />
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            deleteTimelineEvent(evt.id);
                            toast.success('Timeline event removed.');
                          }}
                          className="inline-flex items-center gap-1 text-xs font-medium text-[#C94D4D] hover:underline cursor-pointer"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          Delete
                        </button>
                      </div>
                    </div>

                    <h3 className="text-sm font-semibold text-[#14243A]">{evt.title}</h3>
                    <p className="text-sm text-[#202936] leading-relaxed">{evt.description}</p>
                    <p className="text-xs text-[#697586]">
                      Case: {parentCase?.title || evt.caseId} · Source: {evt.sourceDocument}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Add / Edit Event Dialog */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{editingEvent ? 'Edit Timeline Event' : 'Add Timeline Event'}</DialogTitle>
            <DialogDescription>
              Log a case milestone and record whether it is user-entered, AI-extracted, or
              court-confirmed.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSave} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="tl-case">Case</Label>
              <Select
                id="tl-case"
                value={formCaseId}
                onChange={(e) => setFormCaseId(e.target.value)}
              >
                {cases.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.title}
                  </option>
                ))}
              </Select>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="tl-date">Event Date</Label>
                <Input
                  id="tl-date"
                  type="date"
                  value={formDate}
                  onChange={(e) => setFormDate(e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="tl-type">Event Type</Label>
                <Select
                  id="tl-type"
                  value={formCategory}
                  onChange={(e) =>
                    setFormCategory(e.target.value as TimelineEvent['eventCategory'])
                  }
                >
                  {TIMELINE_EVENT_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </Select>
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="tl-title">Event Title</Label>
              <Input
                id="tl-title"
                value={formTitle}
                onChange={(e) => setFormTitle(e.target.value)}
                placeholder="e.g., Written Statement Filed by Opposite Party"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="tl-desc">Description</Label>
              <Textarea
                id="tl-desc"
                rows={3}
                value={formDescription}
                onChange={(e) => setFormDescription(e.target.value)}
                placeholder="Briefly describe what occurred on this date..."
              />
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="tl-source">Source Document</Label>
                <Input
                  id="tl-source"
                  value={formSourceDoc}
                  onChange={(e) => setFormSourceDoc(e.target.value)}
                  placeholder="e.g., Daily_Order_Sample.pdf"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="tl-status">Verification Status</Label>
                <Select
                  id="tl-status"
                  value={formStatus}
                  onChange={(e) => setFormStatus(e.target.value as TimelineSourceType)}
                >
                  <option value="User-entered">User-entered</option>
                  <option value="AI-extracted">AI-extracted</option>
                  <option value="Court-confirmed">Court-confirmed</option>
                </Select>
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="outline" onClick={() => setModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">{editingEvent ? 'Save Changes' : 'Add Event'}</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* View Source Modal */}
      <Dialog
        open={Boolean(sourceModalEvent)}
        onOpenChange={(o) => !o && setSourceModalEvent(null)}
      >
        <DialogContent className="max-w-lg">
          {sourceModalEvent && (
            <>
              <DialogHeader>
                <DialogTitle>Source Reference</DialogTitle>
                <DialogDescription>{sourceModalEvent.sourceDocument}</DialogDescription>
              </DialogHeader>
              <div className="space-y-3 text-sm text-[#202936]">
                <p className="font-mono text-xs text-[#697586] tabular-nums">
                  Event Date: {formatDate(sourceModalEvent.date)} · {sourceModalEvent.verificationStatus}
                </p>
                <p className="font-semibold text-[#14243A]">{sourceModalEvent.title}</p>
                <p className="leading-relaxed text-[#697586]">{sourceModalEvent.description}</p>
                <p className="text-xs text-[#697586] border-t border-[#E5E9EF] pt-3">
                  Note: Live court integration is not enabled in this demonstration release. Verify
                  exact dates against official orders.
                </p>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <ReportPreviewModal
        open={reportOpen}
        onOpenChange={setReportOpen}
        reportTitle="Case Chronology & Timeline Report (Demo)"
        caseTitle={
          selectedCaseId === 'All'
            ? 'All Cases Chronology (Demo)'
            : cases.find((c) => c.id === selectedCaseId)?.title || 'Selected Case'
        }
        sections={[
          {
            heading: 'Chronological Events',
            items: filteredEvents.map(
              (e) =>
                `${formatDate(e.date)} [${e.eventCategory} · ${e.verificationStatus}] — ${e.title}: ${e.description}`
            ),
          },
        ]}
        sources={Array.from(new Set(filteredEvents.map((e) => e.sourceDocument)))}
      />
    </div>
  );
};
