import React from 'react';
import { SchoolMaster } from '../../../types';
import { Edit2, Trash2, Building2, Mail, Phone, Award, MapPin } from 'lucide-react';

interface SchoolsTabProps {
  schools: SchoolMaster[];
  searchQuery: string;
  onEdit: (school: SchoolMaster) => void;
  onDelete: (id: string) => void;
}

export const SchoolsTab: React.FC<SchoolsTabProps> = ({
  schools,
  searchQuery,
  onEdit,
  onDelete,
}) => {
  const filteredSchools = schools.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.npsn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.principalName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.level.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600 dark:text-slate-300">
            <thead className="bg-slate-50 dark:bg-slate-800/60 uppercase font-extrabold text-[10px] tracking-wider text-slate-400 dark:text-slate-500 border-b border-slate-200/80 dark:border-slate-800">
              <tr>
                <th className="px-4 py-3.5">NPSN & Jenjang</th>
                <th className="px-4 py-3.5">Nama Resmi Instansi</th>
                <th className="px-4 py-3.5">Kepala Sekolah</th>
                <th className="px-4 py-3.5">Akreditasi</th>
                <th className="px-4 py-3.5">Kontak & Alamat</th>
                <th className="px-4 py-3.5 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-medium">
              {filteredSchools.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-slate-400">
                    Tidak ada data unit sekolah yang cocok dengan pencarian.
                  </td>
                </tr>
              ) : (
                filteredSchools.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="px-4 py-3 font-mono">
                      <div className="font-bold text-slate-900 dark:text-white">{s.npsn}</div>
                      <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                        {s.level}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                        <Building2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                        <span>{s.name}</span>
                      </div>
                      <div className="text-[10px] text-slate-400">Total Siswa: {s.studentsCount}</div>
                    </td>
                    <td className="px-4 py-3 font-semibold text-slate-800 dark:text-slate-200">
                      {s.principalName}
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                        <Award className="w-3 h-3 text-amber-500" />
                        Akreditasi {s.accreditation}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-[11px] space-y-0.5">
                      <div className="flex items-center gap-1 text-slate-600 dark:text-slate-400">
                        <Mail className="w-3 h-3 text-slate-400 shrink-0" />
                        <span>{s.email}</span>
                      </div>
                      <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
                        <MapPin className="w-3 h-3 text-rose-500 shrink-0" />
                        <span className="truncate max-w-[180px]">{s.address}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => onEdit(s)}
                          className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/60 rounded-lg transition-colors"
                          title="Edit Sekolah"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => onDelete(s.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/60 rounded-lg transition-colors"
                          title="Hapus Sekolah"
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
