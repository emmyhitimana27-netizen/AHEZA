import api from './api'

const BASE = '/orders'

export const orderService = {
  /**
   * Create new order
   */
  create: async (orderData) => {
    const { data } = await api.post(BASE, orderData)
    return data
  },

  /**
   * Track order by tracking number
   */
  track: async (trackingNumber) => {
    const { data } = await api.get(`${BASE}/track/${trackingNumber}`)
    return data
  },

  /**
   * Get user orders
   */
  getUserOrders: async (params = {}) => {
    const { data } = await api.get(`${BASE}/my-orders`, { params })
    return data
  },

  /**
   * Get single order
   */
  getById: async (id) => {
    const { data } = await api.get(`${BASE}/${id}`)
    return data
  },

  /**
   * Cancel order
   */
  cancel: async (id, reason) => {
    const { data } = await api.patch(`${BASE}/${id}/cancel`, { reason })
    return data
  },

  /**
   * Calculate delivery fee
   */
  calculateDelivery: async (district, sector) => {
    const { data } = await api.post('/delivery/calculate', { district, sector })
    return data
  },
}