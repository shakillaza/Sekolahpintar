import React, { useState } from 'react';
import { PermissionModel } from '../../../types';
import { Key, Filter, Search, CheckCircle2, ShieldAlert, Plus } from 'lucide-react';

interface PermissionsTabProps {
  permissions: PermissionModel[];
}

export const PermissionsTab: React.FC<PermissionsTabProps> = ({ permissions }) => {
  const [selectedModule, setSelectedModule] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const modules = Array.from(new Set(permissions.map((p) => p.module)));

  const filteredPermissions = permissions.filter((p) => {
    const matchesModule = selectedModule === 'ALL' || p.module === selectedModule;
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesModule && matchesSearch;
  });

  return (
    <div className="space-y-4">
      {/* Search & Module Filter */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari permission (e.g. Student.View, Finance.Create)..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          <select
            value={selectedModule}
            onChange={(e) => setSelectedModule(e.target.value)}
            className="px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none"
          >
            <option value="ALL">Semua Modul ({modules.length})</option>
            {modules.map((m) => (
              <option key={m} value={m}>
                Modul {m}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Permissions List Table */}
      <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600 dark:text-slate-300">
            <thead className="bg-slate-50 dark:bg-slate-800/60 uppercase font-extrabold text-[10px] tracking-wider text-slate-400 dark:text-slate-500 border-b border-slate-200/80 dark:border-slate-800">
              <tr>
                <th className="px-4 py-3.5">Kode Permission</th>
                <th className="px-4 py-3.5">Modul Sistem</th>
                <th className="px-4 py-3.5">Aksi / Operasi</th>
                <th className="px-4 py-3.5">Nama & Deskripsi Hak Akses</th>
                <th className="px-4 py-3.5 text-right">Status Key</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-medium">
              {filteredPermissions.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="px-4 py-3 font-mono">
                    <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700">
                      {p.code}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-bold text-slate-800 dark:text-slate-200">
                    {p.module}
                  </td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                      {p.action}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-bold text-slate-900 dark:text-white">{p.name}</div>
                    <div className="text-[10px] text-slate-400">{p.description}</div>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
                      <CheckCircle2 className="w-3 h-3 text-emerald-500" /> Active System Key
                    </span>
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
