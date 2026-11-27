import React, { useMemo, useState } from 'react';
import { FileBarChart } from 'lucide-react';
import { toast } from 'sonner';
import { useAppData } from '../../hooks/useAppData';
import { PageHeader } from '../../components/common/PageHeader';
import { StatusText } from '../../components/common/StatCard';
import { ReportPreviewModal } from '../../components/common/ReportPreviewModal';
import { Button } from '../../components/ui/button';
import { Select } from '../../components/ui/input';

export const ContradictionsPage: React.FC = () => {
  const { analysisReports, updateContradictionStatus } = useAppData();
  const [caseFilter, setCaseFilter] = useState('All');
  const [sigFilter, setSigFilter] = useState('All');
  const [reportOpen, setReportOpen] = useState(false);

  const allItems = useMemo(() => {
    return analysisReports.flatMap((report) =>
      report.contradictions.map((c) => ({
        ...c,
        reportId: report.id,
        caseTitle: report.caseTitle,
      }))
    );
  }, [analysisReports]);

  const filtered = useMemo(
    () =>
      allItems.filter((item) => {
        if (caseFilter !== 'All' && item.caseId !== caseFilter) return false;
        if (sigFilter !== 'All' && item.significance !== sigFilter) return false;
        return true;
      }),
    [allItems, caseFilter, sigFilter]
  );

  return (
    <div className="space-y-6">
      <PageHeader
        meta="DEMONSTRATION DATA · Side-by-Side Document Comparison"
        title="Contradiction Detection"
        description="Compare conflicting passages across two case documents side by side, inspect potential legal significance, and track review status."
        actions={
          <Button variant="outline" onClick={() => setReportOpen(true)}>
            <FileBarChart className="h-4 w-4" />
            Contradiction Report
          </Button>
        }
      />

      <div className="rounded-lg border border-[#E5E9EF] bg-white p-4 grid grid-cols-1 gap-3 sm:grid-cols-2 max-w-2xl">
        <Select value={caseFilter} onChange={(e) => setCaseFilter(e.target.value)}>
          <option value="All">All Analysed Cases</option>
          {analysisReports.map((r) => (
            <option key={r.caseId} value={r.caseId}>
              {r.caseTitle}
            </option>
          ))}
        </Select>
        <Select value={sigFilter} onChange={(e) => setSigFilter(e.target.value)}>
          <option value="All">All Significance Levels</option>
          <option value="High">High Significance</option>
          <option value="Medium">Medium Significance</option>
          <option value="Low">Low Significance</option>
        </Select>
      </div>

      <div className="space-y-5">
        {filtered.map((item) => (
          <article
            key={item.id}
            className="rounded-lg border border-[#E5E9EF] bg-white p-6 space-y-4"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="space-y-1">
                <p className="text-xs text-[#697586]">{item.caseTitle}</p>
                <h2 className="text-base font-semibold text-[#14243A]">{item.title}</h2>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <StatusText status={`${item.significance} Significance`} />
                <Select
                  value={item.reviewStatus}
                  onChange={(e) => {
                    updateContradictionStatus(
                      item.reportId,
                      item.id,
                      e.target.value as typeof item.reviewStatus
                    );
                    toast.success('Contradiction review status updated.');
                  }}
                  className="h-8 text-xs w-44"
                  aria-label="Review status"
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
                  Document A · {item.documentAName}
                </p>
                <p className="text-[11px] text-[#697586]">{item.documentAPage}</p>
                <p className="text-sm text-[#202936] leading-relaxed italic">
                  {item.documentAPassage}
                </p>
              </div>
              <div className="rounded-md border border-[#E5E9EF] bg-[#F5E4D6]/30 p-4 space-y-1.5">
                <p className="text-xs font-semibold text-[#14243A]">
                  Document B · {item.documentBName}
                </p>
                <p className="text-[11px] text-[#697586]">{item.documentBPage}</p>
                <p className="text-sm text-[#202936] leading-relaxed italic">
                  {item.documentBPassage}
                </p>
              </div>
            </div>

            <p className="text-sm text-[#697586] leading-relaxed border-t border-[#E5E9EF] pt-3">
              <strong className="font-semibold text-[#14243A]">Analysis Note: </strong>
              {item.explanation}
            </p>
          </article>
        ))}
      </div>

      <ReportPreviewModal
        open={reportOpen}
        onOpenChange={setReportOpen}
        reportTitle="Potential Contradiction Report (Demo)"
        caseTitle={
          caseFilter === 'All'
            ? 'All Analysed Cases (Demo)'
            : analysisReports.find((r) => r.caseId === caseFilter)?.caseTitle || 'Selected Case'
        }
        sections={filtered.map((c) => ({
          heading: `${c.title} (${c.significance} Significance · ${c.reviewStatus})`,
          items: [
            `Document A (${c.documentAName}, ${c.documentAPage}): ${c.documentAPassage}`,
            `Document B (${c.documentBName}, ${c.documentBPage}): ${c.documentBPassage}`,
            `Explanation: ${c.explanation}`,
          ],
        }))}
        sources={Array.from(
          new Set(filtered.flatMap((c) => [c.documentAName, c.documentBName]))
        )}
      />
    </div>
  );
};
