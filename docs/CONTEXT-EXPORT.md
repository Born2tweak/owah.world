# OWAH.WORLD — Context Export (≤8000 chars)
**Updated:** 2026-06-03 · Paste whole file into new sessions · See also `AGENTS.md`, `CURRENT_STATE.md`, `ACTIVE_BUGS.md`

## Project
Personal “living OS” site — four chrome/glass worlds (Landing, Code, Words, World). **Stack:** Next.js 15 App Router, React 19, R3F/Three, Framer Motion, Zustand, Tailwind 4. **Repo:** `owah.world-1` · **Remote:** `Born2tweak/owah.world` (`master`) · **Prod:** https://owah-world.vercel.app

## Milestone
| | |
|---|---|
| **Phase** | **4 World** — M2B on `origin/master` (`3efde14`); **local WIP: M2C Redux** (portrait readability, uncommitted) |
| **World canon** | Organic translucent gradient fragments in bust silhouette — **no** pasted images, memory-tile cards, texture crops, or M2C–M2F hero experiments |
| **Next** | Browser QA M2C Redux → commit if approved → room hotspots / real assets later (no APIs) |
| **Build** | `npm run build` + `npx tsc --noEmit` clean |

**Routes:** `/` landing (3D CD) · `/code` 3D pillars + modal · `/words` text-first archive + viewer images · `/world` **WorldScene** (mosaic + drawer)

**Phases:** 0–2 done · **3 Words** (skeleton+assets) · **4 World (M2B + M2C readability)** · 5 Live Data → 6 Polish. `docs/04-ROADMAP.md`

## Global layout (never duplicate in pages)
`layout.tsx` → ChromeBackground, CornerHUD, TopNav (`Link /`), PageTransition (pathname key; landing-only enter fade), Dock (CODE/WORDS/WORLD)

## PageTransition
Two-layer: content scale/dim/blur + route-accent field flash (`--accent-code|words|world|landing`). Crystal field **landing only**. Non-landing routes must not SSR at opacity 0.

## Code (`src/components/code/`)
`CodePageClient` → `CodeWorld` / `GridFloor` / pillars from `projects.ts` / `ScrollRig` / `ProjectModal`. Input nav + modal fixes on `master` (`ead4cb8`).

## World (`src/components/world/`) — **M2B + local M2C Redux**
`WorldScene`: sidebar (category hints) + `FigureMosaic` + `ContentDrawer`.

**M2B (shipped `3efde14`):** `portraitMask` + `mosaicFragments` organic fills; `useMosaicSelection` + `mosaicNeighbors`; Framer Motion hover glow, neighbor illumination, click focus/zoom, drawer, return. No APIs; no layout-shell edits.

**Rejected (rolled back):** `public/world/*` textures, `src/content/world/*` memory tiles, category zones, placeholder cards, Spotify/Pinterest/Letterboxd UI.

**M2C Redux (local, 2026-06-03):** Bust silhouette reads as person at distance — wider shoulders, larger head/hair, face-weighted density; no legs/arm sticks; scatter 48 (was 72), biased body placement toward head/shoulders; seed `42858`. Files: `portraitMask.ts`, `mosaicFragments.ts`, `FigureMosaic.module.css` (backdrop only). **Interactions unchanged.**

**Do not:** redesign page, add dashboards, image fragments, or APIs.

## Words (`src/components/words/WordsDesktopSkeleton.tsx`)
Text-first cards; images in excerpt viewer + full-text modal only (`public/words/archive/`). Hide broken images.

## Landing (`src/components/landing/CDScene/`)
`CDMesh`: `map: texture` + `transmission: 0.58` intentional. `CanvasErrorBoundary` + context-loss handlers.

## Visual (quick)
Near-black chrome `#06080d`, teal accents. Fonts: Syncopate, Space Grotesk, JetBrains Mono. `VISUAL_LANGUAGE.md`

## Ownership
| Area | Owner |
|------|--------|
| layout shell, tokens | Architecture |
| CDScene, CodeWorld | CD/Visual |
| WordsDesktopSkeleton | Words |
| WorldScene, FigureMosaic, ContentDrawer | World |

`SYSTEM_OWNERSHIP.md`

## Bugs / ops
| ID | Status |
|----|--------|
| BUG-002 | Mitigated WebGL loss — device QA |
| BUG-003 | By design: CD map + transmission |
| BUG-007 | Dock mobile — verify |
| BUG-008 | Accepted: CD remount on `/` return |
| **Dev** | Corrupt `.next` → CSS 404, unstyled HUD-only page, `Cannot find module './79.js'` — **`npm run dev:clean`** or delete `.next` + `npm run dev`; hard-refresh **`/world`** |

## Agent memory
Root **`AGENTS.md`** — learned prefs (commit only when asked, M2B world direction, CONTEXT-EXPORT ≤8k, scoped milestones). Index: `.cursor/hooks/state/continual-learning-index.json`

## Commands
`npm run dev` · **`npm run dev:clean`** (wipe `.next` + dev) · `npm run build` · `npx tsc --noEmit`

## Next work
1. QA **http://localhost:3000/world** — M2C bust readability + M2B interactions intact
2. Commit M2C Redux if approved (not pushed yet)
3. Words: Fall of Rome / philosophy boxes (roadmap)
4. Landing: Phase 1 browser QA + Crystalline OS refinements

## Agents / orchestration
`.claude/rules/cross-agent-protocol.md` · `.autoclaw/orchestrator/comms/` · `.cursorrules` (Merge CLI)

## Sources
`CURRENT_STATE.md` (may lag) · `ACTIVE_BUGS.md` · `CHANGELOG.md` · `docs/01-PRD.md` · `docs/04-ROADMAP.md`

**Maintain:** phase/bug/arch change → update this file + canonical docs + date.
