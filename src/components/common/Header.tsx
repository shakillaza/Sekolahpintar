import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';
import {
  Sparkles,
  Search,
  Bell,
  Sun,
  Moon,
  Globe,
  ChevronDown,
  Shield,
  User as UserIcon,
  Settings as SettingsIcon,
  LogOut,
  Building2,
  Database,
  Cpu
} from 'lucide-react';

export const Header: React.FC = () => {
  const {
    user,
    currentRole,
    setRole,
    school,
    theme,
    toggleTheme,
    language,
    toggleLanguage,
    view,
    setView,
    notifications,
    setIsAiModalOpen,
    setIsCommandPaletteOpen,
    t
  } = useApp();

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const rolesList: { id: UserRole; nameKey: string; icon: string }[] = [
    { id: 'super_admin', nameKey: 'super_admin', icon: '👑' },
    { id: 'yayasan', nameKey: 'yayasan', icon: '🏛️' },
    { id: 'kepala_sekolah', nameKey: 'kepala_sekolah', icon: '🎓' },
    { id: 'guru', nameKey: 'guru', icon: '📚' },
    { id: 'wali_kelas', nameKey: 'wali_kelas', icon: '📋' },
    { id: 'tata_usaha', nameKey: 'tata_usaha', icon: '📁' },
    { id: 'bendahara', nameKey: 'bendahara', icon: '💰' },
    { id: 'operator', nameKey: 'operator', icon: '⚙️' },
    { id: 'orang_tua', nameKey: 'orang_tua', icon: '👨‍👩‍👧' },
    { id: 'siswa', nameKey: 'siswa', icon: '🎒' },
  ];

  return (
    <header
      id="main-app-header"
      className="sticky top-0 z-40 w-full border-b border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left: Brand / Logo */}
        <div className="flex items-center gap-3">
          <button
            id="brand-logo-btn"
            onClick={() => setView('dashboard')}
            className="flex items-center gap-2.5 text-left group focus:outline-none"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 via-blue-600 to-amber-500 p-0.5 shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform duration-200">
              <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
                <Cpu className="w-5 h-5 text-amber-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base tracking-tight bg-gradient-to-r from-blue-900 via-blue-700 to-amber-600 dark:from-white dark:via-slate-200 dark:to-amber-400 bg-clip-text text-transparent">
                  Smart AI School
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-amber-500/10 dark:bg-amber-400/20 text-amber-700 dark:text-amber-300 border border-amber-500/20">
                  AI OS
                </span>
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium truncate max-w-[180px] sm:max-w-xs">
                {school.name}
              </p>
            </div>
          </button>
        </div>

        {/* Middle: Global Command Search Trigger */}
        <div className="hidden md:flex flex-1 max-w-md mx-4">
          <button
            id="global-search-trigger"
            onClick={() => setIsCommandPaletteOpen(true)}
            className="w-full flex items-center justify-between px-3.5 py-2 rounded-xl bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs text-slate-500 dark:text-slate-400 hover:border-blue-500 dark:hover:border-blue-400 hover:bg-slate-50 dark:hover:bg-slate-800/90 transition-all shadow-inner"
          >
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4 text-slate-400" />
              <span className="truncate">{t('searchPlaceholder')}</span>
            </div>
            <kbd className="hidden lg:inline-block px-1.5 py-0.5 text-[10px] font-mono font-semibold bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded text-slate-400 shadow-xs">
              Ctrl+K
            </kbd>
          </button>
        </div>

        {/* Right: Actions, Role Switcher, Language, Theme, Notifications, User */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* AI Quick Assistant Trigger Button */}
          <button
            id="header-ai-assistant-btn"
            onClick={() => setIsAiModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 text-white text-xs font-semibold shadow-md shadow-blue-600/20 hover:shadow-blue-600/30 hover:scale-[1.02] active:scale-95 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
            <span className="hidden sm:inline">AI Assistant</span>
          </button>

          {/* Role Switcher Dropdown (Key Enterprise RBAC Feature) */}
          <div className="relative">
            <button
              id="role-switcher-dropdown-btn"
              onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-500/50 text-xs font-medium text-slate-700 dark:text-slate-200 transition-colors"
              title="Ganti Role Simulasi RBAC"
            >
              <Shield className="w-3.5 h-3.5 text-amber-500" />
              <span className="hidden lg:inline font-bold text-blue-700 dark:text-blue-400">
                {t(currentRole)}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {isRoleDropdownOpen && (
              <div
                id="role-dropdown-menu"
                className="absolute right-0 mt-2 w-64 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl py-2 z-50 animate-in fade-in zoom-in-95 duration-150"
              >
                <div className="px-3 py-1.5 border-b border-slate-100 dark:border-slate-800">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    Simulasi Role User (RBAC Matrix)
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Pilih role untuk melihat tampilan khusus stakeholder.
                  </p>
                </div>
                <div className="max-h-64 overflow-y-auto py-1">
                  {rolesList.map((r) => (
                    <button
                      key={r.id}
                      id={`role-option-${r.id}`}
                      onClick={() => {
                        setRole(r.id);
                        setIsRoleDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 text-xs text-left transition-colors ${
                        currentRole === r.id
                          ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-bold'
                          : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      <span className="flex items-center gap-2 truncate">
                        <span>{r.icon}</span>
                        <span>{t(r.nameKey)}</span>
                      </span>
                      {currentRole === r.id && (
                        <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Language Switcher */}
          <button
            id="header-language-toggle-btn"
            onClick={toggleLanguage}
            className="flex items-center gap-1 p-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title={t('switchLanguage')}
          >
            <Globe className="w-4 h-4 text-slate-500" />
            <span className="uppercase text-[11px]">{language}</span>
          </button>

          {/* Dark / Light Mode Toggle */}
          <button
            id="header-theme-toggle-btn"
            onClick={toggleTheme}
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title={theme === 'light' ? t('darkMode') : t('lightMode')}
          >
            {theme === 'light' ? (
              <Moon className="w-4 h-4 text-slate-600" />
            ) : (
              <Sun className="w-4 h-4 text-amber-400" />
            )}
          </button>

          {/* Notification Icon */}
          <button
            id="header-notifications-btn"
            onClick={() => setView('notifications')}
            className="relative p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title={t('notifications')}
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-rose-500 ring-2 ring-white dark:ring-slate-900 animate-ping"></span>
            )}
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-rose-500 ring-2 ring-white dark:ring-slate-900"></span>
            )}
          </button>

          {/* User Profile Dropdown */}
          <div className="relative">
            <button
              id="header-user-avatar-btn"
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex items-center gap-2 p-1 rounded-full hover:ring-2 hover:ring-blue-500/30 transition-all"
            >
              <img
                src={user.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'}
                alt={user.name}
                className="w-8 h-8 rounded-full object-cover ring-1 ring-amber-500/50 shadow-sm"
              />
            </button>

            {isUserMenuOpen && (
              <div
                id="user-profile-menu"
                className="absolute right-0 mt-2 w-64 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150"
              >
                <div className="p-3 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 rounded-xl mb-1">
                  <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                    {user.name}
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                    {user.email}
                  </p>
                  <div className="mt-2 flex items-center gap-1.5">
                    <span className="px-2 py-0.5 text-[10px] font-semibold rounded-md bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-300">
                      {t(user.role)}
                    </span>
                    <span className="text-[10px] text-slate-400">NIP/NISN: {user.nip_nisn || '-'}</span>
                  </div>
                </div>

                <div className="space-y-0.5">
                  <button
                    id="user-menu-profile-btn"
                    onClick={() => {
                      setView('profile');
                      setIsUserMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    <UserIcon className="w-4 h-4 text-blue-500" />
                    <span>{t('profile')}</span>
                  </button>

                  <button
                    id="user-menu-settings-btn"
                    onClick={() => {
                      setView('settings');
                      setIsUserMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    <SettingsIcon className="w-4 h-4 text-amber-500" />
                    <span>{t('settings')}</span>
                  </button>

                  <button
                    id="user-menu-db-schema-btn"
                    onClick={() => {
                      setView('database_schema');
                      setIsUserMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    <Database className="w-4 h-4 text-purple-500" />
                    <span>{t('databaseSchema')}</span>
                  </button>

                  <div className="my-1 border-t border-slate-100 dark:border-slate-800"></div>

                  <button
                    id="user-menu-logout-btn"
                    onClick={() => {
                      setView('login');
                      setIsUserMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-lg text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>{t('logout')}</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
