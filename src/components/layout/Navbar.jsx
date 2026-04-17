import { useState, useEffect, useCallback } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Menu, X, ShoppingCart, Search, Moon, Sun, ChevronDown
} from 'lucide-react'
import { useScrollProgress } from '@hooks/useScrollProgress'
import { useCart } from '@hooks/useCart'
import { useUIStore } from '@store/useStore'
import { NAV_LINKS } from '@utils/constants'
import clsx from 'clsx'

/* ── Mobile nav animation variants ─── */
const mobileMenuVariants = {
  closed: { opacity: 0, height: 0, transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] } },
  open:   { opacity: 1, height: 'auto', transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
}
const mobileItemVariants = {
  closed: { opacity: 0, x: -20 },
  open:   (i) => ({ opacity: 1, x: 0, transition: { delay: i * 0.07, duration: 0.4 } }),
}

export default function Navbar() {
  const { isScrolled } = useScrollProgress()
  const { totalItems, openCart } = useCart()
  const { mobileMenuOpen, toggleMobile, closeMobile, toggleSearch, searchOpen } = useUIStore()
  const location = useLocation()
  const [searchQuery, setSearchQuery] = useState('')
  const isHome = location.pathname === '/'

  /* Close mobile on route change */
  useEffect(() => { closeMobile() }, [location.pathname, closeMobile])

  /* Close on Escape */
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') { closeMobile(); if (searchOpen) toggleSearch() }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [closeMobile, searchOpen, toggleSearch])

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/products?q=${encodeURIComponent(searchQuery.trim())}`
    }
  }

  return (
    <>
      {/* ─── Main Navbar ──────────────────────────────────────── */}
      <header
        className={clsx(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          isScrolled || !isHome
            ? 'glass-dark shadow-[0_1px_0_rgba(255,255,255,0.05)] py-3'
            : 'bg-transparent py-5'
        )}
        style={{ height: 'var(--navbar-height)' }}
      >
        <div className="container-custom h-full flex items-center justify-between gap-6">

          {/* ── Logo ─────────────────────────── */}
          <Link to="/" className="flex items-center gap-3 group flex-shrink-0">
            <div className="relative w-9 h-9">
              <div className="absolute inset-0 bg-primary-600 rounded-xl rotate-45 group-hover:rotate-[60deg] transition-transform duration-500" />
              <div className="absolute inset-1 bg-dark rounded-lg rotate-45" />
              <span className="absolute inset-0 flex items-center justify-center text-primary-400 font-display font-bold text-sm">A</span>
            </div>
            <div className="leading-none">
              <span className="font-display font-bold text-lg text-white tracking-tight block">
                AHEZA <span className="text-gradient-primary">2050</span>
              </span>
              <span className="text-2xs text-neutral-500 tracking-widest uppercase">Sleep Into The Future</span>
            </div>
          </Link>

          {/* ── Desktop Nav ───────────────────── */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  clsx(
                    'relative px-4 py-2 text-sm font-medium rounded-xl transition-colors duration-200',
                    isActive
                      ? 'text-white'
                      : 'text-neutral-400 hover:text-white hover:bg-white/5'
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    {link.label}
                    {isActive && (
                      <motion.div
                        layoutId="nav-indicator"
                        className="absolute bottom-0 left-3 right-3 h-0.5 bg-primary-500 rounded-full"
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* ── Right Actions ────────────────── */}
          <div className="flex items-center gap-2">

            {/* Search Button */}
            <motion.button
              onClick={toggleSearch}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-9 h-9 flex items-center justify-center rounded-xl text-neutral-400 hover:text-white hover:bg-white/5 transition-colors"
              aria-label="Search"
            >
              <Search className="w-4.5 h-4.5" />
            </motion.button>

            {/* Track Order */}
            <Link
              to="/track-order"
              className="hidden md:flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-neutral-400 hover:text-white border border-neutral-700/60 hover:border-primary-500/50 rounded-xl transition-all duration-200"
            >
              Track Order
            </Link>

            {/* Cart */}
            <motion.button
              onClick={openCart}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative w-9 h-9 flex items-center justify-center rounded-xl text-neutral-300 hover:text-white hover:bg-white/5 transition-colors"
              aria-label="Open cart"
            >
              <ShoppingCart className="w-4.5 h-4.5" />
              <AnimatePresence>
                {totalItems > 0 && (
                  <motion.span
                    key={totalItems}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-1 -right-1 w-4.5 h-4.5 bg-primary-500 text-white text-2xs font-bold rounded-full flex items-center justify-center"
                  >
                    {totalItems > 9 ? '9+' : totalItems}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Mobile Menu Toggle */}
            <motion.button
              onClick={toggleMobile}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="lg:hidden w-9 h-9 flex items-center justify-center rounded-xl text-neutral-300 hover:text-white hover:bg-white/5 transition-colors"
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={mobileMenuOpen ? 'close' : 'open'}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </motion.span>
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* ── Mobile Menu ───────────────────────────────────────── */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="lg:hidden glass-dark border-t border-white/5 overflow-hidden"
            >
              <div className="container-custom py-4 flex flex-col gap-1">
                {NAV_LINKS.map((link, i) => (
                  <motion.div
                    key={link.path}
                    custom={i}
                    variants={mobileItemVariants}
                    initial="closed"
                    animate="open"
                    exit="closed"
                  >
                    <NavLink
                      to={link.path}
                      onClick={closeMobile}
                      className={({ isActive }) =>
                        clsx(
                          'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors',
                          isActive
                            ? 'bg-primary-600/20 text-primary-300 border border-primary-500/20'
                            : 'text-neutral-400 hover:text-white hover:bg-white/5'
                        )
                      }
                    >
                      {link.label}
                    </NavLink>
                  </motion.div>
                ))}
                <motion.div
                  custom={NAV_LINKS.length}
                  variants={mobileItemVariants}
                  initial="closed"
                  animate="open"
                  className="pt-2 border-t border-white/5 mt-1"
                >
                  <Link
                    to="/track-order"
                    onClick={closeMobile}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-neutral-400 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    Track Order
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ─── Search Overlay ───────────────────────────────────── */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-dark/95 backdrop-blur-md flex flex-col items-center justify-start pt-24 px-4"
            onClick={(e) => {
              if (e.target === e.currentTarget) toggleSearch()
            }}
          >
            <motion.div
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -30, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-2xl"
            >
              <form onSubmit={handleSearchSubmit} className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search mattresses, sizes, types…"
                  autoFocus
                  className="w-full bg-surface border border-neutral-700/60 focus:border-primary-500/60 rounded-2xl px-6 py-4 pr-14 text-white placeholder-neutral-500 text-lg outline-none transition-colors"
                />
                <button
                  type="submit"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white transition-colors"
                  aria-label="Search"
                >
                  <Search className="w-5 h-5" />
                </button>
              </form>
              <p className="text-neutral-600 text-xs mt-3 text-center">
                Press <kbd className="px-1.5 py-0.5 bg-neutral-800 rounded text-neutral-400">Esc</kbd> to close
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}