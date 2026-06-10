# Experimental UI wrappers

Staging area for UI patterns researched from global clones (see `docs/UI_RESEARCH.md`).

## Rules

- **Wrappers only** — pass-through slots with `data-experimental-*` attributes for future styling.
- **Do not import** from pages until an integration milestone approves promotion.
- **No new dependencies** — port CSS/motion manually from source repos.
- **Do not copy** entire third-party files into this tree.

## Folders

| Folder | Intent |
|--------|--------|
| `animations/` | Enter/exit, stagger, reveal |
| `glass/` | Blur, border, saturation surfaces |
| `drawers/` | Slide panels, sheet behavior |
| `cards/` | Glow borders, hover lift |
| `panels/` | Dense accordion/tab IA (Forge-inspired) |
| `navigation/` | Spotlight nav, dock chrome |
| `effects/` | Shine, tilt, magnetic accents |

## Promotion

1. Implement pattern inside wrapper (CSS module + FM as needed).
2. Review against route canon (especially `/world` mosaic).
3. Move to domain or `src/components/ui/` when stable.
