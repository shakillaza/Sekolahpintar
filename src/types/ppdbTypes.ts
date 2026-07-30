import { SchoolLevel, UserRole } from '../types';

export type PpdbSubTab =
  | 'dashboard'
  | 'waves'
  | 'tracks'
  | 'form_builder'
  | 'applicants'
  | 'documents'
  | 'ai_ocr_validation'
  | 'verifications'
  | 'selection'
  | 'online_test'
  | 'interview'
  | 'announcements'
  | 're_enrollment'
  | 'payments'
  | 'statistics'
  | 'settings';

export type PpdbTrackType =
  | 'Prestasi'
  | 'Reguler'
  | 'Afirmasi'
  | 'Zonasi'
  | 'Pindahan'
  | 'Tahfidz'
  | 'Kemitraan';

export type PpdbApplicationStatus =
  | 'Draft'
  | 'Submitted'
  | 'Verified'
  | 'Revision_Required'
  | 'Interview_Scheduled'
  | 'Tested'
  | 'Passed'
  | 'Failed'
  | 'Backup'
  | 'Re_Enrolled'
  | 'Withdrawn';

export type PpdbPaymentStatus = 'Unpaid' | 'Pending_Verification' | 'Paid' | 'Failed' | 'Refunded';

export type PpdbFieldType =
  | 'text'
  | 'textarea'
  | 'number'
  | 'date'
  | 'email'
  | 'phone'
  | 'dropdown'
  | 'radio'
  | 'checkbox'
  | 'file'
  | 'photo'
  | 'signature'
  | 'address'
  | 'maps';

export interface PpdbWave {
  id: string;
  academicYear: string;
  waveName: string; // e.g. Gelombang 1
  schoolLevel: SchoolLevel;
  quota: number;
  registeredCount: number;
  startDate: string;
  endDate: string;
  registrationFee: number;
  isActive: boolean;
  tracksAllowed: PpdbTrackType[];
}

export interface PpdbTrack {
  id: string;
  code: string;
  name: PpdbTrackType;
  description: string;
  weightingPercentage: {
    administration: number;
    reportCard: number;
    test: number;
    interview: number;
    achievementBonus: number;
  };
  requiredDocuments: string[];
  maxQuota: number;
}

export interface PpdbFormField {
  id: string;
  section: 'Data Pribadi' | 'Data Orang Tua' | 'Asal Sekolah' | 'Dokumen & Lokasi' | 'Lainnya';
  label: string;
  fieldType: PpdbFieldType;
  isRequired: boolean;
  options?: string[]; // for dropdown, radio, checkbox
  placeholder?: string;
  order: number;
}

export interface PpdbApplicant {
  id: string;
  registrationNumber: string; // e.g. PPDB-2026-0012
  schoolId: string;
  schoolName: string;
  targetLevel: SchoolLevel;
  targetGrade: string; // e.g. Kelas 7, Kelas 10 IPA, TK B
  waveId: string;
  waveName: string;
  trackName: PpdbTrackType;
  
  // Personal Data
  nik: string;
  nisn: string;
  fullName: string;
  nickname: string;
  birthPlace: string;
  birthDate: string;
  gender: 'L' | 'P';
  religion: string;
  
  // Address & Geo Location
  address: string;
  province: string;
  city: string;
  district: string;
  subDistrict: string;
  postalCode: string;
  latitude?: number;
  longitude?: number;
  distanceKm?: number; // for Zonasi track
  
  // Origin School & Contacts
  originSchoolName: string;
  originSchoolNpsn?: string;
  phone: string;
  email: string;
  
  // Parents Data
  fatherName: string;
  fatherJob: string;
  fatherIncome: string;
  motherName: string;
  motherJob: string;
  motherIncome: string;
  guardianName?: string;
  guardianPhone?: string;
  
  // Photo & Documents
  photoUrl?: string;
  documents: {
    kkUrl?: string;
    birthCertUrl?: string;
    reportCardUrl?: string;
    kipUrl?: string;
    kksUrl?: string;
    diplomaUrl?: string;
    transferLetterUrl?: string;
  };
  qrCodeUrl?: string;
  
  // Workflow States & Scores
  status: PpdbApplicationStatus;
  completenessScore: number; // 0-100%
  verificationNotes?: string;
  verifiedBy?: string;
  verifiedAt?: string;
  
  // Selection Scores
  academicScore: number; // Report card average
  testScore: number;
  interviewScore: number;
  achievementScore: number;
  totalCompositeScore: number;
  
  // Payment Status
  registrationFeePaid: boolean;
  paymentStatus: PpdbPaymentStatus;
  paymentMethod?: 'Tunai' | 'Transfer' | 'Transfer Bank' | 'Virtual Account' | 'Virtual Account BCA' | 'Virtual Account Mandiri' | 'QRIS' | (string & {});
  paymentReceiptUrl?: string;
  
  // Re-enrollment Status
  isReEnrolled: boolean;
  reEnrollmentDate?: string;
  
  createdAt: string;
  updatedAt: string;
}

export interface PpdbDocumentItem {
  id: string;
  applicantId: string;
  applicantName: string;
  docType: 'KTP' | 'KK' | 'Akta Kelahiran' | 'Rapor' | 'Ijazah' | 'KIP' | 'KKS' | 'Surat Pindah';
  fileName: string;
  fileSizeMb: number;
  fileFormat: 'PDF' | 'JPG' | 'PNG';
  status: 'Belum Diverifikasi' | 'Lengkap' | 'Kurang Lengkap' | 'Perlu Revisi' | 'Ditolak' | 'Disetujui';
  ocrExtractedData?: Record<string, string>;
  uploadedAt: string;
  notes?: string;
}

export interface PpdbTestQuestion {
  id: string;
  questionText: string;
  category: 'Penalaran Umum' | 'Matematika' | 'Bahasa Indonesia' | 'Bahasa Inggris' | 'Pendidikan Agama';
  questionType: 'Pilihan Ganda' | 'Essay';
  options?: string[];
  correctAnswer?: string;
  scoreWeight: number;
}

export interface PpdbOnlineTestResult {
  id: string;
  applicantId: string;
  applicantName: string;
  testTitle: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  durationMinutesSpent: number;
  passedStatus: 'Lulus' | 'Tidak Lulus' | 'Perlu Evaluasi Essay';
  submittedAt: string;
}

export interface PpdbInterviewSchedule {
  id: string;
  applicantId: string;
  applicantName: string;
  examinerName: string;
  scheduledTime: string;
  locationOrLink: string;
  notes?: string;
  score?: number;
  status: 'Terjadwal' | 'Selesai' | 'Batal' | 'Tidak Hadir';
}

export interface PpdbPaymentRecord {
  id: string;
  applicantId: string;
  applicantName: string;
  registrationNumber: string;
  invoiceNo: string;
  amount: number;
  paymentMethod: 'Tunai' | 'Transfer Bank' | 'Virtual Account BCA' | 'Virtual Account Mandiri' | 'Virtual Account' | 'Transfer' | 'QRIS' | (string & {});
  status: PpdbPaymentStatus;
  paidAt?: string;
  proofUrl?: string;
}

export interface PpdbAiOcrResult {
  docType: string;
  confidenceScore: number;
  extractedFields: {
    nik?: string;
    nisn?: string;
    namaLengkap?: string;
    tempatLahir?: string;
    tanggalLahir?: string;
    namaAyah?: string;
    namaIbu?: string;
    alamat?: string;
    provinsi?: string;
    kabupatenKota?: string;
    kecamatan?: string;
    kelurahan?: string;
    rataRataRapor?: number;
  };
  validationSummary: string;
}
