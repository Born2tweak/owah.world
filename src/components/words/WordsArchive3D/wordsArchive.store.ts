import { create } from 'zustand'
import type { ArchiveMode, FaceId } from './wordsArchive.types'
import { FACE_BY_ID, WORK_BY_ID, nextFace } from './wordsArchiveData'

type WordsArchiveStore = {
  mode: ArchiveMode
  activeFace: FaceId | null
  hoveredFace: FaceId | null
  focusedWorkId: string | null
  hoveredWorkId: string | null
  /** "Show strongest ideas" quote mode. */
  quoteMode: boolean
  /** Camera distance multiplier (scroll to zoom). */
  zoom: number
  adjustZoom: (delta: number) => void
  focusFace: (face: FaceId) => void
  setHoveredFace: (face: FaceId | null) => void
  focusWork: (workId: string) => void
  setHoveredWork: (workId: string | null) => void
  returnToOverview: () => void
  back: () => void
  cycleFace: (direction: 1 | -1) => void
  toggleQuoteMode: () => void
}

export const useWordsArchiveStore = create<WordsArchiveStore>((set) => ({
  mode: 'overview',
  activeFace: null,
  hoveredFace: null,
  focusedWorkId: null,
  hoveredWorkId: null,
  quoteMode: false,
  zoom: 1,
  adjustZoom: (delta) =>
    set((state) => ({ zoom: Math.min(1.6, Math.max(0.62, state.zoom + delta)) })),
  focusFace: (face) => set({ mode: 'face', activeFace: face, focusedWorkId: null }),
  setHoveredFace: (face) => set({ hoveredFace: face }),
  focusWork: (workId) => {
    const work = WORK_BY_ID[workId]
    if (!work) return
    set({ mode: 'work', activeFace: FACE_BY_ID[work.face].id, focusedWorkId: workId })
  },
  setHoveredWork: (workId) => set({ hoveredWorkId: workId }),
  returnToOverview: () => set({ mode: 'overview', activeFace: null, focusedWorkId: null, hoveredWorkId: null }),
  back: () =>
    set((state) => {
      if (state.mode === 'work') return { mode: 'face', focusedWorkId: null }
      if (state.mode === 'face') return { mode: 'overview', activeFace: null }
      return {}
    }),
  cycleFace: (direction) =>
    set((state) => {
      const current = state.activeFace ?? 'liberation'
      return { mode: 'face', activeFace: nextFace(current, direction), focusedWorkId: null }
    }),
  toggleQuoteMode: () => set((state) => ({ quoteMode: !state.quoteMode })),
}))
