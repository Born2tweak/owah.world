# ACTIVE BUGS
_Last updated: 2026-05-20_

---

## SEVERITY: CRITICAL

_No critical bugs._

---

## SEVERITY: HIGH

### BUG-002: Possible blank screen after WebGL context loss
**Status:** Mitigated 2026-05-20 — needs device QA  
**Fix:** `WebGLCanvas.tsx` + `CanvasErrorBoundary.tsx` — React error boundary and `webglcontextlost` / `webglcontextrestored` handlers  
**Owner:** CD/Visual Agent

---

## SEVERITY: MEDIUM

### BUG-003: frontMaterial transmission — REASSESSED
**Status:** Intentionally re-added — now considered correct behavior  
**History:** Background agent added `transmission: 0.58` with comment "WATTBA diamond texture tints what passes through — matching the reference where you see the crystal background through the disc."  
**Current state:** `map: texture` + `transmission: 0.58` on frontMaterial — texture tints transmitted crystal environment  
**Assessment:** Deliberate for crystal/diamond aesthetic. The artwork is visible as a color tint over the transmitted crystal field. Do not remove `map: texture`.  
**Invariant updated:** `map: texture` MUST stay on frontMaterial. `transmission` is now intentional.

---

## SEVERITY: LOW

### BUG-007: Dock label overflow on mobile
**Status:** Partial fix 2026-05-20 — verify on < 390px viewport  
**File:** `src/components/layout/Dock/Dock.module.css` (`@media (max-width: 390px)`)  
**Note:** Dock has 3 items (HOME via TopNav). Confirm pills do not clip or wrap on narrow phones.

### BUG-008: R3F Canvas cold-start on return navigation
**Status:** Accepted behavior  
**Description:** AnimatePresence unmounts CDScene on route exit. Return to "/" rebuilds Canvas (~200-400ms). Deferred to Phase 6.

---

## CLOSED

### BUG-001: ChromeEnvironment.tsx orphaned — CLOSED 2026-05-18
**Fix:** File deleted. `Remove-Item src/components/landing/CDScene/ChromeEnvironment.tsx`

### BUG-004: CDMesh allocates new Vector3 every frame — CLOSED
**Fix:** `_lerpTarget` hoisted to module level in CDMesh.tsx (line 10). Already resolved.

### BUG-005: Layout duplication history — CLOSED
### BUG-006: TopNav home link missing — CLOSED 2026-05-18
### BUG-009: .next cache stale errors — CLOSED
