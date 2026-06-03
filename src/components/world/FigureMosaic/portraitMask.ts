import type { WorldCategory } from '../world.types'

/** Normalized coords (0–1) inside the mosaic frame. */

function ellipse(nx: number, ny: number, cx: number, cy: number, rx: number, ry: number): boolean {
  const dx = (nx - cx) / rx
  const dy = (ny - cy) / ry
  return dx * dx + dy * dy <= 1
}

function torsoHalfWidth(ny: number): number {
  if (ny < 0.34) return 0.34
  if (ny < 0.52) return 0.34 - (ny - 0.34) * 0.35
  if (ny < 0.68) return 0.27 - (ny - 0.52) * 0.12
  return 0.15
}

/** Shinji-inspired slender anime figure: hair mass, face, torso, arms, legs. */
export function inPortraitSilhouette(nx: number, ny: number): boolean {
  if (ny < 0.1 && nx > 0.28 && nx < 0.72) return true
  if (ellipse(nx, ny, 0.5, 0.1, 0.2, 0.09)) return true
  if (ellipse(nx, ny, 0.5, 0.2, 0.12, 0.1)) return true
  if (ny >= 0.27 && ny < 0.33 && nx > 0.44 && nx < 0.56) return true

  if (ny >= 0.31 && ny < 0.7) {
    if (Math.abs(nx - 0.5) < torsoHalfWidth(ny)) return true
  }

  if (ny >= 0.34 && ny < 0.58) {
    if (nx < 0.26 && ny < 0.56) return true
    if (nx > 0.74 && ny < 0.56) return true
  }

  if (ny >= 0.68 && ny < 0.93) {
    const spread = 0.07 + (ny - 0.68) * 0.04
    if (Math.abs(nx - 0.44) < spread || Math.abs(nx - 0.56) < spread) return true
  }

  return false
}

/** 0 = deep interior, 1 = near silhouette edge (for opacity + size falloff). */
export function portraitInteriorWeight(nx: number, ny: number): number {
  if (!inPortraitSilhouette(nx, ny)) return 0

  const samples = [
    [0, 0],
    [0.02, 0],
    [-0.02, 0],
    [0, 0.02],
    [0, -0.02],
    [0.03, 0.03],
    [-0.03, -0.02],
  ]
  let edgeHits = 0
  for (const [dx, dy] of samples) {
    if (!inPortraitSilhouette(nx + dx, ny + dy)) edgeHits += 1
  }

  const edgeFactor = edgeHits / samples.length
  const centerBias =
    1 - Math.min(1, Math.hypot(nx - 0.5, ny - 0.38) / 0.42)

  return Math.min(1, centerBias * 0.65 + (1 - edgeFactor) * 0.35)
}

export function categoryForPosition(x: number, y: number): WorldCategory {
  if (x < 42 && y < 46) return 'fashion'
  if (x < 50 && y < 58) return 'watching'
  if (x >= 50 && y < 54) return 'music'
  if (x >= 52 && y >= 54) return 'life'
  if (y >= 58) return 'life'
  if (x >= 48) return 'music'
  return 'watching'
}

export function scatterShardAllowed(nx: number, ny: number): boolean {
  if (inPortraitSilhouette(nx, ny)) return false
  const dist = Math.hypot(nx - 0.5, ny - 0.45)
  return dist > 0.38 && dist < 0.62
}
