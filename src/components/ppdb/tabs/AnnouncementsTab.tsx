import React, { useState } from 'react';
import { PpdbApplicant } from '../../../types/ppdbTypes';
import { Megaphone, Send, Mail, MessageSquare, Globe, CheckCircle2, RefreshCw } from 'lucide-react';

interface AnnouncementsTabProps {
  applicants: PpdbApplicant[];
}

export const AnnouncementsTab: React.FC<AnnouncementsTabProps> = ({ applicants }) => {
  const [broadcastMessage, setBroadcastMessage] = useState(
    'Selamat! Anda dinyatakan LULUS dalam Seleksi PPDB Online 2026/2027. Silakan lakukan Daftar Ulang sebelum tanggal 28 Februari 2026.'
  );

  const [isSending, setIsSending] = useState(false);
  const [sentCount, setSentCount] = useState<number | null>(null);

  const passedApplicants = applicants.filter((a) => a.status === 'Passed' || a.status === 'Re_Enrolled');

  const handleSimulateBroadcast = () => {
    setIsSending(true);
    setSentCount(null);
    setTimeout(() => {
      setIsSending(false);
      setSentCount(passedApplicants.length);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <Megaphone className="w-4 h-4 text-pink-600" />
            <span>Pusat Pengumuman & Broadcast Notifikasi (WA / Email / Web Portal)</span>
          </h3>
          <p className="text-xs text-slate-500">
            Publikasikan daftar siswa diterima ke portal website dan kirim pesan otomatis via WhatsApp Gateway & Email SMTP.
          </p>
        </div>
      </div>

      {/* Broadcast Form Card */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4 max-w-3xl">
        <h4 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
          <Send className="w-4 h-4 text-blue-600" /> Kirim Blast Pengumuman Kelulusan
        </h4>

        <div className="space-y-3 text-xs">
          <div>
            <label className="font-bold text-slate-700 dark:text-slate-300">Target Penerima Broadcast</label>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 font-bold text-blue-600">
              Calon Siswa Lulus ({passedApplicants.length} Orang)
            </div>
          </div>

          <div>
            <label className="font-bold text-slate-700 dark:text-slate-300">Template Pesan Pengumuman</label>
            <textarea
              value={broadcastMessage}
              onChange={(e) => setBroadcastMessage(e.target.value)}
              className="w-full mt-1 p-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
              rows={4}
            />
          </div>

          <div className="flex items-center gap-4 text-xs pt-1">
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 rounded" />
              <Globe className="w-4 h-4 text-blue-500" /> <span>Portal Website</span>
            </label>
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 rounded" />
              <MessageSquare className="w-4 h-4 text-emerald-500" /> <span>WhatsApp Gateway</span>
            </label>
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 rounded" />
              <Mail className="w-4 h-4 text-purple-500" /> <span>Email Notification</span>
            </label>
          </div>

          <button
            onClick={handleSimulateBroadcast}
            disabled={isSending}
            className="px-6 py-2.5 rounded-2xl text-xs font-black bg-pink-600 hover:bg-pink-700 text-white shadow-md transition-all flex items-center gap-2"
          >
            <Send className={`w-4 h-4 ${isSending ? 'animate-bounce' : ''}`} />
            <span>{isSending ? 'Mengirim Broadcast...' : 'Kirim Blast Sekarang'}</span>
          </button>

          {sentCount !== null && (
            <div className="p-3.5 rounded-2xl bg-emerald-50 text-emerald-800 font-bold flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>Berhasil mengirim pesan broadcast ke {sentCount} orang tua/siswa via WhatsApp & Email!</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
