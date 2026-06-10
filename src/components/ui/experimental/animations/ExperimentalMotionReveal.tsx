'use client'

import type { ReactNode } from 'react'
import type { ExperimentalMeta } from '../types'

/** Staging wrapper — source: VengenceUI `animated-hero`, animate-ui `effects/fade` */
export const experimentalMotionRevealMeta: ExperimentalMeta = {
  source: 'animate-ui',
  pattern: 'motion-reveal',
  reference: 'animate-ui/apps/www/registry/primitives/effects/fade',
}

export interface ExperimentalMotionRevealProps {
  children: ReactNode
  className?: string
}

export function ExperimentalMotionReveal({ children, className }: ExperimentalMotionRevealProps) {
  return (
    <div
      className={className}
      data-experimental="motion-reveal"
      data-source={experimentalMotionRevealMeta.source}
    >
      {children}
    </div>
  )
}
