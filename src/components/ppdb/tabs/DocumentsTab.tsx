import React, { useState } from 'react';
import { PpdbDocumentItem } from '../../../types/ppdbTypes';
import { FileCheck, Upload, Eye, CheckCircle2, AlertTriangle, FileText, Download, Sparkles, RefreshCw } from 'lucide-react';

interface DocumentsTabProps {
  documents: PpdbDocumentItem[];
  onUpdateDocumentStatus: (id: string, status: any, notes?: string) => void;
}

export const DocumentsTab: React.FC<DocumentsTabProps> = ({
  documents,
  onUpdateDocumentStatus,
}) => {
  const [selectedDoc, setSelectedDoc] = useState<PpdbDocumentItem | null>(null);
  const [isCompressing, setIsCompressing] = useState(false);
  const [compressionResult, setCompressionResult] = useState<string | null>(null);

  const handleSimulateCompress = () => {
    setIsCompressing(true);
    setTimeout(() => {
      setIsCompressing(false);
      setCompressionResult('Dokumen berhasil dikompresi sebesar 65% (Dari 3.4 MB menjadi 1.1 MB)');
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <FileCheck className="w-4 h-4 text-emerald-600" />
            <span>Manajemen Berkas & Upload Dokumen Pendaftaran</span>
          </h3>
          <p className="text-xs text-slate-500">
            Drag & Drop, Pratinjau PDF/Gambar, Kompresi Otomatis, dan Validasi Ukuran File.
          </p>
        </div>

        <button
          onClick={handleSimulateCompress}
          disabled={isCompressing}
          className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-slate-200 transition-all flex items-center gap-1.5"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isCompressing ? 'animate-spin' : ''}`} />
          <span>{isCompressing ? 'Memproses Kompresi...' : 'Jalankan Auto-Compressor'}</span>
        </button>
      </div>

      {compressionResult && (
        <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-300 font-bold flex items-center justify-between">
          <span>{compressionResult}</span>
          <button onClick={() => setCompressionResult(null)} className="text-emerald-600 hover:underline text-[11px]">Tutup</button>
        </div>
      )}

      {/* Drag & Drop Upload Simulation Box */}
      <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border-2 border-dashed border-slate-300 dark:border-slate-700 text-center space-y-3 hover:border-blue-500 transition-colors">
        <div className="p-3.5 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-600 inline-block">
          <Upload className="w-6 h-6" />
        </div>
        <div>
          <h4 className="text-sm font-extrabold text-slate-900 dark:text-white">
            Tarik & Lepas File Dokumen Calon Siswa Di Sini
          </h4>
          <p className="text-xs text-slate-400 mt-0.5">
            Mendukung format PDF, JPG, PNG (Maksimal 5MB per file). Dilengkapi AI auto-crop & auto-orient.
          </p>
        </div>
        <button className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md">
          Pilih File Dari Perangkat
        </button>
      </div>

      {/* Documents List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {documents.map((doc) => (
          <div
            key={doc.id}
            className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300">
                  {doc.docType}
                </span>
                <span className="text-[10px] font-mono text-slate-400">{doc.fileFormat} • {doc.fileSizeMb} MB</span>
              </div>

              <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">{doc.fileName}</h4>
              <p className="text-[11px] text-slate-500">Pendaftar: <strong>{doc.applicantName}</strong></p>
            </div>

            {/* OCR Extracted Preview Summary */}
            {doc.ocrExtractedData && (
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 text-[10px] font-mono space-y-1 text-slate-600 dark:text-slate-300">
                <span className="font-extrabold text-blue-600 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> Hasil OCR Scan AI:
                </span>
                {Object.entries(doc.ocrExtractedData).map(([k, v], idx) => (
                  <div key={idx} className="truncate">
                    <strong>{k}:</strong> {v}
                  </div>
                ))}
              </div>
            )}

            <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
              <span
                className={`px-2 py-0.5 rounded-md text-[10px] font-extrabold ${
                  doc.status === 'Disetujui'
                    ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60'
                    : doc.status === 'Perlu Revisi'
                    ? 'bg-amber-50 text-amber-600 dark:bg-amber-950/60'
                    : 'bg-slate-100 text-slate-600 dark:bg-slate-800'
                }`}
              >
                {doc.status}
              </span>

              <button
                onClick={() => setSelectedDoc(doc)}
                className="px-3 py-1.5 rounded-xl text-xs font-bold bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-300 hover:bg-blue-100 transition-colors flex items-center gap-1"
              >
                <Eye className="w-3.5 h-3.5" /> Preview
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Preview Modal */}
      {selectedDoc && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full border border-slate-200 dark:border-slate-800 shadow-2xl p-6 space-y-4">
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
              Pratinjau Dokumen - {selectedDoc.docType}
            </h3>

            <div className="p-8 rounded-2xl bg-slate-100 dark:bg-slate-800 text-center space-y-2">
              <FileText className="w-12 h-12 text-blue-600 mx-auto" />
              <div className="font-bold text-xs text-slate-800 dark:text-slate-200">{selectedDoc.fileName}</div>
              <div className="text-[10px] text-slate-400 font-mono">Ukuran File: {selectedDoc.fileSizeMb} MB</div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={() => onUpdateDocumentStatus(selectedDoc.id, 'Disetujui')}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 text-white shadow"
              >
                Setujui Dokumen
              </button>
              <button
                onClick={() => setSelectedDoc(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
