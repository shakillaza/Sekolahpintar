import React from 'react';
import { TeacherMaster } from '../../../types';
import { Edit2, Trash2, UserCheck, Mail, Phone, BookOpen } from 'lucide-react';

interface TeachersTabProps {
  teachers: TeacherMaster[];
  searchQuery: string;
  onEdit: (teacher: TeacherMaster) => void;
  onDelete: (id: string) => void;
}

export const TeachersTab: React.FC<TeachersTabProps> = ({
  teachers,
  searchQuery,
  onEdit,
  onDelete,
}) => {
  const filteredTeachers = teachers.filter(
    (t) =>
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.nip.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.roleTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600 dark:text-slate-300">
            <thead className="bg-slate-50 dark:bg-slate-800/60 uppercase font-extrabold text-[10px] tracking-wider text-slate-400 dark:text-slate-500 border-b border-slate-200/80 dark:border-slate-800">
              <tr>
                <th className="px-4 py-3.5">NIP / NUPTK</th>
                <th className="px-4 py-3.5">Nama Guru / Pegawai</th>
                <th className="px-4 py-3.5">Jabatan & Status</th>
                <th className="px-4 py-3.5">Spesialisasi Mapel</th>
                <th className="px-4 py-3.5">Kontak Resmi</th>
                <th className="px-4 py-3.5 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-medium">
              {filteredTeachers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-slate-400">
                    Tidak ada data guru yang cocok dengan pencarian.
                  </td>
                </tr>
              ) : (
                filteredTeachers.map((t) => (
                  <tr key={t.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="px-4 py-3 font-mono">
                      <div className="font-bold text-slate-900 dark:text-white">{t.nip}</div>
                      <div className="text-[10px] text-slate-400">Gender: {t.gender === 'L' ? 'Laki-laki' : 'Perempuan'}</div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                        <UserCheck className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                        <span>{t.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-extrabold text-slate-800 dark:text-slate-200">{t.roleTitle}</div>
                      <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                        {t.employmentStatus}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1 text-slate-700 dark:text-slate-300">
                        <BookOpen className="w-3 h-3 text-blue-500 shrink-0" />
                        <span>{t.subjectSpecialization}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-[11px] space-y-0.5">
                      <div className="flex items-center gap-1 text-slate-600 dark:text-slate-400">
                        <Mail className="w-3 h-3 text-slate-400 shrink-0" />
                        <span>{t.email}</span>
                      </div>
                      <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
                        <Phone className="w-3 h-3 text-emerald-500 shrink-0" />
                        <span>{t.phone}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => onEdit(t)}
                          className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/60 rounded-lg transition-colors"
                          title="Edit Guru"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => onDelete(t.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/60 rounded-lg transition-colors"
                          title="Hapus Guru"
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
