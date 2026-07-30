import React from 'react';
import { Users, CreditCard, Phone, Building, FileText, CheckCircle2 } from 'lucide-react';
import { TeacherBiodataItem, TeacherMasterItem } from '../../types/teacherTypes';

interface TeacherBiodataTabProps {
  teachers: TeacherMasterItem[];
  biodataList: TeacherBiodataItem[];
}

export const TeacherBiodataTab: React.FC<TeacherBiodataTabProps> = ({
  teachers,
  biodataList,
}) => {
  return (
    <div className="space-y-4">
      <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center justify-between">
        <div>
          <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Users className="w-4 h-4 text-indigo-600" />
            Biodata Keluarga & Legalitas Rekening Guru & Pegawai
          </h2>
          <p className="text-xs text-slate-500">Status Pernikahan, Pasangan, Kontak Darurat, NPWP, BPJS & Rekening Bank</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {teachers.map((t) => {
          const bio = biodataList.find((b) => b.teacherId === t.id);
          return (
            <div key={t.id} className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3">
              <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
                <img src={t.photoUrl} alt={t.fullName} className="w-10 h-10 rounded-full object-cover ring-1 ring-indigo-500" />
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-slate-100 text-xs">{t.fullName}</h3>
                  <p className="text-[11px] text-slate-500 font-mono">NIP: {t.nip}</p>
                </div>
              </div>

              {bio ? (
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Status Nikah</span>
                    <span className="font-semibold">{bio.maritalStatus}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Pasangan</span>
                    <span className="font-semibold">{bio.spouseName || '-'}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Jumlah Anak</span>
                    <span className="font-semibold">{bio.childrenCount} Orang</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Kontak Darurat</span>
                    <span className="font-semibold">{bio.emergencyContactName} ({bio.emergencyContactPhone})</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">NPWP</span>
                    <span className="font-mono text-slate-700 dark:text-slate-300 font-medium">{bio.npwp}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Bank & Rekening</span>
                    <span className="font-semibold">{bio.bankName} - {bio.accountNumber}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">BPJS Kesehatan</span>
                    <span className="font-mono text-emerald-600 dark:text-emerald-400">{bio.bpjsKesehatanNo}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">BPJS Ketenagakerjaan</span>
                    <span className="font-mono text-indigo-600 dark:text-indigo-400">{bio.bpjsKetenagakerjaanNo}</span>
                  </div>
                </div>
              ) : (
                <p className="text-xs text-slate-400 italic">Biodata keluarga belum diisi lengkap.</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
