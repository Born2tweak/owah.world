// Captures raw hero footage: live OWAH.WORLD 3D scenes + brand title cards.
// Output: scripts/hero/raw/*.webm  (consumed by build.mjs)
//
// Usage:
//   node scripts/hero/capture.mjs            (captures everything, target = https://owah.world)
//   TARGET=http://localhost:3000 node scripts/hero/capture.mjs
//   HEADLESS=1 node scripts/hero/capture.mjs  (fallback if headed display is unavailable)

import { chromium } from 'playwright'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { dirname, join } from 'node:path'
import { mkdirSync, existsSync, rmSync, renameSync, readdirSync } from 'node:fs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const RAW = join(__dirname, 'raw')
const CARD = pathToFileURL(join(__dirname, 'card.html')).href
const TARGET = process.env.TARGET || 'https://owah.world'
const HEADLESS = process.env.HEADLESS === '1'
const CHANNEL = process.env.CHANNEL || '' // e.g. 'chrome' for full-GPU WebGL/postprocessing
const ONLY = (process.env.SCENES || '').split(',').map((s) => s.trim()).filter(Boolean)
const want = (name) => ONLY.length === 0 || ONLY.includes(name)

const H = { width: 1920, height: 1080 }
const V = { width: 1080, height: 1920 }

const ACCENT = { code: '#28fff0', words: '#9a7bff', world: '#e8a24a', neutral: '#28fff0' }

// keep existing clips when capturing a subset (SCENES=...), else start fresh
if (ONLY.length === 0 && existsSync(RAW)) rmSync(RAW, { recursive: true, force: true })
mkdirSync(RAW, { recursive: true })

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

const browser = await chromium.launch({
  headless: HEADLESS,
  ...(CHANNEL ? { channel: CHANNEL } : {}),
  args: [
    '--use-gl=angle',
    '--use-angle=default',
    '--ignore-gpu-blocklist',
    '--enable-gpu-rasterization',
    '--enable-webgl',
    '--hide-scrollbars',
  ],
})

/** Record one clip: open a fresh context, run fn(page), close, save webm as <name>.webm */
async function record(name, size, fn) {
  const context = await browser.newContext({
    viewport: size,
    deviceScaleFactor: 1,
    recordVideo: { dir: RAW, size },
  })
  const page = await context.newPage()
  const video = page.video()
  try {
    await fn(page)
  } catch (err) {
    console.warn(`  ! ${name}: ${err.message}`)
  }
  await context.close()
  const src = await video.path()
  const dst = join(RAW, `${name}.webm`)
  if (existsSync(dst)) rmSync(dst)
  renameSync(src, dst)
  console.log(`  ✓ ${name}.webm`)
}

async function card(page, { eyebrow = '', title, sub = '', accent = ACCENT.neutral, orient = 'h', hold = 2600 }) {
  const qs = new URLSearchParams({ eyebrow, title, sub, accent, orient }).toString()
  await page.goto(`${CARD}?${qs}`)
  await page.waitForTimeout(hold)
}

async function gotoScene(page, path) {
  await page.goto(`${TARGET}${path}`, { waitUntil: 'domcontentloaded' })
  // wait for the R3F canvas, then let the heavy scene settle
  await page.waitForSelector('canvas', { timeout: 30000 }).catch(() => {})
  await sleep(path === '/words' ? 7000 : 4500)
}

async function dragCD(page) {
  const cx = H.width / 2
  const cy = H.height / 2
  await page.mouse.move(cx + 40, cy)
  await page.mouse.down()
  for (let i = 0; i < 24; i++) {
    await page.mouse.move(cx + 40 - i * 6, cy + Math.sin(i / 4) * 18)
    await sleep(40)
  }
  await page.mouse.up()
}

console.log(`Capturing from ${TARGET} (headless=${HEADLESS})`)

// ---- Title cards (both orientations) ----
for (const [orient, size] of want('cards') || ONLY.length === 0 ? [['h', H], ['v', V]] : []) {
  await record(`card-open-${orient}`, size, (p) =>
    card(p, { eyebrow: 'A LIVING DIGITAL WORLD', title: 'OWAH|.WORLD', sub: 'memory · code · culture', orient, hold: 2700 }),
  )
  await record(`card-close-${orient}`, size, (p) =>
    card(p, { eyebrow: 'NOW LIVE', title: 'owah|.world', sub: 'Enter the system', orient, hold: 2600 }),
  )
  await record(`card-words-${orient}`, size, (p) =>
    card(p, { eyebrow: 'THE ARCHIVE OF INFLUENCE', title: 'WORDS', accent: ACCENT.words, orient, hold: 1900 }),
  )
  await record(`card-world-${orient}`, size, (p) =>
    card(p, { eyebrow: 'THE SHOWROOM', title: 'WORLD', accent: ACCENT.world, orient, hold: 1900 }),
  )
  await record(`card-code-${orient}`, size, (p) =>
    card(p, { eyebrow: 'THE CHAMBER OF CREATION', title: 'CODE', accent: ACCENT.code, orient, hold: 1900 }),
  )
}

// ---- Live scenes (16:9 master; 9:16 derived in ffmpeg) ----
if (want('scene-landing'))
  await record('scene-landing', H, async (page) => {
    await gotoScene(page, '/')
    await sleep(900)
    await dragCD(page)
    await sleep(3000)
  })

if (want('scene-words'))
  await record('scene-words', H, async (page) => {
    await gotoScene(page, '/words')
    const btns = page.locator('[aria-label="Subject faces"] button')
    if (await btns.count()) {
      await btns.nth(1).click().catch(() => {})
      await sleep(2600)
      await btns.nth(2).click().catch(() => {})
    }
    await sleep(2400)
  })

if (want('scene-world'))
  await record('scene-world', H, async (page) => {
    await gotoScene(page, '/world')
    await sleep(2800) // dwell on the overview (album wall + zones in frame)
    await page.keyboard.press('ArrowRight') // -> fashion
    await sleep(1600)
    await page.keyboard.press('ArrowRight') // -> music (album wall hero)
    await sleep(3200)
  })

if (want('scene-code'))
  await record('scene-code', H, async (page) => {
    await gotoScene(page, '/code')
    await sleep(3000)
  })

await browser.close()
console.log('\nRaw clips:', readdirSync(RAW).filter((f) => f.endsWith('.webm')).join(', '))
