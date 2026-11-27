import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';

import { PublicLayout } from '../layouts/PublicLayout';
import { ClientLayout } from '../layouts/ClientLayout';
import { AdvocateLayout } from '../layouts/AdvocateLayout';
import { AdminLayout } from '../layouts/AdminLayout';

// Public & Auth
import { LandingPage } from '../pages/public/LandingPage';
import { FeaturesPage } from '../pages/public/FeaturesPage';
import { HowItWorksPage } from '../pages/public/HowItWorksPage';
import { PublicAdvocatesPage } from '../pages/public/PublicAdvocatesPage';
import { AboutPage } from '../pages/public/AboutPage';
import { ContactPage } from '../pages/public/ContactPage';
import {
  DisclaimerPage,
  PrivacyPolicyPage,
  TermsPage,
} from '../pages/public/LegalPages';
import { LoginPage } from '../pages/auth/LoginPage';
import { RegisterPage } from '../pages/auth/RegisterPage';

// Client
import { ClientDashboardPage } from '../pages/client/ClientDashboardPage';
import { MyCasesPage } from '../pages/client/MyCasesPage';
import { CreateCasePage } from '../pages/client/CreateCasePage';
import { CaseDetailsPage } from '../pages/client/CaseDetailsPage';
import { DocumentsPage } from '../pages/client/DocumentsPage';
import { AnalysisPage } from '../pages/client/AnalysisPage';
import { ImportantPointsPage } from '../pages/client/ImportantPointsPage';
import { ContradictionsPage } from '../pages/client/ContradictionsPage';
import { PerspectivePage } from '../pages/client/PerspectivePage';
import { LegalAssistantPage } from '../pages/client/LegalAssistantPage';
import { LegalKnowledgePage } from '../pages/client/LegalKnowledgePage';
import { CaseTimelinePage } from '../pages/client/CaseTimelinePage';
import { FindAdvocatesPage } from '../pages/client/FindAdvocatesPage';
import { AdvocateDetailsPage } from '../pages/client/AdvocateDetailsPage';
import { SavedAdvocatesPage } from '../pages/client/SavedAdvocatesPage';
import { ClientEnquiriesPage } from '../pages/client/ClientEnquiriesPage';
import {
  ClientNotificationsPage,
  ClientProfilePage,
  ClientSettingsPage,
} from '../pages/client/ClientProfileSettingsPages';

// Advocate
import { AdvocateDashboardPage } from '../pages/advocate/AdvocateDashboardPage';
import {
  AdvocateAvailabilityPage,
  AdvocateEditProfilePage,
  AdvocatePracticeAreasPage,
  AdvocateProfilePage,
} from '../pages/advocate/AdvocateProfilePages';
import {
  AdvocateClientRequestsPage,
  AdvocateEnquiriesPage,
  AdvocateNotificationsPage,
  AdvocateSettingsPage,
  AdvocateVerificationPage,
} from '../pages/advocate/AdvocateVerificationEnquiriesPages';

// Admin
import { AdminDashboardPage } from '../pages/admin/AdminDashboardPage';
import {
  AdminAdvocatesPage,
  AdminLegalSourcesPage,
  AdminUsersPage,
  AdminVerificationsPage,
} from '../pages/admin/AdminManagementPages';
import {
  AdminAnalyticsPage,
  AdminAuditLogsPage,
  AdminReportsPage,
  AdminSettingsPage,
} from '../pages/admin/AdminInsightsPages';

const ProtectedRoleRoute: React.FC<{
  allowedRole: UserRole;
  children: React.ReactNode;
}> = ({ allowedRole, children }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  if (user.role !== allowedRole) {
    return <Navigate to={`/${user.role}/dashboard`} replace />;
  }
  return <>{children}</>;
};

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public Website */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/how-it-works" element={<HowItWorksPage />} />
        <Route path="/find-advocates" element={<PublicAdvocatesPage />} />
        <Route path="/find-advocates/:advocateId" element={<AdvocateDetailsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/privacy" element={<PrivacyPolicyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/disclaimer" element={<DisclaimerPage />} />
      </Route>

      {/* Client Application */}
      <Route
        path="/client"
        element={
          <ProtectedRoleRoute allowedRole="client">
            <ClientLayout />
          </ProtectedRoleRoute>
        }
      >
        <Route index element={<Navigate to="/client/dashboard" replace />} />
        <Route path="dashboard" element={<ClientDashboardPage />} />
        <Route path="cases" element={<MyCasesPage />} />
        <Route path="cases/new" element={<CreateCasePage />} />
        <Route path="cases/:caseId" element={<CaseDetailsPage />} />
        <Route path="cases/:caseId/edit" element={<CreateCasePage />} />
        <Route path="documents" element={<DocumentsPage />} />
        <Route path="analysis" element={<AnalysisPage />} />
        <Route path="important-points" element={<ImportantPointsPage />} />
        <Route path="contradictions" element={<ContradictionsPage />} />
        <Route path="perspective" element={<PerspectivePage />} />
        <Route path="assistant" element={<LegalAssistantPage />} />
        <Route path="legal-knowledge" element={<LegalKnowledgePage />} />
        <Route path="timeline" element={<CaseTimelinePage />} />
        <Route path="advocates" element={<FindAdvocatesPage />} />
        <Route path="advocates/:advocateId" element={<AdvocateDetailsPage />} />
        <Route path="saved-advocates" element={<SavedAdvocatesPage />} />
        <Route path="enquiries" element={<ClientEnquiriesPage />} />
        <Route path="notifications" element={<ClientNotificationsPage />} />
        <Route path="profile" element={<ClientProfilePage />} />
        <Route path="settings" element={<ClientSettingsPage />} />
      </Route>

      {/* Advocate Application */}
      <Route
        path="/advocate"
        element={
          <ProtectedRoleRoute allowedRole="advocate">
            <AdvocateLayout />
          </ProtectedRoleRoute>
        }
      >
        <Route index element={<Navigate to="/advocate/dashboard" replace />} />
        <Route path="dashboard" element={<AdvocateDashboardPage />} />
        <Route path="profile" element={<AdvocateProfilePage />} />
        <Route path="edit-profile" element={<AdvocateEditProfilePage />} />
        <Route path="practice-areas" element={<AdvocatePracticeAreasPage />} />
        <Route path="verification" element={<AdvocateVerificationPage />} />
        <Route path="enquiries" element={<AdvocateEnquiriesPage />} />
        <Route path="client-requests" element={<AdvocateClientRequestsPage />} />
        <Route path="availability" element={<AdvocateAvailabilityPage />} />
        <Route path="notifications" element={<AdvocateNotificationsPage />} />
        <Route path="settings" element={<AdvocateSettingsPage />} />
      </Route>

      {/* Admin Application */}
      <Route
        path="/admin"
        element={
          <ProtectedRoleRoute allowedRole="admin">
            <AdminLayout />
          </ProtectedRoleRoute>
        }
      >
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboardPage />} />
        <Route path="users" element={<AdminUsersPage />} />
        <Route path="advocates" element={<AdminAdvocatesPage />} />
        <Route path="verifications" element={<AdminVerificationsPage />} />
        <Route path="legal-sources" element={<AdminLegalSourcesPage />} />
        <Route path="reports" element={<AdminReportsPage />} />
        <Route path="analytics" element={<AdminAnalyticsPage />} />
        <Route path="audit-logs" element={<AdminAuditLogsPage />} />
        <Route path="settings" element={<AdminSettingsPage />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
