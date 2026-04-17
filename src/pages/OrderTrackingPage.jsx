import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Package, Truck, CheckCircle2,
  Clock, Search, AlertCircle,
  MapPin, Phone, Calendar
} from 'lucide-react'
import SEOHead from '@components/common/SEOHead'
import { orderService } from '@services/orderService'
import { formatDate, formatPrice, formatStatus } from '@utils/formatters'
import { CONTACT_INFO } from '@utils/constants'
import toast from 'react-hot-toast'
import clsx from 'clsx'

const ORDER_STATUSES = [
  { key: 'confirmed',  label: 'Order Confirmed', icon: CheckCircle2 },
  { key: 'processing', label: 'Processing',       icon: Package },
  { key: 'shipped',    label: 'On the Way',       icon: Truck },
  { key: 'delivered',  label: 'Delivered',        icon: CheckCircle2 },
]

function StatusTimeline({ currentStatus }) {
  const statusIndex = ORDER_STATUSES.findIndex((s) => s.key === currentStatus)

  return (
    <div className="relative">
      {/* Connecting line */}
      <div className="absolute top-5 left-5 right-5 h-0.5 bg-white/5" />
      <motion.div
        className="absolute top-5 left-5 h-0.5 bg-primary-500"
        initial={{ width: 0 }}
        animate={{
          width: `${Math.max(0, (statusIndex / (ORDER_STATUSES.length - 1)) * 100)}%`,
        }}
        transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
      />

      <div className="relative flex justify-between">
        {ORDER_STATUSES.map((status, i) => {
          const Icon = status.icon
          const isDone    = i <= statusIndex
          const isCurrent = i === statusIndex

          return (
            <motion.div
              key={status.key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
              className="flex flex-col items-center gap-2 flex-1"
            >
              <div
                className={clsx(
                  'w-10 h-10 rounded-full flex items-center justify-center z-10 border-2 transition-all duration-500',
                  isDone
                    ? 'bg-primary-600 border-primary-400 shadow-glow-sm'
                    : 'bg-surface border-white/10',
                  isCurrent && 'ring-4 ring-primary-500/25'
                )}
              >
                <Icon
                  className={clsx('w-4.5 h-4.5', isDone ? 'text-white' : 'text-neutral-600')}
                />
              </div>
              <p
                className={clsx(
                  'text-2xs font-semibold text-center leading-tight max-w-16',
                  isCurrent ? 'text-primary-300' : isDone ? 'text-white' : 'text-neutral-600'
                )}
              >
                {status.label}
              </p>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

export default function OrderTrackingPage() {
  const [searchParams] = useSearchParams()
  const [trackingInput, setTrackingInput] = useState(
    searchParams.get('tracking') || ''
  )
  const [order,   setOrder]   = useState(null)
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState(null)

  /* Auto-search if tracking number in URL */
  useEffect(() => {
    const urlTracking = searchParams.get('tracking')
    if (urlTracking) handleSearch(urlTracking)
  }, [])

  const handleSearch = async (customTracking) => {
    const tracking = (customTracking || trackingInput).trim()
    if (!tracking) { toast.error('Please enter a tracking number'); return }

    try {
      setLoading(true)
      setError(null)
      setOrder(null)
      const result = await orderService.track(tracking)
      setOrder(result.order)
    } catch (err) {
      const msg = err?.status === 404
        ? 'No order found with that tracking number. Please check and try again.'
        : 'Failed to track order. Please try again.'
      setError(msg)
      toast.error(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <SEOHead
        title="Track Your Order"
        description="Track your AHEZA 2050 mattress delivery in real-time. Enter your tracking number to see your order status."
        url="https://aheza2050.rw/track-order"
      />

      <div className="bg-dark min-h-screen" style={{ paddingTop: 'var(--navbar-height)' }}>

        {/* Header */}
        <section className="relative py-14 lg:py-20 bg-surface overflow-hidden">
          <div className="absolute inset-0 grid-pattern opacity-15 pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-primary-700/8 rounded-full blur-[120px] pointer-events-none" />
          <div className="container-custom relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center justify-center gap-2 mb-4">
                <Truck className="w-4 h-4 text-primary-400" />
                <span className="text-xs font-semibold tracking-widest text-primary-400 uppercase">Order Tracking</span>
              </div>
              <h1 className="font-display font-black text-white heading-lg mb-4">
                Track Your <span className="text-gradient-primary">Delivery</span>
              </h1>
              <p className="text-neutral-400 text-base max-w-md mx-auto mb-8">
                Enter your order tracking number to get real-time delivery updates.
              </p>

              {/* Search Input */}
              <form
                onSubmit={(e) => { e.preventDefault(); handleSearch() }}
                className="flex gap-2 max-w-lg mx-auto"
              >
                <input
                  type="text"
                  value={trackingInput}
                  onChange={(e) => setTrackingInput(e.target.value)}
                  placeholder="Enter tracking number (e.g. AHZ-2024-0001)"
                  className="flex-1 bg-white/5 border border-white/10 focus:border-primary-500/50 rounded-xl px-5 py-3.5 text-sm text-white placeholder-neutral-600 outline-none transition-colors"
                />
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-2 px-6 py-3.5 bg-primary-600 hover:bg-primary-500 disabled:opacity-50 text-white font-semibold rounded-xl text-sm transition-colors flex-shrink-0"
                >
                  {loading ? (
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <Search className="w-4 h-4" />
                  )}
                  Track
                </motion.button>
              </form>
            </motion.div>
          </div>
        </section>

        <div className="container-custom py-10 max-w-3xl">
          <AnimatePresence mode="wait">

            {/* Loading */}
            {loading && (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center gap-4 py-20"
              >
                <div className="w-14 h-14 rounded-full border-2 border-primary-500/30 border-t-primary-500 animate-spin" />
                <p className="text-neutral-400 text-sm">Tracking your order…</p>
              </motion.div>
            )}

            {/* Error */}
            {!loading && error && !order && (
              <motion.div
                key="error"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="glass border border-red-500/15 rounded-2xl p-8 text-center"
              >
                <div className="w-14 h-14 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-4">
                  <AlertCircle className="w-7 h-7 text-red-400" />
                </div>
                <h3 className="font-semibold text-white text-lg mb-2">Order Not Found</h3>
                <p className="text-neutral-400 text-sm mb-6">{error}</p>
                <a
                  href={`tel:${CONTACT_INFO.phone}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary-600 hover:bg-primary-500 text-white rounded-xl text-sm font-semibold transition-colors"
                >
                  <Phone className="w-4 h-4" /> Call for Help
                </a>
              </motion.div>
            )}

            {/* Order Result */}
            {!loading && order && (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                {/* Status Timeline */}
                <div className="glass border border-white/5 rounded-2xl p-7">
                  <div className="flex items-start justify-between mb-8">
                    <div>
                      <p className="text-neutral-500 text-xs uppercase tracking-wide mb-1">Order ID</p>
                      <p className="text-white font-bold text-lg">#{order.id}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-neutral-500 text-xs uppercase tracking-wide mb-1">Status</p>
                      <span
                        className={clsx(
                          'px-3 py-1.5 rounded-full text-xs font-bold',
                          order.status === 'delivered'
                            ? 'bg-green-500/20 text-green-300 border border-green-500/25'
                            : order.status === 'cancelled'
                            ? 'bg-red-500/20 text-red-300 border border-red-500/25'
                            : 'bg-primary-600/20 text-primary-300 border border-primary-500/25'
                        )}
                      >
                        {formatStatus(order.status)}
                      </span>
                    </div>
                  </div>

                  {order.status !== 'cancelled' && (
                    <StatusTimeline currentStatus={order.status} />
                  )}
                </div>

                {/* Order Details */}
                <div className="glass border border-white/5 rounded-2xl p-6 space-y-5">
                  <h3 className="font-display font-bold text-white text-lg">Order Details</h3>

                  {/* Items */}
                  <div className="space-y-3">
                    {order.items?.map((item, i) => (
                      <div key={i} className="flex items-center justify-between text-sm">
                        <div>
                          <p className="text-white font-medium">{item.productName}</p>
                          {item.size && (
                            <p className="text-neutral-500 text-xs">{item.size} × {item.quantity}</p>
                          )}
                        </div>
                        <span className="text-neutral-300">{formatPrice(item.price * item.quantity)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="h-px bg-white/5" />

                  {/* Logistics Info */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    {[
                      { icon: MapPin,    label: 'Delivering To',    value: `${order.address}, ${order.district}` },
                      { icon: Calendar,  label: 'Order Date',       value: formatDate(order.createdAt) },
                      { icon: Clock,     label: 'Est. Delivery',    value: order.estimatedDelivery ? formatDate(order.estimatedDelivery) : `${order.estimatedDays || '1-3'} business days` },
                      { icon: Package,   label: 'Total',            value: formatPrice(order.total) },
                    ].map(({ icon: Icon, label, value }) => (
                      <div key={label} className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-primary-600/12 flex items-center justify-center flex-shrink-0">
                          <Icon className="w-3.5 h-3.5 text-primary-400" />
                        </div>
                        <div>
                          <p className="text-neutral-600 text-xs">{label}</p>
                          <p className="text-neutral-300 text-sm">{value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Help */}
                <div className="glass border border-white/5 rounded-2xl p-5 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-white font-semibold text-sm mb-0.5">Need help with your order?</p>
                    <p className="text-neutral-500 text-xs">Our team is available Mon–Sat, 8am–7pm</p>
                  </div>
                  <a
                    href={`tel:${CONTACT_INFO.phone}`}
                    className="flex items-center gap-2 px-4 py-2.5 bg-primary-600 hover:bg-primary-500 text-white rounded-xl text-sm font-semibold transition-colors flex-shrink-0"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    Call Us
                  </a>
                </div>
              </motion.div>
            )}

            {/* Initial State (no search yet) */}
            {!loading && !order && !error && (
              <motion.div
                key="idle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-20 text-center gap-5"
              >
                <div className="w-20 h-20 rounded-full bg-primary-600/10 border border-primary-500/20 flex items-center justify-center">
                  <Truck className="w-9 h-9 text-primary-600" />
                </div>
                <div>
                  <p className="text-neutral-300 font-semibold mb-1">Enter your tracking number above</p>
                  <p className="text-neutral-500 text-sm">
                    You'll find your tracking number in the confirmation SMS/email sent after ordering.
                  </p>
                </div>
                <a
                  href={`tel:${CONTACT_INFO.phone}`}
                  className="text-primary-400 hover:text-primary-300 text-sm font-medium transition-colors flex items-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5" />
                  Don't have it? Call us: {CONTACT_INFO.phone}
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  )
}