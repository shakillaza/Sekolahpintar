import {
  AcademicYearItem,
  SemesterItem,
  CurriculumItem,
  SubjectGroupItem,
  SubjectItem,
  CompetencyItem,
  ClassItem,
  ClassGroupItem,
  HomeroomAssignment,
  TeachingAssignmentItem,
  LessonPeriodItem,
  LessonScheduleItem,
  ExamScheduleItem,
  RoomItem,
  CalendarEventItem,
  EffectiveDaysMonthly,
  AcademicAiAnalysis,
} from '../types/academicTypes';

export const initialAcademicYears: AcademicYearItem[] = [
  {
    id: 'ay-2025-2026',
    year: '2025/2026',
    status: 'aktif',
    startDate: '2025-07-14',
    endDate: '2026-06-25',
    description: 'Tahun Ajaran berjalan Kurikulum Merdeka Terintegrasi AI',
    totalStudents: 850,
    totalClasses: 28,
  },
  {
    id: 'ay-2024-2025',
    year: '2024/2025',
    status: 'non_aktif',
    startDate: '2024-07-15',
    endDate: '2025-06-20',
    description: 'Tahun Ajaran Selesai',
    totalStudents: 810,
    totalClasses: 26,
  },
  {
    id: 'ay-2026-2027',
    year: '2026/2027',
    status: 'perencanaan',
    startDate: '2026-07-13',
    endDate: '2027-06-24',
    description: 'Perencanaan Penerimaan & Rombel Baru',
    totalStudents: 0,
    totalClasses: 30,
  },
];

export const initialSemesters: SemesterItem[] = [
  {
    id: 'sem-2025-ganjil',
    academicYear: '2025/2026',
    name: 'Ganjil',
    code: '20251',
    startDate: '2025-07-14',
    endDate: '2025-12-19',
    status: 'selesai',
    effectiveWeeks: 19,
    effectiveDays: 95,
  },
  {
    id: 'sem-2025-genap',
    academicYear: '2025/2026',
    name: 'Genap',
    code: '20252',
    startDate: '2026-01-05',
    endDate: '2026-06-25',
    status: 'aktif',
    effectiveWeeks: 21,
    effectiveDays: 102,
  },
];

export const initialCurriculums: CurriculumItem[] = [
  {
    id: 'curr-merdeka',
    code: 'KUR-MERDEKA-2024',
    name: 'Kurikulum Merdeka Mandiri Berbagi',
    type: 'Kurikulum Merdeka',
    schoolLevel: 'SMA / SMK / SMP',
    effectiveYear: '2024',
    status: 'aktif',
    description: 'Fokus pada pengembangan karakter Pancasila, Capaian Pembelajaran (CP) fleksibel & Projek P5.',
    totalSubjects: 18,
  },
  {
    id: 'curr-k13',
    code: 'KUR-K13-REVISI',
    name: 'Kurikulum 2013 Revisi Nasional',
    type: 'Kurikulum 2013',
    schoolLevel: 'SMA / SMP / SD',
    effectiveYear: '2018',
    status: 'aktif',
    description: 'Berbasis Kompetensi Dasar (KD) dan Penilaian Sikap, Pengetahuan, serta Keterampilan.',
    totalSubjects: 16,
  },
  {
    id: 'curr-cambridge',
    code: 'KUR-INT-CAMBRIDGE',
    name: 'Cambridge International Curriculum iGCSE',
    type: 'Kurikulum Internasional',
    schoolLevel: 'Internasional / Bilingual',
    effectiveYear: '2022',
    status: 'aktif',
    description: 'Program internasional dengan pengantar Bahasa Inggris untuk Matematika, Sains, dan English Literature.',
    totalSubjects: 12,
  },
  {
    id: 'curr-pesantren',
    code: 'KUR-PESANTREN-MODERN',
    name: 'Kurikulum Pesantren Modern & Dirasah Islamiyah',
    type: 'Kurikulum Pesantren',
    schoolLevel: 'Pesantren / MA / MTs',
    effectiveYear: '2021',
    status: 'aktif',
    description: 'Integrasi Nahwu Shorof, Aqidah Akhlaq, Tahfidz Al-Qur\'an, dan Bahasa Arab.',
    totalSubjects: 14,
  },
];

export const initialSubjectGroups: SubjectGroupItem[] = [
  { id: 'sg-wajib', code: 'KMP-A', name: 'Kelompok A (Mata Pelajaran Umum Wajib)', category: 'Wajib', description: 'Mapel nasional wajib seluruh jenjang', subjectCount: 6 },
  { id: 'sg-pilihan', code: 'KMP-B', name: 'Kelompok B (Mata Pelajaran Pilihan / Peminatan)', category: 'Pilihan', description: 'Mapel pendukung peminatan IPA/IPS/Kewirausahaan', subjectCount: 5 },
  { id: 'sg-mulok', code: 'KMP-MULOK', name: 'Muatan Lokal Daerah', category: 'Muatan Lokal', description: 'Bahasa Daerah, Budaya Lokal & Lingkungan Hidup', subjectCount: 3 },
  { id: 'sg-agama', code: 'KMP-AGAMA', name: 'Pendidikan Agama & Budi Pekerti', category: 'Keagamaan', description: 'Pendidikan Agama Islam, Tahfidz & Akhlak', subjectCount: 4 },
  { id: 'sg-terampil', code: 'KMP-VOKASI', name: 'Keterampilan / Prakarya / Vokasi', category: 'Keterampilan', description: 'Informatika, Desain Grafis, dan Robotik', subjectCount: 3 },
];

export const initialSubjects: SubjectItem[] = [
  { id: 'subj-mat', code: 'MAT-10', name: 'Matematika Tingkat Lanjut', category: 'Wajib', groupName: 'Kelompok A (Mata Pelajaran Umum Wajib)', schoolLevel: 'SMA', major: 'MIPA', weeklyHours: 4, passingGrade: 75, status: 'aktif', headTeacherName: 'Dr. Ahmad Fauzi, M.Pd' },
  { id: 'subj-fis', code: 'FIS-10', name: 'Fisika Terapan & Lab', category: 'Pilihan', groupName: 'Kelompok B (Mata Pelajaran Pilihan / Peminatan)', schoolLevel: 'SMA', major: 'MIPA', weeklyHours: 3, passingGrade: 75, status: 'aktif', headTeacherName: 'Dra. Hj. Siti Nurjanah, M.Si' },
  { id: 'subj-inf', code: 'INF-10', name: 'Informatika & Pemrograman Python', category: 'Keterampilan', groupName: 'Keterampilan / Prakarya / Vokasi', schoolLevel: 'SMA', major: 'Umum', weeklyHours: 3, passingGrade: 78, status: 'aktif', headTeacherName: 'Rahmat Hidayat, S.Kom., M.T' },
  { id: 'subj-bin', code: 'BIN-10', name: 'Bahasa Indonesia & Literasi', category: 'Wajib', groupName: 'Kelompok A (Mata Pelajaran Umum Wajib)', schoolLevel: 'SMA', major: 'Umum', weeklyHours: 4, passingGrade: 75, status: 'aktif', headTeacherName: 'Budi Santoso, S.Pd' },
  { id: 'subj-bing', code: 'BIG-10', name: 'Bahasa Inggris Komunikasi Global', category: 'Wajib', groupName: 'Kelompok A (Mata Pelajaran Umum Wajib)', schoolLevel: 'SMA', major: 'Umum', weeklyHours: 3, passingGrade: 75, status: 'aktif', headTeacherName: 'Sarah Wijaya, M.A' },
  { id: 'subj-pai', code: 'PAI-10', name: 'Pendidikan Agama Islam & Tahfidz', category: 'Keagamaan', groupName: 'Pendidikan Agama & Budi Pekerti', schoolLevel: 'SMA', major: 'Umum', weeklyHours: 3, passingGrade: 80, status: 'aktif', headTeacherName: 'Ust. Muhammad Rizky, S.Th.I' },
  { id: 'subj-bio', code: 'BIO-10', name: 'Biologi Lingkungan & Bioteknologi', category: 'Pilihan', groupName: 'Kelompok B (Mata Pelajaran Pilihan / Peminatan)', schoolLevel: 'SMA', major: 'MIPA', weeklyHours: 3, passingGrade: 75, status: 'aktif', headTeacherName: 'Dr. Dewi Lestari, M.Biomed' },
  { id: 'subj-seamb', code: 'SEJ-10', name: 'Sejarah Indonesia & Peradaban', category: 'Wajib', groupName: 'Kelompok A (Mata Pelajaran Umum Wajib)', schoolLevel: 'SMA', major: 'Umum', weeklyHours: 2, passingGrade: 75, status: 'aktif', headTeacherName: 'Agus Setiawan, S.Pd' },
];

export const initialCompetencies: CompetencyItem[] = [
  { id: 'cp-mat-1', subjectCode: 'MAT-10', subjectName: 'Matematika Tingkat Lanjut', type: 'CP', code: 'CP-MAT-X-01', gradeLevel: 'X', title: 'Capaian Pembelajaran Aljabar & Matriks', description: 'Peserta didik mampu menerapkan matriks dan aljabar linier dalam menyelesaikan masalah kontekstual.' },
  { id: 'tp-mat-1', subjectCode: 'MAT-10', subjectName: 'Matematika Tingkat Lanjut', type: 'TP', code: 'TP-MAT-X-01.1', gradeLevel: 'X', title: 'Tujuan Pembelajaran Perkalian Matriks', description: 'Memahami konsep dasar perkalian matriks 2x2 dan 3x3 serta sifat-sifat operasinya.' },
  { id: 'atp-mat-1', subjectCode: 'MAT-10', subjectName: 'Matematika Tingkat Lanjut', type: 'ATP', code: 'ATP-MAT-2025', gradeLevel: 'X', title: 'Alur Tujuan Pembelajaran Semester Genap', description: 'Matriks -> Sistem Persamaan Linier -> Vektor -> Analisis Data AI.' },
  { id: 'kd-fis-1', subjectCode: 'FIS-10', subjectName: 'Fisika Terapan & Lab', type: 'KD', code: 'KD-3.1-FIS', gradeLevel: 'X', title: 'Pengukuran dan Hakikat Fisika', description: 'Menerapkan prinsip-prinsip pengukuran besaran fisis, ketepatan, ketelitian, dan angka penting.' },
];

export const initialRooms: RoomItem[] = [
  { id: 'room-101', code: 'R.101', name: 'Ruang Kelas X IPA 1', building: 'Gedung Utama Lt. 1', capacity: 36, type: 'Kelas', facilities: ['Proyektor Smart', 'AC 2PK', 'WiFi 6', 'Whiteboard Glass'], status: 'tersedia' },
  { id: 'room-102', code: 'R.102', name: 'Ruang Kelas X IPA 2', building: 'Gedung Utama Lt. 1', capacity: 36, type: 'Kelas', facilities: ['Proyektor Smart', 'AC 2PK', 'WiFi 6'], status: 'tersedia' },
  { id: 'room-201', code: 'R.201', name: 'Ruang Kelas XI IPA 1', building: 'Gedung Utama Lt. 2', capacity: 36, type: 'Kelas', facilities: ['Smart TV 65 Inch', 'AC 2PK', 'Sound System'], status: 'tersedia' },
  { id: 'room-lab-komp', code: 'LAB-KOMP-A', name: 'Laboratorium Komputer Enterprise AI', building: 'Gedung Sains & Teknologi Lt. 2', capacity: 40, type: 'Laboratorium Komputer', facilities: ['40 Unit PC Core i7 GPU', 'Server GPU AI', 'Gigabit LAN', 'Full AC'], status: 'digunakan' },
  { id: 'room-lab-fis', code: 'LAB-FIS', name: 'Laboratorium Fisika Modern', building: 'Gedung Sains & Teknologi Lt. 1', capacity: 36, type: 'Laboratorium IPA', facilities: ['Kit Alat Ukur Laser', 'Sensors Vernier', 'Proyektor'], status: 'tersedia' },
  { id: 'room-perpus', code: 'PERPUS-DIGITAL', name: 'Perpustakaan & Learning Resource Center', building: 'Gedung Perpustakaan', capacity: 80, type: 'Perpustakaan', facilities: ['Tablet Kios E-Book', 'Quiet Zone', 'Meja Diskusi Pods'], status: 'tersedia' },
];

export const initialClasses: ClassItem[] = [
  { id: 'cls-10-ipa-1', code: 'X-IPA-1', name: 'X IPA 1', gradeLevel: 'X', major: 'MIPA', capacity: 36, enrolledStudents: 34, homeroomTeacherId: 'tch-001', homeroomTeacherName: 'Dr. Ahmad Fauzi, M.Pd', roomId: 'room-101', roomName: 'Ruang Kelas X IPA 1', status: 'aktif' },
  { id: 'cls-10-ipa-2', code: 'X-IPA-2', name: 'X IPA 2', gradeLevel: 'X', major: 'MIPA', capacity: 36, enrolledStudents: 35, homeroomTeacherId: 'tch-002', homeroomTeacherName: 'Dra. Hj. Siti Nurjanah, M.Si', roomId: 'room-102', roomName: 'Ruang Kelas X IPA 2', status: 'aktif' },
  { id: 'cls-11-ipa-1', code: 'XI-IPA-1', name: 'XI IPA 1', gradeLevel: 'XI', major: 'MIPA', capacity: 36, enrolledStudents: 36, homeroomTeacherId: 'tch-003', homeroomTeacherName: 'Rahmat Hidayat, S.Kom., M.T', roomId: 'room-201', roomName: 'Ruang Kelas XI IPA 1', status: 'aktif' },
  { id: 'cls-12-ips-1', code: 'XII-IPS-1', name: 'XII IPS 1', gradeLevel: 'XII', major: 'IPS', capacity: 36, enrolledStudents: 32, homeroomTeacherId: 'tch-004', homeroomTeacherName: 'Budi Santoso, S.Pd', roomId: 'room-101', roomName: 'Ruang Kelas X IPA 1', status: 'aktif' },
];

export const initialClassGroups: ClassGroupItem[] = [
  { id: 'rombel-1', rombelNumber: 'RMB-XIPA1-2025', classId: 'cls-10-ipa-1', className: 'X IPA 1', homeroomTeacherName: 'Dr. Ahmad Fauzi, M.Pd', studentCount: 34, schoolYear: '2025/2026', semester: 'Genap', status: 'aktif', studentIds: ['std-1', 'std-2', 'std-3'] },
  { id: 'rombel-2', rombelNumber: 'RMB-XIPA2-2025', classId: 'cls-10-ipa-2', className: 'X IPA 2', homeroomTeacherName: 'Dra. Hj. Siti Nurjanah, M.Si', studentCount: 35, schoolYear: '2025/2026', semester: 'Genap', status: 'aktif', studentIds: ['std-4', 'std-5'] },
  { id: 'rombel-3', rombelNumber: 'RMB-XIIPA1-2025', classId: 'cls-11-ipa-1', className: 'XI IPA 1', homeroomTeacherName: 'Rahmat Hidayat, S.Kom., M.T', studentCount: 36, schoolYear: '2025/2026', semester: 'Genap', status: 'aktif', studentIds: ['std-6', 'std-7'] },
];

export const initialHomeroomAssignments: HomeroomAssignment[] = [
  { id: 'hr-1', teacherId: 'tch-001', teacherName: 'Dr. Ahmad Fauzi, M.Pd', className: 'X IPA 1', schoolYear: '2025/2026', semester: 'Genap', studentCount: 34, decreeNumber: 'SK/WK/2025/001', assignedDate: '2025-07-10' },
  { id: 'hr-2', teacherId: 'tch-002', teacherName: 'Dra. Hj. Siti Nurjanah, M.Si', className: 'X IPA 2', schoolYear: '2025/2026', semester: 'Genap', studentCount: 35, decreeNumber: 'SK/WK/2025/002', assignedDate: '2025-07-10' },
  { id: 'hr-3', teacherId: 'tch-003', teacherName: 'Rahmat Hidayat, S.Kom., M.T', className: 'XI IPA 1', schoolYear: '2025/2026', semester: 'Genap', studentCount: 36, decreeNumber: 'SK/WK/2025/003', assignedDate: '2025-07-10' },
];

export const initialTeachingAssignments: TeachingAssignmentItem[] = [
  { id: 'ta-1', teacherId: 'tch-001', teacherName: 'Dr. Ahmad Fauzi, M.Pd', subjectName: 'Matematika Tingkat Lanjut', className: 'X IPA 1', schoolYear: '2025/2026', semester: 'Genap', weeklyHours: 16, maxWeeklyHoursLimit: 24, isOverloaded: false },
  { id: 'ta-2', teacherId: 'tch-002', teacherName: 'Dra. Hj. Siti Nurjanah, M.Si', subjectName: 'Fisika Terapan & Lab', className: 'X IPA 1 & 2', schoolYear: '2025/2026', semester: 'Genap', weeklyHours: 26, maxWeeklyHoursLimit: 24, isOverloaded: true },
  { id: 'ta-3', teacherId: 'tch-003', teacherName: 'Rahmat Hidayat, S.Kom., M.T', subjectName: 'Informatika & Pemrograman Python', className: 'XI IPA 1', schoolYear: '2025/2026', semester: 'Genap', weeklyHours: 18, maxWeeklyHoursLimit: 24, isOverloaded: false },
  { id: 'ta-4', teacherId: 'tch-004', teacherName: 'Budi Santoso, S.Pd', subjectName: 'Bahasa Indonesia & Literasi', className: 'XII IPS 1', schoolYear: '2025/2026', semester: 'Genap', weeklyHours: 20, maxWeeklyHoursLimit: 24, isOverloaded: false },
];

export const initialLessonPeriods: LessonPeriodItem[] = [
  { id: 'lp-1', periodNumber: 1, startTime: '07:00', endTime: '07:45', durationMinutes: 45, isBreakTime: false, notes: 'Upacara / Literasi Pagi' },
  { id: 'lp-2', periodNumber: 2, startTime: '07:45', endTime: '08:30', durationMinutes: 45, isBreakTime: false },
  { id: 'lp-3', periodNumber: 3, startTime: '08:30', endTime: '09:15', durationMinutes: 45, isBreakTime: false },
  { id: 'lp-4', periodNumber: 4, startTime: '09:15', endTime: '09:45', durationMinutes: 30, isBreakTime: true, notes: 'Istirahat I (Dhuha & Kantin)' },
  { id: 'lp-5', periodNumber: 5, startTime: '09:45', endTime: '10:30', durationMinutes: 45, isBreakTime: false },
  { id: 'lp-6', periodNumber: 6, startTime: '10:30', endTime: '11:15', durationMinutes: 45, isBreakTime: false },
  { id: 'lp-7', periodNumber: 7, startTime: '11:15', endTime: '12:00', durationMinutes: 45, isBreakTime: false },
  { id: 'lp-8', periodNumber: 8, startTime: '12:00', endTime: '13:00', durationMinutes: 60, isBreakTime: true, notes: 'Istirahat II (Ishoma Dhuhur)' },
  { id: 'lp-9', periodNumber: 9, startTime: '13:00', endTime: '13:45', durationMinutes: 45, isBreakTime: false },
  { id: 'lp-10', periodNumber: 10, startTime: '13:45', endTime: '14:30', durationMinutes: 45, isBreakTime: false },
];

export const initialLessonSchedules: LessonScheduleItem[] = [
  { id: 'sch-1', day: 'Senin', periodNumber: 2, timeSlot: '07:45 - 08:30', classId: 'cls-10-ipa-1', className: 'X IPA 1', subjectId: 'subj-mat', subjectName: 'Matematika', teacherId: 'tch-001', teacherName: 'Dr. Ahmad Fauzi, M.Pd', roomId: 'room-101', roomName: 'Ruang X IPA 1', semester: 'Genap', schoolYear: '2025/2026' },
  { id: 'sch-2', day: 'Senin', periodNumber: 3, timeSlot: '08:30 - 09:15', classId: 'cls-10-ipa-1', className: 'X IPA 1', subjectId: 'subj-mat', subjectName: 'Matematika', teacherId: 'tch-001', teacherName: 'Dr. Ahmad Fauzi, M.Pd', roomId: 'room-101', roomName: 'Ruang X IPA 1', semester: 'Genap', schoolYear: '2025/2026' },
  { id: 'sch-3', day: 'Senin', periodNumber: 5, timeSlot: '09:45 - 10:30', classId: 'cls-10-ipa-1', className: 'X IPA 1', subjectId: 'subj-fis', subjectName: 'Fisika', teacherId: 'tch-002', teacherName: 'Dra. Hj. Siti Nurjanah, M.Si', roomId: 'room-lab-fis', roomName: 'Lab Fisika', semester: 'Genap', schoolYear: '2025/2026' },
  { id: 'sch-4', day: 'Selasa', periodNumber: 2, timeSlot: '07:45 - 08:30', classId: 'cls-11-ipa-1', className: 'XI IPA 1', subjectId: 'subj-inf', subjectName: 'Informatika', teacherId: 'tch-003', teacherName: 'Rahmat Hidayat, S.Kom., M.T', roomId: 'room-lab-komp', roomName: 'Lab Komputer AI', semester: 'Genap', schoolYear: '2025/2026' },
  { id: 'sch-5', day: 'Selasa', periodNumber: 3, timeSlot: '08:30 - 09:15', classId: 'cls-11-ipa-1', className: 'XI IPA 1', subjectId: 'subj-inf', subjectName: 'Informatika', teacherId: 'tch-003', teacherName: 'Rahmat Hidayat, S.Kom., M.T', roomId: 'room-lab-komp', roomName: 'Lab Komputer AI', semester: 'Genap', schoolYear: '2025/2026' },
  { id: 'sch-6', day: 'Rabu', periodNumber: 2, timeSlot: '07:45 - 08:30', classId: 'cls-10-ipa-2', className: 'X IPA 2', subjectId: 'subj-fis', subjectName: 'Fisika', teacherId: 'tch-002', teacherName: 'Dra. Hj. Siti Nurjanah, M.Si', roomId: 'room-102', roomName: 'Ruang X IPA 2', semester: 'Genap', schoolYear: '2025/2026' },
  { id: 'sch-7', day: 'Kamis', periodNumber: 5, timeSlot: '09:45 - 10:30', classId: 'cls-10-ipa-1', className: 'X IPA 1', subjectId: 'subj-pai', subjectName: 'Pendidikan Agama Islam', teacherId: 'tch-006', teacherName: 'Ust. Muhammad Rizky', roomId: 'room-101', roomName: 'Ruang X IPA 1', semester: 'Genap', schoolYear: '2025/2026' },
];

export const initialExamSchedules: ExamScheduleItem[] = [
  { id: 'ex-1', examType: 'PTS', title: 'Penilaian Tengah Semester Genap Matematika', subjectName: 'Matematika Tingkat Lanjut', className: 'X IPA 1 & 2', date: '2026-03-16', timeSlot: '08:00 - 09:30', roomName: 'Ruang X IPA 1', proctorName: 'Dra. Hj. Siti Nurjanah, M.Si', status: 'terjadwal' },
  { id: 'ex-2', examType: 'CBT', title: 'Ujian Berbasis Komputer Informatika Python', subjectName: 'Informatika & Pemrograman Python', className: 'XI IPA 1', date: '2026-03-17', timeSlot: '10:00 - 11:30', roomName: 'Lab Komputer Enterprise AI', proctorName: 'Rahmat Hidayat, S.Kom., M.T', status: 'terjadwal' },
  { id: 'ex-3', examType: 'PAS', title: 'Penilaian Akhir Semester Ganjil Fisika', subjectName: 'Fisika Terapan & Lab', className: 'X IPA 1', date: '2025-12-08', timeSlot: '08:00 - 09:30', roomName: 'Lab Fisika Modern', proctorName: 'Dr. Ahmad Fauzi, M.Pd', status: 'selesai' },
];

export const initialCalendarEvents: CalendarEventItem[] = [
  { id: 'cal-1', title: 'Awal Masuk Semester Genap 2025/2026', category: 'Agenda', startDate: '2026-01-05', endDate: '2026-01-05', targetAudience: 'Semua', description: 'Upacara pembukaan dan briefing KBM Semester Genap.' },
  { id: 'cal-2', title: 'Pelaksanaan PTS Genap T.A 2025/2026', category: 'PTS', startDate: '2026-03-16', endDate: '2026-03-23', targetAudience: 'Semua', description: 'Penilaian Tengah Semester seluruh jenjang.' },
  { id: 'cal-3', title: 'Libur Hari Raya Idul Fitri 1447 H', category: 'Hari Libur', startDate: '2026-03-24', endDate: '2026-04-05', targetAudience: 'Semua', description: 'Cuti bersama dan libur keagamaan.' },
  { id: 'cal-4', title: 'Rapat Koordinasi Evaluasi Kurikulum Merdeka', category: 'Rapat', startDate: '2026-04-15', endDate: '2026-04-15', targetAudience: 'Guru', description: 'Rapat dewan guru dan tim kurikulum.' },
  { id: 'cal-5', title: 'Workshop Pengayaan AI & Prompting Guru', category: 'Pelatihan', startDate: '2026-04-25', endDate: '2026-04-26', targetAudience: 'Guru', description: 'Pelatihan pembuatan modul ajar otomatis dengan Smart AI.' },
];

export const initialEffectiveDays: EffectiveDaysMonthly[] = [
  { month: 'Januari', year: 2026, effectiveDays: 20, holidayDays: 4, examDays: 0, effectiveWeeks: 4 },
  { month: 'Februari', year: 2026, effectiveDays: 19, holidayDays: 1, examDays: 0, effectiveWeeks: 4 },
  { month: 'Maret', year: 2026, effectiveDays: 12, holidayDays: 8, examDays: 6, effectiveWeeks: 3 },
  { month: 'April', year: 2026, effectiveDays: 18, holidayDays: 5, examDays: 0, effectiveWeeks: 4 },
  { month: 'Mei', year: 2026, effectiveDays: 19, holidayDays: 3, examDays: 0, effectiveWeeks: 4 },
  { month: 'Juni', year: 2026, effectiveDays: 14, holidayDays: 4, examDays: 8, effectiveWeeks: 3 },
];

export const initialAiAnalysis: AcademicAiAnalysis = {
  overloadedTeachersCount: 1,
  totalScheduleConflicts: 0,
  roomUtilizationRate: 88.4,
  workloadDistributionScore: 92,
  aiRecommendations: [
    'Deteksi 1 guru (Dra. Hj. Siti Nurjanah, M.Si) melebihi batas 24 JP/minggu (total 26 JP). Disarankan redistribusi 2 JP Fisika X IPA 2 ke guru pendamping.',
    'Penggunaan Laboratorium Komputer AI berada di tingkat optimal 88.4%. Disarankan penambahan slot cadangan di hari Jumat.',
    'Seluruh jadwal kelas X IPA 1 & 2 telah terverifikasi 0% bentrok bentrokan jam maupun ruangan.',
  ],
  autoScheduleLog: 'SMART AI SCHEDULER ENGINE v3.4: Evaluasi 28 Rombel, 32 Mapel, 42 Guru. Penjadwalan selesai dalam 1.2 detik tanpa bentrok.',
};
