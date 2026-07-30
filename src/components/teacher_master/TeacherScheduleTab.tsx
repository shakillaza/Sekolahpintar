import React, { useState } from 'react';
import { Clock, Calendar, Plus, BookOpen, MapPin, Users } from 'lucide-react';
import { TeacherSchedule, TeacherMasterItem } from '../../types/teacherTypes';

interface TeacherScheduleTabProps {
  schedules: TeacherSchedule[];
  teachers: TeacherMasterItem[];
}

export const TeacherScheduleTab: React.FC<TeacherScheduleTabProps> = ({
  schedules,
  teachers
}) => {
  const [selectedDay, setSelectedDay] = useState<string>('ALL');

  const days = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];

  const filteredSchedules = schedules.filter(s => selectedDay === 'ALL' || s.day === selectedDay);

  return (
    <div className="space-y-4">
      <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
        <div>
          <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Clock className="w-4 h-4 text-blue-600" />
            Jadwal Mengajar & Matrix Beban Jam Tatap Muka
          </h2>
          <p className="text-xs text-slate-500">Alokasi Kelas, Ruangan, Waktu Sesi, Jam Mengajar & Semester</p>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={selectedDay}
            onChange={(e) => setSelectedDay(e.target.value)}
            className="px-3 py-2 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-300"
          >
            <option value="ALL">Semua Hari</option>
            {days.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
          <button className="px-3 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-lg shadow-sm flex items-center gap-1">
            <Plus className="w-3.5 h-3.5" />
            Tambah Jadwal
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredSchedules.map((sch) => (
          <div key={sch.id} className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3">
            <div className="flex justify-between items-start border-b border-slate-100 dark:border-slate-800 pb-2">
              <span className="px-2.5 py-1 text-xs font-extrabold bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 rounded-md">
                {sch.day} • {sch.timeSlot}
              </span>
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                {sch.teachingHours} Jam Mengajar
              </span>
            </div>

            <div>
              <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">{sch.subject}</h3>
              <p className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold">{sch.teacherName}</p>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
              <span className="flex items-center gap-1 font-medium text-slate-700 dark:text-slate-300">
                <Users className="w-3.5 h-3.5 text-blue-500" /> Kelas: {sch.className}
              </span>
              <span className="flex items-center gap-1 font-medium text-slate-700 dark:text-slate-300">
                <MapPin className="w-3.5 h-3.5 text-rose-500" /> Ruang: {sch.room}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
