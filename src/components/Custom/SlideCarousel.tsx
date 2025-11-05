'use client'
import type { Product } from '@/types/api/products'
import { motion, useMotionValue } from 'framer-motion'
import React, { useRef, useEffect, useState } from 'react'

type SlideCarouselProps = {
  products: Product[]
}

// Helper function para obtener la URL de una imagen
const getImageUrl = (image: string ): string | null => {
  if (typeof image === 'string') return null
  return image || null
}

export const SlideCarousel = ({ products }: SlideCarouselProps) => {
  const carouselRef = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState(0)
  const x = useMotionValue(0)

  useEffect(() => {
    if (carouselRef.current) {
      setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth)
    }
  }, [products])

  return (
    <div className="relative w-screen overflow-hidden">
      {/* <motion.div
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
              key={`${card.id}-${index}`}
              className="w-[35vw] h-auto md:[26vw] xl:w-[20vw] xl:h-auto flex-shrink-0 relative"
            >
              <div
                className="w-full h-full relative flex flex-col"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                {firstImageUrl && (
                  <img
                    src={
                      isHovered && hasSecondImage && secondImageUrl ? secondImageUrl : firstImageUrl
                    }
                    alt={`slide-${card.id}`}
                    className="w-full h-full object-cover border-x border-x-primary bg-tertiary-alt select-none transition-opacity duration-300"
                    draggable="false"
                    onDragStart={(e) => e.preventDefault()}
                  />
                )}
                <div className="bg-primary w-full flex flex-col items-center justify-center text-md md:text-lg p-2 text-light">
                  <h1>{`${card.season.from}/${card.season.to.toString().slice(2)} ${card.name}`}</h1>
                  <h1>${card?.price.toLocaleString()}</h1>
                </div>
              </div>
            </motion.div>
          )
        })}
      </motion.div> */}
    </div>
  )
}
