'use client'

import { useState } from 'react'
import styles from './WorldDesktopSkeleton.module.css'

const signalPanels = [
  {
    id: 'atmosphere',
    label: 'ATMOSPHERE',
    value: 'CLEAR · 72%',
    detail: 'Humidity stable. Ion layer quiet.',
  },
  {
    id: 'signal',
    label: 'SIGNAL',
    value: 'LOCKED',
    detail: 'Orbital trace aligned. No drift.',
  },
  {
    id: 'map',
    label: 'MAP',
    value: '33.7490° N',
    detail: '84.3880° W · Atlanta grid',
  },
  {
    id: 'log',
    label: 'LOG',
    value: 'ENTRY 006',
    detail: 'World layer warming. Live feed pending.',
  },
] as const

export default function WorldDesktopSkeleton() {
  const [activeId, setActiveId] = useState<(typeof signalPanels)[number]['id']>('atmosphere')
  const active = signalPanels.find((panel) => panel.id === activeId) ?? signalPanels[0]

  return (
    <section className={styles.worldShell} aria-label="World atmosphere desktop skeleton">
      <div className={styles.skyGlow} />
      <div className={styles.desktopFrame}>
        <header className={styles.titleBar}>
          <div className={styles.titleLeft}>OWAH.WORLD</div>
          <h1 className={styles.titleCenter}>WORLD — ATMOSPHERE &amp; SIGNAL</h1>
          <div className={styles.titleButtons} aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
        </header>

        <main className={styles.workspace}>
          <section className={styles.heroStrip}>
            <p className={styles.heroEyebrow}>The Living Layer</p>
            <p className={styles.heroCopy}>
              Weather, signal, and place — a cyan telemetry desk for what moves outside the archive.
            </p>
          </section>

          <section className={styles.panelGrid} aria-label="World signal panels">
            {signalPanels.map((panel) => (
              <button
                key={panel.id}
                type="button"
                className={`${styles.panelCard}${active.id === panel.id ? ` ${styles.isActive}` : ''}`}
                onClick={() => setActiveId(panel.id)}
              >
                <span className={styles.panelLabel}>{panel.label}</span>
                <span className={styles.panelValue}>{panel.value}</span>
                <span className={styles.panelDetail}>{panel.detail}</span>
              </button>
            ))}
          </section>

          <aside className={styles.readoutWindow}>
            <header className={styles.readoutBar}>
              <span>LIVE READOUT</span>
            </header>
            <div className={styles.readoutBody}>
              <div className={styles.globeRing} aria-hidden="true">
                <span className={styles.globeCore} />
                <span className={styles.orbitA} />
                <span className={styles.orbitB} />
              </div>
              <p className={styles.readoutTitle}>{active.label}</p>
              <p className={styles.readoutValue}>{active.value}</p>
              <p className={styles.readoutDetail}>{active.detail}</p>
              <p className={styles.readoutNote}>
                Phase 4 shell — telemetry widgets and live data hooks arrive next.
              </p>
            </div>
          </aside>
        </main>
      </div>
    </section>
  )
}
