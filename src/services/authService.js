import api from './api'

const BASE = '/auth'

export const authService = {
  register: async (userData) => {
    const { data } = await api.post(`${BASE}/register`, userData)
    if (data.token) localStorage.setItem('aheza_token', data.token)
    return data
  },

  login: async (credentials) => {
    const { data } = await api.post(`${BASE}/login`, credentials)
    if (data.token) localStorage.setItem('aheza_token', data.token)
    return data
  },

  logout: async () => {
    await api.post(`${BASE}/logout`)
    localStorage.removeItem('aheza_token')
  },

  getProfile: async () => {
    const { data } = await api.get(`${BASE}/me`)
    return data
  },

  updateProfile: async (updates) => {
    const { data } = await api.patch(`${BASE}/me`, updates)
    return data
  },

  forgotPassword: async (email) => {
    const { data } = await api.post(`${BASE}/forgot-password`, { email })
    return data
  },

  resetPassword: async (token, password) => {
    const { data } = await api.post(`${BASE}/reset-password`, { token, password })
    return data
  },
}