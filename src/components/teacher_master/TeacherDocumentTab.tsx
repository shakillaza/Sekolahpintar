import React from 'react';
import { FileText, Download, Upload, Eye, CheckCircle2, RefreshCw } from 'lucide-react';
import { TeacherDocumentRecord, TeacherMasterItem } from '../../types/teacherTypes';

interface TeacherDocumentTabProps {
  documents: TeacherDocumentRecord[];
  teachers: TeacherMasterItem[];
}

export const TeacherDocumentTab: React.FC<TeacherDocumentTabProps> = ({ documents, teachers }) => {
  return (
    <div className="space-y-4">
      <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center justify-between">
        <div>
          <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <FileText className="w-4 h-4 text-indigo-600" />
            Pusat Arsip Dokumen & Version History Digital
          </h2>
          <p className="text-xs text-slate-500">KTP, KK, NPWP, Ijazah, Transkrip, SK Pengangkatan, SK Jabatan, Kontrak & BPJS</p>
        </div>
        <button className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg shadow-sm flex items-center gap-1">
          <Upload className="w-3.5 h-3.5" />
          Upload Dokumen Baru
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {documents.map((doc) => {
          const tch = teachers.find(t => t.id === doc.teacherId);
          return (
            <div key={doc.id} className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileText className="w-9 h-9 text-indigo-500 bg-indigo-50 dark:bg-indigo-950 p-2 rounded-xl" />
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-slate-100 text-xs">{doc.fileName}</h3>
                  <p className="text-[11px] text-slate-500">{doc.docType} • {doc.fileSizeMB} MB • Versi {doc.version}</p>
                  {tch && <p className="text-[10px] text-indigo-600 font-semibold">{tch.fullName}</p>}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-100 text-emerald-800 rounded">
                  {doc.status}
                </span>
                <button className="p-1.5 text-slate-500 hover:text-indigo-600 rounded">
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
