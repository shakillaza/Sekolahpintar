import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  UserCheck,
  Award,
  BookOpen,
  Calendar,
  FileText,
  Clock,
  Briefcase,
  GraduationCap,
  ShieldAlert,
  Printer,
  QrCode,
  CreditCard,
  Building,
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
  Sparkles,
  DollarSign,
  Download,
  Share2
} from 'lucide-react';
import {
  TeacherMasterItem,
  EmployeeMasterItem,
  TeacherBiodataItem,
  TeacherEducationHistory,
  TeacherCertification,
  TeacherAssignment,
  TeacherSchedule,
  TeacherAttendanceRecord,
  TeacherPerformanceRecord,
  TeacherProfessionalDev,
  TeacherAchievementRecord,
  TeacherDocumentRecord,
  TeacherPayrollProfile,
  TeacherAiNote
} from '../../types/teacherTypes';

interface TeacherDetailDrawerProps {
  item: TeacherMasterItem | EmployeeMasterItem | null;
  biodata?: TeacherBiodataItem;
  educations?: TeacherEducationHistory[];
  certifications?: TeacherCertification[];
  assignments?: TeacherAssignment[];
  schedules?: TeacherSchedule[];
  attendances?: TeacherAttendanceRecord[];
  performance?: TeacherPerformanceRecord;
  profDevs?: TeacherProfessionalDev[];
  achievements?: TeacherAchievementRecord[];
  documents?: TeacherDocumentRecord[];
  payroll?: TeacherPayrollProfile;
  aiNote?: TeacherAiNote;
  onClose: () => void;
  onPrintIdCard: (item: TeacherMasterItem | EmployeeMasterItem) => void;
}

export const TeacherDetailDrawer: React.FC<TeacherDetailDrawerProps> = ({
  item,
  biodata,
  educations = [],
  certifications = [],
  assignments = [],
  schedules = [],
  attendances = [],
  performance,
  profDevs = [],
  achievements = [],
  documents = [],
  payroll,
  aiNote,
  onClose,
  onPrintIdCard,
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'academic' | 'performance' | 'documents' | 'payroll' | 'ai'>('profile');

  if (!item) return null;

  const isTeacher = 'nuptk' in item;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/60 backdrop-blur-sm flex justify-end">
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="w-full max-w-3xl bg-white dark:bg-slate-900 h-full shadow-2xl flex flex-col border-l border-slate-200 dark:border-slate-800 overflow-hidden"
        >
          {/* Top Header */}
          <div className="px-6 py-5 bg-gradient-to-r from-indigo-900 via-slate-900 to-slate-950 text-white flex items-center justify-between border-b border-indigo-800/50">
            <div className="flex items-center gap-4">
              <img
                src={item.photoUrl}
                alt={item.fullName}
                className="w-14 h-14 rounded-full object-cover ring-2 ring-indigo-400/50 shadow-md"
              />
              <div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${
                    isTeacher ? 'bg-indigo-500/30 text-indigo-200 border border-indigo-400/30' : 'bg-emerald-500/30 text-emerald-200 border border-emerald-400/30'
                  }`}>
                    {isTeacher ? 'TENAGA PENDIDIK (GURU)' : 'TENAGA KEPENDIDIKAN (PEGAWAI)'}
                  </span>
                  <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${
                    item.isActive ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
                  }`}>
                    {item.isActive ? 'AKTIF' : 'NON-AKTIF'}
                  </span>
                </div>
                <h2 className="text-xl font-bold tracking-tight text-white mt-1">
                  {item.fullName}
                </h2>
                <p className="text-xs text-indigo-200/80 font-mono">
                  NIP: {item.nip} {isTeacher && `• NUPTK: ${item.nuptk}`}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onPrintIdCard(item)}
                className="px-3 py-1.5 text-xs font-medium bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
              >
                <Printer className="w-3.5 h-3.5" />
                Cetak ID Card
              </button>
              <button
                onClick={onClose}
                className="p-1.5 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="px-6 bg-slate-100 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 flex items-center gap-1 overflow-x-auto text-xs font-medium text-slate-600 dark:text-slate-400">
            <button
              onClick={() => setActiveTab('profile')}
              className={`px-4 py-3 border-b-2 flex items-center gap-1.5 transition-colors whitespace-nowrap ${
                activeTab === 'profile'
                  ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 font-semibold'
                  : 'border-transparent hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <UserCheck className="w-4 h-4" />
              Profil & Biodata
            </button>
            <button
              onClick={() => setActiveTab('academic')}
              className={`px-4 py-3 border-b-2 flex items-center gap-1.5 transition-colors whitespace-nowrap ${
                activeTab === 'academic'
                  ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 font-semibold'
                  : 'border-transparent hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              Pendidikan & Penugasan
            </button>
            <button
              onClick={() => setActiveTab('performance')}
              className={`px-4 py-3 border-b-2 flex items-center gap-1.5 transition-colors whitespace-nowrap ${
                activeTab === 'performance'
                  ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 font-semibold'
                  : 'border-transparent hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <Award className="w-4 h-4" />
              Kinerja & SKP
            </button>
            <button
              onClick={() => setActiveTab('documents')}
              className={`px-4 py-3 border-b-2 flex items-center gap-1.5 transition-colors whitespace-nowrap ${
                activeTab === 'documents'
                  ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 font-semibold'
                  : 'border-transparent hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <FileText className="w-4 h-4" />
              Berkas & Dokumen
            </button>
            <button
              onClick={() => setActiveTab('payroll')}
              className={`px-4 py-3 border-b-2 flex items-center gap-1.5 transition-colors whitespace-nowrap ${
                activeTab === 'payroll'
                  ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 font-semibold'
                  : 'border-transparent hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <DollarSign className="w-4 h-4" />
              Payroll
            </button>
            <button
              onClick={() => setActiveTab('ai')}
              className={`px-4 py-3 border-b-2 flex items-center gap-1.5 transition-colors whitespace-nowrap text-purple-600 dark:text-purple-400 ${
                activeTab === 'ai'
                  ? 'border-purple-600 text-purple-700 dark:text-purple-300 font-bold bg-purple-50 dark:bg-purple-950/40'
                  : 'border-transparent hover:text-purple-700'
              }`}
            >
              <Sparkles className="w-4 h-4 animate-pulse text-purple-500" />
              Analisis AI
            </button>
          </div>

          {/* Drawer Body Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 text-slate-800 dark:text-slate-200 text-sm">
            {activeTab === 'profile' && (
              <div className="space-y-6">
                {/* General Info Grid */}
                <div className="bg-slate-50 dark:bg-slate-800/40 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                    Informasi Kepegawaian Utama
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-xs text-slate-500 dark:text-slate-400 block">Jabatan / Posisi</span>
                      <span className="font-semibold text-slate-900 dark:text-slate-100">{item.position}</span>
                    </div>
                    <div>
                      <span className="text-xs text-slate-500 dark:text-slate-400 block">Status Kepegawaian</span>
                      <span className="font-medium">{item.employmentStatus}</span>
                    </div>
                    {isTeacher && (
                      <>
                        <div>
                          <span className="text-xs text-slate-500 dark:text-slate-400 block">Mata Pelajaran Utama</span>
                          <span className="font-medium">{(item as TeacherMasterItem).subject}</span>
                        </div>
                        <div>
                          <span className="text-xs text-slate-500 dark:text-slate-400 block">Golongan / Pangkat</span>
                          <span className="font-medium">{(item as TeacherMasterItem).rankClass}</span>
                        </div>
                        <div>
                          <span className="text-xs text-slate-500 dark:text-slate-400 block">Beban Mengajar</span>
                          <span className="font-medium">{(item as TeacherMasterItem).teachingHoursPerWeek} Jam / Minggu</span>
                        </div>
                      </>
                    )}
                    <div>
                      <span className="text-xs text-slate-500 dark:text-slate-400 block">Tanggal Bergabung</span>
                      <span className="font-medium">{item.joinDate}</span>
                    </div>
                    <div>
                      <span className="text-xs text-slate-500 dark:text-slate-400 block">Unit / Sekolah</span>
                      <span className="font-medium">{item.schoolName}</span>
                    </div>
                  </div>
                </div>

                {/* Contact & Personal */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-3">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Kontak & Alamat</h4>
                    <div className="flex items-center gap-2 text-xs">
                      <Phone className="w-4 h-4 text-indigo-500" />
                      <span>{item.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <Mail className="w-4 h-4 text-indigo-500" />
                      <span>{item.email}</span>
                    </div>
                    <div className="flex items-start gap-2 text-xs">
                      <MapPin className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                      <span>{item.address}</span>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-3">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Biodata Keluarga</h4>
                    {biodata ? (
                      <div className="space-y-1 text-xs">
                        <p><span className="text-slate-400">Status Pernikahan:</span> {biodata.maritalStatus}</p>
                        {biodata.spouseName && <p><span className="text-slate-400">Pasangan:</span> {biodata.spouseName}</p>}
                        <p><span className="text-slate-400">Jumlah Anak:</span> {biodata.childrenCount} Orang</p>
                        <p><span className="text-slate-400">Kontak Darurat:</span> {biodata.emergencyContactName} ({biodata.emergencyContactPhone})</p>
                      </div>
                    ) : (
                      <p className="text-xs text-slate-400 italic">Biodata belum dilengkapi</p>
                    )}
                  </div>
                </div>

                {/* QR & Barcode Preview */}
                <div className="bg-slate-50 dark:bg-slate-800/40 p-4 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-white rounded-lg shadow-sm border border-slate-200">
                      <img src={item.qrCodeUrl} alt="QR Code" className="w-16 h-16" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300">Identifikasi Presensi Digital</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Mendukung Scan QR Code & Tap RFID Smart Card</p>
                      {item.rfidCardId && (
                        <span className="inline-block mt-1 font-mono text-[11px] bg-slate-200 dark:bg-slate-700 px-2 py-0.5 rounded text-slate-700 dark:text-slate-300">
                          RFID ID: {item.rfidCardId}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'academic' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-3 flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-indigo-600" />
                    Riwayat Pendidikan
                  </h3>
                  <div className="space-y-2">
                    {educations.length > 0 ? (
                      educations.map((edu) => (
                        <div key={edu.id} className="p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 flex justify-between items-center">
                          <div>
                            <span className="px-2 py-0.5 text-[10px] font-bold bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 rounded">
                              {edu.level}
                            </span>
                            <h4 className="font-semibold text-slate-900 dark:text-slate-100 mt-1">{edu.institutionName}</h4>
                            <p className="text-xs text-slate-500">{edu.major || 'Semua Jurusan'} • Lulus {edu.graduationYear}</p>
                          </div>
                          {edu.certificateNo && (
                            <span className="text-xs text-slate-400 font-mono">{edu.certificateNo}</span>
                          )}
                        </div>
                      ))
                    ) : (
                      <p className="text-xs text-slate-400 italic">Belum ada riwayat pendidikan terdaftar</p>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-3 flex items-center gap-2">
                    <Award className="w-4 h-4 text-amber-500" />
                    Sertifikasi & Lisensi
                  </h3>
                  <div className="space-y-2">
                    {certifications.length > 0 ? (
                      certifications.map((cert) => (
                        <div key={cert.id} className="p-3 bg-amber-50/50 dark:bg-amber-950/20 rounded-lg border border-amber-200 dark:border-amber-800/40 flex justify-between items-center">
                          <div>
                            <h4 className="font-semibold text-amber-900 dark:text-amber-200">{cert.certType}</h4>
                            <p className="text-xs text-amber-700 dark:text-amber-400">Penerbit: {cert.issuingInstitution} • No: {cert.certNumber}</p>
                            <p className="text-[11px] text-slate-500 mt-0.5">Berlaku: {cert.issueDate} s/d {cert.expiryDate || 'Seumur Hidup'}</p>
                          </div>
                          <span className="px-2 py-1 text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 rounded">
                            {cert.isActive ? 'AKTIF' : 'EXPIRED'}
                          </span>
                        </div>
                      ))
                    ) : (
                      <p className="text-xs text-slate-400 italic">Belum ada sertifikasi terdaftar</p>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-3 flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-indigo-600" />
                    Penugasan Tambahan & SK
                  </h3>
                  <div className="space-y-2">
                    {assignments.length > 0 ? (
                      assignments.map((asg) => (
                        <div key={asg.id} className="p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                          <div className="flex justify-between items-start">
                            <span className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold">{asg.schoolYear} ({asg.semester})</span>
                            <span className="text-xs font-mono text-slate-400">{asg.decreeNumber}</span>
                          </div>
                          <div className="flex flex-wrap gap-1.5 mt-2">
                            {asg.roles.map((role, idx) => (
                              <span key={idx} className="px-2 py-0.5 text-xs bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-md font-medium">
                                {role}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-xs text-slate-400 italic">Belum ada riwayat SK penugasan</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'performance' && (
              <div className="space-y-6">
                {performance ? (
                  <div className="space-y-4">
                    <div className="bg-gradient-to-br from-indigo-500 to-indigo-700 text-white p-6 rounded-2xl shadow-lg flex items-center justify-between">
                      <div>
                        <span className="text-xs uppercase tracking-wider text-indigo-100 font-semibold">Skor Akhir Kinerja SKP</span>
                        <div className="text-4xl font-extrabold mt-1">{performance.finalScore} / 100</div>
                        <p className="text-xs text-indigo-100 mt-1">Evaluasi Periode: {performance.period}</p>
                      </div>
                      <div className="text-right">
                        <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md text-white font-bold rounded-xl text-sm">
                          {performance.principalRating}
                        </span>
                        <p className="text-xs text-indigo-100 mt-2">Penilaian Yayasan: {performance.foundationRating}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-xl border border-slate-200 dark:border-slate-700 text-center">
                        <span className="text-xs text-slate-500">Kedisiplinan</span>
                        <div className="text-lg font-bold text-emerald-600">{performance.disciplineScore}%</div>
                      </div>
                      <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-xl border border-slate-200 dark:border-slate-700 text-center">
                        <span className="text-xs text-slate-500">Produktivitas</span>
                        <div className="text-lg font-bold text-indigo-600">{performance.productivityScore}%</div>
                      </div>
                      <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-xl border border-slate-200 dark:border-slate-700 text-center">
                        <span className="text-xs text-slate-500">Presensi</span>
                        <div className="text-lg font-bold text-blue-600">{performance.attendanceScore}%</div>
                      </div>
                      <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-xl border border-slate-200 dark:border-slate-700 text-center">
                        <span className="text-xs text-slate-500">Capaian Target</span>
                        <div className="text-lg font-bold text-purple-600">{performance.targetAchievement}%</div>
                      </div>
                    </div>

                    <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Catatan Kepala Sekolah</h4>
                      <p className="text-xs text-slate-600 dark:text-slate-300 italic">"{performance.evaluatorNotes}"</p>
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-slate-400 italic">Data kinerja SKP belum diinput untuk periode berjalan.</p>
                )}
              </div>
            )}

            {activeTab === 'documents' && (
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center justify-between">
                  <span>Berkas Dokumen Pendukung ({documents.length})</span>
                  <button className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">
                    + Upload Berkas Baru
                  </button>
                </h3>
                <div className="space-y-2">
                  {documents.length > 0 ? (
                    documents.map((doc) => (
                      <div key={doc.id} className="p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <FileText className="w-8 h-8 text-indigo-500 bg-indigo-50 dark:bg-indigo-950 p-1.5 rounded-lg" />
                          <div>
                            <h4 className="font-semibold text-slate-900 dark:text-slate-100 text-xs">{doc.fileName}</h4>
                            <p className="text-[11px] text-slate-500">{doc.docType} • {doc.fileSizeMB} MB • Versi {doc.version}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 text-[10px] bg-emerald-100 text-emerald-800 rounded font-medium">
                            {doc.status}
                          </span>
                          <button className="p-1.5 text-slate-500 hover:text-indigo-600 rounded">
                            <Download className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-slate-400 italic">Belum ada dokumen yang diunggah.</p>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'payroll' && (
              <div className="space-y-4">
                {payroll ? (
                  <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700 space-y-4">
                    <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-700 pb-3">
                      <div>
                        <h4 className="font-bold text-slate-900 dark:text-slate-100">{payroll.bankName}</h4>
                        <p className="text-xs text-slate-500">No. Rekening: <span className="font-mono font-bold text-slate-800 dark:text-slate-200">{payroll.accountNumber}</span></p>
                      </div>
                      <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full">
                        {payroll.payrollStatus}
                      </span>
                    </div>

                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                        <span className="text-slate-500">Gaji Pokok</span>
                        <span className="font-semibold">Rp {payroll.baseSalary.toLocaleString('id-ID')}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                        <span className="text-slate-500">Tunjangan Jabatan</span>
                        <span className="font-semibold text-emerald-600">+ Rp {payroll.allowancePosition.toLocaleString('id-ID')}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                        <span className="text-slate-500">Tunjangan Sertifikasi</span>
                        <span className="font-semibold text-emerald-600">+ Rp {payroll.allowanceCertification.toLocaleString('id-ID')}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                        <span className="text-slate-500">Tunjangan Transportasi</span>
                        <span className="font-semibold text-emerald-600">+ Rp {payroll.allowanceTransport.toLocaleString('id-ID')}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                        <span className="text-slate-500">Potongan PPh 21</span>
                        <span className="font-semibold text-rose-500">- Rp {payroll.deductionPph21.toLocaleString('id-ID')}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                        <span className="text-slate-500">Potongan BPJS</span>
                        <span className="font-semibold text-rose-500">- Rp {payroll.deductionBpjs.toLocaleString('id-ID')}</span>
                      </div>
                      <div className="flex justify-between py-2 pt-3 font-bold text-sm text-indigo-600 dark:text-indigo-400 border-t border-slate-200 dark:border-slate-700">
                        <span>Total Gaji Bersih (Take Home Pay)</span>
                        <span>Rp {payroll.netSalary.toLocaleString('id-ID')}</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-slate-400 italic">Profil payroll belum dikonfigurasi.</p>
                )}
              </div>
            )}

            {activeTab === 'ai' && (
              <div className="space-y-4">
                {aiNote ? (
                  <div className="space-y-4">
                    <div className="bg-gradient-to-br from-purple-900 via-indigo-900 to-slate-900 text-white p-5 rounded-xl border border-purple-500/30 shadow-lg">
                      <div className="flex items-center gap-2 text-purple-300 font-bold text-xs uppercase mb-2">
                        <Sparkles className="w-4 h-4 text-purple-400 animate-spin" />
                        Executive Smart AI Profiling
                      </div>
                      <p className="text-xs leading-relaxed text-purple-100">{aiNote.profileSummary}</p>
                    </div>

                    <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-3">
                      <h4 className="text-xs font-bold text-slate-400 uppercase">Analisis Beban Kerja & Jam Mengajar</h4>
                      <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">{aiNote.workloadAnalysis}</p>
                      <p className="text-xs text-slate-600 dark:text-slate-300">{aiNote.scheduleDistributionRec}</p>
                    </div>

                    <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-3">
                      <h4 className="text-xs font-bold text-slate-400 uppercase">Rekomendasi Pelatihan Profesi</h4>
                      <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                        {aiNote.trainingRecommendations.map((rec, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                            <span>{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-purple-50 dark:bg-purple-950/40 p-4 rounded-xl border border-purple-200 dark:border-purple-800/40">
                      <h4 className="text-xs font-bold text-purple-900 dark:text-purple-300 uppercase mb-1">Ringkasan Evaluasi Otomatis</h4>
                      <p className="text-xs text-purple-800 dark:text-purple-200">{aiNote.autoEvaluationSummary}</p>
                    </div>
                  </div>
                ) : (
                  <div className="p-8 text-center text-slate-400 space-y-3">
                    <Sparkles className="w-10 h-10 mx-auto text-purple-400 animate-bounce" />
                    <p className="text-xs">Klik tombol di bawah untuk menghasilkan analisis Smart AI otomatis untuk guru ini.</p>
                    <button className="px-4 py-2 bg-purple-600 text-white rounded-lg text-xs font-semibold hover:bg-purple-500">
                      Generate Smart AI Insights
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
