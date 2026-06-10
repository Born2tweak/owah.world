import { create } from 'zustand'
import type { WorldCategory } from '../world.types'
import { nextZone, type RoomZone } from './roomZones'

type WorldRoomStore = {
  activeZone: RoomZone
  hoveredZone: WorldCategory | null
  focusZone: (zone: WorldCategory) => void
  returnToOverview: () => void
  setHoveredZone: (zone: WorldCategory | null) => void
  cycleZone: (direction: 1 | -1) => void
}

export const useWorldRoomStore = create<WorldRoomStore>((set) => ({
  activeZone: 'overview',
  hoveredZone: null,
  focusZone: (zone) => set({ activeZone: zone }),
  returnToOverview: () => set({ activeZone: 'overview' }),
  setHoveredZone: (zone) => set({ hoveredZone: zone }),
  cycleZone: (direction) =>
    set((state) => ({ activeZone: nextZone(state.activeZone, direction) })),
}))
