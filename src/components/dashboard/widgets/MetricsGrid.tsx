import React from 'react';
import { useApp } from '../../../context/AppContext';
import {
  Users,
  GraduationCap,
  Building2,
  DollarSign,
  TrendingUp,
  UserCheck,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

export const MetricsGrid: React.FC = () => {
  const { school, t } = useApp();

  const metrics = [
    {
      labelKey: 'totalTeachers',
      value: school.teachersCount.toString(),
      unit: 'Guru & Staf',
      change: '+3 bulan ini',
      isPositive: true,
      icon: Users,
      color: 'from-blue-600 to-indigo-600',
      textColor: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-50 dark:bg-blue-900/30',
    },
    {
      labelKey: 'totalStudents',
      value: school.studentsCount.toString(),
      unit: 'Siswa Aktif',
      change: '+24 semester ini',
      isPositive: true,
      icon: GraduationCap,
      color: 'from-amber-500 to-amber-600',
      textColor: 'text-amber-600 dark:text-amber-400',
      bgColor: 'bg-amber-50 dark:bg-amber-900/30',
    },
    {
      labelKey: 'totalClasses',
      value: school.classesCount.toString(),
      unit: 'Rombel',
      change: 'Kapasitas 100%',
      isPositive: true,
      icon: Building2,
      color: 'from-emerald-500 to-teal-600',
      textColor: 'text-emerald-600 dark:text-emerald-400',
      bgColor: 'bg-emerald-50 dark:bg-emerald-900/30',
    },
    {
      labelKey: 'totalRevenue',
      value: 'Rp 385.000.000',
      unit: 'Terkumpul (88%)',
      change: '+5.2% vs Juni',
      isPositive: true,
      icon: DollarSign,
      color: 'from-blue-700 to-cyan-600',
      textColor: 'text-cyan-600 dark:text-cyan-400',
      bgColor: 'bg-cyan-50 dark:bg-cyan-900/30',
    },
    {
      labelKey: 'totalExpenses',
      value: 'Rp 142.500.000',
      unit: 'Gaji & Operasional',
      change: 'Sesuai Anggaran',
      isPositive: true,
      icon: TrendingUp,
      color: 'from-purple-600 to-pink-600',
      textColor: 'text-purple-600 dark:text-purple-400',
      bgColor: 'bg-purple-50 dark:bg-purple-900/30',
    },
    {
      labelKey: 'todayAttendance',
      value: '96.4%',
      unit: '819/850 Siswa',
      change: '+1.4% vs kemarin',
      isPositive: true,
      icon: UserCheck,
      color: 'from-rose-500 to-orange-500',
      textColor: 'text-rose-600 dark:text-rose-400',
      bgColor: 'bg-rose-50 dark:bg-rose-900/30',
    },
  ];

  return (
    <div id="metrics-grid-container" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {metrics.map((m, idx) => {
        const Icon = m.icon;
        return (
          <div
            key={idx}
            id={`metric-card-${idx}`}
            className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-200"
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`p-2.5 rounded-xl ${m.bgColor}`}>
                <Icon className={`w-5 h-5 ${m.textColor}`} />
              </div>
              <span className="flex items-center text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-1.5 py-0.5 rounded-md">
                <ArrowUpRight className="w-3 h-3" />
                {m.change}
              </span>
            </div>

            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                {t(m.labelKey)}
              </p>
              <h3 className="text-lg font-black text-slate-900 dark:text-white mt-0.5 truncate">
                {m.value}
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 font-medium">
                {m.unit}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
