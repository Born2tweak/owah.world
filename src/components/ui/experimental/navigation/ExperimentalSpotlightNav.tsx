'use client'

import type { ReactNode } from 'react'
import type { ExperimentalMeta } from '../types'

/** Staging wrapper — source: VengenceUI `spotlight-navbar` */
export const experimentalSpotlightNavMeta: ExperimentalMeta = {
  source: 'vengence-ui',
  pattern: 'spotlight-nav',
  reference: 'VengenceUI/src/components/ui/spotlight-navbar.tsx',
}

export interface ExperimentalSpotlightNavProps {
  children: ReactNode
  className?: string
}

export function ExperimentalSpotlightNav({ children, className }: ExperimentalSpotlightNavProps) {
  return (
    <nav
      className={className}
      data-experimental="spotlight-nav"
      data-source={experimentalSpotlightNavMeta.source}
    >
      {children}
    </nav>
  )
}
