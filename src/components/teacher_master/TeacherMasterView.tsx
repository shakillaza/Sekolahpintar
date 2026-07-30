import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  LayoutDashboard,
  GraduationCap,
  UserCheck,
  Users,
  Award,
  Briefcase,
  Clock,
  Calendar,
  TrendingUp,
  BookOpen,
  Trophy,
  ShieldAlert,
  FileText,
  DollarSign,
  Sparkles,
  Activity,
  Settings,
  Printer,
  ChevronRight,
  Shield,
  Search,
  Plus,
  Filter
} from 'lucide-react';
import {
  TeacherSubTab,
  TeacherMasterItem,
  EmployeeMasterItem,
  TeacherBiodataItem,
  TeacherEducationHistory,
  TeacherCertification,
  TeacherAssignment,
  TeacherSchedule,
  TeacherAttendanceRecord,
  TeacherPerformanceRecord,
  TeacherProfessionalDev,
  TeacherAchievementRecord,
  TeacherViolationRecord,
  TeacherDocumentRecord,
  TeacherPayrollProfile,
  TeacherAiNote,
  TeacherTimelineEvent
} from '../../types/teacherTypes';

import {
  initialTeachers,
  initialEmployees,
  initialBiodataRecords,
  initialTeacherEducations,
  initialCertifications,
  initialAssignments,
  initialTeacherSchedules,
  initialTeacherAttendance,
  initialTeacherPerformance,
  initialTeacherProfDev,
  initialTeacherAchievements,
  initialTeacherViolations,
  initialTeacherDocuments,
  initialTeacherPayrolls,
  initialTeacherAiNotes,
  initialTeacherTimelines
} from '../../data/initialTeacherData';

import { TeacherDashboardTab } from './TeacherDashboardTab';
import { TeacherDataTab } from './TeacherDataTab';
import { EmployeeDataTab } from './EmployeeDataTab';
import { TeacherBiodataTab } from './TeacherBiodataTab';
import { TeacherEducationTab } from './TeacherEducationTab';
import { TeacherCertificationTab } from './TeacherCertificationTab';
import { TeacherAssignmentTab } from './TeacherAssignmentTab';
import { TeacherScheduleTab } from './TeacherScheduleTab';
import { TeacherAttendanceTab } from './TeacherAttendanceTab';
import { TeacherPerformanceTab } from './TeacherPerformanceTab';
import { TeacherProfDevTab } from './TeacherProfDevTab';
import { TeacherAchievementTab } from './TeacherAchievementTab';
import { TeacherViolationTab } from './TeacherViolationTab';
import { TeacherDocumentTab } from './TeacherDocumentTab';
import { TeacherPayrollTab } from './TeacherPayrollTab';
import { TeacherAiNotesTab } from './TeacherAiNotesTab';
import { TeacherTimelineTab } from './TeacherTimelineTab';
import { TeacherSettingsTab } from './TeacherSettingsTab';
import { TeacherDetailDrawer } from './TeacherDetailDrawer';
import { IdCardModal } from './IdCardModal';

export const TeacherMasterView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TeacherSubTab>('dashboard');

  // Master State
  const [teachers, setTeachers] = useState<TeacherMasterItem[]>(initialTeachers);
  const [employees, setEmployees] = useState<EmployeeMasterItem[]>(initialEmployees);
  const [biodataList, setBiodataList] = useState<TeacherBiodataItem[]>(initialBiodataRecords);
  const [educations, setEducations] = useState<TeacherEducationHistory[]>(initialTeacherEducations);
  const [certifications, setCertifications] = useState<TeacherCertification[]>(initialCertifications);
  const [assignments, setAssignments] = useState<TeacherAssignment[]>(initialAssignments);
  const [schedules, setSchedules] = useState<TeacherSchedule[]>(initialTeacherSchedules);
  const [attendances, setAttendances] = useState<TeacherAttendanceRecord[]>(initialTeacherAttendance);
  const [performances, setPerformances] = useState<TeacherPerformanceRecord[]>(initialTeacherPerformance);
  const [profDevs, setProfDevs] = useState<TeacherProfessionalDev[]>(initialTeacherProfDev);
  const [achievements, setAchievements] = useState<TeacherAchievementRecord[]>(initialTeacherAchievements);
  const [violations, setViolations] = useState<TeacherViolationRecord[]>(initialTeacherViolations);
  const [documents, setDocuments] = useState<TeacherDocumentRecord[]>(initialTeacherDocuments);
  const [payrolls, setPayrolls] = useState<TeacherPayrollProfile[]>(initialTeacherPayrolls);
  const [aiNotes, setAiNotes] = useState<TeacherAiNote[]>(initialTeacherAiNotes);
  const [timelines, setTimelines] = useState<TeacherTimelineEvent[]>(initialTeacherTimelines);

  // Drawer & Modal State
  const [selectedItem, setSelectedItem] = useState<TeacherMasterItem | EmployeeMasterItem | null>(null);
  const [idCardItem, setIdCardItem] = useState<TeacherMasterItem | EmployeeMasterItem | null>(null);

  // Handlers
  const handleAddTeacher = (newTeacher: TeacherMasterItem) => {
    setTeachers([newTeacher, ...teachers]);
  };

  const handleEditTeacher = (updatedTeacher: TeacherMasterItem) => {
    setTeachers(teachers.map(t => t.id === updatedTeacher.id ? updatedTeacher : t));
  };

  const handleDeleteTeacher = (id: string) => {
    setTeachers(teachers.filter(t => t.id !== id));
  };

  const handleAddEmployee = (newEmployee: EmployeeMasterItem) => {
    setEmployees([newEmployee, ...employees]);
  };

  const handleEditEmployee = (updatedEmployee: EmployeeMasterItem) => {
    setEmployees(employees.map(e => e.id === updatedEmployee.id ? updatedEmployee : e));
  };

  const handleDeleteEmployee = (id: string) => {
    setEmployees(employees.filter(e => e.id !== id));
  };

  const navMenuItems: { id: TeacherSubTab; label: string; icon: React.ElementType }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'data_guru', label: 'Data Guru', icon: GraduationCap },
    { id: 'data_pegawai', label: 'Data Pegawai', icon: UserCheck },
    { id: 'biodata', label: 'Biodata', icon: Users },
    { id: 'education', label: 'Riwayat Pendidikan', icon: GraduationCap },
    { id: 'certifications', label: 'Sertifikasi', icon: Award },
    { id: 'assignments', label: 'Jabatan & Penugasan', icon: Briefcase },
    { id: 'schedule', label: 'Jadwal Mengajar', icon: Clock },
    { id: 'attendance', label: 'Absensi', icon: Calendar },
    { id: 'performance', label: 'Kinerja (SKP)', icon: TrendingUp },
    { id: 'prof_dev', label: 'Pengembangan Profesi', icon: BookOpen },
    { id: 'achievements', label: 'Prestasi', icon: Trophy },
    { id: 'violations', label: 'Pelanggaran', icon: ShieldAlert },
    { id: 'documents', label: 'Dokumen', icon: FileText },
    { id: 'payroll', label: 'Payroll Profile', icon: DollarSign },
    { id: 'ai_notes', label: 'Catatan AI', icon: Sparkles },
    { id: 'timeline', label: 'Timeline Aktivitas', icon: Activity },
    { id: 'settings', label: 'Pengaturan & ID Card', icon: Settings },
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header & Breadcrumb */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400 mb-1">
            <span>Master Data</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span>Guru & Pegawai Enterprise</span>
          </div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
            Master Data Guru & Pegawai Enterprise + Smart AI
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Single Source of Truth untuk seluruh data Pendidik, Staf Kependidikan, SKP, Presensi, Payroll & AI Assistant.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 rounded-full text-xs font-bold border border-emerald-300 dark:border-emerald-800">
            Multi-School Enterprise Ready
          </span>
          <button
            onClick={() => setIdCardItem(teachers[0] || null)}
            className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs rounded-xl shadow-md transition-colors flex items-center gap-1.5"
          >
            <Printer className="w-4 h-4" />
            Cetak ID Card Guru
          </button>
        </div>
      </div>

      {/* Main Sub Navigation Bar */}
      <div className="bg-white dark:bg-slate-900 p-2 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-x-auto flex items-center gap-1 scrollbar-none">
        {navMenuItems.map((item) => {
          const isActive = activeTab === item.id;
          const isAiTab = item.id === 'ai_notes';
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                isActive
                  ? isAiTab
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'bg-indigo-600 text-white shadow-md'
                  : isAiTab
                  ? 'text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-950/40'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <item.icon className={`w-4 h-4 ${isAiTab && !isActive ? 'animate-pulse text-purple-500' : ''}`} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Active Sub Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        {activeTab === 'dashboard' && (
          <TeacherDashboardTab
            teachers={teachers}
            employees={employees}
            attendances={attendances}
            performances={performances}
            certifications={certifications}
            onNavigateTab={(tab) => setActiveTab(tab)}
          />
        )}

        {activeTab === 'data_guru' && (
          <TeacherDataTab
            teachers={teachers}
            onSelectTeacher={(t) => setSelectedItem(t)}
            onPrintIdCard={(t) => setIdCardItem(t)}
            onAddTeacher={handleAddTeacher}
            onEditTeacher={handleEditTeacher}
            onDeleteTeacher={handleDeleteTeacher}
          />
        )}

        {activeTab === 'data_pegawai' && (
          <EmployeeDataTab
            employees={employees}
            onSelectEmployee={(e) => setSelectedItem(e)}
            onPrintIdCard={(e) => setIdCardItem(e)}
            onAddEmployee={handleAddEmployee}
            onEditEmployee={handleEditEmployee}
            onDeleteEmployee={handleDeleteEmployee}
          />
        )}

        {activeTab === 'biodata' && (
          <TeacherBiodataTab
            teachers={teachers}
            biodataList={biodataList}
          />
        )}

        {activeTab === 'education' && (
          <TeacherEducationTab
            teachers={teachers}
            educations={educations}
            onAddEducation={(edu) => setEducations([edu, ...educations])}
          />
        )}

        {activeTab === 'certifications' && (
          <TeacherCertificationTab
            certifications={certifications}
            teachers={teachers}
          />
        )}

        {activeTab === 'assignments' && (
          <TeacherAssignmentTab
            assignments={assignments}
            teachers={teachers}
          />
        )}

        {activeTab === 'schedule' && (
          <TeacherScheduleTab
            schedules={schedules}
            teachers={teachers}
          />
        )}

        {activeTab === 'attendance' && (
          <TeacherAttendanceTab
            attendances={attendances}
          />
        )}

        {activeTab === 'performance' && (
          <TeacherPerformanceTab
            performances={performances}
          />
        )}

        {activeTab === 'prof_dev' && (
          <TeacherProfDevTab
            profDevs={profDevs}
          />
        )}

        {activeTab === 'achievements' && (
          <TeacherAchievementTab
            achievements={achievements}
          />
        )}

        {activeTab === 'violations' && (
          <TeacherViolationTab
            violations={violations}
          />
        )}

        {activeTab === 'documents' && (
          <TeacherDocumentTab
            documents={documents}
            teachers={teachers}
          />
        )}

        {activeTab === 'payroll' && (
          <TeacherPayrollTab
            payrolls={payrolls}
          />
        )}

        {activeTab === 'ai_notes' && (
          <TeacherAiNotesTab
            aiNotes={aiNotes}
            teachers={teachers}
          />
        )}

        {activeTab === 'timeline' && (
          <TeacherTimelineTab
            timelines={timelines}
          />
        )}

        {activeTab === 'settings' && (
          <TeacherSettingsTab
            teachers={teachers}
            employees={employees}
            onOpenIdCardPrinter={() => setIdCardItem(teachers[0] || null)}
          />
        )}
      </motion.div>

      {/* Detail Drawer */}
      <TeacherDetailDrawer
        item={selectedItem}
        biodata={selectedItem ? biodataList.find(b => b.teacherId === selectedItem.id) : undefined}
        educations={selectedItem ? educations.filter(e => e.teacherId === selectedItem.id) : []}
        certifications={selectedItem ? certifications.filter(c => c.teacherId === selectedItem.id) : []}
        assignments={selectedItem ? assignments.filter(a => a.teacherId === selectedItem.id) : []}
        schedules={selectedItem ? schedules.filter(s => s.teacherId === selectedItem.id) : []}
        attendances={selectedItem ? attendances.filter(a => a.teacherId === selectedItem.id) : []}
        performance={selectedItem ? performances.find(p => p.teacherId === selectedItem.id) : undefined}
        profDevs={selectedItem ? profDevs.filter(p => p.teacherId === selectedItem.id) : []}
        achievements={selectedItem ? achievements.filter(a => a.teacherId === selectedItem.id) : []}
        documents={selectedItem ? documents.filter(d => d.teacherId === selectedItem.id) : []}
        payroll={selectedItem ? payrolls.find(p => p.teacherId === selectedItem.id) : undefined}
        aiNote={selectedItem ? aiNotes.find(a => a.teacherId === selectedItem.id) : undefined}
        onClose={() => setSelectedItem(null)}
        onPrintIdCard={(itemToPrint) => setIdCardItem(itemToPrint)}
      />

      {/* ID Card Printer Modal */}
      <IdCardModal
        item={idCardItem}
        onClose={() => setIdCardItem(null)}
      />
    </div>
  );
};
