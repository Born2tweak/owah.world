'use client'

import { motion } from 'framer-motion'
import type { MosaicFragment } from '../world.types'
import { WORLD_CATEGORY_COLORS } from '../world.types'
import styles from './FigureMosaic.module.css'

type TileInteraction = {
  isSelected: boolean
  isHovered: boolean
  isNeighborHover: boolean
  isDimmed: boolean
  zIndex: number
}

type MosaicTileProps = {
  fragment: MosaicFragment
  interaction: TileInteraction
  onSelect: (fragment: MosaicFragment) => void
  onHover: (fragment: MosaicFragment | null) => void
}

export default function MosaicTile({
  fragment,
  interaction,
  onSelect,
  onHover,
}: MosaicTileProps) {
  const accent = WORLD_CATEGORY_COLORS[fragment.category]
  const { isSelected, isHovered, isNeighborHover, isDimmed, zIndex } = interaction
  const baseOpacity = fragment.opacity

  const glowStrength =
    isSelected ? 1 : isHovered ? 0.85 : isNeighborHover ? 0.42 : 0

  const restingOpacity = isDimmed ? baseOpacity * 0.28 : baseOpacity
  const activeOpacity = isNeighborHover && !isHovered ? Math.min(1, baseOpacity * 1.15) : restingOpacity

  return (
    <motion.button
      type="button"
      className={styles.tile}
      style={{
        left: `${fragment.x}%`,
        top: `${fragment.y}%`,
        width: `${fragment.width}%`,
        height: `${fragment.height}%`,
        zIndex,
        borderRadius: `${fragment.borderRadius}px`,
        ['--tile-accent' as string]: accent,
        ['--tile-glow' as string]: `0 0 ${8 + glowStrength * 16}px color-mix(in srgb, ${accent} ${Math.round(35 + glowStrength * 45)}%, transparent)`,
        ['--tile-depth' as string]: String(fragment.depth),
      }}
      aria-label={`${fragment.category} fragment`}
      aria-pressed={isSelected}
      initial={false}
      animate={{
        scale: isSelected ? 1.16 : isHovered ? 1.08 : isNeighborHover ? 1.03 : 1,
        opacity: isSelected ? 1 : activeOpacity,
        rotate: isSelected || isHovered ? 0 : fragment.rotate,
        filter: isSelected
          ? 'brightness(1.4) saturate(1.25)'
          : isHovered
            ? 'brightness(1.32) saturate(1.15)'
            : isNeighborHover
              ? 'brightness(1.14)'
              : isDimmed
                ? 'brightness(0.42) saturate(0.65)'
                : `brightness(${0.88 + fragment.depth * 0.04})`,
        borderColor: isSelected || isHovered
          ? accent
          : isNeighborHover
            ? `color-mix(in srgb, ${accent} 40%, transparent)`
            : `color-mix(in srgb, ${accent} 22%, rgba(0, 240, 255, 0.12))`,
        boxShadow: isSelected || isHovered || isNeighborHover
          ? `var(--tile-glow), inset 0 0 0 1px rgba(255, 255, 255, 0.2)`
          : `0 ${fragment.depth}px ${4 + fragment.depth * 2}px rgba(0, 0, 0, 0.35), inset 0 0 0 1px rgba(255, 255, 255, 0.05)`,
      }}
      transition={{
        type: 'spring',
        stiffness: 420,
        damping: 28,
        mass: 0.35,
      }}
      onClick={() => onSelect(fragment)}
      onHoverStart={() => onHover(fragment)}
      onHoverEnd={() => onHover(null)}
    />
  )
}
