'use client'

import type { ReactNode } from 'react'
import type { ExperimentalMeta } from '../types'

/** Staging wrapper — source: Forge Gradio accordion/tab IA (layout only) */
export const experimentalDensePanelMeta: ExperimentalMeta = {
  source: 'forge-layout',
  pattern: 'dense-panel',
  reference: 'stable-diffusion-webui-forge/style.css (#settings, .gradio-accordion)',
}

export interface ExperimentalDensePanelProps {
  children: ReactNode
  title?: string
  className?: string
}

export function ExperimentalDensePanel({
  children,
  title,
  className,
}: ExperimentalDensePanelProps) {
  return (
    <section
      className={className}
      data-experimental="dense-panel"
      data-source={experimentalDensePanelMeta.source}
      aria-label={title}
    >
      {children}
    </section>
  )
}
