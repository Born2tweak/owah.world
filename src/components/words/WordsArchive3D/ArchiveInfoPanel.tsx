'use client'

import { AnimatePresence, motion } from 'framer-motion'
import type { FaceId } from './wordsArchive.types'
import { FACE_BY_ID, WORK_BY_ID } from './wordsArchiveData'
import styles from './WordsArchive3D.module.css'

type ArchiveInfoPanelProps = {
  focusedWorkId: string | null
  quoteMode: boolean
  onBack: () => void
  onSelectRelated: (id: string) => void
}

export default function ArchiveInfoPanel({ focusedWorkId, quoteMode, onBack, onSelectRelated }: ArchiveInfoPanelProps) {
  const work = focusedWorkId ? WORK_BY_ID[focusedWorkId] ?? null : null
  const face = work ? FACE_BY_ID[work.face] : null
  const accent = face?.accent ?? '#cdb88a'

  return (
    <AnimatePresence>
      {work && face ? (
        <motion.aside
          key={work.id}
          className={styles.readingPanel}
          style={{ ['--accent' as string]: accent }}
          initial={{ opacity: 0, x: 36 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 24 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          aria-label={`${work.title} reading panel`}
        >
          <button type="button" className={styles.readingBack} onClick={onBack}>
            ← Back to {face.label}
          </button>

          <div className={styles.readingHead}>
            <div className={styles.readingCover} style={{ backgroundImage: `url(${work.image})` }} aria-hidden />
            <div>
              <p className={styles.readingAuthor}>{work.author}</p>
              <h2 className={styles.readingTitle}>{work.title}</h2>
              <p className={styles.readingYear} style={{ color: accent }}>{work.year}</p>
            </div>
          </div>

          {work.passages[0] ? (
            <blockquote className={styles.readingQuote}>“{work.passages[0].text}”</blockquote>
          ) : null}

          <ul className={styles.themeRow}>
            {work.themes.map((t) => (
              <li key={t} className={styles.themePill}>{t}</li>
            ))}
          </ul>

          <div className={styles.readingGrid}>
            <section>
              <h3 className={styles.readingLabel}>About this work</h3>
              <p className={styles.readingBody}>{work.overview}</p>
            </section>
            <section>
              <h3 className={styles.readingLabel}>Key ideas</h3>
              <ul className={styles.ideaList}>
                {work.keyIdeas.map((idea) => (
                  <li key={idea}>{idea}</li>
                ))}
              </ul>
            </section>
          </div>

          {(quoteMode || work.passages.length > 1) && work.passages.length > 0 ? (
            <section>
              <h3 className={styles.readingLabel}>Strongest passages</h3>
              <div className={styles.passageList}>
                {work.passages.map((p) => (
                  <div key={p.text} className={styles.passageCard}>
                    <span className={styles.passageQuoteMark} style={{ color: accent }}>“</span>
                    <p className={styles.passageText}>{p.text}</p>
                    <p className={styles.passageRef}>{p.ref}</p>
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          {work.related.length ? (
            <section>
              <h3 className={styles.readingLabel}>Connected works</h3>
              <div className={styles.relatedRow}>
                {work.related.map((id) => {
                  const rel = WORK_BY_ID[id]
                  if (!rel) return null
                  return (
                    <button key={id} type="button" className={styles.relatedChip} onClick={() => onSelectRelated(id)} style={{ ['--accent' as string]: FACE_BY_ID[rel.face].accent }}>
                      {rel.author.split(' ').slice(-1)[0]} · {rel.title.length > 22 ? `${rel.title.slice(0, 21)}…` : rel.title}
                    </button>
                  )
                })}
              </div>
            </section>
          ) : null}

          {work.file ? (
            <a className={styles.continueButton} href={work.file} target="_blank" rel="noreferrer" style={{ background: accent }}>
              Continue reading ↗
            </a>
          ) : (
            <span className={styles.continueDisabled}>Full text coming soon</span>
          )}
        </motion.aside>
      ) : null}
    </AnimatePresence>
  )
}
