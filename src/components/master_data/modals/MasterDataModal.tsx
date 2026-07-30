import React, { useState, useEffect } from 'react';
import {
  X,
  AlertCircle,
  CheckCircle2,
  Save,
  User,
  GraduationCap,
  Building2,
  BookOpen,
  DoorOpen,
  Layers
} from 'lucide-react';
import {
  MasterDataType,
  StudentMaster,
  TeacherMaster,
  SchoolMaster,
  ClassroomMaster,
  SubjectMaster,
  FacilityMaster,
  MasterDataValidationError,
  SchoolLevel
} from '../../../types';
import {
  validateStudent,
  validateTeacher,
  validateSchoolMaster,
  validateClassroom,
  validateSubject,
  validateFacility
} from '../ValidationHelper';

interface MasterDataModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: MasterDataType;
  initialRecord?: any;
  onSave: (record: any) => void;
  
  // Entire datasets for duplicate checking
  allStudents: StudentMaster[];
  allTeachers: TeacherMaster[];
  allSchools: SchoolMaster[];
  allClassrooms: ClassroomMaster[];
  allSubjects: SubjectMaster[];
  allFacilities: FacilityMaster[];
}

export const MasterDataModal: React.FC<MasterDataModalProps> = ({
  isOpen,
  onClose,
  type,
  initialRecord,
  onSave,
  allStudents,
  allTeachers,
  allSchools,
  allClassrooms,
  allSubjects,
  allFacilities,
}) => {
  const isEdit = !!initialRecord;

  // Form State
  const [formData, setFormData] = useState<any>({});
  const [errors, setErrors] = useState<MasterDataValidationError[]>([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    if (initialRecord) {
      setFormData({ ...initialRecord });
    } else {
      // Default initial states based on type
      if (type === 'siswa') {
        setFormData({
          schoolId: 'sch_1',
          nis: '',
          nisn: '',
          name: '',
          gender: 'L',
          email: '',
          parentPhone: '',
          className: 'XII IPA 1',
          status: 'Aktif',
          address: '',
          entryYear: new Date().getFullYear(),
        });
      } else if (type === 'guru') {
        setFormData({
          schoolId: 'sch_1',
          nip: '',
          name: '',
          gender: 'L',
          email: '',
          phone: '',
          roleTitle: 'Guru Pengajar',
          employmentStatus: 'PNS',
          subjectSpecialization: '',
          status: 'Aktif',
        });
      } else if (type === 'sekolah') {
        setFormData({
          npsn: '',
          name: '',
          level: 'SMA',
          accreditation: 'A',
          principalName: '',
          email: '',
          phone: '',
          address: '',
          studentsCount: 0,
        });
      } else if (type === 'kelas') {
        setFormData({
          schoolId: 'sch_1',
          code: '',
          name: '',
          gradeLevel: 'X',
          homeroomTeacherId: 'tch_1',
          homeroomTeacherName: 'Drs. Ahmad Dahlan, M.Pd.',
          capacity: 36,
          academicYear: '2026/2027',
        });
      } else if (type === 'mapel') {
        setFormData({
          schoolId: 'sch_1',
          code: '',
          name: '',
          category: 'Wajib',
          curriculumGroup: 'Kurikulum Merdeka',
          hoursPerWeek: 3,
          gradeTarget: 'Semua Kelas',
        });
      } else if (type === 'gedung') {
        setFormData({
          schoolId: 'sch_1',
          code: '',
          name: '',
          type: 'Ruang Teori',
          buildingName: 'Gedung Utama',
          capacity: 40,
          condition: 'Baik',
        });
      }
    }
    setErrors([]);
    setHasSubmitted(false);
  }, [initialRecord, type, isOpen]);

  if (!isOpen) return null;

  // Run validation
  const runValidation = (currentData: any) => {
    let currentErrors: MasterDataValidationError[] = [];
    if (type === 'siswa') {
      currentErrors = validateStudent({
        student: currentData,
        allStudents,
        editingId: initialRecord?.id,
      });
    } else if (type === 'guru') {
      currentErrors = validateTeacher({
        teacher: currentData,
        allTeachers,
        editingId: initialRecord?.id,
      });
    } else if (type === 'sekolah') {
      currentErrors = validateSchoolMaster({
        school: currentData,
        allSchools,
        editingId: initialRecord?.id,
      });
    } else if (type === 'kelas') {
      currentErrors = validateClassroom({
        classroom: currentData,
        allClassrooms,
        editingId: initialRecord?.id,
      });
    } else if (type === 'mapel') {
      currentErrors = validateSubject({
        subject: currentData,
        allSubjects,
        editingId: initialRecord?.id,
      });
    } else if (type === 'gedung') {
      currentErrors = validateFacility({
        facility: currentData,
        allFacilities,
        editingId: initialRecord?.id,
      });
    }
    setErrors(currentErrors);
    return currentErrors;
  };

  const handleChange = (field: string, value: any) => {
    const updated = { ...formData, [field]: value };
    setFormData(updated);
    if (hasSubmitted) {
      runValidation(updated);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSubmitted(true);
    const validationErrors = runValidation(formData);
    if (validationErrors.length > 0) {
      return;
    }

    onSave({
      id: initialRecord?.id || `rec_${Date.now()}`,
      ...formData,
    });
    onClose();
  };

  const getFieldError = (field: string) => {
    return errors.find((e) => e.field === field)?.message;
  };

  const titles: Record<MasterDataType, { title: string; icon: React.ElementType }> = {
    siswa: { title: 'Master Data Siswa', icon: GraduationCap },
    guru: { title: 'Master Data Guru & Staf', icon: User },
    sekolah: { title: 'Master Data Unit Sekolah', icon: Building2 },
    kelas: { title: 'Master Data Kelas / Rombel', icon: Layers },
    mapel: { title: 'Master Data Mata Pelajaran', icon: BookOpen },
    gedung: { title: 'Master Data Gedung & Ruangan', icon: DoorOpen },
  };

  const ModalIcon = titles[type].icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl my-8 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-200/80 dark:border-slate-800 flex items-center justify-between bg-slate-50/80 dark:bg-slate-800/40">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-600 text-white shadow-md shadow-blue-600/20">
              <ModalIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                {isEdit ? 'Edit ' : 'Tambah Baru '} {titles[type].title}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Lengkapi seluruh form dengan validasi otomatis NIS, NISN, NIP, NPSN, dan email.
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

        {/* Validation Errors Banner */}
        {errors.length > 0 && hasSubmitted && (
          <div className="mx-6 mt-4 p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800/60 text-rose-700 dark:text-rose-300 text-xs space-y-1">
            <div className="font-bold flex items-center gap-2 text-rose-800 dark:text-rose-200">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>Gagal Menyimpan! Harap perbaiki {errors.length} kesalahan berikut:</span>
            </div>
            <ul className="list-disc pl-5 space-y-0.5 pt-1 text-[11px]">
              {errors.map((err, idx) => (
                <li key={idx}>{err.message}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          {/* SISWA FORM */}
          {type === 'siswa' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Nama Lengkap Siswa <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name || ''}
                  onChange={(e) => handleChange('name', e.target.value)}
                  placeholder="Contoh: Ananda Rizky Gunawan"
                  className={`w-full px-3.5 py-2.5 rounded-xl border bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 ${
                    getFieldError('name')
                      ? 'border-rose-500 focus:ring-rose-500'
                      : 'border-slate-300 dark:border-slate-700 focus:ring-blue-500'
                  }`}
                />
                {getFieldError('name') && (
                  <p className="text-[10px] font-medium text-rose-500 mt-1">{getFieldError('name')}</p>
                )}
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Jenis Kelamin <span className="text-rose-500">*</span>
                </label>
                <select
                  value={formData.gender || 'L'}
                  onChange={(e) => handleChange('gender', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="L">Laki-laki (L)</option>
                  <option value="P">Perempuan (P)</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  NIS (Nomor Induk Siswa) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.nis || ''}
                  onChange={(e) => handleChange('nis', e.target.value)}
                  placeholder="20241001"
                  className={`w-full px-3.5 py-2.5 rounded-xl border bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 ${
                    getFieldError('nis')
                      ? 'border-rose-500 focus:ring-rose-500'
                      : 'border-slate-300 dark:border-slate-700 focus:ring-blue-500'
                  }`}
                />
                {getFieldError('nis') && (
                  <p className="text-[10px] font-medium text-rose-500 mt-1">{getFieldError('nis')}</p>
                )}
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  NISN (Nasional) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.nisn || ''}
                  onChange={(e) => handleChange('nisn', e.target.value)}
                  placeholder="0078912345"
                  className={`w-full px-3.5 py-2.5 rounded-xl border bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 ${
                    getFieldError('nisn')
                      ? 'border-rose-500 focus:ring-rose-500'
                      : 'border-slate-300 dark:border-slate-700 focus:ring-blue-500'
                  }`}
                />
                {getFieldError('nisn') && (
                  <p className="text-[10px] font-medium text-rose-500 mt-1">{getFieldError('nisn')}</p>
                )}
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Email Siswa <span className="text-rose-500">*</span>
                </label>
                <input
                  type="email"
                  value={formData.email || ''}
                  onChange={(e) => handleChange('email', e.target.value)}
                  placeholder="siswa@sekolah.sch.id"
                  className={`w-full px-3.5 py-2.5 rounded-xl border bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 ${
                    getFieldError('email')
                      ? 'border-rose-500 focus:ring-rose-500'
                      : 'border-slate-300 dark:border-slate-700 focus:ring-blue-500'
                  }`}
                />
                {getFieldError('email') && (
                  <p className="text-[10px] font-medium text-rose-500 mt-1">{getFieldError('email')}</p>
                )}
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  No HP Orang Tua/Wali <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.parentPhone || ''}
                  onChange={(e) => handleChange('parentPhone', e.target.value)}
                  placeholder="081288776655"
                  className={`w-full px-3.5 py-2.5 rounded-xl border bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 ${
                    getFieldError('parentPhone')
                      ? 'border-rose-500 focus:ring-rose-500'
                      : 'border-slate-300 dark:border-slate-700 focus:ring-blue-500'
                  }`}
                />
                {getFieldError('parentPhone') && (
                  <p className="text-[10px] font-medium text-rose-500 mt-1">{getFieldError('parentPhone')}</p>
                )}
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Kelas / Rombel <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.className || ''}
                  onChange={(e) => handleChange('className', e.target.value)}
                  placeholder="XII IPA 1"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Status Siswa
                </label>
                <select
                  value={formData.status || 'Aktif'}
                  onChange={(e) => handleChange('status', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Aktif">Aktif</option>
                  <option value="Lulus">Lulus</option>
                  <option value="Pindah">Pindah</option>
                  <option value="Cuti">Cuti</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Alamat Tempat Tinggal
                </label>
                <textarea
                  value={formData.address || ''}
                  onChange={(e) => handleChange('address', e.target.value)}
                  rows={2}
                  placeholder="Jl. Ampera Raya No. 12, Jakarta"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          )}

          {/* GURU FORM */}
          {type === 'guru' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Nama Lengkap Guru / Staf <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name || ''}
                  onChange={(e) => handleChange('name', e.target.value)}
                  placeholder="Drs. Ahmad Dahlan, M.Pd."
                  className={`w-full px-3.5 py-2.5 rounded-xl border bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 ${
                    getFieldError('name')
                      ? 'border-rose-500 focus:ring-rose-500'
                      : 'border-slate-300 dark:border-slate-700 focus:ring-blue-500'
                  }`}
                />
                {getFieldError('name') && (
                  <p className="text-[10px] font-medium text-rose-500 mt-1">{getFieldError('name')}</p>
                )}
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  NIP / NUPTK <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.nip || ''}
                  onChange={(e) => handleChange('nip', e.target.value)}
                  placeholder="197808202003121004"
                  className={`w-full px-3.5 py-2.5 rounded-xl border bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 ${
                    getFieldError('nip')
                      ? 'border-rose-500 focus:ring-rose-500'
                      : 'border-slate-300 dark:border-slate-700 focus:ring-blue-500'
                  }`}
                />
                {getFieldError('nip') && (
                  <p className="text-[10px] font-medium text-rose-500 mt-1">{getFieldError('nip')}</p>
                )}
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Email Resmi <span className="text-rose-500">*</span>
                </label>
                <input
                  type="email"
                  value={formData.email || ''}
                  onChange={(e) => handleChange('email', e.target.value)}
                  placeholder="guru@garudacendekia.sch.id"
                  className={`w-full px-3.5 py-2.5 rounded-xl border bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 ${
                    getFieldError('email')
                      ? 'border-rose-500 focus:ring-rose-500'
                      : 'border-slate-300 dark:border-slate-700 focus:ring-blue-500'
                  }`}
                />
                {getFieldError('email') && (
                  <p className="text-[10px] font-medium text-rose-500 mt-1">{getFieldError('email')}</p>
                )}
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Nomor HP / WA <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.phone || ''}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  placeholder="081311223344"
                  className={`w-full px-3.5 py-2.5 rounded-xl border bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 ${
                    getFieldError('phone')
                      ? 'border-rose-500 focus:ring-rose-500'
                      : 'border-slate-300 dark:border-slate-700 focus:ring-blue-500'
                  }`}
                />
                {getFieldError('phone') && (
                  <p className="text-[10px] font-medium text-rose-500 mt-1">{getFieldError('phone')}</p>
                )}
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Jabatan / Peran <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.roleTitle || ''}
                  onChange={(e) => handleChange('roleTitle', e.target.value)}
                  placeholder="Guru Pengajar / Wali Kelas / Kepala Sekolah"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Status Kepegawaian
                </label>
                <select
                  value={formData.employmentStatus || 'PNS'}
                  onChange={(e) => handleChange('employmentStatus', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="PNS">PNS / ASN</option>
                  <option value="GTY">GTY (Guru Tetap Yayasan)</option>
                  <option value="GTT">GTT (Guru Tidak Tetap)</option>
                  <option value="Honorer">Honorer / Kontrak</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Spesialisasi Mata Pelajaran / Bidang
                </label>
                <input
                  type="text"
                  value={formData.subjectSpecialization || ''}
                  onChange={(e) => handleChange('subjectSpecialization', e.target.value)}
                  placeholder="Kimia, Biologi, Informatika"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          )}

          {/* SEKOLAH FORM */}
          {type === 'sekolah' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Nama Resmi Sekolah <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name || ''}
                  onChange={(e) => handleChange('name', e.target.value)}
                  placeholder="SMA Garuda Cendekia"
                  className={`w-full px-3.5 py-2.5 rounded-xl border bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 ${
                    getFieldError('name')
                      ? 'border-rose-500 focus:ring-rose-500'
                      : 'border-slate-300 dark:border-slate-700 focus:ring-blue-500'
                  }`}
                />
                {getFieldError('name') && (
                  <p className="text-[10px] font-medium text-rose-500 mt-1">{getFieldError('name')}</p>
                )}
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  NPSN (Pokok Sekolah) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.npsn || ''}
                  onChange={(e) => handleChange('npsn', e.target.value)}
                  placeholder="20108922"
                  className={`w-full px-3.5 py-2.5 rounded-xl border bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 ${
                    getFieldError('npsn')
                      ? 'border-rose-500 focus:ring-rose-500'
                      : 'border-slate-300 dark:border-slate-700 focus:ring-blue-500'
                  }`}
                />
                {getFieldError('npsn') && (
                  <p className="text-[10px] font-medium text-rose-500 mt-1">{getFieldError('npsn')}</p>
                )}
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Jenjang Pendidikan
                </label>
                <select
                  value={formData.level || 'SMA'}
                  onChange={(e) => handleChange('level', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="PAUD">PAUD</option>
                  <option value="TK">TK</option>
                  <option value="SD">SD</option>
                  <option value="SMP">SMP</option>
                  <option value="SMA">SMA</option>
                  <option value="SMK">SMK</option>
                  <option value="Pesantren">Pondok Pesantren</option>
                  <option value="Internasional">Sekolah Internasional</option>
                  <option value="Homeschool">Homeschool</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Akreditasi
                </label>
                <select
                  value={formData.accreditation || 'A'}
                  onChange={(e) => handleChange('accreditation', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="A">A (Unggul)</option>
                  <option value="B">B (Baik)</option>
                  <option value="C">C (Cukup)</option>
                  <option value="Belum Terakreditasi">Belum Terakreditasi</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Nama Kepala Sekolah
                </label>
                <input
                  type="text"
                  value={formData.principalName || ''}
                  onChange={(e) => handleChange('principalName', e.target.value)}
                  placeholder="Drs. Ahmad Dahlan, M.Pd."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Email Resmi Sekolah <span className="text-rose-500">*</span>
                </label>
                <input
                  type="email"
                  value={formData.email || ''}
                  onChange={(e) => handleChange('email', e.target.value)}
                  placeholder="info@sekolah.sch.id"
                  className={`w-full px-3.5 py-2.5 rounded-xl border bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 ${
                    getFieldError('email')
                      ? 'border-rose-500 focus:ring-rose-500'
                      : 'border-slate-300 dark:border-slate-700 focus:ring-blue-500'
                  }`}
                />
                {getFieldError('email') && (
                  <p className="text-[10px] font-medium text-rose-500 mt-1">{getFieldError('email')}</p>
                )}
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Nomor Telepon Kantor <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.phone || ''}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  placeholder="021-7890123"
                  className={`w-full px-3.5 py-2.5 rounded-xl border bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 ${
                    getFieldError('phone')
                      ? 'border-rose-500 focus:ring-rose-500'
                      : 'border-slate-300 dark:border-slate-700 focus:ring-blue-500'
                  }`}
                />
                {getFieldError('phone') && (
                  <p className="text-[10px] font-medium text-rose-500 mt-1">{getFieldError('phone')}</p>
                )}
              </div>

              <div className="sm:col-span-2">
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Alamat Lengkap Institusi
                </label>
                <textarea
                  value={formData.address || ''}
                  onChange={(e) => handleChange('address', e.target.value)}
                  rows={2}
                  placeholder="Jl. Kemang Selatan No. 12, Jakarta"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          )}

          {/* KELAS FORM */}
          {type === 'kelas' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Kode Kelas <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.code || ''}
                  onChange={(e) => handleChange('code', e.target.value)}
                  placeholder="XII-IPA-1"
                  className={`w-full px-3.5 py-2.5 rounded-xl border bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 ${
                    getFieldError('code')
                      ? 'border-rose-500 focus:ring-rose-500'
                      : 'border-slate-300 dark:border-slate-700 focus:ring-blue-500'
                  }`}
                />
                {getFieldError('code') && (
                  <p className="text-[10px] font-medium text-rose-500 mt-1">{getFieldError('code')}</p>
                )}
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Nama Rombel / Kelas <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name || ''}
                  onChange={(e) => handleChange('name', e.target.value)}
                  placeholder="XII IPA 1"
                  className={`w-full px-3.5 py-2.5 rounded-xl border bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 ${
                    getFieldError('name')
                      ? 'border-rose-500 focus:ring-rose-500'
                      : 'border-slate-300 dark:border-slate-700 focus:ring-blue-500'
                  }`}
                />
                {getFieldError('name') && (
                  <p className="text-[10px] font-medium text-rose-500 mt-1">{getFieldError('name')}</p>
                )}
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Tingkat / Grade Level
                </label>
                <input
                  type="text"
                  value={formData.gradeLevel || ''}
                  onChange={(e) => handleChange('gradeLevel', e.target.value)}
                  placeholder="XII"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Wali Kelas
                </label>
                <input
                  type="text"
                  value={formData.homeroomTeacherName || ''}
                  onChange={(e) => handleChange('homeroomTeacherName', e.target.value)}
                  placeholder="Siti Rahmawati, S.Pd."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Kapasitas Maksimal Siswa
                </label>
                <input
                  type="number"
                  value={formData.capacity || 36}
                  onChange={(e) => handleChange('capacity', Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Tahun Ajaran
                </label>
                <input
                  type="text"
                  value={formData.academicYear || '2026/2027'}
                  onChange={(e) => handleChange('academicYear', e.target.value)}
                  placeholder="2026/2027"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          )}

          {/* MAPEL FORM */}
          {type === 'mapel' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Kode Mapel <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.code || ''}
                  onChange={(e) => handleChange('code', e.target.value)}
                  placeholder="MP-KIM-12"
                  className={`w-full px-3.5 py-2.5 rounded-xl border bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 ${
                    getFieldError('code')
                      ? 'border-rose-500 focus:ring-rose-500'
                      : 'border-slate-300 dark:border-slate-700 focus:ring-blue-500'
                  }`}
                />
                {getFieldError('code') && (
                  <p className="text-[10px] font-medium text-rose-500 mt-1">{getFieldError('code')}</p>
                )}
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Nama Mata Pelajaran <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name || ''}
                  onChange={(e) => handleChange('name', e.target.value)}
                  placeholder="Kimia Organik & Sains"
                  className={`w-full px-3.5 py-2.5 rounded-xl border bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 ${
                    getFieldError('name')
                      ? 'border-rose-500 focus:ring-rose-500'
                      : 'border-slate-300 dark:border-slate-700 focus:ring-blue-500'
                  }`}
                />
                {getFieldError('name') && (
                  <p className="text-[10px] font-medium text-rose-500 mt-1">{getFieldError('name')}</p>
                )}
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Kategori Mapel
                </label>
                <select
                  value={formData.category || 'Wajib'}
                  onChange={(e) => handleChange('category', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Wajib">Wajib Nasional</option>
                  <option value="Pilihan">Pilihan Minat</option>
                  <option value="Muatan Lokal">Muatan Lokal (Mulok)</option>
                  <option value="Keagamaan">Keagamaan / Tahfizh</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Kelompok Kurikulum
                </label>
                <select
                  value={formData.curriculumGroup || 'Kurikulum Merdeka'}
                  onChange={(e) => handleChange('curriculumGroup', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Kurikulum Merdeka">Kurikulum Merdeka</option>
                  <option value="K13">K13 Revisi</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Beban Jam Per Minggu
                </label>
                <input
                  type="number"
                  value={formData.hoursPerWeek || 3}
                  onChange={(e) => handleChange('hoursPerWeek', Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Target Kelas
                </label>
                <input
                  type="text"
                  value={formData.gradeTarget || 'Semua Kelas'}
                  onChange={(e) => handleChange('gradeTarget', e.target.value)}
                  placeholder="Kelas XII IPA"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          )}

          {/* GEDUNG / RUANGAN FORM */}
          {type === 'gedung' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Kode Ruangan <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.code || ''}
                  onChange={(e) => handleChange('code', e.target.value)}
                  placeholder="LAB-KOM-01"
                  className={`w-full px-3.5 py-2.5 rounded-xl border bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 ${
                    getFieldError('code')
                      ? 'border-rose-500 focus:ring-rose-500'
                      : 'border-slate-300 dark:border-slate-700 focus:ring-blue-500'
                  }`}
                />
                {getFieldError('code') && (
                  <p className="text-[10px] font-medium text-rose-500 mt-1">{getFieldError('code')}</p>
                )}
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Nama Ruangan <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name || ''}
                  onChange={(e) => handleChange('name', e.target.value)}
                  placeholder="Laboratorium Komputer AI"
                  className={`w-full px-3.5 py-2.5 rounded-xl border bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 ${
                    getFieldError('name')
                      ? 'border-rose-500 focus:ring-rose-500'
                      : 'border-slate-300 dark:border-slate-700 focus:ring-blue-500'
                  }`}
                />
                {getFieldError('name') && (
                  <p className="text-[10px] font-medium text-rose-500 mt-1">{getFieldError('name')}</p>
                )}
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Tipe Ruangan
                </label>
                <select
                  value={formData.type || 'Ruang Teori'}
                  onChange={(e) => handleChange('type', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Ruang Teori">Ruang Teori / Kelas</option>
                  <option value="Laboratorium Komputer">Laboratorium Komputer</option>
                  <option value="Lab IPA">Laboratorium IPA</option>
                  <option value="Perpustakaan">Perpustakaan</option>
                  <option value="Aula">Aula Serbaguna</option>
                  <option value="Lapangan">Lapangan Olahraga</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Nama Gedung / Gedung Utama <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.buildingName || ''}
                  onChange={(e) => handleChange('buildingName', e.target.value)}
                  placeholder="Gedung Science Lt. 2"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Kapasitas
                </label>
                <input
                  type="number"
                  value={formData.capacity || 40}
                  onChange={(e) => handleChange('capacity', Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Kondisi Ruangan
                </label>
                <select
                  value={formData.condition || 'Baik'}
                  onChange={(e) => handleChange('condition', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Sangat Baik">Sangat Baik</option>
                  <option value="Baik">Baik</option>
                  <option value="Perlu Perbaikan">Perlu Perbaikan</option>
                </select>
              </div>
            </div>
          )}

          {/* Submit Buttons */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/25 flex items-center gap-1.5 transition-all"
            >
              <Save className="w-4 h-4" />
              <span>Simpan Data</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
