import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react'
import { useQuery } from 'react-query'
import { useIntersectionObserver } from '@hooks/useIntersectionObserver'
import { QUERY_KEYS } from '@utils/constants'
import api from '@services/api'
import { formatDate } from '@utils/formatters'
import Loader from '@components/common/Loader'

function StarRating({ rating, color = '#2d55ff' }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className="w-3.5 h-3.5"
          style={{
            fill: i < rating ? color : 'none',
            color: i < rating ? color : '#4a4a5a',
          }}
        />
      ))}
    </div>
  )
}

function TestimonialCard({ testimonial, active }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={active ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0.4, scale: 0.95, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="relative glass border border-white/8 rounded-3xl p-8 overflow-hidden"
    >
      {/* Background glow */}
      {active && (
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary-600/6 rounded-full blur-[80px] pointer-events-none" />
      )}

      {/* Quote Icon */}
      <div className="absolute top-6 right-8 text-primary-800/40">
        <Quote className="w-10 h-10" strokeWidth={1} />
      </div>

      <div className="relative z-10 flex flex-col gap-5">
        {/* Rating */}
        <StarRating rating={testimonial.rating} />

        {/* Content */}
        <blockquote className="text-neutral-200 text-base lg:text-lg leading-relaxed font-medium">
          "{testimonial.comment}"
        </blockquote>

        {/* Product */}
        {testimonial.productName && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-600/12 border border-primary-500/20 w-fit">
            <div className="w-1.5 h-1.5 rounded-full bg-primary-400" />
            <span className="text-xs text-primary-300 font-medium">{testimonial.productName}</span>
          </div>
        )}

        {/* Author */}
        <div className="flex items-center gap-3 pt-2 border-t border-white/5">
          <div className="w-10 h-10 rounded-full bg-primary-700/30 border border-primary-600/25 flex items-center justify-center flex-shrink-0">
            <span className="text-primary-300 font-bold text-sm">
              {testimonial.name?.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="min-w-0">
            <p className="text-white font-semibold text-sm truncate">{testimonial.name}</p>
            <p className="text-neutral-500 text-xs">
              {testimonial.location || 'Musanze, Rwanda'} · {formatDate(testimonial.createdAt)}
            </p>
          </div>
          {testimonial.verified && (
            <div className="ml-auto flex-shrink-0">
              <span className="text-2xs text-green-400 font-medium px-2 py-0.5 bg-green-400/10 rounded-full border border-green-400/20">
                Verified
              </span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default function Testimonials() {
  const [current, setCurrent] = useState(0)
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.1 })

  const { data, isLoading } = useQuery(
    QUERY_KEYS.TESTIMONIALS,
    () => api.get('/testimonials?limit=6').then(r => r.data),
    { staleTime: 10 * 60 * 1000, retry: 1 }
  )

  const testimonials = data?.testimonials || []

  const goNext = useCallback(() => {
    setCurrent((c) => (c + 1) % Math.max(testimonials.length, 1))
  }, [testimonials.length])

  const goPrev = useCallback(() => {
    setCurrent((c) => (c - 1 + Math.max(testimonials.length, 1)) % Math.max(testimonials.length, 1))
  }, [testimonials.length])

  useEffect(() => {
    if (!testimonials.length) return
    const interval = setInterval(goNext, 6000)
    return () => clearInterval(interval)
  }, [goNext, testimonials.length])

  return (
    <section
      ref={ref}
      className="relative section-padding overflow-hidden"
      aria-labelledby="testimonials-heading"
    >
      <div className="absolute inset-0 bg-dark" />
      <div className="absolute top-0 left-0 right-0 h-px gradient-divider" />
      <div className="absolute inset-0 dot-pattern opacity-15 pointer-events-none" />

      <div className="container-custom relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Star className="w-4 h-4 text-accent-400 fill-accent-400" />
            <span className="text-xs font-semibold tracking-widest text-accent-400 uppercase">Customer Stories</span>
            <Star className="w-4 h-4 text-accent-400 fill-accent-400" />
          </div>
          <h2
            id="testimonials-heading"
            className="font-display font-black heading-lg text-white"
          >
            Trusted by{' '}
            <span className="text-gradient-accent">5,000+ Sleepers</span>
          </h2>
          <p className="text-neutral-400 text-base mt-3 max-w-lg mx-auto">
            Real stories from real customers who transformed their sleep with AHEZA 2050.
          </p>
        </motion.div>

        {isLoading ? (
          <div className="flex justify-center h-64 items-center">
            <Loader size="md" text="Loading reviews…" />
          </div>
        ) : testimonials.length === 0 ? (
          <div className="text-center text-neutral-500 py-20">
            <p>No testimonials yet. Be the first to review!</p>
          </div>
        ) : (
          <>
            {/* Main Testimonial */}
            <div className="max-w-3xl mx-auto mb-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                >
                  <TestimonialCard testimonial={testimonials[current]} active />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Thumbnails */}
            {testimonials.length > 1 && (
              <div className="flex items-center justify-center gap-3 mb-8">
                {testimonials.map((t, i) => (
                  <button
                    key={t.id}
                    onClick={() => setCurrent(i)}
                    className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                      i === current
                        ? 'border-primary-500 bg-primary-600/30 text-primary-300 scale-110'
                        : 'border-white/10 bg-white/5 text-neutral-600 hover:border-white/25'
                    }`}
                    aria-label={`View testimonial by ${t.name}`}
                  >
                    {t.name?.charAt(0).toUpperCase()}
                  </button>
                ))}
              </div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={goPrev}
                className="w-10 h-10 glass border border-white/10 hover:border-white/25 rounded-xl flex items-center justify-center text-neutral-400 hover:text-white transition-all"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-xs text-neutral-600 font-mono">
                {String(current + 1).padStart(2,'0')} / {String(testimonials.length).padStart(2,'0')}
              </span>
              <button
                onClick={goNext}
                className="w-10 h-10 glass border border-white/10 hover:border-white/25 rounded-xl flex items-center justify-center text-neutral-400 hover:text-white transition-all"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  )
}