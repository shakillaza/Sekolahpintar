import React, { useState } from 'react';
import { StudentAlumniRecord } from '../../../types/studentTypes';
import { GraduationCap, Briefcase, Building, Award, Search, Phone, FileText } from 'lucide-react';

interface AlumniTabProps {
  alumniRecords: StudentAlumniRecord[];
}

export const AlumniTab: React.FC<AlumniTabProps> = ({ alumniRecords }) => {
  const [search, setSearch] = useState('');

  const filtered = alumniRecords.filter(
    (a) =>
      a.studentName.toLowerCase().includes(search.toLowerCase()) ||
      a.graduationYear.toString().includes(search) ||
      (a.higherEducation && a.higherEducation.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      {/* Header & Search */}
      <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-300">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-sm font-black text-slate-900 dark:text-white">
              Database Alumni & Tracestudy Perguruan Tinggi / Karir
            </h3>
            <p className="text-xs text-slate-400">
              Pelacakan nomor Ijazah, SKL, studi lanjut di PTN/PTS, serta karir alumni.
            </p>
          </div>
        </div>

        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Cari Nama Alumni, PTN, atau Tahun..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-200"
          />
        </div>
      </div>

      {/* Alumni Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        {filtered.map((a) => (
          <div
            key={a.id}
            className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3"
          >
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">
                  {a.studentName}
                </h4>
                <span className="text-[10px] font-bold font-mono text-amber-600">
                  Lulusan Tahun {a.graduationYear}
                </span>
              </div>
              <span className="px-2.5 py-1 rounded-2xl text-[10px] font-extrabold bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-300">
                {a.alumniStatus}
              </span>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Nomor Ijazah & SKL</span>
              <p className="font-mono text-slate-800 dark:text-slate-200">{a.ijazahNumber}</p>
              <p className="font-mono text-[10px] text-slate-400">{a.sklNumber}</p>
            </div>

            <div className="space-y-1 pt-1">
              {a.higherEducation && (
                <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                  <Building className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                  <span className="font-bold">{a.higherEducation}</span>
                </div>
              )}
              {a.currentOccupation && (
                <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                  <Briefcase className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>{a.currentOccupation}</span>
                </div>
              )}
              <div className="flex items-center gap-2 text-slate-500 pt-1">
                <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="font-mono">{a.contactNumber}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
