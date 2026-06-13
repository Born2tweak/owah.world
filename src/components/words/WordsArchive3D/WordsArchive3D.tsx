'use client'

import Link from 'next/link'
import { useCallback, useEffect } from 'react'
import ArchiveInfoPanel from './ArchiveInfoPanel'
import WordsArchiveCanvas from './WordsArchiveCanvas'
import { useWordsArchiveStore } from './wordsArchive.store'
import { WINGS } from './wordsArchiveData'
import type { ArchiveView } from './wordsArchive.types'
import styles from './WordsArchive3D.module.css'

export default function WordsArchive3D() {
  const activeView = useWordsArchiveStore((s) => s.activeView)
  const hoveredBookId = useWordsArchiveStore((s) => s.hoveredBookId)
  const focusedBookId = useWordsArchiveStore((s) => s.focusedBookId)
  const focusWing = useWordsArchiveStore((s) => s.focusWing)
  const focusBook = useWordsArchiveStore((s) => s.focusBook)
  const setHoveredBook = useWordsArchiveStore((s) => s.setHoveredBook)
  const returnToOverview = useWordsArchiveStore((s) => s.returnToOverview)
  const back = useWordsArchiveStore((s) => s.back)
  const cycleView = useWordsArchiveStore((s) => s.cycleView)

  const handleWheel = useCallback(
    (event: WheelEvent) => {
      event.preventDefault()
      cycleView(event.deltaY > 0 ? 1 : -1)
    },
    [cycleView],
  )

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        back()
        return
      }
      if (event.key === 'ArrowDown' || event.key === 'ArrowRight' || event.key === 'd' || event.key === 'PageDown') {
        event.preventDefault()
        cycleView(1)
      }
      if (event.key === 'ArrowUp' || event.key === 'ArrowLeft' || event.key === 'a' || event.key === 'PageUp') {
        event.preventDefault()
        cycleView(-1)
      }
    },
    [back, cycleView],
  )

  useEffect(() => {
    window.addEventListener('wheel', handleWheel, { passive: false })
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleWheel, handleKeyDown])

  const isFocused = activeView !== 'overview' || Boolean(focusedBookId)

  return (
    <div className={styles.archive}>
      <div className={`${styles.canvasWrap}${focusedBookId ? ` ${styles.isReading}` : ''}`}>
        <WordsArchiveCanvas
          activeView={activeView}
          hoveredBookId={hoveredBookId}
          focusedBookId={focusedBookId}
          onHover={setHoveredBook}
          onFocus={focusBook}
        />
      </div>

      <div className={styles.hud}>
        <header className={styles.hudTop}>
          <Link href="/" className={styles.brand} aria-label="OWAH.WORLD — back to landing">
            <span className={styles.brandMain}>OWAH.WORLD</span>
            <span>/</span>
            <span>WORDS ARCHIVE</span>
          </Link>
          <div className={styles.status}>
            <span className={styles.statusPulse} />
            <span>ARCHIVE OF INFLUENCE</span>
          </div>
        </header>

        <nav className={styles.wingRail} aria-label="Archive wings">
          <button
            type="button"
            className={`${styles.railItem}${activeView === 'overview' ? ` ${styles.railActive}` : ''}`}
            onClick={returnToOverview}
          >
            All Works
          </button>
          {WINGS.map((wing) => (
            <button
              key={wing.id}
              type="button"
              className={`${styles.railItem}${activeView === wing.id ? ` ${styles.railActive}` : ''}`}
              style={{ ['--wing-accent' as string]: wing.accent }}
              onClick={() => focusWing(wing.id)}
            >
              {wing.label}
            </button>
          ))}
        </nav>

        <footer className={styles.hudBottom}>
          {!isFocused ? (
            <span className={styles.hint}>Scroll or arrow keys to move through the archive · Click a book to read</span>
          ) : null}
        </footer>
      </div>

      <ArchiveInfoPanel activeView={activeView as ArchiveView} focusedBookId={focusedBookId} onBack={back} />
    </div>
  )
}
