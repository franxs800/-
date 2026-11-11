import React from 'react'

export const Toast = ({ toasts, onDismiss }) => {
  if (!toasts || toasts.length === 0) return null

  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <div key={toast.id} className={`toast-card toast-${toast.type || 'info'}`}>
          <div className="toast-content">
            <span className="toast-icon">
              {toast.type === 'success' && '✅'}
              {toast.type === 'error' && '⚠️'}
              {toast.type === 'info' && '💡'}
            </span>
            <span className="toast-message">{toast.message}</span>
          </div>
          <button className="toast-close-btn" onClick={() => onDismiss(toast.id)}>
            ×
          </button>
        </div>
      ))}
    </div>
  )
}
