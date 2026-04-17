import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag, ArrowRight, ArrowLeft, Trash2 } from 'lucide-react'
import SEOHead from '@components/common/SEOHead'
import CartItem from '@components/cart/CartItem'
import CartSummary from '@components/cart/CartSummary'
import { useCart } from '@hooks/useCart'
import { formatPrice } from '@utils/formatters'

export default function CartPage() {
  const { items, subtotal, isEmpty, clearCart, totalItems } = useCart()

  return (
    <>
      <SEOHead
        title="Shopping Cart"
        description="Review your selected AHEZA 2050 mattresses before checkout."
        url="https://aheza2050.rw/cart"
      />

      <div
        className="bg-dark min-h-screen"
        style={{ paddingTop: 'var(--navbar-height)' }}
      >
        {/* Page Header */}
        <div className="bg-surface border-b border-white/5">
          <div className="container-custom py-8">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-2 mb-1">
                <div className="h-px w-6 bg-primary-500" />
                <span className="text-xs font-semibold tracking-widest text-primary-400 uppercase">Shopping Cart</span>
              </div>
              <h1 className="font-display font-black text-white text-3xl">
                Your Cart
                {!isEmpty && (
                  <span className="ml-3 text-lg text-neutral-500 font-normal">
                    ({totalItems} item{totalItems !== 1 ? 's' : ''})
                  </span>
                )}
              </h1>
            </motion.div>
          </div>
        </div>

        <div className="container-custom py-10">
          <AnimatePresence mode="wait">
            {isEmpty ? (
              /* Empty State */
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-24 text-center gap-6"
              >
                <div className="relative">
                  <div className="w-28 h-28 rounded-full bg-neutral-800/50 flex items-center justify-center">
                    <ShoppingBag className="w-12 h-12 text-neutral-700" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary-600/20 border border-primary-500/30 flex items-center justify-center">
                    <span className="text-primary-400 text-xs font-bold">0</span>
                  </div>
                </div>
                <div>
                  <h2 className="font-display font-bold text-white text-2xl mb-2">
                    Your cart is empty
                  </h2>
                  <p className="text-neutral-400 text-base max-w-sm">
                    Discover our premium mattress collection and add your favourite to the cart.
                  </p>
                </div>
                <Link
                  to="/products"
                  className="flex items-center gap-2 px-8 py-4 bg-primary-600 hover:bg-primary-500 text-white font-semibold rounded-2xl text-sm transition-all shadow-glow-sm hover:shadow-glow-md"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Browse Mattresses
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            ) : (
              /* Cart Content */
              <motion.div
                key="cart"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid lg:grid-cols-[1fr_340px] gap-10 items-start"
              >
                {/* Items */}
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <h2 className="font-semibold text-white">
                      {totalItems} Item{totalItems !== 1 ? 's' : ''}
                    </h2>
                    <button
                      onClick={clearCart}
                      className="flex items-center gap-1.5 text-sm text-neutral-500 hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Clear Cart
                    </button>
                  </div>

                  <div className="space-y-4">
                    <AnimatePresence initial={false}>
                      {items.map((item) => (
                        <motion.div
                          key={`${item.id}-${item.size}`}
                          layout
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, height: 0, overflow: 'hidden' }}
                          transition={{ duration: 0.35 }}
                        >
                          {/* Expanded cart item card */}
                          <div className="glass border border-white/5 rounded-2xl p-5 flex gap-4">
                            {/* Image */}
                            <div className="w-24 h-24 rounded-xl bg-neutral-800 flex-shrink-0 overflow-hidden">
                              {item.image ? (
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="w-full h-full object-cover"
                                  loading="lazy"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-3xl">🛏</div>
                              )}
                            </div>
                            {/* Info */}
                            <div className="flex-1 min-w-0">
                              <Link
                                to={`/products/${item.slug}`}
                                className="font-display font-bold text-white hover:text-primary-300 transition-colors line-clamp-1"
                              >
                                {item.name}
                              </Link>
                              {item.size && (
                                <p className="text-neutral-500 text-xs mt-0.5 capitalize">
                                  Size: {item.size}
                                </p>
                              )}
                              <p className="text-primary-400 font-bold mt-1 text-sm">
                                {formatPrice(item.price)}
                              </p>
                            </div>
                            {/* Inline CartItem controls */}
                            <CartItem item={item} />
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>

                  <Link
                    to="/products"
                    className="inline-flex items-center gap-2 mt-6 text-sm text-neutral-400 hover:text-white transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" /> Continue Shopping
                  </Link>
                </div>

                {/* Summary */}
                <div className="sticky top-24">
                  <CartSummary subtotal={subtotal} />
                  <Link
                    to="/checkout"
                    className="mt-4 flex items-center justify-center gap-2 w-full py-4 bg-primary-600 hover:bg-primary-500 text-white font-bold rounded-2xl text-sm transition-all shadow-glow-sm hover:shadow-glow-md"
                  >
                    Proceed to Checkout
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <div className="mt-4 flex flex-wrap justify-center gap-3">
                    {['Secure', 'Free Delivery', '100-Night Trial'].map((b) => (
                      <span key={b} className="text-2xs text-neutral-600">✓ {b}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  )
}