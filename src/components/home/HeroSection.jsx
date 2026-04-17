import { useEffect, useRef, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useQuery } from 'react-query'
import api from '@services/api'

/* ─── Fallback slides (used only if API is completely unreachable) ─── */
const FALLBACK_SLIDES = [
  {
    id:          1,
    badge:       'New Collection 2050',
    headline:    "Sleep Like Tomorrow's Standard",
    description: "Engineered with phase-change material and zero-gravity support for the deepest sleep you've ever experienced.",
    ctaLabel:    'Explore Collection',
    ctaPath:     '/products?type=memory_foam',
    image:       null,
    sortOrder:   1,
  },
  {
    id:          2,
    badge:       'Best Seller',
    headline:    'Hybrid Tech For Every Body Type',
    description: 'Thousand-coil precision wrapped in cooling gel foam. Adapts to your body and supports your spine all night long.',
    ctaLabel:    'Shop Hybrids',
    ctaPath:     '/products?type=hybrid',
    image:       null,
    sortOrder:   2,
  },
  {
    id:          3,
    badge:       'Doctor Recommended',
    headline:    'Orthopedic Precision For Perfect Posture',
    description: 'Clinically designed support matrix providing targeted lumbar reinforcement and pressure-point relief.',
    ctaLabel:    'View Orthopedic',
    ctaPath:     '/products?type=orthopedic',
    image:       null,
    sortOrder:   3,
  },
  {
    id:          4,
    badge:       'Rwanda Exclusive',
    headline:    'Natural Latex — Breathe Easy, Sleep Deep',
    description: 'Sustainably sourced natural latex with open-cell structure. Hypoallergenic, temperature-neutral, incredibly durable.',
    ctaLabel:    'Discover Latex',
    ctaPath:     '/products?type=latex',
    image:       null,
    sortOrder:   4,
  },
]

/* ─── Gradient backgrounds per slide index (used when no image) ────── */
const SLIDE_GRADIENTS = [
  'linear-gradient(135deg, #0a0a12 0%, #0d1240 50%, #0a0a12 100%)',
  'linear-gradient(135deg, #0a0a12 0%, #1a0d00 50%, #0a0a12 100%)',
  'linear-gradient(135deg, #0a0a12 0%, #0a1220 50%, #0a0a12 100%)',
  'linear-gradient(135deg, #0a0a12 0%, #081208 50%, #0a0a12 100%)',
]

const SLIDE_ACCENTS = ['#2d55ff', '#ff7d08', '#2d55ff', '#22c55e']

const INTERVAL = 6500

/* ─── Animation variants ────────────────────────────────────────────── */
const bgVariants = {
  enter:  { opacity: 0 },
  center: { opacity: 1, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } },
  exit:   { opacity: 0, transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1] } },
}

const imageVariants = {
  enter:  { opacity: 0, scale: 1.06 },
  center: { opacity: 1, scale: 1,   transition: { duration: 1.4, ease: [0.16, 1, 0.3, 1] } },
  exit:   { opacity: 0, scale: 1.02, transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] } },
}

const badgeVariants = {
  enter:  { opacity: 0, x: -24 },
  center: { opacity: 1, x: 0,   transition: { duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] } },
  exit:   { opacity: 0, x: 20,  transition: { duration: 0.3 } },
}

const headlineVariants = {
  enter:  { opacity: 0, y: 36 },
  center: { opacity: 1, y: 0,   transition: { duration: 0.8, delay: 0.32, ease: [0.16, 1, 0.3, 1] } },
  exit:   { opacity: 0, y: -18, transition: { duration: 0.35 } },
}

const descVariants = {
  enter:  { opacity: 0, y: 24 },
  center: { opacity: 1, y: 0,   transition: { duration: 0.7, delay: 0.48, ease: [0.16, 1, 0.3, 1] } },
  exit:   { opacity: 0,         transition: { duration: 0.25 } },
}

const ctaVariants = {
  enter:  { opacity: 0, y: 20 },
  center: { opacity: 1, y: 0,   transition: { duration: 0.6, delay: 0.62, ease: [0.16, 1, 0.3, 1] } },
  exit:   { opacity: 0,         transition: { duration: 0.2 } },
}

/* ─── Skeleton loader while slides are fetching ─────────────────────── */
function HeroSkeleton() {
  return (
    <div
      className="relative w-full overflow-hidden bg-dark flex items-center"
      style={{ height: '100svh', minHeight: '600px', maxHeight: '1000px' }}
    >
      <div className="absolute inset-0 animate-pulse"
        style={{ background: 'linear-gradient(135deg, #0a0a12 0%, #0d1240 50%, #0a0a12 100%)' }}
      />
      <div className="container-custom relative z-10">
        <div className="max-w-2xl space-y-6">
          <div className="h-6 w-44 bg-white/8 rounded-full" />
          <div className="space-y-3">
            <div className="h-14 w-4/5 bg-white/8 rounded-2xl" />
            <div className="h-14 w-3/5 bg-white/6 rounded-2xl" />
          </div>
          <div className="space-y-2">
            <div className="h-4 w-full bg-white/5 rounded-xl" />
            <div className="h-4 w-4/5 bg-white/5 rounded-xl" />
          </div>
          <div className="flex gap-3 pt-2">
            <div className="h-12 w-44 bg-primary-600/30 rounded-2xl" />
            <div className="h-12 w-36 bg-white/5 rounded-2xl" />
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─── Main component ─────────────────────────────────────────────────── */
export default function HeroSection() {
  const [current,  setCurrent]  = useState(0)
  const [progress, setProgress] = useState(0)
  const timerRef    = useRef(null)
  const progressRef = useRef(null)

  /* Fetch slides from backend */
  const { data, isLoading } = useQuery(
    'hero-slides',
    () => api.get('/hero-slides').then((r) => r.data),
    {
      staleTime:   10 * 60 * 1000,
      retry:       2,
      /* Never throw — fall back silently */
      onError:     () => {},
    }
  )

  const slides = data?.data?.slides?.length
    ? data.data.slides
    : FALLBACK_SLIDES

  const slide  = slides[current] ?? slides[0]
  const accent = SLIDE_ACCENTS[current % SLIDE_ACCENTS.length]
  const grad   = SLIDE_GRADIENTS[current % SLIDE_GRADIENTS.length]

  /* ── Auto-advance with progress ticker ────────────────── */
  const startCycle = useCallback(() => {
    clearTimeout(timerRef.current)
    if (progressRef.current) cancelAnimationFrame(progressRef.current)

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

    timerRef.current = setTimeout(() => {
      setCurrent((c) => (c + 1) % slides.length)
    }, INTERVAL)
  }, [slides.length])

  useEffect(() => {
    if (!slides.length) return
    startCycle()
    return () => {
      clearTimeout(timerRef.current)
      if (progressRef.current) cancelAnimationFrame(progressRef.current)
    }
  }, [current, startCycle, slides.length])

  const goTo = useCallback((i) => {
    setCurrent(i)
    setProgress(0)
  }, [])

  /* ── Build image src ──────────────────────────────────── */
  const getImageSrc = (s) => {
    if (!s?.image) return null
    /* If it's already a full URL, use as-is */
    if (s.image.startsWith('http')) return s.image
    /* Relative path from uploads folder */
    return `${import.meta.env.VITE_API_BASE_URL?.replace('/api', '') || 'http://localhost:5000'}/${s.image}`
  }

  const imageSrc = getImageSrc(slide)

  if (isLoading) return <HeroSkeleton />

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ height: '100svh', minHeight: '600px', maxHeight: '1000px' }}
      aria-label="Hero slideshow"
      aria-roledescription="carousel"
    >
      {/* ── Background layer ──────────────────────────────── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`bg-${current}`}
          variants={bgVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0"
          aria-hidden="true"
        >
          {imageSrc ? (
            /* Real uploaded image */
            <>
              <motion.div
                variants={imageVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${imageSrc})` }}
              />
              {/* Readability overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-dark/90 via-dark/55 to-dark/20" />
            </>
          ) : (
            /* CSS gradient fallback — no broken images, no 404 */
            <>
              <div
                className="absolute inset-0"
                style={{ background: grad }}
              />
              {/* Animated accent orb */}
              <motion.div
                className="absolute rounded-full pointer-events-none"
                style={{
                  width:  700,
                  height: 700,
                  right:  '-10%',
                  top:    '50%',
                  transform: 'translateY(-50%)',
                  background: `radial-gradient(circle, ${accent}20 0%, transparent 70%)`,
                }}
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: [0.7, 1.1, 1], opacity: [0, 0.7, 0.5] }}
                transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
              />
              {/* Subtle grid */}
              <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />
              {/* Dot pattern */}
              <div className="absolute inset-0 dot-pattern opacity-10 pointer-events-none" />
            </>
          )}

          {/* Bottom fade into next section */}
          <div className="absolute bottom-0 left-0 right-0 h-36 bg-gradient-to-t from-dark to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* ── Slide Content ──────────────────────────────────── */}
      <div
        className="relative z-10 h-full flex items-center"
        style={{ paddingTop: 'var(--navbar-height)' }}
      >
        <div className="container-custom w-full">
          <div className="max-w-2xl xl:max-w-3xl">
            <AnimatePresence mode="wait">
              <div
                key={`content-${current}`}
                className="flex flex-col gap-5 sm:gap-6"
                role="group"
                aria-roledescription="slide"
                aria-label={slide.headline}
              >
                {/* Badge */}
                {slide.badge && (
                  <motion.div
                    variants={badgeVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                  >
                    <span
                      className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase"
                      style={{
                        background: `${accent}18`,
                        border:     `1px solid ${accent}35`,
                        color:       accent,
                      }}
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full animate-pulse flex-shrink-0"
                        style={{ background: accent }}
                      />
                      {slide.badge}
                    </span>
                  </motion.div>
                )}

                {/* Headline */}
                <motion.h1
                  variants={headlineVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="font-display font-black text-white leading-[1.05] tracking-tight"
                  style={{ fontSize: 'clamp(1.9rem, 5.5vw, 4.2rem)' }}
                >
                  {slide.headline}
                </motion.h1>

                {/* Description */}
                {slide.description && (
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
                )}

                {/* CTAs */}
                <motion.div
                  variants={ctaVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="flex flex-wrap items-center gap-3 pt-1"
                >
                  <Link
                    to={slide.ctaPath || '/products'}
                    className="group inline-flex items-center gap-2.5 px-7 py-3.5 text-white font-semibold rounded-2xl text-sm transition-all duration-300"
                    style={{
                      background: `linear-gradient(135deg, ${accent}, ${accent}cc)`,
                      boxShadow:  `0 8px 32px ${accent}30`,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = `0 12px 48px ${accent}50`
                      e.currentTarget.style.transform = 'translateY(-2px)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = `0 8px 32px ${accent}30`
                      e.currentTarget.style.transform = 'translateY(0)'
                    }}
                  >
                    {slide.ctaLabel || 'Explore Collection'}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform flex-shrink-0" />
                  </Link>

                  <Link
                    to="/products"
                    className="inline-flex items-center gap-2 px-6 py-3.5 bg-white/8 hover:bg-white/14 backdrop-blur-sm border border-white/10 hover:border-white/22 text-white/90 font-semibold rounded-2xl text-sm transition-all duration-300"
                  >
                    View All Products
                  </Link>
                </motion.div>
              </div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* ── Progress Dots ──────────────────────────────────── */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2"
        role="tablist"
        aria-label="Slide navigation"
      >
        {slides.map((s, i) => (
          <button
            key={s.id}
            onClick={() => goTo(i)}
            role="tab"
            aria-selected={i === current}
            aria-label={`Slide ${i + 1}: ${s.headline}`}
            className="relative p-1 group"
          >
            {/* Track */}
            <div
              className={`h-[3px] rounded-full transition-all duration-500 ${
                i === current ? 'w-8 bg-white/25' : 'w-2 bg-white/15 hover:bg-white/25'
              }`}
            />
            {/* Active fill */}
            {i === current && (
              <div
                className="absolute top-1 left-1 h-[3px] rounded-full bg-white pointer-events-none transition-none"
                style={{ width: `${(progress / 100) * 32}px` }}
                aria-hidden="true"
              />
            )}
          </button>
        ))}
      </div>

      {/* ── Scroll hint ────────────────────────────────────── */}
      <motion.div
        className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 hidden md:flex flex-col items-center gap-2 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 0.8 }}
        aria-hidden="true"
      >
        <span className="text-[10px] text-white/25 tracking-[0.22em] uppercase">Scroll</span>
        <motion.div
          className="w-px h-7 bg-white/20 origin-top"
          animate={{ scaleY: [0, 1, 0], opacity: [0, 1, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  )
}