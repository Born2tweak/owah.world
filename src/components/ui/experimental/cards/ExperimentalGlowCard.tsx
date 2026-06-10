'use client'

import type { CSSProperties, ReactNode } from 'react'
import type { ExperimentalMeta } from '../types'

/** Staging wrapper — source: VengenceUI `glow-border-card`, galaxy Cards */
export const experimentalGlowCardMeta: ExperimentalMeta = {
  source: 'vengence-ui',
  pattern: 'glow-card',
  reference: 'VengenceUI/src/components/ui/glow-border-card.tsx',
}

export interface ExperimentalGlowCardProps {
  children: ReactNode
  className?: string
  style?: CSSProperties
  accentColor?: string
}

export function ExperimentalGlowCard({
  children,
  className,
  style,
  accentColor,
}: ExperimentalGlowCardProps) {
  return (
    <div
      className={className}
      style={
        accentColor
          ? ({ ...style, ['--experimental-accent' as string]: accentColor } as CSSProperties)
          : style
      }
      data-experimental="glow-card"
      data-source={experimentalGlowCardMeta.source}
    >
      {children}
    </div>
  )
}
