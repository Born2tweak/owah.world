'use client'

import type { CSSProperties, ReactNode } from 'react'
import type { ExperimentalMeta } from '../types'

/** Staging wrapper — source: VengenceUI `glass-dock`, OWAH landing glass strip */
export const experimentalGlassMeta: ExperimentalMeta = {
  source: 'vengence-ui',
  pattern: 'glass-surface',
  reference: 'VengenceUI/src/components/ui/glass-dock.tsx',
}

export interface ExperimentalGlassSurfaceProps {
  children: ReactNode
  className?: string
  style?: CSSProperties
}

export function ExperimentalGlassSurface({
  children,
  className,
  style,
}: ExperimentalGlassSurfaceProps) {
  return (
    <div
      className={className}
      style={style}
      data-experimental="glass-surface"
      data-source={experimentalGlassMeta.source}
    >
      {children}
    </div>
  )
}
