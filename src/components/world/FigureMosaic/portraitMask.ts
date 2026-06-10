import type { WorldCategory } from '../world.types'

/** Normalized coords (0–1) inside the mosaic frame. */

const BUST_CENTER_X = 0.5

function bustHalfWidth(ny: number): number {
  if (ny < 0.07) {
    return 0.28 + (ny / 0.07) * 0.06
  }
  if (ny < 0.16) {
    return 0.34 + ((ny - 0.07) / 0.09) * 0.1
  }
  if (ny < 0.26) {
    return 0.44
  }
  if (ny < 0.32) {
    const t = (ny - 0.26) / 0.06
    return 0.44 - t * 0.2
  }
  if (ny < 0.36) {
    return 0.18
  }
  if (ny < 0.42) {
    const t = (ny - 0.36) / 0.06
    return 0.18 + t * 0.32
  }
  if (ny < 0.5) {
    return 0.5
  }
  if (ny < 0.54) {
    const t = (ny - 0.5) / 0.04
    return 0.5 - t * 0.24
  }
  return 0.26
}

/** Bust only: head, neck, shoulders, short upper torso (no legs). */
export function inPortraitSilhouette(nx: number, ny: number): boolean {
  if (ny < 0.05 || ny > 0.54) return false

  const half = bustHalfWidth(ny)
  return Math.abs(nx - BUST_CENTER_X) <= half
}

function interiorWeight(nx: number, ny: number): number {
  const half = bustHalfWidth(ny)
  const dx = Math.abs(nx - BUST_CENTER_X)
  const edge = dx / Math.max(half, 0.001)
  const edgeSoft = 1 - edge * edge * 0.5

  if (ny < 0.28) {
    const cheek = 1 - Math.abs(nx - BUST_CENTER_X) * 1.85
    return Math.max(0.38, edgeSoft * (0.78 + cheek * 0.22))
  }
  if (ny < 0.36) {
    return edgeSoft * 0.45
  }
  if (ny < 0.52) {
    const shoulder = 1 - Math.abs(nx - BUST_CENTER_X) * 1.15
    return Math.max(0.45, edgeSoft * (0.7 + shoulder * 0.3))
  }
  return edgeSoft * 0.38
}

/** Placement weight with eye-line / face-axis negative-space hints. */
export function bodyPlacementWeight(nx: number, ny: number): number {
  if (!inPortraitSilhouette(nx, ny)) return 0

  let w = interiorWeight(nx, ny)

  if (ny >= 0.218 && ny <= 0.268 && nx >= 0.2 && nx <= 0.8) {
    w *= 0.28
  }
  if (ny >= 0.28 && ny <= 0.5 && nx >= 0.43 && nx <= 0.57) {
    w *= 0.2
  }
  if (ny >= 0.17 && ny <= 0.32 && nx >= 0.47 && nx <= 0.53) {
    w *= 0.42
  }

  return Math.min(1, w)
}

/** 0 = deep interior, 1 = near silhouette edge (opacity + size falloff). */
export function portraitInteriorWeight(nx: number, ny: number): number {
  return bodyPlacementWeight(nx, ny)
}

/** Spatial zones so categories do not stack on the vertical center axis. */
export function categoryForPosition(x: number, y: number): WorldCategory {
  if (y < 40) {
    return x < 44 ? 'fashion' : x > 58 ? 'music' : 'fashion'
  }
  if (y < 50) {
    if (x < 36) return 'watching'
    if (x > 64) return 'music'
    if (y < 44) return x < 52 ? 'fashion' : 'life'
    return 'watching'
  }
  if (y < 56) {
    if (x > 60) return 'life'
    if (x < 40) return 'watching'
    return 'music'
  }
  return x > 55 ? 'life' : 'watching'
}

export function scatterShardAllowed(nx: number, ny: number): boolean {
  if (!inPortraitSilhouette(nx, ny)) return false
  if (ny > 0.48) return false

  const half = bustHalfWidth(ny)
  const dx = Math.abs(nx - BUST_CENTER_X)
  const edgeRatio = dx / Math.max(half, 0.001)
  return edgeRatio >= 0.72 && edgeRatio <= 0.98
}

/** Lift and compress normalized Y so the bust sits higher in the frame. */
export function frameY(ny: number): number {
  return ny * 0.86 + 0.06
}
