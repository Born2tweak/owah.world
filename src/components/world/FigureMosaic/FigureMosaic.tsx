'use client'

import { motion } from 'framer-motion'
import type { MosaicFragment } from '../world.types'
import type { useMosaicSelection } from './useMosaicSelection'
import MosaicTile from './MosaicTile'
import { MOSAIC_FRAGMENTS } from './mosaicFragments'
import styles from './FigureMosaic.module.css'

type MosaicSelection = ReturnType<typeof useMosaicSelection>

type FigureMosaicProps = {
  selection: MosaicSelection
}

export default function FigureMosaic({ selection }: FigureMosaicProps) {
  const {
    selectedFragment,
    isFocused,
    focusCamera,
    selectFragment,
    setHovered,
    getTileInteraction,
  } = selection

  return (
    <div
      className={`${styles.mosaicFrame}${isFocused ? ` ${styles.mosaicFrameFocused}` : ''}`}
      aria-label="Figure mosaic portrait"
    >
      <div className={styles.portraitSilhouette} aria-hidden="true" />

      <motion.div
        className={styles.mosaicGlow}
        aria-hidden="true"
        animate={{
          opacity: isFocused ? 0.55 : 1,
          scale: isFocused ? 1.08 : 1,
        }}
        transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
      />

      <motion.div
        className={styles.mosaicCanvas}
        initial={false}
        animate={{
          scale: focusCamera.scale,
          x: focusCamera.x,
          y: focusCamera.y,
        }}
        style={{ transformOrigin: focusCamera.transformOrigin }}
        transition={{
          type: 'spring',
          stiffness: 260,
          damping: 32,
          mass: 0.9,
        }}
      >
        {MOSAIC_FRAGMENTS.map((fragment: MosaicFragment) => (
          <MosaicTile
            key={fragment.id}
            fragment={fragment}
            interaction={getTileInteraction(fragment)}
            onSelect={selectFragment}
            onHover={setHovered}
          />
        ))}
      </motion.div>

      <motion.p
        className={styles.mosaicHint}
        animate={{ opacity: isFocused ? 0.35 : 1 }}
        transition={{ duration: 0.3 }}
      >
        {selectedFragment
          ? 'Memory focused — close drawer to return'
          : 'Click any fragment to explore the mosaic mind'}
      </motion.p>
    </div>
  )
}
