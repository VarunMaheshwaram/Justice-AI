import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  Edit3,
  Archive,
  Trash2,
  FileBarChart,
  Plus,
  FileText,
  Scale,
} from 'lucide-react';
import { toast } from 'sonner';
import { useAppData } from '../../hooks/useAppData';
import { PageHeader } from '../../components/common/PageHeader';
import { StatusText } from '../../components/common/StatCard';
import { ReportPreviewModal } from '../../components/common/ReportPreviewModal';
import { Button } from '../../components/ui/button';
import { Input, Textarea } from '../../components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { formatDate, formatFileSize, formatINR } from '../../utils/formatters';

export const CaseDetailsPage: React.FC = () => {
  const { caseId } = useParams();
  const navigate = useNavigate();
  const {
    cases,
    documents,
    analysisReports,
    timelineEvents,
    advocates,
    archiveCase,
    deleteCase,
    addCaseNote,
    deleteCaseNote,
    runDemoAnalysis,
  } = useAppData();

  const [reportOpen, setReportOpen] = useState(false);
  const [noteTitle, setNoteTitle] = useState('');
  const [noteContent, setNoteContent] = useState('');

  const legalCase = cases.find((c) => c.id === caseId);
  if (!legalCase) {
    return (
      <div className="rounded-lg border border-[#E5E9EF] bg-white p-10 text-center space-y-4">
        <h2 className="text-lg font-semibold text-[#14243A]">Case Not Found</h2>
        <p className="text-sm text-[#697586]">
          This case record does not exist or has been removed from local state.
        </p>
        <Button asChild>
          <Link to="/client/cases">Return to My Cases</Link>
        </Button>
      </div>
    );
  }

  const caseDocs = documents.filter((d) => d.caseId === legalCase.id);
  const caseReport = analysisReports.find((r) => r.caseId === legalCase.id);
  const caseTimeline = timelineEvents.filter((t) => t.caseId === legalCase.id);
  const matchedAdvocates = advocates.slice(0, 3);

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteTitle.trim() || !noteContent.trim()) {
      toast.error('Please enter both a note title and content.');
      return;
    }
    addCaseNote(legalCase.id, noteTitle.trim(), noteContent.trim());
    setNoteTitle('');
    setNoteContent('');
    toast.success('Case note added.');
  };

  const handleGenerateAnalysis = () => {
    runDemoAnalysis(
      legalCase.id,
      caseDocs.map((d) => d.id)
    );
    toast.success('Demonstration AI analysis refreshed for this case.');
  };

  return (
    <div className="space-y-6">
      <PageHeader
        meta={`${legalCase.category} · ${legalCase.caseNumber} · Demo Record`}
        title={legalCase.title}
        description={`${legalCase.courtName}, ${legalCase.courtLocation}`}
        actions={
          <>
            <Button asChild variant="outline" size="sm">
              <Link to="/client/cases">
                <ArrowLeft className="h-4 w-4" />
                All Cases
              </Link>
            </Button>
            <Button variant="outline" size="sm" onClick={() => setReportOpen(true)}>
              <FileBarChart className="h-4 w-4" />
              Preview Report
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link to={`/client/cases/${legalCase.id}/edit`}>
                <Edit3 className="h-4 w-4" />
                Edit
              </Link>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                archiveCase(legalCase.id);
                toast.success('Case archive status updated.');
              }}
            >
              <Archive className="h-4 w-4" />
              {legalCase.status === 'Archived' ? 'Restore' : 'Archive'}
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => {
                deleteCase(legalCase.id);
                toast.success('Case deleted.');
                navigate('/client/cases');
              }}
            >
              <Trash2 className="h-4 w-4" />
              Delete
            </Button>
          </>
        }
      />

      {/* 9 Required Case Detail Tabs */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="documents">Documents ({caseDocs.length})</TabsTrigger>
          <TabsTrigger value="analysis">AI Analysis</TabsTrigger>
          <TabsTrigger value="points">Important Points</TabsTrigger>
          <TabsTrigger value="contradictions">Contradictions</TabsTrigger>
          <TabsTrigger value="legal">Legal References</TabsTrigger>
          <TabsTrigger value="timeline">Timeline ({caseTimeline.length})</TabsTrigger>
          <TabsTrigger value="advocates">Advocates</TabsTrigger>
          <TabsTrigger value="notes">Notes ({legalCase.notes.length})</TabsTrigger>
        </TabsList>

        {/* 1. Overview */}
        <TabsContent value="overview">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            <div className="lg:col-span-8 rounded-lg border border-[#E5E9EF] bg-white p-6 space-y-5">
              <div>
                <h2 className="text-base font-semibold text-[#14243A]">Matter Summary</h2>
                <p className="mt-2 text-sm text-[#202936] leading-relaxed">
                  {legalCase.description}
                </p>
              </div>
              {legalCase.additionalNotes && (
                <div className="border-t border-[#E5E9EF] pt-4">
                  <h3 className="text-sm font-semibold text-[#14243A]">Additional Case Notes</h3>
                  <p className="mt-1.5 text-sm text-[#697586] leading-relaxed">
                    {legalCase.additionalNotes}
                  </p>
                </div>
              )}
            </div>
            <div className="lg:col-span-4 rounded-lg border border-[#E5E9EF] bg-white p-6 space-y-3.5 text-sm">
              <h2 className="text-base font-semibold text-[#14243A] border-b border-[#E5E9EF] pb-3">
                Case Metadata
              </h2>
              <div className="flex justify-between gap-4">
                <span className="text-[#697586]">Status</span>
                <StatusText status={legalCase.status} />
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-[#697586]">Your Role</span>
                <span className="font-medium text-[#202936] text-right">{legalCase.userRole}</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-[#697586]">Opposing Party</span>
                <span className="font-medium text-[#202936] text-right">
                  {legalCase.opposingParty}
                </span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-[#697586]">Filing Date</span>
                <span className="font-mono text-xs text-[#202936] tabular-nums">
                  {formatDate(legalCase.filingDate)}
                </span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-[#697586]">Current Stage</span>
                <span className="font-medium text-[#202936] text-right">
                  {legalCase.currentStage}
                </span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-[#697586]">Last Updated</span>
                <span className="font-mono text-xs text-[#697586] tabular-nums">
                  {formatDate(legalCase.lastUpdated)}
                </span>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* 2. Documents */}
        <TabsContent value="documents">
          <div className="rounded-lg border border-[#E5E9EF] bg-white overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#E5E9EF]">
              <div>
                <h2 className="text-base font-semibold text-[#14243A]">Case Documents</h2>
                <p className="text-xs text-[#697586]">Simulated local documents linked to this matter</p>
              </div>
              <Button asChild size="sm">
                <Link to={`/client/documents?caseId=${legalCase.id}`}>Manage & Upload</Link>
              </Button>
            </div>
            {caseDocs.length === 0 ? (
              <div className="p-8 text-center text-sm text-[#697586]">
                No documents attached yet. Use the Documents workspace to upload sample files.
              </div>
            ) : (
              <div className="divide-y divide-[#E5E9EF]">
                {caseDocs.map((doc) => (
                  <div
                    key={doc.id}
                    className="px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
                  >
                    <div className="flex items-start gap-3 min-w-0">
                      <FileText className="h-4 w-4 text-[#D9874D] mt-0.5 shrink-0" />
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-[#14243A] truncate">{doc.fileName}</p>
                        <p className="text-xs text-[#697586] tabular-nums">
                          {doc.category} · {doc.fileType} · {formatFileSize(doc.fileSizeBytes)} ·{' '}
                          {formatDate(doc.uploadDate)}
                        </p>
                      </div>
                    </div>
                    <StatusText status={`${doc.status} (Simulated)`} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </TabsContent>

        {/* 3. AI Analysis */}
        <TabsContent value="analysis">
          <div className="rounded-lg border border-[#E5E9EF] bg-white p-6 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E5E9EF] pb-4">
              <div>
                <p className="text-xs font-semibold text-[#D9874D]">DEMONSTRATION DATA</p>
                <h2 className="text-base font-semibold text-[#14243A]">
                  {caseReport?.reportTitle || 'No Demonstration Analysis Generated Yet'}
                </h2>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={handleGenerateAnalysis}>
                  <Scale className="h-4 w-4" />
                  Run Demo Analysis
                </Button>
                <Button asChild size="sm">
                  <Link to={`/client/analysis?caseId=${legalCase.id}`}>Open Full Studio</Link>
                </Button>
              </div>
            </div>
            {caseReport ? (
              <div className="space-y-4 text-sm">
                <p className="text-[#202936] leading-relaxed">{caseReport.summary.overview}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className="rounded-md bg-[#F7F8FA] border border-[#E5E9EF] p-4 space-y-2">
                    <h3 className="text-xs font-semibold text-[#14243A]">Key Claims Identified</h3>
                    <ul className="list-disc pl-4 space-y-1 text-xs text-[#202936]">
                      {caseReport.summary.claims.map((c, idx) => (
                        <li key={idx}>{c}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-md bg-[#F7F8FA] border border-[#E5E9EF] p-4 space-y-2">
                    <h3 className="text-xs font-semibold text-[#14243A]">Important Facts</h3>
                    <ul className="list-disc pl-4 space-y-1 text-xs text-[#202936]">
                      {caseReport.summary.importantFacts.map((f, idx) => (
                        <li key={idx}>{f}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-sm text-[#697586]">
                Click "Run Demo Analysis" above to generate a structured demonstration report for
                this case.
              </p>
            )}
          </div>
        </TabsContent>

        {/* 4. Important Points */}
        <TabsContent value="points">
          <div className="rounded-lg border border-[#E5E9EF] bg-white p-6 space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold text-[#14243A]">
                Extracted Important Points (Demo)
              </h2>
              <Link
                to="/client/important-points"
                className="text-xs font-semibold text-[#D9874D] hover:underline"
              >
                Open Dedicated View →
              </Link>
            </div>
            {caseReport ? (
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 text-sm">
                <div>
                  <h3 className="text-xs font-semibold text-[#24845D] mb-2">
                    Supporting Arguments
                  </h3>
                  <ul className="list-disc pl-5 space-y-1.5 text-xs text-[#202936]">
                    {caseReport.importantPoints.supportingArguments.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-xs font-semibold text-[#C94D4D] mb-2">Opposing Arguments</h3>
                  <ul className="list-disc pl-5 space-y-1.5 text-xs text-[#202936]">
                    {caseReport.importantPoints.opposingArguments.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="md:col-span-2 border-t border-[#E5E9EF] pt-4">
                  <h3 className="text-xs font-semibold text-[#D99A35] mb-2">Missing Information</h3>
                  <ul className="list-disc pl-5 space-y-1.5 text-xs text-[#697586]">
                    {caseReport.importantPoints.missingInformation.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <p className="text-sm text-[#697586]">
                Run a demonstration analysis to populate extracted important points.
              </p>
            )}
          </div>
        </TabsContent>

        {/* 5. Contradictions */}
        <TabsContent value="contradictions">
          <div className="space-y-4">
            {caseReport && caseReport.contradictions.length > 0 ? (
              caseReport.contradictions.map((ctr) => (
                <div
                  key={ctr.id}
                  className="rounded-lg border border-[#E5E9EF] bg-white p-6 space-y-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-sm font-semibold text-[#14243A]">{ctr.title}</h3>
                    <div className="flex items-center gap-3 text-xs">
                      <StatusText status={`${ctr.significance} Significance`} />
                      <span className="text-[#E5E9EF]">·</span>
                      <StatusText status={ctr.reviewStatus} />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2 text-xs">
                    <div className="rounded-md border border-[#E5E9EF] bg-[#F7F8FA] p-4 space-y-1.5">
                      <p className="font-semibold text-[#14243A]">{ctr.documentAName}</p>
                      <p className="text-[#697586]">{ctr.documentAPage}</p>
                      <p className="text-[#202936] italic leading-relaxed">{ctr.documentAPassage}</p>
                    </div>
                    <div className="rounded-md border border-[#E5E9EF] bg-[#F5E4D6]/30 p-4 space-y-1.5">
                      <p className="font-semibold text-[#14243A]">{ctr.documentBName}</p>
                      <p className="text-[#697586]">{ctr.documentBPage}</p>
                      <p className="text-[#202936] italic leading-relaxed">{ctr.documentBPassage}</p>
                    </div>
                  </div>
                  <p className="text-xs text-[#697586] leading-relaxed">{ctr.explanation}</p>
                </div>
              ))
            ) : (
              <div className="rounded-lg border border-[#E5E9EF] bg-white p-6 text-sm text-[#697586]">
                No contradictions currently flagged for this case. Run a demonstration analysis to
                compare documents.
              </div>
            )}
          </div>
        </TabsContent>

        {/* 6. Legal References */}
        <TabsContent value="legal">
          <div className="rounded-lg border border-[#E5E9EF] bg-white divide-y divide-[#E5E9EF]">
            {(caseReport?.legalReferences || []).length === 0 ? (
              <div className="p-6 text-sm text-[#697586]">
                No linked legal references yet. Browse the{' '}
                <Link to="/client/legal-knowledge" className="font-semibold text-[#14243A] underline">
                  Indian Legal Knowledge
                </Link>{' '}
                library.
              </div>
            ) : (
              caseReport!.legalReferences.map((ref) => (
                <div key={ref.id} className="p-5 space-y-1">
                  <p className="text-sm font-semibold text-[#14243A]">{ref.title}</p>
                  <p className="text-xs font-medium text-[#D9874D]">{ref.section}</p>
                  <p className="text-xs text-[#202936] leading-relaxed">{ref.relevance}</p>
                  <p className="text-[11px] text-[#697586]">{ref.sourceNote}</p>
                </div>
              ))
            )}
          </div>
        </TabsContent>

        {/* 7. Timeline */}
        <TabsContent value="timeline">
          <div className="rounded-lg border border-[#E5E9EF] bg-white p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold text-[#14243A]">Case Chronology</h2>
              <Button asChild size="sm" variant="outline">
                <Link to={`/client/timeline?caseId=${legalCase.id}`}>Manage Full Timeline</Link>
              </Button>
            </div>
            {caseTimeline.length === 0 ? (
              <p className="text-sm text-[#697586]">No timeline events logged for this case yet.</p>
            ) : (
              <div className="space-y-4">
                {caseTimeline.map((evt) => (
                  <div
                    key={evt.id}
                    className="grid grid-cols-1 sm:grid-cols-12 gap-2 border-b border-[#E5E9EF] pb-4 last:border-b-0"
                  >
                    <div className="sm:col-span-3">
                      <p className="text-xs font-mono font-medium text-[#14243A] tabular-nums">
                        {formatDate(evt.date)}
                      </p>
                      <StatusText status={evt.verificationStatus} />
                    </div>
                    <div className="sm:col-span-9 space-y-1">
                      <p className="text-sm font-semibold text-[#14243A]">
                        {evt.title}{' '}
                        <span className="text-xs font-normal text-[#697586]">
                          · {evt.eventCategory}
                        </span>
                      </p>
                      <p className="text-xs text-[#697586] leading-relaxed">{evt.description}</p>
                      <p className="text-[11px] text-[#697586]">Source: {evt.sourceDocument}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </TabsContent>

        {/* 8. Advocates */}
        <TabsContent value="advocates">
          <div className="rounded-lg border border-[#E5E9EF] bg-white p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-semibold text-[#14243A]">
                  Relevant Advocates (Demo Profiles)
                </h2>
                <p className="text-xs text-[#697586]">
                  Documents are never shared automatically with listed advocates.
                </p>
              </div>
              <Button asChild size="sm" variant="outline">
                <Link to="/client/advocates">Browse Directory</Link>
              </Button>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {matchedAdvocates.map((adv) => (
                <div
                  key={adv.id}
                  className="rounded-md border border-[#E5E9EF] bg-[#F7F8FA] p-4 space-y-2"
                >
                  <p className="text-sm font-semibold text-[#14243A]">{adv.name}</p>
                  <p className="text-xs text-[#697586]">
                    {adv.city} · {adv.experienceYears} yrs · {formatINR(adv.indicativeFee)}
                  </p>
                  <p className="text-xs text-[#202936]">{adv.specializations.join(', ')}</p>
                  <Link
                    to={`/client/advocates/${adv.id}`}
                    className="inline-block text-xs font-semibold text-[#D9874D] hover:underline pt-1"
                  >
                    View Demo Profile →
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* 9. Notes */}
        <TabsContent value="notes">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            <form
              onSubmit={handleAddNote}
              className="lg:col-span-5 rounded-lg border border-[#E5E9EF] bg-white p-6 space-y-4 self-start"
            >
              <h2 className="text-base font-semibold text-[#14243A]">Add Case Note</h2>
              <Input
                value={noteTitle}
                onChange={(e) => setNoteTitle(e.target.value)}
                placeholder="Note heading..."
              />
              <Textarea
                value={noteContent}
                onChange={(e) => setNoteContent(e.target.value)}
                rows={4}
                placeholder="Write a personal note, checklist item, or advocate question..."
              />
              <Button type="submit" size="sm">
                <Plus className="h-4 w-4" />
                Save Note
              </Button>
            </form>

            <div className="lg:col-span-7 space-y-3">
              {legalCase.notes.length === 0 ? (
                <div className="rounded-lg border border-[#E5E9EF] bg-white p-6 text-sm text-[#697586]">
                  No personal notes added to this case yet.
                </div>
              ) : (
                legalCase.notes.map((note) => (
                  <div
                    key={note.id}
                    className="rounded-lg border border-[#E5E9EF] bg-white p-5 space-y-2"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-sm font-semibold text-[#14243A]">{note.title}</h3>
                      <button
                        type="button"
                        onClick={() => {
                          deleteCaseNote(legalCase.id, note.id);
                          toast.success('Note removed.');
                        }}
                        className="text-xs text-[#C94D4D] hover:underline cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                    <p className="text-sm text-[#202936] leading-relaxed">{note.content}</p>
                    <p className="text-[11px] text-[#697586] tabular-nums">
                      Saved {formatDate(note.updatedAt)}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <ReportPreviewModal
        open={reportOpen}
        onOpenChange={setReportOpen}
        reportTitle="Case Summary & Intelligence Report (Demo)"
        caseTitle={`${legalCase.title} (${legalCase.caseNumber})`}
        sections={[
          {
            heading: 'Case Overview',
            items: [
              `Forum: ${legalCase.courtName}, ${legalCase.courtLocation}`,
              `Role: ${legalCase.userRole} vs ${legalCase.opposingParty}`,
              `Current Stage: ${legalCase.currentStage}`,
              legalCase.description,
            ],
          },
          {
            heading: 'Key Facts & Claims (Demo Extract)',
            items: caseReport?.summary.importantFacts || ['No AI report generated yet.'],
          },
          {
            heading: 'Potential Contradictions Flagged',
            items:
              caseReport?.contradictions.map(
                (c) => `${c.title} (${c.significance}): ${c.explanation}`
              ) || ['No contradictions flagged yet.'],
          },
        ]}
        sources={caseDocs.map((d) => `${d.fileName} (${d.category}, ${d.pageCount} pages)`)}
      />
    </div>
  );
};
