import React, { useState } from 'react';
import { PpdbApplicant, PpdbApplicationStatus, PpdbTrackType } from '../../../types/ppdbTypes';
import {
  Users,
  Search,
  Filter,
  Plus,
  Eye,
  Edit,
  Trash2,
  QrCode,
  FileCheck,
  CheckCircle2,
  Clock,
  XCircle,
  Sparkles,
  Download,
  School,
  X,
  Phone,
  Mail,
  MapPin,
  Calendar,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';

interface ApplicantsTabProps {
  applicants: PpdbApplicant[];
  onAddApplicant: (applicant: PpdbApplicant) => void;
  onUpdateApplicant: (applicant: PpdbApplicant) => void;
  onDeleteApplicant: (id: string) => void;
}

export const ApplicantsTab: React.FC<ApplicantsTabProps> = ({
  applicants,
  onAddApplicant,
  onUpdateApplicant,
  onDeleteApplicant,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [selectedTrack, setSelectedTrack] = useState<string>('ALL');

  // Detail Modal
  const [viewingApplicant, setViewingApplicant] = useState<PpdbApplicant | null>(null);
  const [qrModalApplicant, setQrModalApplicant] = useState<PpdbApplicant | null>(null);

  // Stepper Wizard Registration Modal
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [wizardStep, setWizardStep] = useState(1);

  // Wizard Form State
  const [fullName, setFullName] = useState('');
  const [nik, setNik] = useState('');
  const [nisn, setNisn] = useState('');
  const [gender, setGender] = useState<'L' | 'P'>('L');
  const [birthPlace, setBirthPlace] = useState('');
  const [birthDate, setBirthDate] = useState('2010-01-01');
  const [religion, setReligion] = useState('Islam');
  const [targetLevel, setTargetLevel] = useState<any>('SMA');
  const [targetGrade, setTargetGrade] = useState('Kelas 10 MIPA');
  const [trackName, setTrackName] = useState<PpdbTrackType>('Reguler');
  const [originSchool, setOriginSchool] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [fatherName, setFatherName] = useState('');
  const [motherName, setMotherName] = useState('');
  const [address, setAddress] = useState('');
  const [province, setProvince] = useState('DKI Jakarta');
  const [city, setCity] = useState('Jakarta Selatan');

  const filteredApplicants = applicants.filter((a) => {
    const matchesSearch =
      a.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.registrationNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.nik.includes(searchQuery) ||
      a.nisn.includes(searchQuery) ||
      a.originSchoolName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = selectedStatus === 'ALL' || a.status === selectedStatus;
    const matchesTrack = selectedTrack === 'ALL' || a.trackName === selectedTrack;

    return matchesSearch && matchesStatus && matchesTrack;
  });

  const handleCreateApplicant = (e: React.FormEvent) => {
    e.preventDefault();
    const newRegNo = `PPDB-2026-${(applicants.length + 1).toString().padStart(4, '0')}`;
    const newApplicant: PpdbApplicant = {
      id: `app-${Date.now()}`,
      registrationNumber: newRegNo,
      schoolId: 'sch-1',
      schoolName: 'Smart School Enterprise',
      targetLevel,
      targetGrade,
      waveId: 'wave-1',
      waveName: 'Gelombang 1 (Early Bird)',
      trackName,
      nik,
      nisn,
      fullName,
      nickname: fullName.split(' ')[0],
      birthPlace,
      birthDate,
      gender,
      religion,
      address,
      province,
      city,
      district: 'Kebayoran',
      subDistrict: 'Dukuh',
      postalCode: '12110',
      originSchoolName: originSchool,
      phone,
      email,
      fatherName,
      fatherJob: 'Karyawan Swasta',
      fatherIncome: 'Rp 5.000.000 - Rp 10.000.000',
      motherName,
      motherJob: 'Ibu Rumah Tangga',
      motherIncome: '< Rp 2.000.000',
      photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      documents: {},
      qrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${newRegNo}`,
      status: 'Submitted',
      completenessScore: 85,
      academicScore: 85,
      testScore: 80,
      interviewScore: 85,
      achievementScore: 0,
      totalCompositeScore: 82.5,
      registrationFeePaid: false,
      paymentStatus: 'Unpaid',
      isReEnrolled: false,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
    };

    onAddApplicant(newApplicant);
    setIsWizardOpen(false);
    setWizardStep(1);
  };

  return (
    <div className="space-y-6">
      {/* Search & Action Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari Nama, No. Registrasi, NIK, NISN, Sekolah Asal..."
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300"
            >
              <option value="ALL">Semua Status</option>
              <option value="Submitted">Submitted</option>
              <option value="Verified">Verified</option>
              <option value="Tested">Tested</option>
              <option value="Passed">Lulus (Passed)</option>
              <option value="Failed">Ditolak (Failed)</option>
            </select>

            <select
              value={selectedTrack}
              onChange={(e) => setSelectedTrack(e.target.value)}
              className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300"
            >
              <option value="ALL">Semua Jalur</option>
              <option value="Prestasi">Prestasi</option>
              <option value="Reguler">Reguler</option>
              <option value="Afirmasi">Afirmasi</option>
              <option value="Zonasi">Zonasi</option>
              <option value="Tahfidz">Tahfidz</option>
            </select>

            <button
              onClick={() => {
                setIsWizardOpen(true);
                setWizardStep(1);
              }}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/20 transition-all flex items-center gap-1.5 shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Pendaftaran Baru (Wizard)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Applicants Table */}
      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-500 uppercase font-extrabold text-[10px] tracking-wider border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="px-4 py-3.5">Calon Siswa & No. Reg</th>
                <th className="px-4 py-3.5">NIK / NISN</th>
                <th className="px-4 py-3.5">Target Kelas</th>
                <th className="px-4 py-3.5">Jalur & Gelombang</th>
                <th className="px-4 py-3.5">Sekolah Asal</th>
                <th className="px-4 py-3.5">Status Brik</th>
                <th className="px-4 py-3.5">Pembayaran</th>
                <th className="px-4 py-3.5 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredApplicants.map((app) => (
                <tr
                  key={app.id}
                  className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={app.photoUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100'}
                        alt={app.fullName}
                        className="w-9 h-9 rounded-xl object-cover border border-slate-200 dark:border-slate-700"
                      />
                      <div>
                        <div className="font-extrabold text-slate-900 dark:text-white flex items-center gap-1">
                          <span>{app.fullName}</span>
                          <span className="text-[10px] text-slate-400 font-mono">({app.gender})</span>
                        </div>
                        <div className="text-[10px] text-blue-600 dark:text-blue-400 font-mono font-bold">
                          {app.registrationNumber}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="px-4 py-3 font-mono text-[11px] text-slate-600 dark:text-slate-300">
                    <div>NIK: {app.nik}</div>
                    <div className="text-[10px] text-slate-400">NISN: {app.nisn}</div>
                  </td>

                  <td className="px-4 py-3">
                    <span className="px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 font-bold text-slate-800 dark:text-slate-200">
                      {app.targetGrade}
                    </span>
                  </td>

                  <td className="px-4 py-3">
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-purple-50 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300 border border-purple-200/60">
                      {app.trackName}
                    </span>
                    <div className="text-[10px] text-slate-400 mt-0.5 truncate max-w-[120px]">
                      {app.waveName}
                    </div>
                  </td>

                  <td className="px-4 py-3 text-slate-600 dark:text-slate-300 truncate max-w-[140px]">
                    {app.originSchoolName}
                  </td>

                  <td className="px-4 py-3">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold ${
                        app.status === 'Passed'
                          ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400 border border-emerald-200'
                          : app.status === 'Verified'
                          ? 'bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400 border border-blue-200'
                          : app.status === 'Failed'
                          ? 'bg-rose-50 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400 border border-rose-200'
                          : 'bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400 border border-amber-200'
                      }`}
                    >
                      {app.status}
                    </span>
                  </td>

                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                        app.registrationFeePaid
                          ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300'
                          : 'bg-slate-100 text-slate-500 dark:bg-slate-800'
                      }`}
                    >
                      {app.registrationFeePaid ? 'Lunas Rp 250k' : 'Belum Bayar'}
                    </span>
                  </td>

                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => setViewingApplicant(app)}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/60 transition-colors"
                        title="Lihat Detail Siswa"
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => setQrModalApplicant(app)}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-950/60 transition-colors"
                        title="Lihat Kartu & QR Code"
                      >
                        <QrCode className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => onDeleteApplicant(app.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/60 transition-colors"
                        title="Hapus Data"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Applicant Modal */}
      {viewingApplicant && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full border border-slate-200 dark:border-slate-800 shadow-2xl p-6 space-y-6 my-8">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <img
                  src={viewingApplicant.photoUrl}
                  alt={viewingApplicant.fullName}
                  className="w-12 h-12 rounded-2xl object-cover border border-slate-200"
                />
                <div>
                  <h3 className="text-base font-black text-slate-900 dark:text-white">
                    {viewingApplicant.fullName}
                  </h3>
                  <span className="text-xs font-mono font-bold text-blue-600">
                    {viewingApplicant.registrationNumber}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setViewingApplicant(null)}
                className="p-2 rounded-xl text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Grid Information */}
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 space-y-2">
                <span className="font-extrabold uppercase text-slate-400 text-[10px] block">Data Identitas</span>
                <div><strong>NIK:</strong> {viewingApplicant.nik}</div>
                <div><strong>NISN:</strong> {viewingApplicant.nisn}</div>
                <div><strong>TTL:</strong> {viewingApplicant.birthPlace}, {viewingApplicant.birthDate}</div>
                <div><strong>Jenis Kelamin:</strong> {viewingApplicant.gender === 'L' ? 'Laki-Laki' : 'Perempuan'}</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 space-y-2">
                <span className="font-extrabold uppercase text-slate-400 text-[10px] block">Kontak & Alamat</span>
                <div><strong>HP:</strong> {viewingApplicant.phone}</div>
                <div><strong>Email:</strong> {viewingApplicant.email}</div>
                <div><strong>Alamat:</strong> {viewingApplicant.address}, {viewingApplicant.city}, {viewingApplicant.province}</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 space-y-2">
                <span className="font-extrabold uppercase text-slate-400 text-[10px] block">Data Orang Tua</span>
                <div><strong>Nama Ayah:</strong> {viewingApplicant.fatherName} ({viewingApplicant.fatherJob})</div>
                <div><strong>Nama Ibu:</strong> {viewingApplicant.motherName}</div>
                <div><strong>Penghasilan:</strong> {viewingApplicant.fatherIncome}</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 space-y-2">
                <span className="font-extrabold uppercase text-slate-400 text-[10px] block">Nilai Komposit AI</span>
                <div><strong>Nilai Rapor:</strong> {viewingApplicant.academicScore}</div>
                <div><strong>Nilai Tes:</strong> {viewingApplicant.testScore}</div>
                <div><strong>Nilai Wawancara:</strong> {viewingApplicant.interviewScore}</div>
                <div className="font-bold text-blue-600">Total Score: {viewingApplicant.totalCompositeScore}</div>
              </div>
            </div>

            <div className="flex items-center justify-end">
              <button
                onClick={() => setViewingApplicant(null)}
                className="px-5 py-2 rounded-xl font-bold bg-blue-600 text-white shadow-md text-xs"
              >
                Tutup Detail
              </button>
            </div>
          </div>
        </div>
      )}

      {/* QR Code Card Modal */}
      {qrModalApplicant && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-sm w-full border border-slate-200 dark:border-slate-800 shadow-2xl p-6 text-center space-y-4">
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">Kartu BUKTI PPDB 2026</h3>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 inline-block border border-slate-200">
              <img
                src={qrModalApplicant.qrCodeUrl}
                alt="QR Code Registrasi"
                className="w-40 h-40 mx-auto"
              />
            </div>
            <div>
              <h4 className="font-black text-slate-900 dark:text-white text-sm">{qrModalApplicant.fullName}</h4>
              <p className="text-xs font-mono font-bold text-blue-600">{qrModalApplicant.registrationNumber}</p>
              <p className="text-[11px] text-slate-500 mt-1">{qrModalApplicant.targetGrade} • {qrModalApplicant.schoolName}</p>
            </div>
            <button
              onClick={() => setQrModalApplicant(null)}
              className="w-full py-2 rounded-xl text-xs font-bold bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900"
            >
              Tutup QR Card
            </button>
          </div>
        </div>
      )}

      {/* Stepper Wizard Modal */}
      {isWizardOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full border border-slate-200 dark:border-slate-800 shadow-2xl p-6 space-y-6 my-8">
            {/* Header Stepper */}
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
              <div>
                <h3 className="text-base font-black text-slate-900 dark:text-white">
                  Form Pendaftaran Siswa Baru (PPDB Online)
                </h3>
                <p className="text-xs text-slate-500">Langkah {wizardStep} dari 3</p>
              </div>

              <button
                onClick={() => setIsWizardOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Stepper Bar */}
            <div className="flex items-center justify-between text-xs font-bold border-b border-slate-100 dark:border-slate-800 pb-4">
              <span className={`px-3 py-1 rounded-full ${wizardStep === 1 ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
                1. Data Pribadi Siswa
              </span>
              <ChevronRight className="w-4 h-4 text-slate-300" />
              <span className={`px-3 py-1 rounded-full ${wizardStep === 2 ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
                2. Jalur & Sekolah Asal
              </span>
              <ChevronRight className="w-4 h-4 text-slate-300" />
              <span className={`px-3 py-1 rounded-full ${wizardStep === 3 ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
                3. Orang Tua & Kontak
              </span>
            </div>

            <form onSubmit={handleCreateApplicant} className="space-y-4 text-xs">
              {wizardStep === 1 && (
                <div className="space-y-3">
                  <div>
                    <label className="font-bold text-slate-700 dark:text-slate-300">Nama Lengkap Siswa</label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Sesuai Akta Kelahiran"
                      className="w-full mt-1 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="font-bold text-slate-700 dark:text-slate-300">NIK (16 Digit)</label>
                      <input
                        type="text"
                        value={nik}
                        onChange={(e) => setNik(e.target.value)}
                        placeholder="317101..."
                        className="w-full mt-1 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                        required
                      />
                    </div>
                    <div>
                      <label className="font-bold text-slate-700 dark:text-slate-300">NISN (10 Digit)</label>
                      <input
                        type="text"
                        value={nisn}
                        onChange={(e) => setNisn(e.target.value)}
                        placeholder="008123..."
                        className="w-full mt-1 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="font-bold text-slate-700 dark:text-slate-300">Tempat Lahir</label>
                      <input
                        type="text"
                        value={birthPlace}
                        onChange={(e) => setBirthPlace(e.target.value)}
                        placeholder="e.g. Jakarta"
                        className="w-full mt-1 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                        required
                      />
                    </div>
                    <div>
                      <label className="font-bold text-slate-700 dark:text-slate-300">Tanggal Lahir</label>
                      <input
                        type="date"
                        value={birthDate}
                        onChange={(e) => setBirthDate(e.target.value)}
                        className="w-full mt-1 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

              {wizardStep === 2 && (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="font-bold text-slate-700 dark:text-slate-300">Jenjang Tujuan</label>
                      <select
                        value={targetLevel}
                        onChange={(e) => setTargetLevel(e.target.value as any)}
                        className="w-full mt-1 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-bold"
                      >
                        <option value="PAUD">PAUD</option>
                        <option value="TK">TK</option>
                        <option value="SD">SD</option>
                        <option value="SMP">SMP</option>
                        <option value="SMA">SMA</option>
                        <option value="SMK">SMK</option>
                        <option value="Pesantren">Pesantren</option>
                      </select>
                    </div>

                    <div>
                      <label className="font-bold text-slate-700 dark:text-slate-300">Jalur Pendaftaran</label>
                      <select
                        value={trackName}
                        onChange={(e) => setTrackName(e.target.value as PpdbTrackType)}
                        className="w-full mt-1 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-bold"
                      >
                        <option value="Prestasi">Prestasi</option>
                        <option value="Reguler">Reguler</option>
                        <option value="Afirmasi">Afirmasi</option>
                        <option value="Zonasi">Zonasi</option>
                        <option value="Tahfidz">Tahfidz</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 dark:text-slate-300">Nama Sekolah Asal</label>
                    <input
                      type="text"
                      value={originSchool}
                      onChange={(e) => setOriginSchool(e.target.value)}
                      placeholder="e.g. SMP Negeri 1 Jakarta"
                      className="w-full mt-1 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                      required
                    />
                  </div>
                </div>
              )}

              {wizardStep === 3 && (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="font-bold text-slate-700 dark:text-slate-300">Nama Ayah</label>
                      <input
                        type="text"
                        value={fatherName}
                        onChange={(e) => setFatherName(e.target.value)}
                        className="w-full mt-1 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                        required
                      />
                    </div>
                    <div>
                      <label className="font-bold text-slate-700 dark:text-slate-300">Nama Ibu</label>
                      <input
                        type="text"
                        value={motherName}
                        onChange={(e) => setMotherName(e.target.value)}
                        className="w-full mt-1 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="font-bold text-slate-700 dark:text-slate-300">Nomor HP / WhatsApp</label>
                      <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="0812..."
                        className="w-full mt-1 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                        required
                      />
                    </div>
                    <div>
                      <label className="font-bold text-slate-700 dark:text-slate-300">Email Aktif</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="email@gmail.com"
                        className="w-full mt-1 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Wizard Nav Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                {wizardStep > 1 ? (
                  <button
                    type="button"
                    onClick={() => setWizardStep(wizardStep - 1)}
                    className="px-4 py-2 rounded-xl font-bold bg-slate-100 text-slate-600 flex items-center gap-1"
                  >
                    <ChevronLeft className="w-4 h-4" /> Kembali
                  </button>
                ) : <div />}

                {wizardStep < 3 ? (
                  <button
                    type="button"
                    onClick={() => setWizardStep(wizardStep + 1)}
                    className="px-5 py-2 rounded-xl font-bold bg-blue-600 text-white shadow flex items-center gap-1"
                  >
                    Lanjut <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="px-6 py-2 rounded-xl font-extrabold bg-emerald-600 hover:bg-emerald-700 text-white shadow-md"
                  >
                    Kirim Pendaftaran
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
