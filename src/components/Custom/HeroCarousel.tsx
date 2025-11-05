'use client'

import { useState, useEffect, useRef } from 'react'


export const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(0)
  const didFetch = useRef(false)
  const [slides, setSlides] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${API_URL}/api/slides`) // trae todos
        const data = await res.json()
        setSlides(data.docs[0].products)
      } catch (error) {
        console.error('Error fetching products:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])
  useEffect(() => {
    if (slides.length <= 1) return

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000) // Cambia cada 5 segundos

    return () => clearInterval(timer)
  }, [slides.length])

  // const nextSlide = () => {
  //   setCurrentSlide((prev) => (prev + 1) % slides.length);
  // };

  // const prevSlide = () => {
  //   setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  // };

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  // Si no hay slides, mostrar un estado por defecto
  if (slides.length === 0) {
    return (
      <section className="relative h-[60vh] md:h-[70vh]  flex items-end justify-start p-8 md:p-16 overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Cargando...</h1>
        </div>
      </section>
    )
  }

  return (
    <section className=" h-[60vh] md:h-[70vh] overflow-hidden z-10">
      {/* Contenedor del carousel */}
      <div className="relative w-full h-full ">
        {slides.map((element, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-transform duration-700 ease-in-out flex flex-col items-center justify-center 
              ${
                index === currentSlide
                  ? 'translate-x-0'
                  : index < currentSlide
                    ? '-translate-x-full'
                    : 'translate-x-full'
              }`}
          >
            {element.images[0] &&
              typeof element.images[0] !== 'string' &&
              element.images[0].url && (
                <img src={element.images[0].url} alt={element.name} className="h-1/2 w-auto" />
              )}
            <h1 className="text-light ">
              {`${element.season.from}/${element.season.to.toString().slice(2)} ${element.name}`}
            </h1>
          </div>
        ))}

        {/* Controles de navegación */}
        {slides.length > 1 && (
          <>
            {/* Botones anterior/siguiente */}
            {/* <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300"
              aria-label="Slide anterior"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300"
              aria-label="Slide siguiente"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button> */}

            {/* Indicadores de paginación (círculos) */}
            {/* <div className="absolute bottom-1 md:bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide ? 'bg-white scale-110' : 'bg-white/50 hover:bg-white/70'
                  }`}
                  aria-label={`Ir al slide ${index + 1}`}
                />
              ))}
            </div> */}
          </>
        )}
      </div>
    </section>
  )
}
