import React from 'react';
import { UserGroupModel } from '../../../types';
import { Users, Plus, Edit2, Trash2, Shield } from 'lucide-react';

interface GroupsTabProps {
  groups: UserGroupModel[];
  onAddGroup: () => void;
  onEditGroup: (group: UserGroupModel) => void;
  onDeleteGroup: (id: string) => void;
}

export const GroupsTab: React.FC<GroupsTabProps> = ({ groups, onAddGroup, onEditGroup, onDeleteGroup }) => {
  return (
    <div className="space-y-4">
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <Users className="w-4 h-4 text-blue-500" />
            <span>Manajemen User Groups & Pengelompokan Pengguna</span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Kelompokkan pengguna berdasarkan kategori institusi (Guru, Pegawai, Siswa, Orang Tua, Yayasan, IT).
          </p>
        </div>
        <button
          onClick={onAddGroup}
          className="px-4 py-2 rounded-xl text-xs font-extrabold bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-600/20 transition-all flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah User Group</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {groups.map((g) => (
          <div
            key={g.id}
            className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">{g.name}</h4>
                  <p className="text-[10px] font-mono text-slate-400">{g.code}</p>
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300">{g.description}</p>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
              <span className="font-bold text-blue-600 dark:text-blue-400">{g.userCount} Terdaftar</span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => onEditGroup(g)}
                  className="p-1.5 text-slate-400 hover:text-blue-600 rounded-lg transition-colors"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => onDeleteGroup(g.id)}
                  className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
