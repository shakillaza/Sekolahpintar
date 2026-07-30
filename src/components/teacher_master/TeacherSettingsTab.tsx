import React, { useState } from 'react';
import { Download, Upload, Printer, FileText, QrCode, Shield, CheckCircle2, Sparkles, FileSpreadsheet } from 'lucide-react';
import { TeacherMasterItem, EmployeeMasterItem } from '../../types/teacherTypes';

interface TeacherSettingsTabProps {
  teachers: TeacherMasterItem[];
  employees: EmployeeMasterItem[];
  onOpenIdCardPrinter: () => void;
}

export const TeacherSettingsTab: React.FC<TeacherSettingsTabProps> = ({
  teachers,
  employees,
  onOpenIdCardPrinter
}) => {
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const triggerExport = (format: string) => {
    setToastMsg(`Exporting data Master Guru & Pegawai ke format ${format}...`);
    setTimeout(() => setToastMsg(null), 2500);
  };

  const triggerImport = () => {
    setToastMsg('Membuka dialog Import Excel / CSV Template...');
    setTimeout(() => setToastMsg(null), 2500);
  };

  return (
    <div className="space-y-6">
      {toastMsg && (
        <div className="p-3 bg-emerald-600 text-white rounded-xl text-xs font-semibold shadow-md animate-fade-in flex items-center justify-between">
          <span>{toastMsg}</span>
          <CheckCircle2 className="w-4 h-4" />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Import & Export Tools */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm flex items-center gap-2">
            <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
            Import & Export Master Data Guru
          </h3>
          <p className="text-xs text-slate-500">
            Dukung integrasi massal via Excel (.xlsx), CSV, Template Standar Dapodik & Export Laporan PDF/CSV.
          </p>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={triggerImport}
              className="p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:border-indigo-500 rounded-xl text-left text-xs font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2"
            >
              <Upload className="w-4 h-4 text-indigo-500" /> Import Excel / CSV
            </button>
            <button
              onClick={() => triggerExport('Excel (.xlsx)')}
              className="p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:border-emerald-500 rounded-xl text-left text-xs font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2"
            >
              <Download className="w-4 h-4 text-emerald-500" /> Export Excel
            </button>
            <button
              onClick={() => triggerExport('PDF Laporan Guru')}
              className="p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:border-rose-500 rounded-xl text-left text-xs font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2"
            >
              <FileText className="w-4 h-4 text-rose-500" /> Export PDF
            </button>
            <button
              onClick={() => triggerExport('CSV Format')}
              className="p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:border-amber-500 rounded-xl text-left text-xs font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2"
            >
              <Download className="w-4 h-4 text-amber-500" /> Export CSV
            </button>
          </div>
        </div>

        {/* Cetak ID Card & Barcode Generator */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm flex items-center gap-2">
            <Printer className="w-4 h-4 text-indigo-600" />
            Cetak ID Card & Barcode / QR Presensi
          </h3>
          <p className="text-xs text-slate-500">
            Cetak Kartu Identitas Digital Guru & Pegawai dengan QR Code & Barcode Code128 Siap Pakai untuk Mesin Absensi.
          </p>

          <div className="p-4 bg-indigo-50/60 dark:bg-indigo-950/40 rounded-xl border border-indigo-100 dark:border-indigo-900/40 space-y-3">
            <div className="flex items-center gap-3">
              <QrCode className="w-8 h-8 text-indigo-600" />
              <div>
                <h4 className="font-bold text-indigo-900 dark:text-indigo-200 text-xs">Pencetakan Massal ID Card</h4>
                <p className="text-[11px] text-indigo-700 dark:text-indigo-300">Format Standard CR-80 (85.6mm x 53.98mm)</p>
              </div>
            </div>
            <button
              onClick={onOpenIdCardPrinter}
              className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs rounded-lg shadow-md flex items-center justify-center gap-2"
            >
              <Printer className="w-4 h-4" /> Buka Studio Cetak ID Card Guru & Pegawai
            </button>
          </div>
        </div>
      </div>

      {/* RBAC Info Card */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3">
        <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm flex items-center gap-2">
          <Shield className="w-4 h-4 text-indigo-600" />
          Hak Akses Sistem (RBAC Rules)
        </h3>
        <p className="text-xs text-slate-500">
          Super Admin, Yayasan, Kepala Sekolah, Wakasek, Kepala TU, Operator, Guru & Pegawai. Guru dan Pegawai hanya dapat melihat dan mengubah profilnya sendiri sesuai hak akses.
        </p>
      </div>
    </div>
  );
};
