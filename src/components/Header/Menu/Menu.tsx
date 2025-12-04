import { motion } from 'framer-motion';
import { Link } from 'react-router';
import { SimpleMenu } from '../Filter/ShopMenuData';
import { BiChevronDown } from 'react-icons/bi';
import { useEffect, useRef, useState } from 'react';


interface HeaderProps {
  setOpenMenu: (open: boolean) => void
}
export const Menu = ({ setOpenMenu }: HeaderProps) => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [isClosing, setIsClosing] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Mapear las categorías a nombres para el menú
  const menuCategories = [
    { key: 'Tienda', label: 'Tienda' },
    { key: 'leagues', label: 'Ligas' },
    { key: 'teams', label: 'Equipos' },
    { key: 'more', label: 'Mas' },
  ];

  const toggleCategory = (categoryKey: string) => {
    if (activeCategory === categoryKey) {
      setActiveCategory(null);
    } else {
      setActiveCategory(categoryKey);
    }
  };

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setOpenMenu(false);
    }, 200);
  };

  // Cerrar menú al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        handleClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Bloquear scroll cuando el menú está abierto
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-9999 bg-black/50 backdrop-blur-sm"
      onClick={handleClose}
    >
      <motion.div 
        ref={menuRef}
        initial={{ x: '-100%' }}
        animate={{ x: 0 }}
        exit={{ x: '-100%' }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="w-4/5 max-w-md h-full bg-white shadow-xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Encabezado del menú */}
        <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-primary text-white">
          <h2 className="text-xl font-bold">MENÚ</h2>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
            aria-label="Cerrar menú"
          >
           Cerrar
          </button>
        </div>

        {/* Contenido del menú */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4">
            {/* Sección Black Friday */}
            {/* <div className="mb-6 bg-red-600 text-white p-3 rounded-lg text-center font-bold">
              Black Friday - Hasta 50% OFF
            </div> */}

            {/* Categorías del menú */}
            <nav className="space-y-2">
              {menuCategories.map((category) => (
                <div key={category.key} className="border-b border-gray-100 last:border-0">
                  {/* Botón de categoría */}
                  <button
                    onClick={() => toggleCategory(category.key)}
                    className="w-full flex items-center justify-between p-4 hover:bg-light transition-colors text-left"
                  >
                    <span className="font-semibold text-dark-text text-lg">
                      {category.label}
                    </span>
                    <motion.div
                      animate={{ rotate: activeCategory === category.key ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <BiChevronDown size={20} className="text-dark-text" />
                    </motion.div>
                  </button>

                  {/* Submenú desplegable */}
                  <motion.div
                    initial={false}
                    animate={{ 
                      height: activeCategory === category.key ? 'auto' : 0,
                      opacity: activeCategory === category.key ? 1 : 0
                    }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="pb-4 px-4">
                      {/* Para categorías con imágenes (leagues y teams) */}
                      {(category.key === 'leagues' || category.key === 'teams') && (
                        <div className="grid grid-cols-2 gap-3">
                          {SimpleMenu[category.key].map((item, index) => (
                            <Link
                              key={index}
                              to={item.url}
                              onClick={handleClose}
                              className="flex flex-col items-center p-3 rounded-lg hover:bg-gray-100 transition-colors group"
                            >
                              {item.photo && (
                                <div className="w-16 h-16 mb-2 rounded-full overflow-hidden bg-gray-100 p-1">
                                  <img
                                    src={item.photo}
                                    alt={item.text}
                                    className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                                    loading="lazy"
                                  />
                                </div>
                              )}
                              <span className="text-sm font-medium text-dark-text text-center">
                                {item.text}
                              </span>
                            </Link>
                          ))}
                        </div>
                      )}

                      {/* Para categorías sin imágenes (Tienda) */}
                      {category.key === 'Tienda' && (
                        <div className="space-y-2">
                          {SimpleMenu[category.key].map((item, index) => (
                            <Link
                              key={index}
                              to={item.url}
                              onClick={handleClose}
                              className="block p-3 rounded-lg hover:bg-gray-100 transition-colors text-gray-700 hover:text-gray-900"
                            >
                              {item.text}
                            </Link>
                          ))}
                        </div>
                      )}

                      {/* Para la categoría MORE */}
                      {category.key === 'more' && (
                        <div className="flex flex-wrap gap-2">
                          {SimpleMenu[category.key].map((item, index) => {
                            // Separador especial
                            if (item.text === '|') {
                              return (
                                <div key={index} className="w-full h-px bg-gray-300 my-2" />
                              );
                            }

                            // Enlaces externos
                            if (item.text === 'Instagram' || item.text === 'Tik Tok' || item.text === 'Facebook') {
                              return (
                                <button
                                  key={index}
                                  onClick={() => {
                                    window.open(item.url_a, '_blank');
                                  }}
                                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors font-medium"
                                >
                                  {item.text}
                                </button>
                              );
                            }

                            // Enlaces internos
                            return (
                              <Link
                                key={index}
                                to={item.url}
                                onClick={handleClose}
                                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors font-medium"
                              >
                                {item.text}
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </motion.div>
                </div>
              ))}
            </nav>

            {/* Enlaces adicionales */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="space-y-3">
                <Link
                  to="/shop"
                  onClick={handleClose}
                  className="block text-center py-3 bg-primary text-white  font-semibold hover:bg-primary/90 transition-colors"
                >
                  VER TODOS LOS PRODUCTOS
                </Link>
                
                {/* <Link
                  to="/new-arrivals"
                  onClick={handleClose}
                  className="block text-center py-3 border-2 border-primary text-primary  font-semibold hover:bg-primary/5 transition-colors"
                >
                  NUEVOS LANZAMIENTOS
                </Link> */}
              </div>
            </div>
          </div>
        </div>

        {/* Pie del menú */}
        <div className="p-4 border-t border-gray-200 bg-light">
          <div className="text-center text-sm text-gray-600">
            <p>© {new Date().getFullYear()} Tifosi Cuore. Todos los derechos reservados.</p>
            <div className="mt-2 flex justify-center space-x-4">
              {/* <Link to="/privacy" onClick={handleClose} className="hover:text-gray-900">
                Privacidad
              </Link>
              <Link to="/terms" onClick={handleClose} className="hover:text-gray-900">
                Términos
              </Link> */}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};