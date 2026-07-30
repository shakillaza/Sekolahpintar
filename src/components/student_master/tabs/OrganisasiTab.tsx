import React from 'react';
import { StudentOrganizationRecord } from '../../../types/studentTypes';
import { Users, ShieldCheck, Award, Calendar } from 'lucide-react';

interface OrganisasiTabProps {
  organizations: StudentOrganizationRecord[];
}

export const OrganisasiTab: React.FC<OrganisasiTabProps> = ({ organizations }) => {
  return (
    <div className="space-y-6 text-xs">
      <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-300">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-sm font-black text-slate-900 dark:text-white">
              Rekam Organisasi Siswa (OSIS, Pramuka, PMR, Paskibra, Rohis, dll)
            </h3>
            <p className="text-xs text-slate-400">
              Pencatatan jabatan, periode kepengurusan, dan program kerja unggulan.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {organizations.map((org) => (
          <div
            key={org.id}
            className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="px-2.5 py-1 rounded-2xl text-[10px] font-extrabold bg-indigo-100 text-indigo-900 dark:bg-indigo-950 dark:text-indigo-300">
                  {org.position}
                </span>
                <h4 className="font-black text-base text-slate-900 dark:text-white mt-2">
                  {org.orgName}
                </h4>
              </div>

              <span className="font-mono font-bold text-slate-400 text-[11px]">{org.period}</span>
            </div>

            <p className="text-[11px] text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800 p-3 rounded-2xl border border-slate-100 dark:border-slate-800">
              <strong className="block text-slate-900 dark:text-white mb-0.5">Program & Pencapaian Kepemimpinan:</strong>
              {org.achievementsLed}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
