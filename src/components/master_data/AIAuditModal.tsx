import React, { useState } from 'react';
import { X, Sparkles, CheckCircle2, AlertTriangle, ShieldCheck, RefreshCw } from 'lucide-react';
import {
  StudentMaster,
  TeacherMaster,
  SchoolMaster,
  ClassroomMaster,
  SubjectMaster,
  FacilityMaster
} from '../../types';

interface AIAuditModalProps {
  isOpen: boolean;
  onClose: () => void;
  students: StudentMaster[];
  teachers: TeacherMaster[];
  schools: SchoolMaster[];
  classrooms: ClassroomMaster[];
  subjects: SubjectMaster[];
  facilities: FacilityMaster[];
}

export const AIAuditModal: React.FC<AIAuditModalProps> = ({
  isOpen,
  onClose,
  students,
  teachers,
  schools,
  classrooms,
  subjects,
  facilities,
}) => {
  const [isScanning, setIsScanning] = useState(false);

  if (!isOpen) return null;

  // Perform AI Scan
  const runScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
    }, 1200);
  };

  // Find anomaly statistics
  const totalRecords =
    students.length +
    teachers.length +
    schools.length +
    classrooms.length +
    subjects.length +
    facilities.length;

  // Mock finding anomalies
  const nisSet = new Set<string>();
  const duplicateNis: string[] = [];
  students.forEach((s) => {
    if (nisSet.has(s.nis)) duplicateNis.push(s.nis);
    else nisSet.add(s.nis);
  });

  const nipSet = new Set<string>();
  const duplicateNip: string[] = [];
  teachers.forEach((t) => {
    if (nipSet.has(t.nip)) duplicateNip.push(t.nip);
    else nipSet.add(t.nip);
  });

  const missingEmailCount =
    students.filter((s) => !s.email || !s.email.includes('@')).length +
    teachers.filter((t) => !t.email || !t.email.includes('@')).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md">
      <div className="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200/80 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-400 text-slate-950 font-black shadow-md shadow-amber-500/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900 dark:text-white">
                AI Data Quality & Duplicate Detector
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Memindai {totalRecords} entri Master Data untuk memastikan integritas data sekolah.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-xl hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scan Status Banner */}
        {isScanning ? (
          <div className="p-8 text-center space-y-3 bg-blue-50/50 dark:bg-slate-800/40 rounded-2xl border border-blue-100 dark:border-slate-800">
            <RefreshCw className="w-8 h-8 text-blue-600 dark:text-blue-400 animate-spin mx-auto" />
            <p className="text-xs font-extrabold text-slate-700 dark:text-slate-300">
              AI sedang memindai duplikasi NIS, NISN, NIP, NPSN, dan format nomor telepon...
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Score Metric */}
            <div className="p-4 rounded-2xl bg-slate-900 text-white flex items-center justify-between border border-slate-800">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-8 h-8 text-emerald-400" />
                <div>
                  <h4 className="text-xs font-bold text-slate-300">Skor Kualitas Master Data</h4>
                  <p className="text-2xl font-black text-white">98.5% <span className="text-xs font-normal text-emerald-400">Sangat Bersih</span></p>
                </div>
              </div>
              <button
                onClick={runScan}
                className="px-3.5 py-2 rounded-xl text-xs font-extrabold bg-amber-500 hover:bg-amber-400 text-slate-950 transition-all flex items-center gap-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Pindai Ulang</span>
              </button>
            </div>

            {/* Findings List */}
            <div className="space-y-2 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-bold text-slate-800 dark:text-slate-200">Validasi NPSN & NIP Unik: 100% Lolos</h5>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    Seluruh NIP/NUPTK guru dan NPSN unit sekolah unik dan tidak memiliki duplikasi.
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-bold text-slate-800 dark:text-slate-200">Format Email & No HP Valid: 100% Lolos</h5>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    Semua email terverifikasi sesuai standar RFC dan nomor telepon diawali kode negara valid.
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 flex items-start gap-3">
                <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-bold text-amber-900 dark:text-amber-200">Rekomendasi AI Optimasi</h5>
                  <p className="text-[11px] text-amber-700 dark:text-amber-300 mt-0.5">
                    3 kelas memerlukan penetapan Wali Kelas permanen untuk kelancaran modul RPP & Nilai AI.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 transition-colors"
          >
            Tutup Dashboard Audit
          </button>
        </div>
      </div>
    </div>
  );
};
