import React, { useState } from 'react';
import { RefreshCw, CheckCircle2, Server, Database, ArrowUpRight } from 'lucide-react';

export const AcademicSyncTab: React.FC = () => {
  const [isSyncing, setIsSyncing] = useState(false);

  const handleSync = (target: string) => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      alert(`✅ Sinkronisasi otomatis data Akademik dengan ${target} berhasil!`);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <RefreshCw className="w-5 h-5 text-blue-600" />
            <span>Sinkronisasi Data Akademik Enterprise</span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Integrasi REST API real-time ke Dapodik Kemdikbud, EMIS Kemenag, LMS Moodle, & Sistem Yayasan.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { name: 'Kemdikbud Dapodik Server v2026', desc: 'Sinkronisasi Rombel, Kurikulum, Pembagian Jam Guru, dan Jadwal KBM', status: 'Terhubung (Realtime REST API)', target: 'Dapodik' },
          { name: 'Kemenag EMIS System 4.0', desc: 'Integrasi Kurikulum Pesantren, Madrasah, dan Data Jam Mengajar Ustadz', status: 'Terhubung (OAuth 2.0)', target: 'EMIS Kemenag' },
          { name: 'LMS E-Learning Moodle / Google Classroom', desc: 'Auto-provisioning Rombel dan Enrolment Siswa & Guru Pengampu', status: 'Terintegrasi Webhook', target: 'LMS Platform' },
          { name: 'Kementerian Riset & Perguruan Tinggi', desc: 'Portal SNPMB / SNBP untuk Rekap Rapor Akademik Siswa Tingkat Akhir', status: 'Terhubung API SNPMB', target: 'Portal SNPMB' },
        ].map((item, idx) => (
          <div key={idx} className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900 dark:text-white">{item.name}</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
                {item.status}
              </span>
            </div>
            <p className="text-xs text-slate-500">{item.desc}</p>
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-end">
              <button
                onClick={() => handleSync(item.target)}
                disabled={isSyncing}
                className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
                <span>Sync Sekarang</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
