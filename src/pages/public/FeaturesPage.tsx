import React from 'react';
import { Link } from 'react-router-dom';
import {
  FileSearch,
  GitCompare,
  Compass,
  BookOpen,
  CalendarClock,
  Users,
  MessageSquare,
  FileBarChart,
  ArrowRight,
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { DisclaimerBanner } from '../../components/common/DisclaimerBanner';

const DETAILED_FEATURES = [
  {
    icon: FileSearch,
    title: 'AI Document Intelligence',
    points: [
      'Upload PDF, DOCX, JPG, JPEG, and PNG case files organised by document type.',
      'Plain-language case summaries separating parties, claims, key facts, and statutory clauses.',
      'Structured identification of missing evidence or unverified annexures.',
    ],
  },
  {
    icon: GitCompare,
    title: 'Potential Contradiction Detection',
    points: [
      'Side-by-side passage comparison between agreements, emails, notices, and written replies.',
      'Significance rating (High, Medium, Low) and advocate review status tracking.',
      'Every flagged inconsistency cites exact document names and page references.',
    ],
  },
  {
    icon: Compass,
    title: 'Personal Perspective Analysis',
    points: [
      'Switch views between Petitioner, Respondent, and Neutral / Other Party.',
      'Review points strengthening your stance alongside areas that may weaken your argument.',
      'Auto-organised list of practical questions to raise during an advocate consultation.',
    ],
  },
  {
    icon: MessageSquare,
    title: 'Ask Justice AI Assistant',
    points: [
      'Context-aware chat workspace linked to a chosen case and document set.',
      'Suggested legal clarity prompts for plain-English explanations and timeline checks.',
      'Copy responses, provide helpfulness feedback, and preserve conversation history.',
    ],
  },
  {
    icon: BookOpen,
    title: 'Indian Legal Knowledge Library',
    points: [
      'Search across 10 core Indian legal domains including Property, Consumer, Civil, Criminal, and Corporate Law.',
      'Browse Acts, sections, illustrative judicial notes, and plain-language definitions.',
      'Track recently viewed provisions for quick reference during case preparation.',
    ],
  },
  {
    icon: CalendarClock,
    title: 'Interactive Case Timeline',
    points: [
      'Visual chronological record of filings, notices, replies, hearings, and orders.',
      'Clearly distinguishes User-entered, AI-extracted, and Court-confirmed entries.',
      'Add, edit, filter, and link events directly to source documents.',
    ],
  },
  {
    icon: Users,
    title: 'Advocate Discovery & Enquiries',
    points: [
      'Filter by city, state, locality, specialization, experience, language, and indicative fee.',
      'Bookmark suitable advocates and submit structured consultation enquiries.',
      'Strict privacy control: case documents are never automatically transmitted.',
    ],
  },
  {
    icon: FileBarChart,
    title: 'Print-Ready Case Reports',
    points: [
      'Generate structured previews for Case Summary, Contradictions, Important Points, and Timeline.',
      'Clean print styling and text export formatted with source references and AI disclaimers.',
    ],
  },
];

export const FeaturesPage: React.FC = () => {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 space-y-12">
      <div className="max-w-3xl space-y-4">
        <p className="text-xs font-semibold text-[#D9874D]">Platform Capabilities</p>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#14243A]">
          Every tool required to understand and organise a legal matter.
        </h1>
        <p className="text-base text-[#697586] leading-relaxed">
          Built for Indian litigants, families, and businesses who want structured clarity before
          and during formal legal representation.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {DETAILED_FEATURES.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.title}
              className="rounded-lg border border-[#E5E9EF] bg-white p-6 space-y-4"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-[#F7F8FA] text-[#14243A] border border-[#E5E9EF]">
                  <Icon className="h-5 w-5" />
                </div>
                <h2 className="text-lg font-semibold text-[#14243A]">{item.title}</h2>
              </div>
              <ul className="space-y-2 text-sm text-[#697586] list-disc pl-5">
                {item.points.map((pt) => (
                  <li key={pt} className="leading-relaxed">
                    {pt}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-[#E5E9EF] bg-white p-6">
        <div className="space-y-1">
          <h3 className="text-base font-semibold text-[#14243A]">
            Explore these modules interactively in Demo Mode
          </h3>
          <p className="text-sm text-[#697586]">
            No account setup required—test the client, advocate, and administrator portals immediately.
          </p>
        </div>
        <Button asChild>
          <Link to="/login">
            Open Demo Access
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>

      <DisclaimerBanner />
    </div>
  );
};
