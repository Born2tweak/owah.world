import 'server-only'

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

type InstagramMediaResponse = {
  data?: Array<{
    caption?: string
    id: string
    media_type?: InstagramLifeSignal['mediaType']
    media_url?: string
    permalink?: string
    thumbnail_url?: string
    timestamp?: string
  }>
}

const INSTAGRAM_ACCOUNT = '@andr1ank'
const INSTAGRAM_PROFILE_URL = 'https://www.instagram.com/andr1ank/'
const GRAPH_API_BASE = 'https://graph.facebook.com/v21.0'

export const INSTAGRAM_FALLBACK_SIGNALS: InstagramLifeSignal[] = [
  {
    caption: 'latest aura check',
    color: '#ffb347',
    id: 'fallback-aura',
    mediaType: 'TEXT',
    mediaUrl: null,
    permalink: INSTAGRAM_PROFILE_URL,
    timestamp: '2026-06-12T00:00:00.000Z',
  },
  {
    caption: 'fit archive pulse',
    color: '#00c8e8',
    id: 'fallback-fit',
    mediaType: 'TEXT',
    mediaUrl: null,
    permalink: INSTAGRAM_PROFILE_URL,
    timestamp: '2026-06-11T00:00:00.000Z',
  },
  {
    caption: 'world signal online',
    color: '#3dff9a',
    id: 'fallback-world',
    mediaType: 'TEXT',
    mediaUrl: null,
    permalink: INSTAGRAM_PROFILE_URL,
    timestamp: '2026-06-10T00:00:00.000Z',
  },
]

function getInstagramEnv() {
  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN?.trim()
  const userId = process.env.INSTAGRAM_USER_ID?.trim()

  return {
    accessToken,
    configured: Boolean(accessToken && userId),
    userId,
  }
}

function cleanCaption(caption: string | undefined) {
  const value = caption?.replace(/\s+/g, ' ').trim()
  if (!value) return 'recent signal'
  return value.length > 72 ? `${value.slice(0, 69)}...` : value
}

export function getInstagramFallbackSnapshot(configured = false): InstagramSnapshot {
  return {
    account: INSTAGRAM_ACCOUNT,
    configured,
    lastUpdated: new Date().toISOString(),
    profileUrl: INSTAGRAM_PROFILE_URL,
    signals: INSTAGRAM_FALLBACK_SIGNALS,
    source: 'fallback',
  }
}

export async function getInstagramSnapshot(): Promise<InstagramSnapshot> {
  const env = getInstagramEnv()

  if (!env.configured || !env.accessToken || !env.userId) {
    return getInstagramFallbackSnapshot(false)
  }

  try {
    const search = new URLSearchParams({
      access_token: env.accessToken,
      fields: 'id,caption,media_type,media_url,thumbnail_url,permalink,timestamp',
      limit: '6',
    })

    const response = await fetch(`${GRAPH_API_BASE}/${env.userId}/media?${search.toString()}`, {
      cache: 'no-store',
    })

    if (!response.ok) {
      throw new Error(`Instagram media request failed with ${response.status}`)
    }

    const json = (await response.json()) as InstagramMediaResponse
    const signals =
      json.data?.map((item, index) => ({
        caption: cleanCaption(item.caption),
        color: ['#ffb347', '#00c8e8', '#3dff9a', '#7090e8', '#c41e3a', '#f8fafc'][index] ?? '#ffb347',
        id: item.id,
        mediaType: item.media_type ?? 'TEXT',
        mediaUrl: item.thumbnail_url ?? item.media_url ?? null,
        permalink: item.permalink ?? INSTAGRAM_PROFILE_URL,
        timestamp: item.timestamp ?? new Date().toISOString(),
      })) ?? []

    return {
      account: INSTAGRAM_ACCOUNT,
      configured: true,
      lastUpdated: new Date().toISOString(),
      profileUrl: INSTAGRAM_PROFILE_URL,
      signals: signals.length > 0 ? signals : INSTAGRAM_FALLBACK_SIGNALS,
      source: signals.length > 0 ? 'instagram' : 'fallback',
    }
  } catch {
    return getInstagramFallbackSnapshot(true)
  }
}
