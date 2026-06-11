/**
 * Curated personal world data - sourced from WORLD_PROFILE.md and collected archives.
 * Static props only; no API integrations.
 */

export type AlbumCanon = {
  id: string
  title: string
  artist: string
  cover: string
}

export type MediaArchiveItem = {
  title: string
  format: 'anime' | 'film' | 'series'
  hue: string
  band: string
}

/** Hero albums for the archive wall (World Music folder + profile canon). */
export const ALBUM_CANON: AlbumCanon[] = [
  { id: 'tpab', title: 'To Pimp a Butterfly', artist: 'Kendrick Lamar', cover: '/world/music/TPAB.jpg' },
  { id: 'marathon', title: 'The Marathon', artist: 'Nipsey Hussle', cover: '/world/music/TheMarathon.jpg' },
  { id: 'bti', title: 'Because the Internet', artist: 'Childish Gambino', cover: '/world/music/BecauseTheInternet.jpg' },
  { id: 'jeffery', title: 'Jeffery', artist: 'Young Thug', cover: '/world/music/Jeffery.jpg' },
  { id: 'wlr', title: 'Whole Lotta Red', artist: 'Playboi Carti', cover: '/world/music/Slimerre.jpg' },
  { id: 'late-reg', title: 'Late Registration', artist: 'Kanye West', cover: '/world/music/LateRegistration.jpg' },
  { id: 'stevie', title: 'Songs in the Key of Life', artist: 'Stevie Wonder', cover: '/world/music/SongsInTheKeyOfLife.jpg' },
  { id: 'all-eyes', title: 'All Eyez on Me', artist: '2Pac', cover: '/world/music/AllEyezOnMe.jpg' },
  { id: 'finally-rich', title: 'Finally Rich', artist: 'Chief Keef', cover: '/world/music/FinallyRich.jpg' },
  { id: 'carter-iii', title: 'Carter III', artist: 'Lil Wayne', cover: '/world/music/CarterIII.jpg' },
  { id: 'long-live', title: 'Long Live Mexico', artist: 'YoungBoy', cover: '/world/music/LongLiveMexico.jpg' },
  { id: 'dying-live', title: 'Dying to Live', artist: 'Kodak Black', cover: '/world/music/Dying2Live.jpg' },
]

/** Currently spinning - recent rotation from profile + CSV. */
export const NOW_SPINNING = {
  track: 'New Detroit',
  artist: 'Lelo',
  album: 'Nightingale',
}

/** Watching archive - legible mocked media archive using local palette and known canon. */
export const MEDIA_ARCHIVE_SPINES: MediaArchiveItem[] = [
  { title: 'Berserk', format: 'anime', hue: '#161a22', band: '#8b1a1a' },
  { title: 'Code Geass', format: 'anime', hue: '#182030', band: '#c41e3a' },
  { title: 'Evangelion', format: 'anime', hue: '#141820', band: '#4a6fa5' },
  { title: 'Naruto', format: 'anime', hue: '#1c1820', band: '#ff6600' },
  { title: 'Bleach', format: 'anime', hue: '#101820', band: '#e8e8e8' },
  { title: 'Monster', format: 'anime', hue: '#1a1828', band: '#6b4c9a' },
  { title: 'Hunter x Hunter', format: 'anime', hue: '#142028', band: '#3d8b8b' },
  { title: 'Fullmetal', format: 'anime', hue: '#181820', band: '#b8860b' },
  { title: 'Cowboy Bebop', format: 'anime', hue: '#1a1a22', band: '#2a4a6a' },
  { title: 'Akagi', format: 'anime', hue: '#121820', band: '#4a5568' },
  { title: 'Mob Psycho', format: 'anime', hue: '#1c1c24', band: '#7c3aed' },
  { title: 'Death Note', format: 'anime', hue: '#141418', band: '#334155' },
  { title: '91 Days', format: 'series', hue: '#17191f', band: '#6b7280' },
  { title: 'Perfect Blue', format: 'film', hue: '#191a24', band: '#2563eb' },
  { title: 'Samurai Champloo', format: 'anime', hue: '#131c22', band: '#14b8a6' },
]

/** Active watchlist from MAL export. */
export const NOW_WATCHING = {
  title: '91 Days',
  mood: 'noir revenge',
  format: 'series',
}

/** Life feed ambient signals - environmental storytelling only. */
export const LIFE_SIGNALS = [
  { label: 'rotation', color: '#3dff9a', phase: 0 },
  { label: 'archive', color: '#00c8e8', phase: 1.4 },
  { label: 'wardrobe', color: '#c41e3a', phase: 2.8 },
  { label: 'watching', color: '#7090e8', phase: 4.2 },
] as const
