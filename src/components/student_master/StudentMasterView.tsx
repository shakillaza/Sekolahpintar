import React, { useState } from 'react';
import {
  StudentSubTab,
  StudentMasterItem,
  StudentEducationHistory,
  StudentMutationRecord,
  StudentAlumniRecord,
  StudentAchievementRecord,
  StudentViolationRecord,
  StudentHealthRecord,
  StudentDocumentRecord,
  StudentScholarshipRecord,
  StudentOrganizationRecord,
  StudentExtracurricularRecord,
  StudentCounselingRecord,
  StudentAiNote,
  StudentTimelineEvent,
} from '../../types/studentTypes';

import {
  initialStudents,
  initialEducationHistories,
  initialMutations,
  initialAlumniRecords,
  initialAchievements,
  initialViolations,
  initialHealthRecords,
  initialDocuments,
  initialScholarships,
  initialOrganizations,
  initialExtracurriculars,
  initialCounselings,
  initialAiNotes,
  initialTimelines,
} from '../../data/initialStudentData';

import { DashboardSiswaTab } from './tabs/DashboardSiswaTab';
import { DataSiswaTab } from './tabs/DataSiswaTab';
import { BiodataLengkapTab } from './tabs/BiodataLengkapTab';
import { OrangTuaWaliTab } from './tabs/OrangTuaWaliTab';
import { RiwayatPendidikanTab } from './tabs/RiwayatPendidikanTab';
import { MutasiTab } from './tabs/MutasiTab';
import { AlumniTab } from './tabs/AlumniTab';
import { PrestasiTab } from './tabs/PrestasiTab';
import { PelanggaranTab } from './tabs/PelanggaranTab';
import { KesehatanTab } from './tabs/KesehatanTab';
import { DokumenTab } from './tabs/DokumenTab';
import { BeasiswaTab } from './tabs/BeasiswaTab';
import { OrganisasiTab } from './tabs/OrganisasiTab';
import { EkstrakurikulerTab } from './tabs/EkstrakurikulerTab';
import { KonselingBkTab } from './tabs/KonselingBkTab';
import { CatatanAiTab } from './tabs/CatatanAiTab';
import { TimelineAktivitasTab } from './tabs/TimelineAktivitasTab';
import { PengaturanSiswaTab } from './tabs/PengaturanSiswaTab';

import {
  LayoutDashboard,
  Users,
  User,
  Heart,
  GraduationCap,
  ArrowRightLeft,
  Award,
  AlertTriangle,
  HeartPulse,
  FileText,
  DollarSign,
  Briefcase,
  Activity,
  UserCheck,
  Brain,
  Clock,
  Settings,
  X,
  Sparkles,
  Search,
  BookOpen
} from 'lucide-react';

export const StudentMasterView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<StudentSubTab>('dashboard');

  // Master States
  const [students, setStudents] = useState<StudentMasterItem[]>(initialStudents);
  const [selectedStudent, setSelectedStudent] = useState<StudentMasterItem>(initialStudents[0]);

  const [educationHistories] = useState<StudentEducationHistory[]>(initialEducationHistories);
  const [mutations, setMutations] = useState<StudentMutationRecord[]>(initialMutations);
  const [alumniRecords] = useState<StudentAlumniRecord[]>(initialAlumniRecords);
  const [achievements, setAchievements] = useState<StudentAchievementRecord[]>(initialAchievements);
  const [violations, setViolations] = useState<StudentViolationRecord[]>(initialViolations);
  const [healthRecords] = useState<StudentHealthRecord[]>(initialHealthRecords);
  const [documents, setDocuments] = useState<StudentDocumentRecord[]>(initialDocuments);
  const [scholarships] = useState<StudentScholarshipRecord[]>(initialScholarships);
  const [organizations] = useState<StudentOrganizationRecord[]>(initialOrganizations);
  const [extracurriculars] = useState<StudentExtracurricularRecord[]>(initialExtracurriculars);
  const [counselings, setCounselings] = useState<StudentCounselingRecord[]>(initialCounselings);
  const [aiNotes, setAiNotes] = useState<StudentAiNote[]>(initialAiNotes);
  const [timelines] = useState<StudentTimelineEvent[]>(initialTimelines);

  // Drawer Detail State
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Add / Update handlers
  const handleAddStudent = (newS: StudentMasterItem) => {
    setStudents([newS, ...students]);
    setSelectedStudent(newS);
  };

  const handleUpdateStudent = (updatedS: StudentMasterItem) => {
    setStudents(students.map((s) => (s.id === updatedS.id ? updatedS : s)));
    if (selectedStudent.id === updatedS.id) {
      setSelectedStudent(updatedS);
    }
  };

  const handleDeleteStudent = (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus data siswa ini secara permanen?')) {
      const remaining = students.filter((s) => s.id !== id);
      setStudents(remaining);
      if (selectedStudent.id === id && remaining.length > 0) {
        setSelectedStudent(remaining[0]);
      }
    }
  };

  const handleAddMutation = (m: StudentMutationRecord) => {
    setMutations([m, ...mutations]);
  };

  const handleAddAchievement = (ach: StudentAchievementRecord) => {
    setAchievements([ach, ...achievements]);
  };

  const handleAddViolation = (v: StudentViolationRecord) => {
    setViolations([v, ...violations]);
  };

  const handleAddDocument = (doc: StudentDocumentRecord) => {
    setDocuments([doc, ...documents]);
  };

  const handleAddCounseling = (c: StudentCounselingRecord) => {
    setCounselings([c, ...counselings]);
  };

  const handleUpdateAiNotes = (note: StudentAiNote) => {
    const existing = aiNotes.filter((n) => n.studentId !== note.studentId);
    setAiNotes([note, ...existing]);
  };

  const handleSelectStudentAndOpenDrawer = (s: StudentMasterItem) => {
    setSelectedStudent(s);
    setIsDrawerOpen(true);
  };

  // Menu items list
  const menuItems: { key: StudentSubTab; label: string; icon: React.ReactNode }[] = [
    { key: 'dashboard', label: 'Dashboard Siswa', icon: <LayoutDashboard className="w-4 h-4" /> },
    { key: 'data_siswa', label: 'Data Siswa', icon: <Users className="w-4 h-4" /> },
    { key: 'biodata', label: 'Biodata', icon: <User className="w-4 h-4" /> },
    { key: 'parents', label: 'Orang Tua / Wali', icon: <Heart className="w-4 h-4" /> },
    { key: 'education', label: 'Riwayat Pendidikan', icon: <BookOpen className="w-4 h-4" /> },
    { key: 'mutations', label: 'Mutasi', icon: <ArrowRightLeft className="w-4 h-4" /> },
    { key: 'alumni', label: 'Alumni', icon: <GraduationCap className="w-4 h-4" /> },
    { key: 'achievements', label: 'Prestasi', icon: <Award className="w-4 h-4" /> },
    { key: 'violations', label: 'Pelanggaran', icon: <AlertTriangle className="w-4 h-4" /> },
    { key: 'health', label: 'Kesehatan', icon: <HeartPulse className="w-4 h-4" /> },
    { key: 'documents', label: 'Dokumen', icon: <FileText className="w-4 h-4" /> },
    { key: 'scholarships', label: 'Beasiswa', icon: <DollarSign className="w-4 h-4" /> },
    { key: 'organizations', label: 'Organisasi', icon: <Briefcase className="w-4 h-4" /> },
    { key: 'extracurriculars', label: 'Ekstrakurikuler', icon: <Activity className="w-4 h-4" /> },
    { key: 'counseling', label: 'Konseling BK', icon: <UserCheck className="w-4 h-4" /> },
    { key: 'ai_notes', label: 'Catatan AI', icon: <Brain className="w-4 h-4" /> },
    { key: 'timeline', label: 'Timeline Aktivitas', icon: <Clock className="w-4 h-4" /> },
    { key: 'settings', label: 'Pengaturan', icon: <Settings className="w-4 h-4" /> },
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Module Title Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 text-xs font-black uppercase font-mono">
              Enterprise Module
            </span>
            <span className="text-xs text-slate-400 font-mono">• Single Source of Truth</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white mt-1 tracking-tight">
            Master Data Siswa Enterprise
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Pusat data peserta didik nasional terintegrasi untuk seluruh jenjang pendidikan di Indonesia.
          </p>
        </div>

        {/* Selected Student Quick Info */}
        <div className="flex items-center gap-3 p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700">
          <img
            src={selectedStudent.photoUrl}
            alt={selectedStudent.fullName}
            className="w-10 h-10 rounded-2xl object-cover border border-blue-500"
          />
          <div className="text-xs">
            <strong className="text-slate-900 dark:text-white block font-extrabold truncate max-w-[160px]">
              {selectedStudent.fullName}
            </strong>
            <span className="text-[10px] text-slate-400 font-mono">
              {selectedStudent.className} • NIS: {selectedStudent.nis}
            </span>
          </div>
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-[11px] shadow-sm ml-2"
          >
            Drawer
          </button>
        </div>
      </div>

      {/* Sub-Tab Navigation Bar */}
      <div className="bg-white dark:bg-slate-900 p-2 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-x-auto">
        <div className="flex items-center gap-1.5 min-w-max p-1">
          {menuItems.map((item) => {
            const isActive = activeTab === item.key;
            return (
              <button
                key={item.key}
                onClick={() => setActiveTab(item.key)}
                className={`px-3.5 py-2 rounded-2xl text-xs font-bold flex items-center gap-2 transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Sub-Tab Active View Content */}
      <div className="min-h-[500px]">
        {activeTab === 'dashboard' && (
          <DashboardSiswaTab students={students} onNavigateTab={setActiveTab} />
        )}
        {activeTab === 'data_siswa' && (
          <DataSiswaTab
            students={students}
            onSelectStudent={handleSelectStudentAndOpenDrawer}
            onAddStudent={handleAddStudent}
            onUpdateStudent={handleUpdateStudent}
            onDeleteStudent={handleDeleteStudent}
          />
        )}
        {activeTab === 'biodata' && (
          <BiodataLengkapTab
            students={students}
            selectedStudent={selectedStudent}
            onSelectStudent={setSelectedStudent}
            onUpdateStudent={handleUpdateStudent}
          />
        )}
        {activeTab === 'parents' && (
          <OrangTuaWaliTab
            students={students}
            selectedStudent={selectedStudent}
            onSelectStudent={setSelectedStudent}
          />
        )}
        {activeTab === 'education' && (
          <RiwayatPendidikanTab
            students={students}
            selectedStudent={selectedStudent}
            educationHistories={educationHistories}
            onSelectStudent={setSelectedStudent}
          />
        )}
        {activeTab === 'mutations' && (
          <MutasiTab students={students} mutations={mutations} onAddMutation={handleAddMutation} />
        )}
        {activeTab === 'alumni' && <AlumniTab alumniRecords={alumniRecords} />}
        {activeTab === 'achievements' && (
          <PrestasiTab
            students={students}
            achievements={achievements}
            onAddAchievement={handleAddAchievement}
          />
        )}
        {activeTab === 'violations' && (
          <PelanggaranTab
            students={students}
            violations={violations}
            onAddViolation={handleAddViolation}
          />
        )}
        {activeTab === 'health' && (
          <KesehatanTab
            students={students}
            selectedStudent={selectedStudent}
            healthRecords={healthRecords}
            onSelectStudent={setSelectedStudent}
          />
        )}
        {activeTab === 'documents' && (
          <DokumenTab
            students={students}
            selectedStudent={selectedStudent}
            documents={documents}
            onSelectStudent={setSelectedStudent}
            onAddDocument={handleAddDocument}
          />
        )}
        {activeTab === 'scholarships' && <BeasiswaTab scholarships={scholarships} />}
        {activeTab === 'organizations' && <OrganisasiTab organizations={organizations} />}
        {activeTab === 'extracurriculars' && <EkstrakurikulerTab extracurriculars={extracurriculars} />}
        {activeTab === 'counseling' && (
          <KonselingBkTab
            students={students}
            counselings={counselings}
            onAddCounseling={handleAddCounseling}
          />
        )}
        {activeTab === 'ai_notes' && (
          <CatatanAiTab
            students={students}
            selectedStudent={selectedStudent}
            aiNotes={aiNotes}
            onSelectStudent={setSelectedStudent}
            onUpdateAiNotes={handleUpdateAiNotes}
          />
        )}
        {activeTab === 'timeline' && (
          <TimelineAktivitasTab
            students={students}
            selectedStudent={selectedStudent}
            timelines={timelines}
            onSelectStudent={setSelectedStudent}
          />
        )}
        {activeTab === 'settings' && (
          <PengaturanSiswaTab
            students={students}
            selectedStudent={selectedStudent}
            onSelectStudent={setSelectedStudent}
          />
        )}
      </div>

      {/* Drawer Detail Component */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex justify-end">
          <div className="bg-white dark:bg-slate-900 w-full max-w-md h-full shadow-2xl p-6 overflow-y-auto space-y-4 border-l border-slate-200 dark:border-slate-800 text-xs">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="font-black text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <span>Detail Profil Siswa</span>
              </h3>
              <button
                onClick={() => setIsDrawerOpen(false)}
                className="p-1.5 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="text-center space-y-2">
              <img
                src={selectedStudent.photoUrl}
                alt={selectedStudent.fullName}
                className="w-24 h-24 rounded-3xl object-cover mx-auto border-2 border-blue-600 shadow-md"
              />
              <h4 className="font-extrabold text-base text-slate-900 dark:text-white">
                {selectedStudent.fullName}
              </h4>
              <p className="font-mono text-slate-400">
                NIS: {selectedStudent.nis} • NISN: {selectedStudent.nisn}
              </p>
              <span className="inline-block px-3 py-1 rounded-full text-xs font-black bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300">
                {selectedStudent.className} ({selectedStudent.schoolLevel})
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 space-y-2">
              <div className="flex justify-between font-bold">
                <span className="text-slate-400">Status Siswa:</span>
                <span className="text-emerald-600">{selectedStudent.status}</span>
              </div>
              <div className="flex justify-between font-bold">
                <span className="text-slate-400">Rerata Rapor:</span>
                <span className="text-indigo-600 font-mono">{selectedStudent.gpaAverage}</span>
              </div>
              <div className="flex justify-between font-bold">
                <span className="text-slate-400">Kehadiran:</span>
                <span className="text-teal-600 font-mono">{selectedStudent.attendancePercentage}%</span>
              </div>
            </div>

            <div className="space-y-2">
              <button
                onClick={() => {
                  setActiveTab('biodata');
                  setIsDrawerOpen(false);
                }}
                className="w-full py-2.5 rounded-2xl bg-blue-600 text-white font-bold text-center block"
              >
                Buka Biodata Lengkap
              </button>
              <button
                onClick={() => {
                  setActiveTab('ai_notes');
                  setIsDrawerOpen(false);
                }}
                className="w-full py-2.5 rounded-2xl bg-amber-400 text-slate-950 font-extrabold text-center block"
              >
                Lihat Catatan AI Siswa
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
