import React, { useState } from 'react';
import { StudentViolationRecord, StudentMasterItem } from '../../../types/studentTypes';
import { AlertTriangle, Plus, ShieldAlert, UserX, FileText, CheckCircle2 } from 'lucide-react';

interface PelanggaranTabProps {
  students: StudentMasterItem[];
  violations: StudentViolationRecord[];
  onAddViolation: (v: StudentViolationRecord) => void;
}

export const PelanggaranTab: React.FC<PelanggaranTabProps> = ({ students, violations, onAddViolation }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [studentId, setStudentId] = useState(students[0]?.id || '');
  const [category, setCategory] = useState<'Ringan' | 'Sedang' | 'Berat'>('Ringan');
  const [violationName, setViolationName] = useState('');
  const [points, setPoints] = useState(10);
  const [reportingTeacher, setReportingTeacher] = useState('Guru Piket / Kesiswaan');
  const [actionTaken, setActionTaken] = useState('Peringatan Lisan & Pembinaan Wali Kelas');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const student = students.find((s) => s.id === studentId);
    if (!student || !violationName) return;

    const newVio: StudentViolationRecord = {
      id: `vio-${Date.now()}`,
      studentId: student.id,
      studentName: student.fullName,
      category,
      violationName,
      points,
      date: new Date().toISOString().split('T')[0],
      reportingTeacher,
      actionTaken,
      status: 'Dalam Pembinaan',
    };

    onAddViolation(newVio);
    setIsModalOpen(false);
    setViolationName('');
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-300">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-sm font-black text-slate-900 dark:text-white">
              Sistem Catatan Pelanggaran & Poin Kedisiplinan Siswa
            </h3>
            <p className="text-xs text-slate-400">
              Poin kedisiplinan berjenjang (Ringan, Sedang, Berat) dengan pemicu otomatis panggilan orang tua.
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-md"
        >
          <Plus className="w-4 h-4" />
          <span>Catat Pelanggaran</span>
        </button>
      </div>

      {/* List of Violations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        {violations.map((v) => (
          <div
            key={v.id}
            className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3"
          >
            <div className="flex items-start justify-between">
              <div>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold mr-2 ${
                    v.category === 'Berat'
                      ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                      : v.category === 'Sedang'
                      ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                      : 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300'
                  }`}
                >
                  Kategori {v.category}
                </span>
                <h4 className="font-black text-sm text-slate-900 dark:text-white mt-2">
                  {v.violationName}
                </h4>
                <p className="text-[11px] font-bold text-blue-600 dark:text-blue-400">
                  {v.studentName}
                </p>
              </div>

              <div className="text-right font-mono">
                <span className="text-xs font-black text-rose-600 block">+{v.points} Poin</span>
                <span className="text-[10px] text-slate-400">{v.date}</span>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 space-y-1">
              <div className="flex justify-between">
                <span className="text-slate-500">Guru Pelapor:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{v.reportingTeacher}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Tindakan Pembinaan:</span>
                <span className="font-bold text-rose-700 dark:text-rose-400">{v.actionTaken}</span>
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
              Catat Pelanggaran Siswa
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
                    <option value="Ringan">Ringan (5-10 Pts)</option>
                    <option value="Sedang">Sedang (15-25 Pts)</option>
                    <option value="Berat">Berat (50-100 Pts)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Poin Pelanggaran</label>
                  <input
                    type="number"
                    value={points}
                    onChange={(e) => setPoints(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono font-bold text-rose-600"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Bentuk Pelanggaran*</label>
                <input
                  type="text"
                  placeholder="Contoh: Terlambat masuk sekolah > 20 menit"
                  value={violationName}
                  onChange={(e) => setViolationName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Guru Pelapor / Piket</label>
                <input
                  type="text"
                  value={reportingTeacher}
                  onChange={(e) => setReportingTeacher(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Tindakan Pembinaan Langsung</label>
                <input
                  type="text"
                  value={actionTaken}
                  onChange={(e) => setActionTaken(e.target.value)}
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
                  className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold"
                >
                  Simpan Pelanggaran
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
