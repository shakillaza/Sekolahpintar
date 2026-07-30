import React, { useState } from 'react';
import { RoleModel, PermissionModel } from '../../../types';
import { Check, X, Shield, Lock, Save, RotateCcw, Search, CheckCircle2 } from 'lucide-react';

interface RoleMatrixTabProps {
  roles: RoleModel[];
  permissions: PermissionModel[];
  rolePermissionMap: Record<string, string[]>; // roleId -> array of permissionCodes
  onTogglePermission: (roleId: string, permissionCode: string) => void;
  onSaveMatrix: () => void;
}

export const RoleMatrixTab: React.FC<RoleMatrixTabProps> = ({
  roles,
  permissions,
  rolePermissionMap,
  onTogglePermission,
  onSaveMatrix,
}) => {
  const [selectedModuleFilter, setSelectedModuleFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSavedNotice, setIsSavedNotice] = useState(false);

  const modules = Array.from(new Set(permissions.map((p) => p.module)));

  const filteredPermissions = permissions.filter((p) => {
    const matchesModule = selectedModuleFilter === 'ALL' || p.module === selectedModuleFilter;
    const matchesSearch =
      p.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesModule && matchesSearch;
  });

  const handleSave = () => {
    onSaveMatrix();
    setIsSavedNotice(true);
    setTimeout(() => setIsSavedNotice(false), 3000);
  };

  return (
    <div className="space-y-4">
      {/* Matrix Controls Header */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari permission..."
              className="pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs focus:outline-none"
            />
          </div>

          <select
            value={selectedModuleFilter}
            onChange={(e) => setSelectedModuleFilter(e.target.value)}
            className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-bold text-slate-800 dark:text-slate-200 focus:outline-none"
          >
            <option value="ALL">Filter Modul (Semua)</option>
            {modules.map((m) => (
              <option key={m} value={m}>
                Modul {m}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          {isSavedNotice && (
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 animate-fade-in">
              <CheckCircle2 className="w-4 h-4" /> Matriks Berhasil Disimpan!
            </span>
          )}
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded-xl text-xs font-extrabold bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-600/20 transition-all flex items-center gap-1.5"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Simpan Matriks RBAC</span>
          </button>
        </div>
      </div>

      {/* Grid Matrix Table */}
      <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-800 text-white uppercase text-[10px] font-extrabold tracking-wider sticky top-0 z-10">
              <tr>
                <th className="px-4 py-3.5 min-w-[220px] bg-slate-900">Permission Key / Modul</th>
                {roles.map((r) => (
                  <th key={r.id} className="px-3 py-3.5 text-center min-w-[100px] border-l border-slate-700">
                    <div className="truncate font-extrabold text-amber-400">{r.name}</div>
                    <div className="text-[9px] text-slate-400 font-mono font-normal">{r.code}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
              {filteredPermissions.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="px-4 py-3 bg-slate-50/50 dark:bg-slate-900/50 border-r border-slate-200 dark:border-slate-800">
                    <div className="font-mono text-xs font-bold text-slate-900 dark:text-white">{p.code}</div>
                    <div className="text-[10px] text-slate-400">{p.name}</div>
                  </td>

                  {roles.map((r) => {
                    const assignedCodes = rolePermissionMap[r.id] || [];
                    // Superadmin gets everything by default
                    const isGranted = r.code === 'SUPER_ADMIN' || assignedCodes.includes(p.code);

                    return (
                      <td key={r.id} className="px-3 py-3 text-center border-l border-slate-100 dark:border-slate-800/60">
                        <button
                          disabled={r.code === 'SUPER_ADMIN'}
                          onClick={() => onTogglePermission(r.id, p.code)}
                          className={`w-7 h-7 rounded-lg flex items-center justify-center mx-auto transition-all ${
                            isGranted
                              ? 'bg-emerald-500 text-white shadow-sm hover:bg-emerald-600'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-300 dark:text-slate-600 hover:bg-slate-200 dark:hover:bg-slate-700'
                          } ${r.code === 'SUPER_ADMIN' ? 'cursor-not-allowed opacity-90' : ''}`}
                          title={`${isGranted ? 'Akses Diberikan' : 'Akses Ditolak'} untuk ${r.name}`}
                        >
                          {isGranted ? <Check className="w-4 h-4 stroke-[3]" /> : <X className="w-3.5 h-3.5" />}
                        </button>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
