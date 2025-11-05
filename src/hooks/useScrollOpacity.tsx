import { useState, useEffect } from 'react'

export const useSimpleScrollOpacity = (threshold: number = 100) => {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    let lastScrollY = window.scrollY
    let ticking = false

    const updateVisibility = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY > threshold) {
        setIsVisible(currentScrollY < lastScrollY)
      } else {
        setIsVisible(true)
      }

      lastScrollY = currentScrollY
      ticking = false
    }

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateVisibility)
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [threshold])

  return isVisible ? 1 : 0
}
