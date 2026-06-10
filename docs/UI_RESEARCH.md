# UI System Research — Inventory

Research pass for OWAH.WORLD inspiration sources. **No packages installed, no pages rewritten, no repo code copied into production paths.**

## Global clone locations

Shallow clones (`--depth 1`) live outside the app repo:

| Repository | Local path |
|------------|------------|
| [Ashutoshx7/VengenceUI](https://github.com/Ashutoshx7/VengenceUI) | `C:\Users\acetu\.gemini\antigravity\ui-research\VengenceUI` |
| [imskyleen/animate-ui](https://github.com/imskyleen/animate-ui) | `C:\Users\acetu\.gemini\antigravity\ui-research\animate-ui` |
| [uiverse-io/galaxy](https://github.com/uiverse-io/galaxy) | `C:\Users\acetu\.gemini\antigravity\ui-research\galaxy` |
| [lllyasviel/stable-diffusion-webui-forge](https://github.com/lllyasviel/stable-diffusion-webui-forge) | `C:\Users\acetu\.gemini\antigravity\ui-research\stable-diffusion-webui-forge` |

OWAH stack reference: Next.js 15, React 19, Framer Motion 12, Tailwind 4, CSS modules (no Radix/shadcn in `package.json` today).

---

## 1. VengenceUI

### Purpose

Next.js 15 component registry and docs site (“Vengeance UI”) — shadcn-style primitives plus premium marketing/interaction blocks (glass, glow, bento, hero, dock). Ships its own registry build and MCP server for component discovery.

### Strengths

- **Stack alignment**: Next 15.5, React 19.2, Framer Motion 12, Tailwind 4 — closest match to OWAH.
- **Glass & chrome**: `glass-dock`, `glow-border-card`, liquid/metal gradient shaders — fits landing/world aesthetic.
- **Layout patterns**: `expandable-bento-grid`, `staggered-grid`, `perspective-grid` — dense but readable grids.
- **Navigation**: `spotlight-navbar`, `smooth-scroll` — hero-to-section transitions.
- **Motion**: GSAP + Framer coexisting; Lenis smooth scroll optional.

### Weaknesses

- Heavy dependency surface (full Radix suite, R3F, recharts, vaul, nextra) — **must cherry-pick**, not npm-install wholesale.
- Many components assume shadcn tokens (`cn`, CVA) not present in OWAH.
- Registry/docs coupling — components may reference site-only utilities.
- 3D/shader blocks (`@paper-design/shaders-react`, drei) overlap OWAH’s existing R3F landing scene — risk of visual clash.

### Relevant components

| Component | Use case |
|-----------|----------|
| `glass-dock` | Bottom chrome / world dock affordances |
| `glow-border-card` | Fragment tiles, project cards, drawer panels |
| `expandable-bento-grid` | Code/words archive grids (not world mosaic) |
| `animated-hero` | Landing headline motion reference |
| `spotlight-navbar` | Global nav hover spotlight |
| `staggered-grid` | Words archive stagger reveal |
| `morphing-disclosure` | Accordion/drawer section expand |
| `liquid-text` / `liquid-gradient` | Landing typographic chrome |
| `reveal-loader` | Route transition loader pattern |

### Relevant animation patterns

- Border glow pulse on hover (CSS + FM spring).
- Bento cell expand with shared layout (`layoutId`).
- Staggered children entrance (`staggerChildren`).
- Spotlight cursor-follow on nav items.

### Relevant layout patterns

- Fixed glass dock with blurred backdrop.
- Asymmetric bento with one hero cell.
- Full-bleed hero + floating glass caption (similar to landing glass strip).

### Compatibility

| Target | Assessment |
|--------|------------|
| Next.js 15 | **High** — built on App Router Next 15.5 |
| React 19 | **High** — React 19.2 in repo |

### Integration complexity

**Medium** for isolated CSS+FM patterns ported manually. **High** if importing registry CLI or full Radix stack. Recommended: read source, port motion/CSS into OWAH modules, one component at a time.

---

## 2. animate-ui

### Purpose

Open-source animated component registry (shadcn-compatible) built as a Turborepo monorepo. Docs at [animate-ui.com](https://animate-ui.com). Primitives wrap Radix/Headless/Base UI with Motion-driven enter/exit and micro-interactions.

### Strengths

- **Motion-first**: Every primitive has animated open/close, height auto, blur, shine, magnetic hover.
- **Registry model**: Copy-via-CLI like shadcn — good for surgical adds (`npx shadcn@latest add …` from animate-ui registry).
- **Text primitives**: Typing, shimmer, morphing, counting — strong for landing/words hero lines.
- **Community blocks**: `flip-card`, `motion-carousel`, `radial-nav`, `pin-list` — interaction references.
- **Effects layer**: `shine`, `tilt`, `magnetic`, `particles`, `fade`, `auto-height` — reusable wrappers.

### Weaknesses

- **pnpm monorepo** — not drop-in; files live under `apps/www/registry/`.
- Expects **Radix** + often **@animate-ui/primitives** internal packages.
- Headless/Base variants duplicate Radix — pick one path only.
- No R3F/3D — complementary, not replacement for CDScene.

### Relevant components

**Radix animated**: `sheet`, `dialog`, `accordion`, `collapsible`, `sidebar`, `hover-card`, `preview-link-card`, `tabs`.

**Buttons**: `ripple`, `liquid`, `flip`, `icon`.

**Community**: `flip-card`, `motion-carousel`, `management-bar`, `notification-list`, `radial-menu`.

**Primitives/effects**: `shine`, `tilt`, `magnetic`, `blur`, `auto-height`.

**Primitives/texts**: `shimmering`, `typing`, `highlight`, `gradient`.

### Relevant animation patterns

- Height-aware collapse (`auto-height` + Motion).
- Sheet/drawer slide with backdrop blur fade.
- List item layout animations (`layout` + `AnimatePresence`).
- Button press ripple and liquid fill.

### Relevant layout patterns

- Animated sidebar with collapse rail.
- File-tree explorer (`radix/files`) — dense hierarchical panel.
- Preview link card — compact metadata surface (drawer body reference).

### Compatibility

| Target | Assessment |
|--------|------------|
| Next.js 15 | **High** — docs app is Next-based |
| React 19 | **High** — React 19 types throughout |

### Integration complexity

**Medium–High**. Each registry item is self-contained but often pulls Radix + motion utilities. Best path: copy one primitive (e.g. animated `sheet`) when drawer UX is prioritized; avoid monorepo import. OWAH already uses Framer Motion — many primitives can be **inspired** without Radix.

---

## 3. uiverse-io/galaxy

### Purpose

MIT-licensed archive of **3,800+** community UI snippets from [Uiverse.io](https://uiverse.io) — raw HTML/CSS (sometimes minimal JS), organized by category.

### Categories (local)

`Buttons`, `Cards`, `Checkboxes`, `Forms`, `Inputs`, `loaders`, `Notifications`, `Patterns`, `Radio-buttons`, `Toggle-switches`, `Tooltips`

### Strengths

- **Pure CSS ideas** — gradients, borders, hover glow, neumorphism, glass — no framework lock-in.
- **MIT license** — safe to adapt patterns with attribution.
- **Breadth** — loaders and micro-buttons for polish; `Cards` and `Patterns` for mosaic-adjacent tiles.
- **Low integration risk** when treating as **reference screenshots/CSS**, not npm deps.

### Weaknesses

- **Not React** — every snippet needs manual port to TSX + CSS modules.
- Inconsistent quality, accessibility, and naming.
- Many snippets use hardcoded colors — must map to OWAH tokens (`--category-accent`, cyan glass).
- No layout systems — atomic pieces only.
- Large repo — search on uiverse.io faster than browsing all files.

### Relevant components (by category)

| Category | OWAH relevance |
|----------|----------------|
| `Cards` | Glass cards, hover lift, border trace — fragment tile chrome |
| `Patterns` | Background meshes, grids — stage atmosphere |
| `loaders` | Mosaic loading state, route transitions |
| `Buttons` | Category chips, drawer close, focus affordances |
| `Tooltips` | Fragment category hints on hover |
| `Notifications` | Life-feed toast styling reference |

### Relevant animation patterns

- CSS `@keyframes` border rotation, shimmer sweeps.
- `:hover` scale + box-shadow ramps (no JS).
- Loader stroke-dash animations.

### Relevant layout patterns

- Single-element focus — not page-level.
- Occasional card grids in HTML — manual translation only.

### Compatibility

| Target | Assessment |
|--------|------------|
| Next.js 15 | **N/A** (HTML/CSS) — ports cleanly as CSS modules or global CSS |
| React 19 | **N/A** — wrap as presentational components |

### Integration complexity

**Low–Medium** per snippet (CSS port). **High** if attempting bulk automation — diminishing returns. Use galaxy as a **pattern library**, not a dependency.

---

## 4. stable-diffusion-webui-forge (layout study only)

### Purpose

Gradio-based Stable Diffusion WebUI fork. **Not a UI kit.** Studied only for **control-panel architecture**, information density, and workflow grouping.

### Strengths (UI patterns only)

- **Accordion-heavy density**: `.gradio-accordion`, compact groups — collapse infrequent controls.
- **Quick settings bar**: `#quicksettings` — persistent top strip for high-frequency actions.
- **Tab-nav settings**: `#settings > div.tab-nav` — categorized long forms without one endless scroll.
- **Extra networks panel**: `.extra-networks > div.tab-nav` — tabbed media browser pattern.
- **Transparent blocks**: `style.css` strips default Gradio chrome — content-first panels.
- **Inline help**: `.settings-comment`, `.info` — contextual documentation beside controls.

### Weaknesses (for OWAH)

- Gradio DOM structure — not portable to React verbatim.
- Optimized for **forms/sliders**, not editorial/collage UX.
- Dark theme variables tied to Gradio internals.
- Zero value in SD inference, models, or Python modules for OWAH.

### Relevant layout patterns (only)

| Pattern | Application idea |
|---------|------------------|
| Quick settings strip | World: category filter chips or view mode toggles above mosaic |
| Accordion sections | Drawer: collapse category metadata vs content |
| Tab-nav sidebar | Drawer/settings: Fashion / Music / Watching / Life tabs |
| Compact form gaps | Dense drawer lists without wasted padding |
| Extra-networks card grid | Future: thumbnail grid inside drawer (not mosaic) |
| Pinned footer actions | Sticky drawer actions (share, close, next fragment) |

### Do not integrate

- Python backend, Gradio, model pipelines, extensions, CUDA, any inference APIs.

### Compatibility

| Target | Assessment |
|--------|------------|
| Next.js 15 | **N/A** — conceptual reference only |
| React 19 | **N/A** — conceptual reference only |

### Integration complexity

**Low** for ideas (CSS/spacing/IA). **Forbidden** for functional integration.

---

## Phase 4 — `/world` page audit

Current architecture: `WorldScene` — left sidebar (copy + static category chips) | center `FigureMosaic` (organic translucent tiles, bust silhouette) | right `ContentDrawer` (width transition, placeholder content).

### Remaining problems

| Area | Issue |
|------|--------|
| **Silhouette readability** | Bust still tends toward vertical mass; head/shoulder negative space improved in M2C-2 but may not read clearly at distance on all viewports. Purple/cyan spine risk if category colors cluster on center axis. |
| **Spacing** | Mosaic frame `min(56vw, 640px)` vs sidebar + drawer can squeeze stage on ~1280px widths; bottom padding vs dock not fully validated at 100% zoom no-scroll. |
| **Visual hierarchy** | Sidebar title competes with mosaic glow; category chips are static — no link to hovered/selected fragment category. |
| **Drawer presentation** | Width-only reveal; placeholder body — no accordion/tabs, no preview-card density, weak “reward” after click. |
| **Category signaling** | Chips don’t highlight when hovering mosaic fragments; fragment colors exist in data but sidebar doesn’t echo selection. |
| **Interaction clarity** | Hover neighbor glow vs click focus distinction may be subtle; no tooltip/category label on fragment; close affordance small. |

### Research-backed recommendations for `/world`

| Problem | Source inspiration | Pattern to borrow |
|---------|-------------------|-------------------|
| Drawer depth | animate-ui `sheet` + `preview-link-card` | Animated slide + structured header/meta/body slots |
| Drawer density | Forge accordions + tab-nav | Section collapse for long category content |
| Category signaling | VengenceUI `glow-border-card` + galaxy card hovers | Accent border tied to `WORLD_CATEGORY_COLORS` on chip + tile |
| Sidebar ↔ mosaic link | animate-ui `highlight` text | Animate active category chip when hover matches |
| Fragment hover clarity | animate-ui `shine` / galaxy card CSS | One-shot border shimmer on hover |
| Quick filters | Forge `#quicksettings` | Horizontal chip strip above mosaic (optional, secondary to sidebar) |
| Mosaic atmosphere | VengenceUI `glow-border-card` frame | Outer frame pulse — already partially present; tune not replace |
| Loading / empty | galaxy `loaders` | Skeleton while fragments mount |

**Canon preserved**: Keep organic translucent mosaic tiles — do not replace with image cards, bento photos, or SD galleries.

---

## Integration strategy (summary)

1. **Prefer port-over-install** — copy motion/CSS ideas into `src/components/ui/experimental/` wrappers, then promote selectively.
2. **VengenceUI first** for glass/chrome aligned with OWAH landing.
3. **animate-ui** for drawer/sheet motion when ContentDrawer gets real content.
4. **galaxy** for CSS-only hover/loader micro-patterns.
5. **Forge** for information architecture only (accordion, tabs, quick bar).
6. **No new npm deps** until a specific wrapper is approved for production use.

See `docs/UI_COMPONENT_MAP.md` for route-level mapping and `src/components/ui/experimental/` for wrapper staging.
