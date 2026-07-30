import {
  StudentMaster,
  TeacherMaster,
  SchoolMaster,
  ClassroomMaster,
  SubjectMaster,
  FacilityMaster,
  MasterDataValidationError
} from '../../types';

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
};

export const validatePhone = (phone: string): boolean => {
  // Indonesian phone numbers or standard format min 10 digits
  const cleanPhone = phone.replace(/[^0-9+]/g, '');
  return cleanPhone.length >= 10;
};

// --- Student Validation ---
export interface ValidateStudentParams {
  student: Partial<StudentMaster>;
  allStudents: StudentMaster[];
  editingId?: string;
}

export const validateStudent = ({
  student,
  allStudents,
  editingId,
}: ValidateStudentParams): MasterDataValidationError[] => {
  const errors: MasterDataValidationError[] = [];

  // Required Fields
  if (!student.name?.trim()) {
    errors.push({ field: 'name', message: 'Nama lengkap wajib diisi.' });
  }
  if (!student.nis?.trim()) {
    errors.push({ field: 'nis', message: 'Nomor Induk Siswa (NIS) wajib diisi.' });
  }
  if (!student.nisn?.trim()) {
    errors.push({ field: 'nisn', message: 'Nomor Induk Siswa Nasional (NISN) wajib diisi.' });
  }
  if (!student.email?.trim()) {
    errors.push({ field: 'email', message: 'Email siswa wajib diisi.' });
  } else if (!validateEmail(student.email)) {
    errors.push({ field: 'email', message: 'Format email tidak valid (contoh: user@sekolah.sch.id).' });
  }
  if (!student.parentPhone?.trim()) {
    errors.push({ field: 'parentPhone', message: 'Nomor HP Orang Tua/Wali wajib diisi.' });
  } else if (!validatePhone(student.parentPhone)) {
    errors.push({ field: 'parentPhone', message: 'Nomor HP/WA tidak valid (minimal 10 digit angka).' });
  }
  if (!student.className?.trim()) {
    errors.push({ field: 'className', message: 'Kelas / Rombel wajib dipilih.' });
  }

  // Duplicate NIS Check
  if (student.nis) {
    const duplicateNis = allStudents.find(
      (s) => s.nis.trim() === student.nis?.trim() && s.id !== editingId
    );
    if (duplicateNis) {
      errors.push({
        field: 'nis',
        message: `Duplikasi NIS! Nomor Induk Siswa '${student.nis}' sudah terdaftar atas nama ${duplicateNis.name}.`,
      });
    }
  }

  // Duplicate NISN Check
  if (student.nisn) {
    const duplicateNisn = allStudents.find(
      (s) => s.nisn.trim() === student.nisn?.trim() && s.id !== editingId
    );
    if (duplicateNisn) {
      errors.push({
        field: 'nisn',
        message: `Duplikasi NISN! NISN '${student.nisn}' sudah terdaftar atas nama ${duplicateNisn.name}.`,
      });
    }
  }

  return errors;
};

// --- Teacher & Staff Validation ---
export interface ValidateTeacherParams {
  teacher: Partial<TeacherMaster>;
  allTeachers: TeacherMaster[];
  editingId?: string;
}

export const validateTeacher = ({
  teacher,
  allTeachers,
  editingId,
}: ValidateTeacherParams): MasterDataValidationError[] => {
  const errors: MasterDataValidationError[] = [];

  if (!teacher.name?.trim()) {
    errors.push({ field: 'name', message: 'Nama lengkap guru/staf wajib diisi.' });
  }
  if (!teacher.nip?.trim()) {
    errors.push({ field: 'nip', message: 'NIP / NUPTK wajib diisi.' });
  }
  if (!teacher.email?.trim()) {
    errors.push({ field: 'email', message: 'Email resmi wajib diisi.' });
  } else if (!validateEmail(teacher.email)) {
    errors.push({ field: 'email', message: 'Format email tidak valid.' });
  }
  if (!teacher.phone?.trim()) {
    errors.push({ field: 'phone', message: 'Nomor Telepon / WhatsApp wajib diisi.' });
  } else if (!validatePhone(teacher.phone)) {
    errors.push({ field: 'phone', message: 'Nomor HP/WA tidak valid (minimal 10 digit).' });
  }
  if (!teacher.roleTitle?.trim()) {
    errors.push({ field: 'roleTitle', message: 'Jabatan / Peran wajib diisi.' });
  }

  // Duplicate NIP Check
  if (teacher.nip) {
    const duplicateNip = allTeachers.find(
      (t) => t.nip.trim() === teacher.nip?.trim() && t.id !== editingId
    );
    if (duplicateNip) {
      errors.push({
        field: 'nip',
        message: `Duplikasi NIP/NUPTK! NIP '${teacher.nip}' sudah terdaftar atas nama ${duplicateNip.name}.`,
      });
    }
  }

  return errors;
};

// --- School Unit Validation ---
export interface ValidateSchoolParams {
  school: Partial<SchoolMaster>;
  allSchools: SchoolMaster[];
  editingId?: string;
}

export const validateSchoolMaster = ({
  school,
  allSchools,
  editingId,
}: ValidateSchoolParams): MasterDataValidationError[] => {
  const errors: MasterDataValidationError[] = [];

  if (!school.name?.trim()) {
    errors.push({ field: 'name', message: 'Nama resmi sekolah wajib diisi.' });
  }
  if (!school.npsn?.trim()) {
    errors.push({ field: 'npsn', message: 'NPSN (Nomor Pokok Sekolah Nasional) wajib diisi.' });
  }
  if (!school.email?.trim()) {
    errors.push({ field: 'email', message: 'Email sekolah wajib diisi.' });
  } else if (!validateEmail(school.email)) {
    errors.push({ field: 'email', message: 'Format email sekolah tidak valid.' });
  }
  if (!school.phone?.trim()) {
    errors.push({ field: 'phone', message: 'Nomor Telepon sekolah wajib diisi.' });
  } else if (!validatePhone(school.phone)) {
    errors.push({ field: 'phone', message: 'Nomor HP/Telepon tidak valid.' });
  }

  // Duplicate NPSN Check
  if (school.npsn) {
    const duplicateNpsn = allSchools.find(
      (s) => s.npsn.trim() === school.npsn?.trim() && s.id !== editingId
    );
    if (duplicateNpsn) {
      errors.push({
        field: 'npsn',
        message: `Duplikasi NPSN! Sekolah dengan NPSN '${school.npsn}' sudah terdaftar (${duplicateNpsn.name}).`,
      });
    }
  }

  return errors;
};

// --- Classroom Validation ---
export interface ValidateClassroomParams {
  classroom: Partial<ClassroomMaster>;
  allClassrooms: ClassroomMaster[];
  editingId?: string;
}

export const validateClassroom = ({
  classroom,
  allClassrooms,
  editingId,
}: ValidateClassroomParams): MasterDataValidationError[] => {
  const errors: MasterDataValidationError[] = [];

  if (!classroom.code?.trim()) {
    errors.push({ field: 'code', message: 'Kode Kelas wajib diisi.' });
  }
  if (!classroom.name?.trim()) {
    errors.push({ field: 'name', message: 'Nama Kelas / Rombel wajib diisi.' });
  }
  if (!classroom.gradeLevel?.trim()) {
    errors.push({ field: 'gradeLevel', message: 'Tingkat Kelas wajib diisi.' });
  }

  // Duplicate Code Check
  if (classroom.code) {
    const duplicateCode = allClassrooms.find(
      (c) => c.code.trim().toUpperCase() === classroom.code?.trim().toUpperCase() && c.id !== editingId
    );
    if (duplicateCode) {
      errors.push({
        field: 'code',
        message: `Duplikasi Kode Kelas! Kode '${classroom.code}' sudah digunakan oleh ${duplicateCode.name}.`,
      });
    }
  }

  return errors;
};

// --- Subject Validation ---
export interface ValidateSubjectParams {
  subject: Partial<SubjectMaster>;
  allSubjects: SubjectMaster[];
  editingId?: string;
}

export const validateSubject = ({
  subject,
  allSubjects,
  editingId,
}: ValidateSubjectParams): MasterDataValidationError[] => {
  const errors: MasterDataValidationError[] = [];

  if (!subject.code?.trim()) {
    errors.push({ field: 'code', message: 'Kode Mata Pelajaran wajib diisi.' });
  }
  if (!subject.name?.trim()) {
    errors.push({ field: 'name', message: 'Nama Mata Pelajaran wajib diisi.' });
  }

  if (subject.code) {
    const duplicateCode = allSubjects.find(
      (s) => s.code.trim().toUpperCase() === subject.code?.trim().toUpperCase() && s.id !== editingId
    );
    if (duplicateCode) {
      errors.push({
        field: 'code',
        message: `Duplikasi Kode Mapel! Kode '${subject.code}' sudah digunakan oleh ${duplicateCode.name}.`,
      });
    }
  }

  return errors;
};

// --- Facility Validation ---
export interface ValidateFacilityParams {
  facility: Partial<FacilityMaster>;
  allFacilities: FacilityMaster[];
  editingId?: string;
}

export const validateFacility = ({
  facility,
  allFacilities,
  editingId,
}: ValidateFacilityParams): MasterDataValidationError[] => {
  const errors: MasterDataValidationError[] = [];

  if (!facility.code?.trim()) {
    errors.push({ field: 'code', message: 'Kode Ruangan wajib diisi.' });
  }
  if (!facility.name?.trim()) {
    errors.push({ field: 'name', message: 'Nama Ruangan wajib diisi.' });
  }
  if (!facility.buildingName?.trim()) {
    errors.push({ field: 'buildingName', message: 'Nama Gedung / Lokasi wajib diisi.' });
  }

  if (facility.code) {
    const duplicateCode = allFacilities.find(
      (f) => f.code.trim().toUpperCase() === facility.code?.trim().toUpperCase() && f.id !== editingId
    );
    if (duplicateCode) {
      errors.push({
        field: 'code',
        message: `Duplikasi Kode Ruangan! Kode '${facility.code}' sudah digunakan oleh ${duplicateCode.name}.`,
      });
    }
  }

  return errors;
};
