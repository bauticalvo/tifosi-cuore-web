import { useRef, useState, useEffect, useCallback } from 'react'
import { ShopMenu } from './Filter/ShopMenu'
import { SimpleMenu } from './Filter/ShopMenuData'
import { FaCartShopping } from "react-icons/fa6";
import { Link } from 'react-router';
import { CartSidebar } from '../cart/CartSidebar';
import { useCartStore } from '@/store/useCartStore';

interface HeaderProps {
  setOpenMenu: (open: boolean) => void
}

export const FilterBar = ( { setOpenMenu }: HeaderProps) => {
  const [isHovered, setIsHovered] = useState(0)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const setOpen = useCartStore((s) => s.setOpen);
  const open = useCartStore((s) => s.open);

  // Limpiar timeout al desmontar el componente
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const clearTimeoutRef = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }, [])

  const handleMouseEnterButton = useCallback(
    (index: number) => {
      clearTimeoutRef()
      setIsHovered(index)
    },
    [clearTimeoutRef],
  )

  const handleMouseLeaveButton = useCallback(() => {
    clearTimeoutRef()
    timeoutRef.current = setTimeout(() => {
      setIsHovered(0)
    }, 300)
  }, [clearTimeoutRef])

  const handleMouseEnterMenu = useCallback(() => {
    clearTimeoutRef()
  }, [clearTimeoutRef])

  const handleMouseLeaveMenu = useCallback(() => {
    clearTimeoutRef()
    timeoutRef.current = setTimeout(() => {
      setIsHovered(0)
    }, 300)
  }, [clearTimeoutRef])

  const CustomButton = ({ text, index, url }: { text: string; index: number; url?: string }) => {
    return (
      <div
        onMouseEnter={() => handleMouseEnterButton(index)}
        onMouseLeave={handleMouseLeaveButton}
        className="text-xl 2xl:text-2xl font-light group relative flex items-center h-full px-4 py-2 transition-colors hover:text-tertiary "
      >
        {url === 'menu' ? (
          <button onClick={() => setOpenMenu(true)} className="group relative cursor-default">{text}</button>
        ) : url === 'cart' ? (<div 
          onClick={() => setOpen(!open)}
          className='flex space-x-2 items-center ' >
          {text} <FaCartShopping className="inline-block ml-2 text-lg" />
        </div>) : (
          <Link to={url || '#'}>
            <p className="group relative">{text}</p>
          </Link>
        )}
        {/* <span className="absolute bottom-0 left-0 w-0 h-[3px] bg-tertiary transition-all duration-300 ease-out group-hover:w-full"></span> */}
      </div>
    )
  }

  return (
    <div className="w-full h-full border-b border-light/20 flex items-center justify-between space-x-6 px-8 relative">
      <section className="hidden md:flex w-full">
        <CustomButton text="Tienda" index={1} url="/shop" />
        <CustomButton text="Ligas" index={2} url="/shop" />
        <CustomButton text="Equipos" index={3} url="/shop" />
        <CustomButton text="Mas" index={4} url="/faq" />
      </section>
      <section className="flex md:hidden">
        <CustomButton text="MENU" index={6} url='menu'/>
      </section>
      <section>
        <CustomButton text="Carrito" url="cart" index={5} />
      </section>

      {/* Menú desplegable */}
      {(isHovered === 1 || isHovered === 2 || isHovered === 3|| isHovered === 4) && (
        <div
          ref={menuRef}
          className="absolute top-full left-0 w-full hidden md:flex backdrop-blur-sm shadow-xl z-50 border-t border-light/10"
          onMouseEnter={handleMouseEnterMenu}
          onMouseLeave={handleMouseLeaveMenu}
        >
          {isHovered === 1 && (
            <ShopMenu rows={SimpleMenu.Tienda} />
          )}
          {isHovered === 2 && (
            <ShopMenu rows={SimpleMenu.leagues} />
          )}
          {isHovered === 3 && (
            <ShopMenu rows={SimpleMenu.teams} />
          )}
          {isHovered === 4 && (
            <ShopMenu rows={SimpleMenu.more} />
          )}

        </div>
      )}
    </div>
  )
}

export default FilterBar
