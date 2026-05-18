'use client'

import dynamic from 'next/dynamic'

const CDScene = dynamic(() => import('@/components/landing/CDScene/CDScene'), { ssr: false })

export default function LandingPage() {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden' }}>
      <CDScene />

      {/* Description panel — overlaps lower CD, sits above dock */}
      <div
        style={{
          position: 'fixed',
          bottom: 96,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
          maxWidth: 460,
          width: '88%',
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            background: 'rgba(3, 6, 14, 0.22)',
            backdropFilter: 'blur(32px) saturate(160%)',
            WebkitBackdropFilter: 'blur(32px) saturate(160%)',
            border: '1px solid rgba(255, 255, 255, 0.07)',
            borderRadius: 14,
            padding: '16px 22px 18px',
            boxShadow: [
              '0 1px 0 0 rgba(255, 255, 255, 0.10) inset',
              '0 -1px 0 0 rgba(0, 0, 0, 0.20) inset',
              '0 24px 64px rgba(0, 0, 0, 0.44)',
            ].join(', '),
          }}
        >
          <p
            style={{
              margin: '0 0 9px',
              fontFamily: 'var(--font-mono)',
              fontSize: 9,
              lineHeight: 1,
              letterSpacing: '0.20em',
              textTransform: 'uppercase',
              color: 'rgba(0, 213, 178, 0.48)',
              fontWeight: 400,
            }}
          >
            WORLD.MANIFEST — v1.0
          </p>
          <p
            style={{
              margin: 0,
              fontFamily: 'var(--font-display)',
              fontSize: 13,
              lineHeight: 1.82,
              color: 'rgba(195, 214, 238, 0.65)',
              letterSpacing: '0.014em',
              fontWeight: 300,
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
