import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AppView } from '../../types';
import {
  LayoutDashboard,
  Home,
  User,
  Settings,
  Bell,
  Database,
  ChevronLeft,
  ChevronRight,
  Shield,
  GraduationCap,
  Sparkles,
  Users,
  BookOpen,
  DollarSign,
  FileText,
  Activity,
  Layers,
  HelpCircle,
  Key,
  UserCheck,
  Globe,
  BookCheck,
  Award,
  Building2,
  Cpu,
  Boxes,
  Bot,
  Cloud
} from 'lucide-react';

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, setIsCollapsed }) => {
  const { view, setView, currentRole, t, notifications } = useApp();
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const navItems: {
    id: AppView;
    labelKey: string;
    icon: React.ElementType;
    badge?: number;
    rolesAllowed?: string[];
  }[] = [
    { id: 'dashboard', labelKey: 'dashboard', icon: LayoutDashboard },
    { id: 'ppdb', labelKey: 'ppdb', icon: GraduationCap },
    { id: 'master_siswa', labelKey: 'masterSiswa', icon: Users },
    { id: 'master_guru', labelKey: 'masterGuru', icon: UserCheck },
    { id: 'master_data', labelKey: 'masterData', icon: Layers },
    { id: 'user_management', labelKey: 'userManagement', icon: Shield },
    { id: 'global_platform', labelKey: 'globalPlatform', icon: Globe },
    { id: 'curriculum_framework', labelKey: 'curriculumFramework', icon: BookCheck },
    { id: 'certification_center', labelKey: 'certificationCenter', icon: Award },
    { id: 'smart_campus', labelKey: 'smartCampus', icon: Building2 },
    { id: 'global_analytics', labelKey: 'globalAnalytics', icon: Cpu },
    { id: 'platform_engineering', labelKey: 'platformEngineering', icon: Boxes },
    { id: 'autonomous_ai', labelKey: 'autonomousAi', icon: Bot },
    { id: 'edu_os', labelKey: 'eduOs', icon: Sparkles },
    { id: 'cloud_v5', labelKey: 'cloudV5', icon: Cloud },
    { id: 'landing', labelKey: 'landing', icon: Home },
    { id: 'notifications', labelKey: 'notifications', icon: Bell, badge: unreadCount },
    { id: 'profile', labelKey: 'profile', icon: User },
    { id: 'settings', labelKey: 'settings', icon: Settings },
    { id: 'database_schema', labelKey: 'databaseSchema', icon: Database },
  ];

  return (
    <aside
      id="main-app-sidebar"
      className={`relative border-r border-slate-200/80 dark:border-slate-800/80 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl transition-all duration-300 flex flex-col justify-between shrink-0 ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}
    >
      {/* Collapse Toggle Button */}
      <button
        id="sidebar-toggle-btn"
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-6 z-30 w-6 h-6 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-500 hover:text-blue-600 shadow-md transition-colors"
        title={isCollapsed ? 'Sembunyikan Sidebar' : 'Luaskan Sidebar'}
      >
        {isCollapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
      </button>

      {/* Top Nav Content */}
      <div className="p-3 space-y-6 overflow-y-auto">
        {/* Role Active Header Card */}
        {!isCollapsed && (
          <div className="p-3 rounded-2xl bg-gradient-to-br from-blue-900 via-slate-900 to-slate-950 text-white shadow-lg shadow-blue-900/10 border border-blue-800/40 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-2 opacity-15">
              <GraduationCap className="w-16 h-16 text-amber-400" />
            </div>
            <div className="relative z-10">
              <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30 mb-1">
                Active Session
              </span>
              <h3 className="text-xs font-extrabold text-white truncate">
                {t(currentRole)}
              </h3>
              <p className="text-[10px] text-slate-300 mt-1 line-clamp-2">
                {t(`roleDesc_${currentRole}`)}
              </p>
            </div>
          </div>
        )}

        {/* Main Navigation */}
        <div>
          {!isCollapsed && (
            <h4 className="px-3 text-[10px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
              Modul Utama
            </h4>
          )}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = view === item.id;

              return (
                <button
                  key={item.id}
                  id={`nav-item-${item.id}`}
                  onClick={() => setView(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all group relative ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-600/25'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/80 hover:text-slate-900 dark:hover:text-white'
                  }`}
                  title={isCollapsed ? t(item.labelKey) : undefined}
                >
                  <Icon
                    className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-110 ${
                      isActive ? 'text-amber-300' : 'text-slate-400 group-hover:text-blue-500'
                    }`}
                  />
                  {!isCollapsed && (
                    <span className="truncate flex-1 text-left">{t(item.labelKey)}</span>
                  )}
                  {!isCollapsed && item.badge && item.badge > 0 ? (
                    <span className="px-1.5 py-0.5 text-[10px] font-extrabold rounded-full bg-rose-500 text-white">
                      {item.badge}
                    </span>
                  ) : null}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Preview of Academic & Financial Modules (Phase 1 Ready Architecture) */}
        {!isCollapsed && (
          <div>
            <h4 className="px-3 text-[10px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
              Kesiapan Integrasi Phase 2
            </h4>
            <div className="space-y-1">
              {[
                { name: 'Kurikulum & RPP AI', icon: BookOpen, color: 'text-indigo-500' },
                { name: 'Modul Keuangan & SPP', icon: DollarSign, color: 'text-emerald-500' },
                { name: 'Presensi / Absensi QR', icon: Users, color: 'text-amber-500' },
                { name: 'Persuratan Digital TU', icon: FileText, color: 'text-blue-500' },
              ].map((m, idx) => {
                const MIcon = m.icon;
                return (
                  <div
                    key={idx}
                    className="flex items-center justify-between px-3 py-2 rounded-xl text-xs text-slate-400 dark:text-slate-500 bg-slate-50/50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800/60 opacity-80"
                  >
                    <div className="flex items-center gap-2 truncate">
                      <MIcon className={`w-3.5 h-3.5 ${m.color}`} />
                      <span className="truncate">{m.name}</span>
                    </div>
                    <span className="text-[9px] font-mono px-1 rounded bg-slate-200 dark:bg-slate-700 text-slate-500">
                      Ready
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Bottom SaaS License Badge */}
      {!isCollapsed ? (
        <div className="p-3 m-3 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 text-center">
          <div className="flex items-center justify-center gap-1.5 text-amber-600 dark:text-amber-400 text-[11px] font-bold">
            <Key className="w-3.5 h-3.5" />
            <span>SaaS License Active</span>
          </div>
          <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
            Enterprise White Label v1.0
          </p>
        </div>
      ) : (
        <div className="p-2 text-center text-amber-500">
          <Key className="w-4 h-4 mx-auto" />
        </div>
      )}
    </aside>
  );
};
