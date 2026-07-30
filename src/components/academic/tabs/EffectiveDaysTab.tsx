import React from 'react';
import { Calendar, CheckCircle2, FileText, Info } from 'lucide-react';
import { initialEffectiveDays } from '../../../data/initialAcademicData';

export const EffectiveDaysTab: React.FC = () => {
  const totalDays = initialEffectiveDays.reduce((acc, item) => acc + item.effectiveDays, 0);
  const totalWeeks = initialEffectiveDays.reduce((acc, item) => acc + item.effectiveWeeks, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Perhitungan Hari & Minggu Efektif (HEB)
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Rekapitulasi alokasi waktu efektif Kegiatan Belajar Mengajar (KBM) per bulan dalam semester.
          </p>
        </div>
        <div className="px-4 py-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-300 font-bold text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>Total Semester: {totalDays} Hari ({totalWeeks} Minggu)</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {initialEffectiveDays.map((m, idx) => (
          <div
            key={idx}
            className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4"
          >
            <div className="flex items-center justify-between">
              <h4 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                <Calendar className="w-4 h-4 text-blue-600" />
                <span>{m.month} {m.year}</span>
              </h4>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/60 text-blue-600 font-bold">
                {m.effectiveWeeks} WAP
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-200">
                <span className="text-[10px] text-emerald-600 font-semibold block">Hari Efektif</span>
                <span className="text-lg font-black block mt-0.5">{m.effectiveDays}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-200">
                <span className="text-[10px] text-rose-600 font-semibold block">Hari Libur</span>
                <span className="text-lg font-black block mt-0.5">{m.holidayDays}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-200">
                <span className="text-[10px] text-amber-600 font-semibold block">Hari Ujian</span>
                <span className="text-lg font-black block mt-0.5">{m.examDays}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
