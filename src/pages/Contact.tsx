"use client"

import { motion } from "framer-motion"
import { FaInstagram, FaTiktok } from "react-icons/fa"
import { FaWhatsapp } from "react-icons/fa"

const NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER
const MESSAGE = import.meta.env.VITE_WHATSAPP_MESSAGE
const INSTAGRAM_URL = import.meta.env.VITE_INSTAGRAM_URL
const TIKTOK_URL = import.meta.env.VITE_TIKTOK_URL

export const Contact = () => {
  return (
    <section className="w-full min-h-[70vh] flex flex-col items-center bg-light text-primary py-20 px-6 md:px-12 mt-[11vh]">
      <div className="max-w-[1400px] h-full mx-auto flex flex-col md:flex-row items-center justify-between gap-16">

        {/* ---------------- LEFT SIDE: TITLE ---------------- */}
        <motion.div
          className="md:w-[40%] flex flex-col justify-center"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-light uppercase leading-none tracking-tight">
            Contacto.
          </h1>

          <p className="text-primary/70 mt-4 text-sm tracking-wide uppercase">
            Estamos disponibles para consultas, pedidos y ayuda personalizada.
          </p>
        </motion.div>

        {/* ---------------- RIGHT SIDE: SOCIALS ---------------- */}
        <motion.div
          className="md:w-[50%] grid grid-cols-1 sm:grid-cols-3 gap-6"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* WHATSAPP */}
          <motion.a
            href={`https://wa.me/${NUMBER}?text=${encodeURIComponent(MESSAGE)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-primary/20 p-8 flex flex-col items-center justify-between hover:bg-primary/5 transition-all"
            whileHover={{ y: -4 }}
          >
            <FaWhatsapp className="text-4xl mb-6" />
            <h3 className="text-2xl font-primary uppercase tracking-wider">
              WhatsApp
            </h3>
          </motion.a>

          {/* INSTAGRAM */}
          <motion.a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-primary/20 p-8 flex flex-col items-center justify-between hover:bg-primary/5 transition-all"
            whileHover={{ y: -4 }}
          >
            <FaInstagram className="text-4xl mb-6" />
            <h3 className="text-2xl font-primary uppercase tracking-wider">
              Instagram
            </h3>
          </motion.a>

          {/* TIKTOK */}
          <motion.a
            href={TIKTOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-primary/20 p-8 flex flex-col items-center justify-between hover:bg-primary/5 transition-all"
            whileHover={{ y: -4 }}
          >
            <FaTiktok className="text-4xl mb-6" />
            <h3 className="text-2xl font-light uppercase tracking-wider">
              TikTok
            </h3>
          </motion.a>
        </motion.div>

      </div>
    </section>
  )
}
