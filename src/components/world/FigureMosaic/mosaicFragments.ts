import type { MosaicFragment } from '../world.types'
import {
  bodyPlacementWeight,
  categoryForPosition,
  frameY,
  inPortraitSilhouette,
  portraitInteriorWeight,
  scatterShardAllowed,
} from './portraitMask'

const TARGET_BODY = 400
const TARGET_SCATTER = 22
const MAX_ATTEMPTS = 14000
const SEED = 42860

function createRng(seed: number) {
  let state = seed % 2147483646
  return () => {
    state = (state * 16807) % 2147483647
    return (state - 1) / 2147483646
  }
}

/** Stratified sampling: head mass, shoulder wings, narrow neck — not a center column. */
function sampleBodyPoint(rand: () => number): { nx: number; ny: number } {
  const zone = rand()

  if (zone < 0.4) {
    const ny = 0.1 + rand() * rand() * 0.2
    const nx = 0.5 + (rand() - 0.5) * (0.5 + rand() * 0.16)
    return { nx, ny }
  }

  if (zone < 0.78) {
    const ny = 0.4 + rand() * 0.1
    const side = rand() < 0.5 ? -1 : 1
    const nx = 0.5 + side * (0.26 + rand() * 0.2)
    return { nx, ny }
  }

  const ny = 0.3 + rand() * 0.08
  const nx = 0.5 + (rand() - 0.5) * 0.12
  return { nx, ny }
}

function pickSize(rand: () => number, weight: number, scatter: boolean): { w: number; h: number } {
  const base = scatter ? 1 + rand() * 2.2 : 1.5 + rand() * 4.8 * (0.5 + weight * 0.7)
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
  const rand = createRng(SEED)
  const fragments: MosaicFragment[] = []
  const placed: Placed[] = []
  let attempts = 0
  let bodyCount = 0
  let scatterCount = 0

  while (attempts < MAX_ATTEMPTS && (bodyCount < TARGET_BODY || scatterCount < TARGET_SCATTER)) {
    attempts += 1

    const scatter =
      bodyCount >= TARGET_BODY ||
      (scatterCount < TARGET_SCATTER && rand() < 0.12)

    let nx: number
    let ny: number

    if (scatter) {
      nx = 0.14 + rand() * 0.72
      ny = 0.12 + rand() * 0.36
      if (!scatterShardAllowed(nx, ny)) continue
    } else {
      ;({ nx, ny } = sampleBodyPoint(rand))
      if (!inPortraitSilhouette(nx, ny)) continue
      const placement = bodyPlacementWeight(nx, ny)
      if (placement <= 0.04) continue
      if (rand() > placement) continue
    }

    const weight = scatter ? 0.16 : portraitInteriorWeight(nx, ny)
    const { w, h } = pickSize(rand, weight, scatter)
    const cx = nx * 100
    const cy = frameY(ny) * 100
    const x = cx - w / 2 + (rand() - 0.5) * (scatter ? 1.8 : 1.3)
    const y = cy - h / 2 + (rand() - 0.5) * (scatter ? 1.8 : 1.3)

    if (x < -2 || y < -2 || x + w > 102 || y + h > 88) continue

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
      opacity: scatter ? 0.18 + rand() * 0.18 : 0.44 + weight * 0.46 + rand() * 0.1,
      depth: Math.floor(rand() * 6),
      rotate: (rand() - 0.5) * (scatter ? 18 : 14),
      borderRadius: scatter ? 1 + rand() * 2 : 0.5 + rand() * 3.5,
    })

    if (scatter) scatterCount += 1
    else bodyCount += 1
  }

  return fragments
}

export const MOSAIC_FRAGMENTS = buildMosaicFragments()
