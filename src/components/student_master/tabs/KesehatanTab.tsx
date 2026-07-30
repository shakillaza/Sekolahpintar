import React from 'react';
import { StudentMasterItem, StudentHealthRecord } from '../../../types/studentTypes';
import { HeartPulse, Stethoscope, ShieldCheck, Activity, Phone, Calendar, AlertCircle } from 'lucide-react';

interface KesehatanTabProps {
  students: StudentMasterItem[];
  selectedStudent: StudentMasterItem;
  healthRecords: StudentHealthRecord[];
  onSelectStudent: (s: StudentMasterItem) => void;
}

export const KesehatanTab: React.FC<KesehatanTabProps> = ({
  students,
  selectedStudent,
  healthRecords,
  onSelectStudent,
}) => {
  const health = healthRecords.find((h) => h.studentId === selectedStudent.id);

  return (
    <div className="space-y-6">
      {/* Student Picker Bar */}
      <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-300">
            <HeartPulse className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-sm font-black text-slate-900 dark:text-white">
              Rekam Kesehatan, Imunisasi & Screening UKS
            </h3>
            <p className="text-xs text-slate-400">
              Riwayat alergi, penyakit, vaksinasi, pemeriksaan fisik berkala, dan kontak darurat medis.
            </p>
          </div>
        </div>

        <select
          value={selectedStudent.id}
          onChange={(e) => {
            const found = students.find((s) => s.id === e.target.value);
            if (found) onSelectStudent(found);
          }}
          className="px-3 py-2 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200"
        >
          {students.map((s) => (
            <option key={s.id} value={s.id}>
              {s.fullName} ({s.className})
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-xs">
        {/* Ringkasan Profil Fisik & Darurat */}
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
          <h4 className="text-xs font-extrabold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2.5 flex items-center gap-2">
            <Stethoscope className="w-4 h-4 text-rose-600" />
            <span>Profil Medis Siswa</span>
          </h4>

          <div className="space-y-3">
            <div className="p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 space-y-1">
              <span className="text-[10px] font-bold text-rose-700 dark:text-rose-300 uppercase block">Golongan Darah & Alergi</span>
              <div className="flex items-center justify-between">
                <span className="text-lg font-black text-rose-600 font-mono">Gol: {selectedStudent.bloodType}</span>
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  {health?.allergies?.join(', ') || 'Tidak Ada Alergi Khusus'}
                </span>
              </div>
            </div>

            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Penyakit Kronis / Bawaan</span>
              <p className="font-bold text-slate-800 dark:text-slate-200 mt-0.5">
                {health?.chronicIllnesses?.join(', ') || 'Tidak Ada Catatan Penyakit Kronis'}
              </p>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Dokter & RS Darurat</span>
              <p className="font-extrabold text-slate-900 dark:text-white">{health?.emergencyDoctor || 'dr. Hendro Prasetyo, Sp.A'}</p>
              <p className="font-mono text-blue-600 dark:text-blue-400 font-bold flex items-center gap-1">
                <Phone className="w-3 h-3" /> {health?.emergencyHospitalPhone || '(021) 7201234'}
              </p>
            </div>
          </div>
        </div>

        {/* Riwayat Vaksinasi & Examination Checkups */}
        <div className="lg:col-span-2 p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
          <h4 className="text-xs font-extrabold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2.5 flex items-center gap-2">
            <Activity className="w-4 h-4 text-emerald-600" />
            <span>Hasil Pemeriksaan Kesehatan Berkala & Imunisasi</span>
          </h4>

          {/* Vaccines */}
          <div className="space-y-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase block">Riwayat Imunisasi & Vaksin</span>
            <div className="flex flex-wrap gap-2">
              {health?.vaccines?.map((v, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 font-bold text-xs flex items-center gap-1.5"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{v.name}</span>
                  <span className="text-[10px] font-mono text-emerald-600">({v.date})</span>
                </span>
              ))}
            </div>
          </div>

          {/* Checkups */}
          <div className="space-y-3 pt-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase block">Pemeriksaan Fisik UKS Terbaru</span>
            {health?.checkups?.map((chk, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700 space-y-2"
              >
                <div className="flex items-center justify-between border-b border-slate-200/60 dark:border-slate-700 pb-2">
                  <span className="font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-blue-500" /> Tanggal: {chk.date}
                  </span>
                  <span className="font-mono font-bold text-emerald-600">
                    TB: {chk.height}cm | BB: {chk.weight}kg
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div>
                    <span className="text-slate-400 font-bold">Mata / Penglihatan:</span>{' '}
                    <span className="font-bold text-slate-800 dark:text-slate-200">{chk.vision}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-bold">Kesehatan Gigi:</span>{' '}
                    <span className="font-bold text-slate-800 dark:text-slate-200">{chk.dental}</span>
                  </div>
                </div>

                <p className="text-[11px] text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-slate-200/60 dark:border-slate-800 font-medium">
                  Catatan UKS: {chk.notes}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
