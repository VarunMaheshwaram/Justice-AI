import React, { useState } from 'react';
import { useAppData } from '../../hooks/useAppData';
import { PageHeader } from '../../components/common/PageHeader';
import { Label, Select } from '../../components/ui/input';

export const PerspectivePage: React.FC = () => {
  const { analysisReports } = useAppData();
  const [selectedReportId, setSelectedReportId] = useState(analysisReports[0]?.id || '');
  const [role, setRole] = useState<'Petitioner' | 'Respondent' | 'Other Party'>('Petitioner');

  const report = analysisReports.find((r) => r.id === selectedReportId) || analysisReports[0];
  if (!report) return null;

  const detail = report.perspectives[role];

  return (
    <div className="space-y-6">
      <PageHeader
        meta="DEMONSTRATION DATA · Balanced Multi-Role View"
        title="Personal Perspective Analysis"
        description="Evaluate supporting points, potential vulnerabilities, unclear areas, and advocate consultation questions from any party's standpoint."
      />

      <div className="rounded-lg border border-[#E5E9EF] bg-white p-5 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="w-full md:max-w-md space-y-1.5">
          <Label htmlFor="persp-case">Select Case</Label>
          <Select
            id="persp-case"
            value={report.id}
            onChange={(e) => setSelectedReportId(e.target.value)}
          >
            {analysisReports.map((r) => (
              <option key={r.id} value={r.id}>
                {r.caseTitle}
              </option>
            ))}
          </Select>
        </div>

        <div className="space-y-1.5">
          <Label>Perspective Role</Label>
          <div className="inline-flex items-center gap-1 rounded-md bg-[#F7F8FA] p-1 border border-[#E5E9EF]">
            {(['Petitioner', 'Respondent', 'Other Party'] as const).map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setRole(item)}
                className={`rounded px-3.5 py-1.5 text-xs font-medium transition-colors whitespace-nowrap cursor-pointer ${
                  role === item
                    ? 'bg-[#14243A] text-white'
                    : 'text-[#697586] hover:text-[#14243A]'
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <section className="rounded-lg border border-[#E5E9EF] bg-white p-6 space-y-3">
          <h2 className="text-base font-semibold text-[#24845D]">
            Points Supporting {detail.role}
          </h2>
          <ul className="list-disc pl-5 space-y-2 text-sm text-[#202936]">
            {detail.supportingPoints.map((pt, idx) => (
              <li key={idx} className="leading-relaxed">
                {pt}
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-lg border border-[#E5E9EF] bg-white p-6 space-y-3">
          <h2 className="text-base font-semibold text-[#C94D4D]">
            Points Potentially Weakening Position
          </h2>
          <ul className="list-disc pl-5 space-y-2 text-sm text-[#202936]">
            {detail.weakeningPoints.map((pt, idx) => (
              <li key={idx} className="leading-relaxed">
                {pt}
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-lg border border-[#E5E9EF] bg-white p-6 space-y-3">
          <h2 className="text-base font-semibold text-[#D99A35]">Unclear Information</h2>
          <ul className="list-disc pl-5 space-y-2 text-sm text-[#202936]">
            {detail.unclearInformation.map((pt, idx) => (
              <li key={idx} className="leading-relaxed">
                {pt}
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-lg border border-[#E5E9EF] bg-white p-6 space-y-3">
          <h2 className="text-base font-semibold text-[#14243A]">
            Suggested Questions for Your Advocate
          </h2>
          <ul className="list-disc pl-5 space-y-2 text-sm text-[#202936]">
            {detail.advocateQuestions.map((pt, idx) => (
              <li key={idx} className="leading-relaxed">
                {pt}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
};
