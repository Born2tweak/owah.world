'use client'

import type { ReactNode } from 'react'
import type { ExperimentalMeta } from '../types'

/** Staging wrapper — source: animate-ui `radix/sheet`, OWAH ContentDrawer */
export const experimentalSlidePanelMeta: ExperimentalMeta = {
  source: 'animate-ui',
  pattern: 'slide-panel',
  reference: 'animate-ui/apps/www/registry/components/radix/sheet',
}

export interface ExperimentalSlidePanelProps {
  children: ReactNode
  open?: boolean
  className?: string
  'aria-label'?: string
}

export function ExperimentalSlidePanel({
  children,
  open = false,
  className,
  'aria-label': ariaLabel,
}: ExperimentalSlidePanelProps) {
  return (
    <aside
      className={className}
      data-experimental="slide-panel"
      data-source={experimentalSlidePanelMeta.source}
      data-open={open ? 'true' : 'false'}
      aria-hidden={!open}
      aria-label={ariaLabel}
    >
      {children}
    </aside>
  )
}
