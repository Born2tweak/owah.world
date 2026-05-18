# CURRENT STATE
_Last updated: 2026-05-18_

---

## Phase 1 Status: COMPLETE (pending browser visual QA)

### Routes
| Route | Status | Notes |
|-------|--------|-------|
| `/` | Working | CD scene, description overlay |
| `/code` | Stub | Placeholder text, `--accent-code` color |
| `/words` | Stub | Placeholder text |
| `/world` | Stub | Placeholder text |

### Build
- `npx tsc --noEmit` — 0 errors
- Dev server: `http://localhost:3000`

---

## Scene Composition (Landing `/`)

```
layout.tsx
├── ChromeBackground       (2D canvas, fixed, z=0)
├── TopNav                 (fixed top, z=30, "OWAH.WORLD" → Link href="/")
├── PageTransition         (AnimatePresence, mode="wait", keyed by pathname)
│   └── page.tsx
│       ├── CDScene (SSR-disabled via next/dynamic)
│       │   └── Canvas (R3F, camera z=7, fov=42, toneMapping=3, exposure=2.2)
│       │       ├── ambientLight (intensity 2.5, #d0e4f8)
│       │       ├── directionalLight × 3
│       │       ├── pointLight × 2
│       │       ├── Environment preset="dawn"
│       │       ├── ChromeShards (55 shards, inline — golden angle placement)
│       │       ├── CDMesh (ShapeGeometry disc, drag/inertia)
│       │       ├── LaserGrid (gridHelper 80×40, scrolls Z)
│       │       └── LaserBeam × 3 (sweeping green lines)
│       └── Description overlay (glass panel, fixed bottom: 140, zIndex: 10)
└── Dock (Code / Words·Philosophy / World, z=30)
```

---

## CD Material State (CDMesh.tsx)

### frontMaterial — WATTBA artwork side
```
map: texture              ← CRITICAL: artwork visible
metalness: 0
roughness: 0.06
iridescence: 1.0
iridescenceIOR: 2.2
iridescenceThicknessRange: [100, 600]
envMapIntensity: 2.5
clearcoat: 1.0
clearcoatRoughness: 0.01
side: FrontSide
```
**INVARIANT: NO `transmission` on frontMaterial** — breaks artwork visibility

### backMaterial — iridescent chrome
```
metalness: 1.0, roughness: 0.04, iridescence: 1.0, side: BackSide
```

### rimMaterial — outer/inner cylinder edge
```
metalness: 0.98, roughness: 0.05, clearcoat: 1.0, side: DoubleSide
rotation=[π/2, 0, 0] to orient cylinder axis along Z
```

### hubMaterial — center ring
```
transmission: 0.8, opacity: 0.15, side: DoubleSide
(transmission OK here — hub ring is meant to be glass-like)
```

---

## Runtime Behavior

- CD: slow Y spin (velocity.y = 0.003), sinusoidal x-tilt (0.35hz), floats on Y
- CD drag: pointer events, velocity/inertia, scale 1.05 while grabbed
- Chrome shards: rotate.z = t*0.02, rotate.y = sin(t*0.1)*0.08
- LaserGrid: scrolls forward `position.z = (t * 0.8) % 2`
- ChromeBackground (2D): specular band oscillates, vignette always on
- PageTransition: 150ms exit (flash + desaturate) → 300ms enter (fade + resaturate)

---

## Confirmed Working (code audit — awaiting browser verify)
- [x] CDMesh `map: texture` (no transmission on front face)
- [x] CD ShapeGeometry with center hole (correct disc shape)
- [x] Rim cylinders rotation=[π/2,0,0]
- [x] Drag + velocity/inertia interaction
- [x] LaserGrid floor scrolling
- [x] Chrome shards background
- [x] TopNav "OWAH.WORLD" links to "/"
- [x] Dock links to /code, /words, /world (active state via usePathname)
- [x] PageTransition AnimatePresence
- [x] No duplicate TopNav/Dock in page.tsx
- [x] TypeScript: 0 errors

## Pending Browser Verification
- [ ] WATTBA texture renders visibly on CD front
- [ ] CD drag interaction responsive
- [ ] Laser grid visible below CD
- [ ] No blank screen / WebGL context loss
- [ ] TopNav renders "OWAH.WORLD" with green dot separator
- [ ] Dock navigation → /code → /words → /world → home all work
- [ ] Page transitions smooth (no flash/glitch)

---

## Known Orphaned Files
- `src/components/landing/CDScene/ChromeEnvironment.tsx` — NOT imported, safe to delete
  - Contains 60 chrome shards + 3 laser beams — superseded by CDScene.tsx inline
  - Has a memory leak: MeshPhysicalMaterial created in render body without useMemo
