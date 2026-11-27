import React, { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Play, FileBarChart, CheckSquare, Square } from 'lucide-react';
import { toast } from 'sonner';
import { useAppData } from '../../hooks/useAppData';
import { PageHeader } from '../../components/common/PageHeader';
import { StatusText } from '../../components/common/StatCard';
import { ReportPreviewModal } from '../../components/common/ReportPreviewModal';
import { Button } from '../../components/ui/button';
import { Label, Select } from '../../components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { formatDateTime } from '../../utils/formatters';

export const AnalysisPage: React.FC = () => {
  const { cases, documents, analysisReports, runDemoAnalysis, updateContradictionStatus } =
    useAppData();
  const [searchParams] = useSearchParams();

  const initialCaseId = searchParams.get('caseId') || cases[0]?.id || '';
  const [selectedCaseId, setSelectedCaseId] = useState(initialCaseId);
  const [selectedDocIds, setSelectedDocIds] = useState<string[]>(() =>
    documents.filter((d) => d.caseId === initialCaseId).map((d) => d.id)
  );
  const [isRunning, setIsRunning] = useState(false);
  const [perspectiveRole, setPerspectiveRole] = useState<
    'Petitioner' | 'Respondent' | 'Other Party'
  >('Petitioner');
  const [reportPreviewOpen, setReportPreviewOpen] = useState(false);

  const caseDocuments = useMemo(
    () => documents.filter((d) => d.caseId === selectedCaseId),
    [documents, selectedCaseId]
  );

  const activeReport = useMemo(
    () => analysisReports.find((r) => r.caseId === selectedCaseId) || analysisReports[0],
    [analysisReports, selectedCaseId]
  );

  const handleCaseChange = (newCaseId: string) => {
    setSelectedCaseId(newCaseId);
    setSelectedDocIds(documents.filter((d) => d.caseId === newCaseId).map((d) => d.id));
  };

  const toggleDoc = (docId: string) => {
    setSelectedDocIds((prev) =>
      prev.includes(docId) ? prev.filter((id) => id !== docId) : [...prev, docId]
    );
  };

  const handleStartAnalysis = () => {
    if (!selectedCaseId) return;
    setIsRunning(true);
    window.setTimeout(() => {
      runDemoAnalysis(selectedCaseId, selectedDocIds);
      setIsRunning(false);
      toast.success('Demonstration AI Legal Analysis generated (sample data).');
    }, 900);
  };

  const currentPerspective = activeReport?.perspectives[perspectiveRole];

  return (
    <div className="space-y-6">
      <PageHeader
        meta="DEMONSTRATION DATA · Simulated AI Intelligence Workspace"
        title="AI Legal Analysis"
        description="Select a case and associated documents to inspect structured demonstration insights across 8 legal review dimensions."
        actions={
          <Button variant="outline" onClick={() => setReportPreviewOpen(true)}>
            <FileBarChart className="h-4 w-4" />
            Preview Printable Report
          </Button>
        }
      />

      {/* Case & Document Selection Bar */}
      <section className="rounded-lg border border-[#E5E9EF] bg-white p-6 space-y-5">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-5 space-y-1.5">
            <Label htmlFor="analysis-case">Select Case</Label>
            <Select
              id="analysis-case"
              value={selectedCaseId}
              onChange={(e) => handleCaseChange(e.target.value)}
            >
              {cases.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.title} ({c.caseNumber})
                </option>
              ))}
            </Select>
          </div>
          <div className="lg:col-span-4 text-xs text-[#697586] space-y-1">
            <p className="font-semibold text-[#14243A]">Demonstration Notice</p>
            <p>
              All extracted summaries, contradictions, and legal references are labelled
              DEMONSTRATION DATA and do not constitute genuine legal analysis.
            </p>
          </div>
          <div className="lg:col-span-3 flex lg:justify-end">
            <Button onClick={handleStartAnalysis} disabled={isRunning} className="w-full lg:w-auto">
              <Play className="h-4 w-4" />
              {isRunning ? 'Running Demo Analysis...' : 'Start Demo Analysis'}
            </Button>
          </div>
        </div>

        <div className="border-t border-[#E5E9EF] pt-4 space-y-2.5">
          <p className="text-xs font-medium text-[#697586]">
            Select Documents to Include ({selectedDocIds.length} of {caseDocuments.length} selected)
          </p>
          {caseDocuments.length === 0 ? (
            <p className="text-xs text-[#697586]">
              No documents attached to this case yet. You can still run a demonstration preview.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {caseDocuments.map((doc) => {
                const checked = selectedDocIds.includes(doc.id);
                return (
                  <button
                    key={doc.id}
                    type="button"
                    onClick={() => toggleDoc(doc.id)}
                    className={`flex items-center gap-2.5 rounded-md border px-3 py-2 text-left text-xs transition-colors cursor-pointer ${
                      checked
                        ? 'border-[#14243A] bg-[#F7F8FA] text-[#14243A]'
                        : 'border-[#E5E9EF] bg-white text-[#697586]'
                    }`}
                  >
                    {checked ? (
                      <CheckSquare className="h-4 w-4 shrink-0 text-[#D9874D]" />
                    ) : (
                      <Square className="h-4 w-4 shrink-0 text-[#697586]" />
                    )}
                    <span className="truncate font-medium">{doc.fileName}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Analysis Report Workspace (8 Tabs) */}
      {activeReport && (
        <section className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <p className="text-xs font-semibold text-[#D9874D]">
                DEMONSTRATION DATA · Not Verified Legal Advice
              </p>
              <h2 className="text-lg font-semibold text-[#14243A]">{activeReport.reportTitle}</h2>
            </div>
            <p className="text-xs text-[#697586] tabular-nums">
              Generated {formatDateTime(activeReport.generatedDate)}
            </p>
          </div>

          <Tabs defaultValue="summary" className="w-full">
            <TabsList className="w-full justify-start">
              <TabsTrigger value="summary">1. Case Summary</TabsTrigger>
              <TabsTrigger value="facts">2. Important Facts</TabsTrigger>
              <TabsTrigger value="arguments">3. Legal Arguments</TabsTrigger>
              <TabsTrigger value="contradictions">
                4. Potential Contradictions ({activeReport.contradictions.length})
              </TabsTrigger>
              <TabsTrigger value="missing">5. Missing Information</TabsTrigger>
              <TabsTrigger value="perspective">6. Personal Perspective</TabsTrigger>
              <TabsTrigger value="dates">7. Important Dates</TabsTrigger>
              <TabsTrigger value="references">8. Legal References</TabsTrigger>
            </TabsList>

            {/* Tab 1: Case Summary */}
            <TabsContent value="summary">
              <div className="rounded-lg border border-[#E5E9EF] bg-white p-6 space-y-6">
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold text-[#14243A]">Overview</h3>
                  <p className="text-sm text-[#202936] leading-relaxed">
                    {activeReport.summary.overview}
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 border-t border-[#E5E9EF] pt-5">
                  <div className="space-y-2">
                    <h3 className="text-sm font-semibold text-[#14243A]">Parties</h3>
                    <div className="space-y-2">
                      {activeReport.summary.parties.map((p) => (
                        <div
                          key={p.role}
                          className="rounded-md bg-[#F7F8FA] border border-[#E5E9EF] px-3.5 py-2.5 text-xs"
                        >
                          <p className="text-[#697586]">{p.role}</p>
                          <p className="font-semibold text-[#14243A] mt-0.5">{p.name}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-sm font-semibold text-[#14243A]">Main Dispute</h3>
                    <p className="text-sm text-[#202936] leading-relaxed">
                      {activeReport.summary.mainDispute}
                    </p>
                  </div>
                </div>

                <div className="border-t border-[#E5E9EF] pt-5 space-y-2">
                  <h3 className="text-sm font-semibold text-[#14243A]">Primary Claims</h3>
                  <ul className="list-disc pl-5 space-y-1.5 text-sm text-[#202936]">
                    {activeReport.summary.claims.map((claim, i) => (
                      <li key={i}>{claim}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </TabsContent>

            {/* Tab 2: Important Facts */}
            <TabsContent value="facts">
              <div className="rounded-lg border border-[#E5E9EF] bg-white p-6 space-y-6">
                <div className="space-y-2.5">
                  <h3 className="text-sm font-semibold text-[#14243A]">Extracted Key Facts</h3>
                  <ul className="list-disc pl-5 space-y-2 text-sm text-[#202936]">
                    {activeReport.summary.importantFacts.map((fact, idx) => (
                      <li key={idx} className="leading-relaxed">
                        {fact}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 border-t border-[#E5E9EF] pt-5">
                  <div className="space-y-2">
                    <h3 className="text-sm font-semibold text-[#14243A]">Important Statements</h3>
                    <ul className="list-disc pl-5 space-y-1.5 text-xs text-[#202936]">
                      {activeReport.importantPoints.statements.map((st, idx) => (
                        <li key={idx} className="leading-relaxed">
                          {st}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-sm font-semibold text-[#14243A]">Evidence References</h3>
                    <div className="space-y-2">
                      {activeReport.importantPoints.evidenceReferences.map((ev, idx) => (
                        <div
                          key={idx}
                          className="rounded-md bg-[#F7F8FA] border border-[#E5E9EF] p-3 text-xs"
                        >
                          <p className="font-semibold text-[#14243A]">{ev.label}</p>
                          <p className="text-[#697586] mt-0.5">
                            {ev.document} · {ev.page}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Tab 3: Legal Arguments */}
            <TabsContent value="arguments">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="rounded-lg border border-[#E5E9EF] bg-white p-6 space-y-3">
                  <h3 className="text-sm font-semibold text-[#24845D]">Supporting Arguments</h3>
                  <ul className="list-disc pl-5 space-y-2 text-sm text-[#202936]">
                    {activeReport.importantPoints.supportingArguments.map((arg, idx) => (
                      <li key={idx} className="leading-relaxed">
                        {arg}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-lg border border-[#E5E9EF] bg-white p-6 space-y-3">
                  <h3 className="text-sm font-semibold text-[#C94D4D]">Opposing Arguments</h3>
                  <ul className="list-disc pl-5 space-y-2 text-sm text-[#202936]">
                    {activeReport.importantPoints.opposingArguments.map((arg, idx) => (
                      <li key={idx} className="leading-relaxed">
                        {arg}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="md:col-span-2 rounded-lg border border-[#E5E9EF] bg-white p-6 space-y-3">
                  <h3 className="text-sm font-semibold text-[#14243A]">Recorded Allegations</h3>
                  <ul className="list-disc pl-5 space-y-2 text-sm text-[#697586]">
                    {activeReport.importantPoints.allegations.map((al, idx) => (
                      <li key={idx}>{al}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </TabsContent>

            {/* Tab 4: Potential Contradictions */}
            <TabsContent value="contradictions">
              <div className="space-y-4">
                {activeReport.contradictions.map((ctr) => (
                  <div
                    key={ctr.id}
                    className="rounded-lg border border-[#E5E9EF] bg-white p-6 space-y-4"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <p className="text-xs text-[#697586]">
                          Potential Inconsistency · Demonstration Extract
                        </p>
                        <h3 className="text-base font-semibold text-[#14243A]">{ctr.title}</h3>
                      </div>
                      <div className="flex items-center gap-3">
                        <StatusText status={`${ctr.significance} Significance`} />
                        <Select
                          value={ctr.reviewStatus}
                          onChange={(e) => {
                            updateContradictionStatus(
                              activeReport.id,
                              ctr.id,
                              e.target.value as typeof ctr.reviewStatus
                            );
                            toast.success('Review status updated.');
                          }}
                          className="h-8 text-xs w-44"
                          aria-label="Update review status"
                        >
                          <option value="Pending Review">Pending Review</option>
                          <option value="Flagged for Advocate">Flagged for Advocate</option>
                          <option value="Clarified">Clarified</option>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div className="rounded-md border border-[#E5E9EF] bg-[#F7F8FA] p-4 space-y-1.5">
                        <p className="text-xs font-semibold text-[#14243A]">
                          Document A · {ctr.documentAName}
                        </p>
                        <p className="text-[11px] text-[#697586]">{ctr.documentAPage}</p>
                        <p className="text-xs text-[#202936] leading-relaxed italic">
                          {ctr.documentAPassage}
                        </p>
                      </div>
                      <div className="rounded-md border border-[#E5E9EF] bg-[#F5E4D6]/35 p-4 space-y-1.5">
                        <p className="text-xs font-semibold text-[#14243A]">
                          Document B · {ctr.documentBName}
                        </p>
                        <p className="text-[11px] text-[#697586]">{ctr.documentBPage}</p>
                        <p className="text-xs text-[#202936] leading-relaxed italic">
                          {ctr.documentBPassage}
                        </p>
                      </div>
                    </div>

                    <div className="border-t border-[#E5E9EF] pt-3 text-xs text-[#697586] leading-relaxed">
                      <span className="font-semibold text-[#14243A]">Explanation: </span>
                      {ctr.explanation}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* Tab 5: Missing Information */}
            <TabsContent value="missing">
              <div className="rounded-lg border border-[#E5E9EF] bg-white p-6 space-y-3">
                <h3 className="text-sm font-semibold text-[#14243A]">
                  Gaps & Missing Documentation Identified (Demo)
                </h3>
                <p className="text-xs text-[#697586]">
                  Collecting these records before an advocate consultation can strengthen factual
                  clarity.
                </p>
                <ul className="list-disc pl-5 space-y-2 text-sm text-[#202936] pt-2">
                  {activeReport.importantPoints.missingInformation.map((item, idx) => (
                    <li key={idx} className="leading-relaxed">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </TabsContent>

            {/* Tab 6: Personal Perspective */}
            <TabsContent value="perspective">
              <div className="space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-[#E5E9EF] bg-white p-4">
                  <div>
                    <p className="text-sm font-semibold text-[#14243A]">Select Perspective View</p>
                    <p className="text-xs text-[#697586]">
                      Compare strengths, vulnerabilities, and advocate questions from each party’s
                      vantage point.
                    </p>
                  </div>
                  <div className="inline-flex items-center gap-1 rounded-md bg-[#F7F8FA] p-1 border border-[#E5E9EF]">
                    {(['Petitioner', 'Respondent', 'Other Party'] as const).map((roleOption) => (
                      <button
                        key={roleOption}
                        type="button"
                        onClick={() => setPerspectiveRole(roleOption)}
                        className={`rounded px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap cursor-pointer ${
                          perspectiveRole === roleOption
                            ? 'bg-[#14243A] text-white'
                            : 'text-[#697586] hover:text-[#14243A]'
                        }`}
                      >
                        {roleOption}
                      </button>
                    ))}
                  </div>
                </div>

                {currentPerspective && (
                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    <div className="rounded-lg border border-[#E5E9EF] bg-white p-6 space-y-2.5">
                      <h3 className="text-sm font-semibold text-[#24845D]">
                        Points Supporting {currentPerspective.role}
                      </h3>
                      <ul className="list-disc pl-5 space-y-1.5 text-sm text-[#202936]">
                        {currentPerspective.supportingPoints.map((pt, i) => (
                          <li key={i}>{pt}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="rounded-lg border border-[#E5E9EF] bg-white p-6 space-y-2.5">
                      <h3 className="text-sm font-semibold text-[#C94D4D]">
                        Points Potentially Weakening Position
                      </h3>
                      <ul className="list-disc pl-5 space-y-1.5 text-sm text-[#202936]">
                        {currentPerspective.weakeningPoints.map((pt, i) => (
                          <li key={i}>{pt}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="rounded-lg border border-[#E5E9EF] bg-white p-6 space-y-2.5">
                      <h3 className="text-sm font-semibold text-[#D99A35]">Unclear Information</h3>
                      <ul className="list-disc pl-5 space-y-1.5 text-sm text-[#202936]">
                        {currentPerspective.unclearInformation.map((pt, i) => (
                          <li key={i}>{pt}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="rounded-lg border border-[#E5E9EF] bg-white p-6 space-y-2.5">
                      <h3 className="text-sm font-semibold text-[#14243A]">
                        Questions to Discuss with an Advocate
                      </h3>
                      <ul className="list-disc pl-5 space-y-1.5 text-sm text-[#202936]">
                        {currentPerspective.advocateQuestions.map((pt, i) => (
                          <li key={i}>{pt}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>

            {/* Tab 7: Important Dates */}
            <TabsContent value="dates">
              <div className="rounded-lg border border-[#E5E9EF] bg-white overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-[#E5E9EF] bg-[#F7F8FA] text-xs font-medium text-[#697586]">
                      <th className="px-6 py-3">Date</th>
                      <th className="px-4 py-3">Milestone</th>
                      <th className="px-6 py-3">Source Reference</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E5E9EF] text-sm">
                    {activeReport.summary.importantDates.map((d, idx) => (
                      <tr key={idx}>
                        <td className="px-6 py-3.5 font-mono text-xs font-semibold text-[#14243A] whitespace-nowrap tabular-nums">
                          {d.date}
                        </td>
                        <td className="px-4 py-3.5 text-sm text-[#202936]">{d.label}</td>
                        <td className="px-6 py-3.5 text-xs text-[#697586]">{d.source}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>

            {/* Tab 8: Legal References */}
            <TabsContent value="references">
              <div className="rounded-lg border border-[#E5E9EF] bg-white divide-y divide-[#E5E9EF]">
                {activeReport.legalReferences.map((ref) => (
                  <div key={ref.id} className="p-6 space-y-1.5">
                    <h3 className="text-sm font-semibold text-[#14243A]">{ref.title}</h3>
                    <p className="text-xs font-medium text-[#D9874D]">{ref.section}</p>
                    <p className="text-sm text-[#202936] leading-relaxed">{ref.relevance}</p>
                    <p className="text-xs text-[#697586]">{ref.sourceNote}</p>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          <ReportPreviewModal
            open={reportPreviewOpen}
            onOpenChange={setReportPreviewOpen}
            reportTitle={activeReport.reportTitle}
            caseTitle={activeReport.caseTitle}
            generatedDate={activeReport.generatedDate}
            sections={[
              { heading: 'Case Overview', items: [activeReport.summary.overview, activeReport.summary.mainDispute] },
              { heading: 'Key Facts & Claims', items: [...activeReport.summary.claims, ...activeReport.summary.importantFacts] },
              {
                heading: 'Potential Contradictions',
                items: activeReport.contradictions.map(
                  (c) => `${c.title} (${c.significance}): ${c.explanation}`
                ),
              },
              { heading: 'Missing Information', items: activeReport.importantPoints.missingInformation },
            ]}
            sources={activeReport.summary.importantDates.map((d) => `${d.date} — ${d.source}`)}
          />
        </section>
      )}
    </div>
  );
};
