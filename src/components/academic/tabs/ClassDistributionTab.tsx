import React from 'react';
import { ArrowRight, Sparkles, RefreshCw, Layers, CheckCircle } from 'lucide-react';

export const ClassDistributionTab: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span>Pembagian & Kenaikan Kelas</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300">
              Auto-Distributor AI
            </span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Fungsi kenaikan kelas otomatis, pemindahan rombel, dan penataan ulang berbasis performa.
          </p>
        </div>
        <button className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-extrabold text-xs flex items-center gap-2 shadow-md">
          <Sparkles className="w-4 h-4" />
          <span>Jalankan Auto-Kenaikan Kelas AI</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-4">
          <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 flex items-center justify-center font-bold">
            01
          </div>
          <h4 className="text-base font-bold text-slate-900 dark:text-white">
            Kenaikan Kelas Otomatis
          </h4>
          <p className="text-xs text-slate-500 leading-relaxed">
            Sistem memindahkan seluruh siswa kelas X & XI yang tuntas nilai ke tingkat berikutnya secara kolektif.
          </p>
          <button className="w-full py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-800 dark:text-slate-200 hover:bg-slate-200">
            Proses Kenaikan
          </button>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-4">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 flex items-center justify-center font-bold">
            02
          </div>
          <h4 className="text-base font-bold text-slate-900 dark:text-white">
            Pindah Rombel / Peminatan
          </h4>
          <p className="text-xs text-slate-500 leading-relaxed">
            Pindahan individu siswa antar rombel atau perpindahan peminatan jurusan dengan rekam riwayat mutasi.
          </p>
          <button className="w-full py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-800 dark:text-slate-200 hover:bg-slate-200">
            Mutasi Rombel
          </button>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center font-bold">
            03
          </div>
          <h4 className="text-base font-bold text-slate-900 dark:text-white">
            Pembagian Siswa Baru (PPDB)
          </h4>
          <p className="text-xs text-slate-500 leading-relaxed">
            Distribusi otomatis siswa baru hasil PPDB ke rombel tingkat X berdasarkan rerata nilai tes & gender.
          </p>
          <button className="w-full py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-800 dark:text-slate-200 hover:bg-slate-200">
            Distribusi PPDB
          </button>
        </div>
      </div>
    </div>
  );
};
