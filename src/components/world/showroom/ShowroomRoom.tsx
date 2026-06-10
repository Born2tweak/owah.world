'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { useCallback, useRef } from 'react'
import type { WorldCategory } from '../world.types'
import { WORLD_CATEGORY_COLORS } from '../world.types'
import { ZONE_LABELS, type ShowroomZone } from './showroomCamera'
import type { useShowroomCamera } from './useShowroomCamera'
import styles from './ShowroomRoom.module.css'

type ShowroomRoomProps = {
  camera: ReturnType<typeof useShowroomCamera>
}

const ZONES: WorldCategory[] = ['fashion', 'music', 'watching', 'life']

const ZONE_HOTSPOTS: Record<
  WorldCategory,
  { className: string; labelPos: string }
> = {
  fashion: { className: styles.hotspotFashion, labelPos: styles.labelFashion },
  music: { className: styles.hotspotMusic, labelPos: styles.labelMusic },
  watching: { className: styles.hotspotWatching, labelPos: styles.labelWatching },
  life: { className: styles.hotspotLife, labelPos: styles.labelLife },
}

export default function ShowroomRoom({ camera }: ShowroomRoomProps) {
  const {
    activeZone,
    hoveredZone,
    camera: pose,
    parallax,
    isOverview,
    focusZone,
    returnToOverview,
    setHoveredZone,
    setParallax,
  } = camera

  const reduceMotion = useReducedMotion()
  const viewportRef = useRef<HTMLDivElement>(null)

  const onPointerMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (!isOverview || reduceMotion) return
      const rect = viewportRef.current?.getBoundingClientRect()
      if (!rect) return
      const nx = (event.clientX - rect.left) / rect.width - 0.5
      const ny = (event.clientY - rect.top) / rect.height - 0.5
      setParallax({ x: nx * 14, y: ny * 8 })
    },
    [isOverview, reduceMotion, setParallax],
  )

  const transition = reduceMotion
    ? { duration: 0.01 }
    : { type: 'spring' as const, stiffness: 42, damping: 28, mass: 1.1 }

  const camX = pose.x + (isOverview ? parallax.x : 0)
  const camY = pose.y + (isOverview ? parallax.y : 0)

  return (
    <div
      ref={viewportRef}
      className={styles.viewport}
      onPointerMove={onPointerMove}
      onPointerLeave={() => setParallax({ x: 0, y: 0 })}
    >
      <motion.div
        className={styles.cameraRig}
        animate={{
          scale: pose.scale,
          x: `${camX}%`,
          y: `${camY}%`,
          rotateY: pose.rotateY,
          rotateX: pose.rotateX,
        }}
        transition={transition}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div
          className={styles.roomSpace}
          data-zone={activeZone}
          style={{
            transform: `translate3d(${parallax.x * 0.3}px, ${parallax.y * 0.2}px, 0)`,
          }}
        >
          <div className={styles.ambientGlow} aria-hidden="true" />
          <div className={styles.ceilingWash} aria-hidden="true" />
          <div className={styles.ceiling} aria-hidden="true">
            <span className={styles.spot} />
            <span className={styles.spot} />
            <span className={styles.spot} />
            <span className={styles.spot} />
          </div>

          <div className={styles.backWall} aria-hidden="true">
            <div className={styles.wallQuilt} />
            <div className={styles.wallSheen} />
            <div className={styles.logoGlow}>OWAH.WORLD</div>
          </div>
          <div className={styles.leftWall} aria-hidden="true" />

          {/* WARDROBE / FASHION — illuminated shoe niche + chrome rack */}
          <div
            className={`${styles.wardrobeArea} ${zoneLit('fashion', activeZone, hoveredZone)}`}
            aria-hidden="true"
          >
            <div className={styles.shoeNiche}>
              <span className={styles.nicheGlow} />
              <div className={styles.nicheShelf}>
                <span className={styles.shoe} />
                <span className={styles.shoe} />
              </div>
              <div className={styles.nicheShelf}>
                <span className={styles.shoe} />
                <span className={styles.shoe} />
              </div>
              <div className={styles.nicheShelf}>
                <span className={styles.shoe} />
                <span className={styles.shoe} />
              </div>
            </div>

            <div className={styles.rack}>
              <span className={styles.rackBar} />
              <span className={`${styles.garment} ${styles.garmentCoat}`} />
              <span className={`${styles.garment} ${styles.garmentJacket}`} />
              <span className={`${styles.garment} ${styles.garmentShirt}`} />
              <span className={`${styles.garment} ${styles.garmentCoat2}`} />
              <span className={`${styles.garment} ${styles.garmentJacket2}`} />
            </div>
            <span className={styles.objShadow} />
          </div>

          {/* GLASS DISPLAY TABLE — fashion accessories */}
          <div className={styles.glassTable} aria-hidden="true">
            <span className={styles.tablePlinth} />
            <span className={styles.tableTop} />
            <span className={styles.tableItemA} />
            <span className={styles.tableItemB} />
            <span className={styles.objShadow} />
          </div>

          {/* MUSIC — listening station: speaker pair + console */}
          <div
            className={`${styles.musicArea} ${zoneLit('music', activeZone, hoveredZone)}`}
            aria-hidden="true"
          >
            <span className={`${styles.speaker} ${styles.speakerL}`}>
              <i className={styles.cone} />
              <i className={styles.coneSm} />
            </span>
            <span className={styles.console}>
              <i className={styles.platter} />
            </span>
            <span className={`${styles.speaker} ${styles.speakerR}`}>
              <i className={styles.cone} />
              <i className={styles.coneSm} />
            </span>
            <span className={styles.objShadow} />
          </div>

          {/* WATCHING — projection screen + media console */}
          <div
            className={`${styles.watchingArea} ${zoneLit('watching', activeZone, hoveredZone)}`}
            aria-hidden="true"
          >
            <span className={styles.screen}>
              <i className={styles.screenGlow} />
            </span>
            <span className={styles.mediaConsole}>
              <i className={styles.mediaItem} />
              <i className={styles.mediaItem} />
              <i className={styles.mediaItem} />
            </span>
            <span className={styles.objShadow} />
          </div>

          {/* LIFE FEED — small ambient ticker integrated into the wall */}
          <div
            className={`${styles.lifeArea} ${zoneLit('life', activeZone, hoveredZone)}`}
            aria-hidden="true"
          >
            <span className={styles.ticker}>
              <i className={styles.tickerScan} />
            </span>
            <i className={styles.tickerDot} />
            <i className={styles.tickerDot} />
          </div>

          <div className={styles.mirrorWall} aria-hidden="true" />

          <div className={styles.floor} aria-hidden="true">
            <div className={styles.floorGrid} />
            <div className={styles.floorReflection} />
          </div>

          {ZONES.map((zone) => (
            <ZoneHotspot
              key={zone}
              zone={zone}
              activeZone={activeZone}
              hoveredZone={hoveredZone}
              onFocus={() => focusZone(zone)}
              onReturn={returnToOverview}
              onHover={setHoveredZone}
            />
          ))}
        </div>
      </motion.div>

      <motion.div
        className={styles.vignette}
        animate={{ opacity: isOverview ? 0.35 : 0.55 }}
        transition={{ duration: 0.8 }}
        aria-hidden="true"
      />
    </div>
  )
}

function zoneLit(
  zone: WorldCategory,
  active: ShowroomZone,
  hovered: WorldCategory | null,
): string {
  if (active === zone) return styles.zoneActive
  if (hovered === zone) return styles.zoneHover
  if (active !== 'overview') return styles.zoneDim
  return ''
}

type ZoneHotspotProps = {
  zone: WorldCategory
  activeZone: ShowroomZone
  hoveredZone: WorldCategory | null
  onFocus: () => void
  onReturn: () => void
  onHover: (zone: WorldCategory | null) => void
}

function ZoneHotspot({
  zone,
  activeZone,
  hoveredZone,
  onFocus,
  onReturn,
  onHover,
}: ZoneHotspotProps) {
  const { className, labelPos } = ZONE_HOTSPOTS[zone]
  const labels = ZONE_LABELS[zone]
  const accent = WORLD_CATEGORY_COLORS[zone]
  const isActive = activeZone === zone
  const isHovered = hoveredZone === zone

  return (
    <button
      type="button"
      className={`${styles.hotspot} ${className} ${isActive ? styles.hotspotActive : ''} ${isHovered ? styles.hotspotHover : ''}`}
      style={{ ['--zone-accent' as string]: accent }}
      aria-label={`Enter ${labels.title}`}
      onClick={() => (isActive ? onReturn() : onFocus())}
      onPointerEnter={() => onHover(zone)}
      onPointerLeave={() => onHover(null)}
    >
      <motion.span
        className={`${styles.floatingLabel} ${labelPos}`}
        animate={{
          opacity: isActive || isHovered || activeZone === 'overview' ? 1 : 0.4,
          y: isHovered || isActive ? -4 : 0,
        }}
        transition={{ duration: 0.35 }}
      >
        <span className={styles.labelTitle}>{labels.title}</span>
        <span className={styles.labelSub}>{labels.subtitle}</span>
      </motion.span>
      <span className={styles.hotspotRing} aria-hidden="true" />
    </button>
  )
}
