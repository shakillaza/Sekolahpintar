import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Building2,
  Palette,
  Key,
  Shield,
  CheckCircle2,
  Globe,
  Database,
  Sliders,
  Sparkles
} from 'lucide-react';

export const SettingsView: React.FC = () => {
  const { settings, updateSettings, school, t } = useApp();
  const [activeTab, setActiveTab] = useState<'general' | 'branding' | 'license' | 'rbac'>('general');

  // Form states
  const [appName, setAppName] = useState(settings.appName);
  const [tagline, setTagline] = useState(settings.tagline);
  const [customDomain, setCustomDomain] = useState(settings.customDomain || '');
  const [licenseKeyInput, setLicenseKeyInput] = useState(school.licenseKey);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      appName,
      tagline,
      customDomain,
      licenseKey: licenseKeyInput,
    });
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12 animate-in fade-in duration-200">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 dark:text-white">
            {t('settingsTitle')}
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Kelola identitas instansi, konfigurasi SaaS White Label, dan matriks hak akses.
          </p>
        </div>
      </div>

      {/* Settings Navigation Tabs */}
      <div className="flex gap-2 border-b border-slate-200 dark:border-slate-800 pb-1 overflow-x-auto scrollbar-none">
        {[
          { id: 'general', labelKey: 'generalConfig', icon: Building2 },
          { id: 'branding', labelKey: 'brandingConfig', icon: Palette },
          { id: 'license', labelKey: 'licenseConfig', icon: Key },
          { id: 'rbac', labelKey: 'rbacConfig', icon: Shield },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
                isActive
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{t(tab.labelKey)}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Contents */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        <form onSubmit={handleSave} className="space-y-6">
          {activeTab === 'general' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Nama Sistem Aplikasi
                  </label>
                  <input
                    type="text"
                    value={appName}
                    onChange={(e) => setAppName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Tagline Aplikasi
                  </label>
                  <input
                    type="text"
                    value={tagline}
                    onChange={(e) => setTagline(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-3">
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                  Identitas Sekolah ({school.name})
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[10px]">NPSN Nasional:</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">{school.npsn}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Akreditasi:</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">
                      Terakreditasi {school.accreditation}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Tipe Instansi:</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">{school.level}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Jumlah Siswa:</span>
                    <span className="font-bold text-blue-600 dark:text-blue-400">
                      {school.studentsCount} Siswa
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'branding' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Custom Subdomain / Domain White Label
                </label>
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={customDomain}
                    onChange={(e) => setCustomDomain(e.target.value)}
                    placeholder="sekolahanda.smartschool.id"
                    className="flex-1 px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-800 dark:text-amber-300 text-xs space-y-1">
                <p className="font-bold">SaaS Enterprise White Label Enabled</p>
                <p className="text-[11px] opacity-90">
                  Logo instansi, favicon, dan tema warna royal blue & gold disesuaikan secara dinamis di seluruh dashboard.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'license' && (
            <div className="space-y-4">
              <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white border border-blue-800/40 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Key className="w-5 h-5 text-amber-400" />
                    <span className="font-bold text-sm">Status Lisensi Aktif</span>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-black bg-emerald-500 text-slate-950">
                    {school.licenseTier}
                  </span>
                </div>

                <div className="space-y-1">
                  <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">
                    License Key ID:
                  </p>
                  <p className="text-sm font-mono font-bold text-amber-300 bg-slate-950 p-3 rounded-xl border border-slate-800">
                    {school.licenseKey}
                  </p>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-300 pt-2 border-t border-slate-800">
                  <span>Masa Berlaku Lisensi: {school.validUntil}</span>
                  <span className="text-emerald-400 font-bold">Status: ACTIVE</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Perbarui Kode Lisensi Baru
                </label>
                <input
                  type="text"
                  value={licenseKeyInput}
                  onChange={(e) => setLicenseKeyInput(e.target.value)}
                  placeholder="Masukkan Kunci SaaS Baru"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white font-mono focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          )}

          {activeTab === 'rbac' && (
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                Matriks Hak Akses Stakeholder (10 Roles Pre-Configured)
              </h4>
              <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    <tr>
                      <th className="p-3">Role Stakeholder</th>
                      <th className="p-3">Lihat Rapor & Nilai</th>
                      <th className="p-3">Kelola Keuangan SPP</th>
                      <th className="p-3">Akses Asisten AI</th>
                      <th className="p-3">Pengaturan Sistem</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                    {[
                      { role: 'Super Admin', view: true, finance: true, ai: true, sys: true },
                      { role: 'Yayasan', view: true, finance: true, ai: true, sys: false },
                      { role: 'Kepala Sekolah', view: true, finance: true, ai: true, sys: true },
                      { role: 'Guru Pengajar', view: true, finance: false, ai: true, sys: false },
                      { role: 'Wali Kelas', view: true, finance: false, ai: true, sys: false },
                      { role: 'Bendahara Keuangan', view: false, finance: true, ai: true, sys: false },
                      { role: 'Operator Sekolah', view: true, finance: false, ai: true, sys: true },
                      { role: 'Orang Tua', view: true, finance: true, ai: false, sys: false },
                      { role: 'Siswa', view: true, finance: false, ai: true, sys: false },
                    ].map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                        <td className="p-3 font-bold text-blue-600 dark:text-blue-400">{row.role}</td>
                        <td className="p-3">{row.view ? '✅ Standard' : '❌ Restriksi'}</td>
                        <td className="p-3">{row.finance ? '✅ Standard' : '❌ Restriksi'}</td>
                        <td className="p-3">{row.ai ? '✅ Standard' : '❌ Restriksi'}</td>
                        <td className="p-3">{row.sys ? '✅ Admin' : '❌ Restriksi'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{t('saveChanges')}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
