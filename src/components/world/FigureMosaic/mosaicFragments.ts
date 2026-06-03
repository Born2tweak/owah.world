import type { MosaicFragment } from '../world.types'
import {
  categoryForPosition,
  inPortraitSilhouette,
  portraitInteriorWeight,
  scatterShardAllowed,
} from './portraitMask'

const TARGET_BODY = 420
const TARGET_SCATTER = 72
const MAX_ATTEMPTS = 14000

function createRng(seed: number) {
  let state = seed % 2147483646
  return () => {
    state = (state * 16807) % 2147483647
    return (state - 1) / 2147483646
  }
}

function pickSize(rand: () => number, weight: number, scatter: boolean): { w: number; h: number } {
  const base = scatter ? 1.2 + rand() * 2.8 : 1.6 + rand() * 5.2 * (0.55 + weight * 0.65)
  const aspect = 0.55 + rand() * 0.9
  const w = base * aspect
  const h = base / aspect
  return { w, h }
}

type Placed = { cx: number; cy: number; r: number }

function tooClose(placed: Placed[], cx: number, cy: number, r: number): boolean {
  for (const p of placed) {
    const dist = Math.hypot(p.cx - cx, p.cy - cy)
    if (dist < (p.r + r) * 0.52) return true
  }
  return false
}

export function buildMosaicFragments(): MosaicFragment[] {
  const rand = createRng(42857)
  const fragments: MosaicFragment[] = []
  const placed: Placed[] = []
  let attempts = 0
  let bodyCount = 0
  let scatterCount = 0

  while (attempts < MAX_ATTEMPTS && (bodyCount < TARGET_BODY || scatterCount < TARGET_SCATTER)) {
    attempts += 1

    const scatter =
      bodyCount >= TARGET_BODY || (scatterCount < TARGET_SCATTER && rand() < 0.22)
    const nx = scatter ? 0.08 + rand() * 0.84 : 0.14 + rand() * 0.72
    const ny = scatter ? 0.06 + rand() * 0.9 : 0.05 + rand() * 0.9

    if (scatter) {
      if (!scatterShardAllowed(nx, ny)) continue
    } else if (!inPortraitSilhouette(nx, ny)) {
      continue
    }

    const weight = scatter ? 0.2 : portraitInteriorWeight(nx, ny)
    const { w, h } = pickSize(rand, weight, scatter)
    const cx = nx * 100
    const cy = ny * 100
    const x = cx - w / 2 + (rand() - 0.5) * (scatter ? 2.4 : 1.6)
    const y = cy - h / 2 + (rand() - 0.5) * (scatter ? 2.4 : 1.6)

    if (x < -2 || y < -2 || x + w > 102 || y + h > 102) continue

    const r = Math.max(w, h) * 0.5
    if (tooClose(placed, cx, cy, r)) continue

    placed.push({ cx, cy, r })
    const gridRow = Math.round(ny * 52)
    const gridCol = Math.round(nx * 40)
    const index = fragments.length

    fragments.push({
      id: `tile-${gridRow}-${gridCol}-${index}`,
      x,
      y,
      width: w,
      height: h,
      category: categoryForPosition(cx, cy),
      gridRow,
      gridCol,
      opacity: scatter ? 0.22 + rand() * 0.22 : 0.42 + weight * 0.48 + rand() * 0.12,
      depth: Math.floor(rand() * 6),
      rotate: (rand() - 0.5) * (scatter ? 22 : 14),
      borderRadius: scatter ? 1 + rand() * 2 : 0.5 + rand() * 3.5,
    })

    if (scatter) scatterCount += 1
    else bodyCount += 1
  }

  return fragments
}

export const MOSAIC_FRAGMENTS = buildMosaicFragments()
