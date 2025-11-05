'use client'
import { motion } from 'framer-motion'
import { useState } from 'react'

export const OverHeader = () => {
  const [isPaused, setIsPaused] = useState(false)
  const oferts = [
    {
      id: 1,
      name: '10% de descuento en todos los pantalones',
    },
    {
      id: 2,
      name: '15% de descuento en compras mayores a $50.000',
    },
  ]

  const duplicatedOferts = [...oferts, ...oferts, ...oferts]

  return (
    <div className="relative w-full h-full overflow-hidden">
      <motion.div
        className="flex whitespace-nowrap items-center h-full"
        animate={{
          x: ['0%', '-50%'],
        }}
        transition={{
          ease: 'linear',
          duration: 25,
          repeat: Infinity,
        }}
        onHoverStart={() => setIsPaused(true)}
        onHoverEnd={() => setIsPaused(false)}
        style={{
          animationPlayState: isPaused ? 'paused' : 'running',
        }}
      >
        {duplicatedOferts.map((ofert, index) => (
          <div
            key={`${ofert.id}-${index}`}
            className="inline-flex items-center justify-center mx-6 px-4"
          >
            <span className="text-tertiary  text-sm "> {ofert.name} </span>
            {index < duplicatedOferts.length - 1 && (
              <div className="w-1 h-1 bg-tertiary rounded-full mx-4 opacity-60" />
            )}
          </div>
        ))}
      </motion.div>

      {/* Overlay gradients */}
      <div className="absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-primary to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-primary to-transparent z-10 pointer-events-none" />
    </div>
  )
}
