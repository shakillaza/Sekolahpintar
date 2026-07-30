import React from 'react';
import { X, Shield, Mail, Phone, Calendar, Clock, Laptop, Key, CheckCircle2, AlertCircle, Building, UserCheck, Award } from 'lucide-react';
import { UserManagementUser } from '../../../types';

interface UserDetailDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserManagementUser | null;
}

export const UserDetailDrawer: React.FC<UserDetailDrawerProps> = ({ isOpen, onClose, user }) => {
  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/60 backdrop-blur-sm transition-opacity">
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 h-full shadow-2xl border-l border-slate-200 dark:border-slate-800 flex flex-col justify-between overflow-y-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 dark:bg-blue-950/60 text-blue-600 rounded-xl">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white">Detail Pengguna Enterprise</h3>
              <p className="text-xs text-slate-500">Kredensial & Audit Rekam Jejak Akun</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Profile Card */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-900 to-blue-950 text-white space-y-4 border border-blue-900/50">
          <div className="flex items-center gap-4">
            <img
              src={user.avatarUrl}
              alt={user.name}
              className="w-16 h-16 rounded-2xl object-cover ring-2 ring-amber-400/40"
            />
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-extrabold text-white">{user.name}</h4>
                <span
                  className={`w-2.5 h-2.5 rounded-full ${
                    user.onlineStatus === 'online' ? 'bg-emerald-400 animate-pulse' : 'bg-slate-500'
                  }`}
                  title={user.onlineStatus === 'online' ? 'Status: Online' : 'Status: Offline'}
                />
              </div>
              <p className="text-xs text-slate-300 font-mono">@{user.username}</p>
              <div className="mt-1 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                <Shield className="w-3 h-3 text-amber-400" />
                <span>{user.roleName}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Account Details */}
        <div className="space-y-3 text-xs">
          <h4 className="font-extrabold uppercase text-[10px] tracking-wider text-slate-400">Informasi Kontak & Struktur</h4>

          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="flex justify-between items-center text-slate-600 dark:text-slate-300">
              <span className="flex items-center gap-1.5 text-slate-400"><Mail className="w-3.5 h-3.5" /> Email Resmi</span>
              <span className="font-semibold text-slate-900 dark:text-white">{user.email}</span>
            </div>
            <div className="flex justify-between items-center text-slate-600 dark:text-slate-300">
              <span className="flex items-center gap-1.5 text-slate-400"><Phone className="w-3.5 h-3.5" /> No HP / WA</span>
              <span className="font-semibold text-slate-900 dark:text-white">{user.phone}</span>
            </div>
            <div className="flex justify-between items-center text-slate-600 dark:text-slate-300">
              <span className="flex items-center gap-1.5 text-slate-400"><Building className="w-3.5 h-3.5" /> Departemen</span>
              <span className="font-semibold text-slate-900 dark:text-white">{user.departmentName}</span>
            </div>
            <div className="flex justify-between items-center text-slate-600 dark:text-slate-300">
              <span className="flex items-center gap-1.5 text-slate-400"><Award className="w-3.5 h-3.5" /> Jabatan / Position</span>
              <span className="font-semibold text-slate-900 dark:text-white">{user.positionTitle}</span>
            </div>
          </div>
        </div>

        {/* Security & Verification Details */}
        <div className="space-y-3 text-xs">
          <h4 className="font-extrabold uppercase text-[10px] tracking-wider text-slate-400">Keamanan & Kehadiran</h4>

          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="flex justify-between items-center text-slate-600 dark:text-slate-300">
              <span className="flex items-center gap-1.5 text-slate-400"><Shield className="w-3.5 h-3.5" /> Multi-Factor Auth (MFA)</span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${user.mfaEnabled ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-600'}`}>
                {user.mfaEnabled ? `Aktif (${user.mfaMethod})` : 'Nonaktif'}
              </span>
            </div>
            <div className="flex justify-between items-center text-slate-600 dark:text-slate-300">
              <span className="flex items-center gap-1.5 text-slate-400"><Clock className="w-3.5 h-3.5" /> Login Terakhir</span>
              <span className="font-mono text-slate-900 dark:text-white">{user.lastLogin}</span>
            </div>
            <div className="flex justify-between items-center text-slate-600 dark:text-slate-300">
              <span className="flex items-center gap-1.5 text-slate-400"><Calendar className="w-3.5 h-3.5" /> Tanggal Registrasi</span>
              <span className="font-mono text-slate-900 dark:text-white">{user.createdAt}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 transition-colors"
          >
            Tutup Drawer
          </button>
        </div>
      </div>
    </div>
  );
};
