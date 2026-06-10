'use client'

import { useCallback, useEffect, useState } from 'react'
import type { WorldCategory } from '../world.types'
import { CAMERA_POSITIONS, type ShowroomZone } from './showroomCamera'

export function useShowroomCamera() {
  const [activeZone, setActiveZone] = useState<ShowroomZone>('overview')
  const [hoveredZone, setHoveredZone] = useState<WorldCategory | null>(null)
  const [parallax, setParallax] = useState({ x: 0, y: 0 })

  const focusZone = useCallback((zone: WorldCategory) => {
    setActiveZone(zone)
  }, [])

  const returnToOverview = useCallback(() => {
    setActiveZone('overview')
  }, [])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') returnToOverview()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [returnToOverview])

  const camera = CAMERA_POSITIONS[activeZone]

  return {
    activeZone,
    hoveredZone,
    camera,
    parallax,
    isOverview: activeZone === 'overview',
    focusZone,
    returnToOverview,
    setHoveredZone,
    setParallax,
  }
}
