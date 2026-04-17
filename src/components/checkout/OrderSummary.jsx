import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ShoppingBag, Tag, Edit2 } from 'lucide-react'
import { formatPrice, truncate } from '@utils/formatters'

export default function OrderSummary({ items = [], subtotal = 0, deliveryFee = 0 }) {
  const total = subtotal + deliveryFee

  return (
    <div className="glass border border-white/5 rounded-2xl overflow-hidden sticky top-24">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
        <div className="flex items-center gap-2">
          <ShoppingBag className="w-4 h-4 text-primary-400" />
          <h3 className="font-semibold text-white text-sm">Order Summary</h3>
        </div>
        <Link
          to="/cart"
          className="flex items-center gap-1 text-xs text-neutral-500 hover:text-primary-300 transition-colors"
        >
          <Edit2 className="w-3 h-3" /> Edit
        </Link>
      </div>

      {/* Items */}
      <div className="px-6 py-4 space-y-4 max-h-72 overflow-y-auto">
        {items.map((item) => (
          <motion.div
            key={`${item.id}-${item.size}`}
            layout
            className="flex gap-3"
          >
            {/* Image / Icon */}
            <div className="w-14 h-14 rounded-xl bg-neutral-800 flex-shrink-0 overflow-hidden">
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-xl">🛏</div>
              )}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <p className="text-white text-xs font-semibold truncate">{item.name}</p>
              {item.size && (
                <p className="text-neutral-600 text-2xs mt-0.5">{item.size}</p>
              )}
              <div className="flex items-center justify-between mt-1">
                <span className="text-neutral-500 text-xs">×{item.quantity}</span>
                <span className="text-white text-xs font-bold">
                  {formatPrice(item.price * item.quantity)}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Totals */}
      <div className="px-6 py-4 border-t border-white/5 space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-neutral-400">Subtotal</span>
          <span className="text-white">{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-neutral-400">Delivery</span>
          <span className={deliveryFee === 0 ? 'text-green-400 font-semibold' : 'text-white'}>
            {deliveryFee === 0 ? 'Free' : formatPrice(deliveryFee)}
          </span>
        </div>
        <div className="h-px bg-white/5" />
        <div className="flex justify-between items-center">
          <span className="text-white font-bold">Total</span>
          <span className="text-primary-300 font-black text-xl font-display">
            {formatPrice(total)}
          </span>
        </div>
      </div>

      {/* Badges */}
      <div className="px-6 pb-5">
        <div className="flex flex-wrap gap-2">
          {['Secure Checkout', '100-Night Trial', 'Free Delivery'].map((badge) => (
            <span
              key={badge}
              className="px-2.5 py-1 bg-primary-600/10 border border-primary-500/15 text-primary-400 text-2xs font-medium rounded-full"
            >
              ✓ {badge}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}