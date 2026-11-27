export type UserRole = 'client' | 'advocate' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  city: string;
  state: string;
  preferredLanguage: string;
  status: 'Active' | 'Inactive' | 'Suspended';
  createdAt: string;
  isDemoAccount: boolean;
}

export type CaseStatus = 'Active' | 'In Review' | 'Pending Hearing' | 'Archived' | 'Closed';

export interface CaseNote {
  id: string;
  title: string;
  content: string;
  updatedAt: string;
}

export interface LegalCase {
  id: string;
  title: string;
  category: string;
  caseNumber: string;
  courtName: string;
  courtLocation: string;
  userRole: 'Petitioner / Plaintiff' | 'Respondent / Defendant' | 'Other Party';
  opposingParty: string;
  description: string;
  filingDate: string;
  currentStage: string;
  status: CaseStatus;
  additionalNotes: string;
  lastUpdated: string;
  documentCount: number;
  notes: CaseNote[];
  isDemoRecord: boolean;
}

export type DocumentProcessingStatus =
  | 'Uploaded'
  | 'Processing'
  | 'Ready for Analysis'
  | 'Completed'
  | 'Failed';

export interface CaseDocument {
  id: string;
  caseId: string;
  caseTitle: string;
  fileName: string;
  fileType: 'PDF' | 'DOCX' | 'JPG' | 'JPEG' | 'PNG';
  fileSizeBytes: number;
  category: string;
  uploadDate: string;
  status: DocumentProcessingStatus;
  pageCount: number;
  extractedPreview: string;
  isSimulated: boolean;
}

export interface ContradictionItem {
  id: string;
  caseId: string;
  title: string;
  documentAName: string;
  documentAPassage: string;
  documentAPage: string;
  documentBName: string;
  documentBPassage: string;
  documentBPage: string;
  explanation: string;
  significance: 'High' | 'Medium' | 'Low';
  reviewStatus: 'Pending Review' | 'Flagged for Advocate' | 'Clarified';
}

export interface ImportantPointsData {
  statements: string[];
  allegations: string[];
  supportingArguments: string[];
  opposingArguments: string[];
  evidenceReferences: { label: string; document: string; page: string }[];
  missingInformation: string[];
}

export interface PerspectiveDetail {
  role: 'Petitioner' | 'Respondent' | 'Other Party';
  supportingPoints: string[];
  weakeningPoints: string[];
  unclearInformation: string[];
  advocateQuestions: string[];
}

export interface CaseAnalysisReport {
  id: string;
  caseId: string;
  caseTitle: string;
  reportTitle: string;
  generatedDate: string;
  status: 'Completed' | 'Draft';
  documentIds: string[];
  summary: {
    overview: string;
    parties: { role: string; name: string }[];
    mainDispute: string;
    claims: string[];
    importantFacts: string[];
    importantDates: { date: string; label: string; source: string }[];
  };
  importantPoints: ImportantPointsData;
  contradictions: ContradictionItem[];
  perspectives: Record<'Petitioner' | 'Respondent' | 'Other Party', PerspectiveDetail>;
  legalReferences: {
    id: string;
    title: string;
    section: string;
    relevance: string;
    sourceNote: string;
  }[];
  isDemonstrationData: boolean;
}

export type TimelineSourceType = 'User-entered' | 'AI-extracted' | 'Court-confirmed';

export interface TimelineEvent {
  id: string;
  caseId: string;
  date: string;
  title: string;
  description: string;
  sourceDocument: string;
  eventCategory:
    | 'Filing'
    | 'Notice'
    | 'Reply'
    | 'Hearing'
    | 'Interim Order'
    | 'Final Order'
    | 'Judgment'
    | 'Appeal'
    | 'Other';
  verificationStatus: TimelineSourceType;
}

export interface LegalKnowledgeItem {
  id: string;
  title: string;
  type: 'Act & Legislation' | 'Legal Section' | 'Court Judgment' | 'Legal Definition';
  category: string;
  jurisdiction: string;
  description: string;
  detailedNotes: string;
  source: string;
  date: string;
  lastUpdated: string;
  isPopular?: boolean;
  isDemoRecord: boolean;
}

export type VerificationStatus = 'Not Submitted' | 'Pending Review' | 'Approved' | 'Rejected';

export interface AdvocateProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  specializations: string[];
  experienceYears: number;
  city: string;
  state: string;
  locality: string;
  officeAddress: string;
  indicativeFee: number;
  languages: string[];
  verificationStatus: VerificationStatus;
  biography: string;
  education: string[];
  qualifications: string[];
  enrolmentNumber: string;
  barCouncil: string;
  courtsPracticed: string[];
  availability: {
    days: string[];
    hours: string;
    consultationModes: string[];
  };
  profileViews: number;
  profileCompletion: number;
  isDemoProfile: boolean;
}

export type EnquiryStatus = 'New' | 'Reviewed' | 'Responded' | 'Closed';

export interface AdvocateEnquiry {
  id: string;
  advocateId: string;
  advocateName: string;
  clientId: string;
  clientName: string;
  clientEmail: string;
  caseId?: string;
  caseTitle: string;
  subject: string;
  message: string;
  preferredMode: 'In-person' | 'Video Call' | 'Phone Call';
  status: EnquiryStatus;
  createdAt: string;
  responseNote?: string;
}

export type NotificationCategory =
  | 'Document Uploaded'
  | 'Analysis Completed'
  | 'Processing Failed'
  | 'Case Updated'
  | 'New Enquiry'
  | 'Profile Updated'
  | 'Verification Updated';

export interface AppNotification {
  id: string;
  role: UserRole;
  category: NotificationCategory;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  link?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  content: string;
  timestamp: string;
  feedback?: 'helpful' | 'not_helpful';
  isIllustrative?: boolean;
}

export interface ChatConversation {
  id: string;
  title: string;
  caseId: string;
  documentId: string;
  updatedAt: string;
  messages: ChatMessage[];
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  actor: string;
  actorRole: UserRole;
  action: string;
  resource: string;
  outcome: 'Success' | 'Flagged' | 'Failed';
  ipMasked: string;
}

export interface VerificationRequestRecord {
  id: string;
  advocateId: string;
  advocateName: string;
  barCouncil: string;
  enrolmentNumber: string;
  city: string;
  submittedAt: string;
  documentsAttached: string[];
  status: VerificationStatus;
  reviewerNotes?: string;
}
