'use client'
import type { Product } from '@/types/api/products'
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
    navigate(`/products/${slug}`)
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
          const secondImageUrl = card.images.length > 1 ? getImageUrl(card.images[1]) : null

          const hasSecondImage = secondImageUrl !== null

          return (
            <motion.div
              key={`${card._id}-${index}`}
              className="w-[35vw] h-auto md:w-[35vw] xl:w-[30vw] xl:h-auto flex-shrink-0 relative"
            >
              <div
                className="w-full h-full relative flex flex-col group"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                {firstImageUrl && (
                  <div 
                  onClick={() => handleDetail(card.slug)}
                  className='w-[35vw] h-[20vh] xl:w-[30vw] xl:h-[40vh] flex items-center justify-center p-4 border border-grey1/20 bg-background/80 transition-colors duration-300 group-hover:border-grey1/40'>
                    <img
                      src={
                        isHovered && hasSecondImage && secondImageUrl ? secondImageUrl : firstImageUrl
                      }
                      alt={`slide-${card._id}`}
                      className="w-full h-full object-contain select-none transition-all duration-500 group-hover:scale-105"
                      draggable="false"
                      onDragStart={(e) => e.preventDefault()}
                    />
                  </div>
                )}
                <div className="bg-background/80 w-full flex flex-col items-center justify-center p-3 border border-grey1/20 border-t-0 transition-colors duration-300 group-hover:border-grey1/40 group-hover:border-t-0">
                  <h1 className="text-text font-medium text-sm md:text-base xl:text-xl text-center leading-tight mb-1">{card.name}</h1>
                  <h1 className="text-text-alt font-light text-sm xl:text-lg">${card?.price.toLocaleString()}</h1>
                </div>
              </div>
            </motion.div>
          )
        })}
      </motion.div>
    </div>
  )
}
