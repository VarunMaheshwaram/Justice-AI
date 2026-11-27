import { CaseAnalysisReport, ContradictionItem, ImportantPointsData } from '../types';
import { mockAnalysisReports } from '../data/mockAnalysis';

let localReports: CaseAnalysisReport[] = [...mockAnalysisReports];

export const analysisService = {
  async getAnalysisReports(): Promise<CaseAnalysisReport[]> {
    return [...localReports];
  },

  async getAnalysisReport(caseId: string): Promise<CaseAnalysisReport | undefined> {
    return localReports.find((r) => r.caseId === caseId) || localReports[0];
  },

  async getContradictions(caseId?: string): Promise<ContradictionItem[]> {
    if (!caseId) {
      return localReports.flatMap((r) => r.contradictions);
    }
    const report = localReports.find((r) => r.caseId === caseId);
    return report ? report.contradictions : [];
  },

  async getImportantPoints(caseId: string): Promise<ImportantPointsData | undefined> {
    const report = localReports.find((r) => r.caseId === caseId);
    return report?.importantPoints;
  },

  async analyseDocuments(
    caseId: string,
    caseTitle: string,
    documentIds: string[]
  ): Promise<CaseAnalysisReport> {
    const existing = localReports.find((r) => r.caseId === caseId);
    if (existing) {
      const refreshed: CaseAnalysisReport = {
        ...existing,
        documentIds: documentIds.length > 0 ? documentIds : existing.documentIds,
        generatedDate: new Date().toISOString(),
      };
      localReports = localReports.map((r) => (r.id === existing.id ? refreshed : r));
      return refreshed;
    }

    const demoReport: CaseAnalysisReport = {
      ...mockAnalysisReports[0],
      id: `anl-${Date.now()}`,
      caseId,
      caseTitle,
      reportTitle: `${caseTitle} — Demonstration Analysis Report`,
      generatedDate: new Date().toISOString(),
      documentIds,
      summary: {
        ...mockAnalysisReports[0].summary,
        overview: `Demonstration summary generated from ${documentIds.length} selected document(s) associated with "${caseTitle}". All extracted insights below are illustrative placeholders for frontend review only.`,
      },
      isDemonstrationData: true,
    };
    localReports = [demoReport, ...localReports];
    return demoReport;
  },
};
