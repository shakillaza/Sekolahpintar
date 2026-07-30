import React from 'react';
import { DeviceModel } from '../../../types';
import { Smartphone, Laptop, Tablet, ShieldCheck, Ban, CheckCircle2, AlertTriangle } from 'lucide-react';

interface DevicesTabProps {
  devices: DeviceModel[];
  onToggleDeviceStatus: (deviceId: string) => void;
}

export const DevicesTab: React.FC<DevicesTabProps> = ({ devices, onToggleDeviceStatus }) => {
  return (
    <div className="space-y-4">
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <Smartphone className="w-4 h-4 text-purple-500" />
            <span>Device Management & Trusted Device Security</span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Daftar perangkat terverifikasi dan pemblokiran otomatis perangkat tidak dikenal yang mencurigakan.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {devices.map((d) => (
          <div
            key={d.id}
            className={`p-5 rounded-2xl bg-white dark:bg-slate-900 border shadow-sm space-y-4 relative overflow-hidden ${
              d.status === 'blocked'
                ? 'border-rose-300 dark:border-rose-900/60 bg-rose-50/20 dark:bg-rose-950/10'
                : 'border-slate-200/80 dark:border-slate-800'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200">
                  {d.deviceType === 'Desktop' ? (
                    <Laptop className="w-6 h-6 text-blue-500" />
                  ) : d.deviceType === 'Tablet' ? (
                    <Tablet className="w-6 h-6 text-purple-500" />
                  ) : (
                    <Smartphone className="w-6 h-6 text-emerald-500" />
                  )}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">{d.deviceName}</h4>
                  <p className="text-xs text-slate-500">Pengguna: <span className="font-semibold text-slate-800 dark:text-slate-200">{d.userName}</span></p>
                  <div className="text-[10px] font-mono text-slate-400 mt-0.5">{d.os} • {d.browser}</div>
                </div>
              </div>

              <span
                className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                  d.status === 'active'
                    ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800'
                    : 'bg-rose-50 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400 border border-rose-200 dark:border-rose-800'
                }`}
              >
                {d.status === 'active' ? 'Terverifikasi' : 'Diblokir'}
              </span>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
              <span className="text-slate-400 text-[11px]">Terakhir Dipakai: <strong className="text-slate-700 dark:text-slate-300">{d.lastUsed}</strong></span>
              <button
                onClick={() => onToggleDeviceStatus(d.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  d.status === 'active'
                    ? 'bg-rose-50 text-rose-600 hover:bg-rose-100 dark:bg-rose-950/60 dark:text-rose-300 border border-rose-200'
                    : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200'
                }`}
              >
                {d.status === 'active' ? (
                  <>
                    <Ban className="w-3.5 h-3.5" /> Block Device
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-3.5 h-3.5" /> Unblock Device
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
