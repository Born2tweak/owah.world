# CODEX WORLD HANDOFF — OWAH.WORLD `/world`

Handoff from Cursor/agent work to Codex. **Read-only context export** — no implementation in this document.

---

## 1. Project basics

| Item | Value |
|------|--------|
| **Repo** | `owah.world-1` (local scratch clone of [owah.world](https://github.com/Born2tweak/owah.world)) |
| **Remote** | `https://github.com/Born2tweak/owah.world.git` |
| **Branch** | `master` |
| **Stack** | Next.js 15 App Router, React 19, TypeScript, Tailwind 4, R3F (`@react-three/fiber`), Drei, Three.js, Framer Motion, Zustand |
| **Production** | Vercel project `owah-world` → https://owah-world.vercel.app |

### Route status

- `/world` → `src/app/world/page.tsx` → `WorldScene` → **`WorldRoom3D`** (dynamic import, `ssr: false`)
- Route is live and wired; 3D room is the active implementation.

### Dev commands

```bash
npm run dev          # http://localhost:3000
npm run dev:clean    # delete .next + restart dev (use after build/dev overlap)
```

### Validation commands

```bash
npx tsc --noEmit
npm run build
npm run lint
```

**Last verified (Cursor session):** `tsc` and `build` passed after World Room 3D + fidelity pass work. Re-run before shipping.

---

## 2. Current `/world` state

`/world` has **moved away from mosaic/portrait** and CSS showroom illustration.

**Current direction:**

- **3D navigable room** (React Three Fiber)
- **Luxury blue showroom** — bedroom/archive energy; user should feel they move through one physical space
- **Four zones inside one room:** Fashion, Music, Watching, Life Feed
- **Camera states** simulate walking/focusing through the room (overview + per-zone)
- **Interaction works:** overview frames all zones; click/hover focuses; scroll/arrows cycle; Escape returns to overview

**Not current:** mosaic portrait, 2D CSS showroom (`showroom/`), figure collage, content drawer browsing.

---

## 3. Canon direction (do not regress)

- **The room is the interface** — spatial environment, not a dashboard
- **Not** a flat illustration, mosaic, collage, category browser, or separate sub-pages per zone
- **No left sidebar**, no giant category list, no drawer/modal browsing for zones
- **Exactly four zones:** Fashion, Music, Watching, Life Feed — no feature creep
- **Global Dock** (Code / Words / World) is the **only** site navigation; do not add page-level nav inside `/world`
- **Do not modify** global layout shell: `ChromeBackground`, `TopNav`, `Dock`, `PageTransition`, `CornerHUD`
- **Cinematic camera:** overview + per-zone positions; slow transitions; hover illuminates; click glides in; return restores overview
- **No APIs** for world content in scoped milestones

---

## 4. Current files involved

### Active stack (use these)

```
src/app/world/page.tsx
src/components/world/WorldScene/
  WorldScene.tsx          # dynamic import WorldRoom3D, ssr: false
  WorldScene.module.css
src/components/world/world.types.ts

src/components/world/WorldRoom3D/
  WorldRoom3D.tsx         # HUD, wheel/keyboard, composes canvas + info panel
  WorldRoom3D.module.css
  WorldRoomCanvas.tsx     # WebGLCanvas, ContactShadows, tone mapping
  RoomEnvironment.tsx     # shell + zone hotspots + zone components
  RoomShell.tsx           # floor, walls, ceiling, lighting helpers
  RoomCameraRig.tsx       # lerps camera per roomZones
  RoomZoneHotspot.tsx     # invisible hit mesh, click vs drag
  FashionZone.tsx
  MusicZone.tsx
  WatchingZone.tsx
  LifeFeedZone.tsx
  RoomInfoPanel.tsx       # focused-zone side panel (secondary UI)
  roomZones.ts            # ROOM_CAMERA_STATES, ZONE_WORLD_ANCHORS, labels
  roomMaterials.ts        # color/material constants
  worldRoom.store.ts      # Zustand: activeZone, hover, focus, cycle
```

**Wiring chain:** `page.tsx` → `WorldScene` → `WorldRoom3D` → `WorldRoomCanvas` → `RoomCameraRig` + `RoomEnvironment`.

### Zone world anchors (do not change without explicit brief)

```ts
fashion:  [-5.1, 0, -2.8]
music:    [0, 0, -3.2]
watching: [5.1, 0, -3.2]
life:     [0, 2.6, -4.8]
```

Zone geometry uses **local coordinates** inside `RoomZoneHotspot` groups (world offset applied by hotspot). **Do not double-offset** props in world space.

### Legacy / do NOT wire back (remain in repo, unwired from WorldScene)

| Path | Notes |
|------|--------|
| `src/components/world/FigureMosaic/` | Mosaic portrait — `FigureMosaic.tsx`, `mosaicFragments.ts`, `portraitMask.ts`, etc. |
| `src/components/world/ContentDrawer/` | Drawer browsing for mosaic fragments |
| `src/components/world/showroom/` | Prior 2D/CSS luxury showroom — `ShowroomRoom`, `ShowroomHud`, `useShowroomCamera` |
| `src/components/world/WorldDesktopSkeleton.tsx` | Old desktop skeleton |

**Verify:** `WorldScene.tsx` imports only `WorldRoom3D`. No accidental re-import of mosaic/showroom/drawer.

> **Note:** `AGENTS.md` still mentions `showroom/` as canonical — **outdated**. Canonical path is **`WorldRoom3D/`** as of this handoff.

---

## 5. What has been attempted and rejected

| Direction | Status |
|-----------|--------|
| Mosaic portrait / organic tile collage | **Rejected** — not the product vision |
| Pasted reference image (e.g. Shinji-style) | **Rejected** |
| 2D CSS showroom illustration (`showroom/`) | **Rejected** for current milestone |
| Primitive 3D blockout | **Accepted** only as technical foundation — navigation/camera proven |
| Dashboard / sidebar / category browser | **Rejected** |

**Current issue is visual fidelity**, not interaction architecture. Camera, anchors, and zone recognition work; the room still reads too much like boxes.

### Technical fixes already applied (keep)

- **Double-offset bug:** zone meshes were in world coords inside offset hotspot groups → props invisible behind back wall. Fixed: all zone meshes use local space relative to anchors.
- **Stale `.next`:** running `npm run build` while `npm run dev` is active → CSS 404, unstyled white page with raw CornerHUD text. Fix: `npm run dev:clean`.

---

## 6. Current screenshots assessment

**Working:**

- 3D navigation and zone camera focus
- Overview frames fashion, music, watching (and life feed anchor)
- Props visible after local-space fix
- Build and typecheck pass

**Still wrong:**

- Room reads as **primitive geometry / blockout**, not luxury boutique
- Materials not yet icy-blue / marble / chrome / glass enough
- Garments, shoes, speakers, screen still box-heavy
- Does **not** yet match blue Fendi-style showroom reference energy
- Milestone 3 fidelity pass improved materials/lighting but **more work needed** for Codex milestone below

---

## 7. Desired visual target

**Icy blue luxury fashion showroom** in one walkable room:

- White / cool **marble**, **glossy reflective** floor with subtle veining or tile lines
- **Cyan / ice-blue** padded or glass wall panels
- **Chrome** trim, baseboards, rails
- **Glass** display vitrine / table
- **Wardrobe** rail with recognizable hanging garments (shoulders, hangers, depth — not flat rectangles)
- **Shoe shelves** with shoe silhouettes on glass shelves
- **Music station:** speakers with grilles/drivers, turntable/listening area, album panels
- **Watching / media wall:** multi-panel screen, posters, console — not one flat purple plane
- **Life Feed:** subtle ticker/feed element in upper zone
- **Lighting:** soft ceiling glow, under-shelf cyan accents, contact shadows, no overexposure
- Tone: **calm, expensive, minimal, interactive**

---

## 8. Interaction target

| Input | Behavior |
|-------|----------|
| **Overview** | Default camera; all four zones readable in frame |
| **Hover zone** | Highlight emissive on zone props |
| **Click zone** | `focusZone` → camera glides to zone state; info panel appears |
| **Scroll wheel** | Cycles zones (overview → fashion → music → watching → life) |
| **Arrow keys / Page Up-Down** | Cycle zones |
| **Escape** | `returnToOverview` |
| **Info panel** | Secondary — bottom-left, small/transparent; supports room, does not block hero |
| **Dock** | Only global nav; unchanged |

**Room stays hero.** No modal category browser.

---

## 9. Recommended next task for Codex

### WORLD 3D — CODEX MILESTONE 1: SCENE FIDELITY REBUILD

**Goal:** Keep the working R3F camera/navigation system (`roomZones.ts`, `RoomCameraRig`, `worldRoom.store`, hotspots). Rebuild room objects and materials until the space reads as a **real luxury showroom**.

**Constraints:**

- Do **not** go back to 2D or mosaic
- Do **not** add APIs or new categories
- Do **not** touch Landing / Code / Words / global layout shell
- **Do not** change camera positions or zone anchors unless fixing a proven bug
- Primitives only unless extremely lightweight (no heavy external GLTFs)
- Prioritize: **composition, materials, lighting, recognizable silhouettes**
- Scope edits to `src/components/world/WorldRoom3D/*` and minimal `WorldScene` wiring if needed

**Acceptance:**

- `/world` clearly reads as 3D luxury showroom at overview
- Fashion / music / watching recognizable **without labels**
- Camera movement still works (overview + all zones + return)
- Global Dock still works
- `npm run build` passes
- `npx tsc --noEmit` passes

---

## 10. Repo hygiene

### Recent World-related changes (working tree, may be uncommitted)

| Area | Status |
|------|--------|
| `src/components/world/WorldRoom3D/` | **New** (15 files) — full R3F room stack + M3 fidelity pass |
| `src/components/world/WorldScene/WorldScene.tsx` | Modified — wires `WorldRoom3D` only |
| `src/components/world/WorldScene/WorldScene.module.css` | Simplified for 3D full-bleed |
| `FigureMosaic/`, `ContentDrawer/` | Modified in tree but **not wired** to `/world` |

### Build / typecheck

- Last Cursor session: **`npx tsc --noEmit`** ✅ · **`npm run build`** ✅
- Re-verify after any Codex edits.

### Known dev issue

If the page shows **unstyled white background** with raw CornerHUD text (`LIVING DIGITAL WORLD`, etc.):

1. Kill process on port 3000
2. Delete `.next`
3. Run `npm run dev:clean` or fresh `npm run dev`
4. Hard refresh browser

Cause: `npm run build` overlapping with `npm run dev` corrupts dev CSS (`/_next/static/css/app/layout.css` → 404).

### Commit policy

User preference: **do not commit unless explicitly asked.**

---

## 11. Final Codex instruction

**Codex should first inspect the current `/world` files (`WorldRoom3D/*`, `WorldScene.tsx`, `roomZones.ts`) and produce a short implementation plan before editing.**

Focus the plan on material/lighting/composition upgrades inside the existing camera and anchor system — not a rewrite of navigation or a return to legacy mosaic/showroom stacks.

---

*Generated for Codex handoff. Session source: Cursor World 3D rebuild + framing fix + Milestone 3 fidelity pass.*
