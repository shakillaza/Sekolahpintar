import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  mockDataCatalog,
  mockAiCollaborations,
  mockAutonomousLogs,
  mockMarketplacePlugins,
  mockSustainabilityMetrics,
  mockCustomerHealthScores,
  mockDeveloperSdks,
  cloudV5MasterDocs,
  DataCatalogItem,
  AiAgentCollaboration,
  AutonomousMonitoringLog,
  MarketplacePlugin,
  SustainabilityMetric,
  CustomerHealthScore,
  DeveloperSdk
} from '../../data/cloudV5Data';
import {
  Cloud,
  Globe,
  Database,
  Cpu,
  Bot,
  Activity,
  Boxes,
  Code2,
  Leaf,
  Users,
  FileText,
  Sparkles,
  CheckCircle2,
  TrendingUp,
  ShieldCheck,
  Server,
  Zap,
  Download,
  Star,
  ExternalLink,
  Search,
  Filter,
  Plus,
  Play,
  Check,
  Radio,
  Lock,
  Workflow,
  AlertTriangle,
  RefreshCw,
  Terminal,
  Layers,
  Building2,
  ArrowRight
} from 'lucide-react';

export const CloudPlatformView: React.FC = () => {
  const { addToast } = useApp();

  // Active Sub-Tab
  const [activeTab, setActiveTab] = useState<
    | 'overview'
    | 'data_fabric'
    | 'ai_orchestration'
    | 'autonomous'
    | 'marketplace'
    | 'dev_center'
    | 'sustainability'
    | 'customer_success'
    | 'handbooks'
  >('overview');

  // Interactive States
  const [pluginsList, setPluginsList] = useState<MarketplacePlugin[]>(mockMarketplacePlugins);
  const [installedPlugins, setInstalledPlugins] = useState<string[]>(['EXT-MIDTRANS-VA']);
  const [selectedDocKey, setSelectedDocKey] = useState<keyof typeof cloudV5MasterDocs>('v5Architecture');
  const [showInstallModal, setShowInstallModal] = useState(false);
  const [selectedPlugin, setSelectedPlugin] = useState<MarketplacePlugin | null>(null);

  // Search & Filter
  const [searchCatalog, setSearchCatalog] = useState('');
  const [searchPlugin, setSearchPlugin] = useState('');

  // Handlers
  const handleToggleInstallPlugin = (plugin: MarketplacePlugin) => {
    if (installedPlugins.includes(plugin.code)) {
      setInstalledPlugins(prev => prev.filter(c => c !== plugin.code));
      addToast('info', 'Plugin Copot', `Plugin ${plugin.title} telah dikembalikan dari tenant.`);
    } else {
      setSelectedPlugin(plugin);
      setShowInstallModal(true);
    }
  };

  const handleConfirmInstall = () => {
    if (!selectedPlugin) return;
    setInstalledPlugins(prev => [...prev, selectedPlugin.code]);
    addToast('success', 'Plugin Terpasang', `Berhasil memasang ekstensi ${selectedPlugin.title} ke Enterprise Tenant.`);
    setShowInstallModal(false);
    setSelectedPlugin(null);
  };

  const handleTriggerSelfHealing = (logId: string) => {
    addToast('info', 'Self-Healing Diaktifkan', `Menginisiasi rutinitas auto-recovery untuk log ${logId}...`);
    setTimeout(() => {
      addToast('success', 'Anomali Pulih', `Komponen telah berhasil distabilkan oleh Autonomous Engine.`);
    }, 1200);
  };

  const filteredCatalog = mockDataCatalog.filter(
    dc =>
      dc.tableName.toLowerCase().includes(searchCatalog.toLowerCase()) ||
      dc.domain.toLowerCase().includes(searchCatalog.toLowerCase())
  );

  const filteredPlugins = pluginsList.filter(
    p =>
      p.title.toLowerCase().includes(searchPlugin.toLowerCase()) ||
      p.category.toLowerCase().includes(searchPlugin.toLowerCase()) ||
      p.developer.toLowerCase().includes(searchPlugin.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Top Banner Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-950 via-indigo-950 to-blue-950 p-6 text-white shadow-xl border border-indigo-800/40">
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-8 opacity-10 pointer-events-none">
          <Globe className="h-80 w-80 text-blue-400" />
        </div>
        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-500/20 text-blue-300 border border-blue-400/30 uppercase tracking-wider flex items-center gap-1">
                <Cloud className="w-3.5 h-3.5 text-blue-400" /> Enterprise Education Cloud v5.0
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 flex items-center gap-1">
                <Radio className="w-3 h-3 text-emerald-400 animate-pulse" /> Multi-Region Active-Active
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black tracking-tight text-white">
              Global Enterprise Education Cloud Platform
            </h1>
            <p className="text-xs md:text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
              Arsitektur Hyperscale SaaS, Unified Data Fabric, AI-Native Multi-Agent Orchestration, Autonomous Self-Healing, Extension Marketplace, & Global Sustainability.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 shrink-0">
            <button
              onClick={() => setActiveTab('marketplace')}
              className="px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-blue-600/30 flex items-center gap-2 transition-all"
            >
              <Boxes className="w-3.5 h-3.5" /> Extension Marketplace
            </button>
            <button
              onClick={() => setActiveTab('handbooks')}
              className="px-4 py-2.5 bg-slate-800/80 hover:bg-slate-700 text-white border border-slate-700 rounded-xl text-xs font-bold shadow-md flex items-center gap-2 transition-all"
            >
              <FileText className="w-3.5 h-3.5 text-blue-400" /> Platform Architecture Docs
            </button>
          </div>
        </div>
      </div>

      {/* Main Tab Navigation */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-2 shadow-sm flex flex-wrap gap-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('overview')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === 'overview'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Cloud className="w-3.5 h-3.5" /> Platform Dashboard
        </button>
        <button
          onClick={() => setActiveTab('data_fabric')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === 'data_fabric'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Database className="w-3.5 h-3.5" /> Unified Data Fabric ({mockDataCatalog.length})
        </button>
        <button
          onClick={() => setActiveTab('ai_orchestration')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === 'ai_orchestration'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Bot className="w-3.5 h-3.5 text-amber-400" /> AI Multi-Agent Orchestrator
        </button>
        <button
          onClick={() => setActiveTab('autonomous')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === 'autonomous'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Activity className="w-3.5 h-3.5" /> Autonomous Self-Healing
        </button>
        <button
          onClick={() => setActiveTab('marketplace')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === 'marketplace'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Boxes className="w-3.5 h-3.5" /> Marketplace ({pluginsList.length})
        </button>
        <button
          onClick={() => setActiveTab('dev_center')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === 'dev_center'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Code2 className="w-3.5 h-3.5" /> Developer Center
        </button>
        <button
          onClick={() => setActiveTab('sustainability')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === 'sustainability'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Leaf className="w-3.5 h-3.5 text-emerald-400" /> Green Cloud FinOps
        </button>
        <button
          onClick={() => setActiveTab('customer_success')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === 'customer_success'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Users className="w-3.5 h-3.5" /> Customer Health
        </button>
        <button
          onClick={() => setActiveTab('handbooks')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === 'handbooks'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <FileText className="w-3.5 h-3.5" /> v5.0 Handbooks
        </button>
      </div>

      {/* SUB-TAB 1: Platform Overview & Hyperscale Dashboard */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Layanan Terhubung</span>
                <Server className="w-4 h-4 text-blue-500" />
              </div>
              <div className="text-2xl font-black text-slate-900 dark:text-white font-mono">100% Operational</div>
              <p className="text-xs text-emerald-600 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> 24 Modules Integrated (P1 - P30)
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Latency SLA (p99)</span>
                <Zap className="w-4 h-4 text-amber-500" />
              </div>
              <div className="text-2xl font-black text-slate-900 dark:text-white font-mono">142 ms</div>
              <p className="text-xs text-emerald-600 font-bold flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> Exceeds SLA Limit (200ms)
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">AI Multi-Agent Calls</span>
                <Bot className="w-4 h-4 text-purple-500" />
              </div>
              <div className="text-2xl font-black text-slate-900 dark:text-white font-mono">4.8M / bln</div>
              <p className="text-xs text-purple-600 font-bold flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> 99.8% Prompt Accuracy
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Multi-Tenant SLA</span>
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
              </div>
              <div className="text-2xl font-black text-slate-900 dark:text-white font-mono">99.99%</div>
              <p className="text-xs text-emerald-600 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Zero Security Vulnerability
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Globe className="w-4.5 h-4.5 text-blue-500" /> Global Region & Active Multi-Cloud Mesh
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-slate-900 dark:text-white">Primary Node: asia-southeast1 (Jakarta Edge)</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                    ACTIVE
                  </span>
                </div>
                <p className="text-xs text-slate-500">Cloud Run Containers • Cloud SQL High Availability • MemoryStore Redis L2 Caching</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-slate-900 dark:text-white">Regional Hub: asia-east1 (Taiwan Disaster Recovery)</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                    STANDBY (REALTIME CDC)
                  </span>
                </div>
                <p className="text-xs text-slate-500">Cross-Region Storage Replication • Instant Geo-Failover Ready (&lt; 60s RTO)</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 2: Unified Data Fabric */}
      {activeTab === 'data_fabric' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Database className="w-4 h-4 text-blue-500" /> Unified Data Fabric & Data Catalog Registry
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Katalog data terpadu, skor kualitas data, pelacakan data lineage, & sinkronisasi CDC real-time.
              </p>
            </div>

            <div className="relative w-full md:w-64">
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                placeholder="Cari tabel / domain..."
                value={searchCatalog}
                onChange={(e) => setSearchCatalog(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div className="space-y-3">
            {filteredCatalog.map(dc => (
              <div
                key={dc.id}
                className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                      {dc.domain}
                    </span>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white font-mono">{dc.tableName}</h4>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-xs font-mono text-emerald-600 font-bold">Data Quality: {dc.dataQualityScore}%</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                      Class: {dc.dataClassification}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between text-[11px] text-slate-500 font-mono pt-1 border-t border-slate-100 dark:border-slate-800">
                  <span>Perkiraan Baris Data: ~{dc.rowCountEstimate.toLocaleString()}</span>
                  <span>CDC Sync: {dc.cdcStatus} • Refreshed: {dc.lastRefreshed}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 3: AI Multi-Agent Orchestration */}
      {activeTab === 'ai_orchestration' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Bot className="w-4 h-4 text-purple-500" /> Unified AI Multi-Agent Orchestration
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Koordinasi antar AI Agent otonom, prompt routing otomatis, fallback model, & human-in-the-loop validation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {mockAiCollaborations.map(aic => (
              <div
                key={aic.id}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3"
              >
                <div className="flex justify-between items-center">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300">
                    Trigger: {aic.triggerType}
                  </span>
                  <span className="text-xs font-mono font-bold text-emerald-600">
                    Success: {aic.successRatePct}%
                  </span>
                </div>

                <h4 className="text-xs font-bold text-slate-900 dark:text-white">{aic.workflowName}</h4>

                <div className="space-y-1">
                  <span className="text-[10px] text-slate-400 block uppercase font-bold">Agents Involved:</span>
                  <div className="flex flex-wrap gap-1">
                    {aic.agentsInvolved.map((ag, i) => (
                      <span key={i} className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                        {ag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 font-mono text-xs space-y-1 border border-slate-100 dark:border-slate-800">
                  <div>Model Utama: <strong className="text-purple-600">{aic.primaryModel}</strong></div>
                  <div>Fallback: <strong className="text-slate-500">{aic.fallbackModel}</strong></div>
                  <div>Latensi Rata-Rata: <strong className="text-slate-900 dark:text-white">{aic.avgLatencyMs} ms</strong></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 4: Autonomous Self-Healing */}
      {activeTab === 'autonomous' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-500" /> Autonomous Self-Healing & Diagnostic Engine
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Pendeteksian anomali real-time, auto-healing tanpa gangguan pengguna, & mitigasi otomatis pada infrastruktur.
            </p>
          </div>

          <div className="space-y-3">
            {mockAutonomousLogs.map(log => (
              <div
                key={log.id}
                className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      log.severity === 'CRITICAL' ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {log.severity}
                    </span>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">{log.component}</h4>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                      {log.anomalyType}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                      {log.status}
                    </span>
                    <button
                      onClick={() => handleTriggerSelfHealing(log.id)}
                      className="px-3 py-1 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-lg text-xs font-bold flex items-center gap-1"
                    >
                      <RefreshCw className="w-3 h-3" /> Re-trigger Healing
                    </button>
                  </div>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800">
                  ⚡ <strong className="text-slate-900 dark:text-white">Tindakan Otomatis:</strong> {log.autoActionTaken}
                </p>

                <div className="text-[10px] text-slate-400 text-right font-mono">
                  Timestamp: {log.timestamp}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 5: Extension Marketplace */}
      {activeTab === 'marketplace' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Boxes className="w-4 h-4 text-blue-500" /> Enterprise Extension Marketplace
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Integrasi pihak ketiga terverifikasi, LMS extensions, payment gateways, & biometrik.
              </p>
            </div>

            <div className="relative w-full md:w-64">
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                placeholder="Cari plugin / developer..."
                value={searchPlugin}
                onChange={(e) => setSearchPlugin(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredPlugins.map(plugin => {
              const isInstalled = installedPlugins.includes(plugin.code);
              return (
                <div
                  key={plugin.id}
                  className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                        {plugin.category}
                      </span>
                      {plugin.isVerified && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> VERIFIED
                        </span>
                      )}
                    </div>

                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">{plugin.title}</h4>
                    <p className="text-xs text-slate-500">Developer: {plugin.developer} • Version: {plugin.version}</p>
                    <div className="flex items-center gap-3 text-xs text-slate-600 dark:text-slate-300 font-mono">
                      <span className="flex items-center gap-1 text-amber-500 font-bold">
                        <Star className="w-3.5 h-3.5 fill-amber-500" /> {plugin.rating}
                      </span>
                      <span>Unduhan: {plugin.downloadsCount.toLocaleString()}</span>
                      <span>Skema: {plugin.priceModel}</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                    <button
                      onClick={() => handleToggleInstallPlugin(plugin)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                        isInstalled
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200'
                          : 'bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/20'
                      }`}
                    >
                      {isInstalled ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                      {isInstalled ? 'Terpasang di Tenant' : 'Pasang Plugin'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SUB-TAB 6: Developer Center */}
      {activeTab === 'dev_center' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Code2 className="w-4 h-4 text-blue-500" /> Developer Portal & Extension SDK Registry
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Pustaka SDK resmi, spesifikasi OpenAPI 3.1, & panduan integrasi sistem kustom sekolah.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {mockDeveloperSdks.map(sdk => (
              <div
                key={sdk.id}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3"
              >
                <div className="flex justify-between items-center">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300">
                    {sdk.language}
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-500">{sdk.version}</span>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs overflow-x-auto">
                  {sdk.packageUrl}
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{sdk.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 7: Green Cloud FinOps */}
      {activeTab === 'sustainability' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Leaf className="w-4 h-4 text-emerald-500" /> Green Cloud Sustainability & PUE Metrics
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Efisiensi energi cloud, pelacakan emisi karbon infrastruktur, & penghematan FinOps ramah lingkungan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mockSustainabilityMetrics.map(sust => (
              <div
                key={sust.id}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3"
              >
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-900 dark:text-white">{sust.region}</span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                    Grade: {sust.energyEfficiencyGrade}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 font-mono text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 block">PUE Ratio</span>
                    <strong className="text-slate-900 dark:text-white">{sust.pueRatio}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Clean Energy</span>
                    <strong className="text-emerald-600">{sust.cleanEnergyPct}%</strong>
                  </div>
                </div>

                <div className="flex justify-between text-xs text-slate-600 dark:text-slate-300 pt-1">
                  <span>Emisi Karbon: <strong>{sust.carbonEmissionsKg} kg CO2e</strong></span>
                  <span className="text-emerald-600 font-bold">Hemat: +${sust.monthlySavingsUSD}/bln</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 8: Customer Success */}
      {activeTab === 'customer_success' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Users className="w-4 h-4 text-blue-500" /> Customer Health Scores & Renewal Analytics
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Skor kesehatan institusi, prediksi perpanjangan lisensi, & indikator adopsi fitur digital.
            </p>
          </div>

          <div className="space-y-3">
            {mockCustomerHealthScores.map(chs => (
              <div
                key={chs.id}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                  <div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                      {chs.region}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-1">{chs.institutionName}</h4>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-xs font-mono font-bold text-emerald-600">Health: {chs.healthScore}/100</span>
                    <span className="text-xs font-mono font-bold text-blue-600">Renewal Prob: {chs.renewalProbabilityPct}%</span>
                  </div>
                </div>

                <div className="flex justify-between text-xs text-slate-500 border-t border-slate-100 dark:border-slate-800 pt-2">
                  <span>Pengguna Aktif: {chs.activeUsersCount.toLocaleString()}</span>
                  <span>Trend Adopsi: <strong className="uppercase text-emerald-600">{chs.adoptionTrend}</strong></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 9: Handbooks */}
      {activeTab === 'handbooks' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4">
          <div className="flex flex-wrap gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
            <button
              onClick={() => setSelectedDocKey('v5Architecture')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedDocKey === 'v5Architecture' ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
              }`}
            >
              System Architecture Manual
            </button>
            <button
              onClick={() => setSelectedDocKey('v5DeveloperManual')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedDocKey === 'v5DeveloperManual' ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
              }`}
            >
              Developer SDK Handbook
            </button>
            <button
              onClick={() => setSelectedDocKey('v5GovernanceSecurity')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedDocKey === 'v5GovernanceSecurity' ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
              }`}
            >
              Governance & Security Handbook
            </button>
            <button
              onClick={() => setSelectedDocKey('v5OperationsHandbook')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedDocKey === 'v5OperationsHandbook' ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
              }`}
            >
              Operations & Sustainability Manual
            </button>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs overflow-x-auto whitespace-pre-wrap leading-relaxed border border-slate-800">
            {cloudV5MasterDocs[selectedDocKey]}
          </div>
        </div>
      )}

      {/* Plugin Installation Confirmation Modal */}
      {showInstallModal && selectedPlugin && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Boxes className="w-4 h-4 text-blue-500" /> Konfirmasi Pemasangan Plugin
              </h3>
              <button onClick={() => setShowInstallModal(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-white">
                ✕
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <p className="text-slate-600 dark:text-slate-300">
                Anda akan memasang plugin <strong className="text-slate-900 dark:text-white">{selectedPlugin.title}</strong> ({selectedPlugin.version}) oleh <strong className="text-slate-900 dark:text-white">{selectedPlugin.developer}</strong>.
              </p>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 font-mono space-y-1">
                <div>Model Harga: {selectedPlugin.priceModel}</div>
                <div>Akses Izin: Webhook Events & Read Academic Catalog</div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowInstallModal(false)}
                className="px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleConfirmInstall}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 text-white shadow-md shadow-blue-600/20"
              >
                Setujui & Pasang Ekstensi
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
