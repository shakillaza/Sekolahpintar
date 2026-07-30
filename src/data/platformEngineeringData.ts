export interface MicroserviceItem {
  id: string;
  name: string;
  code: string;
  domain: string;
  language: string;
  replicas: number;
  maxReplicas: number;
  status: 'healthy' | 'degraded' | 'scaling' | 'maintenance';
  latencyMs: number;
  errorRatePct: number;
  cpuUsagePct: number;
  memUsagePct: number;
  qps: number;
  version: string;
  dependencies: string[];
  description: string;
}

export interface ApiGatewayRoute {
  id: string;
  path: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'ALL';
  targetService: string;
  rateLimitPerMin: number;
  authRequired: boolean;
  circuitBreaker: 'closed' | 'open' | 'half-open';
  cacheEnabled: boolean;
  avgLatencyMs: number;
  version: string;
  qps: number;
}

export interface EventStreamTopic {
  id: string;
  name: string;
  type: 'domain' | 'application' | 'integration';
  broker: 'Kafka' | 'RabbitMQ' | 'Redis Streams' | 'Cloud Pub/Sub' | 'Amazon SQS';
  partitions: number;
  retentionDays: number;
  msgPerSec: number;
  dlqCount: number;
  consumersCount: number;
  status: 'active' | 'syncing' | 'paused';
}

export interface KubernetesCluster {
  id: string;
  name: string;
  region: string;
  provider: 'GKE' | 'EKS' | 'AKS' | 'BareMetal';
  environment: 'production' | 'staging' | 'disaster-recovery' | 'regional';
  nodesCount: number;
  totalCpuCores: number;
  totalRamGb: number;
  k8sVersion: string;
  status: 'healthy' | 'warning' | 'synced';
  activePods: number;
}

export interface GoldenPathTemplate {
  id: string;
  title: string;
  category: 'Microservice' | 'Worker' | 'API Gateway' | 'Event Consumer' | 'AI Service';
  techStack: string;
  language: string;
  iacSupport: ('Terraform' | 'Helm' | 'K8s Manifest' | 'Docker Compose')[];
  deployTimeMin: number;
  description: string;
}

export interface SreServiceSlo {
  id: string;
  serviceName: string;
  sliName: string;
  targetSloPct: number;
  currentSliPct: number;
  errorBudgetRemainingPct: number;
  status: 'normal' | 'at_risk' | 'exhausted';
  incidentCount30d: number;
}

export interface PlatformCostBreakdown {
  category: string;
  costUSD: number;
  changeMonthPct: number;
  allocationPct: number;
  iconName: string;
}

export interface TenantCostAllocation {
  tenantId: string;
  schoolName: string;
  planTier: string;
  activeUsers: number;
  computeCostUSD: number;
  storageCostUSD: number;
  aiCostUSD: number;
  totalCostUSD: number;
}

// 28 Microservices Domain Registry
export const mockMicroservices: MicroserviceItem[] = [
  {
    id: 'ms-01',
    name: 'Identity Service',
    code: 'identity-service',
    domain: 'Security & Auth',
    language: 'Go 1.22',
    replicas: 8,
    maxReplicas: 32,
    status: 'healthy',
    latencyMs: 12,
    errorRatePct: 0.001,
    cpuUsagePct: 28,
    memUsagePct: 34,
    qps: 2450,
    version: 'v2.8.1',
    dependencies: ['tenant-service', 'audit-service'],
    description: 'Pusat otentikasi single sign-on (SSO), manajemen user, token JWT & SAML 2.0.'
  },
  {
    id: 'ms-02',
    name: 'Authentication Service',
    code: 'auth-service',
    domain: 'Security & Auth',
    language: 'Go 1.22',
    replicas: 6,
    maxReplicas: 24,
    status: 'healthy',
    latencyMs: 14,
    errorRatePct: 0.002,
    cpuUsagePct: 31,
    memUsagePct: 40,
    qps: 1890,
    version: 'v2.8.0',
    dependencies: ['identity-service', 'notification-service'],
    description: 'Memproses MFA, Passkey FIDO2, biometric, dan verifikasi OTP SMS/WhatsApp.'
  },
  {
    id: 'ms-03',
    name: 'Authorization Service',
    code: 'authz-service',
    domain: 'Security & Auth',
    language: 'Rust 1.78',
    replicas: 10,
    maxReplicas: 40,
    status: 'healthy',
    latencyMs: 4,
    errorRatePct: 0.000,
    cpuUsagePct: 18,
    memUsagePct: 22,
    qps: 4200,
    version: 'v1.4.2',
    dependencies: ['identity-service'],
    description: 'Evaluasi kebijakan akses fine-grained (ABAC & RBAC) berbasis Open Policy Agent (OPA).'
  },
  {
    id: 'ms-04',
    name: 'Tenant Service',
    code: 'tenant-service',
    domain: 'Platform Core',
    language: 'Node.js / TS',
    replicas: 4,
    maxReplicas: 16,
    status: 'healthy',
    latencyMs: 18,
    errorRatePct: 0.005,
    cpuUsagePct: 22,
    memUsagePct: 38,
    qps: 850,
    version: 'v3.1.0',
    dependencies: ['license-service'],
    description: 'Pengelola profil sekolah multi-tenant, konfigurasi domain kustom, & isolasi data.'
  },
  {
    id: 'ms-05',
    name: 'School Service',
    code: 'school-service',
    domain: 'Platform Core',
    language: 'Node.js / TS',
    replicas: 4,
    maxReplicas: 16,
    status: 'healthy',
    latencyMs: 22,
    errorRatePct: 0.004,
    cpuUsagePct: 25,
    memUsagePct: 42,
    qps: 720,
    version: 'v2.2.0',
    dependencies: ['tenant-service', 'hr-service'],
    description: 'Data master institusi sekolah, cabang, fasilitas, gedung, & struktur organisasi.'
  },
  {
    id: 'ms-06',
    name: 'Academic Service',
    code: 'academic-service',
    domain: 'Education & Curriculum',
    language: 'Java / Spring 3.2',
    replicas: 12,
    maxReplicas: 48,
    status: 'healthy',
    latencyMs: 38,
    errorRatePct: 0.012,
    cpuUsagePct: 42,
    memUsagePct: 58,
    qps: 3100,
    version: 'v4.0.1',
    dependencies: ['student-service', 'teacher-service', 'workflow-service'],
    description: 'Kurikulum Merdeka/K13, jadwal pelajaran, rombel, presensi harian & RPP AI.'
  },
  {
    id: 'ms-07',
    name: 'Student Service',
    code: 'student-service',
    domain: 'Education & Curriculum',
    language: 'Node.js / TS',
    replicas: 8,
    maxReplicas: 32,
    status: 'healthy',
    latencyMs: 25,
    errorRatePct: 0.008,
    cpuUsagePct: 30,
    memUsagePct: 45,
    qps: 2200,
    version: 'v3.5.0',
    dependencies: ['tenant-service', 'document-service'],
    description: 'Data master siswa, NISN, riwayat akademik, mutasi, kedisiplinan & ekstrakurikuler.'
  },
  {
    id: 'ms-08',
    name: 'Teacher Service',
    code: 'teacher-service',
    domain: 'Education & Curriculum',
    language: 'Node.js / TS',
    replicas: 6,
    maxReplicas: 24,
    status: 'healthy',
    latencyMs: 24,
    errorRatePct: 0.006,
    cpuUsagePct: 28,
    memUsagePct: 41,
    qps: 1450,
    version: 'v3.2.1',
    dependencies: ['hr-service', 'academic-service'],
    description: 'Data master guru & staf, NUPTK, jam mengajar, sertifikasi pendidik & portofolio.'
  },
  {
    id: 'ms-09',
    name: 'HR Service',
    code: 'hr-service',
    domain: 'Enterprise Operations',
    language: 'Python 3.11 / FastAPI',
    replicas: 4,
    maxReplicas: 16,
    status: 'healthy',
    latencyMs: 32,
    errorRatePct: 0.010,
    cpuUsagePct: 20,
    memUsagePct: 35,
    qps: 520,
    version: 'v2.1.0',
    dependencies: ['payroll-service', 'document-service'],
    description: 'Penggajian pegawai, presensi GPS/Biometric, cuti, klaim medis & KPI kinerja.'
  },
  {
    id: 'ms-10',
    name: 'Finance Service',
    code: 'finance-service',
    domain: 'Financial Operations',
    language: 'Go 1.22',
    replicas: 10,
    maxReplicas: 40,
    status: 'healthy',
    latencyMs: 18,
    errorRatePct: 0.003,
    cpuUsagePct: 35,
    memUsagePct: 48,
    qps: 2800,
    version: 'v3.8.0',
    dependencies: ['billing-service', 'payment-service', 'audit-service'],
    description: 'Buku besar (General Ledger), akuntansi double-entry, RAPBS, & audit arus kas.'
  },
  {
    id: 'ms-11',
    name: 'Billing Service',
    code: 'billing-service',
    domain: 'Financial Operations',
    language: 'Node.js / TS',
    replicas: 8,
    maxReplicas: 32,
    status: 'healthy',
    latencyMs: 28,
    errorRatePct: 0.009,
    cpuUsagePct: 33,
    memUsagePct: 52,
    qps: 1950,
    version: 'v3.4.2',
    dependencies: ['student-service', 'payment-service'],
    description: 'Penagihan SPP rutin otomatis, uang pangkal, beasiswa, denda, & faktur pajak.'
  },
  {
    id: 'ms-12',
    name: 'Payment Service',
    code: 'payment-service',
    domain: 'Financial Operations',
    language: 'Go 1.22',
    replicas: 12,
    maxReplicas: 48,
    status: 'healthy',
    latencyMs: 15,
    errorRatePct: 0.002,
    cpuUsagePct: 38,
    memUsagePct: 44,
    qps: 3400,
    version: 'v4.1.0',
    dependencies: ['notification-service', 'finance-service'],
    description: 'Integrasi Payment Gateway (Virtual Account, QRIS, Credit Card, E-Wallet).'
  },
  {
    id: 'ms-13',
    name: 'Library Service',
    code: 'library-service',
    domain: 'Campus Services',
    language: 'Python / Django',
    replicas: 3,
    maxReplicas: 12,
    status: 'healthy',
    latencyMs: 45,
    errorRatePct: 0.015,
    cpuUsagePct: 18,
    memUsagePct: 39,
    qps: 380,
    version: 'v1.9.0',
    dependencies: ['student-service', 'search-service'],
    description: 'Perpustakaan digital e-Book, katalog MARC21, sirkulasi peminjaman & e-Reader.'
  },
  {
    id: 'ms-14',
    name: 'Inventory Service',
    code: 'inventory-service',
    domain: 'Campus Services',
    language: 'Node.js / TS',
    replicas: 3,
    maxReplicas: 12,
    status: 'healthy',
    latencyMs: 30,
    errorRatePct: 0.008,
    cpuUsagePct: 15,
    memUsagePct: 32,
    qps: 410,
    version: 'v2.0.1',
    dependencies: ['school-service', 'procurement-service'],
    description: 'Aset sekolah, barcode/RFID tracking, pemeliharaan laboratorium & perlengkapan.'
  },
  {
    id: 'ms-15',
    name: 'LMS Service',
    code: 'lms-service',
    domain: 'Learning & Testing',
    language: 'Java / Spring 3.2',
    replicas: 16,
    maxReplicas: 64,
    status: 'healthy',
    latencyMs: 35,
    errorRatePct: 0.011,
    cpuUsagePct: 48,
    memUsagePct: 62,
    qps: 5200,
    version: 'v4.5.0',
    dependencies: ['academic-service', 'ai-service', 'document-service'],
    description: 'Ruang kelas interaktif, unggah tugas, video conference, & materi pembelajaran.'
  },
  {
    id: 'ms-16',
    name: 'CBT Service',
    code: 'cbt-service',
    domain: 'Learning & Testing',
    language: 'Go 1.22',
    replicas: 20,
    maxReplicas: 80,
    status: 'healthy',
    latencyMs: 8,
    errorRatePct: 0.001,
    cpuUsagePct: 52,
    memUsagePct: 40,
    qps: 8900,
    version: 'v5.0.2',
    dependencies: ['student-service', 'ai-service'],
    description: 'Computer Based Test (CBT) skala tinggi, anti-cheating AI, & penilaian instan.'
  },
  {
    id: 'ms-17',
    name: 'CRM Service',
    code: 'crm-service',
    domain: 'Engagement & Comm',
    language: 'Node.js / TS',
    replicas: 4,
    maxReplicas: 16,
    status: 'healthy',
    latencyMs: 28,
    errorRatePct: 0.007,
    cpuUsagePct: 22,
    memUsagePct: 36,
    qps: 640,
    version: 'v2.3.0',
    dependencies: ['student-service', 'notification-service'],
    description: 'Manajemen calon siswa PPDB, helpdesk orang tua, tiket pengaduan & survei.'
  },
  {
    id: 'ms-18',
    name: 'Notification Service',
    code: 'notification-service',
    domain: 'Engagement & Comm',
    language: 'Go 1.22',
    replicas: 8,
    maxReplicas: 32,
    status: 'healthy',
    latencyMs: 16,
    errorRatePct: 0.004,
    cpuUsagePct: 30,
    memUsagePct: 38,
    qps: 3100,
    version: 'v3.0.1',
    dependencies: ['tenant-service'],
    description: 'Broadcaster multi-channel: Push Notification, WhatsApp API, Email SMTP & SMS.'
  },
  {
    id: 'ms-19',
    name: 'AI Service',
    code: 'ai-service',
    domain: 'Intelligence & Search',
    language: 'Python 3.11 / PyTorch',
    replicas: 14,
    maxReplicas: 56,
    status: 'healthy',
    latencyMs: 180,
    errorRatePct: 0.018,
    cpuUsagePct: 65,
    memUsagePct: 78,
    qps: 1850,
    version: 'v2.5.0-gemini',
    dependencies: ['analytics-service', 'search-service'],
    description: 'Model Gemini 2.5 Flash / Pro, RAG vector embeddings, OCR ijazah & AI Tutor.'
  },
  {
    id: 'ms-20',
    name: 'Analytics Service',
    code: 'analytics-service',
    domain: 'Intelligence & Search',
    language: 'Rust / Python',
    replicas: 6,
    maxReplicas: 24,
    status: 'healthy',
    latencyMs: 42,
    errorRatePct: 0.005,
    cpuUsagePct: 40,
    memUsagePct: 55,
    qps: 1200,
    version: 'v3.1.2',
    dependencies: ['event-store'],
    description: 'Engine agregasi OLAP, analitik prediktif kelulusan, & dashboard eksekutif.'
  },
  {
    id: 'ms-21',
    name: 'Search Service',
    code: 'search-service',
    domain: 'Intelligence & Search',
    language: 'Java / Elasticsearch',
    replicas: 6,
    maxReplicas: 24,
    status: 'healthy',
    latencyMs: 12,
    errorRatePct: 0.002,
    cpuUsagePct: 32,
    memUsagePct: 60,
    qps: 2900,
    version: 'v8.11.0',
    dependencies: ['ai-service'],
    description: 'Pencarian semantik cepat lintas database sekolah, dokumen, & RPP.'
  },
  {
    id: 'ms-22',
    name: 'Document Service',
    code: 'document-service',
    domain: 'Content & Storage',
    language: 'Go 1.22',
    replicas: 6,
    maxReplicas: 24,
    status: 'healthy',
    latencyMs: 20,
    errorRatePct: 0.003,
    cpuUsagePct: 24,
    memUsagePct: 36,
    qps: 1600,
    version: 'v2.4.0',
    dependencies: ['tenant-service'],
    description: 'Penyimpanan terenkripsi berkas ijazah, surat menyurat, foto siswa & S3 bucket.'
  },
  {
    id: 'ms-23',
    name: 'Workflow Service',
    code: 'workflow-service',
    domain: 'Core Automation',
    language: 'Go / Temporal.io',
    replicas: 4,
    maxReplicas: 16,
    status: 'healthy',
    latencyMs: 15,
    errorRatePct: 0.001,
    cpuUsagePct: 20,
    memUsagePct: 30,
    qps: 980,
    version: 'v1.8.0',
    dependencies: ['notification-service', 'document-service'],
    description: 'Orkestrasi alur kerja persetujuan persuratan, mutasi siswa & anggaran yayasan.'
  },
  {
    id: 'ms-24',
    name: 'License Service',
    code: 'license-service',
    domain: 'Platform Core',
    language: 'Node.js / TS',
    replicas: 3,
    maxReplicas: 12,
    status: 'healthy',
    latencyMs: 14,
    errorRatePct: 0.000,
    cpuUsagePct: 12,
    memUsagePct: 25,
    qps: 450,
    version: 'v2.0.0',
    dependencies: ['tenant-service'],
    description: 'Manajemen kunci lisensi SaaS, batas kuota siswa/guru, & perpanjangan berlangganan.'
  },
  {
    id: 'ms-25',
    name: 'Monitoring Service',
    code: 'monitoring-service',
    domain: 'Observability & SRE',
    language: 'Go / Prometheus',
    replicas: 4,
    maxReplicas: 16,
    status: 'healthy',
    latencyMs: 10,
    errorRatePct: 0.000,
    cpuUsagePct: 25,
    memUsagePct: 40,
    qps: 5100,
    version: 'v2.45.0',
    dependencies: ['audit-service'],
    description: 'Kolektor metrik real-time OpenTelemetry, alertmanager, & healthcheck probe.'
  },
  {
    id: 'ms-26',
    name: 'Audit Service',
    code: 'audit-service',
    domain: 'Observability & SRE',
    language: 'Go / ClickHouse',
    replicas: 6,
    maxReplicas: 24,
    status: 'healthy',
    latencyMs: 8,
    errorRatePct: 0.000,
    cpuUsagePct: 28,
    memUsagePct: 42,
    qps: 6200,
    version: 'v2.1.0',
    dependencies: ['tenant-service'],
    description: 'Immutable ledger jejak audit keamanan, aktivitas user & pendaftaran akses data.'
  },
  {
    id: 'ms-27',
    name: 'Reporting Service',
    code: 'reporting-service',
    domain: 'Core Automation',
    language: 'Python / Celery',
    replicas: 5,
    maxReplicas: 20,
    status: 'healthy',
    latencyMs: 120,
    errorRatePct: 0.010,
    cpuUsagePct: 45,
    memUsagePct: 60,
    qps: 340,
    version: 'v3.0.0',
    dependencies: ['academic-service', 'finance-service', 'document-service'],
    description: 'Generator PDF/Excel rapor otomatis, laporan Dapodik, & ekspor data konsolidasi.'
  },
  {
    id: 'ms-28',
    name: 'Gateway Service',
    code: 'gateway-service',
    domain: 'API & Ingress',
    language: 'Envoy / C++',
    replicas: 12,
    maxReplicas: 48,
    status: 'healthy',
    latencyMs: 2,
    errorRatePct: 0.000,
    cpuUsagePct: 22,
    memUsagePct: 28,
    qps: 18400,
    version: 'v1.29.0',
    dependencies: ['identity-service', 'authz-service'],
    description: 'Enterprise API Gateway, SSL termination, rate limiting, CORS & edge caching.'
  }
];

export const mockApiGatewayRoutes: ApiGatewayRoute[] = [
  {
    id: 'route-01',
    path: '/api/v2/auth/*',
    method: 'ALL',
    targetService: 'auth-service',
    rateLimitPerMin: 120,
    authRequired: false,
    circuitBreaker: 'closed',
    cacheEnabled: false,
    avgLatencyMs: 14,
    version: 'v2',
    qps: 1890
  },
  {
    id: 'route-02',
    path: '/api/v3/academic/grades/*',
    method: 'ALL',
    targetService: 'academic-service',
    rateLimitPerMin: 300,
    authRequired: true,
    circuitBreaker: 'closed',
    cacheEnabled: true,
    avgLatencyMs: 28,
    version: 'v3',
    qps: 2400
  },
  {
    id: 'route-03',
    path: '/api/v1/cbt/submit',
    method: 'POST',
    targetService: 'cbt-service',
    rateLimitPerMin: 600,
    authRequired: true,
    circuitBreaker: 'closed',
    cacheEnabled: false,
    avgLatencyMs: 8,
    version: 'v1',
    qps: 8900
  },
  {
    id: 'route-04',
    path: '/api/v2/ai/generate-rpp',
    method: 'POST',
    targetService: 'ai-service',
    rateLimitPerMin: 60,
    authRequired: true,
    circuitBreaker: 'closed',
    cacheEnabled: true,
    avgLatencyMs: 180,
    version: 'v2',
    qps: 450
  },
  {
    id: 'route-05',
    path: '/api/v3/payments/webhook',
    method: 'POST',
    targetService: 'payment-service',
    rateLimitPerMin: 1000,
    authRequired: false,
    circuitBreaker: 'closed',
    cacheEnabled: false,
    avgLatencyMs: 15,
    version: 'v3',
    qps: 1200
  }
];

export const mockEventStreams: EventStreamTopic[] = [
  {
    id: 'ev-01',
    name: 'school.student.registered.v1',
    type: 'domain',
    broker: 'Kafka',
    partitions: 12,
    retentionDays: 30,
    msgPerSec: 140,
    dlqCount: 0,
    consumersCount: 6,
    status: 'active'
  },
  {
    id: 'ev-02',
    name: 'school.payment.succeeded.v2',
    type: 'integration',
    broker: 'Kafka',
    partitions: 16,
    retentionDays: 90,
    msgPerSec: 320,
    dlqCount: 0,
    consumersCount: 8,
    status: 'active'
  },
  {
    id: 'ev-03',
    name: 'school.cbt.submitted.v1',
    type: 'domain',
    broker: 'Redis Streams',
    partitions: 8,
    retentionDays: 7,
    msgPerSec: 1250,
    dlqCount: 2,
    consumersCount: 12,
    status: 'active'
  },
  {
    id: 'ev-04',
    name: 'school.ai.rpp_generated.v1',
    type: 'application',
    broker: 'Cloud Pub/Sub',
    partitions: 6,
    retentionDays: 14,
    msgPerSec: 85,
    dlqCount: 0,
    consumersCount: 4,
    status: 'active'
  }
];

export const mockKubernetesClusters: KubernetesCluster[] = [
  {
    id: 'cluster-prod-asia',
    name: 'asia-east1-production-cluster',
    region: 'asia-east1 (Jakarta / Singapore)',
    provider: 'GKE',
    environment: 'production',
    nodesCount: 32,
    totalCpuCores: 256,
    totalRamGb: 1024,
    k8sVersion: 'v1.29.4-gke.1000',
    status: 'healthy',
    activePods: 348
  },
  {
    id: 'cluster-dr-us',
    name: 'us-central1-disaster-recovery',
    region: 'us-central1 (Iowa)',
    provider: 'GKE',
    environment: 'disaster-recovery',
    nodesCount: 12,
    totalCpuCores: 96,
    totalRamGb: 384,
    k8sVersion: 'v1.29.4-gke.1000',
    status: 'synced',
    activePods: 142
  },
  {
    id: 'cluster-staging',
    name: 'asia-southeast2-staging-01',
    region: 'asia-southeast2 (Jakarta)',
    provider: 'GKE',
    environment: 'staging',
    nodesCount: 8,
    totalCpuCores: 64,
    totalRamGb: 256,
    k8sVersion: 'v1.30.0-gke',
    status: 'healthy',
    activePods: 96
  }
];

export const mockGoldenPaths: GoldenPathTemplate[] = [
  {
    id: 'gp-01',
    title: 'Node.js Enterprise Microservice',
    category: 'Microservice',
    techStack: 'TypeScript, Express, Prisma, Kafka Client, OpenTelemetry',
    language: 'TypeScript / Node.js 20',
    iacSupport: ['Terraform', 'Helm', 'K8s Manifest', 'Docker Compose'],
    deployTimeMin: 3,
    description: 'Template resmi microservice REST/gRPC berkinerja tinggi dengan otentikasi JWT & tracing otomatis.'
  },
  {
    id: 'gp-02',
    title: 'Go High-Performance API Service',
    category: 'Microservice',
    techStack: 'Go 1.22, Gin, gRPC, Redis, OPA Client, Zap Logger',
    language: 'Go',
    iacSupport: ['Terraform', 'Helm', 'K8s Manifest'],
    deployTimeMin: 2,
    description: 'Layanan ultra low-latency (<5ms) untuk transaksi pembayaran, CBT, & API Gateway.'
  },
  {
    id: 'gp-03',
    title: 'Python AI & RAG Inference Worker',
    category: 'AI Service',
    techStack: 'Python 3.11, FastAPI, PyTorch, Gemini 2.5 SDK, Qdrant Vector Client',
    language: 'Python',
    iacSupport: ['Terraform', 'Helm', 'K8s Manifest'],
    deployTimeMin: 4,
    description: 'Template worker AI untuk inferensi LLM, ekstraksi OCR, & pencarian vektor semantik.'
  },
  {
    id: 'gp-04',
    title: 'Event-Driven Async Worker',
    category: 'Event Consumer',
    techStack: 'Go / Node.js, Kafka / RabbitMQ Consumer, Dead Letter Handling',
    language: 'Go or TS',
    iacSupport: ['Helm', 'K8s Manifest'],
    deployTimeMin: 2,
    description: 'Worker latar belakang untuk pemrosesan pesan asinkron, notifikasi, & pembuatan dokumen PDF.'
  }
];

export const mockSreSlos: SreServiceSlo[] = [
  {
    id: 'slo-01',
    serviceName: 'Identity & Auth Service',
    sliName: 'Availability (HTTP 2xx/3xx)',
    targetSloPct: 99.99,
    currentSliPct: 99.995,
    errorBudgetRemainingPct: 82.4,
    status: 'normal',
    incidentCount30d: 0
  },
  {
    id: 'slo-02',
    serviceName: 'CBT Examination Engine',
    sliName: 'Latency < 50ms at p99',
    targetSloPct: 99.90,
    currentSliPct: 99.94,
    errorBudgetRemainingPct: 74.0,
    status: 'normal',
    incidentCount30d: 1
  },
  {
    id: 'slo-03',
    serviceName: 'AI Gemini Inference Service',
    sliName: 'Latency < 300ms at p95',
    targetSloPct: 99.50,
    currentSliPct: 99.68,
    errorBudgetRemainingPct: 65.2,
    status: 'normal',
    incidentCount30d: 2
  },
  {
    id: 'slo-04',
    serviceName: 'Payment Gateway Proxy',
    sliName: 'Transaction Success Rate',
    targetSloPct: 99.95,
    currentSliPct: 99.98,
    errorBudgetRemainingPct: 91.0,
    status: 'normal',
    incidentCount30d: 0
  }
];

export const mockCostBreakdown: PlatformCostBreakdown[] = [
  { category: 'Kubernetes Compute (GKE Nodes)', costUSD: 1420.50, changeMonthPct: -4.2, allocationPct: 42, iconName: 'Cpu' },
  { category: 'Gemini 2.5 AI Tokens & LLM API', costUSD: 685.20, changeMonthPct: -12.5, allocationPct: 20, iconName: 'Sparkles' },
  { category: 'Managed Databases (Cloud SQL / Postgres)', costUSD: 540.00, changeMonthPct: 0.0, allocationPct: 16, iconName: 'Database' },
  { category: 'Storage & Document Cloud Bucket', costUSD: 290.80, changeMonthPct: 2.1, allocationPct: 9, iconName: 'HardDrive' },
  { category: 'Global CDN & Bandwidth Out', costUSD: 245.10, changeMonthPct: -1.5, allocationPct: 7, iconName: 'Globe' },
  { category: 'Message Brokers & Event Bus', costUSD: 180.00, changeMonthPct: 0.5, allocationPct: 6, iconName: 'Activity' }
];

export const mockTenantCostAllocations: TenantCostAllocation[] = [
  { tenantId: 't-001', schoolName: 'SMA Negeri 1 Jakarta (Model)', planTier: 'Enterprise Multi-School', activeUsers: 2450, computeCostUSD: 145.20, storageCostUSD: 32.10, aiCostUSD: 84.50, totalCostUSD: 261.80 },
  { tenantId: 't-002', schoolName: 'SMK Telkom Digital Bandung', planTier: 'Enterprise Standard', activeUsers: 1890, computeCostUSD: 112.00, storageCostUSD: 24.50, aiCostUSD: 62.10, totalCostUSD: 198.60 },
  { tenantId: 't-003', schoolName: 'Pesantren Al-Azhar Modern', planTier: 'Enterprise Multi-School', activeUsers: 3100, computeCostUSD: 185.00, storageCostUSD: 41.20, aiCostUSD: 105.40, totalCostUSD: 331.60 },
  { tenantId: 't-004', schoolName: 'SD Al-Ikhlas Jakarta', planTier: 'Standard School', activeUsers: 620, computeCostUSD: 38.50, storageCostUSD: 9.80, aiCostUSD: 18.20, totalCostUSD: 66.50 }
];

export const platformDocsHandbooks = {
  microservicesGuide: `# Enterprise Microservices Architecture Guide

## 1. Executive Summary
Smart AI School Management System dibangun di atas arsitektur **Domain-Driven Microservices (DDD)** yang mendisagregasikan monolit menjadi 28 layanan mandiri, bebas kopel (loosely coupled), dan beroperasi secara independen.

## 2. Core Architectural Principles
- **Database per Service**: Setiap microservice mengelola skema databasenya sendiri. Komunikasi lintas domain DILAKUKAN HANYA melalui API Gateway (gRPC/REST) atau Asynchronous Event Bus.
- **Event-Driven Integration**: Perubahan state (misal: *StudentRegistered*, *PaymentSucceeded*) dipublikasikan sebagai domain events ke Apache Kafka & Redis Streams.
- **API First & Schema Registry**: Kontrak API didefinisikan menggunakan Protocol Buffers (gRPC) & OpenAPI 3.0 dengan validasi skema otomatis pada CI/CD.

## 3. Microservice Registry
1. **Identity & Auth**: Single Sign-On (SSO), JWT/SAML2, Passkeys & Multi-Factor Auth.
2. **Academic & LMS**: Pengelolaan Kurikulum Merdeka, RPP AI, & Kelas Digital.
3. **CBT Engine**: Engine Ujian Komputer dengan skala autoscaling hingga 80 pod pada beban puncak.
4. **AI & Vector Search**: Gemini 2.5 Flash / Pro dengan RAG semantik terintegrasi.
`,

  platformEngineeringGuide: `# Platform Engineering & Developer Portal Handbook

## 1. Golden Path Philosophy
Internal Developer Platform (IDP) Smart AI School OS menyediakan **Golden Paths**—jalur mandiri (self-service) terstandarisasi untuk tim pengembang guna meluncurkan microservice baru hanya dalam hitungan menit tanpa friksi operasional.

## 2. Platform Features
- **Self-Service Project Scaffolding**: Membuat repositori baru lengkap dengan linting, Dockerfile, Helm Chart, dan pipeline CI/CD GitHub Actions / GitLab CI.
- **Automated Infrastructure Provisioning**: Integrasi Terraform Cloud untuk secara otomatis memvalidasi dan memprovisi Cloud SQL, Redis Instance, & Kafka Topic.
- **Progressive Delivery & Canary Deployment**: Pengujian rilis menggunakan ArgoCD & Flagger dengan analisis metrik otomatis berbasis SLO.
`,

  kubernetesGuide: `# Kubernetes & Multi-Cluster Operations Guide

## 1. Fleet Architecture
Platform dikelola di seluruh Google Kubernetes Engine (GKE) dengan toplogi Multi-Cluster:
- **asia-east1-production-cluster**: 32 node regional autoscaling (Jakarta/Singapore).
- **us-central1-disaster-recovery**: Cluster cadangan aktif (Active-Passive failover) dengan sinkronisasi data real-time.
- **asia-southeast2-staging**: Cluster pengujian terisolasi.

## 2. Pod Autoscaling & Reliability
- **Horizontal Pod Autoscaler (HPA)**: Kriteria pemicu berbasis CPU (>70%), Memori (>80%), dan Custom Metrics (QPS/Queue Depth).
- **Pod Disruption Budget (PDB)**: Menjamin ketersediaan minimal 80% replica aktif selama maintenance node Kubernetes.
`,

  sreHandbook: `# Site Reliability Engineering (SRE) Handbook

## 1. Service Level Objectives (SLO) Framework
- **Core Identity & Auth**: 99.99% Availability | Target Error Budget: 0.01%
- **CBT Examination Engine**: 99.90% Latency < 50ms (p99)
- **AI Gemini Inference**: 99.50% Latency < 300ms (p95)

## 2. Incident & Auto-Healing Procedures
- **Auto-Healing Worker**: Apabila sirkuit breaker terbuka >3x dalam 5 menit, pod secara otomatis direstart dan lalu lintas diahlikan ke region failover.
- **Runbook Automation**: Prosedur penanganan insiden dieksekusi secara otomatis oleh Bot SRE terintegrasi ke Alertmanager & Slack.
`
};
