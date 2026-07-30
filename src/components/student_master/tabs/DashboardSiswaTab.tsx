import React from 'react';
import { StudentMasterItem } from '../../../types/studentTypes';
import {
  Users,
  UserCheck,
  UserPlus,
  ArrowRightLeft,
  GraduationCap,
  TrendingUp,
  Activity,
  Award,
  AlertTriangle,
  HeartPulse,
  PieChart,
  BarChart2,
  Sparkles,
  Calendar,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Building,
  School
} from 'lucide-react';

interface DashboardSiswaTabProps {
  students: StudentMasterItem[];
  onNavigateTab: (tabKey: any) => void;
}

export const DashboardSiswaTab: React.FC<DashboardSiswaTabProps> = ({ students, onNavigateTab }) => {
  const totalStudents = students.length;
  const activeStudents = students.filter((s) => s.status === 'Aktif').length;
  const newStudents = students.filter((s) => s.studentType === 'Siswa Baru').length;
  const transferIn = students.filter((s) => s.studentType === 'Siswa Pindahan').length;
  const males = students.filter((s) => s.gender === 'L').length;
  const females = students.filter((s) => s.gender === 'P').length;

  const avgGpa = (students.reduce((acc, curr) => acc + curr.gpaAverage, 0) / (totalStudents || 1)).toFixed(1);
  const avgAttendance = (students.reduce((acc, curr) => acc + curr.attendancePercentage, 0) / (totalStudents || 1)).toFixed(1);
  const totalAchievements = students.reduce((acc, curr) => acc + curr.totalAchievementPoints, 0);
  const totalViolations = students.reduce((acc, curr) => acc + curr.totalViolationPoints, 0);

  return (
    <div className="space-y-6">
      {/* Top Welcome & AI Headline Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-2xl bg-amber-400 text-slate-950 font-black">
                <Sparkles className="w-5 h-5" />
              </span>
              <h2 className="text-lg font-black tracking-tight">
                Pusat Data Siswa Enterprise & Monitoring Analytics AI
              </h2>
            </div>
            <p className="text-xs text-blue-200">
              Single Source of Truth terintegrasi untuk seluruh jenjang PAUD, SD, SMP, SMA, SMK, & Pesantren.
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="px-3 py-1.5 rounded-2xl bg-blue-800/80 border border-blue-700/60 font-bold text-blue-200 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Data Integrity 100% Valid</span>
            </span>
          </div>
        </div>
      </div>

      {/* Primary KPI Grid (Stat Cards) */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Total Siswa</span>
          <div className="text-xl font-black text-slate-900 dark:text-white font-mono">{totalStudents}</div>
          <span className="text-[10px] text-blue-600 font-bold">Terdaftar System</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Siswa Aktif</span>
          <div className="text-xl font-black text-emerald-600 font-mono">{activeStudents}</div>
          <span className="text-[10px] text-emerald-600 font-bold">Status Aktif KBM</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Siswa Baru</span>
          <div className="text-xl font-black text-blue-600 font-mono">{newStudents}</div>
          <span className="text-[10px] text-blue-500 font-bold">Angkatan 2024/2025</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Siswa Pindahan</span>
          <div className="text-xl font-black text-purple-600 font-mono">{transferIn}</div>
          <span className="text-[10px] text-purple-500 font-bold">Mutasi Masuk</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Alumni</span>
          <div className="text-xl font-black text-amber-600 font-mono">1,240</div>
          <span className="text-[10px] text-amber-500 font-bold">Terdaftar Ikatan Alumni</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Gender (L / P)</span>
          <div className="text-lg font-black text-slate-900 dark:text-white font-mono">{males} / {females}</div>
          <span className="text-[10px] text-slate-500 font-bold">Rasio {Math.round((males/totalStudents)*100)}% : {Math.round((females/totalStudents)*100)}%</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Rerata Rapor</span>
          <div className="text-xl font-black text-indigo-600 font-mono">{avgGpa}</div>
          <span className="text-[10px] text-indigo-500 font-bold">Target &gt; 85.0</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Kehadiran</span>
          <div className="text-xl font-black text-teal-600 font-mono">{avgAttendance}%</div>
          <span className="text-[10px] text-teal-500 font-bold">Tingkat Kehadiran KBM</span>
        </div>
      </div>

      {/* Main Graphics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Distribution Card */}
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-3 flex items-center justify-between">
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <PieChart className="w-4 h-4 text-blue-600" />
              <span>Distribusi Jenjang & Jurusan</span>
            </h3>
            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">Multi-School</span>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <div className="flex justify-between font-bold mb-1">
                <span className="text-slate-700 dark:text-slate-300">SMA / MA (MIPA, IPS, Bahasa)</span>
                <span className="text-blue-600 font-mono">420 Siswa (38%)</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-blue-600 rounded-full" style={{ width: '38%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between font-bold mb-1">
                <span className="text-slate-700 dark:text-slate-300">SMK Vokasi (TKJ, Akuntansi, Otomotif)</span>
                <span className="text-purple-600 font-mono">310 Siswa (28%)</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-purple-600 rounded-full" style={{ width: '28%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between font-bold mb-1">
                <span className="text-slate-700 dark:text-slate-300">SMP / MTs</span>
                <span className="text-emerald-600 font-mono">250 Siswa (23%)</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: '23%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between font-bold mb-1">
                <span className="text-slate-700 dark:text-slate-300">Pesantren & Tahfizh</span>
                <span className="text-amber-600 font-mono">120 Siswa (11%)</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full" style={{ width: '11%' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Academic & Behavior Analytics Card */}
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-3 flex items-center justify-between">
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <BarChart2 className="w-4 h-4 text-emerald-600" />
              <span>Grafik Prestasi & Pelanggaran</span>
            </h3>
            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">Bulan Ini</span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 space-y-1">
              <div className="flex items-center gap-1.5 text-emerald-800 dark:text-emerald-300 font-extrabold">
                <Award className="w-4 h-4 text-emerald-600" />
                <span>Total Poin Prestasi</span>
              </div>
              <div className="text-xl font-black text-emerald-600 font-mono">+{totalAchievements} Pts</div>
              <p className="text-[10px] text-slate-500">28 Penghargaan Terdaftar</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-rose-50/70 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 space-y-1">
              <div className="flex items-center gap-1.5 text-rose-800 dark:text-rose-300 font-extrabold">
                <AlertTriangle className="w-4 h-4 text-rose-600" />
                <span>Poin Pelanggaran</span>
              </div>
              <div className="text-xl font-black text-rose-600 font-mono">{totalViolations} Pts</div>
              <p className="text-[10px] text-slate-500">2 Kasus Dalam Pembinaan BK</p>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 text-xs space-y-2">
            <div className="flex items-center justify-between font-bold">
              <span className="text-slate-700 dark:text-slate-300 flex items-center gap-1">
                <HeartPulse className="w-3.5 h-3.5 text-rose-500" /> Indeks Kesehatan Fisik Siswa
              </span>
              <span className="text-emerald-600 font-mono">94.8% Sehat</span>
            </div>
            <p className="text-[11px] text-slate-500">
              Hasil screening kesehatan rutin: 98% siswa memiliki imunisasi lengkap dan kondisi prima.
            </p>
          </div>
        </div>

        {/* Quick Shortcuts & AI Alert Widget */}
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-3 flex items-center justify-between">
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Aksi Cepat & AI Early Warning</span>
            </h3>
          </div>

          <div className="space-y-2 text-xs">
            <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-amber-900 dark:text-amber-200 block font-extrabold">1 Siswa Perlu Perhatian BK</strong>
                <p className="text-[11px] text-amber-700 dark:text-amber-300">
                  Rizky Ramadhan (XII TKJ 1) terdeteksi pola sering keterlambatan masuk kelas.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                onClick={() => onNavigateTab('data_siswa')}
                className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 text-slate-800 dark:text-slate-200 font-bold text-left transition-all border border-slate-200/60 dark:border-slate-700/60"
              >
                <Users className="w-4 h-4 text-blue-600 mb-1" />
                <span>Kelola Data Siswa</span>
              </button>
              <button
                onClick={() => onNavigateTab('counseling')}
                className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 text-slate-800 dark:text-slate-200 font-bold text-left transition-all border border-slate-200/60 dark:border-slate-700/60"
              >
                <Activity className="w-4 h-4 text-purple-600 mb-1" />
                <span>Konseling BK</span>
              </button>
              <button
                onClick={() => onNavigateTab('achievements')}
                className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 text-slate-800 dark:text-slate-200 font-bold text-left transition-all border border-slate-200/60 dark:border-slate-700/60"
              >
                <Award className="w-4 h-4 text-emerald-600 mb-1" />
                <span>Input Prestasi</span>
              </button>
              <button
                onClick={() => onNavigateTab('ai_notes')}
                className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 text-slate-800 dark:text-slate-200 font-bold text-left transition-all border border-slate-200/60 dark:border-slate-700/60"
              >
                <Sparkles className="w-4 h-4 text-amber-500 mb-1" />
                <span>Laporan AI Siswa</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
