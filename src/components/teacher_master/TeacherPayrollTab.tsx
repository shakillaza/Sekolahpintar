import React from 'react';
import { DollarSign, Building, CreditCard, Download, CheckCircle2 } from 'lucide-react';
import { TeacherPayrollProfile } from '../../types/teacherTypes';

interface TeacherPayrollTabProps {
  payrolls: TeacherPayrollProfile[];
}

export const TeacherPayrollTab: React.FC<TeacherPayrollTabProps> = ({ payrolls }) => {
  return (
    <div className="space-y-4">
      <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center justify-between">
        <div>
          <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-emerald-600" />
            Profil Payroll, Transfer Bank & Rekap Take Home Pay
          </h2>
          <p className="text-xs text-slate-500">Konfigurasi Rekening Bank, Gaji Pokok, Tunjangan Jabatan & Sertifikasi, PPh21 & BPJS</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {payrolls.map((pay) => (
          <div key={pay.teacherId} className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex justify-between items-start border-b border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">{pay.teacherName}</h3>
                <p className="text-xs text-slate-500 font-mono">NIP: {pay.nip}</p>
              </div>
              <span className="px-2.5 py-1 text-xs font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 rounded-full">
                {pay.payrollStatus}
              </span>
            </div>

            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500">Bank & Rekening</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{pay.bankName} - {pay.accountNumber}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500">Gaji Pokok</span>
                <span className="font-semibold">Rp {pay.baseSalary.toLocaleString('id-ID')}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500">Tunjangan Jabatan + Serdik</span>
                <span className="font-semibold text-emerald-600">+ Rp {(pay.allowancePosition + pay.allowanceCertification).toLocaleString('id-ID')}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500">Potongan Pajak & BPJS</span>
                <span className="font-semibold text-rose-500">- Rp {(pay.deductionPph21 + pay.deductionBpjs).toLocaleString('id-ID')}</span>
              </div>
              <div className="flex justify-between py-2 pt-3 font-bold text-sm text-indigo-600 dark:text-indigo-400 border-t border-slate-200 dark:border-slate-700">
                <span>Total Take Home Pay</span>
                <span>Rp {pay.netSalary.toLocaleString('id-ID')}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
