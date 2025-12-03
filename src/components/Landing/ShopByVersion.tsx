"use client"

import { motion } from "framer-motion"
import { MdOutlineSubdirectoryArrowRight } from 'react-icons/md'

type Category = {
  title: string
  src: string
}

const categories: Category[] = [
  { title: "Retro", src: "/images/blokecore/rona-retro.jpg" },
  { title: "Ídolos", src: "/images/blokecore/messi-foto.jpg" },
  { title: "Entrenamiento Actual", src: "/images/blokecore/mbappe-realmadrid.jpeg" },
]

export const ShopByVersion = () => {
  return (
    <section className="w-full bg-primary text-light py-16 px-6 md:px-12 overflow-hidden">
      <div className=" mx-auto flex flex-col md:flex-row justify-between">
        
        {/* ---------- LEFT SIDE (Title + Button) ---------- */}
        <motion.div 
          className="md:w-[28%] flex flex-col justify-center mb-10 md:mb-0"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-light uppercase leading-none tracking-tight">
            Colecciones <br /> especiales.
          </h1>

          <button className="flex items-center text-light/80 hover:text-light transition-all mt-6 text-sm tracking-wide uppercase">
            <MdOutlineSubdirectoryArrowRight className="mr-2 text-lg" />
            Ver todos
          </button>
        </motion.div>

        {/* ---------- RIGHT SIDE: CARDS ---------- */}
        <div className="md:w-[70%] flex gap-6 overflow-x-auto no-scrollbar pb-4">
          {categories.map((cat, i) => (
            <motion.div
              key={i}
              className="group min-w-[70vw] sm:min-w-[40vw] md:min-w-[22vw] 
                         flex flex-col cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >

              {/* ------- IMAGE BOX ------- */}
              <div className="w-full h-[45vh] md:h-[40vh] bg-grey-background 
                              border border-light/20 overflow-hidden relative">
                
                <motion.img
                  src={cat.src}
                  className="w-full h-full object-cover object-top"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                />
              </div>

              {/* ------- TITLE ------- */}
              <motion.h2 
                className="mt-3 text-xl md:text-2xl font-light uppercase tracking-wider"
                whileHover={{ x: 4 }}
                transition={{ type: "spring", stiffness: 120 }}
              >
                {cat.title}
              </motion.h2>

            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
