import React from 'react';
import { useApp } from '../../../context/AppContext';
import {
  UserCheck,
  Award,
  CreditCard,
  FileText,
  Send,
  Sparkles,
  Zap
} from 'lucide-react';

export const QuickActions: React.FC = () => {
  const { addToast, setIsAiModalOpen, t } = useApp();

  const actions = [
    {
      id: 'attendance',
      titleKey: 'actionAttendance',
      desc: 'Absensi QR / Tap Kartu',
      icon: UserCheck,
      color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
      handler: () => addToast('info', 'Absensi Harian', 'Form pencatatan absensi dibuka.'),
    },
    {
      id: 'grades',
      titleKey: 'actionGrades',
      desc: 'Asesmen Kurikulum',
      icon: Award,
      color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
      handler: () => addToast('info', 'Input Nilai', 'Form modul penilaian disiapkan.'),
    },
    {
      id: 'payment',
      titleKey: 'actionPayment',
      desc: 'Kwitansi & Tagihan',
      icon: CreditCard,
      color: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
      handler: () => addToast('success', 'Pembayaran SPP', 'Kwitansi digital diterbitkan.'),
    },
    {
      id: 'letter',
      titleKey: 'actionLetter',
      desc: 'Persuratan Digital',
      icon: FileText,
      color: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20',
      handler: () => addToast('info', 'Surat TU', 'Template surat dinas disiapkan.'),
    },
    {
      id: 'broadcast',
      titleKey: 'actionBroadcast',
      desc: 'WA Gateway Ortu',
      icon: Send,
      color: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20',
      handler: () => addToast('success', 'Pengumuman WA', 'Pesan terschedule ke 850 orang tua.'),
    },
    {
      id: 'aireport',
      titleKey: 'actionAiReport',
      desc: 'Asisten AI Gemini',
      icon: Sparkles,
      color: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20',
      handler: () => setIsAiModalOpen(true),
    },
  ];

  return (
    <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-amber-500" />
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            {t('quickActions')}
          </h3>
        </div>
        <span className="text-[10px] text-slate-400">Jalan Pintas Cepat</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {actions.map((act) => {
          const Icon = act.icon;
          return (
            <button
              key={act.id}
              onClick={act.handler}
              className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 hover:bg-white dark:hover:bg-slate-800 hover:border-blue-500/50 hover:shadow-md transition-all text-left group"
            >
              <div className={`p-2 rounded-xl border w-fit mb-2 ${act.color}`}>
                <Icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">
                {t(act.titleKey)}
              </h4>
              <p className="text-[10px] text-slate-400 mt-0.5 truncate">{act.desc}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
};
