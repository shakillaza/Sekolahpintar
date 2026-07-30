import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Mail, ArrowRight, ShieldAlert, KeyRound } from 'lucide-react';

export const ForgotPasswordView: React.FC = () => {
  const { setView, addToast } = useApp();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    addToast(
      'info',
      'Instruksi Reset Terkirim',
      `Tautan pemulihan kata sandi telah dikirimkan ke email ${email}.`
    );
  };

  return (
    <div className="min-h-screen w-full bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="w-full max-w-md rounded-3xl bg-slate-900 border border-slate-800 p-8 shadow-2xl z-10 space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center mx-auto">
            <KeyRound className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-white">Lupa Kata Sandi</h2>
          <p className="text-xs text-slate-400">
            Masukkan email terdaftar untuk menerima instruksi pemulihan kata sandi.
          </p>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Email Terdaftar di Sekolah
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nama@sekolah.sch.id"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/20 transition-all flex items-center justify-center gap-2"
            >
              <span>Kirim Tautan Reset</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        ) : (
          <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs space-y-3 text-center">
            <p>
              Tautan verifikasi telah terkirim ke <span className="font-bold underline">{email}</span>.
              Silakan periksa kotak masuk atau folder spam Anda.
            </p>
            <button
              onClick={() => setView('reset_password')}
              className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-all"
            >
              Simulasi Buka Tautan Reset
            </button>
          </div>
        )}

        <div className="pt-2 text-center">
          <button
            onClick={() => setView('login')}
            className="text-xs text-slate-400 hover:text-white transition-colors"
          >
            &larr; Kembali ke Halaman Login
          </button>
        </div>
      </div>
    </div>
  );
};
