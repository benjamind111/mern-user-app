import React from 'react';
import { CheckCircle, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';

const Toast = ({ toast, onDismiss }) => {
  const icons = {
    success: <CheckCircle size={20} />,
    error: <AlertCircle size={20} />,
    info: <Info size={20} />,
    warning: <AlertTriangle size={20} />
  };

  const icon = icons[toast.type] || icons.info;

  return (
    <div className={`toast toast-${toast.type}`}>
      <div className="toast-icon">{icon}</div>
      <div className="toast-message">{toast.message}</div>
      <button className="toast-close" onClick={() => onDismiss(toast.id)}>
        <X size={16} />
      </button>
    </div>
  );
};

export const ToastContainer = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="toast-container">
      {toasts.map(toast => (
        <Toast key={toast.id} toast={toast} onDismiss={onDismiss} />
      ))}
    </div>
  );
};

export default Toast;
