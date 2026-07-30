import React, { useState } from 'react';
import { Plus, Calendar, Clock, UserCheck, Search } from 'lucide-react';
import { ExamScheduleItem } from '../../../types/academicTypes';
import { initialExamSchedules } from '../../../data/initialAcademicData';

export const ExamSchedulesTab: React.FC = () => {
  const [exams] = useState<ExamScheduleItem[]>(initialExamSchedules);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Jadwal Penilaian & Ujian (PTS, PAS, PAT, CBT)
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Plotting jadwal ujian, lokasi ruangan, dan pengawas ujian terintegrasi CBT.
          </p>
        </div>
        <button className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs flex items-center gap-2 shadow-sm">
          <Plus className="w-4 h-4" />
          <span>Tambah Jadwal Ujian</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {exams.map((ex) => (
          <div
            key={ex.id}
            className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-300">
                {ex.examType}
              </span>
              <span className="text-[10px] font-mono text-slate-400 font-bold">{ex.date}</span>
            </div>

            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
              {ex.title}
            </h4>
            <p className="text-xs text-blue-600 dark:text-blue-400 font-semibold">
              {ex.subjectName} ({ex.className})
            </p>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 text-xs space-y-1">
              <div className="flex justify-between">
                <span className="text-slate-500">Waktu:</span>
                <span className="font-mono font-bold text-slate-800 dark:text-slate-200">{ex.timeSlot}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Ruangan:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{ex.roomName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Pengawas:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{ex.proctorName}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
