# UI Component Map — OWAH worlds

Maps researched patterns to OWAH routes. **Candidates only** — not integrated. Each entry lists source, target, rationale, and modification requirements.

Legend: **Complexity** — Low (CSS only) · Medium (FM + CSS) · High (Radix/registry dep)

---

## Landing (`/`)

| Candidate | Source | Reason | Modifications | Complexity |
|-----------|--------|--------|---------------|------------|
| Glass caption strip | OWAH existing + VengenceUI `glass-dock` | Reinforce bottom hero glass; dock-style blur/border | Match existing inline glass in `page.tsx`; extract to `experimental/glass`; don’t duplicate CDScene chrome | Medium |
| Hero text motion | VengenceUI `animated-hero`, animate-ui `texts/shimmering` | Headline entrance without rebuilding CDScene | GSAP/FM only on text overlay; keep `pointer-events: none` on caption | Medium |
| Liquid typography chrome | VengenceUI `liquid-text`, `liquid-gradient` | Subtle brand motion on tagline | Shader dep optional — prefer CSS gradient animation | Medium |
| Nav spotlight | VengenceUI `spotlight-navbar` | Global nav hover polish | Port cursor spotlight to existing layout nav; CSS vars for cyan accent | Medium |
| Route reveal loader | VengenceUI `reveal-loader` | Transition into `/world` | Hook into existing `PageTransition`; no new dep | Low |
| Background pattern | galaxy `Patterns/` | Depth behind 3D scene | Static CSS layer under canvas; performance budget | Low |

---

## Code (`/code`)

| Candidate | Source | Reason | Modifications | Complexity |
|-----------|--------|--------|---------------|------------|
| Project cards | VengenceUI `glow-border-card`, galaxy `Cards/` | Repo/project tiles with hover glow | CSS module card; map OWAH mono/display fonts; no shadcn Card | Medium |
| Expandable grid | VengenceUI `expandable-bento-grid` | Featured project + detail expand | One hero cell only; data from static config first | High |
| Modal / sheet | animate-ui `radix/dialog`, `radix/sheet` | Project detail overlay | Port motion only or add Radix Dialog later — user approval needed | High |
| Staggered grid entrance | VengenceUI `staggered-grid` | Page load rhythm | FM `staggerChildren` on grid wrapper | Medium |
| Nav / filter bar | animate-ui `management-bar` | Sort/filter repos | Simplify to segmented control; match code page palette | Medium |
| Copy button | animate-ui `buttons/copy` | Copy repo URL | Icon button + toast pattern (sonner not in OWAH — custom) | Medium |

---

## Words (`/words`)

| Candidate | Source | Reason | Modifications | Complexity |
|-----------|--------|--------|---------------|------------|
| Reading surface | galaxy `Cards/` + OWAH tokens | Long-form readable panel | Max-width prose, glass border optional | Low |
| Content cards | VengenceUI `glow-border-card` | Essay/archive entries | Title + excerpt + date; category color edge | Medium |
| Archive layout | VengenceUI `staggered-grid`, `expandable-bento-grid` | Masonry-like list without breaking reading | Use stagger only — not photo bento | Medium |
| Text shimmer hero | animate-ui `texts/shimmering`, `highlight` | Section headers | One line only; reduce motion preference | Low |
| Flip preview | animate-ui `community/flip-card` | Quote ↔ metadata | Optional; respect `prefers-reduced-motion` | Medium |
| Loaders | galaxy `loaders/` | Infinite scroll / fetch wait | CSS spinner in words theme | Low |

---

## World (`/world`)

| Candidate | Source | Reason | Modifications | Complexity |
|-----------|--------|--------|---------------|------------|
| Fragment tile chrome | galaxy `Cards/`, VengenceUI `glow-border-card` | Stronger hover/focus edge on mosaic tiles | Apply via `FigureMosaic.module.css`; **do not** change tile shape logic | Low |
| Hover shine | animate-ui `effects/shine` | Clarify hover vs selected | Wrapper on tile button; category-colored shine | Medium |
| Neighbor glow | OWAH existing | Keep `mosaicNeighbors` illumination | Tune opacity only | Low |
| Content drawer shell | animate-ui `radix/sheet` | Smoother open/close than width transition | Match `ContentDrawer` dimensions; FM x-slide + backdrop | Medium |
| Drawer sections | Forge accordion + animate-ui `radix/accordion` | Dense placeholder → real content | Category blocks collapsible; Forge IA only | Medium |
| Drawer tabs | Forge `#settings tab-nav` | Fashion/Music/Watching/Life in drawer | Map to `WorldCategory`; sync with sidebar chips | Medium |
| Preview link body | animate-ui `preview-link-card` | Structured drawer content (title, url, thumb) | Static mock data first; no API | Medium |
| Category chip sync | animate-ui `texts/highlight` | Sidebar chips react to hover/selection | Wire `useMosaicSelection` hovered category to chip class | Medium |
| Category tooltips | galaxy `Tooltips/` | Fragment category on hover | `aria-label` + optional CSS tooltip; a11y first | Low |
| Quick category strip | Forge `#quicksettings` | Optional above-mosaic filters | Secondary to sidebar; compact horizontal | Low |
| Radial focus menu | animate-ui `community/radial-menu` | **Defer** — conflicts with mosaic click model | Not recommended for M2 | High |
| Mosaic frame glow | VengenceUI glow patterns | Hero emphasis on bust stage | Already partial in `.mosaicFrame`; tune variables | Low |

---

## Cross-route / layout

| Candidate | Source | Target | Reason | Modifications |
|-----------|--------|--------|--------|---------------|
| Page transition | animate-ui `effects/fade` | All routes | Align with `PageTransition` | Extend existing component |
| Glass system tokens | VengenceUI glass patterns | `experimental/glass` | Shared blur/border/saturation | CSS custom properties in global theme |
| Dense panel spacing | Forge `style.css` compact gaps | World drawer, Code modals | Reduce padding noise | Copy spacing rhythm only |
| Tooltip primitive | galaxy / animate-ui `radix/tooltip` | World, Code | Shared hint layer | Defer Radix until approved |

---

## Modification requirements (global)

1. **Tokens**: Map all accent colors to `WORLD_CATEGORY_COLORS` and landing cyan glass — no raw Uiverse hex without token pass.
2. **Motion**: Framer Motion only where OWAH already uses it; respect `prefers-reduced-motion`.
3. **A11y**: Keyboard focus on mosaic tiles and drawer close; tooltips must not replace `aria-label`.
4. **Deps**: No Radix/GSAP/Lenis/shaders added until explicit approval per component.
5. **Canon**: World mosaic stays generative translucent tiles — galaxy/VengenceUI cards inform **chrome**, not tile content.
6. **Promotion path**: `experimental/*` → review → move to `src/components/ui/` or domain folder (`world/`, `code/`).

---

## Priority queue (recommended order)

1. World: drawer motion + category chip sync (animate-ui sheet pattern, FM only).
2. World: tile hover shine (CSS + light FM).
3. Landing: extract glass strip to experimental glass wrapper.
4. Code: glow project card CSS port.
5. Words: reading surface + stagger list.
6. Forge IA: drawer accordion/tabs when real content exists.

**STOP** — no route imports from `experimental/` until next integration milestone.
