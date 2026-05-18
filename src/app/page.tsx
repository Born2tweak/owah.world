'use client'

import dynamic from 'next/dynamic'

const CDScene = dynamic(() => import('@/components/landing/CDScene/CDScene'), { ssr: false })

export default function LandingPage() {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden' }}>
      <CDScene />

      {/* Description panel — below CD, above dock */}
      <div
        style={{
          position: 'fixed',
          bottom: 112,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
          maxWidth: 400,
          width: '84%',
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            background: 'linear-gradient(180deg, rgba(16, 22, 34, 0.55) 0%, rgba(6, 10, 18, 0.45) 100%)',
            backdropFilter: 'blur(32px) saturate(180%)',
            WebkitBackdropFilter: 'blur(32px) saturate(180%)',
            borderTop: '1px solid rgba(255, 255, 255, 0.15)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.04)',
            borderLeft: '1px solid rgba(255, 255, 255, 0.08)',
            borderRight: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: 16,
            padding: '20px 28px',
            boxShadow:
              '0 1px 0 0 rgba(255,255,255,0.05) inset, 0 16px 40px rgba(0,0,0,0.4)',
          }}
        >
          <p
            style={{
              margin: 0,
              fontFamily: 'var(--font-display)',
              fontSize: 13,
              lineHeight: 1.7,
              color: 'rgba(230, 240, 255, 0.9)',
              letterSpacing: '0.015em',
              fontWeight: 400,
              textShadow: '0 2px 4px rgba(0,0,0,0.3)',
            }}
          >
            OWAH.WORLD is my attempt at translating everything that makes me who I am
            into a living digital world. Every memory, obsession, contradiction, creation,
            emotion, system, movement, and influence layered together into one evolving
            interface that reflects my process of becoming.
          </p>
        </div>
      </div>
    </div>
  )
}
