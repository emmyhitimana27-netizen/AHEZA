import { useEffect, useRef, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useQuery } from 'react-query'
import { productService } from '@services/productService'
import { QUERY_KEYS } from '@utils/constants'

const SLIDES = [
  {
    id: 1,
    badge: 'New Collection 2050',
    headline: 'Sleep Like Tomorrow\'s Standard',
    description: 'Engineered with phase-change material and zero-gravity support for the deepest sleep you\'ve ever experienced.',
    cta: { label: 'Explore Collection', path: '/products?type=memory_foam' },
    image: '/api/placeholder/hero/1',
    overlay: 'from-dark/90 via-dark/60 to-dark/30',
  },
  {
    id: 2,
    badge: 'Best Seller',
    headline: 'Hybrid Tech For Every Body Type',
    description: 'Thousand-coil precision wrapped in cooling gel foam. Adapts to your body and supports your spine all night long.',
    cta: { label: 'Shop Hybrids', path: '/products?type=hybrid' },
    image: '/api/placeholder/hero/2',
    overlay: 'from-dark/95 via-dark/65 to-dark/20',
  },
  {
    id: 3,
    badge: 'Doctor Recommended',
    headline: 'Orthopedic Precision For Perfect Posture',
    description: 'Clinically designed support matrix providing targeted lumbar reinforcement and pressure-point relief.',
    cta: { label: 'View Orthopedic', path: '/products?type=orthopedic' },
    image: '/api/placeholder/hero/3',
    overlay: 'from-dark/90 via-dark/55 to-dark/25',
  },
  {
    id: 4,
    badge: 'Rwanda Exclusive',
    headline: 'Natural Latex — Breathe Easy, Sleep Deep',
    description: 'Sustainably sourced natural latex with open-cell structure. Hypoallergenic, temperature-neutral, incredibly durable.',
    cta: { label: 'Discover Latex', path: '/products?type=latex' },
    image: '/api/placeholder/hero/4',
    overlay: 'from-dark/90 via-dark/60 to-dark/30',
  },
]

const INTERVAL = 6500

/* ─── Slide transition variants ─────────────────────────── */
const imageVariants = {
  enter:   { opacity: 0, scale: 1.08 },
  center:  { opacity: 1, scale: 1, transition: { duration: 1.4, ease: [0.16, 1, 0.3, 1] } },
  exit:    { opacity: 0, scale: 1.03, transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] } },
}

const contentVariants = {
  enter:   { opacity: 0, y: 40 },
  center:  { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] } },
  exit:    { opacity: 0, y: -20, transition: { duration: 0.4 } },
}

const badgeVariants = {
  enter:   { opacity: 0, x: -20 },
  center:  { opacity: 1, x: 0, transition: { duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] } },
  exit:    { opacity: 0, x: 20, transition: { duration: 0.3 } },
}

const headlineVariants = {
  enter:   { opacity: 0, y: 30 },
  center:  { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] } },
  exit:    { opacity: 0, y: -15, transition: { duration: 0.35 } },
}

const descVariants = {
  enter:   { opacity: 0, y: 20 },
  center:  { opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] } },
  exit:    { opacity: 0, transition: { duration: 0.3 } },
}

const ctaVariants = {
  enter:   { opacity: 0, y: 20 },
  center:  { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.65, ease: [0.16, 1, 0.3, 1] } },
  exit:    { opacity: 0, transition: { duration: 0.2 } },
}

export default function HeroSection() {
  const [current, setCurrent]  = useState(0)
  const [progress, setProgress] = useState(0)
  const timerRef    = useRef(null)
  const progressRef = useRef(null)

  const slide = SLIDES[current]

  /* ── Auto-advance with progress ────────────────────────── */
  const startCycle = useCallback(() => {
    /* Clear previous */
    clearInterval(timerRef.current)
    if (progressRef.current) cancelAnimationFrame(progressRef.current)

    /* Progress ticker */
    let start = null
    const tick = (ts) => {
      if (!start) start = ts
      const elapsed = ts - start
      setProgress(Math.min((elapsed / INTERVAL) * 100, 100))
      if (elapsed < INTERVAL) {
        progressRef.current = requestAnimationFrame(tick)
      }
    }
    progressRef.current = requestAnimationFrame(tick)

    /* Advance timer */
    timerRef.current = setTimeout(() => {
      setCurrent((c) => (c + 1) % SLIDES.length)
    }, INTERVAL)
  }, [])

  useEffect(() => {
    startCycle()
    return () => {
      clearTimeout(timerRef.current)
      if (progressRef.current) cancelAnimationFrame(progressRef.current)
    }
  }, [current, startCycle])

  const goTo = useCallback((i) => {
    setCurrent(i)
    setProgress(0)
  }, [])

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ height: '100svh', minHeight: '600px', maxHeight: '1000px' }}
      aria-label="Hero slideshow"
    >
      {/* ── Background Images ─────────────────────────────── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`bg-${current}`}
          variants={imageVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0"
        >
          {/* Image */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${slide.image})`,
              backgroundColor: '#0a0a12',
            }}
          />

          {/* Overlay gradient — ensures text readability */}
          <div className={`absolute inset-0 bg-gradient-to-r ${slide.overlay}`} />

          {/* Bottom fade into next section */}
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-dark to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* ── Content ───────────────────────────────────────── */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container-custom w-full">
          <div className="max-w-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={`content-${current}`}
                className="flex flex-col gap-5 sm:gap-6"
              >
                {/* Badge */}
                <motion.div
                  variants={badgeVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                >
                  <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-white/90 text-xs font-semibold tracking-wider uppercase">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-400 animate-pulse" />
                    {slide.badge}
                  </span>
                </motion.div>

                {/* Headline */}
                <motion.h1
                  variants={headlineVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="font-display font-black text-white leading-[1.05] tracking-tight"
                  style={{ fontSize: 'clamp(2rem, 5.5vw, 4.2rem)' }}
                >
                  {slide.headline}
                </motion.h1>

                {/* Description */}
                <motion.p
                  variants={descVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="text-neutral-300 leading-relaxed max-w-lg"
                  style={{ fontSize: 'clamp(0.875rem, 1.8vw, 1.05rem)' }}
                >
                  {slide.description}
                </motion.p>

                {/* CTA */}
                <motion.div
                  variants={ctaVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="flex flex-wrap items-center gap-3 pt-1"
                >
                  <Link
                    to={slide.cta.path}
                    className="group inline-flex items-center gap-2 px-7 py-3.5 bg-primary-600 hover:bg-primary-500 text-white font-semibold rounded-2xl text-sm transition-all duration-300 shadow-glow-sm hover:shadow-glow-md"
                  >
                    {slide.cta.label}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    to="/products"
                    className="inline-flex items-center gap-2 px-6 py-3.5 bg-white/8 hover:bg-white/14 backdrop-blur-sm border border-white/10 hover:border-white/20 text-white/90 font-semibold rounded-2xl text-sm transition-all duration-300"
                  >
                    View All Products
                  </Link>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* ── Progress Dots (minimal, bottom-center) ────────── */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {SLIDES.map((s, i) => (
          <button
            key={s.id}
            onClick={() => goTo(i)}
            aria-label={`Slide ${i + 1}`}
            className="relative group p-1"
          >
            <div
              className={`h-1 rounded-full transition-all duration-500 ${
                i === current ? 'w-8 bg-white/30' : 'w-2 bg-white/20 hover:bg-white/30'
              }`}
            />
            {/* Active progress fill */}
            {i === current && (
              <div
                className="absolute top-1 left-1 h-1 rounded-full bg-white transition-none"
                style={{ width: `${(progress / 100) * 32}px` }}
              />
            )}
          </button>
        ))}
      </div>

      {/* ── Scroll Hint ───────────────────────────────────── */}
      <motion.div
        className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 hidden md:flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <span className="text-[10px] text-white/30 tracking-[0.2em] uppercase">Scroll</span>
        <motion.div
          className="w-[1px] h-6 bg-white/20 origin-top"
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  )
}