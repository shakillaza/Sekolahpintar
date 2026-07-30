export interface ExecutiveScorecard {
  id: string;
  category: 'Organization' | 'School' | 'Academic' | 'Finance' | 'Operational' | 'AI' | 'Security' | 'Growth';
  title: string;
  score: number; // 0-100
  trend: 'up' | 'down' | 'stable';
  changePct: number;
  benchmarkTarget: number;
  status: 'EXCELLENT' | 'GOOD' | 'NEEDS_ATTENTION' | 'CRITICAL';
  keyInsights: string[];
}

export interface EnterpriseRiskItem {
  id: string;
  code: string;
  title: string;
  category: 'Academic' | 'Financial' | 'Operational' | 'Security' | 'Compliance' | 'Infrastructure' | 'Vendor' | 'AI' | 'Cyber';
  impact: 1 | 2 | 3 | 4 | 5; // 1 (Low) to 5 (Critical)
  likelihood: 1 | 2 | 3 | 4 | 5; // 1 (Unlikely) to 5 (Almost Certain)
  riskScore: number; // impact * likelihood (1-25)
  inherentLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  mitigationPlan: string;
  owner: string;
  status: 'IDENTIFIED' | 'MITIGATING' | 'MONITORED' | 'RESOLVED';
  lastReviewed: string;
}

export interface BusinessRuleItem {
  id: string;
  code: string;
  name: string;
  category: 'Academic' | 'Finance' | 'Governance' | 'Automation' | 'Security';
  version: string;
  conditionVisual: string;
  actionVisual: string;
  isActive: boolean;
  isSimulated: boolean;
  lastSimulatedImpact: string;
  updatedAt: string;
}

export interface ProcessMiningMetric {
  id: string;
  processName: string;
  category: 'Academic' | 'Finance' | 'HR' | 'Admission' | 'Library' | 'Inventory';
  avgCycleTimeHours: number;
  throughputPerDay: number;
  conformanceScorePct: number;
  bottleneckNode: string;
  optimizationRecommendation: string;
  potentialTimeSavedHours: number;
}

export interface InnovationProjectItem {
  id: string;
  code: string;
  title: string;
  proposer: string;
  category: 'AI Feature' | 'Smart Campus' | 'Pedagogy' | 'Process' | 'Sustainability';
  stage: 'Idea' | 'Proposal' | 'Experiment' | 'Prototype' | 'Roadmap';
  votesCount: number;
  hasVoted?: boolean;
  expectedImpact: string;
  targetQuarter: string;
}

export interface ResearchPublicationItem {
  id: string;
  title: string;
  authors: string[];
  field: 'Artificial Intelligence in Education' | 'EdTech Systems' | 'School Governance' | 'Data Analytics';
  publicationYear: number;
  citationsCount: number;
  journalName: string;
  doi: string;
  abstractSummary: string;
  isOpenAccess: boolean;
}

export interface KnowledgeGraphNode {
  id: string;
  label: string;
  type: 'Concept' | 'Curriculum' | 'Role' | 'Resource' | 'Expert';
  description: string;
  connectedCount: number;
  relations: { targetId: string; relationType: string }[];
}

export interface FinOpsCostMetric {
  category: 'Cloud Infrastructure' | 'AI Model API' | 'Storage & Backup' | 'Bandwidth & CDN' | 'Database Engine';
  monthlyCostUSD: number;
  budgetCapUSD: number;
  utilizationPct: number;
  optimizationRecommendation: string;
  costTrend: 'increasing' | 'stable' | 'decreasing';
}

// Mock Executive Scorecards
export const mockExecutiveScorecards: ExecutiveScorecard[] = [
  {
    id: 'sc-01',
    category: 'Organization',
    title: 'Indeks Kesehatan Organisasi EduOS',
    score: 96.4,
    trend: 'up',
    changePct: 3.2,
    benchmarkTarget: 90.0,
    status: 'EXCELLENT',
    keyInsights: ['Kepatuhan tata kelola 100% pada 12 unit sekolah', 'Efisiensi alur kerja antardepartemen naik 28%'],
  },
  {
    id: 'sc-02',
    category: 'Academic',
    title: 'Skor Mutu Pembelajaran & Kurikulum',
    score: 94.8,
    trend: 'up',
    changePct: 2.1,
    benchmarkTarget: 90.0,
    status: 'EXCELLENT',
    keyInsights: ['Pencapaian Capaian Pembelajaran (CP) Kurikulum Merdeka 95.2%', 'Rata-rata kepuasan siswa terhadap AI Tutor 4.88/5.00'],
  },
  {
    id: 'sc-03',
    category: 'Finance',
    title: 'Kolektibilitas Finansial & Cash Flow Rate',
    score: 97.2,
    trend: 'up',
    changePct: 1.8,
    benchmarkTarget: 95.0,
    status: 'EXCELLENT',
    keyInsights: ['Kolektibilitas SPP terintegrasi VA otomatis mencapai 97.2%', 'Nol piutang tak tertagih berkat peringatan dini AI'],
  },
  {
    id: 'sc-04',
    category: 'Operational',
    title: 'Efisiensi Operasional & Otomasi',
    score: 98.5,
    trend: 'up',
    changePct: 4.5,
    benchmarkTarget: 92.0,
    status: 'EXCELLENT',
    keyInsights: ['142 proses bisnis telah diotomasi via Hyper-Automation Engine', 'Waktu penyelesaian administrasi terpotong 65%'],
  },
  {
    id: 'sc-05',
    category: 'AI',
    title: 'Indeks Efektivitas & Keamanan AI',
    score: 99.1,
    trend: 'stable',
    changePct: 0.5,
    benchmarkTarget: 95.0,
    status: 'EXCELLENT',
    keyInsights: ['Zero prompt injection exploit', 'Penghematan token 22.4% melalui Semantic Caching'],
  },
  {
    id: 'sc-06',
    category: 'Security',
    title: 'Zero Trust & Compliance Posture',
    score: 99.6,
    trend: 'stable',
    changePct: 0.2,
    benchmarkTarget: 98.0,
    status: 'EXCELLENT',
    keyInsights: ['Sertifikasi ISO 27001 & kepatuhan UU PDP terverifikasi', 'Audit trail immutable 100% tanpa celah'],
  },
  {
    id: 'sc-07',
    category: 'Growth',
    title: 'Proyeksi Pertumbuhan Tenant & Retensi',
    score: 93.5,
    trend: 'up',
    changePct: 5.8,
    benchmarkTarget: 88.0,
    status: 'EXCELLENT',
    keyInsights: ['Tingkat retensi sekolah 99.2%', 'Pertumbuhan pendaftar siswa baru (PPDB) naik 20.3% YoY'],
  },
];

// Mock Enterprise Risk Management Register
export const mockEnterpriseRisks: EnterpriseRiskItem[] = [
  {
    id: 'risk-01',
    code: 'RSK-CYBER-001',
    title: 'Potensi Serangan Distributed Denial of Service (DDoS) Saat Peak Hours PPDB',
    category: 'Cyber',
    impact: 4,
    likelihood: 2,
    riskScore: 8,
    inherentLevel: 'MEDIUM',
    mitigationPlan: 'Penerapan Cloudflare Enterprise DDoS Protection & Auto-scaling Cloud Run pod hingga 20 node.',
    owner: 'Platform Engineering Team',
    status: 'MITIGATING',
    lastReviewed: '2026-07-29',
  },
  {
    id: 'risk-02',
    code: 'RSK-AI-002',
    title: 'Halusinasi AI Dalam Memberikan Saran Penilaian Esai Siswa',
    category: 'AI',
    impact: 3,
    likelihood: 2,
    riskScore: 6,
    inherentLevel: 'MEDIUM',
    mitigationPlan: 'Integrasi Human-in-the-Loop approval mandatory untuk nilai esai berbobot > 20% total nilai.',
    owner: 'AI Governance Board',
    status: 'MONITORED',
    lastReviewed: '2026-07-30',
  },
  {
    id: 'risk-03',
    code: 'RSK-FIN-003',
    title: 'Keterlambatan Pembayaran SPP Akibat Fluktuasi Ekonomi Orang Tua',
    category: 'Financial',
    impact: 4,
    likelihood: 3,
    riskScore: 12,
    inherentLevel: 'HIGH',
    mitigationPlan: 'Otomasi skema cicilan terstruktur fleksibel berbasis sistem prediksi early-warning.',
    owner: 'Finance Director',
    status: 'MITIGATING',
    lastReviewed: '2026-07-28',
  },
  {
    id: 'risk-04',
    code: 'RSK-COMP-004',
    title: 'Perubahan Regulasi Format Sinkronisasi Dapodik Kemdikbudristek',
    category: 'Compliance',
    impact: 5,
    likelihood: 2,
    riskScore: 10,
    inherentLevel: 'HIGH',
    mitigationPlan: 'Modul Adapter API Dapodik terisolasi dengan auto-schema migration & backward compatibility validator.',
    owner: 'Compliance Manager',
    status: 'RESOLVED',
    lastReviewed: '2026-07-25',
  },
  {
    id: 'risk-05',
    code: 'RSK-INFRA-005',
    title: 'Downtime Layanan Cloud Storage Saat Pengunggahan Berkas Ujian',
    category: 'Infrastructure',
    impact: 4,
    likelihood: 1,
    riskScore: 4,
    inherentLevel: 'LOW',
    mitigationPlan: 'Multi-region bucket redundancy dengan automatic failover ke secondary storage cluster.',
    owner: 'DevOps Lead',
    status: 'MONITORED',
    lastReviewed: '2026-07-30',
  },
];

// Mock Low-Code Business Rules
export const mockBusinessRules: BusinessRuleItem[] = [
  {
    id: 'rule-01',
    code: 'RULE-FIN-101',
    name: 'Diskon Keringanan SPP Otomatis Anak Guru & Staf',
    category: 'Finance',
    version: 'v2.1',
    conditionVisual: 'IF Student.ParentRole IN ["Guru", "Staf"] AND Student.GPA >= 80.0',
    actionVisual: 'APPLY_DISCOUNT(SPP_Fee, 50%) AND NOTIFY_FINANCE()',
    isActive: true,
    isSimulated: true,
    lastSimulatedImpact: 'Penghematan bagi 38 keluarga staf, dampak kas Rp 19.000.000/bulan (Sesuai Budget)',
    updatedAt: '2026-07-20',
  },
  {
    id: 'rule-02',
    code: 'RULE-ACAD-202',
    name: 'Auto-Remedial Trigger Untuk Siswa Nilai Kuis < 70',
    category: 'Academic',
    version: 'v3.0',
    conditionVisual: 'IF ExamScore < 70 AND AttemptCount <= 2',
    actionVisual: 'ASSIGN_AI_TUTOR_MODULE() AND SCHEDULE_REMEDIAL_QUIZ(Day + 3)',
    isActive: true,
    isSimulated: true,
    lastSimulatedImpact: 'Meningkatkan rata-rata pemahaman siswa sebesar 18.2% pada percobaan berikutnya',
    updatedAt: '2026-07-28',
  },
  {
    id: 'rule-03',
    code: 'RULE-GOV-303',
    name: 'Verifikasi Ganda Pengeluaran Kas > Rp 10.000.000',
    category: 'Governance',
    version: 'v1.0',
    conditionVisual: 'IF Transaction.Amount >= 10000000',
    actionVisual: 'REQUIRE_APPROVAL([Role.Bendahara, Role.KepalaSekolah])',
    isActive: true,
    isSimulated: true,
    lastSimulatedImpact: 'Zero unauthorized disbursement dalam 12 bulan terakhir',
    updatedAt: '2026-07-15',
  },
];

// Mock Process Mining Analytics
export const mockProcessMiningMetrics: ProcessMiningMetric[] = [
  {
    id: 'pm-01',
    processName: 'Alur Verifikasi Pendaftaran & Berkas PPDB',
    category: 'Admission',
    avgCycleTimeHours: 4.2,
    throughputPerDay: 180,
    conformanceScorePct: 98.4,
    bottleneckNode: 'Verifikasi Manual Sertifikat Prestasi Olahraga/Seni',
    optimizationRecommendation: 'Gunakan AI OCR Classifier untuk melakukan pra-validasi sertifikat berstempel resmi.',
    potentialTimeSavedHours: 2.8,
  },
  {
    id: 'pm-02',
    processName: 'Penyusunan RPP & Modul Ajar Guru',
    category: 'Academic',
    avgCycleTimeHours: 6.5,
    throughputPerDay: 45,
    conformanceScorePct: 96.8,
    bottleneckNode: 'Pencocokan Indikator Capaian Pembelajaran (CP) & Tujuan Pembelajaran (TP)',
    optimizationRecommendation: 'Otomatiskan pemetaan CP/TP menggunakan RPP Co-Pilot AI Generator.',
    potentialTimeSavedHours: 4.5,
  },
  {
    id: 'pm-03',
    processName: 'Pengadaan Sarana & Prasarana Laboratorium',
    category: 'Inventory',
    avgCycleTimeHours: 28.0,
    throughputPerDay: 12,
    conformanceScorePct: 94.2,
    bottleneckNode: 'Persetujuan Tanda Tangan Komite Sekolah',
    optimizationRecommendation: 'Terapkan E-Signature & Approval Engine bertingkat berbasis seluler.',
    potentialTimeSavedHours: 18.0,
  },
];

// Mock Innovation Hub Projects
export const mockInnovationProjects: InnovationProjectItem[] = [
  {
    id: 'innov-01',
    code: 'INN-2026-01',
    title: 'Virtual Reality (VR) Immersive Science Lab untuk Praktikum Kimia Organik',
    proposer: 'Dr. Hendra Wijaya (Guru Kimia)',
    category: 'Smart Campus',
    stage: 'Prototype',
    votesCount: 142,
    hasVoted: true,
    expectedImpact: 'Meningkatkan keamanan praktikum bahan berbahaya & menghemat biaya reagen 40%.',
    targetQuarter: 'Q4 2026',
  },
  {
    id: 'innov-02',
    code: 'INN-2026-02',
    title: 'Smart Canteen Cashless System dengan Facial Recognition & Nutri-Tracking',
    proposer: 'Tim OSIS & Platform Innovation',
    category: 'Process',
    stage: 'Experiment',
    votesCount: 98,
    hasVoted: false,
    expectedImpact: 'Memangkas antrean kantin dari 15 menit menjadi 2 menit & memberikan laporan gizi ke orang tua.',
    targetQuarter: 'Q1 2027',
  },
  {
    id: 'innov-03',
    code: 'INN-2026-03',
    title: 'AI Peer-Tutoring Matchmaker Berbasis Skill Matrix & MBTI Cohort',
    proposer: 'Siti Rahma, S.Psi (Guru BK)',
    category: 'AI Feature',
    stage: 'Proposal',
    votesCount: 76,
    hasVoted: false,
    expectedImpact: 'Memasangkan siswa unggul dengan siswa yang butuh bantuan tutor sebaya secara optimal.',
    targetQuarter: 'Q1 2027',
  },
];

// Mock Research Platform Repository
export const mockResearchPublications: ResearchPublicationItem[] = [
  {
    id: 'pub-01',
    title: 'Implementation of Multi-Agent AI Orchestration in K-12 School Administration: A Case Study in Indonesia',
    authors: ['Prof. Dr. Ir. Budi Santoso', 'Ahmad Farhan, M.Kom', 'Siti Aminah, M.Pd'],
    field: 'Artificial Intelligence in Education',
    publicationYear: 2026,
    citationsCount: 18,
    journalName: 'International Journal of Educational Technology & AI (IJETAI)',
    doi: '10.1016/j.ijetai.2026.04.012',
    abstractSummary: 'Penelitian ini mengevaluasi dampak efisiensi penggunaan 18 AI Agent otonom terhadap penurunan beban administratif guru dan peningkatan ketepatan waktu keputusan operasional sekolah.',
    isOpenAccess: true,
  },
  {
    id: 'pub-02',
    title: 'Predictive Student Drop-Out Early Warning System Using Machine Learning and Financial Behavioral Indicators',
    authors: ['Dra. Rina Karlina, M.Sc', 'Eko Prasetyo, S.T.'],
    field: 'Data Analytics',
    publicationYear: 2025,
    citationsCount: 32,
    journalName: 'Journal of Big Data in Education',
    doi: '10.1007/s40593-025-00382-x',
    abstractSummary: 'Model prediktif regresi logistik terbukti efektif mendeteksi 94.2% potensi kendala keberlanjutan studi siswa 3 bulan sebelum terjadinya penunggakan SPP.',
    isOpenAccess: true,
  },
];

// Mock Knowledge Graph Nodes
export const mockKnowledgeGraphNodes: KnowledgeGraphNode[] = [
  {
    id: 'node-01',
    label: 'Kurikulum Merdeka (Fase F)',
    type: 'Curriculum',
    description: 'Kerangka kurikulum nasional untuk kelas 11 dan 12 SMA/SMK.',
    connectedCount: 14,
    relations: [
      { targetId: 'node-02', relationType: 'INCLUDES_SUBJECT' },
      { targetId: 'node-03', relationType: 'MANAGED_BY' },
    ],
  },
  {
    id: 'node-02',
    label: 'Informatika & Kecerdasan Buatan',
    type: 'Concept',
    description: 'Mata pelajaran pilihan peminatan sains data, algoritma, & AI ethics.',
    connectedCount: 8,
    relations: [
      { targetId: 'node-04', relationType: 'TAUGHT_BY' },
    ],
  },
  {
    id: 'node-03',
    label: 'Kepala Bidang Kurikulum',
    type: 'Role',
    description: 'Penanggung jawab penyusunan Capaian Pembelajaran & Modul Ajar.',
    connectedCount: 12,
    relations: [],
  },
  {
    id: 'node-04',
    label: 'Drs. Supriyadi, M.T. (Pakar AI)',
    type: 'Expert',
    description: 'Guru Utama Informatika & Lead Specialist Smart Campus.',
    connectedCount: 6,
    relations: [],
  },
];

// Mock FinOps Cost Metrics
export const mockFinOpsCosts: FinOpsCostMetric[] = [
  {
    category: 'Cloud Infrastructure',
    monthlyCostUSD: 420.0,
    budgetCapUSD: 600.0,
    utilizationPct: 70.0,
    optimizationRecommendation: 'Manfaatkan Committed Use Discounts (CUD) 1-tahun untuk menghemat 28% biaya compute.',
    costTrend: 'stable',
  },
  {
    category: 'AI Model API',
    monthlyCostUSD: 285.5,
    budgetCapUSD: 450.0,
    utilizationPct: 63.4,
    optimizationRecommendation: 'Aktifkan Semantic Caching di Redis untuk mengurangi panggilan API berulang sebesar 35%.',
    costTrend: 'decreasing',
  },
  {
    category: 'Storage & Backup',
    monthlyCostUSD: 110.0,
    budgetCapUSD: 200.0,
    utilizationPct: 55.0,
    optimizationRecommendation: 'Terapkan Lifecycle Policy untuk otomatis memindahkan arsip ujian > 1 tahun ke Coldline Storage.',
    costTrend: 'stable',
  },
  {
    category: 'Bandwidth & CDN',
    monthlyCostUSD: 95.0,
    budgetCapUSD: 150.0,
    utilizationPct: 63.3,
    optimizationRecommendation: 'Gunakan kompresi WebP & AVIF otomatis pada media galeri sekolah.',
    costTrend: 'stable',
  },
  {
    category: 'Database Engine',
    monthlyCostUSD: 310.0,
    budgetCapUSD: 400.0,
    utilizationPct: 77.5,
    optimizationRecommendation: 'Lakukan auto-vacuum rutin dan optimasi indeks SQL query yang sering diakses.',
    costTrend: 'stable',
  },
];

// Documentation Handbooks & Guides
export const eduOsDocsHandbooks = {
  eduOsGuide: `====================================================================
SMART AI SCHOOL OS v4.0 — EDUCATION OPERATING SYSTEM (EduOS) GUIDE
====================================================================

1. VISION & ARCHITECTURE
   Smart AI School OS v4.0 berevolusi dari sekadar aplikasi manajemen sekolah menjadi 
   Education Operating System (EduOS) terpadu. EduOS berfungsi sebagai fondasi digital 
   mendasar yang menghubungkan seluruh ekosistem pendidikan:
   - Command Center Executive: Visibilitas 360-derajat seluruh indikator kesehatan sekolah.
   - Enterprise Hyper-Automation Engine: Ekosistem otomasi lintas departemen.
   - Digital Governance & Compliance: Pengawasan kebijakan, risiko, audit trail, & keamanan.
   - Innovation & Research Platform: Wadah kolaborasi ide, penelitian akademis, & publikasi.

2. CORE CHARACTERISTICS:
   ✓ Modular & Configurable (Feature Flag Enabled)
   ✓ AI-Native & Event-Driven Architecture
   ✓ Multi-Tenant SaaS dengan Isolasit Data Ketat
   ✓ API-First Design untuk Akses Interoperabilitas Nasional

Tagline Resmi:
"One Platform. Smart School. AI Powered."`,

  governanceHandbook: `====================================================================
ENTERPRISE DIGITAL GOVERNANCE & AUDIT HANDBOOK
====================================================================

1. GOVERNANCE PRINCIPLES
   - Transparency: Setiap keputusan operasional dan keuangan tercatat secara immutable.
   - Accountability: Pemetaan jelas peranan (Role-Based Access Control) & wewenang.
   - AI Governance: Penilaian kepatuhan etika AI, bebas bias, & Zero Prompt Vulnerability.

2. POLICY ENFORCEMENT & COMPLIANCE
   - Pemenuhan standar akreditasi sekolah BAN-S/M & verifikasi data otomatis Dapodik.
   - Audit Trail Real-time: Merekam ip_address, user_id, action, timestamp, & delta perubahan.`,

  riskGuide: `====================================================================
ENTERPRISE RISK MANAGEMENT (ERM) FRAMEWORK
====================================================================

1. RISK TAXONOMY (9 KATEGORI UTAMA)
   - Academic Risk: Penurunan kualitas capaian lulusan & tingkat kelulusan.
   - Financial Risk: Keterlambatan SPP & defiisit anggaran operasional.
   - Operational Risk: Disrupsi proses pembelajaran & sarana prasarana.
   - Security Risk: Celah keamanan fisik & akses gedung sekolah.
   - Compliance Risk: Sanksi administratif akibat ketidaksesuaian laporan Kemdikbud.
   - Infrastructure Risk: Celah kegagalan jaringan, server, & IoT.
   - Vendor Risk: Ketergantungan pada pihak ketiga penyedia layanan.
   - AI Risk: Resiko halusinasi model & bias keputusan otomatis.
   - Cyber Risk: Ancamam kebocoran data pribadi (UU PDP) & serangan siber.

2. RISK MATRIX & HEATMAP
   Risk Score = Impact (1-5) x Likelihood (1-5)
   - Score 1-4  : LOW (Monitored)
   - Score 5-9  : MEDIUM (Action Plan Required)
   - Score 10-15: HIGH (Immediate Mitigation)
   - Score 16-25: CRITICAL (Board Oversight Mandatory)`,

  innovationGuide: `====================================================================
INNOVATION HUB & IDEA EXPERIMENTATION GUIDE
====================================================================

1. STAGE LIFECYCLE
   Idea -> Feature Proposal -> Experiment -> Prototype -> Official Roadmap

2. COMMUNITY VOTING & PRIORITY
   Siswa, guru, dan staf dapat mengajukan ide inovasi dan melakukan voting. 
   Proposal dengan skor voting tertinggi secara otomatis masuk dalam agenda eksperimen 
   tim Platform Engineering.`,

  researchGuide: `====================================================================
EDUCATION RESEARCH PLATFORM HANDBOOK
====================================================================

1. RESEARCH REPOSITORY
   Tempat penyimpanan terpusat untuk jurnal, karya ilmiah guru, dan artikel riset pendidikan.
   Dilengkapi dengan pelacak sitasi (Citation Tracker) & DOI resolver ready.

2. COLLABORATION & OPEN ACCESS
   Mendukung riset antar-sekolah dan publikasi ilmiah berlisensi terbuka (Open Access) 
   guna mendorong kemajuan riset sains pendidikan nasional.`,

  knowledgeGraphGuide: `====================================================================
KNOWLEDGE GRAPH & SEMANTIC ONTOLOGY GUIDE
====================================================================

1. KNOWLEDGE ONTOLOGY
   Memetakan hubungan semantik antara:
   - Concept (Topik Pembelajaran)
   - Curriculum (Capaian & Tujuan)
   - Role & Expert (Direktori Pakar Guru)
   - Resource (Buku, Lab, & Media Pembelajaran)

2. SEMANTIC RECOMMENDATION
   Memungkinkan pencarian kontekstual cerdas dan rekomendasi pembelajaran terpersonalisasi.`,

  finOpsGuide: `====================================================================
PLATFORM FINOPS & COST OPTIMIZATION HANDBOOK
====================================================================

1. FINOPS DASHBOARD & METRICS
   Pemantauan biaya cloud secara transparan per kategori:
   - Compute & Kubernetes Nodes
   - AI API Token Usage (Gemini / LLM)
   - Storage, CDN Bandwidth, & Database Cluster

2. COST OPTIMIZATION RECOMMENDATION
   Sistem memberikan rekomendasi otomatis untuk menghemat biaya hingga 30% 
   melalui caching, storage lifecycle, & committed use discounts.`,

  executiveGuide: `====================================================================
EXECUTIVE INTELLIGENCE & SCORECARD GUIDE
====================================================================

1. SCORECARD METRICS
   Integrasi indikator utama kepemimpinan:
   - Organization, Academic, Finance, Operational, AI, Security, & Growth.

2. SCENARIO PLANNING & PRESCRIPTIVE ADVICE
   Membantu Kepala Sekolah & Yayasan mengambil keputusan strategis berdasar data analitik preskriptif.`
};
