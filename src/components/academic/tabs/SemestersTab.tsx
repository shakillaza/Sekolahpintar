import React, { useState } from 'react';
import { Plus, CheckCircle2, Clock, Calendar, Edit } from 'lucide-react';
import { SemesterItem } from '../../../types/academicTypes';
import { initialSemesters } from '../../../data/initialAcademicData';

export const SemestersTab: React.FC = () => {
  const [semesters] = useState<SemesterItem[]>(initialSemesters);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Pengaturan Semester Akademik
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Pengaturan semester Ganjil / Genap dan alokasi minggu/hari efektif KBM.
          </p>
        </div>
        <button className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs flex items-center gap-2 shadow-sm">
          <Plus className="w-4 h-4" />
          <span>Tambah Semester</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {semesters.map((sem) => (
          <div
            key={sem.id}
            className={`p-5 rounded-2xl bg-white dark:bg-slate-900 border transition-all ${
              sem.status === 'aktif'
                ? 'border-blue-500 shadow-md ring-2 ring-blue-500/10'
                : 'border-slate-200/80 dark:border-slate-800'
            }`}
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                  Kode: {sem.code}
                </span>
                <h4 className="text-base font-extrabold text-slate-900 dark:text-white mt-0.5">
                  Semester {sem.name} ({sem.academicYear})
                </h4>
              </div>
              <span
                className={`px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 ${
                  sem.status === 'aktif'
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300'
                    : 'bg-slate-100 text-slate-500 dark:bg-slate-800'
                }`}
              >
                {sem.status === 'aktif' ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                <span>{sem.status === 'aktif' ? 'Semester Aktif' : 'Selesai'}</span>
              </span>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                <span className="text-slate-500 text-[10px] block">Tanggal Pelaksanaan</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200 block mt-0.5">
                  {sem.startDate} s/d {sem.endDate}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                <span className="text-slate-500 text-[10px] block">Hari & Minggu Efektif</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200 block mt-0.5">
                  {sem.effectiveDays} Hari ({sem.effectiveWeeks} Minggu)
                </span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span className="text-[11px] text-slate-500">
                Integrasi Otomatis Rapor & Absensi
              </span>
              <button className="px-3 py-1.5 rounded-lg text-xs font-semibold text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/40 transition-colors flex items-center gap-1">
                <Edit className="w-3.5 h-3.5" />
                <span>Edit Semester</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
