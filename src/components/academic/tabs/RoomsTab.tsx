import React, { useState } from 'react';
import { Plus, Building, CheckCircle2, Clock, Wrench } from 'lucide-react';
import { RoomItem } from '../../../types/academicTypes';
import { initialRooms } from '../../../data/initialAcademicData';

export const RoomsTab: React.FC = () => {
  const [rooms] = useState<RoomItem[]>(initialRooms);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Master Data Ruangan & Laboratorium
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Fasilitas fisik ruang kelas, laboratorium komputer, IPA, perpustakaan, dan kapasitas.
          </p>
        </div>
        <button className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs flex items-center gap-2 shadow-sm">
          <Plus className="w-4 h-4" />
          <span>Tambah Ruangan Baru</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {rooms.map((r) => (
          <div
            key={r.id}
            className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">
                {r.code}
              </span>
              <span
                className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                  r.status === 'tersedia'
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-300'
                    : r.status === 'digunakan'
                    ? 'bg-blue-50 text-blue-700 border border-blue-300'
                    : 'bg-rose-50 text-rose-700 border border-rose-300'
                }`}
              >
                {r.status}
              </span>
            </div>

            <h4 className="text-base font-extrabold text-slate-900 dark:text-white">
              {r.name}
            </h4>

            <div className="text-xs text-slate-600 dark:text-slate-400 space-y-1">
              <p>Gedung: <strong className="text-slate-800 dark:text-slate-200">{r.building}</strong></p>
              <p>Kapasitas: <strong className="text-blue-600 dark:text-blue-400">{r.capacity} Kursi Siswa</strong></p>
              <p>Tipe: <span className="font-semibold">{r.type}</span></p>
            </div>

            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex flex-wrap gap-1">
              {r.facilities.map((f, idx) => (
                <span key={idx} className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[10px] text-slate-600 dark:text-slate-400 font-medium">
                  {f}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
