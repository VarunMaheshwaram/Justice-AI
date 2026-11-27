import React, { useState } from 'react';
import { FileBarChart } from 'lucide-react';
import { useAppData } from '../../hooks/useAppData';
import { PageHeader } from '../../components/common/PageHeader';
import { ReportPreviewModal } from '../../components/common/ReportPreviewModal';
import { Button } from '../../components/ui/button';
import { Label, Select } from '../../components/ui/input';

export const ImportantPointsPage: React.FC = () => {
  const { analysisReports } = useAppData();
  const [selectedId, setSelectedId] = useState(analysisReports[0]?.id || '');
  const [previewOpen, setPreviewOpen] = useState(false);

  const report = analysisReports.find((r) => r.id === selectedId) || analysisReports[0];

  if (!report) return null;

  return (
    <div className="space-y-6">
      <PageHeader
        meta="DEMONSTRATION DATA · Structured Case Extraction"
        title="Important Points"
        description="Review extracted statements, allegations, supporting and opposing arguments, evidence references, and missing information."
        actions={
          <Button variant="outline" onClick={() => setPreviewOpen(true)}>
            <FileBarChart className="h-4 w-4" />
            Export Points Report
          </Button>
        }
      />

      <div className="rounded-lg border border-[#E5E9EF] bg-white p-4 max-w-md space-y-1.5">
        <Label htmlFor="points-report">Select Case Analysis</Label>
        <Select
          id="points-report"
          value={report.id}
          onChange={(e) => setSelectedId(e.target.value)}
        >
          {analysisReports.map((r) => (
            <option key={r.id} value={r.id}>
              {r.caseTitle}
            </option>
          ))}
        </Select>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <section className="rounded-lg border border-[#E5E9EF] bg-white p-6 space-y-3">
          <h2 className="text-base font-semibold text-[#14243A]">Important Statements</h2>
          <ul className="list-disc pl-5 space-y-2 text-sm text-[#202936]">
            {report.importantPoints.statements.map((item, i) => (
              <li key={i} className="leading-relaxed">
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-lg border border-[#E5E9EF] bg-white p-6 space-y-3">
          <h2 className="text-base font-semibold text-[#14243A]">Allegations</h2>
          <ul className="list-disc pl-5 space-y-2 text-sm text-[#202936]">
            {report.importantPoints.allegations.map((item, i) => (
              <li key={i} className="leading-relaxed">
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-lg border border-[#E5E9EF] bg-white p-6 space-y-3">
          <h2 className="text-base font-semibold text-[#24845D]">Supporting Arguments</h2>
          <ul className="list-disc pl-5 space-y-2 text-sm text-[#202936]">
            {report.importantPoints.supportingArguments.map((item, i) => (
              <li key={i} className="leading-relaxed">
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-lg border border-[#E5E9EF] bg-white p-6 space-y-3">
          <h2 className="text-base font-semibold text-[#C94D4D]">Opposing Arguments</h2>
          <ul className="list-disc pl-5 space-y-2 text-sm text-[#202936]">
            {report.importantPoints.opposingArguments.map((item, i) => (
              <li key={i} className="leading-relaxed">
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-lg border border-[#E5E9EF] bg-white p-6 space-y-3">
          <h2 className="text-base font-semibold text-[#14243A]">Evidence References</h2>
          <div className="space-y-2.5">
            {report.importantPoints.evidenceReferences.map((ev, i) => (
              <div key={i} className="rounded-md border border-[#E5E9EF] bg-[#F7F8FA] p-3 text-xs">
                <p className="font-semibold text-[#14243A]">{ev.label}</p>
                <p className="text-[#697586] mt-0.5">
                  {ev.document} · {ev.page}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-lg border border-[#E5E9EF] bg-white p-6 space-y-3">
          <h2 className="text-base font-semibold text-[#D99A35]">Missing Information</h2>
          <ul className="list-disc pl-5 space-y-2 text-sm text-[#202936]">
            {report.importantPoints.missingInformation.map((item, i) => (
              <li key={i} className="leading-relaxed">
                {item}
              </li>
            ))}
          </ul>
        </section>
      </div>

      <ReportPreviewModal
        open={previewOpen}
        onOpenChange={setPreviewOpen}
        reportTitle="Important Points Summary Report (Demo)"
        caseTitle={report.caseTitle}
        sections={[
          { heading: 'Important Statements', items: report.importantPoints.statements },
          { heading: 'Supporting Arguments', items: report.importantPoints.supportingArguments },
          { heading: 'Opposing Arguments', items: report.importantPoints.opposingArguments },
          { heading: 'Missing Information', items: report.importantPoints.missingInformation },
        ]}
        sources={report.importantPoints.evidenceReferences.map((e) => `${e.document} (${e.page})`)}
      />
    </div>
  );
};
