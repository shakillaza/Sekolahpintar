import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { mockAiOrchestrationRoutes } from '../../data/globalEnterpriseData';
import {
  Cpu,
  Sparkles,
  BarChart3,
  ShieldCheck,
  Search,
  Zap,
  TrendingUp,
  Activity,
  Layers,
  ArrowUpRight,
  Database,
  Globe2,
  DollarSign,
  Lock,
  RefreshCcw,
  Check
} from 'lucide-react';

export const GlobalAnalyticsView: React.FC = () => {
  const { addToast } = useApp();
  const [activeTab, setActiveTab] = useState<'orchestration' | 'compliance' | 'universal_search'>('orchestration');
  const [searchQuery, setSearchQuery] = useState('');
  const [routesList, setRoutesList] = useState(mockAiOrchestrationRoutes);

  const handleToggleRoute = (id: string) => {
    setRoutesList(prev =>
      prev.map(r => r.id === id ? { ...r, status: r.status === 'enabled' ? 'disabled' : 'enabled' } : r)
    );
    addToast('info', 'AI Route Configuration Updated', 'Routing model & fallback strategy berhasil diperbarui.');
  };

  const handleRunSemanticSearch = (e: React.FormEvent) => {
    e.preventDefault();
    addToast('success', 'Universal Semantic Search Complete', `Menemukan 14 hasil relevan di seluruh database sekolah, dokumen RPP, dan riwayat siswa.`);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-purple-950 to-blue-900 p-6 text-white shadow-xl border border-purple-800/40">
        <div className="absolute right-0 top-0 translate-x-10 -translate-y-10 opacity-10 pointer-events-none">
          <Cpu className="h-64 w-64 text-purple-400" />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-500/20 text-purple-300 border border-purple-400/30 uppercase tracking-wider flex items-center gap-1">
                <Cpu className="w-3 h-3" /> AI Native Orchestration
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                Gemini 2.5 Flash / Pro Powered
              </span>
            </div>
            <h1 className="text-2xl font-black tracking-tight text-white">
              Global Analytics & AI Experience Routing
            </h1>
            <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Pusat orchestrasi AI pintar, pemeta beban latensi model, optimasi biaya token bulanan, Universal Vector Search, dan kepatuhan privasi data internasional.
            </p>
          </div>
          <div className="flex gap-2 shrink-0">
            <button
              onClick={() => addToast('success', 'AI Routing Optimization', 'Optimasi beban model Gemini 2.5 Flash & Pro berhasil diprioritaskan untuk latensi minimum <200ms.')}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-purple-600/30 flex items-center gap-2 transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" /> Auto-Tune AI Routing
            </button>
          </div>
        </div>
      </div>

      {/* Analytics Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
          <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 border border-purple-100 dark:border-purple-900/50">
            <Zap className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Rata-rata Latensi AI</p>
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mt-0.5">245 ms</h3>
            <span className="text-[10px] text-emerald-600 font-bold mt-0.5 block flex items-center gap-0.5">
              <TrendingUp className="w-3 h-3" /> Ultra Low Latency
            </span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
          <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/50">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Biaya Token Bulanan</p>
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mt-0.5">$489.70</h3>
            <span className="text-[10px] text-emerald-600 font-bold mt-0.5 block">32% Cost Saved via Flash</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
          <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900/50">
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Total AI Invocations</p>
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mt-0.5">1.42M Calls</h3>
            <span className="text-[10px] text-blue-600 font-bold mt-0.5 block">99.98% Model Success</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
          <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 border border-amber-100 dark:border-amber-900/50">
            <Lock className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Data Vault Residency</p>
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mt-0.5">Strict Enforced</h3>
            <span className="text-[10px] text-emerald-600 font-bold mt-0.5 block">Zero AI Data Leakage</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-2 shadow-sm flex flex-wrap gap-2">
        <button
          onClick={() => setActiveTab('orchestration')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'orchestration'
              ? 'bg-purple-600 text-white shadow-md shadow-purple-600/20'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Cpu className="w-4 h-4" /> Routing Model & Fallback Strategy ({routesList.length})
        </button>
        <button
          onClick={() => setActiveTab('universal_search')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'universal_search'
              ? 'bg-purple-600 text-white shadow-md shadow-purple-600/20'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Search className="w-4 h-4" /> Universal Vector Search & Indexing
        </button>
        <button
          onClick={() => setActiveTab('compliance')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'compliance'
              ? 'bg-purple-600 text-white shadow-md shadow-purple-600/20'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <ShieldCheck className="w-4 h-4" /> Privacy & Compliance Vault (UU PDP)
        </button>
      </div>

      {/* TAB 1: AI Orchestration */}
      {activeTab === 'orchestration' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
          <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Rute Model AI & Strategi Failover Otomatis
              </h3>
              <p className="text-xs text-slate-500">
                Memilih model AI terbaik berdasarkan jenis tugas (RAG, Chatbot, Visual OCR, BI Analytics) untuk efisiensi biaya dan performa.
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600 dark:text-slate-400">
              <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 font-bold uppercase text-[10px] tracking-wider border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="p-4">Use Case / Fitur AI</th>
                  <th className="p-4">Primary Model</th>
                  <th className="p-4">Fallback Model</th>
                  <th className="p-4">Avg Latency</th>
                  <th className="p-4">Estimasi Biaya / Bln</th>
                  <th className="p-4">Status Route</th>
                  <th className="p-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {routesList.map((route) => (
                  <tr key={route.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                    <td className="p-4 font-bold text-slate-900 dark:text-white">{route.useCase}</td>
                    <td className="p-4">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300">
                        {route.primaryModel}
                      </span>
                    </td>
                    <td className="p-4 font-mono text-[11px] text-slate-500">{route.fallbackModel}</td>
                    <td className="p-4 font-mono font-semibold text-emerald-600">{route.latencyAvgMs} ms</td>
                    <td className="p-4 font-bold text-slate-900 dark:text-white">${route.monthlyCostUSD}</td>
                    <td className="p-4">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        route.status === 'enabled'
                          ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                      }`}>
                        {route.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => handleToggleRoute(route.id)}
                        className="px-3 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-lg text-[11px] font-bold"
                      >
                        Toggle Status
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: Universal Vector Search */}
      {activeTab === 'universal_search' && (
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm max-w-2xl mx-auto space-y-4">
          <div className="text-center space-y-2">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Universal Semantic Vector Search (RAG Index)
            </h3>
            <p className="text-xs text-slate-500">
              Pencarian lintas modul berbasis natural language AI (Dokumen RPP, Data Nilai, Peraturan Sekolah, Keuangan).
            </p>
          </div>

          <form onSubmit={handleRunSemanticSearch} className="flex gap-2">
            <input
              type="text"
              placeholder="Contoh: Cari siswa yang berprestasi sains dan berhak beasiswa..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              type="submit"
              className="px-5 py-2.5 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-bold shrink-0 shadow-md shadow-purple-600/20"
            >
              Cari Vector AI
            </button>
          </form>
        </div>
      )}

      {/* TAB 3: Compliance Vault */}
      {activeTab === 'compliance' && (
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-500" /> Standar Kepatuhan Data (Data Protection & Privacy)
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">UU PDP No. 27/2022</span>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white">Pelindungan Data Pribadi Indonesia</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Enkripsi data NISN/NIK siswa di tingkat database transaksi & logik persetujuan hak akses data orang tua.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">GDPR Compliance</span>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white">European Union Data Protection</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Mendukung fitur Right to be Forgotten, eksportasi portabel data siswa, dan audit transparansi data AI.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300">SOC2 Type II</span>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white">Security & Availability Standard</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Pengawasan kontinyu terhadap kerentanan sistem, pengujian penetrasi berkala, dan enkripsi TLS 1.3.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
