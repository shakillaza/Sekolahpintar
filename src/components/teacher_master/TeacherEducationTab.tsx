import React, { useState } from 'react';
import { GraduationCap, Plus, BookOpen, Award, FileText } from 'lucide-react';
import { TeacherEducationHistory, TeacherMasterItem } from '../../types/teacherTypes';

interface TeacherEducationTabProps {
  teachers: TeacherMasterItem[];
  educations: TeacherEducationHistory[];
  onAddEducation: (edu: TeacherEducationHistory) => void;
}

export const TeacherEducationTab: React.FC<TeacherEducationTabProps> = ({
  teachers,
  educations,
  onAddEducation
}) => {
  const [selectedTeacherId, setSelectedTeacherId] = useState<string>('ALL');

  const filteredEdu = educations.filter(e => selectedTeacherId === 'ALL' || e.teacherId === selectedTeacherId);

  return (
    <div className="space-y-4">
      <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
        <div>
          <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-indigo-600" />
            Riwayat Pendidikan, Pelatihan & Seminar
          </h2>
          <p className="text-xs text-slate-500">SD, SMP, SMA, D3, S1, S2, S3, Workshop & Sertifikat Kelulusan</p>
        </div>
        <select
          value={selectedTeacherId}
          onChange={(e) => setSelectedTeacherId(e.target.value)}
          className="px-3 py-2 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-300"
        >
          <option value="ALL">Semua Guru & Pegawai</option>
          {teachers.map(t => <option key={t.id} value={t.id}>{t.fullName}</option>)}
        </select>
      </div>

      <div className="space-y-3">
        {filteredEdu.length > 0 ? (
          filteredEdu.map((edu) => {
            const tch = teachers.find(t => t.id === edu.teacherId);
            return (
              <div key={edu.id} className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-xs">
                    {edu.level}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-slate-100 text-xs">{edu.institutionName}</h3>
                    <p className="text-xs text-slate-500">{edu.major || 'Semua Jurusan'} • Lulus Tahun {edu.graduationYear}</p>
                    {tch && <p className="text-[11px] text-indigo-600 dark:text-indigo-400 mt-0.5">Personil: {tch.fullName}</p>}
                  </div>
                </div>
                {edu.certificateNo && (
                  <span className="font-mono text-xs text-slate-400 bg-slate-100 dark:bg-slate-900 px-3 py-1 rounded-lg">
                    {edu.certificateNo}
                  </span>
                )}
              </div>
            );
          })
        ) : (
          <div className="p-8 text-center text-slate-400 italic bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-800">
            Belum ada data riwayat pendidikan tersimpan.
          </div>
        )}
      </div>
    </div>
  );
};
