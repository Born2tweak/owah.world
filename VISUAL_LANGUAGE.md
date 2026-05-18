# VISUAL LANGUAGE
_Canonical design reference — read before touching any visual system_

---

## Core Aesthetic

> experimental luxury interface + music-tech installation + interactive digital artifact

**Not:** generic glassmorphism, startup SaaS, flat design, cheap AI-generated appearance  
**Yes:** cinematic, futuristic, premium, refined, immersive, spatially deep

---

## Atmosphere

- **Base color:** Near-black chrome `#06080d` (not pure black — has a slight metallic blue-green)
- **Mood:** Inside a chrome recording studio / music installation at night
- **Light sources:** High-contrast specular bands, NOT soft ambient washes
- **Depth:** Vignette darkens corners. Shards recede to z=-26. CD floats in mid-ground.
- **Never:** flat backgrounds, gradients from UI frameworks, light mode

---

## Color System

### Global chrome palette (tokens.css)
```
--chrome-base:    #c0c0c0  (mid-chrome)
--chrome-light:   #e8e8e8  (highlights)
--chrome-dark:    #808080  (shadows)
--chrome-deeper:  #404040  (deep shadow)
```

### Section accent colors — exclusive, never mixed across sections
| Section | Token | Value | Feel |
|---------|-------|-------|------|
| Landing | `--accent-landing` | `#00ff88` | Neon laser green |
| Code | `--accent-code` | `#4400ff` | Electric violet |
| Words | `--accent-words` | `#8b4513` | Burnt manuscript amber |
| World | `--accent-world` | `#00bfff` | Deep sky blue |

The landing accent (`#00ff88`) is used for: laser beams, laser grid, dot separator in "OWAH·WORLD", active states.

---

## Typography

| Token | Fonts | Usage |
|-------|-------|-------|
| `--font-title` | Syne, Space Grotesk | TopNav wordmark, hero headings |
| `--font-display` | Space Grotesk, Inter | Body UI, description overlays |
| `--font-mono` | JetBrains Mono, Fira Code | Code page, labels, data readouts |

**Style rules:**
- ALL CAPS with wide letter-spacing (0.25–0.40em) for wordmark/labels
- Small text: 11–14px, tight line-height
- Hierarchy via font-weight (700 for OWAH, 400 for WORLD in the wordmark)

---

## Glass System (LiquidGlass)

Three tiers — use the right tier for the context:

| Variant | BG | Blur | Border | Use |
|---------|-----|------|--------|-----|
| light | rgba(255,255,255,0.04) | 10px | 0.10 opacity | Minimal overlays |
| default | rgba(255,255,255,0.08) | 20px | 0.20 opacity | Description panels |
| heavy | rgba(255,255,255,0.14) | 40px | 0.32 opacity | Dock pills, modals |

**Always include:** top inset highlight `0 1px 0 rgba(255,255,255,0.3) inset`  
**Dark glass variant** (TopNav): `rgba(8,12,20,0.45)` bg — for elements that sit over bright content

**Never:** solid fills, white backgrounds, colored glass tints

---

## 3D Scene — Landing

### CD Disc
- Shape: ShapeGeometry (2.5r outer), hole (0.22r inner) — NOT a BoxGeometry or CylinderGeometry
- Front: printed artwork (`map: texture`). NEVER use `transmission` on front face.
- Back: iridescent chrome (metalness=1.0, iridescence=1.0)
- Rim: CylinderGeometry + `rotation=[π/2,0,0]` (cylinder axis = Z axis = disc edge)
- Hub center ring: transmission=0.8 (glass hub is intentional)
- Tilt: always at slight angle so edge is visible (x-axis rock ±0.18rad)

### Lighting philosophy
- Bright total environment (ambientLight 2.5 + directional fills) — chrome surfaces need light to reflect
- Dawn environment preset — airy, makes iridescence pop
- Point light `#00ff88` below CD — uplight from the laser floor
- NO ContactShadows (expensive FBO, disabled for headless stability)

### Chrome Shards (background layer)
- 55 thin boxGeometry meshes, metalness=0.98, no roughness
- Placed z=-6 to z=-26 (strictly behind CD)
- Slow drift rotation (z * 0.02, y * sin)
- Purpose: fragmented chrome reflections, abstract depth

### Laser System
- Floor grid: gridHelper, neon green `#00ff88` / dark `#003316`
- Grid scrolls forward: `position.z = (t * 0.8) % 2`
- 3 sweeping laser beams: thin boxGeometry, sinusoidal rotation, opacity 0.85

---

## Motion Language

| Motion | Duration | Easing |
|--------|----------|--------|
| Page exit | 150ms | ease-out `[0,0,0.2,1]` |
| Page enter | 300ms | smooth `[0.4,0,0.2,1]` |
| Page exit effect | brightness×1.4 + desaturate | — |
| Page enter effect | opacity 0→1 + resaturate | — |
| CD hover scale | lerp 0.1 to 1.02 | per-frame |
| CD grab scale | lerp 0.1 to 1.05 | per-frame |
| CD idle tilt | sin(t*0.35)*0.18 rad | continuous |
| Shard drift | rotation.z = t*0.02 | continuous |

**Spring easing** `--ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1)` — for UI pop-in animations

---

## What This Must Never Become
- A generic portfolio/resume site
- A startup landing page with hero sections
- Floating glassmorphism cards on white
- Dark mode toggle UI
- Anything that looks like a Tailwind template
- Soft, pastel, or friendly — the aesthetic is precise and cold
