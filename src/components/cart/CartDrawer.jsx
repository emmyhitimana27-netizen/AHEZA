import { AnimatePresence, motion } from 'framer-motion'
import { X, ShoppingBag, ArrowRight, Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useCart } from '@hooks/useCart'
import { formatPrice } from '@utils/formatters'
import CartItem from './CartItem'
import CartSummary from './CartSummary'

export default function CartDrawer() {
  const { isOpen, closeCart, items, isEmpty, clearCart, subtotal } = useCart()

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[70] bg-dark/80 backdrop-blur-sm"
            onClick={closeCart}
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.aside
            key="drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 right-0 bottom-0 z-[80] w-full max-w-sm bg-surface border-l border-white/5 flex flex-col shadow-2xl"
            aria-label="Shopping cart"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-primary-600/20 flex items-center justify-center">
                  <ShoppingBag className="w-4 h-4 text-primary-400" />
                </div>
                <h2 className="font-display font-bold text-white text-lg">Your Cart</h2>
              </div>
              <div className="flex items-center gap-2">
                {!isEmpty && (
                  <button
                    onClick={clearCart}
                    className="text-xs text-neutral-500 hover:text-red-400 flex items-center gap-1 transition-colors"
                    aria-label="Clear cart"
                  >
                    <Trash2 className="w-3 h-3" /> Clear
                  </button>
                )}
                <button
                  onClick={closeCart}
                  className="w-8 h-8 rounded-xl hover:bg-white/5 flex items-center justify-center text-neutral-400 hover:text-white transition-colors"
                  aria-label="Close cart"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto overscroll-contain px-6 py-4">
              {isEmpty ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center justify-center h-full gap-5 text-center"
                >
                  <div className="w-20 h-20 rounded-full bg-neutral-800/60 flex items-center justify-center">
                    <ShoppingBag className="w-9 h-9 text-neutral-600" />
                  </div>
                  <div>
                    <p className="text-neutral-300 font-semibold mb-1">Your cart is empty</p>
                    <p className="text-neutral-500 text-sm">Explore our premium collection</p>
                  </div>
                  <Link
                    to="/products"
                    onClick={closeCart}
                    className="flex items-center gap-2 px-5 py-2.5 bg-primary-600 hover:bg-primary-500 text-white rounded-xl text-sm font-semibold transition-colors"
                  >
                    Browse Products <ArrowRight className="w-4 h-4" />
                  </Link>
                </motion.div>
              ) : (
                <div className="space-y-4">
                  <AnimatePresence initial={false}>
                    {items.map((item) => (
                      <CartItem key={item.id} item={item} />
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Footer */}
            {!isEmpty && (
              <div className="border-t border-white/5 px-6 py-5">
                <CartSummary subtotal={subtotal} compact />
                <Link
                  to="/checkout"
                  onClick={closeCart}
                  className="mt-4 flex items-center justify-center gap-2 w-full py-3.5 bg-primary-600 hover:bg-primary-500 text-white font-semibold rounded-xl text-sm transition-colors shadow-glow-sm hover:shadow-glow-md"
                >
                  Proceed to Checkout <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/cart"
                  onClick={closeCart}
                  className="mt-2 flex items-center justify-center w-full py-2.5 text-sm text-neutral-400 hover:text-white transition-colors"
                >
                  View Full Cart
                </Link>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}