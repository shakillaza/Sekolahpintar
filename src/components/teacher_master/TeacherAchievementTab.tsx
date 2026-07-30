import React from 'react';
import { Award, Trophy, Star, Plus } from 'lucide-react';
import { TeacherAchievementRecord } from '../../types/teacherTypes';

interface TeacherAchievementTabProps {
  achievements: TeacherAchievementRecord[];
}

export const TeacherAchievementTab: React.FC<TeacherAchievementTabProps> = ({ achievements }) => {
  return (
    <div className="space-y-4">
      <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center justify-between">
        <div>
          <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Trophy className="w-4 h-4 text-amber-500" />
            Prestasi & Penghargaan Guru & Pegawai
          </h2>
          <p className="text-xs text-slate-500">Tingkat Sekolah, Kabupaten, Provinsi, Nasional & Internasional</p>
        </div>
        <button className="px-3 py-1.5 bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold rounded-lg shadow-sm flex items-center gap-1">
          <Plus className="w-3.5 h-3.5" />
          Tambah Prestasi
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {achievements.map((ach) => (
          <div key={ach.id} className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-amber-200/80 dark:border-amber-900/40 shadow-sm space-y-3">
            <div className="flex justify-between items-start">
              <span className="px-2.5 py-1 text-xs font-extrabold bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-200 rounded-lg">
                Tingkat {ach.level} ({ach.year})
              </span>
              <span className="text-xs font-bold text-amber-600 flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-amber-500" /> {ach.rank}
              </span>
            </div>

            <div>
              <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">{ach.title}</h3>
              <p className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold">{ach.teacherName}</p>
              <p className="text-xs text-slate-500 mt-1">Penyelenggara: {ach.organizer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
