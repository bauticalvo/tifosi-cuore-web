// components/FaqSection.tsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BiChevronDown, BiChevronUp, BiHelpCircle } from 'react-icons/bi';


const NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER;
// Tipos de datos
interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category?: string;
}

// Datos de ejemplo para FAQs
export const faqData: FAQItem[] = [
  {
    id: 1,
    category: 'Pedidos y Envíos',
    question: '¿Cuánto tarda en llegar mi pedido?',
    answer: 'Los pedidos normalmente se envían en 24-48 horas hábiles. El tiempo de entrega depende de tu ubicación: • San Juan y alrededores: 2-3 días hábiles • Interior de la República: 3-14 días hábiles '
  },
    {
    id: 2,
    category: 'Pedidos y Envíos',
    question: '¿Realizan envíos a todo el pais?',
    answer: 'Sí, realizamos envíos a toda Argentina.'
  },
  {
    id: 3,
    category: 'Pedidos y Envíos',
    question: '¿Puedo cambiar la dirección de envío después de hacer el pedido?',
    answer: `Solo si el pedido aún no ha sido procesado para envío. Contáctanos dentro de las primeras 12 horas después de realizar tu compra a nuestro WhatsApp al +54 ${NUMBER} . Una vez el pedido está en proceso de envío, no podemos modificar la dirección.`
  },
  // {
  //   id: 4,
  //   category: 'Tallas y Productos',
  //   question: '¿Cómo sé mi talla correcta?',
  //   answer: 'Te recomendamos consultar nuestra guía de tallas en cada producto. Todas nuestras prendas siguen tallas estándar: • XS: Pecho 86-91cm • S: Pecho 91-96cm • M: Pecho 96-101cm • L: Pecho 101-106cm • XL: Pecho 106-111cm • XXL: Pecho 111-116cm. Si tienes dudas, contáctanos con tus medidas y te ayudaremos a elegir la talla perfecta.'
  // },
  {
    id: 5,
    category: 'Tallas y Productos',
    question: '¿Los productos son originales y oficiales?',
    answer: 'Vendemos tanto productos originales y oficiales como replicas de alta calidad. Todos los productos originales cuentan con etiquetas y empaques oficiales. Las réplicas son fabricadas con materiales duraderos y diseños fieles a los originales, pero no son productos licenciados. Siempre especificamos en la descripción si un producto es original o réplica para que puedas tomar una decisión informada.'
  },
  {
    id: 6,
    category: 'Tallas y Productos',
    question: '¿Qué hago si recibo un producto con defecto?',
    answer: 'Contáctanos dentro de los 7 días posteriores a la recepción del producto. Envía fotos claras del defecto a nuestro WhatsApp al +54 ${NUMBER} junto con tu número de pedido.'
  },
  {
    id: 7,
    category: 'Pagos y Seguridad',
    question: '¿Qué métodos de pago aceptan?',
    answer: 'Aceptamos: • Efectivo • Transferencia bancaria • Mercado Pago.'
  },
  // {
  //   id: 8,
  //   category: 'Pagos y Seguridad',
  //   question: '¿Es seguro comprar en su tienda?',
  //   answer: 'Completamente seguro. Utilizamos certificado SSL de alta seguridad, cumplimos con los estándares PCI-DSS para procesamiento de tarjetas, y nunca almacenamos información de pago sensible. Tu información personal está protegida bajo nuestra política de privacidad y cumplimos con las regulaciones de protección de datos.'
  // },
  // {
  //   id: 10,
  //   category: 'Devoluciones y Cambios',
  //   question: '¿Cómo puedo cambiar un producto por otra talla?',
  //   answer: 'Para cambios de talla: 1. Contáctanos dentro de los 30 días de recibido 2. El producto debe estar sin usar, con etiquetas 3. Cubre el envío de retorno 4. Te enviamos la nueva talla sin costo adicional. Si la nueva talla tiene precio diferente, se realizará ajuste correspondiente. Los cambios están sujetos a disponibilidad de inventario.'
  // },
  // {
  //   id: 11,
  //   category: 'General',
  //   question: '¿Ofrecen descuentos para compras al por mayor?',
  //   answer: 'Sí, ofrecemos precios especiales para compras al por mayor (mínimo 10 unidades) y para equipos deportivos. Contáctanos a ventas@tutienda.com con los productos de interés y cantidades aproximadas para recibir una cotización personalizada con descuento. También ofrecemos servicios de personalización para equipos.'
  // },
  // {
  //   id: 12,
  //   category: 'General',
  //   question: '¿Puedo personalizar una camiseta con mi nombre y número?',
  //   answer: '¡Sí! Ofrecemos servicio de personalización en la mayoría de nuestras camisetas. Puedes agregar nombre, número y parches oficiales. El servicio de personalización tiene un costo adicional de $250 MXN y agrega 2-3 días hábiles al tiempo de procesamiento. Revisa que el producto tenga la opción "Personalizar" disponible.'
  // }
];

// Componente FAQ Item individual
interface FaqItemProps {
  item: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
}

const FaqItem = ({ item, isOpen, onToggle }: FaqItemProps) => {
  return (
    <div className="border-b border-gray-200 last:border-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-6 hover:bg-gray-50 transition-all duration-200 text-left group"
        aria-expanded={isOpen}
      >
        <div className="flex items-start space-x-4">
          <div className="mt-1">
            <BiHelpCircle size={20} className="text-primary group-hover:text-primary/80 transition-colors" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary transition-colors">
              {item.question}
            </h3>
            {item.category && (
              <span className="inline-block mt-1 px-2 py-1 text-xs font-medium bg-primary/10 text-primary ">
                {item.category}
              </span>
            )}
          </div>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="ml-4 flex-shrink-0"
        >
          {isOpen ? (
            <BiChevronUp size={24} className="text-primary" />
          ) : (
            <BiChevronDown size={24} className="text-gray-400 group-hover:text-primary" />
          )}
        </motion.div>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 pt-2 ml-10">
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {item.answer}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Componente FAQ principal
interface FaqSectionProps {
  faqs?: FAQItem[];
  title?: string;
  description?: string;
  showSearch?: boolean;
  showCategories?: boolean;
}

export const FaqSection = ({
  faqs = faqData,
  title = "Preguntas Frecuentes",
  description = "Encuentra respuestas rápidas a las preguntas más comunes sobre nuestros productos, envíos, pagos y más.",
  showSearch = true,
  showCategories = true
}: FaqSectionProps) => {
  const [openItem, setOpenItem] = useState<number | null>(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('todas');

  // Obtener categorías únicas
  const categories = ['todas', ...Array.from(new Set(faqs.map(faq => faq.category || 'General')))];

  // Filtrar FAQs
  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'todas' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleItem = (id: number) => {
    setOpenItem(openItem === id ? null : id);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      {/* Encabezado */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {title}
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          {description}
        </p>
      </div>

      {/* Controles de búsqueda y filtros */}
      <div className="mb-8 space-y-6">
        {showSearch && (
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Buscar preguntas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300  focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            )}
          </div>
        )}

        {showCategories && (
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2  text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category === 'todas' ? 'Todas las categorías' : category}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Contador de resultados */}
      {searchTerm && (
        <div className="mb-6 text-sm text-gray-500">
          {filteredFaqs.length} resultado{filteredFaqs.length !== 1 ? 's' : ''} para "{searchTerm}"
        </div>
      )}

      {/* Lista de FAQs */}
      <div className="bg-white  shadow-sm border border-gray-200 overflow-hidden">
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map(faq => (
            <FaqItem
              key={faq.id}
              item={faq}
              isOpen={openItem === faq.id}
              onToggle={() => toggleItem(faq.id)}
            />
          ))
        ) : (
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-gray-900">No se encontraron preguntas</h3>
            <p className="mt-2 text-gray-500">
              Intenta con otros términos de búsqueda o selecciona otra categoría.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('todas');
              }}
              className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium  shadow-sm text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Limpiar filtros
            </button>
          </div>
        )}
      </div>

      {/* Sección de contacto adicional */}
      <div className="mt-12 bg-primary/5 border border-primary/20  p-8 text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          ¿No encontraste lo que buscabas?
        </h3>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Nuestro equipo de soporte está listo para ayudarte con cualquier duda o consulta adicional.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {/* <a
            href="mailto:soporte@tutienda.com"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium  shadow-sm text-white bg-primary hover:bg-primary/90 transition-colors"
          >
            <svg className="mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Enviar email
          </a> */}
          <a
            href={`https://wa.me/${NUMBER}?text=${encodeURIComponent(import.meta.env.VITE_WHATSAPP_MESSAGE)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 border border-primary text-base font-medium  text-primary bg-white hover:bg-gray-50 transition-colors"
          >
            <svg className="mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.226 1.36.194 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.76.982.998-3.675-.236-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.897 6.994c-.004 5.45-4.438 9.88-9.888 9.88m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.333.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.333 11.893-11.893 0-3.18-1.24-6.162-3.495-8.411" />
            </svg>
            WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
};