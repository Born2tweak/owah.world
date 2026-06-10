import type { WorldCategory } from '../world.types'

export type ShowroomZone = 'overview' | WorldCategory

export type CameraPose = {
  scale: number
  x: number
  y: number
  rotateY: number
  rotateX: number
}

export const CAMERA_POSITIONS: Record<ShowroomZone, CameraPose> = {
  overview: { scale: 1, x: 0, y: 0, rotateY: 0, rotateX: 0 },
  fashion: { scale: 1.52, x: 14, y: 6, rotateY: -8, rotateX: 2 },
  music: { scale: 1.48, x: -6, y: -8, rotateY: 6, rotateX: 1.5 },
  watching: { scale: 1.55, x: -18, y: 4, rotateY: 10, rotateX: 2 },
  life: { scale: 1.42, x: 4, y: -10, rotateY: -4, rotateX: -1 },
}

export const ZONE_LABELS: Record<WorldCategory, { title: string; subtitle: string }> = {
  fashion: { title: 'Wardrobe', subtitle: 'Collection' },
  music: { title: 'Music', subtitle: 'Rotation' },
  watching: { title: 'Watching', subtitle: 'Archive' },
  life: { title: 'Life Feed', subtitle: 'Signals' },
}
