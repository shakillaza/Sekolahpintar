import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  mockMicroservices,
  mockApiGatewayRoutes,
  mockEventStreams,
  mockKubernetesClusters,
  mockGoldenPaths,
  mockSreSlos,
  mockCostBreakdown,
  mockTenantCostAllocations,
  platformDocsHandbooks,
  MicroserviceItem,
  ApiGatewayRoute,
  EventStreamTopic,
  KubernetesCluster,
  GoldenPathTemplate
} from '../../data/platformEngineeringData';
import {
  Boxes,
  Cpu,
  Server,
  Activity,
  Zap,
  ShieldCheck,
  Search,
  Network,
  RefreshCcw,
  SlidersHorizontal,
  Plus,
  Terminal,
  FileCode,
  Layers,
  ArrowUpRight,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle2,
  Lock,
  Globe,
  Database,
  DollarSign,
  Play,
  Copy,
  BookOpen,
  Sparkles,
  HardDrive,
  BarChart3,
  Flame,
  Check
} from 'lucide-react';

export const PlatformEngineeringView: React.FC = () => {
  const { addToast } = useApp();

  // Navigation Tabs
  const [activeTab, setActiveTab] = useState<
    'registry' | 'gateway' | 'events' | 'k8s' | 'dev_portal' | 'sre' | 'security' | 'costs' | 'docs'
  >('registry');

  // Microservices Registry State
  const [servicesList, setServicesList] = useState<MicroserviceItem[]>(mockMicroservices);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDomainFilter, setSelectedDomainFilter] = useState<string>('all');
  const [scalingService, setScalingService] = useState<MicroserviceItem | null>(null);
  const [newReplicaCount, setNewReplicaCount] = useState<number>(4);

  // Gateway Route State
  const [gatewayRoutes, setGatewayRoutes] = useState<ApiGatewayRoute[]>(mockApiGatewayRoutes);

  // Event Streams State
  const [eventTopics, setEventTopics] = useState<EventStreamTopic[]>(mockEventStreams);

  // Golden Path Deploy Modal State
  const [selectedGoldenPath, setSelectedGoldenPath] = useState<GoldenPathTemplate | null>(null);
  const [newServiceName, setNewServiceName] = useState('');
  const [activeIacTab, setActiveIacTab] = useState<'terraform' | 'helm' | 'k8s'>('terraform');

  // Docs Viewer State
  const [selectedDocKey, setSelectedDocKey] = useState<keyof typeof platformDocsHandbooks>('microservicesGuide');

  // Filtered Services
  const domains = Array.from(new Set(mockMicroservices.map(s => s.domain)));

  const filteredServices = servicesList.filter(s => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDomain = selectedDomainFilter === 'all' || s.domain === selectedDomainFilter;
    return matchesSearch && matchesDomain;
  });

  // Handlers
  const handleScaleService = () => {
    if (!scalingService) return;
    setServicesList(prev =>
      prev.map(s => (s.id === scalingService.id ? { ...s, replicas: newReplicaCount } : s))
    );
    addToast(
      'success',
      'Kubernetes Deployment Scaled',
      `Berhasil memperbarui replica ${scalingService.code} menjadi ${newReplicaCount} pods.`
    );
    setScalingService(null);
  };

  const handleToggleCircuitBreaker = (routeId: string) => {
    setGatewayRoutes(prev =>
      prev.map(r => {
        if (r.id === routeId) {
          const nextState = r.circuitBreaker === 'closed' ? 'open' : 'closed';
          return { ...r, circuitBreaker: nextState };
        }
        return r;
      })
    );
    addToast('info', 'API Gateway Route Updated', 'Circuit Breaker status toggled.');
  };

  const handleReplayEvents = (topicName: string) => {
    addToast('success', 'Event Replay Initiated', `Memulai pemutaran ulang event stream dari Dead Letter Queue ${topicName}.`);
  };

  const handleTriggerAutoHealing = (serviceName: string) => {
    addToast('success', 'Auto-Healing Protocol Executed', `Restarting unhealthy pod instances for ${serviceName} and clearing node cache.`);
  };

  const handleDeployGoldenPath = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedGoldenPath || !newServiceName) return;

    addToast(
      'success',
      'Golden Path Scaffolding Initiated',
      `Membuat repositori ${newServiceName} berbasis template ${selectedGoldenPath.title} dengan pipeline CI/CD & Helm Chart.`
    );
    setSelectedGoldenPath(null);
    setNewServiceName('');
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-950 via-blue-950 to-indigo-950 p-6 text-white shadow-xl border border-blue-800/40">
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-8 opacity-10 pointer-events-none">
          <Boxes className="h-72 w-72 text-blue-400" />
        </div>
        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-500/20 text-blue-300 border border-blue-400/30 uppercase tracking-wider flex items-center gap-1">
                <Boxes className="w-3.5 h-3.5" /> Platform Engineering & Microservices
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Kubernetes Fleet Multi-Region Active
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black tracking-tight text-white">
              Hyperscale Microservices & Developer Platform
            </h1>
            <p className="text-xs md:text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
              Arsitektur terdistribusi 28 Microservices domain-based, Enterprise API Gateway, Event Streaming Broker (Kafka/Redis), Service Mesh mTLS, Multi-Cluster Kubernetes, & Internal Developer Portal.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 shrink-0">
            <button
              onClick={() => handleTriggerAutoHealing('Global Fleet')}
              className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-blue-600/30 flex items-center gap-2 transition-all"
            >
              <RefreshCcw className="w-3.5 h-3.5 text-blue-200" /> Sync Fleet State
            </button>
            <button
              onClick={() => setActiveTab('dev_portal')}
              className="px-4 py-2.5 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-amber-500/30 flex items-center gap-2 transition-all"
            >
              <Plus className="w-3.5 h-3.5" /> Launch New Service
            </button>
          </div>
        </div>
      </div>

      {/* Metric Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
          <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900/50">
            <Boxes className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Total Microservices</p>
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mt-0.5">28 Domain Services</h3>
            <span className="text-[10px] text-emerald-600 font-bold mt-0.5 block flex items-center gap-0.5">
              <CheckCircle2 className="w-3 h-3" /> 100% Fully Isolated
            </span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
          <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 border border-purple-100 dark:border-purple-900/50">
            <Zap className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Global Ingress Throughput</p>
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mt-0.5">38,400 QPS</h3>
            <span className="text-[10px] text-purple-600 font-bold mt-0.5 block">Avg Latency 14ms</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
          <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/50">
            <Server className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Kubernetes Pod Fleet</p>
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mt-0.5">348 Active Pods</h3>
            <span className="text-[10px] text-emerald-600 font-bold mt-0.5 block">3 Regional Clusters</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
          <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 border border-amber-100 dark:border-amber-900/50">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Platform Availability (SLO)</p>
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mt-0.5">99.995%</h3>
            <span className="text-[10px] text-emerald-600 font-bold mt-0.5 block">Zero Trust & mTLS Enforced</span>
          </div>
        </div>
      </div>

      {/* Main Navigation Tabs */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-2 shadow-sm flex flex-wrap gap-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('registry')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === 'registry'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Boxes className="w-3.5 h-3.5" /> Microservices Registry (28)
        </button>
        <button
          onClick={() => setActiveTab('gateway')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === 'gateway'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Zap className="w-3.5 h-3.5" /> Enterprise API Gateway
        </button>
        <button
          onClick={() => setActiveTab('events')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === 'events'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Activity className="w-3.5 h-3.5" /> Event Streaming & Bus
        </button>
        <button
          onClick={() => setActiveTab('k8s')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === 'k8s'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Server className="w-3.5 h-3.5" /> Multi-Cluster Kubernetes
        </button>
        <button
          onClick={() => setActiveTab('dev_portal')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === 'dev_portal'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Terminal className="w-3.5 h-3.5" /> Developer Portal & IaC
        </button>
        <button
          onClick={() => setActiveTab('sre')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === 'sre'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <BarChart3 className="w-3.5 h-3.5" /> Observability & SRE
        </button>
        <button
          onClick={() => setActiveTab('security')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === 'security'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Lock className="w-3.5 h-3.5" /> Zero Trust Security Vault
        </button>
        <button
          onClick={() => setActiveTab('costs')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === 'costs'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <DollarSign className="w-3.5 h-3.5" /> Platform Cost Allocation
        </button>
        <button
          onClick={() => setActiveTab('docs')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === 'docs'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" /> Handbooks & Guides
        </button>
      </div>

      {/* TAB 1: Microservices Registry */}
      {activeTab === 'registry' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input
                type="text"
                placeholder="Cari nama microservice, kode, atau deskripsi..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
              <span className="text-xs text-slate-500 font-medium">Domain:</span>
              <select
                value={selectedDomainFilter}
                onChange={(e) => setSelectedDomainFilter(e.target.value)}
                className="px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none"
              >
                <option value="all">Semua Domain ({mockMicroservices.length})</option>
                {domains.map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredServices.map(service => (
              <div
                key={service.id}
                className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-blue-500/50 transition-all flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                      {service.domain}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                      {service.language}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center justify-between">
                    <span>{service.name}</span>
                    <span className="text-[10px] font-mono text-slate-400 font-normal">{service.version}</span>
                  </h3>
                  <p className="text-[11px] font-mono text-blue-600 dark:text-blue-400">{service.code}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                    {service.description}
                  </p>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <div>
                      <span className="text-slate-400 block text-[10px]">Replicas Pod</span>
                      <span className="font-bold text-slate-900 dark:text-white">{service.replicas} / {service.maxReplicas}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">Avg Latency</span>
                      <span className="font-bold text-emerald-600">{service.latencyMs} ms</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">Throughput</span>
                      <span className="font-bold text-slate-900 dark:text-white">{service.qps} QPS</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">CPU / RAM</span>
                      <span className="font-bold text-slate-900 dark:text-white">{service.cpuUsagePct}% / {service.memUsagePct}%</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Healthy
                    </span>

                    <button
                      onClick={() => {
                        setScalingService(service);
                        setNewReplicaCount(service.replicas);
                      }}
                      className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-lg text-[11px] font-bold flex items-center gap-1"
                    >
                      <SlidersHorizontal className="w-3 h-3" /> Scale Replica
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: Enterprise API Gateway */}
      {activeTab === 'gateway' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm space-y-4">
          <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-2">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-500" /> Enterprise API Gateway Routes & Rate Limiting Matrix
              </h3>
              <p className="text-xs text-slate-500">
                Pusat kontrol lalu lintas HTTP/gRPC ingress, otentikasi token JWT, Circuit Breaker, dan Cache TTL.
              </p>
            </div>
            <span className="px-3 py-1 bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 text-xs font-bold rounded-full border border-purple-300 dark:border-purple-800">
              Envoy Proxy Engine v1.29
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600 dark:text-slate-400">
              <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 font-bold uppercase text-[10px] tracking-wider border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="p-4">Route Path Pattern</th>
                  <th className="p-4">Method</th>
                  <th className="p-4">Target Service</th>
                  <th className="p-4">Rate Limit</th>
                  <th className="p-4">Avg Latency</th>
                  <th className="p-4">Circuit Breaker</th>
                  <th className="p-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {gatewayRoutes.map(route => (
                  <tr key={route.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                    <td className="p-4 font-mono font-bold text-slate-900 dark:text-white">{route.path}</td>
                    <td className="p-4">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                        {route.method}
                      </span>
                    </td>
                    <td className="p-4 font-mono text-slate-700 dark:text-slate-300">{route.targetService}</td>
                    <td className="p-4 font-mono">{route.rateLimitPerMin} req/min</td>
                    <td className="p-4 font-mono font-bold text-emerald-600">{route.avgLatencyMs} ms</td>
                    <td className="p-4">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        route.circuitBreaker === 'closed'
                          ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                          : 'bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300'
                      }`}>
                        {route.circuitBreaker.toUpperCase()}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => handleToggleCircuitBreaker(route.id)}
                        className="px-3 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-lg text-[11px] font-bold"
                      >
                        Toggle Breaker
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: Event Streaming */}
      {activeTab === 'events' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Activity className="w-4 h-4 text-purple-500" /> Event Bus Topics & Message Brokers
              </h3>
              <p className="text-xs text-slate-500">
                Pesan terdistribusi asynchronous Kafka, Redis Streams, & Cloud Pub/Sub untuk arsitektur Event-Driven.
              </p>
            </div>
            <button
              onClick={() => handleReplayEvents('Global DLQ')}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-bold shadow-md shadow-purple-600/20 flex items-center gap-1.5"
            >
              <Play className="w-3.5 h-3.5" /> Replay All DLQ Events
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {eventTopics.map(topic => (
              <div
                key={topic.id}
                className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
                    Broker: {topic.broker}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">Retention: {topic.retentionDays} Days</span>
                </div>

                <div>
                  <h4 className="text-xs font-mono font-bold text-slate-900 dark:text-white">{topic.name}</h4>
                  <p className="text-[10px] text-slate-500 capitalize">Type: {topic.type} Event</p>
                </div>

                <div className="grid grid-cols-3 gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 text-xs font-mono">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Partitions</span>
                    <span className="font-bold text-slate-900 dark:text-white">{topic.partitions}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Throughput</span>
                    <span className="font-bold text-emerald-600">{topic.msgPerSec} msg/s</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">DLQ Messages</span>
                    <span className={`font-bold ${topic.dlqCount > 0 ? 'text-amber-500' : 'text-slate-900 dark:text-white'}`}>
                      {topic.dlqCount}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
                  <span className="text-[11px] text-slate-500">{topic.consumersCount} Active Consumer Groups</span>
                  <button
                    onClick={() => handleReplayEvents(topic.name)}
                    className="px-3 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-lg text-[11px] font-bold"
                  >
                    Replay DLQ
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: Multi-Cluster Kubernetes */}
      {activeTab === 'k8s' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {mockKubernetesClusters.map(cluster => (
              <div
                key={cluster.id}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4"
              >
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 uppercase">
                    {cluster.environment}
                  </span>
                  <span className="text-[10px] font-mono text-emerald-600 font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> {cluster.status.toUpperCase()}
                  </span>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">{cluster.name}</h3>
                  <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                    <Globe className="w-3 h-3 text-slate-400" /> {cluster.region} ({cluster.provider})
                  </p>
                </div>

                <div className="space-y-2 text-xs border-t border-slate-100 dark:border-slate-800 pt-3">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Nodes Count:</span>
                    <span className="font-mono font-bold text-slate-900 dark:text-white">{cluster.nodesCount} Nodes</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Total Compute:</span>
                    <span className="font-mono font-bold text-slate-900 dark:text-white">{cluster.totalCpuCores} vCPU / {cluster.totalRamGb} GB RAM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Active Pods:</span>
                    <span className="font-mono font-bold text-emerald-600">{cluster.activePods} Pods</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">K8s Control Plane:</span>
                    <span className="font-mono text-slate-400">{cluster.k8sVersion}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: Developer Portal & IaC */}
      {activeTab === 'dev_portal' && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 text-white shadow-lg space-y-2">
            <h3 className="text-base font-bold flex items-center gap-2">
              <Terminal className="w-5 h-5 text-amber-400" /> Internal Developer Portal — Golden Paths
            </h3>
            <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
              Peluncuran cepat microservice terstandarisasi. Otomatisasi pendaftaran repo, skema Terraform, Helm Chart, dan pipeline CI/CD GitHub Actions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mockGoldenPaths.map(template => (
              <div
                key={template.id}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300">
                      {template.category}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">Deploy Time: ~{template.deployTimeMin} min</span>
                  </div>

                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">{template.title}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                    {template.description}
                  </p>
                  <p className="text-[11px] font-mono text-slate-600 dark:text-slate-300 mt-2 bg-slate-50 dark:bg-slate-800/60 p-2 rounded-xl">
                    Stack: {template.techStack}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex gap-1">
                    {template.iacSupport.map(iac => (
                      <span key={iac} className="px-2 py-0.5 rounded text-[9px] font-mono bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                        {iac}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => {
                      setSelectedGoldenPath(template);
                      setNewServiceName(`new-${template.category.toLowerCase()}-service`);
                    }}
                    className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold shadow-sm flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> Scaffold Project
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 6: Observability & SRE */}
      {activeTab === 'sre' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-emerald-500" /> SRE Dashboard — Service Level Objectives (SLO) & Error Budgets
              </h3>
              <p className="text-xs text-slate-500">
                Pemantauan keandalan layanan real-time berbasis kriteria ketersediaan (Availability) dan latensi p99.
              </p>
            </div>
            <button
              onClick={() => handleTriggerAutoHealing('SLO Engine')}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-600/20"
            >
              Run Auto-Healing Test
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mockSreSlos.map(slo => (
              <div
                key={slo.id}
                className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">{slo.serviceName}</h4>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                    SLO Target: {slo.targetSloPct}%
                  </span>
                </div>

                <p className="text-[11px] font-mono text-slate-500">{slo.sliName}</p>

                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] font-bold">
                    <span>Sli Compliance: {slo.currentSliPct}%</span>
                    <span>Error Budget Remaining: {slo.errorBudgetRemainingPct}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 rounded-full"
                      style={{ width: `${slo.errorBudgetRemainingPct}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 7: Zero Trust Security Vault */}
      {activeTab === 'security' && (
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Lock className="w-5 h-5 text-purple-500" /> Platform Security & Secrets Management (HashiCorp Vault)
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300">mTLS Enforced</span>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white">Service-to-Service Encryption</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Seluruh lalu lintas antar microservice dienkripsi TLS 1.3 berbasis sertifikat ephemeral yang diperbarui otomatis per 24 jam.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">OPA Policy</span>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white">Open Policy Agent (ABAC)</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Evaluasi otorisasi terdesentralisasi tanpa network hop dengan latensi evaluasi kebijakan &lt;4ms.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">Image Scanning</span>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white">Trivy Container Security</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Pemindaian otomatis kerentanan CVE pada seluruh container image sebelum didistribusikan ke Kubernetes.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 8: Platform Cost Center */}
      {activeTab === 'costs' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-emerald-500" /> Platform Infrastructure Cost Breakdown (Monthly)
              </h3>

              <div className="space-y-3">
                {mockCostBreakdown.map(item => (
                  <div key={item.category} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-600 dark:text-slate-300 font-medium">{item.category}</span>
                      <span className="font-bold text-slate-900 dark:text-white">${item.costUSD.toFixed(2)}</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-600 rounded-full"
                        style={{ width: `${item.allocationPct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Multi-Tenant Cost Allocation Table
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-600 dark:text-slate-400">
                  <thead className="bg-slate-50 dark:bg-slate-800/60 font-bold uppercase text-[10px] tracking-wider">
                    <tr>
                      <th className="p-2">Sekolah</th>
                      <th className="p-2">Users</th>
                      <th className="p-2">Compute</th>
                      <th className="p-2">AI Cost</th>
                      <th className="p-2 text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {mockTenantCostAllocations.map(tenant => (
                      <tr key={tenant.tenantId}>
                        <td className="p-2 font-bold text-slate-900 dark:text-white truncate max-w-[120px]">{tenant.schoolName}</td>
                        <td className="p-2 font-mono">{tenant.activeUsers}</td>
                        <td className="p-2 font-mono">${tenant.computeCostUSD}</td>
                        <td className="p-2 font-mono text-purple-600">${tenant.aiCostUSD}</td>
                        <td className="p-2 font-mono font-bold text-right text-slate-900 dark:text-white">${tenant.totalCostUSD}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 9: Architecture Handbooks & Documentation */}
      {activeTab === 'docs' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4">
          <div className="flex flex-wrap gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
            <button
              onClick={() => setSelectedDocKey('microservicesGuide')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedDocKey === 'microservicesGuide'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
              }`}
            >
              Microservices Architecture Guide
            </button>
            <button
              onClick={() => setSelectedDocKey('platformEngineeringGuide')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedDocKey === 'platformEngineeringGuide'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
              }`}
            >
              Platform Engineering Guide
            </button>
            <button
              onClick={() => setSelectedDocKey('kubernetesGuide')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedDocKey === 'kubernetesGuide'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
              }`}
            >
              Kubernetes Guide
            </button>
            <button
              onClick={() => setSelectedDocKey('sreHandbook')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedDocKey === 'sreHandbook'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
              }`}
            >
              SRE Handbook
            </button>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs overflow-x-auto whitespace-pre-wrap leading-relaxed border border-slate-800">
            {platformDocsHandbooks[selectedDocKey]}
          </div>
        </div>
      )}

      {/* Scale Replica Modal */}
      {scalingService && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 max-w-md w-full shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Scale Pod Replicas: {scalingService.code}
            </h3>
            <p className="text-xs text-slate-500">
              Sesuaikan jumlah pod instance aktif untuk menangani lonjakan beban kerja.
            </p>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                Jumlah Replica Pods (Max: {scalingService.maxReplicas}):
              </label>
              <input
                type="number"
                min={1}
                max={scalingService.maxReplicas}
                value={newReplicaCount}
                onChange={(e) => setNewReplicaCount(parseInt(e.target.value) || 1)}
                className="w-full px-4 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setScalingService(null)}
                className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-bold"
              >
                Batal
              </button>
              <button
                onClick={handleScaleService}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-600/20"
              >
                Terapkan Scaling
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Golden Path Scaffold Modal */}
      {selectedGoldenPath && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 max-w-lg w-full shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Launch Golden Path: {selectedGoldenPath.title}
            </h3>

            <form onSubmit={handleDeployGoldenPath} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Kode Nama Microservice Baru:
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. library-catalog-service"
                  value={newServiceName}
                  onChange={(e) => setNewServiceName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Preview IaC Template Blueprint:
                </span>
                <div className="flex gap-1 mb-2">
                  <button
                    type="button"
                    onClick={() => setActiveIacTab('terraform')}
                    className={`px-3 py-1 rounded-lg text-[10px] font-mono font-bold ${
                      activeIacTab === 'terraform' ? 'bg-purple-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                    }`}
                  >
                    Terraform HCL
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveIacTab('helm')}
                    className={`px-3 py-1 rounded-lg text-[10px] font-mono font-bold ${
                      activeIacTab === 'helm' ? 'bg-purple-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                    }`}
                  >
                    Helm values.yaml
                  </button>
                </div>

                <div className="p-3 rounded-xl bg-slate-900 text-slate-200 font-mono text-[10px] h-32 overflow-y-auto">
                  {activeIacTab === 'terraform' && `resource "kubernetes_deployment" "${newServiceName || 'service'}" {\n  metadata {\n    name = "${newServiceName || 'service'}"\n    namespace = "production"\n  }\n  spec {\n    replicas = 3\n  }\n}`}
                  {activeIacTab === 'helm' && `replicaCount: 3\nimage:\n  repository: gcr.io/smart-school/${newServiceName || 'service'}\n  tag: "v1.0.0"\nservice:\n  type: ClusterIP\n  port: 8080`}
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedGoldenPath(null)}
                  className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-bold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-600/20"
                >
                  Scaffold & Provision Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
