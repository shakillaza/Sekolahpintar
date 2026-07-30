import React, { useState } from 'react';
import { StudentMasterItem, StudentMutationRecord } from '../../../types/studentTypes';
import { ArrowRightLeft, Plus, FileText, CheckCircle2, Clock, AlertCircle, Calendar } from 'lucide-react';

interface MutasiTabProps {
  students: StudentMasterItem[];
  mutations: StudentMutationRecord[];
  onAddMutation: (mutation: StudentMutationRecord) => void;
}

export const MutasiTab: React.FC<MutasiTabProps> = ({ students, mutations, onAddMutation }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [studentId, setStudentId] = useState(students[0]?.id || '');
  const [mutationType, setMutationType] = useState<any>('Pindah Sekolah');
  const [fromLocation, setFromLocation] = useState('SMA N 1 Jakarta');
  const [toLocation, setToLocation] = useState('SMA N 3 Bandung');
  const [reason, setReason] = useState('Mengikuti perpindahan tugas domisili orang tua');
  const [skNumber, setSkNumber] = useState(`SK-MUT/${new Date().getFullYear()}/${Math.floor(100 + Math.random() * 900)}`);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const student = students.find((s) => s.id === studentId);
    if (!student) return;

    const newRec: StudentMutationRecord = {
      id: `mut-${Date.now()}`,
      studentId: student.id,
      studentName: student.fullName,
      mutationType,
      date: new Date().toISOString().split('T')[0],
      fromSchoolOrClass: fromLocation,
      toSchoolOrClass: toLocation,
      reason,
      skNumber,
      status: 'Diproses',
    };

    onAddMutation(newRec);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Action */}
      <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-300">
            <ArrowRightLeft className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-sm font-black text-slate-900 dark:text-white">
              Sistem Mutasi Siswa Enterprise
            </h3>
            <p className="text-xs text-slate-400">
              Pencatatan mutasi Masuk, Keluar, Pindah Sekolah, Naik Kelas, Kelulusan & Status DO.
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-md"
        >
          <Plus className="w-4 h-4" />
          <span>Pengajuan Mutasi Baru</span>
        </button>
      </div>

      {/* Mutations Table */}
      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 font-extrabold text-xs text-slate-900 dark:text-white">
          Riwayat Transaksi Mutasi Siswa
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-200/80 dark:border-slate-700/80">
              <tr>
                <th className="p-3.5">Tanggal & SK</th>
                <th className="p-3.5">Nama Siswa</th>
                <th className="p-3.5">Jenis Mutasi</th>
                <th className="p-3.5">Dari</th>
                <th className="p-3.5">Ke Target</th>
                <th className="p-3.5">Alasan</th>
                <th className="p-3.5 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
              {mutations.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-400">
                    Belum ada riwayat mutasi siswa terdaftar.
                  </td>
                </tr>
              ) : (
                mutations.map((m) => (
                  <tr key={m.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50">
                    <td className="p-3.5 font-mono">
                      <div className="font-bold text-slate-900 dark:text-white">{m.date}</div>
                      <div className="text-[10px] text-slate-400">{m.skNumber}</div>
                    </td>

                    <td className="p-3.5 font-bold text-slate-900 dark:text-white">
                      {m.studentName}
                    </td>

                    <td className="p-3.5">
                      <span className="px-2.5 py-1 rounded-2xl text-[10px] font-extrabold bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300">
                        {m.mutationType}
                      </span>
                    </td>

                    <td className="p-3.5 text-slate-600 dark:text-slate-400">
                      {m.fromSchoolOrClass}
                    </td>

                    <td className="p-3.5 text-slate-600 dark:text-slate-400 font-bold">
                      {m.toSchoolOrClass}
                    </td>

                    <td className="p-3.5 text-slate-500">
                      {m.reason}
                    </td>

                    <td className="p-3.5 text-right">
                      <span
                        className={`px-2.5 py-1 rounded-2xl text-[10px] font-extrabold ${
                          m.status === 'Disetujui'
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                            : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                        }`}
                      >
                        {m.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* New Mutation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl max-w-lg w-full p-6 space-y-4">
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3">
              Pengajuan Mutasi Siswa
            </h3>

            <form onSubmit={handleSave} className="space-y-3 text-xs">
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
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Jenis Mutasi</label>
                <select
                  value={mutationType}
                  onChange={(e) => setMutationType(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold text-slate-900 dark:text-white"
                >
                  <option value="Masuk">Masuk (Pindahan Masuk)</option>
                  <option value="Keluar">Keluar (Pindahan Keluar)</option>
                  <option value="Pindah Sekolah">Pindah Sekolah</option>
                  <option value="Naik Kelas">Naik Kelas</option>
                  <option value="Lulus">Kelulusan Alumni</option>
                  <option value="DO">Drop Out (DO)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Asal (Sekolah / Kelas)</label>
                <input
                  type="text"
                  value={fromLocation}
                  onChange={(e) => setFromLocation(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Tujuan (Sekolah / Kelas)</label>
                <input
                  type="text"
                  value={toLocation}
                  onChange={(e) => setToLocation(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Nomor SK Mutasi</label>
                <input
                  type="text"
                  value={skNumber}
                  onChange={(e) => setSkNumber(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Alasan Mutasi</label>
                <textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                  rows={2}
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
                  className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold"
                >
                  Proses Mutasi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
