import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ShoppingCart, Heart, Star, Eye,
  Zap, BadgeCheck
} from 'lucide-react'
import { useCart } from '@hooks/useCart'
import { formatPrice, calcDiscountPercent, truncate } from '@utils/formatters'
import clsx from 'clsx'

export default function ProductCard({ product, index = 0 }) {
  const navigate = useNavigate()
  const [hovered,    setHovered]    = useState(false)
  const [wishlisted, setWishlisted] = useState(false)
  const [imgError,   setImgError]   = useState(false)
  const { addItem, isInCart }       = useCart()

  const discount = product.originalPrice
    ? calcDiscountPercent(product.originalPrice, product.price)
    : 0

  const inCart   = isInCart(product.id)
  const imageSrc = !imgError && product.images?.[0] ? product.images[0] : null

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (inCart) return
    addItem({
      id:    product.id,
      name:  product.name,
      price: product.price,
      image: product.images?.[0],
      size:  product.sizes?.[0] || '',
      slug:  product.slug,
    })
  }

  const handleWishlist = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setWishlisted((w) => !w)
  }

  const handleCardClick = () => {
    navigate(`/products/${product.slug}`)
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      handleCardClick()
    }
  }

  return (
    <motion.article
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={handleCardClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="group relative bg-surface rounded-2xl overflow-hidden border border-white/[0.04] hover:border-primary-500/20 transition-all duration-400 cursor-pointer"
      role="link"
      aria-label={product.name}
    >
      <div className="block">

        {/* ── Image ──────────────────────────────────────── */}
        <div className="relative aspect-[4/3] bg-neutral-900/50 overflow-hidden">
          {imageSrc ? (
            <motion.img
              src={imageSrc}
              alt={product.name}
              onError={() => setImgError(true)}
              className="w-full h-full object-cover"
              animate={{ scale: hovered ? 1.05 : 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center gap-2">
              <div className="text-4xl opacity-40">🛏️</div>
              <p className="text-neutral-600 text-xs">{product.name}</p>
            </div>
          )}

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent opacity-80" />

          {/* Badges — top left */}
          <div className="absolute top-3 left-3 flex flex-col gap-1">
            {discount > 0 && (
              <span className="px-2 py-0.5 bg-accent-500 text-white text-2xs font-black rounded-md">
                −{discount}%
              </span>
            )}
            {product.isFeatured && (
              <span className="flex items-center gap-1 px-2 py-0.5 bg-primary-600/90 text-white text-2xs font-semibold rounded-md backdrop-blur-sm">
                <Zap className="w-2.5 h-2.5" /> Featured
              </span>
            )}
            {product.isNew && (
              <span className="px-2 py-0.5 bg-green-600/90 text-white text-2xs font-semibold rounded-md backdrop-blur-sm">
                New
              </span>
            )}
          </div>

          {/* Wishlist — top right */}
          <motion.button
            onClick={handleWishlist}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            className={clsx(
              'absolute top-3 right-3 w-8 h-8 rounded-lg flex items-center justify-center backdrop-blur-sm border transition-all',
              wishlisted
                ? 'bg-red-500/90 border-red-400/50 text-white'
                : 'bg-black/30 border-white/10 text-white/60 hover:text-white opacity-0 group-hover:opacity-100'
            )}
            aria-label="Wishlist"
          >
            <Heart className={clsx('w-3.5 h-3.5', wishlisted && 'fill-current')} />
          </motion.button>

          {/* Quick actions on hover */}
          <motion.div
            className="absolute bottom-3 left-3 right-3"
            initial={false}
            animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 8 }}
            transition={{ duration: 0.25 }}
          >
            <div className="flex gap-2">
              <button
                onClick={handleAddToCart}
                disabled={inCart || product.stock === 0}
                className={clsx(
                  'flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-semibold rounded-lg backdrop-blur-md border transition-all',
                  inCart
                    ? 'bg-green-600/60 border-green-500/30 text-white'
                    : product.stock === 0
                    ? 'bg-neutral-800/80 border-white/5 text-neutral-500 cursor-not-allowed'
                    : 'bg-primary-600/80 border-primary-500/30 text-white hover:bg-primary-500/90'
                )}
              >
                <ShoppingCart className="w-3.5 h-3.5" />
                {inCart ? 'In Cart' : product.stock === 0 ? 'Sold Out' : 'Add to Cart'}
              </button>
              <Link
                to={`/products/${product.slug}`}
                onClick={(e) => e.stopPropagation()}
                className="w-9 h-9 bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center rounded-lg text-white/70 hover:text-white transition-colors flex-shrink-0"
                aria-label="Quick view"
              >
                <Eye className="w-3.5 h-3.5" />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* ── Info ───────────────────────────────────────── */}
        <div className="p-4">
          {/* Type + Size row */}
          <div className="flex items-center gap-1.5 mb-1.5">
            {product.type && (
              <span className="text-2xs font-semibold text-primary-400/80 uppercase tracking-wide">
                {product.type.replace(/_/g, ' ')}
              </span>
            )}
            {product.type && product.sizes?.length > 0 && (
              <span className="text-neutral-700 text-2xs">·</span>
            )}
            {product.sizes?.length > 0 && (
              <span className="text-2xs text-neutral-600">
                {product.sizes.length} size{product.sizes.length !== 1 ? 's' : ''}
              </span>
            )}
          </div>

          {/* Name */}
          <h3 className="font-semibold text-white text-[0.925rem] leading-snug mb-1 line-clamp-2 group-hover:text-primary-300 transition-colors duration-300">
            {product.name}
          </h3>

          {/* Short description */}
          <p className="text-neutral-500 text-xs leading-relaxed line-clamp-2 mb-3">
            {truncate(product.shortDescription || product.description, 80)}
          </p>

          {/* Rating */}
          {product.rating > 0 && (
            <div className="flex items-center gap-1.5 mb-3">
              <div className="flex gap-px">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-3 h-3"
                    style={{
                      fill:  i < Math.round(product.rating) ? '#2d55ff' : 'none',
                      color: i < Math.round(product.rating) ? '#2d55ff' : '#333',
                    }}
                  />
                ))}
              </div>
              <span className="text-2xs text-neutral-500">
                {Number(product.rating).toFixed(1)}
                <span className="text-neutral-700 ml-0.5">({product.reviewCount || 0})</span>
              </span>
            </div>
          )}

          {/* Price row */}
          <div className="flex items-end justify-between gap-2">
            <div className="flex items-baseline gap-2">
              <span className="font-display font-black text-white text-lg leading-none">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-neutral-600 text-xs line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>

            {product.certified && (
              <div className="flex items-center gap-0.5 text-green-400/80">
                <BadgeCheck className="w-3.5 h-3.5" />
              </div>
            )}
          </div>

          {/* Low stock warning */}
          {product.stock > 0 && product.stock < 5 && (
            <p className="text-2xs text-accent-400 font-medium mt-2">
              ⚡ Only {product.stock} left
            </p>
          )}
        </div>
      </div>
    </motion.article>
  )
}