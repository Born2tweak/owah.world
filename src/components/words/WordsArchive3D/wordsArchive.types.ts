export type WingId = 'liberation' | 'mysticism' | 'psychology' | 'culture' | 'author'

export type ArchiveView = 'overview' | WingId

export type BookType = 'book' | 'essay' | 'pdf' | 'manuscript'

export type ArchiveBook = {
  id: string
  title: string
  author: string
  wing: WingId
  type: BookType
  /** Public path to the openable file, or null for unreleased works. */
  file: string | null
  /** Optional cover image path. */
  cover: string | null
  year?: string
  description: string
  themes: string[]
}

export type Wing = {
  id: WingId
  label: string
  eyebrow: string
  subtitle: string
  /** Warm/category accent used for shelf light and book glow. */
  accent: string
  /** Azimuth around the chamber centre, in radians. */
  azimuth: number
}

export type CameraState = {
  position: [number, number, number]
  target: [number, number, number]
  fov: number
}
