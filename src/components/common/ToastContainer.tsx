import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, AlertTriangle, Info, XCircle, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div
      id="toast-container"
      className="fixed bottom-5 right-5 z-50 flex flex-col gap-3 max-w-md w-full pointer-events-none px-4"
    >
      {toasts.map((toast) => {
        const getIcon = () => {
          switch (toast.type) {
            case 'success':
              return <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />;
            case 'error':
              return <XCircle className="w-5 h-5 text-rose-500 shrink-0" />;
            case 'warning':
              return <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />;
            default:
              return <Info className="w-5 h-5 text-blue-500 shrink-0" />;
          }
        };

        const getBorderColor = () => {
          switch (toast.type) {
            case 'success':
              return 'border-emerald-500/30 dark:border-emerald-500/40';
            case 'error':
              return 'border-rose-500/30 dark:border-rose-500/40';
            case 'warning':
              return 'border-amber-500/30 dark:border-amber-500/40';
            default:
              return 'border-blue-500/30 dark:border-blue-500/40';
          }
        };

        return (
          <div
            key={toast.id}
            id={`toast-item-${toast.id}`}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl border ${getBorderColor()} bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-xl dark:shadow-slate-950/50 transition-all duration-300 animate-in slide-in-from-bottom-5`}
          >
            {getIcon()}
            <div className="flex-1 min-w-0">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-100">
                {toast.title}
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5 leading-relaxed">
                {toast.message}
              </p>
            </div>
            <button
              id={`toast-close-${toast.id}`}
              onClick={() => removeToast(toast.id)}
              className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
