'use client'

import Link from 'next/link'
import { WORLD_ACCENT, useLandingStore, type WorldId } from '@/lib/stores/landing.store'
import styles from './WorldGuide.module.css'

type WorldCard = {
  id: WorldId
  index: string
  title: string
  subtitle: string
  description: string
  cta: string
  href: string
}

const WORLDS: WorldCard[] = [
  {
    id: 'code',
    index: '01',
    title: 'CODE',
    subtitle: 'The Chamber of Creation',
    description:
      'The systems, applications, and experiments I build — projects traced from concept to deployment, a living record of ongoing creation.',
    cta: 'Enter Chamber',
    href: '/code',
  },
  {
    id: 'words',
    index: '02',
    title: 'WORDS',
    subtitle: 'The Archive of Influence',
    description:
      'A living archive of books, thinkers, and ideas that shaped my perspective — interconnected works across the domains behind the person becoming.',
    cta: 'Enter Archive',
    href: '/words',
  },
  {
    id: 'world',
    index: '03',
    title: 'WORLD',
    subtitle: 'The Showroom',
    description:
      'The music, fashion, design, and culture that shape my taste. Part archive, part moodboard, part digital room.',
    cta: 'Enter Showroom',
    href: '/world',
  },
]

export default function WorldGuide() {
  const setHoveredWorld = useLandingStore((s) => s.setHoveredWorld)

  return (
    <div className={styles.root}>
      <div className={styles.welcome}>
        <p className={styles.eyebrow}>Welcome to</p>
        <h1 className={styles.brand}>
          OWAH<b>.WORLD</b>
        </h1>
        <p className={styles.intro}>
          A living system where memory, code, and culture collide. Explore the three chambers that shape how I
          build, think, and live.
        </p>
        <div className={styles.stats}>
          <span className={styles.stat}>
            <span className={styles.statValue}>3</span>
            <span className={styles.statLabel}>Worlds</span>
          </span>
          <span className={styles.stat}>
            <span className={styles.statValue}>∞</span>
            <span className={styles.statLabel}>Ideas</span>
          </span>
          <span className={styles.stat}>
            <span className={styles.statValue}>1</span>
            <span className={styles.statLabel}>Vision</span>
          </span>
        </div>
      </div>

      <nav className={styles.directory} aria-label="World directory">
        {WORLDS.map((w) => (
          <Link
            key={w.id}
            href={w.href}
            className={styles.card}
            style={{ ['--accent' as string]: WORLD_ACCENT[w.id] }}
            onMouseEnter={() => setHoveredWorld(w.id)}
            onMouseLeave={() => setHoveredWorld(null)}
            onFocus={() => setHoveredWorld(w.id)}
            onBlur={() => setHoveredWorld(null)}
          >
            <span className={styles.cardHead}>
              <span className={styles.cardIndex}>{w.index} /</span>
              <span className={styles.cardTitle}>{w.title}</span>
            </span>
            <p className={styles.cardSubtitle}>{w.subtitle}</p>
            <p className={styles.cardDesc}>{w.description}</p>
            <span className={styles.cardCta}>
              {w.cta}
              <span className={styles.cardArrow}>→</span>
            </span>
          </Link>
        ))}
      </nav>
    </div>
  )
}
