'use client'

import { useEffect, useState } from 'react'

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

const FALLBACK_ENTRIES: MyAnimeListEntry[] = [
  { id: '269', title: 'Bleach', score: 10, status: 'completed', image: '/world/watching/bleach-ichigo.jpg', mediaType: 'TV', episodes: 366, hue: '#101820', band: '#e8e8e8' },
  { id: '1575', title: 'Code Geass', score: 10, status: 'completed', image: '/world/watching/code-geass-lelouch.jpg', mediaType: 'TV', episodes: 25, hue: '#182030', band: '#c41e3a' },
  { id: '1535', title: 'Death Note', score: 10, status: 'completed', image: null, mediaType: 'TV', episodes: 37, hue: '#141418', band: '#334155' },
  { id: '33', title: 'Berserk', score: 10, status: 'completed', image: '/world/watching/berserk-griffith.jpg', mediaType: 'TV', episodes: 25, hue: '#161a22', band: '#8b1a1a' },
  { id: '32182', title: 'Mob Psycho 100', score: 10, status: 'completed', image: null, mediaType: 'TV', episodes: 12, hue: '#1c1c24', band: '#7c3aed' },
  { id: '19', title: 'Monster', score: 10, status: 'completed', image: null, mediaType: 'TV', episodes: 74, hue: '#1a1828', band: '#6b4c9a' },
  { id: '20', title: 'Naruto', score: 10, status: 'completed', image: '/world/watching/naruto-sage.jpg', mediaType: 'TV', episodes: 220, hue: '#1c1820', band: '#ff6600' },
  { id: '205', title: 'Samurai Champloo', score: 10, status: 'completed', image: null, mediaType: 'TV', episodes: 26, hue: '#131c22', band: '#14b8a6' },
  { id: '30', title: 'Evangelion', score: 10, status: 'completed', image: null, mediaType: 'TV', episodes: 26, hue: '#141820', band: '#4a6fa5' },
  { id: '47', title: 'Akira', score: 9, status: 'completed', image: null, mediaType: 'Movie', episodes: 1, hue: '#1b1418', band: '#dc2626' },
  { id: '1', title: 'Cowboy Bebop', score: 9, status: 'completed', image: null, mediaType: 'TV', episodes: 26, hue: '#1a1a22', band: '#2a4a6a' },
  { id: '11061', title: 'Hunter x Hunter', score: 9, status: 'completed', image: '/world/watching/hxh-chrollo.jpg', mediaType: 'TV', episodes: 148, hue: '#142028', band: '#3d8b8b' },
]

const FALLBACK_SNAPSHOT: MyAnimeListSnapshot = {
  configured: false,
  entries: FALLBACK_ENTRIES,
  lastUpdated: '',
  profileUrl: 'https://myanimelist.net/profile/chiefdrako',
  source: 'fallback',
  title: 'chiefdrako / Completed 9+',
}

export function useMyAnimeList() {
  const [data, setData] = useState<MyAnimeListSnapshot>(FALLBACK_SNAPSHOT)

  useEffect(() => {
    let active = true

    const syncMyAnimeList = async () => {
      try {
        const response = await fetch('/api/myanimelist', { cache: 'no-store' })
        if (!response.ok || !active) {
          return
        }

        const snapshot = (await response.json()) as MyAnimeListSnapshot
        if (snapshot.entries.length === 0) {
          snapshot.entries = FALLBACK_ENTRIES
        }
        setData(snapshot)
      } catch {
        if (active) {
          setData(FALLBACK_SNAPSHOT)
        }
      }
    }

    const initialTimeout = window.setTimeout(() => {
      void syncMyAnimeList()
    }, 0)

    return () => {
      active = false
      window.clearTimeout(initialTimeout)
    }
  }, [])

  return data
}
