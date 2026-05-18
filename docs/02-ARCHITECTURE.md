# DOCUMENT 2 — ARCHITECTURE
## OWAH.WORLD

---

### 1. TECH STACK

| Layer | Technology | Reason |
|-------|-----------|--------|
| Framework | Next.js 14 (App Router) | Best Three.js ecosystem, API routes built-in |
| 3D | React Three Fiber + Drei | CD scene, synthwave grid |
| Animation | Framer Motion + GSAP | Page transitions + path/scroll animation |
| Styling | Tailwind + CSS custom properties | Utility classes + design tokens |
| State | Zustand | Lightweight, no boilerplate |
| Live data | Spotify API, GitHub API, Letterboxd RSS | Music history, repos, watching |

> NOTE: Project is currently scaffolded as Vite/React. Migration to Next.js is the first step of Phase 0.

---

### 2. SITE MAP

```
owah.world/
├── /              Landing     CD + chrome + dock
├── /code          Code        Synthwave grid + pillars
├── /words         Words       Fall of Rome + content layers
└── /world         World       Room + Figure
```

---

### 3. ROUTING STRUCTURE

```
app/
├── layout.tsx          ← Root layout: chrome bg + dock (wraps everything)
├── page.tsx            ← Landing
├── code/
│   └── page.tsx
├── words/
│   └── page.tsx
├── world/
│   └── page.tsx
└── api/
    ├── spotify/
    │   └── route.ts    ← Recent tracks, top artists
    ├── github/
    │   └── route.ts    ← Repos, pinned projects
    └── letterboxd/
        └── route.ts    ← Recent watches via RSS
```

---

### 4. FOLDER STRUCTURE

```
src/
├── app/                          ← Next.js App Router
├── components/
│   ├── layout/
│   │   ├── ChromeBackground/     ← Global chrome layer
│   │   ├── Dock/                 ← Persistent liquid glass nav
│   │   └── PageTransition/       ← Framer Motion wrapper
│   ├── landing/
│   │   ├── CDScene/
│   │   │   ├── CDMesh.tsx        ← 3D disc geometry
│   │   │   ├── CDTexture.tsx     ← WATTBA artwork on disc
│   │   │   └── LaserGrid.tsx     ← Background laser lines
│   │   └── CDScene.tsx           ← R3F Canvas container
│   ├── code/
│   │   ├── SynthwaveScene/
│   │   │   ├── GridFloor.tsx     ← Infinite perspective grid
│   │   │   ├── Pillar.tsx        ← Single project pillar
│   │   │   └── CameraPath.tsx    ← Snake navigation logic
│   │   └── ProjectModal/         ← Embed + link overlay
│   ├── words/
│   │   ├── PhilosophyBox/        ← Liquid glass card (thinker/book)
│   │   ├── PDFThumbnail/         ← Scattered writing tile
│   │   └── PDFReader/            ← Fullscreen PDF modal
│   ├── world/
│   │   ├── RoomEnvironment/      ← Fendi-style room layout
│   │   ├── FigureMosaic/
│   │   │   ├── MosaicTile.tsx    ← Individual clickable fragment
│   │   │   └── FigureMosaic.tsx  ← Canvas figure assembly
│   │   └── ContentDrawer/        ← Slide-out panel per category
│   └── ui/
│       ├── LiquidGlass/          ← Base glass card component
│       ├── Icon/                 ← Dock icons
│       └── Modal/                ← Base modal wrapper
├── lib/
│   ├── api/
│   │   ├── spotify.ts
│   │   ├── github.ts
│   │   └── letterboxd.ts
│   ├── hooks/
│   │   ├── useSpotify.ts
│   │   ├── useGitHub.ts
│   │   └── useLetterboxd.ts
│   └── stores/
│       ├── navigation.store.ts
│       ├── modal.store.ts
│       └── cd.store.ts
├── content/
│   ├── data/
│   │   ├── philosophers.json
│   │   ├── books.json
│   │   ├── writings.json
│   │   ├── fashion.json
│   │   └── own-music.json
│   └── pdfs/                     ← Your writing files
└── styles/
    ├── tokens.css                ← All design tokens
    └── globals.css
```

---

### 5. DESIGN TOKEN SYSTEM

```css
:root {
  /* Chrome palette — global foundation */
  --chrome-base:     #c0c0c0;
  --chrome-light:    #e8e8e8;
  --chrome-dark:     #808080;
  --chrome-reflect:  rgba(255, 255, 255, 0.4);

  /* Page accent colors — each section's identity */
  --accent-landing:  #00ff88;       /* laser green */
  --accent-code:     #4400ff;       /* synthwave purple-blue */
  --accent-words:    #8b4513;       /* fall-of-rome earth */
  --accent-world:    #00bfff;       /* fendi aqua */

  /* Liquid glass system */
  --glass-bg:        rgba(255, 255, 255, 0.08);
  --glass-border:    rgba(255, 255, 255, 0.20);
  --glass-blur:      20px;
  --glass-radius:    20px;

  /* Motion */
  --ease-spring:     cubic-bezier(0.34, 1.56, 0.64, 1);
  --ease-smooth:     cubic-bezier(0.40, 0.00, 0.20, 1);
  --ease-out:        cubic-bezier(0.00, 0.00, 0.20, 1);
  --duration-fast:   150ms;
  --duration-normal: 300ms;
  --duration-slow:   600ms;

  /* Typography */
  --font-mono:       'JetBrains Mono', monospace;
  --font-display:    'Inter', sans-serif;
}
```

---

### 6. COMPONENT HIERARCHY

```
RootLayout
├── ChromeBackground          ← always present
├── Dock                      ← always present, 4 icons
└── PageTransition
    └── [page]

Landing
└── CDScene (R3F Canvas)
    ├── CDMesh + CDTexture
    └── LaserGrid

Code
└── SynthwaveScene (R3F Canvas)
    ├── GridFloor
    ├── Pillar[] (one per project)
    └── CameraPath
    + ProjectModal (overlay)

Words
├── FallOfRomeBackground
├── PhilosophyBox[] (glass cards)
└── PDFThumbnail[] (scattered)
    + PDFReader (modal)

World
├── RoomEnvironment
│   ├── FigureMosaic (canvas)
│   │   └── MosaicTile[]
│   ├── FashionRack (clickable zone)
│   ├── MusicTable (clickable zone)
│   └── WatchingScreen (clickable zone)
└── ContentDrawer (slide-out)
    ├── FashionGrid
    ├── MusicGrid
    └── WatchingGrid
```

---

### 7. STATE MANAGEMENT

Three Zustand stores. Each owns a single domain.

```typescript
// navigation.store.ts
interface NavigationStore {
  currentPage: 'landing' | 'code' | 'words' | 'world'
  dockVisible: boolean
}

// modal.store.ts
interface ModalStore {
  openModal: string | null
  openPDF: string | null
  openProject: string | null
  openFragment: string | null
}

// cd.store.ts  (landing only)
interface CDStore {
  isSpinning: boolean
  isDragging: boolean
  rotation: { x: number; y: number }
}
```

---

### 8. DATA STRUCTURES

```typescript
// Static content
interface Project {
  id: string
  title: string
  description: string
  screenshot: string
  liveUrl?: string
  repoUrl: string
  tags: string[]
}

interface Philosopher {
  id: string
  name: string
  portrait: string
  quote: string
  description: string
  works: string[]
}

interface Writing {
  id: string
  title: string
  type: 'essay' | 'poem' | 'excerpt'
  pdfUrl: string
  thumbnail: string
  date: string
  displaySize: 'sm' | 'md' | 'lg'
}

interface FashionItem {
  id: string
  image: string
  type: 'fit' | 'inspiration'
}

interface OwnTrack {
  id: string
  title: string
  cover: string
  streamUrl: string
}

// Live data
interface SpotifyTrack {
  title: string
  artist: string
  albumCover: string
  playedAt: string
}

interface WatchItem {
  title: string
  type: 'film' | 'anime'
  poster: string
  watchedAt: string
}
```

---

### 9. ANIMATION ARCHITECTURE

| System | Technology | Used For |
|--------|-----------|----------|
| 3D scenes | React Three Fiber | CD, synthwave grid |
| Page transitions | Framer Motion AnimatePresence | Route changes |
| Snake navigation | GSAP ScrollTrigger | Code pillar path |
| Hover/micro | CSS transitions | Dock, glass cards |
| Mosaic assembly | HTML Canvas API | Figure construction |

**One rule:** No animation system bleeds into another system's domain.

---

### 10. CONTENT PIPELINE

| Content | Type | Storage | Update method |
|---------|------|---------|---------------|
| Writing (PDFs) | Static | `/content/pdfs/` | Manual upload |
| Philosophers/Books | Static | JSON files | Manual edit |
| Fashion images | Static | `/public/images/fashion/` | Manual upload |
| Own music | Static | JSON + stream links | Manual edit |
| GitHub repos | Live | GitHub API | Auto, revalidate 1hr |
| Spotify history | Live | Spotify API | Auto, revalidate 15min |
| Watching | Live | Letterboxd RSS | Auto, revalidate 1hr |

---

### 11. DEPLOYMENT

```
Platform:    Vercel
Build:       next build (static + ISR)
Env vars:    SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET,
             SPOTIFY_REFRESH_TOKEN, GITHUB_TOKEN
Images:      Next.js Image (auto-optimized)
Caching:     Static pages CDN-cached
             Live API routes: ISR with revalidation intervals
```
