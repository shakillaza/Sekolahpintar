import React, { useState } from 'react';
import { MenuManagementItem, RoleModel } from '../../../types';
import {
  Menu,
  Eye,
  EyeOff,
  MoveUp,
  MoveDown,
  Shield,
  Layers,
  Plus,
  CheckCircle2,
  List
} from 'lucide-react';

interface MenuManagementTabProps {
  menus: MenuManagementItem[];
  roles: RoleModel[];
  onToggleMenuVisibility: (id: string) => void;
  onUpdateMenuRoles: (menuId: string, roleCode: string) => void;
}

export const MenuManagementTab: React.FC<MenuManagementTabProps> = ({
  menus,
  roles,
  onToggleMenuVisibility,
  onUpdateMenuRoles,
}) => {
  return (
    <div className="space-y-4">
      {/* Header Info */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <Menu className="w-4 h-4 text-blue-500" />
            <span>Menu Management & Role Visibility Engine</span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Atur navigasi sidebar, visibilitas menu, dan matriks hak akses per role secara fleksibel.
          </p>
        </div>
      </div>

      {/* Menus List */}
      <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600 dark:text-slate-300">
            <thead className="bg-slate-50 dark:bg-slate-800/60 uppercase font-extrabold text-[10px] tracking-wider text-slate-400 dark:text-slate-500 border-b border-slate-200/80 dark:border-slate-800">
              <tr>
                <th className="px-4 py-3.5 w-12 text-center">Urutan</th>
                <th className="px-4 py-3.5">Judul Menu & Kategori</th>
                <th className="px-4 py-3.5">Path Navigasi</th>
                <th className="px-4 py-3.5">Akses Role Terhubung</th>
                <th className="px-4 py-3.5 text-center">Visibilitas</th>
                <th className="px-4 py-3.5 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-medium">
              {menus.map((m) => (
                <tr key={m.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="px-4 py-3 text-center font-bold text-slate-400">
                    #{m.order}
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-bold text-slate-900 dark:text-white">{m.title}</div>
                    <span className="text-[10px] text-slate-400 px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                      {m.category}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-mono text-[11px] text-blue-600 dark:text-blue-400">
                    {m.path}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1 max-w-md">
                      {roles.map((r) => {
                        const isAllowed = m.rolesAllowed.includes(r.code) || m.rolesAllowed.includes('ALL');
                        return (
                          <button
                            key={r.id}
                            onClick={() => onUpdateMenuRoles(m.id, r.code)}
                            className={`px-2 py-0.5 rounded text-[9px] font-bold transition-all border ${
                              isAllowed
                                ? 'bg-blue-50 text-blue-700 dark:bg-blue-950/80 dark:text-blue-300 border-blue-200 dark:border-blue-800'
                                : 'bg-slate-100 dark:bg-slate-800 text-slate-400 border-slate-200 dark:border-slate-700 opacity-60'
                            }`}
                            title={`Klik untuk toggle role ${r.name}`}
                          >
                            {r.name}
                          </button>
                        );
                      })}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => onToggleMenuVisibility(m.id)}
                      className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold transition-all border ${
                        m.isVisible
                          ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800'
                          : 'bg-rose-50 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400 border-rose-200 dark:border-rose-800'
                      }`}
                    >
                      {m.isVisible ? 'Tampil' : 'Sembunyi'}
                    </button>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => onToggleMenuVisibility(m.id)}
                      className="p-1.5 text-slate-400 hover:text-blue-600 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    >
                      {m.isVisible ? <Eye className="w-4 h-4 text-emerald-500" /> : <EyeOff className="w-4 h-4 text-rose-500" />}
                    </button>
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
