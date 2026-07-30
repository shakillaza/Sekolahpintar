import React, { useState } from 'react';
import { PpdbFormField, PpdbFieldType } from '../../../types/ppdbTypes';
import {
  FileText,
  Plus,
  Trash2,
  GripVertical,
  Type,
  Hash,
  Calendar,
  Mail,
  Phone,
  ListFilter,
  CheckSquare,
  Upload,
  Camera,
  PenTool,
  MapPin,
  Eye,
  CheckCircle2,
  ToggleLeft,
  ToggleRight
} from 'lucide-react';

interface FormBuilderTabProps {
  fields: PpdbFormField[];
  onUpdateFields: (fields: PpdbFormField[]) => void;
}

export const FormBuilderTab: React.FC<FormBuilderTabProps> = ({
  fields,
  onUpdateFields,
}) => {
  const [activeSection, setActiveSection] = useState<
    'Data Pribadi' | 'Data Orang Tua' | 'Asal Sekolah' | 'Dokumen & Lokasi' | 'Lainnya'
  >('Data Pribadi');

  const [previewMode, setPreviewMode] = useState(false);

  // Field Form Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [label, setLabel] = useState('');
  const [fieldType, setFieldType] = useState<PpdbFieldType>('text');
  const [isRequired, setIsRequired] = useState(true);
  const [placeholder, setPlaceholder] = useState('');
  const [optionsStr, setOptionsStr] = useState('');

  const handleAddField = (e: React.FormEvent) => {
    e.preventDefault();
    const newField: PpdbFormField = {
      id: `field-${Date.now()}`,
      section: activeSection,
      label,
      fieldType,
      isRequired,
      placeholder,
      options: optionsStr ? optionsStr.split(',').map((s) => s.trim()) : undefined,
      order: fields.length + 1,
    };

    onUpdateFields([...fields, newField]);
    setIsModalOpen(false);
    setLabel('');
    setPlaceholder('');
    setOptionsStr('');
  };

  const handleDeleteField = (id: string) => {
    onUpdateFields(fields.filter((f) => f.id !== id));
  };

  const handleToggleRequired = (id: string) => {
    onUpdateFields(
      fields.map((f) => (f.id === id ? { ...f, isRequired: !f.isRequired } : f))
    );
  };

  const filteredFields = fields.filter((f) => f.section === activeSection);

  const getFieldIcon = (type: PpdbFieldType) => {
    switch (type) {
      case 'text': return <Type className="w-4 h-4 text-blue-500" />;
      case 'number': return <Hash className="w-4 h-4 text-purple-500" />;
      case 'date': return <Calendar className="w-4 h-4 text-emerald-500" />;
      case 'email': return <Mail className="w-4 h-4 text-amber-500" />;
      case 'phone': return <Phone className="w-4 h-4 text-emerald-600" />;
      case 'dropdown': case 'radio': return <ListFilter className="w-4 h-4 text-indigo-500" />;
      case 'checkbox': return <CheckSquare className="w-4 h-4 text-cyan-500" />;
      case 'file': return <Upload className="w-4 h-4 text-orange-500" />;
      case 'photo': return <Camera className="w-4 h-4 text-pink-500" />;
      case 'signature': return <PenTool className="w-4 h-4 text-slate-600" />;
      case 'maps': case 'address': return <MapPin className="w-4 h-4 text-rose-500" />;
      default: return <FileText className="w-4 h-4 text-slate-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <FileText className="w-4 h-4 text-blue-600" />
            <span>Formulir Pendaftaran Dinamis (Drag & Drop No-Code Builder)</span>
          </h3>
          <p className="text-xs text-slate-500">
            Kustomisasi formulir pendaftaran siswa baru tanpa coding untuk seluruh jenjang sekolah.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setPreviewMode(!previewMode)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              previewMode
                ? 'bg-amber-500 text-white shadow-md'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{previewMode ? 'Kembali ke Editor' : 'Pratinjau Formulir'}</span>
          </button>

          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-600/20 transition-all flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Field Baru</span>
          </button>
        </div>
      </div>

      {/* Sections Selector */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-slate-200/80 dark:border-slate-800">
        {(['Data Pribadi', 'Data Orang Tua', 'Asal Sekolah', 'Dokumen & Lokasi', 'Lainnya'] as const).map(
          (sec) => (
            <button
              key={sec}
              onClick={() => setActiveSection(sec)}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all whitespace-nowrap ${
                activeSection === sec
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {sec} ({fields.filter((f) => f.section === sec).length})
            </button>
          )
        )}
      </div>

      {/* Main Builder vs Preview */}
      {!previewMode ? (
        <div className="space-y-3">
          {filteredFields.map((field, idx) => (
            <div
              key={field.id}
              className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center justify-between gap-4 hover:border-blue-400 transition-all group"
            >
              <div className="flex items-center gap-3">
                <GripVertical className="w-4 h-4 text-slate-300 dark:text-slate-600 cursor-grab" />
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800">
                  {getFieldIcon(field.fieldType)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">{field.label}</h4>
                    {field.isRequired && (
                      <span className="text-[10px] font-extrabold text-rose-500 bg-rose-50 dark:bg-rose-950/60 px-1.5 py-0.2 rounded">
                        Wajib
                      </span>
                    )}
                  </div>
                  <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                    Tipe: {field.fieldType.toUpperCase()} {field.placeholder && `• Placeholder: "${field.placeholder}"`}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleToggleRequired(field.id)}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-colors ${
                    field.isRequired
                      ? 'bg-rose-50 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400'
                      : 'bg-slate-100 text-slate-500 dark:bg-slate-800'
                  }`}
                >
                  {field.isRequired ? 'Set Opsional' : 'Set Wajib'}
                </button>
                <button
                  onClick={() => handleDeleteField(field.id)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/60 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Live Form Preview */
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-6 max-w-3xl mx-auto">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-200">
              Live Interactive Form Preview (Siswa Mode)
            </span>
            <h3 className="text-lg font-black text-slate-900 dark:text-white mt-2">
              Formulir Pendaftaran - Bagian {activeSection}
            </h3>
          </div>

          <div className="space-y-4">
            {filteredFields.map((f) => (
              <div key={f.id} className="space-y-1 text-xs">
                <label className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1">
                  <span>{f.label}</span>
                  {f.isRequired && <span className="text-rose-500">*</span>}
                </label>

                {['text', 'number', 'email', 'phone', 'date'].includes(f.fieldType) && (
                  <input
                    type={f.fieldType === 'number' ? 'number' : f.fieldType === 'date' ? 'date' : 'text'}
                    placeholder={f.placeholder || `Masukkan ${f.label.toLowerCase()}`}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                )}

                {f.fieldType === 'dropdown' && (
                  <select className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white">
                    <option value="">-- Pilih {f.label} --</option>
                    {f.options?.map((opt, i) => (
                      <option key={i} value={opt}>{opt}</option>
                    ))}
                  </select>
                )}

                {f.fieldType === 'radio' && (
                  <div className="flex items-center gap-4 pt-1">
                    {f.options?.map((opt, i) => (
                      <label key={i} className="flex items-center gap-1.5 cursor-pointer">
                        <input type="radio" name={f.id} className="text-blue-600" />
                        <span className="text-slate-700 dark:text-slate-300 font-semibold">{opt}</span>
                      </label>
                    ))}
                  </div>
                )}

                {f.fieldType === 'maps' && (
                  <div className="p-4 rounded-2xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800/60 text-center space-y-2">
                    <MapPin className="w-6 h-6 text-blue-600 mx-auto" />
                    <span className="font-bold text-blue-900 dark:text-blue-200 block">
                      Integrasi Google Maps Pinpoint (Hitung Jarak Zonasi Otomatis)
                    </span>
                    <button className="px-3 py-1.5 rounded-xl text-[11px] font-bold bg-blue-600 text-white shadow">
                      Pilih Titik Koordinat Rumah
                    </button>
                  </div>
                )}

                {f.fieldType === 'signature' && (
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center space-y-2">
                    <PenTool className="w-5 h-5 text-slate-400 mx-auto" />
                    <span className="text-slate-500 font-semibold text-[11px] block">
                      Kanvas Tanda Tangan Digital Orang Tua / Wali
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal Add Field */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full border border-slate-200 dark:border-slate-800 shadow-2xl p-6 space-y-4">
            <h3 className="text-base font-black text-slate-900 dark:text-white">
              Tambah Field Formulir ({activeSection})
            </h3>

            <form onSubmit={handleAddField} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300">Label Pertanyaan / Field</label>
                <input
                  type="text"
                  value={label}
                  onChange={(e) => setLabel(e.target.value)}
                  placeholder="e.g. Nomor KIP / PKH (Jika Ada)"
                  className="w-full mt-1 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300">Tipe Input Field</label>
                <select
                  value={fieldType}
                  onChange={(e) => setFieldType(e.target.value as PpdbFieldType)}
                  className="w-full mt-1 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-bold"
                >
                  <option value="text">Text Biasa</option>
                  <option value="textarea">Textarea Panjang</option>
                  <option value="number">Angka (Number)</option>
                  <option value="date">Tanggal (Date)</option>
                  <option value="email">Email</option>
                  <option value="phone">Nomor Telepon / WhatsApp</option>
                  <option value="dropdown">Dropdown Pilihan</option>
                  <option value="radio">Radio Button</option>
                  <option value="checkbox">Checkbox Multi Choice</option>
                  <option value="file">Upload File Dokumen</option>
                  <option value="photo">Upload Pas Foto</option>
                  <option value="signature">Tanda Tangan Digital</option>
                  <option value="maps">Google Maps Location</option>
                </select>
              </div>

              {['dropdown', 'radio', 'checkbox'].includes(fieldType) && (
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300">Pilihan Opsi (Pisahkan Komma)</label>
                  <input
                    type="text"
                    value={optionsStr}
                    onChange={(e) => setOptionsStr(e.target.value)}
                    placeholder="e.g. Opsi A, Opsi B, Opsi C"
                    className="w-full mt-1 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
              )}

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300">Placeholder Hint Text</label>
                <input
                  type="text"
                  value={placeholder}
                  onChange={(e) => setPlaceholder(e.target.value)}
                  placeholder="e.g. Contoh: 12345678"
                  className="w-full mt-1 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <label className="flex items-center gap-2 cursor-pointer pt-2">
                <input
                  type="checkbox"
                  checked={isRequired}
                  onChange={(e) => setIsRequired(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded"
                />
                <span className="font-bold text-slate-800 dark:text-slate-200">Wajib Diisi oleh Siswa (Mandatory)</span>
              </label>

              <div className="flex items-center justify-end gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 dark:text-slate-300 font-bold bg-slate-100 dark:bg-slate-800"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-white font-bold bg-blue-600 hover:bg-blue-700 shadow-md"
                >
                  Tambah Field
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
