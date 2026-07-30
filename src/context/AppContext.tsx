import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  User,
  UserRole,
  School,
  ThemeMode,
  Language,
  AppView,
  NotificationItem,
  ActivityLog,
  SystemSettings,
  ToastMessage
} from '../types';
import {
  mockUsers,
  mockSchools,
  initialNotifications,
  initialActivityLogs,
  defaultSettings
} from '../data/initialData';
import { translations } from '../data/translations';

interface AppContextType {
  user: User;
  currentRole: UserRole;
  school: School;
  theme: ThemeMode;
  language: Language;
  view: AppView;
  notifications: NotificationItem[];
  activityLogs: ActivityLog[];
  settings: SystemSettings;
  toasts: ToastMessage[];
  isAiModalOpen: boolean;
  isCommandPaletteOpen: boolean;
  
  // Actions
  setRole: (role: UserRole) => void;
  setView: (view: AppView) => void;
  setTheme: (theme: ThemeMode) => void;
  setLanguage: (lang: Language) => void;
  toggleTheme: () => void;
  toggleLanguage: () => void;
  addToast: (type: ToastMessage['type'], title: string, message: string) => void;
  removeToast: (id: string) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  updateSettings: (newSettings: Partial<SystemSettings>) => void;
  setIsAiModalOpen: (open: boolean) => void;
  setIsCommandPaletteOpen: (open: boolean) => void;
  t: (key: string) => string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentRole, setCurrentRole] = useState<UserRole>('kepala_sekolah');
  const [user, setUser] = useState<User>(mockUsers['kepala_sekolah']);
  const [school, setSchool] = useState<School>(mockSchools[0]);
  const [theme, setThemeState] = useState<ThemeMode>('light');
  const [language, setLanguageState] = useState<Language>('id');
  const [view, setView] = useState<AppView>('landing');
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>(initialActivityLogs);
  const [settings, setSettings] = useState<SystemSettings>(defaultSettings);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  // Initialize theme from system/localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('smart_school_theme') as ThemeMode;
    if (savedTheme) {
      setThemeState(savedTheme);
      if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, []);

  const setTheme = (newTheme: ThemeMode) => {
    setThemeState(newTheme);
    localStorage.setItem('smart_school_theme', newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const toggleLanguage = () => {
    setLanguageState(language === 'id' ? 'en' : 'id');
  };

  const setRole = (role: UserRole) => {
    setCurrentRole(role);
    setUser(mockUsers[role] || mockUsers['kepala_sekolah']);
    addToast(
      'info',
      'Role Switcher',
      `Berhasil beralih ke role ${translations[language][role] || role}`
    );
  };

  const addToast = (type: ToastMessage['type'], title: string, message: string) => {
    const id = 'toast_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4);
    setToasts((prev) => [...prev, { id, type, title, message }]);

    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const markNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    addToast('success', 'Notifikasi', 'Semua notifikasi telah ditandai dibaca.');
  };

  const updateSettings = (newSettings: Partial<SystemSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
    addToast('success', 'Pengaturan Disimpan', 'Konfigurasi sistem telah diperbarui.');
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <AppContext.Provider
      value={{
        user,
        currentRole,
        school,
        theme,
        language,
        view,
        notifications,
        activityLogs,
        settings,
        toasts,
        isAiModalOpen,
        isCommandPaletteOpen,
        setRole,
        setView,
        setTheme,
        setLanguage,
        toggleTheme,
        toggleLanguage,
        addToast,
        removeToast,
        markNotificationRead,
        markAllNotificationsRead,
        updateSettings,
        setIsAiModalOpen,
        setIsCommandPaletteOpen,
        t,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
