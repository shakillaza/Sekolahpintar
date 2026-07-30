import React from 'react';
import { useApp } from '../../context/AppContext';
import { Shield, Cpu, Activity } from 'lucide-react';

export const Footer: React.FC = () => {
  const { t, setView } = useApp();

  return (
    <footer
      id="main-app-footer"
      className="w-full border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-4 px-4 sm:px-6 lg:px-8 text-xs text-slate-500 dark:text-slate-400"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Cpu className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span className="font-semibold text-slate-700 dark:text-slate-300">
            Smart AI School Management System
          </span>
          <span className="text-slate-400">|</span>
          <span>{t('copyright')}</span>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-medium text-[11px]">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>{t('statusOnline')}</span>
          </div>

          <button
            id="footer-db-schema-link"
            onClick={() => setView('database_schema')}
            className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            PostgreSQL Migrations
          </button>

          <button
            id="footer-settings-link"
            onClick={() => setView('settings')}
            className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            SaaS License
          </button>
        </div>
      </div>
    </footer>
  );
};
