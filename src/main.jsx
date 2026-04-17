import React from 'react'
import ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from '@context/AuthContext'
import { ThemeProvider } from '@context/ThemeContext'
import RealtimeProvider from '@context/RealtimeProvider'
import App from './App'
import './styles/globals.css'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry:                2,
      refetchOnWindowFocus: false,
      staleTime:            5 * 60 * 1000,
      cacheTime:            10 * 60 * 1000,
    },
    mutations: {
      retry: 1,
    },
  },
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <RealtimeProvider>
          <ThemeProvider>
            <AuthProvider>
              <App />
              <Toaster
                position="top-right"
                gutter={12}
                containerStyle={{ top: 80 }}
                toastOptions={{
                duration: 4000,
                style: {
                  background:   '#12121e',
                  color:        '#f0f0f0',
                  border:       '1px solid rgba(45,85,255,0.2)',
                  borderRadius: '12px',
                  padding:      '14px 18px',
                  fontSize:     '0.875rem',
                  fontFamily:   'Inter, sans-serif',
                  boxShadow:    '0 8px 32px rgba(0,0,0,0.4)',
                },
                success: {
                  iconTheme: { primary: '#2d55ff', secondary: '#f0f0f0' },
                },
                error: {
                  iconTheme: { primary: '#ef4444', secondary: '#f0f0f0' },
                },
              }}
            />
          </AuthProvider>
        </ThemeProvider>        </RealtimeProvider>      </QueryClientProvider>
    </HelmetProvider>
  </React.StrictMode>
)