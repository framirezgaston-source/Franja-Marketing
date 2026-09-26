import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { ToastContainer } from './components/ui/Toast';
import { DashboardLayout } from './components/layout/DashboardLayout';

// Pages
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { VerifyEmailPage } from './pages/VerifyEmailPage';
import { OnboardingPage } from './pages/OnboardingPage';
import { DashboardPage } from './pages/DashboardPage';
import { CampaignsPage } from './pages/CampaignsPage';
import { CreateCampaignPage } from './pages/CreateCampaignPage';
import { CampaignDetailPage } from './pages/CampaignDetailPage';
import { ContactsPage } from './pages/ContactsPage';
import { IntegrationsPage } from './pages/IntegrationsPage';
import { WhatsAppPage } from './pages/WhatsAppPage';
import { BillingPage } from './pages/BillingPage';
import { SettingsPage } from './pages/SettingsPage';

export default function App() {
  return (
    <AppProvider>
      <HashRouter>
        <ToastContainer />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/verify-email" element={<VerifyEmailPage />} />
          <Route path="/onboarding" element={<OnboardingPage />} />

          {/* Authenticated Dashboard Routes */}
          <Route
            path="/dashboard"
            element={
              <DashboardLayout>
                <DashboardPage />
              </DashboardLayout>
            }
          />
          <Route
            path="/campaigns"
            element={
              <DashboardLayout>
                <CampaignsPage />
              </DashboardLayout>
            }
          />
          <Route
            path="/campaigns/new"
            element={
              <DashboardLayout>
                <CreateCampaignPage />
              </DashboardLayout>
            }
          />
          <Route
            path="/campaigns/:id"
            element={
              <DashboardLayout>
                <CampaignDetailPage />
              </DashboardLayout>
            }
          />
          <Route
            path="/contacts"
            element={
              <DashboardLayout>
                <ContactsPage />
              </DashboardLayout>
            }
          />
          <Route
            path="/integrations"
            element={
              <DashboardLayout>
                <IntegrationsPage />
              </DashboardLayout>
            }
          />
          <Route
            path="/whatsapp"
            element={
              <DashboardLayout>
                <WhatsAppPage />
              </DashboardLayout>
            }
          />
          <Route
            path="/billing"
            element={
              <DashboardLayout>
                <BillingPage />
              </DashboardLayout>
            }
          />
          <Route
            path="/settings"
            element={
              <DashboardLayout>
                <SettingsPage />
              </DashboardLayout>
            }
          />

          {/* Fallback to Dashboard */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </HashRouter>
    </AppProvider>
  );
}
