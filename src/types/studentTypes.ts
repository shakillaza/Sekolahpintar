import { SchoolLevel, UserRole } from '../types';

export type StudentSubTab =
  | 'dashboard'
  | 'data_siswa'
  | 'biodata'
  | 'parents'
  | 'education'
  | 'mutations'
  | 'alumni'
  | 'achievements'
  | 'violations'
  | 'health'
  | 'documents'
  | 'scholarships'
  | 'organizations'
  | 'extracurriculars'
  | 'counseling'
  | 'ai_notes'
  | 'timeline'
  | 'settings';

export type StudentStatus = 'Aktif' | 'Baru' | 'Pindahan' | 'Lulus' | 'Mutasi Keluar' | 'Drop Out' | 'Cuti';

export interface StudentMasterItem {
  id: string; // Internal ID
  schoolId: string;
  schoolName: string;
  schoolLevel: SchoolLevel;
  
  // Data Utama
  nis: string;
  nisn: string;
  fullName: string;
  nickname: string;
  gender: 'L' | 'P';
  birthPlace: string;
  birthDate: string;
  religion: string;
  bloodType: 'A' | 'B' | 'AB' | 'O';
  citizenship: string;
  nativeLanguage: string;
  status: StudentStatus;
  studentType: 'Siswa Baru' | 'Siswa Pindahan' | 'Siswa Lama';
  targetMajor?: string; // IPA, IPS, TKJ, Akuntansi, Kitab, etc.
  className: string;
  rollNumber: number;
  entryDate: string;
  originSchool: string;
  photoUrl: string;
  qrCodeUrl: string;
  barcodeUrl: string;
  rfidTag?: string;

  // Biodata Lengkap
  domicileAddress: string;
  ktpAddress: string;
  province: string;
  regencyCity: string;
  district: string;
  village: string;
  postalCode: string;
  phoneNumber: string;
  email: string;
  childOrder: number;
  siblingsCount: number;
  heightCm: number;
  weightKg: number;
  hobbies: string[];
  aspirations: string;
  specialNeeds: string;

  // Orang Tua & Wali
  father: ParentGuardianInfo;
  mother: ParentGuardianInfo;
  guardian?: ParentGuardianInfo;
  siblingsInSchool?: string[]; // IDs of sibling students

  // Summary Metrics
  attendancePercentage: number;
  gpaAverage: number;
  totalViolationPoints: number;
  totalAchievementPoints: number;
  healthScore: number; // 0 - 100
  aiDropoutRiskScore: number; // 0 - 100%
  aiPerformanceStatus: 'Stabil Sangat Baik' | 'Perlu Perhatian' | 'Menurun' | 'Kritis';
}

export interface ParentGuardianInfo {
  nik: string;
  name: string;
  education: string;
  occupation: string;
  monthlyIncome: string; // e.g. Rp 5.000.000 - Rp 10.000.000
  phone: string;
  email: string;
  address: string;
  relationship: 'Ayah Kandung' | 'Ibu Kandung' | 'Wali' | 'Paman/Tante' | 'Kakek/Nenek';
}

export interface StudentEducationHistory {
  id: string;
  studentId: string;
  schoolName: string;
  npsn?: string;
  level: string;
  entryDate: string;
  exitDate: string;
  exitReason: string;
  classHistory: {
    academicYear: string;
    gradeLevel: string;
    className: string;
    homeroomTeacher: string;
    gpa: number;
  }[];
}

export interface StudentMutationRecord {
  id: string;
  studentId: string;
  studentName: string;
  mutationType: 'Masuk' | 'Keluar' | 'Naik Kelas' | 'Pindah Sekolah' | 'Lulus' | 'DO';
  date: string;
  fromSchoolOrClass: string;
  toSchoolOrClass: string;
  reason: string;
  skNumber: string;
  status: 'Diproses' | 'Disetujui' | 'Ditolak';
  notes?: string;
}

export interface StudentAlumniRecord {
  id: string;
  studentId: string;
  studentName: string;
  graduationYear: number;
  ijazahNumber: string;
  sklNumber: string;
  higherEducation?: string;
  currentOccupation?: string;
  alumniStatus: 'Kuliah' | 'Bekerja' | 'Wirausaha' | 'Mencari Kerja' | 'Lainnya';
  contactNumber: string;
}

export interface StudentAchievementRecord {
  id: string;
  studentId: string;
  studentName: string;
  category: 'Akademik' | 'Non Akademik';
  title: string;
  level: 'Sekolah' | 'Kabupaten' | 'Provinsi' | 'Nasional' | 'Internasional';
  rank: string; // e.g. Juara 1, Juara Harapan 1, Medali Emas
  eventDate: string;
  organizer: string;
  points: number;
  certificateUrl?: string;
}

export interface StudentViolationRecord {
  id: string;
  studentId: string;
  studentName: string;
  category: 'Ringan' | 'Sedang' | 'Berat';
  violationName: string;
  points: number;
  date: string;
  reportingTeacher: string;
  actionTaken: string; // Teguran, Surat Panggilan Orang Tua, Skorsing 3 Hari
  status: 'Open' | 'Diselesaikan' | 'Dalam Pembinaan';
  attachmentUrl?: string;
}

export interface StudentHealthRecord {
  id: string;
  studentId: string;
  bloodType: 'A' | 'B' | 'AB' | 'O';
  allergies: string[];
  chronicIllnesses: string[];
  vaccines: { name: string; date: string }[];
  checkups: {
    date: string;
    height: number;
    weight: number;
    vision: string;
    dental: string;
    notes: string;
  }[];
  emergencyDoctor: string;
  emergencyHospitalPhone: string;
}

export interface StudentDocumentRecord {
  id: string;
  studentId: string;
  docType:
    | 'Kartu Keluarga (KK)'
    | 'Akta Kelahiran'
    | 'KTP Orang Tua'
    | 'KIP / PIP'
    | 'KKS'
    | 'Rapor Terakhir'
    | 'Ijazah / SKL'
    | 'Pas Foto 3x4'
    | 'Surat Pindah'
    | 'Surat Keterangan Sehat';
  fileName: string;
  fileSizeMB: number;
  uploadDate: string;
  version: number;
  status: 'Tervalidasi' | 'Menunggu Verifikasi' | 'Perlu Revisi';
  fileUrl: string;
}

export interface StudentScholarshipRecord {
  id: string;
  studentId: string;
  studentName: string;
  scholarshipType: string; // e.g. KIP Kemdikbud, Beasiswa Prestasi Yayasan, Baznas
  provider: string;
  period: string; // e.g. T.A. 2025/2026
  amountPerSemester: number;
  status: 'Aktif' | 'Selesai' | 'Dibatalkan';
}

export interface StudentOrganizationRecord {
  id: string;
  studentId: string;
  orgName: 'OSIS' | 'Pramuka' | 'PMR' | 'Paskibra' | 'Rohis' | 'Klub Coding & Robotik' | 'Lainnya';
  position: 'Ketua' | 'Wakil' | 'Sekretaris' | 'Bendahara' | 'Seksi Bidang' | 'Anggota';
  period: string;
  achievementsLed: string;
}

export interface StudentExtracurricularRecord {
  id: string;
  studentId: string;
  extraName: string; // e.g. Futsal, Basket, Seni Tari, Tae Kwon Do, Bahasa Jepang
  coachName: string;
  scheduleDayTime: string;
  grade: 'A' | 'B' | 'C';
  achievementsNote?: string;
}

export interface StudentCounselingRecord {
  id: string;
  studentId: string;
  studentName: string;
  issueSummary: string;
  counselorName: string;
  date: string;
  sessionResult: string;
  recommendations: string;
  followUpStatus: 'Selesai' | 'Perlu Sesi Lanjutan' | 'Eskalasi ke Orang Tua';
}

export interface StudentAiNote {
  id: string;
  studentId: string;
  studentName: string;
  summary: string;
  academicProgressAnalysis: string;
  performanceDeclineRisk: 'Rendah' | 'Sedang' | 'Tinggi';
  dropoutRiskPercentage: number;
  attendancePatternInsight: string;
  behavioralCorrelation: string;
  recommendedActions: string[];
  lastUpdated: string;
}

export interface StudentTimelineEvent {
  id: string;
  studentId: string;
  category:
    | 'PPDB'
    | 'Absensi'
    | 'Nilai'
    | 'Prestasi'
    | 'Pelanggaran'
    | 'Konseling'
    | 'Pembayaran'
    | 'Perpustakaan'
    | 'Ekstrakurikuler'
    | 'Dokumen'
    | 'Login Portal';
  title: string;
  description: string;
  timestamp: string;
  iconType: string;
}
