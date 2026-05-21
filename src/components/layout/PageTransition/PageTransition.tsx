'use client'

import { motion, AnimatePresence, type Variants } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'
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

const contentVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 1.024,
    filter: 'brightness(0.68) saturate(0.12) blur(8px) contrast(0.96)',
    transition: {
      duration: 0.28,
      ease: [0.00, 0.00, 0.20, 1] as [number, number, number, number],
    },
  },
  enter: {
    opacity: 1,
    scale: 1,
    filter: 'brightness(1) saturate(1) blur(0px) contrast(1)',
    transition: {
      duration: 0.56,
      ease: [0.40, 0.00, 0.20, 1] as [number, number, number, number],
    },
  },
  exit: {
    opacity: 0,
    scale: 0.976,
    filter: 'brightness(0.44) saturate(0.06) blur(10px) contrast(0.9)',
    transition: {
      duration: 0.28,
      ease: [0.00, 0.00, 0.20, 1] as [number, number, number, number],
    },
  },
}

const fieldVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 1.04,
    filter: 'blur(14px) saturate(0.8)',
  },
  enter: {
    opacity: [0, 0.28, 0.72, 0.2, 0],
    scale: [1.04, 1.02, 0.996, 1],
    filter: [
      'blur(14px) saturate(0.8)',
      'blur(7px) saturate(1.05)',
      'blur(2px) saturate(1.2)',
      'blur(1px) saturate(1)',
      'blur(8px) saturate(0.85)',
    ],
    transition: {
      duration: 0.58,
      ease: [0.20, 0.80, 0.20, 1] as [number, number, number, number],
      times: [0, 0.24, 0.44, 0.72, 1],
    },
  },
  exit: {
    opacity: [0, 0.24, 0.62, 0.08],
    scale: [1.03, 1.015, 1, 0.997],
    filter: ['blur(12px) saturate(0.85)', 'blur(8px) saturate(1)', 'blur(2px) saturate(1.18)', 'blur(8px) saturate(0.85)'],
    transition: {
      duration: 0.36,
      ease: [0.00, 0.00, 0.20, 1] as [number, number, number, number],
      times: [0, 0.34, 0.68, 1],
    },
  },
}

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname()
  const routeAccent = getRouteAccent(pathname)

  return (
    <AnimatePresence mode="wait">
      <div key={pathname} className={styles.root}>
        <motion.div
          className={styles.content}
          variants={contentVariants}
          initial="hidden"
          animate="enter"
          exit="exit"
          style={{
            ['--transition-exit-duration' as string]: 'var(--transition-exit-duration)',
            ['--transition-enter-duration' as string]: 'var(--transition-enter-duration)',
            ['--transition-scale-exit' as string]: 'var(--transition-scale-exit)',
            ['--transition-scale-enter' as string]: 'var(--transition-scale-enter)',
          }}
        >
          {children}
        </motion.div>

        <motion.div
          className={styles.field}
          style={{ ['--route-accent' as string]: routeAccent }}
          variants={fieldVariants}
          initial="hidden"
          animate="enter"
          exit="exit"
          aria-hidden="true"
        >
          <div className={styles.pixelLayer} />
          <div className={styles.refractionLayer} />
          <div className={styles.chromeBeat} />
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
