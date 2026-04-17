import api from './api'

const BASE = '/products'

export const productService = {
  getAll: async (params = {}) => {
    const { data } = await api.get(BASE, { params })
    return data
  },

  getBySlug: async (slug) => {
    const { data } = await api.get(`${BASE}/${slug}`)
    return data
  },

  getFeatured: async (limit = 6) => {
    const { data } = await api.get(`${BASE}/featured`, { params: { limit } })
    return data
  },

  getCategories: async () => {
    const { data } = await api.get('/categories')
    return data
  },

  submitReview: async (productId, reviewData) => {
    const { data } = await api.post(`${BASE}/${productId}/reviews`, reviewData)
    return data
  },

  getReviews: async (productId, params = {}) => {
    const { data } = await api.get(`${BASE}/${productId}/reviews`, { params })
    return data
  },

  markHelpful: async (reviewId) => {
    const { data } = await api.post(`/reviews/${reviewId}/helpful`)
    return data
  },

  search: async (q, params = {}) => {
    const { data } = await api.get(`${BASE}/search`, { params: { q, ...params } })
    return data
  },

  getRelated: async (productId, limit = 4) => {
    const { data } = await api.get(`${BASE}/${productId}/related`, { params: { limit } })
    return data
  },
}