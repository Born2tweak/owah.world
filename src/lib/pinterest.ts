import 'server-only'

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

type PinterestTokenResponse = {
  access_token: string
  refresh_token?: string
}

type PinterestBoardPin = {
  alt_text?: string | null
  board_id?: string
  created_at?: string
  description?: string | null
  dominant_color?: string | null
  id: string
  link?: string | null
  media?: {
    images?: {
      '150x150'?: PinterestImage
      '400x300'?: PinterestImage
      '600x'?: PinterestImage
      '1200x'?: PinterestImage
      original?: PinterestImage
    }
  }
  title?: string | null
}

type PinterestImage = {
  height?: number
  url?: string
  width?: number
}

type PinterestPinsResponse = {
  items?: PinterestBoardPin[]
}

const PINTEREST_API_BASE = 'https://api.pinterest.com/v5'
const PINTEREST_BOARD_URL = 'https://www.pinterest.com/drakolifestyle/fits/'

export const PINTEREST_FITS_FALLBACK: PinterestFitPin[] = [
  {
    id: 'leather-pinstripe',
    title: 'Leather / Pinstripe',
    description: 'Tailored darkwear reference from the local archive.',
    image: '/world/fashion/leather-pinstripe.jpg',
    link: PINTEREST_BOARD_URL,
    dominantColor: '#101820',
    aspect: 0.74,
  },
  {
    id: 'flare-gate',
    title: 'Raw Denim Flare',
    description: 'Wide-leg silhouette reference from the wardrobe archive.',
    image: '/world/fashion/flare-gate.jpg',
    link: PINTEREST_BOARD_URL,
    dominantColor: '#172231',
    aspect: 0.75,
  },
  {
    id: 'runway-leather',
    title: 'Runway Leather',
    description: 'Black leather runway mood from the curated fashion set.',
    image: '/world/fashion/runway-leather.jpg',
    link: PINTEREST_BOARD_URL,
    dominantColor: '#111217',
    aspect: 0.666,
  },
  {
    id: 'tabi-stairwell',
    title: 'Tabi / Western',
    description: 'Footwear and proportion reference for the Fits board.',
    image: '/world/fashion/tabi-stairwell.jpg',
    link: PINTEREST_BOARD_URL,
    dominantColor: '#1a1f2a',
    aspect: 0.515,
  },
]

function getPinterestEnv() {
  const accessToken = process.env.PINTEREST_ACCESS_TOKEN?.trim()
  const boardId = process.env.PINTEREST_FITS_BOARD_ID?.trim()
  const clientId = process.env.PINTEREST_CLIENT_ID?.trim()
  const clientSecret = process.env.PINTEREST_CLIENT_SECRET?.trim()
  const refreshToken = process.env.PINTEREST_REFRESH_TOKEN?.trim()

  return {
    accessToken,
    boardId,
    clientId,
    clientSecret,
    configured: Boolean(boardId && (accessToken || (clientId && clientSecret && refreshToken))),
    refreshToken,
  }
}

function getBestImage(pin: PinterestBoardPin) {
  const images = pin.media?.images
  return images?.original ?? images?.['1200x'] ?? images?.['600x'] ?? images?.['400x300'] ?? images?.['150x150'] ?? null
}

function normalizePin(pin: PinterestBoardPin): PinterestFitPin | null {
  const image = getBestImage(pin)
  if (!image?.url) return null

  const width = image.width ?? 1
  const height = image.height ?? 1

  return {
    aspect: width / height,
    description: pin.description ?? pin.alt_text ?? 'Pinterest Fits archive pin.',
    dominantColor: pin.dominant_color ?? '#101820',
    id: pin.id,
    image: image.url,
    link: pin.link ?? PINTEREST_BOARD_URL,
    title: pin.title || pin.alt_text || 'Fits Archive',
  }
}

async function refreshPinterestAccessToken() {
  const env = getPinterestEnv()

  if (env.accessToken) {
    return env.accessToken
  }

  if (!env.clientId || !env.clientSecret || !env.refreshToken) {
    return null
  }

  const auth = Buffer.from(`${env.clientId}:${env.clientSecret}`).toString('base64')
  const body = new URLSearchParams({
    grant_type: 'refresh_token',
    refresh_token: env.refreshToken,
    scope: 'boards:read pins:read',
  })

  const response = await fetch(`${PINTEREST_API_BASE}/oauth/token`, {
    body,
    cache: 'no-store',
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    method: 'POST',
  })

  if (!response.ok) {
    throw new Error(`Pinterest token refresh failed with ${response.status}`)
  }

  const token = (await response.json()) as PinterestTokenResponse
  return token.access_token
}

export function getPinterestFallbackSnapshot(configured = false): PinterestBoardSnapshot {
  return {
    boardUrl: PINTEREST_BOARD_URL,
    configured,
    lastUpdated: new Date().toISOString(),
    pins: PINTEREST_FITS_FALLBACK,
    source: 'fallback',
    title: 'drakolifestyle / Fits',
  }
}

export async function getPinterestFitsSnapshot(): Promise<PinterestBoardSnapshot> {
  const env = getPinterestEnv()

  if (!env.configured || !env.boardId) {
    return getPinterestFallbackSnapshot(false)
  }

  try {
    const accessToken = await refreshPinterestAccessToken()
    if (!accessToken) {
      return getPinterestFallbackSnapshot(true)
    }

    const response = await fetch(`${PINTEREST_API_BASE}/boards/${env.boardId}/pins?page_size=12`, {
      cache: 'no-store',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    if (!response.ok) {
      throw new Error(`Pinterest board pins request failed with ${response.status}`)
    }

    const json = (await response.json()) as PinterestPinsResponse
    const pins = json.items?.map(normalizePin).filter((pin): pin is PinterestFitPin => Boolean(pin)).slice(0, 8) ?? []

    return {
      boardUrl: PINTEREST_BOARD_URL,
      configured: true,
      lastUpdated: new Date().toISOString(),
      pins: pins.length > 0 ? pins : PINTEREST_FITS_FALLBACK,
      source: pins.length > 0 ? 'pinterest' : 'fallback',
      title: 'drakolifestyle / Fits',
    }
  } catch {
    return getPinterestFallbackSnapshot(true)
  }
}
