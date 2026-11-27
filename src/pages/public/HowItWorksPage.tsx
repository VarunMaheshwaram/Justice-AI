import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { DisclaimerBanner } from '../../components/common/DisclaimerBanner';

const STEPS = [
  {
    number: '01',
    title: 'Create a Case Workspace & Upload Documents',
    summary:
      'Start by recording basic details such as case category, court location, your role (Petitioner, Respondent, or Other Party), and opposing party. Upload agreements, legal notices, affidavits, or scanned correspondence.',
    demoNote: 'In this frontend phase, file upload and OCR extraction run in simulated mode locally.',
  },
  {
    number: '02',
    title: 'Extract & Organise Structured Information',
    summary:
      'Documents are categorised and parsed to surface key parties, dates, monetary figures, obligations, and evidentiary annexures in one structured dossier.',
    demoNote: 'Planned production architecture uses PyMuPDF, Tesseract OCR, and PostgreSQL + pgvector.',
  },
  {
    number: '03',
    title: 'Review AI Insights, Contradictions & Perspectives',
    summary:
      'Inspect side-by-side potential contradictions between documents, review missing facts, and view balanced Petitioner vs Respondent strengths and risks.',
    demoNote: 'All generated reports carry explicit source references and verification checklists.',
  },
  {
    number: '04',
    title: 'Explore Indian Legal Knowledge & Build Your Timeline',
    summary:
      'Search plain-English explanations of relevant Indian legislation and maintain a chronological timeline distinguishing user-entered, AI-extracted, and court-confirmed events.',
    demoNote: 'Educational reference summaries only—never a substitute for verified statutory counsel.',
  },
  {
    number: '05',
    title: 'Discover Suitable Advocates & Prepare Consultation Questions',
    summary:
      'Filter advocates by city, specialization, language, and indicative consultation fee. Export a structured report preview and initiate an enquiry while keeping full control of your documents.',
    demoNote: 'Documents are never shared automatically with any advocate.',
  },
];

export const HowItWorksPage: React.FC = () => {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8 space-y-12">
      <div className="space-y-4">
        <p className="text-xs font-semibold text-[#D9874D]">Five-Step Process</p>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#14243A]">
          How JUSTICE AI works from first upload to informed action.
        </h1>
        <p className="text-base text-[#697586] max-w-2xl leading-relaxed">
          A transparent, human-in-the-loop workflow that keeps you and your advocate in control of
          every legal decision.
        </p>
      </div>

      <div className="space-y-6">
        {STEPS.map((step) => (
          <div
            key={step.number}
            className="rounded-lg border border-[#E5E9EF] bg-white p-6 grid grid-cols-1 gap-4 md:grid-cols-12"
          >
            <div className="md:col-span-2">
              <span className="text-sm font-mono font-semibold text-[#D9874D] tabular-nums">
                Step {step.number}
              </span>
            </div>
            <div className="md:col-span-10 space-y-2.5">
              <h2 className="text-lg font-semibold text-[#14243A]">{step.title}</h2>
              <p className="text-sm text-[#202936] leading-relaxed">{step.summary}</p>
              <p className="text-xs text-[#697586]">{step.demoNote}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Button asChild size="lg">
          <Link to="/login">
            Try Interactive Demo
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link to="/find-advocates">Explore Advocate Directory</Link>
        </Button>
      </div>

      <DisclaimerBanner />
    </div>
  );
};
