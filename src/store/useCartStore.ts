import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product, ProductVariant } from "@/types/api/products";

interface CartItem {
  product: Product
  size: string
  quantity: number
}

interface CartStore {
  items: CartItem[]
  open: boolean
  setOpen: (open: boolean) => void
  getTotal: () => number
  getTotalQuantity: () => number
  addToCart: (item: CartItem) => void
  removeFromCart: (productId: string, size: string) => void
  clearCart: () => void
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      open: false,
      setOpen: (open: boolean) => set({ open }),
      addToCart: (item) => {
        const exists = get().items.find(
          i => i.product._id === item.product._id && i.size === item.size
        )

        if (exists) {
          set({
            items: get().items.map(i =>
              i.product._id === item.product._id && i.size === item.size
                ? { ...i, quantity: i.quantity + item.quantity }
                : i
            )
          })
        } else {
          set({ items: [...get().items, item] })
        }
      },

      removeFromCart: (productId, size) => {
        set({
          items: get().items.filter(
            i => !(i.product._id === productId && i.size === size)
          )
        })
      },

      

      clearCart: () => set({ items: [] }),
      getTotal: () =>
        get().items.reduce(
          (acc, item) =>
            acc +
            (item.product.discounted_price || item.product.price) *
              item.quantity,
          0
        ),

      getTotalQuantity: () =>
        get().items.reduce((acc, item) => acc + item.quantity, 0),
    }),

    
    { name: "tifosicuore-cart" }
  )
)
