'use client'

import dynamic from 'next/dynamic'

const CodeWorld = dynamic(() => import('./CodeWorld'), {
  ssr: false,
  loading: () => (
    <section
      style={{
        position: 'relative',
        height: '100vh',
        overflow: 'hidden',
        background:
          'radial-gradient(circle at top, rgba(87, 199, 255, 0.08), transparent 28%), radial-gradient(circle at 50% 40%, rgba(199, 217, 255, 0.05), transparent 30%), #02050b',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          padding: '112px 24px 136px',
        }}
      >
        <div
          style={{
            width: 'min(390px, calc(100vw - 48px))',
            padding: '18px 18px 20px',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: 18,
            background: 'rgba(5, 10, 18, 0.28)',
            backdropFilter: 'blur(12px)',
            boxShadow: '0 24px 70px rgba(0, 0, 0, 0.24)',
            color: '#f4fbff',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#8fdcff',
            }}
          >
            OWAH.WORLD / CODE
          </p>
          <h1
            style={{
              marginTop: 12,
              fontFamily: 'var(--font-title)',
              fontSize: 'clamp(2rem, 4vw, 3.2rem)',
              lineHeight: 0.96,
              textTransform: 'uppercase',
            }}
          >
            Code world.
          </h1>
        </div>
      </div>
    </section>
  ),
})

export default function CodePageClient() {
  return <CodeWorld />
}
