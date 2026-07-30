export type TeacherSubTab =
  | 'dashboard'
  | 'data_guru'
  | 'data_pegawai'
  | 'biodata'
  | 'education'
  | 'certifications'
  | 'assignments'
  | 'schedule'
  | 'attendance'
  | 'performance'
  | 'prof_dev'
  | 'achievements'
  | 'violations'
  | 'documents'
  | 'payroll'
  | 'ai_notes'
  | 'timeline'
  | 'settings';

export interface TeacherMasterItem {
  id: string;
  nip: string;
  nuptk: string;
  fullName: string;
  titlePrefix?: string;
  titleSuffix?: string;
  gender: 'Laki-laki' | 'Perempuan';
  birthPlace: string;
  birthDate: string;
  religion: string;
  employmentStatus: 'PNS' | 'PPPK' | 'GTY' | 'GTT' | 'Honorer';
  asnStatus: 'PNS' | 'PPPK' | 'Non-ASN';
  lastEducation: 'D3' | 'S1' | 'S2' | 'S3';
  major: string;
  subject: string;
  position: string;
  rankClass: string; // e.g., IV/a - Pembina
  joinDate: string;
  phone: string;
  email: string;
  address: string;
  photoUrl: string;
  qrCodeUrl: string;
  barcodeUrl: string;
  rfidCardId?: string;
  isActive: boolean;
  schoolName: string;
  teachingHoursPerWeek: number;
}

export interface EmployeeMasterItem {
  id: string;
  nip: string;
  fullName: string;
  position: 'Kepala TU' | 'Staff TU' | 'Bendahara' | 'Operator' | 'Pustakawan' | 'Laboran' | 'Keamanan' | 'Petugas UKS' | 'Teknisi IT';
  department: string;
  unit: string;
  gender: 'Laki-laki' | 'Perempuan';
  birthDate: string;
  education: string;
  phone: string;
  email: string;
  address: string;
  employmentStatus: 'Tetap' | 'Kontrak' | 'Honorer';
  joinDate: string;
  photoUrl: string;
  qrCodeUrl: string;
  isActive: boolean;
  schoolName: string;
}

export interface TeacherBiodataItem {
  teacherId: string;
  maritalStatus: 'Menikah' | 'Belum Menikah' | 'Duda/Janda';
  spouseName?: string;
  spouseOccupation?: string;
  childrenCount: number;
  emergencyContactName: string;
  emergencyContactPhone: string;
  emergencyContactRelation: string;
  npwp: string;
  bankName: string;
  accountNumber: string;
  accountHolder: string;
  bpjsKesehatanNo: string;
  bpjsKetenagakerjaanNo: string;
}

export interface TeacherEducationHistory {
  id: string;
  teacherId: string;
  level: 'SD' | 'SMP' | 'SMA' | 'D3' | 'S1' | 'S2' | 'S3' | 'Pelatihan' | 'Workshop' | 'Seminar';
  institutionName: string;
  major?: string;
  graduationYear: number;
  certificateNo?: string;
  certificateUrl?: string;
}

export interface TeacherCertification {
  id: string;
  teacherId: string;
  teacherName: string;
  certNumber: string;
  certType: 'Sertifikasi Pendidik (Sertifikat Guru)' | 'Sertifikat Kompetensi Keahlian' | 'Assessor Lisensi' | 'PPG';
  issuingInstitution: string;
  issueDate: string;
  expiryDate?: string;
  isActive: boolean;
  certUrl?: string;
}

export interface TeacherAssignment {
  id: string;
  teacherId: string;
  teacherName: string;
  roles: string[]; // e.g. ["Guru Mata Pelajaran", "Wali Kelas 11 MIPA 1", "Guru BK"]
  schoolYear: string;
  semester: 'Ganjil' | 'Genap';
  decreeNumber: string; // SK Penugasan
  startDate: string;
}

export interface TeacherSchedule {
  id: string;
  teacherId: string;
  teacherName: string;
  className: string;
  subject: string;
  day: 'Senin' | 'Selasa' | 'Rabu' | 'Kamis' | 'Jumat' | 'Sabtu';
  timeSlot: string;
  room: string;
  semester: string;
  schoolYear: string;
  teachingHours: number;
}

export interface TeacherAttendanceRecord {
  id: string;
  teacherId: string;
  teacherName: string;
  date: string;
  checkIn: string;
  checkOut: string;
  status: 'Hadir' | 'Izin' | 'Sakit' | 'Cuti' | 'Alpa' | 'Terlambat' | 'Lembur';
  notes?: string;
}

export interface TeacherPerformanceRecord {
  id: string;
  teacherId: string;
  teacherName: string;
  period: string; // e.g., "Semester Ganjil 2025/2026"
  skpScore: number; // e.g. 92.5
  principalRating: 'Sangat Baik' | 'Baik' | 'Cukupan' | 'Perlu Perbaikan';
  foundationRating: 'Sangat Baik' | 'Baik' | 'Cukupan';
  disciplineScore: number;
  productivityScore: number;
  attendanceScore: number;
  targetAchievement: number; // percentage
  finalScore: number;
  evaluatorNotes: string;
}

export interface TeacherProfessionalDev {
  id: string;
  teacherId: string;
  teacherName: string;
  type: 'Pelatihan' | 'Workshop' | 'Seminar' | 'Publikasi' | 'Penelitian' | 'Karya Ilmiah' | 'Pengabdian';
  title: string;
  organizer: string;
  eventDate: string;
  durationHours: number;
  certUrl?: string;
}

export interface TeacherAchievementRecord {
  id: string;
  teacherId: string;
  teacherName: string;
  level: 'Sekolah' | 'Kabupaten' | 'Provinsi' | 'Nasional' | 'Internasional';
  title: string;
  organizer: string;
  rank: string;
  year: number;
  certUrl?: string;
}

export interface TeacherViolationRecord {
  id: string;
  teacherId: string;
  teacherName: string;
  category: 'Ringan' | 'Sedang' | 'Berat';
  date: string;
  description: string;
  actionTaken: string;
  status: 'Dalam Pembinaan' | 'Selesai' | 'Diberikan SP';
}

export interface TeacherDocumentRecord {
  id: string;
  teacherId: string;
  docType: 'KTP' | 'KK' | 'NPWP' | 'Ijazah S1/S2' | 'Transkrip Nilai' | 'SK Pengangkatan' | 'SK Jabatan' | 'Kontrak Kerja' | 'BPJS' | 'Rekening Bank' | 'Sertifikat Pendidik';
  fileName: string;
  fileSizeMB: number;
  uploadDate: string;
  version: number;
  status: 'Tervalidasi' | 'Menunggu Verifikasi';
  fileUrl: string;
}

export interface TeacherPayrollProfile {
  teacherId: string;
  nip: string;
  teacherName: string;
  bankName: string;
  accountNumber: string;
  paymentMethod: 'Transfer Bank' | 'Tunai';
  baseSalary: number;
  allowancePosition: number;
  allowanceCertification: number;
  allowanceTransport: number;
  deductionPph21: number;
  deductionBpjs: number;
  netSalary: number;
  payrollStatus: 'Aktif Terbayar' | 'Pending Verification';
}

export interface TeacherAiNote {
  id: string;
  teacherId: string;
  teacherName: string;
  profileSummary: string;
  workloadAnalysis: string; // e.g. "Overloaded: 32 jam/minggu (Batas Ideal 24 jam)"
  overloadStatus: 'Normal' | 'Overloaded' | 'Underloaded';
  scheduleDistributionRec: string;
  productivityRating: 'Sangat Produktif' | 'Stabil' | 'Menurun';
  trainingRecommendations: string[];
  performanceDeclineAlert: boolean;
  autoEvaluationSummary: string;
  lastUpdated: string;
}

export interface TeacherTimelineEvent {
  id: string;
  teacherId: string;
  category: 'Login' | 'Absensi' | 'Jadwal' | 'Mengajar' | 'Pelatihan' | 'Prestasi' | 'Pelanggaran' | 'Perubahan Jabatan' | 'Payroll';
  title: string;
  description: string;
  timestamp: string;
}
