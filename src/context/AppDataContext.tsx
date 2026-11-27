import React, { createContext, useContext, useState, useCallback } from 'react';
import {
  AdvocateEnquiry,
  AdvocateProfile,
  AppNotification,
  AuditLogEntry,
  CaseAnalysisReport,
  CaseDocument,
  CaseNote,
  ContradictionItem,
  EnquiryStatus,
  LegalCase,
  LegalKnowledgeItem,
  TimelineEvent,
  User,
  UserRole,
  VerificationRequestRecord,
  VerificationStatus,
} from '../types';
import { mockCases, mockTimelineEvents } from '../data/mockCases';
import { mockDocuments } from '../data/mockDocuments';
import { mockAnalysisReports } from '../data/mockAnalysis';
import { mockLegalSources } from '../data/mockLegalSources';
import { mockAdvocates, mockEnquiries } from '../data/mockAdvocates';
import { mockNotifications } from '../data/mockNotifications';
import { mockUsers } from '../data/mockUsers';
import { mockAuditLogs, mockVerificationRequests } from '../data/mockAdminData';

interface AppDataContextValue {
  cases: LegalCase[];
  documents: CaseDocument[];
  analysisReports: CaseAnalysisReport[];
  timelineEvents: TimelineEvent[];
  legalSources: LegalKnowledgeItem[];
  advocates: AdvocateProfile[];
  savedAdvocateIds: string[];
  enquiries: AdvocateEnquiry[];
  notifications: AppNotification[];
  users: User[];
  verificationRequests: VerificationRequestRecord[];
  auditLogs: AuditLogEntry[];
  recentlyViewedLegalIds: string[];

  // Case actions
  addCase: (
    data: Omit<LegalCase, 'id' | 'lastUpdated' | 'documentCount' | 'notes' | 'isDemoRecord'>
  ) => LegalCase;
  updateCase: (id: string, updates: Partial<LegalCase>) => void;
  deleteCase: (id: string) => void;
  archiveCase: (id: string) => void;
  addCaseNote: (caseId: string, title: string, content: string) => void;
  deleteCaseNote: (caseId: string, noteId: string) => void;

  // Document actions
  addDocument: (doc: Omit<CaseDocument, 'id' | 'uploadDate' | 'isSimulated'>) => CaseDocument;
  updateDocumentStatus: (docId: string, status: CaseDocument['status']) => void;
  deleteDocument: (docId: string) => void;

  // Analysis actions
  runDemoAnalysis: (caseId: string, documentIds: string[]) => CaseAnalysisReport;
  updateContradictionStatus: (
    reportId: string,
    contradictionId: string,
    status: ContradictionItem['reviewStatus']
  ) => void;

  // Timeline actions
  addTimelineEvent: (event: Omit<TimelineEvent, 'id'>) => void;
  updateTimelineEvent: (id: string, updates: Partial<TimelineEvent>) => void;
  deleteTimelineEvent: (id: string) => void;

  // Legal knowledge actions
  markLegalSourceViewed: (id: string) => void;
  addLegalSource: (source: Omit<LegalKnowledgeItem, 'id' | 'lastUpdated' | 'isDemoRecord'>) => void;
  deleteLegalSource: (id: string) => void;

  // Advocate & Enquiry actions
  toggleSaveAdvocate: (advocateId: string) => void;
  updateAdvocateProfile: (advocateId: string, updates: Partial<AdvocateProfile>) => void;
  submitEnquiry: (payload: Omit<AdvocateEnquiry, 'id' | 'createdAt' | 'status'>) => AdvocateEnquiry;
  updateEnquiryStatus: (enquiryId: string, status: EnquiryStatus, responseNote?: string) => void;

  // Notification actions
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: (role: UserRole) => void;
  pushNotification: (notification: Omit<AppNotification, 'id' | 'timestamp' | 'read'>) => void;

  // Admin actions
  updateUserStatus: (userId: string, status: User['status']) => void;
  updateVerificationRequest: (
    requestId: string,
    status: VerificationStatus,
    reviewerNotes?: string
  ) => void;
}

const AppDataContext = createContext<AppDataContextValue | undefined>(undefined);

export const AppDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cases, setCases] = useState<LegalCase[]>(mockCases);
  const [documents, setDocuments] = useState<CaseDocument[]>(mockDocuments);
  const [analysisReports, setAnalysisReports] = useState<CaseAnalysisReport[]>(mockAnalysisReports);
  const [timelineEvents, setTimelineEvents] = useState<TimelineEvent[]>(mockTimelineEvents);
  const [legalSources, setLegalSources] = useState<LegalKnowledgeItem[]>(mockLegalSources);
  const [advocates, setAdvocates] = useState<AdvocateProfile[]>(mockAdvocates);
  const [savedAdvocateIds, setSavedAdvocateIds] = useState<string[]>(['adv-001', 'adv-002']);
  const [enquiries, setEnquiries] = useState<AdvocateEnquiry[]>(mockEnquiries);
  const [notifications, setNotifications] = useState<AppNotification[]>(mockNotifications);
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [verificationRequests, setVerificationRequests] = useState<VerificationRequestRecord[]>(
    mockVerificationRequests
  );
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>(mockAuditLogs);
  const [recentlyViewedLegalIds, setRecentlyViewedLegalIds] = useState<string[]>([
    'law-001',
    'law-002',
    'law-004',
  ]);

  const appendAudit = useCallback(
    (actor: string, actorRole: UserRole, action: string, resource: string) => {
      const entry: AuditLogEntry = {
        id: `log-${Date.now()}`,
        timestamp: new Date().toISOString(),
        actor,
        actorRole,
        action,
        resource,
        outcome: 'Success',
        ipMasked: '103.24.xxx.42',
      };
      setAuditLogs((prev) => [entry, ...prev]);
    },
    []
  );

  const pushNotification = useCallback(
    (notification: Omit<AppNotification, 'id' | 'timestamp' | 'read'>) => {
      const item: AppNotification = {
        ...notification,
        id: `ntf-${Date.now()}`,
        timestamp: new Date().toISOString(),
        read: false,
      };
      setNotifications((prev) => [item, ...prev]);
    },
    []
  );

  const addCase = useCallback(
    (data: Omit<LegalCase, 'id' | 'lastUpdated' | 'documentCount' | 'notes' | 'isDemoRecord'>) => {
      const created: LegalCase = {
        ...data,
        id: `case-${Date.now()}`,
        lastUpdated: new Date().toISOString(),
        documentCount: 0,
        notes: [],
        isDemoRecord: true,
      };
      setCases((prev) => [created, ...prev]);
      pushNotification({
        role: 'client',
        category: 'Case Updated',
        title: 'New Case Workspace Created',
        message: `"${created.title}" has been added to your cases (demo mode).`,
        link: `/client/cases/${created.id}`,
      });
      appendAudit('Varun Maheshwaram', 'client', 'Created Case Workspace', created.title);
      return created;
    },
    [appendAudit, pushNotification]
  );

  const updateCase = useCallback((id: string, updates: Partial<LegalCase>) => {
    setCases((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, ...updates, lastUpdated: new Date().toISOString() } : c
      )
    );
  }, []);

  const deleteCase = useCallback((id: string) => {
    setCases((prev) => prev.filter((c) => c.id !== id));
    setDocuments((prev) => prev.filter((d) => d.caseId !== id));
    setTimelineEvents((prev) => prev.filter((t) => t.caseId !== id));
  }, []);

  const archiveCase = useCallback((id: string) => {
    setCases((prev) =>
      prev.map((c) =>
        c.id === id
          ? {
              ...c,
              status: c.status === 'Archived' ? 'Active' : 'Archived',
              lastUpdated: new Date().toISOString(),
            }
          : c
      )
    );
  }, []);

  const addCaseNote = useCallback((caseId: string, title: string, content: string) => {
    const newNote: CaseNote = {
      id: `note-${Date.now()}`,
      title,
      content,
      updatedAt: new Date().toISOString(),
    };
    setCases((prev) =>
      prev.map((c) =>
        c.id === caseId
          ? { ...c, notes: [newNote, ...c.notes], lastUpdated: new Date().toISOString() }
          : c
      )
    );
  }, []);

  const deleteCaseNote = useCallback((caseId: string, noteId: string) => {
    setCases((prev) =>
      prev.map((c) =>
        c.id === caseId ? { ...c, notes: c.notes.filter((n) => n.id !== noteId) } : c
      )
    );
  }, []);

  const addDocument = useCallback(
    (doc: Omit<CaseDocument, 'id' | 'uploadDate' | 'isSimulated'>) => {
      const created: CaseDocument = {
        ...doc,
        id: `doc-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        uploadDate: new Date().toISOString(),
        isSimulated: true,
      };
      setDocuments((prev) => [created, ...prev]);
      setCases((prev) =>
        prev.map((c) =>
          c.id === created.caseId
            ? { ...c, documentCount: c.documentCount + 1, lastUpdated: new Date().toISOString() }
            : c
        )
      );
      pushNotification({
        role: 'client',
        category: 'Document Uploaded',
        title: 'Document Uploaded (Simulated)',
        message: `${created.fileName} added to "${created.caseTitle}".`,
        link: '/client/documents',
      });
      return created;
    },
    [pushNotification]
  );

  const updateDocumentStatus = useCallback(
    (docId: string, status: CaseDocument['status']) => {
      setDocuments((prev) => prev.map((d) => (d.id === docId ? { ...d, status } : d)));
    },
    []
  );

  const deleteDocument = useCallback((docId: string) => {
    setDocuments((prev) => {
      const target = prev.find((d) => d.id === docId);
      if (target) {
        setCases((caseList) =>
          caseList.map((c) =>
            c.id === target.caseId
              ? { ...c, documentCount: Math.max(0, c.documentCount - 1) }
              : c
          )
        );
      }
      return prev.filter((d) => d.id !== docId);
    });
  }, []);

  const runDemoAnalysis = useCallback(
    (caseId: string, documentIds: string[]): CaseAnalysisReport => {
      const targetCase = cases.find((c) => c.id === caseId);
      const existing = analysisReports.find((r) => r.caseId === caseId);
      const now = new Date().toISOString();

      let result: CaseAnalysisReport;
      if (existing) {
        result = {
          ...existing,
          documentIds: documentIds.length > 0 ? documentIds : existing.documentIds,
          generatedDate: now,
        };
        setAnalysisReports((prev) => prev.map((r) => (r.id === existing.id ? result : r)));
      } else {
        const title = targetCase?.title || 'Selected Legal Matter';
        result = {
          ...mockAnalysisReports[0],
          id: `anl-${Date.now()}`,
          caseId,
          caseTitle: title,
          reportTitle: `${title} — Demonstration Analysis Report`,
          generatedDate: now,
          documentIds,
          summary: {
            ...mockAnalysisReports[0].summary,
            overview: `Demonstration AI synthesis prepared for "${title}" using ${documentIds.length} selected document(s). These structured findings illustrate how JUSTICE AI organises claims, timelines, and potential inconsistencies once connected to a live backend.`,
            parties: [
              { role: targetCase?.userRole || 'Petitioner', name: 'Varun Maheshwaram (Demo User)' },
              {
                role: 'Opposing Party',
                name: targetCase?.opposingParty || 'Opposite Party (Demo Record)',
              },
            ],
            mainDispute: targetCase?.description || mockAnalysisReports[0].summary.mainDispute,
          },
          isDemonstrationData: true,
        };
        setAnalysisReports((prev) => [result, ...prev]);
      }

      pushNotification({
        role: 'client',
        category: 'Analysis Completed',
        title: 'Demonstration Analysis Completed',
        message: `Sample legal analysis report generated for "${result.caseTitle}".`,
        link: '/client/analysis',
      });
      appendAudit('Varun Maheshwaram', 'client', 'Ran Demonstration AI Analysis', result.caseTitle);
      return result;
    },
    [analysisReports, appendAudit, cases, pushNotification]
  );

  const updateContradictionStatus = useCallback(
    (
      reportId: string,
      contradictionId: string,
      status: ContradictionItem['reviewStatus']
    ) => {
      setAnalysisReports((prev) =>
        prev.map((report) =>
          report.id !== reportId
            ? report
            : {
                ...report,
                contradictions: report.contradictions.map((c) =>
                  c.id === contradictionId ? { ...c, reviewStatus: status } : c
                ),
              }
        )
      );
    },
    []
  );

  const addTimelineEvent = useCallback((event: Omit<TimelineEvent, 'id'>) => {
    const created: TimelineEvent = { ...event, id: `tl-${Date.now()}` };
    setTimelineEvents((prev) =>
      [...prev, created].sort((a, b) => a.date.localeCompare(b.date))
    );
  }, []);

  const updateTimelineEvent = useCallback((id: string, updates: Partial<TimelineEvent>) => {
    setTimelineEvents((prev) =>
      prev
        .map((t) => (t.id === id ? { ...t, ...updates } : t))
        .sort((a, b) => a.date.localeCompare(b.date))
    );
  }, []);

  const deleteTimelineEvent = useCallback((id: string) => {
    setTimelineEvents((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const markLegalSourceViewed = useCallback((id: string) => {
    setRecentlyViewedLegalIds((prev) => [id, ...prev.filter((item) => item !== id)].slice(0, 5));
  }, []);

  const addLegalSource = useCallback(
    (source: Omit<LegalKnowledgeItem, 'id' | 'lastUpdated' | 'isDemoRecord'>) => {
      const created: LegalKnowledgeItem = {
        ...source,
        id: `law-${Date.now()}`,
        lastUpdated: new Date().toISOString().slice(0, 10),
        isDemoRecord: true,
      };
      setLegalSources((prev) => [created, ...prev]);
      appendAudit('Raghavendra Kulkarni', 'admin', 'Added Legal Knowledge Record', created.title);
    },
    [appendAudit]
  );

  const deleteLegalSource = useCallback((id: string) => {
    setLegalSources((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const toggleSaveAdvocate = useCallback((advocateId: string) => {
    setSavedAdvocateIds((prev) =>
      prev.includes(advocateId) ? prev.filter((id) => id !== advocateId) : [...prev, advocateId]
    );
  }, []);

  const updateAdvocateProfile = useCallback(
    (advocateId: string, updates: Partial<AdvocateProfile>) => {
      setAdvocates((prev) =>
        prev.map((a) => (a.id === advocateId ? { ...a, ...updates } : a))
      );
      pushNotification({
        role: 'advocate',
        category: 'Profile Updated',
        title: 'Professional Profile Updated',
        message: 'Your advocate directory profile changes have been saved in demo mode.',
        link: '/advocate/profile',
      });
    },
    [pushNotification]
  );

  const submitEnquiry = useCallback(
    (payload: Omit<AdvocateEnquiry, 'id' | 'createdAt' | 'status'>) => {
      const created: AdvocateEnquiry = {
        ...payload,
        id: `enq-${Date.now()}`,
        status: 'New',
        createdAt: new Date().toISOString(),
      };
      setEnquiries((prev) => [created, ...prev]);
      pushNotification({
        role: 'advocate',
        category: 'New Enquiry',
        title: 'New Client Enquiry Received',
        message: `${created.clientName} sent an enquiry regarding "${created.subject}".`,
        link: '/advocate/enquiries',
      });
      pushNotification({
        role: 'client',
        category: 'New Enquiry',
        title: 'Consultation Enquiry Sent',
        message: `Your enquiry to ${created.advocateName} has been logged (demo mode). Documents are not shared automatically.`,
        link: '/client/enquiries',
      });
      return created;
    },
    [pushNotification]
  );

  const updateEnquiryStatus = useCallback(
    (enquiryId: string, status: EnquiryStatus, responseNote?: string) => {
      setEnquiries((prev) =>
        prev.map((e) =>
          e.id === enquiryId
            ? { ...e, status, responseNote: responseNote ?? e.responseNote }
            : e
        )
      );
    },
    []
  );

  const markNotificationRead = useCallback((id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  }, []);

  const markAllNotificationsRead = useCallback((role: UserRole) => {
    setNotifications((prev) => prev.map((n) => (n.role === role ? { ...n, read: true } : n)));
  }, []);

  const updateUserStatus = useCallback(
    (userId: string, status: User['status']) => {
      setUsers((prev) => prev.map((u) => (u.id === userId ? { ...u, status } : u)));
      appendAudit('Raghavendra Kulkarni', 'admin', `Updated User Status to ${status}`, userId);
    },
    [appendAudit]
  );

  const updateVerificationRequest = useCallback(
    (requestId: string, status: VerificationStatus, reviewerNotes?: string) => {
      setVerificationRequests((prev) =>
        prev.map((req) => {
          if (req.id !== requestId) return req;
          setAdvocates((advList) =>
            advList.map((a) =>
              a.id === req.advocateId ? { ...a, verificationStatus: status } : a
            )
          );
          return { ...req, status, reviewerNotes: reviewerNotes ?? req.reviewerNotes };
        })
      );
      appendAudit(
        'Raghavendra Kulkarni',
        'admin',
        `Set Verification Request ${status}`,
        requestId
      );
    },
    [appendAudit]
  );

  return (
    <AppDataContext.Provider
      value={{
        cases,
        documents,
        analysisReports,
        timelineEvents,
        legalSources,
        advocates,
        savedAdvocateIds,
        enquiries,
        notifications,
        users,
        verificationRequests,
        auditLogs,
        recentlyViewedLegalIds,
        addCase,
        updateCase,
        deleteCase,
        archiveCase,
        addCaseNote,
        deleteCaseNote,
        addDocument,
        updateDocumentStatus,
        deleteDocument,
        runDemoAnalysis,
        updateContradictionStatus,
        addTimelineEvent,
        updateTimelineEvent,
        deleteTimelineEvent,
        markLegalSourceViewed,
        addLegalSource,
        deleteLegalSource,
        toggleSaveAdvocate,
        updateAdvocateProfile,
        submitEnquiry,
        updateEnquiryStatus,
        markNotificationRead,
        markAllNotificationsRead,
        pushNotification,
        updateUserStatus,
        updateVerificationRequest,
      }}
    >
      {children}
    </AppDataContext.Provider>
  );
};

export function useAppDataContext(): AppDataContextValue {
  const ctx = useContext(AppDataContext);
  if (!ctx) {
    throw new Error('useAppDataContext must be used within AppDataProvider');
  }
  return ctx;
}
