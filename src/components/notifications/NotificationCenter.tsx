import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Bell,
  CheckCircle2,
  AlertTriangle,
  Info,
  Sparkles,
  DollarSign,
  BookOpen,
  Check
} from 'lucide-react';

export const NotificationCenter: React.FC = () => {
  const { notifications, markNotificationRead, markAllNotificationsRead, t } = useApp();
  const [filter, setFilter] = useState<'all' | 'unread' | 'ai_alert' | 'financial' | 'academic'>('all');

  const filtered = notifications.filter((n) => {
    if (filter === 'unread') return !n.isRead;
    if (filter === 'ai_alert') return n.category === 'ai_alert';
    if (filter === 'financial') return n.category === 'financial';
    if (filter === 'academic') return n.category === 'academic';
    return true;
  });

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12 animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <Bell className="w-5 h-5 text-amber-500" />
            <span>Pusat Notifikasi System</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Daftar pengumuman, transaksi keuangan, & alert kecerdasan AI
          </p>
        </div>

        <button
          onClick={markAllNotificationsRead}
          className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 transition-colors flex items-center gap-2"
        >
          <Check className="w-4 h-4 text-emerald-500" />
          <span>Tandai Semua Dibaca</span>
        </button>
      </div>

      {/* Category Filter Pills */}
      <div className="flex gap-2 border-b border-slate-200 dark:border-slate-800 pb-2 overflow-x-auto scrollbar-none">
        {[
          { id: 'all', label: 'Semua Notifikasi' },
          { id: 'unread', label: 'Belum Dibaca' },
          { id: 'ai_alert', label: 'AI Smart Alert' },
          { id: 'financial', label: 'Keuangan SPP' },
          { id: 'academic', label: 'Akademik' },
        ].map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id as any)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              filter === f.id
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                : 'bg-slate-100 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="p-12 text-center text-xs text-slate-400 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
            Tidak ada notifikasi dalam kategori ini.
          </div>
        ) : (
          filtered.map((item) => {
            const getCategoryIcon = () => {
              switch (item.category) {
                case 'ai_alert':
                  return <Sparkles className="w-5 h-5 text-amber-500" />;
                case 'financial':
                  return <DollarSign className="w-5 h-5 text-emerald-500" />;
                case 'academic':
                  return <BookOpen className="w-5 h-5 text-blue-500" />;
                default:
                  return <Info className="w-5 h-5 text-purple-500" />;
              }
            };

            return (
              <div
                key={item.id}
                onClick={() => markNotificationRead(item.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start justify-between gap-4 ${
                  !item.isRead
                    ? 'bg-blue-50/50 dark:bg-blue-950/20 border-blue-500/40 shadow-sm'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 opacity-80'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 shrink-0">
                    {getCategoryIcon()}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                      {item.title}
                      {!item.isRead && (
                        <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                      )}
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                      {item.message}
                    </p>
                    <span className="text-[10px] text-slate-400 mt-2 block">
                      {item.timestamp}
                    </span>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
