import React, { useState } from 'react';
import { Plus, Layers, BookOpen } from 'lucide-react';
import { SubjectGroupItem } from '../../../types/academicTypes';
import { initialSubjectGroups } from '../../../data/initialAcademicData';

export const SubjectGroupsTab: React.FC = () => {
  const [groups] = useState<SubjectGroupItem[]>(initialSubjectGroups);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Kelompok Mata Pelajaran
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Pengelompokan struktur kurikulum (Wajib, Pilihan, Muatan Lokal, Keagamaan, Vokasi, Custom).
          </p>
        </div>
        <button className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs flex items-center gap-2 shadow-sm">
          <Plus className="w-4 h-4" />
          <span>Tambah Kelompok Mapel</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {groups.map((g) => (
          <div
            key={g.id}
            className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">
                {g.code}
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300">
                {g.category}
              </span>
            </div>

            <h4 className="text-sm font-extrabold text-slate-900 dark:text-white leading-snug">
              {g.name}
            </h4>

            <p className="text-xs text-slate-500 leading-relaxed">
              {g.description}
            </p>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-500">Jumlah Mata Pelajaran:</span>
              <span className="font-extrabold text-blue-600 dark:text-blue-400">{g.subjectCount} Mapel</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
