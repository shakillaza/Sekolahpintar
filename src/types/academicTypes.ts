export type AcademicSubTab =
  | 'dashboard'
  | 'academic_year'
  | 'semester'
  | 'curriculum'
  | 'academic_calendar'
  | 'effective_days'
  | 'subjects'
  | 'subject_groups'
  | 'competencies'
  | 'classes'
  | 'class_groups'
  | 'class_distribution'
  | 'homeroom'
  | 'teaching_assignment'
  | 'lesson_schedules'
  | 'exam_schedules'
  | 'lesson_periods'
  | 'rooms'
  | 'teacher_calendar'
  | 'student_calendar'
  | 'sync'
  | 'settings';

export interface AcademicYearItem {
  id: string;
  year: string; // e.g. "2025/2026"
  status: 'aktif' | 'non_aktif' | 'perencanaan';
  startDate: string;
  endDate: string;
  description?: string;
  totalStudents: number;
  totalClasses: number;
}

export interface SemesterItem {
  id: string;
  academicYear: string;
  name: 'Ganjil' | 'Genap';
  code: string;
  startDate: string;
  endDate: string;
  status: 'aktif' | 'selesai' | 'mendatang';
  effectiveWeeks: number;
  effectiveDays: number;
}

export interface CurriculumItem {
  id: string;
  code: string;
  name: string;
  type: 'Kurikulum Merdeka' | 'Kurikulum 2013' | 'Kurikulum Internasional' | 'Kurikulum Pesantren' | 'Kurikulum Yayasan' | 'Custom';
  schoolLevel: string;
  effectiveYear: string;
  status: 'aktif' | 'diarsipkan';
  description: string;
  totalSubjects: number;
}

export interface SubjectGroupItem {
  id: string;
  code: string;
  name: string; // e.g. "Kelompok A (Wajib)", "Kelompok B (Muatan Lokal)", "Keagamaan"
  category: 'Wajib' | 'Pilihan' | 'Muatan Lokal' | 'Keagamaan' | 'Keterampilan' | 'Custom';
  description: string;
  subjectCount: number;
}

export interface SubjectItem {
  id: string;
  code: string;
  name: string;
  category: string;
  groupName: string;
  schoolLevel: string;
  major?: string;
  weeklyHours: number; // Jumlah JP
  passingGrade: number; // KKM
  status: 'aktif' | 'non_aktif';
  headTeacherName: string;
}

export interface CompetencyItem {
  id: string;
  subjectCode: string;
  subjectName: string;
  type: 'CP' | 'TP' | 'ATP' | 'KD' | 'Indikator';
  code: string;
  gradeLevel: string;
  title: string;
  description: string;
  syllabusFileUrl?: string;
}

export interface ClassItem {
  id: string;
  code: string;
  name: string; // e.g. "X IPA 1", "7A"
  gradeLevel: string; // "X", "XI", "XII", "7", "8", "9"
  major?: string;
  capacity: number;
  enrolledStudents: number;
  homeroomTeacherId?: string;
  homeroomTeacherName?: string;
  roomId: string;
  roomName: string;
  status: 'aktif' | 'non_aktif';
}

export interface ClassGroupItem {
  id: string;
  rombelNumber: string;
  classId: string;
  className: string;
  homeroomTeacherName: string;
  studentCount: number;
  schoolYear: string;
  semester: string;
  status: 'aktif' | 'selesai';
  studentIds: string[];
}

export interface HomeroomAssignment {
  id: string;
  teacherId: string;
  teacherName: string;
  className: string;
  schoolYear: string;
  semester: string;
  studentCount: number;
  decreeNumber: string;
  assignedDate: string;
}

export interface TeachingAssignmentItem {
  id: string;
  teacherId: string;
  teacherName: string;
  subjectName: string;
  className: string;
  schoolYear: string;
  semester: string;
  weeklyHours: number;
  maxWeeklyHoursLimit: number;
  isOverloaded: boolean;
}

export interface LessonPeriodItem {
  id: string;
  periodNumber: number; // 1, 2, 3...
  startTime: string; // "07:00"
  endTime: string; // "07:45"
  durationMinutes: number;
  isBreakTime: boolean;
  notes?: string;
}

export interface LessonScheduleItem {
  id: string;
  day: 'Senin' | 'Selasa' | 'Rabu' | 'Kamis' | 'Jumat' | 'Sabtu';
  periodNumber: number; // 1..n
  timeSlot: string; // "07:00 - 07:45"
  classId: string;
  className: string;
  subjectId: string;
  subjectName: string;
  teacherId: string;
  teacherName: string;
  roomId: string;
  roomName: string;
  semester: string;
  schoolYear: string;
  hasConflict?: boolean;
  conflictReason?: string;
}

export interface ExamScheduleItem {
  id: string;
  examType: 'PTS' | 'PAS' | 'PAT' | 'UTS' | 'UAS' | 'CBT' | 'Manual';
  title: string;
  subjectName: string;
  className: string;
  date: string;
  timeSlot: string;
  roomName: string;
  proctorName: string; // Pengawas
  status: 'terjadwal' | 'berlangsung' | 'selesai';
}

export interface RoomItem {
  id: string;
  code: string;
  name: string;
  building: string;
  capacity: number;
  type: 'Kelas' | 'Laboratorium Komputer' | 'Laboratorium IPA' | 'Perpustakaan' | 'Aula' | 'Bengkel';
  facilities: string[];
  status: 'tersedia' | 'digunakan' | 'pemeliharaan';
}

export interface CalendarEventItem {
  id: string;
  title: string;
  category: 'Agenda' | 'Hari Libur' | 'PTS' | 'PAS' | 'Kelulusan' | 'PPDB' | 'Ekstrakurikuler' | 'Rapat' | 'Kegiatan Sekolah' | 'Mengajar' | 'Pelatihan' | 'Ujian' | 'Tugas';
  startDate: string;
  endDate: string;
  targetAudience: 'Semua' | 'Guru' | 'Siswa' | 'Orang Tua' | 'Staff';
  description: string;
  location?: string;
}

export interface EffectiveDaysMonthly {
  month: string;
  year: number;
  effectiveDays: number;
  holidayDays: number;
  examDays: number;
  effectiveWeeks: number;
}

export interface AcademicAiAnalysis {
  overloadedTeachersCount: number;
  totalScheduleConflicts: number;
  roomUtilizationRate: number; // percentage
  workloadDistributionScore: number; // 0..100
  aiRecommendations: string[];
  autoScheduleLog: string;
}
