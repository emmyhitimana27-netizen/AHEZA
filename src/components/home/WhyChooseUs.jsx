import { motion } from 'framer-motion'
import {
  Shield, Truck, Star, Headphones,
  Recycle, Award, ChevronRight, Zap
} from 'lucide-react'
import { useIntersectionObserver } from '@hooks/useIntersectionObserver'

const FEATURES = [
  {
    icon: Truck,
    title: 'Free Delivery',
    description: 'Free same-day delivery across Musanze city. Doorstep setup included.',
    color: '#2d55ff',
    delay: 0,
  },
  {
    icon: Shield,
    title: 'Up to 15-Year Warranty',
    description: 'Every mattress backed by our industry-leading warranty with full replacement guarantee.',
    color: '#22c55e',
    delay: 0.08,
  },
  {
    icon: Star,
    title: '100-Night Trial',
    description: 'Sleep on it for 100 nights. If not satisfied, we pick it up — free, no questions asked.',
    color: '#ff7d08',
    delay: 0.16,
  },
  {
    icon: Headphones,
    title: '24/7 Sleep Support',
    description: 'Our sleep consultants are available round the clock to help you choose and maintain your mattress.',
    color: '#2d55ff',
    delay: 0.24,
  },
  {
    icon: Zap,
    title: 'Premium Materials',
    description: 'CertiPUR-US certified foams, organic cotton covers, and sustainably sourced latex.',
    color: '#a855f7',
    delay: 0.32,
  },
  {
    icon: Award,
    title: 'Rwanda\'s #1 Brand',
    description: 'Voted best mattress brand in Musanze for 3 consecutive years by our customers.',
    color: '#ff7d08',
    delay: 0.40,
  },
]

export default function WhyChooseUs() {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.1 })

  return (
    <section
      ref={ref}
      className="relative section-padding overflow-hidden"
      aria-labelledby="why-heading"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-surface" />
      <div className="absolute inset-0 grid-pattern opacity-15 pointer-events-none" />
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-radial from-primary-900/10 to-transparent pointer-events-none" />

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left: Text + Large Feature */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="h-px w-8 bg-primary-500" />
                <span className="text-xs font-semibold tracking-widest text-primary-400 uppercase">Why AHEZA 2050</span>
              </div>
              <h2
                id="why-heading"
                className="font-display font-black heading-lg text-white mb-5"
              >
                Sleep is not a{' '}
                <span className="text-gradient">Luxury,</span>
                <br />it's a{' '}
                <span className="text-gradient-accent">Science</span>
              </h2>
              <p className="text-neutral-400 text-base leading-relaxed mb-8 max-w-lg">
                At AHEZA 2050, we believe quality sleep changes lives. That's why every mattress is engineered with cutting-edge sleep science — from temperature regulation to spinal alignment — built for Rwanda's future.
              </p>
            </motion.div>

            {/* Large Highlight Card */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative glass border border-primary-500/20 rounded-3xl p-8 overflow-hidden group hover:border-primary-400/40 transition-all duration-500"
            >
              <div className="absolute inset-0 bg-gradient-radial from-primary-600/8 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <div className="flex items-start gap-5 relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-primary-600/20 border border-primary-500/25 flex items-center justify-center flex-shrink-0 group-hover:bg-primary-600/30 group-hover:shadow-glow-sm transition-all duration-500">
                  <Recycle className="w-6 h-6 text-primary-400" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-white text-xl mb-2">
                    Certified Eco-Friendly
                  </h3>
                  <p className="text-neutral-400 text-sm leading-relaxed">
                    All our mattresses use sustainably sourced materials and are manufactured with zero harmful chemicals. Sleep well knowing you made an eco-conscious choice.
                  </p>
                  <button className="mt-4 flex items-center gap-1.5 text-primary-400 hover:text-primary-300 text-sm font-semibold transition-colors group/btn">
                    Learn more
                    <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right: Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {FEATURES.map((feature, i) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30, scale: 0.97 }}
                  animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : {}}
                  transition={{ duration: 0.55, delay: feature.delay, ease: [0.16, 1, 0.3, 1] }}
                  className="group glass border border-white/5 hover:border-white/10 rounded-2xl p-5 flex flex-col gap-3 transition-all duration-400 hover:bg-white/[0.02] cursor-default"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-400 group-hover:scale-110"
                    style={{
                      background: `${feature.color}18`,
                      border: `1px solid ${feature.color}30`,
                    }}
                  >
                    <Icon className="w-4.5 h-4.5" style={{ color: feature.color }} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-sm mb-1">{feature.title}</h3>
                    <p className="text-neutral-500 text-xs leading-relaxed">{feature.description}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}