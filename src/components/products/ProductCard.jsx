import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ShoppingCart, Heart, Star, Eye,
  BadgeCheck, Zap, ArrowRight
} from 'lucide-react'
import { useCart } from '@hooks/useCart'
import { formatPrice, calcDiscountPercent, truncate } from '@utils/formatters'
import clsx from 'clsx'

export default function ProductCard({ product, index = 0 }) {
  const [hovered,   setHovered]   = useState(false)
  const [wishlisted, setWishlisted] = useState(false)
  const [imgError,  setImgError]  = useState(false)
  const { addItem, isInCart }     = useCart()

  const discount = product.originalPrice
    ? calcDiscountPercent(product.originalPrice, product.price)
    : 0

  const inCart = isInCart(product.id)

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (inCart) return
    addItem({
      id:    product.id,
      name:  product.name,
      price: product.price,
      image: product.images?.[0],
      size:  product.size,
      slug:  product.slug,
    })
  }

  const handleWishlist = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setWishlisted((w) => !w)
  }

  const imageSrc = !imgError && product.images?.[0]
    ? product.images[0]
    : null

  return (
    <motion.article
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="group relative bg-surface border border-white/5 hover:border-primary-500/25 rounded-3xl overflow-hidden transition-colors duration-400 cursor-pointer"
      aria-label={`${product.name} mattress`}
    >
      <Link to={`/products/${product.slug}`} className="block">

        {/* ── Image Area ─────────────────────────────────── */}
        <div className="relative aspect-[4/3] bg-neutral-900 overflow-hidden">
          {imageSrc ? (
            <motion.img
              src={imageSrc}
              alt={product.name}
              onError={() => setImgError(true)}
              className="w-full h-full object-cover"
              animate={{ scale: hovered ? 1.06 : 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-neutral-700">
              <div className="text-center">
                <div className="text-5xl mb-2">🛏</div>
                <p className="text-xs text-neutral-600">{product.name}</p>
              </div>
            </div>
          )}

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-surface/80 via-transparent to-transparent" />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {discount > 0 && (
              <span className="px-2.5 py-1 bg-accent-500 text-white text-2xs font-black rounded-lg">
                -{discount}%
              </span>
            )}
            {product.isFeatured && (
              <span className="px-2.5 py-1 bg-primary-600/90 text-white text-2xs font-semibold rounded-lg backdrop-blur-sm flex items-center gap-1">
                <Zap className="w-2.5 h-2.5" /> Featured
              </span>
            )}
            {product.isNew && (
              <span className="px-2.5 py-1 bg-green-600/90 text-white text-2xs font-semibold rounded-lg backdrop-blur-sm">
                New
              </span>
            )}
          </div>

          {/* Wishlist */}
          <motion.button
            onClick={handleWishlist}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            className={clsx(
              'absolute top-3 right-3 w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-300 backdrop-blur-sm',
              wishlisted
                ? 'bg-red-500/90 border border-red-400/50 text-white'
                : 'glass border border-white/10 text-neutral-400 hover:text-white hover:border-white/25'
            )}
            aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Heart className={clsx('w-3.5 h-3.5', wishlisted && 'fill-current')} />
          </motion.button>

          {/* Quick view on hover */}
          <motion.div
            className="absolute bottom-3 left-3 right-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 10 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center gap-2">
              <button
                onClick={handleAddToCart}
                disabled={inCart || product.stock === 0}
                className={clsx(
                  'flex-1 flex items-center justify-center gap-2 py-2 text-xs font-semibold rounded-xl transition-all duration-300',
                  inCart
                    ? 'bg-green-600/80 text-white'
                    : product.stock === 0
                    ? 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
                    : 'bg-primary-600/90 hover:bg-primary-500 text-white backdrop-blur-sm'
                )}
                aria-label={inCart ? 'In cart' : 'Add to cart'}
              >
                <ShoppingCart className="w-3.5 h-3.5" />
                {inCart ? 'In Cart' : product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
              </button>
              <Link
                to={`/products/${product.slug}`}
                className="w-8 h-8 glass border border-white/15 flex items-center justify-center rounded-xl text-neutral-300 hover:text-white transition-colors"
                aria-label="Quick view"
                onClick={(e) => e.stopPropagation()}
              >
                <Eye className="w-3.5 h-3.5" />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* ── Info Area ──────────────────────────────────── */}
        <div className="p-5">
          {/* Type & Size */}
          <div className="flex items-center gap-2 mb-2">
            {product.type && (
              <span className="text-2xs font-medium text-primary-400 uppercase tracking-wide">
                {product.type.replace(/_/g, ' ')}
              </span>
            )}
            {product.size && (
              <>
                <span className="text-neutral-700">·</span>
                <span className="text-2xs text-neutral-500">{product.size}</span>
              </>
            )}
          </div>

          {/* Name */}
          <h3 className="font-display font-bold text-white text-base mb-1 line-clamp-2 group-hover:text-primary-300 transition-colors duration-300">
            {product.name}
          </h3>

          {/* Description */}
          <p className="text-neutral-500 text-xs leading-relaxed line-clamp-2 mb-3">
            {truncate(product.description, 90)}
          </p>

          {/* Rating */}
          {product.rating && (
            <div className="flex items-center gap-1.5 mb-3">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-3 h-3"
                    style={{
                      fill: i < Math.round(product.rating) ? '#2d55ff' : 'none',
                      color: i < Math.round(product.rating) ? '#2d55ff' : '#4a4a5a',
                    }}
                  />
                ))}
              </div>
              <span className="text-2xs text-neutral-400">
                {Number(product.rating).toFixed(1)} ({product.reviewCount || 0})
              </span>
            </div>
          )}

          {/* Price Row */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-baseline gap-2">
              <span className="font-display font-black text-white text-lg">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-neutral-600 text-xs line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>

            {/* Verified */}
            {product.certified && (
              <div className="flex items-center gap-1 text-2xs text-green-400">
                <BadgeCheck className="w-3.5 h-3.5" />
                <span>Certified</span>
              </div>
            )}
          </div>

          {/* Stock Indicator */}
          {product.stock !== undefined && product.stock < 5 && product.stock > 0 && (
            <p className="text-2xs text-accent-400 mt-2 font-medium">
              ⚡ Only {product.stock} left in stock
            </p>
          )}
        </div>
      </Link>
    </motion.article>
  )
}