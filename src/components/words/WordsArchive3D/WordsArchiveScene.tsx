'use client'

import dynamic from 'next/dynamic'
import styles from './WordsArchiveScene.module.css'

const WordsArchive3D = dynamic(() => import('./WordsArchive3D'), {
  ssr: false,
  loading: () => (
    <div className={styles.loading} aria-busy="true" aria-label="Loading archive of influence">
      <span className={styles.loadingText}>OWAH.WORLD / WORDS</span>
    </div>
  ),
})

export default function WordsArchiveScene() {
  return (
    <section className={styles.archiveScene} data-words-scene aria-label="Archive of Influence">
      <WordsArchive3D />
    </section>
  )
}
