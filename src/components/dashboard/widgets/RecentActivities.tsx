import React from 'react';
import { useApp } from '../../../context/AppContext';
import { Activity, ShieldCheck, AlertCircle, CheckCircle2 } from 'lucide-react';

export const RecentActivities: React.FC = () => {
  const { activityLogs, t } = useApp();

  return (
    <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              {t('recentActivities')}
            </h3>
            <p className="text-[11px] text-slate-400">
              Audit log real-time transaksi & perubahan data
            </p>
          </div>
        </div>
        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500">
          Enkripsi SHA-256
        </span>
      </div>

      <div className="space-y-3">
        {activityLogs.map((log) => {
          const isSuccess = log.status === 'success';

          return (
            <div
              key={log.id}
              className="p-3 rounded-2xl bg-slate-50/70 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800/80 flex items-start justify-between gap-3 text-xs"
            >
              <div className="flex items-start gap-3">
                {isSuccess ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                )}
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-slate-100">
                    {log.action}
                  </h4>
                  <div className="flex items-center gap-2 text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                    <span className="font-medium text-blue-600 dark:text-blue-400">
                      {log.userName} ({t(log.userRole)})
                    </span>
                    <span>•</span>
                    <span>Modul: {log.module}</span>
                  </div>
                </div>
              </div>

              <div className="text-right shrink-0">
                <span className="text-[10px] text-slate-400 font-mono block">
                  {log.timestamp}
                </span>
                <span className="text-[9px] text-slate-500 font-mono">
                  IP: {log.ipAddress}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
