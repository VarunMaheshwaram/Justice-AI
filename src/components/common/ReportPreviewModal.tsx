import React from 'react';
import { Printer, Download } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { JusticeLogo } from './JusticeLogo';
import { LEGAL_DISCLAIMER_TEXT } from '../../constants';
import { formatDateTime } from '../../utils/formatters';

export interface ReportSection {
  heading: string;
  items: string[];
}

interface ReportPreviewModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  reportTitle: string;
  caseTitle: string;
  generatedDate?: string;
  sections: ReportSection[];
  sources: string[];
}

export const ReportPreviewModal: React.FC<ReportPreviewModalProps> = ({
  open,
  onOpenChange,
  reportTitle,
  caseTitle,
  generatedDate = new Date().toISOString(),
  sections,
  sources,
}) => {
  const handlePrint = () => {
    window.print();
  };

  const handleDownloadText = () => {
    const lines = [
      'JUSTICE AI — DEMONSTRATION REPORT (NOT AN OFFICIAL COURT DOCUMENT)',
      `Report Title: ${reportTitle}`,
      `Case: ${caseTitle}`,
      `Generated: ${formatDateTime(generatedDate)}`,
      '',
      ...sections.flatMap((sec) => [
        `=== ${sec.heading} ===`,
        ...sec.items.map((item) => `- ${item}`),
        '',
      ]),
      '=== Source References ===',
      ...sources.map((s) => `- ${s}`),
      '',
      'DISCLAIMER:',
      LEGAL_DISCLAIMER_TEXT,
    ];
    const blob = new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${reportTitle.toLowerCase().replace(/[^a-z0-9]+/g, '_')}_demo.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader className="no-print">
          <DialogTitle>Report Preview</DialogTitle>
          <DialogDescription>
            Demonstration report preview — for informational review only, not an official court filing.
          </DialogDescription>
        </DialogHeader>

        <div className="rounded-lg border border-[#E5E9EF] bg-white p-6 space-y-6">
          <div className="flex flex-col gap-3 border-b border-[#E5E9EF] pb-5 sm:flex-row sm:items-start sm:justify-between">
            <div className="space-y-1.5">
              <JusticeLogo />
              <p className="text-xs font-medium text-[#D9874D]">
                Demonstration Output · Not an Official Court Document
              </p>
            </div>
            <div className="text-left sm:text-right text-xs text-[#697586] space-y-0.5 tabular-nums">
              <p className="font-medium text-[#14243A]">{reportTitle}</p>
              <p>Generated: {formatDateTime(generatedDate)}</p>
            </div>
          </div>

          <div className="space-y-1">
            <p className="text-xs font-medium text-[#697586]">Case Reference</p>
            <h3 className="text-lg font-semibold text-[#14243A]">{caseTitle}</h3>
          </div>

          <div className="space-y-5">
            {sections.map((section) => (
              <div key={section.heading} className="space-y-2 border-t border-[#E5E9EF] pt-4">
                <h4 className="text-sm font-semibold text-[#14243A]">{section.heading}</h4>
                <ul className="space-y-1.5 text-sm text-[#202936] list-disc pl-5">
                  {section.items.map((item, idx) => (
                    <li key={idx} className="leading-relaxed">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {sources.length > 0 && (
            <div className="space-y-2 border-t border-[#E5E9EF] pt-4">
              <h4 className="text-sm font-semibold text-[#14243A]">Source References</h4>
              <ul className="space-y-1 text-xs text-[#697586]">
                {sources.map((src, i) => (
                  <li key={i}>{src}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="rounded-md bg-[#F7F8FA] border border-[#E5E9EF] p-4 text-xs text-[#697586] leading-relaxed">
            <p className="font-semibold text-[#14243A] mb-1">AI-Generated Disclaimer</p>
            <p>{LEGAL_DISCLAIMER_TEXT}</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-end gap-2.5 pt-2 no-print">
          <Button variant="outline" onClick={handleDownloadText}>
            <Download className="h-4 w-4" />
            Export Text
          </Button>
          <Button onClick={handlePrint}>
            <Printer className="h-4 w-4" />
            Print Report
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
