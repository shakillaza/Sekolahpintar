import React, { useState } from 'react';
import { StudentMasterItem } from '../../../types/studentTypes';
import {
  MapPin,
  Phone,
  Mail,
  User,
  Heart,
  Target,
  FileText,
  Activity,
  Ruler,
  Weight,
  Sparkles,
  Edit2,
  CheckCircle2
} from 'lucide-react';

interface BiodataLengkapTabProps {
  students: StudentMasterItem[];
  selectedStudent: StudentMasterItem;
  onSelectStudent: (s: StudentMasterItem) => void;
  onUpdateStudent: (s: StudentMasterItem) => void;
}

export const BiodataLengkapTab: React.FC<BiodataLengkapTabProps> = ({
  students,
  selectedStudent,
  onSelectStudent,
  onUpdateStudent,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<StudentMasterItem>(selectedStudent);

  const handleSave = () => {
    onUpdateStudent(formData);
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      {/* Student Selector Banner */}
      <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <img
            src={selectedStudent.photoUrl}
            alt={selectedStudent.fullName}
            className="w-12 h-12 rounded-2xl object-cover border-2 border-blue-600 shadow-sm"
          />
          <div>
            <h3 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-2">
              <span>{selectedStudent.fullName}</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 font-extrabold">
                {selectedStudent.className}
              </span>
            </h3>
            <p className="text-xs text-slate-400 font-mono">
              NIS: {selectedStudent.nis} • NISN: {selectedStudent.nisn}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select
            value={selectedStudent.id}
            onChange={(e) => {
              const found = students.find((s) => s.id === e.target.value);
              if (found) {
                onSelectStudent(found);
                setFormData(found);
              }
            }}
            className="px-3 py-2 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200"
          >
            {students.map((s) => (
              <option key={s.id} value={s.id}>
                {s.fullName} ({s.className})
              </option>
            ))}
          </select>

          {isEditing ? (
            <button
              onClick={handleSave}
              className="px-4 py-2 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-md"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Simpan</span>
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center gap-1.5"
            >
              <Edit2 className="w-3.5 h-3.5 text-blue-600" />
              <span>Edit Biodata</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Biodata Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-xs">
        {/* Alamat & Kontak */}
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
          <h4 className="text-xs font-extrabold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2.5 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-blue-600" />
            <span>Alamat Domisili & KTP</span>
          </h4>

          <div className="space-y-3">
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase block">Alamat Domisili</label>
              {isEditing ? (
                <textarea
                  value={formData.domicileAddress}
                  onChange={(e) => setFormData({ ...formData, domicileAddress: e.target.value })}
                  className="w-full mt-1 p-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                  rows={2}
                />
              ) : (
                <p className="font-semibold text-slate-800 dark:text-slate-200 mt-0.5">{selectedStudent.domicileAddress}</p>
              )}
            </div>

            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase block">Alamat KTP</label>
              {isEditing ? (
                <textarea
                  value={formData.ktpAddress}
                  onChange={(e) => setFormData({ ...formData, ktpAddress: e.target.value })}
                  className="w-full mt-1 p-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                  rows={2}
                />
              ) : (
                <p className="font-semibold text-slate-800 dark:text-slate-200 mt-0.5">{selectedStudent.ktpAddress}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase block">Provinsi</label>
                <p className="font-bold text-slate-900 dark:text-white mt-0.5">{selectedStudent.province}</p>
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase block">Kota / Kab</label>
                <p className="font-bold text-slate-900 dark:text-white mt-0.5">{selectedStudent.regencyCity}</p>
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase block">Kecamatan</label>
                <p className="font-bold text-slate-900 dark:text-white mt-0.5">{selectedStudent.district}</p>
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase block">Kelurahan / Kode Pos</label>
                <p className="font-bold text-slate-900 dark:text-white mt-0.5">
                  {selectedStudent.village} ({selectedStudent.postalCode})
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Data Keluarga & Fisik */}
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
          <h4 className="text-xs font-extrabold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2.5 flex items-center gap-2">
            <User className="w-4 h-4 text-purple-600" />
            <span>Keluarga & Antropometri Fisik</span>
          </h4>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
              <span className="text-[10px] font-bold text-slate-400 block">Anak Ke-</span>
              <span className="text-base font-black text-slate-900 dark:text-white font-mono">
                {selectedStudent.childOrder} dari {selectedStudent.siblingsCount} Bersaudara
              </span>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
              <span className="text-[10px] font-bold text-slate-400 block">Golongan Darah</span>
              <span className="text-base font-black text-rose-600 font-mono">
                {selectedStudent.bloodType}
              </span>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
              <span className="text-[10px] font-bold text-slate-400 block flex items-center gap-1">
                <Ruler className="w-3 h-3 text-blue-500" /> Tinggi Badan
              </span>
              <span className="text-base font-black text-slate-900 dark:text-white font-mono">
                {selectedStudent.heightCm} cm
              </span>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
              <span className="text-[10px] font-bold text-slate-400 block flex items-center gap-1">
                <Weight className="w-3 h-3 text-emerald-500" /> Berat Badan
              </span>
              <span className="text-base font-black text-slate-900 dark:text-white font-mono">
                {selectedStudent.weightKg} kg
              </span>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
            <label className="text-[10px] font-bold text-slate-400 uppercase block">Kebutuhan Khusus / Inklusi</label>
            <span className="font-bold text-slate-800 dark:text-slate-200 mt-1 block">
              {selectedStudent.specialNeeds}
            </span>
          </div>
        </div>

        {/* Minat, Hobi & Cita-cita */}
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
          <h4 className="text-xs font-extrabold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2.5 flex items-center gap-2">
            <Target className="w-4 h-4 text-emerald-600" />
            <span>Hobi & Impian Karir</span>
          </h4>

          <div className="space-y-3">
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Hobi & Kegemaran</label>
              <div className="flex flex-wrap gap-1.5">
                {selectedStudent.hobbies.map((h, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-bold text-[11px]"
                  >
                    {h}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-950/40 dark:to-slate-900 border border-indigo-100 dark:border-indigo-900 space-y-1">
              <span className="text-[10px] font-bold text-indigo-700 dark:text-indigo-300 uppercase flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-500" /> Cita-Cita Karir Masa Depan
              </span>
              <p className="font-black text-slate-900 dark:text-white text-sm">
                {selectedStudent.aspirations}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
