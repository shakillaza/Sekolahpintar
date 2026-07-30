export interface AiAgentItem {
  id: string;
  code: string;
  name: string;
  role: string;
  domain: string;
  status: 'idle' | 'executing' | 'collaborating' | 'waiting_approval';
  memoryUsageMb: number;
  taskQueueCount: number;
  accuracyPct: number;
  lastAction: string;
  capabilities: string[];
  permissions: string[];
  goal: string;
  knowledgeBaseCount: number;
  tokensConsumedToday: number;
}

export interface OrchestrationTask {
  id: string;
  code: string;
  title: string;
  initiator: string;
  assignedAgent: string;
  delegationAgents: string[];
  priority: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  status: 'queued' | 'running' | 'pending_approval' | 'completed' | 'failed';
  confidenceScore: number;
  humanApprovalRequired: boolean;
  createdAt: string;
  executionTimeMs: number;
  summary: string;
}

export interface DigitalTwinObject {
  id: string;
  category: 'Sekolah' | 'Gedung' | 'Kelas' | 'Guru' | 'Siswa' | 'Inventaris' | 'Keuangan' | 'Perpustakaan' | 'Akademik' | 'Operasional';
  name: string;
  code: string;
  realtimeHealthPct: number;
  anomalyScore: number;
  activeMetrics: Record<string, string | number>;
  status: 'optimal' | 'warning' | 'critical';
  lastSynced: string;
}

export interface SimulationScenario {
  id: string;
  type: 'PPDB' | 'Kelulusan' | 'Tunggakan' | 'CashFlow' | 'Guru' | 'Anggaran' | 'Jadwal' | 'Kapasitas';
  title: string;
  description: string;
  baselineValue: string;
  predictedValue: string;
  confidenceIntervalPct: number;
  growthPct: number;
  keyDrivers: string[];
  recommendation: string;
}

export interface PolicyRuleItem {
  id: string;
  code: string;
  name: string;
  category: 'Business' | 'AI' | 'Approval' | 'Automation' | 'Compliance' | 'Security';
  condition: string;
  action: string;
  isEnforced: boolean;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
}

export interface HumanApprovalItem {
  id: string;
  taskCode: string;
  agentName: string;
  actionRequested: string;
  reasoning: string;
  impactScore: 'HIGH' | 'CRITICAL' | 'MEDIUM';
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  requestedAt: string;
  tenantName: string;
}

export interface AiCostBreakdown {
  tenantName: string;
  schoolLevel: string;
  dailyTokens: number;
  dailyCostUSD: number;
  topAgent: string;
  optimizationPotentialPct: number;
}

// 18 Enterprise Multi-Agent Ecosystem
export const mockAiAgents: AiAgentItem[] = [
  {
    id: 'agent-01',
    code: 'AG-PRINCIPAL',
    name: 'Principal Agent',
    role: 'Executive School Operations & Strategic Policy',
    domain: 'Leadership & Executive',
    status: 'executing',
    memoryUsageMb: 248,
    taskQueueCount: 3,
    accuracyPct: 99.4,
    lastAction: 'Mengevaluasi laporan capaian KPI sekolah triwulan & alokasi dana BOS.',
    capabilities: ['KPI Evaluation', 'Resource Allocation', 'Strategic Decision Support', 'Policy Enforcement'],
    permissions: ['READ_ALL', 'WRITE_EXECUTIVE_POLICY', 'APPROVE_HIGH_BUDGET'],
    goal: 'Memastikan efisiensi operasional sekolah 99% & pencapaian indikator mutu pendidikan.',
    knowledgeBaseCount: 1420,
    tokensConsumedToday: 184500,
  },
  {
    id: 'agent-02',
    code: 'AG-ACADEMIC',
    name: 'Academic Agent',
    role: 'Curriculum & Academic Performance Coordinator',
    domain: 'Academic & Curriculum',
    status: 'collaborating',
    memoryUsageMb: 312,
    taskQueueCount: 5,
    accuracyPct: 98.9,
    lastAction: 'Menyinkronkan CP & TP Kurikulum Merdeka dengan AI RPP Generator.',
    capabilities: ['Curriculum Mapping', 'Grade Analysis', 'Lesson Plan Synthesis', 'Exams Scheduling'],
    permissions: ['READ_ACADEMIC', 'WRITE_CURRICULUM', 'MODIFY_SCHEDULES'],
    goal: 'Meningkatkan pemahaman siswa sebesar 15% melalui kurikulum terpersonalisasi.',
    knowledgeBaseCount: 2350,
    tokensConsumedToday: 245000,
  },
  {
    id: 'agent-03',
    code: 'AG-FINANCE',
    name: 'Finance Agent',
    role: 'Automated Billing, Cash Flow & Fraud Monitoring',
    domain: 'Financial Management',
    status: 'idle',
    memoryUsageMb: 196,
    taskQueueCount: 0,
    accuracyPct: 99.8,
    lastAction: 'Menerbitkan 1.250 Virtual Account tagihan SPP bulanan otomatis.',
    capabilities: ['Invoice Automation', 'Fraud Detection', 'Financial Forecasting', 'Payment Reconciliation'],
    permissions: ['READ_FINANCE', 'WRITE_BILLING', 'GENERATE_VA'],
    goal: 'Menjaga kolektibilitas SPP di atas 96% dan menekan risiko tunggakan.',
    knowledgeBaseCount: 980,
    tokensConsumedToday: 132000,
  },
  {
    id: 'agent-04',
    code: 'AG-HR',
    name: 'HR Agent',
    role: 'Teacher Attendance, Performance & Shift Scheduling',
    domain: 'Human Resources',
    status: 'executing',
    memoryUsageMb: 180,
    taskQueueCount: 2,
    accuracyPct: 98.6,
    lastAction: 'Menganalisis beban kerja 68 guru dan menyusun rekomendasi pelatihan AI.',
    capabilities: ['Teacher Appraisal', 'Payroll Calculation', 'Attendance Tracking', 'Shift Scheduling'],
    permissions: ['READ_HR', 'WRITE_PAYROLL_DRAFT', 'UPDATE_SCHEDULES'],
    goal: 'Optimasi distribusi jam mengajar guru dan evaluasi KPI berkala.',
    knowledgeBaseCount: 890,
    tokensConsumedToday: 95000,
  },
  {
    id: 'agent-05',
    code: 'AG-ADMISSION',
    name: 'Admission Agent',
    role: 'PPDB Funnel & Candidate Qualification Assistant',
    domain: 'Admissions & PPDB',
    status: 'executing',
    memoryUsageMb: 210,
    taskQueueCount: 8,
    accuracyPct: 97.9,
    lastAction: 'Memverifikasi berkas 142 pendaftar PPDB jalur prestasi & beasiswa.',
    capabilities: ['Document Verification', 'Candidate Scoring', 'Chatbot Assistance', 'Quota Management'],
    permissions: ['READ_PPDB', 'VERIFY_DOCUMENTS', 'SEND_NOTIFICATIONS'],
    goal: 'Memaksimalkan kuota PPDB 100% terisi dalam gelombang pertama.',
    knowledgeBaseCount: 1150,
    tokensConsumedToday: 310000,
  },
  {
    id: 'agent-06',
    code: 'AG-LIBRARY',
    name: 'Library Agent',
    role: 'Digital Library & Reading Recommendation Engine',
    domain: 'Learning Resources',
    status: 'idle',
    memoryUsageMb: 145,
    taskQueueCount: 0,
    accuracyPct: 99.1,
    lastAction: 'Merekomendasikan e-book sains interaktif berdasarkan riwayat baca siswa.',
    capabilities: ['Catalog Management', 'Semantic Book Search', 'Reading Analytics', 'E-book Indexing'],
    permissions: ['READ_LIBRARY', 'WRITE_CATALOG'],
    goal: 'Meningkatkan minat baca digital siswa sebesar 25% YoY.',
    knowledgeBaseCount: 4200,
    tokensConsumedToday: 68000,
  },
  {
    id: 'agent-07',
    code: 'AG-INVENTORY',
    name: 'Inventory Agent',
    role: 'Smart Asset Tracking & Maintenance Scheduler',
    domain: 'Operations & Facilities',
    status: 'idle',
    memoryUsageMb: 160,
    taskQueueCount: 1,
    accuracyPct: 98.4,
    lastAction: 'Membuat tiket perawatan berkala untuk 42 unit AC laboratorium komputer.',
    capabilities: ['Asset Depreciations', 'Maintenance Ticketing', 'QR Audit Tracking', 'Procurement Alert'],
    permissions: ['READ_INVENTORY', 'CREATE_MAINTENANCE_TICKET'],
    goal: 'Zero downtime sarana prasarana penunjang kegiatan belajar mengajar.',
    knowledgeBaseCount: 650,
    tokensConsumedToday: 54000,
  },
  {
    id: 'agent-08',
    code: 'AG-CRM',
    name: 'CRM Agent',
    role: 'Parent Relationship & Automated Engagement',
    domain: 'Stakeholder Relations',
    status: 'collaborating',
    memoryUsageMb: 225,
    taskQueueCount: 4,
    accuracyPct: 98.1,
    lastAction: 'Mengirimkan rangkuman mingguan perkembangan anak via WhatsApp Gateway.',
    capabilities: ['Parent Communication', 'Survey Analytics', 'Feedback Loop', 'Issue Escalation'],
    permissions: ['SEND_COMMUNICATION', 'READ_PARENT_PROFILES'],
    goal: 'Mempertahankan Indeks Kepuasan Orang Tua (CSAT) di level 4.85/5.0.',
    knowledgeBaseCount: 1280,
    tokensConsumedToday: 215000,
  },
  {
    id: 'agent-09',
    code: 'AG-ANALYTICS',
    name: 'Analytics Agent',
    role: 'Predictive Big Data & Machine Learning Insights',
    domain: 'Intelligence & Insights',
    status: 'executing',
    memoryUsageMb: 420,
    taskQueueCount: 6,
    accuracyPct: 99.6,
    lastAction: 'Menjalankan model regresi prediksi potensi penurunan nilai siswa kelas 12.',
    capabilities: ['Predictive Analytics', 'Anomaly Detection', 'Cohort Tracking', 'Executive Dashboards'],
    permissions: ['READ_ALL_METRICS', 'GENERATE_REPORTS'],
    goal: 'Mendeteksi dini 100% siswa yang membutuhkan intervensi akademik khusus.',
    knowledgeBaseCount: 3100,
    tokensConsumedToday: 410000,
  },
  {
    id: 'agent-10',
    code: 'AG-COMPLIANCE',
    name: 'Compliance Agent',
    role: 'Dapodik Synchronization & Accreditation Readiness',
    domain: 'Governance & Regulation',
    status: 'idle',
    memoryUsageMb: 190,
    taskQueueCount: 0,
    accuracyPct: 99.7,
    lastAction: 'Memvalidasi kesesuaian data NISN & NUPTK untuk validasi Dapodik Kemdikbud.',
    capabilities: ['Dapodik Sync Audit', 'Accreditation Checklist', 'Regulatory Inspection', 'Data Integrity'],
    permissions: ['READ_COMPLIANCE', 'VALIDATE_NATIONAL_IDS'],
    goal: 'Menjamin 100% kepatuhan regulasi pendidikan nasional tanpa kendala audit.',
    knowledgeBaseCount: 1850,
    tokensConsumedToday: 82000,
  },
  {
    id: 'agent-11',
    code: 'AG-LEGAL',
    name: 'Legal Agent',
    role: 'Contract Review & Institutional Risk Management',
    domain: 'Governance & Regulation',
    status: 'idle',
    memoryUsageMb: 175,
    taskQueueCount: 0,
    accuracyPct: 99.2,
    lastAction: 'Memeriksa draf perjanjian kerja sama (MOU) magang siswa industri.',
    capabilities: ['MOU Auditing', 'Privacy Law Audit', 'Risk Assessment', 'Policy Governance'],
    permissions: ['READ_LEGAL_DOCS', 'FLAG_LEGAL_RISK'],
    goal: 'Mitigasi risiko hukum dan perlindungan privasi data pribadi (UU PDP).',
    knowledgeBaseCount: 940,
    tokensConsumedToday: 48000,
  },
  {
    id: 'agent-12',
    code: 'AG-SECURITY',
    name: 'Security Agent',
    role: 'Zero Trust AI Security & Threat Detection',
    domain: 'Security & Cyber Resilience',
    status: 'executing',
    memoryUsageMb: 290,
    taskQueueCount: 1,
    accuracyPct: 99.9,
    lastAction: 'Memindai integritas akses API & menyaring potensi Prompt Injection.',
    capabilities: ['Prompt Guard', 'PII Masking', 'Threat Intelligence', 'Zero Trust Audit'],
    permissions: ['BLOCK_MALICIOUS_REQUESTS', 'READ_SECURITY_LOGS'],
    goal: 'Sistem nol kebocoran data dan zero unauthorized prompt execution.',
    knowledgeBaseCount: 2100,
    tokensConsumedToday: 175000,
  },
  {
    id: 'agent-13',
    code: 'AG-DEVOPS',
    name: 'DevOps Agent',
    role: 'CI/CD Automation & Kubernetes Auto-Scaling',
    domain: 'Platform Operations',
    status: 'idle',
    memoryUsageMb: 210,
    taskQueueCount: 0,
    accuracyPct: 99.5,
    lastAction: 'Melakukan auto-scaling pod microservices dari 4 menjadi 8 pod saat ujian online.',
    capabilities: ['Kubernetes Autoscaling', 'Pipeline Monitoring', 'Canary Rollout', 'Health Self-Healing'],
    permissions: ['EXECUTE_DEPLOYMENT', 'SCALE_PODS'],
    goal: 'Ketersediaan infrastruktur platform 99.99% tanpa downtime.',
    knowledgeBaseCount: 1560,
    tokensConsumedToday: 110000,
  },
  {
    id: 'agent-14',
    code: 'AG-INFRA',
    name: 'Infrastructure Agent',
    role: 'Cloud Resource Allocation & Database Optimizer',
    domain: 'Platform Operations',
    status: 'idle',
    memoryUsageMb: 230,
    taskQueueCount: 0,
    accuracyPct: 99.3,
    lastAction: 'Mengoptimalkan indeks query SQL PostgreSQL dan pembersihan cache Redis.',
    capabilities: ['DB Query Tuning', 'Cache Optimization', 'Storage Reclamation', 'Network Routing'],
    permissions: ['OPTIMIZE_DB', 'FLUSH_CACHE'],
    goal: 'Latensi query database di bawah 10ms untuk seluruh tenant SaaS.',
    knowledgeBaseCount: 1340,
    tokensConsumedToday: 98000,
  },
  {
    id: 'agent-15',
    code: 'AG-EXEC-ADVISOR',
    name: 'Executive Advisor Agent',
    role: 'Foundation Board & Strategic Growth Advisory',
    domain: 'Leadership & Executive',
    status: 'waiting_approval',
    memoryUsageMb: 350,
    taskQueueCount: 2,
    accuracyPct: 99.1,
    lastAction: 'Menyusun rekomendasi pembukaan jurusan teknologi informasi baru untuk Yayasan.',
    capabilities: ['Executive Summary', 'Market Feasibility', 'ROI Projections', 'Cross-School Benchmarking'],
    permissions: ['READ_BOARD_REPORTS', 'GENERATE_EXECUTIVE_ADVISORY'],
    goal: 'Memberikan wawasan strategis untuk pertumbuhan jangka panjang sekolah.',
    knowledgeBaseCount: 2800,
    tokensConsumedToday: 280000,
  },
  {
    id: 'agent-16',
    code: 'AG-PARENT-ASSISTANT',
    name: 'Parent Assistant Agent',
    role: 'Real-Time Parent Helpdesk & Academic Guidance',
    domain: 'Parent Experience',
    status: 'idle',
    memoryUsageMb: 185,
    taskQueueCount: 0,
    accuracyPct: 98.3,
    lastAction: 'Menjawab pertanyaan wali siswa mengenai konfirmasi jadwal pembagian rapor.',
    capabilities: ['24/7 Q&A', 'Attendance Inquiry', 'Fee Status Query', 'School Calendar Info'],
    permissions: ['READ_LIMITED_STUDENT_INFO', 'SEND_CHAT_RESPONSE'],
    goal: 'Respons instan <3 detik untuk seluruh pertanyaan orang tua murid.',
    knowledgeBaseCount: 1650,
    tokensConsumedToday: 195000,
  },
  {
    id: 'agent-17',
    code: 'AG-STUDENT-TUTOR',
    name: 'Student Tutor Agent',
    role: 'Socratic AI Learning Companion & Homework Helper',
    domain: 'Student Experience',
    status: 'executing',
    memoryUsageMb: 380,
    taskQueueCount: 12,
    accuracyPct: 98.8,
    lastAction: 'Membimbing siswa kelas 10 menyelesaikan soal Fisika Kinematika secara sokratik.',
    capabilities: ['Socratic Tutoring', 'Step-by-Step Guidance', 'Quiz Generator', 'Adaptive Practice'],
    permissions: ['READ_STUDENT_PROGRESS', 'PROVIDE_LEARNING_HINTS'],
    goal: 'Meningkatkan penguasaan materi siswa secara mandiri tanpa jawaban langsung.',
    knowledgeBaseCount: 4800,
    tokensConsumedToday: 520000,
  },
  {
    id: 'agent-18',
    code: 'AG-TEACHER-ASSISTANT',
    name: 'Teacher Assistant Agent',
    role: 'Automatic Grading, Rubric Evaluation & RPP Co-Pilot',
    domain: 'Teacher Experience',
    status: 'collaborating',
    memoryUsageMb: 340,
    taskQueueCount: 7,
    accuracyPct: 99.0,
    lastAction: 'Membantu guru menyusun rubric penilaian esai Bahasa Indonesia Kurikulum Merdeka.',
    capabilities: ['Essay Auto-Grading', 'Rubric Synthesis', 'Differentiated Teaching Materials', 'Quiz Drafting'],
    permissions: ['READ_ASSIGNMENTS', 'DRAFT_GRADES'],
    goal: 'Mengkaji dan memangkas waktu kerja administrasi guru hingga 60%.',
    knowledgeBaseCount: 3600,
    tokensConsumedToday: 380000,
  },
];

// Orchestrator Tasks Execution Stream
export const mockOrchestrationTasks: OrchestrationTask[] = [
  {
    id: 'task-101',
    code: 'ORCH-2026-0891',
    title: 'Prediksi & Mitigasi Risiko Tunggakan SPP Semester Ganjil 2026/2027',
    initiator: 'Analytics Agent',
    assignedAgent: 'Finance Agent',
    delegationAgents: ['CRM Agent', 'Parent Assistant Agent'],
    priority: 'HIGH',
    status: 'running',
    confidenceScore: 0.96,
    humanApprovalRequired: true,
    createdAt: '2026-07-30 08:30:12',
    executionTimeMs: 420,
    summary: 'Menganalisis 1.250 profil siswa dan mengidentifikasi 34 siswa berisiko tinggi keterlambatan bayar SPP.',
  },
  {
    id: 'task-102',
    code: 'ORCH-2026-0892',
    title: 'Penyusunan RPP & Modul Ajar AI Kurikulum Merdeka Fase F (Kelas 11 & 12)',
    initiator: 'Academic Agent',
    assignedAgent: 'Teacher Assistant Agent',
    delegationAgents: ['Student Tutor Agent', 'Library Agent'],
    priority: 'MEDIUM',
    status: 'completed',
    confidenceScore: 0.98,
    humanApprovalRequired: false,
    createdAt: '2026-07-30 09:15:00',
    executionTimeMs: 1150,
    summary: 'Berhasil menghasilkan 24 modul ajar terintegrasi STEM dan asesmen diagnostik otomatis.',
  },
  {
    id: 'task-103',
    code: 'ORCH-2026-0893',
    title: 'Auto-Scaling Infrastructure Saat Pelaksanaan Ujian Penilaian Akhir Semester (PAS)',
    initiator: 'DevOps Agent',
    assignedAgent: 'Infrastructure Agent',
    delegationAgents: ['Security Agent'],
    priority: 'CRITICAL',
    status: 'running',
    confidenceScore: 0.99,
    humanApprovalRequired: false,
    createdAt: '2026-07-30 09:40:22',
    executionTimeMs: 310,
    summary: 'Meningkatkan kapasitas pod Kubernetes dari 4 menjadi 12 pod untuk menangani 2.800 concurent users.',
  },
  {
    id: 'task-104',
    code: 'ORCH-2026-0894',
    title: 'Persetujuan Beasiswa Prestasi PPDB Jalur AI Diagnostic Assessment',
    initiator: 'Admission Agent',
    assignedAgent: 'Principal Agent',
    delegationAgents: ['Finance Agent', 'Compliance Agent'],
    priority: 'HIGH',
    status: 'pending_approval',
    confidenceScore: 0.94,
    humanApprovalRequired: true,
    createdAt: '2026-07-30 10:05:44',
    executionTimeMs: 820,
    summary: 'Rekomendasi pemberian potongan SPP 50% untuk 12 calon siswa berprestasi nasional.',
  }
];

// Digital Twins Objects
export const mockDigitalTwins: DigitalTwinObject[] = [
  {
    id: 'twin-01',
    category: 'Sekolah',
    name: 'Digital Twin - SMA Garuda Utama Surabaya',
    code: 'TWIN-SCH-01',
    realtimeHealthPct: 98.5,
    anomalyScore: 0.02,
    activeMetrics: {
      'Siswa Aktif': 1250,
      'Guru & Staf': 68,
      'Kehadiran Hari Ini': '97.2%',
      'Status Anggaran': 'Optimal (On Track)',
      'Konsumsi Daya Watt': '14.2 kW',
    },
    status: 'optimal',
    lastSynced: '1 detik lalu',
  },
  {
    id: 'twin-02',
    category: 'Gedung',
    name: 'Gedung Rektorat & Laboratorium Sains Terpadu',
    code: 'TWIN-BLD-02',
    realtimeHealthPct: 96.0,
    anomalyScore: 0.08,
    activeMetrics: {
      'Suhu Ruangan Avg': '24.2°C',
      'Kelembapan': '58%',
      'Perangkat IoT': '48 Unit Active',
      'Kualitas Udara AQI': '32 (Baik)',
    },
    status: 'optimal',
    lastSynced: '3 detik lalu',
  },
  {
    id: 'twin-03',
    category: 'Kelas',
    name: 'Ruang Kelas 11 MIPA 1 (Smart Classroom)',
    code: 'TWIN-CLS-11A',
    realtimeHealthPct: 99.0,
    anomalyScore: 0.01,
    activeMetrics: {
      'Kapasitas Kursi': '36/36 Terisi',
      'Interactive Display': 'Active (Fisika)',
      'Camera AI Attendance': '36 Siswa Hadir',
      'Noise Level': '42 dB',
    },
    status: 'optimal',
    lastSynced: 'Realtime',
  },
  {
    id: 'twin-04',
    category: 'Siswa',
    name: 'Digital Twin Cohort Kelas 12 (Angkatan 2026)',
    code: 'TWIN-STU-12',
    realtimeHealthPct: 94.8,
    anomalyScore: 0.12,
    activeMetrics: {
      'Total Siswa': 320,
      'Prediksi Kelulusan': '99.4%',
      'Rata-rata Nilai Tryout': '84.6/100',
      'Risiko Remedial': '18 Siswa',
    },
    status: 'warning',
    lastSynced: '15 detik lalu',
  },
  {
    id: 'twin-05',
    category: 'Keuangan',
    name: 'Digital Twin Cash Flow & SPP Portfolio',
    code: 'TWIN-FIN-01',
    realtimeHealthPct: 97.8,
    anomalyScore: 0.04,
    activeMetrics: {
      'Kolektibilitas SPP': '96.4%',
      'Penerimaan Bulan Ini': 'Rp 842.500.000',
      'Sisa Anggaran Operasional': 'Rp 215.000.000',
      'Anomali Transaksi': '0 Detected',
    },
    status: 'optimal',
    lastSynced: '5 detik lalu',
  }
];

// Predictive Simulation Models
export const mockSimulationScenarios: SimulationScenario[] = [
  {
    id: 'sim-01',
    type: 'PPDB',
    title: 'Simulasi Proyeksi Pendaftaran PPDB Tahun Ajaran 2026/2027',
    description: 'Memprediksi jumlah pendaftar ulang dan proyeksi pendapatan masuk berdasar tren digital campaign & histori 3 tahun.',
    baselineValue: '320 Pendaftar',
    predictedValue: '385 Pendaftar (+20.3%)',
    confidenceIntervalPct: 96.8,
    growthPct: 20.3,
    keyDrivers: ['Kampanye AI Personalized WhatsApp', 'Reputasi Kelulusan SNBP', 'Program Beasiswa Prestasi'],
    recommendation: 'Buka 1 Rombel (Rombongan Belajar) tambahan di Gedung B lantai 2 untuk mengantisipasi kelebihan kuota.',
  },
  {
    id: 'sim-02',
    type: 'CashFlow',
    title: 'Simulasi Ketahanan Arus Kas 12 Bulan (Stress Test Inflasi 5.2%)',
    description: 'Simulasi daya tahan likuiditas sekolah menghadapi lonjakan biaya operasional & opsi penyesuaian SPP.',
    baselineValue: 'Rp 850M / Bulan',
    predictedValue: 'Rp 982M / Bulan (Surplus)',
    confidenceIntervalPct: 98.2,
    growthPct: 15.5,
    keyDrivers: ['Efisiensi Listrik IoT', 'Otomasi Tagihan SPP', 'Penghematan Pengadaan Kertas'],
    recommendation: 'Alokasikan surplus Rp 132M untuk pengembangan lab kecerdasan buatan & pelatihan sertifikasi guru.',
  },
  {
    id: 'sim-03',
    type: 'Guru',
    title: 'Simulasi Optimalisasi Beban Kerja Guru & Penambahan Staf Pengajar',
    description: 'Menganalisis rasio guru:siswa dan jam mengajar ideal agar tidak melampaui batas burnout 24 jam/minggu.',
    baselineValue: '22.4 Jam / Minggu',
    predictedValue: '18.6 Jam / Minggu',
    confidenceIntervalPct: 95.4,
    growthPct: -16.9,
    keyDrivers: ['Penggunaan AI RPP Co-Pilot', 'Sistem Koreksi Esai Otomatis', 'Penambahan 2 Guru Informatika'],
    recommendation: 'Rekrut 2 Guru Informatika baru untuk menopang kurikulum pilihan AI & Coding di kelas 11.',
  },
  {
    id: 'sim-04',
    type: 'Tunggakan',
    title: 'Simulasi Intervensi Dini Pengurangan Risiko Tunggakan SPP',
    description: 'Estimasi dampak pemberian opsi cicilan fleksibel berbasis AI reminder terhadap kolektibilitas SPP.',
    baselineValue: 'Risiko Tunggakan 4.8%',
    predictedValue: 'Risiko Tunggakan 1.2%',
    confidenceIntervalPct: 97.5,
    growthPct: -75.0,
    keyDrivers: ['Notifikasi Otomatis WA', 'Opsi Cicilan Terjadwal', 'Penanganan Khusus Finansial Ortu'],
    recommendation: 'Terapkan skema fleksibel tenor 3x pembayaran untuk 34 keluarga yang terdeteksi mengalami kesulitan ekonomi sementara.',
  }
];

// Policy Engine Rules
export const mockPolicyRules: PolicyRuleItem[] = [
  {
    id: 'rule-01',
    code: 'POL-AI-001',
    name: 'Human-in-the-Loop Override untuk Transaksi > Rp 10.000.000',
    category: 'Approval',
    condition: 'Action == "TRANSACTION_DISBURSEMENT" && Amount > 10000000',
    action: 'REQUIRE_HUMAN_APPROVAL(Role: "Bendahara" | "Kepala Sekolah")',
    isEnforced: true,
    riskLevel: 'HIGH',
  },
  {
    id: 'rule-02',
    code: 'POL-SEC-002',
    name: 'Prompt Guard & Sensitive PII Redaction Filter',
    category: 'Security',
    condition: 'ContainsPII(PromptText) == true || DetectPromptInjection(PromptText) > 0.85',
    action: 'MASK_PII_DATA() && BLOCK_POTENTIAL_EXPLOIT()',
    isEnforced: true,
    riskLevel: 'CRITICAL',
  },
  {
    id: 'rule-03',
    code: 'POL-AUTO-003',
    name: 'Auto-Scaling Pod Kubernetes Ujian Online Synchronous',
    category: 'Automation',
    condition: 'ActiveExamUsers > 1500 || CPU_Usage > 75%',
    action: 'TRIGGER_K8S_HPA(MinPods: 8, MaxPods: 20)',
    isEnforced: true,
    riskLevel: 'MEDIUM',
  },
  {
    id: 'rule-04',
    code: 'POL-COMP-004',
    name: 'Pemeriksaan Integritas NIK/NISN Sebelum Sync Dapodik',
    category: 'Compliance',
    condition: 'IsValidNationalIDFormat(NISN) == false',
    action: 'FLAG_DATA_ERROR() && PREVENT_DAPODIK_SUBMISSION()',
    isEnforced: true,
    riskLevel: 'HIGH',
  }
];

// Human-in-the-Loop Approval Queue
export const mockHumanApprovals: HumanApprovalItem[] = [
  {
    id: 'appr-01',
    taskCode: 'ORCH-2026-0894',
    agentName: 'Admission Agent',
    actionRequested: 'Persetujuan Potongan SPP 50% Beasiswa Prestasi PPDB (12 Calon Siswa)',
    reasoning: 'Rekomendasi AI berdasarkan skor kognitif > 92/100 dan portofolio kejuaraan tingkat provinsi.',
    impactScore: 'HIGH',
    status: 'PENDING',
    requestedAt: '10 menit lalu',
    tenantName: 'SMA Garuda Utama Surabaya',
  },
  {
    id: 'appr-02',
    taskCode: 'ORCH-2026-0891',
    agentName: 'Finance Agent',
    actionRequested: 'Restrukturisasi Tenor Pembayaran SPP untuk 34 Siswa Teridentifikasi Vulnerable',
    reasoning: 'Mengubah jadwal penagihan menjadi 3x cicilan per semester untuk mencegah drop-out akibat finansial.',
    impactScore: 'CRITICAL',
    status: 'PENDING',
    requestedAt: '25 menit lalu',
    tenantName: 'SMK Teknologi Bangsa Malang',
  },
  {
    id: 'appr-03',
    taskCode: 'ORCH-2026-0885',
    agentName: 'Academic Agent',
    actionRequested: 'Penerbitan Rapor Remedial & Kurikulum Pendampingan Khusus',
    reasoning: 'AI telah memverifikasi kelengkapan berkas remedial & peningkatan pemahaman siswa pasca pendampingan.',
    impactScore: 'MEDIUM',
    status: 'APPROVED',
    requestedAt: '2 jam lalu',
    tenantName: 'SMP Nusantara Jakarta',
  }
];

// Cost & Token Usage Breakdown
export const mockTenantAiCosts: AiCostBreakdown[] = [
  {
    tenantName: 'SMA Garuda Utama Surabaya',
    schoolLevel: 'SMA',
    dailyTokens: 1420000,
    dailyCostUSD: 14.20,
    topAgent: 'Student Tutor Agent',
    optimizationPotentialPct: 18.5,
  },
  {
    tenantName: 'SMK Teknologi Bangsa Malang',
    schoolLevel: 'SMK',
    dailyTokens: 1180000,
    dailyCostUSD: 11.80,
    topAgent: 'Teacher Assistant Agent',
    optimizationPotentialPct: 22.0,
  },
  {
    tenantName: 'SMP Nusantara Jakarta',
    schoolLevel: 'SMP',
    dailyTokens: 980000,
    dailyCostUSD: 9.80,
    topAgent: 'Admission Agent',
    optimizationPotentialPct: 15.0,
  },
  {
    tenantName: 'SD Islam Terpadu Cendekia',
    schoolLevel: 'SD',
    dailyTokens: 640000,
    dailyCostUSD: 6.40,
    topAgent: 'Parent Assistant Agent',
    optimizationPotentialPct: 12.0,
  }
];

// Architectural Documentation & Handbooks
export const autonomousDocsHandbooks = {
  aiArchitectureGuide: `====================================================================
SMART AI SCHOOL OS — AUTONOMOUS AI PLATFORM ARCHITECTURE GUIDE
====================================================================

1. OVERVIEW & FOUNDATION
   Smart AI School OS Autonomous AI Platform dibangun di atas arsitektur Multi-Agent 
   Event-Driven yang sepenuhnya AI-Native, Multi-Tenant SaaS, dan Cloud-Native. 
   Setiap AI Agent beroperasi secara otonom sesuai batasan peran, memori, dan kebijakan 
   yang ditetapkan, serta terhubung dengan Human-in-the-Loop (HITL) untuk tindakan berisiko tinggi.

2. CORE LAYERS:
   - AI Orchestrator: Engine koordinasi tugas, delegasi antar agent, & routing cerdas.
   - AI Agent Registry: Katalog 18 agent terspesialisasi (Principal, Academic, Finance, HR, dsb).
   - Multi-Tier AI Memory: Short-Term (Context Cache), Long-Term (RAG Knowledge), & Tenant Isolation.
   - Digital Twin Engine: Pemodelan kondisi digital sekolah, gedung, kelas, guru, & keuangan real-time.
   - Predictive Simulation Engine: Proyeksi PPDB, kelulusan, arus kas, & kapasitas berbasis ML.
   - Policy & Governance Guard: Enforcer aturan bisnis, Prompt Guard, PII Redaction, & Audit Trail.

3. TAGLINE RESMI:
   "One Platform. Smart School. AI Powered."`,

  multiAgentGuide: `====================================================================
MULTI-AGENT COLLABORATION & DELEGATION PROTOCOL
====================================================================

1. AGENT SPECIFICATION & CAPABILITIES
   Sistem mengintegrasikan 18 AI Agent terdedikasi:
   - Executive & Leadership: Principal Agent, Executive Advisor Agent
   - Operational Core: Academic Agent, Finance Agent, HR Agent, Admission Agent, CRM Agent
   - Resources & Infrastructure: Library Agent, Inventory Agent, DevOps Agent, Infrastructure Agent
   - Governance & Security: Compliance Agent, Legal Agent, Security Agent, Analytics Agent
   - End-User Companions: Parent Assistant Agent, Student Tutor Agent, Teacher Assistant Agent

2. DELEGATION WORKFLOW
   Task -> AI Orchestrator -> Priority Queue -> Agent Selection -> Parallel Subtask Execution 
   -> Context Sync -> Confidence Scoring -> (Optional) Human Approval -> Resolution`,

  digitalTwinGuide: `====================================================================
DIGITAL TWIN & REAL-TIME SIMULATION CENTER
====================================================================

1. DIGITAL TWIN OBJECT MODEL
   Sistem menciptakan bayangan digital (digital replica) dari aset fisik dan organisasional:
   - Twin Sekolah & Gedung: Sensor IoT suhu, kualitas udara AQI, daya watt, & kapasitas ruangan.
   - Twin Siswa & Akademik: Cohort analitik perkembangan nilai, prediksi kelulusan, & kehadiran.
   - Twin Keuangan: Arus kas real-time, tingkat kolektibilitas SPP, & anomali transaksi.

2. SIMULATION ENGINE
   Menjalankan skenario "What-If Analysis" tanpa mengganggu data produksi:
   - Proyeksi pendaftaran PPDB berbasis tren pemasaran digital.
   - Stress-test ketahanan anggaran sekolah terhadap inflasi & beban operasional.
   - Simulasi distribusi jam mengajar guru untuk mencegah beban kerja berlebih (burnout).`,

  policyGovernanceGuide: `====================================================================
AI GOVERNANCE, SAFETY & HUMAN-IN-THE-LOOP (HITL)
====================================================================

1. ZERO TRUST AI SAFETY
   - Prompt Guard Engine: Mencegah upaya Prompt Injection & pemanggilan fungsi tak berwenang.
   - PII Redaction: Otomatis menyamarkan NIK, nomor HP, & alamat pribadi sebelum diproses LLM.
   - Hallucination Detection & Confidence Score: Hasil analisis AI di bawah batas confidence 85% 
     secara otomatis ditandai untuk peninjauan manual.

2. HUMAN-IN-THE-LOOP (HITL)
   Semua tindakan AI beresiko tinggi (keuangan > Rp 10 juta, perubahan status kurikulum, 
   pembatalan tagihan) WAJIB melalui antrean persetujuan manusia dengan catatan alasan yang transparan.`
};
