'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface FiltersDrawerProps {
  open: boolean
  onClose: () => void
  children: ReactNode
}

export function FiltersDrawer({ open, onClose, children }: FiltersDrawerProps) {
  return (
    <>
      {/* Fondo oscuro */}
      {open && (
        <div onClick={onClose} className="fixed inset-0 bg-black/40 z-40 transition-opacity " />
      )}

      {/* Drawer */}
      <motion.div
        initial={{ x: '-100%' }}
        animate={{ x: open ? 0 : '-100%' }}
        transition={{ type: 'tween', duration: 0.3 }}
        className="fixed top-0 left-0 w-3/4 sm:w-1/2 h-full bg-white shadow-lg z-500 p-6 overflow-y-auto"
      >
        <button onClick={onClose} className="text-black font-bold text-sm mb-4 ">
          X Cerrar
        </button>
        {children}
      </motion.div>
    </>
  )
}
