"use client";

import { motion } from "framer-motion";
import { useCartStore } from "@/store/useCartStore";
import { Link, useNavigate } from "react-router";

export const CartSidebar = () => {
  const items = useCartStore((s) => s.items);
  const removeFromCart = useCartStore((s) => s.removeFromCart);
  const open = useCartStore((s) => s.open);
  const setOpen = useCartStore((s) => s.setOpen);
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: open ? 0 : "100%" }}
      transition={{ duration: 0.3 }}
      className="absolute top-0 right-0 w-[70vw] md:w-[35vw] max-h-[70vh] flex flex-col bg-primary border border-background text-light shadow-xl  z-999 "
    >
      <div className="border-b border-light/20 p-4 flex justify-between items-center">
      <h2 className="text-2xl font-light ">Tu carrito</h2>
      <button
        onClick={() => setOpen(false)}
        className=" text-lg text-light"
      >
        Cerrar
      </button>
      </div>

      {items.length === 0 && (
        <p className="text-light/60">Tu carrito está vacío.</p>
      )}

      <div className="flex flex-col gap-4 p-4 overflow-y-auto ">
        {items.map((item) => {
          return(
          <div
            key={item.product._id + item.size}
            className="border-b border-light/20 pb-4 flex justify-between "
          >

            <section className="flex flex-col">
              <p className="font-medium">{item.product.name}</p>
              <p className="text-sm text-light/60">Talle: {item.size}</p>
              <p>${item.product.discounted_price || item.product.price}</p>

              <button
                onClick={() =>
                  removeFromCart(item.product._id, item.size)
                }
                className="text-red-400 border border-background text-sm mt-2 hover:text-red-300"
                >
                Eliminar
              </button>
            </section>
                        <section>
              <img
                src={item.product.images[0].secure_url || item.product.images[0].url}
                alt={item.product.name}
                className="w-20 h-20 object-cover mr-4"
              />
            </section>
          </div>
        ) })}
      </div>

      <button
        onClick={() => {
          setOpen(false);
          navigate("/cart");
        }}
        className="block mt-6 bg-primary border border-background text-light py-3 text-center  hover:bg-primary/90"
      >
        Ver carrito completo
      </button>
    </motion.div>
  );
};
