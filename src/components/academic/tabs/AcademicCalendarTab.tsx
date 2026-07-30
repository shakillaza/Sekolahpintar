import React, { useState } from 'react';
import { Calendar, Plus, Filter, Tag, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import { CalendarEventItem } from '../../../types/academicTypes';
import { initialCalendarEvents } from '../../../data/initialAcademicData';

export const AcademicCalendarTab: React.FC = () => {
  const [events] = useState<CalendarEventItem[]>(initialCalendarEvents);
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');

  const filteredEvents = events.filter(
    (e) => selectedCategory === 'Semua' || e.category === selectedCategory
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Calendar className="w-5 h-5 text-blue-600" />
            <span>Kalender Akademik Sekolah</span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Agenda kegiatan sekolah, jadwal libur, ujian PTS/PAS, rapat, dan kegiatan ekstrakurikuler.
          </p>
        </div>
        <button className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs flex items-center gap-2 shadow-sm">
          <Plus className="w-4 h-4" />
          <span>Tambah Agenda Akademik</span>
        </button>
      </div>

      {/* Filter Categories */}
      <div className="flex flex-wrap items-center gap-2">
        {['Semua', 'Agenda', 'Hari Libur', 'PTS', 'PAS', 'Rapat', 'Pelatihan'].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              selectedCategory === cat
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:bg-slate-100'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Agenda Event Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredEvents.map((evt) => (
          <div
            key={evt.id}
            className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3"
          >
            <div className="flex items-center justify-between">
              <span
                className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                  evt.category === 'Hari Libur'
                    ? 'bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 border border-rose-300'
                    : evt.category === 'PTS' || evt.category === 'PAS'
                    ? 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-300'
                    : 'bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-300'
                }`}
              >
                {evt.category}
              </span>
              <span className="text-[10px] text-slate-400 font-mono">Audience: {evt.targetAudience}</span>
            </div>

            <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-snug">
              {evt.title}
            </h4>

            <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
              <Clock className="w-3.5 h-3.5 text-blue-500" />
              <span>
                {evt.startDate} {evt.startDate !== evt.endDate ? `s/d ${evt.endDate}` : ''}
              </span>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed pt-2 border-t border-slate-100 dark:border-slate-800">
              {evt.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
