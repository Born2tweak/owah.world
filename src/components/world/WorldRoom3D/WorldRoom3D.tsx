'use client'

import Link from 'next/link'
import { useCallback, useEffect } from 'react'
import { isWorldCategory } from './roomZones'
import { useWorldRoomStore } from './worldRoom.store'
import RoomInfoPanel from './RoomInfoPanel'
import WorldRoomCanvas from './WorldRoomCanvas'
import styles from './WorldRoom3D.module.css'

export default function WorldRoom3D() {
  const activeZone = useWorldRoomStore((s) => s.activeZone)
  const hoveredZone = useWorldRoomStore((s) => s.hoveredZone)
  const focusZone = useWorldRoomStore((s) => s.focusZone)
  const returnToOverview = useWorldRoomStore((s) => s.returnToOverview)
  const setHoveredZone = useWorldRoomStore((s) => s.setHoveredZone)
  const cycleZone = useWorldRoomStore((s) => s.cycleZone)

  const handleWheel = useCallback(
    (event: WheelEvent) => {
      event.preventDefault()
      cycleZone(event.deltaY > 0 ? 1 : -1)
    },
    [cycleZone],
  )

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        returnToOverview()
        return
      }
      if (event.key === 'ArrowDown' || event.key === 'ArrowRight' || event.key === 'PageDown') {
        event.preventDefault()
        cycleZone(1)
      }
      if (event.key === 'ArrowUp' || event.key === 'ArrowLeft' || event.key === 'PageUp') {
        event.preventDefault()
        cycleZone(-1)
      }
    },
    [cycleZone, returnToOverview],
  )

  useEffect(() => {
    window.addEventListener('wheel', handleWheel, { passive: false })
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleWheel, handleKeyDown])

  const panelZone = isWorldCategory(activeZone) ? activeZone : null

  return (
    <div className={styles.worldRoom}>
      <div className={`${styles.canvasWrap}${panelZone ? ` ${styles.isFocused}` : ''}`}>
        <WorldRoomCanvas
          activeZone={activeZone}
          hoveredZone={hoveredZone}
          onHover={setHoveredZone}
          onFocus={focusZone}
        />
      </div>

      <div className={styles.hud} aria-hidden={false}>
        <header className={styles.hudTop}>
          <Link href="/" className={styles.brand} aria-label="OWAH.WORLD — back to landing">
            <span className={styles.brandMain}>OWAH.WORLD</span>
            <span>|</span>
            <span>LIVING ARCHIVE</span>
          </Link>
          <div className={styles.status}>
            <span className={styles.statusPulse} />
            <span>SYSTEM V1.0</span>
            <span>|</span>
            <span>ONLINE</span>
          </div>
        </header>
        <footer className={styles.hudBottom}>
          {activeZone === 'overview' ? (
            <span className={styles.hint}>Scroll or arrow keys to move · Click zones to focus</span>
          ) : null}
        </footer>
      </div>

      <RoomInfoPanel zone={panelZone} onClose={returnToOverview} />
    </div>
  )
}
