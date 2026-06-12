import 'server-only'

export type MyAnimeListEntry = {
  id: string
  title: string
  score: number
  status: 'completed'
  image: string | null
  mediaType: string
  episodes: number | null
  hue: string
  band: string
}

export type MyAnimeListSnapshot = {
  configured: boolean
  lastUpdated: string
  profileUrl: string
  source: 'fallback' | 'myanimelist'
  title: string
  entries: MyAnimeListEntry[]
}

type MalApiListResponse = {
  data?: Array<{
    node: {
      id: number
      main_picture?: {
        large?: string
        medium?: string
      }
      media_type?: string
      num_episodes?: number
      title: string
    }
    list_status?: {
      score?: number
      status?: string
    }
  }>
}

const MAL_API_BASE = 'https://api.myanimelist.net/v2'
const MAL_PROFILE_URL = 'https://myanimelist.net/profile/chiefdrako'

export const MAL_COMPLETED_9_FALLBACK: MyAnimeListEntry[] = [
  { id: '269', title: 'Bleach', score: 10, status: 'completed', image: '/world/watching/bleach-ichigo.jpg', mediaType: 'TV', episodes: 366, hue: '#101820', band: '#e8e8e8' },
  { id: '1575', title: 'Code Geass', score: 10, status: 'completed', image: '/world/watching/code-geass-lelouch.jpg', mediaType: 'TV', episodes: 25, hue: '#182030', band: '#c41e3a' },
  { id: '2904', title: 'Code Geass R2', score: 10, status: 'completed', image: '/world/watching/code-geass-lelouch.jpg', mediaType: 'TV', episodes: 25, hue: '#151d2d', band: '#c41e3a' },
  { id: '1535', title: 'Death Note', score: 10, status: 'completed', image: null, mediaType: 'TV', episodes: 37, hue: '#141418', band: '#334155' },
  { id: '813', title: 'Dragon Ball Z', score: 10, status: 'completed', image: null, mediaType: 'TV', episodes: 291, hue: '#1b1820', band: '#f97316' },
  { id: '268', title: 'Golden Boy', score: 10, status: 'completed', image: null, mediaType: 'OVA', episodes: 6, hue: '#181820', band: '#facc15' },
  { id: '33', title: 'Berserk', score: 10, status: 'completed', image: '/world/watching/berserk-griffith.jpg', mediaType: 'TV', episodes: 25, hue: '#161a22', band: '#8b1a1a' },
  { id: '32182', title: 'Mob Psycho 100', score: 10, status: 'completed', image: null, mediaType: 'TV', episodes: 12, hue: '#1c1c24', band: '#7c3aed' },
  { id: '19', title: 'Monster', score: 10, status: 'completed', image: null, mediaType: 'TV', episodes: 74, hue: '#1a1828', band: '#6b4c9a' },
  { id: '20', title: 'Naruto', score: 10, status: 'completed', image: '/world/watching/naruto-sage.jpg', mediaType: 'TV', episodes: 220, hue: '#1c1820', band: '#ff6600' },
  { id: '1735', title: 'Naruto: Shippuuden', score: 10, status: 'completed', image: '/world/watching/naruto-sage.jpg', mediaType: 'TV', episodes: 500, hue: '#171a24', band: '#ff7a18' },
  { id: '1210', title: 'Welcome to the NHK', score: 10, status: 'completed', image: null, mediaType: 'TV', episodes: 24, hue: '#121820', band: '#38bdf8' },
  { id: '30240', title: 'Prison School', score: 10, status: 'completed', image: null, mediaType: 'TV', episodes: 12, hue: '#181820', band: '#ef4444' },
  { id: '205', title: 'Samurai Champloo', score: 10, status: 'completed', image: null, mediaType: 'TV', episodes: 26, hue: '#131c22', band: '#14b8a6' },
  { id: '30', title: 'Evangelion', score: 10, status: 'completed', image: null, mediaType: 'TV', episodes: 26, hue: '#141820', band: '#4a6fa5' },
  { id: '658', title: 'Akagi', score: 10, status: 'completed', image: null, mediaType: 'TV', episodes: 26, hue: '#121820', band: '#4a5568' },
  { id: '47', title: 'Akira', score: 9, status: 'completed', image: null, mediaType: 'Movie', episodes: 1, hue: '#1b1418', band: '#dc2626' },
  { id: '1', title: 'Cowboy Bebop', score: 9, status: 'completed', image: null, mediaType: 'TV', episodes: 26, hue: '#1a1a22', band: '#2a4a6a' },
  { id: '11061', title: 'Hunter x Hunter', score: 9, status: 'completed', image: '/world/watching/hxh-chrollo.jpg', mediaType: 'TV', episodes: 148, hue: '#142028', band: '#3d8b8b' },
  { id: '5114', title: 'Fullmetal Alchemist', score: 9, status: 'completed', image: null, mediaType: 'TV', episodes: 64, hue: '#181820', band: '#b8860b' },
  { id: '339', title: 'Serial Experiments Lain', score: 9, status: 'completed', image: null, mediaType: 'TV', episodes: 13, hue: '#111827', band: '#64748b' },
  { id: '37779', title: 'The Promised Neverland', score: 9, status: 'completed', image: null, mediaType: 'TV', episodes: 12, hue: '#17191f', band: '#e11d48' },
]

function getMalEnv() {
  const accessToken = process.env.MAL_ACCESS_TOKEN?.trim()
  const clientId = process.env.MAL_CLIENT_ID?.trim()

  return {
    accessToken,
    clientId,
    configured: Boolean(accessToken || clientId),
  }
}

function normalizeApiEntry(item: NonNullable<MalApiListResponse['data']>[number]): MyAnimeListEntry | null {
  const status = item.list_status?.status
  const score = item.list_status?.score ?? 0

  if (status !== 'completed' || score < 9) {
    return null
  }

  return {
    band: score === 10 ? '#f8fafc' : '#7090e8',
    episodes: item.node.num_episodes ?? null,
    hue: score === 10 ? '#101820' : '#151d2d',
    id: String(item.node.id),
    image: item.node.main_picture?.large ?? item.node.main_picture?.medium ?? null,
    mediaType: item.node.media_type?.toUpperCase() ?? 'ANIME',
    score,
    status: 'completed',
    title: item.node.title,
  }
}

export function getMyAnimeListFallbackSnapshot(configured = false): MyAnimeListSnapshot {
  return {
    configured,
    entries: MAL_COMPLETED_9_FALLBACK,
    lastUpdated: new Date().toISOString(),
    profileUrl: MAL_PROFILE_URL,
    source: 'fallback',
    title: 'chiefdrako / Completed 9+',
  }
}

export async function getMyAnimeListSnapshot(): Promise<MyAnimeListSnapshot> {
  const env = getMalEnv()

  if (!env.configured) {
    return getMyAnimeListFallbackSnapshot(false)
  }

  try {
    const search = new URLSearchParams({
      fields: 'list_status,main_picture,media_type,num_episodes',
      limit: '100',
      sort: 'list_score',
      status: 'completed',
    })
    const headers: Record<string, string> = {}

    if (env.accessToken) {
      headers.Authorization = `Bearer ${env.accessToken}`
    }
    if (env.clientId) {
      headers['X-MAL-CLIENT-ID'] = env.clientId
    }

    const response = await fetch(`${MAL_API_BASE}/users/chiefdrako/animelist?${search.toString()}`, {
      cache: 'no-store',
      headers,
    })

    if (!response.ok) {
      throw new Error(`MAL anime list request failed with ${response.status}`)
    }

    const json = (await response.json()) as MalApiListResponse
    const entries = json.data?.map(normalizeApiEntry).filter((entry): entry is MyAnimeListEntry => Boolean(entry)) ?? []

    return {
      configured: true,
      entries: entries.length > 0 ? entries : MAL_COMPLETED_9_FALLBACK,
      lastUpdated: new Date().toISOString(),
      profileUrl: MAL_PROFILE_URL,
      source: entries.length > 0 ? 'myanimelist' : 'fallback',
      title: 'chiefdrako / Completed 9+',
    }
  } catch {
    return getMyAnimeListFallbackSnapshot(true)
  }
}
