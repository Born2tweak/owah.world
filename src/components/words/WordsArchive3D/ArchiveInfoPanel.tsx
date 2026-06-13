'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { FACE_BY_ID, WORK_BY_ID } from './wordsArchiveData'
import styles from './WordsArchive3D.module.css'

type ArchiveInfoPanelProps = {
  focusedWorkId: string | null
  onBack: () => void
  onSelectRelated: (id: string) => void
}

function ConnectionGraph({ workId, onSelect }: { workId: string; onSelect: (id: string) => void }) {
  const work = WORK_BY_ID[workId]
  if (!work) return null
  const related = work.related.map((id) => WORK_BY_ID[id]).filter(Boolean).slice(0, 5)
  const cx = 130
  const cy = 70
  const r = 52
  const centreAccent = FACE_BY_ID[work.face].accent

  return (
    <svg className={styles.graphSvg} viewBox="0 0 260 140" role="img" aria-label="Connection graph">
      {related.map((rel, i) => {
        const angle = (i / Math.max(related.length, 1)) * Math.PI * 2 - Math.PI / 2
        const x = cx + Math.cos(angle) * r * (i % 2 === 0 ? 1.6 : 1.15)
        const y = cy + Math.sin(angle) * r
        const accent = FACE_BY_ID[rel.face].accent
        return (
          <g key={rel.id}>
            <line x1={cx} y1={cy} x2={x} y2={y} stroke={accent} strokeOpacity={0.4} strokeWidth={1} />
            <circle cx={x} cy={y} r={7} fill={accent} fillOpacity={0.85} className={styles.graphNode} onClick={() => onSelect(rel.id)}>
              <title>{rel.author}</title>
            </circle>
            <text x={x} y={y + 17} className={styles.graphLabel} textAnchor="middle">{rel.author.split(' ').slice(-1)[0]}</text>
          </g>
        )
      })}
      <circle cx={cx} cy={cy} r={11} fill={centreAccent} />
      <circle cx={cx} cy={cy} r={11} fill="none" stroke="#fff" strokeOpacity={0.6} strokeWidth={1.5} />
    </svg>
  )
}

export default function ArchiveInfoPanel({ focusedWorkId, onBack, onSelectRelated }: ArchiveInfoPanelProps) {
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
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 28 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          aria-label={`${work.title} reading panel`}
        >
          <button type="button" className={styles.readingBack} onClick={onBack}>← Back to {face.label}</button>

          <div className={styles.readingHead}>
            <div className={styles.readingCover} style={{ backgroundImage: `url(${work.image})` }} aria-hidden />
            <div className={styles.readingHeadText}>
              <p className={styles.readingCategory} style={{ color: accent }}>{face.label}</p>
              <h2 className={styles.readingTitle}>{work.title}</h2>
              <p className={styles.readingAuthor}>{work.author} · {work.year}</p>
              <div className={styles.influenceRow}>
                <span className={styles.influenceLabel}>Influence</span>
                <span className={styles.influenceBar}><span className={styles.influenceFill} style={{ width: `${work.influence}%`, background: accent }} /></span>
                <span className={styles.influenceValue}>{work.influence}</span>
              </div>
            </div>
          </div>

          {work.passages[0] ? <blockquote className={styles.readingQuote}>“{work.passages[0].text}”</blockquote> : null}

          <ul className={styles.themeRow}>
            {work.themes.map((t) => <li key={t} className={styles.themePill}>{t}</li>)}
          </ul>

          <section className={styles.readingSection}>
            <h3 className={styles.readingLabel}>Summary</h3>
            <p className={styles.readingBody}>{work.overview}</p>
          </section>

          <section className={styles.readingSection}>
            <h3 className={styles.readingLabel}>Why it matters</h3>
            <p className={styles.readingBody}>{work.whyItMatters}</p>
          </section>

          <section className={styles.readingSection}>
            <h3 className={styles.readingLabel}>Key ideas</h3>
            <ul className={styles.ideaList}>{work.keyIdeas.map((idea) => <li key={idea}>{idea}</li>)}</ul>
          </section>

          <section className={styles.readingSection}>
            <h3 className={styles.readingLabel}>Strongest passages</h3>
            <div className={styles.passageList}>
              {work.passages.map((p) => (
                <div key={p.text} className={styles.passageCard}>
                  <span className={styles.passageMark} style={{ color: accent }}>“</span>
                  <p className={styles.passageText}>{p.text}</p>
                  <p className={styles.passageRef}>{p.ref}</p>
                </div>
              ))}
            </div>
          </section>

          <section className={styles.readingSection}>
            <h3 className={styles.readingLabel}>Connection graph</h3>
            <ConnectionGraph workId={work.id} onSelect={onSelectRelated} />
            <div className={styles.relatedRow}>
              {work.related.map((id) => {
                const rel = WORK_BY_ID[id]
                if (!rel) return null
                return (
                  <button key={id} type="button" className={styles.relatedChip} style={{ ['--accent' as string]: FACE_BY_ID[rel.face].accent }} onClick={() => onSelectRelated(id)}>
                    {rel.author.split(' ').slice(-1)[0]}
                  </button>
                )
              })}
            </div>
          </section>

          {work.file ? (
            <a className={styles.continueButton} href={work.file} target="_blank" rel="noreferrer" style={{ background: accent }}>Continue reading ↗</a>
          ) : (
            <span className={styles.continueDisabled}>Full text — coming soon</span>
          )}
        </motion.aside>
      ) : null}
    </AnimatePresence>
  )
}
