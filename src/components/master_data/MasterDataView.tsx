import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  MasterDataType,
  StudentMaster,
  TeacherMaster,
  SchoolMaster,
  ClassroomMaster,
  SubjectMaster,
  FacilityMaster
} from '../../types';
import {
  initialStudents,
  initialTeachers,
  initialSchoolsMaster,
  initialClassrooms,
  initialSubjects,
  initialFacilities
} from '../../data/initialMasterData';
import { RBACGuard } from './RBACGuard';
import { StudentsTab } from './tabs/StudentsTab';
import { TeachersTab } from './tabs/TeachersTab';
import { SchoolsTab } from './tabs/SchoolsTab';
import { ClassesTab } from './tabs/ClassesTab';
import { SubjectsTab } from './tabs/SubjectsTab';
import { FacilitiesTab } from './tabs/FacilitiesTab';
import { MasterDataModal } from './modals/MasterDataModal';
import { AIAuditModal } from './AIAuditModal';
import {
  GraduationCap,
  User,
  Building2,
  Layers,
  BookOpen,
  DoorOpen,
  Plus,
  Search,
  FileSpreadsheet,
  Download,
  Sparkles,
  Database,
  CheckCircle2,
  Filter
} from 'lucide-react';

export const MasterDataView: React.FC = () => {
  const { t, addToast, currentRole } = useApp();

  // Active Tab State
  const [activeTab, setActiveTab] = useState<MasterDataType>('siswa');
  const [searchQuery, setSearchQuery] = useState('');

  // Datasets State
  const [students, setStudents] = useState<StudentMaster[]>(initialStudents);
  const [teachers, setTeachers] = useState<TeacherMaster[]>(initialTeachers);
  const [schools, setSchools] = useState<SchoolMaster[]>(initialSchoolsMaster);
  const [classrooms, setClassrooms] = useState<ClassroomMaster[]>(initialClassrooms);
  const [subjects, setSubjects] = useState<SubjectMaster[]>(initialSubjects);
  const [facilities, setFacilities] = useState<FacilityMaster[]>(initialFacilities);

  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState<any>(null);
  const [isAiAuditOpen, setIsAiAuditOpen] = useState(false);

  // Add / Edit Record Handlers
  const handleOpenAddModal = () => {
    setEditingRecord(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (record: any) => {
    setEditingRecord(record);
    setIsModalOpen(true);
  };

  const handleSaveRecord = (record: any) => {
    if (activeTab === 'siswa') {
      if (editingRecord) {
        setStudents((prev) => prev.map((item) => (item.id === record.id ? record : item)));
        addToast('success', 'Data Disimpan', `Siswa ${record.name} berhasil diperbarui.`);
      } else {
        setStudents((prev) => [record, ...prev]);
        addToast('success', 'Siswa Ditambahkan', `Siswa ${record.name} berhasil ditambahkan.`);
      }
    } else if (activeTab === 'guru') {
      if (editingRecord) {
        setTeachers((prev) => prev.map((item) => (item.id === record.id ? record : item)));
        addToast('success', 'Data Disimpan', `Guru/Staf ${record.name} berhasil diperbarui.`);
      } else {
        setTeachers((prev) => [record, ...prev]);
        addToast('success', 'Guru Ditambahkan', `Guru/Staf ${record.name} berhasil ditambahkan.`);
      }
    } else if (activeTab === 'sekolah') {
      if (editingRecord) {
        setSchools((prev) => prev.map((item) => (item.id === record.id ? record : item)));
        addToast('success', 'Data Disimpan', `Unit Sekolah ${record.name} berhasil diperbarui.`);
      } else {
        setSchools((prev) => [record, ...prev]);
        addToast('success', 'Sekolah Ditambahkan', `Unit Sekolah ${record.name} berhasil ditambahkan.`);
      }
    } else if (activeTab === 'kelas') {
      if (editingRecord) {
        setClassrooms((prev) => prev.map((item) => (item.id === record.id ? record : item)));
        addToast('success', 'Data Disimpan', `Kelas ${record.name} berhasil diperbarui.`);
      } else {
        setClassrooms((prev) => [record, ...prev]);
        addToast('success', 'Kelas Ditambahkan', `Kelas ${record.name} berhasil ditambahkan.`);
      }
    } else if (activeTab === 'mapel') {
      if (editingRecord) {
        setSubjects((prev) => prev.map((item) => (item.id === record.id ? record : item)));
        addToast('success', 'Data Disimpan', `Mata Pelajaran ${record.name} berhasil diperbarui.`);
      } else {
        setSubjects((prev) => [record, ...prev]);
        addToast('success', 'Mapel Ditambahkan', `Mata Pelajaran ${record.name} berhasil ditambahkan.`);
      }
    } else if (activeTab === 'gedung') {
      if (editingRecord) {
        setFacilities((prev) => prev.map((item) => (item.id === record.id ? record : item)));
        addToast('success', 'Data Disimpan', `Ruangan ${record.name} berhasil diperbarui.`);
      } else {
        setFacilities((prev) => [record, ...prev]);
        addToast('success', 'Ruangan Ditambahkan', `Ruangan ${record.name} berhasil ditambahkan.`);
      }
    }
  };

  // Delete Record Handlers
  const handleDeleteRecord = (id: string) => {
    if (activeTab === 'siswa') {
      setStudents((prev) => prev.filter((item) => item.id !== id));
      addToast('info', 'Data Dihapus', 'Data siswa berhasil dihapus.');
    } else if (activeTab === 'guru') {
      setTeachers((prev) => prev.filter((item) => item.id !== id));
      addToast('info', 'Data Dihapus', 'Data guru/staf berhasil dihapus.');
    } else if (activeTab === 'sekolah') {
      setSchools((prev) => prev.filter((item) => item.id !== id));
      addToast('info', 'Data Dihapus', 'Data unit sekolah berhasil dihapus.');
    } else if (activeTab === 'kelas') {
      setClassrooms((prev) => prev.filter((item) => item.id !== id));
      addToast('info', 'Data Dihapus', 'Data kelas berhasil dihapus.');
    } else if (activeTab === 'mapel') {
      setSubjects((prev) => prev.filter((item) => item.id !== id));
      addToast('info', 'Data Dihapus', 'Data mata pelajaran berhasil dihapus.');
    } else if (activeTab === 'gedung') {
      setFacilities((prev) => prev.filter((item) => item.id !== id));
      addToast('info', 'Data Dihapus', 'Data ruangan berhasil dihapus.');
    }
  };

  // Import CSV Simulation
  const handleImportCsv = () => {
    addToast(
      'success',
      'Impor CSV Berhasil',
      '25 Record data master baru berhasil diimpor dan disinkronkan ke database.'
    );
  };

  // Export CSV Simulation
  const handleExportCsv = () => {
    const filename = `master_data_${activeTab}_${Date.now()}.csv`;
    addToast('info', 'Ekspor Data CSV', `File ${filename} telah diunduh.`);
  };

  // Tab Item List
  const tabs: { id: MasterDataType; labelKey: string; icon: React.ElementType; count: number }[] = [
    { id: 'siswa', labelKey: 'tabStudents', icon: GraduationCap, count: students.length },
    { id: 'guru', labelKey: 'tabTeachers', icon: User, count: teachers.length },
    { id: 'sekolah', labelKey: 'tabSchools', icon: Building2, count: schools.length },
    { id: 'kelas', labelKey: 'tabClasses', icon: Layers, count: classrooms.length },
    { id: 'mapel', labelKey: 'tabSubjects', icon: BookOpen, count: subjects.length },
    { id: 'gedung', labelKey: 'tabFacilities', icon: DoorOpen, count: facilities.length },
  ];

  return (
    <RBACGuard>
      <div className="space-y-6 pb-12">
        {/* Header Hero Section */}
        <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white shadow-xl border border-blue-900/40 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
            <Database className="w-64 h-64 text-blue-400" />
          </div>

          <div className="relative z-10 max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-extrabold bg-blue-500/20 text-blue-300 border border-blue-400/30">
              <Database className="w-3.5 h-3.5 text-amber-400" />
              <span>Core School Master Data Engine</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              {t('masterData')}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {t('masterDataSubtitle')} Seluruh data terintegrasi secara modular untuk modul akademik, PPDB, absensi, keuangan, dan AI.
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-slate-200/80 dark:border-slate-800">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setSearchQuery('');
                }}
                className={`flex items-center gap-2 px-4 py-3 rounded-2xl text-xs font-bold transition-all shrink-0 border ${
                  isActive
                    ? 'bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-600/20'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-amber-300' : 'text-slate-400'}`} />
                <span>{t(tab.labelKey)}</span>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${
                    isActive
                      ? 'bg-blue-700 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Toolbar Bar: Search & Action Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('searchMasterPlaceholder')}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setIsAiAuditOpen(true)}
              className="px-3.5 py-2.5 rounded-xl text-xs font-extrabold bg-gradient-to-r from-amber-500/10 to-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30 hover:bg-amber-500/30 transition-all flex items-center gap-1.5"
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>{t('aiAuditData')}</span>
            </button>

            <button
              onClick={handleImportCsv}
              className="px-3.5 py-2.5 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition-all flex items-center gap-1.5"
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-500" />
              <span className="hidden sm:inline">{t('importCsv')}</span>
            </button>

            <button
              onClick={handleExportCsv}
              className="px-3.5 py-2.5 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition-all flex items-center gap-1.5"
            >
              <Download className="w-4 h-4 text-blue-500" />
              <span className="hidden sm:inline">{t('exportCsv')}</span>
            </button>

            <button
              onClick={handleOpenAddModal}
              className="px-4 py-2.5 rounded-xl text-xs font-extrabold bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-600/20 transition-all flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>{t('addNewRecord')}</span>
            </button>
          </div>
        </div>

        {/* Active Tab Component */}
        {activeTab === 'siswa' && (
          <StudentsTab
            students={students}
            searchQuery={searchQuery}
            onEdit={handleOpenEditModal}
            onDelete={handleDeleteRecord}
          />
        )}

        {activeTab === 'guru' && (
          <TeachersTab
            teachers={teachers}
            searchQuery={searchQuery}
            onEdit={handleOpenEditModal}
            onDelete={handleDeleteRecord}
          />
        )}

        {activeTab === 'sekolah' && (
          <SchoolsTab
            schools={schools}
            searchQuery={searchQuery}
            onEdit={handleOpenEditModal}
            onDelete={handleDeleteRecord}
          />
        )}

        {activeTab === 'kelas' && (
          <ClassesTab
            classrooms={classrooms}
            searchQuery={searchQuery}
            onEdit={handleOpenEditModal}
            onDelete={handleDeleteRecord}
          />
        )}

        {activeTab === 'mapel' && (
          <SubjectsTab
            subjects={subjects}
            searchQuery={searchQuery}
            onEdit={handleOpenEditModal}
            onDelete={handleDeleteRecord}
          />
        )}

        {activeTab === 'gedung' && (
          <FacilitiesTab
            facilities={facilities}
            searchQuery={searchQuery}
            onEdit={handleOpenEditModal}
            onDelete={handleDeleteRecord}
          />
        )}

        {/* Master Data CRUD & Validation Modal */}
        <MasterDataModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          type={activeTab}
          initialRecord={editingRecord}
          onSave={handleSaveRecord}
          allStudents={students}
          allTeachers={teachers}
          allSchools={schools}
          allClassrooms={classrooms}
          allSubjects={subjects}
          allFacilities={facilities}
        />

        {/* AI Audit Modal */}
        <AIAuditModal
          isOpen={isAiAuditOpen}
          onClose={() => setIsAiAuditOpen(false)}
          students={students}
          teachers={teachers}
          schools={schools}
          classrooms={classrooms}
          subjects={subjects}
          facilities={facilities}
        />
      </div>
    </RBACGuard>
  );
};
