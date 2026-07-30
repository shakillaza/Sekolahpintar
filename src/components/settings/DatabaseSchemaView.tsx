import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { phase1DatabaseSchemas } from '../../data/initialData';
import { Database, Table, Key, ShieldCheck, ArrowRight, Layers } from 'lucide-react';

export const DatabaseSchemaView: React.FC = () => {
  const { t } = useApp();
  const [selectedTable, setSelectedTable] = useState(phase1DatabaseSchemas[0].tableName);

  const currentSchema = phase1DatabaseSchemas.find((s) => s.tableName === selectedTable)!;

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12 animate-in fade-in duration-200">
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 text-white shadow-xl space-y-2">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-purple-500/20 text-purple-400 border border-purple-500/30">
            <Database className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-white">{t('dbTitle')}</h1>
            <p className="text-xs text-slate-400">{t('dbSubtitle')}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Table Selector Sidebar */}
        <div className="lg:col-span-4 space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 px-2">
            PostgreSQL Migrations (9 Tabel Phase 1)
          </h3>
          <div className="space-y-1">
            {phase1DatabaseSchemas.map((table) => {
              const isActive = table.tableName === selectedTable;

              return (
                <button
                  key={table.tableName}
                  onClick={() => setSelectedTable(table.tableName)}
                  className={`w-full flex items-center justify-between p-3 rounded-2xl text-xs font-semibold text-left transition-all border ${
                    isActive
                      ? 'bg-purple-600 text-white border-purple-500 shadow-md shadow-purple-600/20'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Table className="w-4 h-4 shrink-0 text-purple-400" />
                    <span>{table.tableName}</span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500">
                    {table.columns.length} Kolom
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Table Inspector */}
        <div className="lg:col-span-8 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div>
            <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 font-mono text-xs font-bold">
              <span>TABLE:</span>
              <span className="text-base text-slate-900 dark:text-white font-black">
                {currentSchema.tableName}
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {currentSchema.description}
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                <tr>
                  <th className="p-3">Nama Kolom</th>
                  <th className="p-3">Tipe Data</th>
                  <th className="p-3">Constraints</th>
                  <th className="p-3">Keterangan Relasi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                {currentSchema.columns.map((col, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <td className="p-3 font-mono font-bold text-blue-600 dark:text-blue-400">
                      {col.name}
                    </td>
                    <td className="p-3 font-mono text-amber-600 dark:text-amber-400">
                      {col.type}
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-1.5">
                        {col.isPrimary && (
                          <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-amber-500/20 text-amber-600 dark:text-amber-300 border border-amber-500/30">
                            PRIMARY KEY
                          </span>
                        )}
                        {col.isForeign && (
                          <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-purple-500/20 text-purple-600 dark:text-purple-300 border border-purple-500/30">
                            FOREIGN KEY
                          </span>
                        )}
                        {!col.nullable ? (
                          <span className="text-[9px] font-mono text-slate-400">NOT NULL</span>
                        ) : (
                          <span className="text-[9px] font-mono text-slate-400">NULLABLE</span>
                        )}
                      </div>
                    </td>
                    <td className="p-3 text-slate-500 dark:text-slate-400">{col.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
            <span>Estimasi Record Aktif: <strong className="text-slate-900 dark:text-white">{currentSchema.sampleRowsCount} Baris</strong></span>
            <span className="text-emerald-500 font-bold">Migration Applied ✓</span>
          </div>
        </div>
      </div>
    </div>
  );
};
