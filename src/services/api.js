import axios from 'axios'
import toast from 'react-hot-toast'
import { API_BASE_URL } from '@utils/constants'

/**
 * Axios instance with base configuration
 */
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  withCredentials: true,
})

/* ─── Request Interceptor ───────────────────────────────── */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('aheza_token')
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
  },
  (error) => Promise.reject(error)
)

/* ─── Response Interceptor ───────────────────────────────── */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error

    if (!response) {
      toast.error('Network error. Please check your connection.')
      return Promise.reject(new Error('Network error'))
    }

    const { status, data } = response
    const message = data?.message || data?.error || 'An unexpected error occurred.'

    switch (status) {
      case 400:
        toast.error(`Bad request: ${message}`)
        break
      case 401:
        localStorage.removeItem('aheza_token')
        toast.error('Session expired. Please log in again.')
        window.location.href = '/login'
        break
      case 403:
        toast.error('You do not have permission to perform this action.')
        break
      case 404:
        // handled per-service
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

    return Promise.reject({ status, message, data })
  }
)

export default api