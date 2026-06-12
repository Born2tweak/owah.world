'use client'

import { useMemo } from 'react'
import type { WorldCategory } from '../world.types'
import FashionZone from './FashionZone'
import LifeFeedZone from './LifeFeedZone'
import MusicZone from './MusicZone'
import RoomShell, { RoomLighting } from './RoomShell'
import RoomZoneHotspot from './RoomZoneHotspot'
import WatchingZone from './WatchingZone'
import { isWorldCategory, type RoomZone } from './roomZones'

const ZONES: WorldCategory[] = ['fashion', 'music', 'watching', 'life']

type RoomEnvironmentProps = {
  activeZone: RoomZone
  hoveredZone: WorldCategory | null
  onHover: (zone: WorldCategory | null) => void
  onFocus: (zone: WorldCategory) => void
}

export default function RoomEnvironment({
  activeZone,
  hoveredZone,
  onHover,
  onFocus,
}: RoomEnvironmentProps) {
  const zoneHighlighted = useMemo(() => {
    const map: Record<WorldCategory, boolean> = {
      fashion: false,
      music: false,
      watching: false,
      life: false,
    }
    for (const zone of ZONES) {
      map[zone] =
        activeZone === zone || hoveredZone === zone || (activeZone === 'overview' && hoveredZone === zone)
    }
    if (isWorldCategory(activeZone)) {
      map[activeZone] = true
    }
    return map
  }, [activeZone, hoveredZone])

  return (
    <>
      <RoomLighting />
      <RoomShell />

      <RoomZoneHotspot
        zone="fashion"
        position={[-5.1, 0, -2.8]}
        size={[3.8, 2.8, 2.4]}
        isActive={activeZone === 'fashion'}
        isHovered={hoveredZone === 'fashion'}
        onHover={onHover}
        onFocus={onFocus}
      >
        <FashionZone highlighted={zoneHighlighted.fashion} />
      </RoomZoneHotspot>

      <RoomZoneHotspot
        zone="music"
        position={[0, 0, -3.2]}
        size={[3.2, 2.4, 2.2]}
        isActive={activeZone === 'music'}
        isHovered={hoveredZone === 'music'}
        onHover={onHover}
        onFocus={onFocus}
      >
        <MusicZone highlighted={zoneHighlighted.music} />
      </RoomZoneHotspot>

      <RoomZoneHotspot
        zone="watching"
        position={[4.55, 0, -3.2]}
        size={[3.8, 2.8, 2.4]}
        isActive={activeZone === 'watching'}
        isHovered={hoveredZone === 'watching'}
        onHover={onHover}
        onFocus={onFocus}
      >
        <WatchingZone highlighted={zoneHighlighted.watching} />
      </RoomZoneHotspot>

      <RoomZoneHotspot
        zone="life"
        position={[6.86, 0, -1.6]}
        size={[0.8, 3.4, 3.0]}
        isActive={activeZone === 'life'}
        isHovered={hoveredZone === 'life'}
        onHover={onHover}
        onFocus={onFocus}
      >
        <LifeFeedZone highlighted={zoneHighlighted.life} />
      </RoomZoneHotspot>
    </>
  )
}
