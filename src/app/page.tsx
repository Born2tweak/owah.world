'use client'

import dynamic from 'next/dynamic'

const CDScene = dynamic(() => import('@/components/landing/CDScene/CDScene'), { ssr: false })

export default function LandingPage() {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden' }}>
      <CDScene />

      <div
        style={{
          position: 'fixed',
          bottom: 118,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
          maxWidth: 760,
          width: 'min(78vw, 760px)',
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            background:
              'linear-gradient(180deg, rgba(18, 30, 48, 0.34) 0%, rgba(3, 9, 18, 0.24) 100%)',
            backdropFilter: 'blur(26px) saturate(190%)',
            WebkitBackdropFilter: 'blur(26px) saturate(190%)',
            borderTop: '1px solid rgba(228, 246, 255, 0.26)',
            borderBottom: '1px solid rgba(100, 255, 238, 0.12)',
            borderLeft: '1px solid rgba(210, 235, 255, 0.14)',
            borderRight: '1px solid rgba(210, 235, 255, 0.14)',
            borderRadius: 16,
            padding: '24px 34px',
            boxShadow:
              '0 1px 0 rgba(255,255,255,0.18) inset, 0 0 28px rgba(60,210,255,0.10), 0 18px 48px rgba(0,0,0,0.28)',
          }}
        >
          <div
            style={{
              width: 44,
              height: 1,
              margin: '0 auto 18px',
              background:
                'linear-gradient(90deg, transparent, rgba(255,255,255,0.86), transparent)',
              boxShadow: '0 0 18px rgba(134,226,255,0.55)',
            }}
          />
          <p
            style={{
              margin: 0,
              fontFamily: 'var(--font-title)',
              fontSize: 'clamp(11px, 1vw, 14px)',
              lineHeight: 1.85,
              color: 'rgba(232, 244, 255, 0.92)',
              letterSpacing: '0.16em',
              fontWeight: 400,
              textAlign: 'center',
              textTransform: 'uppercase',
              textShadow: '0 2px 12px rgba(0,0,0,0.72)',
            }}
          >
            OWAH.WORLD is where memory, code, and feeling collide.
            <br />
            Every system. Every story. Everything I&apos;m becoming.
          </p>
        </div>
      </div>
    </div>
  )
}
