import React, { useState } from 'react';
import { Plus, Clock, Coffee } from 'lucide-react';
import { LessonPeriodItem } from '../../../types/academicTypes';
import { initialLessonPeriods } from '../../../data/initialAcademicData';

export const LessonPeriodsTab: React.FC = () => {
  const [periods] = useState<LessonPeriodItem[]>(initialLessonPeriods);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Pengaturan Jam Pelajaran & Istirahat
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Definisi slot waktu jam ke-1 hingga jam ke-n, durasi menit KBM, dan jam istirahat sekolah.
          </p>
        </div>
        <button className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs flex items-center gap-2 shadow-sm">
          <Plus className="w-4 h-4" />
          <span>Tambah Slot Jam</span>
        </button>
      </div>

      <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-800/60 text-[11px] font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200/80 dark:border-slate-800">
              <th className="py-3.5 px-4 text-center">Jam Ke-</th>
              <th className="py-3.5 px-4">Jam Mulai</th>
              <th className="py-3.5 px-4">Jam Selesai</th>
              <th className="py-3.5 px-4">Durasi</th>
              <th className="py-3.5 px-4">Kategori / Catatan</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-xs">
            {periods.map((item) => (
              <tr
                key={item.id}
                className={item.isBreakTime ? 'bg-amber-50/50 dark:bg-amber-950/30 font-bold' : ''}
              >
                <td className="py-3 px-4 text-center font-extrabold text-slate-900 dark:text-white">
                  Jam {item.periodNumber}
                </td>
                <td className="py-3 px-4 font-mono font-bold text-blue-600">{item.startTime}</td>
                <td className="py-3 px-4 font-mono font-bold text-blue-600">{item.endTime}</td>
                <td className="py-3 px-4 text-slate-600 dark:text-slate-400">{item.durationMinutes} Menit</td>
                <td className="py-3 px-4">
                  {item.isBreakTime ? (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] bg-amber-200 text-amber-800 dark:bg-amber-900 dark:text-amber-200 inline-flex items-center gap-1">
                      <Coffee className="w-3 h-3" /> {item.notes || 'Jam Istirahat'}
                    </span>
                  ) : (
                    <span className="text-slate-500">{item.notes || 'Jam KBM Normal'}</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
