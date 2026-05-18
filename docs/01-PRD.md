# DOCUMENT 1 — PRODUCT REQUIREMENTS DOCUMENT
## OWAH.WORLD — V1

---

### 1. WHAT IT IS

A personal operating system and living identity archive. OWAH.WORLD is a self-portrait built as a website — four distinct environments, each representing a different dimension of one person. The visitor does not interact with a portfolio. They enter a world.

---

### 2. WHAT IT IS NOT

- Not a portfolio site
- Not a blog
- Not a social media profile
- Not a resume
- Not a dashboard
- Not minimalist
- Not neutral
- Not built for everyone

---

### 3. PRODUCT PHILOSOPHY

> The interface is the product. The aesthetic is the argument. The visitor witnesses a world that already exists — they are not being sold to, they are being shown.

Everything chrome. Everything reflective. Fragments that cohere into a self.

---

### 4. EMOTIONAL GOALS

| Goal | Description |
|------|-------------|
| Overwhelming presence | The site should feel like walking into a space that has weight |
| Controlled chaos | Dense but legible. Complex but navigable |
| Chrome intimacy | Cold surface, warm interior. Reflective but personal |
| Living archive | Content feels curated and alive, not static |
| Technological humanity | The machine aesthetic contains a real person |

---

### 5. TARGET FEELING

The SpongeBob chrome episode. Everything reflective, hyper-real, slightly alien. Depthcore crystalline fracture. Diamonds. Laser light through glass. Cold and beautiful and slightly overwhelming.

---

### 6. SITE STRUCTURE

```
/           LANDING     CD + Chrome + Dock
/code       CODE        Synthwave grid + pillars
/words      WORDS       Fall of Rome + content layers
/world      WORLD       The Room + The Figure
```

Four destinations. One persistent navigation layer.

---

### 7. PAGE SPECIFICATIONS

---

#### LANDING — `/`

**Background:** Global chrome. Green laser grid lines. Pure reflective atmosphere.

**Hero element:** 3D CD, center screen. *What a Time to Be Alive* cover art printed on disc face. Interactive — draggable, rotatable.

**Navigation:** Liquid glass dock at bottom. Four icons, one per section. Persistent across all pages.

**Purpose:** Establish the world before content begins. The CD is the identity signal.

---

#### CODE — `/code`

**Background:** Infinite synthwave perspective grid. Neon blue/purple. Pillars rising from the floor.

**Reference:** Secret Service *Greatest Hits* cover. That exact spatial language.

**Content:** Each pillar = one project. Screenshot on the face.

**Navigation:** Snake/winding path through pillars. Non-linear scroll.

**Interaction:** Click pillar → zooms in → embedded project preview + link to live site or repo.

---

#### WORDS — `/words`

**Background:** Thomas Cole, *The Course of Empire: Destruction* (1836). Full bleed. Civilizational collapse as wallpaper.

**Layer 1 — Philosophy:** Liquid glass boxes floating over the painting. Each box = a thinker, a book, a philosophical idea. Scrollable within box. Clickable to expand. Subjects include: Jung, Sankara, Malcolm X, Kwame Ture, and others.

**Layer 2 — Writing:** PDF thumbnails scattered over the background. Variable sizes. Positioned non-uniformly. Click → enlarges → readable in place.

**Interaction logic:** Two types of content, same background, same page. Floating together over the fall.

---

#### WORLD — `/world`

**Background:** Fendi-style blue marble room. Luxury retail space aesthetic. Racks, tables, surfaces.

**Hero element:** The Figure — a mosaic human silhouette built from fragments (fashion images, album art, anime stills, film frames). Stands in the room.

**Interaction — The Figure:** Click any fragment piece → enlarges → reveals the source item.

**Interaction — The Room:**
- Clothes rack → fashion (personal fits + inspiration images)
- Table → music (albums, listening history)
- Screen/wall → watching (films, anime)

**Two layers. One space. The figure is who. The room is what.**

---

### 8. GLOBAL SYSTEMS

**Chrome background:** Present on all pages. The foundation that never changes.

**Liquid glass:** The UI material. Used for dock, cards, boxes, overlays. Consistent across all pages.

**Dock:** Persistent bottom navigation. Four icons. Always accessible.

**Transitions:** Fast, smooth, page-to-page. Each page has distinct theme but shares chrome foundation.

---

### 9. MVP SCOPE — V1

**IN SCOPE:**

- Landing page with interactive CD
- Persistent liquid glass dock
- Code page with synthwave grid and pillar navigation
- Words page with Fall of Rome background, glass boxes, PDF thumbnails
- World page with room environment and mosaic figure
- Chrome global aesthetic
- Mobile-responsive layouts
- Basic content for each section

**OUT OF SCOPE FOR V1:**

- User accounts or authentication
- CMS or admin panel
- Real-time data (Spotify API, GitHub live sync, etc.) — Phase 5 only
- Comments or social features
- Search functionality
- Dark/light mode toggle
- Analytics dashboard
- Blog or news feed

---

### 10. CONSTRAINTS

- Frontend only — no backend required for V1
- Static or near-static content acceptable for launch
- Performance must not be sacrificed for visual ambition
- Must work on modern desktop browsers (Chrome, Safari, Firefox)
- Mobile layout required but mobile is secondary experience
- No placeholder pages shipped — if a section isn't ready, it doesn't exist yet

---

### 11. SUCCESS CRITERIA

A person lands on OWAH.WORLD and within 10 seconds:
- Knows exactly whose world this is
- Feels something
- Wants to keep exploring

A person who knows the owner sees the site and says: *"This is exactly you."*

---

### 12. NON-GOALS

- Accessibility to everyone — this is intentionally dense and specific
- SEO optimization — this is not a discovery product
- Fast content consumption — visitors are meant to slow down
- Explaining who you are — the site shows, never tells

---

### 13. V1 PRIORITIES

```
P0  Landing (CD + chrome + dock)
P0  Global chrome aesthetic + liquid glass system
P1  Code page (synthwave grid + pillars)
P1  Words page (Fall of Rome + content layers)
P2  World page (Room + Figure)
P3  Polish, transitions, refinement pass
```
