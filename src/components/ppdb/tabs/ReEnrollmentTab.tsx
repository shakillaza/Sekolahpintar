import React from 'react';
import { PpdbApplicant } from '../../../types/ppdbTypes';
import { CheckSquare, FileText, Shirt, Bus, Printer, CheckCircle2 } from 'lucide-react';

interface ReEnrollmentTabProps {
  applicants: PpdbApplicant[];
}

export const ReEnrollmentTab: React.FC<ReEnrollmentTabProps> = ({ applicants }) => {
  const reEnrolledList = applicants.filter((a) => a.isReEnrolled || a.status === 'Re_Enrolled' || a.status === 'Passed');

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <CheckSquare className="w-4 h-4 text-emerald-600" />
            <span>Modul Daftar Ulang & Pengukuran Seragam Siswa</span>
          </h3>
          <p className="text-xs text-slate-500">
            Checklist kelengkapan berkas fisik, bukti pembayaran daftar ulang, ukuran seragam, & antar-jemput.
          </p>
        </div>
      </div>

      {/* Table Daftar Ulang */}
      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-500 uppercase font-extrabold text-[10px]">
            <tr>
              <th className="px-4 py-3.5">Nama Siswa & No Reg</th>
              <th className="px-4 py-3.5">Target Kelas</th>
              <th className="px-4 py-3.5">Ukuran Seragam</th>
              <th className="px-4 py-3.5">Layanan Antar-Jemput</th>
              <th className="px-4 py-3.5">Status Daftar Ulang</th>
              <th className="px-4 py-3.5 text-right">Cetak Bukti</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {reEnrolledList.map((app) => (
              <tr key={app.id}>
                <td className="px-4 py-3 font-bold text-slate-900 dark:text-white">
                  <div>{app.fullName}</div>
                  <div className="text-[10px] text-blue-600 font-mono">{app.registrationNumber}</div>
                </td>
                <td className="px-4 py-3 text-slate-600 dark:text-slate-300">{app.targetGrade}</td>
                <td className="px-4 py-3 font-mono font-bold text-purple-600">
                  <Shirt className="w-3.5 h-3.5 inline mr-1" /> Size M
                </td>
                <td className="px-4 py-3 text-slate-600 dark:text-slate-300">
                  <Bus className="w-3.5 h-3.5 inline mr-1 text-amber-500" /> Zona 1 (Keb. Baru)
                </td>
                <td className="px-4 py-3">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-50 text-emerald-600 border border-emerald-200">
                    {app.isReEnrolled ? 'Selesai Daftar Ulang' : 'Menunggu Berkas Fisik'}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <button className="px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 flex items-center gap-1 ml-auto">
                    <Printer className="w-3.5 h-3.5" /> Cetak Bukti
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
