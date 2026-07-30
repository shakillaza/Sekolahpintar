import React, { useState } from 'react';
import { UserRole, SchoolLevel } from '../../types';
import { PpdbSubTab, PpdbWave, PpdbTrack, PpdbFormField, PpdbApplicant, PpdbDocumentItem, PpdbTestQuestion, PpdbOnlineTestResult, PpdbInterviewSchedule, PpdbPaymentRecord } from '../../types/ppdbTypes';
import {
  initialPpdbWaves,
  initialPpdbTracks,
  initialPpdbFormFields,
  initialPpdbApplicants,
  initialPpdbDocuments,
  initialPpdbTestQuestions,
  initialPpdbTestResults,
  initialPpdbInterviews,
  initialPpdbPayments
} from '../../data/initialPpdbData';

// Import Tabs
import { DashboardTab } from './tabs/DashboardTab';
import { WavesTab } from './tabs/WavesTab';
import { TracksTab } from './tabs/TracksTab';
import { FormBuilderTab } from './tabs/FormBuilderTab';
import { ApplicantsTab } from './tabs/ApplicantsTab';
import { DocumentsTab } from './tabs/DocumentsTab';
import { AiOcrValidationTab } from './tabs/AiOcrValidationTab';
import { VerificationsTab } from './tabs/VerificationsTab';
import { SelectionTab } from './tabs/SelectionTab';
import { OnlineTestTab } from './tabs/OnlineTestTab';
import { InterviewTab } from './tabs/InterviewTab';
import { AnnouncementsTab } from './tabs/AnnouncementsTab';
import { ReEnrollmentTab } from './tabs/ReEnrollmentTab';
import { PaymentsTab } from './tabs/PaymentsTab';
import { StatisticsTab } from './tabs/StatisticsTab';
import { PpdbSettingsTab } from './tabs/PpdbSettingsTab';

import {
  GraduationCap,
  LayoutDashboard,
  Calendar,
  Compass,
  FileText,
  Users,
  FileCheck2,
  Sparkles,
  UserCheck,
  Award,
  HelpCircle,
  Video,
  Megaphone,
  CheckSquare,
  CreditCard,
  BarChart3,
  Settings,
  School,
  Building2,
  ChevronRight
} from 'lucide-react';

interface PpdbViewProps {
  currentRole: UserRole;
}

export const PpdbView: React.FC<PpdbViewProps> = ({ currentRole }) => {
  const [activeTab, setActiveTab] = useState<PpdbSubTab>('dashboard');
  const [selectedSchoolLevel, setSelectedSchoolLevel] = useState<SchoolLevel | 'SEMUA'>('SEMUA');

  // Core Datasets State
  const [waves, setWaves] = useState<PpdbWave[]>(initialPpdbWaves);
  const [tracks, setTracks] = useState<PpdbTrack[]>(initialPpdbTracks);
  const [formFields, setFormFields] = useState<PpdbFormField[]>(initialPpdbFormFields);
  const [applicants, setApplicants] = useState<PpdbApplicant[]>(initialPpdbApplicants);
  const [documents, setDocuments] = useState<PpdbDocumentItem[]>(initialPpdbDocuments);
  const [testQuestions, setTestQuestions] = useState<PpdbTestQuestion[]>(initialPpdbTestQuestions);
  const [testResults, setTestResults] = useState<PpdbOnlineTestResult[]>(initialPpdbTestResults);
  const [interviews, setInterviews] = useState<PpdbInterviewSchedule[]>(initialPpdbInterviews);
  const [payments, setPayments] = useState<PpdbPaymentRecord[]>(initialPpdbPayments);

  // Handlers for Waves
  const handleAddWave = (wave: PpdbWave) => setWaves([...waves, wave]);
  const handleUpdateWave = (wave: PpdbWave) => setWaves(waves.map((w) => (w.id === wave.id ? wave : w)));
  const handleDeleteWave = (id: string) => setWaves(waves.filter((w) => w.id !== id));

  // Handlers for Tracks
  const handleAddTrack = (track: PpdbTrack) => setTracks([...tracks, track]);
  const handleUpdateTrack = (track: PpdbTrack) => setTracks(tracks.map((t) => (t.id === track.id ? track : t)));
  const handleDeleteTrack = (id: string) => setTracks(tracks.filter((t) => t.id !== id));

  // Handlers for Applicants
  const handleAddApplicant = (app: PpdbApplicant) => setApplicants([app, ...applicants]);
  const handleUpdateApplicant = (app: PpdbApplicant) =>
    setApplicants(applicants.map((a) => (a.id === app.id ? app : a)));
  const handleDeleteApplicant = (id: string) => setApplicants(applicants.filter((a) => a.id !== id));

  // Status Handlers
  const handleUpdateStatus = (id: string, status: any, notes?: string) => {
    setApplicants(
      applicants.map((a) =>
        a.id === id ? { ...a, status, verificationNotes: notes || a.verificationNotes } : a
      )
    );
  };

  const handleUpdateDocStatus = (docId: string, status: any, notes?: string) => {
    setDocuments(documents.map((d) => (d.id === docId ? { ...d, status, notes } : d)));
  };

  const handleVerifyPayment = (payId: string) => {
    setPayments(
      payments.map((p) =>
        p.id === payId
          ? { ...p, status: 'Paid', paidAt: new Date().toISOString().replace('T', ' ').slice(0, 16) }
          : p
      )
    );
  };

  const handleAddInterview = (intItem: PpdbInterviewSchedule) => setInterviews([...interviews, intItem]);

  // Sub-navigation Tabs Item Array
  const navTabs = [
    { id: 'dashboard', label: 'Dashboard PPDB', icon: LayoutDashboard },
    { id: 'waves', label: 'Gelombang', icon: Calendar },
    { id: 'tracks', label: 'Jalur Pendaftaran', icon: Compass },
    { id: 'form_builder', label: 'Formulir Dinamis', icon: FileText },
    { id: 'applicants', label: 'Calon Siswa', icon: Users },
    { id: 'documents', label: 'Verifikasi Berkas', icon: FileCheck2 },
    { id: 'ai_ocr_validation', label: 'Smart AI OCR', icon: Sparkles },
    { id: 'verifications', label: 'Tinjauan Panitia', icon: UserCheck },
    { id: 'selection', label: 'Seleksi Kelulusan', icon: Award },
    { id: 'online_test', label: 'Tes Online CBT', icon: HelpCircle },
    { id: 'interview', label: 'Wawancara', icon: Video },
    { id: 'announcements', label: 'Pengumuman & WA', icon: Megaphone },
    { id: 're_enrollment', label: 'Daftar Ulang', icon: CheckSquare },
    { id: 'payments', label: 'Pembayaran Kasir', icon: CreditCard },
    { id: 'statistics', label: 'Laporan & Export', icon: BarChart3 },
    { id: 'settings', label: 'Pengaturan PPDB', icon: Settings },
  ] as const;

  return (
    <div className="space-y-6 pb-12">
      {/* Module Title Header */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-2xl bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400">
              <GraduationCap className="w-6 h-6" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
                  PPDB Online Enterprise & Smart AI Automation
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-blue-600 text-white uppercase tracking-wider">
                  Multi-School & Multi-Tenant
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Sistem Penerimaan Peserta Didik Baru terintegrasi PAUD, TK, SD, SMP, SMA, SMK, Pesantren, Internasional, & Homeschool.
              </p>
            </div>
          </div>
        </div>

        {/* School Level Selector */}
        <div className="flex items-center gap-2 overflow-x-auto max-w-full pb-1 scrollbar-none">
          <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider whitespace-nowrap">
            Filter Jenjang:
          </span>
          {(['SEMUA', 'PAUD', 'TK', 'SD', 'SMP', 'SMA', 'SMK', 'Pesantren'] as const).map((lvl) => (
            <button
              key={lvl}
              onClick={() => setSelectedSchoolLevel(lvl)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                selectedSchoolLevel === lvl
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
              }`}
            >
              {lvl}
            </button>
          ))}
        </div>
      </div>

      {/* Sub-tab Horizontal Scroll Menu */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-1.5 shadow-sm overflow-x-auto scrollbar-none flex items-center gap-1">
        {navTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as PpdbSubTab)}
              className={`px-3.5 py-2 rounded-xl text-xs font-extrabold flex items-center gap-2 transition-all whitespace-nowrap ${
                isActive
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/80'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Render Active Sub-Tab */}
      <div className="min-h-[400px]">
        {activeTab === 'dashboard' && (
          <DashboardTab
            applicants={applicants}
            waves={waves}
            onNavigateToTab={(tab) => setActiveTab(tab)}
          />
        )}

        {activeTab === 'waves' && (
          <WavesTab
            waves={waves}
            onAddWave={handleAddWave}
            onUpdateWave={handleUpdateWave}
            onDeleteWave={handleDeleteWave}
          />
        )}

        {activeTab === 'tracks' && (
          <TracksTab
            tracks={tracks}
            onAddTrack={handleAddTrack}
            onUpdateTrack={handleUpdateTrack}
            onDeleteTrack={handleDeleteTrack}
          />
        )}

        {activeTab === 'form_builder' && (
          <FormBuilderTab
            fields={formFields}
            onUpdateFields={(updated) => setFormFields(updated)}
          />
        )}

        {activeTab === 'applicants' && (
          <ApplicantsTab
            applicants={applicants}
            onAddApplicant={handleAddApplicant}
            onUpdateApplicant={handleUpdateApplicant}
            onDeleteApplicant={handleDeleteApplicant}
          />
        )}

        {activeTab === 'documents' && (
          <DocumentsTab
            documents={documents}
            onUpdateDocumentStatus={handleUpdateDocStatus}
          />
        )}

        {activeTab === 'ai_ocr_validation' && (
          <AiOcrValidationTab applicants={applicants} />
        )}

        {activeTab === 'verifications' && (
          <VerificationsTab
            applicants={applicants}
            onUpdateStatus={handleUpdateStatus}
          />
        )}

        {activeTab === 'selection' && (
          <SelectionTab
            applicants={applicants}
            onUpdateStatus={(id, st) => handleUpdateStatus(id, st)}
          />
        )}

        {activeTab === 'online_test' && (
          <OnlineTestTab
            testQuestions={testQuestions}
            testResults={testResults}
          />
        )}

        {activeTab === 'interview' && (
          <InterviewTab
            interviews={interviews}
            onAddInterview={handleAddInterview}
          />
        )}

        {activeTab === 'announcements' && (
          <AnnouncementsTab applicants={applicants} />
        )}

        {activeTab === 're_enrollment' && (
          <ReEnrollmentTab applicants={applicants} />
        )}

        {activeTab === 'payments' && (
          <PaymentsTab
            payments={payments}
            onVerifyPayment={handleVerifyPayment}
          />
        )}

        {activeTab === 'statistics' && (
          <StatisticsTab applicants={applicants} />
        )}

        {activeTab === 'settings' && <PpdbSettingsTab />}
      </div>
    </div>
  );
};
