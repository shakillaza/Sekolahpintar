import React, { useState } from 'react';
import { PpdbTrack } from '../../../types/ppdbTypes';
import { Compass, Plus, Edit, Trash2, CheckCircle2, FileText, Percent, Award } from 'lucide-react';

interface TracksTabProps {
  tracks: PpdbTrack[];
  onAddTrack: (track: PpdbTrack) => void;
  onUpdateTrack: (track: PpdbTrack) => void;
  onDeleteTrack: (id: string) => void;
}

export const TracksTab: React.FC<TracksTabProps> = ({
  tracks,
  onAddTrack,
  onUpdateTrack,
  onDeleteTrack,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTrack, setEditingTrack] = useState<PpdbTrack | null>(null);

  // Form State
  const [name, setName] = useState<any>('Prestasi');
  const [code, setCode] = useState('');
  const [description, setDescription] = useState('');
  const [maxQuota, setMaxQuota] = useState(50);
  const [adminWeight, setAdminWeight] = useState(20);
  const [reportWeight, setReportWeight] = useState(30);
  const [testWeight, setTestWeight] = useState(30);
  const [interviewWeight, setInterviewWeight] = useState(20);

  const handleOpenModal = (t?: PpdbTrack) => {
    if (t) {
      setEditingTrack(t);
      setName(t.name);
      setCode(t.code);
      setDescription(t.description);
      setMaxQuota(t.maxQuota);
      setAdminWeight(t.weightingPercentage.administration);
      setReportWeight(t.weightingPercentage.reportCard);
      setTestWeight(t.weightingPercentage.test);
      setInterviewWeight(t.weightingPercentage.interview);
    } else {
      setEditingTrack(null);
      setName('Reguler');
      setCode(`TRK_${Date.now().toString().slice(-4)}`);
      setDescription('Jalur pendaftaran standar kriteria umum sekolah.');
      setMaxQuota(60);
      setAdminWeight(20);
      setReportWeight(30);
      setTestWeight(30);
      setInterviewWeight(20);
    }
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const newTrack: PpdbTrack = {
      id: editingTrack ? editingTrack.id : `track-${Date.now()}`,
      code,
      name,
      description,
      maxQuota,
      weightingPercentage: {
        administration: adminWeight,
        reportCard: reportWeight,
        test: testWeight,
        interview: interviewWeight,
        achievementBonus: 10,
      },
      requiredDocuments: ['Kartu Keluarga', 'Akta Kelahiran', 'Rapor Terakhir'],
    };

    if (editingTrack) {
      onUpdateTrack(newTrack);
    } else {
      onAddTrack(newTrack);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <Compass className="w-4 h-4 text-purple-600" />
            <span>Jalur Pendaftaran & Skema Pembobotan Seleksi</span>
          </h3>
          <p className="text-xs text-slate-500">
            Prestasi, Reguler, Afirmasi, Zonasi, Pindahan, Tahfidz, & Kemitraan dengan bobot seleksi otomatis.
          </p>
        </div>

        <button
          onClick={() => handleOpenModal()}
          className="px-4 py-2 rounded-xl text-xs font-bold bg-purple-600 hover:bg-purple-700 text-white shadow-md shadow-purple-600/20 transition-all flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Jalur Pendaftaran</span>
        </button>
      </div>

      {/* Tracks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tracks.map((t) => (
          <div
            key={t.id}
            className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-purple-50 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300 border border-purple-200">
                  {t.code}
                </span>
                <span className="text-xs font-bold text-slate-500">
                  Kuota Max: <strong className="text-slate-900 dark:text-white font-mono">{t.maxQuota}</strong>
                </span>
              </div>

              <h4 className="text-base font-black text-slate-900 dark:text-white">{t.name}</h4>
              <p className="text-xs text-slate-500 leading-relaxed">{t.description}</p>
            </div>

            {/* Weightings Breakdown */}
            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 space-y-2 text-xs">
              <span className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider block">
                Bobot Kriteria Seleksi AI
              </span>
              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div className="flex justify-between text-slate-600 dark:text-slate-300">
                  <span>Administrasi:</span>
                  <strong className="font-mono text-blue-600">{t.weightingPercentage.administration}%</strong>
                </div>
                <div className="flex justify-between text-slate-600 dark:text-slate-300">
                  <span>Rapor:</span>
                  <strong className="font-mono text-purple-600">{t.weightingPercentage.reportCard}%</strong>
                </div>
                <div className="flex justify-between text-slate-600 dark:text-slate-300">
                  <span>Tes Akademik:</span>
                  <strong className="font-mono text-indigo-600">{t.weightingPercentage.test}%</strong>
                </div>
                <div className="flex justify-between text-slate-600 dark:text-slate-300">
                  <span>Wawancara:</span>
                  <strong className="font-mono text-emerald-600">{t.weightingPercentage.interview}%</strong>
                </div>
              </div>
            </div>

            {/* Syarat Dokumen */}
            <div className="space-y-1 text-xs">
              <span className="text-[10px] font-bold text-slate-400 block">Dokumen Wajib:</span>
              <div className="flex flex-wrap gap-1">
                {t.requiredDocuments.map((doc, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[10px] font-semibold"
                  >
                    {doc}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={() => handleOpenModal(t)}
                className="px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 transition-colors flex items-center gap-1"
              >
                <Edit className="w-3.5 h-3.5" /> Edit
              </button>
              <button
                onClick={() => onDeleteTrack(t.id)}
                className="px-3 py-1.5 rounded-xl text-xs font-bold bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 hover:bg-rose-100 transition-colors flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" /> Hapus
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Track */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full border border-slate-200 dark:border-slate-800 shadow-2xl p-6 space-y-4">
            <h3 className="text-base font-black text-slate-900 dark:text-white">
              {editingTrack ? 'Edit Jalur Pendaftaran' : 'Tambah Jalur Pendaftaran Baru'}
            </h3>

            <form onSubmit={handleSave} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300">Nama Jalur</label>
                <select
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full mt-1 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-bold"
                >
                  <option value="Prestasi">Prestasi</option>
                  <option value="Reguler">Reguler</option>
                  <option value="Afirmasi">Afirmasi</option>
                  <option value="Zonasi">Zonasi</option>
                  <option value="Tahfidz">Tahfidz</option>
                  <option value="Pindahan">Pindahan</option>
                  <option value="Kemitraan">Kemitraan</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300">Deskripsi Jalur</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full mt-1 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  rows={2}
                  required
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300">Batas Kuota Maksimal</label>
                <input
                  type="number"
                  value={maxQuota}
                  onChange={(e) => setMaxQuota(Number(e.target.value))}
                  className="w-full mt-1 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  required
                />
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 space-y-2">
                <span className="font-extrabold text-slate-800 dark:text-slate-200 block">
                  Pengaturan Bobot Nilai (%)
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] text-slate-500 font-bold">Administrasi (%)</label>
                    <input
                      type="number"
                      value={adminWeight}
                      onChange={(e) => setAdminWeight(Number(e.target.value))}
                      className="w-full mt-0.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-500 font-bold">Rapor (%)</label>
                    <input
                      type="number"
                      value={reportWeight}
                      onChange={(e) => setReportWeight(Number(e.target.value))}
                      className="w-full mt-0.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-500 font-bold">Tes Akademik (%)</label>
                    <input
                      type="number"
                      value={testWeight}
                      onChange={(e) => setTestWeight(Number(e.target.value))}
                      className="w-full mt-0.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-500 font-bold">Wawancara (%)</label>
                    <input
                      type="number"
                      value={interviewWeight}
                      onChange={(e) => setInterviewWeight(Number(e.target.value))}
                      className="w-full mt-0.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
                    />
                  </div>
                </div>
              </div>

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
                  className="px-5 py-2 rounded-xl text-white font-bold bg-purple-600 hover:bg-purple-700 shadow-md"
                >
                  Simpan Jalur
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
