'use client'

import { motion, AnimatePresence } from 'framer-motion'
import type { ShowroomZone } from './showroomCamera'
import styles from './ShowroomHud.module.css'

type ShowroomHudProps = {
  activeZone: ShowroomZone
  onReturn: () => void
}

export default function ShowroomHud({ activeZone, onReturn }: ShowroomHudProps) {
  return (
    <div className={styles.hud} aria-hidden={false}>
      <header className={styles.hudTop}>
        <div className={styles.brand}>
          <span className={styles.brandMain}>OWAH.WORLD</span>
          <span className={styles.brandSep}>|</span>
          <span className={styles.brandSub}>LIVING ARCHIVE</span>
        </div>
        <div className={styles.status}>
          <span className={styles.statusPulse} />
          <span>SYSTEM V1.0</span>
          <span className={styles.statusSep}>|</span>
          <span>ONLINE</span>
        </div>
      </header>

      <footer className={styles.hudBottom}>
        <span className={styles.coords}>33.7490° N, 84.3880° W</span>
        <AnimatePresence>
          {activeZone === 'overview' ? (
            <motion.span
              key="hint"
              className={styles.lookHint}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <span className={styles.mouseIcon} aria-hidden="true" />
              EXPLORE THE ROOM
            </motion.span>
          ) : (
            <motion.button
              key="back"
              type="button"
              className={styles.backBtn}
              onClick={onReturn}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
            >
              ← Overview
            </motion.button>
          )}
        </AnimatePresence>
      </footer>
    </div>
  )
}
