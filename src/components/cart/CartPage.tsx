"use client";

import { useCartStore } from "@/store/useCartStore";
import { FaWhatsapp } from "react-icons/fa6";
import { Link } from "react-router";

const NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER;

export default function CartPage() {
  const { items, removeFromCart, getTotal } = useCartStore();
    const total = getTotal();

  const sendToWhatsapp = () => {
    const message = items
      .map(
        (item) =>
          `• ${item.product.name} (${item.size}) x${item.quantity} - $${item.product.price}`
      )
      .join("%0A");


    const url = `https://wa.me/${NUMBER}?text=Hola! Quiero hacer la compra:%0A${message}%0A%0A⚽ Total: $${total}`;

    window.open(url, "_blank");
  };

  return (
    <div className="min-h-screen max-w-4xl mx-auto bg-primary text-light px-6 py-16">
      <h1 className="text-3xl mb-10 font-light">Tu carrito</h1>

      {items.length === 0 && <p>No tienes productos agregados.</p>}

      <div className="flex flex-col gap-6">
        {items.map((item) => (
          <div
            key={item.product._id + item.size}
            className="border border-background  flex space-x-4"
          >
            <img
              src={
                typeof item.product.images[0] === "string"
                  ? item.product.images[0]
                  : item.product.images[0].secure_url
              }
              className="w-32 h-auto object-cover border border-background bg-radial-[at_50%_75%] from-background/30 to-primary p-2"
              alt={item.product.name}
            />

            <div className="p-2">
              <Link to={`/shop/${item.product.slug}`} className="text-xl">{item.product.name}</Link>
              <p className="text-sm text-light/50">Talle: {item.size}</p>
              <p className="mt-2">
                ${item.product.discounted_price || item.product.price}
              </p>

              <button
                onClick={() =>
                  removeFromCart(item.product._id, item.size)
                }
                className="text-red-400 text-sm mt-4"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>

      <section className="flex items-center justify-between h-auto py-8 ">
        <h1 className="text-2xl h-full">Total: ${total}</h1>
        {items.length > 0 && (
          <button
          onClick={sendToWhatsapp}
          className=" border border-background text-white px-6 py-3 "
          >
            Finalizar compra por WhatsApp <FaWhatsapp className="inline-block ml-2" />
          </button>
        )}
      </section>
    </div>
  );
}
