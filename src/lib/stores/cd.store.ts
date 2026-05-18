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
  rotation: { x: Math.PI / 2, y: 0 },
  setIsDragging: (isDragging) => set({ isDragging }),
  setRotation: (rotation) => set({ rotation }),
}))
