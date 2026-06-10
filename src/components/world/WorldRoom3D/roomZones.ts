import type { WorldCategory } from '../world.types'

export type RoomZone = 'overview' | WorldCategory

export type RoomCameraState = {
  position: [number, number, number]
  target: [number, number, number]
  fov?: number
}

/** World-space anchors for each zone cluster (matches RoomZoneHotspot positions). */
export const ZONE_WORLD_ANCHORS: Record<WorldCategory, [number, number, number]> = {
  fashion: [-5.1, 0, -2.8],
  music: [0, 0, -3.2],
  watching: [5.1, 0, -3.2],
  life: [0, 2.6, -4.8],
}

export const ROOM_ZONE_ORDER: RoomZone[] = [
  'overview',
  'fashion',
  'music',
  'watching',
  'life',
]

export const ROOM_CAMERA_STATES: Record<RoomZone, RoomCameraState> = {
  overview: {
    position: [2.5, 2.55, 5.8],
    target: [0, 1.25, -3.1],
    fov: 50,
  },
  fashion: {
    position: [-2.8, 1.85, 1.8],
    target: [-5.1, 1.35, -3.2],
    fov: 42,
  },
  music: {
    position: [2.0, 1.75, 1.6],
    target: [0, 1.1, -3.35],
    fov: 41,
  },
  watching: {
    position: [2.8, 1.85, 1.8],
    target: [5.1, 1.4, -3.6],
    fov: 42,
  },
  life: {
    position: [1.8, 2.75, 2.2],
    target: [0, 2.55, -4.75],
    fov: 40,
  },
}

export const ZONE_LABELS: Record<WorldCategory, { title: string; subtitle: string }> = {
  fashion: { title: 'Wardrobe', subtitle: 'Collection' },
  music: { title: 'Music', subtitle: 'Rotation' },
  watching: { title: 'Watching', subtitle: 'Archive' },
  life: { title: 'Life Feed', subtitle: 'Signals' },
}

export const ZONE_ACCENTS: Record<WorldCategory, string> = {
  fashion: '#00f0ff',
  music: '#3dff9a',
  watching: '#c77dff',
  life: '#ffb347',
}

export function nextZone(current: RoomZone, direction: 1 | -1): RoomZone {
  const index = ROOM_ZONE_ORDER.indexOf(current)
  const next = (index + direction + ROOM_ZONE_ORDER.length) % ROOM_ZONE_ORDER.length
  return ROOM_ZONE_ORDER[next]
}

export function isWorldCategory(zone: RoomZone): zone is WorldCategory {
  return zone !== 'overview'
}
