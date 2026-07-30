import React from 'react';
import {
  BookOpen,
  Users,
  Clock,
  Building,
  Calendar,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Layers,
  Award,
  TrendingUp,
  UserCheck,
  ChevronRight,
  FileText,
  Bookmark,
} from 'lucide-react';
import {
  initialAcademicYears,
  initialSemesters,
  initialCurriculums,
  initialSubjects,
  initialClasses,
  initialClassGroups,
  initialAiAnalysis,
  initialLessonSchedules,
} from '../../../data/initialAcademicData';

interface AcademicDashboardTabProps {
  onNavigateTab: (tab: any) => void;
  onOpenAiModal: () => void;
}

export const AcademicDashboardTab: React.FC<AcademicDashboardTabProps> = ({
  onNavigateTab,
  onOpenAiModal,
}) => {
  const activeYear = initialAcademicYears.find((y) => y.status === 'aktif')?.year || '2025/2026';
  const activeSemester = initialSemesters.find((s) => s.status === 'aktif')?.name || 'Genap';

  return (
    <div className="space-y-6">
      {/* Banner Smart AI Academic Assistant */}
      <div className="relative rounded-3xl bg-gradient-to-r from-indigo-900 via-blue-900 to-slate-900 p-6 md:p-8 text-white overflow-hidden shadow-xl border border-indigo-700/40">
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 opacity-15 pointer-events-none">
          <Sparkles className="w-80 h-80 text-cyan-400" />
        </div>
        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 text-xs font-semibold backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Smart AI Academic Scheduler & Analytics v3.4 Active</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              Pusat Kendali Akademik & Kurikulum Terintegrasi
            </h2>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Tahun Ajaran <span className="text-amber-300 font-bold">{activeYear}</span> ({activeSemester}). 
              Sistem telah mengoptimalkan <span className="font-semibold text-white">28 Rombel</span> dan 
              <span className="font-semibold text-white">32 Mata Pelajaran</span> dengan tingkat efisiensi penggunaan ruangan <span className="text-emerald-400 font-bold">88.4%</span>.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenAiModal}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-extrabold text-xs shadow-lg shadow-amber-500/20 flex items-center gap-2 transition-transform active:scale-95"
            >
              <Sparkles className="w-4 h-4" />
              <span>Jalankan AI Smart Scheduler</span>
            </button>
            <button
              onClick={() => onNavigateTab('lesson_schedules')}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/20 backdrop-blur-md transition-colors flex items-center gap-1.5"
            >
              <span>Lihat Jadwal Pelajaran</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Realtime Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {[
          { label: 'Total Kelas', value: initialClasses.length, sub: 'Target 30 Rombel', icon: Layers, color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-950/40' },
          { label: 'Rombongan Belajar', value: initialClassGroups.length, sub: 'Aktif Genap', icon: Users, color: 'text-indigo-600 dark:text-indigo-400', bg: 'bg-indigo-50 dark:bg-indigo-950/40' },
          { label: 'Guru Mengajar', value: 42, sub: '1 Overload Warning', icon: UserCheck, color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-950/40' },
          { label: 'Mata Pelajaran', value: initialSubjects.length, sub: '5 Kelompok Mapel', icon: BookOpen, color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-950/40' },
          { label: 'Total Jam Pelajaran', value: '380 JP', sub: 'Per Minggu', icon: Clock, color: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-50 dark:bg-purple-950/40' },
          { label: 'Ruangan & Lab', value: 24, sub: 'Efficiency 88.4%', icon: Building, color: 'text-cyan-600 dark:text-cyan-400', bg: 'bg-cyan-50 dark:bg-cyan-950/40' },
        ].map((m, idx) => {
          const Icon = m.icon;
          return (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-slate-500 dark:text-slate-400">{m.label}</span>
                <div className={`p-2 rounded-xl ${m.bg}`}>
                  <Icon className={`w-4 h-4 ${m.color}`} />
                </div>
              </div>
              <div className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">{m.value}</div>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">{m.sub}</span>
            </div>
          );
        })}
      </div>

      {/* Main Grid: Jadwal Hari Ini & AI Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Jadwal KBM Hari Ini (Senin) */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Status KBM Hari Ini (Senin)
              </h3>
            </div>
            <button
              onClick={() => onNavigateTab('lesson_schedules')}
              className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
            >
              <span>Lihat Jadwal Lengkap</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-800/60">
            {initialLessonSchedules.slice(0, 5).map((sch) => (
              <div key={sch.id} className="py-3.5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-16 py-1.5 px-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-center shrink-0">
                    <span className="text-[10px] uppercase font-mono font-bold text-slate-500 block">Jam {sch.periodNumber}</span>
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{sch.timeSlot.split(' - ')[0]}</span>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">{sch.subjectName}</h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-2 mt-0.5">
                      <span>{sch.className}</span>
                      <span>•</span>
                      <span>{sch.teacherName}</span>
                    </p>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-semibold bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                    {sch.roomName}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Academic Recommendations & Workload Warnings */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
            <Sparkles className="w-5 h-5" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Rekomendasi AI Akademik
            </h3>
          </div>

          <div className="p-4 rounded-xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/40 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-indigo-950 dark:text-indigo-200">
              <span>Workload Balance Score</span>
              <span className="font-mono text-indigo-600 dark:text-indigo-400">{initialAiAnalysis.workloadDistributionScore}/100</span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
              <div className="bg-indigo-600 h-full rounded-full" style={{ width: `${initialAiAnalysis.workloadDistributionScore}%` }} />
            </div>
          </div>

          <div className="space-y-3">
            {initialAiAnalysis.aiRecommendations.map((rec, i) => (
              <div key={i} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2.5">
                {i === 0 ? (
                  <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                ) : (
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                )}
                <span className="leading-relaxed">{rec}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Action Hub for Sub-Tabs */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
          Akses Cepat Sub-Modul Akademik
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {[
            { id: 'academic_year', label: 'Tahun Ajaran', icon: Calendar, color: 'text-blue-500' },
            { id: 'curriculum', label: 'Kurikulum', icon: Bookmark, color: 'text-indigo-500' },
            { id: 'subjects', label: 'Mata Pelajaran', icon: BookOpen, color: 'text-emerald-500' },
            { id: 'classes', label: 'Kelas & Rombel', icon: Layers, color: 'text-purple-500' },
            { id: 'teaching_assignment', label: 'Pembagian Mengajar', icon: UserCheck, color: 'text-amber-500' },
            { id: 'lesson_schedules', label: 'Jadwal Pelajaran', icon: Clock, color: 'text-cyan-500' },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onNavigateTab(item.id)}
                className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 text-left transition-all group"
              >
                <Icon className={`w-5 h-5 ${item.color} mb-2 group-hover:scale-110 transition-transform`} />
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block truncate">{item.label}</span>
                <span className="text-[10px] text-slate-400 group-hover:text-blue-500 flex items-center gap-0.5 mt-1">
                  Kelola <ChevronRight className="w-3 h-3" />
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
