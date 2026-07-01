'use client'

import Link from 'next/link'
import { useCallback, useEffect, useState } from 'react'
import ArchiveInfoPanel from './ArchiveInfoPanel'
import WordsArchiveCanvas from './WordsArchiveCanvas'
import { useWordsArchiveStore } from './wordsArchive.store'
import { FACES, FACE_BY_ID, WORK_BY_ID } from './wordsArchiveData'
import styles from './WordsArchive3D.module.css'

export default function WordsArchive3D() {
  const [filmOpen, setFilmOpen] = useState(false)
  const mode = useWordsArchiveStore((s) => s.mode)
  const activeFace = useWordsArchiveStore((s) => s.activeFace)
  const hoveredWorkId = useWordsArchiveStore((s) => s.hoveredWorkId)
  const focusedWorkId = useWordsArchiveStore((s) => s.focusedWorkId)
  const zoom = useWordsArchiveStore((s) => s.zoom)
  const focusFace = useWordsArchiveStore((s) => s.focusFace)
  const focusWork = useWordsArchiveStore((s) => s.focusWork)
  const setHoveredWork = useWordsArchiveStore((s) => s.setHoveredWork)
  const returnToOverview = useWordsArchiveStore((s) => s.returnToOverview)
  const back = useWordsArchiveStore((s) => s.back)
  const cycleFace = useWordsArchiveStore((s) => s.cycleFace)
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
      if (event.key === 'ArrowRight' || event.key === 'd') {
        event.preventDefault()
        cycleFace(1)
      }
      if (event.key === 'ArrowLeft' || event.key === 'a') {
        event.preventDefault()
        cycleFace(-1)
      }
    },
    [back, cycleFace],
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

  return (
    <div className={styles.archive}>
      <div className={styles.skyBackdrop} aria-hidden />
      <div className={`${styles.canvasWrap}${focusedWorkId ? ` ${styles.isReading}` : ''}`}>
        <WordsArchiveCanvas
          mode={mode}
          zoom={zoom}
          activeFace={activeFace}
          hoveredWorkId={hoveredWorkId}
          focusedWorkId={focusedWorkId}
          onWorkHover={setHoveredWork}
          onWorkFocus={focusWork}
          onFaceClick={focusFace}
        />
      </div>

      <div className={styles.hud}>
        <header className={styles.hudTop}>
          <Link href="/" className={styles.brand} aria-label="OWAH.WORLD — back to landing">
            <span className={styles.brandMain}>OWAH.WORLD</span>
            <span className={styles.brandSub}>Words Archive</span>
          </Link>
        </header>

        <aside className={styles.introPanel}>
          <h1 className={styles.introTitle}>The Archive<br />of Influence</h1>
          <p className={styles.introBody}>Fifty-four works that shaped the mind and the world. Six fields of knowledge. One living archive.</p>

          <nav className={styles.faceNav} aria-label="Subject faces">
            {FACES.map((face) => (
              <button
                key={face.id}
                type="button"
                className={`${styles.faceButton}${activeFace === face.id ? ` ${styles.faceActive}` : ''}`}
                style={{ ['--accent' as string]: face.accent }}
                onClick={() => focusFace(face.id)}
              >
                <span className={styles.faceDot} style={{ background: face.accent }} />
                {face.label}
              </button>
            ))}
          </nav>

          <div className={styles.stats}>
            <span><strong>6</strong> fields</span>
            <span><strong>54</strong> works</span>
            <span><strong>∞</strong> influence</span>
          </div>

          {mode !== 'overview' ? (
            <button type="button" className={styles.overviewButton} onClick={returnToOverview}>↺ Back to overview</button>
          ) : null}

          <p className={styles.controlsHint} aria-hidden>
            Drag to Rotate · Scroll to Zoom · Click to Explore
          </p>

          <button type="button" className={styles.filmButton} onClick={() => setFilmOpen(true)}>
            Watch the archive film
          </button>
        </aside>

        {hoverWork ? (
          <div className={styles.hoverPreview} style={{ ['--accent' as string]: FACE_BY_ID[hoverWork.face].accent }}>
            <p className={styles.previewCategory}>{FACE_BY_ID[hoverWork.face].label}</p>
            <p className={styles.previewTitle}>{hoverWork.title}</p>
            <p className={styles.previewAuthor}>{hoverWork.author}</p>
          </div>
        ) : null}
      </div>

      <ArchiveInfoPanel focusedWorkId={focusedWorkId} onBack={back} onSelectRelated={focusWork} />

      {filmOpen ? (
        <div className={styles.filmModal} role="dialog" aria-modal="true" aria-label="Words archive hero film">
          <button type="button" className={styles.filmBackdrop} aria-label="Close film" onClick={() => setFilmOpen(false)} />
          <div className={styles.filmCard}>
            <div className={styles.filmHeader}>
              <span>Archive of Influence / Hero Film</span>
              <button type="button" className={styles.filmClose} onClick={() => setFilmOpen(false)}>
                Close
              </button>
            </div>
            <video className={styles.filmPlayer} poster="/hero/words-hero-poster.jpg" controls autoPlay muted loop playsInline>
              <source src="/hero/words-hero-16x9.webm" type="video/webm" />
              <source src="/hero/words-hero-16x9.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      ) : null}
    </div>
  )
}
