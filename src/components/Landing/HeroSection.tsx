import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useSimpleScrollOpacity } from '../../hooks/useScrollOpacity'
import { HeroCarousel } from '../Custom/HeroCarousel'

gsap.registerPlugin(ScrollTrigger)

export const HeroSection = () => {
  const textRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<number>(0)
  const opacity = useSimpleScrollOpacity(50)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Crear un timeline para control preciso
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: '+=100%', // Scroll más largo para efecto más gradual
          scrub: true,
          markers: false,
          onUpdate: (self) => {
            progressRef.current = self.progress
          },
        },
      })

      // Animación no lineal - se hace más lenta progresivamente
      tl.to(
        textRef.current,
        {
          y: 200,
          ease: 'none', // Control manual del easing
          modifiers: {
            y: (y) => {
              // Fórmula para easing exponencial - se hace más lento al final
              const progress = progressRef.current
              const easedProgress = 1 - Math.pow(1 - progress, 2) // easeOutQuad
              return `${easedProgress * 400}px`
            },
          },
        },
        0,
      )
    })

    return () => ctx.revert()
  }, [])

  return (
    <div
      className="bg-tertiary-alt to-primary relative h-[40vh] md:h-[60vh]  xl:h-[800px] 2xl:h-[90vh] w-full flex items-center justify-center
     bg-no-repeat bg-top bg-cover overflow-hidden"
    >
      {/* Texto con parallax más pronunciado */}
      <section
        ref={textRef}
        className="absolute top-1/4 left-4 md:left-8 xl:left-20 transform z-10 text-left"
      >
        <h1
          className={`
            text-[clamp(60px,20vw,80px)] 
            md:text-[clamp(70px,20vw,120px)] 
            lg:text-[clamp(70px,20vw,120px)] 
            xl:text-[clamp(80px,20vw,140px)] 
            2xl:text-[clamp(100px,30vw,180px)] 
            text-primary font-bold leading-[0.9] tracking-wide`}
          style={{
            WebkitTextStroke: '0px #f0efd6',
            textShadow: `
              3px 3px 0px #f0efd6,   
              -3px -3px 0px #f0efd6,
              3px -3px 0px #f0efd6,
              -3px 3px 0px #f0efd6
            `,
          }}
        >
          <span className="block">TIFOSI</span>
          <span className="block mt-4">CUORE</span>
        </h1>
        <h1
          className={`
            text-[clamp(20px,20vw,15px)] 
            md:text-[clamp(40px,20vw,25px)] 
            lg:text-[clamp(50px,20vw,20px)] 
            xl:text-[clamp(60px,20vw,20px)] 
            2xl:text-[clamp(60px,30vw,30px)] 
            text-primary font-semibold leading-[0.9] tracking-wide`}
          style={{
            WebkitTextStroke: '0px #f0efd6',
            textShadow: `
              3px 3px 0px #f0efd6,   
              -3px -3px 0px #f0efd6,
              3px -3px 0px #f0efd6,
              -3px 3px 0px #f0efd6
            `,
          }}
        >
          <span className="hidden sm:block">Desde el corazón del hincha</span>
          <span className="block sm:hidden">
            Desde el corazón
            <br /> del hincha
          </span>
        </h1>
      </section>

      {/* Overlay para mejor contraste */}
      <div className="absolute inset-0 bg-black/10 z-10"></div>
      <div className="absolute top-0 left-0 h-full w-1/3 flex flex-col items-center justify-center text-primary"></div>
      <img
        className="absolute h-full w-4/10 right-0 top-0 object-cover"
        src="/images/static/camiseta hero2.svg"
      />
    </div>
  )
}
