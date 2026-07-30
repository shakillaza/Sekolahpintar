import React, { useState } from 'react';
import { PpdbTestQuestion, PpdbOnlineTestResult } from '../../../types/ppdbTypes';
import { HelpCircle, Clock, CheckCircle2, Play, Award, Plus, FileText } from 'lucide-react';

interface OnlineTestTabProps {
  testQuestions: PpdbTestQuestion[];
  testResults: PpdbOnlineTestResult[];
}

export const OnlineTestTab: React.FC<OnlineTestTabProps> = ({ testQuestions, testResults }) => {
  const [activeSubView, setActiveSubView] = useState<'bank' | 'results' | 'simulator'>('bank');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [simCompleted, setSimCompleted] = useState(false);

  const currentQ = testQuestions[currentQuestionIndex];

  return (
    <div className="space-y-6">
      {/* Sub navigation bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-indigo-600" />
            <span>Sistem Tes Online & Computer Based Test (CBT)</span>
          </h3>
          <p className="text-xs text-slate-500">
            Bank Soal, Simulasi Ujian Bertimer, Acak Soal, dan Auto Scoring.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveSubView('bank')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeSubView === 'bank' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
            }`}
          >
            Bank Soal ({testQuestions.length})
          </button>
          <button
            onClick={() => setActiveSubView('results')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeSubView === 'results' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
            }`}
          >
            Hasil Tes Siswa
          </button>
          <button
            onClick={() => {
              setActiveSubView('simulator');
              setCurrentQuestionIndex(0);
              setSimCompleted(false);
            }}
            className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-700 transition-all flex items-center gap-1 shadow"
          >
            <Play className="w-3.5 h-3.5" /> Simulasi CBT
          </button>
        </div>
      </div>

      {activeSubView === 'bank' && (
        <div className="space-y-4">
          {testQuestions.map((q, idx) => (
            <div
              key={q.id}
              className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300">
                  {q.category} • {q.questionType}
                </span>
                <span className="text-xs font-bold text-slate-500">Bobot: {q.scoreWeight} Poin</span>
              </div>

              <h4 className="text-xs font-bold text-slate-900 dark:text-white leading-relaxed">
                {idx + 1}. {q.questionText}
              </h4>

              {q.options && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-2">
                  {q.options.map((opt, i) => (
                    <div
                      key={i}
                      className={`p-2.5 rounded-xl border ${
                        opt === q.correctAnswer
                          ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/30 font-bold text-emerald-800 dark:text-emerald-300'
                          : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300'
                      }`}
                    >
                      {opt}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {activeSubView === 'results' && (
        <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-500 uppercase font-extrabold text-[10px]">
              <tr>
                <th className="px-4 py-3.5">Nama Siswa</th>
                <th className="px-4 py-3.5">Judul Ujian</th>
                <th className="px-4 py-3.5">Jawaban Benar</th>
                <th className="px-4 py-3.5">Durasi Digunakan</th>
                <th className="px-4 py-3.5">Skor Akhir</th>
                <th className="px-4 py-3.5">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {testResults.map((r) => (
                <tr key={r.id}>
                  <td className="px-4 py-3 font-bold text-slate-900 dark:text-white">{r.applicantName}</td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-300">{r.testTitle}</td>
                  <td className="px-4 py-3 font-mono">{r.correctAnswers} / {r.totalQuestions} Soal</td>
                  <td className="px-4 py-3 font-mono">{r.durationMinutesSpent} Menit</td>
                  <td className="px-4 py-3 font-black text-indigo-600 text-sm">{r.score}</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-600 font-extrabold text-[10px]">
                      {r.passedStatus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeSubView === 'simulator' && (
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xl max-w-2xl mx-auto space-y-6">
          {!simCompleted ? (
            <>
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-700 font-bold text-xs flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> Sisa Waktu: 44:20 Menit
                </span>
                <span className="font-extrabold text-xs text-slate-500">
                  Soal {currentQuestionIndex + 1} dari {testQuestions.length}
                </span>
              </div>

              <div className="space-y-4">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-relaxed">
                  {currentQ.questionText}
                </h4>

                {currentQ.options ? (
                  <div className="space-y-2">
                    {currentQ.options.map((opt, i) => (
                      <button
                        key={i}
                        onClick={() => setSelectedAnswer(opt)}
                        className={`w-full p-3 rounded-2xl text-xs text-left font-semibold border transition-all ${
                          selectedAnswer === opt
                            ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-900 dark:text-indigo-200 font-bold'
                            : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                ) : (
                  <textarea
                    placeholder="Tuliskan jawaban essay Anda di sini..."
                    className="w-full p-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs"
                    rows={4}
                  />
                )}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  disabled={currentQuestionIndex === 0}
                  onClick={() => setCurrentQuestionIndex(currentQuestionIndex - 1)}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 text-slate-600 disabled:opacity-40"
                >
                  Sebelumnya
                </button>

                {currentQuestionIndex < testQuestions.length - 1 ? (
                  <button
                    onClick={() => {
                      setCurrentQuestionIndex(currentQuestionIndex + 1);
                      setSelectedAnswer(null);
                    }}
                    className="px-5 py-2 rounded-xl text-xs font-bold bg-indigo-600 text-white shadow"
                  >
                    Lanjut Soal
                  </button>
                ) : (
                  <button
                    onClick={() => setSimCompleted(true)}
                    className="px-6 py-2 rounded-xl text-xs font-extrabold bg-emerald-600 text-white shadow"
                  >
                    Selesaikan Ujian (Submit)
                  </button>
                )}
              </div>
            </>
          ) : (
            <div className="text-center p-6 space-y-4">
              <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
              <h3 className="text-lg font-black text-slate-900 dark:text-white">Ujian CBT Selesai Dikirim!</h3>
              <p className="text-xs text-slate-500">Skor Anda telah dihitung otomatis oleh AI: <strong>88/100 (Mumtaz)</strong></p>
              <button
                onClick={() => setActiveSubView('bank')}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-indigo-600 text-white shadow"
              >
                Kembali ke Bank Soal
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
