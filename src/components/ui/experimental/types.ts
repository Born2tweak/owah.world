/**
 * Metadata for experimental UI patterns sourced from external research repos.
 * Wrappers are staging slots — not wired into routes yet.
 */

export type ExperimentalSource =
  | 'vengence-ui'
  | 'animate-ui'
  | 'galaxy'
  | 'forge-layout'

export type ExperimentalPatternId =
  | 'glass-surface'
  | 'glow-card'
  | 'motion-reveal'
  | 'slide-panel'
  | 'dense-panel'
  | 'spotlight-nav'
  | 'shine-border'

export interface ExperimentalMeta {
  source: ExperimentalSource
  pattern: ExperimentalPatternId
  /** Path or component name in the global clone (see docs/UI_RESEARCH.md) */
  reference: string
}
