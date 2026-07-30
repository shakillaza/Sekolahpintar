import React, { useState } from 'react';
import { StudentAiNote, StudentMasterItem } from '../../../types/studentTypes';
import { Sparkles, Brain, AlertTriangle, TrendingUp, RefreshCw, CheckCircle2, ShieldCheck, Heart, Lightbulb } from 'lucide-react';

interface CatatanAiTabProps {
  students: StudentMasterItem[];
  selectedStudent: StudentMasterItem;
  aiNotes: StudentAiNote[];
  onSelectStudent: (s: StudentMasterItem) => void;
  onUpdateAiNotes: (note: StudentAiNote) => void;
}

export const CatatanAiTab: React.FC<CatatanAiTabProps> = ({
  students,
  selectedStudent,
  aiNotes,
  onSelectStudent,
  onUpdateAiNotes,
}) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const note = aiNotes.find((n) => n.studentId === selectedStudent.id) || {
    id: `ain-${Date.now()}`,
    studentId: selectedStudent.id,
    studentName: selectedStudent.fullName,
    summary: `${selectedStudent.fullName} menunjukkan performa belajar yang stabil dengan rata-rata nilai ${selectedStudent.gpaAverage}.`,
    academicProgressAnalysis: `Tren perkembangan akademik tergolong baik di kelas ${selectedStudent.className}.`,
    performanceDeclineRisk: 'Rendah',
    dropoutRiskPercentage: selectedStudent.aiDropoutRiskScore || 1.0,
    attendancePatternInsight: `Tingkat kehadiran mencapai ${selectedStudent.attendancePercentage}%. Tidak ada anomali bolos jam pelajaran.`,
    behavioralCorrelation: 'Tingkat partisipasi tinggi dalam kegiatan ekstrakurikuler dan organisasi.',
    recommendedActions: [
      'Pertahankan pola belajar harian',
      'Libatkan dalam kelompok tutor sebaya',
    ],
    lastUpdated: new Date().toISOString().replace('T', ' ').substring(0, 16),
  };

  const handleGenerateSummary = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const updatedNote: StudentAiNote = {
        ...note,
        summary: `[AI Fresh Insight] ${selectedStudent.fullName} memiliki skor performa ${selectedStudent.aiPerformanceStatus}. Ketersediaan data holistik tervalidasi 100%.`,
        lastUpdated: new Date().toISOString().replace('T', ' ').substring(0, 16),
      };
      onUpdateAiNotes(updatedNote);
      setIsGenerating(false);
    }, 1000);
  };

  return (
    <div className="space-y-6 text-xs">
      {/* Top Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-br from-indigo-900 via-purple-950 to-slate-900 text-white shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-2xl bg-amber-400 text-slate-950 font-black">
                <Brain className="w-5 h-5" />
              </span>
              <h2 className="text-lg font-black tracking-tight">
                Smart AI Student Performance & Behavioral Analytics
              </h2>
            </div>
            <p className="text-xs text-indigo-200">
              Model Pembelajaran Mesin Analisis Multi-Faktor (Akademik, Presensi, Pelanggaran & Konseling BK).
            </p>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={selectedStudent.id}
              onChange={(e) => {
                const found = students.find((s) => s.id === e.target.value);
                if (found) onSelectStudent(found);
              }}
              className="px-3 py-2 rounded-2xl bg-indigo-900/80 border border-indigo-700 text-xs font-bold text-white"
            >
              {students.map((s) => (
                <option key={s.id} value={s.id} className="text-slate-900">
                  {s.fullName} ({s.className})
                </option>
              ))}
            </select>

            <button
              onClick={handleGenerateSummary}
              disabled={isGenerating}
              className="px-4 py-2 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black flex items-center gap-1.5 shadow-md transition-all"
            >
              <RefreshCw className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
              <span>{isGenerating ? 'Memproses AI...' : 'Generate AI Summary'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main AI Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Risk Metrics Card */}
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3">
          <span className="text-[10px] font-bold text-slate-400 uppercase block">Prediksi Risiko Putus Sekolah (Dropout)</span>
          <div className="flex items-baseline gap-2">
            <div className="text-3xl font-black font-mono text-emerald-600">
              {note.dropoutRiskPercentage}%
            </div>
            <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400">Tingkat Risiko Sangat Rendah</span>
          </div>
          <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${note.dropoutRiskPercentage}%` }} />
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3">
          <span className="text-[10px] font-bold text-slate-400 uppercase block">Deteksi Risiko Penurunan Prestasi</span>
          <div className="flex items-center gap-2">
            <span
              className={`px-3 py-1 rounded-2xl text-xs font-black ${
                note.performanceDeclineRisk === 'Tinggi'
                  ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                  : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
              }`}
            >
              Status: {note.performanceDeclineRisk}
            </span>
          </div>
          <p className="text-[11px] text-slate-500">
            Terakhir diupdate: <span className="font-mono font-bold text-slate-700 dark:text-slate-300">{note.lastUpdated}</span>
          </p>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3">
          <span className="text-[10px] font-bold text-slate-400 uppercase block">Status Holistik AI</span>
          <div className="text-base font-black text-indigo-600 dark:text-indigo-400">
            {selectedStudent.aiPerformanceStatus}
          </div>
          <p className="text-[11px] text-slate-500">
            Korelasional positif antara indeks kehadiran, capaian rapor, dan keaktifan organisasi.
          </p>
        </div>
      </div>

      {/* Deep AI Insights Box */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
        <h3 className="font-black text-sm text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span>Ringkasan & Analisis Perkembangan Akademik Otomatis</span>
        </h3>

        <div className="p-4 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900 space-y-1">
          <strong className="text-indigo-950 dark:text-indigo-200 block font-bold">Ringkasan Profil Utama:</strong>
          <p className="text-slate-700 dark:text-slate-300 font-medium">{note.summary}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700 space-y-1">
            <strong className="text-slate-900 dark:text-white block font-bold flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-blue-500" /> Analisis Progres Akademik
            </strong>
            <p className="text-slate-600 dark:text-slate-300">{note.academicProgressAnalysis}</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700 space-y-1">
            <strong className="text-slate-900 dark:text-white block font-bold flex items-center gap-1.5">
              <Lightbulb className="w-4 h-4 text-amber-500" /> Pola Kehadiran & Perilaku
            </strong>
            <p className="text-slate-600 dark:text-slate-300">{note.attendancePatternInsight}</p>
          </div>
        </div>

        {/* Recommended Actions */}
        <div className="p-4 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900 space-y-2">
          <strong className="text-emerald-900 dark:text-emerald-200 block font-bold flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Rekomendasi Pembinaan Guru & BK:
          </strong>
          <ul className="list-disc list-inside space-y-1 text-slate-700 dark:text-slate-300 font-medium">
            {note.recommendedActions.map((act, idx) => (
              <li key={idx}>{act}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
