import React from 'react';
import { SubjectMaster } from '../../../types';
import { Edit2, Trash2, BookOpen, Clock, Tag } from 'lucide-react';

interface SubjectsTabProps {
  subjects: SubjectMaster[];
  searchQuery: string;
  onEdit: (subject: SubjectMaster) => void;
  onDelete: (id: string) => void;
}

export const SubjectsTab: React.FC<SubjectsTabProps> = ({
  subjects,
  searchQuery,
  onEdit,
  onDelete,
}) => {
  const filteredSubjects = subjects.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.curriculumGroup.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600 dark:text-slate-300">
            <thead className="bg-slate-50 dark:bg-slate-800/60 uppercase font-extrabold text-[10px] tracking-wider text-slate-400 dark:text-slate-500 border-b border-slate-200/80 dark:border-slate-800">
              <tr>
                <th className="px-4 py-3.5">Kode & Nama Mapel</th>
                <th className="px-4 py-3.5">Kategori</th>
                <th className="px-4 py-3.5">Kelompok Kurikulum</th>
                <th className="px-4 py-3.5">Beban Jam/Minggu</th>
                <th className="px-4 py-3.5">Target Kelas</th>
                <th className="px-4 py-3.5 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-medium">
              {filteredSubjects.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-slate-400">
                    Tidak ada data mata pelajaran yang cocok dengan pencarian.
                  </td>
                </tr>
              ) : (
                filteredSubjects.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="px-4 py-3">
                      <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                        <span>{s.name}</span>
                      </div>
                      <div className="text-[10px] font-mono text-slate-400">Kode: {s.code}</div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                        {s.category}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-semibold text-slate-800 dark:text-slate-200">
                      {s.curriculumGroup}
                    </td>
                    <td className="px-4 py-3 font-mono">
                      <div className="flex items-center gap-1 text-slate-700 dark:text-slate-300">
                        <Clock className="w-3 h-3 text-emerald-500 shrink-0" />
                        <span>{s.hoursPerWeek} JP / Minggu</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">
                      {s.gradeTarget}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => onEdit(s)}
                          className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/60 rounded-lg transition-colors"
                          title="Edit Mapel"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => onDelete(s.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/60 rounded-lg transition-colors"
                          title="Hapus Mapel"
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
