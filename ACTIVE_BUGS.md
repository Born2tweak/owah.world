# ACTIVE BUGS
_Last updated: 2026-05-18_

---

## SEVERITY: CRITICAL

### BUG-001: ChromeEnvironment.tsx orphaned — double-render risk
**File:** `src/components/landing/CDScene/ChromeEnvironment.tsx`  
**Status:** File exists, NOT imported by any module  
**Risk:** If any agent adds `import ChromeEnvironment`, scene gets:
- 60 extra chrome shards (CDScene already has 55 inline)
- 3 extra laser beams (CDScene already has 3 inline)
- Performance collapse + visual clutter  
**Root cause:** Background agent inlined shards into CDScene.tsx but did not delete original file  
**Fix:** `Remove-Item src/components/landing/CDScene/ChromeEnvironment.tsx`  
**Memory leak inside it:** `new THREE.MeshPhysicalMaterial(...)` called directly in ChromeShard render body (not useMemo) — new material every frame if ever re-enabled  
**Owner:** CD/Visual Agent

---

## SEVERITY: HIGH

### BUG-002: Possible blank screen after WebGL context loss
**Status:** Unconfirmed — not reproduced in this session, mentioned as risk  
**Suspected cause:** R3F Canvas has no `onCreated` error boundary; if WebGL context is lost (tab backgrounded on iOS, GPU driver reset, resource limit), Canvas goes blank with no recovery  
**Symptoms:** White/black screen after returning to tab, or after ~2s if GPU under pressure  
**Reproduction:** Open in Chrome, switch tabs rapidly; or open on iOS Safari  
**Fix needed:** Add error boundary around `<Canvas>`, add `gl.context.addEventListener('webglcontextlost')` handler  
**Owner:** CD/Visual Agent

### BUG-003: CD artwork instability — transmission was washing out WATTBA
**Status:** FIXED (but revert risk)  
**History:** A background agent repeatedly added `transmission: 0.52` and `color: new THREE.Color(0.7, 0.85, 1.0)` to frontMaterial, making the disc look like blue glass with no visible artwork  
**Current state:** `map: texture, metalness: 0` — artwork is visible  
**Critical invariant:** `map: texture` MUST stay on frontMaterial. Never add `transmission` to frontMaterial.  
**Revert risk:** Background agent may re-add transmission. Verify after any CDMesh.tsx edit.

---

## SEVERITY: MEDIUM

### BUG-004: CDMesh allocates new Vector3 every frame
**File:** `src/components/landing/CDScene/CDMesh.tsx` lines 89, 103  
**Status:** Open — low visual impact, GC pressure  
```ts
// Current (bad): allocates on every frame
groupRef.current.scale.lerp(new THREE.Vector3(1.05, 1.05, 1.05), 0.1)
// Fix: hoist to useRef outside useFrame
const scaleTarget = useRef(new THREE.Vector3(1, 1, 1))
```

### BUG-005: Layout duplication history
**Status:** FIXED — historical record for context  
**History:** `src/app/page.tsx` previously imported and rendered `<TopNav>` and `<Dock>` directly, causing them to render twice (once from layout.tsx, once from page.tsx). Fixed by removing from page.tsx.  
**Invariant:** layout.tsx is the single source for TopNav and Dock. Never add them to page files.

### BUG-006: TopNav home link was missing
**Status:** FIXED 2026-05-18  
**History:** TopNav was a plain `<h1>` with no link. No way to navigate back to "/" from sub-pages.  
**Fix:** Wrapped h1 in `<Link href="/">`.

---

## SEVERITY: LOW

### BUG-007: Dock "Words/Philosophy" label overflow on mobile
**Status:** Open — not tested on < 390px viewport  
**File:** `src/components/layout/Dock/Dock.tsx`

### BUG-008: R3F Canvas cold-start on return navigation
**Status:** Accepted behavior  
**Description:** AnimatePresence unmounts CDScene on route exit. Returning to "/" rebuilds the R3F Canvas from scratch (~200-400ms). Canvas does not persist across routes.  
**Why accepted:** Implementing a persistent Canvas (renderPortal, canvas outside AnimatePresence) is complex and deferred to Phase 6 polish.

### BUG-009: `.next` cache stale errors
**Status:** Resolved by clearing cache  
**Reproduction:** After major file renames/moves, Next.js build may error with `<Html> outside _document`  
**Fix:** `Remove-Item -Recurse -Force .next` then rebuild
