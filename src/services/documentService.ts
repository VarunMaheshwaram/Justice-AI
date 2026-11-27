import { CaseDocument, DocumentProcessingStatus } from '../types';
import { mockDocuments } from '../data/mockDocuments';

let localDocuments: CaseDocument[] = [...mockDocuments];

export const documentService = {
  async getDocuments(caseId?: string): Promise<CaseDocument[]> {
    if (!caseId) return [...localDocuments];
    return localDocuments.filter((d) => d.caseId === caseId);
  },

  async uploadDocument(
    payload: Omit<CaseDocument, 'id' | 'uploadDate' | 'isSimulated'>
  ): Promise<CaseDocument> {
    const doc: CaseDocument = {
      ...payload,
      id: `doc-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      uploadDate: new Date().toISOString(),
      isSimulated: true,
    };
    localDocuments = [doc, ...localDocuments];
    return doc;
  },

  async deleteDocument(id: string): Promise<boolean> {
    const before = localDocuments.length;
    localDocuments = localDocuments.filter((d) => d.id !== id);
    return localDocuments.length < before;
  },

  async getDocumentStatus(id: string): Promise<DocumentProcessingStatus | undefined> {
    return localDocuments.find((d) => d.id === id)?.status;
  },
};
