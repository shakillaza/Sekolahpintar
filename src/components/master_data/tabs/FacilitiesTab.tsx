import React from 'react';
import { FacilityMaster } from '../../../types';
import { Edit2, Trash2, DoorOpen, Building, CheckCircle2 } from 'lucide-react';

interface FacilitiesTabProps {
  facilities: FacilityMaster[];
  searchQuery: string;
  onEdit: (facility: FacilityMaster) => void;
  onDelete: (id: string) => void;
}

export const FacilitiesTab: React.FC<FacilitiesTabProps> = ({
  facilities,
  searchQuery,
  onEdit,
  onDelete,
}) => {
  const filteredFacilities = facilities.filter(
    (f) =>
      f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.buildingName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600 dark:text-slate-300">
            <thead className="bg-slate-50 dark:bg-slate-800/60 uppercase font-extrabold text-[10px] tracking-wider text-slate-400 dark:text-slate-500 border-b border-slate-200/80 dark:border-slate-800">
              <tr>
                <th className="px-4 py-3.5">Kode & Nama Ruangan</th>
                <th className="px-4 py-3.5">Tipe Ruangan</th>
                <th className="px-4 py-3.5">Gedung / Lokasi</th>
                <th className="px-4 py-3.5">Kapasitas</th>
                <th className="px-4 py-3.5">Kondisi Fasilitas</th>
                <th className="px-4 py-3.5 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-medium">
              {filteredFacilities.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-slate-400">
                    Tidak ada data ruangan/gedung yang cocok dengan pencarian.
                  </td>
                </tr>
              ) : (
                filteredFacilities.map((f) => (
                  <tr key={f.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="px-4 py-3">
                      <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                        <DoorOpen className="w-3.5 h-3.5 text-teal-500 shrink-0" />
                        <span>{f.name}</span>
                      </div>
                      <div className="text-[10px] font-mono text-slate-400">Kode: {f.code}</div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-300 border border-teal-200 dark:border-teal-800">
                        {f.type}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-semibold text-slate-800 dark:text-slate-200">
                      <div className="flex items-center gap-1">
                        <Building className="w-3 h-3 text-slate-400 shrink-0" />
                        <span>{f.buildingName}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 font-mono text-slate-700 dark:text-slate-300">
                      {f.capacity} Orang
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                        <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                        {f.condition}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => onEdit(f)}
                          className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/60 rounded-lg transition-colors"
                          title="Edit Ruangan"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => onDelete(f.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/60 rounded-lg transition-colors"
                          title="Hapus Ruangan"
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
