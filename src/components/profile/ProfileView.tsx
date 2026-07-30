import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { User, Shield, Key, Mail, Phone, MapPin, Camera, Smartphone, CheckCircle2 } from 'lucide-react';

export const ProfileView: React.FC = () => {
  const { user, school, addToast, t } = useApp();
  const [name, setName] = useState(user.name);
  const [phone, setPhone] = useState(user.phone || '0812-3456-7890');
  const [address, setAddress] = useState(user.address || 'Jakarta');
  const [is2FA, setIs2FA] = useState(user.isTwoFactorEnabled || true);

  const avatars = [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
  ];

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    addToast('success', 'Profil Diperbarui', 'Data akun Anda telah berhasil disimpan.');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12 animate-in fade-in duration-200">
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row items-center gap-6 border-b border-slate-100 dark:border-slate-800 pb-6">
          <div className="relative group">
            <img
              src={user.avatarUrl || avatars[0]}
              alt={user.name}
              className="w-24 h-24 rounded-3xl object-cover ring-4 ring-amber-400 shadow-lg"
            />
            <button className="absolute bottom-0 right-0 p-2 rounded-xl bg-blue-600 text-white shadow-md hover:bg-blue-500 transition-colors">
              <Camera className="w-4 h-4" />
            </button>
          </div>

          <div className="text-center sm:text-left space-y-1">
            <div className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-amber-400/20 text-amber-700 dark:text-amber-300 border border-amber-400/30">
              {t(user.role)}
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">{user.name}</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">{user.email}</p>
            <p className="text-xs text-blue-600 dark:text-blue-400 font-semibold">{school.name}</p>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Nama Lengkap
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                NUPTK / NIP / NISN
              </label>
              <input
                type="text"
                disabled
                value={user.nip_nisn || '-'}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-xs text-slate-500 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Nomor Telepon
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Alamat
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Smartphone className="w-5 h-5 text-emerald-500" />
              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-white">
                  Autentikasi Dua Langkah (2FA)
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Perkuat keamanan login dengan kode OTP WhatsApp
                </p>
              </div>
            </div>
            <input
              type="checkbox"
              checked={is2FA}
              onChange={(e) => setIs2FA(e.target.checked)}
              className="w-5 h-5 rounded text-blue-600 focus:ring-blue-500"
            />
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Simpan Perubahan Profil</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
