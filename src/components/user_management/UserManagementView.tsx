import React, { useState } from 'react';
import {
  UserManagementSubTab,
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
} from '../../types';
import {
  initialUsers,
  initialRoles,
  initialPermissions,
  initialUserGroups,
  initialDepartments,
  initialPositions,
  initialMenuManagement,
  initialActiveSessions,
  initialLoginHistory,
  initialDevices,
  initialAuditLogs
} from '../../data/initialUserData';

import { UsersTab } from './tabs/UsersTab';
import { RolesTab } from './tabs/RolesTab';
import { PermissionsTab } from './tabs/PermissionsTab';
import { MenuManagementTab } from './tabs/MenuManagementTab';
import { RoleMatrixTab } from './tabs/RoleMatrixTab';
import { GroupsTab } from './tabs/GroupsTab';
import { DepartmentsTab } from './tabs/DepartmentsTab';
import { PositionsTab } from './tabs/PositionsTab';
import { ActiveSessionsTab } from './tabs/ActiveSessionsTab';
import { LoginHistoryTab } from './tabs/LoginHistoryTab';
import { DevicesTab } from './tabs/DevicesTab';
import { AuditLogsTab } from './tabs/AuditLogsTab';
import { SecuritySettingsTab } from './tabs/SecuritySettingsTab';

import { UserModal } from './modals/UserModal';
import { UserDetailDrawer } from './modals/UserDetailDrawer';

import {
  Users,
  Shield,
  Key,
  Menu,
  Grid,
  Users2,
  Building2,
  Briefcase,
  Laptop,
  History,
  Smartphone,
  ShieldAlert,
  Lock,
  Plus,
  Search,
  CheckCircle2,
  AlertCircle,
  FileSpreadsheet,
  FileText
} from 'lucide-react';

interface UserManagementViewProps {
  currentRole: string;
}

export const UserManagementView: React.FC<UserManagementViewProps> = ({ currentRole }) => {
  const [activeTab, setActiveTab] = useState<UserManagementSubTab>('users');
  const [searchQuery, setSearchQuery] = useState('');

  // Datasets state
  const [users, setUsers] = useState<UserManagementUser[]>(initialUsers);
  const [roles, setRoles] = useState<RoleModel[]>(initialRoles);
  const [permissions] = useState<PermissionModel[]>(initialPermissions);
  const [groups, setGroups] = useState<UserGroupModel[]>(initialUserGroups);
  const [departments, setDepartments] = useState<DepartmentModel[]>(initialDepartments);
  const [positions, setPositions] = useState<PositionModel[]>(initialPositions);
  const [menus, setMenus] = useState<MenuManagementItem[]>(initialMenuManagement);
  const [sessions, setSessions] = useState<ActiveSessionModel[]>(initialActiveSessions);
  const [loginHistory] = useState<LoginHistoryModel[]>(initialLoginHistory);
  const [devices, setDevices] = useState<DeviceModel[]>(initialDevices);
  const [auditLogs, setAuditLogs] = useState<AuditLogItem[]>(initialAuditLogs);

  // Initial Role-Permission Map
  const [rolePermissionMap, setRolePermissionMap] = useState<Record<string, string[]>>({
    'role-superadmin': permissions.map((p) => p.code),
    'role-owner': permissions.map((p) => p.code),
    'role-kepsek': ['Student.View', 'Teacher.View', 'Finance.View', 'User.View', 'Audit.View'],
    'role-guru': ['Student.View', 'Teacher.View'],
    'role-tu': ['Student.View', 'Student.Create', 'Student.Update', 'User.View'],
    'role-bendahara': ['Finance.View', 'Finance.Create', 'Finance.Update', 'Finance.Approve'],
  });

  // Modal States
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState<UserManagementUser | null>(null);

  const [isDetailDrawerOpen, setIsDetailDrawerOpen] = useState(false);
  const [userForDrawer, setUserForDrawer] = useState<UserManagementUser | null>(null);

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // RBAC Access Check (Students and Parents restricted)
  const isAuthorized = !['orang_tua', 'siswa'].includes(currentRole.toLowerCase());

  if (!isAuthorized) {
    return (
      <div className="p-8 rounded-3xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/50 text-center space-y-4 my-8 max-w-2xl mx-auto">
        <div className="w-16 h-16 rounded-full bg-rose-100 dark:bg-rose-900/60 text-rose-600 flex items-center justify-center mx-auto">
          <Lock className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-black text-rose-900 dark:text-rose-200">
          Akses Dibatasi (RBAC Enforcement)
        </h3>
        <p className="text-xs text-rose-700 dark:text-rose-300">
          Role Anda ({currentRole}) tidak memiliki izin untuk mengelola User Management, Role, maupun Audit Trail.
        </p>
        <p className="text-[11px] text-slate-500">
          Silakan gunakan switcher role di pojok kanan atas untuk beralih ke Super Admin, Kepala Sekolah, atau Operator.
        </p>
      </div>
    );
  }

  // Handlers for User CRUD
  const handleSaveUser = (savedUser: UserManagementUser) => {
    if (userToEdit) {
      setUsers((prev) => prev.map((u) => (u.id === savedUser.id ? savedUser : u)));
      showToast(`Data pengguna ${savedUser.name} berhasil diperbarui.`);
    } else {
      setUsers((prev) => [savedUser, ...prev]);
      showToast(`Pengguna baru ${savedUser.name} berhasil ditambahkan.`);
    }
  };

  const handleDeleteUser = (id: string) => {
    const target = users.find((u) => u.id === id);
    if (confirm(`Apakah Anda yakin ingin menghapus akun ${target?.name}?`)) {
      setUsers((prev) => prev.filter((u) => u.id !== id));
      showToast(`Akun ${target?.name} berhasil dihapus.`);
    }
  };

  const handleToggleStatus = (id: string) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === id) {
          const nextStatus = u.status === 'active' ? 'inactive' : 'active';
          showToast(`Status akun ${u.name} diubah menjadi ${nextStatus.toUpperCase()}`);
          return { ...u, status: nextStatus };
        }
        return u;
      })
    );
  };

  const handleResetPassword = (u: UserManagementUser) => {
    showToast(`Instruksi reset password & link aktivasi telah dikirim ke ${u.email}`);
  };

  const handleExportUsers = (format: 'csv' | 'pdf') => {
    showToast(`Mengekspor data ${users.length} pengguna ke format ${format.toUpperCase()}...`);
  };

  // Handlers for Matrix
  const handleToggleMatrixPermission = (roleId: string, permissionCode: string) => {
    setRolePermissionMap((prev) => {
      const currentList = prev[roleId] || [];
      const exists = currentList.includes(permissionCode);
      const updated = exists
        ? currentList.filter((code) => code !== permissionCode)
        : [...currentList, permissionCode];
      return { ...prev, [roleId]: updated };
    });
  };

  const handleSaveMatrix = () => {
    showToast('Matriks Role-Permission berhasil disimpan ke database.');
  };

  // Handlers for Menu Management
  const handleToggleMenuVisibility = (id: string) => {
    setMenus((prev) =>
      prev.map((m) => (m.id === id ? { ...m, isVisible: !m.isVisible } : m))
    );
    showToast('Visibilitas menu navigasi diperbarui.');
  };

  const handleUpdateMenuRoles = (menuId: string, roleCode: string) => {
    setMenus((prev) =>
      prev.map((m) => {
        if (m.id === menuId) {
          const exists = m.rolesAllowed.includes(roleCode);
          const updated = exists
            ? m.rolesAllowed.filter((rc) => rc !== roleCode)
            : [...m.rolesAllowed, roleCode];
          return { ...m, rolesAllowed: updated };
        }
        return m;
      })
    );
  };

  // Handlers for Active Sessions
  const handleRevokeSession = (sessionId: string) => {
    setSessions((prev) => prev.filter((s) => s.id !== sessionId));
    showToast('Sesi pengguna berhasil dicabut secara paksa.');
  };

  const handleRevokeAllOther = () => {
    setSessions((prev) => prev.filter((s) => s.isCurrent));
    showToast('Seluruh sesi pengguna lain berhasil dicabut.');
  };

  // Handlers for Devices
  const handleToggleDeviceStatus = (deviceId: string) => {
    setDevices((prev) =>
      prev.map((d) => {
        if (d.id === deviceId) {
          const next = d.status === 'active' ? 'blocked' : 'active';
          showToast(`Status perangkat ${d.deviceName} diubah menjadi ${next.toUpperCase()}`);
          return { ...d, status: next };
        }
        return d;
      })
    );
  };

  const subTabItems = [
    { id: 'users', label: 'Daftar Users', icon: Users, count: users.length },
    { id: 'roles', label: 'Roles', icon: Shield, count: roles.length },
    { id: 'permissions', label: 'Permissions', icon: Key, count: permissions.length },
    { id: 'menu_management', label: 'Menu Mgmt', icon: Menu, count: menus.length },
    { id: 'role_matrix', label: 'Role Matrix', icon: Grid, count: null },
    { id: 'groups', label: 'User Groups', icon: Users2, count: groups.length },
    { id: 'departments', label: 'Departemen', icon: Building2, count: departments.length },
    { id: 'positions', label: 'Jabatan', icon: Briefcase, count: positions.length },
    { id: 'active_sessions', label: 'Active Sessions', icon: Laptop, count: sessions.length },
    { id: 'login_history', label: 'Login History', icon: History, count: loginHistory.length },
    { id: 'devices', label: 'Devices', icon: Smartphone, count: devices.length },
    { id: 'audit_logs', label: 'Audit Logs', icon: ShieldAlert, count: auditLogs.length },
    { id: 'security', label: 'Security & MFA', icon: Lock, count: null },
  ];

  return (
    <div className="space-y-6">
      {/* Toast Banner */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-2xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-2xl flex items-center gap-2.5 text-xs font-bold animate-bounce border border-slate-700">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
          <div className="space-y-1">
            <div className="flex items-center gap-2.5">
              <div className="p-2.5 rounded-2xl bg-blue-600/80 text-white shadow-md">
                <Shield className="w-6 h-6" />
              </div>
              <h1 className="text-xl font-black text-white">User Management Enterprise & RBAC System</h1>
            </div>
            <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
              Pusat kendali pengguna, 18 role terstruktur, matriks permission, menu management, sesi aktif, audit trail, & proteksi MFA.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setUserToEdit(null);
                setIsUserModalOpen(true);
              }}
              className="px-4 py-2.5 rounded-2xl text-xs font-extrabold bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/30 transition-all flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah User Baru</span>
            </button>
          </div>
        </div>
      </div>

      {/* Search Bar & Sub-Tabs Navigation */}
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari user, role, email, NIP/NISN, atau modul..."
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            />
          </div>
        </div>

        {/* Scrollable Sub-Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none border-b border-slate-200/80 dark:border-slate-800">
          {subTabItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as UserManagementSubTab)}
                className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
                {item.count !== null && (
                  <span
                    className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                    }`}
                  >
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Render Selected Sub-Tab */}
      <div className="min-h-[400px]">
        {activeTab === 'users' && (
          <UsersTab
            users={users}
            roles={roles}
            groups={groups}
            searchQuery={searchQuery}
            onAddUser={() => {
              setUserToEdit(null);
              setIsUserModalOpen(true);
            }}
            onEditUser={(u) => {
              setUserToEdit(u);
              setIsUserModalOpen(true);
            }}
            onDeleteUser={handleDeleteUser}
            onToggleStatus={handleToggleStatus}
            onResetPassword={handleResetPassword}
            onViewDetail={(u) => {
              setUserForDrawer(u);
              setIsDetailDrawerOpen(true);
            }}
            onExportUsers={handleExportUsers}
          />
        )}

        {activeTab === 'roles' && (
          <RolesTab
            roles={roles}
            onAddRole={() => {
              const newRole: RoleModel = {
                id: `role-custom-${Date.now()}`,
                name: 'Role Baru Custom',
                code: 'CUSTOM_ROLE',
                description: 'Custom Role baru yang dibuat oleh admin',
                isSystemRole: false,
                userCount: 0,
                permissionsCount: 10,
              };
              setRoles((prev) => [...prev, newRole]);
              showToast('Custom Role baru berhasil ditambahkan.');
            }}
            onEditRole={(r) => showToast(`Edit deskripsi untuk role ${r.name}`)}
            onDeleteRole={(id) => {
              setRoles((prev) => prev.filter((r) => r.id !== id));
              showToast('Role custom berhasil dihapus.');
            }}
          />
        )}

        {activeTab === 'permissions' && <PermissionsTab permissions={permissions} />}

        {activeTab === 'menu_management' && (
          <MenuManagementTab
            menus={menus}
            roles={roles}
            onToggleMenuVisibility={handleToggleMenuVisibility}
            onUpdateMenuRoles={handleUpdateMenuRoles}
          />
        )}

        {activeTab === 'role_matrix' && (
          <RoleMatrixTab
            roles={roles}
            permissions={permissions}
            rolePermissionMap={rolePermissionMap}
            onTogglePermission={handleToggleMatrixPermission}
            onSaveMatrix={handleSaveMatrix}
          />
        )}

        {activeTab === 'groups' && (
          <GroupsTab
            groups={groups}
            onAddGroup={() => {
              const ng: UserGroupModel = {
                id: `ug-${Date.now()}`,
                name: 'User Group Baru',
                code: 'GRP_NEW',
                description: 'Kelompok pengguna baru',
                userCount: 0,
                createdDate: new Date().toISOString().split('T')[0],
              };
              setGroups((prev) => [...prev, ng]);
              showToast('User Group baru berhasil ditambahkan.');
            }}
            onEditGroup={(g) => showToast(`Edit group ${g.name}`)}
            onDeleteGroup={(id) => {
              setGroups((prev) => prev.filter((g) => g.id !== id));
              showToast('Group berhasil dihapus.');
            }}
          />
        )}

        {activeTab === 'departments' && (
          <DepartmentsTab
            departments={departments}
            onAddDepartment={() => {
              const nd: DepartmentModel = {
                id: `dept-${Date.now()}`,
                name: 'Departemen Baru',
                code: 'NEW_DEPT',
                headName: 'Belum Ditunjuk',
                staffCount: 0,
                description: 'Unit kerja baru',
              };
              setDepartments((prev) => [...prev, nd]);
              showToast('Departemen baru berhasil ditambahkan.');
            }}
            onEditDepartment={(d) => showToast(`Edit departemen ${d.name}`)}
            onDeleteDepartment={(id) => {
              setDepartments((prev) => prev.filter((d) => d.id !== id));
              showToast('Departemen berhasil dihapus.');
            }}
          />
        )}

        {activeTab === 'positions' && (
          <PositionsTab
            positions={positions}
            onAddPosition={() => {
              const np: PositionModel = {
                id: `pos-${Date.now()}`,
                title: 'Jabatan Baru',
                departmentName: 'Direktorat Akademik & Kurikulum',
                level: 'Fungsional',
                totalHolders: 0,
              };
              setPositions((prev) => [...prev, np]);
              showToast('Jabatan baru berhasil ditambahkan.');
            }}
            onEditPosition={(p) => showToast(`Edit posisi ${p.title}`)}
            onDeletePosition={(id) => {
              setPositions((prev) => prev.filter((p) => p.id !== id));
              showToast('Jabatan berhasil dihapus.');
            }}
          />
        )}

        {activeTab === 'active_sessions' && (
          <ActiveSessionsTab
            sessions={sessions}
            onRevokeSession={handleRevokeSession}
            onRevokeAllOtherSessions={handleRevokeAllOther}
          />
        )}

        {activeTab === 'login_history' && <LoginHistoryTab loginHistory={loginHistory} />}

        {activeTab === 'devices' && (
          <DevicesTab devices={devices} onToggleDeviceStatus={handleToggleDeviceStatus} />
        )}

        {activeTab === 'audit_logs' && (
          <AuditLogsTab
            logs={auditLogs}
            onExportAuditLogs={(fmt) => showToast(`Exporting audit logs as ${fmt.toUpperCase()}...`)}
          />
        )}

        {activeTab === 'security' && <SecuritySettingsTab />}
      </div>

      {/* User Add/Edit Modal */}
      <UserModal
        isOpen={isUserModalOpen}
        onClose={() => setIsUserModalOpen(false)}
        userToEdit={userToEdit}
        onSave={handleSaveUser}
        roles={roles}
        groups={groups}
        departments={departments}
        positions={positions}
        existingUsers={users}
      />

      {/* User Detail Side Drawer */}
      <UserDetailDrawer
        isOpen={isDetailDrawerOpen}
        onClose={() => setIsDetailDrawerOpen(false)}
        user={userForDrawer}
      />
    </div>
  );
};
