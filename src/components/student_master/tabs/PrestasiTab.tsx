import React, { useState } from 'react';
import { StudentAchievementRecord, StudentMasterItem } from '../../../types/studentTypes';
import { Award, Plus, Upload, Calendar, FileText, CheckCircle2 } from 'lucide-react';

interface PrestasiTabProps {
  students: StudentMasterItem[];
  achievements: StudentAchievementRecord[];
  onAddAchievement: (record: StudentAchievementRecord) => void;
}

export const PrestasiTab: React.FC<PrestasiTabProps> = ({ students, achievements, onAddAchievement }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [studentId, setStudentId] = useState(students[0]?.id || '');
  const [category, setCategory] = useState<'Akademik' | 'Non Akademik'>('Akademik');
  const [title, setTitle] = useState('');
  const [level, setLevel] = useState<any>('Nasional');
  const [rank, setRank] = useState('Juara 1 (Medali Emas)');
  const [organizer, setOrganizer] = useState('Kemendikbudristek RI');
  const [points, setPoints] = useState(50);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const student = students.find((s) => s.id === studentId);
    if (!student || !title) return;

    const newAch: StudentAchievementRecord = {
      id: `ach-${Date.now()}`,
      studentId: student.id,
      studentName: student.fullName,
      category,
      title,
      level,
      rank,
      eventDate: new Date().toISOString().split('T')[0],
      organizer,
      points,
    };

    onAddAchievement(newAch);
    setIsModalOpen(false);
    setTitle('');
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-300">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-sm font-black text-slate-900 dark:text-white">
              Rekapitulasi Prestasi Akademik & Non-Akademik
            </h3>
            <p className="text-xs text-slate-400">
              Pencatatan prestasi tingkat Sekolah, Kabupaten, Provinsi, Nasional & Internasional beserta sertifikat.
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-md"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Prestasi Siswa</span>
        </button>
      </div>

      {/* Grid of Achievements */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        {achievements.map((ach) => (
          <div
            key={ach.id}
            className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 mr-2">
                  {ach.category}
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                  Tingkat {ach.level}
                </span>
                <h4 className="font-black text-sm text-slate-900 dark:text-white mt-2">
                  {ach.title}
                </h4>
                <p className="text-[11px] font-bold text-blue-600 dark:text-blue-400">
                  {ach.studentName}
                </p>
              </div>

              <div className="text-right font-mono">
                <span className="text-xs font-black text-emerald-600 block">+{ach.points} Pts</span>
                <span className="text-[10px] text-slate-400">{ach.eventDate}</span>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 space-y-1">
              <div className="flex justify-between">
                <span className="text-slate-500">Peringkat / Raihan:</span>
                <span className="font-extrabold text-slate-900 dark:text-white">{ach.rank}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Penyelenggara:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{ach.organizer}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl max-w-lg w-full p-6 space-y-4">
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3">
              Input Prestasi Siswa Baru
            </h3>

            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Pilih Siswa*</label>
                <select
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold text-slate-900 dark:text-white"
                >
                  {students.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.fullName} ({s.className})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Kategori</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold"
                  >
                    <option value="Akademik">Akademik</option>
                    <option value="Non Akademik">Non Akademik</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Tingkat</label>
                  <select
                    value={level}
                    onChange={(e) => setLevel(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold"
                  >
                    <option value="Sekolah">Sekolah</option>
                    <option value="Kabupaten">Kabupaten / Kota</option>
                    <option value="Provinsi">Provinsi</option>
                    <option value="Nasional">Nasional</option>
                    <option value="Internasional">Internasional</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Judul / Lomba Prestasi*</label>
                <input
                  type="text"
                  placeholder="Contoh: Olimpiade Matematika Nasional"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Peringkat / Medali</label>
                  <input
                    type="text"
                    value={rank}
                    onChange={(e) => setRank(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Poin Reward</label>
                  <input
                    type="number"
                    value={points}
                    onChange={(e) => setPoints(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Penyelenggara</label>
                <input
                  type="text"
                  value={organizer}
                  onChange={(e) => setOrganizer(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold"
                >
                  Simpan Prestasi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
