import api from './api'

const BASE = '/products'

export const productService = {
  /**
   * Get paginated products with filters
   */
  getAll: async (params = {}) => {
    const { data } = await api.get(BASE, { params })
    return data
  },

  /**
   * Get single product by slug or id
   */
  getBySlug: async (slug) => {
    const { data } = await api.get(`${BASE}/${slug}`)
    return data
  },

  /**
   * Get featured products for homepage
   */
  getFeatured: async (limit = 6) => {
    const { data } = await api.get(`${BASE}/featured`, { params: { limit } })
    return data
  },

  /**
   * Get all categories
   */
  getCategories: async () => {
    const { data } = await api.get('/categories')
    return data
  },

  /**
   * Submit product review
   */
  submitReview: async (productId, reviewData) => {
    const { data } = await api.post(`${BASE}/${productId}/reviews`, reviewData)
    return data
  },

  /**
   * Get product reviews
   */
  getReviews: async (productId, params = {}) => {
    const { data } = await api.get(`${BASE}/${productId}/reviews`, { params })
    return data
  },

  /**
   * Search products
   */
  search: async (query, params = {}) => {
    const { data } = await api.get(`${BASE}/search`, { params: { q: query, ...params } })
    return data
  },

  /**
   * Get related products
   */
  getRelated: async (productId, limit = 4) => {
    const { data } = await api.get(`${BASE}/${productId}/related`, { params: { limit } })
    return data
  },
}