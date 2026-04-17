import axios from 'axios'
import toast from 'react-hot-toast'
import { API_BASE_URL } from '@utils/constants'

/* Paths where 404 is handled silently (no toast) */
const SILENT_404_PATTERNS = [
  /\/hero-slides/,
  /\/testimonials/,
  /\/stats/,
]

const isSilent404 = (url = '') =>
  SILENT_404_PATTERNS.some((p) => p.test(url))

const api = axios.create({
  baseURL:     API_BASE_URL,
  timeout:     15000,
  headers: {
    'Content-Type': 'application/json',
    Accept:         'application/json',
  },
  withCredentials: true,
})

/* ── Request interceptor ──────────────────────────────────── */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('aheza_token')
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
  },
  (error) => Promise.reject(error)
)

/* ── Response interceptor ─────────────────────────────────── */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response, config } = error

    if (!response) {
      toast.error('Network error. Please check your connection.')
      return Promise.reject(new Error('Network error'))
    }

    const { status, data } = response
    const message  = data?.message || data?.error || 'An unexpected error occurred.'
    const url      = config?.url || ''

    switch (status) {
      case 400:
        toast.error(`Bad request: ${message}`)
        break
      case 401:
        localStorage.removeItem('aheza_token')
        toast.error('Session expired. Please log in again.')
        /* Only redirect if not already on auth page */
        if (!window.location.pathname.includes('/login')) {
          window.location.href = '/login'
        }
        break
      case 403:
        toast.error('You do not have permission to perform this action.')
        break
      case 404:
        /* Silently ignore 404 on background/content fetches */
        if (!isSilent404(url)) {
          toast.error(message)
        }
        break
      case 422:
        toast.error(`Validation error: ${message}`)
        break
      case 429:
        toast.error('Too many requests. Please slow down.')
        break
      case 500:
      case 502:
      case 503:
        toast.error('Server error. Please try again later.')
        break
      default:
        toast.error(message)
    }

    return Promise.reject({ status, message, data, url })
  }
)

export default api