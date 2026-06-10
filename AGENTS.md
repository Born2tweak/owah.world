## Learned User Preferences

- Create git commits and push only when explicitly asked; do not commit proactively.
- Keep `docs/CONTEXT-EXPORT.md` at or under 8000 characters for session handoff paste-ins.
- For `/world`, the approved visual direction is a walkable luxury showroom—a spatial environment, not a dashboard, collage, mosaic, sidebar, category browser, or floating UI panels.
- `/world` has exactly four content zones: Fashion, Music, Watching, Life Feed—no extra categories or feature creep.
- On `/world`, the room is the interface: no left sidebar, giant category list, or drawer/modal browsing; global Dock is the only page navigation.
- `/world` interactions use cinematic camera positions (overview + per-zone) with slow Framer Motion transitions—hover illuminates, click glides camera in, return restores overview.
- For `/words` archive work, prefer text-first cards (title, excerpt, category, source); show images only in the excerpt viewer and full-text modal, not in small cards; hide broken images rather than showing placeholders.
- For scoped milestone tasks on `/world` and `/words`, avoid full-page redesigns, unrelated polish, new features, and starting the next milestone unless asked.
- Recurring `/world` milestone constraints: do not add APIs; do not modify global layout shell components (ChromeBackground, TopNav, Dock, PageTransition, CornerHUD).

## Learned Workspace Facts

- Workspace: `owah.world-1` — personal “living OS” site (Landing, Code, Words, World) on Next.js 15 App Router, React 19, R3F/Three, Framer Motion, Zustand, Tailwind 4.
- Git remote: `https://github.com/Born2tweak/owah.world.git`, default branch `master`.
- Production Vercel project: `owah-world` at https://owah-world.vercel.app.
- Session handoff docs: `docs/CONTEXT-EXPORT.md` (≤8000 chars), `CURRENT_STATE.md`, `ACTIVE_BUGS.md`, `docs/04-ROADMAP.md`.
- Local dev: `npm run dev` → http://localhost:3000; stale `node.exe` on port 3000 can serve 404 for `/world`—kill PID and restart; use `npm run dev:clean` when `.next` is corrupted.
- `/world` canonical implementation lives under `src/components/world/showroom/` (ShowroomRoom, ShowroomHud, `useShowroomCamera`, `showroomCamera`); WorldScene composes HUD + room only. Legacy mosaic stack under `FigureMosaic/` remains in repo but is unwired.
- `/words` desktop archive: `src/components/words/WordsDesktopSkeleton.tsx` with assets under `public/words/archive/`.
- Merge CLI is configured in `.cursorrules` for third-party service tasks (`merge search-tools`, `merge execute-tool`).
