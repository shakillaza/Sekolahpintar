import React from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldAlert, KeyRound, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { UserRole } from '../../types';

interface RBACGuardProps {
  children: React.ReactNode;
}

export const RBACGuard: React.FC<RBACGuardProps> = ({ children }) => {
  const { currentRole, setRole, t } = useApp();

  // Parents and Students do NOT have access to Master Data
  const isRestrictedRole = currentRole === 'orang_tua' || currentRole === 'siswa';

  if (isRestrictedRole) {
    return (
      <div className="p-6 md:p-10 max-w-4xl mx-auto">
        <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-8 shadow-xl relative overflow-hidden text-center space-y-6">
          {/* Subtle Accent Glow */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-to-b from-rose-500/10 via-amber-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />

          {/* Icon Badge */}
          <div className="w-16 h-16 rounded-2xl bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 flex items-center justify-center mx-auto shadow-sm">
            <ShieldAlert className="w-8 h-8" />
          </div>

          <div className="space-y-2 max-w-xl mx-auto">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-extrabold bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 border border-rose-200 dark:border-rose-800">
              {t('accessDeniedTitle')}
            </span>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              Akses Master Data Dibatasi
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              {t('accessDeniedDesc')}
            </p>
          </div>

          {/* RBAC Info Card */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/60 text-left max-w-xl mx-auto space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <KeyRound className="w-4 h-4 text-amber-500" />
              Matriks Hak Akses (RBAC Matrix)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>Super Admin & Yayasan (Full)</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>Kepala Sekolah (Unit Own)</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>Tata Usaha & Operator (Input)</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>Guru & Wali Kelas (Read/Edit)</span>
              </div>
            </div>
          </div>

          {/* Role Switcher Action */}
          <div className="pt-2">
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
              {t('accessDeniedHint')}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <button
                onClick={() => setRole('operator')}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-600/20 transition-all flex items-center gap-1.5"
              >
                <span>Beralih ke Role Operator</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setRole('tata_usaha')}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition-all"
              >
                Beralih ke Tata Usaha
              </button>
              <button
                onClick={() => setRole('kepala_sekolah')}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-500/10 text-amber-700 dark:text-amber-300 hover:bg-amber-500/20 border border-amber-500/30 transition-all"
              >
                Beralih ke Kepala Sekolah
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
