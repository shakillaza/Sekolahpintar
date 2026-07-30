import React from 'react';
import { Award, CheckCircle2, ShieldCheck, Download, Plus } from 'lucide-react';
import { TeacherCertification, TeacherMasterItem } from '../../types/teacherTypes';

interface TeacherCertificationTabProps {
  certifications: TeacherCertification[];
  teachers: TeacherMasterItem[];
}

export const TeacherCertificationTab: React.FC<TeacherCertificationTabProps> = ({
  certifications,
  teachers
}) => {
  return (
    <div className="space-y-4">
      <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center justify-between">
        <div>
          <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-500" />
            Sertifikasi Pendidik & Lisensi Kompetensi Kemendikbudristek
          </h2>
          <p className="text-xs text-slate-500">Sertifikat Guru Profesional, PPG, Assessor Lisensi & Sertifikasi Industri</p>
        </div>
        <button className="px-3 py-1.5 bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold rounded-lg shadow-sm flex items-center gap-1">
          <Plus className="w-3.5 h-3.5" />
          Tambah Sertifikasi
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {certifications.map((cert) => (
          <div key={cert.id} className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-amber-200/80 dark:border-amber-900/40 shadow-sm space-y-3 relative overflow-hidden">
            <div className="flex justify-between items-start">
              <div>
                <span className="px-2 py-0.5 text-[10px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 rounded">
                  {cert.certType}
                </span>
                <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm mt-1">{cert.teacherName}</h3>
              </div>
              <span className={`px-2.5 py-1 text-xs font-bold rounded-full ${
                cert.isActive ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-rose-100 text-rose-800'
              }`}>
                {cert.isActive ? 'AKTIF' : 'EXPIRED'}
              </span>
            </div>

            <div className="space-y-1 text-xs text-slate-600 dark:text-slate-300 font-mono">
              <p><span className="text-slate-400 font-sans">No. Sertifikat:</span> {cert.certNumber}</p>
              <p><span className="text-slate-400 font-sans">Penerbit:</span> {cert.issuingInstitution}</p>
              <p><span className="text-slate-400 font-sans">Masa Berlaku:</span> {cert.issueDate} s/d {cert.expiryDate || 'Seumur Hidup'}</p>
            </div>

            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-xs">
              <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-medium">
                <ShieldCheck className="w-3.5 h-3.5" /> Terverifikasi PD-Dikti / Dapodik
              </span>
              <button className="text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 font-semibold">
                <Download className="w-3.5 h-3.5" /> Unduh Lampiran
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
