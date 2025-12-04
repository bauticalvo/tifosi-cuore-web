// components/CategoriesGrid.tsx
import React from "react";

const CATEGORIES = [
  { title: "Retro", img: "/images/blokecore/rona-retro.jpg", url: "/shop?category=camiseta" },
  { title: "Idolos", img: "/images/blokecore/messi-foto.jpg", url: "/shop?category=short" },
  { title: "Entrenamiento Actual", img: "/images/blokecore/mbappe-realmadrid.jpeg", url: "/shop?category=buzo" },
];

export const CategoriesGrid = () => {
  return (
    <section className="w-full py-32 border-y border-light/80 bg-linear-to-b from-primary/60 to-primary">
      <div className="max-w-[1400px]  mx-auto px-6">
        <h3 className="text-light text-2xl md:text-3xl font-light uppercase mb-6">Colecciones Especiales</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CATEGORIES.map((c) => (
            <a key={c.title} href={c.url} className="group max-h-[50vh] flex flex-col overflow-hidden border border-light">
              <div className="w-full h-[90%]  overflow-hidden">
                <img src={c.img} alt={c.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="p-4 bg-primary border-t border-light">
                <h4 className="text-light font-light uppercase tracking-wider">{c.title}</h4>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
