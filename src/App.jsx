import { useEffect } from 'react'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import Lenis from 'lenis'

export default function App() {
  /* ── Smooth Scroll via Lenis ──────────────────────────── */
  useEffect(() => {
    const lenis = new Lenis({
      duration:  1.4,
      easing:    (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      smooth:    true,
    })

    const raf = (time) => {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    const rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [])

  return <RouterProvider router={router} />
}