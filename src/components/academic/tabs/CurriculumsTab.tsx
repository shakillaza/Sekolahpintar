import React, { useState } from 'react';
import { Plus, BookOpen, CheckCircle, Search, Sparkles } from 'lucide-react';
import { CurriculumItem } from '../../../types/academicTypes';
import { initialCurriculums } from '../../../data/initialAcademicData';

export const CurriculumsTab: React.FC = () => {
  const [curriculums] = useState<CurriculumItem[]>(initialCurriculums);
  const [selectedType, setSelectedType] = useState<string>('Semua');

  const filtered = curriculums.filter(
    (c) => selectedType === 'Semua' || c.type === selectedType
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span>Struktur Kurikulum Sekolah</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
              Multi-Kurikulum Supported
            </span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Dukung Kurikulum Merdeka, K13, Internasional Cambridge, Pesantren, dan Custom Yayasan.
          </p>
        </div>
        <button className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs flex items-center gap-2 shadow-sm">
          <Plus className="w-4 h-4" />
          <span>Tambah Kurikulum Baru</span>
        </button>
      </div>

      {/* Type Filters */}
      <div className="flex flex-wrap items-center gap-2">
        {['Semua', 'Kurikulum Merdeka', 'Kurikulum 2013', 'Kurikulum Internasional', 'Kurikulum Pesantren'].map(
          (type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedType === type
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100 border border-slate-200 dark:border-slate-800'
              }`}
            >
              {type}
            </button>
          )
        )}
      </div>

      {/* Curriculum Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow space-y-3"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">
                    {item.code}
                  </span>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white">
                    {item.name}
                  </h4>
                </div>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-300">
                {item.type}
              </span>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              {item.description}
            </p>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
              <div className="flex items-center gap-4 text-slate-500">
                <span>Jenjang: <strong className="text-slate-800 dark:text-slate-200">{item.schoolLevel}</strong></span>
                <span>Mapel: <strong className="text-slate-800 dark:text-slate-200">{item.totalSubjects} Mapel</strong></span>
              </div>
              <button className="text-xs font-bold text-blue-600 hover:underline">
                Kelola Struktur
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
