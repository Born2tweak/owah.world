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
  life: [-2.6, 0, -4.05],
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
    position: [-0.5, 2.0, 0.15],
    target: [-2.6, 1.7, -4.05],
    fov: 44,
  },
}

export const ZONE_LABELS: Record<WorldCategory, { title: string; subtitle: string; description: string }> = {
  fashion: {
    title: 'Wardrobe',
    subtitle: 'Darkwear archive',
    description:
      'A peek behind the rail of the swaggiest individual known to man. Silhouettes and leather, hung like trophies.',
  },
  music: {
    title: 'Music',
    subtitle: 'Sound archive',
    description:
      'An archive of my taste in sound. What raised me, what rewired me, and what is spinning right now.',
  },
  watching: {
    title: 'Watching',
    subtitle: 'Media canon',
    description:
      'A shrine to the greatest media I have ever consumed. Stories that changed me, scored and shelved with intent.',
  },
  life: {
    title: 'Life Feed',
    subtitle: 'Memory sanctuary',
    description:
      'The sanctuary of my being. Fragments of my days, suspended in glass and light.',
  },
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
