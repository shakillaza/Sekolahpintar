import React, { useState } from 'react';
import { StudentCounselingRecord, StudentMasterItem } from '../../../types/studentTypes';
import { UserCheck, Plus, Calendar, FileText, CheckCircle2, AlertCircle } from 'lucide-react';

interface KonselingBkTabProps {
  students: StudentMasterItem[];
  counselings: StudentCounselingRecord[];
  onAddCounseling: (c: StudentCounselingRecord) => void;
}

export const KonselingBkTab: React.FC<KonselingBkTabProps> = ({ students, counselings, onAddCounseling }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [studentId, setStudentId] = useState(students[0]?.id || '');
  const [issueSummary, setIssueSummary] = useState('');
  const [counselorName, setCounselorName] = useState('Ibu Ratna Pertiwi, S.Psi. (Guru BK)');
  const [sessionResult, setSessionResult] = useState('');
  const [recommendations, setRecommendations] = useState('');
  const [followUpStatus, setFollowUpStatus] = useState<any>('Selesai');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const student = students.find((s) => s.id === studentId);
    if (!student || !issueSummary) return;

    const newCns: StudentCounselingRecord = {
      id: `cns-${Date.now()}`,
      studentId: student.id,
      studentName: student.fullName,
      issueSummary,
      counselorName,
      date: new Date().toISOString().split('T')[0],
      sessionResult: sessionResult || 'Sesi konseling berjalan kondusif.',
      recommendations: recommendations || 'Pendampingan rutin oleh wali kelas.',
      followUpStatus,
    };

    onAddCounseling(newCns);
    setIsModalOpen(false);
    setIssueSummary('');
  };

  return (
    <div className="space-y-6 text-xs">
      {/* Banner */}
      <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-300">
            <UserCheck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-sm font-black text-slate-900 dark:text-white">
              Sistem Bimbingan & Konseling (BK) Enterprise
            </h3>
            <p className="text-xs text-slate-400">
              Pencatatan sesi konsultasi, minat bakat, motivasi belajar, dan tindak lanjut psikologis.
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-md"
        >
          <Plus className="w-4 h-4" />
          <span>Buat Sesi BK Baru</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {counselings.map((c) => (
          <div
            key={c.id}
            className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="px-2.5 py-1 rounded-2xl text-[10px] font-extrabold bg-indigo-100 text-indigo-900 dark:bg-indigo-950 dark:text-indigo-300">
                  {c.followUpStatus}
                </span>
                <h4 className="font-extrabold text-sm text-slate-900 dark:text-white mt-2">
                  {c.studentName}
                </h4>
                <p className="text-[11px] text-slate-400">Konselor: {c.counselorName}</p>
              </div>

              <span className="font-mono text-[10px] text-slate-400">{c.date}</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 space-y-2">
              <div>
                <strong className="block text-slate-900 dark:text-white">Permasalahan / Topik:</strong>
                <p className="text-slate-600 dark:text-slate-300">{c.issueSummary}</p>
              </div>
              <div>
                <strong className="block text-slate-900 dark:text-white">Hasil Konseling:</strong>
                <p className="text-slate-600 dark:text-slate-300">{c.sessionResult}</p>
              </div>
              <div>
                <strong className="block text-indigo-600 dark:text-indigo-400">Rekomendasi BK:</strong>
                <p className="text-slate-700 dark:text-slate-200 font-medium">{c.recommendations}</p>
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
              Jadwal & Catatan Sesi BK Baru
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

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Permasalahan / Topik Konseling*</label>
                <textarea
                  value={issueSummary}
                  onChange={(e) => setIssueSummary(e.target.value)}
                  placeholder="Contoh: Konsultasi orientasi karir PTN / Penurunan kedisiplinan"
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold"
                  rows={2}
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Hasil Diskusi Sesi</label>
                <textarea
                  value={sessionResult}
                  onChange={(e) => setSessionResult(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                  rows={2}
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Rekomendasi Tindak Lanjut</label>
                <input
                  type="text"
                  value={recommendations}
                  onChange={(e) => setRecommendations(e.target.value)}
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
                  className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold"
                >
                  Simpan Catatan BK
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
