import React from 'react';
import { X, Printer, QrCode, Download, Sparkles } from 'lucide-react';
import { TeacherMasterItem, EmployeeMasterItem } from '../../types/teacherTypes';

interface IdCardModalProps {
  item: TeacherMasterItem | EmployeeMasterItem | null;
  onClose: () => void;
}

export const IdCardModal: React.FC<IdCardModalProps> = ({ item, onClose }) => {
  if (!item) return null;

  const isTeacher = 'nuptk' in item;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Printer className="w-5 h-5 text-indigo-600" />
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">Preview Cetak ID Card Digital</h3>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Printable Card Area */}
        <div id="printable-id-card" className="flex justify-center py-2">
          <div className="w-[320px] h-[500px] bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-900 text-white rounded-2xl p-5 shadow-2xl border-2 border-indigo-500/30 flex flex-col justify-between relative overflow-hidden">
            {/* School Header */}
            <div className="text-center border-b border-indigo-800/60 pb-3 relative z-10">
              <div className="text-[10px] font-bold text-indigo-300 uppercase tracking-widest">
                SMART AI SCHOOL MANAGEMENT
              </div>
              <h2 className="text-sm font-black text-white tracking-wide mt-0.5">{item.schoolName}</h2>
              <span className="inline-block mt-1 px-2 py-0.5 text-[9px] font-extrabold bg-indigo-500/30 text-indigo-200 rounded-full border border-indigo-400/30">
                {isTeacher ? 'KARTU IDENTITAS GURU' : 'KARTU IDENTITAS PEGAWAI'}
              </span>
            </div>

            {/* Photo & Main Profile */}
            <div className="text-center relative z-10 my-auto">
              <div className="relative inline-block">
                <img
                  src={item.photoUrl}
                  alt={item.fullName}
                  className="w-24 h-24 rounded-full object-cover ring-4 ring-indigo-400/60 mx-auto shadow-lg"
                />
                <span className="absolute bottom-0 right-0 w-4 h-4 bg-emerald-500 rounded-full ring-2 ring-slate-900" />
              </div>

              <h3 className="text-base font-extrabold text-white mt-3 leading-tight">
                {item.fullName}
              </h3>
              <p className="text-xs text-indigo-200 font-semibold mt-0.5">{item.position}</p>
              <p className="text-[11px] font-mono text-slate-300 mt-1">NIP: {item.nip}</p>
              {isTeacher && <p className="text-[10px] font-mono text-indigo-300">NUPTK: {(item as TeacherMasterItem).nuptk}</p>}
            </div>

            {/* QR & Barcode Footer */}
            <div className="bg-white text-slate-900 rounded-xl p-3 text-center relative z-10 flex items-center justify-between gap-2 shadow-md">
              <img src={item.qrCodeUrl} alt="QR Code" className="w-14 h-14" />
              <div className="text-right flex-1">
                <span className="text-[9px] font-bold text-slate-400 block uppercase">Presensi Digital Smart Tap</span>
                <span className="text-[10px] font-mono font-bold text-slate-800 block">{item.nip}</span>
                <span className="text-[8px] text-indigo-600 font-bold block mt-0.5">RFID / QR Validated</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="flex justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 rounded-lg hover:bg-slate-200"
          >
            Tutup
          </button>
          <button
            onClick={handlePrint}
            className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-500 shadow-md flex items-center gap-1.5"
          >
            <Printer className="w-4 h-4" /> Cetak ID Card
          </button>
        </div>
      </div>
    </div>
  );
};
