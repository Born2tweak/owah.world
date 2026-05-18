'use client'

import styles from './CornerHUD.module.css'

function GlobeIcon() {
  return (
    <span className={styles.globeIcon} aria-hidden="true">
      <span className={styles.globeRing} />
      <span className={styles.globeH} />
      <span className={styles.globeV} />
    </span>
  )
}

function CrosshairIcon() {
  return (
    <span className={styles.crosshairIcon} aria-hidden="true">
      <span className={styles.ch} />
      <span className={styles.cv} />
    </span>
  )
}

export default function CornerHUD() {
  return (
    <div className={styles.root} aria-hidden="true">

      {/* Top-left */}
      <div className={`${styles.corner} ${styles.tl}`}>
        <GlobeIcon />
        <span className={styles.label}>LIVING DIGITAL WORLD</span>
      </div>

      {/* Top-right */}
      <div className={`${styles.corner} ${styles.tr}`}>
        <span className={styles.label}>SYSTEM v1.0</span>
        <span className={styles.statusRow}>
          <span className={styles.label}>ONLINE</span>
          <span className={styles.onlineDot} />
        </span>
      </div>

      {/* Bottom-left */}
      <div className={`${styles.corner} ${styles.bl}`}>
        <CrosshairIcon />
        <span className={styles.label}>INTENT</span>
        <span className={styles.label}>REALITY</span>
        <span className={styles.stat}>006</span>
      </div>

      {/* Bottom-right */}
      <div className={`${styles.corner} ${styles.br}`}>
        <span className={styles.label}>BUILT IN CHAOS</span>
        <span className={styles.label}>REFINED BY VISION</span>
        <CrosshairIcon />
        <span className={styles.stat}>33.7490° N, 84.3880° W</span>
      </div>

    </div>
  )
}
