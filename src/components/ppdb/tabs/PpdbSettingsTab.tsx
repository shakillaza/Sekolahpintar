import React from 'react';
import { Settings, Shield, Sliders, Bell, Sparkles } from 'lucide-react';

export const PpdbSettingsTab: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <Settings className="w-4 h-4 text-slate-700 dark:text-slate-300" />
            <span>Pengaturan Sistem & Aturan Aturan PPDB Multi-Tenant</span>
          </h3>
          <p className="text-xs text-slate-500">
            Pengaturan batasan kuota, integrasi AI OCR prompt, & pemicu notifikasi otomatis.
          </p>
        </div>
      </div>

      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6 max-w-2xl">
        <div className="space-y-4 text-xs">
          <h4 className="font-extrabold text-slate-900 dark:text-white flex items-center gap-2 text-sm border-b pb-2">
            <Sliders className="w-4 h-4 text-blue-600" />
            <span>Aturan Pendaftaran & Batas Kuota</span>
          </h4>

          <label className="flex items-center justify-between cursor-pointer p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50">
            <div>
              <div className="font-bold text-slate-800 dark:text-slate-200">Kunci Pendaftaran Otomatis Saat Kuota Penuh</div>
              <div className="text-[10px] text-slate-400">Tutup formulir secara otomatis saat target kuota gelombang tercapai</div>
            </div>
            <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 rounded" />
          </label>

          <label className="flex items-center justify-between cursor-pointer p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50">
            <div>
              <div className="font-bold text-slate-800 dark:text-slate-200">Wajibkan Verifikasi NIK dengan Dukcapil via AI</div>
              <div className="text-[10px] text-slate-400">Pemeriksaan format NIK 16 digit dan pencegahan duplikasi NIK</div>
            </div>
            <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 rounded" />
          </label>

          <h4 className="font-extrabold text-slate-900 dark:text-white flex items-center gap-2 text-sm border-b pb-2 pt-2">
            <Bell className="w-4 h-4 text-emerald-600" />
            <span>Pemicu Notifikasi Otomatis (WhatsApp & Email)</span>
          </h4>

          <label className="flex items-center justify-between cursor-pointer p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50">
            <div>
              <div className="font-bold text-slate-800 dark:text-slate-200">Kirim Kwitansi WA Saat Pembayaran Lunas</div>
              <div className="text-[10px] text-slate-400">Kirim pesan WhatsApp otomatis berisikan link bukti kwitansi</div>
            </div>
            <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 rounded" />
          </label>

          <button
            onClick={() => alert('Pengaturan PPDB berhasil disimpan!')}
            className="px-6 py-2.5 rounded-2xl text-xs font-black bg-blue-600 text-white hover:bg-blue-700 shadow-md transition-all"
          >
            Simpan Seluruh Pengaturan
          </button>
        </div>
      </div>
    </div>
  );
};
