import React from 'react';
import { useApp } from '../../context/AppContext';
import { Icon } from './Icon';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none px-4">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto flex items-center justify-between p-3.5 rounded-xl shadow-lg border text-sm transition-all duration-300 transform translate-y-0 ${
            toast.type === 'success'
              ? 'bg-surface-container-lowest border-emerald-200 text-emerald-900'
              : toast.type === 'error'
              ? 'bg-surface-container-lowest border-error-container text-error'
              : 'bg-surface-container-lowest border-secondary-container text-on-surface'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <Icon
              name={
                toast.type === 'success'
                  ? 'check_circle'
                  : toast.type === 'error'
                  ? 'error'
                  : 'info'
              }
              size={20}
              className={
                toast.type === 'success'
                  ? 'text-emerald-600'
                  : toast.type === 'error'
                  ? 'text-error'
                  : 'text-primary'
              }
            />
            <span className="font-medium text-xs sm:text-sm">{toast.message}</span>
          </div>
          <button
            onClick={() => removeToast(toast.id)}
            className="text-secondary hover:text-on-surface p-1 rounded-md transition-colors"
            aria-label="Cerrar notificación"
          >
            <Icon name="close" size={16} />
          </button>
        </div>
      ))}
    </div>
  );
};
