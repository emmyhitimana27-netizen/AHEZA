import { useState } from 'react'
import { Navigate, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag, ArrowLeft, Lock } from 'lucide-react'
import SEOHead from '@components/common/SEOHead'
import CheckoutForm from '@components/checkout/CheckoutForm'
import OrderSummary from '@components/checkout/OrderSummary'
import PaymentSection from '@components/checkout/PaymentSection'
import { useCart } from '@hooks/useCart'
import { orderService } from '@services/orderService'
import toast from 'react-hot-toast'

export default function CheckoutPage() {
  const { items, subtotal, isEmpty, clearCart } = useCart()
  const [loading,       setLoading]       = useState(false)
  const [completedOrder, setCompletedOrder] = useState(null)

  /* Redirect if cart is empty and no completed order */
  if (isEmpty && !completedOrder) {
    return <Navigate to="/cart" replace />
  }

  const handleCheckoutSubmit = async (formData) => {
    try {
      setLoading(true)

      const orderPayload = {
        items: items.map((item) => ({
          productId: item.id,
          quantity:  item.quantity,
          size:      item.size,
          price:     item.price,
        })),
        ...formData,
      }

      const result = await orderService.create(orderPayload)
      setCompletedOrder(result.order)
      clearCart()
      toast.success('Order placed successfully!')
    } catch (err) {
      toast.error(err?.message || 'Failed to place order. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <SEOHead
        title="Checkout"
        description="Complete your AHEZA 2050 mattress order. Secure checkout with MoMo, cash on delivery, or card payment."
        url="https://aheza2050.rw/checkout"
      />

      <div
        className="bg-dark min-h-screen"
        style={{ paddingTop: 'var(--navbar-height)' }}
      >
        {/* Header */}
        <div className="bg-surface border-b border-white/5">
          <div className="container-custom py-5 flex items-center justify-between">
            {!completedOrder && (
              <Link
                to="/cart"
                className="flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Cart
              </Link>
            )}
            <div className="flex items-center gap-2 mx-auto">
              <Lock className="w-4 h-4 text-green-400" />
              <span className="text-sm font-semibold text-white">Secure Checkout</span>
            </div>
            {!completedOrder && (
              <div className="flex items-center gap-1.5 text-sm text-neutral-500">
                <ShoppingBag className="w-4 h-4" />
                <span>{items.length} item{items.length !== 1 ? 's' : ''}</span>
              </div>
            )}
          </div>
        </div>

        <div className="container-custom py-10">
          <AnimatePresence mode="wait">
            {completedOrder ? (
              /* Success State */
              <motion.div
                key="success"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-10"
              >
                <PaymentSection order={completedOrder} />
              </motion.div>
            ) : (
              /* Checkout Form */
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid lg:grid-cols-[1fr_380px] gap-10 items-start"
              >
                <div>
                  <h1 className="font-display font-black text-white text-2xl mb-8">
                    Complete Your Order
                  </h1>
                  <CheckoutForm
                    onSubmit={handleCheckoutSubmit}
                    loading={loading}
                    cartSubtotal={subtotal}
                  />
                </div>
                <div>
                  <h2 className="font-display font-bold text-white text-lg mb-5">
                    Your Order
                  </h2>
                  <OrderSummary items={items} subtotal={subtotal} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  )
}