'use client'

import { AnimatePresence, motion } from 'framer-motion'
import type { WorldCategory } from '../world.types'
import { ZONE_ACCENTS, ZONE_LABELS } from './roomZones'
import styles from './WorldRoom3D.module.css'

type RoomInfoPanelProps = {
  zone: WorldCategory | null
  onClose: () => void
}

export default function RoomInfoPanel({ zone, onClose }: RoomInfoPanelProps) {
  const labels = zone ? ZONE_LABELS[zone] : null
  const accent = zone ? ZONE_ACCENTS[zone] : undefined

  return (
    <AnimatePresence>
      {zone && labels ? (
        <motion.aside
          key={zone}
          className={styles.infoPanel}
          style={{ ['--zone-accent' as string]: accent }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          aria-label={`${labels.title} zone`}
        >
          <button type="button" className={styles.infoClose} onClick={onClose} aria-label="Return to overview">
            ← Overview
          </button>
          <p className={styles.infoEyebrow}>Zone</p>
          <h2 className={styles.infoTitle}>{labels.title}</h2>
          <p className={styles.infoSubtitle}>{labels.subtitle}</p>
          <p className={styles.infoHint}>Content arrives in a later milestone. The room is the interface.</p>
        </motion.aside>
      ) : null}
    </AnimatePresence>
  )
}
