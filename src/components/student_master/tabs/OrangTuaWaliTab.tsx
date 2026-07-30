import React from 'react';
import { StudentMasterItem } from '../../../types/studentTypes';
import {
  Users,
  User,
  Phone,
  Mail,
  Briefcase,
  DollarSign,
  GraduationCap,
  MapPin,
  ShieldAlert,
  Heart,
  Link as LinkIcon
} from 'lucide-react';

interface OrangTuaWaliTabProps {
  students: StudentMasterItem[];
  selectedStudent: StudentMasterItem;
  onSelectStudent: (s: StudentMasterItem) => void;
}

export const OrangTuaWaliTab: React.FC<OrangTuaWaliTabProps> = ({
  students,
  selectedStudent,
  onSelectStudent,
}) => {
  const father = selectedStudent.father;
  const mother = selectedStudent.mother;
  const guardian = selectedStudent.guardian;

  // Find siblings
  const siblings = students.filter(
    (s) => s.id !== selectedStudent.id && selectedStudent.siblingsInSchool?.includes(s.id)
  );

  return (
    <div className="space-y-6">
      {/* Top Banner with Student Selector */}
      <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-300">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-sm font-black text-slate-900 dark:text-white">
              Data Orang Tua / Wali & Sibling Mapping
            </h3>
            <p className="text-xs text-slate-400">
              Satu data orang tua terpusat yang terhubung dengan seluruh anak dalam sistem sekolah.
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

      {/* Parents Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-xs">
        {/* Ayah Kandung */}
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-2xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-300 font-black">
                <User className="w-4 h-4" />
              </span>
              <div>
                <h4 className="text-xs font-extrabold text-slate-900 dark:text-white">
                  {father.name}
                </h4>
                <span className="text-[10px] text-blue-600 font-extrabold">{father.relationship}</span>
              </div>
            </div>
          </div>

          <div className="space-y-2.5">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase block">NIK KTP</span>
              <span className="font-mono font-extrabold text-slate-800 dark:text-slate-200">{father.nik}</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Pendidikan</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{father.education}</span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Pekerjaan</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{father.occupation}</span>
              </div>
            </div>

            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Penghasilan Bulanan</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400 font-mono">{father.monthlyIncome}</span>
            </div>

            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-1">
              <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                <Phone className="w-3.5 h-3.5 text-blue-500" />
                <span className="font-mono font-bold">{father.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                <Mail className="w-3.5 h-3.5 text-purple-500" />
                <span>{father.email}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Ibu Kandung */}
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-2xl bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-300 font-black">
                <User className="w-4 h-4" />
              </span>
              <div>
                <h4 className="text-xs font-extrabold text-slate-900 dark:text-white">
                  {mother.name}
                </h4>
                <span className="text-[10px] text-purple-600 font-extrabold">{mother.relationship}</span>
              </div>
            </div>
          </div>

          <div className="space-y-2.5">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase block">NIK KTP</span>
              <span className="font-mono font-extrabold text-slate-800 dark:text-slate-200">{mother.nik}</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Pendidikan</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{mother.education}</span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Pekerjaan</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{mother.occupation}</span>
              </div>
            </div>

            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Penghasilan Bulanan</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400 font-mono">{mother.monthlyIncome}</span>
            </div>

            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-1">
              <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                <Phone className="w-3.5 h-3.5 text-blue-500" />
                <span className="font-mono font-bold">{mother.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                <Mail className="w-3.5 h-3.5 text-purple-500" />
                <span>{mother.email}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Multi-Children / Sibling Linkage */}
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <h4 className="text-xs font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <LinkIcon className="w-4 h-4 text-amber-500" />
              <span>Saudara Terhubung (Multi-Children)</span>
            </h4>
          </div>

          <p className="text-[11px] text-slate-500">
            Anak dari pasangan {father.name} & {mother.name} yang terdaftar dalam database sekolah:
          </p>

          <div className="space-y-2">
            {siblings.length === 0 ? (
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 text-slate-400 text-center">
                Belum ada saudara terdaftar di sekolah ini.
              </div>
            ) : (
              siblings.map((sib) => (
                <div
                  key={sib.id}
                  onClick={() => onSelectStudent(sib)}
                  className="p-3 rounded-2xl bg-blue-50/60 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 cursor-pointer hover:bg-blue-100/70 transition-all flex items-center gap-3"
                >
                  <img
                    src={sib.photoUrl}
                    alt={sib.fullName}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div>
                    <span className="font-extrabold text-slate-900 dark:text-white block">{sib.fullName}</span>
                    <span className="text-[10px] text-blue-700 dark:text-blue-300 font-mono">
                      {sib.className} ({sib.schoolLevel})
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
