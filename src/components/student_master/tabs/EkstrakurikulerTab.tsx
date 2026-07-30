import React from 'react';
import { StudentExtracurricularRecord } from '../../../types/studentTypes';
import { Activity, UserCheck, Clock, Award } from 'lucide-react';

interface EkstrakurikulerTabProps {
  extracurriculars: StudentExtracurricularRecord[];
}

export const EkstrakurikulerTab: React.FC<EkstrakurikulerTabProps> = ({ extracurriculars }) => {
  return (
    <div className="space-y-6 text-xs">
      <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-teal-100 dark:bg-teal-950 text-teal-600 dark:text-teal-300">
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-sm font-black text-slate-900 dark:text-white">
              Data Ekstrakurikuler, Pembina & Nilai Rapor Ekskul
            </h3>
            <p className="text-xs text-slate-400">
              Jadwal mingguan, pembina/pelatih, nilai (A/B/C), dan prestasi kegiatan ekskul.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {extracurriculars.map((extra) => (
          <div
            key={extra.id}
            className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3"
          >
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-extrabold text-base text-slate-900 dark:text-white">
                  {extra.extraName}
                </h4>
                <p className="text-slate-500 text-[11px] font-medium flex items-center gap-1 mt-0.5">
                  <UserCheck className="w-3.5 h-3.5 text-teal-500" /> Pembina: {extra.coachName}
                </p>
              </div>

              <span className="w-8 h-8 rounded-2xl bg-teal-100 text-teal-900 dark:bg-teal-950 dark:text-teal-300 font-black flex items-center justify-center text-sm font-mono">
                {extra.grade}
              </span>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 space-y-1 font-mono text-[11px]">
              <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>{extra.scheduleDayTime}</span>
              </div>
            </div>

            {extra.achievementsNote && (
              <p className="text-[11px] font-bold text-teal-700 dark:text-teal-300">
                🏆 {extra.achievementsNote}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
