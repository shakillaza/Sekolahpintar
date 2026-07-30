import React, { useState } from 'react';
import { PpdbWave } from '../../../types/ppdbTypes';
import { SchoolLevel } from '../../../types';
import { Calendar, Plus, Edit, Trash2, CheckCircle2, AlertCircle, DollarSign, Users, Layers } from 'lucide-react';

interface WavesTabProps {
  waves: PpdbWave[];
  onAddWave: (wave: PpdbWave) => void;
  onUpdateWave: (wave: PpdbWave) => void;
  onDeleteWave: (id: string) => void;
}

export const WavesTab: React.FC<WavesTabProps> = ({
  waves,
  onAddWave,
  onUpdateWave,
  onDeleteWave,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingWave, setEditingWave] = useState<PpdbWave | null>(null);

  // Form State
  const [academicYear, setAcademicYear] = useState('2026/2027');
  const [waveName, setWaveName] = useState('');
  const [schoolLevel, setSchoolLevel] = useState<SchoolLevel>('SMA');
  const [quota, setQuota] = useState(100);
  const [startDate, setStartDate] = useState('2026-01-01');
  const [endDate, setEndDate] = useState('2026-03-31');
  const [registrationFee, setRegistrationFee] = useState(250000);
  const [isActive, setIsActive] = useState(true);

  const handleOpenModal = (w?: PpdbWave) => {
    if (w) {
      setEditingWave(w);
      setAcademicYear(w.academicYear);
      setWaveName(w.waveName);
      setSchoolLevel(w.schoolLevel);
      setQuota(w.quota);
      setStartDate(w.startDate);
      setEndDate(w.endDate);
      setRegistrationFee(w.registrationFee);
      setIsActive(w.isActive);
    } else {
      setEditingWave(null);
      setAcademicYear('2026/2027');
      setWaveName(`Gelombang ${waves.length + 1}`);
      setSchoolLevel('SMA');
      setQuota(100);
      setStartDate('2026-02-01');
      setEndDate('2026-05-31');
      setRegistrationFee(250000);
      setIsActive(true);
    }
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const newWave: PpdbWave = {
      id: editingWave ? editingWave.id : `wave-${Date.now()}`,
      academicYear,
      waveName,
      schoolLevel,
      quota,
      registeredCount: editingWave ? editingWave.registeredCount : 0,
      startDate,
      endDate,
      registrationFee,
      isActive,
      tracksAllowed: ['Prestasi', 'Reguler', 'Afirmasi', 'Zonasi'],
    };

    if (editingWave) {
      onUpdateWave(newWave);
    } else {
      onAddWave(newWave);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header & Add Button */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <Calendar className="w-4 h-4 text-blue-600" />
            <span>Gelombang Pendaftaran PPDB Multi-Level</span>
          </h3>
          <p className="text-xs text-slate-500">
            Atur kuota, tanggal pembukaan/penutupan, dan biaya pendaftaran per gelombang.
          </p>
        </div>

        <button
          onClick={() => handleOpenModal()}
          className="px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-600/20 transition-all flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Gelombang Baru</span>
        </button>
      </div>

      {/* Gelombang Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {waves.map((w) => {
          const quotaPct = Math.round((w.registeredCount / (w.quota || 1)) * 100);
          return (
            <div
              key={w.id}
              className={`p-5 rounded-3xl bg-white dark:bg-slate-900 border shadow-sm space-y-4 relative overflow-hidden transition-all ${
                w.isActive
                  ? 'border-blue-200/80 dark:border-blue-900/60'
                  : 'border-slate-200/80 dark:border-slate-800 opacity-60'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-200/80">
                    TA {w.academicYear} • Jenjang {w.schoolLevel}
                  </span>
                  <h4 className="text-base font-black text-slate-900 dark:text-white mt-1.5">
                    {w.waveName}
                  </h4>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                      w.isActive
                        ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400 border border-emerald-200'
                        : 'bg-slate-100 text-slate-500 dark:bg-slate-800'
                    }`}
                  >
                    {w.isActive ? 'Aktif Buka' : 'Tutup'}
                  </span>
                </div>
              </div>

              {/* Progress Kuota */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-extrabold text-slate-700 dark:text-slate-300">
                  <span className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-blue-500" /> Terisi: {w.registeredCount} / {w.quota} Kuota
                  </span>
                  <span className="font-mono text-blue-600 dark:text-blue-400">{quotaPct}%</span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${
                      quotaPct >= 90 ? 'bg-rose-500' : quotaPct >= 75 ? 'bg-amber-500' : 'bg-blue-600'
                    }`}
                    style={{ width: `${Math.min(100, quotaPct)}%` }}
                  />
                </div>
              </div>

              {/* Details & Info */}
              <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-slate-100 dark:border-slate-800">
                <div>
                  <span className="text-[10px] text-slate-400 block font-bold">Periode Pendaftaran</span>
                  <strong className="text-slate-800 dark:text-slate-200 font-mono text-[11px]">
                    {w.startDate} s/d {w.endDate}
                  </strong>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block font-bold">Biaya Pendaftaran</span>
                  <strong className="text-emerald-600 dark:text-emerald-400 font-mono text-xs">
                    Rp {w.registrationFee.toLocaleString('id-ID')}
                  </strong>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                <button
                  onClick={() => handleOpenModal(w)}
                  className="px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 transition-colors flex items-center gap-1"
                >
                  <Edit className="w-3.5 h-3.5" /> Edit
                </button>
                <button
                  onClick={() => onDeleteWave(w.id)}
                  className="px-3 py-1.5 rounded-xl text-xs font-bold bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 hover:bg-rose-100 transition-colors flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Hapus
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add / Edit Wave Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full border border-slate-200 dark:border-slate-800 shadow-2xl p-6 space-y-4">
            <h3 className="text-base font-black text-slate-900 dark:text-white">
              {editingWave ? 'Edit Gelombang Pendaftaran' : 'Tambah Gelombang Pendaftaran Baru'}
            </h3>

            <form onSubmit={handleSave} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300">Tahun Ajaran</label>
                <input
                  type="text"
                  value={academicYear}
                  onChange={(e) => setAcademicYear(e.target.value)}
                  className="w-full mt-1 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300">Nama Gelombang</label>
                <input
                  type="text"
                  value={waveName}
                  onChange={(e) => setWaveName(e.target.value)}
                  placeholder="e.g. Gelombang 1 (Early Bird)"
                  className="w-full mt-1 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300">Jenjang Sekolah</label>
                  <select
                    value={schoolLevel}
                    onChange={(e) => setSchoolLevel(e.target.value as SchoolLevel)}
                    className="w-full mt-1 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  >
                    <option value="PAUD">PAUD</option>
                    <option value="TK">TK</option>
                    <option value="SD">SD</option>
                    <option value="SMP">SMP</option>
                    <option value="SMA">SMA</option>
                    <option value="SMK">SMK</option>
                    <option value="Pesantren">Pesantren</option>
                    <option value="Internasional">Internasional</option>
                    <option value="Homeschool">Homeschool</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300">Target Kuota</label>
                  <input
                    type="number"
                    value={quota}
                    onChange={(e) => setQuota(Number(e.target.value))}
                    className="w-full mt-1 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300">Tanggal Buka</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full mt-1 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                    required
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300">Tanggal Tutup</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full mt-1 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300">Biaya Pendaftaran (Rp)</label>
                <input
                  type="number"
                  value={registrationFee}
                  onChange={(e) => setRegistrationFee(Number(e.target.value))}
                  className="w-full mt-1 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  required
                />
              </div>

              <label className="flex items-center gap-2 cursor-pointer pt-2">
                <input
                  type="checkbox"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded"
                />
                <span className="font-bold text-slate-800 dark:text-slate-200">Aktifkan Gelombang Ini Sekarang</span>
              </label>

              <div className="flex items-center justify-end gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 dark:text-slate-300 font-bold bg-slate-100 dark:bg-slate-800"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-white font-bold bg-blue-600 hover:bg-blue-700 shadow-md"
                >
                  Simpan Gelombang
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
