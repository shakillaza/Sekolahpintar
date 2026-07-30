import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SchoolLevel } from '../../types';
import {
  Building2,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Key,
  School as SchoolIcon,
  User,
  Mail,
  Lock,
  Phone,
  MapPin
} from 'lucide-react';

export const RegisterView: React.FC = () => {
  const { setView, addToast, t } = useApp();
  const [step, setStep] = useState<1 | 2>(1);

  // Form State
  const [schoolName, setSchoolName] = useState('');
  const [schoolLevel, setSchoolLevel] = useState<SchoolLevel>('SMA');
  const [npsn, setNpsn] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [schoolEmail, setSchoolEmail] = useState('');
  
  // Admin State
  const [adminName, setAdminName] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  const [password, setPassword] = useState('');
  const [licenseKey, setLicenseKey] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const levels: SchoolLevel[] = [
    'PAUD',
    'TK',
    'SD',
    'SMP',
    'SMA',
    'SMK',
    'Pesantren',
    'Internasional',
    'Homeschool',
    'Yayasan',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      addToast(
        'success',
        'Pendaftaran Sekolah Berhasil',
        `Selamat! ${schoolName || 'Sekolah Anda'} telah terdaftar. License key trial 14 hari diaktifkan.`
      );
      setView('login');
    }, 1000);
  };

  return (
    <div id="register-view-container" className="min-h-screen w-full bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="w-full max-w-2xl rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl backdrop-blur-xl p-6 sm:p-10 z-10">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">{t('registerTitle')}</h2>
              <p className="text-xs text-slate-400">{t('registerSubtitle')}</p>
            </div>
          </div>
          <button
            onClick={() => setView('login')}
            className="text-xs text-slate-400 hover:text-white transition-colors"
          >
            &larr; Ke Login
          </button>
        </div>

        {/* Wizard Steps Progress Indicator */}
        <div className="flex items-center gap-4 mb-8">
          <div className={`flex-1 flex items-center gap-2 p-2.5 rounded-xl border ${step === 1 ? 'bg-blue-600/20 border-blue-500 text-blue-300' : 'bg-slate-800 border-slate-700 text-slate-400'}`}>
            <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">
              1
            </div>
            <span className="text-xs font-semibold">Profil Sekolah</span>
          </div>

          <div className={`flex-1 flex items-center gap-2 p-2.5 rounded-xl border ${step === 2 ? 'bg-blue-600/20 border-blue-500 text-blue-300' : 'bg-slate-800 border-slate-700 text-slate-400'}`}>
            <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">
              2
            </div>
            <span className="text-xs font-semibold">Admin & SaaS Key</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {step === 1 ? (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  {t('schoolNameLabel')}
                </label>
                <div className="relative">
                  <SchoolIcon className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    required
                    value={schoolName}
                    onChange={(e) => setSchoolName(e.target.value)}
                    placeholder="Contoh: SMA Garuda Cendekia Jakarta"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    {t('schoolLevelLabel')}
                  </label>
                  <select
                    value={schoolLevel}
                    onChange={(e) => setSchoolLevel(e.target.value as SchoolLevel)}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:border-blue-500"
                  >
                    {levels.map((lvl) => (
                      <option key={lvl} value={lvl}>
                        {lvl}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    {t('npsnLabel')}
                  </label>
                  <input
                    type="text"
                    required
                    value={npsn}
                    onChange={(e) => setNpsn(e.target.value)}
                    placeholder="Contoh: 20108922"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Alamat Lengkap Instansi
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Jl. Kemang Selatan No. 12, Jakarta Selatan"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Email Resmi Sekolah
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                    <input
                      type="email"
                      required
                      value={schoolEmail}
                      onChange={(e) => setSchoolEmail(e.target.value)}
                      placeholder="admin@sekolah.sch.id"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Nomor Telepon / WA Sekretariat
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="021-7890123"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all flex items-center gap-2"
                >
                  <span>Lanjut ke Akun Admin & Lisensi</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Nama Lengkap Admin Utama (Kepala Sekolah / Operator)
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    required
                    value={adminName}
                    onChange={(e) => setAdminName(e.target.value)}
                    placeholder="Contoh: Drs. Ahmad Dahlan, M.Pd."
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Email Akun Admin
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                  <input
                    type="email"
                    required
                    value={adminEmail}
                    onChange={(e) => setAdminEmail(e.target.value)}
                    placeholder="kepsek@sekolah.sch.id"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Kata Sandi Akses
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Minimal 8 Karakter"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  {t('licenseKeyLabel')}
                </label>
                <div className="relative">
                  <Key className="w-4 h-4 text-amber-500 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    value={licenseKey}
                    onChange={(e) => setLicenseKey(e.target.value)}
                    placeholder="Kosongkan jika menggunakan Trial Gratis 14 Hari"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-800 border border-amber-500/40 text-xs text-amber-300 placeholder-slate-500 focus:outline-none"
                  />
                </div>
                <p className="text-[10px] text-slate-400 mt-1">
                  *Jika belum memiliki License Key, sistem akan otomatis membuatkan Kunci Trial 14 Hari.
                </p>
              </div>

              <div className="pt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700 transition-all flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Kembali</span>
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs font-bold hover:shadow-lg hover:shadow-emerald-600/25 transition-all flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <span>Mendaftarkan Instansi...</span>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Selesaikan Pendaftaran</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
