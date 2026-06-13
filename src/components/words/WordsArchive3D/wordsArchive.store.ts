import { create } from 'zustand'
import type { ArchiveView, WingId } from './wordsArchive.types'
import { BOOK_BY_ID, nextView } from './wordsArchiveData'

type WordsArchiveStore = {
  activeView: ArchiveView
  hoveredBookId: string | null
  focusedBookId: string | null
  focusWing: (wing: WingId) => void
  focusBook: (bookId: string) => void
  setHoveredBook: (bookId: string | null) => void
  returnToOverview: () => void
  back: () => void
  cycleView: (direction: 1 | -1) => void
}

export const useWordsArchiveStore = create<WordsArchiveStore>((set) => ({
  activeView: 'overview',
  hoveredBookId: null,
  focusedBookId: null,
  focusWing: (wing) => set({ activeView: wing, focusedBookId: null }),
  focusBook: (bookId) => {
    const book = BOOK_BY_ID[bookId]
    if (!book) return
    set({ activeView: book.wing, focusedBookId: bookId })
  },
  setHoveredBook: (bookId) => set({ hoveredBookId: bookId }),
  returnToOverview: () => set({ activeView: 'overview', focusedBookId: null }),
  back: () =>
    set((state) =>
      state.focusedBookId ? { focusedBookId: null } : { activeView: 'overview' },
    ),
  cycleView: (direction) =>
    set((state) => ({ activeView: nextView(state.activeView, direction), focusedBookId: null })),
}))
