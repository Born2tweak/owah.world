import { NextResponse } from 'next/server'

import { getPinterestFitsSnapshot } from '@/lib/pinterest'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET() {
  const snapshot = await getPinterestFitsSnapshot()

  return NextResponse.json(snapshot, {
    headers: {
      'Cache-Control': 'no-store, max-age=0',
    },
  })
}
