export const APP_NAME = 'AHEZA 2050'
export const APP_TAGLINE = 'Sleep Into The Future'
export const APP_DESCRIPTION =
  'Premium mattresses delivering unparalleled comfort in Musanze, Rwanda. Designed for the future, delivered to your door.'

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'
export const REALTIME_URL = import.meta.env.VITE_REALTIME_URL || null

export const NAV_LINKS = [
  { label: 'Home',     path: '/' },
  { label: 'Products', path: '/products' },
  { label: 'About',    path: '/about' },
  { label: 'Contact',  path: '/contact' },
]

export const MATTRESS_SIZES = [
  { label: 'Single',    value: 'single',    dimensions: '90 × 190 cm' },
  { label: 'Twin',      value: 'twin',      dimensions: '100 × 200 cm' },
  { label: 'Double',    value: 'double',    dimensions: '120 × 200 cm' },
  { label: 'Queen',     value: 'queen',     dimensions: '150 × 200 cm' },
  { label: 'King',      value: 'king',      dimensions: '180 × 200 cm' },
  { label: 'Super King',value: 'super_king',dimensions: '200 × 200 cm' },
]

export const MATTRESS_TYPES = [
  { label: 'Memory Foam',  value: 'memory_foam' },
  { label: 'Innerspring',  value: 'innerspring' },
  { label: 'Latex',        value: 'latex' },
  { label: 'Hybrid',       value: 'hybrid' },
  { label: 'Orthopedic',   value: 'orthopedic' },
  { label: 'Cooling Gel',  value: 'cooling_gel' },
]

export const SORT_OPTIONS = [
  { label: 'Featured',     value: 'featured' },
  { label: 'Price: Low',   value: 'price_asc' },
  { label: 'Price: High',  value: 'price_desc' },
  { label: 'Newest',       value: 'newest' },
  { label: 'Top Rated',    value: 'rating' },
]

export const DELIVERY_ZONES = [
  { zone: 'Musanze City',  fee: 0,    days: '1-2' },
  { zone: 'Kinigi',        fee: 2000, days: '1-3' },
  { zone: 'Muhoza',        fee: 1500, days: '1-2' },
  { zone: 'Nyabihu',       fee: 3000, days: '2-4' },
]

export const CURRENCY = { code: 'RWF', symbol: 'RWF', locale: 'rw-RW' }

export const CONTACT_INFO = {
  phone:   '+250 788 000 000',
  email:   'info@aheza2050.rw',
  address: 'KN 5 Ave, Musanze City, Rwanda',
  hours:   'Mon–Sat: 8am – 7pm | Sun: 10am – 5pm',
}

export const SOCIAL_LINKS = [
  { platform: 'Facebook',  url: 'https://facebook.com/aheza2050',  icon: 'Facebook' },
  { platform: 'Instagram', url: 'https://instagram.com/aheza2050', icon: 'Instagram' },
  { platform: 'Twitter',   url: 'https://twitter.com/aheza2050',   icon: 'Twitter' },
  { platform: 'WhatsApp',  url: 'https://wa.me/250788000000',      icon: 'MessageCircle' },
]

export const TOAST_DURATION = 4000

export const PAGE_SIZE = 12

export const HERO_SLIDE_INTERVAL = 6000

export const QUERY_KEYS = {
  PRODUCTS:       'products',
  PRODUCT_DETAIL: 'product-detail',
  CATEGORIES:     'categories',
  TESTIMONIALS:   'testimonials',
  STATS:          'stats',
  FEATURED:       'featured-products',
  CART:           'cart',
  ORDERS:         'orders',
  USER:           'user',
  HERO_SLIDES:    'hero-slides',
  DELIVERY_ZONES: 'delivery-zones',
  REVIEWS:        'reviews',
}