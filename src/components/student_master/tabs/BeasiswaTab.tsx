import React from 'react';
import { StudentScholarshipRecord } from '../../../types/studentTypes';
import { DollarSign, Award, Calendar, CheckCircle2, Clock } from 'lucide-react';

interface BeasiswaTabProps {
  scholarships: StudentScholarshipRecord[];
}

export const BeasiswaTab: React.FC<BeasiswaTabProps> = ({ scholarships }) => {
  return (
    <div className="space-y-6 text-xs">
      {/* Banner */}
      <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-300">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-sm font-black text-slate-900 dark:text-white">
              Sistem Pengelolaan Beasiswa Siswa
            </h3>
            <p className="text-xs text-slate-400">
              Pengawasan Beasiswa PIP Kemdikbud, KIP, Beasiswa Yayasan, Baznas, & Corporate CSR.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {scholarships.map((sch) => (
          <div
            key={sch.id}
            className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="px-2.5 py-1 rounded-2xl text-[10px] font-extrabold bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-300">
                  {sch.status}
                </span>
                <h4 className="font-extrabold text-sm text-slate-900 dark:text-white mt-2">
                  {sch.scholarshipType}
                </h4>
                <p className="font-bold text-blue-600 dark:text-blue-400 text-xs">{sch.studentName}</p>
              </div>

              <div className="text-right font-mono">
                <span className="text-xs font-black text-emerald-600">
                  Rp {sch.amountPerSemester.toLocaleString('id-ID')}
                </span>
                <span className="text-[10px] text-slate-400 block">/ Semester</span>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 space-y-1">
              <div className="flex justify-between">
                <span className="text-slate-400">Pemberi Beasiswa:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{sch.provider}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Periode Berlaku:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{sch.period}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
