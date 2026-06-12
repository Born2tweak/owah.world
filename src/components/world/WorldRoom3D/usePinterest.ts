'use client'

import { useEffect, useState } from 'react'

export type PinterestFitPin = {
  id: string
  title: string
  description: string
  image: string
  link: string | null
  dominantColor: string
  aspect: number
}

export type PinterestBoardSnapshot = {
  boardUrl: string
  configured: boolean
  lastUpdated: string
  pins: PinterestFitPin[]
  source: 'fallback' | 'pinterest'
  title: string
}

const FALLBACK_PINS: PinterestFitPin[] = [
  {
    id: 'leather-pinstripe',
    title: 'Leather / Pinstripe',
    description: 'Tailored darkwear reference from the local archive.',
    image: '/world/fashion/leather-pinstripe.jpg',
    link: 'https://www.pinterest.com/drakolifestyle/fits/',
    dominantColor: '#101820',
    aspect: 0.74,
  },
  {
    id: 'flare-gate',
    title: 'Raw Denim Flare',
    description: 'Wide-leg silhouette reference from the wardrobe archive.',
    image: '/world/fashion/flare-gate.jpg',
    link: 'https://www.pinterest.com/drakolifestyle/fits/',
    dominantColor: '#172231',
    aspect: 0.75,
  },
  {
    id: 'runway-leather',
    title: 'Runway Leather',
    description: 'Black leather runway mood from the curated fashion set.',
    image: '/world/fashion/runway-leather.jpg',
    link: 'https://www.pinterest.com/drakolifestyle/fits/',
    dominantColor: '#111217',
    aspect: 0.666,
  },
  {
    id: 'tabi-stairwell',
    title: 'Tabi / Western',
    description: 'Footwear and proportion reference for the Fits board.',
    image: '/world/fashion/tabi-stairwell.jpg',
    link: 'https://www.pinterest.com/drakolifestyle/fits/',
    dominantColor: '#1a1f2a',
    aspect: 0.515,
  },
]

const FALLBACK_SNAPSHOT: PinterestBoardSnapshot = {
  boardUrl: 'https://www.pinterest.com/drakolifestyle/fits/',
  configured: false,
  lastUpdated: '',
  pins: FALLBACK_PINS,
  source: 'fallback',
  title: 'drakolifestyle / Fits',
}

export function usePinterestFits() {
  const [data, setData] = useState<PinterestBoardSnapshot>(FALLBACK_SNAPSHOT)

  useEffect(() => {
    let active = true

    const syncPinterest = async () => {
      try {
        const response = await fetch('/api/pinterest', { cache: 'no-store' })
        if (!response.ok || !active) {
          return
        }

        const snapshot = (await response.json()) as PinterestBoardSnapshot
        if (snapshot.pins.length === 0) {
          snapshot.pins = FALLBACK_PINS
        }
        setData(snapshot)
      } catch {
        if (active) {
          setData(FALLBACK_SNAPSHOT)
        }
      }
    }

    const initialTimeout = window.setTimeout(() => {
      void syncPinterest()
    }, 0)

    return () => {
      active = false
      window.clearTimeout(initialTimeout)
    }
  }, [])

  return data
}
