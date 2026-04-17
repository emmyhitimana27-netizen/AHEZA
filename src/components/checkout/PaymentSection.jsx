import { motion } from 'framer-motion'
import { CheckCircle2, Copy, Phone, ExternalLink } from 'lucide-react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { CONTACT_INFO } from '@utils/constants'
import { formatPrice } from '@utils/formatters'

export default function PaymentSection({ order }) {
  const [copied, setCopied] = useState(false)

  const copyTrackingNumber = async () => {
    if (!order?.trackingNumber) return
    try {
      await navigator.clipboard.writeText(order.trackingNumber)
      setCopied(true)
      toast.success('Tracking number copied!')
      setTimeout(() => setCopied(false), 3000)
    } catch {
      toast.error('Could not copy. Please copy manually.')
    }
  }

  if (!order) return null

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="max-w-lg mx-auto text-center"
    >
      {/* Success Icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
        className="w-20 h-20 rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center mx-auto mb-6"
      >
        <CheckCircle2 className="w-10 h-10 text-green-400" />
      </motion.div>

      <h2 className="font-display font-black text-white text-3xl mb-2">
        Order Confirmed!
      </h2>
      <p className="text-neutral-400 text-base mb-8">
        Your order has been placed successfully. We'll deliver to your address within {order.estimatedDays || '1-3'} business days.
      </p>

      {/* Order Details Card */}
      <div className="glass border border-white/5 rounded-2xl p-6 mb-6 text-left space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-neutral-500 text-xs uppercase tracking-wide mb-1">Order ID</p>
            <p className="text-white font-bold">#{order.id}</p>
          </div>
          <div className="text-right">
            <p className="text-neutral-500 text-xs uppercase tracking-wide mb-1">Total Paid</p>
            <p className="text-primary-300 font-black text-lg font-display">
              {formatPrice(order.total)}
            </p>
          </div>
        </div>

        {/* Tracking Number */}
        {order.trackingNumber && (
          <div className="bg-primary-600/10 border border-primary-500/20 rounded-xl p-4">
            <p className="text-neutral-400 text-xs mb-1">Tracking Number</p>
            <div className="flex items-center justify-between gap-2">
              <span className="text-white font-bold font-mono text-sm">
                {order.trackingNumber}
              </span>
              <button
                onClick={copyTrackingNumber}
                className="flex items-center gap-1.5 text-xs text-primary-400 hover:text-primary-300 transition-colors"
              >
                <Copy className="w-3.5 h-3.5" />
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>
        )}

        {/* Payment Method */}
        <div className="flex justify-between text-sm">
          <span className="text-neutral-500">Payment Method</span>
          <span className="text-white capitalize">{order.paymentMethod?.replace('_', ' ')}</span>
        </div>

        {/* Delivery */}
        <div className="flex justify-between text-sm">
          <span className="text-neutral-500">Delivering To</span>
          <span className="text-white text-right max-w-[60%]">{order.address}, {order.district}</span>
        </div>

        {/* MoMo instructions */}
        {order.paymentMethod === 'momo' && (
          <div className="bg-amber-500/8 border border-amber-500/20 rounded-xl p-4">
            <p className="text-amber-300 text-xs font-semibold mb-2">Complete Your Payment</p>
            <p className="text-neutral-400 text-xs leading-relaxed">
              Dial <strong className="text-white">*182*8*1#</strong> and send{' '}
              <strong className="text-white">{formatPrice(order.total)}</strong> to{' '}
              <strong className="text-white">+250 788 000 000</strong>.
              Use your order ID <strong className="text-white">#{order.id}</strong> as reference.
            </p>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-3">
        <a
          href={`/track-order?tracking=${order.trackingNumber}`}
          className="flex items-center justify-center gap-2 py-3.5 bg-primary-600 hover:bg-primary-500 text-white font-semibold rounded-2xl text-sm transition-colors"
        >
          <ExternalLink className="w-4 h-4" />
          Track Your Order
        </a>
        <a
          href={`tel:${CONTACT_INFO.phone}`}
          className="flex items-center justify-center gap-2 py-3.5 glass border border-white/10 hover:border-white/20 text-neutral-300 hover:text-white font-semibold rounded-2xl text-sm transition-all"
        >
          <Phone className="w-4 h-4" />
          Call Us: {CONTACT_INFO.phone}
        </a>
      </div>
    </motion.div>
  )
}