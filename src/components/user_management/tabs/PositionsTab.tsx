import React from 'react';
import { PositionModel } from '../../../types';
import { Briefcase, Plus, Edit2, Trash2 } from 'lucide-react';

interface PositionsTabProps {
  positions: PositionModel[];
  onAddPosition: () => void;
  onEditPosition: (pos: PositionModel) => void;
  onDeletePosition: (id: string) => void;
}

export const PositionsTab: React.FC<PositionsTabProps> = ({
  positions,
  onAddPosition,
  onEditPosition,
  onDeletePosition,
}) => {
  return (
    <div className="space-y-4">
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-purple-500" />
            <span>Manajemen Jabatan & Structural Hierarchy</span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Daftar level posisi jabatan, eselon, dan sebaran SDM pengampu di sekolah.
          </p>
        </div>
        <button
          onClick={onAddPosition}
          className="px-4 py-2 rounded-xl text-xs font-extrabold bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-600/20 transition-all flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Jabatan</span>
        </button>
      </div>

      <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600 dark:text-slate-300">
            <thead className="bg-slate-50 dark:bg-slate-800/60 uppercase font-extrabold text-[10px] tracking-wider text-slate-400 dark:text-slate-500 border-b border-slate-200/80 dark:border-slate-800">
              <tr>
                <th className="px-4 py-3.5">Nama Jabatan</th>
                <th className="px-4 py-3.5">Departemen Terkait</th>
                <th className="px-4 py-3.5">Level / Eselon</th>
                <th className="px-4 py-3.5">Jumlah Pengampu</th>
                <th className="px-4 py-3.5 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-medium">
              {positions.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="px-4 py-3 font-bold text-slate-900 dark:text-white">{p.title}</td>
                  <td className="px-4 py-3">{p.departmentName}</td>
                  <td className="px-4 py-3">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-50 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
                      {p.level}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-bold text-blue-600">{p.totalHolders} Orang</td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => onEditPosition(p)}
                        className="p-1.5 text-slate-400 hover:text-blue-600 rounded-lg"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => onDeletePosition(p.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
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
