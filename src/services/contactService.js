import api from './api'

export const contactService = {
  /**
   * Send contact message
   */
  send: async (formData) => {
    const { data } = await api.post('/contact', formData)
    return data
  },

  /**
   * Subscribe to newsletter
   */
  subscribe: async (email) => {
    const { data } = await api.post('/newsletter/subscribe', { email })
    return data
  },

  /**
   * Get delivery zones & info
   */
  getDeliveryInfo: async () => {
    const { data } = await api.get('/delivery/zones')
    return data
  },
}