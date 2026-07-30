import React, { useState } from 'react';
import {
  Search,
  Plus,
  Trash2,
  Edit,
  Eye,
  Printer,
  Briefcase,
  UserCheck,
  Building
} from 'lucide-react';
import { EmployeeMasterItem } from '../../types/teacherTypes';

interface EmployeeDataTabProps {
  employees: EmployeeMasterItem[];
  onSelectEmployee: (emp: EmployeeMasterItem) => void;
  onPrintIdCard: (emp: EmployeeMasterItem) => void;
  onAddEmployee: (emp: EmployeeMasterItem) => void;
  onEditEmployee: (emp: EmployeeMasterItem) => void;
  onDeleteEmployee: (id: string) => void;
}

export const EmployeeDataTab: React.FC<EmployeeDataTabProps> = ({
  employees,
  onSelectEmployee,
  onPrintIdCard,
  onAddEmployee,
  onEditEmployee,
  onDeleteEmployee,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('ALL');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<EmployeeMasterItem | null>(null);

  const [formData, setFormData] = useState<Partial<EmployeeMasterItem>>({
    fullName: '',
    nip: '',
    position: 'Kepala TU',
    department: 'Tata Usaha',
    unit: 'Administrasi',
    gender: 'Laki-laki',
    birthDate: '1990-01-01',
    education: 'S1',
    phone: '',
    email: '',
    address: '',
    employmentStatus: 'Tetap',
    joinDate: '2020-01-01',
    isActive: true,
    schoolName: 'SMA Negeri 1 Jakarta',
  });

  const handleOpenAddModal = () => {
    setEditingEmployee(null);
    setFormData({
      fullName: '',
      nip: `199${Math.floor(Math.random() * 90) + 10}0101 202001 1 00${Math.floor(Math.random() * 9) + 1}`,
      position: 'Staff TU',
      department: 'Tata Usaha & Keuangan',
      unit: 'Administrasi Sekolah',
      gender: 'Perempuan',
      birthDate: '1992-04-10',
      education: 'S1 Akuntansi',
      phone: '081299881122',
      email: 'staf.tu@sekolah.sch.id',
      address: 'Jl. Melati No. 4',
      employmentStatus: 'Tetap',
      joinDate: '2020-01-15',
      isActive: true,
      schoolName: 'SMA Negeri 1 Jakarta',
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (emp: EmployeeMasterItem) => {
    setEditingEmployee(emp);
    setFormData(emp);
    setIsModalOpen(true);
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.nip) return;

    if (editingEmployee) {
      onEditEmployee({ ...editingEmployee, ...formData } as EmployeeMasterItem);
    } else {
      const newEmployee: EmployeeMasterItem = {
        id: `emp-${Date.now()}`,
        nip: formData.nip || '',
        fullName: formData.fullName || '',
        position: formData.position as any || 'Staff TU',
        department: formData.department || 'Tata Usaha',
        unit: formData.unit || 'Administrasi',
        gender: formData.gender as any || 'Laki-laki',
        birthDate: formData.birthDate || '1990-01-01',
        education: formData.education || 'S1',
        phone: formData.phone || '',
        email: formData.email || '',
        address: formData.address || '',
        employmentStatus: formData.employmentStatus as any || 'Tetap',
        joinDate: formData.joinDate || '2020-01-01',
        photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        qrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${formData.nip}`,
        isActive: formData.isActive ?? true,
        schoolName: formData.schoolName || 'SMA Negeri 1 Jakarta',
      };
      onAddEmployee(newEmployee);
    }
    setIsModalOpen(false);
  };

  const filteredEmployees = employees.filter((e) => {
    const matchSearch =
      e.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.nip.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchDept = filterDepartment === 'ALL' || e.department === filterDepartment;
    return matchSearch && matchDept;
  });

  return (
    <div className="space-y-4">
      <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="flex-1 w-full md:w-auto flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Cari NIP, Nama Staf Pegawai, Jabatan, atau Departemen..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="w-full md:w-auto px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors flex items-center justify-center gap-1.5 shrink-0"
        >
          <Plus className="w-4 h-4" />
          Tambah Tenaga Kependidikan (Pegawai)
        </button>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600 dark:text-slate-300">
            <thead className="bg-slate-100 dark:bg-slate-900/60 uppercase text-[10px] text-slate-500 font-bold border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="px-4 py-3">Pegawai / NIP</th>
                <th className="px-4 py-3">Jabatan & Unit</th>
                <th className="px-4 py-3">Departemen</th>
                <th className="px-4 py-3">Pendidikan</th>
                <th className="px-4 py-3">Kontak & Email</th>
                <th className="px-4 py-3">Status Kerja</th>
                <th className="px-4 py-3 text-center">Status</th>
                <th className="px-4 py-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredEmployees.length > 0 ? (
                filteredEmployees.map((e) => (
                  <tr key={e.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={e.photoUrl}
                          alt={e.fullName}
                          className="w-9 h-9 rounded-full object-cover ring-1 ring-slate-300 dark:ring-slate-700"
                        />
                        <div>
                          <div
                            onClick={() => onSelectEmployee(e)}
                            className="font-bold text-slate-900 dark:text-slate-100 hover:text-emerald-600 cursor-pointer"
                          >
                            {e.fullName}
                          </div>
                          <span className="font-mono text-[11px] text-slate-400 block">NIP: {e.nip}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-semibold text-slate-800 dark:text-slate-200">{e.position}</div>
                      <span className="text-[11px] text-slate-400">{e.unit}</span>
                    </td>
                    <td className="px-4 py-3 font-medium text-slate-700 dark:text-slate-300">{e.department}</td>
                    <td className="px-4 py-3 font-medium text-slate-700 dark:text-slate-300">{e.education}</td>
                    <td className="px-4 py-3">
                      <div className="text-slate-800 dark:text-slate-200">{e.phone}</div>
                      <span className="text-[11px] text-slate-400 block">{e.email}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                        {e.employmentStatus}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className={`inline-block px-2 py-0.5 text-[10px] font-bold rounded-full ${
                        e.isActive ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                      }`}>
                        {e.isActive ? 'AKTIF' : 'NON-AKTIF'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => onSelectEmployee(e)}
                          className="p-1.5 text-slate-500 hover:text-emerald-600 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onPrintIdCard(e)}
                          className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg"
                        >
                          <Printer className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleOpenEditModal(e)}
                          className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onDeleteEmployee(e.id)}
                          className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg"
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
                    Tidak ada data pegawai kependidikan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800">
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-4 pb-2 border-b border-slate-200 dark:border-slate-800">
              {editingEmployee ? 'Edit Data Pegawai Kependidikan' : 'Tambah Pegawai Baru'}
            </h3>
            <form onSubmit={handleSubmitForm} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 dark:text-slate-300 font-semibold mb-1">Nama Lengkap</label>
                  <input
                    type="text"
                    required
                    value={formData.fullName || ''}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 dark:text-slate-300 font-semibold mb-1">NIP</label>
                  <input
                    type="text"
                    required
                    value={formData.nip || ''}
                    onChange={(e) => setFormData({ ...formData, nip: e.target.value })}
                    className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 rounded-lg font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 dark:text-slate-300 font-semibold mb-1">Jabatan</label>
                  <select
                    value={formData.position || 'Staff TU'}
                    onChange={(e) => setFormData({ ...formData, position: e.target.value as any })}
                    className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 rounded-lg"
                  >
                    <option value="Kepala TU">Kepala TU</option>
                    <option value="Staff TU">Staff TU</option>
                    <option value="Bendahara">Bendahara</option>
                    <option value="Operator">Operator</option>
                    <option value="Pustakawan">Pustakawan</option>
                    <option value="Laboran">Laboran</option>
                    <option value="Keamanan">Keamanan</option>
                    <option value="Petugas UKS">Petugas UKS</option>
                    <option value="Teknisi IT">Teknisi IT</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-600 dark:text-slate-300 font-semibold mb-1">Departemen</label>
                  <input
                    type="text"
                    value={formData.department || ''}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 rounded-lg"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-4 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-600 rounded-lg"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 text-white font-semibold rounded-lg shadow-md"
                >
                  Simpan Pegawai
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
