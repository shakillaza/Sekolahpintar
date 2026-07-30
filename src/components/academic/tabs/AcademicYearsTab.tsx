import React, { useState } from 'react';
import { Plus, Search, Calendar, CheckCircle, Clock, Edit, Trash2 } from 'lucide-react';
import { AcademicYearItem } from '../../../types/academicTypes';
import { initialAcademicYears } from '../../../data/initialAcademicData';

export const AcademicYearsTab: React.FC = () => {
  const [years, setYears] = useState<AcademicYearItem[]>(initialAcademicYears);
  const [search, setSearch] = useState('');

  const filteredYears = years.filter((y) =>
    y.year.toLowerCase().includes(search.toLowerCase()) ||
    y.description?.toLowerCase().includes(search.toLowerCase())
  );

  const handleToggleStatus = (id: string) => {
    setYears(
      years.map((y) => (y.id === id ? { ...y, status: y.status === 'aktif' ? 'non_aktif' : 'aktif' } : y))
    );
  };

  return (
    <div className="space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Manajemen Tahun Ajaran
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Kelola periode kalender akademik sekolah dan status tahun ajaran aktif.
          </p>
        </div>
        <button className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs flex items-center gap-2 shadow-sm transition-colors">
          <Plus className="w-4 h-4" />
          <span>Tambah Tahun Ajaran Baru</span>
        </button>
      </div>

      {/* Filter & Search */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Cari tahun ajaran (e.g. 2025/2026)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
        </div>
      </div>

      {/* Data Table */}
      <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/60 text-[11px] font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200/80 dark:border-slate-800">
                <th className="py-3.5 px-4">Tahun Ajaran</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Tanggal Tanggal</th>
                <th className="py-3.5 px-4">Total Siswa</th>
                <th className="py-3.5 px-4">Total Kelas</th>
                <th className="py-3.5 px-4">Keterangan</th>
                <th className="py-3.5 px-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-xs">
              {filteredYears.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="py-3.5 px-4 font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    <span>{item.year}</span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        item.status === 'aktif'
                          ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800'
                          : item.status === 'perencanaan'
                          ? 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-300 dark:border-amber-800'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-500 border border-slate-200 dark:border-slate-700'
                      }`}
                    >
                      {item.status === 'aktif' ? (
                        <>
                          <CheckCircle className="w-3 h-3" /> Aktif (Berjalan)
                        </>
                      ) : item.status === 'perencanaan' ? (
                        <>
                          <Clock className="w-3 h-3" /> Perencanaan
                        </>
                      ) : (
                        'Selesai / Non-Aktif'
                      )}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">
                    {item.startDate} s/d {item.endDate}
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-slate-800 dark:text-slate-200">
                    {item.totalStudents} Siswa
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-slate-800 dark:text-slate-200">
                    {item.totalClasses} Rombel
                  </td>
                  <td className="py-3.5 px-4 text-slate-500 max-w-xs truncate">
                    {item.description}
                  </td>
                  <td className="py-3.5 px-4 text-right space-x-2">
                    <button
                      onClick={() => handleToggleStatus(item.id)}
                      className="px-2.5 py-1 rounded-lg text-[10px] font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 transition-colors"
                    >
                      {item.status === 'aktif' ? 'Non-Aktifkan' : 'Aktifkan'}
                    </button>
                    <button className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                      <Edit className="w-3.5 h-3.5" />
                    </button>
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
