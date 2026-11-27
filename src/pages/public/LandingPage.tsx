import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  FileSearch,
  GitCompare,
  Compass,
  BookOpen,
  CalendarClock,
  Users,
  ShieldCheck,
  Scale,
  FileCheck,
  Eye,
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { useAuth } from '../../context/AuthContext';
import { DisclaimerBanner } from '../../components/common/DisclaimerBanner';

type HeroPreviewTab = 'analysis' | 'contradictions' | 'timeline' | 'advocates';

const FEATURES = [
  {
    index: '01',
    title: 'AI Document Intelligence',
    description:
      'Convert dense legal notices, petitions, agreements, and court orders into plain-English summaries, extracted parties, claims, and key obligations.',
    icon: FileSearch,
  },
  {
    index: '02',
    title: 'Potential Contradiction Detection',
    description:
      'Compare statements side by side across multiple filings and emails to spot timeline mismatches, conflicting figures, or clause inconsistencies.',
    icon: GitCompare,
  },
  {
    index: '03',
    title: 'Personalised Case Analysis',
    description:
      'Review structured points from a Petitioner, Respondent, or Neutral viewpoint—including supporting facts, potential weak spots, and questions to ask your advocate.',
    icon: Compass,
  },
  {
    index: '04',
    title: 'Indian Legal Knowledge',
    description:
      'Explore structured summaries of Indian central legislation, legal sections, procedural concepts, and legal definitions without jargon.',
    icon: BookOpen,
  },
  {
    index: '05',
    title: 'Case Timeline',
    description:
      'Maintain an ordered chronology combining AI-extracted dates, user-entered milestones, and court-confirmed hearing records linked to source files.',
    icon: CalendarClock,
  },
  {
    index: '06',
    title: 'Advocate Discovery',
    description:
      'Filter legal professionals across Indian cities by practice area, experience, languages, and indicative consultation fees—with full user control over sharing.',
    icon: Users,
  },
];

const HOW_IT_WORKS_STEPS = [
  {
    step: '01',
    title: 'Upload documents',
    description:
      'Organise PDFs, DOCX files, and scans into dedicated case workspaces by document category.',
  },
  {
    step: '02',
    title: 'Extract and process information',
    description:
      'Structure key dates, party statements, contractual clauses, and annexures for review.',
  },
  {
    step: '03',
    title: 'Review AI-generated insights',
    description:
      'Inspect summaries, important points, potential contradictions, and perspective checklists.',
  },
  {
    step: '04',
    title: 'Explore legal information',
    description:
      'Read plain-language references to Indian statutes and legal terminology relevant to your matter.',
  },
  {
    step: '05',
    title: 'Discover suitable advocates',
    description:
      'Shortlist advocates by city and practice area and send a consultation enquiry when ready.',
  },
];

const TRUST_PILLARS = [
  {
    title: 'Privacy-conscious design',
    description:
      'Case files remain strictly in your workspace. JUSTICE AI never automatically shares documents with advocates or third parties.',
    icon: ShieldCheck,
  },
  {
    title: 'Balanced analysis',
    description:
      'Highlights both supporting strengths and potential counter-arguments so you walk into consultations prepared rather than surprised.',
    icon: Scale,
  },
  {
    title: 'Source-grounded legal information',
    description:
      'Every extracted date, claim, and contradiction links back to the specific document and page number for independent verification.',
    icon: FileCheck,
  },
  {
    title: 'Transparent AI limitations',
    description:
      'Clearly distinguishes demonstration outputs and AI-assisted summaries from verified legal advice or official court records.',
    icon: Eye,
  },
];

export const LandingPage: React.FC = () => {
  const [previewTab, setPreviewTab] = useState<HeroPreviewTab>('analysis');
  const { loginAsDemo } = useAuth();
  const navigate = useNavigate();

  const handleQuickDemo = async (role: 'client' | 'advocate' | 'admin') => {
    await loginAsDemo(role);
    navigate(`/${role}/dashboard`);
  };

  return (
    <div className="bg-[#F7F8FA]">
      {/* Hero Section */}
      <section className="border-b border-[#E5E9EF] bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-6 space-y-6">
              <p className="text-sm font-medium text-[#D9874D]">
                India Legal Case Intelligence Platform · Frontend Demo
              </p>
              <h1 className="text-4xl font-bold tracking-tight text-[#14243A] sm:text-5xl leading-[1.12]">
                Legal Clarity, Powered by Intelligence.
              </h1>
              <p className="text-base text-[#697586] leading-relaxed max-w-xl">
                Understand complex legal documents, uncover important case insights and discover
                suitable legal professionals — all through one intelligent platform.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Button size="lg" onClick={() => handleQuickDemo('client')}>
                  Start Analysing
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/features">Explore Features</Link>
                </Button>
              </div>

              <div className="pt-4 border-t border-[#E5E9EF]">
                <p className="text-xs font-medium text-[#697586] mb-2.5">
                  Instant Demonstration Mode — explore role-specific workspaces:
                </p>
                <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-[#14243A]">
                  <button
                    type="button"
                    onClick={() => handleQuickDemo('client')}
                    className="hover:text-[#D9874D] underline underline-offset-4 cursor-pointer"
                  >
                    Continue as Client
                  </button>
                  <span className="text-[#E5E9EF]" aria-hidden="true">
                    /
                  </span>
                  <button
                    type="button"
                    onClick={() => handleQuickDemo('advocate')}
                    className="hover:text-[#D9874D] underline underline-offset-4 cursor-pointer"
                  >
                    Continue as Advocate
                  </button>
                  <span className="text-[#E5E9EF]" aria-hidden="true">
                    /
                  </span>
                  <button
                    type="button"
                    onClick={() => handleQuickDemo('admin')}
                    className="hover:text-[#D9874D] underline underline-offset-4 cursor-pointer"
                  >
                    Continue as Admin
                  </button>
                </div>
              </div>
            </div>

            {/* Interactive Enterprise Dashboard Illustration */}
            <div className="lg:col-span-6">
              <div className="rounded-xl border border-[#E5E9EF] bg-[#14243A] p-4 sm:p-5 shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3.5">
                  <div>
                    <p className="text-xs font-semibold text-white">
                      Horizon Residency Flat Possession Delay
                    </p>
                    <p className="text-[11px] text-slate-300 font-mono tabular-nums">
                      DEMO-CC/2026/0418 · 4 Sample Documents · Illustration
                    </p>
                  </div>
                  <div className="flex items-center gap-1 rounded-md bg-[#0D1929] p-1">
                    {(
                      [
                        { id: 'analysis', label: 'Summary' },
                        { id: 'contradictions', label: 'Contradictions' },
                        { id: 'timeline', label: 'Timeline' },
                        { id: 'advocates', label: 'Advocates' },
                      ] as { id: HeroPreviewTab; label: string }[]
                    ).map((tab) => (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setPreviewTab(tab.id)}
                        className={`rounded px-2.5 py-1 text-[11px] font-medium transition-colors whitespace-nowrap cursor-pointer ${
                          previewTab === tab.id
                            ? 'bg-[#D9874D] text-white'
                            : 'text-slate-300 hover:text-white'
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-4 rounded-lg bg-white p-4 sm:p-5 text-[#202936] min-h-[290px] flex flex-col justify-between">
                  {previewTab === 'analysis' && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-xs text-[#697586]">
                        <span className="font-semibold text-[#14243A]">
                          Document Intelligence Extract (Demo)
                        </span>
                        <span className="font-mono tabular-nums">Clause 9.1–9.2</span>
                      </div>
                      <p className="text-xs leading-relaxed text-[#202936]">
                        Agreement stipulates handover by <strong className="font-semibold">31 Dec 2024</strong>.
                        Any 6-month grace period requires written intimation 45 days in advance.
                      </p>
                      <div className="grid grid-cols-3 gap-3 border-t border-[#E5E9EF] pt-4">
                        <div>
                          <p className="text-[11px] text-[#697586]">Key Points</p>
                          <p className="text-lg font-semibold text-[#14243A] tabular-nums">12</p>
                        </div>
                        <div>
                          <p className="text-[11px] text-[#697586]">Flagged Conflicts</p>
                          <p className="text-lg font-semibold text-[#C94D4D] tabular-nums">3</p>
                        </div>
                        <div>
                          <p className="text-[11px] text-[#697586]">Timeline Events</p>
                          <p className="text-lg font-semibold text-[#24845D] tabular-nums">6</p>
                        </div>
                      </div>
                      <div className="border-t border-[#E5E9EF] pt-3 text-xs text-[#697586]">
                        <span className="font-medium text-[#14243A]">Missing info identified:</span>{' '}
                        Occupancy Certificate filing date & bank-certified receipt #4.
                      </div>
                    </div>
                  )}

                  {previewTab === 'contradictions' && (
                    <div className="space-y-3.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-[#14243A]">
                          Side-by-Side Conflict Detected (Demo)
                        </span>
                        <span className="font-semibold text-[#C94D4D]">High Significance</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        <div className="rounded-md border border-[#E5E9EF] bg-[#F7F8FA] p-3 space-y-1">
                          <p className="font-semibold text-[#14243A]">CRM Email · 18 Nov 2024</p>
                          <p className="text-[#697586] leading-relaxed">
                            "Tower B finishing is 95% complete with all utility approvals in place."
                          </p>
                        </div>
                        <div className="rounded-md border border-[#E5E9EF] bg-[#F5E4D6]/40 p-3 space-y-1">
                          <p className="font-semibold text-[#14243A]">Written Reply · 14 Feb 2026</p>
                          <p className="text-[#202936] leading-relaxed">
                            "Work remained halted since June 2024 due to pending municipal water approvals."
                          </p>
                        </div>
                      </div>
                      <p className="text-xs text-[#697586]">
                        Review note: Verify email authenticity certificate with your advocate before
                        cross-examination.
                      </p>
                    </div>
                  )}

                  {previewTab === 'timeline' && (
                    <div className="space-y-3">
                      <p className="text-xs font-semibold text-[#14243A]">
                        Document-Linked Case Chronology (Demo)
                      </p>
                      <div className="space-y-2.5 text-xs">
                        {[
                          { date: '12 Mar 2023', title: 'Builder-Buyer Agreement signed', tag: 'AI-extracted' },
                          { date: '18 Nov 2024', title: 'CRM email assured Dec 2024 handover', tag: 'User-entered' },
                          { date: '22 Jan 2026', title: 'Legal notice demanding possession', tag: 'AI-extracted' },
                          { date: '15 Apr 2026', title: 'Complaint admitted for written version', tag: 'Court-confirmed' },
                        ].map((item) => (
                          <div
                            key={item.date}
                            className="flex items-center justify-between gap-3 border-b border-[#E5E9EF] pb-2 last:border-b-0"
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <span className="font-mono text-[11px] text-[#697586] tabular-nums shrink-0">
                                {item.date}
                              </span>
                              <span className="font-medium text-[#202936] truncate">{item.title}</span>
                            </div>
                            <span className="text-[11px] font-medium text-[#D9874D] shrink-0">
                              {item.tag}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {previewTab === 'advocates' && (
                    <div className="space-y-3">
                      <p className="text-xs font-semibold text-[#14243A]">
                        Matching Advocates · Property & Consumer Law (Demo Profiles)
                      </p>
                      <div className="space-y-2.5">
                        {[
                          {
                            name: 'Adv. Rajeshwar Rao',
                            meta: 'Hyderabad · 15 yrs · Property, Consumer',
                            fee: '₹2,000',
                          },
                          {
                            name: 'Adv. Meera Deshmukh',
                            meta: 'Mumbai · 12 yrs · Property, Civil',
                            fee: '₹2,500',
                          },
                          {
                            name: 'Adv. Rohan Kulkarni',
                            meta: 'Bengaluru · 9 yrs · Commercial, Corporate',
                            fee: '₹3,500',
                          },
                        ].map((adv) => (
                          <div
                            key={adv.name}
                            className="flex items-center justify-between gap-3 rounded-md border border-[#E5E9EF] p-3 text-xs"
                          >
                            <div>
                              <p className="font-semibold text-[#14243A]">{adv.name}</p>
                              <p className="text-[#697586]">{adv.meta}</p>
                            </div>
                            <span className="font-mono font-medium text-[#14243A] tabular-nums">
                              {adv.fee}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="mt-4 pt-3 border-t border-[#E5E9EF] flex items-center justify-between text-[11px] text-[#697586]">
                    <span>Illustrative workspace preview · Demo data</span>
                    <button
                      type="button"
                      onClick={() => handleQuickDemo('client')}
                      className="font-semibold text-[#14243A] hover:text-[#D9874D] cursor-pointer"
                    >
                      Open full workspace →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Features Section */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="max-w-2xl space-y-3">
          <p className="text-xs font-semibold text-[#D9874D]">Core Platform Capabilities</p>
          <h2 className="text-3xl font-semibold tracking-tight text-[#14243A]">
            Structured legal intelligence designed for real-world clarity.
          </h2>
          <p className="text-sm text-[#697586] leading-relaxed">
            Six integrated workspaces that organise case records, highlight factual tensions, and
            help you hold sharper conversations with legal counsel.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.index}
                className="rounded-lg border border-[#E5E9EF] bg-white p-6 flex flex-col justify-between gap-4 hover:border-[#cfd7e3] transition-colors"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-medium text-[#697586] tabular-nums">
                      {feat.index}
                    </span>
                    <Icon className="h-5 w-5 text-[#14243A]" />
                  </div>
                  <h3 className="text-base font-semibold text-[#14243A]">{feat.title}</h3>
                  <p className="text-sm text-[#697586] leading-relaxed">{feat.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="border-y border-[#E5E9EF] bg-white">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-2xl space-y-3">
            <p className="text-xs font-semibold text-[#D9874D]">Workflow</p>
            <h2 className="text-3xl font-semibold tracking-tight text-[#14243A]">
              How JUSTICE AI organises your matter from upload to consultation.
            </h2>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {HOW_IT_WORKS_STEPS.map((item) => (
              <div key={item.step} className="space-y-3 border-t-2 border-[#14243A] pt-4">
                <p className="text-xs font-mono font-semibold text-[#D9874D] tabular-nums">
                  Step {item.step}
                </p>
                <h3 className="text-sm font-semibold text-[#14243A]">{item.title}</h3>
                <p className="text-xs text-[#697586] leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why JUSTICE AI & Trust Section */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5 space-y-4">
            <p className="text-xs font-semibold text-[#D9874D]">Why JUSTICE AI</p>
            <h2 className="text-3xl font-semibold tracking-tight text-[#14243A]">
              Legal documents should not be unreadable to the people affected by them.
            </h2>
            <p className="text-sm text-[#697586] leading-relaxed">
              Ordinary litigants and small businesses across India frequently navigate 40-page
              agreements, statutory notices, and opposing written statements filled with dense
              procedural terminology. Missing a single conflicting date or notice clause can cost
              months of delay.
            </p>
            <p className="text-sm text-[#697586] leading-relaxed">
              JUSTICE AI acts as an organised legal information workspace—helping you structure
              facts, compare versions, and prepare meaningful questions for a qualified advocate.
            </p>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 gap-5 sm:grid-cols-2">
            {TRUST_PILLARS.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.title}
                  className="rounded-lg border border-[#E5E9EF] bg-white p-5 space-y-2.5"
                >
                  <Icon className="h-5 w-5 text-[#D9874D]" />
                  <h3 className="text-sm font-semibold text-[#14243A]">{pillar.title}</h3>
                  <p className="text-xs text-[#697586] leading-relaxed">{pillar.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-12">
          <DisclaimerBanner demoNotice="Frontend Demonstration Phase: All sample cases, documents, analyses, legal notes, and advocate profiles are fictional placeholders." />
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-[#14243A] text-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2 max-w-2xl">
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
              Take the first step towards understanding your case.
            </h2>
            <p className="text-sm text-slate-300">
              Explore the interactive client, advocate, and administrator workspaces in Demo Mode.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Button variant="accent" size="lg" onClick={() => handleQuickDemo('client')}>
              Start Analysing
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="bg-transparent text-white border-white/25 hover:bg-white/10 hover:text-white"
            >
              <Link to="/find-advocates">Browse Advocates</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};
