import { useEffect, useRef, useState } from 'react'

/**
 * Intersection Observer hook for scroll-triggered animations
 */
export const useIntersectionObserver = (options = {}) => {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  const [hasTriggered, setHasTriggered] = useState(false)

  const {
    threshold = 0.15,
    rootMargin = '0px 0px -60px 0px',
    triggerOnce = true,
  } = options

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          setHasTriggered(true)
          if (triggerOnce) observer.unobserve(el)
        } else if (!triggerOnce) {
          setIsVisible(false)
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, rootMargin, triggerOnce])

  return { ref, isVisible, hasTriggered }
}

/**
 * Staggered animation hook for lists
 */
export const useStaggeredReveal = (itemCount, options = {}) => {
  const { ref, isVisible } = useIntersectionObserver(options)

  const getDelay = (index) => `${index * 0.1}s`

  return { ref, isVisible, getDelay }
}