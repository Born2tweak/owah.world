Place /words archive raster assets here using these exact basenames:

- `patrice-lumumba.jpg` (or `.jpeg`, `.png`, `.webp`)
- `gospel-of-thomas.jpg`
- `kwame-ture.jpg`
- `carl-jung.jpg`
- `malcolm-x.jpg`
- `thomas-sankara.jpg`
- `ibn-arabi.jpg`

Mapped in `src/components/words/WordsDesktopSkeleton.tsx`.

**Viewer behavior:** excerpt viewer and full-text modal preload the first existing raster file (`.jpg` → `.jpeg` → `.png` → `.webp`). Archive cards stay text-only. If no raster file exists, the warm CSS archival placeholder shows — no SVG stand-ins.

**My Works** has no `imagePath` and keeps the studio CSS visual only.
