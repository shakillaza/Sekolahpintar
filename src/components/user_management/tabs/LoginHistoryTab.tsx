import React, { useState } from 'react';
import { LoginHistoryModel } from '../../../types';
import { History, CheckCircle2, AlertOctagon, Filter, Search } from 'lucide-react';

interface LoginHistoryTabProps {
  loginHistory: LoginHistoryModel[];
}

export const LoginHistoryTab: React.FC<LoginHistoryTabProps> = ({ loginHistory }) => {
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filtered = loginHistory.filter((lh) => {
    const matchesStatus = statusFilter === 'ALL' || lh.status === statusFilter;
    const matchesSearch =
      lh.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lh.ipAddress.includes(searchQuery) ||
      lh.device.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-4">
      {/* Search & Filter Header */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari histori login (Nama, IP Address, Perangkat)..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none"
          >
            <option value="ALL">Semua Status Login</option>
            <option value="Success">Login Berhasil</option>
            <option value="Failed">Login Gagal</option>
          </select>
        </div>
      </div>

      {/* Login History Table */}
      <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600 dark:text-slate-300">
            <thead className="bg-slate-50 dark:bg-slate-800/60 uppercase font-extrabold text-[10px] tracking-wider text-slate-400 dark:text-slate-500 border-b border-slate-200/80 dark:border-slate-800">
              <tr>
                <th className="px-4 py-3.5">Waktu Timestamp</th>
                <th className="px-4 py-3.5">Pengguna & Role</th>
                <th className="px-4 py-3.5">Perangkat & Browser</th>
                <th className="px-4 py-3.5">IP Address & Lokasi</th>
                <th className="px-4 py-3.5 text-right">Status Login</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-medium">
              {filtered.map((lh) => (
                <tr key={lh.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="px-4 py-3 font-mono text-slate-500 text-[11px]">{lh.timestamp}</td>
                  <td className="px-4 py-3">
                    <div className="font-bold text-slate-900 dark:text-white">{lh.userName}</div>
                    <div className="text-[10px] text-blue-600 dark:text-blue-400">{lh.role}</div>
                  </td>
                  <td className="px-4 py-3 font-mono text-[11px]">
                    <div>{lh.device}</div>
                    <div className="text-[10px] text-slate-400">{lh.browser}</div>
                  </td>
                  <td className="px-4 py-3 font-mono text-[11px]">
                    <div className="font-bold text-slate-800 dark:text-slate-200">{lh.ipAddress}</div>
                    <div className="text-[10px] text-slate-400">{lh.location}</div>
                  </td>
                  <td className="px-4 py-3 text-right">
                    {lh.status === 'Success' ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                        <CheckCircle2 className="w-3 h-3 text-emerald-500" /> Berhasil
                      </span>
                    ) : (
                      <div className="space-y-0.5">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-rose-50 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400 border border-rose-200 dark:border-rose-800">
                          <AlertOctagon className="w-3 h-3 text-rose-500" /> Gagal
                        </span>
                        {lh.failureReason && (
                          <div className="text-[9px] text-rose-500 font-normal">{lh.failureReason}</div>
                        )}
                      </div>
                    )}
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
