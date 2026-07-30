import React, { useState } from 'react';
import { Settings, Save, Sparkles, Shield, Check } from 'lucide-react';

export const AcademicSettingsTab: React.FC = () => {
  const [maxHours, setMaxHours] = useState(24);
  const [defaultGrade, setDefaultGrade] = useState(75);
  const [autoConflictResolve, setAutoConflictResolve] = useState(true);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Settings className="w-5 h-5 text-blue-600" />
            <span>Pengaturan & Kebijakan Modul Akademik</span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Konfigurasi batas beban mengajar guru, standar KKM, aturan bentrok, dan AI Scheduler engine.
          </p>
        </div>
      </div>

      <form onSubmit={handleSave} className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Batas Max Jam Mengajar Guru (JP / Minggu)
            </label>
            <input
              type="number"
              value={maxHours}
              onChange={(e) => setMaxHours(Number(e.target.value))}
              className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
            />
            <span className="text-[10px] text-slate-400">Peringatan overload akan aktif jika guru melebihi batas ini.</span>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Standar KKM / KKTP Minimum Sekolah
            </label>
            <input
              type="number"
              value={defaultGrade}
              onChange={(e) => setDefaultGrade(Number(e.target.value))}
              className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
            />
            <span className="text-[10px] text-slate-400">KKM default saat menambahkan mata pelajaran baru.</span>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="auto-resolve"
              checked={autoConflictResolve}
              onChange={(e) => setAutoConflictResolve(e.target.checked)}
              className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="auto-resolve" className="text-xs font-bold text-slate-800 dark:text-slate-200 cursor-pointer">
              Aktifkan Smart AI Auto-Conflict Detector & Resolution pada Matrix Schedule Grid
            </label>
          </div>

          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs flex items-center gap-2 shadow-sm"
          >
            {isSaved ? <Check className="w-4 h-4 text-emerald-300" /> : <Save className="w-4 h-4" />}
            <span>{isSaved ? 'Tersimpan!' : 'Simpan Pengaturan'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
