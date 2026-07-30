import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, Send, Bot, User, Loader2, X, RefreshCw, Copy, Check } from 'lucide-react';

export const AIAssistantModal: React.FC = () => {
  const { isAiModalOpen, setIsAiModalOpen, currentRole, school, t } = useApp();
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const [messages, setMessages] = useState<
    { sender: 'user' | 'ai'; text: string; timestamp: string }[]
  >([
    {
      sender: 'ai',
      text: `Halo! Saya adalah **Smart AI Assistant** untuk **${school.name}**.
Sebagai **${t(currentRole)}**, Anda dapat meminta bantuan saya untuk:
- Analisis tren akademis & presensi siswa
- Penyusunan draft laporan KPI & administrasi
- Rekomendasi kebijakan manajemen sekolah & SPP
- Ide kegiatan & strategi pengajaran Kurikulum Merdeka

Apa yang bisa saya bantu hari ini?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  if (!isAiModalOpen) return null;

  const quickPrompts = [
    'Berikan rekomendasi strategi peningkatan kehadiran siswa bulan ini',
    'Buatkan outline RPP AI berbasis Kurikulum Merdeka',
    'Bagaimana cara mengoptimalkan penerimaan SPP siswa?',
    'Analisis risiko operasional sekolah berdasarkan data audit log',
  ];

  const handleSend = async (customPrompt?: string) => {
    const textToSend = customPrompt || prompt;
    if (!textToSend.trim() || loading) return;

    const userMsg = {
      sender: 'user' as const,
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!customPrompt) setPrompt('');
    setLoading(true);

    try {
      const response = await fetch('/api/ai/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: textToSend,
          role: currentRole,
          schoolType: school.level,
          context: `Sekolah: ${school.name}, Akreditasi: ${school.accreditation}`,
        }),
      });

      const data = await response.json();
      const aiMsg = {
        sender: 'ai' as const,
        text: data.reply || 'Respon AI tidak tersedia.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: 'Maaf, koneksi ke server AI terganggu. Silakan coba beberapa saat lagi.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div
      id="ai-assistant-backdrop"
      className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={() => setIsAiModalOpen(false)}
    >
      <div
        id="ai-assistant-modal-box"
        className="w-full max-w-2xl h-[620px] rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-gradient-to-r from-blue-900 via-slate-900 to-indigo-950 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/30">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="text-sm font-bold flex items-center gap-2">
                Smart AI School Assistant
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-400 text-slate-900">
                  Gemini 3.6 Flash
                </span>
              </h3>
              <p className="text-xs text-slate-300">
                Mode Role: <span className="font-semibold text-amber-300">{t(currentRole)}</span>
              </p>
            </div>
          </div>
          <button
            id="close-ai-modal-btn"
            onClick={() => setIsAiModalOpen(false)}
            className="p-1.5 rounded-xl hover:bg-white/10 text-slate-300 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50 dark:bg-slate-950/30">
          {messages.map((msg, index) => {
            const isAi = msg.sender === 'ai';
            return (
              <div
                key={index}
                className={`flex gap-3 ${isAi ? 'justify-start' : 'justify-end'}`}
              >
                {isAi && (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-amber-500 flex items-center justify-center shrink-0 shadow-sm text-white">
                    <Bot className="w-4 h-4" />
                  </div>
                )}
                <div className={`max-w-[82%] space-y-1`}>
                  <div
                    className={`p-4 rounded-2xl text-xs leading-relaxed ${
                      isAi
                        ? 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 text-slate-800 dark:text-slate-100 shadow-sm'
                        : 'bg-blue-600 text-white font-medium shadow-md shadow-blue-600/20'
                    }`}
                  >
                    <div className="whitespace-pre-wrap">{msg.text}</div>
                  </div>
                  <div className={`flex items-center gap-2 text-[10px] text-slate-400 px-1 ${isAi ? '' : 'justify-end'}`}>
                    <span>{msg.timestamp}</span>
                    {isAi && (
                      <button
                        onClick={() => handleCopy(msg.text, index)}
                        className="hover:text-blue-500 transition-colors flex items-center gap-0.5"
                        title="Salin Teks"
                      >
                        {copiedIndex === index ? (
                          <Check className="w-3 h-3 text-emerald-500" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </button>
                    )}
                  </div>
                </div>
                {!isAi && (
                  <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center shrink-0 text-slate-600 dark:text-slate-300">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}

          {loading && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center shrink-0 text-white animate-pulse">
                <Bot className="w-4 h-4" />
              </div>
              <div className="p-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center gap-2 text-xs text-slate-500">
                <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                <span>AI sedang menganalisis & menyusun rekomendasi...</span>
              </div>
            </div>
          )}
        </div>

        {/* Quick Prompts */}
        <div className="p-3 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 px-1">
            Saran Pertanyaan Cepat:
          </p>
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
            {quickPrompts.map((qp, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(qp)}
                disabled={loading}
                className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-900/40 hover:text-blue-600 text-[11px] text-slate-600 dark:text-slate-300 whitespace-nowrap transition-colors shrink-0 border border-slate-200/60 dark:border-slate-700/60"
              >
                {qp}
              </button>
            ))}
          </div>
        </div>

        {/* Input Form */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/80">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Ketik pertanyaan atau instruksi untuk AI..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              disabled={loading}
              className="flex-1 px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            />
            <button
              type="submit"
              disabled={loading || !prompt.trim()}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-bold hover:shadow-lg hover:shadow-blue-600/25 disabled:opacity-50 transition-all flex items-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Kirim</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
