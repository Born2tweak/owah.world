// Assembles the 8s landing hero promo from raw clips (scripts/hero/raw) into:
//   public/hero/owah-hero-16x9.mp4 (+ .webm), owah-hero-poster.jpg
// Landing only — the CD turning through all angles/reflections. Silent, ~8s.

import { spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { mkdirSync, existsSync, rmSync } from 'node:fs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..', '..')
const RAW = join(__dirname, 'raw')
const SEG = join(__dirname, 'seg')
const OUT = join(ROOT, 'public', 'hero')
const T = 0.4 // crossfade seconds

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

// 8s landing cut: brief brand open -> CD rotation showcase (dominant) -> URL close.
// `speed` < 1 slows, > 1 speeds the clip via setpts before trimming.
const SEQUENCE = [
  { clip: 'card-open-h', ss: 0.15, dur: 1.4 },
  { clip: 'scene-landing', ss: 7.0, dur: 5.6, scene: true, speed: 1.15 },
  { clip: 'card-close-h', ss: 0.15, dur: 1.8 },
]

const VF_BASE = 'scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080,fps=30'

function render() {
  const segs = SEQUENCE.map((b, i) => {
    const seg = join(SEG, `h-${i}.mp4`)
    const pts = b.speed && b.speed !== 1 ? `,setpts=${(1 / b.speed).toFixed(4)}*PTS` : ''
    const vf = `${VF_BASE}${pts},tpad=stop_mode=clone:stop_duration=4,format=yuv420p,setsar=1`
    ff(['-ss', String(b.ss), '-i', join(RAW, `${b.clip}.webm`), '-an', '-vf', vf, '-t', String(b.dur),
        '-c:v', 'libx264', '-preset', 'fast', '-crf', '16', seg])
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
  filter += `[vx]fade=t=in:st=0:d=0.3,fade=t=out:st=${(total - 0.4).toFixed(3)}:d=0.4[v]`

  const inputs = segs.flatMap((s) => ['-i', s])
  const out = join(OUT, 'owah-hero-16x9.mp4')
  ff([...inputs, '-filter_complex', filter, '-map', '[v]', '-an',
      '-c:v', 'libx264', '-profile:v', 'high', '-pix_fmt', 'yuv420p', '-crf', '19', '-preset', 'slow',
      '-movflags', '+faststart', out])
  console.log(`  ✓ owah-hero-16x9.mp4  (${probeDur(out).toFixed(2)}s)`)
  return out
}

console.log('Building 8s landing hero…')
const master = render()
ff(['-i', master, '-an', '-c:v', 'libvpx-vp9', '-crf', '32', '-b:v', '0', '-row-mt', '1', join(OUT, 'owah-hero-16x9.webm')])
ff(['-ss', '3.0', '-i', master, '-frames:v', '1', '-q:v', '3', join(OUT, 'owah-hero-poster.jpg')])

rmSync(SEG, { recursive: true, force: true })
console.log('Done → public/hero/owah-hero-16x9.mp4 (+ webm, poster)')
