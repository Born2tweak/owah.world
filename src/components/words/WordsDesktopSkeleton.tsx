'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import styles from './WordsDesktopSkeleton.module.css'

const ARCHIVE_RASTER_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp'] as const

/** Real archive photos only — no generated SVG stand-ins. */
function archiveImageCandidates(imagePath?: string): string[] {
  if (!imagePath) {
    return []
  }
  const base = imagePath.replace(/\.(jpe?g|png|webp)$/i, '')
  return ARCHIVE_RASTER_EXTENSIONS.map((ext) => `${base}${ext}`)
}

type PreviewKind = 'portrait' | 'manuscript' | 'studio'

interface ArchiveItem {
  id: string
  title: string
  excerpt: string
  fullText: string[]
  category: string
  meta: string
  previewKind: PreviewKind
  visualKey:
    | 'malcolm'
    | 'sankara'
    | 'jung'
    | 'ibnArabi'
    | 'lumumba'
    | 'gospel'
    | 'kwame'
    | 'myWorks'
  tone: 'sepia' | 'ink' | 'sage' | 'night'
  imagePath?: string
}

const archiveItems: ArchiveItem[] = [
  {
    id: 'malcolm-x',
    title: 'Malcolm X',
    excerpt: '"You cannot separate peace from freedom because no one can be at peace unless he has his freedom."',
    fullText: [
      'We are nonviolent with people who are nonviolent with us.',
      'But when violence is used against us, we are not going to turn the other cheek.',
      'Freedom is not given by the oppressor; it is taken by the conscious and organized.',
    ],
    category: 'Speeches',
    meta: 'CIVIL RIGHTS ARCHIVE · 1964',
    previewKind: 'portrait',
    visualKey: 'malcolm',
    tone: 'ink',
    imagePath: '/words/archive/malcolm-x.jpg',
  },
  {
    id: 'thomas-sankara',
    title: 'Thomas Sankara',
    excerpt: '"While revolutionaries can be murdered, you cannot kill ideas."',
    fullText: [
      'You cannot carry out fundamental change without a certain amount of madness.',
      'The enemies of a people are those who keep them in ignorance and dependence.',
      'Ideas survive bullets when they belong to the people.',
    ],
    category: 'Writings',
    meta: 'ANTI-IMPERIAL ARCHIVE · BURKINA FASO',
    previewKind: 'portrait',
    visualKey: 'sankara',
    tone: 'sepia',
    imagePath: '/words/archive/thomas-sankara.jpg',
  },
  {
    id: 'carl-jung',
    title: 'Carl Jung',
    excerpt: '"I am not what happened to me. I am what I choose to become."',
    fullText: [
      'Your visions become clear only when you can look into your own heart.',
      'Who looks outside, dreams; who looks inside, awakes.',
      'The task is to integrate shadow, memory, and intention into one life.',
    ],
    category: 'Lectures',
    meta: 'PSYCHOLOGY NOTES · ZURICH',
    previewKind: 'portrait',
    visualKey: 'jung',
    tone: 'sage',
    imagePath: '/words/archive/carl-jung.jpg',
  },
  {
    id: 'ibn-arabi',
    title: 'Ibn Arabi',
    excerpt: '"My heart has become capable of every form."',
    fullText: [
      'My heart has become capable of every form: it is a pasture for gazelles and a monastery for Christian monks.',
      'It is a temple for idols and the pilgrim’s Kaaba, and the tables of the Torah and the book of the Quran.',
      'I follow the religion of Love: whichever way Love’s camels take, that is my religion and my faith.',
    ],
    category: 'Sacred Text',
    meta: 'FUTUHAT · MYSTICAL NOTEBOOK',
    previewKind: 'manuscript',
    visualKey: 'ibnArabi',
    tone: 'sepia',
    imagePath: '/words/archive/ibn-arabi.jpg',
  },
  {
    id: 'patrice-lumumba',
    title: 'Patrice Lumumba',
    excerpt: '"The day will come when history will write its own truth."',
    fullText: [
      'The day will come when history will speak.',
      'But it will not be the history taught in Brussels, Paris, Washington, or the United Nations.',
      'Africa will write its own history, and it will be, to the north and south of the Sahara, a history of glory and dignity.',
    ],
    category: 'Letters',
    meta: 'LIBERATION ARCHIVE · CONGO',
    previewKind: 'portrait',
    visualKey: 'lumumba',
    tone: 'ink',
    imagePath: '/words/archive/patrice-lumumba.jpg',
  },
  {
    id: 'gospel-of-thomas',
    title: 'Gospel of Thomas',
    excerpt: '"Whoever finds the interpretation of these sayings will not taste death."',
    fullText: [
      'Whoever finds the interpretation of these sayings will not taste death.',
      'The kingdom is inside of you and outside of you.',
      'When you know yourselves, then you will be known.',
    ],
    category: 'Sacred Text',
    meta: 'NAG HAMMADI FRAGMENTS',
    previewKind: 'manuscript',
    visualKey: 'gospel',
    tone: 'sepia',
    imagePath: '/words/archive/gospel-of-thomas.jpg',
  },
  {
    id: 'kwame-ture',
    title: 'Kwame Ture',
    excerpt: '"Black Power means black people coming together to form a political force."',
    fullText: [
      'Black Power is a call for Black people in this country to unite and recognize their heritage.',
      'It means building institutions that answer to our communities.',
      'Consciousness becomes power when it is organized.',
    ],
    category: 'Speeches',
    meta: 'CONSCIOUSNESS ARCHIVE · PAN-AFRICAN',
    previewKind: 'portrait',
    visualKey: 'kwame',
    tone: 'ink',
    imagePath: '/words/archive/kwame-ture.jpg',
  },
  {
    id: 'my-works',
    title: 'My Works',
    excerpt: 'Essays. Reflections. Systems. Poetry. Notes from the inner architecture.',
    fullText: [
      'A private archive of essays, journals, and system notes.',
      'Reflections on identity, engineering, memory, and meaning.',
      'Work-in-progress manuscripts that connect code to spirit.',
    ],
    category: 'Personal Archive',
    meta: 'OWAH JOURNALS · IN PROGRESS',
    previewKind: 'studio',
    visualKey: 'myWorks',
    tone: 'night',
  },
]

const desktopIcons = [
  { label: 'Library', glyph: 'book' },
  { label: 'My Works', glyph: 'folder' },
  { label: 'Worlds', glyph: 'globe' },
  { label: 'Notes', glyph: 'note' },
]

export default function WordsDesktopSkeleton() {
  const [selectedId, setSelectedId] = useState(archiveItems[0].id)
  const [isReaderOpen, setIsReaderOpen] = useState(false)
  /** Loaded path for the active selection only — never shown in archive cards. */
  const [resolvedImage, setResolvedImage] = useState<{ entryId: string; src: string } | null>(null)

  const selectedIndex = useMemo(
    () => archiveItems.findIndex((item) => item.id === selectedId),
    [selectedId]
  )
  const selected = selectedIndex >= 0 ? archiveItems[selectedIndex] : archiveItems[0]
  const viewerImageSrc =
    resolvedImage?.entryId === selected.id ? resolvedImage.src : null

  const moveSelection = useCallback((direction: -1 | 1) => {
    setSelectedId((currentId) => {
      const index = archiveItems.findIndex((item) => item.id === currentId)
      const base = index >= 0 ? index : 0
      const nextIndex = (base + direction + archiveItems.length) % archiveItems.length
      return archiveItems[nextIndex].id
    })
  }, [])

  useEffect(() => {
    const candidates = archiveImageCandidates(selected.imagePath)
    if (candidates.length === 0) {
      return
    }

    let cancelled = false
    const entryId = selected.id

    const tryCandidate = (index: number) => {
      if (cancelled) {
        return
      }

      if (index >= candidates.length) {
        setResolvedImage((prev) => (prev?.entryId === entryId ? null : prev))
        return
      }

      const path = candidates[index]
      const image = new Image()
      image.onload = () => {
        if (!cancelled) {
          setResolvedImage({ entryId, src: path })
        }
      }
      image.onerror = () => {
        tryCandidate(index + 1)
      }
      image.src = path
    }

    tryCandidate(0)

    return () => {
      cancelled = true
    }
  }, [selected.id, selected.imagePath])

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (isReaderOpen) {
        if (event.key === 'Escape') {
          setIsReaderOpen(false)
        }
        return
      }

      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
        event.preventDefault()
        moveSelection(1)
      } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
        event.preventDefault()
        moveSelection(-1)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [isReaderOpen, moveSelection])

  function renderViewerVisual(className: string, label: string) {
    const showPhoto = Boolean(
      viewerImageSrc && archiveImageCandidates(selected.imagePath).includes(viewerImageSrc)
    )

    return (
      <div
        className={[
          styles.previewPanel,
          className,
          styles[`preview_${selected.previewKind}`],
          styles[`visual_${selected.visualKey}`],
          styles[`tone_${selected.tone}`],
          showPhoto ? styles.previewHasPhoto : '',
        ]
          .filter(Boolean)
          .join(' ')}
        role="img"
        aria-label={label}
      >
        {showPhoto ? (
          <img
            src={viewerImageSrc!}
            alt=""
            aria-hidden="true"
            className={styles.previewImage}
            decoding="async"
            onError={() =>
              setResolvedImage((prev) => (prev?.entryId === selected.id ? null : prev))
            }
          />
        ) : null}
        <span className={styles.previewOverlay} aria-hidden="true" />
      </div>
    )
  }

  return (
    <section className={styles.wordsWorld} aria-label="Words world desktop archive skeleton">
      <div className={styles.atmosphereGlow} />
      <div className={styles.desktopShell}>
        <header className={styles.titleBar}>
          <div className={styles.titleLeft}>OWAH.WORLD</div>
          <h1 className={styles.titleCenter}>WORDS — LIBRARY OF MIND &amp; MEANING</h1>
          <div className={styles.titleButtons} aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
        </header>

        <aside className={styles.iconRail} aria-label="Desktop icons">
          {desktopIcons.map((icon) => (
            <button key={icon.label} type="button" className={styles.desktopIcon}>
              <span className={`${styles.iconGlyph} ${styles[`glyph_${icon.glyph}`]}`} />
              <span>{icon.label}</span>
            </button>
          ))}
        </aside>

        <main className={styles.workspace}>
          <section className={styles.heroPanel}>
            <p className={styles.heroEyebrow}>The Written Layer</p>
            <p className={styles.heroBody}>
              Essays. Reflections. Sacred texts. A contemplative archive layered over history.
            </p>
          </section>

          <section className={styles.archiveGrid} aria-label="Archive windows">
            {archiveItems.map((item) => (
              <article
                key={item.id}
                className={`${styles.archiveWindow}${selected.id === item.id ? ` ${styles.isActive}` : ''}`}
                onClick={() => setSelectedId(item.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault()
                    setSelectedId(item.id)
                  }
                }}
              >
                <header className={styles.windowBar}>
                  <span>{item.category.toUpperCase()}</span>
                  <span className={styles.windowBtns} aria-hidden="true">
                    <i />
                    <i />
                  </span>
                </header>
                <div className={`${styles.windowBody} ${styles.cardBody}`}>
                  <p className={styles.cardTitle}>{item.title}</p>
                  <p className={styles.excerpt} title={item.excerpt}>
                    {item.excerpt}
                  </p>
                  <p className={styles.category}>{item.category}</p>
                  <p className={styles.meta}>{item.meta}</p>
                </div>
              </article>
            ))}
          </section>

          <aside className={styles.sideWindow}>
            <header className={styles.windowBar}>
              <span>EXCERPT VIEWER</span>
              <span className={styles.windowBtns} aria-hidden="true">
                <i />
                <i />
              </span>
            </header>
            <div className={`${styles.windowBody} ${styles.readerBody}`}>
              {renderViewerVisual(styles.readerPreview, `${selected.title} visual archive panel`)}
              <p className={styles.readerHeading}>{selected.title} — {selected.category}</p>
              <p className={styles.readerExcerpt}>{selected.excerpt}</p>
              <p className={styles.readerMeta}>{selected.meta}</p>
              <div className={styles.readerActions}>
                <button type="button" onClick={() => moveSelection(-1)}>{'< Prev'}</button>
                <button type="button" onClick={() => setIsReaderOpen(true)}>Open Full Text</button>
                <button type="button" onClick={() => moveSelection(1)}>{'Next >'}</button>
              </div>
            </div>
          </aside>
        </main>
      </div>

      {isReaderOpen ? (
        <div className={styles.readerOverlay} onClick={() => setIsReaderOpen(false)} role="presentation">
          <article className={styles.readerModal} onClick={(event) => event.stopPropagation()}>
            <header className={styles.readerModalHeader}>
              <p>{selected.title.toUpperCase()} — FULL TEXT</p>
              <button type="button" onClick={() => setIsReaderOpen(false)}>Close</button>
            </header>
            <div className={styles.readerModalBody}>
              {renderViewerVisual(styles.modalPreview, `${selected.title} full text visual`)}
              {selected.fullText.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </article>
        </div>
      ) : null}
    </section>
  )
}
