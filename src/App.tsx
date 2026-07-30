import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/common/Header';
import { Sidebar } from './components/common/Sidebar';
import { Footer } from './components/common/Footer';
import { ToastContainer } from './components/common/ToastContainer';
import { CommandPalette } from './components/common/CommandPalette';
import { AIAssistantModal } from './components/common/AIAssistantModal';

import { LandingPage } from './components/landing/LandingPage';
import { LoginView } from './components/auth/LoginView';
import { RegisterView } from './components/auth/RegisterView';
import { ForgotPasswordView } from './components/auth/ForgotPasswordView';
import { ResetPasswordView } from './components/auth/ResetPasswordView';

import { DashboardView } from './components/dashboard/DashboardView';
import { ProfileView } from './components/profile/ProfileView';
import { SettingsView } from './components/settings/SettingsView';
import { DatabaseSchemaView } from './components/settings/DatabaseSchemaView';
import { NotificationCenter } from './components/notifications/NotificationCenter';
import { MasterDataView } from './components/master_data/MasterDataView';
import { UserManagementView } from './components/user_management/UserManagementView';
import { PpdbView } from './components/ppdb/PpdbView';
import { StudentMasterView } from './components/student_master/StudentMasterView';
import { TeacherMasterView } from './components/teacher_master/TeacherMasterView';

import { GlobalPlatformView } from './components/global_platform/GlobalPlatformView';
import { CurriculumFrameworkView } from './components/curriculum/CurriculumFrameworkView';
import { CertificationCenterView } from './components/certification/CertificationCenterView';
import { SmartCampusView } from './components/campus/SmartCampusView';
import { GlobalAnalyticsView } from './components/global_analytics/GlobalAnalyticsView';
import { PlatformEngineeringView } from './components/platform_engineering/PlatformEngineeringView';
import { AutonomousAiView } from './components/autonomous_ai/AutonomousAiView';
import { EduOsView } from './components/edu_os/EduOsView';
import { CloudPlatformView } from './components/cloud_v5/CloudPlatformView';

const MainAppContent: React.FC = () => {
  const { view, currentRole } = useApp();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Full-screen view layouts (landing page and authentication views)
  if (view === 'landing') {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col justify-between">
        <Header />
        <main className="flex-1">
          <LandingPage />
        </main>
        <Footer />
      </div>
    );
  }

  if (view === 'login') return <LoginView />;
  if (view === 'register') return <RegisterView />;
  if (view === 'forgot_password') return <ForgotPasswordView />;
  if (view === 'reset_password') return <ResetPasswordView />;

  // Main Dashboard / Inner Portal Layout
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-300">
      <Header />

      <div className="flex-1 flex max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 gap-6">
        <Sidebar
          isCollapsed={isSidebarCollapsed}
          setIsCollapsed={setIsSidebarCollapsed}
        />

        <main className="flex-1 min-w-0">
          {view === 'dashboard' && <DashboardView />}
          {view === 'ppdb' && <PpdbView currentRole={currentRole} />}
          {view === 'master_siswa' && <StudentMasterView />}
          {view === 'master_guru' && <TeacherMasterView />}
          {view === 'master_data' && <MasterDataView />}
          {view === 'user_management' && <UserManagementView currentRole={currentRole} />}
          {view === 'global_platform' && <GlobalPlatformView />}
          {view === 'curriculum_framework' && <CurriculumFrameworkView />}
          {view === 'certification_center' && <CertificationCenterView />}
          {view === 'smart_campus' && <SmartCampusView />}
          {view === 'global_analytics' && <GlobalAnalyticsView />}
          {view === 'platform_engineering' && <PlatformEngineeringView />}
          {view === 'autonomous_ai' && <AutonomousAiView />}
          {view === 'edu_os' && <EduOsView />}
          {view === 'cloud_v5' && <CloudPlatformView />}
          {view === 'profile' && <ProfileView />}
          {view === 'settings' && <SettingsView />}
          {view === 'notifications' && <NotificationCenter />}
          {view === 'database_schema' && <DatabaseSchemaView />}
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainAppContent />
      <ToastContainer />
      <CommandPalette />
      <AIAssistantModal />
    </AppProvider>
  );
}
