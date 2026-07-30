import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { AppView, UserRole } from '../../types';
import {
  Search,
  Sparkles,
  LayoutDashboard,
  Settings,
  User,
  Bell,
  Database,
  Home,
  Shield,
  X
} from 'lucide-react';

export const CommandPalette: React.FC = () => {
  const {
    isCommandPaletteOpen,
    setIsCommandPaletteOpen,
    setView,
    setRole,
    setIsAiModalOpen,
    t
  } = useApp();

  const [query, setQuery] = useState('');

  // Listen for Ctrl+K keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(!isCommandPaletteOpen);
      } else if (e.key === 'Escape' && isCommandPaletteOpen) {
        setIsCommandPaletteOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCommandPaletteOpen, setIsCommandPaletteOpen]);

  if (!isCommandPaletteOpen) return null;

  const actions = [
    {
      title: 'Tanya Asisten AI Sekolah',
      category: 'AI Powered',
      icon: Sparkles,
      color: 'text-amber-500',
      action: () => {
        setIsCommandPaletteOpen(false);
        setIsAiModalOpen(true);
      },
    },
    {
      title: 'Kelola Master Data Sekolah',
      category: 'Master Data',
      icon: Database,
      color: 'text-blue-600',
      action: () => {
        setView('master_data');
        setIsCommandPaletteOpen(false);
      },
    },
    {
      title: 'User Management & RBAC Security',
      category: 'Security & Auth',
      icon: Shield,
      color: 'text-amber-500',
      action: () => {
        setView('user_management');
        setIsCommandPaletteOpen(false);
      },
    },
    {
      title: 'Buka Dashboard Utama',
      category: 'Navigasi',
      icon: LayoutDashboard,
      color: 'text-blue-500',
      action: () => {
        setView('dashboard');
        setIsCommandPaletteOpen(false);
      },
    },
    {
      title: 'Halaman Depan Landing SaaS',
      category: 'Navigasi',
      icon: Home,
      color: 'text-indigo-500',
      action: () => {
        setView('landing');
        setIsCommandPaletteOpen(false);
      },
    },
    {
      title: 'Pengaturan Sistem & License Key',
      category: 'Sistem',
      icon: Settings,
      color: 'text-emerald-500',
      action: () => {
        setView('settings');
        setIsCommandPaletteOpen(false);
      },
    },
    {
      title: 'Lihat PostgreSQL Database Schema',
      category: 'Database',
      icon: Database,
      color: 'text-purple-500',
      action: () => {
        setView('database_schema');
        setIsCommandPaletteOpen(false);
      },
    },
    {
      title: 'Notifikasi & System Alert',
      category: 'Sistem',
      icon: Bell,
      color: 'text-rose-500',
      action: () => {
        setView('notifications');
        setIsCommandPaletteOpen(false);
      },
    },
  ];

  const filteredActions = actions.filter(
    (a) =>
      a.title.toLowerCase().includes(query.toLowerCase()) ||
      a.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div
      id="command-palette-backdrop"
      className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-start justify-center pt-20 px-4 animate-in fade-in duration-200"
      onClick={() => setIsCommandPaletteOpen(false)}
    >
      <div
        id="command-palette-modal"
        className="w-full max-w-xl rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-200 dark:border-slate-800">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            type="text"
            placeholder="Cari perintah, navigasi, atau pemicu AI..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
            autoFocus
          />
          <button
            onClick={() => setIsCommandPaletteOpen(false)}
            className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {filteredActions.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-400">
              Tidak ada perintah yang sesuai dengan "{query}".
            </div>
          ) : (
            filteredActions.map((item, idx) => {
              const Icon = item.icon;
              return (
                <button
                  key={idx}
                  id={`cmd-item-${idx}`}
                  onClick={item.action}
                  className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/80 text-left transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 group-hover:bg-white dark:group-hover:bg-slate-700 transition-colors">
                      <Icon className={`w-4 h-4 ${item.color}`} />
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-slate-900 dark:text-slate-100">
                        {item.title}
                      </h4>
                      <p className="text-[10px] text-slate-400">{item.category}</p>
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">Pilih &crarr;</span>
                </button>
              );
            })
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-4 py-2.5 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 flex items-center justify-between text-[11px] text-slate-400">
          <span>
            Tekan <kbd className="px-1 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300">Esc</kbd> untuk menutup
          </span>
          <span className="flex items-center gap-1 font-semibold text-blue-600 dark:text-blue-400">
            <Sparkles className="w-3 h-3 text-amber-400" /> Smart AI School OS
          </span>
        </div>
      </div>
    </div>
  );
};
