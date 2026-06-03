export type WorldCategory = 'fashion' | 'music' | 'watching' | 'life'

export type MosaicFragment = {
  id: string
  x: number
  y: number
  width: number
  height: number
  category: WorldCategory
  gridRow: number
  gridCol: number
  opacity: number
  depth: number
  rotate: number
  borderRadius: number
}

export type SelectedFragment = MosaicFragment

export const WORLD_CATEGORY_LABELS: Record<WorldCategory, string> = {
  fashion: 'Fashion Placeholder',
  music: 'Music Placeholder',
  watching: 'Watching Placeholder',
  life: 'Life Placeholder',
}

export const WORLD_CATEGORY_COLORS: Record<WorldCategory, string> = {
  fashion: '#00f0ff',
  music: '#3dff9a',
  watching: '#c77dff',
  life: '#ffb347',
}
