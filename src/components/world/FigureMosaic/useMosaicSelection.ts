'use client'

import { useCallback, useMemo, useState } from 'react'
import type { MosaicFragment } from '../world.types'
import { isGridNeighbor } from './mosaicNeighbors'

const FOCUS_SCALE = 1.34

export function getFragmentCenter(fragment: MosaicFragment) {
  return {
    x: fragment.x + fragment.width / 2,
    y: fragment.y + fragment.height / 2,
  }
}

export function getFocusCamera(fragment: MosaicFragment | null) {
  if (!fragment) {
    return {
      scale: 1,
      x: '0%',
      y: '0%',
      transformOrigin: '50% 50%',
    }
  }

  const { x: cx, y: cy } = getFragmentCenter(fragment)
  const pull = (FOCUS_SCALE - 1) * 0.72

  return {
    scale: FOCUS_SCALE,
    x: `${(50 - cx) * pull}%`,
    y: `${(50 - cy) * pull}%`,
    transformOrigin: `${cx}% ${cy}%`,
  }
}

export function useMosaicSelection() {
  const [selectedFragment, setSelectedFragment] = useState<MosaicFragment | null>(null)
  const [hoveredFragment, setHoveredFragment] = useState<MosaicFragment | null>(null)

  const isFocused = selectedFragment !== null
  const focusCamera = useMemo(() => getFocusCamera(selectedFragment), [selectedFragment])

  const selectFragment = useCallback((fragment: MosaicFragment) => {
    setSelectedFragment(fragment)
    setHoveredFragment(null)
  }, [])

  const clearSelection = useCallback(() => {
    setSelectedFragment(null)
    setHoveredFragment(null)
  }, [])

  const setHovered = useCallback((fragment: MosaicFragment | null) => {
    setHoveredFragment(fragment)
  }, [])

  const getTileInteraction = useCallback(
    (fragment: MosaicFragment) => {
      const isSelected = selectedFragment?.id === fragment.id
      const isHovered = hoveredFragment?.id === fragment.id
      const isNeighborHover = hoveredFragment
        ? isGridNeighbor(fragment, hoveredFragment)
        : false
      const isDimmed = isFocused && !isSelected

      return {
        isSelected,
        isHovered,
        isNeighborHover,
        isDimmed,
        zIndex:
          fragment.depth +
          (isSelected ? 12 : isHovered ? 8 : isNeighborHover ? 5 : isDimmed ? 1 : 2),
      }
    },
    [hoveredFragment, isFocused, selectedFragment],
  )

  return {
    selectedFragment,
    hoveredFragment,
    isFocused,
    focusCamera,
    selectFragment,
    clearSelection,
    setHovered,
    getTileInteraction,
  }
}
