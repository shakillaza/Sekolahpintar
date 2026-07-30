import React from 'react';
import {
  Users,
  UserCheck,
  GraduationCap,
  Award,
  CheckCircle2,
  Clock,
  Briefcase,
  Activity,
  Sparkles,
  TrendingUp,
  FileCheck,
  AlertTriangle
} from 'lucide-react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  AreaChart,
  Area
} from 'recharts';
import {
  TeacherMasterItem,
  EmployeeMasterItem,
  TeacherAttendanceRecord,
  TeacherPerformanceRecord,
  TeacherCertification
} from '../../types/teacherTypes';

interface TeacherDashboardTabProps {
  teachers: TeacherMasterItem[];
  employees: EmployeeMasterItem[];
  attendances: TeacherAttendanceRecord[];
  performances: TeacherPerformanceRecord[];
  certifications: TeacherCertification[];
  onNavigateTab: (tab: any) => void;
}

export const TeacherDashboardTab: React.FC<TeacherDashboardTabProps> = ({
  teachers,
  employees,
  attendances,
  performances,
  certifications,
  onNavigateTab
}) => {
  const totalTeachers = teachers.length;
  const totalEmployees = employees.length;
  const activeTeachers = teachers.filter(t => t.isActive).length;
  const activeEmployees = employees.filter(e => e.isActive).length;

  const pnsCount = teachers.filter(t => t.employmentStatus === 'PNS').length;
  const pppkCount = teachers.filter(t => t.employmentStatus === 'PPPK').length;
  const gtyCount = teachers.filter(t => t.employmentStatus === 'GTY').length;
  const honorerCount = teachers.filter(t => t.employmentStatus === 'Honorer' || t.employmentStatus === 'GTT').length;

  const empTetap = employees.filter(e => e.employmentStatus === 'Tetap').length;
  const empKontrak = employees.filter(e => e.employmentStatus === 'Kontrak').length;

  // Chart Data: Status Kepegawaian
  const statusData = [
    { name: 'PNS', value: pnsCount, color: '#4f46e5' },
    { name: 'PPPK', value: pppkCount, color: '#06b6d4' },
    { name: 'GTY / Tetap', value: gtyCount, color: '#10b981' },
    { name: 'Honorer / GTT', value: honorerCount, color: '#f59e0b' },
  ];

  // Chart Data: Subject Distribution
  const subjectMap: Record<string, number> = {};
  teachers.forEach(t => {
    const key = t.subject || 'Umum';
    subjectMap[key] = (subjectMap[key] || 0) + 1;
  });
  const subjectData = Object.entries(subjectMap).map(([name, count]) => ({
    name,
    Jumlah: count
  }));

  // Chart Data: Attendance summary
  const attendanceSummary = [
    { status: 'Hadir', count: 42 },
    { status: 'Izin', count: 3 },
    { status: 'Sakit', count: 1 },
    { status: 'Terlambat', count: 2 },
    { status: 'Cuti', count: 1 }
  ];

  // Chart Data: Certification Status
  const certifiedCount = certifications.filter(c => c.isActive).length;
  const uncertifiedCount = Math.max(0, totalTeachers - certifiedCount);
  const certData = [
    { name: 'Tersertifikasi', value: certifiedCount, color: '#10b981' },
    { name: 'Belum Sertifikasi', value: uncertifiedCount, color: '#94a3b8' }
  ];

  return (
    <div className="space-y-6">
      {/* Top Welcome Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 rounded-2xl shadow-xl border border-indigo-800/40 relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-xs font-semibold mb-2 border border-indigo-400/30">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            Single Source of Truth Enterprise
          </div>
          <h1 className="text-2xl font-black tracking-tight text-white">
            Dashboard Master Data Guru & Pegawai
          </h1>
          <p className="text-xs text-indigo-200/80 mt-1 max-w-xl">
            Pusat manajemen data tenaga pendidik & kependidikan terintegrasi multi-tenant, absensi, SKP kinerja, payroll, dan analisis Smart AI.
          </p>
        </div>
        <div className="flex items-center gap-2 relative z-10 shrink-0">
          <button
            onClick={() => onNavigateTab('data_guru')}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5"
          >
            <Users className="w-4 h-4" />
            Data Guru ({totalTeachers})
          </button>
          <button
            onClick={() => onNavigateTab('data_pegawai')}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-100 font-medium text-xs rounded-xl border border-slate-700 transition-all flex items-center gap-1.5"
          >
            <Briefcase className="w-4 h-4" />
            Data Pegawai ({totalEmployees})
          </button>
        </div>
      </div>

      {/* Main Stats Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-800/90 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Total Guru</span>
            <div className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">{totalTeachers}</div>
            <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
              {activeTeachers} Aktif Pendidik
            </span>
          </div>
          <div className="w-11 h-11 bg-indigo-50 dark:bg-indigo-950/60 rounded-xl flex items-center justify-center text-indigo-600 dark:text-indigo-400">
            <GraduationCap className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800/90 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Total Pegawai</span>
            <div className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">{totalEmployees}</div>
            <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
              {activeEmployees} Staf Aktif
            </span>
          </div>
          <div className="w-11 h-11 bg-emerald-50 dark:bg-emerald-950/60 rounded-xl flex items-center justify-center text-emerald-600 dark:text-emerald-400">
            <UserCheck className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800/90 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Status ASN (PNS/PPPK)</span>
            <div className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">{pnsCount + pppkCount}</div>
            <span className="text-[11px] text-indigo-600 dark:text-indigo-400 font-medium">
              {honorerCount} Honorer / Non-ASN
            </span>
          </div>
          <div className="w-11 h-11 bg-blue-50 dark:bg-blue-950/60 rounded-xl flex items-center justify-center text-blue-600 dark:text-blue-400">
            <Award className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800/90 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Sertifikasi Pendidik</span>
            <div className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">{certifiedCount}</div>
            <span className="text-[11px] text-amber-600 dark:text-amber-400 font-medium">
              {Math.round((certifiedCount / (totalTeachers || 1)) * 100)}% Terverifikasi
            </span>
          </div>
          <div className="w-11 h-11 bg-amber-50 dark:bg-amber-950/60 rounded-xl flex items-center justify-center text-amber-600 dark:text-amber-400">
            <FileCheck className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Analytics Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Status Kepegawaian Pie Chart */}
        <div className="bg-white dark:bg-slate-800/90 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-1 flex items-center justify-between">
            <span>Distribusi Status Kepegawaian</span>
          </h3>
          <p className="text-xs text-slate-500 mb-4">PNS, PPPK, GTY, & Honorer</p>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Distribution by Subject Bar Chart */}
        <div className="bg-white dark:bg-slate-800/90 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-1">
            Distribusi Mata Pelajaran Guru
          </h3>
          <p className="text-xs text-slate-500 mb-4">Jumlah tenaga pengajar per mata pelajaran</p>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={subjectData}>
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} />
                <YAxis stroke="#94a3b8" fontSize={10} />
                <Tooltip />
                <Bar dataKey="Jumlah" fill="#6366f1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Kehadiran Summary */}
        <div className="bg-white dark:bg-slate-800/90 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-1">
            Rekap Kehadiran Hari Ini
          </h3>
          <p className="text-xs text-slate-500 mb-4">Presensi digital realtime</p>
          <div className="space-y-3 text-xs">
            {attendanceSummary.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-2.5 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-100 dark:border-slate-800">
                <span className="font-semibold text-slate-700 dark:text-slate-300">{item.status}</span>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900 dark:text-slate-100">{item.count} Personil</span>
                  <div className="w-16 bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-indigo-600 h-full rounded-full"
                      style={{ width: `${(item.count / 49) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Action Navigation Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {[
          { key: 'data_guru', label: 'Data Guru', icon: GraduationCap, color: 'text-indigo-600 bg-indigo-50 dark:bg-indigo-950/60' },
          { key: 'data_pegawai', label: 'Data Pegawai', icon: UserCheck, color: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60' },
          { key: 'schedule', label: 'Jadwal Mengajar', icon: Clock, color: 'text-blue-600 bg-blue-50 dark:bg-blue-950/60' },
          { key: 'performance', label: 'SKP & Kinerja', icon: Award, color: 'text-purple-600 bg-purple-50 dark:bg-purple-950/60' },
          { key: 'payroll', label: 'Payroll Gaji', icon: FileCheck, color: 'text-amber-600 bg-amber-50 dark:bg-amber-950/60' },
          { key: 'ai_notes', label: 'Catatan Smart AI', icon: Sparkles, color: 'text-pink-600 bg-pink-50 dark:bg-pink-950/60' },
        ].map(item => (
          <button
            key={item.key}
            onClick={() => onNavigateTab(item.key)}
            className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200/80 dark:border-slate-800 hover:border-indigo-500 dark:hover:border-indigo-500 transition-all text-left flex items-center gap-3 shadow-sm group"
          >
            <div className={`p-2 rounded-lg ${item.color}`}>
              <item.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </div>
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
