import React, { useState } from 'react';
import {
  Shield,
  Key,
  Lock,
  Smartphone,
  Globe,
  CheckCircle2,
  AlertTriangle,
  Save,
  Server,
  Zap,
  Check
} from 'lucide-react';

export const SecuritySettingsTab: React.FC = () => {
  const [allowEmailLogin, setAllowEmailLogin] = useState(true);
  const [allowUsernameLogin, setAllowUsernameLogin] = useState(true);
  const [allowPhoneLogin, setAllowPhoneLogin] = useState(true);
  const [allowGoogleOAuth, setAllowGoogleOAuth] = useState(true);
  const [allowMicrosoftSSO, setAllowMicrosoftSSO] = useState(true);

  const [minPasswordLength, setMinPasswordLength] = useState(8);
  const [requireSymbols, setRequireSymbols] = useState(true);
  const [requireNumbers, setRequireNumbers] = useState(true);
  const [passwordExpiryDays, setPasswordExpiryDays] = useState(90);

  const [mfaMandatoryForAdmins, setMfaMandatoryForAdmins] = useState(true);
  const [defaultMfaMethod, setDefaultMfaMethod] = useState('email_otp');

  const [sessionTimeoutMinutes, setSessionTimeoutMinutes] = useState(60);
  const [maxLoginAttempts, setMaxLoginAttempts] = useState(5);
  const [lockoutDurationMinutes, setLockoutDurationMinutes] = useState(15);

  const [isSaved, setIsSaved] = useState(false);

  const handleSaveSecurity = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Top Saved Banner */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center justify-between">
        <div>
          <h3 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <Shield className="w-4 h-4 text-emerald-500" />
            <span>Konfigurasi Keamanan Authentication & Security Policies</span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Pengaturan standar enkripsi, metode login, JWT token, rate limiting, dan kebijakan MFA.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {isSaved && (
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 animate-fade-in">
              <CheckCircle2 className="w-4 h-4" /> Kebijakan Keamanan Berhasil Disimpan!
            </span>
          )}
          <button
            onClick={handleSaveSecurity}
            className="px-5 py-2.5 rounded-xl text-xs font-extrabold bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-600/20 transition-all flex items-center gap-1.5"
          >
            <Save className="w-4 h-4" />
            <span>Simpan Kebijakan Keamanan</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Section 1: Allowed Login Methods */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
            <Globe className="w-4 h-4 text-blue-500" />
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 dark:text-white">
              Metode Login & Social SSO
            </h4>
          </div>

          <div className="space-y-3 text-xs">
            <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 cursor-pointer">
              <div>
                <span className="font-bold text-slate-800 dark:text-slate-200">Email & Password</span>
                <p className="text-[10px] text-slate-500">Login standar menggunakan alamat email resmi sekolah</p>
              </div>
              <input
                type="checkbox"
                checked={allowEmailLogin}
                onChange={(e) => setAllowEmailLogin(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 cursor-pointer">
              <div>
                <span className="font-bold text-slate-800 dark:text-slate-200">Username & Password</span>
                <p className="text-[10px] text-slate-500">Login ringkas untuk siswa / pegawai (e.g. ahmad.fauzi)</p>
              </div>
              <input
                type="checkbox"
                checked={allowUsernameLogin}
                onChange={(e) => setAllowUsernameLogin(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 cursor-pointer">
              <div>
                <span className="font-bold text-slate-800 dark:text-slate-200">Nomor HP / OTP WhatsApp</span>
                <p className="text-[10px] text-slate-500">Login cepat wali murid menggunakan verifikasi OTP WA</p>
              </div>
              <input
                type="checkbox"
                checked={allowPhoneLogin}
                onChange={(e) => setAllowPhoneLogin(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 cursor-pointer">
              <div>
                <span className="font-bold text-slate-800 dark:text-slate-200">Google Workspace SSO (OAuth2)</span>
                <p className="text-[10px] text-slate-500">Integrasi login 1-click dengan akun Google sekolah</p>
              </div>
              <input
                type="checkbox"
                checked={allowGoogleOAuth}
                onChange={(e) => setAllowGoogleOAuth(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 cursor-pointer">
              <div>
                <span className="font-bold text-slate-800 dark:text-slate-200">Microsoft 365 SSO</span>
                <p className="text-[10px] text-slate-500">Integrasi SSO Microsoft Azure AD sekolah</p>
              </div>
              <input
                type="checkbox"
                checked={allowMicrosoftSSO}
                onChange={(e) => setAllowMicrosoftSSO(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded"
              />
            </label>
          </div>
        </div>

        {/* Section 2: Password Complexity */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
            <Lock className="w-4 h-4 text-amber-500" />
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 dark:text-white">
              Kebijakan Kompleksitas Password
            </h4>
          </div>

          <div className="space-y-3 text-xs">
            <div className="space-y-1">
              <label className="font-bold text-slate-800 dark:text-slate-200">Panjang Minimal Password</label>
              <input
                type="number"
                value={minPasswordLength}
                onChange={(e) => setMinPasswordLength(Number(e.target.value))}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-800 dark:text-slate-200">Masa Kadaluarsa Password (Hari)</label>
              <input
                type="number"
                value={passwordExpiryDays}
                onChange={(e) => setPasswordExpiryDays(Number(e.target.value))}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs"
              />
            </div>

            <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 cursor-pointer">
              <span className="font-bold text-slate-800 dark:text-slate-200">Wajib Karakter Simbol (@#$%)</span>
              <input
                type="checkbox"
                checked={requireSymbols}
                onChange={(e) => setRequireSymbols(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 cursor-pointer">
              <span className="font-bold text-slate-800 dark:text-slate-200">Wajib Angka (0-9)</span>
              <input
                type="checkbox"
                checked={requireNumbers}
                onChange={(e) => setRequireNumbers(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded"
              />
            </label>
          </div>
        </div>

        {/* Section 3: MFA & Session Security */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
            <Smartphone className="w-4 h-4 text-emerald-500" />
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 dark:text-white">
              Multi-Factor Authentication (MFA) & Sesi
            </h4>
          </div>

          <div className="space-y-3 text-xs">
            <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 cursor-pointer">
              <div>
                <span className="font-bold text-slate-800 dark:text-slate-200">Wajibkan MFA untuk Super Admin & Kepala Sekolah</span>
                <p className="text-[10px] text-slate-500">Meningkatkan pertahanan akun dengan hak akses tinggi</p>
              </div>
              <input
                type="checkbox"
                checked={mfaMandatoryForAdmins}
                onChange={(e) => setMfaMandatoryForAdmins(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded"
              />
            </label>

            <div className="space-y-1">
              <label className="font-bold text-slate-800 dark:text-slate-200">Metode Default MFA OTP</label>
              <select
                value={defaultMfaMethod}
                onChange={(e) => setDefaultMfaMethod(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs"
              >
                <option value="email_otp">Email OTP (Kode 6 Digit ke Email Resmi)</option>
                <option value="sms_otp">SMS / WhatsApp OTP</option>
                <option value="totp">Authenticator App (Google Authenticator / Authy)</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-800 dark:text-slate-200">Session Timeout Inactivity (Menit)</label>
              <input
                type="number"
                value={sessionTimeoutMinutes}
                onChange={(e) => setSessionTimeoutMinutes(Number(e.target.value))}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs"
              />
            </div>
          </div>
        </div>

        {/* Section 4: Brute Force & Rate Limiting */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
            <Zap className="w-4 h-4 text-rose-500" />
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 dark:text-white">
              Rate Limiting & Brute-Force Protection
            </h4>
          </div>

          <div className="space-y-3 text-xs">
            <div className="space-y-1">
              <label className="font-bold text-slate-800 dark:text-slate-200">Batas Maksimal Percobaan Login Gagal</label>
              <input
                type="number"
                value={maxLoginAttempts}
                onChange={(e) => setMaxLoginAttempts(Number(e.target.value))}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-800 dark:text-slate-200">Durasi Lockout Akun Terkunci (Menit)</label>
              <input
                type="number"
                value={lockoutDurationMinutes}
                onChange={(e) => setLockoutDurationMinutes(Number(e.target.value))}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs"
              />
            </div>

            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 space-y-1 text-emerald-800 dark:text-emerald-300">
              <span className="font-extrabold flex items-center gap-1">
                <Check className="w-4 h-4 text-emerald-500" /> Proteksi CSRF & XSS Sanctum Aktif
              </span>
              <p className="text-[10px]">
                Seluruh request HTTP diproteksi dengan CSRF Token Cookie dan XSS Sanitizer bawaan Express Enterprise.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
