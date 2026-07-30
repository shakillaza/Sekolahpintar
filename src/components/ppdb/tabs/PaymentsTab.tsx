import React, { useState } from 'react';
import { PpdbPaymentRecord } from '../../../types/ppdbTypes';
import { CreditCard, CheckCircle2, Clock, FileText, Download, QrCode, Plus } from 'lucide-react';

interface PaymentsTabProps {
  payments: PpdbPaymentRecord[];
  onVerifyPayment: (id: string) => void;
}

export const PaymentsTab: React.FC<PaymentsTabProps> = ({ payments, onVerifyPayment }) => {
  const [selectedPayment, setSelectedPayment] = useState<PpdbPaymentRecord | null>(null);

  const totalCollected = payments
    .filter((p) => p.status === 'Paid')
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-emerald-600" />
            <span>Manajemen Keuangan & Kasir PPDB Online</span>
          </h3>
          <p className="text-xs text-slate-500">
            Pembayaran Biaya Pendaftaran via Virtual Account, QRIS, Transfer Bank, & Tunai Kasir Sekolah.
          </p>
        </div>

        <div className="text-right">
          <span className="text-[10px] text-slate-400 font-bold block uppercase">Total Penerimaan PPDB</span>
          <strong className="text-lg font-black text-emerald-600 font-mono">
            Rp {totalCollected.toLocaleString('id-ID')}
          </strong>
        </div>
      </div>

      {/* Table Payments */}
      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-500 uppercase font-extrabold text-[10px]">
            <tr>
              <th className="px-4 py-3.5">No. Invoice & Pendaftar</th>
              <th className="px-4 py-3.5">Metode Pembayaran</th>
              <th className="px-4 py-3.5">Jumlah Tagihan</th>
              <th className="px-4 py-3.5">Status Pembayaran</th>
              <th className="px-4 py-3.5">Waktu Lunas</th>
              <th className="px-4 py-3.5 text-right">Aksi Kasir</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono">
            {payments.map((p) => (
              <tr key={p.id}>
                <td className="px-4 py-3 font-sans">
                  <div className="font-bold text-slate-900 dark:text-white">{p.applicantName}</div>
                  <div className="text-[10px] text-blue-600 font-mono">{p.invoiceNo}</div>
                </td>
                <td className="px-4 py-3 font-sans text-slate-700 dark:text-slate-300 font-semibold">
                  {p.paymentMethod}
                </td>
                <td className="px-4 py-3 font-bold text-slate-900 dark:text-white">
                  Rp {p.amount.toLocaleString('id-ID')}
                </td>
                <td className="px-4 py-3 font-sans">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                      p.status === 'Paid'
                        ? 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                        : 'bg-amber-50 text-amber-600 border border-amber-200'
                    }`}
                  >
                    {p.status === 'Paid' ? 'Lunas' : 'Belum Bayar'}
                  </span>
                </td>
                <td className="px-4 py-3 text-slate-500 text-[11px]">{p.paidAt || '-'}</td>
                <td className="px-4 py-3 text-right font-sans">
                  {p.status === 'Unpaid' ? (
                    <button
                      onClick={() => onVerifyPayment(p.id)}
                      className="px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow"
                    >
                      Konfirmasi Lunas
                    </button>
                  ) : (
                    <button
                      onClick={() => setSelectedPayment(p)}
                      className="px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200"
                    >
                      Cetak Kwitansi
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Kwitansi Modal */}
      {selectedPayment && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full border border-slate-200 dark:border-slate-800 shadow-2xl p-6 space-y-4 text-xs">
            <div className="text-center border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="text-sm font-black text-slate-900 dark:text-white">KWITANSI BUKTI PEMBAYARAN PPDB</h3>
              <p className="text-[10px] font-mono text-slate-400 mt-0.5">{selectedPayment.invoiceNo}</p>
            </div>

            <div className="space-y-2 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 font-mono">
              <div className="flex justify-between">
                <span className="text-slate-400">Pendaftar:</span>
                <strong>{selectedPayment.applicantName}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Nomor Registrasi:</span>
                <strong>{selectedPayment.registrationNumber}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Metode:</span>
                <strong>{selectedPayment.paymentMethod}</strong>
              </div>
              <div className="flex justify-between border-t pt-2 text-sm font-black text-emerald-600">
                <span>Total Lunas:</span>
                <span>Rp {selectedPayment.amount.toLocaleString('id-ID')}</span>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setSelectedPayment(null)}
                className="px-4 py-2 rounded-xl font-bold bg-slate-100 text-slate-600"
              >
                Tutup
              </button>
              <button
                onClick={() => alert('Mengunduh kwitansi PDF...')}
                className="px-5 py-2 rounded-xl font-bold bg-blue-600 text-white shadow"
              >
                Download PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
