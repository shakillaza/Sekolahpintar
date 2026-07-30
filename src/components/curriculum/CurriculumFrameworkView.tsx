import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { mockCurriculums } from '../../data/globalEnterpriseData';
import {
  BookCheck,
  Award,
  Layers,
  Search,
  Plus,
  Sparkles,
  CheckCircle2,
  FileText,
  GitBranch,
  Filter,
  ArrowRight,
  Info,
  Building,
  Check,
  RefreshCw
} from 'lucide-react';

export const CurriculumFrameworkView: React.FC = () => {
  const { addToast } = useApp();
  const [activeTab, setActiveTab] = useState<'all' | 'mapping' | 'versioning'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTypeFilter, setSelectedTypeFilter] = useState<string>('ALL');

  const filteredCurriculums = mockCurriculums.filter((curr) => {
    const matchesSearch =
      curr.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      curr.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      curr.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedTypeFilter === 'ALL' || curr.type === selectedTypeFilter;
    return matchesSearch && matchesType;
  });

  const handleRunAiCurriculumAudit = (currName: string) => {
    addToast(
      'success',
      'AI Curriculum Audit Completed',
      `Audit pemetaan capaian pembelajaran (CP/TP) & keselarasan materi untuk ${currName} berhasil diverifikasi!`
    );
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-900 p-6 text-white shadow-xl border border-blue-800/40">
        <div className="absolute right-0 top-0 translate-x-10 -translate-y-10 opacity-10 pointer-events-none">
          <BookCheck className="h-64 w-64 text-amber-400" />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-400/30 uppercase tracking-wider flex items-center gap-1">
                <BookCheck className="w-3 h-3" /> Multi-Curriculum Engine
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                AI Cross-Mapping Enabled
              </span>
            </div>
            <h1 className="text-2xl font-black tracking-tight text-white">
              Curriculum Framework & Multi-Curriculum Engine
            </h1>
            <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Mendukung integrasi Kurikulum Merdeka, Cambridge Assessment, IB Diploma, Pesantren Kitab Kuning, dan SMK Dual System dengan pemetaan silabus otomatis berbasis AI.
            </p>
          </div>
          <div className="flex gap-2 shrink-0">
            <button
              onClick={() => handleRunAiCurriculumAudit('Seluruh Kerangka Kurikulum')}
              className="px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 rounded-xl text-xs font-bold shadow-lg shadow-amber-500/20 flex items-center gap-2 transition-all"
            >
              <Sparkles className="w-3.5 h-3.5" /> Audit AI Alignment
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-2 shadow-sm flex flex-wrap gap-2">
        <button
          onClick={() => setActiveTab('all')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'all'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <BookCheck className="w-4 h-4" /> Kerangka Kurikulum ({mockCurriculums.length})
        </button>
        <button
          onClick={() => setActiveTab('mapping')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'mapping'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <GitBranch className="w-4 h-4" /> Pemetaan Matakuliah (Cross-Mapping)
        </button>
        <button
          onClick={() => setActiveTab('versioning')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'versioning'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <FileText className="w-4 h-4" /> Riwayat Versi & Akreditasi
        </button>
      </div>

      {/* Filter Row */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Cari kurikulum, kode, atau deskripsi..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={selectedTypeFilter}
            onChange={(e) => setSelectedTypeFilter(e.target.value)}
            className="px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="ALL">Semua Jenis Kurikulum</option>
            <option value="National">Nasional (Kemendikbud)</option>
            <option value="International">International (Cambridge / IB)</option>
            <option value="Islamic">Islamic / Pesantren</option>
            <option value="Vocational">Vokasi SMK / Industri</option>
          </select>
        </div>
      </div>

      {/* TAB 1: Curriculum List */}
      {activeTab === 'all' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredCurriculums.map((curr) => (
            <div
              key={curr.id}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-blue-500/50 transition-all flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                        {curr.code}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                        {curr.type}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white mt-1">
                      {curr.name}
                    </h3>
                  </div>
                  <span className="text-[10px] font-extrabold px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 shrink-0">
                    {curr.version}
                  </span>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                  {curr.description}
                </p>

                {/* Grade levels tags */}
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {curr.gradeLevels.map((lvl, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                    >
                      {lvl}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
                <span className="font-semibold text-slate-700 dark:text-slate-300">
                  {curr.subjectsCount} Mata Pelajaran Utama
                </span>
                <span className="text-[11px] font-mono text-slate-400">
                  {curr.accreditationBody}
                </span>
              </div>

              <div className="flex gap-2 pt-1">
                <button
                  onClick={() => handleRunAiCurriculumAudit(curr.name)}
                  className="w-full py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Verify AI Mapping
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 2: Curriculum Cross-Mapping */}
      {activeTab === 'mapping' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Matrix Pemetaan Silabus & Mata Pelajaran Lintas Kurikulum
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Memetakan mata pelajaran Kurikulum Merdeka ke kode mata pelajaran Cambridge IGCSE / IB Diploma untuk program kelas internasional.
              </p>
            </div>
            <button
              onClick={() => handleRunAiCurriculumAudit('Sistem Alignment Cross-Mapping')}
              className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md shadow-blue-600/20"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Sync Alignment
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600 dark:text-slate-400">
              <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 font-bold uppercase text-[10px] tracking-wider border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="p-3">Matapel Kurikulum Merdeka</th>
                  <th className="p-3">Ekuivalen Cambridge IGCSE</th>
                  <th className="p-3">Ekuivalen IB Diploma</th>
                  <th className="p-3">Status Keselarasan AI</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {[
                  { id: 1, idTitle: 'Matematika Tingkat Lanjut', camb: 'IGCSE Mathematics (0580)', ib: 'Mathematics: Analysis and Approaches SL/HL', score: '98% Aligned' },
                  { id: 2, idTitle: 'Fisika Terpadu', camb: 'IGCSE Physics (0625)', ib: 'Physics Standard/Higher Level', score: '95% Aligned' },
                  { id: 3, idTitle: 'Bahasa Inggris Tingkat Lanjut', camb: 'IGCSE English First Language (0500)', ib: 'English A: Language and Literature', score: '99% Aligned' },
                  { id: 4, idTitle: 'Informatika & AI Center', camb: 'IGCSE Computer Science (0478)', ib: 'Computer Science SL/HL', score: '96% Aligned' },
                ].map((row) => (
                  <tr key={row.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                    <td className="p-3 font-bold text-slate-900 dark:text-white">{row.idTitle}</td>
                    <td className="p-3 font-semibold text-blue-600 dark:text-blue-400">{row.camb}</td>
                    <td className="p-3 font-semibold text-indigo-600 dark:text-indigo-400">{row.ib}</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 flex items-center gap-1 w-max">
                        <Check className="w-3 h-3" /> {row.score}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: Versioning & Audit */}
      {activeTab === 'versioning' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Versi Silabus & Kebijakan Akreditasi
          </h3>
          <p className="text-xs text-slate-500">
            Seluruh perubahan CP/TP dan modul ajar tercatat secara otomatis pada Audit Trail Kurikulum.
          </p>

          <div className="space-y-3 pt-2">
            {[
              { version: 'v2026.2', name: 'Pembaruan Kurikulum Merdeka Fase F & P5 AI Project', date: '12 Juli 2026', actor: 'Kemendikbudristek API Sync' },
              { version: 'v2025/26', name: 'Update Cambridge Lower Secondary Stage 9 Science', date: '01 Juni 2026', actor: 'Cambridge Assessment International' },
              { version: 'v3.0', name: 'Integrasi Sertifikasi BNSP & Teaching Factory SMK', date: '15 Mei 2026', actor: 'Konsorsium Vokasi' },
            ].map((v, i) => (
              <div key={i} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                      {v.version}
                    </span>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">{v.name}</h4>
                  </div>
                  <span className="text-[10px] text-slate-400 mt-1 block">Oleh: {v.actor}</span>
                </div>
                <span className="text-xs text-slate-500 font-mono">{v.date}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
