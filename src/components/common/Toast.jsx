import { Toaster } from 'react-hot-toast'

export default function ToastContainer() {
  return (
    <Toaster
      position="top-right"
      gutter={12}
      containerStyle={{ top: 88 }}
      toastOptions={{
        duration: 4000,
        style: {
          background:   '#12121e',
          color:        '#f0f0f0',
          border:       '1px solid rgba(45,85,255,0.15)',
          borderRadius: '12px',
          padding:      '14px 18px',
          fontSize:     '0.875rem',
          fontFamily:   'Inter, sans-serif',
          boxShadow:    '0 8px 32px rgba(0,0,0,0.4)',
        },
        success: { iconTheme: { primary: '#2d55ff', secondary: '#f0f0f0' } },
        error:   { iconTheme: { primary: '#ef4444', secondary: '#f0f0f0' } },
      }}
    />
  )
}