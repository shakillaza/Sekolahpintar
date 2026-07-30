import React from 'react';
import { PpdbApplicant } from '../../../types/ppdbTypes';
import { Award, CheckCircle2, XCircle, Sliders, TrendingUp, Sparkles } from 'lucide-react';

interface SelectionTabProps {
  applicants: PpdbApplicant[];
  onUpdateStatus: (id: string, status: any) => void;
}

export const SelectionTab: React.FC<SelectionTabProps> = ({ applicants, onUpdateStatus }) => {
  const sortedApplicants = [...applicants].sort(
    (a, b) => b.totalCompositeScore - a.totalCompositeScore
  );

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-500" />
            <span>Mesin Seleksi & Penentuan Kelulusan Otomatis (Ranking AI)</span>
          </h3>
          <p className="text-xs text-slate-500">
            Perhitungan skor komposit gabungan Nilai Rapor + Tes + Wawancara + Bonus Prestasi.
          </p>
        </div>
      </div>

      {/* Ranking Table */}
      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-500 uppercase font-extrabold text-[10px] tracking-wider border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="px-4 py-3.5">Peringkat</th>
                <th className="px-4 py-3.5">Nama Siswa</th>
                <th className="px-4 py-3.5">Rapor (30%)</th>
                <th className="px-4 py-3.5">Tes Akademik (35%)</th>
                <th className="px-4 py-3.5">Wawancara (20%)</th>
                <th className="px-4 py-3.5">Bonus Prestasi (15%)</th>
                <th className="px-4 py-3.5">Skor Komposit AI</th>
                <th className="px-4 py-3.5">Keputusan Status</th>
                <th className="px-4 py-3.5 text-right">Aksi Manual</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono">
              {sortedApplicants.map((app, index) => (
                <tr key={app.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="px-4 py-3 font-extrabold text-blue-600 dark:text-blue-400">
                    #{index + 1}
                  </td>
                  <td className="px-4 py-3 font-sans font-bold text-slate-900 dark:text-white">
                    {app.fullName}
                  </td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-300">{app.academicScore}</td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-300">{app.testScore}</td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-300">{app.interviewScore}</td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-300">+{app.achievementScore}</td>
                  <td className="px-4 py-3 font-black text-amber-600 dark:text-amber-400 text-sm">
                    {app.totalCompositeScore.toFixed(2)}
                  </td>
                  <td className="px-4 py-3 font-sans">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                        app.status === 'Passed'
                          ? 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                          : app.status === 'Failed'
                          ? 'bg-rose-50 text-rose-600 border border-rose-200'
                          : 'bg-amber-50 text-amber-600 border border-amber-200'
                      }`}
                    >
                      {app.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right font-sans">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => onUpdateStatus(app.id, 'Passed')}
                        className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-emerald-600 text-white shadow"
                      >
                        Luluskan
                      </button>
                      <button
                        onClick={() => onUpdateStatus(app.id, 'Failed')}
                        className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-rose-600 text-white shadow"
                      >
                        Tolak
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
