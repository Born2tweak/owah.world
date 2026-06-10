'use client'

import {
  motion,
  AnimatePresence,
  useReducedMotion,
  type Variants,
} from 'framer-motion'
import { usePathname } from 'next/navigation'
import { ReactNode, useLayoutEffect } from 'react'
import styles from './PageTransition.module.css'

interface PageTransitionProps {
  children: ReactNode
}

function getRouteAccent(pathname: string) {
  if (pathname === '/code') return 'var(--accent-code)'
  if (pathname === '/words') return 'var(--accent-words)'
  if (pathname === '/world') return 'var(--accent-world)'
  return 'var(--accent-landing)'
}

/** Crystal field flash only on landing — other routes ship their own atmosphere. */
function showCrystalField(pathname: string) {
  return pathname === '/'
}

const contentVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 1.012,
    transition: {
      duration: 0.24,
      ease: [0, 0, 0.2, 1],
    },
  },
  enter: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.42,
      ease: [0.4, 0, 0.2, 1],
    },
  },
  exit: {
    opacity: 0,
    scale: 0.988,
    transition: {
      duration: 0.22,
      ease: [0, 0, 0.2, 1],
    },
  },
}

const fieldVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 1.03,
  },
  enter: {
    opacity: [0, 0.22, 0.48, 0.12, 0],
    scale: [1.03, 1.01, 1, 1],
    transition: {
      duration: 0.52,
      ease: [0.2, 0.8, 0.2, 1],
      times: [0, 0.28, 0.5, 0.78, 1],
    },
  },
  exit: {
    opacity: [0, 0.18, 0.42, 0],
    scale: [1.02, 1, 0.998],
    transition: {
      duration: 0.3,
      ease: [0, 0, 0.2, 1],
      times: [0, 0.35, 0.7, 1],
    },
  },
}

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname()
  const routeAccent = getRouteAccent(pathname)
  const reduceMotion = useReducedMotion()
  const crystalField = showCrystalField(pathname)
  /** Landing-only enter fade — other routes must not SSR at opacity 0 (breaks without hydration). */
  const useEnterFade = pathname === '/' && !reduceMotion

  useLayoutEffect(() => {
    document.body.dataset.route = pathname.replace(/^\//, '') || 'landing'
  }, [pathname])

  const pageContent = useEnterFade ? (
    <motion.div
      className={styles.content}
      variants={contentVariants}
      initial="hidden"
      animate="enter"
      exit="exit"
    >
      {children}
    </motion.div>
  ) : (
    <div className={styles.content}>{children}</div>
  )

  return (
    <AnimatePresence mode="wait">
      <motion.div key={pathname} className={styles.root}>
        {pageContent}

        {crystalField ? (
          <motion.div
            className={styles.field}
            style={{ ['--route-accent' as string]: routeAccent }}
            variants={fieldVariants}
            initial={reduceMotion ? false : 'hidden'}
            animate="enter"
            exit="exit"
            aria-hidden="true"
          >
            <div className={styles.pixelLayer} />
            <div className={styles.refractionLayer} />
            <div className={styles.chromeBeat} />
          </motion.div>
        ) : null}
      </motion.div>
    </AnimatePresence>
  )
}
