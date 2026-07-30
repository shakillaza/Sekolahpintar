import React, { useState } from 'react';
import { RoleModel } from '../../../types';
import { Shield, Plus, Users, Key, Edit2, Trash2, Copy, CheckCircle2, Lock } from 'lucide-react';

interface RolesTabProps {
  roles: RoleModel[];
  onAddRole: () => void;
  onEditRole: (role: RoleModel) => void;
  onDeleteRole: (id: string) => void;
}

export const RolesTab: React.FC<RolesTabProps> = ({ roles, onAddRole, onEditRole, onDeleteRole }) => {
  return (
    <div className="space-y-6">
      {/* Top Info Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
        <div>
          <h3 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <Shield className="w-4 h-4 text-amber-500" />
            <span>Manajemen Role & Level Akses System ({roles.length} Role)</span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Mendukung 18 role standar bawaan dan pembuatan custom role dinamis tanpa mengubah source code.
          </p>
        </div>
        <button
          onClick={onAddRole}
          className="px-4 py-2.5 rounded-xl text-xs font-extrabold bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-600/20 transition-all flex items-center gap-1.5 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Role Custom</span>
        </button>
      </div>

      {/* Role Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {roles.map((r) => (
          <div
            key={r.id}
            className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4 relative overflow-hidden group"
          >
            {/* Background Icon */}
            <div className="absolute top-2 right-2 p-3 opacity-5 pointer-events-none group-hover:scale-110 transition-transform">
              <Shield className="w-20 h-20 text-blue-500" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800">
                    <Shield className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-extrabold text-slate-900 dark:text-white">{r.name}</h4>
                    <p className="text-[10px] font-mono text-slate-400">{r.code}</p>
                  </div>
                </div>
                {r.isSystemRole && (
                  <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 flex items-center gap-1">
                    <Lock className="w-2.5 h-2.5 text-slate-400" /> System
                  </span>
                )}
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-2">
                {r.description}
              </p>
            </div>

            {/* Footer Stats */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1 font-bold text-slate-700 dark:text-slate-300">
                  <Users className="w-3.5 h-3.5 text-blue-500" /> {r.userCount} User
                </span>
                <span className="flex items-center gap-1 font-bold text-slate-700 dark:text-slate-300">
                  <Key className="w-3.5 h-3.5 text-emerald-500" /> {r.permissionsCount} Hak Akses
                </span>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => onEditRole(r)}
                  className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950 rounded-lg transition-colors"
                  title="Edit Role"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                {!r.isSystemRole && (
                  <button
                    onClick={() => onDeleteRole(r.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950 rounded-lg transition-colors"
                    title="Hapus Role"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
