import React from 'react';
import { ClassroomMaster } from '../../../types';
import { Edit2, Trash2, Layers, User, Users } from 'lucide-react';

interface ClassesTabProps {
  classrooms: ClassroomMaster[];
  searchQuery: string;
  onEdit: (classroom: ClassroomMaster) => void;
  onDelete: (id: string) => void;
}

export const ClassesTab: React.FC<ClassesTabProps> = ({
  classrooms,
  searchQuery,
  onEdit,
  onDelete,
}) => {
  const filteredClasses = classrooms.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.homeroomTeacherName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600 dark:text-slate-300">
            <thead className="bg-slate-50 dark:bg-slate-800/60 uppercase font-extrabold text-[10px] tracking-wider text-slate-400 dark:text-slate-500 border-b border-slate-200/80 dark:border-slate-800">
              <tr>
                <th className="px-4 py-3.5">Kode & Nama Rombel</th>
                <th className="px-4 py-3.5">Tingkat</th>
                <th className="px-4 py-3.5">Wali Kelas</th>
                <th className="px-4 py-3.5">Kapasitas</th>
                <th className="px-4 py-3.5">Tahun Ajaran</th>
                <th className="px-4 py-3.5 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-medium">
              {filteredClasses.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-slate-400">
                    Tidak ada data kelas yang cocok dengan pencarian.
                  </td>
                </tr>
              ) : (
                filteredClasses.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="px-4 py-3">
                      <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                        <Layers className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                        <span>{c.name}</span>
                      </div>
                      <div className="text-[10px] font-mono text-slate-400">Kode: {c.code}</div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200">
                        Kelas {c.gradeLevel}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1 text-slate-800 dark:text-slate-200 font-semibold">
                        <User className="w-3 h-3 text-amber-500 shrink-0" />
                        <span>{c.homeroomTeacherName}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1 text-slate-600 dark:text-slate-400">
                        <Users className="w-3 h-3 text-emerald-500 shrink-0" />
                        <span>{c.capacity} Siswa</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 font-mono text-slate-600 dark:text-slate-400">
                      {c.academicYear}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => onEdit(c)}
                          className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/60 rounded-lg transition-colors"
                          title="Edit Kelas"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => onDelete(c.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/60 rounded-lg transition-colors"
                          title="Hapus Kelas"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
