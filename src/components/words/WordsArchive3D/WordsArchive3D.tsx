'use client'

import Link from 'next/link'
import { useCallback, useEffect } from 'react'
import ArchiveInfoPanel from './ArchiveInfoPanel'
import WordsArchiveCanvas from './WordsArchiveCanvas'
import { useWordsArchiveStore } from './wordsArchive.store'
import { FACES, WORK_BY_ID } from './wordsArchiveData'
import styles from './WordsArchive3D.module.css'

export default function WordsArchive3D() {
  const mode = useWordsArchiveStore((s) => s.mode)
  const activeFace = useWordsArchiveStore((s) => s.activeFace)
  const hoveredFace = useWordsArchiveStore((s) => s.hoveredFace)
  const hoveredWorkId = useWordsArchiveStore((s) => s.hoveredWorkId)
  const focusedWorkId = useWordsArchiveStore((s) => s.focusedWorkId)
  const quoteMode = useWordsArchiveStore((s) => s.quoteMode)
  const zoom = useWordsArchiveStore((s) => s.zoom)
  const focusFace = useWordsArchiveStore((s) => s.focusFace)
  const setHoveredFace = useWordsArchiveStore((s) => s.setHoveredFace)
  const focusWork = useWordsArchiveStore((s) => s.focusWork)
  const setHoveredWork = useWordsArchiveStore((s) => s.setHoveredWork)
  const returnToOverview = useWordsArchiveStore((s) => s.returnToOverview)
  const back = useWordsArchiveStore((s) => s.back)
  const cycleFace = useWordsArchiveStore((s) => s.cycleFace)
  const toggleQuoteMode = useWordsArchiveStore((s) => s.toggleQuoteMode)
  const adjustZoom = useWordsArchiveStore((s) => s.adjustZoom)

  const handleWheel = useCallback(
    (event: WheelEvent) => {
      event.preventDefault()
      adjustZoom(event.deltaY > 0 ? 0.08 : -0.08)
    },
    [adjustZoom],
  )

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') return back()
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown' || event.key === 'd') {
        event.preventDefault()
        cycleFace(1)
      }
      if (event.key === 'ArrowLeft' || event.key === 'ArrowUp' || event.key === 'a') {
        event.preventDefault()
        cycleFace(-1)
      }
      if (event.key === 'q' || event.key === 'Q') toggleQuoteMode()
    },
    [back, cycleFace, toggleQuoteMode],
  )

  useEffect(() => {
    window.addEventListener('wheel', handleWheel, { passive: false })
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleWheel, handleKeyDown])

  const hoverWork = hoveredWorkId && !focusedWorkId ? WORK_BY_ID[hoveredWorkId] : null
  const activeThesis =
    hoveredFace ? FACES.find((f) => f.id === hoveredFace)?.thesis : null

  return (
    <div className={styles.archive}>
      <div className={styles.skyBackdrop} aria-hidden />
      <div className={`${styles.canvasWrap}${focusedWorkId ? ` ${styles.isReading}` : ''}`}>
        <WordsArchiveCanvas
          mode={mode}
          zoom={zoom}
          activeFace={activeFace}
          hoveredFace={hoveredFace}
          hoveredWorkId={hoveredWorkId}
          focusedWorkId={focusedWorkId}
          onFaceHover={setHoveredFace}
          onFaceClick={focusFace}
          onWorkHover={setHoveredWork}
          onWorkFocus={focusWork}
        />
      </div>

      <div className={styles.hud}>
        <header className={styles.hudTop}>
          <Link href="/" className={styles.brand} aria-label="OWAH.WORLD — back to landing">
            <span className={styles.brandMain}>OWAH.WORLD</span>
            <span className={styles.brandSub}>WORDS ARCHIVE</span>
          </Link>
        </header>

        <aside className={styles.introPanel}>
          <h1 className={styles.introTitle}>The Archive<br />of Influence</h1>
          <p className={styles.introBody}>Twenty works that shaped the mind and the world. Four fields of knowledge. One living archive.</p>

          <nav className={styles.faceNav} aria-label="Subject faces">
            {FACES.map((face) => (
              <button
                key={face.id}
                type="button"
                className={`${styles.faceButton}${activeFace === face.id ? ` ${styles.faceActive}` : ''}`}
                style={{ ['--accent' as string]: face.accent }}
                onMouseEnter={() => setHoveredFace(face.id)}
                onMouseLeave={() => setHoveredFace(null)}
                onClick={() => focusFace(face.id)}
              >
                {face.label}
              </button>
            ))}
          </nav>

          <div className={styles.stats}>
            <span><strong>4</strong> fields</span>
            <span><strong>20</strong> works</span>
            <span><strong>∞</strong> influence</span>
          </div>

          <div className={styles.controls}>
            <button type="button" className={`${styles.quoteToggle}${quoteMode ? ` ${styles.quoteOn}` : ''}`} onClick={toggleQuoteMode}>
              {quoteMode ? '◆ Strongest ideas: on' : '◇ Show strongest ideas'}
            </button>
            {mode !== 'overview' ? (
              <button type="button" className={styles.overviewButton} onClick={returnToOverview}>↺ Overview</button>
            ) : null}
          </div>

          <p className={styles.dragHint}>Drag to rotate · Scroll to zoom · Click a face, then a work</p>
        </aside>

        {activeThesis && mode === 'overview' ? (
          <div className={styles.faceThesis}>{activeThesis}</div>
        ) : null}

        {hoverWork ? (
          <div className={styles.hoverPreview} style={{ ['--accent' as string]: FACES.find((f) => f.id === hoverWork.face)?.accent }}>
            <p className={styles.previewAuthor}>{hoverWork.author}</p>
            <p className={styles.previewTitle}>{hoverWork.title}</p>
            <p className={styles.previewThesis}>{hoverWork.thesis}</p>
          </div>
        ) : null}
      </div>

      <ArchiveInfoPanel focusedWorkId={focusedWorkId} quoteMode={quoteMode} onBack={back} onSelectRelated={focusWork} />
    </div>
  )
}
