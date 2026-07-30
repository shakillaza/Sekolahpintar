import React, { useState } from 'react';
import {
  Clock,
  Plus,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  Copy,
  Download,
  Filter,
  RefreshCw,
  Building,
  UserCheck,
  BookOpen,
} from 'lucide-react';
import { LessonScheduleItem, LessonPeriodItem } from '../../../types/academicTypes';
import {
  initialLessonSchedules,
  initialLessonPeriods,
  initialClasses,
} from '../../../data/initialAcademicData';

interface LessonSchedulesTabProps {
  onOpenAiModal: () => void;
  onOpenAddModal: () => void;
}

export const LessonSchedulesTab: React.FC<LessonSchedulesTabProps> = ({
  onOpenAiModal,
  onOpenAddModal,
}) => {
  const [schedules, setSchedules] = useState<LessonScheduleItem[]>(initialLessonSchedules);
  const [periods] = useState<LessonPeriodItem[]>(initialLessonPeriods);
  const [selectedClassId, setSelectedClassId] = useState<string>('cls-10-ipa-1');
  const [isAiOptimizing, setIsAiOptimizing] = useState(false);

  const days: Array<'Senin' | 'Selasa' | 'Rabu' | 'Kamis' | 'Jumat'> = [
    'Senin',
    'Selasa',
    'Rabu',
    'Kamis',
    'Jumat',
  ];

  const selectedClass = initialClasses.find((c) => c.id === selectedClassId);

  // Filter schedules for the active selected class
  const classSchedules = schedules.filter((s) => s.classId === selectedClassId);

  // Check conflicts
  const conflictCount = schedules.filter((s) => s.hasConflict).length;

  const handleSimulateAiScheduler = () => {
    setIsAiOptimizing(true);
    setTimeout(() => {
      setIsAiOptimizing(false);
      // Remove conflicts & optimize
      setSchedules((prev) =>
        prev.map((s) => ({ ...s, hasConflict: false, conflictReason: undefined }))
      );
      alert('⚡ Smart AI Scheduler berhasil menyusun dan mengoptimalkan jadwal tanpa bentrok!');
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <Clock className="w-5 h-5 text-blue-600" />
            <span>Schedule Builder & Grid Matrix Pelajaran</span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Penjadwalan matriks KBM interaktif dengan deteksi bentrok otomatis real-time & AI Smart Scheduler.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleSimulateAiScheduler}
            disabled={isAiOptimizing}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-extrabold text-xs shadow-md shadow-amber-500/20 flex items-center gap-2 transition-transform active:scale-95 disabled:opacity-50"
          >
            <Sparkles className={`w-4 h-4 ${isAiOptimizing ? 'animate-spin' : ''}`} />
            <span>{isAiOptimizing ? 'Menyusun AI...' : 'Jalankan Smart AI Scheduler'}</span>
          </button>
          <button
            onClick={onOpenAddModal}
            className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs flex items-center gap-2 shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Slot Jadwal</span>
          </button>
          <button className="px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-xs hover:bg-slate-100 flex items-center gap-1.5">
            <Download className="w-4 h-4" />
            <span>Export (PDF/Excel)</span>
          </button>
        </div>
      </div>

      {/* Conflict Alert Banner */}
      {conflictCount > 0 ? (
        <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/80 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
            <div className="text-xs text-amber-900 dark:text-amber-200 font-medium">
              <strong className="font-bold">Deteksi {conflictCount} Jadwal Bentrok!</strong> Terdapat jadwal mengajar guru/ruangan yang bersamaan.
            </div>
          </div>
          <button
            onClick={handleSimulateAiScheduler}
            className="px-3 py-1.5 rounded-xl bg-amber-600 text-white font-bold text-xs shrink-0 hover:bg-amber-700"
          >
            Selesaikan dengan AI
          </button>
        </div>
      ) : (
        <div className="p-3.5 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 flex items-center gap-2 text-xs font-semibold text-emerald-800 dark:text-emerald-300">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Status Penjadwalan: Terverifikasi 0% Bentrok (100% Valid & Optimal)</span>
        </div>
      )}

      {/* Class Selector Filter */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
            Pilih Kelas Target:
          </span>
          <div className="flex flex-wrap gap-2">
            {initialClasses.map((cls) => (
              <button
                key={cls.id}
                onClick={() => setSelectedClassId(cls.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedClassId === cls.id
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                }`}
              >
                {cls.name}
              </button>
            ))}
          </div>
        </div>

        <div className="text-xs text-slate-500 font-medium">
          Wali Kelas: <strong className="text-slate-800 dark:text-slate-200">{selectedClass?.homeroomTeacherName}</strong> | Ruangan: <strong className="text-slate-800 dark:text-slate-200">{selectedClass?.roomName}</strong>
        </div>
      </div>

      {/* Interactive Schedule Matrix Grid */}
      <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/60 text-[11px] font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200/80 dark:border-slate-800">
                <th className="py-3.5 px-3 text-center w-24">Jam Ke-</th>
                <th className="py-3.5 px-3 text-center w-28">Waktu</th>
                {days.map((day) => (
                  <th key={day} className="py-3.5 px-3 text-center">
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-xs">
              {periods.map((period) => {
                if (period.isBreakTime) {
                  return (
                    <tr key={period.id} className="bg-amber-50/40 dark:bg-amber-950/20">
                      <td className="py-2.5 px-3 text-center font-bold text-amber-700 dark:text-amber-400 text-[11px]" colSpan={2}>
                        {period.startTime} - {period.endTime}
                      </td>
                      <td className="py-2.5 px-3 text-center font-bold text-amber-700 dark:text-amber-400 text-[11px] uppercase tracking-wider" colSpan={5}>
                        ☕ {period.notes || 'Istirahat & Keagamaan'}
                      </td>
                    </tr>
                  );
                }

                return (
                  <tr key={period.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="py-3 px-3 text-center font-mono font-bold text-slate-500 bg-slate-50/30 dark:bg-slate-800/20">
                      {period.periodNumber}
                    </td>
                    <td className="py-3 px-3 text-center font-mono text-[11px] font-semibold text-slate-600 dark:text-slate-400">
                      {period.startTime} - {period.endTime}
                    </td>

                    {days.map((day) => {
                      const slot = classSchedules.find(
                        (s) => s.day === day && s.periodNumber === period.periodNumber
                      );

                      if (!slot) {
                        return (
                          <td key={day} className="py-2 px-2 text-center">
                            <button
                              onClick={onOpenAddModal}
                              className="w-full py-3 rounded-xl border border-dashed border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-500 hover:bg-blue-50/50 dark:hover:bg-blue-950/20 text-slate-400 hover:text-blue-600 transition-all text-[11px] font-medium flex items-center justify-center gap-1 group"
                            >
                              <Plus className="w-3.5 h-3.5 group-hover:scale-125 transition-transform" />
                              <span>Kosong</span>
                            </button>
                          </td>
                        );
                      }

                      return (
                        <td key={day} className="py-2 px-2">
                          <div
                            className={`p-2.5 rounded-xl border transition-all ${
                              slot.hasConflict
                                ? 'bg-amber-50 dark:bg-amber-950/50 border-amber-400 text-amber-950'
                                : 'bg-gradient-to-br from-blue-50/80 to-indigo-50/80 dark:from-slate-800 dark:to-slate-800/80 border-blue-200 dark:border-slate-700 text-slate-900 dark:text-white shadow-sm'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-extrabold text-blue-700 dark:text-blue-300 text-xs truncate">
                                {slot.subjectName}
                              </span>
                              <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400">
                                {slot.roomName}
                              </span>
                            </div>
                            <p className="text-[10px] text-slate-600 dark:text-slate-400 truncate font-medium">
                              {slot.teacherName}
                            </p>
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
