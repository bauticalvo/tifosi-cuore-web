'use client'
import { SlideCarousel } from '../Custom/SlideCarousel'
import { GoArrowUpRight } from 'react-icons/go'
import { useProducts } from '@/hooks/useProducts'

export const Section4 = () => {

const { data:products, isPending, isError, error } = useProducts({ category: 'buzo' })

  if (isPending)
    return (
      <section className="w-full h-[35px] md:h-[50px] flex justify-center items-center bg-primary px-8">
        <h1 className="text-light flex items-center text-xl md:text-2xl">Cargando productos...</h1>
      </section>
    )

  if (isError)
    return (
      <section className="w-full h-[35px] md:h-[50px] flex justify-center items-center bg-primary px-8">
        <h1 className="text-light flex items-center text-xl md:text-2xl">{error.message}</h1>
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
          <span>Ver Mas Buzos</span>
          <GoArrowUpRight />
        </button>
      </section>
      <section className="relative">
        <SlideCarousel products={products} />
      </section>
    </div>
  )
}
