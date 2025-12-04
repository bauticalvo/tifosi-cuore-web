// components/QualityPillars.tsx
import React from "react";
import { FaShieldAlt, FaTruck, FaStar } from "react-icons/fa";

const PILLARS = [
  { icon: <FaShieldAlt />, title: "Calidad premium", text: "Materiales originales y control de calidad." },
  { icon: <FaStar />, title: "Productos exclusivos", text: "Ediciones limitadas y retro auténtico." },
  { icon: <FaTruck />, title: "Envíos rápidos", text: "Envíos a todo el país con tracking." },
];

export const QualityPillars = () => {
  return (
    <section className="w-full py-12 bg-linear-to-b from-primary to-primary/90">
      <div className="max-w-[1100px] mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {PILLARS.map((p) => (
          <div key={p.title} className="p-6 border border-light/10 flex flex-col gap-4">
            <div className="text-3xl text-light">{p.icon}</div>
            <h4 className="text-light font-medium uppercase">{p.title}</h4>
            <p className="text-light/70 text-sm">{p.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
