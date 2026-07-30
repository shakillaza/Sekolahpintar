import {
  UserManagementUser,
  RoleModel,
  PermissionModel,
  UserGroupModel,
  DepartmentModel,
  PositionModel,
  MenuManagementItem,
  ActiveSessionModel,
  LoginHistoryModel,
  DeviceModel,
  AuditLogItem
} from '../types';

export const initialRoles: RoleModel[] = [
  { id: 'role-superadmin', name: 'Super Admin', code: 'SUPER_ADMIN', description: 'Hak akses penuh tanpa batasan ke seluruh sistem, tenant, dan license SaaS', isSystemRole: true, userCount: 3, permissionsCount: 56 },
  { id: 'role-owner', name: 'Owner', code: 'OWNER', description: 'Pemilik institusi/lembaga pendidikan dengan kewenangan bisnis, keuangan & legal', isSystemRole: true, userCount: 2, permissionsCount: 52 },
  { id: 'role-yayasan', name: 'Yayasan', code: 'YAYASAN', description: 'Pengurus Yayasan untuk pengawasan eksekutif, keuangan konsolidasi & SDM', isSystemRole: true, userCount: 5, permissionsCount: 45 },
  { id: 'role-kepsek', name: 'Kepala Sekolah', code: 'Kepala Sekolah', description: 'Kepemimpinan operasional sekolah, mutu akademik, kebijakan & approval', isSystemRole: true, userCount: 12, permissionsCount: 48 },
  { id: 'role-wakepsek', name: 'Wakil Kepala Sekolah', code: 'WAKEPSEK', description: 'Wakil Kepala Sekolah Kurikulum, Kesiswaan, Sarpras & Humas', isSystemRole: true, userCount: 24, permissionsCount: 42 },
  { id: 'role-guru', name: 'Guru', code: 'GURU', description: 'Tenaga pendidik, manajemen RPP AI, penginputan nilai, jurnal & absensi', isSystemRole: true, userCount: 180, permissionsCount: 28 },
  { id: 'role-walikelas', name: 'Wali Kelas', code: 'WALI_KELAS', description: 'Pendamping rombel, pembinaan siswa, pembagian rapor & komunikasi ortu', isSystemRole: true, userCount: 45, permissionsCount: 32 },
  { id: 'role-gurubk', name: 'Guru BK', code: 'GURU_BK', description: 'Bimbingan Konseling, rekam jejak kedisiplinan, minat bakat & psikologi', isSystemRole: true, userCount: 8, permissionsCount: 26 },
  { id: 'role-tu', name: 'TU (Tata Usaha)', code: 'TATA_USAHA', description: 'Administrasi persuratan digital, arsip kepegawaian & legalitas dokumen', isSystemRole: true, userCount: 15, permissionsCount: 35 },
  { id: 'role-bendahara', name: 'Bendahara', code: 'BENDAHARA', description: 'Pengelolaan kas, tagihan SPP, slip gaji, anggaran & pertanggungjawaban', isSystemRole: true, userCount: 6, permissionsCount: 38 },
  { id: 'role-operator', name: 'Operator', code: 'OPERATOR', description: 'Pengelola Dapodik, Master Data, sinkronisasi EMIS/Kemdikbud & sistem', isSystemRole: true, userCount: 8, permissionsCount: 40 },
  { id: 'role-perpus', name: 'Petugas Perpustakaan', code: 'PETUGAS_PERPUS', description: 'Sirkulasi peminjaman buku, katalogisasi e-library & pendaftaran anggota', isSystemRole: true, userCount: 4, permissionsCount: 20 },
  { id: 'role-lab', name: 'Petugas Laboratorium', code: 'PETUGAS_LAB', description: 'Manajemen alat inventaris laboratorium, jadwal praktikum & keselamatan', isSystemRole: true, userCount: 5, permissionsCount: 18 },
  { id: 'role-uks', name: 'Petugas UKS', code: 'PETUGAS_UKS', description: 'Pencatatan riwayat kesehatan siswa, rekam medis harian & obat-obatan', isSystemRole: true, userCount: 3, permissionsCount: 16 },
  { id: 'role-satpam', name: 'Satpam', code: 'SATPAM', description: 'Keamanan gerbang, presensi tap-card tamu, verifikasi penjemputan siswa', isSystemRole: true, userCount: 10, permissionsCount: 12 },
  { id: 'role-ortu', name: 'Orang Tua', code: 'ORANG_TUA', description: 'Portal orang tua untuk pantau absensi, nilai rapor, SPP & pengumuman', isSystemRole: true, userCount: 1250, permissionsCount: 10 },
  { id: 'role-siswa', name: 'Siswa', code: 'SISWA', description: 'Portal siswa untuk jadwal pelajaran, materi AI, tugas, kuis & nilai', isSystemRole: true, userCount: 1420, permissionsCount: 8 },
  { id: 'role-guest', name: 'Guest', code: 'GUEST', description: 'Akses terbatas untuk calon wali murid/tamu umum portal informasi', isSystemRole: true, userCount: 15, permissionsCount: 4 }
];

export const initialPermissions: PermissionModel[] = [
  // Student Module
  { id: 'p-1', module: 'Student', action: 'View', code: 'Student.View', name: 'Lihat Data Siswa', description: 'Melihat profil dan daftar siswa' },
  { id: 'p-2', module: 'Student', action: 'Create', code: 'Student.Create', name: 'Tambah Data Siswa', description: 'Menambahkan pendaftaran siswa baru' },
  { id: 'p-3', module: 'Student', action: 'Update', code: 'Student.Update', name: 'Edit Data Siswa', description: 'Memperbarui informasi biodata siswa' },
  { id: 'p-4', module: 'Student', action: 'Delete', code: 'Student.Delete', name: 'Hapus Data Siswa', description: 'Menghapus record siswa dari database' },
  { id: 'p-5', module: 'Student', action: 'Export', code: 'Student.Export', name: 'Ekspor Data Siswa', description: 'Mengunduh data siswa format Excel/PDF' },
  { id: 'p-6', module: 'Student', action: 'Import', code: 'Student.Import', name: 'Impor Data Siswa', description: 'Mengunggah massal data siswa via Excel' },

  // Teacher Module
  { id: 'p-7', module: 'Teacher', action: 'View', code: 'Teacher.View', name: 'Lihat Data Guru', description: 'Melihat profil dan direktori guru/staf' },
  { id: 'p-8', module: 'Teacher', action: 'Create', code: 'Teacher.Create', name: 'Tambah Data Guru', description: 'Perekrutan dan registrasi guru baru' },
  { id: 'p-9', module: 'Teacher', action: 'Update', code: 'Teacher.Update', name: 'Edit Data Guru', description: 'Mengubah jam mengajar & profil guru' },
  { id: 'p-10', module: 'Teacher', action: 'Delete', code: 'Teacher.Delete', name: 'Hapus Data Guru', description: 'Menghapus atau menonaktifkan guru' },

  // Finance Module
  { id: 'p-11', module: 'Finance', action: 'View', code: 'Finance.View', name: 'Lihat Keuangan', description: 'Melihat laporan arus kas & SPP' },
  { id: 'p-12', module: 'Finance', action: 'Create', code: 'Finance.Create', name: 'Input Transaksi Keuangan', description: 'Mencatat pemasukan/pengeluaran' },
  { id: 'p-13', module: 'Finance', action: 'Update', code: 'Finance.Update', name: 'Ubah Data Keuangan', description: 'Mengoreksi catatan transaksi' },
  { id: 'p-14', module: 'Finance', action: 'Approve', code: 'Finance.Approve', name: 'Approval Anggaran', description: 'Menyetujui pengajuan pencairan dana' },

  // User Management Module
  { id: 'p-15', module: 'User', action: 'View', code: 'User.View', name: 'Lihat Pengguna', description: 'Melihat daftar akun dan status online' },
  { id: 'p-16', module: 'User', action: 'Create', code: 'User.Create', name: 'Buat Pengguna Baru', description: 'Mendaftarkan kredensial akun pengguna' },
  { id: 'p-17', module: 'User', action: 'Update', code: 'User.Update', name: 'Edit Hak Akses & Akun', description: 'Mengubah role dan status akun' },
  { id: 'p-18', module: 'User', action: 'Delete', code: 'User.Delete', name: 'Hapus Akun', description: 'Menghapus atau memblokir kredensial' },

  // Audit & Settings Module
  { id: 'p-19', module: 'Audit', action: 'View', code: 'Audit.View', name: 'Lihat Audit Log', description: 'Memantau seluruh aktivitas sistem' },
  { id: 'p-20', module: 'Settings', action: 'Update', code: 'Settings.Update', name: 'Konfigurasi Sistem', description: 'Mengubah branding white-label & security' }
];

export const initialUserGroups: UserGroupModel[] = [
  { id: 'ug-1', name: 'Guru & Tenaga Pendidik', code: 'GRP_GURU', description: 'Kelompok pengajar aktif di seluruh rombel dan mata pelajaran', userCount: 180, createdDate: '2025-01-10' },
  { id: 'ug-2', name: 'Pegawai & Staf Operasional', code: 'GRP_PEGAWAI', description: 'Staf Tata Usaha, Keamanan, Kebersihan, dan Laboratorium', userCount: 45, createdDate: '2025-01-10' },
  { id: 'ug-3', name: 'Peserta Didik / Siswa', code: 'GRP_SISWA', description: 'Seluruh siswa aktif terdaftar di jenjang PAUD-SMA/SMK', userCount: 1420, createdDate: '2025-01-12' },
  { id: 'ug-4', name: 'Orang Tua & Wali Murid', code: 'GRP_ORTU', description: 'Wali murid terverifikasi penerima laporan perkembangan anak', userCount: 1250, createdDate: '2025-01-12' },
  { id: 'ug-5', name: 'Pengurus Yayasan & Pembina', code: 'GRP_YAYASAN', description: 'Jajaran dewan pembina dan pengurus direksi yayasan', userCount: 5, createdDate: '2025-01-05' },
  { id: 'ug-6', name: 'Staff IT & Administrator', code: 'GRP_IT', description: 'Tim teknis sistem jaringan, keamanan data & operator', userCount: 8, createdDate: '2025-01-01' }
];

export const initialDepartments: DepartmentModel[] = [
  { id: 'dept-1', name: 'Direktorat Akademik & Kurikulum', code: 'AKADEMIK', headName: 'Drs. H. M. Ridwan, M.Pd.', staffCount: 180, description: 'Mengelola kurikulum, RPP AI, evaluasi pembelajaran dan rapor' },
  { id: 'dept-2', name: 'Departemen Keuangan & Akuntansi', code: 'KEUANGAN', headName: 'Hj. Siti Nurhaliza, S.E., M.Ak.', staffCount: 8, description: 'Sistem SPP otomatis, payroll gaji guru, dan pertanggungjawaban kas' },
  { id: 'dept-3', name: 'Divisi Tata Usaha & Legalitas', code: 'TU', headName: 'Bambang Sugianto, S.Sos.', staffCount: 15, description: 'Persuratan digital, kearsipan, legalitas ijazah & administrasi' },
  { id: 'dept-4', name: 'Departemen Teknologi Informasi & AI', code: 'IT', headName: 'Ahmad Fauzi, S.T., M.T.', staffCount: 6, description: 'Infrastruktur cloud server, keamanan cyber, AI model & database' },
  { id: 'dept-5', name: 'Unit Perpustakaan & Literasi', code: 'PERPUS', headName: 'Dra. Endang Rahayu', staffCount: 4, description: 'Pengelolaan koleksi e-book, repositori karya ilmiah & sirkulasi' },
  { id: 'dept-6', name: 'Unit Laboratorium & Sains', code: 'LAB', headName: 'Ir. Hendra Gunawan', staffCount: 5, description: 'Fasilitas laboratorium IPA, Komputer, Bahasa, dan Robotik' },
  { id: 'dept-7', name: 'Unit Kesehatan Sekolah (UKS)', code: 'UKS', headName: 'dr. Nabila Putri', staffCount: 3, description: 'Layanan kesehatan siswa, rekam medis harian & konsultasi gizi' },
  { id: 'dept-8', name: 'Satuan Keamanan & Ketertiban', code: 'KEAMANAN', headName: 'Kapten (Purn) Kusnadi', staffCount: 10, description: 'Pengawasan keamanan fisik lingkungan sekolah 24/7' }
];

export const initialPositions: PositionModel[] = [
  { id: 'pos-1', title: 'Kepala Sekolah', departmentName: 'Direktorat Akademik & Kurikulum', level: 'Eselon 1', totalHolders: 12 },
  { id: 'pos-2', title: 'Wakil Kepala Sekolah Kurikulum', departmentName: 'Direktorat Akademik & Kurikulum', level: 'Eselon 2', totalHolders: 12 },
  { id: 'pos-3', title: 'Guru Senior & Pengembang RPP AI', departmentName: 'Direktorat Akademik & Kurikulum', level: 'Fungsional Utama', totalHolders: 85 },
  { id: 'pos-4', title: 'Guru Bimbingan Konseling (BK)', departmentName: 'Direktorat Akademik & Kurikulum', level: 'Fungsional', totalHolders: 8 },
  { id: 'pos-5', title: 'Wali Kelas Pembina', departmentName: 'Direktorat Akademik & Kurikulum', level: 'Fungsional', totalHolders: 45 },
  { id: 'pos-6', title: 'Head of IT & System Administrator', departmentName: 'Departemen Teknologi Informasi & AI', level: 'Managerial', totalHolders: 3 },
  { id: 'pos-7', title: 'Chief Financial Officer / Bendahara', departmentName: 'Departemen Keuangan & Akuntansi', level: 'Eselon 2', totalHolders: 6 },
  { id: 'pos-8', title: 'Kepala Tata Usaha', departmentName: 'Divisi Tata Usaha & Legalitas', level: 'Supervisor', totalHolders: 12 },
  { id: 'pos-9', title: 'Operator Dapodik Enterprise', departmentName: 'Divisi Tata Usaha & Legalitas', level: 'Staff Ahli', totalHolders: 8 }
];

export const initialUsers: UserManagementUser[] = [
  {
    id: 'usr-1',
    username: 'superadmin.aischool',
    name: 'Ahmad Fauzi, S.T., M.T.',
    email: 'superadmin@aischool.id',
    phone: '+62 812-3456-7890',
    nip_nisn: '198503152010011002',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    roleId: 'role-superadmin',
    roleName: 'Super Admin',
    userGroupId: 'ug-6',
    userGroupName: 'Staff IT & Administrator',
    departmentId: 'dept-4',
    departmentName: 'Departemen Teknologi Informasi & AI',
    positionId: 'pos-6',
    positionTitle: 'Head of IT & System Administrator',
    schoolId: 'sch-1',
    schoolName: 'SMA Smart AI Utama',
    status: 'active',
    onlineStatus: 'online',
    verifiedStatus: 'verified',
    createdAt: '2025-01-01',
    lastLogin: 'Baru Saja',
    mfaEnabled: true,
    mfaMethod: 'totp'
  },
  {
    id: 'usr-2',
    username: 'drs.ridwan.kepsek',
    name: 'Drs. H. M. Ridwan, M.Pd.',
    email: 'ridwan.kepsek@aischool.sch.id',
    phone: '+62 811-9876-5432',
    nip_nisn: '197204121998031004',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    roleId: 'role-kepsek',
    roleName: 'Kepala Sekolah',
    userGroupId: 'ug-1',
    userGroupName: 'Guru & Tenaga Pendidik',
    departmentId: 'dept-1',
    departmentName: 'Direktorat Akademik & Kurikulum',
    positionId: 'pos-1',
    positionTitle: 'Kepala Sekolah',
    schoolId: 'sch-1',
    schoolName: 'SMA Smart AI Utama',
    status: 'active',
    onlineStatus: 'online',
    verifiedStatus: 'verified',
    createdAt: '2025-01-02',
    lastLogin: '10 menit lalu',
    mfaEnabled: true,
    mfaMethod: 'email_otp'
  },
  {
    id: 'usr-3',
    username: 'siti.bendahara',
    name: 'Hj. Siti Nurhaliza, S.E., M.Ak.',
    email: 'siti.keuangan@aischool.sch.id',
    phone: '+62 813-2233-4455',
    nip_nisn: '198108202005022001',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150',
    roleId: 'role-bendahara',
    roleName: 'Bendahara',
    userGroupId: 'ug-2',
    userGroupName: 'Pegawai & Staf Operasional',
    departmentId: 'dept-2',
    departmentName: 'Departemen Keuangan & Akuntansi',
    positionId: 'pos-7',
    positionTitle: 'Chief Financial Officer / Bendahara',
    schoolId: 'sch-1',
    schoolName: 'SMA Smart AI Utama',
    status: 'active',
    onlineStatus: 'offline',
    verifiedStatus: 'verified',
    createdAt: '2025-01-05',
    lastLogin: '2 jam lalu',
    mfaEnabled: false,
    mfaMethod: 'none'
  },
  {
    id: 'usr-4',
    username: 'budi.santoso.guru',
    name: 'Budi Santoso, S.Pd.',
    email: 'budi.santoso@aischool.sch.id',
    phone: '+62 857-1122-3344',
    nip_nisn: '199001012015041001',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    roleId: 'role-guru',
    roleName: 'Guru',
    userGroupId: 'ug-1',
    userGroupName: 'Guru & Tenaga Pendidik',
    departmentId: 'dept-1',
    departmentName: 'Direktorat Akademik & Kurikulum',
    positionId: 'pos-3',
    positionTitle: 'Guru Senior & Pengembang RPP AI',
    schoolId: 'sch-1',
    schoolName: 'SMA Smart AI Utama',
    status: 'active',
    onlineStatus: 'online',
    verifiedStatus: 'verified',
    createdAt: '2025-01-10',
    lastLogin: '1 jam lalu',
    mfaEnabled: true,
    mfaMethod: 'sms_otp'
  },
  {
    id: 'usr-5',
    username: 'dewi.ortu.kenzo',
    name: 'Dewi Lestari (Ortu Kenzo)',
    email: 'dewi.lestari@gmail.com',
    phone: '+62 818-7788-9900',
    nip_nisn: '-',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
    roleId: 'role-ortu',
    roleName: 'Orang Tua',
    userGroupId: 'ug-4',
    userGroupName: 'Orang Tua & Wali Murid',
    departmentId: 'dept-1',
    departmentName: 'Direktorat Akademik & Kurikulum',
    positionId: 'pos-5',
    positionTitle: 'Wali Kelas Pembina',
    schoolId: 'sch-1',
    schoolName: 'SMA Smart AI Utama',
    status: 'active',
    onlineStatus: 'offline',
    verifiedStatus: 'verified',
    createdAt: '2025-01-15',
    lastLogin: 'Kemarin',
    mfaEnabled: false,
    mfaMethod: 'none'
  },
  {
    id: 'usr-6',
    username: 'kenzo.siswa.101',
    name: 'Kenzo Al-Fathir',
    email: 'kenzo.alfathir@student.aischool.sch.id',
    phone: '+62 899-6655-4433',
    nip_nisn: '0087654321',
    avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150',
    roleId: 'role-siswa',
    roleName: 'Siswa',
    userGroupId: 'ug-3',
    userGroupName: 'Peserta Didik / Siswa',
    departmentId: 'dept-1',
    departmentName: 'Direktorat Akademik & Kurikulum',
    positionId: 'pos-3',
    positionTitle: 'Guru Senior & Pengembang RPP AI',
    schoolId: 'sch-1',
    schoolName: 'SMA Smart AI Utama',
    status: 'active',
    onlineStatus: 'online',
    verifiedStatus: 'verified',
    createdAt: '2025-01-15',
    lastLogin: '5 menit lalu',
    mfaEnabled: false,
    mfaMethod: 'none'
  }
];

export const initialMenuManagement: MenuManagementItem[] = [
  { id: 'm-1', title: 'Dashboard Utama', path: '/dashboard', iconName: 'LayoutDashboard', category: 'Utama', rolesAllowed: ['SUPER_ADMIN', 'OWNER', 'YAYASAN', 'Kepala Sekolah', 'WAKEPSEK', 'GURU', 'WALI_KELAS', 'GURU_BK', 'TATA_USAHA', 'BENDAHARA', 'OPERATOR', 'ORANG_TUA', 'SISWA'], isVisible: true, order: 1 },
  { id: 'm-2', title: 'Master Data Sekolah', path: '/master_data', iconName: 'Layers', category: 'Akademik', rolesAllowed: ['SUPER_ADMIN', 'OWNER', 'YAYASAN', 'Kepala Sekolah', 'OPERATOR', 'TATA_USAHA'], isVisible: true, order: 2 },
  { id: 'm-3', title: 'User Management & RBAC', path: '/user_management', iconName: 'Shield', category: 'Sistem', rolesAllowed: ['SUPER_ADMIN', 'OWNER', 'Kepala Sekolah', 'OPERATOR'], isVisible: true, order: 3 },
  { id: 'm-4', title: 'Modul Keuangan & SPP', path: '/finance', iconName: 'DollarSign', category: 'Keuangan', rolesAllowed: ['SUPER_ADMIN', 'OWNER', 'YAYASAN', 'Kepala Sekolah', 'BENDAHARA'], isVisible: true, order: 4 },
  { id: 'm-5', title: 'Presensi & Absensi QR', path: '/attendance', iconName: 'Users', category: 'Akademik', rolesAllowed: ['SUPER_ADMIN', 'Kepala Sekolah', 'GURU', 'WALI_KELAS', 'SATPAM', 'ORANG_TUA', 'SISWA'], isVisible: true, order: 5 },
  { id: 'm-6', title: 'Persuratan Digital TU', path: '/letters', iconName: 'FileText', category: 'Administrasi', rolesAllowed: ['SUPER_ADMIN', 'Kepala Sekolah', 'TATA_USAHA'], isVisible: true, order: 6 },
  { id: 'm-7', title: 'Perpustakaan & E-Library', path: '/library', iconName: 'BookOpen', category: 'Fasilitas', rolesAllowed: ['SUPER_ADMIN', 'PETUGAS_PERPUS', 'GURU', 'SISWA'], isVisible: true, order: 7 }
];

export const initialActiveSessions: ActiveSessionModel[] = [
  {
    id: 'ses-1',
    userId: 'usr-1',
    userName: 'Ahmad Fauzi, S.T., M.T.',
    userRole: 'Super Admin',
    device: 'MacBook Pro M3 Max',
    browser: 'Chrome 126.0 (macOS)',
    os: 'macOS Sonoma 14.5',
    ipAddress: '182.253.140.22',
    location: 'Jakarta Selatan, Indonesia',
    loginTime: '2026-07-29 08:30:12',
    lastActive: 'Aktif Saja (Sesi Ini)',
    isCurrent: true
  },
  {
    id: 'ses-2',
    userId: 'usr-2',
    userName: 'Drs. H. M. Ridwan, M.Pd.',
    userRole: 'Kepala Sekolah',
    device: 'iPad Air 5th Gen',
    browser: 'Safari 17.4 (iPadOS)',
    os: 'iPadOS 17.5.1',
    ipAddress: '114.122.204.88',
    location: 'Bandung, Indonesia',
    loginTime: '2026-07-29 09:15:00',
    lastActive: '10 menit lalu',
    isCurrent: false
  },
  {
    id: 'ses-3',
    userId: 'usr-4',
    userName: 'Budi Santoso, S.Pd.',
    userRole: 'Guru',
    device: 'ThinkPad X1 Carbon',
    browser: 'Firefox 127.0 (Windows)',
    os: 'Windows 11 Pro 23H2',
    ipAddress: '180.242.112.45',
    location: 'Surabaya, Indonesia',
    loginTime: '2026-07-29 10:04:19',
    lastActive: '1 jam lalu',
    isCurrent: false
  },
  {
    id: 'ses-4',
    userId: 'usr-6',
    userName: 'Kenzo Al-Fathir',
    userRole: 'Siswa',
    device: 'Samsung Galaxy Tab S9',
    browser: 'Chrome Mobile 125.0',
    os: 'Android 14',
    ipAddress: '36.85.190.12',
    location: 'Jakarta Barat, Indonesia',
    loginTime: '2026-07-29 11:45:02',
    lastActive: '5 menit lalu',
    isCurrent: false
  }
];

export const initialLoginHistory: LoginHistoryModel[] = [
  { id: 'lh-1', userId: 'usr-1', userName: 'Ahmad Fauzi, S.T., M.T.', role: 'Super Admin', timestamp: '2026-07-29 08:30:12', browser: 'Chrome 126.0', device: 'MacBook Pro', ipAddress: '182.253.140.22', status: 'Success', location: 'Jakarta Selatan, ID' },
  { id: 'lh-2', userId: 'usr-2', userName: 'Drs. H. M. Ridwan, M.Pd.', role: 'Kepala Sekolah', timestamp: '2026-07-29 09:15:00', browser: 'Safari 17.4', device: 'iPad Air', ipAddress: '114.122.204.88', status: 'Success', location: 'Bandung, ID' },
  { id: 'lh-3', userId: 'usr-3', userName: 'Hj. Siti Nurhaliza', role: 'Bendahara', timestamp: '2026-07-29 07:40:00', browser: 'Edge 125.0', device: 'Dell XPS 15', ipAddress: '180.252.90.11', status: 'Failed', failureReason: 'Password salah 3x berturut-turut', location: 'Jakarta Pusat, ID' },
  { id: 'lh-4', userId: 'usr-4', userName: 'Budi Santoso, S.Pd.', role: 'Guru', timestamp: '2026-07-29 10:04:19', browser: 'Firefox 127.0', device: 'ThinkPad X1', ipAddress: '180.242.112.45', status: 'Success', location: 'Surabaya, ID' },
  { id: 'lh-5', userId: 'usr-5', userName: 'Dewi Lestari', role: 'Orang Tua', timestamp: '2026-07-28 20:10:55', browser: 'Chrome Mobile', device: 'iPhone 15 Pro', ipAddress: '202.67.40.11', status: 'Success', location: 'Tangerang, ID' }
];

export const initialDevices: DeviceModel[] = [
  { id: 'dev-1', userId: 'usr-1', userName: 'Ahmad Fauzi', deviceName: 'MacBook Pro M3 Max (Workstation Utama)', deviceType: 'Desktop', os: 'macOS 14.5', browser: 'Chrome 126', lastUsed: 'Baru saja', isTrusted: true, status: 'active' },
  { id: 'dev-2', userId: 'usr-2', userName: 'Drs. H. M. Ridwan', deviceName: 'iPad Air 5th Gen (Tablet Dinas)', deviceType: 'Tablet', os: 'iPadOS 17.5', browser: 'Safari 17.4', lastUsed: '10 min lalu', isTrusted: true, status: 'active' },
  { id: 'dev-3', userId: 'usr-3', userName: 'Hj. Siti Nurhaliza', deviceName: 'Dell XPS 15 (Laptop Keuangan)', deviceType: 'Desktop', os: 'Windows 11', browser: 'Edge 125', lastUsed: '2 jam lalu', isTrusted: true, status: 'active' },
  { id: 'dev-4', userId: 'usr-3', userName: 'Hj. Siti Nurhaliza', deviceName: 'Unknown Android Device (Percobaan mencurigakan)', deviceType: 'Mobile', os: 'Android 10', browser: 'Opera Mini', lastUsed: 'Kemarin', isTrusted: false, status: 'blocked' }
];

export const initialAuditLogs: AuditLogItem[] = [
  { id: 'aud-101', timestamp: '2026-07-29 11:20:15', actorId: 'usr-1', actorName: 'Ahmad Fauzi (Super Admin)', actorRole: 'Super Admin', action: 'PermissionChange', module: 'RBAC Engine', details: 'Memperbarui matrik hak akses Role Wali Kelas untuk modul RPP AI & Presensi', ipAddress: '182.253.140.22' },
  { id: 'aud-102', timestamp: '2026-07-29 10:45:00', actorId: 'usr-2', actorName: 'Drs. H. M. Ridwan', actorRole: 'Kepala Sekolah', action: 'Export', module: 'Data Master Siswa', details: 'Mengekspor laporan rekapitulasi data siswa aktif tahun 2026 format Excel', ipAddress: '114.122.204.88' },
  { id: 'aud-103', timestamp: '2026-07-29 09:30:10', actorId: 'usr-1', actorName: 'Ahmad Fauzi', actorRole: 'Super Admin', action: 'Create', module: 'User Management', details: 'Menambahkan akun pengguna baru (Kenzo Al-Fathir) dengan Role Siswa', ipAddress: '182.253.140.22' },
  { id: 'aud-104', timestamp: '2026-07-29 08:30:12', actorId: 'usr-1', actorName: 'Ahmad Fauzi', actorRole: 'Super Admin', action: 'Login', module: 'Authentication', details: 'Login berhasil dengan verifikasi TOTP Authenticator', ipAddress: '182.253.140.22' },
  { id: 'aud-105', timestamp: '2026-07-28 16:15:22', actorId: 'usr-3', actorName: 'Hj. Siti Nurhaliza', actorRole: 'Bendahara', action: 'Edit', module: 'Modul Keuangan', details: 'Mengoreksi data nominal tagihan SPP siswa Kelas X IPA 1', ipAddress: '180.252.90.11' }
];
