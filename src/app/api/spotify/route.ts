import { NextResponse } from 'next/server'

import { getSpotifySnapshot } from '@/lib/spotify'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET() {
  const snapshot = await getSpotifySnapshot()

  return NextResponse.json(snapshot, {
    headers: {
      'Cache-Control': 'no-store, max-age=0',
    },
  })
}
