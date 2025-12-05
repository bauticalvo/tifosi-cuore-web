import { create } from "zustand";


export const useGeneralStore = create((set) => ({
    isImageLoaded: false,
    setIsImageLoaded: (loaded: boolean) => set({ isImageLoaded: loaded }),
}))

