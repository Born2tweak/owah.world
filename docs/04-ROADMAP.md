# DOCUMENT 4 — IMPLEMENTATION ROADMAP
## OWAH.WORLD — V1

---

### PHILOSOPHY

Build in phases. Complete each phase entirely before beginning the next. Each phase produces something real — not scaffolding, not placeholders, not partial systems. Something that works, looks right, and feels right.

---

## PHASE 0 — FOUNDATION
### *The world exists before any content does*

**Deliverables:**

- [ ] Next.js 14 project initialized with App Router
- [ ] All approved dependencies installed
- [ ] `tokens.css` complete — all design tokens defined
- [ ] `globals.css` complete — base reset and typography
- [ ] `ChromeBackground` component — global, animated, chrome aesthetic
- [ ] `Dock` component — liquid glass pill, 4 icons, correct positioning
- [ ] `LiquidGlass` base component — all three variants
- [ ] Root `layout.tsx` — chrome + dock wrapping all pages
- [ ] 4 page routes created — each returns only its page name as text
- [ ] Vercel project connected — deploys on push

**Gate:** Chrome background present on all routes, dock visible and functional, deploys cleanly.

---

## PHASE 1 — LANDING
### *The first thing anyone sees*

**Deliverables:**

- [ ] `CDScene` — React Three Fiber canvas, full viewport
- [ ] `CDMesh` — geometrically correct disc with hole
- [ ] `CDTexture` — WATTBA artwork mapped to disc face, iridescent underside
- [ ] CD drag interaction — mouse/touch drag rotates disc in 3D space
- [ ] `LaserGrid` — green laser line background, subtle animation
- [ ] Landing page layout — CD centered, dock at bottom
- [ ] Dock icon interaction — click navigates to correct route
- [ ] Page transition — landing → any section (Framer Motion)
- [ ] CD scene disposes correctly on navigation away

**Gate:** CD renders with correct artwork, responds to drag, laser grid present, dock navigation works, transition away is smooth and fast.

---

## PHASE 2 — CODE PAGE
### *The synthwave grid environment*

**Deliverables:**

- [ ] `SynthwaveScene` — R3F canvas, full viewport
- [ ] `GridFloor` — infinite perspective neon grid, correct vanishing point
- [ ] Pillars — minimum 4, geometrically consistent, neon-lit
- [ ] Project screenshot mapped to pillar face
- [ ] Static project data — minimum 3 projects in `projects.json`
- [ ] Snake/winding camera path — GSAP ScrollTrigger moves camera through pillars
- [ ] `ProjectModal` — click pillar → zoom → embedded preview + external link
- [ ] Modal open/close animation — smooth, spring eased
- [ ] Scene disposes on navigation away

**Gate:** Synthwave grid renders correctly, pillar navigation via scroll works, click pillar opens project, closes cleanly.

---

## PHASE 3 — WORDS PAGE
### *Documents floating over collapse*

**Deliverables:**

- [ ] `FallOfRomeBackground` — Thomas Cole image, full bleed, subtle parallax on scroll
- [ ] Static philosophy data — minimum 4 entries in JSON
- [ ] `PhilosophyBox` — liquid glass card, scrollable content, correct information hierarchy
- [ ] Philosophy boxes — positioned manually over background, not in a grid
- [ ] Static writing data — minimum 2 PDFs with metadata
- [ ] `PDFThumbnail` — variable sizes (sm, md, lg), scattered positioning
- [ ] `PDFReader` — click thumbnail → fullscreen readable modal
- [ ] PDF modal close animation
- [ ] All content layers correctly z-indexed over background

**Gate:** Fall of Rome fills background, philosophy boxes float over it, PDFs appear as thumbnails at variable sizes, clicking one opens a readable fullscreen view.

---

## PHASE 4 — WORLD PAGE
### *The room and the figure*

**Deliverables:**

- [ ] `RoomEnvironment` — Fendi-style blue marble space, CSS perspective
- [ ] `FigureMosaic` — HTML Canvas, human silhouette built from image fragments
- [ ] Minimum 20 mosaic tiles populated with real images
- [ ] Tile click — fragment expands, reveals source image/item
- [ ] `FashionRack` — clickable zone in room
- [ ] `MusicTable` — clickable zone in room
- [ ] `WatchingScreen` — clickable zone in room
- [ ] `ContentDrawer` — slide-out panel, three views (fashion/music/watching)
- [ ] Static fashion data — minimum 6 images
- [ ] Static own-music data — minimum 3 tracks
- [ ] ContentDrawer open/close animation — smooth, correct easing

**Gate:** Room renders with correct perspective, figure stands in it from real fragments, clicking room objects opens correct content drawer, clicking figure tiles reveals items.

---

## PHASE 5 — LIVE DATA
### *The site becomes current*

**Deliverables:**

- [ ] Spotify API route — recent tracks, cached 15min
- [ ] `useSpotify` hook — consumes internal route
- [ ] Spotify data surfaces in World page music drawer
- [ ] GitHub API route — repos, cached 1hr
- [ ] `useGitHub` hook — consumes internal route
- [ ] GitHub data supplements or replaces static project data on Code page
- [ ] Letterboxd RSS route — recent watches, cached 1hr
- [ ] `useLetterboxd` hook — consumes internal route
- [ ] Letterboxd data surfaces in World page watching drawer
- [ ] All three routes have fallback states — static fallback renders if API fails

**Gate:** Music drawer shows real recent listening, watching drawer shows real recent watches, code page shows real repos, all three degrade gracefully if APIs unavailable.

---

## PHASE 6 — POLISH
### *The difference between built and finished*

**Deliverables:**

- [ ] All page transitions reviewed and tuned
- [ ] Dock hover states reviewed across all pages
- [ ] All three liquid glass variants visually consistent
- [ ] Chrome background behavior checked on all pages
- [ ] Mobile layouts reviewed and adjusted for all pages
- [ ] All images verified through `next/image`
- [ ] All console statements removed
- [ ] TypeScript errors at zero
- [ ] Performance check — no page loads exceed 3s on fast connection
- [ ] 3D scene disposal verified — no memory leaks on navigation
- [ ] Emotional coherence pass — each page checked against Document 1 goals
- [ ] Final deploy — clean build, no warnings

**Gate:** Every page feels finished, every interaction feels intentional, the site as a whole feels like one coherent world.

---

## DEPENDENCY MAP

```
Phase 0 ──── must complete before everything
Phase 1 ──── requires Phase 0
Phase 2 ──── requires Phase 0
Phase 3 ──── requires Phase 0
Phase 4 ──── requires Phase 0
Phase 5 ──── requires Phases 2 and 4
Phase 6 ──── requires all phases complete
```

Phases 1–4 can be built in any order after Phase 0.
Recommended order: Landing → Code → Words → World (simplest to most complex).

---

## MILESTONE SUMMARY

| Phase | Name | Gate |
|-------|------|------|
| 0 | Foundation | Chrome + dock deploys |
| 1 | Landing | CD interactive, transition works |
| 2 | Code | Grid renders, pillar nav works |
| 3 | Words | Background + both content layers work |
| 4 | World | Room + figure + drawers work |
| 5 | Live Data | All 3 APIs connected with fallbacks |
| 6 | Polish | Emotionally and technically complete |
