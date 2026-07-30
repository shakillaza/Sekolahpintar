import React from 'react';
import { ShieldAlert, AlertTriangle, CheckCircle2, Plus } from 'lucide-react';
import { TeacherViolationRecord } from '../../types/teacherTypes';

interface TeacherViolationTabProps {
  violations: TeacherViolationRecord[];
}

export const TeacherViolationTab: React.FC<TeacherViolationTabProps> = ({ violations }) => {
  return (
    <div className="space-y-4">
      <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center justify-between">
        <div>
          <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-rose-500" />
            Catatan Pelanggaran Kedisiplinan & Pembinaan
          </h2>
          <p className="text-xs text-slate-500">Monitoring Kategori Ringan, Sedang, Berat & Tindakan Pembinaan</p>
        </div>
        <button className="px-3 py-1.5 bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold rounded-lg shadow-sm flex items-center gap-1">
          <Plus className="w-3.5 h-3.5" />
          Catat Pelanggaran Baru
        </button>
      </div>

      <div className="space-y-3">
        {violations.length > 0 ? (
          violations.map((vio) => (
            <div key={vio.id} className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-rose-200/80 dark:border-rose-900/40 shadow-sm space-y-2">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 text-[10px] font-bold bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 rounded">
                    Kategori {vio.category}
                  </span>
                  <span className="text-xs font-bold text-slate-900 dark:text-slate-100">{vio.teacherName}</span>
                </div>
                <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded">
                  Status: {vio.status}
                </span>
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300">{vio.description}</p>
              <div className="text-[11px] text-slate-500 font-semibold pt-1 border-t border-slate-100 dark:border-slate-800">
                Tindakan Pembinaan: <span className="text-rose-600 dark:text-rose-400">{vio.actionTaken}</span>
              </div>
            </div>
          ))
        ) : (
          <div className="p-8 text-center text-slate-400 italic bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-800">
            Tidak ada catatan pelanggaran disiplin. Pendidik & Staf dalam performa bersih.
          </div>
        )}
      </div>
    </div>
  );
};
