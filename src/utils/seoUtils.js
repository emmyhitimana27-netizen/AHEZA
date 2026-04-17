import { APP_NAME, APP_DESCRIPTION } from './constants'

export const generateSEOMeta = ({
  title,
  description,
  keywords,
  image,
  url,
  type = 'website',
}) => ({
  title: title ? `${title} | ${APP_NAME}` : `${APP_NAME} – Sleep Into The Future`,
  description: description || APP_DESCRIPTION,
  keywords: keywords || 'mattress, sleep, Rwanda, Musanze, AHEZA 2050, premium mattress',
  og: {
    title:       title ? `${title} | ${APP_NAME}` : APP_NAME,
    description: description || APP_DESCRIPTION,
    image:       image || '/og-image.jpg',
    url:         url || 'https://aheza2050.rw',
    type,
  },
  twitter: {
    card:        'summary_large_image',
    title:       title ? `${title} | ${APP_NAME}` : APP_NAME,
    description: description || APP_DESCRIPTION,
    image:       image || '/og-image.jpg',
  },
  schema: {
    '@context':   'https://schema.org',
    '@type':      'LocalBusiness',
    name:         APP_NAME,
    description:  APP_DESCRIPTION,
    url:          'https://aheza2050.rw',
    telephone:    '+250788000000',
    address: {
      '@type':          'PostalAddress',
      streetAddress:    'KN 5 Ave',
      addressLocality:  'Musanze',
      addressCountry:   'RW',
    },
    geo: {
      '@type':     'GeoCoordinates',
      latitude:    -1.4995,
      longitude:   29.6337,
    },
    openingHours: ['Mo-Sa 08:00-19:00', 'Su 10:00-17:00'],
    priceRange:   '$$',
  },
})

export const generateProductSchema = (product) => ({
  '@context':  'https://schema.org',
  '@type':     'Product',
  name:        product.name,
  description: product.description,
  image:       product.images?.[0] || '',
  brand: {
    '@type': 'Brand',
    name:    APP_NAME,
  },
  offers: {
    '@type':         'Offer',
    price:           product.price,
    priceCurrency:   'RWF',
    availability:    product.stock > 0
      ? 'https://schema.org/InStock'
      : 'https://schema.org/OutOfStock',
    seller: {
      '@type': 'Organization',
      name:    APP_NAME,
    },
  },
  aggregateRating: product.rating ? {
    '@type':       'AggregateRating',
    ratingValue:   product.rating,
    reviewCount:   product.reviewCount || 0,
  } : undefined,
})