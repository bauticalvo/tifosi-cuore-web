import { useRef, useState, useEffect, useCallback } from 'react'
import { MiniShopMenu } from './Filter/ShopMenu'
import { SimpleMenu } from './Filter/ShopMenuData'
import { FaCartShopping } from "react-icons/fa6";
import { Link } from 'react-router';

export const FilterBar = () => {
  const [isHovered, setIsHovered] = useState(2)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const menuRef = useRef<HTMLDivElement>(null)

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
      <button
        onMouseEnter={() => handleMouseEnterButton(index)}
        onMouseLeave={handleMouseLeaveButton}
        className="text-xl 2xl:text-2xl font-light group relative flex items-center h-full px-4 py-2 transition-colors hover:text-tertiary"
      >
        {url === 'none' ? (
          <p className="group relative cursor-default">{text}</p>
        ) : (
          <Link to={url || '#'}>
            <p className="group relative">{text}</p>
          </Link>
        )}
        {/* <span className="absolute bottom-0 left-0 w-0 h-[3px] bg-tertiary transition-all duration-300 ease-out group-hover:w-full"></span> */}
      </button>
    )
  }

  return (
    <div className="w-full h-full border-b border-light/20 flex items-center justify-between space-x-6 px-8 relative">
      <section className="hidden md:flex w-full">
        <CustomButton text="Camisetas" index={1} url="/products/shirts" />
        <CustomButton text="Pantalones" index={2} url="/products/shorts" />
        <CustomButton text="Buzos" index={3} url="/products/buzos" />
        <CustomButton text="Conjuntos" index={4} url="/products/conjuntos" />
      </section>
      <section className="flex md:hidden">
        <CustomButton text="MENU" index={6} />
      </section>
      <section>
        <CustomButton text="" index={5} />
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
            <MiniShopMenu rows={SimpleMenu.camisetas} />
          )}
          {isHovered === 2 && (
            <MiniShopMenu rows={SimpleMenu.pantalones} />
          )}
          {isHovered === 3 && (
            <MiniShopMenu rows={SimpleMenu.buzos} />
          )}
          {isHovered === 4 && (
            <MiniShopMenu rows={SimpleMenu.conjuntos} />
          )}

        </div>
      )}
    </div>
  )
}

export default FilterBar
