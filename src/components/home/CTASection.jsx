import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, MessageCircle, Phone } from 'lucide-react'
import { useIntersectionObserver } from '@hooks/useIntersectionObserver'
import { CONTACT_INFO } from '@utils/constants'

export default function CTASection() {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.2 })

  return (
    <section
      ref={ref}
      className="relative section-padding overflow-hidden"
      aria-label="Call to action"
    >
      <div className="absolute inset-0 bg-dark" />

      {/* Animated gradient background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(45,85,255,0.15) 0%, transparent 70%)' }}
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(255,125,8,0.1) 0%, transparent 70%)' }}
          animate={{ scale: [1.2, 1, 1.2], rotate: [90, 0, 90] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="absolute inset-0 dot-pattern opacity-20" />
      </div>

      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative glass border border-primary-500/15 rounded-[2.5rem] p-10 lg:p-16 text-center overflow-hidden"
          >
            {/* Inner decorations */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-primary-500/50 to-transparent" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-t from-primary-500/50 to-transparent" />

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isVisible ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-600/15 border border-primary-500/25 text-primary-300 text-xs font-semibold tracking-wider uppercase mb-8"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary-400 animate-pulse" />
              Ready to Transform Your Sleep?
            </motion.div>

            {/* Headline */}
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="font-display font-black heading-lg text-white mb-5"
            >
              Your Perfect Night's Sleep{' '}
              <span className="text-gradient">Starts Today</span>
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-neutral-400 text-lg mb-10 max-w-2xl mx-auto leading-relaxed"
            >
              Browse our full collection, consult with our sleep experts, or visit our showroom in Musanze. Your dream mattress is waiting.
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link
                to="/products"
                className="group inline-flex items-center gap-2.5 px-8 py-4 bg-primary-600 hover:bg-primary-500 text-white font-semibold rounded-2xl transition-all duration-300 shadow-glow-sm hover:shadow-glow-md text-sm"
              >
                Shop All Mattresses
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href={`tel:${CONTACT_INFO.phone}`}
                className="group inline-flex items-center gap-2.5 px-8 py-4 glass border border-white/10 hover:border-white/20 text-neutral-300 hover:text-white font-semibold rounded-2xl transition-all duration-300 text-sm"
              >
                <Phone className="w-4 h-4" />
                {CONTACT_INFO.phone}
              </a>
              <a
                href="https://wa.me/250788000000"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2.5 px-8 py-4 bg-green-700/20 hover:bg-green-700/30 border border-green-600/30 hover:border-green-500/50 text-green-400 hover:text-green-300 font-semibold rounded-2xl transition-all duration-300 text-sm"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp Us
              </a>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isVisible ? { opacity: 1 } : {}}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="flex flex-wrap items-center justify-center gap-6 mt-10 pt-8 border-t border-white/5"
            >
              {[
                '✓ Free delivery in Musanze',
                '✓ 100-night sleep trial',
                '✓ Up to 15-year warranty',
                '✓ Easy returns',
              ].map((item) => (
                <span key={item} className="text-neutral-500 text-xs font-medium">{item}</span>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}