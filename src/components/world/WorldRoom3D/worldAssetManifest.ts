/**
 * Curated visual assets for the world room, selected from the root `World/`
 * archive folder (World Fashion / World Anime / World Aura / World Music).
 * Only room-ready images are listed here; source files stay in `World/`,
 * served copies live under `public/world/`.
 */

export type WorldAssetCategory = 'fashion' | 'watching' | 'music' | 'aura'

export type WorldAsset = {
  id: string
  src: string
  label: string
  category: WorldAssetCategory
  /** Where/how the asset is meant to appear in the room. */
  intendedUse: string
  /** Width / height, used to size 3D planes without distortion. */
  aspect: number
}

export const fashionAssets: WorldAsset[] = [
  {
    id: 'leather-pinstripe',
    src: '/world/fashion/leather-pinstripe.jpg',
    label: 'Leather / Pinstripe',
    category: 'fashion',
    intendedUse: 'Moodboard lightbox card — outerwear reference',
    aspect: 0.74,
  },
  {
    id: 'flare-gate',
    src: '/world/fashion/flare-gate.jpg',
    label: 'Raw Denim Flare',
    category: 'fashion',
    intendedUse: 'Moodboard lightbox card — drape/silhouette reference',
    aspect: 0.75,
  },
  {
    id: 'runway-leather',
    src: '/world/fashion/runway-leather.jpg',
    label: 'Runway Leather',
    category: 'fashion',
    intendedUse: 'Moodboard lightbox card — leather archive reference',
    aspect: 0.666,
  },
  {
    id: 'tabi-stairwell',
    src: '/world/fashion/tabi-stairwell.jpg',
    label: 'Tabi / Western',
    category: 'fashion',
    intendedUse: 'Footwear plinth display insert',
    aspect: 0.515,
  },
  {
    id: 'denim-tokyo',
    src: '/world/fashion/denim-tokyo.jpg',
    label: 'Denim — Tokyo',
    category: 'fashion',
    intendedUse: 'Reserve — alternate moodboard card',
    aspect: 0.644,
  },
  {
    id: 'soloist-runway',
    src: '/world/fashion/soloist-runway.jpg',
    label: 'Soloist Runway',
    category: 'fashion',
    intendedUse: 'Reserve — alternate moodboard card',
    aspect: 0.667,
  },
]

export const watchingAssets: WorldAsset[] = [
  {
    id: 'berserk-griffith',
    src: '/world/watching/berserk-griffith.jpg',
    label: 'Berserk',
    category: 'watching',
    intendedUse: 'Media wall featured panel',
    aspect: 1.333,
  },
  {
    id: 'code-geass-lelouch',
    src: '/world/watching/code-geass-lelouch.jpg',
    label: 'Code Geass',
    category: 'watching',
    intendedUse: 'Media wall featured panel',
    aspect: 1,
  },
  {
    id: 'hxh-chrollo',
    src: '/world/watching/hxh-chrollo.jpg',
    label: 'Hunter x Hunter',
    category: 'watching',
    intendedUse: 'Media wall featured panel',
    aspect: 1.266,
  },
  {
    id: 'bleach-ichigo',
    src: '/world/watching/bleach-ichigo.jpg',
    label: 'Bleach',
    category: 'watching',
    intendedUse: 'Reserve — featured panel rotation',
    aspect: 1,
  },
  {
    id: 'nana-ren',
    src: '/world/watching/nana-ren.jpg',
    label: 'NANA',
    category: 'watching',
    intendedUse: 'Reserve — featured panel rotation',
    aspect: 1,
  },
  {
    id: 'naruto-sage',
    src: '/world/watching/naruto-sage.jpg',
    label: 'Naruto',
    category: 'watching',
    intendedUse: 'Reserve — featured panel rotation',
    aspect: 1,
  },
]

/** Album covers already live on the archive wall via ALBUM_CANON (worldPersonalData). */
export const musicAssets: WorldAsset[] = [
  {
    id: 'album-canon-wall',
    src: '/world/music/TPAB.jpg',
    label: 'Album Canon (12 covers)',
    category: 'music',
    intendedUse: 'Album archive wall — sourced from ALBUM_CANON in worldPersonalData',
    aspect: 1,
  },
]

export const auraAssets: WorldAsset[] = [
  {
    id: 'hendrix-blue-room',
    src: '/world/aura/hendrix-blue-room.jpg',
    label: 'Hendrix — Blue Room',
    category: 'aura',
    intendedUse: 'Reserved — future aura/life wall',
    aspect: 1,
  },
  {
    id: 'rick-james-studio',
    src: '/world/aura/rick-james-studio.jpg',
    label: 'Rick James — Studio',
    category: 'aura',
    intendedUse: 'Reserved — future aura/life wall',
    aspect: 1.49,
  },
  {
    id: 'chief-keef-white-house',
    src: '/world/aura/chief-keef-white-house.jpg',
    label: 'Chief Keef — White House',
    category: 'aura',
    intendedUse: 'Reserved — future aura/life wall',
    aspect: 1,
  },
  {
    id: 'jr-smith-garden',
    src: '/world/aura/jr-smith-garden.jpg',
    label: 'JR Smith — The Garden',
    category: 'aura',
    intendedUse: 'Reserved — future aura/life wall',
    aspect: 1,
  },
]
