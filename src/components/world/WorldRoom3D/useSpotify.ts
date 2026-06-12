'use client'

import { useEffect, useState } from 'react'

import { ALBUM_CANON, NOW_SPINNING } from './worldPersonalData'

export type SpotifyTrackLite = {
  album: string
  albumImage: string | null
  artist: string
  externalUrl: string | null
  id: string
  title: string
}

export type SpotifyPlaylistLite = {
  id: string
  name: string
  owner: string
  trackCount: number
}

export type SpotifyLiveSnapshot = {
  configured: boolean
  lastUpdated: string
  nowPlaying: SpotifyTrackLite | null
  playlists: SpotifyPlaylistLite[]
  recentTracks: SpotifyTrackLite[]
  source: 'fallback' | 'spotify'
  topTracks: SpotifyTrackLite[]
}

const FALLBACK_SNAPSHOT: SpotifyLiveSnapshot = {
  configured: false,
  lastUpdated: '',
  nowPlaying: {
    album: NOW_SPINNING.album,
    albumImage: ALBUM_CANON[1]?.cover ?? null,
    artist: NOW_SPINNING.artist,
    externalUrl: null,
    id: 'fallback-now-spinning',
    title: NOW_SPINNING.track,
  },
  playlists: [],
  recentTracks: ALBUM_CANON.slice(0, 3).map((album) => ({
    album: album.title,
    albumImage: album.cover,
    artist: album.artist,
    externalUrl: null,
    id: album.id,
    title: album.title,
  })),
  source: 'fallback',
  topTracks: ALBUM_CANON.slice(3, 6).map((album) => ({
    album: album.title,
    albumImage: album.cover,
    artist: album.artist,
    externalUrl: null,
    id: album.id,
    title: album.title,
  })),
}

export function useSpotify() {
  const [data, setData] = useState<SpotifyLiveSnapshot>(FALLBACK_SNAPSHOT)

  useEffect(() => {
    let active = true
    const syncSpotify = async () => {
      try {
        const response = await fetch('/api/spotify', { cache: 'no-store' })
        if (!response.ok || !active) {
          return
        }

        const snapshot = (await response.json()) as SpotifyLiveSnapshot
        if (!snapshot.nowPlaying && FALLBACK_SNAPSHOT.nowPlaying) {
          snapshot.nowPlaying = FALLBACK_SNAPSHOT.nowPlaying
        }
        if (snapshot.recentTracks.length === 0) {
          snapshot.recentTracks = FALLBACK_SNAPSHOT.recentTracks
        }
        if (snapshot.topTracks.length === 0) {
          snapshot.topTracks = FALLBACK_SNAPSHOT.topTracks
        }

        setData(snapshot)
      } catch {
        if (active) {
          setData(FALLBACK_SNAPSHOT)
        }
      }
    }

    const initialTimeout = window.setTimeout(() => {
      void syncSpotify()
    }, 0)
    const intervalId = window.setInterval(() => {
      void syncSpotify()
    }, 60_000)

    return () => {
      active = false
      window.clearTimeout(initialTimeout)
      window.clearInterval(intervalId)
    }
  }, [])

  return data
}
