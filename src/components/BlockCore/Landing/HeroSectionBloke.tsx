'use client'
import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useSimpleScrollOpacity } from '../../../hooks/useScrollOpacity'
import {useGeneralStore} from '@/store/useGeneralStore'

gsap.registerPlugin(ScrollTrigger)

export const HeroSectionBloke = () => {
  const textRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<number>(0)
  const opacity = useSimpleScrollOpacity(50)
  const { setIsImageLoaded } = useGeneralStore();

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
      className="bg-primary relative h-[40vh] md:h-[60vh]  xl:h-[800px] 2xl:h-[70vh] w-full flex items-center justify-center
     bg-[url('/images/blokecore/hero-bg.png')] bg-no-repeat bg-top bg-cover overflow-hidden"
     onLoad={() => setIsImageLoaded(true)}
     
    >
      {/* Imagen con parallax más lento */}
      <img
        style={{ opacity, transition: 'opacity 0.3s ease' }}
        src="/images/blokecore/bloke_core.png"
        alt="bloke_core"
        className="h-full object-cover object-top w-full z-20 absolute inset-0 shadow-primary"
      />

      {/* Texto con parallax más pronunciado */}
      <section ref={textRef} className="absolute top-10 right-1/6 transform z-10 text-left">
        <h1
          className={`
            text-[clamp(60px,20vw,200px)] 
            xl:text-[clamp(80px,20vw,180px)] 
            2xl:text-[clamp(100px,30vw,250px)] 
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
            text-[clamp(30px,20vw,30px)] 
            xl:text-[clamp(80px,20vw,25px)] 
            2xl:text-[clamp(80px,30vw,50px)] 
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
          <span className="block">Desde el corazón del hincha</span>
        </h1>
        {/* <h1 className="text-[150px] text-primary">Tifosi Cuore</h1>
        <h1 className="text-9xl text-primary">Desde el corazón del hincha</h1> */}
      </section>

      {/* Overlay para mejor contraste */}
      <div className="absolute inset-0 bg-black/10 z-10"></div>
    </div>
  )
}
