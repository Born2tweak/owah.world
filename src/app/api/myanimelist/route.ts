import { NextResponse } from 'next/server'

import { getMyAnimeListSnapshot } from '@/lib/myanimelist'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET() {
  const snapshot = await getMyAnimeListSnapshot()

  return NextResponse.json(snapshot, {
    headers: {
      'Cache-Control': 'no-store, max-age=0',
    },
  })
}
