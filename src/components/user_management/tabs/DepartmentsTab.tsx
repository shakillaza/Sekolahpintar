import React from 'react';
import { DepartmentModel } from '../../../types';
import { Building2, Plus, Edit2, Trash2, UserCheck } from 'lucide-react';

interface DepartmentsTabProps {
  departments: DepartmentModel[];
  onAddDepartment: () => void;
  onEditDepartment: (dept: DepartmentModel) => void;
  onDeleteDepartment: (id: string) => void;
}

export const DepartmentsTab: React.FC<DepartmentsTabProps> = ({
  departments,
  onAddDepartment,
  onEditDepartment,
  onDeleteDepartment,
}) => {
  return (
    <div className="space-y-4">
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <Building2 className="w-4 h-4 text-emerald-500" />
            <span>Manajemen Departemen & Divisi Sekolah ({departments.length})</span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Kelola struktur departemen fungsional institusi sekolah dan penanggung jawab unit kerja.
          </p>
        </div>
        <button
          onClick={onAddDepartment}
          className="px-4 py-2 rounded-xl text-xs font-extrabold bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-600/20 transition-all flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Departemen</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {departments.map((d) => (
          <div
            key={d.id}
            className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600">
                  <Building2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">{d.name}</h4>
                  <p className="text-[10px] font-mono text-slate-400">{d.code}</p>
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300">{d.description}</p>

            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 text-[11px] space-y-1">
              <div className="flex justify-between text-slate-500">
                <span>Kepala Unit / Head:</span>
                <span className="font-bold text-slate-900 dark:text-white">{d.headName}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Jumlah Staf:</span>
                <span className="font-bold text-emerald-600">{d.staffCount} Orang</span>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end gap-1">
              <button
                onClick={() => onEditDepartment(d)}
                className="p-1.5 text-slate-400 hover:text-blue-600 rounded-lg transition-colors"
              >
                <Edit2 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => onDeleteDepartment(d.id)}
                className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
