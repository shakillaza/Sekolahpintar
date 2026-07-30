import React, { useState } from 'react';
import { StudentMasterItem } from '../../../types/studentTypes';
import { Settings, Download, Upload, Printer, QrCode, Barcode, Shield, FileSpreadsheet, CheckCircle2, AlertCircle } from 'lucide-react';

interface PengaturanSiswaTabProps {
  students: StudentMasterItem[];
  selectedStudent: StudentMasterItem;
  onSelectStudent: (s: StudentMasterItem) => void;
}

export const PengaturanSiswaTab: React.FC<PengaturanSiswaTabProps> = ({
  students,
  selectedStudent,
  onSelectStudent,
}) => {
  const [printCardOpen, setPrintCardOpen] = useState(false);
  const [importNotice, setImportNotice] = useState('');

  const handleSimulateImport = () => {
    setImportNotice('Template Excel berhasil divalidasi. 25 Data siswa siap diimport!');
    setTimeout(() => setImportNotice(''), 4000);
  };

  return (
    <div className="space-y-6 text-xs">
      {/* Header */}
      <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
            <Settings className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-sm font-black text-slate-900 dark:text-white">
              Pengaturan Master Siswa, Import/Export & Cetak Kartu Pelajar
            </h3>
            <p className="text-xs text-slate-400">
              Cetak Kartu Siswa dengan QR & Barcode, Export/Import Excel CSV, dan Konfigurasi Hak Akses RBAC.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Import & Export Tools */}
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
          <h4 className="text-xs font-extrabold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2.5 flex items-center gap-2">
            <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
            <span>Import & Export Data Excel / CSV</span>
          </h4>

          {importNotice && (
            <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
              <span>{importNotice}</span>
            </div>
          )}

          <div className="space-y-2">
            <button
              onClick={handleSimulateImport}
              className="w-full p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 text-slate-800 dark:text-slate-200 font-bold border border-slate-200 dark:border-slate-700 flex items-center justify-between transition-all"
            >
              <div className="flex items-center gap-2">
                <Upload className="w-4 h-4 text-blue-600" />
                <span>Import Excel Data Siswa</span>
              </div>
              <span className="text-[10px] text-slate-400">.xlsx / .csv</span>
            </button>

            <a
              href="#download-template"
              onClick={(e) => {
                e.preventDefault();
                alert('Downloading Template Excel Master Siswa Enterprise...');
              }}
              className="w-full p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 text-slate-800 dark:text-slate-200 font-bold border border-slate-200 dark:border-slate-700 flex items-center justify-between transition-all block text-left"
            >
              <div className="flex items-center gap-2">
                <Download className="w-4 h-4 text-emerald-600" />
                <span>Download Template Excel Custom</span>
              </div>
              <span className="text-[10px] text-emerald-600 font-mono">Template V2.5</span>
            </a>
          </div>
        </div>

        {/* Card Generator & QR/Barcode */}
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
          <h4 className="text-xs font-extrabold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2.5 flex items-center gap-2">
            <Printer className="w-4 h-4 text-blue-600" />
            <span>Cetak Kartu Siswa (ID Card Digital)</span>
          </h4>

          <div className="space-y-3">
            <select
              value={selectedStudent.id}
              onChange={(e) => {
                const found = students.find((s) => s.id === e.target.value);
                if (found) onSelectStudent(found);
              }}
              className="w-full px-3 py-2 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold text-slate-800 dark:text-slate-200"
            >
              {students.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.fullName} ({s.className})
                </option>
              ))}
            </select>

            <button
              onClick={() => setPrintCardOpen(true)}
              className="w-full py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold flex items-center justify-center gap-2 shadow-md transition-all"
            >
              <QrCode className="w-4 h-4" />
              <span>Preview & Cetak Kartu Siswa</span>
            </button>
          </div>
        </div>

        {/* RBAC Rights */}
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
          <h4 className="text-xs font-extrabold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2.5 flex items-center gap-2">
            <Shield className="w-4 h-4 text-amber-500" />
            <span>Aturan Akses RBAC Siswa</span>
          </h4>

          <div className="space-y-2 font-medium">
            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex justify-between">
              <span>Super Admin / Tata Usaha</span>
              <span className="font-extrabold text-emerald-600">Full Access</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex justify-between">
              <span>Guru / Wali Kelas</span>
              <span className="font-extrabold text-blue-600">Edit Nilai & Presensi</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex justify-between">
              <span>Orang Tua / Wali</span>
              <span className="font-extrabold text-amber-600">View Data Anak Saja</span>
            </div>
          </div>
        </div>
      </div>

      {/* ID Card Modal Preview */}
      {printCardOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl max-w-sm w-full p-6 space-y-4">
            <h3 className="text-base font-black text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2 text-center">
              Kartu Pelajar Digital Resmi
            </h3>

            {/* ID Card Front Frame */}
            <div className="p-5 rounded-3xl bg-gradient-to-b from-blue-900 via-indigo-900 to-slate-900 text-white shadow-xl space-y-4 text-center border border-blue-500/30">
              <div className="flex items-center justify-center gap-2 border-b border-blue-700/60 pb-2">
                <span className="font-black text-xs uppercase tracking-wider">{selectedStudent.schoolName}</span>
              </div>

              <img
                src={selectedStudent.photoUrl}
                alt={selectedStudent.fullName}
                className="w-20 h-20 rounded-2xl object-cover mx-auto border-2 border-amber-400 shadow-md"
              />

              <div>
                <h4 className="font-black text-sm">{selectedStudent.fullName}</h4>
                <p className="text-xs font-mono text-blue-200">NIS: {selectedStudent.nis}</p>
                <p className="text-[10px] text-amber-300 font-extrabold uppercase mt-1">
                  Kelas {selectedStudent.className} ({selectedStudent.schoolLevel})
                </p>
              </div>

              {/* QR & Barcode */}
              <div className="bg-white p-2 rounded-2xl flex items-center justify-around">
                <img src={selectedStudent.qrCodeUrl} alt="QR" className="w-16 h-16" />
                <img src={selectedStudent.barcodeUrl} alt="Barcode" className="h-10 max-w-[120px]" />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setPrintCardOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold"
              >
                Tutup
              </button>
              <button
                onClick={() => {
                  window.print();
                }}
                className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold flex items-center gap-1.5"
              >
                <Printer className="w-4 h-4" />
                <span>Cetak / Save PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
