import React, { useState } from 'react';
import { Plus, UserCheck, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { TeachingAssignmentItem } from '../../../types/academicTypes';
import { initialTeachingAssignments } from '../../../data/initialAcademicData';

export const TeachingAssignmentsTab: React.FC = () => {
  const [assignments] = useState<TeachingAssignmentItem[]>(initialTeachingAssignments);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span>Pembagian Beban Mengajar Guru</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
              Workload Monitoring
            </span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Plotting guru pengampu mata pelajaran per kelas dan deteksi beban jam berlebih (overload &gt; 24 JP).
          </p>
        </div>
        <button className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs flex items-center gap-2 shadow-sm">
          <Plus className="w-4 h-4" />
          <span>Tambah Penugasan Mengajar</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {assignments.map((item) => (
          <div
            key={item.id}
            className={`p-5 rounded-2xl bg-white dark:bg-slate-900 border transition-all ${
              item.isOverloaded
                ? 'border-amber-500 shadow-md ring-2 ring-amber-500/10'
                : 'border-slate-200/80 dark:border-slate-800'
            }`}
          >
            <div className="flex items-start justify-between">
              <div>
                <h4 className="text-base font-extrabold text-slate-900 dark:text-white">
                  {item.teacherName}
                </h4>
                <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 mt-0.5">
                  {item.subjectName}
                </p>
              </div>
              {item.isOverloaded ? (
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-300 flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3 text-amber-500" /> Overload Warning
                </span>
              ) : (
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-300 flex items-center gap-1">
                  <CheckCircle className="w-3 h-3 text-emerald-500" /> Normal Load
                </span>
              )}
            </div>

            <div className="mt-4 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 text-xs space-y-1.5">
              <div className="flex justify-between">
                <span className="text-slate-500">Target Kelas:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{item.className}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Total Jam Mengajar:</span>
                <span className={`font-mono font-bold ${item.isOverloaded ? 'text-amber-600' : 'text-blue-600'}`}>
                  {item.weeklyHours} JP / Minggu (Batas Max {item.maxWeeklyHoursLimit} JP)
                </span>
              </div>
            </div>

            {item.isOverloaded && (
              <p className="mt-2 text-[11px] text-amber-600 dark:text-amber-400 font-medium">
                💡 Rekomendasi AI: Pindahkan 2 JP ke guru pendamping untuk menjaga efektivitas KBM.
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
