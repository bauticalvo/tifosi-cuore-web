import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import FilterBar from './FilterBar'
export const Header = () => {
  const logoSection = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const maxScroll = 100 // hasta dónde desaparece
      const progress = Math.min(scrollY / maxScroll, 1) // valor entre 0 y 1

      // animamos dinámicamente según el progreso
      gsap.to(logoSection.current, {
        scaleY: 1 - progress,
        opacity: 1 - progress,
        transformOrigin: 'top',
        duration: 0, // instantáneo (sin delay entre frames)
      })

      // ocultar visualmente cuando llega a 0
      if (progress === 1 && logoSection.current) {
        logoSection.current.style.display = 'none'
      } else if (logoSection.current) {
        logoSection.current.style.display = 'block'
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="fixed top-0 z-100 text-white bg-primary flex flex-col justify-between h-auto items-center w-screen text-base font-primary">
      <section ref={logoSection} className="w-full h-[7vh] py-1 px-8">
          <img src="/logos/logo_acortado.svg" alt="tifosi_logo" className="h-full w-auto" />
      </section>
      <section className="w-full h-[4vh] border-t border-light">
        <FilterBar />
      </section>
    </div>
  )
}
