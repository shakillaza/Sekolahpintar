import React from 'react';
import { Calendar, CheckCircle2, AlertCircle, Clock, XCircle, FileText } from 'lucide-react';
import { TeacherAttendanceRecord } from '../../types/teacherTypes';

interface TeacherAttendanceTabProps {
  attendances: TeacherAttendanceRecord[];
}

export const TeacherAttendanceTab: React.FC<TeacherAttendanceTabProps> = ({ attendances }) => {
  return (
    <div className="space-y-4">
      <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center justify-between">
        <div>
          <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-emerald-600" />
            Monitoring Absensi & Presensi Kehadiran Realtime
          </h2>
          <p className="text-xs text-slate-500">Log Check-In, Check-Out, RFID Tap, Hadir, Izin, Sakit, Cuti, & Lembur</p>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-hidden">
        <table className="w-full text-left text-xs text-slate-600 dark:text-slate-300">
          <thead className="bg-slate-100 dark:bg-slate-900/60 uppercase text-[10px] text-slate-500 font-bold border-b border-slate-200 dark:border-slate-800">
            <tr>
              <th className="px-4 py-3">Tanggal</th>
              <th className="px-4 py-3">Nama Guru / Pegawai</th>
              <th className="px-4 py-3">Jam Masuk (Check-In)</th>
              <th className="px-4 py-3">Jam Keluar (Check-Out)</th>
              <th className="px-4 py-3 text-center">Status</th>
              <th className="px-4 py-3">Catatan / Keterangan</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {attendances.map((att) => (
              <tr key={att.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30">
                <td className="px-4 py-3 font-semibold text-slate-900 dark:text-slate-100">{att.date}</td>
                <td className="px-4 py-3 font-bold text-indigo-600 dark:text-indigo-400">{att.teacherName}</td>
                <td className="px-4 py-3 font-mono text-emerald-600 dark:text-emerald-400">{att.checkIn}</td>
                <td className="px-4 py-3 font-mono text-slate-500">{att.checkOut}</td>
                <td className="px-4 py-3 text-center">
                  <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${
                    att.status === 'Hadir' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' :
                    att.status === 'Terlambat' ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300' :
                    'bg-slate-100 text-slate-800'
                  }`}>
                    {att.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-slate-500 italic">{att.notes || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
