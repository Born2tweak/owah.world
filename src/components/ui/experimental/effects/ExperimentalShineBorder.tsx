'use client'

import type { ReactNode } from 'react'
import type { ExperimentalMeta } from '../types'

/** Staging wrapper — source: animate-ui `effects/shine`, galaxy card hovers */
export const experimentalShineBorderMeta: ExperimentalMeta = {
  source: 'animate-ui',
  pattern: 'shine-border',
  reference: 'animate-ui/apps/www/registry/primitives/effects/shine',
}

export interface ExperimentalShineBorderProps {
  children: ReactNode
  className?: string
  active?: boolean
}

export function ExperimentalShineBorder({
  children,
  className,
  active = false,
}: ExperimentalShineBorderProps) {
  return (
    <div
      className={className}
      data-experimental="shine-border"
      data-source={experimentalShineBorderMeta.source}
      data-active={active ? 'true' : 'false'}
    >
      {children}
    </div>
  )
}
