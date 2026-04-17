import { formatPrice } from '@utils/formatters'

const DELIVERY_NOTE = 'Delivery fee calculated at checkout'

export default function CartSummary({ subtotal, deliveryFee = null, compact = false }) {
  const total = subtotal + (deliveryFee || 0)

  if (compact) {
    return (
      <div className="space-y-2 text-sm">
        <div className="flex justify-between text-neutral-400">
          <span>Subtotal</span>
          <span className="text-white font-medium">{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between text-neutral-500 text-xs">
          <span>Delivery</span>
          <span>{deliveryFee !== null ? formatPrice(deliveryFee) : DELIVERY_NOTE}</span>
        </div>
        <div className="h-px bg-white/5 my-1" />
        <div className="flex justify-between font-bold">
          <span className="text-white">Total</span>
          <span className="text-primary-400 text-base">{formatPrice(total)}</span>
        </div>
      </div>
    )
  }

  return (
    <div className="glass rounded-2xl p-6 space-y-3">
      <h3 className="font-display font-bold text-white text-lg mb-4">Order Summary</h3>
      <div className="flex justify-between text-sm text-neutral-400">
        <span>Subtotal</span>
        <span className="text-white">{formatPrice(subtotal)}</span>
      </div>
      <div className="flex justify-between text-sm text-neutral-400">
        <span>Delivery</span>
        <span>{deliveryFee !== null ? formatPrice(deliveryFee) : DELIVERY_NOTE}</span>
      </div>
      <div className="h-px bg-white/5 my-2" />
      <div className="flex justify-between font-bold">
        <span className="text-white text-lg">Total</span>
        <span className="text-primary-400 text-xl">{formatPrice(total)}</span>
      </div>
    </div>
  )
}