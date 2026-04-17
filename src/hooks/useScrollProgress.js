import { useEffect, useState } from 'react'

export const useScrollProgress = () => {
  const [progress, setProgress] = useState(0)
  const [scrollY,  setScrollY]  = useState(0)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement
      const total = scrollHeight - clientHeight
      setProgress(total > 0 ? (scrollTop / total) * 100 : 0)
      setScrollY(scrollTop)
      setIsScrolled(scrollTop > 80)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return { progress, scrollY, isScrolled }
}