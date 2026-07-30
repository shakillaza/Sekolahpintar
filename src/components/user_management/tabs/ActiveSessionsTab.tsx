import React from 'react';
import { ActiveSessionModel } from '../../../types';
import { Laptop, Shield, MapPin, Clock, LogOut, CheckCircle2, AlertTriangle } from 'lucide-react';

interface ActiveSessionsTabProps {
  sessions: ActiveSessionModel[];
  onRevokeSession: (sessionId: string) => void;
  onRevokeAllOtherSessions: () => void;
}

export const ActiveSessionsTab: React.FC<ActiveSessionsTabProps> = ({
  sessions,
  onRevokeSession,
  onRevokeAllOtherSessions,
}) => {
  return (
    <div className="space-y-4">
      {/* Header Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <Laptop className="w-4 h-4 text-emerald-500" />
            <span>Sesi Aktif Real-Time ({sessions.length} Sesi Terhubung)</span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Pantau perangkat, IP Address, lokasi, dan aktivitas pengguna yang sedang terhubung ke sistem.
          </p>
        </div>
        <button
          onClick={onRevokeAllOtherSessions}
          className="px-4 py-2 rounded-xl text-xs font-extrabold bg-rose-600 hover:bg-rose-700 text-white shadow-md shadow-rose-600/20 transition-all flex items-center gap-1.5 shrink-0"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Cabut Seluruh Sesi Lain</span>
        </button>
      </div>

      {/* Sessions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sessions.map((s) => (
          <div
            key={s.id}
            className={`p-5 rounded-2xl bg-white dark:bg-slate-900 border shadow-sm space-y-4 relative overflow-hidden transition-all ${
              s.isCurrent
                ? 'border-emerald-500/80 ring-1 ring-emerald-500/30'
                : 'border-slate-200/80 dark:border-slate-800'
            }`}
          >
            {s.isCurrent && (
              <span className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-500 text-white flex items-center gap-1 shadow-sm">
                <CheckCircle2 className="w-3 h-3" /> Sesi Ini
              </span>
            )}

            <div className="flex items-start gap-3">
              <div className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 shrink-0">
                <Laptop className="w-6 h-6 text-blue-500" />
              </div>
              <div className="space-y-0.5">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">{s.userName}</h4>
                <div className="text-xs font-semibold text-blue-600 dark:text-blue-400">{s.userRole}</div>
                <div className="text-[11px] font-mono text-slate-500">{s.device} • {s.browser}</div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 text-xs space-y-1.5 font-medium">
              <div className="flex items-center justify-between text-slate-600 dark:text-slate-300">
                <span className="flex items-center gap-1.5 text-slate-400">
                  <MapPin className="w-3.5 h-3.5" /> Lokasi & IP:
                </span>
                <span className="font-mono text-slate-900 dark:text-white font-bold">{s.location} ({s.ipAddress})</span>
              </div>
              <div className="flex items-center justify-between text-slate-600 dark:text-slate-300">
                <span className="flex items-center gap-1.5 text-slate-400">
                  <Clock className="w-3.5 h-3.5" /> Waktu Login:
                </span>
                <span className="font-mono text-slate-700 dark:text-slate-300">{s.loginTime}</span>
              </div>
              <div className="flex items-center justify-between text-slate-600 dark:text-slate-300">
                <span className="flex items-center gap-1.5 text-slate-400">
                  <Clock className="w-3.5 h-3.5" /> Aktif Terakhir:
                </span>
                <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">{s.lastActive}</span>
              </div>
            </div>

            {!s.isCurrent && (
              <div className="pt-1 flex justify-end">
                <button
                  onClick={() => onRevokeSession(s.id)}
                  className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-rose-50 text-rose-600 hover:bg-rose-100 dark:bg-rose-950/60 dark:text-rose-300 border border-rose-200 dark:border-rose-800 transition-colors flex items-center gap-1.5"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Putuskan Sesi Ini</span>
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
