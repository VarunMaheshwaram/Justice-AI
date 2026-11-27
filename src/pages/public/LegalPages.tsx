import React from 'react';
import { LEGAL_DISCLAIMER_TEXT } from '../../constants';

interface LegalDocLayoutProps {
  kicker: string;
  title: string;
  updated: string;
  sections: { heading: string; body: string }[];
}

const LegalDocumentLayout: React.FC<LegalDocLayoutProps> = ({
  kicker,
  title,
  updated,
  sections,
}) => (
  <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 space-y-8">
    <div className="space-y-2 border-b border-[#E5E9EF] pb-6">
      <p className="text-xs font-semibold text-[#D9874D]">{kicker}</p>
      <h1 className="text-3xl font-bold tracking-tight text-[#14243A]">{title}</h1>
      <p className="text-xs text-[#697586]">Last reviewed: {updated} · Frontend Demonstration Policy</p>
    </div>

    <div className="rounded-lg border border-[#E5E9EF] bg-white p-6 sm:p-8 space-y-6">
      {sections.map((sec) => (
        <section key={sec.heading} className="space-y-2">
          <h2 className="text-base font-semibold text-[#14243A]">{sec.heading}</h2>
          <p className="text-sm text-[#202936] leading-relaxed">{sec.body}</p>
        </section>
      ))}
    </div>
  </div>
);

export const PrivacyPolicyPage: React.FC = () => (
  <LegalDocumentLayout
    kicker="Privacy & Data Protection"
    title="Privacy Policy"
    updated="26 November 2026"
    sections={[
      {
        heading: '1. Frontend Demonstration Notice',
        body: 'This release of JUSTICE AI operates solely in browser memory and local storage for demonstration purposes. No uploaded files, chat prompts, or profile edits are transmitted to external servers, production databases, or third-party AI APIs.',
      },
      {
        heading: '2. Do Not Upload Confidential Legal Files',
        body: 'Because this environment is a frontend-only prototype, users must not upload real confidential court filings, Aadhaar numbers, bank statements, or privileged client communications.',
      },
      {
        heading: '3. Planned Privacy-First Architecture',
        body: 'In future production phases, user documents will be stored in encrypted private object storage, processed with explicit user consent, and isolated per account. Documents will never be shared automatically with advocates listed in the directory.',
      },
      {
        heading: '4. User Rights & Data Control',
        body: 'Users will retain full control to export, archive, or permanently delete case workspaces, documents, and enquiry histories in accordance with applicable Indian data protection legislation.',
      },
    ]}
  />
);

export const TermsPage: React.FC = () => (
  <LegalDocumentLayout
    kicker="Platform Governance"
    title="Terms and Conditions"
    updated="26 November 2026"
    sections={[
      {
        heading: '1. Scope of Service',
        body: 'JUSTICE AI provides software tools for organising case information, summarising documents, exploring Indian legal reference material, and browsing advocate profiles. JUSTICE AI is not a law firm and does not practice law.',
      },
      {
        heading: '2. No Advocate-Client Relationship',
        body: 'Using JUSTICE AI, reading demonstration reports, or browsing the advocate directory does not create an advocate-client relationship. Any formal legal engagement occurs independently between the user and a qualified advocate.',
      },
      {
        heading: '3. Accuracy & Independent Verification',
        body: 'AI-assisted summaries, extracted timelines, and contradiction highlights may contain omissions or inaccuracies. Users must verify all facts, dates, and statutory citations against original records and qualified legal advice.',
      },
      {
        heading: '4. Demonstration Profiles & Listings',
        body: 'Advocate profiles shown in this phase are fictional demonstration entries. Verification badges displayed in demo mode do not represent live Bar Council verification.',
      },
    ]}
  />
);

export const DisclaimerPage: React.FC = () => (
  <LegalDocumentLayout
    kicker="Transparency & Legal Boundaries"
    title="Legal Disclaimer"
    updated="26 November 2026"
    sections={[
      {
        heading: 'Mandatory Platform Disclaimer',
        body: LEGAL_DISCLAIMER_TEXT,
      },
      {
        heading: 'Simulated Processing in Current Phase',
        body: 'Document uploads, OCR extraction, contradiction detection, chat answers, and legal reports in this frontend application use local demonstration datasets. They are intended solely to demonstrate the user interface and workflow.',
      },
      {
        heading: 'No Live Court Integration or Verified Legal Citations',
        body: 'JUSTICE AI does not connect to live e-Courts databases in this phase. All case numbers, hearing dates, and legal summaries are illustrative examples and must not be cited in any legal proceeding.',
      },
    ]}
  />
);
