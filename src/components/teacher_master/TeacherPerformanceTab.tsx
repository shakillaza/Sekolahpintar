import React from 'react';
import { Award, TrendingUp, CheckCircle2, Star, Sparkles } from 'lucide-react';
import { TeacherPerformanceRecord } from '../../types/teacherTypes';

interface TeacherPerformanceTabProps {
  performances: TeacherPerformanceRecord[];
}

export const TeacherPerformanceTab: React.FC<TeacherPerformanceTabProps> = ({ performances }) => {
  return (
    <div className="space-y-4">
      <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center justify-between">
        <div>
          <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Award className="w-4 h-4 text-purple-600" />
            Penilaian Kinerja Pegawai (SKP & KPI Kepala Sekolah/Yayasan)
          </h2>
          <p className="text-xs text-slate-500">Evaluasi Kedisiplinan, Produktivitas, Presensi, Capaian Target & Catatan Evaluator</p>
        </div>
      </div>

      <div className="space-y-4">
        {performances.map((prf) => (
          <div key={prf.id} className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
              <div>
                <span className="text-[10px] font-bold text-purple-600 uppercase tracking-wider block">{prf.period}</span>
                <h3 className="font-extrabold text-slate-900 dark:text-slate-100 text-lg">{prf.teacherName}</h3>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 block uppercase font-semibold">SKP Score</span>
                  <span className="text-2xl font-black text-indigo-600 dark:text-indigo-400">{prf.finalScore} / 100</span>
                </div>
                <span className="px-3 py-1 bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300 font-bold text-xs rounded-xl">
                  {prf.principalRating}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs">
              <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-100 dark:border-slate-800">
                <span className="text-slate-400 text-[10px] block">Disiplin</span>
                <span className="font-extrabold text-emerald-600 text-sm">{prf.disciplineScore}%</span>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-100 dark:border-slate-800">
                <span className="text-slate-400 text-[10px] block">Produktivitas</span>
                <span className="font-extrabold text-indigo-600 text-sm">{prf.productivityScore}%</span>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-100 dark:border-slate-800">
                <span className="text-slate-400 text-[10px] block">Kehadiran</span>
                <span className="font-extrabold text-blue-600 text-sm">{prf.attendanceScore}%</span>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-100 dark:border-slate-800">
                <span className="text-slate-400 text-[10px] block">Target SKP</span>
                <span className="font-extrabold text-purple-600 text-sm">{prf.targetAchievement}%</span>
              </div>
            </div>

            <div className="bg-purple-50/50 dark:bg-purple-950/20 p-3 rounded-xl border border-purple-100 dark:border-purple-900/40 text-xs italic text-slate-600 dark:text-slate-300">
              "{prf.evaluatorNotes}"
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
