import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { BarChart3, TrendingUp, DollarSign, GraduationCap, Sparkles } from 'lucide-react';

export const ChartsSection: React.FC = () => {
  const { t } = useApp();
  const [activeMonth, setActiveMonth] = useState<number | null>(null);

  const academicData = [
    { month: 'Jan', rate: 82, target: 80 },
    { month: 'Feb', rate: 84, target: 80 },
    { month: 'Mar', rate: 86, target: 82 },
    { month: 'Apr', rate: 85, target: 82 },
    { month: 'Mei', rate: 88, target: 85 },
    { month: 'Jun', rate: 91, target: 85 },
    { month: 'Jul', rate: 94, target: 88 },
  ];

  const financialData = [
    { month: 'Jan', revenue: 320, expense: 120 },
    { month: 'Feb', revenue: 340, expense: 125 },
    { month: 'Mar', revenue: 350, expense: 130 },
    { month: 'Apr', revenue: 310, expense: 128 },
    { month: 'Mei', revenue: 370, expense: 135 },
    { month: 'Jun', revenue: 390, expense: 140 },
    { month: 'Jul', revenue: 385, expense: 142 },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Academic Progress Chart */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                {t('academicChart')}
              </h3>
              <p className="text-[11px] text-slate-400">
                Rata-Rata Nilai KKM & Kehadiran Siswa Semester Ini
              </p>
            </div>
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            Trend Naik +8.4%
          </span>
        </div>

        {/* Bar Chart Visualization */}
        <div className="h-48 pt-4 flex items-end justify-between gap-3 px-2">
          {academicData.map((d, idx) => (
            <div
              key={idx}
              className="flex-1 flex flex-col items-center gap-2 group cursor-pointer"
              onMouseEnter={() => setActiveMonth(idx)}
              onMouseLeave={() => setActiveMonth(null)}
            >
              <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-t-xl h-36 flex items-end justify-center relative p-1 overflow-hidden">
                <div
                  style={{ height: `${d.rate}%` }}
                  className={`w-full rounded-t-lg transition-all duration-300 ${
                    activeMonth === idx
                      ? 'bg-gradient-to-t from-blue-700 to-amber-400 shadow-lg'
                      : 'bg-gradient-to-t from-blue-600 to-blue-500'
                  }`}
                ></div>

                {activeMonth === idx && (
                  <div className="absolute -top-8 px-2 py-0.5 rounded bg-slate-950 text-white text-[10px] font-bold shadow-xl animate-in fade-in">
                    {d.rate}%
                  </div>
                )}
              </div>
              <span className="text-[10px] font-bold text-slate-400 group-hover:text-blue-600 transition-colors">
                {d.month}
              </span>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
            <span>Rata-Rata Nilai Akademik</span>
          </div>
          <span className="font-semibold text-slate-700 dark:text-slate-300">
            Target Capaian Kurikulum: 85%
          </span>
        </div>
      </div>

      {/* Financial Analytics Chart */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                {t('financialChart')}
              </h3>
              <p className="text-[11px] text-slate-400">
                Arus Kas Penerimaan SPP vs Pengeluaran Operasional (Juta Rp)
              </p>
            </div>
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
            Surplus Rp 242.5M
          </span>
        </div>

        {/* Dual Bar Comparison */}
        <div className="h-48 pt-4 flex items-end justify-between gap-3 px-2">
          {financialData.map((fd, idx) => {
            const revHeight = (fd.revenue / 400) * 100;
            const expHeight = (fd.expense / 400) * 100;

            return (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-t-xl h-36 flex items-end justify-center gap-1 p-1">
                  {/* Revenue Bar */}
                  <div
                    style={{ height: `${revHeight}%` }}
                    className="w-1/2 bg-gradient-to-t from-emerald-600 to-teal-400 rounded-t-md transition-all duration-300"
                    title={`Penerimaan: Rp ${fd.revenue} Juta`}
                  ></div>
                  {/* Expense Bar */}
                  <div
                    style={{ height: `${expHeight}%` }}
                    className="w-1/2 bg-gradient-to-t from-rose-600 to-orange-400 rounded-t-md transition-all duration-300"
                    title={`Pengeluaran: Rp ${fd.expense} Juta`}
                  ></div>
                </div>
                <span className="text-[10px] font-bold text-slate-400">{fd.month}</span>
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              <span>Penerimaan SPP</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
              <span>Pengeluaran</span>
            </div>
          </div>
          <span className="font-semibold text-emerald-600 dark:text-emerald-400">
            Kesehatan Kas: Sangat Baik
          </span>
        </div>
      </div>
    </div>
  );
};
