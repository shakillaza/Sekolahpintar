import React from 'react';
import { BookOpen, Plus, Award, Calendar, ExternalLink } from 'lucide-react';
import { TeacherProfessionalDev } from '../../types/teacherTypes';

interface TeacherProfDevTabProps {
  profDevs: TeacherProfessionalDev[];
}

export const TeacherProfDevTab: React.FC<TeacherProfDevTabProps> = ({ profDevs }) => {
  return (
    <div className="space-y-4">
      <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center justify-between">
        <div>
          <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-emerald-600" />
            Pengembangan Profesi, Publikasi & Penelitian
          </h2>
          <p className="text-xs text-slate-500">Pelatihan, Workshop, Seminar, Karya Ilmiah & Pengabdian Masyarakat</p>
        </div>
        <button className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg shadow-sm flex items-center gap-1">
          <Plus className="w-3.5 h-3.5" />
          Tambah Kegiatan Profesi
        </button>
      </div>

      <div className="space-y-3">
        {profDevs.map((dev) => (
          <div key={dev.id} className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 rounded">
                  {dev.type}
                </span>
                <span className="text-xs text-slate-400 font-medium">{dev.eventDate} ({dev.durationHours} Jam)</span>
              </div>
              <h3 className="font-bold text-slate-900 dark:text-slate-100 text-xs">{dev.title}</h3>
              <p className="text-xs text-slate-500">Penyelenggara: {dev.organizer} • Peserta: <span className="text-indigo-600 font-semibold">{dev.teacherName}</span></p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
