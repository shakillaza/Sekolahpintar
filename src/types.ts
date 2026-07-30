export type UserRole =
  | 'super_admin'
  | 'yayasan'
  | 'kepala_sekolah'
  | 'guru'
  | 'wali_kelas'
  | 'tata_usaha'
  | 'bendahara'
  | 'operator'
  | 'orang_tua'
  | 'siswa';

export type SchoolLevel =
  | 'PAUD'
  | 'TK'
  | 'SD'
  | 'SMP'
  | 'SMA'
  | 'SMK'
  | 'Pesantren'
  | 'Internasional'
  | 'Homeschool'
  | 'Yayasan';

export type ThemeMode = 'light' | 'dark';
export type Language = 'id' | 'en';

export type AppView =
  | 'landing'
  | 'login'
  | 'register'
  | 'forgot_password'
  | 'reset_password'
  | 'dashboard'
  | 'profile'
  | 'settings'
  | 'notifications'
  | 'database_schema'
  | 'master_siswa'
  | 'master_guru'
  | 'master_data'
  | 'user_management'
  | 'ppdb'
  | 'akademik'
  | 'global_platform'
  | 'curriculum_framework'
  | 'certification_center'
  | 'smart_campus'
  | 'global_analytics'
  | 'platform_engineering'
  | 'autonomous_ai'
  | 'edu_os'
  | 'cloud_v5';

export interface User {
  id: string;
  name: string;
  email: string;
  nip_nisn?: string;
  role: UserRole;
  schoolId: string;
  schoolName: string;
  schoolLevel: SchoolLevel;
  avatarUrl?: string;
  phone?: string;
  address?: string;
  createdAt: string;
  lastLogin: string;
  isTwoFactorEnabled?: boolean;
}

export interface School {
  id: string;
  name: string;
  level: SchoolLevel;
  npsn: string;
  accreditation: 'A' | 'B' | 'C' | 'Belum Terakreditasi';
  address: string;
  phone: string;
  email: string;
  logoUrl?: string;
  licenseKey: string;
  licenseStatus: 'active' | 'trial' | 'expired';
  licenseTier: 'Standard' | 'Pro' | 'Enterprise White Label';
  validUntil: string;
  studentsCount: number;
  teachersCount: number;
  classesCount: number;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  category: 'system' | 'academic' | 'financial' | 'ai_alert' | 'attendance';
  timestamp: string;
  isRead: boolean;
  actionUrl?: string;
}

export interface ActivityLog {
  id: string;
  userId: string;
  userName: string;
  userRole: UserRole;
  action: string;
  module: string;
  ipAddress: string;
  timestamp: string;
  status: 'success' | 'failed' | 'warning';
}

export interface SystemSettings {
  appName: string;
  tagline: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  enablePWA: boolean;
  enableSSO: boolean;
  enableAuditLogs: boolean;
  enableAiAssistant: boolean;
  customDomain?: string;
  licenseKey: string;
  whiteLabelLogo?: string;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message: string;
}

export interface DatabaseTableSchema {
  tableName: string;
  description: string;
  columns: {
    name: string;
    type: string;
    nullable: boolean;
    isPrimary?: boolean;
    isForeign?: boolean;
    description: string;
  }[];
  sampleRowsCount: number;
}

// Master Data Models
export type MasterDataType =
  | 'siswa'
  | 'guru'
  | 'sekolah'
  | 'kelas'
  | 'mapel'
  | 'gedung';

export interface StudentMaster {
  id: string;
  schoolId: string;
  nis: string;
  nisn: string;
  name: string;
  gender: 'L' | 'P';
  email: string;
  parentPhone: string;
  className: string;
  status: 'Aktif' | 'Lulus' | 'Pindah' | 'Cuti';
  address: string;
  entryYear: number;
}

export interface TeacherMaster {
  id: string;
  schoolId: string;
  nip: string; // NIP or NUPTK
  name: string;
  gender: 'L' | 'P';
  email: string;
  phone: string;
  roleTitle: string; // e.g. Guru Pengajar, Kepala Sekolah, Staff TU, Bendahara
  employmentStatus: 'PNS' | 'GTY' | 'GTT' | 'Honorer';
  subjectSpecialization: string;
  status: 'Aktif' | 'Cuti' | 'Pensiun';
}

export interface SchoolMaster {
  id: string;
  npsn: string;
  name: string;
  level: SchoolLevel;
  accreditation: 'A' | 'B' | 'C' | 'Belum Terakreditasi';
  principalName: string;
  email: string;
  phone: string;
  address: string;
  studentsCount: number;
}

export interface ClassroomMaster {
  id: string;
  schoolId: string;
  code: string;
  name: string; // e.g. X IPA 1
  gradeLevel: string; // e.g. X, XI, XII
  homeroomTeacherId: string;
  homeroomTeacherName: string;
  capacity: number;
  academicYear: string; // e.g. 2026/2027
}

export interface SubjectMaster {
  id: string;
  schoolId: string;
  code: string;
  name: string;
  category: 'Wajib' | 'Pilihan' | 'Muatan Lokal' | 'Keagamaan';
  curriculumGroup: 'Kurikulum Merdeka' | 'K13';
  hoursPerWeek: number;
  gradeTarget: string;
}

export interface FacilityMaster {
  id: string;
  schoolId: string;
  code: string;
  name: string;
  type: 'Ruang Teori' | 'Laboratorium Komputer' | 'Lab IPA' | 'Perpustakaan' | 'Aula' | 'Lapangan';
  buildingName: string;
  capacity: number;
  condition: 'Sangat Baik' | 'Baik' | 'Perlu Perbaikan';
}

export interface MasterDataValidationError {
  field: string;
  message: string;
}

// User Management & RBAC Models
export type UserManagementSubTab =
  | 'users'
  | 'roles'
  | 'permissions'
  | 'menu_management'
  | 'role_matrix'
  | 'groups'
  | 'departments'
  | 'positions'
  | 'active_sessions'
  | 'login_history'
  | 'devices'
  | 'audit_logs'
  | 'security';

export interface UserManagementUser {
  id: string;
  username: string;
  name: string;
  email: string;
  phone: string;
  nip_nisn?: string;
  avatarUrl?: string;
  roleId: string;
  roleName: string;
  userGroupId: string;
  userGroupName: string;
  departmentId: string;
  departmentName: string;
  positionId: string;
  positionTitle: string;
  schoolId: string;
  schoolName: string;
  status: 'active' | 'inactive' | 'pending';
  onlineStatus: 'online' | 'offline';
  verifiedStatus: 'verified' | 'unverified';
  createdAt: string;
  lastLogin: string;
  mfaEnabled: boolean;
  mfaMethod?: 'email_otp' | 'sms_otp' | 'totp' | 'none';
}

export interface RoleModel {
  id: string;
  name: string;
  code: string;
  description: string;
  isSystemRole: boolean;
  userCount: number;
  permissionsCount: number;
}

export interface PermissionModel {
  id: string;
  module: 'Student' | 'Teacher' | 'Finance' | 'Academic' | 'User' | 'Audit' | 'Facility' | 'Settings';
  action: 'View' | 'Create' | 'Update' | 'Delete' | 'Export' | 'Import' | 'Approve';
  code: string; // e.g. Student.View
  name: string;
  description: string;
}

export interface UserGroupModel {
  id: string;
  name: string;
  code: string;
  description: string;
  userCount: number;
  createdDate: string;
}

export interface DepartmentModel {
  id: string;
  name: string;
  code: string;
  headName: string;
  staffCount: number;
  description: string;
}

export interface PositionModel {
  id: string;
  title: string;
  departmentName: string;
  level: string;
  totalHolders: number;
}

export interface MenuManagementItem {
  id: string;
  title: string;
  path: string;
  iconName: string;
  category: string;
  rolesAllowed: string[]; // Role IDs or Role codes
  isVisible: boolean;
  order: number;
}

export interface ActiveSessionModel {
  id: string;
  userId: string;
  userName: string;
  userRole: string;
  device: string;
  browser: string;
  os: string;
  ipAddress: string;
  location: string;
  loginTime: string;
  lastActive: string;
  isCurrent: boolean;
}

export interface LoginHistoryModel {
  id: string;
  userId: string;
  userName: string;
  role: string;
  timestamp: string;
  browser: string;
  device: string;
  ipAddress: string;
  status: 'Success' | 'Failed';
  failureReason?: string;
  location: string;
}

export interface DeviceModel {
  id: string;
  userId: string;
  userName: string;
  deviceName: string;
  deviceType: 'Desktop' | 'Mobile' | 'Tablet';
  os: string;
  browser: string;
  lastUsed: string;
  isTrusted: boolean;
  status: 'active' | 'blocked';
}

export interface AuditLogItem {
  id: string;
  timestamp: string;
  actorId: string;
  actorName: string;
  actorRole: string;
  action:
    | 'Login'
    | 'Logout'
    | 'Create'
    | 'Edit'
    | 'Delete'
    | 'Import'
    | 'Export'
    | 'Print'
    | 'PasswordReset'
    | 'PermissionChange'
    | 'SettingsChange';
  module: string;
  details: string;
  ipAddress: string;
}

// Global Enterprise Platform Interfaces
export interface GlobalRegion {
  id: string;
  code: string;
  name: string;
  datacenterRegion: string;
  activeTenantsCount: number;
  complianceStandard: 'GDPR' | 'UU_PDP_ID' | 'HIPAA' | 'SOC2' | 'CCPA';
  status: 'operational' | 'degraded' | 'maintenance';
}

export interface GlobalCountryConfig {
  id: string;
  countryCode: string; // ID, SG, MY, US, UK, AR, JP, etc.
  countryName: string;
  primaryLanguage: string;
  supportedLanguages: string[];
  currencyCode: string; // IDR, USD, SGD, MYR, EUR, SAR
  currencySymbol: string;
  timezone: string;
  academicStartMonth: string;
  taxRates: number;
  status: 'active' | 'beta' | 'planned';
}

export interface CurriculumFramework {
  id: string;
  code: string;
  name: string;
  type: 'National' | 'International' | 'Vocational' | 'Islamic' | 'Custom';
  countryCode: string;
  version: string;
  description: string;
  subjectsCount: number;
  gradeLevels: string[];
  accreditationBody: string;
  status: 'Active' | 'Draft' | 'Deprecated';
}

export interface DigitalCertificateCredential {
  id: string;
  recipientName: string;
  recipientNisnNip: string;
  credentialType: 'Diploma' | 'Transcript' | 'MicroCredential' | 'Badge' | 'TeacherCertification' | 'Honor';
  title: string;
  issuerSchoolName: string;
  issuedDate: string;
  qrVerificationUrl: string;
  blockchainTxHash?: string;
  verificationStatus: 'verified' | 'revoked' | 'pending';
}

export interface SmartCampusBuilding {
  id: string;
  code: string;
  name: string;
  floorsCount: number;
  roomsCount: number;
  occupancyRate: number;
  iotGatewayStatus: 'connected' | 'offline' | 'alert';
  emergencyStatus: 'normal' | 'fire_alarm' | 'lockdown';
}

export interface SmartCampusVisitor {
  id: string;
  visitorName: string;
  companyOrRelation: string;
  hostPerson: string;
  purpose: string;
  accessCardCode: string;
  entryTime: string;
  exitTime?: string;
  status: 'CheckedIn' | 'CheckedOut' | 'OverstayAlert';
}

export interface AiOrchestrationRoute {
  id: string;
  useCase: string; // e.g. 'RAG_RPS_Generator', 'Student_Tutor', 'Executive_BI'
  primaryModel: 'gemini-2.5-flash' | 'gemini-2.5-pro' | 'claude-3.5-sonnet' | 'gpt-4o' | 'local-llama-3';
  fallbackModel: string;
  latencyAvgMs: number;
  monthlyCostUSD: number;
  featureFlagKey: string;
  status: 'enabled' | 'disabled' | 'canary';
}



