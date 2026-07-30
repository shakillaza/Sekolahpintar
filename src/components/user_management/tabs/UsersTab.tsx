import React, { useState } from 'react';
import { UserManagementUser, RoleModel, UserGroupModel } from '../../../types';
import {
  Search,
  Filter,
  UserCheck,
  UserX,
  KeyRound,
  Mail,
  MoreVertical,
  Edit2,
  Trash2,
  Eye,
  CheckSquare,
  Square,
  FileSpreadsheet,
  FileText,
  Shield,
  Download,
  Send,
  UserPlus
} from 'lucide-react';

interface UsersTabProps {
  users: UserManagementUser[];
  roles: RoleModel[];
  groups: UserGroupModel[];
  searchQuery: string;
  onAddUser: () => void;
  onEditUser: (user: UserManagementUser) => void;
  onDeleteUser: (id: string) => void;
  onToggleStatus: (id: string) => void;
  onResetPassword: (user: UserManagementUser) => void;
  onViewDetail: (user: UserManagementUser) => void;
  onExportUsers: (format: 'csv' | 'pdf') => void;
}

export const UsersTab: React.FC<UsersTabProps> = ({
  users,
  roles,
  groups,
  searchQuery,
  onAddUser,
  onEditUser,
  onDeleteUser,
  onToggleStatus,
  onResetPassword,
  onViewDetail,
  onExportUsers,
}) => {
  const [roleFilter, setRoleFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);

  // Filter users
  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.roleName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRole = roleFilter === 'ALL' || u.roleId === roleFilter;
    const matchesStatus = statusFilter === 'ALL' || u.status === statusFilter;

    return matchesSearch && matchesRole && matchesStatus;
  });

  // Select all toggles
  const handleSelectAll = () => {
    if (selectedUserIds.length === filteredUsers.length) {
      setSelectedUserIds([]);
    } else {
      setSelectedUserIds(filteredUsers.map((u) => u.id));
    }
  };

  const handleSelectUser = (id: string) => {
    if (selectedUserIds.includes(id)) {
      setSelectedUserIds((prev) => prev.filter((item) => item !== id));
    } else {
      setSelectedUserIds((prev) => [...prev, id]);
    }
  };

  return (
    <div className="space-y-4">
      {/* Filters & Bulk Action Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
        <div className="flex flex-wrap items-center gap-2">
          {/* Role Filter */}
          <div className="flex items-center gap-1.5 text-xs">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none"
            >
              <option value="ALL">Semua Role ({roles.length})</option>
              {roles.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name}
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none"
          >
            <option value="ALL">Semua Status</option>
            <option value="active">Aktif</option>
            <option value="inactive">Nonaktif</option>
            <option value="pending">Pending</option>
          </select>
        </div>

        {/* Export & Bulk Action */}
        <div className="flex items-center gap-2">
          {selectedUserIds.length > 0 && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800 text-xs font-extrabold animate-fade-in">
              <span>{selectedUserIds.length} Terpilih</span>
            </div>
          )}

          <button
            onClick={() => onExportUsers('csv')}
            className="px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition-colors flex items-center gap-1.5"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-500" />
            <span className="hidden sm:inline">Export Excel</span>
          </button>

          <button
            onClick={() => onExportUsers('pdf')}
            className="px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition-colors flex items-center gap-1.5"
          >
            <FileText className="w-3.5 h-3.5 text-rose-500" />
            <span className="hidden sm:inline">Export PDF</span>
          </button>
        </div>
      </div>

      {/* Users Table */}
      <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600 dark:text-slate-300">
            <thead className="bg-slate-50 dark:bg-slate-800/60 uppercase font-extrabold text-[10px] tracking-wider text-slate-400 dark:text-slate-500 border-b border-slate-200/80 dark:border-slate-800">
              <tr>
                <th className="px-4 py-3.5 w-10 text-center">
                  <button onClick={handleSelectAll} className="text-slate-400 hover:text-blue-600">
                    {selectedUserIds.length === filteredUsers.length && filteredUsers.length > 0 ? (
                      <CheckSquare className="w-4 h-4 text-blue-600" />
                    ) : (
                      <Square className="w-4 h-4" />
                    )}
                  </button>
                </th>
                <th className="px-4 py-3.5">Pengguna & Username</th>
                <th className="px-4 py-3.5">Role & Kelompok</th>
                <th className="px-4 py-3.5">Kontak & Departemen</th>
                <th className="px-4 py-3.5">Status Login & Online</th>
                <th className="px-4 py-3.5">Keamanan MFA</th>
                <th className="px-4 py-3.5 text-right">Aksi Enterprise</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-medium">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-slate-400">
                    Tidak ada pengguna yang sesuai dengan kriteria filter/pencarian.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((u) => {
                  const isSelected = selectedUserIds.includes(u.id);
                  return (
                    <tr
                      key={u.id}
                      className={`hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors ${
                        isSelected ? 'bg-blue-50/40 dark:bg-blue-950/20' : ''
                      }`}
                    >
                      <td className="px-4 py-3 text-center">
                        <button onClick={() => handleSelectUser(u.id)} className="text-slate-400 hover:text-blue-600">
                          {isSelected ? (
                            <CheckSquare className="w-4 h-4 text-blue-600" />
                          ) : (
                            <Square className="w-4 h-4" />
                          )}
                        </button>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="relative shrink-0">
                            <img
                              src={u.avatarUrl}
                              alt={u.name}
                              className="w-9 h-9 rounded-xl object-cover ring-2 ring-slate-200 dark:ring-slate-700"
                            />
                            <span
                              className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white dark:border-slate-900 ${
                                u.onlineStatus === 'online' ? 'bg-emerald-500' : 'bg-slate-400'
                              }`}
                              title={u.onlineStatus === 'online' ? 'Online' : 'Offline'}
                            />
                          </div>
                          <div>
                            <div className="font-bold text-slate-900 dark:text-white">{u.name}</div>
                            <div className="text-[10px] text-slate-400 font-mono">@{u.username}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                          <Shield className="w-3 h-3 text-amber-500" />
                          {u.roleName}
                        </span>
                        <div className="text-[10px] text-slate-400 mt-0.5">{u.userGroupName}</div>
                      </td>
                      <td className="px-4 py-3 text-[11px] space-y-0.5">
                        <div className="text-slate-800 dark:text-slate-200 font-semibold">{u.email}</div>
                        <div className="text-slate-400 text-[10px]">{u.phone} • {u.departmentName}</div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1.5">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                              u.status === 'active'
                                ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800'
                                : 'bg-rose-50 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400 border border-rose-200 dark:border-rose-800'
                            }`}
                          >
                            {u.status === 'active' ? 'Aktif' : 'Nonaktif'}
                          </span>
                        </div>
                        <div className="text-[10px] text-slate-400 mt-1">Login: {u.lastLogin}</div>
                      </td>
                      <td className="px-4 py-3 font-mono text-[10px]">
                        {u.mfaEnabled ? (
                          <span className="text-emerald-600 dark:text-emerald-400 font-bold">MFA {u.mfaMethod}</span>
                        ) : (
                          <span className="text-slate-400">Non-MFA</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => onViewDetail(u)}
                            className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/60 rounded-lg transition-colors"
                            title="Detail Drawer"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => onToggleStatus(u.id)}
                            className={`p-1.5 rounded-lg transition-colors ${
                              u.status === 'active'
                                ? 'text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-950/60'
                                : 'text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-950/60'
                            }`}
                            title={u.status === 'active' ? 'Nonaktifkan Akun' : 'Aktifkan Akun'}
                          >
                            {u.status === 'active' ? <UserX className="w-3.5 h-3.5" /> : <UserCheck className="w-3.5 h-3.5" />}
                          </button>

                          <button
                            onClick={() => onResetPassword(u)}
                            className="p-1.5 text-slate-400 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950/60 rounded-lg transition-colors"
                            title="Reset Password & Send Link"
                          >
                            <KeyRound className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => onEditUser(u)}
                            className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/60 rounded-lg transition-colors"
                            title="Edit User"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => onDeleteUser(u.id)}
                            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/60 rounded-lg transition-colors"
                            title="Hapus Akun"
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
    </div>
  );
};
