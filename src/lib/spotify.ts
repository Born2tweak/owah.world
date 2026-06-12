import 'server-only'

export type SpotifyTrack = {
  album: string
  albumImage: string | null
  artist: string
  externalUrl: string | null
  id: string
  title: string
}

export type SpotifyPlaylist = {
  id: string
  name: string
  owner: string
  trackCount: number
}

export type SpotifySnapshot = {
  configured: boolean
  lastUpdated: string
  nowPlaying: SpotifyTrack | null
  playlists: SpotifyPlaylist[]
  recentTracks: SpotifyTrack[]
  source: 'fallback' | 'spotify'
  topTracks: SpotifyTrack[]
}

type SpotifyTokenResponse = {
  access_token: string
}

type SpotifyArtist = {
  name: string
}

type SpotifyImage = {
  url: string
}

type SpotifyAlbum = {
  images?: SpotifyImage[]
  name: string
}

type SpotifyTrackItem = {
  album: SpotifyAlbum
  artists: SpotifyArtist[]
  external_urls?: { spotify?: string }
  id: string
  name: string
}

type SpotifyRecentResponse = {
  items: Array<{
    track: SpotifyTrackItem
  }>
}

type SpotifyTopTracksResponse = {
  items: SpotifyTrackItem[]
}

type SpotifyPlaylistsResponse = {
  items: Array<{
    id: string
    name: string
    owner: { display_name?: string | null }
    tracks?: { total?: number }
  }>
}

const SPOTIFY_API_BASE = 'https://api.spotify.com/v1'
const SPOTIFY_TOKEN_URL = 'https://accounts.spotify.com/api/token'

function getSpotifyEnv() {
  const clientId = process.env.SPOTIFY_CLIENT_ID?.trim()
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET?.trim()
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN?.trim()

  return {
    clientId,
    clientSecret,
    configured: Boolean(clientId && clientSecret && refreshToken),
    refreshToken,
  }
}

function toTrack(track: SpotifyTrackItem): SpotifyTrack {
  return {
    album: track.album.name,
    albumImage: track.album.images?.[0]?.url ?? null,
    artist: track.artists.map((artist) => artist.name).join(', '),
    externalUrl: track.external_urls?.spotify ?? null,
    id: track.id,
    title: track.name,
  }
}

async function refreshSpotifyAccessToken() {
  const env = getSpotifyEnv()
  if (!env.configured || !env.clientId || !env.clientSecret || !env.refreshToken) {
    return null
  }

  const auth = Buffer.from(`${env.clientId}:${env.clientSecret}`).toString('base64')
  const body = new URLSearchParams({
    grant_type: 'refresh_token',
    refresh_token: env.refreshToken,
  })

  const response = await fetch(SPOTIFY_TOKEN_URL, {
    body,
    cache: 'no-store',
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    method: 'POST',
  })

  if (!response.ok) {
    throw new Error(`Spotify token refresh failed with ${response.status}`)
  }

  const json = (await response.json()) as SpotifyTokenResponse
  return json.access_token
}

async function fetchSpotifyJson<T>(path: string, accessToken: string) {
  const response = await fetch(`${SPOTIFY_API_BASE}${path}`, {
    cache: 'no-store',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  if (!response.ok) {
    throw new Error(`Spotify API request failed for ${path} with ${response.status}`)
  }

  return (await response.json()) as T
}

async function getCurrentlyPlaying(accessToken: string) {
  const response = await fetch(`${SPOTIFY_API_BASE}/me/player/currently-playing`, {
    cache: 'no-store',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  if (response.status === 204) {
    return null
  }

  if (!response.ok) {
    throw new Error(`Spotify currently-playing failed with ${response.status}`)
  }

  const json = (await response.json()) as { item?: SpotifyTrackItem | null }
  return json.item ? toTrack(json.item) : null
}

export function getSpotifyFallbackSnapshot(): SpotifySnapshot {
  return {
    configured: false,
    lastUpdated: new Date().toISOString(),
    nowPlaying: null,
    playlists: [],
    recentTracks: [],
    source: 'fallback',
    topTracks: [],
  }
}

export async function getSpotifySnapshot(): Promise<SpotifySnapshot> {
  const env = getSpotifyEnv()

  if (!env.configured) {
    return getSpotifyFallbackSnapshot()
  }

  try {
    const accessToken = await refreshSpotifyAccessToken()
    if (!accessToken) {
      return getSpotifyFallbackSnapshot()
    }

    const [nowPlaying, recent, topTracks, playlists] = await Promise.all([
      getCurrentlyPlaying(accessToken),
      fetchSpotifyJson<SpotifyRecentResponse>('/me/player/recently-played?limit=4', accessToken),
      fetchSpotifyJson<SpotifyTopTracksResponse>('/me/top/tracks?limit=4&time_range=short_term', accessToken),
      fetchSpotifyJson<SpotifyPlaylistsResponse>('/me/playlists?limit=3', accessToken),
    ])

    return {
      configured: true,
      lastUpdated: new Date().toISOString(),
      nowPlaying,
      playlists: playlists.items.map((playlist) => ({
        id: playlist.id,
        name: playlist.name,
        owner: playlist.owner.display_name ?? 'Spotify',
        trackCount: playlist.tracks?.total ?? 0,
      })),
      recentTracks: recent.items.map((item) => toTrack(item.track)),
      source: 'spotify',
      topTracks: topTracks.items.map(toTrack),
    }
  } catch {
    return {
      ...getSpotifyFallbackSnapshot(),
      configured: true,
    }
  }
}
