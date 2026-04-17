import api from './api'

const BASE = '/orders'

export const orderService = {
  create: async (orderData) => {
    const { data } = await api.post(BASE, orderData)
    return data
  },

  track: async (trackingNumber) => {
    const { data } = await api.get(
      `${BASE}/track/${trackingNumber.trim().toUpperCase()}`
    )
    return data
  },

  getUserOrders: async (params = {}) => {
    const { data } = await api.get(`${BASE}/my-orders`, { params })
    return data
  },

  getById: async (id) => {
    const { data } = await api.get(`${BASE}/${id}`)
    return data
  },

  cancel: async (id, reason) => {
    const { data } = await api.patch(`${BASE}/${id}/cancel`, { reason })
    return data
  },

  canReview: async (orderId, productId) => {
    const { data } = await api.get(`${BASE}/${orderId}/can-review/${productId}`)
    return data
  },

  calculateDelivery: async (district, sector) => {
    const { data } = await api.post('/delivery/calculate', { district, sector })
    return data
  },
}