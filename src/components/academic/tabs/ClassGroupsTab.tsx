import React, { useState } from 'react';
import { Plus, Users, UserCheck, CheckCircle2 } from 'lucide-react';
import { ClassGroupItem } from '../../../types/academicTypes';
import { initialClassGroups } from '../../../data/initialAcademicData';

export const ClassGroupsTab: React.FC = () => {
  const [groups] = useState<ClassGroupItem[]>(initialClassGroups);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Rombongan Belajar (Rombel)
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Penetapan kelompok siswa dalam satu rombel terdaftar semester berjalan.
          </p>
        </div>
        <button className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs flex items-center gap-2 shadow-sm">
          <Plus className="w-4 h-4" />
          <span>Buat Rombel Baru</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {groups.map((item) => (
          <div
            key={item.id}
            className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold text-slate-400">
                {item.rombelNumber}
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
                {item.status}
              </span>
            </div>

            <h4 className="text-xl font-black text-slate-900 dark:text-white">
              Rombel {item.className}
            </h4>

            <div className="space-y-1 text-xs text-slate-600 dark:text-slate-400">
              <p>Wali Kelas: <strong className="text-slate-800 dark:text-slate-200">{item.homeroomTeacherName}</strong></p>
              <p>Total Siswa: <strong className="text-blue-600 dark:text-blue-400">{item.studentCount} Siswa Active</strong></p>
              <p>T.A / Semester: <span className="font-mono">{item.schoolYear} ({item.semester})</span></p>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <button className="w-full py-2 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 text-xs font-bold text-slate-700 dark:text-slate-300 transition-colors">
                Kelola Anggota Siswa ({item.studentCount})
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
