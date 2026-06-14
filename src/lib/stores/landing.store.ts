import { create } from 'zustand'

export type WorldId = 'code' | 'words' | 'world'

interface LandingStore {
  /** Which world card is currently hovered, driving the scene's accent influence. */
  hoveredWorld: WorldId | null
  setHoveredWorld: (world: WorldId | null) => void
}

export const useLandingStore = create<LandingStore>((set) => ({
  hoveredWorld: null,
  setHoveredWorld: (hoveredWorld) => set({ hoveredWorld }),
}))

/** Per-world accent (kept subtle; used only by the additive influence light). */
export const WORLD_ACCENT: Record<WorldId, string> = {
  code: '#28fff0',
  words: '#9a7bff',
  world: '#e8a24a',
}
