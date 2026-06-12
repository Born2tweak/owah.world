'use client'

import { useEffect, useState } from 'react'

export type InstagramLifeSignal = {
  id: string
  caption: string
  mediaType: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM' | 'TEXT'
  mediaUrl: string | null
  permalink: string | null
  timestamp: string
  color: string
}

export type InstagramSnapshot = {
  account: string
  configured: boolean
  lastUpdated: string
  profileUrl: string
  signals: InstagramLifeSignal[]
  source: 'fallback' | 'instagram'
}

const FALLBACK_SIGNALS: InstagramLifeSignal[] = [
  {
    caption: 'latest aura check',
    color: '#ffb347',
    id: 'fallback-aura',
    mediaType: 'TEXT',
    mediaUrl: null,
    permalink: 'https://www.instagram.com/andr1ank/',
    timestamp: '2026-06-12T00:00:00.000Z',
  },
  {
    caption: 'fit archive pulse',
    color: '#00c8e8',
    id: 'fallback-fit',
    mediaType: 'TEXT',
    mediaUrl: null,
    permalink: 'https://www.instagram.com/andr1ank/',
    timestamp: '2026-06-11T00:00:00.000Z',
  },
  {
    caption: 'world signal online',
    color: '#3dff9a',
    id: 'fallback-world',
    mediaType: 'TEXT',
    mediaUrl: null,
    permalink: 'https://www.instagram.com/andr1ank/',
    timestamp: '2026-06-10T00:00:00.000Z',
  },
]

const FALLBACK_SNAPSHOT: InstagramSnapshot = {
  account: '@andr1ank',
  configured: false,
  lastUpdated: '',
  profileUrl: 'https://www.instagram.com/andr1ank/',
  signals: FALLBACK_SIGNALS,
  source: 'fallback',
}

export function useInstagram() {
  const [data, setData] = useState<InstagramSnapshot>(FALLBACK_SNAPSHOT)

  useEffect(() => {
    let active = true

    const syncInstagram = async () => {
      try {
        const response = await fetch('/api/instagram', { cache: 'no-store' })
        if (!response.ok || !active) {
          return
        }

        const snapshot = (await response.json()) as InstagramSnapshot
        if (snapshot.signals.length === 0) {
          snapshot.signals = FALLBACK_SIGNALS
        }
        setData(snapshot)
      } catch {
        if (active) {
          setData(FALLBACK_SNAPSHOT)
        }
      }
    }

    const initialTimeout = window.setTimeout(() => {
      void syncInstagram()
    }, 0)

    const intervalId = window.setInterval(() => {
      void syncInstagram()
    }, 90_000)

    return () => {
      active = false
      window.clearTimeout(initialTimeout)
      window.clearInterval(intervalId)
    }
  }, [])

  return data
}
