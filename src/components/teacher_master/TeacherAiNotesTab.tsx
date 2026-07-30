import React, { useState } from 'react';
import { Sparkles, AlertTriangle, CheckCircle2, TrendingUp, RefreshCw, Zap, ShieldCheck } from 'lucide-react';
import { TeacherAiNote, TeacherMasterItem } from '../../types/teacherTypes';

interface TeacherAiNotesTabProps {
  aiNotes: TeacherAiNote[];
  teachers: TeacherMasterItem[];
}

export const TeacherAiNotesTab: React.FC<TeacherAiNotesTabProps> = ({ aiNotes, teachers }) => {
  const [selectedTeacherId, setSelectedTeacherId] = useState<string>('ALL');
  const [isGenerating, setIsGenerating] = useState(false);

  const filteredNotes = aiNotes.filter(n => selectedTeacherId === 'ALL' || n.teacherId === selectedTeacherId);

  const handleTriggerAiAnalysis = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
    }, 1200);
  };

  return (
    <div className="space-y-4">
      {/* Top AI Engine Header */}
      <div className="bg-gradient-to-r from-purple-950 via-slate-900 to-indigo-950 text-white p-6 rounded-2xl border border-purple-800/40 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs font-semibold mb-2 border border-purple-400/30">
            <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
            Smart AI Assistant Pendidik & Pegawai
          </div>
          <h2 className="text-xl font-black text-white">Analisis Beban Kerja, Kinerja & Rekomendasi Pelatihan</h2>
          <p className="text-xs text-purple-200/80 mt-1 max-w-xl">
            Deteksi otomatis guru dengan beban berlebih (Overloaded), analisis penurunan kinerja, rekomendasi distribusi jadwal, serta ringkasan evaluasi eksekutif.
          </p>
        </div>
        <button
          onClick={handleTriggerAiAnalysis}
          disabled={isGenerating}
          className="px-4 py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs rounded-xl shadow-lg transition-all flex items-center gap-2 shrink-0"
        >
          <RefreshCw className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
          {isGenerating ? 'Memproses AI Analysis...' : 'Jalankan Smart AI Sync'}
        </button>
      </div>

      <div className="flex justify-end">
        <select
          value={selectedTeacherId}
          onChange={(e) => setSelectedTeacherId(e.target.value)}
          className="px-3 py-2 text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-300"
        >
          <option value="ALL">Semua Guru & Pegawai</option>
          {teachers.map(t => <option key={t.id} value={t.id}>{t.fullName}</option>)}
        </select>
      </div>

      <div className="space-y-4">
        {filteredNotes.map((note) => (
          <div key={note.id} className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-purple-200/80 dark:border-purple-900/40 shadow-sm space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <h3 className="font-extrabold text-slate-900 dark:text-slate-100 text-base">{note.teacherName}</h3>
                <span className="text-[11px] text-slate-400">Terakhir Diperbarui AI: {note.lastUpdated}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                  note.overloadStatus === 'Overloaded' ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300' : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                }`}>
                  {note.overloadStatus === 'Overloaded' ? '⚠ Overloaded Workload' : '✓ Normal Load'}
                </span>
                <span className="px-3 py-1 text-xs font-bold bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300 rounded-full">
                  Produktivitas: {note.productivityRating}
                </span>
              </div>
            </div>

            <div className="bg-purple-50/70 dark:bg-purple-950/30 p-4 rounded-xl border border-purple-200/50 dark:border-purple-800/40 text-xs text-purple-900 dark:text-purple-200 space-y-1">
              <span className="font-bold uppercase tracking-wider text-[10px] text-purple-600 dark:text-purple-400 block">
                Executive Profile Summary (AI)
              </span>
              <p className="leading-relaxed">{note.profileSummary}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200/80 dark:border-slate-800 space-y-2">
                <h4 className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-amber-500" /> Analisis Beban Mengajar & Rekomendasi Jadwal
                </h4>
                <p className="text-slate-600 dark:text-slate-300">{note.workloadAnalysis}</p>
                <p className="text-slate-500 italic">{note.scheduleDistributionRec}</p>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200/80 dark:border-slate-800 space-y-2">
                <h4 className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Rekomendasi Pelatihan & Pengembangan
                </h4>
                <ul className="space-y-1 text-slate-600 dark:text-slate-300">
                  {note.trainingRecommendations.map((t, idx) => (
                    <li key={idx} className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="p-4 bg-emerald-50/50 dark:bg-emerald-950/20 rounded-xl border border-emerald-200 dark:border-emerald-900/40 text-xs">
              <h4 className="font-bold text-emerald-900 dark:text-emerald-300 mb-1">Ringkasan Evaluasi Otomatis</h4>
              <p className="text-emerald-800 dark:text-emerald-200">{note.autoEvaluationSummary}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
