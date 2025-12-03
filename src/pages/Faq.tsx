// pages/faq.tsx

import { FaqSection } from "@/components/FAQ/FaqSection";

export default function FaqPage() {
  return (
    <div className="min-h-screen mt-[11vh] bg-gray-50 py-8">
      <FaqSection 
        title="Centro de Ayuda"
        description="Encuentra respuestas rápidas a todas tus preguntas sobre compras, envíos, devoluciones y más."
      />
    </div>
  );
}

