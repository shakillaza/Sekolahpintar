import React, { useState } from 'react';
import { StudentMasterItem } from '../../../types/studentTypes';
import {
  Search,
  Filter,
  Plus,
  Download,
  Printer,
  QrCode,
  Barcode,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  CheckSquare,
  Square,
  ChevronLeft,
  ChevronRight,
  School,
  X,
  UserCheck,
  Award,
  AlertCircle
} from 'lucide-react';

interface DataSiswaTabProps {
  students: StudentMasterItem[];
  onSelectStudent: (student: StudentMasterItem) => void;
  onAddStudent: (newStudent: StudentMasterItem) => void;
  onUpdateStudent: (updated: StudentMasterItem) => void;
  onDeleteStudent: (id: string) => void;
}

export const DataSiswaTab: React.FC<DataSiswaTabProps> = ({
  students,
  onSelectStudent,
  onAddStudent,
  onUpdateStudent,
  onDeleteStudent,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<string>('ALL');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [selectedGender, setSelectedGender] = useState<string>('ALL');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Modal Wizard State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<StudentMasterItem | null>(null);

  // Form fields
  const [formNis, setFormNis] = useState('');
  const [formNisn, setFormNisn] = useState('');
  const [formName, setFormName] = useState('');
  const [formGender, setFormGender] = useState<'L' | 'P'>('L');
  const [formClass, setFormClass] = useState('');
  const [formLevel, setFormLevel] = useState<'PAUD' | 'TK' | 'SD' | 'SMP' | 'SMA' | 'SMK' | 'Pesantren'>('SMA');
  const [formMajor, setFormMajor] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formStatus, setFormStatus] = useState<any>('Aktif');
  const [formError, setFormError] = useState('');

  // Filter logic
  const filteredStudents = students.filter((s) => {
    const matchesSearch =
      s.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.nis.includes(searchTerm) ||
      s.nisn.includes(searchTerm) ||
      s.className.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesLevel = selectedLevel === 'ALL' || s.schoolLevel === selectedLevel;
    const matchesStatus = selectedStatus === 'ALL' || s.status === selectedStatus;
    const matchesGender = selectedGender === 'ALL' || s.gender === selectedGender;

    return matchesSearch && matchesLevel && matchesStatus && matchesGender;
  });

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredStudents.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredStudents.map((s) => s.id));
    }
  };

  const toggleSelectOne = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((i) => i !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleOpenAddModal = () => {
    setEditingStudent(null);
    setFormNis(`2025${Math.floor(1000 + Math.random() * 9000)}`);
    setFormNisn(`009${Math.floor(1000001 + Math.random() * 8999999)}`);
    setFormName('');
    setFormGender('L');
    setFormClass('X MIPA 1');
    setFormLevel('SMA');
    setFormMajor('MIPA');
    setFormPhone('081234567890');
    setFormEmail('');
    setFormStatus('Aktif');
    setFormError('');
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (student: StudentMasterItem) => {
    setEditingStudent(student);
    setFormNis(student.nis);
    setFormNisn(student.nisn);
    setFormName(student.fullName);
    setFormGender(student.gender);
    setFormClass(student.className);
    setFormLevel(student.schoolLevel as any);
    setFormMajor(student.targetMajor || '');
    setFormPhone(student.phoneNumber);
    setFormEmail(student.email);
    setFormStatus(student.status);
    setFormError('');
    setIsModalOpen(true);
  };

  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) {
      setFormError('Nama lengkap siswa wajib diisi');
      return;
    }
    if (!formNis.trim() || !formNisn.trim()) {
      setFormError('NIS dan NISN wajib diisi');
      return;
    }

    if (editingStudent) {
      const updated: StudentMasterItem = {
        ...editingStudent,
        nis: formNis,
        nisn: formNisn,
        fullName: formName,
        gender: formGender,
        className: formClass,
        schoolLevel: formLevel as any,
        targetMajor: formMajor,
        phoneNumber: formPhone,
        email: formEmail,
        status: formStatus,
      };
      onUpdateStudent(updated);
    } else {
      const newStudent: StudentMasterItem = {
        id: `std-${Date.now()}`,
        schoolId: 'sch-001',
        schoolName: 'Sekolah Enterprise Utama',
        schoolLevel: formLevel as any,
        nis: formNis,
        nisn: formNisn,
        fullName: formName,
        nickname: formName.split(' ')[0],
        gender: formGender,
        birthPlace: 'Jakarta',
        birthDate: '2009-01-01',
        religion: 'Islam',
        bloodType: 'O',
        citizenship: 'WNI',
        nativeLanguage: 'Bahasa Indonesia',
        status: formStatus,
        studentType: 'Siswa Baru',
        targetMajor: formMajor,
        className: formClass,
        rollNumber: filteredStudents.length + 1,
        entryDate: new Date().toISOString().split('T')[0],
        originSchool: 'SMP Negeri Terpadu',
        photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
        qrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${formNis}`,
        barcodeUrl: `https://bwipjs-api.metafloor.com/?bcid=code128&text=${formNis}`,
        domicileAddress: 'Jl. Merdeka No. 10',
        ktpAddress: 'Jl. Merdeka No. 10',
        province: 'DKI Jakarta',
        regencyCity: 'Jakarta Pusat',
        district: 'Gambir',
        village: 'Petojo',
        postalCode: '10110',
        phoneNumber: formPhone,
        email: formEmail || `${formName.toLowerCase().replace(/\s+/g, '.')}@student.sch.id`,
        childOrder: 1,
        siblingsCount: 1,
        heightCm: 165,
        weightKg: 55,
        hobbies: ['Membaca'],
        aspirations: 'Cita-Cita Utama',
        specialNeeds: 'Tidak Ada',
        father: {
          nik: '3171011508750009',
          name: 'Bapak Student',
          education: 'S1',
          occupation: 'Wiraswasta',
          monthlyIncome: 'Rp 5.000.000 - Rp 10.000.000',
          phone: formPhone,
          email: 'orangtua@gmail.com',
          address: 'Jl. Merdeka No. 10',
          relationship: 'Ayah Kandung',
        },
        mother: {
          nik: '3171011508750010',
          name: 'Ibu Student',
          education: 'S1',
          occupation: 'Ibu Rumah Tangga',
          monthlyIncome: '< Rp 3.000.000',
          phone: formPhone,
          email: 'orangtua@gmail.com',
          address: 'Jl. Merdeka No. 10',
          relationship: 'Ibu Kandung',
        },
        attendancePercentage: 100,
        gpaAverage: 85.0,
        totalViolationPoints: 0,
        totalAchievementPoints: 0,
        healthScore: 95,
        aiDropoutRiskScore: 1.0,
        aiPerformanceStatus: 'Stabil Sangat Baik',
      };
      onAddStudent(newStudent);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-4">
      {/* Search & Action Bar */}
      <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Cari Nama, NIS, NISN, atau Kelas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Filter Dropdowns */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="px-3 py-2 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200"
            >
              <option value="ALL">Semua Jenjang</option>
              <option value="PAUD">PAUD</option>
              <option value="TK">TK</option>
              <option value="SD">SD</option>
              <option value="SMP">SMP</option>
              <option value="SMA">SMA</option>
              <option value="SMK">SMK</option>
              <option value="Pesantren">Pesantren</option>
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200"
            >
              <option value="ALL">Semua Status</option>
              <option value="Aktif">Aktif</option>
              <option value="Baru">Siswa Baru</option>
              <option value="Pindahan">Siswa Pindahan</option>
              <option value="Lulus">Lulus</option>
            </select>

            <select
              value={selectedGender}
              onChange={(e) => setSelectedGender(e.target.value)}
              className="px-3 py-2 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200"
            >
              <option value="ALL">Gender (Semua)</option>
              <option value="L">Laki-Laki (L)</option>
              <option value="P">Perempuan (P)</option>
            </select>

            {/* Add Student Button */}
            <button
              onClick={handleOpenAddModal}
              className="px-4 py-2 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-md transition-all ml-auto md:ml-0"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Siswa</span>
            </button>
          </div>
        </div>

        {/* Selected Count & Bulk Actions */}
        {selectedIds.length > 0 && (
          <div className="p-2.5 rounded-2xl bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 flex items-center justify-between text-xs">
            <span className="font-bold text-blue-900 dark:text-blue-200">
              {selectedIds.length} Siswa Terpilih
            </span>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1 rounded-xl bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold border border-slate-200 dark:border-slate-700 flex items-center gap-1">
                <Printer className="w-3.5 h-3.5 text-blue-600" />
                <span>Cetak Kartu Bulk</span>
              </button>
              <button className="px-3 py-1 rounded-xl bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold border border-slate-200 dark:border-slate-700 flex items-center gap-1">
                <Download className="w-3.5 h-3.5 text-emerald-600" />
                <span>Export Excel</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Main Data Table */}
      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200/80 dark:border-slate-700/80 text-slate-500 font-bold uppercase tracking-wider">
              <tr>
                <th className="p-3.5 w-10 text-center">
                  <button onClick={toggleSelectAll} className="p-1 text-slate-400 hover:text-slate-600">
                    {selectedIds.length === filteredStudents.length && filteredStudents.length > 0 ? (
                      <CheckSquare className="w-4 h-4 text-blue-600" />
                    ) : (
                      <Square className="w-4 h-4" />
                    )}
                  </button>
                </th>
                <th className="p-3.5">Siswa</th>
                <th className="p-3.5">NIS / NISN</th>
                <th className="p-3.5">Jenjang / Kelas</th>
                <th className="p-3.5">Jurusan / Peminatan</th>
                <th className="p-3.5">Sekolah Asal</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-slate-400">
                    Tidak ada data siswa ditemukan untuk kriteria pencarian ini.
                  </td>
                </tr>
              ) : (
                filteredStudents.map((s) => {
                  const isSelected = selectedIds.includes(s.id);
                  return (
                    <tr
                      key={s.id}
                      className={`hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors ${
                        isSelected ? 'bg-blue-50/40 dark:bg-blue-950/20' : ''
                      }`}
                    >
                      <td className="p-3.5 text-center">
                        <button onClick={() => toggleSelectOne(s.id)} className="p-1 text-slate-400 hover:text-slate-600">
                          {isSelected ? (
                            <CheckSquare className="w-4 h-4 text-blue-600" />
                          ) : (
                            <Square className="w-4 h-4" />
                          )}
                        </button>
                      </td>

                      <td className="p-3.5">
                        <div className="flex items-center gap-3">
                          <img
                            src={s.photoUrl}
                            alt={s.fullName}
                            className="w-9 h-9 rounded-full object-cover border border-slate-200 dark:border-slate-700"
                          />
                          <div>
                            <span className="font-extrabold text-slate-900 dark:text-white block">
                              {s.fullName}
                            </span>
                            <span className="text-[10px] text-slate-400 font-mono">
                              {s.gender === 'L' ? 'Laki-Laki' : 'Perempuan'} • {s.phoneNumber}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="p-3.5 font-mono text-slate-700 dark:text-slate-300">
                        <div className="font-bold">{s.nis}</div>
                        <div className="text-[10px] text-slate-400">NISN: {s.nisn}</div>
                      </td>

                      <td className="p-3.5">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 mr-1.5">
                          {s.schoolLevel}
                        </span>
                        <span className="font-bold text-slate-900 dark:text-slate-100">{s.className}</span>
                      </td>

                      <td className="p-3.5 text-slate-600 dark:text-slate-400">
                        {s.targetMajor || '-'}
                      </td>

                      <td className="p-3.5 text-slate-600 dark:text-slate-400">
                        {s.originSchool}
                      </td>

                      <td className="p-3.5">
                        <span
                          className={`px-2.5 py-1 rounded-2xl text-[10px] font-extrabold ${
                            s.status === 'Aktif'
                              ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                              : 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
                          }`}
                        >
                          {s.status}
                        </span>
                      </td>

                      <td className="p-3.5 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => onSelectStudent(s)}
                            title="Lihat Detail Lengkap"
                            className="p-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-blue-600 hover:text-white transition-all"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleOpenEditModal(s)}
                            title="Edit Data Siswa"
                            className="p-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-amber-600 hover:text-white transition-all"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => onDeleteStudent(s.id)}
                            title="Hapus Student"
                            className="p-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-rose-600 hover:text-white transition-all"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Student Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl max-w-2xl w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                {editingStudent ? 'Edit Master Data Siswa' : 'Tambah Siswa Baru Enterprise'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {formError && (
              <div className="p-3 rounded-2xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 text-xs text-rose-700 dark:text-rose-300 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleSaveForm} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">NIS (Nomor Induk Siswa)*</label>
                  <input
                    type="text"
                    value={formNis}
                    onChange={(e) => setFormNis(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono text-slate-900 dark:text-white"
                    required
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">NISN (Nasional)*</label>
                  <input
                    type="text"
                    value={formNisn}
                    onChange={(e) => setFormNisn(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono text-slate-900 dark:text-white"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Nama Lengkap Siswa*</label>
                  <input
                    type="text"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="Contoh: Muhammad Bintang Pratama"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-bold"
                    required
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Jenis Kelamin</label>
                  <select
                    value={formGender}
                    onChange={(e) => setFormGender(e.target.value as 'L' | 'P')}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold text-slate-900 dark:text-white"
                  >
                    <option value="L">Laki-Laki (L)</option>
                    <option value="P">Perempuan (P)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Jenjang Pendidikan</label>
                  <select
                    value={formLevel}
                    onChange={(e) => setFormLevel(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold text-slate-900 dark:text-white"
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
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Kelas Target</label>
                  <input
                    type="text"
                    value={formClass}
                    onChange={(e) => setFormClass(e.target.value)}
                    placeholder="Contoh: X MIPA 1 / XII TKJ"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Jurusan / Peminatan</label>
                  <input
                    type="text"
                    value={formMajor}
                    onChange={(e) => setFormMajor(e.target.value)}
                    placeholder="MIPA / IPS / TKJ / Tahfizh"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Nomor HP / WhatsApp</label>
                  <input
                    type="text"
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Email Siswa / Wali</label>
                  <input
                    type="email"
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-md"
                >
                  Simpan Master Data
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
