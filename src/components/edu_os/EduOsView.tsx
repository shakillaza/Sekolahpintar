import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  mockExecutiveScorecards,
  mockEnterpriseRisks,
  mockBusinessRules,
  mockProcessMiningMetrics,
  mockInnovationProjects,
  mockResearchPublications,
  mockKnowledgeGraphNodes,
  mockFinOpsCosts,
  eduOsDocsHandbooks,
  ExecutiveScorecard,
  EnterpriseRiskItem,
  BusinessRuleItem,
  ProcessMiningMetric,
  InnovationProjectItem,
  ResearchPublicationItem,
  KnowledgeGraphNode,
  FinOpsCostMetric
} from '../../data/eduOsData';
import {
  Sparkles,
  Cpu,
  Workflow,
  ShieldCheck,
  AlertTriangle,
  BarChart3,
  Lightbulb,
  BookOpen,
  Brain,
  DollarSign,
  FileText,
  Plus,
  CheckCircle2,
  TrendingUp,
  Search,
  Filter,
  Play,
  RotateCcw,
  Zap,
  Activity,
  Layers,
  Award,
  Globe,
  SlidersHorizontal,
  ThumbsUp,
  ExternalLink,
  ShieldAlert,
  Server,
  Lock,
  Eye,
  Check
} from 'lucide-react';

export const EduOsView: React.FC = () => {
  const { addToast } = useApp();

  // Active Sub-Tab
  const [activeTab, setActiveTab] = useState<
    | 'control_center'
    | 'hyper_automation'
    | 'process_mining'
    | 'risk_governance'
    | 'innovation_hub'
    | 'research_platform'
    | 'knowledge_graph'
    | 'finops'
    | 'docs'
  >('control_center');

  // Low-Code Business Rules State
  const [rulesList, setRulesList] = useState<BusinessRuleItem[]>(mockBusinessRules);
  const [showRuleModal, setShowRuleModal] = useState(false);
  const [newRuleName, setNewRuleName] = useState('');
  const [newRuleCategory, setNewRuleCategory] = useState<'Academic' | 'Finance' | 'Governance' | 'Automation' | 'Security'>('Academic');
  const [newRuleIf, setNewRuleIf] = useState('');
  const [newRuleThen, setNewRuleThen] = useState('');

  // Enterprise Risk Management State
  const [riskList, setRiskList] = useState<EnterpriseRiskItem[]>(mockEnterpriseRisks);
  const [selectedRiskCategory, setSelectedRiskCategory] = useState<string>('ALL');

  // Innovation Projects Voting State
  const [innovationList, setInnovationList] = useState<InnovationProjectItem[]>(mockInnovationProjects);
  const [showInnovationModal, setShowInnovationModal] = useState(false);
  const [newIdeaTitle, setNewIdeaTitle] = useState('');
  const [newIdeaProposer, setNewIdeaProposer] = useState('');
  const [newIdeaImpact, setNewIdeaImpact] = useState('');

  // Knowledge Graph State
  const [selectedNode, setSelectedNode] = useState<KnowledgeGraphNode | null>(mockKnowledgeGraphNodes[0]);

  // Documentation Guides State
  const [selectedDocKey, setSelectedDocKey] = useState<keyof typeof eduOsDocsHandbooks>('eduOsGuide');

  // Handlers
  const handleToggleRule = (id: string) => {
    setRulesList(prev =>
      prev.map(r => (r.id === id ? { ...r, isActive: !r.isActive } : r))
    );
    addToast('info', 'Status Rule Diperbarui', 'Perubahan aturan bisnis telah disinkronkan ke Feature Flag Engine.');
  };

  const handleCreateRule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRuleName || !newRuleIf || !newRuleThen) return;

    const newRule: BusinessRuleItem = {
      id: `rule-${Date.now()}`,
      code: `RULE-CUSTOM-${Math.floor(100 + Math.random() * 900)}`,
      name: newRuleName,
      category: newRuleCategory,
      version: 'v1.0',
      conditionVisual: `IF ${newRuleIf}`,
      actionVisual: `${newRuleThen}`,
      isActive: true,
      isSimulated: true,
      lastSimulatedImpact: 'Aturan kustom telah disimulasikan tanpa konflik aturan lain.',
      updatedAt: 'Baru saja',
    };

    setRulesList([newRule, ...rulesList]);
    addToast('success', 'Business Rule Dibuat', `Berhasil menerbitkan aturan bisnis baru: ${newRule.code}`);
    setShowRuleModal(false);
    setNewRuleName('');
    setNewRuleIf('');
    setNewRuleThen('');
  };

  const handleVoteProject = (id: string) => {
    setInnovationList(prev =>
      prev.map(p => {
        if (p.id === id) {
          const hasVoted = !p.hasVoted;
          return {
            ...p,
            hasVoted,
            votesCount: hasVoted ? p.votesCount + 1 : p.votesCount - 1,
          };
        }
        return p;
      })
    );
    addToast('success', 'Dukungan Inovasi Ditambahkan', 'Suara Anda berhasil dicatat dalam Innovation Registry.');
  };

  const handleCreateInnovation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newIdeaTitle || !newIdeaProposer) return;

    const newProject: InnovationProjectItem = {
      id: `innov-${Date.now()}`,
      code: `INN-2026-${Math.floor(10 + Math.random() * 90)}`,
      title: newIdeaTitle,
      proposer: newIdeaProposer,
      category: 'Smart Campus',
      stage: 'Idea',
      votesCount: 1,
      hasVoted: true,
      expectedImpact: newIdeaImpact || 'Meningkatkan efisiensi digital ekosistem sekolah.',
      targetQuarter: 'Q1 2027',
    };

    setInnovationList([newProject, ...innovationList]);
    addToast('success', 'Ide Inovasi Diajukan', `Berhasil mendaftarkan proposal inovasi baru: ${newProject.code}`);
    setShowInnovationModal(false);
    setNewIdeaTitle('');
    setNewIdeaProposer('');
    setNewIdeaImpact('');
  };

  const filteredRisks = riskList.filter(
    r => selectedRiskCategory === 'ALL' || r.category === selectedRiskCategory
  );

  return (
    <div className="space-y-6">
      {/* Top Banner Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-950 via-indigo-950 to-purple-950 p-6 text-white shadow-xl border border-purple-800/40">
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-8 opacity-10 pointer-events-none">
          <Sparkles className="h-72 w-72 text-purple-400" />
        </div>
        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-400/30 uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" /> EduOS v4.0 — Enterprise Education OS
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> All Systems Operational
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black tracking-tight text-white">
              Education Operating System & Enterprise Control Center
            </h1>
            <p className="text-xs md:text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
              Integrasi Hyper-Automation, Enterprise Governance, Risk Management (ERM), Executive Intelligence, Business Rule Engine, Process Mining, Innovation Hub, & FinOps.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 shrink-0">
            <button
              onClick={() => setShowRuleModal(true)}
              className="px-4 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-purple-600/30 flex items-center gap-2 transition-all"
            >
              <Plus className="w-3.5 h-3.5" /> Build Business Rule
            </button>
            <button
              onClick={() => setShowInnovationModal(true)}
              className="px-4 py-2.5 bg-slate-800/80 hover:bg-slate-700 text-white border border-slate-700 rounded-xl text-xs font-bold shadow-md flex items-center gap-2 transition-all"
            >
              <Lightbulb className="w-3.5 h-3.5 text-amber-400" /> Submit Innovation Idea
            </button>
          </div>
        </div>
      </div>

      {/* Main Tab Navigation */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-2 shadow-sm flex flex-wrap gap-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('control_center')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === 'control_center'
              ? 'bg-purple-600 text-white shadow-md shadow-purple-600/20'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Cpu className="w-3.5 h-3.5" /> Executive Intelligence (7 Scorecards)
        </button>
        <button
          onClick={() => setActiveTab('hyper_automation')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === 'hyper_automation'
              ? 'bg-purple-600 text-white shadow-md shadow-purple-600/20'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Workflow className="w-3.5 h-3.5" /> Hyper-Automation & Rules ({rulesList.length})
        </button>
        <button
          onClick={() => setActiveTab('process_mining')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === 'process_mining'
              ? 'bg-purple-600 text-white shadow-md shadow-purple-600/20'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <BarChart3 className="w-3.5 h-3.5" /> Process Mining & Bottleneck
        </button>
        <button
          onClick={() => setActiveTab('risk_governance')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === 'risk_governance'
              ? 'bg-purple-600 text-white shadow-md shadow-purple-600/20'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <ShieldAlert className="w-3.5 h-3.5" /> Enterprise Risk (ERM) ({riskList.length})
        </button>
        <button
          onClick={() => setActiveTab('innovation_hub')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === 'innovation_hub'
              ? 'bg-purple-600 text-white shadow-md shadow-purple-600/20'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Lightbulb className="w-3.5 h-3.5 text-amber-400" /> Innovation Hub ({innovationList.length})
        </button>
        <button
          onClick={() => setActiveTab('research_platform')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === 'research_platform'
              ? 'bg-purple-600 text-white shadow-md shadow-purple-600/20'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" /> Education Research
        </button>
        <button
          onClick={() => setActiveTab('knowledge_graph')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === 'knowledge_graph'
              ? 'bg-purple-600 text-white shadow-md shadow-purple-600/20'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Brain className="w-3.5 h-3.5" /> Knowledge Graph
        </button>
        <button
          onClick={() => setActiveTab('finops')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === 'finops'
              ? 'bg-purple-600 text-white shadow-md shadow-purple-600/20'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <DollarSign className="w-3.5 h-3.5" /> Platform FinOps
        </button>
        <button
          onClick={() => setActiveTab('docs')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === 'docs'
              ? 'bg-purple-600 text-white shadow-md shadow-purple-600/20'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <FileText className="w-3.5 h-3.5" /> EduOS Handbooks
        </button>
      </div>

      {/* SUB-TAB 1: Executive Intelligence Scorecards */}
      {activeTab === 'control_center' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockExecutiveScorecards.map(sc => (
              <div
                key={sc.id}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300">
                    {sc.category}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                    {sc.status}
                  </span>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">{sc.title}</h3>
                  <div className="flex items-baseline gap-2 mt-2">
                    <span className="text-2xl font-black text-slate-900 dark:text-white font-mono">{sc.score}</span>
                    <span className="text-xs font-bold text-emerald-600 flex items-center gap-0.5">
                      <TrendingUp className="w-3 h-3" /> +{sc.changePct}% YoY
                    </span>
                  </div>
                </div>

                <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-purple-600 to-emerald-500 rounded-full" style={{ width: `${sc.score}%` }} />
                </div>

                <div className="space-y-1 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Key Executive Insights:</span>
                  <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-300">
                    {sc.keyInsights.map((ins, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-purple-500 font-bold">•</span>
                        <span>{ins}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 2: Hyper-Automation & Low-Code Business Rules */}
      {activeTab === 'hyper_automation' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm space-y-4">
          <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-2">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Workflow className="w-4 h-4 text-purple-500" /> Visual Business Rule Engine & Automation Rules
              </h3>
              <p className="text-xs text-slate-500">
                Visual low-code builder untuk pendefinisian aturan operasional, simulasi dampak, & pembatasan akses.
              </p>
            </div>
            <button
              onClick={() => setShowRuleModal(true)}
              className="px-3.5 py-1.5 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-bold shadow-md shadow-purple-600/20 flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" /> Tambah Aturan
            </button>
          </div>

          <div className="p-4 space-y-4">
            {rulesList.map(rule => (
              <div
                key={rule.id}
                className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-3"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300">
                      {rule.code}
                    </span>
                    <span className="text-xs font-bold text-slate-900 dark:text-white">{rule.name}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                      {rule.version}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-[10px] text-slate-400">Diperbarui: {rule.updatedAt}</span>
                    <button
                      onClick={() => handleToggleRule(rule.id)}
                      className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all ${
                        rule.isActive ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {rule.isActive ? 'ACTIVE (ENFORCED)' : 'DISABLED'}
                    </button>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-slate-900 text-slate-100 font-mono text-xs space-y-1">
                  <div className="text-purple-400 font-bold">{rule.conditionVisual}</div>
                  <div className="text-emerald-400 font-bold">THEN {rule.actionVisual}</div>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-1">
                  <span className="flex items-center gap-1">
                    <Zap className="w-3.5 h-3.5 text-amber-500" /> Simulasi Dampak: {rule.lastSimulatedImpact}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 3: Business Process Mining */}
      {activeTab === 'process_mining' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-purple-500" /> Process Mining & Bottleneck Analytics
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Analisis waktu siklus operasional, deteksi titik kemacetan (bottleneck), & rekomendasi efisiensi proses.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {mockProcessMiningMetrics.map(pm => (
              <div
                key={pm.id}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3"
              >
                <div className="flex justify-between items-center">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                    {pm.category}
                  </span>
                  <span className="text-[10px] font-mono text-emerald-600 font-bold">
                    Conformance: {pm.conformanceScorePct}%
                  </span>
                </div>

                <h4 className="text-xs font-bold text-slate-900 dark:text-white">{pm.processName}</h4>

                <div className="grid grid-cols-2 gap-2 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Siklus Waktu</span>
                    <span className="font-bold text-slate-900 dark:text-white">{pm.avgCycleTimeHours} Jam</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Throughput</span>
                    <span className="font-bold text-purple-600">{pm.throughputPerDay} / Hari</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/50 space-y-1">
                  <span className="text-[10px] font-bold text-amber-800 dark:text-amber-300 flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" /> Bottleneck Node Terdeteksi:
                  </span>
                  <p className="text-xs text-amber-900 dark:text-amber-200">{pm.bottleneckNode}</p>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Rekomendasi AI:</span>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{pm.optimizationRecommendation}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 4: Enterprise Risk Management (ERM) */}
      {activeTab === 'risk_governance' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-rose-500" /> Enterprise Risk Register & Risk Heatmap
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Pengawasan 9 taksonomi risiko utama: Akademik, Finansial, Operasional, Cyber, AI, & Kepatuhan.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 font-medium">Filter Kategori:</span>
              <select
                value={selectedRiskCategory}
                onChange={(e) => setSelectedRiskCategory(e.target.value)}
                className="px-3 py-1.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              >
                <option value="ALL">Semua Risiko</option>
                <option value="Cyber">Cyber</option>
                <option value="AI">AI</option>
                <option value="Financial">Financial</option>
                <option value="Compliance">Compliance</option>
                <option value="Infrastructure">Infrastructure</option>
              </select>
            </div>
          </div>

          <div className="space-y-3">
            {filteredRisks.map(risk => (
              <div
                key={risk.id}
                className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300">
                      {risk.code}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                      {risk.category}
                    </span>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">{risk.title}</h4>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-xs font-mono font-bold text-slate-500">Score: {risk.riskScore} (I:{risk.impact} x L:{risk.likelihood})</span>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      risk.inherentLevel === 'HIGH' ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {risk.inherentLevel}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                  🛡️ <strong className="text-slate-900 dark:text-white">Rencana Mitigasi:</strong> {risk.mitigationPlan}
                </p>

                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>Owner: {risk.owner}</span>
                  <span>Peninjauan Terakhir: {risk.lastReviewed}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 5: Innovation Hub */}
      {activeTab === 'innovation_hub' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-amber-500" /> Innovation Hub & Idea Registry
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Wadah usulan fitur,voting komunitas, eksperimen prototype, & roadmap inovasi sekolah.
              </p>
            </div>
            <button
              onClick={() => setShowInnovationModal(true)}
              className="px-3.5 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl text-xs font-bold shadow-md shadow-amber-500/20 flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" /> Ajukan Ide Inovasi
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {innovationList.map(item => (
              <div
                key={item.id}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300">
                      {item.category}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                      Stage: {item.stage}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">{item.title}</h4>
                  <p className="text-xs text-slate-500">Pengusul: {item.proposer} • Target: {item.targetQuarter}</p>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-xl">
                    {item.expectedImpact}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    {item.votesCount} Dukungan
                  </span>

                  <button
                    onClick={() => handleVoteProject(item.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                      item.hasVoted
                        ? 'bg-amber-500 text-slate-950'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200'
                    }`}
                  >
                    <ThumbsUp className="w-3.5 h-3.5" /> {item.hasVoted ? 'Didukung' : 'Dukung Ide Ini'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 6: Education Research Platform */}
      {activeTab === 'research_platform' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-purple-500" /> Education Research Platform & Journal Repository
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Repositori publikasi ilmiah guru & tim peneliti, pelacakan sitasi, & katalog lisensi terbuka (Open Access).
            </p>
          </div>

          <div className="space-y-3">
            {mockResearchPublications.map(pub => (
              <div
                key={pub.id}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300">
                    {pub.field}
                  </span>
                  <span className="text-xs font-mono font-bold text-emerald-600">
                    Citations: {pub.citationsCount}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-slate-900 dark:text-white">{pub.title}</h4>
                <p className="text-xs text-slate-500">Penulis: {pub.authors.join(', ')} ({pub.publicationYear})</p>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                  {pub.abstractSummary}
                </p>

                <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono pt-1">
                  <span>Jurnal: {pub.journalName}</span>
                  <span>DOI: {pub.doi}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 7: Knowledge Graph */}
      {activeTab === 'knowledge_graph' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 shadow-sm space-y-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Brain className="w-4 h-4 text-purple-500" /> Semantic Ontology Nodes
            </h3>

            <div className="space-y-2">
              {mockKnowledgeGraphNodes.map(node => (
                <button
                  key={node.id}
                  onClick={() => setSelectedNode(node)}
                  className={`w-full text-left p-3 rounded-xl text-xs font-bold transition-all flex items-center justify-between ${
                    selectedNode?.id === node.id
                      ? 'bg-purple-600 text-white'
                      : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200'
                  }`}
                >
                  <span>{node.label}</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/20">
                    {node.type}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="md:col-span-2 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-4">
            {selectedNode ? (
              <>
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                  <div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300">
                      Node Type: {selectedNode.type}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white mt-1">{selectedNode.label}</h3>
                  </div>
                  <span className="text-xs text-slate-400 font-mono">{selectedNode.connectedCount} Keterhubungan</span>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl">
                  {selectedNode.description}
                </p>

                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-900 dark:text-white">Hubungan Relasional (Edges):</span>
                  {selectedNode.relations.map((rel, i) => (
                    <div key={i} className="p-2.5 rounded-xl bg-purple-50 dark:bg-purple-950/40 text-xs text-purple-900 dark:text-purple-200 font-mono border border-purple-200 dark:border-purple-900/50">
                      [{selectedNode.label}] --({rel.relationType})--&gt; [{rel.targetId}]
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <p className="text-xs text-slate-400 text-center py-12">Pilih node di sebelah kiri untuk melihat peta keterhubungan semantik.</p>
            )}
          </div>
        </div>
      )}

      {/* SUB-TAB 8: Platform FinOps */}
      {activeTab === 'finops' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-emerald-500" /> Platform FinOps & Cloud Cost Management
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Transparansi anggaran cloud per komponen: Compute, API Token AI, Storage, & Optimasi Otomatis.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockFinOpsCosts.map(fo => (
              <div
                key={fo.category}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3"
              >
                <div className="flex justify-between items-center">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300">
                    {fo.category}
                  </span>
                  <span className="text-xs font-mono font-bold text-emerald-600">
                    ${fo.monthlyCostUSD.toFixed(2)} / bln
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>Penggunaan Anggaran:</span>
                    <span>${fo.monthlyCostUSD} / ${fo.budgetCapUSD} ({fo.utilizationPct}%)</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${fo.utilizationPct}%` }} />
                  </div>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-xl">
                  💡 <strong className="text-slate-900 dark:text-white">Rekomendasi Optimasi:</strong> {fo.optimizationRecommendation}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 9: Documentation Handbooks */}
      {activeTab === 'docs' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4">
          <div className="flex flex-wrap gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
            <button
              onClick={() => setSelectedDocKey('eduOsGuide')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedDocKey === 'eduOsGuide' ? 'bg-purple-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
              }`}
            >
              EduOS Guide
            </button>
            <button
              onClick={() => setSelectedDocKey('governanceHandbook')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedDocKey === 'governanceHandbook' ? 'bg-purple-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
              }`}
            >
              Governance Handbook
            </button>
            <button
              onClick={() => setSelectedDocKey('riskGuide')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedDocKey === 'riskGuide' ? 'bg-purple-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
              }`}
            >
              Risk Management Guide
            </button>
            <button
              onClick={() => setSelectedDocKey('innovationGuide')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedDocKey === 'innovationGuide' ? 'bg-purple-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
              }`}
            >
              Innovation Guide
            </button>
            <button
              onClick={() => setSelectedDocKey('researchGuide')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedDocKey === 'researchGuide' ? 'bg-purple-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
              }`}
            >
              Research Guide
            </button>
            <button
              onClick={() => setSelectedDocKey('finOpsGuide')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedDocKey === 'finOpsGuide' ? 'bg-purple-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
              }`}
            >
              FinOps Guide
            </button>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs overflow-x-auto whitespace-pre-wrap leading-relaxed border border-slate-800">
            {eduOsDocsHandbooks[selectedDocKey]}
          </div>
        </div>
      )}

      {/* Build Rule Modal */}
      {showRuleModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Workflow className="w-4 h-4 text-purple-500" /> Visual Rule Builder
              </h3>
              <button onClick={() => setShowRuleModal(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-white">
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateRule} className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Nama Aturan</label>
                <input
                  type="text"
                  placeholder="Misal: Diskon Beasiswa Jalur Olimpiade"
                  value={newRuleName}
                  onChange={(e) => setNewRuleName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Kategori</label>
                <select
                  value={newRuleCategory}
                  onChange={(e: any) => setNewRuleCategory(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                >
                  <option value="Academic">Academic</option>
                  <option value="Finance">Finance</option>
                  <option value="Governance">Governance</option>
                  <option value="Automation">Automation</option>
                  <option value="Security">Security</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">IF Condition</label>
                <input
                  type="text"
                  placeholder="Student.OlimpiadeMedal == TRUE"
                  value={newRuleIf}
                  onChange={(e) => setNewRuleIf(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-mono"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">THEN Action</label>
                <input
                  type="text"
                  placeholder="APPLY_SCHOLARSHIP(100%)"
                  value={newRuleThen}
                  onChange={(e) => setNewRuleThen(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-mono"
                  required
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowRuleModal(false)}
                  className="px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-purple-600 text-white shadow-md shadow-purple-600/20"
                >
                  Terbitkan Aturan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Submit Innovation Modal */}
      {showInnovationModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-amber-500" /> Form Proposal Inovasi
              </h3>
              <button onClick={() => setShowInnovationModal(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-white">
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateInnovation} className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Judul Inovasi</label>
                <input
                  type="text"
                  placeholder="Misal: System Presensi AI Iris Scanner"
                  value={newIdeaTitle}
                  onChange={(e) => setNewIdeaTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Nama Pengusul</label>
                <input
                  type="text"
                  placeholder="Nama / Tim Pengusul"
                  value={newIdeaProposer}
                  onChange={(e) => setNewIdeaProposer(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Ekspektasi Dampak / Manfaat</label>
                <textarea
                  placeholder="Jelaskan dampak efisiensi atau manfaat bagi sekolah..."
                  value={newIdeaImpact}
                  onChange={(e) => setNewIdeaImpact(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  rows={3}
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowInnovationModal(false)}
                  className="px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20"
                >
                  Daftarkan Ide Inovasi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
