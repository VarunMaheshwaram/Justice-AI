import { LegalCase } from '../types';
import { mockCases } from '../data/mockCases';

let localCases: LegalCase[] = [...mockCases];

export const caseService = {
  async getCases(): Promise<LegalCase[]> {
    return [...localCases];
  },

  async getCaseById(id: string): Promise<LegalCase | undefined> {
    return localCases.find((c) => c.id === id);
  },

  async createCase(
    data: Omit<LegalCase, 'id' | 'lastUpdated' | 'documentCount' | 'notes' | 'isDemoRecord'>
  ): Promise<LegalCase> {
    const created: LegalCase = {
      ...data,
      id: `case-${Date.now()}`,
      lastUpdated: new Date().toISOString(),
      documentCount: 0,
      notes: [],
      isDemoRecord: true,
    };
    localCases = [created, ...localCases];
    return created;
  },

  async updateCase(id: string, updates: Partial<LegalCase>): Promise<LegalCase | undefined> {
    let updatedItem: LegalCase | undefined;
    localCases = localCases.map((c) => {
      if (c.id !== id) return c;
      updatedItem = { ...c, ...updates, lastUpdated: new Date().toISOString() };
      return updatedItem;
    });
    return updatedItem;
  },

  async deleteCase(id: string): Promise<boolean> {
    const before = localCases.length;
    localCases = localCases.filter((c) => c.id !== id);
    return localCases.length < before;
  },
};
