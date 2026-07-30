import React from 'react';
import { Calendar, Users, Clock, BookOpen } from 'lucide-react';

export const StudentCalendarTab: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-emerald-600" />
            <span>Kalender Akademik Siswa</span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Jadwal kelas harian siswa, deadline tugas, jadwal PTS/PAS, dan kegiatan ekstrakurikuler.
          </p>
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-4">
        <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
          Jadwal & Deadline Tugas Siswa (Kelas X IPA 1)
        </h4>

        <div className="space-y-3">
          {[
            { date: 'Senin, 23:59', title: 'Tugas Mandiri Matriks & Aljabar Linier (E-Learning)', type: 'Tugas Online', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
            { date: 'Rabu, 08:00', title: 'Praktikum Fisika Pengukuran Laser (Lab Fisika)', type: 'Praktikum', color: 'bg-blue-50 text-blue-700 border-blue-200' },
            { date: 'Jumat, 15:30', title: 'Latihan Ekstrakurikuler Pramuka & Robotik', type: 'Eskul', color: 'bg-amber-50 text-amber-700 border-amber-200' },
          ].map((item, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between">
              <div>
                <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">{item.date}</span>
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
