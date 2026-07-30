import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { mockDigitalCredentials } from '../../data/globalEnterpriseData';
import { DigitalCertificateCredential } from '../../types';
import {
  Award,
  ShieldCheck,
  QrCode,
  Search,
  CheckCircle2,
  ExternalLink,
  Plus,
  Sparkles,
  Copy,
  Check,
  FileCheck,
  UserCheck,
  BadgeAlert
} from 'lucide-react';

export const CertificationCenterView: React.FC = () => {
  const { addToast } = useApp();
  const [activeTab, setActiveTab] = useState<'credentials' | 'verifier' | 'issue'>('credentials');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [verificationInput, setVerificationInput] = useState('');
  const [verificationResult, setVerificationResult] = useState<DigitalCertificateCredential | null>(null);

  // New Credential Form State
  const [newRecipient, setNewRecipient] = useState('');
  const [newNisn, setNewNisn] = useState('');
  const [newType, setNewType] = useState<DigitalCertificateCredential['credentialType']>('Diploma');
  const [newTitle, setNewTitle] = useState('');

  const filteredCredentials = mockDigitalCredentials.filter(c =>
    c.recipientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.recipientNisnNip.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.issuerSchoolName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCopyHash = (hash: string, id: string) => {
    navigator.clipboard.writeText(hash);
    setCopiedId(id);
    addToast('info', 'Blockchain Hash Copied', 'Hash transaksi blockchain berhasil disalin ke clipboard.');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleVerifyCredential = (e: React.FormEvent) => {
    e.preventDefault();
    const found = mockDigitalCredentials.find(c =>
      c.id.toLowerCase() === verificationInput.trim().toLowerCase() ||
      c.recipientNisnNip.toLowerCase() === verificationInput.trim().toLowerCase()
    );
    if (found) {
      setVerificationResult(found);
      addToast('success', 'Verifikasi Berhasil!', `Kredensial digital milik ${found.recipientName} terbukti otentik & valid.`);
    } else {
      setVerificationResult(null);
      addToast('error', 'Kredensial Tidak Ditemukan', 'ID Kredensial tidak terdaftar pada Ledger Blockchain Smart AI School OS.');
    }
  };

  const handleIssueCredential = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRecipient || !newTitle) {
      addToast('warning', 'Form Belum Lengkap', 'Mohon isi nama penerima dan judul sertifikat.');
      return;
    }
    const created: DigitalCertificateCredential = {
      id: `cred_${Date.now()}`,
      recipientName: newRecipient,
      recipientNisnNip: newNisn || '0098765432',
      credentialType: newType,
      title: newTitle,
      issuerSchoolName: 'Pusat Yayasan Smart School OS',
      issuedDate: new Date().toISOString().split('T')[0],
      qrVerificationUrl: `https://smartschool.id/verify/cred_${Date.now()}`,
      blockchainTxHash: `0x${Math.random().toString(16).substring(2)}${Math.random().toString(16).substring(2)}`,
      verificationStatus: 'verified',
    };

    mockDigitalCredentials.unshift(created);
    addToast('success', 'Ijazah Digital Terbit!', `Sertifikat digital & Hashing QR untuk ${newRecipient} telah terdaftar pada Blockchain Ledger.`);
    setNewRecipient('');
    setNewNisn('');
    setNewTitle('');
    setActiveTab('credentials');
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-emerald-950 to-blue-900 p-6 text-white shadow-xl border border-emerald-800/40">
        <div className="absolute right-0 top-0 translate-x-10 -translate-y-10 opacity-10 pointer-events-none">
          <Award className="h-64 w-64 text-emerald-400" />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 uppercase tracking-wider flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> Digital Credential Registry
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-400/30">
                Blockchain Tamper-Proof
              </span>
            </div>
            <h1 className="text-2xl font-black tracking-tight text-white">
              Certification Center & Digital Credential Registry
            </h1>
            <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Penerbitan Ijazah Digital, Transkrip Nilai, Micro-credentials, Lencana Keahlian Guru, dan Verifikasi QR publik anti-pemalsuan berbasis Blockchain Ledger.
            </p>
          </div>
          <div className="flex gap-2 shrink-0">
            <button
              onClick={() => setActiveTab('issue')}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-600/30 flex items-center gap-2 transition-all"
            >
              <Plus className="w-3.5 h-3.5" /> Terbitkan Ijazah / Sertifikat
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-2 shadow-sm flex flex-wrap gap-2">
        <button
          onClick={() => setActiveTab('credentials')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'credentials'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Award className="w-4 h-4" /> Register Kredensial Terbit ({mockDigitalCredentials.length})
        </button>
        <button
          onClick={() => setActiveTab('verifier')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'verifier'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <QrCode className="w-4 h-4" /> Portal Verifikator Publik QR
        </button>
        <button
          onClick={() => setActiveTab('issue')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'issue'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Plus className="w-4 h-4" /> Form Penerbitan Kredensial
        </button>
      </div>

      {/* TAB 1: Credentials List */}
      {activeTab === 'credentials' && (
        <div className="space-y-4">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Cari penerima, NISN/NIP, atau judul..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredCredentials.map((cred) => (
              <div
                key={cred.id}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-emerald-500/50 transition-all space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                      {cred.credentialType}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      {cred.title}
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
                    {cred.id}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Penerima:</span>
                    <span className="font-bold text-slate-900 dark:text-white">{cred.recipientName} ({cred.recipientNisnNip})</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Penerbit:</span>
                    <span className="font-semibold text-slate-700 dark:text-slate-300">{cred.issuerSchoolName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Tanggal Terbit:</span>
                    <span className="font-mono text-slate-600 dark:text-slate-400">{cred.issuedDate}</span>
                  </div>
                </div>

                {cred.blockchainTxHash && (
                  <div className="flex items-center justify-between text-[11px] font-mono bg-slate-900 text-slate-300 p-2 rounded-xl">
                    <span className="truncate max-w-[240px]">Hash: {cred.blockchainTxHash}</span>
                    <button
                      onClick={() => handleCopyHash(cred.blockchainTxHash!, cred.id)}
                      className="p-1 hover:text-white text-slate-400 transition-colors shrink-0"
                    >
                      {copiedId === cred.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                )}

                <div className="flex items-center justify-between pt-1 text-xs">
                  <span className="flex items-center gap-1 font-bold text-emerald-600">
                    <CheckCircle2 className="w-4 h-4" /> Tamper-Proof Verified
                  </span>
                  <a
                    href={cred.qrVerificationUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 dark:text-blue-400 font-bold flex items-center gap-1 hover:underline"
                  >
                    Cek QR Link <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: Public Verifier Portal Simulator */}
      {activeTab === 'verifier' && (
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm max-w-2xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <div className="inline-p-3 p-3 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 mb-2">
              <QrCode className="w-8 h-8 mx-auto" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Portal Verifikasi Keaslian Kredensial Digital
            </h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Masukkan ID Kredensial atau NISN/NIP untuk memverifikasi keaslian dokumen pada Smart AI School Ledger.
            </p>
          </div>

          <form onSubmit={handleVerifyCredential} className="flex gap-2">
            <input
              type="text"
              placeholder="Contoh: cred_dip_2026_001 atau 0068912345"
              value={verificationInput}
              onChange={(e) => setVerificationInput(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
            />
            <button
              type="submit"
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shrink-0 shadow-md shadow-emerald-600/20"
            >
              Verifikasi Sekarang
            </button>
          </form>

          {verificationResult && (
            <div className="p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/80 space-y-3 animate-fade-in">
              <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-200 font-bold text-sm">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                DOKUMEN RESMI TERVERIFIKASI OTENTIK
              </div>
              <div className="space-y-1.5 text-xs text-emerald-900 dark:text-emerald-100">
                <p><strong>Judul:</strong> {verificationResult.title}</p>
                <p><strong>Penerima:</strong> {verificationResult.recipientName} ({verificationResult.recipientNisnNip})</p>
                <p><strong>Institusi Penerbit:</strong> {verificationResult.issuerSchoolName}</p>
                <p><strong>Tanggal Diterbitkan:</strong> {verificationResult.issuedDate}</p>
                <p className="font-mono text-[10px] break-all"><strong>TxHash:</strong> {verificationResult.blockchainTxHash}</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: Issue New Credential */}
      {activeTab === 'issue' && (
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm max-w-xl mx-auto space-y-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Plus className="w-4 h-4 text-emerald-500" /> Form Penerbitan Kredensial Baru
          </h3>

          <form onSubmit={handleIssueCredential} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Nama Lengkap Penerima *</label>
              <input
                type="text"
                placeholder="Contoh: Ahmad Zakaria, S.Pd."
                value={newRecipient}
                onChange={(e) => setNewRecipient(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              />
            </div>

            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">NISN / NIP / NUPTK</label>
              <input
                type="text"
                placeholder="Contoh: 0098765432"
                value={newNisn}
                onChange={(e) => setNewNisn(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Tipe Kredensial</label>
              <select
                value={newType}
                onChange={(e) => setNewType(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="Diploma">Ijazah Kelulusan Resmi (Diploma)</option>
                <option value="Transcript">Transkrip Nilai Akademik</option>
                <option value="TeacherCertification">Sertifikat Guru & Pendidik</option>
                <option value="MicroCredential">Micro-Credential Skill Lencana</option>
                <option value="Honor">Sertifikat Penghargaan / Sanad</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Judul Dokumen Sertifikat *</label>
              <input
                type="text"
                placeholder="Contoh: Sertifikat Keahlian AI Prompt Engineering"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-md shadow-emerald-600/20 transition-all"
            >
              Terbitkan Kredensial & Register Blockchain
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
