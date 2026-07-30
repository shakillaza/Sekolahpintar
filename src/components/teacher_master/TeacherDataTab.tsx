import React, { useState } from 'react';
import {
  Search,
  Plus,
  Filter,
  Trash2,
  Edit,
  Eye,
  Printer,
  QrCode,
  Download,
  CheckCircle2,
  XCircle,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  Sparkles
} from 'lucide-react';
import { TeacherMasterItem } from '../../types/teacherTypes';

interface TeacherDataTabProps {
  teachers: TeacherMasterItem[];
  onSelectTeacher: (teacher: TeacherMasterItem) => void;
  onPrintIdCard: (teacher: TeacherMasterItem) => void;
  onAddTeacher: (teacher: TeacherMasterItem) => void;
  onEditTeacher: (teacher: TeacherMasterItem) => void;
  onDeleteTeacher: (id: string) => void;
}

export const TeacherDataTab: React.FC<TeacherDataTabProps> = ({
  teachers,
  onSelectTeacher,
  onPrintIdCard,
  onAddTeacher,
  onEditTeacher,
  onDeleteTeacher,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSubject, setFilterSubject] = useState('ALL');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [filterASN, setFilterASN] = useState('ALL');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState<TeacherMasterItem | null>(null);

  // Form State
  const [formData, setFormData] = useState<Partial<TeacherMasterItem>>({
    fullName: '',
    nip: '',
    nuptk: '',
    gender: 'Laki-laki',
    birthPlace: 'Jakarta',
    birthDate: '1990-01-01',
    religion: 'Islam',
    employmentStatus: 'PNS',
    asnStatus: 'PNS',
    lastEducation: 'S1',
    major: 'Pendidikan',
    subject: 'Fisika Terapan & Saintek',
    position: 'Guru Mata Pelajaran',
    rankClass: 'III/a - Penata Muda',
    joinDate: '2020-01-01',
    phone: '',
    email: '',
    address: '',
    isActive: true,
    schoolName: 'SMA Negeri 1 Jakarta',
    teachingHoursPerWeek: 24,
  });

  const handleOpenAddModal = () => {
    setEditingTeacher(null);
    setFormData({
      fullName: '',
      nip: `199${Math.floor(Math.random() * 90) + 10}0101 202001 1 00${Math.floor(Math.random() * 9) + 1}`,
      nuptk: `${Math.floor(1000000000000000 + Math.random() * 9000000000000000)}`,
      gender: 'Laki-laki',
      birthPlace: 'Bandung',
      birthDate: '1988-05-15',
      religion: 'Islam',
      employmentStatus: 'PNS',
      asnStatus: 'PNS',
      lastEducation: 'S1',
      major: 'Pendidikan',
      subject: 'Matematika',
      position: 'Guru Mata Pelajaran',
      rankClass: 'III/b',
      joinDate: '2020-01-15',
      phone: '081234567890',
      email: 'guru.baru@sekolah.sch.id',
      address: 'Jl. Pendidikan No. 10',
      isActive: true,
      schoolName: 'SMA Negeri 1 Jakarta',
      teachingHoursPerWeek: 24,
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (t: TeacherMasterItem) => {
    setEditingTeacher(t);
    setFormData(t);
    setIsModalOpen(true);
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.nip) return;

    if (editingTeacher) {
      onEditTeacher({ ...editingTeacher, ...formData } as TeacherMasterItem);
    } else {
      const newTeacher: TeacherMasterItem = {
        id: `tch-${Date.now()}`,
        nip: formData.nip || '',
        nuptk: formData.nuptk || '',
        fullName: formData.fullName || '',
        titlePrefix: formData.titlePrefix || '',
        titleSuffix: formData.titleSuffix || '',
        gender: formData.gender as any || 'Laki-laki',
        birthPlace: formData.birthPlace || 'Jakarta',
        birthDate: formData.birthDate || '1990-01-01',
        religion: formData.religion || 'Islam',
        employmentStatus: formData.employmentStatus as any || 'PNS',
        asnStatus: formData.asnStatus as any || 'PNS',
        lastEducation: formData.lastEducation as any || 'S1',
        major: formData.major || 'Pendidikan',
        subject: formData.subject || 'Umum',
        position: formData.position || 'Guru',
        rankClass: formData.rankClass || 'III/a',
        joinDate: formData.joinDate || '2020-01-01',
        phone: formData.phone || '',
        email: formData.email || '',
        address: formData.address || '',
        photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        qrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${formData.nip}`,
        barcodeUrl: `https://barcode.tec-it.com/barcode.ashx?data=${formData.nip}&code=Code128`,
        isActive: formData.isActive ?? true,
        schoolName: formData.schoolName || 'SMA Negeri 1 Jakarta',
        teachingHoursPerWeek: formData.teachingHoursPerWeek || 24,
      };
      onAddTeacher(newTeacher);
    }
    setIsModalOpen(false);
  };

  // Filter Logic
  const filteredTeachers = teachers.filter((t) => {
    const matchSearch =
      t.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.nip.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.nuptk.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchSubject = filterSubject === 'ALL' || t.subject === filterSubject;
    const matchStatus = filterStatus === 'ALL' || t.employmentStatus === filterStatus;
    const matchASN = filterASN === 'ALL' || t.asnStatus === filterASN;
    return matchSearch && matchSubject && matchStatus && matchASN;
  });

  const subjects = Array.from(new Set(teachers.map(t => t.subject)));

  return (
    <div className="space-y-4">
      {/* Top Search & Filter Bar */}
      <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="flex-1 w-full md:w-auto flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Cari NIP, NUPTK, Nama Guru, atau Mapel..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-300 focus:outline-none"
          >
            <option value="ALL">Semua Status</option>
            <option value="PNS">PNS</option>
            <option value="PPPK">PPPK</option>
            <option value="GTY">GTY (Yayasan)</option>
            <option value="Honorer">Honorer / GTT</option>
          </select>
          <select
            value={filterSubject}
            onChange={(e) => setFilterSubject(e.target.value)}
            className="px-3 py-2 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-300 focus:outline-none hidden sm:block"
          >
            <option value="ALL">Semua Mapel</option>
            {subjects.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="w-full md:w-auto px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors flex items-center justify-center gap-1.5 shrink-0"
        >
          <Plus className="w-4 h-4" />
          Tambah Tenaga Pendidik (Guru)
        </button>
      </div>

      {/* Main Data Table */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600 dark:text-slate-300">
            <thead className="bg-slate-100 dark:bg-slate-900/60 uppercase text-[10px] text-slate-500 font-bold border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="px-4 py-3">Pendidik / NIP</th>
                <th className="px-4 py-3">NUPTK</th>
                <th className="px-4 py-3">Mata Pelajaran</th>
                <th className="px-4 py-3">Jabatan & Gol.</th>
                <th className="px-4 py-3">Status ASN</th>
                <th className="px-4 py-3">Beban Jam</th>
                <th className="px-4 py-3 text-center">Status</th>
                <th className="px-4 py-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredTeachers.length > 0 ? (
                filteredTeachers.map((t) => (
                  <tr key={t.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={t.photoUrl}
                          alt={t.fullName}
                          className="w-9 h-9 rounded-full object-cover ring-1 ring-slate-300 dark:ring-slate-700"
                        />
                        <div>
                          <div
                            onClick={() => onSelectTeacher(t)}
                            className="font-bold text-slate-900 dark:text-slate-100 hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer"
                          >
                            {t.fullName}
                          </div>
                          <span className="font-mono text-[11px] text-slate-400 block">NIP: {t.nip}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 font-mono text-slate-500">{t.nuptk}</td>
                    <td className="px-4 py-3 font-medium text-slate-800 dark:text-slate-200">{t.subject}</td>
                    <td className="px-4 py-3">
                      <div className="font-semibold text-slate-700 dark:text-slate-300">{t.position}</div>
                      <span className="text-[11px] text-slate-400">{t.rankClass}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        t.employmentStatus === 'PNS' ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300' :
                        t.employmentStatus === 'PPPK' ? 'bg-cyan-100 text-cyan-700 dark:bg-cyan-950 dark:text-cyan-300' :
                        'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                      }`}>
                        {t.employmentStatus}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-semibold text-slate-800 dark:text-slate-200">
                      {t.teachingHoursPerWeek} Jam / mg
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className={`inline-block px-2 py-0.5 text-[10px] font-bold rounded-full ${
                        t.isActive ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-rose-100 text-rose-800'
                      }`}>
                        {t.isActive ? 'AKTIF' : 'NON-AKTIF'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => onSelectTeacher(t)}
                          title="Lihat Detail Profil"
                          className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onPrintIdCard(t)}
                          title="Cetak ID Card Guru"
                          className="p-1.5 text-slate-500 hover:text-emerald-600 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                        >
                          <Printer className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleOpenEditModal(t)}
                          title="Edit Data Guru"
                          className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onDeleteTeacher(t.id)}
                          title="Hapus Data Guru"
                          className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center text-slate-400 italic">
                    Tidak ada data guru yang sesuai dengan pencarian.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Add / Edit Form */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl border border-slate-200 dark:border-slate-800">
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-4 pb-2 border-b border-slate-200 dark:border-slate-800">
              {editingTeacher ? 'Edit Data Tenaga Pendidik (Guru)' : 'Tambah Tenaga Pendidik (Guru) Baru'}
            </h3>
            <form onSubmit={handleSubmitForm} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 dark:text-slate-300 font-semibold mb-1">Nama Lengkap & Gelar</label>
                  <input
                    type="text"
                    required
                    value={formData.fullName || ''}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="Contoh: Drs. H. Bambang Setyono, M.Pd."
                    className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 dark:text-slate-300 font-semibold mb-1">NIP (Nomor Induk Pegawai)</label>
                  <input
                    type="text"
                    required
                    value={formData.nip || ''}
                    onChange={(e) => setFormData({ ...formData, nip: e.target.value })}
                    className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 dark:text-slate-300 font-semibold mb-1">NUPTK</label>
                  <input
                    type="text"
                    required
                    value={formData.nuptk || ''}
                    onChange={(e) => setFormData({ ...formData, nuptk: e.target.value })}
                    className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 dark:text-slate-300 font-semibold mb-1">Mata Pelajaran Utama</label>
                  <input
                    type="text"
                    required
                    value={formData.subject || ''}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 dark:text-slate-300 font-semibold mb-1">Status Kepegawaian</label>
                  <select
                    value={formData.employmentStatus || 'PNS'}
                    onChange={(e) => setFormData({ ...formData, employmentStatus: e.target.value as any })}
                    className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg"
                  >
                    <option value="PNS">PNS</option>
                    <option value="PPPK">PPPK</option>
                    <option value="GTY">GTY (Guru Tetap Yayasan)</option>
                    <option value="GTT">GTT (Guru Tidak Tetap)</option>
                    <option value="Honorer">Honorer</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-600 dark:text-slate-300 font-semibold mb-1">Jabatan</label>
                  <input
                    type="text"
                    value={formData.position || ''}
                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                    className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 dark:text-slate-300 font-semibold mb-1">Pendidikan Terakhir</label>
                  <select
                    value={formData.lastEducation || 'S1'}
                    onChange={(e) => setFormData({ ...formData, lastEducation: e.target.value as any })}
                    className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg"
                  >
                    <option value="D3">D3</option>
                    <option value="S1">S1</option>
                    <option value="S2">S2</option>
                    <option value="S3">S3</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-600 dark:text-slate-300 font-semibold mb-1">Beban Mengajar (Jam/Minggu)</label>
                  <input
                    type="number"
                    value={formData.teachingHoursPerWeek || 24}
                    onChange={(e) => setFormData({ ...formData, teachingHoursPerWeek: Number(e.target.value) })}
                    className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 dark:text-slate-300 font-semibold mb-1">Email Sekolah</label>
                  <input
                    type="email"
                    value={formData.email || ''}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 dark:text-slate-300 font-semibold mb-1">Nomor Handphone / WhatsApp</label>
                  <input
                    type="text"
                    value={formData.phone || ''}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-semibold rounded-lg hover:bg-slate-200"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-500 shadow-md"
                >
                  {editingTeacher ? 'Simpan Perubahan' : 'Tambah Guru Baru'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
