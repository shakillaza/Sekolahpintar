export interface DataCatalogItem {
  id: string;
  tableName: string;
  domain: string;
  rowCountEstimate: number;
  dataQualityScore: number; // 0 - 100
  cdcStatus: 'ACTIVE' | 'PAUSED' | 'SYNCING';
  dataClassification: 'PUBLIC' | 'INTERNAL' | 'RESTRICTED' | 'CONFIDENTIAL';
  lastRefreshed: string;
}

export interface AiAgentCollaboration {
  id: string;
  workflowName: string;
  agentsInvolved: string[];
  triggerType: 'Event' | 'Cron' | 'UserAction' | 'API';
  successRatePct: number;
  avgLatencyMs: number;
  primaryModel: string;
  fallbackModel: string;
}

export interface AutonomousMonitoringLog {
  id: string;
  component: string;
  anomalyType: 'CpuSpike' | 'LatencyDeviation' | 'TokenCapExceeded' | 'DbPoolExhaustion';
  severity: 'INFO' | 'WARNING' | 'CRITICAL';
  autoActionTaken: string;
  status: 'RESOLVED' | 'SELF_HEALED' | 'MONITORING';
  timestamp: string;
}

export interface MarketplacePlugin {
  id: string;
  code: string;
  title: string;
  category: 'LMS Extension' | 'AI Tutor' | 'Payment Gateway' | 'Biometric' | 'Analytics';
  developer: string;
  downloadsCount: number;
  rating: number; // 1-5
  version: string;
  isVerified: boolean;
  priceModel: 'FREE' | 'SUBSCRIPTION' | 'PER_STUDENT';
}

export interface SustainabilityMetric {
  id: string;
  region: string;
  carbonEmissionsKg: number;
  pueRatio: number; // Power Usage Effectiveness e.g. 1.12
  cleanEnergyPct: number;
  monthlySavingsUSD: number;
  energyEfficiencyGrade: 'A+' | 'A' | 'B' | 'C';
}

export interface CustomerHealthScore {
  id: string;
  institutionName: string;
  region: string;
  activeUsersCount: number;
  healthScore: number; // 0-100
  renewalProbabilityPct: number;
  adoptionTrend: 'up' | 'stable' | 'down';
  keyRiskFactor?: string;
}

export interface DeveloperSdk {
  id: string;
  language: 'TypeScript / Node' | 'Python' | 'Java' | 'Go' | 'REST / OpenAPI';
  version: string;
  packageUrl: string;
  description: string;
}

// Mock Data Catalogs
export const mockDataCatalog: DataCatalogItem[] = [
  {
    id: 'dc-01',
    tableName: 'unified_data_catalog',
    domain: 'Data Fabric',
    rowCountEstimate: 1250000,
    dataQualityScore: 99.4,
    cdcStatus: 'ACTIVE',
    dataClassification: 'INTERNAL',
    lastRefreshed: '2026-07-30 00:35:12',
  },
  {
    id: 'dc-02',
    tableName: 'semantic_models',
    domain: 'Analytics & AI',
    rowCountEstimate: 45000,
    dataQualityScore: 98.8,
    cdcStatus: 'ACTIVE',
    dataClassification: 'INTERNAL',
    lastRefreshed: '2026-07-30 00:30:00',
  },
  {
    id: 'dc-03',
    tableName: 'autonomous_actions',
    domain: 'Autonomous Platform',
    rowCountEstimate: 890000,
    dataQualityScore: 100.0,
    cdcStatus: 'ACTIVE',
    dataClassification: 'RESTRICTED',
    lastRefreshed: '2026-07-30 00:40:02',
  },
  {
    id: 'dc-04',
    tableName: 'customer_health_scores',
    domain: 'Customer Success',
    rowCountEstimate: 1250,
    dataQualityScore: 97.5,
    cdcStatus: 'ACTIVE',
    dataClassification: 'CONFIDENTIAL',
    lastRefreshed: '2026-07-29 23:55:00',
  },
  {
    id: 'dc-05',
    tableName: 'sustainability_metrics',
    domain: 'Sustainability',
    rowCountEstimate: 3600,
    dataQualityScore: 99.9,
    cdcStatus: 'ACTIVE',
    dataClassification: 'PUBLIC',
    lastRefreshed: '2026-07-30 00:15:00',
  },
];

// Mock AI Collaborations
export const mockAiCollaborations: AiAgentCollaboration[] = [
  {
    id: 'aic-01',
    workflowName: 'Auto-Grading & Remedial Recommendation Engine',
    agentsInvolved: ['EssayEvaluatorAgent', 'RemedialPlannerAgent', 'NotificationAgent'],
    triggerType: 'UserAction',
    successRatePct: 99.6,
    avgLatencyMs: 340,
    primaryModel: 'gemini-2.5-flash',
    fallbackModel: 'gemini-2.0-flash-lite',
  },
  {
    id: 'aic-02',
    workflowName: 'Autonomous Financial Anomaly & Fraud Detection',
    agentsInvolved: ['AuditLogWatcher', 'RiskAssessmentAgent', 'ComplianceEnforcer'],
    triggerType: 'Event',
    successRatePct: 99.9,
    avgLatencyMs: 180,
    primaryModel: 'gemini-2.5-pro',
    fallbackModel: 'gemini-2.5-flash',
  },
  {
    id: 'aic-03',
    workflowName: 'Smart Campus Energy & Climate Auto-Adjustment',
    agentsInvolved: ['IotTelemetryWatcher', 'EnergySaverAgent', 'AlertDispatcher'],
    triggerType: 'Cron',
    successRatePct: 98.9,
    avgLatencyMs: 120,
    primaryModel: 'gemini-2.0-flash',
    fallbackModel: 'rule-based-fallback',
  },
];

// Mock Autonomous Logs
export const mockAutonomousLogs: AutonomousMonitoringLog[] = [
  {
    id: 'aut-01',
    component: 'Cloud Run Ingress Gateway',
    anomalyType: 'LatencyDeviation',
    severity: 'WARNING',
    autoActionTaken: 'Auto-scaled pod replicas from 4 to 12 nodes & enabled Redis L2 cache',
    status: 'SELF_HEALED',
    timestamp: '2026-07-30 00:22:18',
  },
  {
    id: 'aut-02',
    component: 'AI Token Proxy Router',
    anomalyType: 'TokenCapExceeded',
    severity: 'INFO',
    autoActionTaken: 'Rerouted low-priority background prompts to gemini-2.0-flash-lite pool',
    status: 'RESOLVED',
    timestamp: '2026-07-30 00:10:05',
  },
  {
    id: 'aut-03',
    component: 'PostgreSQL Cloud SQL Connection Pool',
    anomalyType: 'DbPoolExhaustion',
    severity: 'CRITICAL',
    autoActionTaken: 'Purged idle connection locks & increased max_connections to 400',
    status: 'RESOLVED',
    timestamp: '2026-07-29 23:45:10',
  },
];

// Mock Marketplace Plugins
export const mockMarketplacePlugins: MarketplacePlugin[] = [
  {
    id: 'plug-01',
    code: 'EXT-ZOOM-PRO',
    title: 'Zoom Education Live Class Integration',
    category: 'LMS Extension',
    developer: 'Zoom Video Communications, Inc.',
    downloadsCount: 14200,
    rating: 4.9,
    version: 'v3.4.1',
    isVerified: true,
    priceModel: 'FREE',
  },
  {
    id: 'plug-02',
    code: 'EXT-TURNITIN-AI',
    title: 'Turnitin AI Plagiarism & Similarity Checker',
    category: 'AI Tutor',
    developer: 'Turnitin LLC',
    downloadsCount: 18900,
    rating: 4.8,
    version: 'v5.1.0',
    isVerified: true,
    priceModel: 'SUBSCRIPTION',
  },
  {
    id: 'plug-03',
    code: 'EXT-MIDTRANS-VA',
    title: 'Midtrans Multi-Bank Virtual Account Auto-Reconciliation',
    category: 'Payment Gateway',
    developer: 'Midtrans Indonesia',
    downloadsCount: 24500,
    rating: 5.0,
    version: 'v2.2.0',
    isVerified: true,
    priceModel: 'FREE',
  },
  {
    id: 'plug-04',
    code: 'EXT-FACE-PRESENCE',
    title: 'AI Biometric Iris & Face Recognition Gate',
    category: 'Biometric',
    developer: 'EduOS Security Lab',
    downloadsCount: 8700,
    rating: 4.7,
    version: 'v1.8.0',
    isVerified: true,
    priceModel: 'PER_STUDENT',
  },
];

// Mock Sustainability Metrics
export const mockSustainabilityMetrics: SustainabilityMetric[] = [
  {
    id: 'sust-01',
    region: 'asia-east1 (Taiwan / Regional Hub)',
    carbonEmissionsKg: 142.5,
    pueRatio: 1.11,
    cleanEnergyPct: 94.2,
    monthlySavingsUSD: 1850.0,
    energyEfficiencyGrade: 'A+',
  },
  {
    id: 'sust-02',
    region: 'asia-southeast1 (Jakarta / Primary Edge)',
    carbonEmissionsKg: 210.0,
    pueRatio: 1.15,
    cleanEnergyPct: 88.5,
    monthlySavingsUSD: 2400.0,
    energyEfficiencyGrade: 'A',
  },
];

// Mock Customer Health Scores
export const mockCustomerHealthScores: CustomerHealthScore[] = [
  {
    id: 'chs-01',
    institutionName: 'Yayasan Pendidikan Al-Azhar Jakarta (32 Cabang)',
    region: 'DKI Jakarta',
    activeUsersCount: 18500,
    healthScore: 98.2,
    renewalProbabilityPct: 99.5,
    adoptionTrend: 'up',
  },
  {
    id: 'chs-02',
    institutionName: 'SMA Negeri 1 Bandung (Pilot Smart School)',
    region: 'Jawa Barat',
    activeUsersCount: 1420,
    healthScore: 96.5,
    renewalProbabilityPct: 98.0,
    adoptionTrend: 'up',
  },
  {
    id: 'chs-03',
    institutionName: 'Sekolah Penabur Indonesia (Group)',
    region: 'National',
    activeUsersCount: 24000,
    healthScore: 99.1,
    renewalProbabilityPct: 99.9,
    adoptionTrend: 'up',
  },
];

// Mock Developer SDKs
export const mockDeveloperSdks: DeveloperSdk[] = [
  {
    id: 'sdk-01',
    language: 'TypeScript / Node',
    version: 'v5.0.2',
    packageUrl: '@eduos/sdk-node',
    description: 'SDK TypeScript terlengkap dengan dukungan penuh async event listeners, auto-retry, & type safety.',
  },
  {
    id: 'sdk-02',
    language: 'Python',
    version: 'v5.0.0',
    packageUrl: 'pip install eduos-python-sdk',
    description: 'Modul Python ideal untuk data science, RAG custom pipelines, & integrasi model AI eksternal.',
  },
  {
    id: 'sdk-03',
    language: 'REST / OpenAPI',
    version: 'v5.0.0 (OpenAPI 3.1)',
    packageUrl: 'https://api.eduos.io/v5/swagger.json',
    description: 'Spesifikasi OpenAPI komprehensif untuk pengujian Postman atau generasi client otomatis.',
  },
];

// Complete v5.0 Master Handbooks
export const cloudV5MasterDocs = {
  v5Architecture: `====================================================================
SMART AI SCHOOL MANAGEMENT SYSTEM — ENTERPRISE EDUCATION CLOUD PLATFORM v5.0
MASTER PLATFORM & SYSTEM ARCHITECTURE MANUAL
====================================================================

1. VISION & DESIGN PHILOSOPHY
   Smart AI School OS v5.0 dirancang sebagai Platform Education Cloud Hyperscale 
   yang menghubungkan seluruh pemangku kepentingan (Siswa, Orang Tua, Guru, Staf, 
   Kepala Sekolah, Yayasan, & Dinas Pendidikan) dalam satu ekosistem terpadu.

2. CORE ARCHITECTURAL PILLARS
   ✓ AI-Native Architecture (Integrated Gemini Multi-Agent & Semantic Caching)
   ✓ Cloud-Native & Containerized (Google Cloud Run & Cloud SQL PostgreSQL)
   ✓ API-First Design (RESTful, GraphQL, & WebSockets Ready)
   ✓ Multi-Tenant SaaS (Isolated tenant schemas & strict RBAC/ABAC policy)
   ✓ Zero Trust Security (End-to-end TLS 1.3, AES-256 at rest, ISO 27001)
   ✓ Event-Driven Realtime Engine (Pub/Sub & Event Stream Architecture)

3. HYPERSCALE CAPABILITIES
   - Mendukung hingga 10.000.000 pengguna aktif dengan latensi p99 < 200ms.
   - Auto-scaling cerdas berbasis beban CPU/RAM & queue length.
   - Resiliensi Multi-Region & Auto-Failover Disaster Recovery (< 1 menit RTO).

Tagline Resmi:
"One Platform. Smart School. AI Powered."`,

  v5DeveloperManual: `====================================================================
DEVELOPER & EXTENSION SDK HANDBOOK (v5.0)
====================================================================

1. DEVELOPER WORKFLOW
   - Gunakan EduOS Plugin SDK (@eduos/sdk-node atau eduos-python-sdk) untuk membangun 
     ekstensi kustom, modul LMS tambahan, atau integrasi hardware IoT.
   - Pendaftaran Webhook & Event Subscriptions secara instan melalui Developer Center.

2. EXTENSION REGISTRY & MARKETPLACE
   - Setiap plugin wajib lolos verifikasi keamanan otomatis (Static Code Analysis, 
     Vulnerability Scanning, & Permission Audit) sebelum diterbitkan di Marketplace.`,

  v5GovernanceSecurity: `====================================================================
ENTERPRISE GOVERNANCE, RISK & SECURITY HANDBOOK (v5.0)
====================================================================

1. DATA PRIVACY & COMPLIANCE (UU PDP & ISO 27001)
   - Seluruh data siswa dan finansial dienkripsi pada tingkat kolom (Column-Level Encryption).
   - Penilaian kepatuhan UU PDP secara berkala dengan audit log immutable yang tidak dapat diubah.

2. AI GOVERNANCE & ETHICS
   - Guardrails aktif mencegah prompt injection dan kebocoran PII pada model AI.
   - Transparansi dan penjelasan (Explainability) pada setiap rekomendasi AI.`,

  v5OperationsHandbook: `====================================================================
GLOBAL OPERATIONS, OBSERVABILITY & SUSTAINABILITY MANUAL
====================================================================

1. AUTONOMOUS PLATFORM OPERATIONS
   - Self-Monitoring & Self-Healing: Pendeteksian anomali secara real-time dan 
     tindakan perbaikan otomatis tanpa gangguan layanan (Zero Downtime).

2. SUSTAINABILITY & GREEN CLOUD FINOPS
   - Pemantauan PUE (Power Usage Effectiveness) & emisi karbon infrastruktur.
   - Rekomendasi FinOps otomatis untuk efisiensi biaya hingga 30%.`
};
