'use client'

import { AnimatePresence, motion } from 'framer-motion'
import type { ArchiveView } from './wordsArchive.types'
import { BOOK_BY_ID, WING_BY_ID } from './wordsArchiveData'
import styles from './WordsArchive3D.module.css'

type ArchiveInfoPanelProps = {
  activeView: ArchiveView
  focusedBookId: string | null
  onBack: () => void
}

export default function ArchiveInfoPanel({ activeView, focusedBookId, onBack }: ArchiveInfoPanelProps) {
  const book = focusedBookId ? BOOK_BY_ID[focusedBookId] ?? null : null
  const wing = activeView !== 'overview' ? WING_BY_ID[activeView] : null
  const accent = wing?.accent ?? '#caa45a'

  return (
    <AnimatePresence mode="wait">
      {book ? (
        <motion.aside
          key={book.id}
          className={styles.readingPanel}
          style={{ ['--wing-accent' as string]: accent }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          aria-label={`${book.title} detail`}
        >
          <button type="button" className={styles.panelBack} onClick={onBack}>
            ← Back to {wing?.label ?? 'archive'}
          </button>
          <p className={styles.panelEyebrow}>{book.type.toUpperCase()}{book.year ? ` · ${book.year}` : ''}</p>
          <h2 className={styles.panelTitle}>{book.title}</h2>
          <p className={styles.panelAuthor}>{book.author}</p>
          <p className={styles.panelDescription}>{book.description}</p>
          <ul className={styles.themeList}>
            {book.themes.map((theme) => (
              <li key={theme} className={styles.themeChip}>{theme}</li>
            ))}
          </ul>
          {book.file ? (
            <a className={styles.openButton} href={book.file} target="_blank" rel="noreferrer">
              Open work ↗
            </a>
          ) : (
            <span className={styles.openButtonDisabled}>In progress — coming to life</span>
          )}
        </motion.aside>
      ) : wing ? (
        <motion.aside
          key={wing.id}
          className={styles.wingPanel}
          style={{ ['--wing-accent' as string]: accent }}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          aria-label={`${wing.label} wing`}
        >
          <button type="button" className={styles.panelBack} onClick={onBack}>
            ← Overview
          </button>
          <p className={styles.panelEyebrow}>Wing</p>
          <h2 className={styles.panelTitle}>{wing.label}</h2>
          <p className={styles.panelAuthor}>{wing.eyebrow}</p>
          <p className={styles.panelDescription}>{wing.subtitle}</p>
          <p className={styles.panelHint}>Click a book to pull it from the shelf.</p>
        </motion.aside>
      ) : null}
    </AnimatePresence>
  )
}
