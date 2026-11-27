import { CaseAnalysisReport } from '../types';

export const mockAnalysisReports: CaseAnalysisReport[] = [
  {
    id: 'anl-001',
    caseId: 'case-001',
    caseTitle: 'Horizon Residency Flat Possession Delay',
    reportTitle: 'Comprehensive Possession Delay & Contradiction Analysis (Demo)',
    generatedDate: '2026-11-22T15:30:00Z',
    status: 'Completed',
    documentIds: ['doc-001', 'doc-002', 'doc-003', 'doc-004'],
    summary: {
      overview:
        'This demonstration report synthesises four sample documents relating to the delayed handover of Residential Unit B-1204 at Horizon Residency. The core dispute centres on whether the developer can rely on a force-majeure and grace-period defence despite prior written correspondence assuring timely handover in December 2024.',
      parties: [
        { role: 'Complainant / Allottee', name: 'Varun Maheshwaram (Demo User)' },
        { role: 'Opposite Party / Developer', name: 'Horizon Infratech Developers Pvt. Ltd. (Fictional)' },
      ],
      mainDispute:
        'Unexplained delay exceeding 18 months beyond the contractual possession date (31 December 2024), contested applicability of the 6-month grace period, and entitlement to delay compensation.',
      claims: [
        'Immediate delivery of vacant possession with Occupancy Certificate.',
        'Simple interest compensation on Rs. 81,00,000 paid to date from 1 January 2025 until actual handover.',
        'Reimbursement of documented rental expenses and litigation costs (subject to advocate review).',
      ],
      importantFacts: [
        '90% of total sale consideration (Rs. 81,00,000 of Rs. 90,00,000) was paid across 8 demand milestones.',
        'Clause 9.2 explicitly requires written intimation 45 days in advance to invoke the 6-month grace period.',
        'Developer CRM email dated 18 November 2024 stated utility approvals were complete and handover would start in December 2024.',
        'Written statement filed in February 2026 retroactively claims work was halted since June 2024 due to municipal water approvals.',
      ],
      importantDates: [
        { date: '12 Mar 2023', label: 'Builder-Buyer Agreement signed', source: 'Builder_Buyer_Agreement_Sample.pdf (p. 1)' },
        { date: '18 Nov 2024', label: 'CRM email confirming utility approvals complete', source: 'Developer_Correspondence_Bundle.pdf (p. 4)' },
        { date: '31 Dec 2024', label: 'Contractual possession deadline', source: 'Builder_Buyer_Agreement_Sample.pdf (p. 12)' },
        { date: '22 Jan 2026', label: 'Formal legal notice issued by complainant', source: 'Legal_Notice_Jan2026_Demo.pdf (p. 1)' },
        { date: '14 Feb 2026', label: 'Written reply invoking force majeure', source: 'Builder_Written_Reply_Demo.pdf (p. 3)' },
      ],
    },
    importantPoints: {
      statements: [
        'Allottee paid all 8 construction-linked instalments on or before due dates without default.',
        'Developer acknowledged 95% completion of Tower B in November 2024 written communication.',
        'Opposite party claims verbal site-visit briefings constituted sufficient delay intimation.',
      ],
      allegations: [
        'Alleged deficiency in service and unfair delay in handing over residential unit.',
        'Opposite party alleges municipal utility clearance delays outside developer control.',
        'Opposite party alleges complainant declined an informal inspection offer in August 2025.',
      ],
      supportingArguments: [
        'Clause 9.2 requires written notice 45 days prior to invoking the grace period; verbal statements do not satisfy express contract terms.',
        'Contemporaneous email of 18 November 2024 directly contradicts the claim that utility approvals halted work from June 2024.',
        'Consistent payment compliance establishes absence of contributory delay by the buyer.',
      ],
      opposingArguments: [
        'Developer relies on broad Force Majeure wording in Clause 14 covering statutory/municipal authority delays.',
        'Developer contends partial completion certificates were applied for within the extended grace period.',
        'Developer argues claimed rental reimbursement overlaps with statutory interest claim.',
      ],
      evidenceReferences: [
        { label: 'Possession & Grace Period Clause (9.1–9.2)', document: 'Builder_Buyer_Agreement_Sample.pdf', page: 'Page 12' },
        { label: 'CRM Readiness Confirmation Email', document: 'Developer_Correspondence_Bundle.pdf', page: 'Page 4' },
        { label: 'Force Majeure Defence Paragraph', document: 'Builder_Written_Reply_Demo.pdf', page: 'Page 5, Para 6' },
        { label: 'Payment Ledger & Notice Demand', document: 'Legal_Notice_Jan2026_Demo.pdf', page: 'Page 3' },
      ],
      missingInformation: [
        'Official copy of the Occupancy Certificate (OC) application date from municipal records.',
        'Bank-certified consolidated payment receipts for instalments 4 and 6.',
        'Complete email header metadata (SPF/DKIM or full thread) for the 18 November 2024 email for evidentiary admissibility.',
        'Signed rent agreement receipts if claiming parallel rental reimbursement.',
      ],
    },
    contradictions: [
      {
        id: 'ctr-001',
        caseId: 'case-001',
        title: 'Conflicting Timeline on Municipal Utility Approvals',
        documentAName: 'Developer_Correspondence_Bundle.pdf',
        documentAPage: 'Page 4 · Email dated 18 Nov 2024',
        documentAPassage:
          '"We are pleased to confirm Tower B finishing is 95% complete with all utility approvals in place. Handover scheduling will open in the final week of December 2024."',
        documentBName: 'Builder_Written_Reply_Demo.pdf',
        documentBPage: 'Page 5 · Para 6 (dated 14 Feb 2026)',
        documentBPassage:
          '"Structural and utility work remained halted from June 2024 onwards solely due to pending municipal water-line approvals, triggering Force Majeure under Clause 14."',
        explanation:
          'Document A states in November 2024 that all utility approvals were already in place and handover would begin in December 2024, whereas Document B later claims work had been halted since June 2024 due to missing municipal water approvals.',
        significance: 'High',
        reviewStatus: 'Flagged for Advocate',
      },
      {
        id: 'ctr-002',
        caseId: 'case-001',
        title: 'Mode of Notice Required for Grace Period Invocation',
        documentAName: 'Builder_Buyer_Agreement_Sample.pdf',
        documentAPage: 'Page 12 · Clause 9.2',
        documentAPassage:
          '"Any grace period of up to six (6) months shall require written intimation to the Allottee at least 45 days prior to the scheduled handover date."',
        documentBName: 'Builder_Written_Reply_Demo.pdf',
        documentBPage: 'Page 7 · Para 9',
        documentBPassage:
          '"The Allottee was adequately briefed verbally during informal site visits in October 2024 regarding revised timelines, thereby fulfilling grace-period intimation."',
        explanation:
          'The contract strictly mandates written notice 45 days prior, whereas the developer relies on undocumented verbal site-visit conversations to claim entitlement to the 6-month grace period.',
        significance: 'High',
        reviewStatus: 'Pending Review',
      },
      {
        id: 'ctr-003',
        caseId: 'case-001',
        title: 'Discrepancy in Stated Total Amount Received',
        documentAName: 'Legal_Notice_Jan2026_Demo.pdf',
        documentAPage: 'Page 3 · Payment Table',
        documentAPassage:
          '"Total consideration remitted by Allottee up to October 2024 equals Rs. 81,00,000 (90% of unit value)."',
        documentBName: 'Builder_Written_Reply_Demo.pdf',
        documentBPage: 'Page 8 · Annexure R-2 Summary',
        documentBPassage:
          '"Allottee ledger reflects cleared receipts of Rs. 76,50,000 excluding GST and pending club-house charges."',
        explanation:
          'A Rs. 4,50,000 accounting gap exists between the notice schedule and the builder ledger—likely attributable to GST treatment or an uncredited NEFT tranche that should be reconciled via bank statements.',
        significance: 'Medium',
        reviewStatus: 'Pending Review',
      },
    ],
    perspectives: {
      Petitioner: {
        role: 'Petitioner',
        supportingPoints: [
          'Clear written contractual deadline of 31 December 2024 with explicit written-notice precondition for any grace period.',
          'Strong documentary contradiction between the 18 November 2024 CRM email and the later Force Majeure plea.',
          'Substantial payment performance (90%) demonstrates good faith and compliance with buyer obligations.',
        ],
        weakeningPoints: [
          'Rs. 4,50,000 ledger reconciliation difference (GST vs base price) must be clarified to avoid credibility challenges.',
          'Claiming both interest compensation and full parallel rent reimbursement is often trimmed by forums unless strongly substantiated.',
          'Electronic correspondence needs a Section 63 BSA / electronic evidence certificate before final arguments.',
        ],
        unclearInformation: [
          'Whether the developer actually obtained a RERA project extension prior to December 2024.',
          'Exact date on which the Occupancy Certificate application was filed with local authorities.',
        ],
        advocateQuestions: [
          'Should we request discovery of the developer’s municipal utility sanction dates to expose the June 2024 halt claim?',
          'What documentation is required to make the November 2024 CRM email formally admissible as electronic evidence?',
          'How should we structure the interest rate vs rental reimbursement prayer to align with recent commission practice?',
        ],
      },
      Respondent: {
        role: 'Respondent',
        supportingPoints: [
          'Clause 14 contains a broad Force Majeure wording covering delays attributable to government or municipal authorities.',
          'Discrepancy in paid amount figures allows challenging the interest computation base.',
          'Project RERA registration validity period may extend beyond the bilateral agreement handover date.',
        ],
        weakeningPoints: [
          'Internal CRM email from November 2024 severely undermines the assertion of a continuous halt since June 2024.',
          'Absence of written 45-day advance grace-period notice weakens reliance on Clause 9.2.',
        ],
        unclearInformation: [
          'Whether CRM email sender had formal authority to bind the developer on statutory approval status.',
          'Proof of any formal inspection invitation allegedly declined in August 2025.',
        ],
        advocateQuestions: [
          'Can official municipal file-noting records substantiate actual external approval delays?',
          'Would a structured settlement offering possession with partial fee waiver reduce litigation exposure?',
        ],
      },
      'Other Party': {
        role: 'Other Party',
        supportingPoints: [
          'Neutral review indicates both parties executed a standard construction-linked allotment contract with measurable milestones.',
          'Core factual divergence can be resolved objectively via municipal approval logs and audited payment ledgers.',
        ],
        weakeningPoints: [
          'Informal verbal communications create evidentiary ambiguity for both sides.',
          'Missing bank reconciliation schedules delay quantification of undisputed dues.',
        ],
        unclearInformation: [
          'Current physical completion percentage verified by an independent architect or local authority.',
        ],
        advocateQuestions: [
          'Is court-annexed mediation viable once the Occupancy Certificate timeline is confirmed?',
        ],
      },
    },
    legalReferences: [
      {
        id: 'leg-001',
        title: 'Consumer Protection Act, 2019 (Illustrative Reference)',
        section: 'Sections 2(11) & 35 — Deficiency in Service & Complaint Filing',
        relevance: 'Generally relevant to homebuyer disputes involving delayed delivery of housing services.',
        sourceNote: 'Demonstration educational summary — verify statutory text with an advocate.',
      },
      {
        id: 'leg-002',
        title: 'Real Estate (Regulation and Development) Act, 2016 (RERA)',
        section: 'Section 18 — Return of Amount and Compensation',
        relevance: 'Addresses buyer remedies when a promoter fails to complete or give possession as per agreement terms.',
        sourceNote: 'Demonstration educational summary — verify applicability and forum election.',
      },
      {
        id: 'leg-003',
        title: 'Indian Contract Act, 1872',
        section: 'Sections 55 & 73 — Time as Essence & Compensation for Breach',
        relevance: 'Discusses legal principles on delayed performance and damages for contractual breach.',
        sourceNote: 'Demonstration educational summary — non-authoritative reference.',
      },
    ],
    isDemonstrationData: true,
  },
  {
    id: 'anl-002',
    caseId: 'case-002',
    caseTitle: 'Kaveri Logistics Vendor Service Agreement Dispute',
    reportTitle: 'Commercial MSA & UAT Sign-Off Clause Review (Demo)',
    generatedDate: '2026-11-19T11:10:00Z',
    status: 'Completed',
    documentIds: ['doc-005', 'doc-006'],
    summary: {
      overview:
        'Demonstration review of the Master Services Agreement and Vendor Demand Notice. Highlights tension between Clause 7.4 (requiring written UAT sign-off) and the vendor’s claim of deemed acceptance upon staging deployment.',
      parties: [
        { role: 'Claimant / Vendor', name: 'Kaveri Supply Chain Solutions LLP (Fictional)' },
        { role: 'Respondent / Client', name: 'Varun Maheshwaram — Demo Enterprise' },
      ],
      mainDispute: 'Whether Rs. 8,40,000 Milestone 3 invoice is payable absent signed UAT acceptance.',
      claims: [
        'Vendor claims Rs. 8,40,000 principal plus 18% p.a. late payment interest.',
        'Respondent asserts SLA service credits and incomplete Phase 3 defect closure.',
      ],
      importantFacts: [
        'Clause 7.4 requires explicit written UAT sign-off before invoice maturity.',
        '14 open critical defects were logged prior to the vendor’s demand notice.',
      ],
      importantDates: [
        { date: '20 Jun 2026', label: 'Staging deployment pushed by vendor', source: 'Vendor_Demand_Notice_Demo.pdf (p. 2)' },
        { date: '08 Jul 2026', label: 'Vendor demand notice issued', source: 'Vendor_Demand_Notice_Demo.pdf (p. 1)' },
      ],
    },
    importantPoints: {
      statements: [
        'MSA Clause 7.4 sets written UAT sign-off as a condition precedent to Milestone 3 billing.',
      ],
      allegations: [
        'Vendor alleges unreasonable withholding of UAT approval after staging handover.',
      ],
      supportingArguments: [
        'Documented UAT defect tracker demonstrates objective non-conformity with functional specifications.',
      ],
      opposingArguments: [
        'Vendor argues staging use in internal testing equates to deemed acceptance after 10 business days.',
      ],
      evidenceReferences: [
        { label: 'Milestone Payment Clause 7.4', document: 'Master_Services_Agreement_Demo.pdf', page: 'Page 9' },
      ],
      missingInformation: [
        'Full timestamped Jira/issue-tracker export signed off by QA lead.',
      ],
    },
    contradictions: [
      {
        id: 'ctr-004',
        caseId: 'case-002',
        title: 'Deemed Acceptance vs Express Written UAT Requirement',
        documentAName: 'Master_Services_Agreement_Demo.pdf',
        documentAPage: 'Page 9 · Clause 7.4',
        documentAPassage:
          '"Milestone payments become payable 15 business days after written User Acceptance Testing (UAT) sign-off by Client Engineering Lead."',
        documentBName: 'Vendor_Demand_Notice_Demo.pdf',
        documentBPage: 'Page 2 · Para 4',
        documentBPassage:
          '"Deployment to staging environment on 20 June 2026 constituted deemed acceptance under commercial custom, making the invoice immediately due."',
        explanation:
          'The MSA contains no deemed-acceptance clause and explicitly requires written sign-off by the Client Engineering Lead.',
        significance: 'High',
        reviewStatus: 'Pending Review',
      },
    ],
    perspectives: {
      Petitioner: {
        role: 'Petitioner',
        supportingPoints: ['Software code was deployed to client staging environment on schedule.'],
        weakeningPoints: ['No written UAT acceptance exists per Clause 7.4.'],
        unclearInformation: ['Whether client used staging outputs in live operations.'],
        advocateQuestions: ['Can substantial performance principles apply despite missing formal sign-off?'],
      },
      Respondent: {
        role: 'Respondent',
        supportingPoints: [
          'Express contractual condition precedent (written UAT sign-off) has not been fulfilled.',
          'Timestamped defect logs justify withholding acceptance.',
        ],
        weakeningPoints: ['Ensure defect notifications were sent within the contractual review window.'],
        unclearInformation: ['Exact SLA credit calculation formula for intermittent downtime.'],
        advocateQuestions: ['Should we propose pre-institution mediation with a defect-remediation schedule?'],
      },
      'Other Party': {
        role: 'Other Party',
        supportingPoints: ['Structured cure-period negotiation could resolve technical defects faster than litigation.'],
        weakeningPoints: ['Lack of joint sign-off minutes creates factual disagreement.'],
        unclearInformation: ['Scope creep vs core specification boundaries.'],
        advocateQuestions: ['Would an independent technical audit help settle the UAT dispute?'],
      },
    },
    legalReferences: [
      {
        id: 'leg-004',
        title: 'Commercial Courts Act, 2015 (Illustrative Reference)',
        section: 'Section 12A — Pre-Institution Mediation and Settlement',
        relevance: 'Relevant to mandatory mediation considerations in commercial disputes without urgent interim relief.',
        sourceNote: 'Demonstration educational summary — verify with qualified legal counsel.',
      },
    ],
    isDemonstrationData: true,
  },
];
