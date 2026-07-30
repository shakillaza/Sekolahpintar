import React from 'react';
import { Calendar, UserCheck, Clock, CheckCircle2 } from 'lucide-react';

export const TeacherCalendarTab: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-indigo-600" />
            <span>Kalender Pribadi Guru</span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Jadwal mengajar harian, agenda rapat dewan guru, jadwal piket, workshop, dan diklat.
          </p>
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-4">
        <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
          Agenda Mendatang Minggu Ini (Dr. Ahmad Fauzi, M.Pd)
        </h4>

        <div className="space-y-3">
          {[
            { date: 'Senin, 07:45', title: 'Mengajar Matematika X IPA 1 (Jam 2-3)', type: 'KBM Normal', color: 'bg-blue-50 text-blue-700 border-blue-200' },
            { date: 'Selasa, 13:00', title: 'Rapat Evaluasi Kurikulum Merdeka (Ruang Guru)', type: 'Rapat Dinas', color: 'bg-purple-50 text-purple-700 border-purple-200' },
            { date: 'Kamis, 09:45', title: 'Piket Kebersihan & Ketertiban Sekolah (Zone A)', type: 'Tugas Tambahan', color: 'bg-amber-50 text-amber-700 border-amber-200' },
          ].map((item, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between">
              <div>
                <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400">{item.date}</span>
                <h5 className="text-xs font-bold text-slate-900 dark:text-white mt-0.5">{item.title}</h5>
              </div>
              <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${item.color}`}>
                {item.type}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
