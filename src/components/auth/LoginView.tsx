import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';
import {
  Cpu,
  Lock,
  Mail,
  Eye,
  EyeOff,
  ShieldCheck,
  ArrowRight,
  GraduationCap,
  Sparkles,
  Key
} from 'lucide-react';

export const LoginView: React.FC = () => {
  const { setView, setRole, addToast, t, currentRole } = useApp();
  const [email, setEmail] = useState('kepsek@garudacendekia.sch.id');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [selectedRole, setSelectedRole] = useState<UserRole>(currentRole);
  const [loading, setLoading] = useState(false);

  const rolesPreset: { id: UserRole; nameKey: string; icon: string; defaultEmail: string }[] = [
    { id: 'kepala_sekolah', nameKey: 'kepala_sekolah', icon: '🎓', defaultEmail: 'kepsek@garudacendekia.sch.id' },
    { id: 'guru', nameKey: 'guru', icon: '📚', defaultEmail: 'siti.rahmawati@garudacendekia.sch.id' },
    { id: 'bendahara', nameKey: 'bendahara', icon: '💰', defaultEmail: 'keuangan@garudacendekia.sch.id' },
    { id: 'super_admin', nameKey: 'super_admin', icon: '👑', defaultEmail: 'superadmin@smartschool.id' },
    { id: 'yayasan', nameKey: 'yayasan', icon: '🏛️', defaultEmail: 'ketua@yayasan-pendidikan.or.id' },
    { id: 'wali_kelas', nameKey: 'wali_kelas', icon: '📋', defaultEmail: 'budi.santoso@garudacendekia.sch.id' },
    { id: 'tata_usaha', nameKey: 'tata_usaha', icon: '📁', defaultEmail: 'tu@garudacendekia.sch.id' },
    { id: 'operator', nameKey: 'operator', icon: '⚙️', defaultEmail: 'operator@garudacendekia.sch.id' },
    { id: 'orang_tua', nameKey: 'orang_tua', icon: '👨‍👩‍👧', defaultEmail: 'agus.gunawan@gmail.com' },
    { id: 'siswa', nameKey: 'siswa', icon: '🎒', defaultEmail: 'rizky.gunawan@siswa.garudacendekia.sch.id' },
  ];

  const handleRoleSelect = (roleObj: typeof rolesPreset[0]) => {
    setSelectedRole(roleObj.id);
    setEmail(roleObj.defaultEmail);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setRole(selectedRole);
      setLoading(false);
      addToast(
        'success',
        'Autentikasi Berhasil',
        `Selamat datang kembali! Token JWT disetujui untuk role ${t(selectedRole)}.`
      );
      setView('dashboard');
    }, 800);
  };

  return (
    <div id="login-view-container" className="min-h-screen w-full bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Decorative Gradients */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="w-full max-w-4xl rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl backdrop-blur-xl grid grid-cols-1 lg:grid-cols-12 overflow-hidden z-10">
        {/* Left Side Banner */}
        <div className="lg:col-span-5 p-8 bg-gradient-to-br from-blue-900 via-slate-900 to-indigo-950 text-white flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-800 relative">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-amber-500 p-0.5 shadow-lg">
                <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
                  <Cpu className="w-5 h-5 text-amber-400" />
                </div>
              </div>
              <div>
                <h2 className="font-extrabold text-base tracking-tight text-white">
                  Smart AI School
                </h2>
                <p className="text-[10px] text-amber-400 font-semibold uppercase tracking-wider">
                  One Platform. AI Powered.
                </p>
              </div>
            </div>

            <div>
              <h1 className="text-xl font-extrabold text-white leading-snug">
                Portal Masuk Multi-Role Enterprise
              </h1>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                Platform Operating System sekolah terpadu yang dirancang untuk seluruh stakeholder pendidikan di Indonesia.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              {[
                'Role-Based Access Control (RBAC 10 Roles)',
                'Enkripsi JWT & Audit Log Keamanan',
                'Integrasi AI Assistant Gemini 3.6',
                'Multi-Language (ID & EN)',
              ].map((ft, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-slate-200">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{ft}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-6 border-t border-slate-800/80 text-[11px] text-slate-400 flex items-center justify-between">
            <span>Enterprise White Label v1.0</span>
            <button
              onClick={() => setView('landing')}
              className="text-amber-400 hover:underline font-semibold"
            >
              &larr; Kembali ke Landing Page
            </button>
          </div>
        </div>

        {/* Right Side Login Form */}
        <div className="lg:col-span-7 p-6 sm:p-8 space-y-6">
          <div>
            <h2 className="text-lg font-bold text-white">{t('loginTitle')}</h2>
            <p className="text-xs text-slate-400 mt-1">{t('loginSubtitle')}</p>
          </div>

          {/* Role Quick Selector Grid */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
              Pilih Role Pengguna (Demo RBAC)
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {rolesPreset.map((r) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => handleRoleSelect(r)}
                  className={`p-2 rounded-xl text-center border transition-all text-xs ${
                    selectedRole === r.id
                      ? 'bg-blue-600/30 border-blue-500 text-white font-bold shadow-md shadow-blue-600/20'
                      : 'bg-slate-800/60 border-slate-700/60 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <div className="text-base mb-0.5">{r.icon}</div>
                  <div className="text-[10px] truncate">{t(r.nameKey)}</div>
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                {t('emailOrNiptk')}
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                <input
                  type="text"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@sekolah.sch.id / NUPTK / NISN"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-slate-300">
                  {t('password')}
                </label>
                <button
                  type="button"
                  onClick={() => setView('forgot_password')}
                  className="text-[11px] font-medium text-amber-400 hover:underline"
                >
                  {t('forgotPasswordQuestion')}
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3 text-slate-500 hover:text-slate-300"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-400">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded bg-slate-800 border-slate-700 text-blue-600 focus:ring-blue-500"
                />
                <span>{t('rememberMe')}</span>
              </label>

              <span className="text-[11px] text-emerald-400 font-mono">JWT SSO Ready</span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-600 text-white font-bold text-xs shadow-lg shadow-blue-600/30 hover:scale-[1.01] active:scale-98 transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <span>Memverifikasi Token Keamanan...</span>
              ) : (
                <>
                  <span>{t('login')} ({t(selectedRole)})</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="pt-4 border-t border-slate-800 text-center text-xs text-slate-400 flex items-center justify-between">
            <span>Belum mendaftarkan sekolah Anda?</span>
            <button
              onClick={() => setView('register')}
              className="font-bold text-amber-400 hover:underline flex items-center gap-1"
            >
              <span>{t('register')}</span>
              <Key className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
