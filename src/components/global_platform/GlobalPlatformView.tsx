import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  mockGlobalRegions,
  mockGlobalCountries,
  mockFeatureFlags
} from '../../data/globalEnterpriseData';
import {
  Globe,
  Server,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Zap,
  DollarSign,
  Languages,
  Plus,
  RefreshCw,
  Search,
  Filter,
  Sliders,
  Check,
  X,
  ExternalLink,
  Layers,
  Settings2
} from 'lucide-react';

export const GlobalPlatformView: React.FC = () => {
  const { addToast } = useApp();
  const [activeTab, setActiveTab] = useState<'datacenter_regions' | 'countries' | 'feature_flags' | 'localization'>('datacenter_regions');
  const [searchQuery, setSearchQuery] = useState('');
  const [regionsList, setRegionsList] = useState(mockGlobalRegions);
  const [countriesList, setCountriesList] = useState(mockGlobalCountries);
  const [flagsList, setFlagsList] = useState(mockFeatureFlags);

  // Filtered lists
  const filteredRegions = regionsList.filter(r =>
    r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.complianceStandard.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredCountries = countriesList.filter(c =>
    c.countryName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.currencyCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.countryCode.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredFlags = flagsList.filter(f =>
    f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.key.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleToggleFlag = (key: string) => {
    setFlagsList(prev =>
      prev.map(item => item.key === key ? { ...item, status: !item.status } : item)
    );
    addToast('info', 'Feature Flag Updated', `Feature flag state toggled for ${key}`);
  };

  const handleSimulateFailover = (regionName: string) => {
    addToast('success', 'Failover Drills Initiated', `Health check & Geo-replication failover simulation completed for ${regionName}. Zero downtime active.`);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-900 p-6 text-white shadow-xl border border-indigo-800/40">
        <div className="absolute right-0 top-0 translate-x-10 -translate-y-10 opacity-10 pointer-events-none">
          <Globe className="h-64 w-64 text-blue-400" />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-500/20 text-blue-300 border border-blue-400/30 uppercase tracking-wider flex items-center gap-1">
                <Globe className="w-3 h-3" /> Global Enterprise v1.0.0
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                Multi-Region Active
              </span>
            </div>
            <h1 className="text-2xl font-black tracking-tight text-white">
              Global Platform & Multi-Region Cloud
            </h1>
            <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Pusat konfigurasi multinasional, lokasi region cloud datacenter, kepatuhan UU PDP & GDPR, mesin multi-mata uang, dan feature flag governance.
            </p>
          </div>
          <div className="flex gap-2 shrink-0">
            <button
              onClick={() => handleSimulateFailover('Global Network')}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-blue-600/30 flex items-center gap-2 transition-all"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Uji Failover Geo-Sync
            </button>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
          <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900/50">
            <Server className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Datacenter Regions</p>
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mt-0.5">5 Global Nodes</h3>
            <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-0.5 mt-0.5">
              <CheckCircle2 className="w-3 h-3" /> 99.99% Availability
            </span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
          <div className="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/50">
            <Globe className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Negara Terhubung</p>
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mt-0.5">5 Negara Active</h3>
            <span className="text-[10px] text-slate-500 mt-0.5 block">ID, SG, MY, SA, US</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
          <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/50">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Multi-Mata Uang</p>
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mt-0.5">IDR, SGD, USD +</h3>
            <span className="text-[10px] text-emerald-600 font-bold mt-0.5 block">Auto Tax & Exchange Rate</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
          <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 border border-amber-100 dark:border-amber-900/50">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Kepatuhan Data</p>
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mt-0.5">UU PDP & GDPR</h3>
            <span className="text-[10px] text-blue-600 font-bold mt-0.5 block">Encrypted Residency</span>
          </div>
        </div>
      </div>

      {/* Main Tabs Navigation */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-2 shadow-sm flex flex-wrap gap-2">
        <button
          onClick={() => setActiveTab('datacenter_regions')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'datacenter_regions'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Server className="w-4 h-4" /> Region Cloud Datacenter ({regionsList.length})
        </button>
        <button
          onClick={() => setActiveTab('countries')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'countries'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Globe className="w-4 h-4" /> Konfigurasi Negara & Currency ({countriesList.length})
        </button>
        <button
          onClick={() => setActiveTab('feature_flags')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'feature_flags'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Settings2 className="w-4 h-4" /> Feature Flags Governance ({flagsList.length})
        </button>
        <button
          onClick={() => setActiveTab('localization')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'localization'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Languages className="w-4 h-4" /> Localization & Timezone Engine
        </button>
      </div>

      {/* Filter / Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Cari region, negara, atau flag..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="text-xs text-slate-500 font-medium">
          Menampilkan data terverifikasi Cloud Run Enterprise Architecture
        </div>
      </div>

      {/* TAB 1: Datacenter Regions */}
      {activeTab === 'datacenter_regions' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredRegions.map((region) => (
            <div
              key={region.id}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-blue-500/50 transition-all space-y-4"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    {region.code}
                  </span>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white mt-1">
                    {region.name}
                  </h3>
                </div>
                <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Operational
                </span>
              </div>

              <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800 pt-3">
                <div className="flex justify-between">
                  <span>Datacenter Target:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{region.datacenterRegion}</span>
                </div>
                <div className="flex justify-between">
                  <span>Active Tenants:</span>
                  <span className="font-semibold text-blue-600 dark:text-blue-400">{region.activeTenantsCount} Sekolah</span>
                </div>
                <div className="flex justify-between">
                  <span>Compliance Standard:</span>
                  <span className="font-mono text-emerald-600 font-bold">{region.complianceStandard}</span>
                </div>
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  onClick={() => handleSimulateFailover(region.name)}
                  className="w-full py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
                >
                  <RefreshCw className="w-3.5 h-3.5" /> Direct Failover Drill
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 2: Countries & Currency */}
      {activeTab === 'countries' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600 dark:text-slate-400">
              <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 font-bold uppercase text-[10px] tracking-wider border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="p-4">Kode / Negara</th>
                  <th className="p-4">Bahasa Utama</th>
                  <th className="p-4">Mata Uang & Simbol</th>
                  <th className="p-4">Timezone</th>
                  <th className="p-4">Tahun Ajaran</th>
                  <th className="p-4">Pajak (%)</th>
                  <th className="p-4">Status Deployment</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredCountries.map((country) => (
                  <tr key={country.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                    <td className="p-4 font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-[10px] font-mono">
                        {country.countryCode}
                      </span>
                      {country.countryName}
                    </td>
                    <td className="p-4">{country.primaryLanguage}</td>
                    <td className="p-4 font-semibold text-emerald-600 dark:text-emerald-400">
                      {country.currencyCode} ({country.currencySymbol})
                    </td>
                    <td className="p-4 font-mono text-[11px]">{country.timezone}</td>
                    <td className="p-4">{country.academicStartMonth}</td>
                    <td className="p-4 font-bold">{country.taxRates}%</td>
                    <td className="p-4">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        country.status === 'active'
                          ? 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300'
                          : 'bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300'
                      }`}>
                        {country.status.toUpperCase()}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: Feature Flags Governance */}
      {activeTab === 'feature_flags' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Feature Flag & Feature Governance Center
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Kelola aktifasi fitur tanpa downtime. Fitur baru dirilis secara aman menggunakan Feature Flags.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            {filteredFlags.map((flag) => (
              <div
                key={flag.key}
                className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                      {flag.tier}
                    </span>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                      {flag.name}
                    </h4>
                  </div>
                  <code className="text-[10px] text-slate-400 font-mono mt-1 block">
                    {flag.key}
                  </code>
                </div>

                <button
                  onClick={() => handleToggleFlag(flag.key)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                    flag.status
                      ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                      : 'bg-slate-300 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {flag.status ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
                  {flag.status ? 'ACTIVE' : 'DISABLED'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: Localization Engine Preview */}
      {activeTab === 'localization' && (
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
              <Languages className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Dynamic Translation & Localization Engine (i18n / l10n)
              </h3>
              <p className="text-xs text-slate-500">
                Mendukung otomatisasi translasi multi-bahasa (ID, EN, AR, ZH) dengan kalender Hijriah & Masehi.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
              <h4 className="text-xs font-bold text-slate-900 dark:text-white">Bahasa Indonesia (ID)</h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 italic">"Satu Platform. Sekolah Pintar. Berbasis AI."</p>
              <span className="inline-block px-2 py-0.5 rounded text-[10px] bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold">Primary Default</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
              <h4 className="text-xs font-bold text-slate-900 dark:text-white">English (US / UK)</h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 italic">"One Platform. Smart School. AI Powered."</p>
              <span className="inline-block px-2 py-0.5 rounded text-[10px] bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-bold">Active Global</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
              <h4 className="text-xs font-bold text-slate-900 dark:text-white">Arabic (العربية - RTL)</h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 italic">"منصة واحدة. مدرسة ذكية. مدعومة بالذكاء الاصطناعي."</p>
              <span className="inline-block px-2 py-0.5 rounded text-[10px] bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-bold">RTL Ready</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
