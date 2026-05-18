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
          maxWidth: 380,
          width: '84%',
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            background: 'rgba(6, 10, 18, 0.42)',
            backdropFilter: 'blur(28px) saturate(160%)',
            WebkitBackdropFilter: 'blur(28px) saturate(160%)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: 14,
            padding: '16px 24px 18px',
            boxShadow:
              '0 1px 0 0 rgba(255,255,255,0.10) inset, 0 -1px 0 0 rgba(0,0,0,0.18) inset, 0 12px 40px rgba(0,0,0,0.35)',
          }}
        >
          <p
            style={{
              margin: 0,
              fontFamily: 'var(--font-display)',
              fontSize: 11,
              lineHeight: 1.9,
              color: 'rgba(190, 205, 228, 0.62)',
              letterSpacing: '0.04em',
              fontWeight: 400,
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
