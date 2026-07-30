import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SchoolLevel, UserRole } from '../../types';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Building2,
  GraduationCap,
  Users,
  Check,
  Cpu,
  Key,
  Database,
  BarChart3,
  Bot,
  Zap,
  Globe,
  Lock,
  ChevronRight,
  Layers,
  Award,
  Play
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { setView, setRole, setIsAiModalOpen, t } = useApp();
  const [selectedLevel, setSelectedLevel] = useState<SchoolLevel>('SMA');

  const schoolLevels: { id: SchoolLevel; title: string; desc: string; icon: string; features: string[] }[] = [
    {
      id: 'PAUD',
      title: 'PAUD & Playgroup',
      desc: 'Pemantauan tumbuh kembang anak, jurnal harian foto, & komunikasi ibu guru.',
      icon: '🧸',
      features: ['Laporan Tumbuh Kembang AI', 'Foto Jurnal Harian', 'Notifikasi Penjemputan Anak'],
    },
    {
      id: 'TK',
      title: 'Taman Kanak-Kanak',
      desc: 'Aktivitas motorik, kognitif, laporan perkembangan karakter & absensi QR.',
      icon: '🎨',
      features: ['Rapor Karakter Digital', 'Modul Motorik Halus', 'Jadwal Kegiatan Interaktif'],
    },
    {
      id: 'SD',
      title: 'Sekolah Dasar (SD)',
      desc: 'Pondasi Kurikulum Merdeka, rapor asesmen, kuis interaktif & SPP WhatsApp.',
      icon: '🎒',
      features: ['Asesmen Diagnostik AI', 'Rapor Kurikulum Merdeka', 'Auto WhatsApp Tagihan SPP'],
    },
    {
      id: 'SMP',
      title: 'Sekolah Menengah Pertama',
      desc: 'Manajemen ekstrakurikuler, nilai akademik, bimbingan konseling & absensi.',
      icon: '📐',
      features: ['Konseling AI & Karir', 'Rombel Multi-Kelas', 'Portofolio Ekstrakurikuler'],
    },
    {
      id: 'SMA',
      title: 'Sekolah Menengah Atas',
      desc: 'Persiapan SNBP/SNBT, pemetaan minat bakat AI, kelulusan & alumni.',
      icon: '🎓',
      features: ['Predictive Analytics SNBP AI', 'Pemetaan Minat & Bakat', 'Arsip Kelulusan & Alumni'],
    },
    {
      id: 'SMK',
      title: 'Sekolah Menengah Kejuruan',
      desc: 'Manajemen Praktik Kerja Lapangan (PKL), sertifikasi industri & LSP.',
      icon: '⚙️',
      features: ['Manajemen Magang PKL', 'Sertifikasi Keahlian Industri', 'Inventaris Laboratorium Praktik'],
    },
    {
      id: 'Pesantren',
      title: 'Pondok Pesantren',
      desc: 'Setoran hafalan Al-Qur\'an (Tahfidz), perizinan santri & katering syariah.',
      icon: '🕌',
      features: ['Tracking Hafalan Tahfidz', 'E-Perizinan Santri Keluar', 'Kantoin Cashless Santri'],
    },
    {
      id: 'Internasional',
      title: 'Sekolah Internasional',
      desc: 'Kurikulum Cambridge / IB, bilingual UI, mata uang multi-currency.',
      icon: '🌐',
      features: ['Cambridge & IB Assessment', 'Bilingual Multilingual OS', 'Multi-currency Tuition'],
    },
    {
      id: 'Homeschool',
      title: 'Homeschooling Network',
      desc: 'Fleksibilitas pembelajaran mandiri, penilaian tugas daring & mentoring.',
      icon: '🏡',
      features: ['Modul Belajar Mandiri', 'Jadwal Mentoring Virtual', 'Rapor Fleksibel Custom'],
    },
    {
      id: 'Yayasan',
      title: 'Yayasan Pendidikan',
      desc: 'Konsolidasi laporan multi-sekolah, audit keuangan & pertumbuhan cabang.',
      icon: '🏛️',
      features: ['Dashboard Konsolidasi Yayasan', 'Audit Laporan Keuangan', 'Lisensi SaaS Multi-Tenant'],
    },
  ];

  const pricingTiers = [
    {
      name: 'Standard Tier',
      tagline: 'Satu Sekolah Pintar Mandiri',
      price: 'Rp 499.000',
      period: '/ bulan',
      features: [
        'Hingga 500 Siswa & 50 Guru',
        '8 Modul Utama Terintegrasi',
        'Asisten AI Kuota Standard',
        'Multi Language (ID & EN)',
        'Notifikasi WhatsApp Gateway',
      ],
      popular: false,
      btnLabel: 'Mulai Trial Standard',
    },
    {
      name: 'Pro Tier',
      tagline: 'Rekomendasi Utama Sekolah Modern',
      price: 'Rp 1.299.000',
      period: '/ bulan',
      features: [
        'Siswa & Guru Tanpa Batas',
        'Seluruh Modul Enterprise Ready',
        'AI Assistant Gemini 3.6 Unlimited',
        'Akses 10 Role User complete',
        'PostgreSQL Database Dedicated',
        'Sertifikat SSL & Support 24/7',
      ],
      popular: true,
      btnLabel: 'Pilih Paket Pro AI',
    },
    {
      name: 'Enterprise White Label',
      tagline: 'Custom Domain & Brand Yayasan',
      price: 'Rp 3.499.000',
      period: '/ bulan',
      features: [
        'Brand, Logo & Warna Custom',
        'Custom Subdomain / Domain Sendiri',
        'Konsolidasi Multi-Sekolah Yayasan',
        'License Key Manager SaaS',
        'Dedicated SLA Cloud Run Instance',
        'Pendampingan Onboarding Dedicated',
      ],
      popular: false,
      btnLabel: 'Hubungi Sales Enterprise',
    },
  ];

  return (
    <div id="landing-page-root" className="min-h-screen bg-slate-950 text-slate-100 overflow-x-hidden selection:bg-amber-500 selection:text-slate-950">
      {/* Hero Section */}
      <section className="relative pt-20 pb-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-blue-600/30 via-indigo-600/20 to-amber-500/20 rounded-full blur-3xl -z-10 pointer-events-none"></div>

        {/* AI Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/80 border border-slate-700/80 text-amber-400 text-xs font-semibold mb-6 shadow-xl backdrop-blur-md">
          <Sparkles className="w-4 h-4 animate-pulse" />
          <span>Next-Generation School Operating System</span>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-500 text-slate-950">
            AI POWERED
          </span>
        </div>

        {/* Hero Title */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white max-w-4xl mx-auto leading-tight">
          Sistem Operasi Sekolah Enterprise{' '}
          <span className="bg-gradient-to-r from-blue-400 via-blue-300 to-amber-400 bg-clip-text text-transparent">
            Berbasis Artificial Intelligence
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Satu Platform Terintegrasi untuk PAUD, SD, SMP, SMA, SMK, Pesantren hingga Yayasan. Otomatiskan administrasi, kehadiran, SPP, dan rapot dengan kecerdasan AI.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => setView('register')}
            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 via-blue-700 to-amber-500 text-white font-extrabold text-xs tracking-wider shadow-xl shadow-blue-600/25 hover:scale-[1.03] active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <Key className="w-4 h-4" />
            <span>Mulai Trial Gratis 14 Hari</span>
          </button>

          <button
            onClick={() => setView('login')}
            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-bold text-xs hover:border-slate-600 transition-all flex items-center justify-center gap-2"
          >
            <span>Masuk Demo (10 Role Preset)</span>
            <ArrowRight className="w-4 h-4 text-amber-400" />
          </button>
        </div>

        {/* Interactive AI Assistant Demo Box */}
        <div className="mt-14 max-w-3xl mx-auto rounded-3xl bg-slate-900/80 border border-slate-800 p-6 shadow-2xl backdrop-blur-xl text-left">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-500"></div>
              <div className="w-3 h-3 rounded-full bg-amber-500"></div>
              <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
              <span className="text-xs font-mono text-slate-400 ml-2">Smart AI Assistant Simulator</span>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-900/60 text-blue-300">
              Live Preview
            </span>
          </div>

          <div className="py-4 space-y-3">
            <div className="p-3.5 rounded-xl bg-slate-800/80 text-xs text-slate-300 flex items-start gap-3">
              <Bot className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-white">Instruksi AI Sekolah:</p>
                <p className="text-slate-400 mt-1">
                  "Analisis tren kehadiran siswa SMA Garuda Cendekia dan berikan rekomendasi untuk wali kelas."
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-blue-950/40 border border-blue-800/40 text-xs text-blue-200 leading-relaxed">
              <p className="font-bold text-amber-300 mb-1 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" /> Hasil Analisis AI Gemini 3.6:
              </p>
              <p>
                Rata-rata kehadiran sekolah bulan ini berada di angka **96.4%** (+2.1% dari bulan lalu). Rekomendasi tindakan:
              </p>
              <ul className="list-disc pl-5 mt-1.5 space-y-1 text-slate-300">
                <li>Kelas XII IPA 2 memerlukan perhatian khusus pada jam pertama hari Senin.</li>
                <li>Notifikasi otomatis via WA Gateway telah dikirimkan ke 12 orang tua siswa.</li>
              </ul>
            </div>
          </div>

          <button
            onClick={() => setIsAiModalOpen(true)}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Coba Asisten AI Sekolah Sekarang</span>
          </button>
        </div>
      </section>

      {/* Target Market Interactive Section */}
      <section className="py-20 bg-slate-900/60 border-y border-slate-800 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
              Fleksibilitas Tanpa Batas
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-2">
              Didesain Khusus Spesifik Setiap Jenjang Sekolah
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              Setiap tipe instansi pendidikan memiliki kebutuhan unik yang telah disesuaikan di dalam Smart AI School OS.
            </p>
          </div>

          {/* Level Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-none justify-start lg:justify-center">
            {schoolLevels.map((lvl) => (
              <button
                key={lvl.id}
                onClick={() => setSelectedLevel(lvl.id)}
                className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all shrink-0 flex items-center gap-2 border ${
                  selectedLevel === lvl.id
                    ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-600/20'
                    : 'bg-slate-800/80 border-slate-700/80 text-slate-400 hover:text-white'
                }`}
              >
                <span>{lvl.icon}</span>
                <span>{lvl.title}</span>
              </button>
            ))}
          </div>

          {/* Active Level Detail Box */}
          {(() => {
            const active = schoolLevels.find((s) => s.id === selectedLevel)!;
            return (
              <div className="mt-8 p-8 rounded-3xl bg-slate-900 border border-slate-800 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                <div className="md:col-span-5 space-y-4">
                  <div className="text-4xl">{active.icon}</div>
                  <h3 className="text-xl font-bold text-white">{active.title}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">{active.desc}</p>
                  <button
                    onClick={() => setView('register')}
                    className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors inline-flex items-center gap-2"
                  >
                    <span>Daftarkan {active.title}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="md:col-span-7 space-y-3">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Fitur Unggulan Terintegrasi:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {active.features.map((f, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-center gap-3 text-xs text-slate-200"
                      >
                        <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      </section>

      {/* Pricing / SaaS License Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
            SaaS & License Key
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-2">
            Pilihan Paket Lisensi Enterprise
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            Investasi teknologi hemat dan efisien tanpa biaya pemeliharaan server tersembunyi.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingTiers.map((tier, idx) => (
            <div
              key={idx}
              className={`p-8 rounded-3xl border flex flex-col justify-between relative transition-all duration-300 ${
                tier.popular
                  ? 'bg-gradient-to-b from-slate-900 via-blue-950/40 to-slate-900 border-blue-500/80 shadow-2xl shadow-blue-600/10 scale-105'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              {tier.popular && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[10px] font-extrabold bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 uppercase tracking-wider">
                  Paling Banyak Dipilih
                </span>
              )}

              <div>
                <h3 className="text-lg font-bold text-white">{tier.name}</h3>
                <p className="text-xs text-slate-400 mt-1">{tier.tagline}</p>

                <div className="my-6">
                  <span className="text-2xl font-black text-white">{tier.price}</span>
                  <span className="text-xs text-slate-400 ml-1">{tier.period}</span>
                </div>

                <div className="space-y-3 pt-4 border-t border-slate-800 text-xs">
                  {tier.features.map((feat, fidx) => (
                    <div key={fidx} className="flex items-center gap-2.5 text-slate-300">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setView('register')}
                className={`mt-8 w-full py-3 rounded-xl font-bold text-xs transition-all ${
                  tier.popular
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:opacity-90 shadow-lg'
                    : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
                }`}
              >
                {tier.btnLabel}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Role Quick Launcher Banner */}
      <section className="py-16 bg-gradient-to-r from-blue-900 via-slate-900 to-indigo-950 border-t border-slate-800 px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <GraduationCap className="w-12 h-12 text-amber-400 mx-auto" />
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Siap Mengalami Transformasi Sekolah Digital?
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
            Uji coba seluruh 10 Role User secara instan di sistem demo kami tanpa perlu konfigurasi awal.
          </p>

          <div className="pt-2 flex justify-center">
            <button
              onClick={() => setView('login')}
              className="px-8 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs shadow-xl transition-all flex items-center gap-2"
            >
              <span>Masuk ke Dashboard Sekarang</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
