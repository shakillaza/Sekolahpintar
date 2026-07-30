import React, { useState, useEffect } from 'react';
import { X, UserCheck, Mail, Phone, Lock, Shield, CheckCircle2, AlertCircle, Upload, Key, Eye, EyeOff, Building, Award } from 'lucide-react';
import { UserManagementUser, RoleModel, UserGroupModel, DepartmentModel, PositionModel } from '../../../types';

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  userToEdit?: UserManagementUser | null;
  onSave: (user: UserManagementUser) => void;
  roles: RoleModel[];
  groups: UserGroupModel[];
  departments: DepartmentModel[];
  positions: PositionModel[];
  existingUsers: UserManagementUser[];
}

export const UserModal: React.FC<UserModalProps> = ({
  isOpen,
  onClose,
  userToEdit,
  onSave,
  roles,
  groups,
  departments,
  positions,
  existingUsers,
}) => {
  const [formData, setFormData] = useState<Partial<UserManagementUser>>({
    username: '',
    name: '',
    email: '',
    phone: '',
    nip_nisn: '',
    roleId: roles[0]?.id || 'role-guru',
    userGroupId: groups[0]?.id || 'ug-1',
    departmentId: departments[0]?.id || 'dept-1',
    positionId: positions[0]?.id || 'pos-3',
    status: 'active',
    onlineStatus: 'offline',
    verifiedStatus: 'verified',
    mfaEnabled: false,
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
  });

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (userToEdit) {
      setFormData(userToEdit);
      setPassword('');
      setConfirmPassword('');
      setErrors({});
    } else {
      setFormData({
        username: '',
        name: '',
        email: '',
        phone: '',
        nip_nisn: '',
        roleId: roles[0]?.id || 'role-guru',
        userGroupId: groups[0]?.id || 'ug-1',
        departmentId: departments[0]?.id || 'dept-1',
        positionId: positions[0]?.id || 'pos-3',
        status: 'active',
        onlineStatus: 'offline',
        verifiedStatus: 'verified',
        mfaEnabled: false,
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      });
      setPassword('');
      setConfirmPassword('');
      setErrors({});
    }
  }, [userToEdit, isOpen]);

  if (!isOpen) return null;

  // Validation Check
  const validateForm = (): boolean => {
    const errs: Record<string, string> = {};

    if (!formData.name?.trim()) {
      errs.name = 'Nama lengkap wajib diisi.';
    }

    if (!formData.username?.trim()) {
      errs.username = 'Username wajib diisi.';
    } else if (
      existingUsers.some(
        (u) => u.username.toLowerCase() === formData.username?.toLowerCase() && u.id !== userToEdit?.id
      )
    ) {
      errs.username = 'Username sudah digunakan oleh akun lain.';
    }

    if (!formData.email?.trim()) {
      errs.email = 'Email wajib diisi.';
    } else if (!formData.email.includes('@') || !formData.email.includes('.')) {
      errs.email = 'Format email tidak valid (contoh: user@school.sch.id).';
    } else if (
      existingUsers.some(
        (u) => u.email.toLowerCase() === formData.email?.toLowerCase() && u.id !== userToEdit?.id
      )
    ) {
      errs.email = 'Email sudah terdaftar pada sistem.';
    }

    if (!formData.phone?.trim()) {
      errs.phone = 'Nomor HP/WA wajib diisi.';
    } else if (formData.phone.replace(/[^0-9]/g, '').length < 10) {
      errs.phone = 'Nomor HP minimal 10 digit angka.';
    }

    if (!userToEdit) {
      if (!password) {
        errs.password = 'Password wajib diisi untuk pengguna baru.';
      } else if (password.length < 8) {
        errs.password = 'Password minimal 8 karakter dengan kombinasi angka & simbol.';
      }

      if (password !== confirmPassword) {
        errs.confirmPassword = 'Konfirmasi password tidak cocok.';
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const selectedRole = roles.find((r) => r.id === formData.roleId);
    const selectedGroup = groups.find((g) => g.id === formData.userGroupId);
    const selectedDept = departments.find((d) => d.id === formData.departmentId);
    const selectedPos = positions.find((p) => p.id === formData.positionId);

    const newUser: UserManagementUser = {
      id: userToEdit ? userToEdit.id : `usr-${Date.now().toString().slice(-5)}`,
      username: formData.username || '',
      name: formData.name || '',
      email: formData.email || '',
      phone: formData.phone || '',
      nip_nisn: formData.nip_nisn || '-',
      avatarUrl: formData.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      roleId: formData.roleId || roles[0]?.id,
      roleName: selectedRole?.name || 'Guru',
      userGroupId: formData.userGroupId || groups[0]?.id,
      userGroupName: selectedGroup?.name || 'Guru',
      departmentId: formData.departmentId || departments[0]?.id,
      departmentName: selectedDept?.name || 'Akademik',
      positionId: formData.positionId || positions[0]?.id,
      positionTitle: selectedPos?.title || 'Staff',
      schoolId: 'sch-1',
      schoolName: 'SMA Smart AI Utama',
      status: formData.status as 'active' | 'inactive' | 'pending',
      onlineStatus: formData.onlineStatus as 'online' | 'offline',
      verifiedStatus: formData.verifiedStatus as 'verified' | 'unverified',
      createdAt: userToEdit ? userToEdit.createdAt : new Date().toISOString().split('T')[0],
      lastLogin: userToEdit ? userToEdit.lastLogin : 'Belum pernah login',
      mfaEnabled: formData.mfaEnabled || false,
      mfaMethod: formData.mfaEnabled ? 'email_otp' : 'none',
    };

    onSave(newUser);
    onClose();
  };

  // Avatar Upload Mock
  const handleAvatarSelect = () => {
    const randomAvatars = [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
    ];
    const picked = randomAvatars[Math.floor(Math.random() * randomAvatars.length)];
    setFormData((prev) => ({ ...prev, avatarUrl: picked }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden my-8">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-blue-600 text-white shadow-md shadow-blue-600/20">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900 dark:text-white">
                {userToEdit ? 'Edit Pengguna Enterprise' : 'Tambah Pengguna Baru'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Kelola kredensial akun, role akses, penetapan departemen, dan validasi keamanan.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-xl hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Avatar Upload Preview */}
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/60">
            <img
              src={formData.avatarUrl}
              alt="Avatar Preview"
              className="w-16 h-16 rounded-2xl object-cover ring-2 ring-blue-500/30"
            />
            <div className="space-y-1">
              <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">Foto Profil Akun</h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">Format PNG, JPG max 2MB. Resolusi disarankan 300x300px.</p>
              <button
                type="button"
                onClick={handleAvatarSelect}
                className="px-3 py-1 rounded-lg text-xs font-extrabold bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-300 border border-blue-200 dark:border-blue-800 hover:bg-blue-100 transition-colors flex items-center gap-1.5"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Upload Foto Baru</span>
              </button>
            </div>
          </div>

          {/* Form Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Nama Lengkap */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Nama Lengkap & Gelar <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={formData.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Contoh: Ahmad Fauzi, S.T., M.T."
                className={`w-full px-3.5 py-2.5 rounded-xl text-xs border bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                  errors.name ? 'border-rose-500' : 'border-slate-200 dark:border-slate-700'
                }`}
              />
              {errors.name && <p className="text-[10px] text-rose-500 font-medium">{errors.name}</p>}
            </div>

            {/* Username */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Username Akun <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={formData.username || ''}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                placeholder="Contoh: ahmad.fauzi"
                className={`w-full px-3.5 py-2.5 rounded-xl text-xs border bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                  errors.username ? 'border-rose-500' : 'border-slate-200 dark:border-slate-700'
                }`}
              />
              {errors.username && <p className="text-[10px] text-rose-500 font-medium">{errors.username}</p>}
            </div>

            {/* Email */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Email Resmi <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={formData.email || ''}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="ahmad@aischool.sch.id"
                  className={`w-full pl-9 pr-3.5 py-2.5 rounded-xl text-xs border bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                    errors.email ? 'border-rose-500' : 'border-slate-200 dark:border-slate-700'
                  }`}
                />
              </div>
              {errors.email && <p className="text-[10px] text-rose-500 font-medium">{errors.email}</p>}
            </div>

            {/* Phone */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Nomor HP / WhatsApp <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Phone className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={formData.phone || ''}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+62 812-3456-7890"
                  className={`w-full pl-9 pr-3.5 py-2.5 rounded-xl text-xs border bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                    errors.phone ? 'border-rose-500' : 'border-slate-200 dark:border-slate-700'
                  }`}
                />
              </div>
              {errors.phone && <p className="text-[10px] text-rose-500 font-medium">{errors.phone}</p>}
            </div>

            {/* NIP / NISN */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                NIP / NUPTK / NISN
              </label>
              <input
                type="text"
                value={formData.nip_nisn || ''}
                onChange={(e) => setFormData({ ...formData, nip_nisn: e.target.value })}
                placeholder="Nomor identitas kedinasan"
                className="w-full px-3.5 py-2.5 rounded-xl text-xs border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Role Assignment */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Hak Akses (Role RBAC) <span className="text-rose-500">*</span>
              </label>
              <select
                value={formData.roleId}
                onChange={(e) => setFormData({ ...formData, roleId: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl text-xs border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {roles.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.name} ({r.description})
                  </option>
                ))}
              </select>
            </div>

            {/* User Group */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Kelompok (User Group)
              </label>
              <select
                value={formData.userGroupId}
                onChange={(e) => setFormData({ ...formData, userGroupId: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl text-xs border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {groups.map((g) => (
                  <option key={g.id} value={g.id}>
                    {g.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Department */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Departemen</label>
              <select
                value={formData.departmentId}
                onChange={(e) => setFormData({ ...formData, departmentId: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl text-xs border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {departments.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Position / Jabatan */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Position / Jabatan</label>
              <select
                value={formData.positionId}
                onChange={(e) => setFormData({ ...formData, positionId: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl text-xs border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {positions.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Status Akun */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Status Akun</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                className="w-full px-3.5 py-2.5 rounded-xl text-xs border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="active">Aktif (Dapat Login)</option>
                <option value="inactive">Nonaktif (Di-suspend)</option>
                <option value="pending">Pending Verifikasi Email</option>
              </select>
            </div>
          </div>

          {/* Password Section for New Users */}
          {!userToEdit && (
            <div className="p-4 rounded-2xl bg-blue-50/50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800/60 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-blue-900 dark:text-blue-300">
                <Lock className="w-4 h-4 text-blue-600" />
                <span>Pengaturan Password Akun Baru</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                    Password <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Minimal 8 Karakter"
                      className={`w-full px-3.5 py-2 rounded-xl text-xs border bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.password ? 'border-rose-500' : 'border-slate-200 dark:border-slate-700'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                  {errors.password && <p className="text-[10px] text-rose-500 font-medium">{errors.password}</p>}
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                    Konfirmasi Password <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Ulangi Password"
                    className={`w-full px-3.5 py-2 rounded-xl text-xs border bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.confirmPassword ? 'border-rose-500' : 'border-slate-200 dark:border-slate-700'
                    }`}
                  />
                  {errors.confirmPassword && (
                    <p className="text-[10px] text-rose-500 font-medium">{errors.confirmPassword}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* MFA Toggle Option */}
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60">
            <div className="flex items-center gap-2.5">
              <Shield className="w-4 h-4 text-emerald-500 shrink-0" />
              <div>
                <h5 className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  Wajibkan Multi-Factor Authentication (MFA)
                </h5>
                <p className="text-[10px] text-slate-500 dark:text-slate-400">
                  Pengguna wajib memasukkan kode OTP email/authenticator saat login.
                </p>
              </div>
            </div>
            <input
              type="checkbox"
              checked={formData.mfaEnabled || false}
              onChange={(e) => setFormData({ ...formData, mfaEnabled: e.target.checked })}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 border-slate-300"
            />
          </div>

          {/* Submit Action */}
          <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl text-xs font-extrabold bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-600/20 transition-all flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Simpan Data Pengguna</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
