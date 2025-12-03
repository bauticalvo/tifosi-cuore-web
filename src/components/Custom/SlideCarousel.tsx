'use client'
import type { Product } from '@/types/api/shop'
import { getImageUrl } from '@/types/api/typeGuards'
import { motion, useMotionValue } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

type SlideCarouselProps = {
  products: Product[]
}

export const SlideCarousel = ({ products }: SlideCarouselProps) => {
  const carouselRef = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState(0)
  const x = useMotionValue(0)
  const navigate = useNavigate()

  useEffect(() => {
    if (carouselRef.current) {
      setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth)
    }
  }, [products])

  const handleDetail = (slug: string) => {
    navigate(`/shop/${slug}`)
  }

return (
  <div className="relative w-screen overflow-hidden">
    <motion.div
      ref={carouselRef}
      className="flex cursor-grab active:cursor-grabbing"
      style={{ x }}
      drag="x"
      dragConstraints={{ right: 0, left: -width }}
      dragElastic={0.1}
      dragTransition={{ bounceStiffness: 600, bounceDamping: 30 }}
    >
      {[...products, ...products].map((card, index) => {
        const [isHovered, setIsHovered] = useState(false)

        const firstImageUrl = getImageUrl(card.images[0])
        const secondImageUrl =
          card.images.length > 1 ? getImageUrl(card.images[1]) : null

        return (
          <motion.div
            key={`${card._id}-${index}`}
            className="
              shrink-0
              w-[70vw] h-[55vh]
              sm:w-[50vw] sm:h-[50vh]
              md:w-[40vw] md:h-[45vh]
              lg:w-[30vw] lg:h-[50vh]
              xl:w-[25vw] xl:h-[55vh]
              p-1
            "
          >
            <div
              className="w-full h-full flex flex-col bg-background/80 border border-grey1/20  overflow-hidden group"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {/* 🟧 Contenedor de imagen - tamaño fijo */}
              <div className="w-full h-[65%] flex items-center justify-center bg-background border-b border-grey1/20 p-4">
                <img
                  src={
                    isHovered && secondImageUrl ? secondImageUrl : firstImageUrl
                  }
                  alt={`slide-${card._id}`}
                  className="
                    w-full h-full 
                    object-contain 
                    transition-all duration-500 
                    group-hover:scale-105 select-none
                  "
                  draggable="false"
                  onDragStart={(e) => e.preventDefault()}
                />
              </div>

              {/* 🟩 Texto + precio + botón */}
              <div className="flex flex-col justify-between h-[35%] p-3">
                <h1 className="text-text font-medium text-center text-base md:text-lg lg:text-xl leading-tight mb-2">
                  {card.name}
                </h1>

                <div className="flex flex-row items-center justify-between px-4">
                  <span className="text-text-alt font-light text-sm md:text-base">
                    ${card.price.toLocaleString()}
                  </span>

                  <button
                    onClick={() => handleDetail(card.slug)}
                    className="
                      bg-primary text-light px-6 py-1.5
                      rounded-md transition-all
                      group-hover:bg-accent
                    "
                  >
                    Ver
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )
      })}
    </motion.div>
  </div>
)

}
