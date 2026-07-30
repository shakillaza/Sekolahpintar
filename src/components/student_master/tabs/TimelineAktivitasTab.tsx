import React, { useState } from 'react';
import { StudentTimelineEvent, StudentMasterItem } from '../../../types/studentTypes';
import { Calendar, Award, FileText, UserCheck, GraduationCap, Clock, Filter, CheckCircle2, AlertTriangle, Key } from 'lucide-react';

interface TimelineAktivitasTabProps {
  students: StudentMasterItem[];
  selectedStudent: StudentMasterItem;
  timelines: StudentTimelineEvent[];
  onSelectStudent: (s: StudentMasterItem) => void;
}

export const TimelineAktivitasTab: React.FC<TimelineAktivitasTabProps> = ({
  students,
  selectedStudent,
  timelines,
  onSelectStudent,
}) => {
  const [filterCategory, setFilterCategory] = useState('ALL');

  const studentTimeline = timelines.filter(
    (t) =>
      t.studentId === selectedStudent.id &&
      (filterCategory === 'ALL' || t.category === filterCategory)
  );

  return (
    <div className="space-y-6 text-xs">
      {/* Student Picker Bar & Category Filter */}
      <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-300">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-sm font-black text-slate-900 dark:text-white">
              Timeline Aktivitas Siswa Kronologis
            </h3>
            <p className="text-xs text-slate-400">
              Rekam jejak terpadu: PPDB, Presensi, Nilai, Prestasi, Pelanggaran, Konseling, Pembayaran & Dokumen.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <select
            value={selectedStudent.id}
            onChange={(e) => {
              const found = students.find((s) => s.id === e.target.value);
              if (found) onSelectStudent(found);
            }}
            className="px-3 py-2 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200"
          >
            {students.map((s) => (
              <option key={s.id} value={s.id}>
                {s.fullName} ({s.className})
              </option>
            ))}
          </select>

          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-3 py-2 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200"
          >
            <option value="ALL">Semua Kategori</option>
            <option value="PPDB">PPDB</option>
            <option value="Nilai">Nilai</option>
            <option value="Prestasi">Prestasi</option>
            <option value="Pelanggaran">Pelanggaran</option>
            <option value="Konseling">Konseling</option>
          </select>
        </div>
      </div>

      {/* Chronological Timeline */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm relative space-y-6">
        {studentTimeline.length === 0 ? (
          <div className="p-8 text-center text-slate-400 font-medium">
            Belum ada catatan aktivitas untuk kategori ini.
          </div>
        ) : (
          studentTimeline.map((item, idx) => (
            <div key={item.id} className="flex gap-4 relative">
              {/* Vertical Connector Line */}
              {idx < studentTimeline.length - 1 && (
                <div className="absolute left-4 top-8 bottom-0 w-0.5 bg-slate-200 dark:bg-slate-800" />
              )}

              {/* Node Icon */}
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs shrink-0 z-10 shadow-md">
                {idx + 1}
              </div>

              {/* Event Content */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300">
                    {item.category}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">{item.timestamp}</span>
                </div>
                <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">
                  {item.title}
                </h4>
                <p className="text-slate-600 dark:text-slate-300 text-[11px] font-medium">
                  {item.description}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
