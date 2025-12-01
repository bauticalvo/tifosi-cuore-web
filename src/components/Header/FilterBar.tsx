import { useRef, useState, useEffect, useCallback } from 'react'
import { ShopMenu } from './Filter/ShopMenu'
import {
  ColectionMenuElements,
  MoreMenuElements,
  ProductsMenuElements,
} from './Filter/ShopMenuData'
import { FaCartShopping } from "react-icons/fa6";

export const FilterBar = () => {
  const [isHovered, setIsHovered] = useState(0)
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
          // <Link href={url || '#'}>
            <p className="group relative">{text}</p>
          // </Link>
        )}
        {/* <span className="absolute bottom-0 left-0 w-0 h-[3px] bg-tertiary transition-all duration-300 ease-out group-hover:w-full"></span> */}
      </button>
    )
  }

  return (
    <div className="w-full h-full border-b border-light/20 flex items-center justify-between space-x-6 px-8 relative">
      <section className="hidden md:flex w-full">
        <CustomButton text="Tienda" index={1} url="/products" />
        <CustomButton text="Colecciones" index={2} url="/colections" />
        {/* <CustomButton text="Más" index={3} url="none" /> */}
      </section>
      <section className="flex md:hidden">
        <CustomButton text="MENU" index={6} />
      </section>
      <section>
        <CustomButton text="Cart" index={4} />
      </section>

      {/* Menú desplegable */}
      {(isHovered === 1 || isHovered === 2 || isHovered === 3) && (
        <div
          ref={menuRef}
          className="absolute top-full left-0 w-full hidden md:flex backdrop-blur-sm shadow-xl z-50 border-t border-light/10"
          onMouseEnter={handleMouseEnterMenu}
          onMouseLeave={handleMouseLeaveMenu}
        >
          {isHovered === 1 && (
            <div className="w-full">
              <ShopMenu
                columns={ProductsMenuElements.columns}
                imageColumns={ProductsMenuElements.imageColumns}
              />
            </div>
          )}
          {isHovered === 2 && (
            <div className="w-full">
              <ShopMenu
                columns={ColectionMenuElements.columns}
                imageColumns={ColectionMenuElements.imageColumns}
              />
            </div>
          )}
          {isHovered === 3 && (
            <div className="w-full">
              <ShopMenu
                columns={MoreMenuElements.columns}
                imageColumns={MoreMenuElements.imageColumns || []}
              />
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default FilterBar
