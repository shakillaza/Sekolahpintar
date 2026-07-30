import React from 'react';
import { useApp } from '../../../context/AppContext';
import { ShieldCheck, GraduationCap, Building2, Sparkles, UserCheck } from 'lucide-react';

export const RoleOverviewBanner: React.FC = () => {
  const { user, currentRole, school, t } = useApp();

  return (
    <div className="p-6 rounded-3xl bg-gradient-to-r from-blue-900 via-slate-900 to-indigo-950 text-white shadow-xl border border-blue-800/40 relative overflow-hidden">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
        <div className="flex items-center gap-4">
          <img
            src={user.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'}
            alt={user.name}
            className="w-14 h-14 rounded-2xl object-cover ring-2 ring-amber-400 shadow-md shrink-0"
          />
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-400 text-slate-950 uppercase tracking-wider">
                {t(currentRole)}
              </span>
              <span className="text-xs text-slate-300 font-mono">
                {user.nip_nisn ? `ID: ${user.nip_nisn}` : 'Official User'}
              </span>
            </div>
            <h1 className="text-lg sm:text-xl font-extrabold text-white mt-1">
              Selamat Datang, {user.name}
            </h1>
            <p className="text-xs text-slate-300 mt-0.5">
              {school.name} ({school.level}) • Akreditasi {school.accreditation}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-slate-950/40 p-3 rounded-2xl border border-slate-800 text-xs">
          <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
          <div>
            <p className="font-bold text-slate-200">Keamanan Akses Terverifikasi</p>
            <p className="text-[10px] text-slate-400">
              Sesi Aktif JWT: <span className="text-emerald-400 font-mono">10 Roles RBAC Ready</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
