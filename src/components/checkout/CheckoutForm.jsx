import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import {
  User, Mail, Phone, MapPin,
  Building2, Map, FileText, AlertCircle
} from 'lucide-react'
import { checkoutSchema } from '@utils/validators'
import { orderService } from '@services/orderService'
import { formatPrice } from '@utils/formatters'
import clsx from 'clsx'

const RW_DISTRICTS = [
  'Musanze', 'Burera', 'Gakenke', 'Rulindo', 'Gicumbi',
  'Rubavu', 'Nyabihu', 'Ngororero', 'Rutsiro', 'Karongi',
  'Kigali', 'Gasabo', 'Kicukiro', 'Nyarugenge',
]

function FieldError({ message }) {
  if (!message) return null
  return (
    <p className="flex items-center gap-1 text-red-400 text-xs mt-1">
      <AlertCircle className="w-3 h-3 flex-shrink-0" />
      {message}
    </p>
  )
}

function FormField({ label, required, error, icon: Icon, children }) {
  return (
    <div>
      <label className="flex items-center gap-1.5 text-xs font-semibold text-neutral-400 uppercase tracking-wide mb-1.5">
        {Icon && <Icon className="w-3 h-3" />}
        {label}
        {required && <span className="text-primary-400">*</span>}
      </label>
      {children}
      <FieldError message={error} />
    </div>
  )
}

export default function CheckoutForm({ onSubmit: onFormSubmit, loading, cartSubtotal }) {
  const [deliveryFee, setDeliveryFee] = useState(0)
  const [feeLoading,  setFeeLoading]  = useState(false)

  const {
    register, handleSubmit, watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(checkoutSchema),
    defaultValues: { paymentMethod: 'momo' },
  })

  const watchDistrict = watch('district')
  const watchSector   = watch('sector')

  /* Auto-calculate delivery fee when location changes */
  useEffect(() => {
    if (!watchDistrict || !watchSector) return
    const timer = setTimeout(async () => {
      try {
        setFeeLoading(true)
        const result = await orderService.calculateDelivery(watchDistrict, watchSector)
        setDeliveryFee(result.fee || 0)
      } catch {
        setDeliveryFee(0)
      } finally {
        setFeeLoading(false)
      }
    }, 600)
    return () => clearTimeout(timer)
  }, [watchDistrict, watchSector])

  const inputClass = (hasError) => clsx(
    'w-full bg-white/5 border rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-600 outline-none transition-all duration-200',
    hasError
      ? 'border-red-500/50 focus:border-red-400/70 bg-red-500/5'
      : 'border-white/10 focus:border-primary-500/50 hover:border-white/20'
  )

  const PAYMENT_METHODS = [
    {
      value: 'momo',
      label: 'MTN Mobile Money',
      icon: '📱',
      description: 'Pay via MTN MoMo',
    },
    {
      value: 'cash',
      label: 'Cash on Delivery',
      icon: '💵',
      description: 'Pay when delivered',
    },
    {
      value: 'card',
      label: 'Bank Card',
      icon: '💳',
      description: 'Visa / Mastercard',
    },
  ]

  const selectedPayment = watch('paymentMethod')
  const total = cartSubtotal + deliveryFee

  return (
    <form
      onSubmit={handleSubmit((data) => onFormSubmit({ ...data, deliveryFee, total }))}
      className="space-y-8"
      noValidate
    >
      {/* ── Personal Info ──────────────────────────────────── */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass border border-white/5 rounded-2xl p-6"
      >
        <h3 className="font-display font-bold text-white text-lg mb-5 flex items-center gap-2">
          <span className="w-6 h-6 rounded-lg bg-primary-600/20 flex items-center justify-center text-primary-400 text-xs font-bold">1</span>
          Personal Information
        </h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <FormField label="First Name" required error={errors.firstName?.message} icon={User}>
            <input
              {...register('firstName')}
              placeholder="Jean"
              className={inputClass(!!errors.firstName)}
            />
          </FormField>
          <FormField label="Last Name" required error={errors.lastName?.message} icon={User}>
            <input
              {...register('lastName')}
              placeholder="Uwimana"
              className={inputClass(!!errors.lastName)}
            />
          </FormField>
          <FormField label="Email Address" required error={errors.email?.message} icon={Mail}>
            <input
              {...register('email')}
              type="email"
              placeholder="you@example.com"
              className={inputClass(!!errors.email)}
            />
          </FormField>
          <FormField label="Phone Number" required error={errors.phone?.message} icon={Phone}>
            <input
              {...register('phone')}
              placeholder="+250 788 000 000"
              className={inputClass(!!errors.phone)}
            />
          </FormField>
        </div>
      </motion.section>

      {/* ── Delivery Address ───────────────────────────────── */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="glass border border-white/5 rounded-2xl p-6"
      >
        <h3 className="font-display font-bold text-white text-lg mb-5 flex items-center gap-2">
          <span className="w-6 h-6 rounded-lg bg-primary-600/20 flex items-center justify-center text-primary-400 text-xs font-bold">2</span>
          Delivery Address
        </h3>
        <div className="grid gap-4">
          <FormField label="Street / Village Address" required error={errors.address?.message} icon={MapPin}>
            <input
              {...register('address')}
              placeholder="KN 5 Ave, House No. 12"
              className={inputClass(!!errors.address)}
            />
          </FormField>
          <div className="grid sm:grid-cols-2 gap-4">
            <FormField label="District" required error={errors.district?.message} icon={Map}>
              <select
                {...register('district')}
                className={clsx(inputClass(!!errors.district), 'cursor-pointer')}
              >
                <option value="" className="bg-surface">Select district</option>
                {RW_DISTRICTS.map((d) => (
                  <option key={d} value={d} className="bg-surface">{d}</option>
                ))}
              </select>
            </FormField>
            <FormField label="Sector / Cell" required error={errors.sector?.message} icon={Building2}>
              <input
                {...register('sector')}
                placeholder="e.g. Muhoza"
                className={inputClass(!!errors.sector)}
              />
            </FormField>
          </div>

          {/* Delivery Fee Indicator */}
          {(watchDistrict || watchSector) && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="flex items-center justify-between px-4 py-3 bg-primary-600/10 border border-primary-500/20 rounded-xl"
            >
              <span className="text-sm text-neutral-300">Estimated Delivery Fee</span>
              <span className="text-sm font-bold text-primary-300">
                {feeLoading
                  ? <span className="w-4 h-4 border border-primary-400/30 border-t-primary-400 rounded-full animate-spin inline-block" />
                  : deliveryFee === 0 ? 'Free' : formatPrice(deliveryFee)
                }
              </span>
            </motion.div>
          )}

          <FormField label="Delivery Notes" error={errors.notes?.message} icon={FileText}>
            <textarea
              {...register('notes')}
              rows={3}
              placeholder="Gate color, landmarks, specific instructions for delivery team…"
              className={clsx(inputClass(!!errors.notes), 'resize-none')}
            />
          </FormField>
        </div>
      </motion.section>

      {/* ── Payment Method ─────────────────────────────────── */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="glass border border-white/5 rounded-2xl p-6"
      >
        <h3 className="font-display font-bold text-white text-lg mb-5 flex items-center gap-2">
          <span className="w-6 h-6 rounded-lg bg-primary-600/20 flex items-center justify-center text-primary-400 text-xs font-bold">3</span>
          Payment Method
        </h3>
        <div className="grid gap-3">
          {PAYMENT_METHODS.map((method) => (
            <label
              key={method.value}
              className={clsx(
                'flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all duration-300',
                selectedPayment === method.value
                  ? 'bg-primary-600/15 border-primary-500/40 shadow-glow-sm'
                  : 'border-white/8 hover:border-white/20 hover:bg-white/[0.02]'
              )}
            >
              <input
                {...register('paymentMethod')}
                type="radio"
                value={method.value}
                className="sr-only"
              />
              <div
                className={clsx(
                  'w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors',
                  selectedPayment === method.value
                    ? 'border-primary-400'
                    : 'border-neutral-600'
                )}
              >
                {selectedPayment === method.value && (
                  <div className="w-2 h-2 rounded-full bg-primary-400" />
                )}
              </div>
              <span className="text-2xl flex-shrink-0">{method.icon}</span>
              <div>
                <p className="text-white text-sm font-semibold">{method.label}</p>
                <p className="text-neutral-500 text-xs">{method.description}</p>
              </div>
            </label>
          ))}
          {errors.paymentMethod && (
            <FieldError message={errors.paymentMethod.message} />
          )}
        </div>

        {/* MoMo instructions */}
        {selectedPayment === 'momo' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-4 bg-amber-500/8 border border-amber-500/20 rounded-xl"
          >
            <p className="text-amber-300 text-xs font-semibold mb-1">MoMo Payment Instructions</p>
            <p className="text-neutral-400 text-xs leading-relaxed">
              After placing your order, you'll receive payment instructions via SMS. Send payment to: <strong className="text-white">+250 788 000 000</strong> using code <strong className="text-white">*182*8*1#</strong>
            </p>
          </motion.div>
        )}
      </motion.section>

      {/* ── Order Total Preview ─────────────────────────────── */}
      <div className="glass border border-white/5 rounded-2xl p-5 flex items-center justify-between">
        <div>
          <p className="text-neutral-400 text-sm">Order Total</p>
          <p className="text-white font-black text-2xl font-display">{formatPrice(total)}</p>
        </div>
        <motion.button
          type="submit"
          disabled={loading}
          whileHover={{ scale: loading ? 1 : 1.02 }}
          whileTap={{ scale: loading ? 1 : 0.97 }}
          className="flex items-center gap-3 px-8 py-4 bg-primary-600 hover:bg-primary-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-2xl text-sm transition-all shadow-glow-sm hover:shadow-glow-md"
        >
          {loading ? (
            <>
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Placing Order…
            </>
          ) : (
            'Place Order'
          )}
        </motion.button>
      </div>
    </form>
  )
}