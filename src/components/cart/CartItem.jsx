import { motion } from 'framer-motion'
import { Minus, Plus, Trash2 } from 'lucide-react'
import { useCart } from '@hooks/useCart'
import { formatPrice } from '@utils/formatters'

export default function CartItem({ item }) {
  const { updateQuantity, removeItem } = useCart()

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20, height: 0, marginBottom: 0 }}
      transition={{ duration: 0.3 }}
      className="flex gap-3 p-3 glass rounded-xl border border-white/5"
    >
      {/* Image */}
      <div className="w-20 h-20 rounded-lg bg-neutral-800 flex-shrink-0 overflow-hidden">
        {item.image ? (
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-neutral-600 text-2xl">🛏</div>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-white text-sm font-semibold truncate">{item.name}</p>
        {item.size && (
          <p className="text-neutral-500 text-xs mt-0.5">{item.size}</p>
        )}
        <p className="text-primary-400 text-sm font-bold mt-1">
          {formatPrice(item.price)}
        </p>

        {/* Quantity Controls */}
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-1">
            <button
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              className="w-6 h-6 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-neutral-300 transition-colors"
              aria-label="Decrease quantity"
            >
              <Minus className="w-3 h-3" />
            </button>
            <span className="w-7 text-center text-sm font-semibold text-white">
              {item.quantity}
            </span>
            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="w-6 h-6 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-neutral-300 transition-colors"
              aria-label="Increase quantity"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>
          <button
            onClick={() => removeItem(item.id)}
            className="text-neutral-600 hover:text-red-400 transition-colors"
            aria-label="Remove item"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  )
}