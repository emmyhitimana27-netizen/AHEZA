import { Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar from './Navbar'
import Footer from './Footer'
import {
  RouteScrollToTop,
} from '@components/common/ScrollToTop'
import ScrollToTopButton from '@components/common/ScrollToTop'
import { useScrollProgress } from '@hooks/useScrollProgress'
import ErrorBoundary from '@components/common/ErrorBoundary'
import CartDrawer from '@components/cart/CartDrawer'

export default function Layout() {
  const location = useLocation()
  const { progress } = useScrollProgress()

  return (
    <div className="min-h-screen bg-dark flex flex-col">

      {/* Scroll Progress Bar */}
      <div
        className="scroll-progress-bar"
        style={{ width: `${progress}%` }}
      />

      <RouteScrollToTop />
      <Navbar />

      <main className="flex-1">
        <ErrorBoundary>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </ErrorBoundary>
      </main>

      <Footer />
      <CartDrawer />
      <ScrollToTopButton />

    </div>
  )
}