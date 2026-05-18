# SYSTEM OWNERSHIP

Strict file-level ownership prevents agents from colliding.
Each subsystem has a single responsible agent. Others must not overwrite without coordination.

---

## Layout Shell — `src/app/layout.tsx`
**Owner:** Architecture Agent  
**Renders:** ChromeBackground, TopNav, PageTransition, Dock  
**Rule:** No page component should add TopNav or Dock. They are global and already rendered here.

---

## Global Background — `src/components/layout/ChromeBackground/`
**Owner:** Architecture Agent  
**Purpose:** 2D canvas animated chrome gradient — runs on ALL pages via layout  
**Rule:** Never duplicated. Pages must not render their own background canvas.

---

## Top Navigation — `src/components/layout/TopNav/TopNav.tsx`
**Owner:** Architecture Agent  
**Renders:** "OwahWorld" wordmark linking to `/`  
**Rule:** Home link must always be present here. Not in Dock.

---

## Dock Navigation — `src/components/layout/Dock/Dock.tsx`
**Owner:** Architecture Agent  
**Renders:** Code / Words·Philosophy / World nav pills  
**Rule:** Home is NOT in Dock. Dock is section nav only.

---

## Page Transition — `src/components/layout/PageTransition/PageTransition.tsx`
**Owner:** Architecture Agent  
**Purpose:** Framer Motion AnimatePresence — 150ms exit (flash), 300ms enter (fade+resaturate)  
**Rule:** One AnimatePresence, keyed by pathname. Never nest another AnimatePresence inside it.

---

## Landing Page — `src/app/page.tsx`
**Owner:** CD/Visual Agent  
**Purpose:** Mounts CDScene (SSR-disabled), description overlay  
**Rule:** No TopNav, no Dock, no ChromeBackground in this file — all handled by layout.

---

## CD 3D Scene — `src/components/landing/CDScene/`
**Owner:** CD/Visual Agent  
**Files:**
- `CDScene.tsx` — Canvas, lights, Environment, ChromeShards, LaserBeams, CDMesh, LaserGrid
- `CDMesh.tsx` — The actual disc geometry, materials, drag interaction
- `LaserGrid.tsx` — Floor neon grid (gridHelper, scrolls forward)
- `ChromeEnvironment.tsx` — **ORPHANED** (see ACTIVE_BUGS.md)

**Rule:**
- `CDScene.tsx` is the single composition root for the 3D canvas
- `CDMesh.tsx` owns all disc geometry and materials
- `map: texture` on frontMaterial is load-bearing — this makes WATTBA artwork visible
- Do NOT add `transmission` to frontMaterial — it washes out the artwork
- Do NOT import `ChromeEnvironment.tsx` — it is superseded by inline shards in CDScene

---

## Global State — `src/lib/stores/cd.store.ts`
**Owner:** CD/Visual Agent  
**Purpose:** Zustand store for CD rotation/drag state  
**Rule:** Minimal — only drag/rotation state lives here.

---

## Design Tokens — `src/styles/tokens.css`
**Owner:** Architecture Agent  
**Rule:** All CSS variables are defined here. No hardcoded color values in component files.

---

## Stub Pages — `src/app/code/`, `src/app/words/`, `src/app/world/`
**Owner:** Respective feature agents (unassigned)  
**Current state:** Placeholder text only  
**Rule:** Use `--accent-code`, `--accent-words`, `--accent-world` for section color identity.
