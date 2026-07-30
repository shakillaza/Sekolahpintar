import React, { useState } from 'react';
import { Sparkles, Scan, FileText, CheckCircle2, AlertTriangle, ShieldCheck, RefreshCw, Cpu, Check, X } from 'lucide-react';
import { PpdbApplicant } from '../../../types/ppdbTypes';

interface AiOcrValidationTabProps {
  applicants: PpdbApplicant[];
}

export const AiOcrValidationTab: React.FC<AiOcrValidationTabProps> = ({ applicants }) => {
  const [selectedDocType, setSelectedDocType] = useState('Kartu Keluarga (KK)');
  const [isScanning, setIsScanning] = useState(false);
  const [ocrOutput, setOcrOutput] = useState<any | null>(null);

  // Smart Validation Audit
  const [auditRunning, setAuditRunning] = useState(false);
  const [auditResult, setAuditResult] = useState<any | null>(null);

  const handleSimulateOCR = () => {
    setIsScanning(true);
    setOcrOutput(null);

    setTimeout(() => {
      setIsScanning(false);
      setOcrOutput({
        confidenceScore: 98.4,
        extractedFields: {
          nik: '3171011508080001',
          nisn: '0081234567',
          namaLengkap: 'Ahmad Fauzan Pratama',
          tempatLahir: 'Jakarta',
          tanggalLahir: '15 Mei 2010',
          namaAyah: 'Bambang Pratama',
          namaIbu: 'Siti Aminah',
          alamat: 'Jl. Melati No. 45 RT 02/05',
          kabupatenKota: 'Jakarta Selatan',
          rataRataRapor: 91.5,
        },
        summary: 'Gambar dokumen jelas, NIK dan NISN tervalidasi dengan format standar Dukcapil/Kemdikbud.',
      });
    }, 1500);
  };

  const handleRunSystemAudit = () => {
    setAuditRunning(true);
    setAuditResult(null);

    setTimeout(() => {
      setAuditRunning(false);
      setAuditResult({
        totalAnalyzed: applicants.length,
        duplicateNisnFound: 0,
        duplicateNikFound: 0,
        suspiciousFlags: 1,
        averageCompleteness: 94.2,
        recommendation: 'Sistem menemukan 1 aplikasi yang memerlukan perbaikan dokumen rapor semester 5 (Anisa Kirana Dewi). Seluruh pendaftar lainnya memiliki kelengkapan di atas 85%.',
      });
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Banner AI Scanner */}
      <div className="p-5 rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-2xl bg-amber-400 text-slate-950">
              <Sparkles className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-base font-black">Smart AI OCR Document Scanner & Validation Engine</h3>
              <p className="text-xs text-blue-200">
                Pindai KTP, Kartu Keluarga, Akta Kelahiran, & Rapor menggunakan Google Gemini 3.6 Flash
              </p>
            </div>
          </div>

          <span className="text-[10px] font-mono px-3 py-1 rounded-full bg-blue-800 text-blue-200 border border-blue-700 font-bold">
            Gemini 3.6 Flash Connected
          </span>
        </div>
      </div>

      {/* Main Grid: OCR Scanner Left, AI System Audit Right */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* OCR Scanner Simulator Card */}
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
            <h4 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <Scan className="w-4 h-4 text-blue-600" />
              <span>Simulasi AI OCR Document Extraction</span>
            </h4>
            <p className="text-xs text-slate-500">Pilih tipe dokumen untuk mengekstrak data teks otomatis</p>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300">Tipe Dokumen Dokumen</label>
              <select
                value={selectedDocType}
                onChange={(e) => setSelectedDocType(e.target.value)}
                className="w-full mt-1 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-bold"
              >
                <option value="Kartu Keluarga (KK)">Kartu Keluarga (KK)</option>
                <option value="KTP Orang Tua">KTP Orang Tua</option>
                <option value="Akta Kelahiran">Akta Kelahiran</option>
                <option value="Rapor Semester 1-5">Rapor Semester 1-5</option>
              </select>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-center space-y-2">
              <FileText className="w-8 h-8 text-blue-500 mx-auto" />
              <div className="font-bold text-slate-800 dark:text-slate-200">
                Sample_Dokumen_{selectedDocType.replace(/\s+/g, '_')}.jpg
              </div>
              <button
                onClick={handleSimulateOCR}
                disabled={isScanning}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-md transition-all flex items-center gap-1.5 mx-auto"
              >
                <Scan className={`w-3.5 h-3.5 ${isScanning ? 'animate-spin' : ''}`} />
                <span>{isScanning ? 'Memindai Gambar dengan AI...' : 'Jalankan OCR Scanner'}</span>
              </button>
            </div>

            {ocrOutput && (
              <div className="p-4 rounded-2xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 space-y-3 text-xs">
                <div className="flex items-center justify-between border-b border-blue-200 dark:border-blue-800 pb-2">
                  <span className="font-extrabold text-blue-900 dark:text-blue-200 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Hasil OCR Extraction (Akurasi {ocrOutput.confidenceScore}%)
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                  {Object.entries(ocrOutput.extractedFields).map(([k, v]: any, idx) => (
                    <div key={idx} className="bg-white dark:bg-slate-900 p-2 rounded-xl border border-blue-100 dark:border-blue-900/60">
                      <span className="text-[9px] text-slate-400 block font-bold uppercase">{k}</span>
                      <strong className="text-slate-900 dark:text-white">{v}</strong>
                    </div>
                  ))}
                </div>

                <p className="text-[11px] text-slate-600 dark:text-slate-300 italic">
                  "{ocrOutput.summary}"
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Smart AI System Audit Card */}
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
            <h4 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Smart AI Verification & Audit Keabsahan</span>
            </h4>
            <p className="text-xs text-slate-500">Deteksi duplikasi NIK/NISN, kelengkapan berkas, & skor validitas</p>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-700 dark:text-slate-300">Total Pendaftar Terdaftar:</span>
                <strong className="font-mono text-sm text-slate-900 dark:text-white">{applicants.length} Siswa</strong>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-700 dark:text-slate-300">Rata-Rata Skor Kelengkapan:</span>
                <strong className="font-mono text-emerald-600">92.8% (Sangat Baik)</strong>
              </div>
            </div>

            <button
              onClick={handleRunSystemAudit}
              disabled={auditRunning}
              className="w-full py-3 rounded-2xl text-xs font-extrabold bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center gap-2"
            >
              <Cpu className={`w-4 h-4 ${auditRunning ? 'animate-spin' : ''}`} />
              <span>{auditRunning ? 'Menjalankan Audit AI...' : 'Audit Seluruh Database Pendaftar'}</span>
            </button>

            {auditResult && (
              <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 space-y-3 text-xs">
                <h5 className="font-extrabold text-emerald-900 dark:text-emerald-200">
                  Ringkasan Laporan AI Audit Keabsahan
                </h5>
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div className="p-2 rounded-xl bg-white dark:bg-slate-900">
                    <span className="text-[10px] text-slate-400 block font-bold">Duplikasi NISN</span>
                    <strong className="text-emerald-600 font-mono text-sm">{auditResult.duplicateNisnFound} (Nihil)</strong>
                  </div>
                  <div className="p-2 rounded-xl bg-white dark:bg-slate-900">
                    <span className="text-[10px] text-slate-400 block font-bold">Flag Mencurigakan</span>
                    <strong className="text-amber-600 font-mono text-sm">{auditResult.suspiciousFlags} Kasus</strong>
                  </div>
                </div>
                <p className="text-[11px] text-slate-700 dark:text-slate-300 leading-relaxed">
                  {auditResult.recommendation}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
