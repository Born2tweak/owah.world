export type FaceId = 'liberation' | 'mysticism' | 'psychology' | 'governance' | 'culture' | 'author'

export type CubeSide = 'front' | 'back' | 'left' | 'right' | 'top' | 'bottom'

export type ArchiveMode = 'overview' | 'face' | 'work'

export type Passage = {
  text: string
  ref: string
}

export type ArchiveWork = {
  id: string
  title: string
  author: string
  year: string
  face: FaceId
  image: string
  file: string | null
  thesis: string
  influence: number
  overview: string
  whyItMatters: string
  themes: string[]
  keyIdeas: string[]
  passages: Passage[]
  related: string[]
}

export type Face = {
  id: FaceId
  label: string
  accent: string
  side: CubeSide
}

export type CameraState = {
  position: [number, number, number]
  target: [number, number, number]
  fov: number
}
