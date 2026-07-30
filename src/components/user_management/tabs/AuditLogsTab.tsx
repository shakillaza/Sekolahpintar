import React, { useState } from 'react';
import { AuditLogItem } from '../../../types';
import { ShieldCheck, Search, Filter, FileSpreadsheet, FileText, Activity } from 'lucide-react';

interface AuditLogsTabProps {
  logs: AuditLogItem[];
  onExportAuditLogs: (format: 'csv' | 'pdf') => void;
}

export const AuditLogsTab: React.FC<AuditLogsTabProps> = ({ logs, onExportAuditLogs }) => {
  const [actionFilter, setActionFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredLogs = logs.filter((l) => {
    const matchesAction = actionFilter === 'ALL' || l.action === actionFilter;
    const matchesSearch =
      l.actorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.module.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.details.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.ipAddress.includes(searchQuery);
    return matchesAction && matchesSearch;
  });

  return (
    <div className="space-y-4">
      {/* Header & Export Controls */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari audit trail (Aktor, Modul, IP, atau Deskripsi)..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={actionFilter}
            onChange={(e) => setActionFilter(e.target.value)}
            className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none"
          >
            <option value="ALL">Semua Aktivitas</option>
            <option value="Login">Login</option>
            <option value="Logout">Logout</option>
            <option value="Create">Create Data</option>
            <option value="Edit">Edit Data</option>
            <option value="Delete">Hapus Data</option>
            <option value="PermissionChange">Perubahan Permission</option>
            <option value="PasswordReset">Reset Password</option>
          </select>

          <button
            onClick={() => onExportAuditLogs('csv')}
            className="px-3 py-2 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition-colors flex items-center gap-1.5"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-500" />
            <span className="hidden sm:inline">Export Excel</span>
          </button>
        </div>
      </div>

      {/* Audit Trail Table */}
      <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600 dark:text-slate-300">
            <thead className="bg-slate-50 dark:bg-slate-800/60 uppercase font-extrabold text-[10px] tracking-wider text-slate-400 dark:text-slate-500 border-b border-slate-200/80 dark:border-slate-800">
              <tr>
                <th className="px-4 py-3.5">Timestamp</th>
                <th className="px-4 py-3.5">Aktor / Pengguna</th>
                <th className="px-4 py-3.5">Aksi & Modul</th>
                <th className="px-4 py-3.5">Detail Catatan Audit</th>
                <th className="px-4 py-3.5 text-right">IP Address</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-medium">
              {filteredLogs.map((l) => (
                <tr key={l.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="px-4 py-3 font-mono text-[11px] text-slate-400">{l.timestamp}</td>
                  <td className="px-4 py-3">
                    <div className="font-bold text-slate-900 dark:text-white">{l.actorName}</div>
                    <div className="text-[10px] text-blue-600 dark:text-blue-400">{l.actorRole}</div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                      {l.action}
                    </span>
                    <div className="text-[10px] text-slate-400 mt-0.5">{l.module}</div>
                  </td>
                  <td className="px-4 py-3 text-slate-800 dark:text-slate-200 max-w-md leading-snug">
                    {l.details}
                  </td>
                  <td className="px-4 py-3 text-right font-mono text-[11px] font-bold text-slate-700 dark:text-slate-300">
                    {l.ipAddress}
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
