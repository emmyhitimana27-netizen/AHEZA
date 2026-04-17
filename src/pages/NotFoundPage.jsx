import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home, ArrowLeft, Search, ShoppingBag } from 'lucide-react'
import { useEffect, useState } from 'react'
import SEOHead from '@components/common/SEOHead'

export default function NotFoundPage() {
  const navigate = useNavigate()
  const [countdown, setCountdown] = useState(10)

  /* Auto-redirect countdown */
  useEffect(() => {
    if (countdown <= 0) { navigate('/'); return }
    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000)
    return () => clearTimeout(timer)
  }, [countdown, navigate])

  const QUICK_LINKS = [
    { icon: Home,        label: 'Go Home',        path: '/' },
    { icon: ShoppingBag, label: 'Browse Products', path: '/products' },
    { icon: Search,      label: 'Track Order',     path: '/track-order' },
  ]

  return (
    <>
      <SEOHead
        title="404 – Page Not Found"
        description="The page you're looking for doesn't exist. Browse AHEZA 2050's mattress collection instead."
      />

      <div
        className="min-h-screen bg-dark flex items-center justify-center px-4 relative overflow-hidden"
        style={{ paddingTop: 'var(--navbar-height)' }}
      >
        {/* Background decoration */}
        <div className="absolute inset-0 grid-pattern opacity-15 pointer-events-none" />
        <motion.div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(45,85,255,0.08) 0%, transparent 70%)' }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />

        <div className="relative z-10 max-w-lg w-full text-center">

          {/* 404 Big Number */}
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative mb-6"
          >
            <span
              className="font-display font-black text-[10rem] lg:text-[14rem] leading-none select-none"
              style={{
                background: 'linear-gradient(135deg, rgba(45,85,255,0.15) 0%, rgba(45,85,255,0.05) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              404
            </span>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-6xl animate-float">🛏</div>
            </div>
          </motion.div>

          {/* Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <h1 className="font-display font-black text-white text-3xl mb-3">
              This Page is Sleeping
            </h1>
            <p className="text-neutral-400 text-base leading-relaxed">
              The page you're looking for couldn't be found. It may have been moved, deleted, or never existed. Let us guide you back.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8"
          >
            {QUICK_LINKS.map(({ icon: Icon, label, path }, i) => (
              <motion.div key={path} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                <Link
                  to={path}
                  className={`flex items-center gap-2 px-5 py-3 text-sm font-semibold rounded-xl transition-all ${
                    i === 0
                      ? 'bg-primary-600 hover:bg-primary-500 text-white shadow-glow-sm hover:shadow-glow-md'
                      : 'glass border border-white/10 hover:border-white/20 text-neutral-300 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* Auto-redirect */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex items-center justify-center gap-2"
          >
            <div className="relative w-8 h-8">
              <svg className="w-8 h-8 -rotate-90" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="16" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="2" />
                <motion.circle
                  cx="18" cy="18" r="16"
                  fill="none"
                  stroke="#2d55ff"
                  strokeWidth="2"
                  strokeDasharray={`${2 * Math.PI * 16}`}
                  strokeDashoffset={`${2 * Math.PI * 16 * (countdown / 10)}`}
                  strokeLinecap="round"
                  transition={{ duration: 1, ease: 'linear' }}
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-2xs text-primary-400 font-bold">
                {countdown}
              </span>
            </div>
            <p className="text-neutral-600 text-xs">
              Redirecting to home in {countdown}s
            </p>
            <button
              onClick={() => setCountdown(999)}
              className="text-xs text-neutral-600 hover:text-neutral-400 underline transition-colors"
            >
              Cancel
            </button>
          </motion.div>
        </div>
      </div>
    </>
  )
}