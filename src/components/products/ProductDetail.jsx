import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  ShoppingCart, Heart, Share2, Star, Shield,
  Truck, RotateCcw, ChevronDown, ChevronUp,
  BadgeCheck, Minus, Plus, Phone
} from 'lucide-react'
import { useCart } from '@hooks/useCart'
import { formatPrice, calcDiscountPercent } from '@utils/formatters'
import { MATTRESS_SIZES } from '@utils/constants'
import { CONTACT_INFO } from '@utils/constants'
import toast from 'react-hot-toast'
import clsx from 'clsx'

function AccordionItem({ title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="border-b border-white/5">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center justify-between w-full py-4 text-left group"
      >
        <span className="font-semibold text-white text-sm group-hover:text-primary-300 transition-colors">
          {title}
        </span>
        {open
          ? <ChevronUp className="w-4 h-4 text-neutral-500 flex-shrink-0" />
          : <ChevronDown className="w-4 h-4 text-neutral-500 flex-shrink-0" />
        }
      </button>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="pb-4"
        >
          {children}
        </motion.div>
      )}
    </div>
  )
}

export default function ProductDetail({ product }) {
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || '')
  const [quantity,     setQuantity]     = useState(1)
  const [wishlisted,   setWishlisted]   = useState(false)
  const { addItem, isInCart }           = useCart()

  if (!product) return null

  const inCart   = isInCart(product.id)
  const discount = product.originalPrice
    ? calcDiscountPercent(product.originalPrice, product.price)
    : 0

  const handleAddToCart = () => {
    if (!selectedSize && product.sizes?.length > 0) {
      toast.error('Please select a size')
      return
    }
    addItem({
      id:       product.id,
      name:     product.name,
      price:    product.price,
      image:    product.images?.[0],
      size:     selectedSize,
      slug:     product.slug,
      quantity,
    })
  }

  const handleShare = async () => {
    try {
      await navigator.share({
        title: product.name,
        text:  product.description,
        url:   window.location.href,
      })
    } catch {
      navigator.clipboard.writeText(window.location.href)
      toast.success('Link copied to clipboard!')
    }
  }

  return (
    <div className="flex flex-col gap-6">

      {/* Badges */}
      <div className="flex flex-wrap gap-2">
        {product.type && (
          <span className="px-3 py-1 rounded-full bg-primary-600/15 border border-primary-500/25 text-primary-300 text-xs font-semibold">
            {product.type.replace(/_/g, ' ')}
          </span>
        )}
        {product.certified && (
          <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-green-600/15 border border-green-500/25 text-green-300 text-xs font-semibold">
            <BadgeCheck className="w-3 h-3" /> Certified
          </span>
        )}
        {product.isNew && (
          <span className="px-3 py-1 rounded-full bg-accent-600/15 border border-accent-500/25 text-accent-300 text-xs font-semibold">
            New Arrival
          </span>
        )}
      </div>

      {/* Name */}
      <h1 className="font-display font-black text-white heading-md leading-tight">
        {product.name}
      </h1>

      {/* Rating Row */}
      {product.rating && (
        <div className="flex items-center gap-3">
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className="w-4 h-4"
                style={{
                  fill:  i < Math.round(product.rating) ? '#2d55ff' : 'none',
                  color: i < Math.round(product.rating) ? '#2d55ff' : '#4a4a5a',
                }}
              />
            ))}
          </div>
          <span className="text-sm text-neutral-300 font-semibold">
            {Number(product.rating).toFixed(1)}
          </span>
          <span className="text-neutral-600 text-sm">·</span>
          <span className="text-neutral-500 text-sm">
            {product.reviewCount || 0} reviews
          </span>
        </div>
      )}

      {/* Price */}
      <div className="flex items-end gap-3">
        <span className="font-display font-black text-white text-4xl">
          {formatPrice(product.price)}
        </span>
        {product.originalPrice && (
          <div className="flex flex-col pb-1">
            <span className="text-neutral-600 text-base line-through">
              {formatPrice(product.originalPrice)}
            </span>
            <span className="text-accent-400 text-xs font-bold">
              Save {discount}%
            </span>
          </div>
        )}
      </div>

      {/* Description */}
      <p className="text-neutral-400 text-sm leading-relaxed">
        {product.description}
      </p>

      {/* Size Selector */}
      {product.sizes?.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-semibold text-white">Size</p>
            {selectedSize && (
              <span className="text-xs text-neutral-500">
                {MATTRESS_SIZES.find(s => s.value === selectedSize)?.dimensions}
              </span>
            )}
          </div>
          <div className="grid grid-cols-3 gap-2">
            {MATTRESS_SIZES.filter(s => product.sizes.includes(s.value)).map((size) => (
              <button
                key={size.value}
                onClick={() => setSelectedSize(size.value)}
                className={clsx(
                  'flex flex-col items-center justify-center px-3 py-2.5 rounded-xl border text-sm font-semibold transition-all duration-300',
                  selectedSize === size.value
                    ? 'bg-primary-600/20 border-primary-500/50 text-primary-300 shadow-glow-sm'
                    : 'border-white/8 hover:border-white/20 text-neutral-400 hover:text-white hover:bg-white/5'
                )}
              >
                <span>{size.label}</span>
                <span className="text-2xs font-normal mt-0.5 text-neutral-500">{size.dimensions}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quantity */}
      <div className="flex items-center gap-4">
        <p className="text-sm font-semibold text-white">Quantity</p>
        <div className="flex items-center gap-2 glass border border-white/10 rounded-xl p-1">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="w-8 h-8 rounded-lg hover:bg-white/10 flex items-center justify-center text-neutral-300 hover:text-white transition-colors"
            aria-label="Decrease quantity"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <span className="w-8 text-center text-white font-bold text-sm">{quantity}</span>
          <button
            onClick={() => setQuantity((q) => Math.min(product.stock || 99, q + 1))}
            className="w-8 h-8 rounded-lg hover:bg-white/10 flex items-center justify-center text-neutral-300 hover:text-white transition-colors"
            aria-label="Increase quantity"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>
        {product.stock !== undefined && (
          <span className={clsx(
            'text-xs font-medium',
            product.stock === 0
              ? 'text-red-400'
              : product.stock < 5
              ? 'text-accent-400'
              : 'text-green-400'
          )}>
            {product.stock === 0
              ? 'Out of stock'
              : product.stock < 5
              ? `Only ${product.stock} left`
              : 'In stock'}
          </span>
        )}
      </div>

      {/* CTA Buttons */}
      <div className="flex flex-col gap-3">
        <div className="flex gap-3">
          <motion.button
            onClick={handleAddToCart}
            disabled={inCart || product.stock === 0}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className={clsx(
              'flex-1 flex items-center justify-center gap-2.5 py-4 font-semibold rounded-2xl text-sm transition-all duration-300',
              inCart
                ? 'bg-green-700/30 border border-green-600/30 text-green-300'
                : product.stock === 0
                ? 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
                : 'bg-primary-600 hover:bg-primary-500 text-white shadow-glow-sm hover:shadow-glow-md'
            )}
          >
            <ShoppingCart className="w-4 h-4" />
            {inCart ? 'Added to Cart ✓' : product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
          </motion.button>

          <motion.button
            onClick={() => setWishlisted((w) => !w)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={clsx(
              'w-12 h-12 rounded-2xl flex items-center justify-center border transition-all duration-300',
              wishlisted
                ? 'bg-red-500/20 border-red-400/40 text-red-400'
                : 'glass border-white/10 hover:border-white/25 text-neutral-400 hover:text-white'
            )}
            aria-label="Add to wishlist"
          >
            <Heart className={clsx('w-4.5 h-4.5', wishlisted && 'fill-current')} />
          </motion.button>

          <motion.button
            onClick={handleShare}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-12 h-12 rounded-2xl glass border border-white/10 hover:border-white/25 flex items-center justify-center text-neutral-400 hover:text-white transition-all"
            aria-label="Share product"
          >
            <Share2 className="w-4.5 h-4.5" />
          </motion.button>
        </div>

        {/* Call to order */}
        <a
          href={`tel:${CONTACT_INFO.phone}`}
          className="flex items-center justify-center gap-2 py-3.5 glass border border-white/10 hover:border-white/20 text-neutral-300 hover:text-white rounded-2xl text-sm font-semibold transition-all duration-300"
        >
          <Phone className="w-4 h-4" />
          Order by Phone: {CONTACT_INFO.phone}
        </a>
      </div>

      {/* Trust Badges */}
      <div className="grid grid-cols-3 gap-3 py-4 border-t border-b border-white/5">
        {[
          { icon: Truck,     title: 'Free Delivery',  sub: 'In Musanze' },
          { icon: Shield,    title: 'Warranty',        sub: 'Up to 15 years' },
          { icon: RotateCcw, title: '100-Night Trial', sub: 'Free returns' },
        ].map(({ icon: Icon, title, sub }) => (
          <div key={title} className="flex flex-col items-center gap-1.5 text-center">
            <div className="w-9 h-9 rounded-xl bg-primary-600/15 border border-primary-500/20 flex items-center justify-center">
              <Icon className="w-4 h-4 text-primary-400" />
            </div>
            <p className="text-white text-xs font-semibold">{title}</p>
            <p className="text-neutral-600 text-2xs">{sub}</p>
          </div>
        ))}
      </div>

      {/* Accordion Details */}
      <div>
        <AccordionItem title="Product Specifications" defaultOpen>
          {product.specs && (
            <div className="space-y-2">
              {Object.entries(product.specs).map(([key, value]) => (
                <div key={key} className="flex justify-between text-sm">
                  <span className="text-neutral-500 capitalize">{key.replace(/_/g, ' ')}</span>
                  <span className="text-neutral-300">{value}</span>
                </div>
              ))}
            </div>
          )}
        </AccordionItem>
        <AccordionItem title="Materials & Care">
          <p className="text-neutral-400 text-sm leading-relaxed">
            {product.materials || 'Made with CertiPUR-US certified foams, organic cotton cover, and sustainably sourced materials. Spot clean only.'}
          </p>
        </AccordionItem>
        <AccordionItem title="Delivery & Returns">
          <div className="space-y-2 text-sm text-neutral-400">
            <p>• Free delivery within Musanze city</p>
            <p>• 1–3 business days for other areas</p>
            <p>• 100-night sleep trial — free pickup if not satisfied</p>
            <p>• Warranty: {product.warranty || 'Up to 15 years depending on model'}</p>
          </div>
        </AccordionItem>
      </div>
    </div>
  )
}