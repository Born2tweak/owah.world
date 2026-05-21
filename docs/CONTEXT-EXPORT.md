# OWAH.WORLD — Context Export (≤8000 chars)
**Updated:** 2026-05-20 · Paste whole file into new sessions · Refresh with `CURRENT_STATE.md` / `ACTIVE_BUGS.md`

## Project
Personal “living OS” site — four chrome/glass worlds (Landing, Code, Words, World), not a portfolio. **Stack:** Next.js 15 App Router, React 19, R3F/Three, Framer Motion, Zustand, Tailwind 4; GSAP planned for Code. **Repo:** `owah.world-1`

## Milestone
| | |
|---|---|
| **Phase** | **1 Landing** — code-complete, **browser QA not signed off** |
| **Next** | Phase 2 `/code` synthwave grid + pillars + GSAP scroll |
| **Build** | `npm run build` + `tsc --noEmit` clean |

**Routes:** `/` working (CDScene `dynamic` ssr:false + manifesto) · `/code` `/words` `/world` stubs

**Phases:** 0 Foundation → **1 Landing** → 2 Code → 3 Words → 4 World → 5 Live Data → 6 Polish. Detail: `docs/04-ROADMAP.md`, `docs/01-PRD.md`

## Global layout (never duplicate in pages)
`layout.tsx` → ChromeBackground, CornerHUD, TopNav (`Link /`), PageTransition (one AnimatePresence, pathname key), Dock (CODE/WORDS/WORLD only — home is TopNav)

## Landing 3D (`src/components/landing/CDScene/`)
Root: `CDScene.tsx` → `WebGLCanvas` + `CanvasErrorBoundary` (webglcontextlost handlers)
→ Environment studio, lights, **ArchitecturalFraming** (inline: ChromeBlade, CrystalShard, ChromeSliver, TealLaser, ReflectiveFloor), **CDMesh**, EffectComposer (Bloom, CA, Vignette). Camera `[0,0,10.5]` fov 39. `LaserGrid.tsx` on disk — verify import before use; `CURRENT_STATE.md` may describe older tree.

## CDMesh invariants (`CDMesh.tsx`) — DO NOT BREAK
- `frontMaterial.map = texture` **required** (WATTBA visible)
- `transmission: 0.58` on front **intentional** (tint through disc)
- Label: Canvas 2D 2048², **Syncopate 700** after fonts.ready; hub = dark metal, no transmission
- `SYSTEM_OWNERSHIP.md` “no transmission” is **stale** — trust code + BUG-003

## Visual (quick)
Near-black chrome `#06080d`, teal landing accent `#00c4a8` / lasers `#00ddb8`. Fonts: Syncopate, Space Grotesk, JetBrains Mono. Glass: `LiquidGlass` (Dock=heavy). Full: `VISUAL_LANGUAGE.md`

## Ownership
| Area | Owner |
|------|--------|
| layout, ChromeBackground, TopNav, Dock, PageTransition, CornerHUD, tokens.css | Architecture |
| page.tsx, CDScene/*, cd.store.ts | CD/Visual |
| code/words/world stubs | TBD feature agents |

Rules: `SYSTEM_OWNERSHIP.md`

## Bugs
| ID | Status |
|----|--------|
| BUG-002 | Mitigated: WebGLCanvas + error boundary — device QA |
| BUG-003 | By design: map + transmission 0.58 |
| BUG-007 | Partial: Dock CSS ≤390px — verify phone |
| BUG-008 | Accepted: CD remount ~200–400ms on return `/` (Phase 6) |

**Drift:** CURRENT_STATE sparkle Dock / old scene tree may ≠ code; README is Vite boilerplate; ignore. `ACTIVE_BUGS.md`

## Phase 1 browser QA (gate before Phase 2)
CD texture+transmission, drag, framing/crystals/lasers, floor mirror, TopNav home, Dock nav×3, manifesto panel, CornerHUD+GPS, transitions 150/300ms, optional WebGL recovery UI

## Commands
`npm run dev` · `npm run build` · `npm run lint` · `npx tsc --noEmit`

## Next work
1. Browser QA → update CURRENT_STATE  
2. Reconcile docs vs CDScene/Dock code  
3. Phase 2 SynthwaveScene / GridFloor / projects.json / ScrollTrigger  
4. Optional: Playwright smoke, fix README

## Agents
`.agent/rules/cross-agent-protocol.md` · `.autoclaw/orchestrator/comms/` · MAteam scratch `.autoclaw/mateam/scratch/<id>/` on demand

## Sources (deep dive)
`CURRENT_STATE.md` · `ACTIVE_BUGS.md` · `SYSTEM_OWNERSHIP.md` · `VISUAL_LANGUAGE.md` · `CHANGELOG.md` · `docs/01-PRD.md` · `docs/02-ARCHITECTURE.md` · `docs/03-AI-RULES.md` · `docs/04-ROADMAP.md`

**Maintain:** On phase/bug/arch change → update canonical docs + this file + Last updated.
