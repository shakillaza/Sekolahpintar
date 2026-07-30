import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  mockAiAgents,
  mockOrchestrationTasks,
  mockDigitalTwins,
  mockSimulationScenarios,
  mockPolicyRules,
  mockHumanApprovals,
  mockTenantAiCosts,
  autonomousDocsHandbooks,
  AiAgentItem,
  OrchestrationTask,
  DigitalTwinObject,
  SimulationScenario,
  PolicyRuleItem,
  HumanApprovalItem
} from '../../data/autonomousAiData';
import {
  Bot,
  Cpu,
  Boxes,
  Zap,
  Activity,
  ShieldCheck,
  Search,
  RefreshCcw,
  Plus,
  Terminal,
  Layers,
  ArrowUpRight,
  TrendingUp,
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
  BarChart3,
  Sliders,
  Users,
  Building2,
  Check,
  Clock,
  Eye,
  FileText,
  Workflow,
  HelpCircle,
  Brain,
  SlidersHorizontal,
  XCircle,
  ShieldAlert,
  Server
} from 'lucide-react';

export const AutonomousAiView: React.FC = () => {
  const { addToast } = useApp();

  // Navigation Tabs
  const [activeTab, setActiveTab] = useState<
    | 'control_center'
    | 'agents'
    | 'orchestrator'
    | 'digital_twin'
    | 'simulation'
    | 'policy_rules'
    | 'hitl'
    | 'knowledge'
    | 'safety_observability'
    | 'docs'
  >('control_center');

  // Agents Registry State
  const [agentsList, setAgentsList] = useState<AiAgentItem[]>(mockAiAgents);
  const [searchAgentTerm, setSearchAgentTerm] = useState('');
  const [selectedAgentDomain, setSelectedAgentDomain] = useState('all');
  const [inspectingAgent, setInspectingAgent] = useState<AiAgentItem | null>(null);

  // Orchestrator State
  const [taskList, setTaskList] = useState<OrchestrationTask[]>(mockOrchestrationTasks);
  const [showNewTaskModal, setShowNewTaskModal] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskAgent, setNewTaskAgent] = useState('Principal Agent');
  const [newTaskPriority, setNewTaskPriority] = useState<'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW'>('HIGH');

  // Human in the Loop State
  const [approvalQueue, setApprovalQueue] = useState<HumanApprovalItem[]>(mockHumanApprovals);

  // Knowledge Platform Search Test State
  const [searchKnowledgeQuery, setSearchKnowledgeQuery] = useState('');
  const [searchResults, setSearchResults] = useState<string[]>([]);

  // Simulation Runner State
  const [selectedScenario, setSelectedScenario] = useState<SimulationScenario | null>(mockSimulationScenarios[0]);
  const [simulating, setSimulating] = useState(false);

  // Docs Viewer State
  const [selectedDocKey, setSelectedDocKey] = useState<keyof typeof autonomousDocsHandbooks>('aiArchitectureGuide');

  // Filter Agents
  const domains = Array.from(new Set(mockAiAgents.map(a => a.domain)));
  const filteredAgents = agentsList.filter(a => {
    const matchesSearch =
      a.name.toLowerCase().includes(searchAgentTerm.toLowerCase()) ||
      a.code.toLowerCase().includes(searchAgentTerm.toLowerCase()) ||
      a.role.toLowerCase().includes(searchAgentTerm.toLowerCase());
    const matchesDomain = selectedAgentDomain === 'all' || a.domain === selectedAgentDomain;
    return matchesSearch && matchesDomain;
  });

  // Handlers
  const handleApproveTask = (id: string, taskCode: string) => {
    setApprovalQueue(prev => prev.map(item => (item.id === id ? { ...item, status: 'APPROVED' } : item)));
    addToast('success', 'Human-in-the-Loop Approved', `Tindakan otonom AI [${taskCode}] berhasil disetujui & dieksekusi.`);
  };

  const handleRejectTask = (id: string, taskCode: string) => {
    setApprovalQueue(prev => prev.map(item => (item.id === id ? { ...item, status: 'REJECTED' } : item)));
    addToast('info', 'Task Action Escalated', `Tindakan otonom AI [${taskCode}] ditolak & dialihkan ke pengawas manusia.`);
  };

  const handleCreateOrchestrationTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle) return;

    const newTask: OrchestrationTask = {
      id: `task-${Date.now()}`,
      code: `ORCH-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      title: newTaskTitle,
      initiator: 'Admin Operator',
      assignedAgent: newTaskAgent,
      delegationAgents: ['Analytics Agent', 'Compliance Agent'],
      priority: newTaskPriority,
      status: 'running',
      confidenceScore: 0.98,
      humanApprovalRequired: newTaskPriority === 'CRITICAL' || newTaskPriority === 'HIGH',
      createdAt: 'Baru saja',
      executionTimeMs: 250,
      summary: 'Menjalankan alur instruksi otonom dengan kolaborasi antar-agent terkoordinasi.',
    };

    setTaskList([newTask, ...taskList]);
    addToast('success', 'Orchestration Task Launched', `Berhasil memulai tugas otonom baru: ${newTask.code}`);
    setShowNewTaskModal(false);
    setNewTaskTitle('');
  };

  const handleRunSimulation = () => {
    setSimulating(true);
    addToast('info', 'Running Monte Carlo Simulation', 'Kalkulasi proyeksi kecerdasan buatan berbasis data historis & tren real-time...');
    setTimeout(() => {
      setSimulating(false);
      addToast('success', 'Simulation Finished', 'Proyeksi simulasi terbaru selesai dihitung dengan confidence level 97.4%.');
    }, 1200);
  };

  const handleKnowledgeSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchKnowledgeQuery) return;

    setSearchResults([
      `[Citation #1] POS SPP & Beasiswa Yayasan Garuda 2026 (Passage score: 0.94) — Kriteria penerima beasiswa prestasi berbasis rata-rata nilai > 88.0.`,
      `[Citation #2] Kurikulum Merdeka Capaian Pembelajaran Fase F (Passage score: 0.91) — Panduan penyusunan RPP terintegrasi kecerdasan buatan & STEM.`,
      `[Citation #3] Standard Operating Procedure Presensi & Kehadiran Guru (Passage score: 0.88) — Kebijakan penggantian jam mengajar berdasar ketersediaan jam kosong.`
    ]);
    addToast('success', 'Vector Semantic Search Completed', 'Menemukan 3 rujukan dokumen tepercaya melalui HNSW Index.');
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-950 via-purple-950 to-indigo-950 p-6 text-white shadow-xl border border-purple-800/40">
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-8 opacity-10 pointer-events-none">
          <Bot className="h-72 w-72 text-purple-400" />
        </div>
        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-400/30 uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" /> One Platform. Smart School. AI Powered.
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> 18 Autonomous Agents Active
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black tracking-tight text-white">
              Autonomous AI Platform & Agentic Operating System
            </h1>
            <p className="text-xs md:text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
              Ekosistem AI Otonom Terpusat: Multi-Agent Collaboration, Orchestrator Engine, AI Memory Layer, Digital Twin Platform, Simulation Center, & Human-in-the-Loop Governance.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 shrink-0">
            <button
              onClick={() => setShowNewTaskModal(true)}
              className="px-4 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-purple-600/30 flex items-center gap-2 transition-all"
            >
              <Plus className="w-3.5 h-3.5" /> Launch Autonomous Task
            </button>
            <button
              onClick={() => setActiveTab('simulation')}
              className="px-4 py-2.5 bg-slate-800/80 hover:bg-slate-700 text-white border border-slate-700 rounded-xl text-xs font-bold shadow-md flex items-center gap-2 transition-all"
            >
              <BarChart3 className="w-3.5 h-3.5 text-amber-400" /> Digital Twin Simulation
            </button>
          </div>
        </div>
      </div>

      {/* Top Metric Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
          <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 border border-purple-100 dark:border-purple-900/50">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Multi-Agent Ecosystem</p>
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mt-0.5">18 Active Agents</h3>
            <span className="text-[10px] text-emerald-600 font-bold mt-0.5 block flex items-center gap-0.5">
              <CheckCircle2 className="w-3 h-3" /> 10 Operational Domains
            </span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
          <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900/50">
            <Workflow className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Orchestration Confidence</p>
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mt-0.5">98.9% Average</h3>
            <span className="text-[10px] text-blue-600 font-bold mt-0.5 block">Zero Task Deadlocks</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
          <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/50">
            <Boxes className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Digital Twin Objects</p>
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mt-0.5">5 Replica Categories</h3>
            <span className="text-[10px] text-emerald-600 font-bold mt-0.5 block">Real-time Health 97.8%</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
          <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 border border-amber-100 dark:border-amber-900/50">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Human-in-the-Loop</p>
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mt-0.5">
              {approvalQueue.filter(a => a.status === 'PENDING').length} Pending Requests
            </h3>
            <span className="text-[10px] text-amber-600 font-bold mt-0.5 block">Strict Governance Enforced</span>
          </div>
        </div>
      </div>

      {/* Main Navigation Tabs */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-2 shadow-sm flex flex-wrap gap-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('control_center')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === 'control_center'
              ? 'bg-purple-600 text-white shadow-md shadow-purple-600/20'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Cpu className="w-3.5 h-3.5" /> AI Control Center
        </button>
        <button
          onClick={() => setActiveTab('agents')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === 'agents'
              ? 'bg-purple-600 text-white shadow-md shadow-purple-600/20'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Bot className="w-3.5 h-3.5" /> Multi-Agent Registry (18)
        </button>
        <button
          onClick={() => setActiveTab('orchestrator')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === 'orchestrator'
              ? 'bg-purple-600 text-white shadow-md shadow-purple-600/20'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Workflow className="w-3.5 h-3.5" /> AI Orchestrator & Tasks
        </button>
        <button
          onClick={() => setActiveTab('digital_twin')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === 'digital_twin'
              ? 'bg-purple-600 text-white shadow-md shadow-purple-600/20'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Boxes className="w-3.5 h-3.5" /> Digital Twin Platform
        </button>
        <button
          onClick={() => setActiveTab('simulation')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === 'simulation'
              ? 'bg-purple-600 text-white shadow-md shadow-purple-600/20'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <BarChart3 className="w-3.5 h-3.5" /> Predictive Simulation
        </button>
        <button
          onClick={() => setActiveTab('policy_rules')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === 'policy_rules'
              ? 'bg-purple-600 text-white shadow-md shadow-purple-600/20'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <SlidersHorizontal className="w-3.5 h-3.5" /> Policy Engine Rules
        </button>
        <button
          onClick={() => setActiveTab('hitl')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === 'hitl'
              ? 'bg-purple-600 text-white shadow-md shadow-purple-600/20'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5" /> Human in the Loop ({approvalQueue.filter(a => a.status === 'PENDING').length})
        </button>
        <button
          onClick={() => setActiveTab('knowledge')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === 'knowledge'
              ? 'bg-purple-600 text-white shadow-md shadow-purple-600/20'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Brain className="w-3.5 h-3.5" /> RAG Knowledge Platform
        </button>
        <button
          onClick={() => setActiveTab('safety_observability')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === 'safety_observability'
              ? 'bg-purple-600 text-white shadow-md shadow-purple-600/20'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Lock className="w-3.5 h-3.5" /> AI Safety & Observability
        </button>
        <button
          onClick={() => setActiveTab('docs')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === 'docs'
              ? 'bg-purple-600 text-white shadow-md shadow-purple-600/20'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" /> Architecture Guides
        </button>
      </div>

      {/* TAB 1: AI Control Center & Command Dashboard */}
      {activeTab === 'control_center' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Live Agent Activity Overview */}
            <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Activity className="w-4 h-4 text-purple-500" /> Active Autonomous Agent Operations (Live Stream)
                </h3>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300">
                  Polling 100ms
                </span>
              </div>

              <div className="space-y-3">
                {agentsList.filter(a => a.status !== 'idle').map(agent => (
                  <div
                    key={agent.id}
                    className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex flex-col md:flex-row md:items-center justify-between gap-3"
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-950 text-purple-600 shrink-0 mt-0.5">
                        <Bot className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-xs font-bold text-slate-900 dark:text-white">{agent.name}</h4>
                          <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                            {agent.code}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5 line-clamp-1">
                          {agent.lastAction}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between md:justify-end gap-3 text-xs shrink-0">
                      <div className="text-right">
                        <span className="text-[10px] text-slate-400 block">Task Queue</span>
                        <span className="font-mono font-bold text-slate-900 dark:text-white">{agent.taskQueueCount} Jobs</span>
                      </div>
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> {agent.status.toUpperCase()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Digital Twin Health Panel */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                <Boxes className="w-4 h-4 text-emerald-500" /> Digital Twin Status Summary
              </h3>

              <div className="space-y-3">
                {mockDigitalTwins.map(twin => (
                  <div key={twin.id} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-slate-900 dark:text-white truncate max-w-[180px]">{twin.name}</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                        {twin.realtimeHealthPct}%
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${twin.realtimeHealthPct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Multi-Agent Registry */}
      {activeTab === 'agents' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input
                type="text"
                placeholder="Cari nama agent, kode, atau peran..."
                value={searchAgentTerm}
                onChange={(e) => setSearchAgentTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
              <span className="text-xs text-slate-500 font-medium">Domain:</span>
              <select
                value={selectedAgentDomain}
                onChange={(e) => setSelectedAgentDomain(e.target.value)}
                className="px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none"
              >
                <option value="all">Semua Domain ({mockAiAgents.length})</option>
                {domains.map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredAgents.map(agent => (
              <div
                key={agent.id}
                className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-purple-500/50 transition-all flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
                      {agent.domain}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                      {agent.code}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center justify-between">
                    <span>{agent.name}</span>
                    <span className="text-[10px] font-mono text-emerald-600 font-bold">{agent.accuracyPct}% Acc</span>
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                    {agent.role}
                  </p>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <div>
                      <span className="text-slate-400 block text-[10px]">Memory Alloc</span>
                      <span className="font-bold text-slate-900 dark:text-white">{agent.memoryUsageMb} MB</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">Today Tokens</span>
                      <span className="font-bold text-purple-600">{(agent.tokensConsumedToday / 1000).toFixed(0)}k</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      agent.status === 'executing' ? 'bg-purple-100 text-purple-700' : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                    }`}>
                      {agent.status.toUpperCase()}
                    </span>

                    <button
                      onClick={() => setInspectingAgent(agent)}
                      className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-lg text-[11px] font-bold flex items-center gap-1"
                    >
                      <Eye className="w-3 h-3" /> Inspect Agent
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: AI Orchestrator */}
      {activeTab === 'orchestrator' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm space-y-4">
          <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-2">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Workflow className="w-4 h-4 text-purple-500" /> AI Task Orchestrator & Multi-Agent Delegation Stream
              </h3>
              <p className="text-xs text-slate-500">
                Pusat pengkoordinasian tugas otonom, delegasi antar-agent, penanganan antrean prioritas, & sinkronisasi memori.
              </p>
            </div>
            <button
              onClick={() => setShowNewTaskModal(true)}
              className="px-3.5 py-1.5 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-bold shadow-md shadow-purple-600/20 flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" /> Launch Task
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600 dark:text-slate-400">
              <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 font-bold uppercase text-[10px] tracking-wider border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="p-4">Kode Task</th>
                  <th className="p-4">Deskripsi Instruksi Task</th>
                  <th className="p-4">Assigned Agent</th>
                  <th className="p-4">Delegation Chain</th>
                  <th className="p-4">Prioritas</th>
                  <th className="p-4">Confidence Score</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {taskList.map(task => (
                  <tr key={task.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                    <td className="p-4 font-mono font-bold text-slate-900 dark:text-white">{task.code}</td>
                    <td className="p-4 font-semibold text-slate-900 dark:text-white max-w-xs">{task.title}</td>
                    <td className="p-4 font-bold text-purple-600 dark:text-purple-400">{task.assignedAgent}</td>
                    <td className="p-4">
                      <div className="flex flex-wrap gap-1">
                        {task.delegationAgents.map(da => (
                          <span key={da} className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                            {da}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                        task.priority === 'CRITICAL' ? 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300' : 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                      }`}>
                        {task.priority}
                      </span>
                    </td>
                    <td className="p-4 font-mono font-bold text-emerald-600">{(task.confidenceScore * 100).toFixed(1)}%</td>
                    <td className="p-4">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        task.status === 'running' ? 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300' : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                      }`}>
                        {task.status.toUpperCase()}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: Digital Twin Platform */}
      {activeTab === 'digital_twin' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockDigitalTwins.map(twin => (
              <div
                key={twin.id}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4"
              >
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 uppercase">
                    {twin.category}
                  </span>
                  <span className="text-[10px] font-mono text-emerald-600 font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> SYNC: {twin.lastSynced}
                  </span>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">{twin.name}</h3>
                  <p className="text-xs text-slate-500 font-mono mt-0.5">{twin.code}</p>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Real-time Metrics</span>
                  {Object.entries(twin.activeMetrics).map(([k, v]) => (
                    <div key={k} className="flex justify-between text-xs">
                      <span className="text-slate-500">{k}:</span>
                      <span className="font-mono font-bold text-slate-900 dark:text-white">{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: Predictive Simulation */}
      {activeTab === 'simulation' && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 to-indigo-950 text-white shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-amber-400" /> Digital Twin Predictive Simulation Engine
              </h3>
              <p className="text-xs text-slate-300 max-w-2xl leading-relaxed mt-1">
                Menjalankan skenario "What-If" untuk prediksi pendaftaran PPDB, tingkat kelulusan, ketahanan arus kas, dan analisis beban kerja guru.
              </p>
            </div>
            <button
              onClick={handleRunSimulation}
              disabled={simulating}
              className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl text-xs font-bold shadow-lg shadow-amber-500/20 flex items-center gap-2 transition-all shrink-0"
            >
              <Play className="w-3.5 h-3.5 fill-current" /> {simulating ? 'Menghitung Simulasi...' : 'Jalankan Simulasi Monte Carlo'}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mockSimulationScenarios.map(scen => (
              <div
                key={scen.id}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4"
              >
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300">
                    Skenario: {scen.type}
                  </span>
                  <span className="text-[10px] font-mono text-emerald-600 font-bold">
                    Confidence: {scen.confidenceIntervalPct}%
                  </span>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">{scen.title}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">{scen.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-2 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Kondisi Baseline</span>
                    <span className="font-bold text-slate-900 dark:text-white">{scen.baselineValue}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Hasil Proyeksi AI</span>
                    <span className="font-bold text-emerald-600">{scen.predictedValue}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase text-slate-400">Rekomendasi Keputusan Otonom:</span>
                  <p className="text-xs text-slate-700 dark:text-slate-300 bg-amber-50 dark:bg-amber-950/40 p-2.5 rounded-xl border border-amber-200 dark:border-amber-900/50">
                    💡 {scen.recommendation}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 6: Policy Engine Rules */}
      {activeTab === 'policy_rules' && (
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <SlidersHorizontal className="w-5 h-5 text-purple-500" /> AI Policy Engine & Business Rules Guard
          </h3>

          <div className="space-y-3">
            {mockPolicyRules.map(rule => (
              <div key={rule.id} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300">
                    {rule.code} ({rule.category})
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                    ENFORCED
                  </span>
                </div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">{rule.name}</h4>
                <p className="text-[11px] font-mono text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-900 p-2 rounded-lg border border-slate-200 dark:border-slate-800">
                  IF {rule.condition} THEN {rule.action}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 7: Human in the Loop */}
      {activeTab === 'hitl' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-500" /> Human-in-the-Loop (HITL) Action Approval Queue
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Tindakan otonom AI berisiko tinggi membutuhkan konfirmasi manual dari pengawas/kepala sekolah sebelum dieksekusi secara permanen.
            </p>
          </div>

          <div className="space-y-3">
            {approvalQueue.map(item => (
              <div
                key={item.id}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300">
                      {item.taskCode}
                    </span>
                    <span className="text-xs font-bold text-purple-600">{item.agentName}</span>
                    <span className="text-[10px] text-slate-400">• {item.requestedAt}</span>
                  </div>

                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">{item.actionRequested}</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{item.reasoning}</p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {item.status === 'PENDING' ? (
                    <>
                      <button
                        onClick={() => handleRejectTask(item.id, item.taskCode)}
                        className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-bold"
                      >
                        Tolak Action
                      </button>
                      <button
                        onClick={() => handleApproveTask(item.id, item.taskCode)}
                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-600/20 flex items-center gap-1.5"
                      >
                        <Check className="w-3.5 h-3.5" /> Disetujui (Approve)
                      </button>
                    </>
                  ) : (
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      item.status === 'APPROVED' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                    }`}>
                      {item.status}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 8: RAG Knowledge Platform */}
      {activeTab === 'knowledge' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-6">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Brain className="w-5 h-5 text-purple-500" /> RAG Knowledge Platform & HNSW Vector Indexing
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Pencarian semantik terkurasi dokumen POS sekolah, Kurikulum Merdeka, & regulasi Kemdikbud dengan pelacakan sumber rujukan (citation tracking).
            </p>
          </div>

          <form onSubmit={handleKnowledgeSearch} className="flex gap-2">
            <input
              type="text"
              placeholder="Ketik pertanyaan untuk pengujian pencarian semantik RAG..."
              value={searchKnowledgeQuery}
              onChange={(e) => setSearchKnowledgeQuery(e.target.value)}
              className="flex-1 px-4 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
            />
            <button
              type="submit"
              className="px-4 py-2.5 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-bold shadow-md shadow-purple-600/20 flex items-center gap-1.5"
            >
              <Search className="w-3.5 h-3.5" /> Cari Vector Document
            </button>
          </form>

          {searchResults.length > 0 && (
            <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Hasil Pencarian Vector RAG:</span>
              {searchResults.map((res, i) => (
                <div key={i} className="p-3 rounded-xl bg-purple-50 dark:bg-purple-950/40 text-xs text-purple-900 dark:text-purple-200 border border-purple-200 dark:border-purple-900/50 font-mono">
                  {res}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 9: Safety & Observability */}
      {activeTab === 'safety_observability' && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Lock className="w-5 h-5 text-purple-500" /> AI Safety, PII Masking & Observability Tracing
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-700">Prompt Guard</span>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">Injection Filter</h4>
                <p className="text-xs text-slate-500">100% percobaan jailbreak atau prompt injection diblokir di tingkat Gateway.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-100 text-purple-700">PII Redaction</span>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">Privacy Protection</h4>
                <p className="text-xs text-slate-500">Penyamaran NIK, NISN, nomor HP sebelum dikirim ke LLM model context.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-700">Trace Logs</span>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">Latency & Cost Audit</h4>
                <p className="text-xs text-slate-500">Pelacakan latensi rata-rata 310ms dan transparansi biaya per tenant.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 10: Architecture Handbooks */}
      {activeTab === 'docs' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4">
          <div className="flex flex-wrap gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
            <button
              onClick={() => setSelectedDocKey('aiArchitectureGuide')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedDocKey === 'aiArchitectureGuide' ? 'bg-purple-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
              }`}
            >
              AI Platform Architecture Guide
            </button>
            <button
              onClick={() => setSelectedDocKey('multiAgentGuide')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedDocKey === 'multiAgentGuide' ? 'bg-purple-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
              }`}
            >
              Multi-Agent Collaboration Protocol
            </button>
            <button
              onClick={() => setSelectedDocKey('digitalTwinGuide')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedDocKey === 'digitalTwinGuide' ? 'bg-purple-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
              }`}
            >
              Digital Twin & Simulation Guide
            </button>
            <button
              onClick={() => setSelectedDocKey('policyGovernanceGuide')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedDocKey === 'policyGovernanceGuide' ? 'bg-purple-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
              }`}
            >
              AI Governance & HITL Handbook
            </button>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs overflow-x-auto whitespace-pre-wrap leading-relaxed border border-slate-800">
            {autonomousDocsHandbooks[selectedDocKey]}
          </div>
        </div>
      )}

      {/* Inspect Agent Modal */}
      {inspectingAgent && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 max-w-lg w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300">
                {inspectingAgent.domain}
              </span>
              <button onClick={() => setInspectingAgent(null)} className="text-slate-400 hover:text-slate-600 dark:hover:text-white">
                ✕
              </button>
            </div>

            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              {inspectingAgent.name} ({inspectingAgent.code})
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-slate-400 block text-[10px] font-bold uppercase">Role:</span>
                <p className="text-slate-800 dark:text-slate-200">{inspectingAgent.role}</p>
              </div>

              <div>
                <span className="text-slate-400 block text-[10px] font-bold uppercase">Goal:</span>
                <p className="text-slate-800 dark:text-slate-200 bg-purple-50 dark:bg-purple-950/40 p-2.5 rounded-xl border border-purple-200 dark:border-purple-900/50">
                  {inspectingAgent.goal}
                </p>
              </div>

              <div>
                <span className="text-slate-400 block text-[10px] font-bold uppercase mb-1">Capabilities:</span>
                <div className="flex flex-wrap gap-1">
                  {inspectingAgent.capabilities.map(c => (
                    <span key={c} className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono text-[10px]">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setInspectingAgent(null)}
                className="px-4 py-2 bg-purple-600 text-white rounded-xl text-xs font-bold"
              >
                Tutup Inspection
              </button>
            </div>
          </div>
        </div>
      )}

      {/* New Task Modal */}
      {showNewTaskModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 max-w-md w-full shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Launch Autonomous Orchestration Task
            </h3>

            <form onSubmit={handleCreateOrchestrationTask} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Judul & Deskripsi Instruksi Task:
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Analisis Prediksi Kelulusan & Koreksi RPP Otomatis"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Pilih Primary Lead Agent:
                </label>
                <select
                  value={newTaskAgent}
                  onChange={(e) => setNewTaskAgent(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                >
                  {mockAiAgents.map(a => (
                    <option key={a.id} value={a.name}>{a.name} ({a.domain})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Tingkat Prioritas Execution:
                </label>
                <select
                  value={newTaskPriority}
                  onChange={(e) => setNewTaskPriority(e.target.value as any)}
                  className="w-full px-4 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                >
                  <option value="CRITICAL">CRITICAL (Direct Priority)</option>
                  <option value="HIGH">HIGH (Standard Stream)</option>
                  <option value="MEDIUM">MEDIUM (Background Queue)</option>
                  <option value="LOW">LOW (Batch Processing)</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowNewTaskModal(false)}
                  className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-bold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-bold shadow-md shadow-purple-600/20"
                >
                  Jalankan Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
