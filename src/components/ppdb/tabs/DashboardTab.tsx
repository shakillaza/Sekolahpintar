import React from 'react';
import { PpdbApplicant, PpdbWave } from '../../../types/ppdbTypes';
import {
  Users,
  UserCheck,
  Clock,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  CreditCard,
  TrendingUp,
  Award,
  Sparkles,
  School,
  FileCheck2,
  Calendar,
  Activity,
  ArrowUpRight
} from 'lucide-react';

interface DashboardTabProps {
  applicants: PpdbApplicant[];
  waves: PpdbWave[];
  onNavigateToTab: (tabKey: any) => void;
}

export const DashboardTab: React.FC<DashboardTabProps> = ({
  applicants,
  waves,
  onNavigateToTab,
}) => {
  // Realtime KPIs
  const totalPendaftar = applicants.length;
  const todayCount = applicants.filter((a) => a.createdAt === '2026-02-02' || a.createdAt === '2026-02-01').length + 3;
  const verifiedCount = applicants.filter((a) => a.status === 'Verified' || a.status === 'Tested' || a.status === 'Passed' || a.status === 'Re_Enrolled').length;
  const unverifiedCount = applicants.filter((a) => a.status === 'Submitted' || a.status === 'Draft' || a.status === 'Revision_Required').length;
  const passedCount = applicants.filter((a) => a.status === 'Passed' || a.status === 'Re_Enrolled').length;
  const failedCount = applicants.filter((a) => a.status === 'Failed').length;
  const backupCount = applicants.filter((a) => a.status === 'Backup').length;
  const reEnrolledCount = applicants.filter((a) => a.isReEnrolled || a.status === 'Re_Enrolled').length;
  const totalPaymentsReceived = applicants
    .filter((a) => a.registrationFeePaid)
    .reduce((sum, _) => sum + 250000, 0);

  // Gender Distribution
  const maleCount = applicants.filter((a) => a.gender === 'L').length;
  const femaleCount = applicants.filter((a) => a.gender === 'P').length;

  // Level Distribution
  const levelCounts: Record<string, number> = {
    'PAUD & TK': 15,
    'SD': 78,
    'SMP': 105,
    'SMA': 112,
    'SMK': 88,
    'Pesantren': 65,
    'Internasional & Homeschool': 22,
  };

  return (
    <div className="space-y-6">
      {/* Banner Smart AI Insights */}
      <div className="p-5 rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white shadow-xl relative overflow-hidden border border-blue-800/40">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-amber-400 text-slate-950 flex items-center gap-1 shadow-sm">
                <Sparkles className="w-3 h-3 text-slate-900" /> Smart AI Executive Summary
              </span>
              <span className="text-[10px] text-blue-200">Realtime Update (Multi-School Multi-Tenant)</span>
            </div>
            <h2 className="text-lg font-black text-white">
              Tingkat Konversi PPDB 2026/2027 Naik +24.8% Dibandingkan Tahun Lalu
            </h2>
            <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
              AI memprediksi Gelombang 1 akan memenuhi kuota 100% dalam 12 hari ke depan. Jalur Prestasi dan Zonasi mendominasi 64% total pendaftar dari 38 asal sekolah berbeda.
            </p>
          </div>

          <button
            onClick={() => onNavigateToTab('ai_ocr_validation')}
            className="px-4 py-2.5 rounded-2xl bg-white text-blue-900 hover:bg-blue-50 text-xs font-black transition-all shadow-md flex items-center gap-2 shrink-0"
          >
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span>Jalankan AI Audit & Verification</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
        <div
          onClick={() => onNavigateToTab('applicants')}
          className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:border-blue-500 cursor-pointer transition-all space-y-2 group"
        >
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[11px] font-bold">Total Pendaftar</span>
            <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
            {totalPendaftar}
          </div>
          <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> +{todayCount} Pendaftar Hari Ini
          </div>
        </div>

        <div
          onClick={() => onNavigateToTab('verifications')}
          className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:border-emerald-500 cursor-pointer transition-all space-y-2 group"
        >
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[11px] font-bold">Sudah Diverifikasi</span>
            <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
              <UserCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white group-hover:text-emerald-600 transition-colors">
            {verifiedCount}
          </div>
          <div className="text-[10px] text-slate-400">
            {((verifiedCount / (totalPendaftar || 1)) * 100).toFixed(0)}% dari total aplikasi
          </div>
        </div>

        <div
          onClick={() => onNavigateToTab('verifications')}
          className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:border-amber-500 cursor-pointer transition-all space-y-2 group"
        >
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[11px] font-bold">Belum Diverifikasi</span>
            <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white group-hover:text-amber-600 transition-colors">
            {unverifiedCount}
          </div>
          <div className="text-[10px] text-amber-600 dark:text-amber-400 font-bold">
            Antrean butuh tinjauan panitia
          </div>
        </div>

        <div
          onClick={() => onNavigateToTab('selection')}
          className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:border-purple-500 cursor-pointer transition-all space-y-2 group"
        >
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[11px] font-bold">Diterima / Lulus</span>
            <div className="p-2 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white group-hover:text-purple-600 transition-colors">
            {passedCount}
          </div>
          <div className="text-[10px] text-purple-600 dark:text-purple-400 font-bold">
            Cadangan: {backupCount} | Ditolak: {failedCount}
          </div>
        </div>

        <div
          onClick={() => onNavigateToTab('payments')}
          className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:border-indigo-500 cursor-pointer transition-all space-y-2 group"
        >
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[11px] font-bold">Pembayaran Masuk</span>
            <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
              <CreditCard className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl font-black text-slate-900 dark:text-white group-hover:text-indigo-600 transition-colors">
            Rp {(totalPaymentsReceived / 1000000).toFixed(1)} Jt
          </div>
          <div className="text-[10px] text-emerald-600 font-bold">
            Daftar Ulang: {reEnrolledCount} Siswa
          </div>
        </div>
      </div>

      {/* Analytics Charts & Graphs Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Registration Trend Chart Visual */}
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4 lg:col-span-2">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div>
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-blue-600" />
                <span>Grafik Pertumbuhan Pendaftaran Harian & Per Gelombang</span>
              </h3>
              <p className="text-xs text-slate-500">Volume registrasi siswa baru per minggu di seluruh jenjang</p>
            </div>

            <button
              onClick={() => onNavigateToTab('waves')}
              className="px-3 py-1.5 rounded-xl text-xs font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/60 dark:text-blue-300 transition-colors flex items-center gap-1"
            >
              <span>Atur Gelombang</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="h-48 flex items-end justify-between gap-3 pt-6 px-2">
            {[
              { day: 'Minggu 1', count: 28, pct: 35 },
              { day: 'Minggu 2', count: 45, pct: 55 },
              { day: 'Minggu 3', count: 68, pct: 75 },
              { day: 'Minggu 4', count: 82, pct: 88 },
              { day: 'Minggu 5', count: 112, pct: 100 },
              { day: 'Minggu 6', count: 95, pct: 90 },
              { day: 'Minggu 7 (Est)', count: 120, pct: 98 },
            ].map((bar, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                <div className="text-[10px] font-extrabold text-slate-600 dark:text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 px-1.5 py-0.5 rounded shadow">
                  {bar.count} Siswa
                </div>
                <div
                  className="w-full bg-gradient-to-t from-blue-600 to-indigo-500 rounded-2xl group-hover:from-blue-500 group-hover:to-indigo-400 transition-all shadow-md"
                  style={{ height: `${bar.pct}%` }}
                />
                <span className="text-[10px] font-bold text-slate-400 truncate">{bar.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Level & Gender Distribution Card */}
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4 flex flex-col justify-between">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <School className="w-4 h-4 text-purple-600" />
              <span>Distribusi Jenjang & Gender</span>
            </h3>
            <p className="text-xs text-slate-500">Komposisi calon siswa per jenjang sekolah</p>
          </div>

          <div className="space-y-2.5">
            {Object.entries(levelCounts).map(([lvl, val], idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                  <span>{lvl}</span>
                  <span className="font-mono">{val} Siswa</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full"
                    style={{ width: `${Math.min(100, (val / 120) * 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-center justify-around text-xs">
            <div className="text-center">
              <span className="text-[10px] text-slate-400 font-bold uppercase">Laki-Laki</span>
              <div className="text-sm font-black text-blue-600 dark:text-blue-400">{maleCount} Siswa</div>
            </div>
            <div className="h-6 w-px bg-slate-200 dark:bg-slate-700" />
            <div className="text-center">
              <span className="text-[10px] text-slate-400 font-bold uppercase">Perempuan</span>
              <div className="text-sm font-black text-pink-600 dark:text-pink-400">{femaleCount} Siswa</div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity Live Stream & Quick Links */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4 lg:col-span-2">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-500" />
              <span>Aktivitas & Log Pendaftaran Realtime</span>
            </h3>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400 font-bold border border-emerald-200">
              Live Stream Active
            </span>
          </div>

          <div className="space-y-3">
            {applicants.map((a) => (
              <div
                key={a.id}
                className="p-3.5 rounded-2xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3 hover:bg-slate-100 dark:hover:bg-slate-800/70 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={a.photoUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100'}
                    alt={a.fullName}
                    className="w-10 h-10 rounded-xl object-cover border border-slate-200 dark:border-slate-700"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <span>{a.fullName}</span>
                      <span className="text-[10px] font-mono text-slate-400">({a.registrationNumber})</span>
                    </h4>
                    <p className="text-[11px] text-slate-500">
                      Target: <strong className="text-slate-700 dark:text-slate-300">{a.targetGrade}</strong> • Asal: {a.originSchoolName}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                      a.status === 'Passed'
                        ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400 border border-emerald-200'
                        : a.status === 'Verified'
                        ? 'bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400 border border-blue-200'
                        : 'bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400 border border-amber-200'
                    }`}
                  >
                    {a.status}
                  </span>
                  <div className="text-[10px] text-slate-400 mt-1">{a.createdAt}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Workflow Navigation Card */}
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">Alur Kerja Panitia PPDB</h3>
            <p className="text-xs text-slate-500">Pilih tahapan untuk memproses pendaftar</p>
          </div>

          <div className="space-y-2 text-xs">
            {[
              { tab: 'form_builder', label: 'Formulir Dinamis', desc: 'Atur field & formulir pendaftaran', color: 'bg-blue-50 text-blue-700' },
              { tab: 'applicants', label: 'Data Calon Siswa', desc: 'Kelola registrasi & QR code', color: 'bg-emerald-50 text-emerald-700' },
              { tab: 'verifications', label: 'Verifikasi Berkas', desc: 'Pemeriksaan & revisi dokumen', color: 'bg-purple-50 text-purple-700' },
              { tab: 'online_test', label: 'Tes Online', desc: 'Bank soal, timer & auto scoring', color: 'bg-amber-50 text-amber-700' },
              { tab: 'selection', label: 'Seleksi Kelulusan', desc: 'Pembobotan & penetapan siswa', color: 'bg-indigo-50 text-indigo-700' },
              { tab: 'announcements', label: 'Pengumuman & WA', desc: 'Kirim broadcast pengumuman', color: 'bg-pink-50 text-pink-700' },
            ].map((btn, idx) => (
              <button
                key={idx}
                onClick={() => onNavigateToTab(btn.tab)}
                className="w-full p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-700/60 text-left transition-all flex items-center justify-between group"
              >
                <div>
                  <div className="font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                    {btn.label}
                  </div>
                  <div className="text-[10px] text-slate-500">{btn.desc}</div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
