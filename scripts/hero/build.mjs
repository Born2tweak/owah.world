// Assembles the hero promo from raw clips (scripts/hero/raw) into:
//   public/hero/owah-hero-16x9.mp4 (+ .webm), owah-hero-9x16.mp4, owah-hero-poster.jpg
// Silent, ~12s, loop-friendly. Requires ffmpeg on PATH.

import { spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { mkdirSync, existsSync, rmSync } from 'node:fs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..', '..')
const RAW = join(__dirname, 'raw')
const SEG = join(__dirname, 'seg')
const OUT = join(ROOT, 'public', 'hero')
const T = 0.45 // crossfade seconds

for (const d of [SEG, OUT]) {
  if (d === SEG && existsSync(SEG)) rmSync(SEG, { recursive: true, force: true })
  mkdirSync(d, { recursive: true })
}

function ff(args) {
  const r = spawnSync('ffmpeg', ['-y', '-hide_banner', '-loglevel', 'error', ...args], { stdio: 'inherit' })
  if (r.status !== 0) throw new Error('ffmpeg failed: ' + args.join(' '))
}
function probeDur(file) {
  const r = spawnSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', file], { encoding: 'utf8' })
  return parseFloat(r.stdout.trim())
}

// beat = { clip, ss, dur }  (clip is the raw basename without extension; orientation suffix added per render)
const SEQUENCE = [
  { clip: 'card-open', ss: 0.15, dur: 2.4 },
  { clip: 'scene-landing', ss: 5.5, dur: 3.4, scene: true },
  { clip: 'card-words', ss: 0.15, dur: 1.7 },
  { clip: 'scene-words', ss: 5.0, dur: 3.6, scene: true },
  { clip: 'card-close', ss: 0.15, dur: 2.4 },
]

function vf(orient, scene) {
  const pad = 'tpad=stop_mode=clone:stop_duration=4'
  if (orient === 'h') {
    return `scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080,fps=30,${pad},format=yuv420p,setsar=1`
  }
  // 9:16
  if (scene) {
    return `crop=608:1080:656:0,scale=1080:1920,fps=30,${pad},format=yuv420p,setsar=1`
  }
  return `scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,fps=30,${pad},format=yuv420p,setsar=1`
}

function render(orient, outName) {
  const W = orient === 'h' ? 1920 : 1080
  const Hh = orient === 'h' ? 1080 : 1920
  // 1) normalize each beat to a fixed-length segment
  const segs = SEQUENCE.map((b, i) => {
    const src = b.scene ? `${b.clip}.webm` : `${b.clip}-${orient}.webm`
    const seg = join(SEG, `${orient}-${i}.mp4`)
    ff(['-ss', String(b.ss), '-i', join(RAW, src), '-an', '-vf', vf(orient, b.scene), '-t', String(b.dur),
        '-c:v', 'libx264', '-preset', 'fast', '-crf', '16', seg])
    return seg
  })
  // 2) xfade chain
  const durs = SEQUENCE.map((b) => b.dur)
  let filter = ''
  let prev = '0:v'
  let acc = durs[0]
  for (let i = 1; i < segs.length; i++) {
    const off = (acc - T).toFixed(3)
    const out = i === segs.length - 1 ? 'vx' : `x${i}`
    filter += `[${prev}][${i}:v]xfade=transition=fade:duration=${T}:offset=${off}[${out}];`
    prev = out
    acc = acc + durs[i] - T
  }
  const total = acc
  filter += `[vx]fade=t=in:st=0:d=0.35,fade=t=out:st=${(total - 0.4).toFixed(3)}:d=0.4[v]`
  const inputs = segs.flatMap((s) => ['-i', s])
  const out = join(OUT, outName)
  ff([...inputs, '-filter_complex', filter, '-map', '[v]', '-an',
      '-c:v', 'libx264', '-profile:v', 'high', '-pix_fmt', 'yuv420p', '-crf', '19', '-preset', 'slow',
      '-movflags', '+faststart', out])
  console.log(`  ✓ ${outName}  (${probeDur(out).toFixed(2)}s, ${W}x${Hh})`)
  return out
}

console.log('Building 16:9 master…')
const master = render('h', 'owah-hero-16x9.mp4')

console.log('Building 9:16…')
render('v', 'owah-hero-9x16.mp4')

console.log('WebM + poster…')
ff(['-i', master, '-an', '-c:v', 'libvpx-vp9', '-crf', '32', '-b:v', '0', '-row-mt', '1', join(OUT, 'owah-hero-16x9.webm')])
ff(['-ss', '1.2', '-i', master, '-frames:v', '1', '-q:v', '3', join(OUT, 'owah-hero-poster.jpg')])

rmSync(SEG, { recursive: true, force: true })
console.log('\nDone → public/hero/')
