import React, { useState } from 'react';
import { StudentDocumentRecord, StudentMasterItem } from '../../../types/studentTypes';
import { FileText, Download, Eye, Upload, CheckCircle2, AlertCircle, Clock, Plus, X } from 'lucide-react';

interface DokumenTabProps {
  students: StudentMasterItem[];
  selectedStudent: StudentMasterItem;
  documents: StudentDocumentRecord[];
  onSelectStudent: (s: StudentMasterItem) => void;
  onAddDocument: (doc: StudentDocumentRecord) => void;
}

export const DokumenTab: React.FC<DokumenTabProps> = ({
  students,
  selectedStudent,
  documents,
  onSelectStudent,
  onAddDocument,
}) => {
  const [previewDoc, setPreviewDoc] = useState<StudentDocumentRecord | null>(null);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [docType, setDocType] = useState<any>('Kartu Keluarga (KK)');
  const [fileName, setFileName] = useState('');

  const studentDocs = documents.filter((d) => d.studentId === selectedStudent.id);

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fileName) return;

    const newDoc: StudentDocumentRecord = {
      id: `doc-${Date.now()}`,
      studentId: selectedStudent.id,
      docType,
      fileName,
      fileSizeMB: 1.5,
      uploadDate: new Date().toISOString().split('T')[0],
      version: 1,
      status: 'Tervalidasi',
      fileUrl: 'https://example.com/sample-doc.pdf',
    };

    onAddDocument(newDoc);
    setIsUploadOpen(false);
    setFileName('');
  };

  return (
    <div className="space-y-6">
      {/* Student Picker Bar */}
      <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-300">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-sm font-black text-slate-900 dark:text-white">
              Arsip Berkas Digital & Dokumen Persyaratan Siswa
            </h3>
            <p className="text-xs text-slate-400">
              Pengelolaan KK, Akta, KTP, KIP, Rapor, Ijazah, Pas Foto & Surat Pindah dengan Version History.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={selectedStudent.id}
            onChange={(e) => {
              const found = students.find((s) => s.id === e.target.value);
              if (found) onSelectStudent(found);
            }}
            className="px-3 py-2 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200"
          >
            {students.map((s) => (
              <option key={s.id} value={s.id}>
                {s.fullName} ({s.className})
              </option>
            ))}
          </select>

          <button
            onClick={() => setIsUploadOpen(true)}
            className="px-4 py-2 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-md"
          >
            <Upload className="w-4 h-4" />
            <span>Upload Dokumen</span>
          </button>
        </div>
      </div>

      {/* Document Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
        {studentDocs.length === 0 ? (
          <div className="col-span-full p-8 text-center text-slate-400 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
            Belum ada dokumen digital diunggah untuk siswa ini.
          </div>
        ) : (
          studentDocs.map((doc) => (
            <div
              key={doc.id}
              className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300">
                    {doc.docType}
                  </span>
                  <h4 className="font-extrabold text-sm text-slate-900 dark:text-white mt-2 truncate max-w-[200px]">
                    {doc.fileName}
                  </h4>
                </div>

                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                  v{doc.version}.0
                </span>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 space-y-1 font-mono text-[11px]">
                <div className="flex justify-between">
                  <span className="text-slate-400">Ukuran File:</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{doc.fileSizeMB} MB</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Tgl Upload:</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{doc.uploadDate}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="px-2.5 py-1 rounded-2xl text-[10px] font-extrabold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                  {doc.status}
                </span>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setPreviewDoc(doc)}
                    className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-blue-600 hover:text-white transition-all font-bold text-xs flex items-center gap-1"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Preview</span>
                  </button>
                  <a
                    href={doc.fileUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-emerald-600 hover:text-white transition-all"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Document Preview Modal */}
      {previewDoc && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl max-w-xl w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
                Preview Dokumen: {previewDoc.fileName}
              </h3>
              <button onClick={() => setPreviewDoc(null)} className="p-1 text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-8 rounded-2xl bg-slate-100 dark:bg-slate-800 text-center space-y-3">
              <FileText className="w-16 h-16 text-blue-600 mx-auto" />
              <p className="font-bold text-slate-800 dark:text-slate-200 text-xs">
                {previewDoc.docType} ({previewDoc.fileSizeMB} MB)
              </p>
              <p className="text-[11px] text-slate-400">
                Dokumen resmi terverifikasi versi {previewDoc.version}.0 diunggah pada {previewDoc.uploadDate}.
              </p>
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setPreviewDoc(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Upload Modal */}
      {isUploadOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl max-w-md w-full p-6 space-y-4">
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3">
              Upload Berkas Siswa Digital
            </h3>

            <form onSubmit={handleUploadSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Jenis Dokumen</label>
                <select
                  value={docType}
                  onChange={(e) => setDocType(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold text-slate-900 dark:text-white"
                >
                  <option value="Kartu Keluarga (KK)">Kartu Keluarga (KK)</option>
                  <option value="Akta Kelahiran">Akta Kelahiran</option>
                  <option value="KTP Orang Tua">KTP Orang Tua</option>
                  <option value="KIP / PIP">KIP / PIP (Kartu Indonesia Pintar)</option>
                  <option value="KKS">KKS (Kartu Keluarga Sejahtera)</option>
                  <option value="Rapor Terakhir">Rapor Terakhir</option>
                  <option value="Ijazah / SKL">Ijazah / SKL</option>
                  <option value="Pas Foto 3x4">Pas Foto 3x4</option>
                  <option value="Surat Pindah">Surat Pindah</option>
                  <option value="Surat Keterangan Sehat">Surat Keterangan Sehat</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Nama File / Label Dokumen*</label>
                <input
                  type="text"
                  placeholder="Contoh: KK_Ahmad_Fauzan_Pratama.pdf"
                  value={fileName}
                  onChange={(e) => setFileName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold"
                  required
                />
              </div>

              <div className="p-4 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-2xl text-center cursor-pointer hover:border-blue-500 transition-all">
                <Upload className="w-8 h-8 text-blue-500 mx-auto mb-1" />
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">Pilih berkas dari komputer (PDF, JPG, PNG)</span>
                <span className="text-[10px] text-slate-400">Maksimum ukuran: 10 MB per file</span>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsUploadOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold"
                >
                  Unggah Dokumen
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
