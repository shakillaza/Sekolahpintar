import React from 'react';
import { Briefcase, Plus, FileText, CheckCircle2 } from 'lucide-react';
import { TeacherAssignment, TeacherMasterItem } from '../../types/teacherTypes';

interface TeacherAssignmentTabProps {
  assignments: TeacherAssignment[];
  teachers: TeacherMasterItem[];
}

export const TeacherAssignmentTab: React.FC<TeacherAssignmentTabProps> = ({
  assignments,
  teachers
}) => {
  return (
    <div className="space-y-4">
      <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center justify-between">
        <div>
          <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-indigo-600" />
            Manajemen Jabatan & Penugasan Tambahan Multi-Role
          </h2>
          <p className="text-xs text-slate-500">Guru Mapel, Wali Kelas, Guru BK, Wakasek, Kepala TU, Bendahara, Operator & Laboran</p>
        </div>
        <button className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg shadow-sm flex items-center gap-1">
          <Plus className="w-3.5 h-3.5" />
          Terbitkan SK Penugasan Baru
        </button>
      </div>

      <div className="space-y-3">
        {assignments.map((asg) => (
          <div key={asg.id} className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">{asg.teacherName}</h3>
                <p className="text-xs text-indigo-600 dark:text-indigo-400 font-medium">Tahun Ajaran: {asg.schoolYear} ({asg.semester})</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-slate-500 bg-slate-100 dark:bg-slate-900 px-3 py-1 rounded-lg">
                  SK: {asg.decreeNumber}
                </span>
                <span className="text-xs text-slate-400">Berlaku: {asg.startDate}</span>
              </div>
            </div>

            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                Daftar Penugasan Aktif
              </span>
              <div className="flex flex-wrap gap-2">
                {asg.roles.map((role, idx) => (
                  <div key={idx} className="px-3 py-1.5 bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-900 dark:text-indigo-200 font-semibold text-xs rounded-xl flex items-center gap-1.5 shadow-sm">
                    <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500" />
                    <span>{role}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
