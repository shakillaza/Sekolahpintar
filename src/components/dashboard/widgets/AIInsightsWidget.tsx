import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { Sparkles, Bot, Loader2, ArrowRight, RefreshCw, CheckCircle2 } from 'lucide-react';

export const AIInsightsWidget: React.FC = () => {
  const { currentRole, school, setIsAiModalOpen, t } = useApp();
  const [insights, setInsights] = useState<string | null>(
    `Berikut 3 poin rekomendasi AI untuk **${t(currentRole)}** di **${school.name}**:
1. **Rekomendasi Presensi**: Tingkat kehadiran mencapai 96.4%. Pertahankan program poin positif untuk kelas dengan absensi 100%.
2. **Optimalisasi SPP**: 88% tagihan bulan Juli terbayar. Sarankan pengiriman pengingat WA otomatis untuk 12% siswa tersisa.
3. **Pengembangan Kurikulum**: Hasil evaluasi kuis AI menunjukkan peningkatan pemahaman materi STEM sebesar +14%.`
  );
  const [loading, setLoading] = useState(false);

  const handleRefreshInsights = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/ai/generate-insights', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          role: currentRole,
          stats: {
            students: school.studentsCount,
            teachers: school.teachersCount,
            revenue: 'Rp 385M',
            attendance: '96.4%',
          },
        }),
      });

      const data = await response.json();
      if (data.insights) {
        setInsights(data.insights);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 rounded-3xl bg-gradient-to-br from-blue-900 via-slate-900 to-indigo-950 border border-blue-800/40 text-white shadow-xl relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-blue-800/40 pb-4 mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-amber-500/20 text-amber-300 border border-amber-500/30">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
              {t('aiAssistantTitle')}
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-400 text-slate-950">
                Phase 1 AI
              </span>
            </h3>
            <p className="text-xs text-slate-300">{t('aiAssistantSubtitle')}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleRefreshInsights}
            disabled={loading}
            className="px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700/80 transition-all flex items-center gap-1.5"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Regenerasi Insight</span>
          </button>

          <button
            onClick={() => setIsAiModalOpen(true)}
            className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 font-extrabold text-xs shadow-md transition-all flex items-center gap-1"
          >
            <span>Tanya AI</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-3">
        {loading ? (
          <div className="p-6 text-center space-y-2">
            <Loader2 className="w-6 h-6 animate-spin text-amber-400 mx-auto" />
            <p className="text-xs text-slate-300">
              Menghubungkan ke Gemini 3.6 Flash Server untuk analisis terbaru...
            </p>
          </div>
        ) : (
          <div className="p-4 rounded-2xl bg-slate-950/40 border border-slate-800 text-xs text-slate-200 leading-relaxed whitespace-pre-wrap">
            {insights}
          </div>
        )}
      </div>
    </div>
  );
};
