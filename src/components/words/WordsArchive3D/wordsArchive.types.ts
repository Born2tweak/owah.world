export type FaceId = 'liberation' | 'mysticism' | 'psychology' | 'culture'

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
  /** Public path to the cube image (portrait / cover / symbolic artwork). */
  image: string
  /** Public path to the openable file, or null. */
  file: string | null
  /** One-line thesis shown on hover. */
  thesis: string
  overview: string
  themes: string[]
  keyIdeas: string[]
  passages: Passage[]
  /** Related work ids, may cross faces — drives the connection graph. */
  related: string[]
}

export type Face = {
  id: FaceId
  label: string
  thesis: string
  accent: string
  /** Cube Y-rotation (radians) that brings this face to the front. */
  faceRotationY: number
}

export type CameraState = {
  position: [number, number, number]
  target: [number, number, number]
  fov: number
}
