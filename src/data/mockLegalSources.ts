import { LegalKnowledgeItem } from '../types';

export const mockLegalSources: LegalKnowledgeItem[] = [
  {
    id: 'law-001',
    title: 'Consumer Protection Act, 2019 — Overview of Consumer Rights & Forums',
    type: 'Act & Legislation',
    category: 'Consumer Law',
    jurisdiction: 'India (Central Legislation)',
    description:
      'Provides a three-tier quasi-judicial mechanism (District, State, and National Commissions) for resolving disputes involving defective goods, deficiency in service, and unfair trade practices.',
    detailedNotes:
      'Demonstration Summary: Under the 2019 Act, complaints can generally be filed where the complainant resides or works, including via e-filing mechanisms where enabled. Pecuniary jurisdiction thresholds are determined by the value of goods or services paid as consideration. Always verify current monetary limits and procedural rules with official Gazette notifications or a qualified advocate.',
    source: 'Illustrative Summary — Central Legislation Reference (Demo)',
    date: '2019-08-09',
    lastUpdated: '2026-10-15',
    isPopular: true,
    isDemoRecord: true,
  },
  {
    id: 'law-002',
    title: 'Real Estate (Regulation and Development) Act, 2016 — Section 18',
    type: 'Legal Section',
    category: 'Property Law',
    jurisdiction: 'India (Central Act with State Rules)',
    description:
      'Outlines statutory rights of homebuyers when a promoter fails to complete or deliver possession of an apartment, plot, or building according to the agreement for sale.',
    detailedNotes:
      'Demonstration Summary: Section 18 generally discusses two routes—withdrawal from the project with refund and interest, or continuing in the project while claiming interest for every month of delay until possession is handed over. State RERA rules govern interest calculation formulas and procedural filings.',
    source: 'Illustrative Summary — Property Statutes Library (Demo)',
    date: '2016-03-25',
    lastUpdated: '2026-11-01',
    isPopular: true,
    isDemoRecord: true,
  },
  {
    id: 'law-003',
    title: 'Indian Contract Act, 1872 — Section 73 (Compensation for Breach)',
    type: 'Legal Section',
    category: 'Civil Law',
    jurisdiction: 'India (Central Legislation)',
    description:
      'Establishes the foundational rule that a party suffering loss from breach of contract may claim compensation for loss naturally arising in the usual course of things.',
    detailedNotes:
      'Demonstration Summary: Section 73 distinguishes between direct, foreseeable losses and remote or indirect damages, which are generally not recoverable. Parties claiming damages are also expected to take reasonable steps to mitigate their loss.',
    source: 'Illustrative Summary — Contract Law Compendium (Demo)',
    date: '1872-04-25',
    lastUpdated: '2026-09-20',
    isPopular: true,
    isDemoRecord: true,
  },
  {
    id: 'law-004',
    title: 'Bharatiya Sakshya Adhiniyam, 2023 — Electronic & Digital Records',
    type: 'Act & Legislation',
    category: 'Criminal Law',
    jurisdiction: 'India (Central Legislation)',
    description:
      'Modernised evidentiary framework governing admissibility and certification requirements for electronic records, emails, messages, and digital logs in Indian courts.',
    detailedNotes:
      'Demonstration Summary: Electronic evidence such as emails, server logs, and digital screenshots typically requires proper procedural certification describing how the record was produced and preserved. Consult a practising advocate before tendering electronic records in proceedings.',
    source: 'Illustrative Summary — Evidence & Procedure Guide (Demo)',
    date: '2024-07-01',
    lastUpdated: '2026-11-10',
    isPopular: true,
    isDemoRecord: true,
  },
  {
    id: 'law-005',
    title: 'Constitution of India — Article 226 (Writ Jurisdiction of High Courts)',
    type: 'Legal Section',
    category: 'Constitutional Law',
    jurisdiction: 'India (High Courts)',
    description:
      'Empowers High Courts to issue writs including habeas corpus, mandamus, prohibition, quo warranto, and certiorari for enforcing Fundamental Rights and other legal rights.',
    detailedNotes:
      'Demonstration Summary: Article 226 is a discretionary constitutional remedy. High Courts typically examine whether an effective alternative statutory remedy exists before entertaining writ petitions, subject to recognised exceptions such as violation of natural justice.',
    source: 'Illustrative Summary — Constitutional Reference (Demo)',
    date: '1950-01-26',
    lastUpdated: '2026-08-30',
    isPopular: true,
    isDemoRecord: true,
  },
  {
    id: 'law-006',
    title: 'Commercial Courts Act, 2015 — Section 12A (Pre-Institution Mediation)',
    type: 'Legal Section',
    category: 'Corporate Law',
    jurisdiction: 'India (Commercial Divisions)',
    description:
      'Requires parties in commercial disputes not contemplating urgent interim relief to exhaust pre-institution mediation before instituting a commercial suit.',
    detailedNotes:
      'Demonstration Summary: Intended to reduce commercial litigation backlogs by encouraging structured settlement through designated Legal Services Authorities prior to formal court trials.',
    source: 'Illustrative Summary — Commercial Law Digest (Demo)',
    date: '2018-05-03',
    lastUpdated: '2026-10-05',
    isDemoRecord: true,
  },
  {
    id: 'law-007',
    title: 'Force Majeure — Legal Definition & Contractual Interpretation',
    type: 'Legal Definition',
    category: 'Civil Law',
    jurisdiction: 'India (Contractual Doctrine)',
    description:
      'A contractual provision allocating risk when extraordinary events beyond a party’s reasonable control prevent performance of agreed obligations.',
    detailedNotes:
      'Demonstration Summary: In Indian jurisprudence, force majeure is governed primarily by the specific wording of the contract clause (Section 32 of the Contract Act) rather than an automatic excuse for commercial hardship or routine administrative delays.',
    source: 'Illustrative Legal Glossary (Demo)',
    date: '2025-01-15',
    lastUpdated: '2026-10-22',
    isDemoRecord: true,
  },
  {
    id: 'law-008',
    title: 'Information Technology Act, 2000 — Section 43 & 43A Overview',
    type: 'Act & Legislation',
    category: 'Cyber Law',
    jurisdiction: 'India (Central Legislation)',
    description:
      'Covers civil liability and compensation frameworks for unauthorised access to computer systems, data theft, and negligent security practices.',
    detailedNotes:
      'Demonstration Summary: Alongside evolving data protection legislation, the IT Act framework provides adjudicating mechanisms for cyber contraventions and unauthorised electronic access.',
    source: 'Illustrative Summary — Technology Law Reference (Demo)',
    date: '2000-06-09',
    lastUpdated: '2026-09-12',
    isDemoRecord: true,
  },
  {
    id: 'law-009',
    title: 'Sample Illustrative Principle: Homebuyer Delay Compensation Benchmarks',
    type: 'Court Judgment',
    category: 'Property Law',
    jurisdiction: 'India (Illustrative Judicial Trend — Demo)',
    description:
      'Demonstration note summarising judicial principles on balancing buyer delay interest with contractual possession clauses without citing fabricated case numbers.',
    detailedNotes:
      'Demonstration Summary: Indian appellate forums have repeatedly emphasised that one-sided clauses giving developers nominal penalty liability while charging high default interest from buyers may amount to an unfair trade practice. Verify specific precedents through official court reporters.',
    source: 'Illustrative Judicial Note — Non-Verified Demo Record',
    date: '2025-06-10',
    lastUpdated: '2026-11-02',
    isDemoRecord: true,
  },
  {
    id: 'law-010',
    title: 'Hindu Marriage Act & Special Marriage Act — Maintenance Principles',
    type: 'Act & Legislation',
    category: 'Family Law',
    jurisdiction: 'India (Central Legislation)',
    description:
      'Overview of interim and permanent maintenance considerations assessed by Family Courts based on income, standard of living, and financial obligations.',
    detailedNotes:
      'Demonstration Summary: Courts typically require affidavits of disclosure of assets and liabilities from both parties to determine fair interim or permanent maintenance.',
    source: 'Illustrative Summary — Family Law Guide (Demo)',
    date: '1955-05-18',
    lastUpdated: '2026-09-29',
    isDemoRecord: true,
  },
  {
    id: 'law-011',
    title: 'Industrial Relations & Payment of Gratuity — Employee Settlement Basics',
    type: 'Act & Legislation',
    category: 'Labour Law',
    jurisdiction: 'India (Central & State Labour Laws)',
    description:
      'Summarises statutory frameworks governing termination notice, earned wages, gratuity eligibility, and conciliation before Labour Commissioners.',
    detailedNotes:
      'Demonstration Summary: Applicability depends on employee classification, establishment headcount, and applicable State Shops & Establishments legislation.',
    source: 'Illustrative Summary — Employment Law Compendium (Demo)',
    date: '2020-09-28',
    lastUpdated: '2026-08-19',
    isDemoRecord: true,
  },
  {
    id: 'law-012',
    title: 'GST & Income Tax — Understanding Notice Replies & Limitation Periods',
    type: 'Legal Definition',
    category: 'Taxation',
    jurisdiction: 'India (Taxation Tribunals)',
    description:
      'Explains procedural timelines for responding to show-cause notices and filing first-stage statutory appeals in indirect and direct tax matters.',
    detailedNotes:
      'Demonstration Summary: Missing statutory appeal timelines can limit available remedies; maintaining documented acknowledgement receipts and portal filings is essential.',
    source: 'Illustrative Tax Procedure Guide (Demo)',
    date: '2025-04-01',
    lastUpdated: '2026-10-18',
    isDemoRecord: true,
  },
];
