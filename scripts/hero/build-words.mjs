// Assembles a dedicated Words hero film from raw clips into:
//   public/hero/words-hero-16x9.mp4 (+ .webm), words-hero-poster.jpg
// Silent, ~8s. Source clips are captured by scripts/hero/capture.mjs:
//   SCENES=cards,scene-words TARGET=http://localhost:3000 node scripts/hero/capture.mjs

import { spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { mkdirSync, existsSync, rmSync } from 'node:fs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..', '..')
const RAW = join(__dirname, 'raw')
const SEG = join(__dirname, 'seg-words')
const OUT = join(ROOT, 'public', 'hero')
const T = 0.35

if (existsSync(SEG)) rmSync(SEG, { recursive: true, force: true })
for (const d of [SEG, OUT]) mkdirSync(d, { recursive: true })

function ff(args) {
  const r = spawnSync('ffmpeg', ['-y', '-hide_banner', '-loglevel', 'error', ...args], { stdio: 'inherit' })
  if (r.status !== 0) throw new Error('ffmpeg failed: ' + args.join(' '))
}

function probeDur(file) {
  const r = spawnSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', file], { encoding: 'utf8' })
  return parseFloat(r.stdout.trim())
}

const SEQUENCE = [
  { clip: 'card-words-h', ss: 0.1, dur: 1.35 },
  { clip: 'scene-words', ss: 24.0, dur: 5.3, speed: 1.08 },
  { clip: 'card-close-h', ss: 0.15, dur: 1.55 },
]

const VF_BASE = [
  'scale=1920:1080:force_original_aspect_ratio=increase',
  'crop=1920:1080',
  'fps=30',
  'eq=contrast=1.04:saturation=1.06',
].join(',')

function render() {
  const segs = SEQUENCE.map((b, i) => {
    const seg = join(SEG, `words-${i}.mp4`)
    const pts = b.speed && b.speed !== 1 ? `,setpts=${(1 / b.speed).toFixed(4)}*PTS` : ''
    const vf = `${VF_BASE}${pts},tpad=stop_mode=clone:stop_duration=4,format=yuv420p,setsar=1`
    ff([
      '-ss', String(b.ss),
      '-i', join(RAW, `${b.clip}.webm`),
      '-an',
      '-vf', vf,
      '-t', String(b.dur),
      '-c:v', 'libx264',
      '-preset', 'fast',
      '-crf', '16',
      seg,
    ])
    return seg
  })

  const durs = SEQUENCE.map((b) => b.dur)
  let filter = ''
  let prev = '0:v'
  let acc = durs[0]
  for (let i = 1; i < segs.length; i++) {
    const out = i === segs.length - 1 ? 'vx' : `x${i}`
    filter += `[${prev}][${i}:v]xfade=transition=fade:duration=${T}:offset=${(acc - T).toFixed(3)}[${out}];`
    prev = out
    acc = acc + durs[i] - T
  }
  const total = acc
  filter += `[vx]fade=t=in:st=0:d=0.28,fade=t=out:st=${(total - 0.4).toFixed(3)}:d=0.4[v]`

  const inputs = segs.flatMap((s) => ['-i', s])
  const out = join(OUT, 'words-hero-16x9.mp4')
  ff([
    ...inputs,
    '-filter_complex', filter,
    '-map', '[v]',
    '-an',
    '-c:v', 'libx264',
    '-profile:v', 'high',
    '-pix_fmt', 'yuv420p',
    '-crf', '19',
    '-preset', 'slow',
    '-movflags', '+faststart',
    out,
  ])
  console.log(`  ✓ words-hero-16x9.mp4  (${probeDur(out).toFixed(2)}s)`)
  return out
}

console.log('Building Words hero film…')
const master = render()
ff(['-i', master, '-an', '-c:v', 'libvpx-vp9', '-crf', '32', '-b:v', '0', '-row-mt', '1', join(OUT, 'words-hero-16x9.webm')])
ff(['-ss', '3.8', '-i', master, '-frames:v', '1', '-q:v', '3', join(OUT, 'words-hero-poster.jpg')])

rmSync(SEG, { recursive: true, force: true })
console.log('Done → public/hero/words-hero-16x9.mp4 (+ webm, poster)')
