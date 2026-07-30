import React, { useState } from 'react';
import { Plus, Search, Layers, Users, Home, Edit } from 'lucide-react';
import { ClassItem } from '../../../types/academicTypes';
import { initialClasses } from '../../../data/initialAcademicData';

export const ClassesTab: React.FC = () => {
  const [classes] = useState<ClassItem[]>(initialClasses);
  const [search, setSearch] = useState('');

  const filtered = classes.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.code.toLowerCase().includes(search.toLowerCase()) ||
      c.homeroomTeacherName?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Data Kelas Akademik
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Daftar entitas kelas, tingkat jenjang, jurusan, kuota kapasitas, dan wali kelas.
          </p>
        </div>
        <button className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs flex items-center gap-2 shadow-sm">
          <Plus className="w-4 h-4" />
          <span>Tambah Kelas Baru</span>
        </button>
      </div>

      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Cari kelas, kode, atau nama Wali Kelas..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 focus:outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">
                {item.code}
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300">
                Jenjang {item.gradeLevel} {item.major ? `• ${item.major}` : ''}
              </span>
            </div>

            <h4 className="text-lg font-extrabold text-slate-900 dark:text-white">
              {item.name}
            </h4>

            <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <Users className="w-3.5 h-3.5 text-indigo-500" />
                <span>Siswa: <strong className="text-slate-900 dark:text-white">{item.enrolledStudents} / {item.capacity}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Home className="w-3.5 h-3.5 text-amber-500" />
                <span>Ruangan: <strong className="text-slate-900 dark:text-white">{item.roomName}</strong></span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-500 truncate max-w-[140px]" title={item.homeroomTeacherName}>
                WK: <strong>{item.homeroomTeacherName || 'Belum Ada'}</strong>
              </span>
              <button className="text-blue-600 hover:underline font-bold text-[11px]">
                Detail Rombel
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
