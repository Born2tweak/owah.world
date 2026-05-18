'use client'

import dynamic from 'next/dynamic'

const CDScene = dynamic(() => import('@/components/landing/CDScene/CDScene'), { ssr: false })

export default function LandingPage() {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden' }}>
      <CDScene />

      {/* Description panel — manifesto card below CD, above dock */}
      <div
        style={{
          position: 'fixed',
          bottom: 96,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
          maxWidth: 620,
          width: '92%',
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            background: 'rgba(3, 6, 14, 0.72)',
            backdropFilter: 'blur(24px) saturate(140%)',
            WebkitBackdropFilter: 'blur(24px) saturate(140%)',
            border: '1px solid rgba(0, 196, 168, 0.22)',
            borderRadius: 16,
            padding: '20px 32px 22px',
            textAlign: 'center',
            boxShadow: [
              '0 1px 0 0 rgba(255, 255, 255, 0.08) inset',
              '0 -1px 0 0 rgba(0, 0, 0, 0.22) inset',
              '0 0 0 1px rgba(0, 196, 168, 0.06) inset',
              '0 0 40px rgba(0, 196, 168, 0.08)',
              '0 24px 64px rgba(0, 0, 0, 0.48)',
            ].join(', '),
          }}
        >
          {/* Sparkle anchor */}
          <div
            style={{
              fontSize: 11,
              color: 'rgba(0, 196, 168, 0.65)',
              marginBottom: 12,
              letterSpacing: 0,
              lineHeight: 1,
              filter: 'drop-shadow(0 0 6px rgba(0, 196, 168, 0.40))',
            }}
          >
            ✦
          </div>

          {/* Hero manifesto line */}
          <p
            style={{
              margin: '0 0 8px',
              fontFamily: 'var(--font-title)',
              fontSize: 'clamp(13px, 1.4vw, 17px)',
              lineHeight: 1.25,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'rgba(220, 232, 255, 0.92)',
              fontWeight: 700,
            }}
          >
            I build digital worlds that remember.
          </p>

          {/* Supporting lines */}
          <p
            style={{
              margin: '0 0 3px',
              fontFamily: 'var(--font-title)',
              fontSize: 'clamp(8px, 0.85vw, 10px)',
              lineHeight: 1.7,
              letterSpacing: '0.13em',
              textTransform: 'uppercase',
              color: 'rgba(170, 198, 230, 0.48)',
              fontWeight: 400,
            }}
          >
            OWAH.WORLD is where memory, code, and feeling collide.
          </p>
          <p
            style={{
              margin: 0,
              fontFamily: 'var(--font-title)',
              fontSize: 'clamp(8px, 0.85vw, 10px)',
              lineHeight: 1.7,
              letterSpacing: '0.13em',
              textTransform: 'uppercase',
              color: 'rgba(170, 198, 230, 0.48)',
              fontWeight: 400,
            }}
          >
            Every system. Every story. Everything I&apos;m becoming.
          </p>
        </div>
      </div>
    </div>
  )
}
