import React from 'react';
import { StudentMaster } from '../../../types';
import { Edit2, Trash2, GraduationCap, Mail, Phone, MapPin, Search, Filter } from 'lucide-react';

interface StudentsTabProps {
  students: StudentMaster[];
  searchQuery: string;
  onEdit: (student: StudentMaster) => void;
  onDelete: (id: string) => void;
}

export const StudentsTab: React.FC<StudentsTabProps> = ({
  students,
  searchQuery,
  onEdit,
  onDelete,
}) => {
  const filteredStudents = students.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.nis.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.nisn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.className.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4">
      {/* Table Container */}
      <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600 dark:text-slate-300">
            <thead className="bg-slate-50 dark:bg-slate-800/60 uppercase font-extrabold text-[10px] tracking-wider text-slate-400 dark:text-slate-500 border-b border-slate-200/80 dark:border-slate-800">
              <tr>
                <th className="px-4 py-3.5">NIS & NISN</th>
                <th className="px-4 py-3.5">Nama Siswa</th>
                <th className="px-4 py-3.5">Kelas / Rombel</th>
                <th className="px-4 py-3.5">Email & No HP Ortu</th>
                <th className="px-4 py-3.5">Status</th>
                <th className="px-4 py-3.5 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-medium">
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-slate-400">
                    Tidak ada data siswa yang cocok dengan pencarian.
                  </td>
                </tr>
              ) : (
                filteredStudents.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="px-4 py-3 font-mono">
                      <div className="font-bold text-slate-900 dark:text-white">{s.nis}</div>
                      <div className="text-[10px] text-slate-400">NISN: {s.nisn}</div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                        <GraduationCap className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                        <span>{s.name}</span>
                      </div>
                      <div className="text-[10px] text-slate-400">Tahun Masuk: {s.entryYear} ({s.gender === 'L' ? 'Laki-laki' : 'Perempuan'})</div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                        {s.className}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-[11px] space-y-0.5">
                      <div className="flex items-center gap-1 text-slate-600 dark:text-slate-400">
                        <Mail className="w-3 h-3 text-slate-400 shrink-0" />
                        <span>{s.email}</span>
                      </div>
                      <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
                        <Phone className="w-3 h-3 text-emerald-500 shrink-0" />
                        <span>Ortu: {s.parentPhone}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                          s.status === 'Aktif'
                            ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800'
                            : 'bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400 border border-amber-200 dark:border-amber-800'
                        }`}
                      >
                        {s.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => onEdit(s)}
                          className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/60 rounded-lg transition-colors"
                          title="Edit Data Siswa"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => onDelete(s.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/60 rounded-lg transition-colors"
                          title="Hapus Siswa"
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
