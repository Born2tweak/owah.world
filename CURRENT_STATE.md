# CURRENT STATE
_Last updated: 2026-05-18_

---

## Phase 1 Status: COMPLETE (pending browser visual QA)

### Routes
| Route | Status | Notes |
|-------|--------|-------|
| `/` | Working | CD scene, description overlay, crystal field |
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
├── ChromeBackground         (2D canvas, fixed, z=0 — animated chrome specular)
├── CornerHUD                (4-corner system labels, z=--z-ui)
│   ├── TL: Globe icon + "LIVING DIGITAL WORLD"
│   ├── TR: "SYSTEM v1.0" + ONLINE pulse dot
│   ├── BL: Crosshair + "INTENT" / "REALITY" / "006"
│   └── BR: "BUILT IN CHAOS" / "REFINED BY VISION" / Crosshair / GPS coords
├── TopNav                   (fixed top center, z=--z-dock)
│   └── Glass pill → Link href="/" → "OWAH.WORLD" wordmark (teal separator)
├── PageTransition           (AnimatePresence mode="wait", 150ms exit / 300ms enter)
│   └── page.tsx
│       ├── CDScene (SSR-disabled via next/dynamic)
│       │   └── Canvas (R3F)
│       │       ├── camera: [0, 0.2, 4.5], fov=45, near=0.1, far=80
│       │       ├── gl: ACESFilmic, exposure=1.15, antialias=false
│       │       ├── dpr: [1, 1.5]
│       │       ├── fog: #010204, near=20, far=45
│       │       ├── Environment: preset="studio", background=false
│       │       ├── LIGHTS:
│       │       │   ├── spotLight [-5,16,7] intensity=45 #f2f6ff (key)
│       │       │   ├── spotLight [5,9,10] intensity=20 #e8f2ff (fill)
│       │       │   ├── spotLight [10,-6,-9] intensity=16 #1e3ba8 (cold rim)
│       │       │   ├── pointLight [0,-3,0] intensity=6 #00ddb8 d=18 (floor bounce)
│       │       │   └── ambientLight intensity=0.12 #5868a0
│       │       ├── CrystalField (22 crystal shards: oct/tet/dodec; single useFrame)
│       │       ├── ArtifactFloor (black mirror plane at y=-4.0)
│       │       ├── LaserGrid (teal #00ddb8 / dark #002e2a, scrolls z)
│       │       ├── CDMesh (ShapeGeometry disc, WATTBA texture, drag/inertia)
│       │       └── EffectComposer
│       │           ├── Bloom: threshold=0.72, intensity=0.8, mipmapBlur
│       │           ├── ChromaticAberration: offset=(0.0006, 0.0006)
│       │           └── Vignette: offset=0.10, darkness=1.25
│       └── Description panel (dark glass, teal glow border, fixed bottom=96)
└── Dock (3 pills: CODE, WORDS, WORLD; sparkle icons; z=--z-dock)
```

---

## CD Material State (CDMesh.tsx)

### frontMaterial — WATTBA artwork side
```
map: texture                 ← artwork as color tint over transmission
transmission: 0.58           ← transmissive (crystal field visible through disc)
ior: 1.585
thickness: 0.06
roughness: 0.04
metalness: 0
iridescence: 0.85
iridescenceIOR: 1.38
iridescenceThicknessRange: [160, 520]
envMapIntensity: 2.2
clearcoat: 1.0, clearcoatRoughness: 0.014
side: FrontSide
```
**INVARIANT: `map: texture` MUST stay on frontMaterial — artwork disappears without it**  
**NOTE: `transmission: 0.58` is intentional — disc transmits crystal field, tinted by artwork**

### labelTex overlay — OWAH•WORLD arced title + track rings
```
Canvas 2D texture (2048×2048), built after document.fonts.ready
Font: Syncopate 700 (canvas context)
transparent: true, depthWrite: false, polygonOffset: true
```

### shimmerRing — data track iridescence
```
ringGeometry [0.9, 2.35, 256]
iridescence: 1.0, iridescenceIOR: 1.42, opacity: 0.30
```

### backMaterial — iridescent chrome
```
metalness: 0.98, roughness: 0.032, iridescence: 0.92, side: BackSide
```

### rim/hole cylinders — machined polycarbonate edge
```
rotation=[π/2, 0, 0] — cylinder axis = Z axis (disc edge)
```

### hubMaterial — dark brushed metal center ring
```
metalness: 0.96, roughness: 0.20 — NOT glass (transmission removed from hub)
```

---

## Runtime Behavior

- CD: slow Y rotation (velocity.y = 0.0015), sinusoidal x-tilt (0.38hz × 0.055 + 0.12)
- CD float: sin(elapsed * 0.75) * 0.055 on Y axis
- CD drag: pointer events, velocity/inertia, scale lerp to 1.02 while grabbed
- CrystalField: single useFrame, group breathes (sin rotation.y + position.y)
- LaserGrid: scrolls forward `position.z = (t * 0.6) % 2`
- ChromeBackground (2D): specular band + top catch-light + moving specular point + vignette

---

## UI Layer State

### TopNav (dark glass pill, centered)
- `--nav-bg` / `--nav-border` / `--nav-blur` system tokens
- Link href="/" → OWAH.WORLD with teal separator `rgba(0,196,168,0.70)`

### Dock (3 sparkle pills)
- Items: CODE, WORDS, WORLD (HOME removed — accessed via TopNav wordmark)
- `flex-direction: row`, sparkle ✦ + label
- Teal glow: `0 0 24px rgba(0,196,168,0.06)` default, `0 0 32px rgba(0,196,168,0.12)` hover

### Description panel (dark glass, teal border)
- Background: `rgba(3,6,14,0.72)` + backdrop blur 24px
- Border: `rgba(0,196,168,0.22)` with outer teal glow
- Content: ✦ sparkle (teal), 3-line manifesto in Syncopate uppercase

### CornerHUD (4 corners, system labels)
- BL: INTENT / REALITY / 006
- BR: BUILT IN CHAOS / REFINED BY VISION / GPS 33.7490° N, 84.3880° W

---

## Confirmed Working (code audit — awaiting browser verify)
- [x] CDMesh `map: texture` on frontMaterial
- [x] CD ShapeGeometry with center hole
- [x] Rim cylinders rotation=[π/2,0,0]
- [x] Drag + velocity/inertia
- [x] CrystalField (22 shards, single useFrame)
- [x] LaserGrid teal scrolling
- [x] ArtifactFloor black mirror
- [x] TopNav glass pill → Link href="/"
- [x] Dock 3 sparkle pills (CODE/WORDS/WORLD)
- [x] CornerHUD 4 corners + GPS coords + 006
- [x] Description panel teal glow + manifesto copy
- [x] TypeScript: 0 errors
- [x] ChromeEnvironment.tsx deleted (BUG-001 closed)

## Pending Browser Verification
- [ ] WATTBA texture + crystal transmission looks correct on CD
- [ ] CD drag interaction responsive
- [ ] Crystal field visible around CD
- [ ] Laser grid visible below CD
- [ ] TopNav glass pill renders with teal separator
- [ ] Dock 3 sparkle pills — sparkle glows on hover/active
- [ ] Description panel teal border visible
- [ ] CornerHUD corner labels + GPS coordinates
- [ ] Page transitions smooth

---

## Known Orphaned Files
_None — ChromeEnvironment.tsx deleted 2026-05-18_
