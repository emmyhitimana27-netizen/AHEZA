import { CURRENCY } from './constants'

/**
 * Format price in RWF
 */
export const formatPrice = (amount, options = {}) => {
  const num = Number(amount)
  if (isNaN(num)) return `${CURRENCY.symbol} 0`
  return `${CURRENCY.symbol} ${num.toLocaleString('en-RW', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
    ...options,
  })}`
}

/**
 * Format date
 */
export const formatDate = (dateStr, options = {}) => {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('en-RW', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options,
  })
}

/**
 * Truncate text
 */
export const truncate = (text = '', maxLength = 100) =>
  text.length > maxLength ? `${text.slice(0, maxLength)}…` : text

/**
 * Slugify string
 */
export const slugify = (str = '') =>
  str.toLowerCase().trim().replace(/[\s_]+/g, '-').replace(/[^\w-]+/g, '')

/**
 * Format rating to fixed decimal
 */
export const formatRating = (rating) => Number(rating).toFixed(1)

/**
 * Capitalize first letter
 */
export const capitalize = (str = '') =>
  str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()

/**
 * Format order status
 */
export const formatStatus = (status = '') =>
  status.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())

/**
 * Calculate discount percentage
 */
export const calcDiscountPercent = (original, discounted) => {
  if (!original || !discounted) return 0
  return Math.round(((original - discounted) / original) * 100)
}

/**
 * Format phone number RW style
 */
export const formatPhone = (phone = '') =>
  phone.replace(/(\+250)(\d{3})(\d{3})(\d{3})/, '$1 $2 $3 $4')