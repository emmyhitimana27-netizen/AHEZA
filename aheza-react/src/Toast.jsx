import React from 'react';
import { useApp } from './contexts/AppContext';

const Toast = () => {
  const { toasts, removeToast } = useApp();

  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`toast toast-${toast.type} show`}
        >
          <div className="toast-content">
            <div className="toast-message">{toast.message}</div>
            <button 
              className="toast-close"
              onClick={() => removeToast(toast.id)}
            >
              &times;
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Toast;