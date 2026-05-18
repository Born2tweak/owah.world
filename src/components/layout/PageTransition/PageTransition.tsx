'use client'

import { motion, AnimatePresence, type Variants } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'

interface PageTransitionProps {
  children: ReactNode
}

const variants: Variants = {
  hidden: {
    opacity: 0,
    filter: 'brightness(0.6) saturate(0)',
    transition: {
      duration: 0.15,
      ease: [0.00, 0.00, 0.20, 1] as [number, number, number, number],
    },
  },
  enter: {
    opacity: 1,
    filter: 'brightness(1) saturate(1)',
    transition: {
      duration: 0.3,
      ease: [0.40, 0.00, 0.20, 1] as [number, number, number, number],
    },
  },
  exit: {
    opacity: 0,
    filter: 'brightness(1.4) saturate(0)',
    transition: {
      duration: 0.15,
      ease: [0.00, 0.00, 0.20, 1] as [number, number, number, number],
    },
  },
}

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        variants={variants}
        initial="hidden"
        animate="enter"
        exit="exit"
        style={{ width: '100%', height: '100%' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
