import React from 'react';
import { Activity, Clock, UserCheck, Calendar, BookOpen, DollarSign, Award } from 'lucide-react';
import { TeacherTimelineEvent } from '../../types/teacherTypes';

interface TeacherTimelineTabProps {
  timelines: TeacherTimelineEvent[];
}

export const TeacherTimelineTab: React.FC<TeacherTimelineTabProps> = ({ timelines }) => {
  return (
    <div className="space-y-4">
      <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center justify-between">
        <div>
          <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Activity className="w-4 h-4 text-indigo-600" />
            Timeline Aktivitas & Audit Log Realtime Guru & Staf
          </h2>
          <p className="text-xs text-slate-500">Jejak aktivitas sistem, login, presensi, jadwal mengajar & perubahan payroll</p>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
        <div className="relative border-l-2 border-indigo-200 dark:border-indigo-900 ml-4 space-y-6">
          {timelines.map((event) => (
            <div key={event.id} className="relative pl-6">
              <span className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-indigo-600 ring-4 ring-white dark:ring-slate-800" />
              <div className="flex justify-between items-start">
                <span className="px-2 py-0.5 text-[10px] font-bold bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300 rounded">
                  {event.category}
                </span>
                <span className="text-xs text-slate-400 font-mono">{event.timestamp}</span>
              </div>
              <h3 className="font-bold text-slate-900 dark:text-slate-100 text-xs mt-1">{event.title}</h3>
              <p className="text-xs text-slate-500 mt-0.5">{event.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
