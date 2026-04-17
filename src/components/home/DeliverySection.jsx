import { motion } from 'framer-motion'
import {
  Truck, Package, CheckCircle2,
  MapPin, Clock, Phone, ArrowRight
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { useQuery } from 'react-query'
import { useIntersectionObserver } from '@hooks/useIntersectionObserver'
import { contactService } from '@services/contactService'
import { QUERY_KEYS, DELIVERY_ZONES } from '@utils/constants'
import { formatPrice } from '@utils/formatters'

const STEPS = [
  { icon: Phone,        number: '01', title: 'Order & Confirm',   description: 'Call, WhatsApp, or order online. Our team confirms within 30 minutes.' },
  { icon: Package,      number: '02', title: 'Pack & Prepare',    description: 'Your mattress is carefully packaged and loaded for delivery.' },
  { icon: Truck,        number: '03', title: 'Fast Delivery',     description: 'We deliver to your door — same day within Musanze city.' },
  { icon: CheckCircle2, number: '04', title: 'Setup & Enjoy',     description: 'Our team sets up your mattress and removes the packaging.' },
]

export default function DeliverySection() {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.1 })

  const { data } = useQuery(
    'delivery-zones',
    () => contactService.getDeliveryInfo(),
    { staleTime: 30 * 60 * 1000, retry: 1 }
  )

  const zones = data?.zones || DELIVERY_ZONES

  return (
    <section
      ref={ref}
      className="relative section-padding overflow-hidden"
      aria-labelledby="delivery-heading"
    >
      <div className="absolute inset-0 bg-surface" />
      <div className="absolute inset-0 grid-pattern opacity-15 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-700/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="container-custom relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Truck className="w-4 h-4 text-primary-400" />
            <span className="text-xs font-semibold tracking-widest text-primary-400 uppercase">Delivery & Setup</span>
          </div>
          <h2
            id="delivery-heading"
            className="font-display font-black heading-lg text-white"
          >
            From Our Store{' '}
            <span className="text-gradient-primary">To Your Bedroom</span>
          </h2>
          <p className="text-neutral-400 text-base mt-3 max-w-lg mx-auto">
            We handle everything — delivery, setup, and old mattress removal. Sit back and enjoy the experience.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">

          {/* Delivery Steps */}
          <div className="space-y-4">
            {STEPS.map((step, i) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, x: -40 }}
                  animate={isVisible ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="group flex items-start gap-4 glass border border-white/5 hover:border-primary-500/20 rounded-2xl p-5 transition-all duration-400"
                >
                  {/* Step Number */}
                  <div className="relative flex-shrink-0">
                    <div className="w-12 h-12 rounded-2xl bg-primary-600/15 border border-primary-500/20 flex items-center justify-center group-hover:bg-primary-600/25 group-hover:border-primary-400/40 group-hover:shadow-glow-sm transition-all duration-400">
                      <Icon className="w-5 h-5 text-primary-400" />
                    </div>
                    <span className="absolute -top-1.5 -right-1.5 text-2xs font-black text-primary-500 font-mono">
                      {step.number}
                    </span>
                    {i < STEPS.length - 1 && (
                      <div className="absolute top-full left-1/2 -translate-x-1/2 w-px h-4 bg-primary-800/50 mt-1" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-sm mb-1">{step.title}</h3>
                    <p className="text-neutral-400 text-xs leading-relaxed">{step.description}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Delivery Zones Card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Zones Table */}
            <div className="glass border border-white/5 rounded-3xl overflow-hidden">
              <div className="px-6 py-4 border-b border-white/5 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary-400" />
                <h3 className="font-semibold text-white text-sm">Delivery Zones</h3>
              </div>
              <div className="divide-y divide-white/5">
                {zones.map((zone, i) => (
                  <motion.div
                    key={zone.zone}
                    initial={{ opacity: 0 }}
                    animate={isVisible ? { opacity: 1 } : {}}
                    transition={{ delay: 0.3 + i * 0.07 }}
                    className="flex items-center justify-between px-6 py-4 hover:bg-white/[0.02] transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary-500" />
                      <span className="text-neutral-300 text-sm">{zone.zone}</span>
                    </div>
                    <div className="flex items-center gap-6 text-right">
                      <div>
                        <p className="text-white text-sm font-semibold">
                          {zone.fee === 0 ? 'Free' : formatPrice(zone.fee)}
                        </p>
                        <p className="text-neutral-500 text-2xs">delivery fee</p>
                      </div>
                      <div>
                        <p className="text-white text-sm font-semibold">{zone.days} days</p>
                        <p className="text-neutral-500 text-2xs">delivery time</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* CTA Card */}
            <div className="glass border border-primary-500/20 rounded-3xl p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-primary-600/20 flex items-center justify-center flex-shrink-0">
                <Clock className="w-5 h-5 text-primary-400" />
              </div>
              <div className="flex-1">
                <p className="text-white font-semibold text-sm">Same-day delivery available</p>
                <p className="text-neutral-400 text-xs mt-0.5">Order before 2PM for same-day delivery in Musanze city</p>
              </div>
              <Link
                to="/contact"
                className="flex-shrink-0 flex items-center gap-1.5 text-primary-400 hover:text-primary-300 text-sm font-semibold transition-colors"
              >
                Book Now <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}