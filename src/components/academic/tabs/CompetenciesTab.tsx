import React, { useState } from 'react';
import { Plus, Award, FileText, Search, Sparkles } from 'lucide-react';
import { CompetencyItem } from '../../../types/academicTypes';
import { initialCompetencies } from '../../../data/initialAcademicData';

export const CompetenciesTab: React.FC = () => {
  const [competencies] = useState<CompetencyItem[]>(initialCompetencies);
  const [selectedType, setSelectedType] = useState<string>('Semua');

  const filtered = competencies.filter(
    (c) => selectedType === 'Semua' || c.type === selectedType
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span>Kompetensi & Modul Ajar AI</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
              CP, TP, ATP & KD K13
            </span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Capaian Pembelajaran (CP), Tujuan Pembelajaran (TP), Alur (ATP), KD K13, dan Modul Ajar Silabus.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-extrabold text-xs flex items-center gap-1.5 shadow-sm">
            <Sparkles className="w-4 h-4" />
            <span>Generate RPP/Modul AI</span>
          </button>
          <button className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs flex items-center gap-2 shadow-sm">
            <Plus className="w-4 h-4" />
            <span>Tambah Kompetensi</span>
          </button>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {['Semua', 'CP', 'TP', 'ATP', 'KD', 'Indikator'].map((t) => (
          <button
            key={t}
            onClick={() => setSelectedType(t)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              selectedType === t
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:bg-slate-100'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 border border-indigo-200">
                {item.type} • Kelas {item.gradeLevel}
              </span>
              <span className="text-[10px] font-mono text-slate-400 font-bold">{item.code}</span>
            </div>

            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
              {item.title}
            </h4>
            <p className="text-xs font-semibold text-blue-600 dark:text-blue-400">
              Mapel: {item.subjectName}
            </p>

            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed pt-2 border-t border-slate-100 dark:border-slate-800">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
