'use client'

import dynamic from 'next/dynamic'
import HeroFilm from '@/components/landing/HeroFilm/HeroFilm'
import WorldGuide from '@/components/landing/WorldGuide/WorldGuide'

const CDScene = dynamic(() => import('@/components/landing/CDScene/CDScene'), { ssr: false })

export default function LandingPage() {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden' }}>
      <CDScene />
      <WorldGuide />
      <HeroFilm />
    </div>
  )
}
