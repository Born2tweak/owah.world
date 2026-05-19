# CHANGELOG
_Most recent first — lessons learned included_

---

## 2026-05-18 — Systems Integration + Final Landing Page Polish

**Finalization Agent pass:**
- Deleted orphaned ChromeEnvironment.tsx (BUG-001 closed)
- Fixed tokens.css `--font-title` fallback: `'Syne'` → `'Syncopate'`
- Fixed CDMesh canvas font string: `Syne` → `Syncopate` (Canvas 2D uses actual font name)
- TopNav: added dark glass pill (`--nav-bg/blur/border`) to `.homeLink`, teal separator `rgba(0,196,168,0.70)`
- Dock: removed HOME item (accessed via TopNav wordmark), added ✦ sparkle icon to each pill, switched to row layout with teal glow effect
- Description panel: switched to dark glass with teal glow border `rgba(0,196,168,0.22)`, teal ✦ sparkle anchor, 3-line manifesto copy matching reference
- CornerHUD: cleaned "INTENT+" → "INTENT", "REALITY+" → "REALITY"; added "006" stat + GPS coordinates `33.7490° N, 84.3880° W`
- Architecture docs updated to reflect CrystalField (not ChromeShards), studio env, current CD material state
- TypeScript: 0 errors

**Visual accent system consolidated:**
- `--accent-landing` is now `#00c4a8` (teal) — matches LaserGrid `#00ddb8`
- All hardcoded `rgba(0,255,136,...)` replaced with `rgba(0,196,168,...)`

---

## 2026-05-18 — Context Stabilization + Architecture Audit

**Architecture Agent pass:**
- Created SYSTEM_OWNERSHIP.md, CURRENT_STATE.md, ACTIVE_BUGS.md, VISUAL_LANGUAGE.md
- Fixed BUG-006: TopNav "OWAH.WORLD" now `<Link href="/">` — Home nav always present
- Added `.homeLink` CSS, typed `.wordA/.sep/.wordB` span classes for background agent's markup
- Background agent refined TopNav CSS: dark glass pill (rgba(8,12,20,0.45)), Syne font, hover transition, green `·` separator at 0.70 opacity
- TypeScript: 0 errors post all edits

---

## 2026-05-17 — CD Scene Rebuild (commit 60c5f71)

**What worked:**
- `ShapeGeometry` with `absarc` hole is the correct CD shape (BoxGeometry was wrong)
- `frontMaterial.map = texture` (not `roughnessMap`) makes WATTBA artwork visible
- Rim cylinders with `rotation=[π/2,0,0]` gives correct edge geometry
- `velocity.current` refs for drag inertia (no React re-renders on frame)
- Inline ChromeShards in CDScene.tsx (no separate component file import)

**What failed / was reverted:**
- `roughnessMap: texture` — texture controls roughness variance, not color; artwork invisible
- `transmission: 0.52` on front face — made disc look like blue-tinted glass; artwork invisible
- `color: new THREE.Color(0.7, 0.85, 1.0)` on front face — colored tint obscured artwork
- `ContactShadows` — uses expensive FBO; caused errors in headless/SSR contexts; removed
- Importing both `ChromeEnvironment` AND having inline shards — doubled geometry (120 shards, 6 beams)

**Lessons:**
- THREE.MeshPhysicalMaterial: `map` = diffuse color/texture. `roughnessMap` = roughness variance. Never confuse them.
- `transmission` + `opacity` makes any face glass-like — fine for hub ring, NEVER for printed face
- Background/headless agents may repeatedly revert specific material properties — document invariants clearly (see CURRENT_STATE.md)

---

## 2026-05-17 — Landing Overhaul (commit 31cfd0a)

**What worked:**
- ChromeBackground 2D canvas (avoids WebGL for background — saves GPU budget for CD)
- LiquidGlass component with variant/radius props
- PageTransition AnimatePresence with brightness flash on exit
- Dock with usePathname active state

**What failed:**
- Page.tsx with inline TopNav + Dock — caused double rendering. Fixed by removing from page.tsx.
- `.next` cache staleness after file renames — fixed by deleting .next

---

## 2026-05-17 — Phase 0 (commit aaa9d51)

- Removed legacy Vite `index.html`, `vite.config.ts`, `src/main.tsx` artifacts
- Established Next.js App Router structure
- Added page transitions baseline

---

## Stability Notes

**High-risk invariants (do NOT change without testing):**
1. `map: texture` on CDMesh frontMaterial — breaks artwork visibility
2. `ssr: false` on CDScene dynamic import — breaks build (Three.js needs DOM)
3. TopNav + Dock ONLY in layout.tsx — duplicates if added to page files
4. Single `<AnimatePresence>` in PageTransition — nesting causes remount loops
5. ChromeEnvironment.tsx NOT imported — importing doubles all background geometry
