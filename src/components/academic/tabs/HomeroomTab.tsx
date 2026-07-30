import React, { useState } from 'react';
import { Plus, UserCheck, Award, FileText } from 'lucide-react';
import { HomeroomAssignment } from '../../../types/academicTypes';
import { initialHomeroomAssignments } from '../../../data/initialAcademicData';

export const HomeroomTab: React.FC = () => {
  const [homerooms] = useState<HomeroomAssignment[]>(initialHomeroomAssignments);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Penugasan Wali Kelas
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Penetapan Surat Keputusan (SK) penugasan Wali Kelas per semester.
          </p>
        </div>
        <button className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs flex items-center gap-2 shadow-sm">
          <Plus className="w-4 h-4" />
          <span>Tetapkan Wali Kelas</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {homerooms.map((hr) => (
          <div
            key={hr.id}
            className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3"
          >
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600">
                <UserCheck className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-slate-400 font-bold block">{hr.decreeNumber}</span>
                <h4 className="text-sm font-extrabold text-slate-900 dark:text-white">{hr.teacherName}</h4>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 text-xs space-y-1">
              <div className="flex justify-between">
                <span className="text-slate-500">Wali Kelas:</span>
                <span className="font-bold text-blue-600 dark:text-blue-400">{hr.className}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Binaan Siswa:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{hr.studentCount} Siswa</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">T.A / Semester:</span>
                <span className="font-mono text-slate-600">{hr.schoolYear} ({hr.semester})</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
