'use client'

import styles from './WorldGuide.module.css'

export default function WorldGuide() {
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
    </div>
  )
}
