import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Lock, CheckCircle2, ShieldCheck } from 'lucide-react';

export const ResetPasswordView: React.FC = () => {
  const { setView, addToast } = useApp();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const calculateStrength = () => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score;
  };

  const strength = calculateStrength();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      addToast('error', 'Kata Sandi Tidak Cocok', 'Harap pastikan konfirmasi kata sandi cocok.');
      return;
    }

    addToast('success', 'Reset Berhasil', 'Kata sandi Anda telah diperbarui. Silakan login kembali.');
    setView('login');
  };

  return (
    <div className="min-h-screen w-full bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="w-full max-w-md rounded-3xl bg-slate-900 border border-slate-800 p-8 shadow-2xl z-10 space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center justify-center mx-auto">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-white">Buat Kata Sandi Baru</h2>
          <p className="text-xs text-slate-400">
            Masukkan kata sandi baru yang aman untuk akun Anda.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Kata Sandi Baru
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimal 8 karakter"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Strength Meter */}
            <div className="mt-2 space-y-1">
              <div className="flex gap-1 h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all ${
                    strength >= 1 ? 'bg-rose-500 w-1/4' : 'w-0'
                  }`}
                ></div>
                <div
                  className={`h-full transition-all ${
                    strength >= 2 ? 'bg-amber-500 w-1/4' : 'w-0'
                  }`}
                ></div>
                <div
                  className={`h-full transition-all ${
                    strength >= 3 ? 'bg-blue-500 w-1/4' : 'w-0'
                  }`}
                ></div>
                <div
                  className={`h-full transition-all ${
                    strength >= 4 ? 'bg-emerald-500 w-1/4' : 'w-0'
                  }`}
                ></div>
              </div>
              <p className="text-[10px] text-slate-400 text-right">
                Kekuatan:{' '}
                {strength === 0
                  ? 'Sangat Lemah'
                  : strength <= 2
                  ? 'Sedang'
                  : strength === 3
                  ? 'Kuat'
                  : 'Sangat Kuat'}
              </p>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Konfirmasi Kata Sandi Baru
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Ulangi kata sandi"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-blue-600/20 transition-all flex items-center justify-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Simpan Kata Sandi Baru</span>
          </button>
        </form>

        <div className="text-center pt-2">
          <button
            onClick={() => setView('login')}
            className="text-xs text-slate-400 hover:text-white transition-colors"
          >
            &larr; Batal & Ke Halaman Login
          </button>
        </div>
      </div>
    </div>
  );
};
