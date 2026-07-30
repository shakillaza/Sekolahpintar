import React from 'react';
import { StudentMasterItem, StudentEducationHistory } from '../../../types/studentTypes';
import { School, Calendar, Award, UserCheck, CheckCircle2, History } from 'lucide-react';

interface RiwayatPendidikanTabProps {
  students: StudentMasterItem[];
  selectedStudent: StudentMasterItem;
  educationHistories: StudentEducationHistory[];
  onSelectStudent: (s: StudentMasterItem) => void;
}

export const RiwayatPendidikanTab: React.FC<RiwayatPendidikanTabProps> = ({
  students,
  selectedStudent,
  educationHistories,
  onSelectStudent,
}) => {
  const history = educationHistories.find((h) => h.studentId === selectedStudent.id);

  return (
    <div className="space-y-6">
      {/* Student Picker Bar */}
      <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-300">
            <School className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-sm font-black text-slate-900 dark:text-white">
              Riwayat Pendidikan & Rekam Akademik
            </h3>
            <p className="text-xs text-slate-400">
              Riwayat sekolah asal, kenaikan kelas, wali kelas, dan perkembangan IP/GPA per semester.
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
        {/* Asal Sekolah Header Card */}
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3">
          <h4 className="text-xs font-extrabold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2.5 flex items-center gap-2">
            <School className="w-4 h-4 text-blue-600" />
            <span>Asal Sekolah Sebelumnya</span>
          </h4>

          <div className="space-y-2">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Nama Sekolah</span>
              <span className="font-extrabold text-slate-900 dark:text-white text-sm block">
                {selectedStudent.originSchool}
              </span>
            </div>

            {history && (
              <>
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase block">NPSN</span>
                    <span className="font-mono font-bold text-slate-800 dark:text-slate-200">
                      {history.npsn || '20101190'}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase block">Jenjang</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">{history.level}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase block">Tanggal Masuk</span>
                    <span className="font-mono text-slate-700 dark:text-slate-300">{history.entryDate}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase block">Tanggal Keluar</span>
                    <span className="font-mono text-slate-700 dark:text-slate-300">{history.exitDate}</span>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Alasan Keluar / Kelulusan</span>
                  <span className="font-medium text-slate-800 dark:text-slate-200">{history.exitReason}</span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Timeline Riwayat Kelas */}
        <div className="lg:col-span-2 p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
          <h4 className="text-xs font-extrabold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2.5 flex items-center gap-2">
            <History className="w-4 h-4 text-purple-600" />
            <span>Riwayat Kelas, Wali Kelas & Nilai Rapor</span>
          </h4>

          {history?.classHistory && history.classHistory.length > 0 ? (
            <div className="space-y-3">
              {history.classHistory.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700 flex flex-col md:flex-row items-start md:items-center justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 font-mono">
                        {item.academicYear}
                      </span>
                      <strong className="text-slate-900 dark:text-white font-black text-sm">
                        Kelas {item.className} ({item.gradeLevel})
                      </strong>
                    </div>
                    <div className="text-slate-500 font-medium text-[11px] flex items-center gap-1.5">
                      <UserCheck className="w-3.5 h-3.5 text-indigo-500" />
                      <span>Wali Kelas: {item.homeroomTeacher}</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-mono text-right">
                    <span className="text-[10px] font-bold text-slate-400 block uppercase">Rerata Nilai Rapor</span>
                    <span className="text-base font-black text-emerald-600 dark:text-emerald-400">
                      {item.gpa} / 100
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-6 text-center text-slate-400">
              Data riwayat kelas siswa ini masih dalam tahapSinkronisasi Sistem Rapor.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
