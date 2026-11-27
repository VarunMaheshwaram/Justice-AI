/**
 * Centralised API configuration prepared for future backend integration.
 *
 * Planned production stack:
 * - Backend: Python + FastAPI
 * - Database: PostgreSQL + pgvector (RAG)
 * - Auth: Supabase Auth or JWT OAuth2
 * - Document Pipeline: PyMuPDF + Tesseract OCR + Private Object Storage
 * - AI Intelligence: Gemini API / LLM Gateway
 * - Location Services: Google Maps Platform
 *
 * CURRENT PHASE: FRONTEND DEMONSTRATION MODE ONLY.
 */

export const API_CONFIG = {
  baseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1',
  mode: (import.meta.env.VITE_APP_MODE || 'demo') as 'demo' | 'production',
  timeoutMs: 15000,
  endpoints: {
    auth: {
      login: '/auth/login',
      register: '/auth/register',
      logout: '/auth/logout',
      me: '/auth/me',
    },
    cases: '/cases',
    documents: '/documents',
    analysis: '/analysis',
    legalSources: '/legal-sources',
    advocates: '/advocates',
    enquiries: '/enquiries',
    notifications: '/notifications',
    admin: '/admin',
  },
} as const;

export const isDemoMode = (): boolean => API_CONFIG.mode === 'demo';
