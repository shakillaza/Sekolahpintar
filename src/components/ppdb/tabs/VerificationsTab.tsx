import React, { useState } from 'react';
import { PpdbApplicant } from '../../../types/ppdbTypes';
import { UserCheck, CheckCircle2, AlertCircle, XCircle, Edit3, MessageSquare, Search } from 'lucide-react';

interface VerificationsTabProps {
  applicants: PpdbApplicant[];
  onUpdateStatus: (id: string, status: any, notes: string) => void;
}

export const VerificationsTab: React.FC<VerificationsTabProps> = ({
  applicants,
  onUpdateStatus,
}) => {
  const [selectedApplicant, setSelectedApplicant] = useState<PpdbApplicant | null>(null);
  const [notes, setNotes] = useState('');
  const [newStatus, setNewStatus] = useState<any>('Verified');

  const handleOpenVerifyModal = (a: PpdbApplicant) => {
    setSelectedApplicant(a);
    setNotes(a.verificationNotes || '');
    setNewStatus(a.status);
  };

  const handleSaveVerification = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedApplicant) {
      onUpdateStatus(selectedApplicant.id, newStatus, notes);
      setSelectedApplicant(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <UserCheck className="w-4 h-4 text-purple-600" />
            <span>Verifikasi Berkas & Tinjauan Panitia PPDB</span>
          </h3>
          <p className="text-xs text-slate-500">
            Pemeriksaan dokumen, perbaikan revisi, dan pemberian catatan verifikator.
          </p>
        </div>
      </div>

      {/* Table Verifikasi */}
      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-500 uppercase font-extrabold text-[10px] tracking-wider border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="px-4 py-3.5">Nama & No Reg</th>
                <th className="px-4 py-3.5">Skor Kelengkapan</th>
                <th className="px-4 py-3.5">Status Saat Ini</th>
                <th className="px-4 py-3.5">Catatan Verifikator</th>
                <th className="px-4 py-3.5 text-right">Aksi Verifikasi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {applicants.map((app) => (
                <tr key={app.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="font-extrabold text-slate-900 dark:text-white">{app.fullName}</div>
                    <div className="text-[10px] text-blue-600 font-mono font-bold">{app.registrationNumber}</div>
                  </td>

                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-emerald-500 rounded-full"
                          style={{ width: `${app.completenessScore}%` }}
                        />
                      </div>
                      <span className="font-mono font-bold text-slate-700 dark:text-slate-300">
                        {app.completenessScore}%
                      </span>
                    </div>
                  </td>

                  <td className="px-4 py-3">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                        app.status === 'Verified' || app.status === 'Passed'
                          ? 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                          : app.status === 'Revision_Required'
                          ? 'bg-amber-50 text-amber-600 border border-amber-200'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {app.status}
                    </span>
                  </td>

                  <td className="px-4 py-3 text-slate-500 italic max-w-xs truncate">
                    {app.verificationNotes || 'Belum ada catatan.'}
                  </td>

                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => handleOpenVerifyModal(app)}
                      className="px-3 py-1.5 rounded-xl text-xs font-bold bg-purple-600 hover:bg-purple-700 text-white shadow transition-all"
                    >
                      Verifikasi
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Verify Modal */}
      {selectedApplicant && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full border border-slate-200 dark:border-slate-800 shadow-2xl p-6 space-y-4">
            <h3 className="text-base font-black text-slate-900 dark:text-white">
              Proses Verifikasi Berkas - {selectedApplicant.fullName}
            </h3>

            <form onSubmit={handleSaveVerification} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300">Ubah Status Keputusan</label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value as any)}
                  className="w-full mt-1 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-bold"
                >
                  <option value="Submitted">Submitted (Belum Ditinjau)</option>
                  <option value="Verified">Verified (Berkas Lengkap & Disetujui)</option>
                  <option value="Revision_Required">Perlu Revisi Dokumen</option>
                  <option value="Interview_Scheduled">Terjadwal Wawancara</option>
                  <option value="Tested">Sudah Tes Online</option>
                  <option value="Passed">Lulus (Diterima)</option>
                  <option value="Failed">Ditolak</option>
                  <option value="Backup">Cadangan</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300">Catatan / Menerangkan Penyebab Revisi</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Rapor semester 5 buram, mohon unggah ulang file yang jelas."
                  className="w-full mt-1 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  rows={3}
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setSelectedApplicant(null)}
                  className="px-4 py-2 rounded-xl text-slate-600 dark:text-slate-300 font-bold bg-slate-100 dark:bg-slate-800"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-white font-bold bg-purple-600 hover:bg-purple-700 shadow-md"
                >
                  Simpan Keputusan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
