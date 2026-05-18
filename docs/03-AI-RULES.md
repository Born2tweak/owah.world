# DOCUMENT 3 — AI RULES
## OWAH.WORLD — Engineering Constitution

---

### PREAMBLE

This document governs all code written for OWAH.WORLD. It is not a suggestion. Every rule here exists because violating it produces a product that is incoherent, unmaintainable, or emotionally wrong. When in doubt, return to this document before writing a single line.

---

## PART I — IMPLEMENTATION PHILOSOPHY

### Rule 1 — One Subsystem At A Time

Never build multiple major systems simultaneously. Each subsystem must be fully implemented, refined, debugged, and validated against Documents 1 and 2 before the next begins.

The order is:

```
1. Global chrome background + dock (foundation)
2. Landing — CD scene
3. Code — synthwave scene
4. Words — Fall of Rome + content layers
5. World — Room + Figure
6. Live data integrations
7. Polish + transitions pass
```

**No exceptions. No jumping ahead.**

---

### Rule 2 — Never Build Placeholder Architecture

Never scaffold a file, component, or function that is not immediately needed. No `// TODO: implement later` blocks. No empty components committed to the codebase. No stub API routes.

If it is not being built right now, it does not exist in the codebase right now.

---

### Rule 3 — Finish Before Expansion

A subsystem is not done when it renders. It is done when:

- [ ] It matches the PRD specification
- [ ] It matches the architecture spec
- [ ] It is visually coherent with the design system
- [ ] It is emotionally correct
- [ ] It handles its error states
- [ ] It performs acceptably on target devices

Only then does work on the next subsystem begin.

---

### Rule 4 — No Speculative Systems

Never build a feature because it might be useful later. Never create abstractions in advance of need. Three similar lines of code is better than a premature abstraction.

---

## PART II — CODE QUALITY STANDARDS

### Rule 5 — Component Size

- Components: max 150 lines
- Functions: max 40 lines
- Files: max 400 lines
- If a file approaches its limit, it must be split before continuing

---

### Rule 6 — Immutability

Never mutate state directly. Always return new objects.

```typescript
// FORBIDDEN
state.currentPage = 'code'

// REQUIRED
set({ currentPage: 'code' })

// FORBIDDEN
items.push(newItem)

// REQUIRED
[...items, newItem]
```

---

### Rule 7 — TypeScript Strictness

- All components fully typed. No `any`. No `unknown` without explicit narrowing.
- All API responses typed against defined interfaces from Document 2.
- All props interfaces explicitly defined — no inline object types on component signatures.

```typescript
// FORBIDDEN
function Pillar({ project, onClick }: { project: any, onClick: () => void })

// REQUIRED
interface PillarProps {
  project: Project
  onClick: (id: string) => void
}
function Pillar({ project, onClick }: PillarProps)
```

---

### Rule 8 — No Console Statements In Production Code

No `console.log`, `console.warn`, or `console.error` in committed code. Remove all console statements before marking a subsystem complete.

---

### Rule 9 — Error Handling At Every Boundary

Every API call must handle failure. Every async operation must have an error state. No silent failures.

```typescript
// FORBIDDEN
const data = await fetchSpotify()
return data.tracks

// REQUIRED
const result = await fetchSpotify()
if (!result.ok) return fallbackState
return result.data.tracks
```

---

## PART III — ARCHITECTURAL CONSTRAINTS

### Rule 10 — Component Ownership Is Absolute

Components in `/components/landing/` are only used on the landing page.
Components in `/components/code/` are only used on the code page.
And so on.

Cross-page component sharing only happens through `/components/ui/` and `/components/layout/`.

Never import a page-specific component into another page.

---

### Rule 11 — No Styling Outside The Token System

Every color, spacing value, blur amount, border radius, and motion curve must reference a CSS custom property from `tokens.css`.

```css
/* FORBIDDEN */
background: rgba(255, 255, 255, 0.08);
border-radius: 20px;

/* REQUIRED */
background: var(--glass-bg);
border-radius: var(--glass-radius);
```

No hardcoded values in any component.

---

### Rule 12 — State Store Separation

Each Zustand store owns exactly one domain. Stores never reference each other directly.

- `navigation.store` — routing and dock state only
- `modal.store` — open/closed content only
- `cd.store` — landing CD interaction only

If new state is needed, determine which store owns it before writing. If no store owns it, create a new dedicated store — never extend an existing store outside its domain.

---

### Rule 13 — Animation System Ownership

Each animation domain has one owner. They never bleed into each other.

| Domain | Owner | Forbidden |
|--------|-------|---------|
| 3D scenes | React Three Fiber | GSAP inside R3F scenes |
| Page transitions | Framer Motion | CSS transitions on route changes |
| Path navigation | GSAP | Framer Motion on scroll paths |
| Micro-interactions | CSS only | JS animation libraries |
| Canvas (Figure) | HTML Canvas API | Any other system |

Never mix animation systems in the same component.

---

### Rule 14 — API Routes Are The Only Data Boundary

Live data (Spotify, GitHub, Letterboxd) is never fetched directly from client components. It always goes through Next.js API routes in `/app/api/`.

Client components call internal API routes. Internal API routes call external services. This is the only valid data flow for live data.

---

## PART IV — VISUAL COHERENCE RULES

### Rule 15 — Chrome Is The Foundation

The chrome background is never replaced, hidden, or altered per page. Page themes are layered on top of chrome. Chrome is always visible beneath everything.

If a page theme feels like it's competing with or obscuring the chrome foundation, the theme is wrong — not the chrome.

---

### Rule 16 — Liquid Glass Is One Material

The `LiquidGlass` component is the only source of the glass effect. It is never recreated inline in another component.

All cards, boxes, dock, overlays, and modals that need the glass treatment use `<LiquidGlass>` as their wrapper or base.

Glass properties never vary arbitrarily between components. If a variation is needed, it is a named variant:

```typescript
<LiquidGlass variant="heavy" />   // --glass-blur: 40px
<LiquidGlass variant="default" /> // --glass-blur: 20px
<LiquidGlass variant="light" />   // --glass-blur: 10px
```

---

### Rule 17 — Page Accent Colors Are Exclusive

Each page's accent color belongs exclusively to that page.

```
--accent-landing  → landing page only
--accent-code     → code page only
--accent-words    → words page only
--accent-world    → world page only
```

Never use a page's accent color on any other page or in any global component.

---

### Rule 18 — Typography Is Consistent

Two fonts. No others may be introduced.

- `--font-mono`: Technical text, labels, metadata, data readouts
- `--font-display`: Headings, names, titles, prominent UI text

If a third font is proposed for any reason, the answer is no.

---

### Rule 19 — Visual Hierarchy Is Sacred

On every page, the hierarchy is:

```
1. Background (the environment)
2. The chrome layer
3. Content elements (pillars, glass boxes, figure)
4. Interactive UI (dock, modals, overlays)
```

Nothing in a lower tier visually competes with or dominates something in a higher tier.

---

## PART V — INTERACTION STANDARDS

### Rule 20 — Every Interactive Element Has Three States

No interactive element may be built with only a default state.

```
default  →  hover  →  active/pressed
```

All three must be implemented before the component is considered complete.

---

### Rule 21 — Motion Curves Are Not Arbitrary

Only the named easing curves from the token system may be used.

```css
--ease-spring    ← entrances, expansions, things appearing
--ease-smooth    ← standard transitions, movement
--ease-out       ← exits, things disappearing
```

Nothing else. Custom cubic-bezier values require addition to the token system — not inline usage.

---

### Rule 22 — Transitions Must Be Fast

- Page transitions: `--duration-normal` (300ms) maximum
- Micro-interactions: `--duration-fast` (150ms)
- Expansions and modals: `--duration-slow` (600ms) maximum

Nothing in the UI may take longer than 600ms to complete its transition.

---

### Rule 23 — The Dock Never Disappears

The dock is always visible on non-landing pages. It never hides on scroll. It never fades out during content interaction.

Exception: during full-screen modal/PDF reading state, the dock may reduce opacity to 40% — but it never fully disappears or becomes non-functional.

---

## PART VI — PERFORMANCE STANDARDS

### Rule 24 — 3D Scenes Are Contained

React Three Fiber canvases are always properly disposed when the component unmounts.

```typescript
useEffect(() => {
  return () => {
    geometry.dispose()
    material.dispose()
  }
}, [])
```

---

### Rule 25 — Images Are Always Optimized

Every image uses `next/image`. No `<img>` tags in this codebase. All images have explicit `width` and `height` or `fill` with a positioned container.

---

### Rule 26 — Live Data Is Always Cached

No API route returns fresh data on every request.

```
Spotify recent tracks:  revalidate every 15 minutes
GitHub repos:           revalidate every 1 hour
Letterboxd RSS:         revalidate every 1 hour
```

Live data routes always return a cached fallback if the external API fails.

---

### Rule 27 — No Render-Blocking Operations

All heavy computations (mosaic figure assembly, 3D scene initialization) happen asynchronously with a loading state shown to the user.

---

## PART VII — FORBIDDEN PATTERNS

```
❌  Inline styles (except Three.js/Canvas where unavoidable)
❌  !important in CSS
❌  any TypeScript type
❌  Direct DOM manipulation outside of Canvas/R3F context
❌  useEffect for state derivation (use derived state instead)
❌  Multiple animation libraries in one component
❌  Hardcoded color values, spacing, or motion values
❌  Placeholder/lorem ipsum content committed to the repo
❌  Components larger than 400 lines
❌  API calls from client components directly to external services
❌  Fetching live data without a cache strategy
❌  Building future-phase features during current-phase work
❌  Console statements in committed code
❌  Page-specific components imported into other pages
❌  Recreating the liquid glass effect inline
❌  Third fonts
❌  Page accent colors used outside their page
```

---

## PART VIII — ACCEPTABLE DEPENDENCIES

These are the only external dependencies approved for V1.

```
next                     Framework
react, react-dom         Core
three                    3D engine
@react-three/fiber       React + Three.js bridge
@react-three/drei        Three.js helpers
framer-motion            Page transitions
gsap                     Path/scroll animation
zustand                  State management
tailwindcss              Utility classes
```

To add a dependency: the package must solve a problem that cannot be reasonably solved with approved dependencies. The ask must be explicit before installation.

---

## PART IX — SYMBOLIC CONSISTENCY RULES

### Rule 28 — Emotional Coherence Over Technical Elegance

If a technically elegant solution produces a result that is emotionally wrong, the technically elegant solution is wrong. Rewrite it.

### Rule 29 — Each Page Tells One Story

- **Landing:** Arrival. The world exists. You are entering it.
- **Code:** Mastery. Structured systems. Cybernetic power.
- **Words:** Depth. Civilizational weight. Fragments of thought over collapse.
- **World:** Identity as collage. Taste as self-portrait.

No element on any page may contradict its page's story.

### Rule 30 — The Chrome Is Not Decoration

The chrome aesthetic is the product's argument: that technology can be intimate, that cold surfaces can hold warmth, that a machine can have a soul. Every design decision must be legible through that lens.

If an element doesn't feel chrome — doesn't feel reflective, crystalline, precise, or alive — it doesn't belong.
