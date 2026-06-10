'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ExperimentalDensePanel } from '@/components/ui/experimental/panels'
import { ExperimentalGlassSurface } from '@/components/ui/experimental/glass'
import { ExperimentalSlidePanel } from '@/components/ui/experimental/drawers'
import type { SelectedFragment, WorldCategory } from '../world.types'
import { WORLD_CATEGORY_COLORS } from '../world.types'
import { DrawerMockContent } from './drawerMockContent'
import styles from './ContentDrawer.module.css'

type ContentDrawerProps = {
  fragment: SelectedFragment | null
  onClose: () => void
}

const CATEGORY_DISPLAY: Record<WorldCategory, string> = {
  fashion: 'Fashion',
  music: 'Music',
  watching: 'Watching',
  life: 'Life Feed',
}

const panelTransition = {
  duration: 0.34,
  ease: [0.22, 1, 0.36, 1] as const,
}

export default function ContentDrawer({ fragment, onClose }: ContentDrawerProps) {
  const isOpen = fragment !== null
  const category = fragment?.category ?? 'fashion'
  const accent = WORLD_CATEGORY_COLORS[category]
  const reduceMotion = useReducedMotion()

  return (
    <ExperimentalSlidePanel
      open={isOpen}
      className={`${styles.drawer}${isOpen ? ` ${styles.drawerOpen}` : ''}`}
      aria-label="World content drawer"
    >
      <AnimatePresence mode="wait">
        {fragment ? (
          <motion.div
            key={fragment.id}
            className={styles.motionShell}
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, x: 28 }}
            animate={reduceMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, x: 24 }}
            transition={panelTransition}
          >
            <ExperimentalGlassSurface
              className={styles.glassPanel}
              style={{ ['--drawer-accent' as string]: accent }}
            >
              <header className={styles.drawerHeader}>
                <div className={styles.headerCopy}>
                  <p className={styles.drawerEyebrow}>Category</p>
                  <h2 className={styles.drawerTitle}>{CATEGORY_DISPLAY[category]}</h2>
                </div>
                <button
                  type="button"
                  className={styles.closeBtn}
                  onClick={onClose}
                  aria-label="Close drawer"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </header>

              <ExperimentalDensePanel title={CATEGORY_DISPLAY[category]} className={styles.denseBody}>
                <div className={styles.drawerBody}>
                  <p className={styles.drawerLead}>
                    Memory surface for this fragment — mocked entries until live sync ships.
                  </p>
                  <DrawerMockContent category={category} />
                </div>
              </ExperimentalDensePanel>
            </ExperimentalGlassSurface>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </ExperimentalSlidePanel>
  )
}
