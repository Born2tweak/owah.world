import { create } from 'zustand'

interface CDStore {
  isSpinning: boolean
  isDragging: boolean
  rotation: { x: number; y: number }
  setIsDragging: (isDragging: boolean) => void
  setRotation: (rotation: { x: number; y: number }) => void
}

export const useCDStore = create<CDStore>((set) => ({
  isSpinning: true,
  isDragging: false,
  rotation: { x: -0.15, y: 0.4 },
  setIsDragging: (isDragging) => set({ isDragging }),
  setRotation: (rotation) => set({ rotation }),
}))
