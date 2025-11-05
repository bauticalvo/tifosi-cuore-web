'use client'
import { useEffect, useState } from 'react'
import { SlideCarousel } from '../Custom/SlideCarousel'
import { GoArrowUpRight } from 'react-icons/go'

interface CustomImportMeta extends ImportMeta {
  env: {
    VITE_API: string
  }
}

const API_URL = (import.meta as CustomImportMeta).env.VITE_API;


export const Section4 = () => {
  const [slides, setSlides] = useState<null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const res = await fetch(`${API_URL}/products`) // trae todos
        const data = await res.json()
        setSlides(data)
        console.log(data);
        
      } catch (error) {
        console.error('Error fetching slides:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchSlides()
  }, [])

  if (loading)
    return (
      <section className="w-full h-[35px] md:h-[50px] flex justify-center items-center bg-primary px-8">
        <h1 className="text-light flex items-center text-xl md:text-2xl">Cargando productos...</h1>
      </section>
    )

  return (
    <div className="h-auto pb-10 w-screen flex flex-col items-center  bg-primary relative">
      <div className="w-full h-[70px] md:h-[100px] border-b border-light flex flex-col justify-center items-center"></div>
      <section className="w-full h-[35px] md:h-[50px]  flex justify-between items-center px-8">
        {/* <h1 className="text-light flex items-center text-xl md:text-2xl">{slides?.name}</h1> */}
        <button
          className="text-light flex space-x-2 items-center text-xl md:text-2xl hover:pr-4"
        >
          <span>Ver Mas Camisetas</span>
          <GoArrowUpRight />
        </button>
      </section>
      <section className="relative">
        {/* <SlideCarousel products={slides?.products} /> */}
      </section>
    </div>
  )
}
