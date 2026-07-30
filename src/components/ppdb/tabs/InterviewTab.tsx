import React, { useState } from 'react';
import { PpdbInterviewSchedule } from '../../../types/ppdbTypes';
import { Calendar, User, Video, MapPin, CheckCircle2, Clock, Plus, Edit3 } from 'lucide-react';

interface InterviewTabProps {
  interviews: PpdbInterviewSchedule[];
  onAddInterview: (int: PpdbInterviewSchedule) => void;
}

export const InterviewTab: React.FC<InterviewTabProps> = ({ interviews, onAddInterview }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [applicantName, setApplicantName] = useState('');
  const [examinerName, setExaminerName] = useState('Dr. H. Ahmad Dahlan, M.Pd');
  const [scheduledTime, setScheduledTime] = useState('2026-02-20 09:00 - 10:00');
  const [locationOrLink, setLocationOrLink] = useState('Ruang Wawancara R-102');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    onAddInterview({
      id: `int-${Date.now()}`,
      applicantId: 'app-002',
      applicantName,
      examinerName,
      scheduledTime,
      locationOrLink,
      status: 'Terjadwal',
    });
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <Calendar className="w-4 h-4 text-emerald-600" />
            <span>Jadwal & Penilaian Wawancara Calon Siswa / Orang Tua</span>
          </h3>
          <p className="text-xs text-slate-500">
            Penjadwalan wawancara tatap muka atau video call (Google Meet / Zoom), penugasan penguji, & lembar penilaian.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/20 transition-all flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>Buat Jadwal Wawancara</span>
        </button>
      </div>

      {/* Grid Schedules */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {interviews.map((item) => (
          <div
            key={item.id}
            className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
                {item.status}
              </span>
              {item.score && (
                <span className="text-xs font-black text-emerald-600 font-mono">Nilai: {item.score}</span>
              )}
            </div>

            <div>
              <h4 className="text-sm font-extrabold text-slate-900 dark:text-white">{item.applicantName}</h4>
              <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                <User className="w-3.5 h-3.5 text-blue-500" /> Penguji: <strong>{item.examinerName}</strong>
              </p>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 text-xs space-y-1">
              <div className="flex items-center gap-1 text-slate-700 dark:text-slate-300">
                <Clock className="w-3.5 h-3.5 text-amber-500" />
                <span className="font-mono text-[11px] font-bold">{item.scheduledTime}</span>
              </div>
              <div className="flex items-center gap-1 text-slate-600 dark:text-slate-400">
                <MapPin className="w-3.5 h-3.5 text-rose-500" />
                <span className="truncate">{item.locationOrLink}</span>
              </div>
            </div>

            {item.notes && (
              <p className="text-[11px] text-slate-500 italic bg-slate-50 dark:bg-slate-800/40 p-2 rounded-xl">
                "{item.notes}"
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Modal Schedule */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full border border-slate-200 dark:border-slate-800 shadow-2xl p-6 space-y-4">
            <h3 className="text-base font-black text-slate-900 dark:text-white">Jadwal Wawancara Baru</h3>
            <form onSubmit={handleCreate} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300">Nama Calon Siswa</label>
                <input
                  type="text"
                  value={applicantName}
                  onChange={(e) => setApplicantName(e.target.value)}
                  placeholder="e.g. Anisa Kirana Dewi"
                  className="w-full mt-1 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300">Nama Penguji / Pewawancara</label>
                <input
                  type="text"
                  value={examinerName}
                  onChange={(e) => setExaminerName(e.target.value)}
                  className="w-full mt-1 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300">Waktu & Tanggal</label>
                <input
                  type="text"
                  value={scheduledTime}
                  onChange={(e) => setScheduledTime(e.target.value)}
                  className="w-full mt-1 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300">Lokasi Ruangan / Link Meet</label>
                <input
                  type="text"
                  value={locationOrLink}
                  onChange={(e) => setLocationOrLink(e.target.value)}
                  className="w-full mt-1 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  required
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 font-bold bg-slate-100"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-white font-bold bg-emerald-600 hover:bg-emerald-700 shadow-md"
                >
                  Simpan Jadwal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
