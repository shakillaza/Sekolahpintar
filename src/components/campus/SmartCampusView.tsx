import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  mockSmartCampusBuildings,
  mockSmartCampusVisitors
} from '../../data/globalEnterpriseData';
import { SmartCampusVisitor } from '../../types';
import {
  Building2,
  Users,
  Wifi,
  ShieldAlert,
  Search,
  CheckCircle2,
  Clock,
  Plus,
  Radio,
  DoorOpen,
  Camera,
  Flame,
  Key,
  Car
} from 'lucide-react';

export const SmartCampusView: React.FC = () => {
  const { addToast } = useApp();
  const [activeTab, setActiveTab] = useState<'buildings' | 'visitors' | 'sensors'>('buildings');
  const [searchQuery, setSearchQuery] = useState('');
  const [visitorsList, setVisitorsList] = useState(mockSmartCampusVisitors);

  const handleCheckoutVisitor = (id: string, name: string) => {
    setVisitorsList(prev =>
      prev.map(v => v.id === id ? { ...v, status: 'CheckedOut', exitTime: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB' } : v)
    );
    addToast('success', 'Visitor Checkout', `Akses kartu tamu untuk ${name} telah berhasil dinonaktifkan.`);
  };

  const handleTriggerEmergencyDrill = (buildingName: string) => {
    addToast('warning', 'Simulasi Tanggap Darurat', `Emergency alarm & protokol evakuasi pintar diaktifkan di ${buildingName}. Sistem otomatis membuka smart door access.`);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-slate-950 to-blue-950 p-6 text-white shadow-xl border border-slate-800">
        <div className="absolute right-0 top-0 translate-x-10 -translate-y-10 opacity-10 pointer-events-none">
          <Building2 className="h-64 w-64 text-blue-400" />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-500/20 text-blue-300 border border-blue-400/30 uppercase tracking-wider flex items-center gap-1">
                <Radio className="w-3 h-3 text-emerald-400 animate-pulse" /> Smart Campus IoT Gateway
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                100% Online
              </span>
            </div>
            <h1 className="text-2xl font-black tracking-tight text-white">
              Smart Campus & IoT Facility Platform
            </h1>
            <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Manajemen gedung cerdas, otomatisasi kartu akses pengunjung (Visitor Management), pintu akses IoT, pemantauan CCTV AI, dan tanggap darurat evakuasi gedung.
            </p>
          </div>
          <div className="flex gap-2 shrink-0">
            <button
              onClick={() => handleTriggerEmergencyDrill('Seluruh Kampus')}
              className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-red-600/30 flex items-center gap-2 transition-all"
            >
              <ShieldAlert className="w-3.5 h-3.5" /> Uji Alarm Evakuasi IoT
            </button>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
          <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900/50">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Gedung Utama</p>
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mt-0.5">{mockSmartCampusBuildings.length} Gedung Cerdas</h3>
            <span className="text-[10px] text-emerald-600 font-bold mt-0.5 block">146 Ruangan Terhubung</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
          <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/50">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Tamu Aktif Hari Ini</p>
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mt-0.5">
              {visitorsList.filter(v => v.status === 'CheckedIn').length} Tamu Checked-In
            </h3>
            <span className="text-[10px] text-blue-600 font-bold mt-0.5 block">Visitor Card Pass Active</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
          <div className="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/50">
            <Wifi className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Sensor IoT Connected</p>
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mt-0.5">248 Nodes</h3>
            <span className="text-[10px] text-emerald-600 font-bold mt-0.5 block">Air Quality, Smart Lock, CCTV</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
          <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 border border-amber-100 dark:border-amber-900/50">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Status Keamanan</p>
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mt-0.5">Aman & Terkendali</h3>
            <span className="text-[10px] text-emerald-600 font-bold mt-0.5 block">Zero Security Alert</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-2 shadow-sm flex flex-wrap gap-2">
        <button
          onClick={() => setActiveTab('buildings')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'buildings'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Building2 className="w-4 h-4" /> Manajemen Gedung Cerdas ({mockSmartCampusBuildings.length})
        </button>
        <button
          onClick={() => setActiveTab('visitors')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'visitors'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Users className="w-4 h-4" /> Visitor Pass Management ({visitorsList.length})
        </button>
        <button
          onClick={() => setActiveTab('sensors')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'sensors'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Wifi className="w-4 h-4" /> Gateway IoT & CCTV AI
        </button>
      </div>

      {/* TAB 1: Buildings */}
      {activeTab === 'buildings' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mockSmartCampusBuildings.map((bld) => (
            <div
              key={bld.id}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-blue-500/50 transition-all space-y-4"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                    {bld.code}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mt-1">
                    {bld.name}
                  </h3>
                </div>
                <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
                  <Wifi className="w-3.5 h-3.5" /> Gateway Connected
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center text-xs p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <div>
                  <span className="text-[10px] text-slate-400 block">Jumlah Lantai</span>
                  <span className="font-bold text-slate-900 dark:text-white">{bld.floorsCount} Lantai</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">Total Ruangan</span>
                  <span className="font-bold text-slate-900 dark:text-white">{bld.roomsCount} Ruang</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">Okupansi Kapasitas</span>
                  <span className="font-bold text-blue-600 dark:text-blue-400">{bld.occupancyRate}%</span>
                </div>
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  onClick={() => handleTriggerEmergencyDrill(bld.name)}
                  className="w-full py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
                >
                  <DoorOpen className="w-3.5 h-3.5 text-blue-500" /> Buka Pintu Darurat Smart Lock
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 2: Visitor Management */}
      {activeTab === 'visitors' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
          <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Log Pengunjung & Kartu Akses Tamu
            </h3>
            <span className="text-xs text-slate-500">
              Integrasi Automatic Barrier Gate & Scanner QR Tamu
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600 dark:text-slate-400">
              <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 font-bold uppercase text-[10px] tracking-wider border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="p-4">Nama Pengunjung</th>
                  <th className="p-4">Instansi / Hubungan</th>
                  <th className="p-4">Tujuan / Ditemui</th>
                  <th className="p-4">Kode Kartu Tamu</th>
                  <th className="p-4">Jam Masuk / Keluar</th>
                  <th className="p-4">Status Access</th>
                  <th className="p-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {visitorsList.map((vis) => (
                  <tr key={vis.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                    <td className="p-4 font-bold text-slate-900 dark:text-white">{vis.visitorName}</td>
                    <td className="p-4">{vis.companyOrRelation}</td>
                    <td className="p-4">
                      <p className="font-semibold text-slate-800 dark:text-slate-200">{vis.purpose}</p>
                      <span className="text-[10px] text-slate-400">Host: {vis.hostPerson}</span>
                    </td>
                    <td className="p-4 font-mono font-bold text-blue-600 dark:text-blue-400">{vis.accessCardCode}</td>
                    <td className="p-4 font-mono">
                      {vis.entryTime} {vis.exitTime ? `→ ${vis.exitTime}` : ''}
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        vis.status === 'CheckedIn'
                          ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                      }`}>
                        {vis.status === 'CheckedIn' ? 'Checked-In' : 'Checked-Out'}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      {vis.status === 'CheckedIn' && (
                        <button
                          onClick={() => handleCheckoutVisitor(vis.id, vis.visitorName)}
                          className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-[11px] font-bold"
                        >
                          Checkout Kartu
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: IoT Sensors */}
      {activeTab === 'sensors' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
                <Camera className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">CCTV AI Face Attendance</h4>
                <p className="text-[11px] text-slate-500">18 Kamera Gerbang Terhubung</p>
              </div>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Kamera kecerdasan buatan mendeteksi kehadiran siswa & staf di pintu masuk kampus secara simultan 60 FPS.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
                <Key className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">Smart RFID Lock Access</h4>
                <p className="text-[11px] text-slate-500">142 Pintu Ruang Terintegrasi</p>
              </div>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Membuka kelas, laboratorium, dan ruang guru secara otomatis berdasarkan jadwal pelajaran harian.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400">
                <Car className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">Smart Parking & Barrier Gate</h4>
                <p className="text-[11px] text-slate-500">ANPR License Plate Reader</p>
              </div>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Palang pintu parkir otomatis membaca plat nomor kendaraan guru, bus sekolah, dan orang tua terpilih.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
