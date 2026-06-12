'use client'

import { Text } from '@react-three/drei'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Mesh } from 'three'
import { CHROME, CHROME_DARK, MARBLE, WOOD_DARK } from './roomMaterials'
import { MEDIA_ARCHIVE_SPINES, NOW_WATCHING } from './worldPersonalData'

/** Museum media archive - one backlit wall, cobalt showroom, not convention purple. */

const SPINE_COLS = 4
const SPINE_ROWS = 3
const SPINE_W = 0.2
const SPINE_H = 0.6
const SPINE_GAP = 0.12
const ROW_Y = [0.7, 0.02, -0.66]
const SPINES_CENTER_X = -0.56
const FEATURED_X = 0.82

function ArchiveSpine({ spine, x, y, pull, tilt }: {
  spine: (typeof MEDIA_ARCHIVE_SPINES)[number]
  x: number
  y: number
  pull: number
  tilt: number
}) {
  return (
    <group position={[x, y, 0.13 + pull]} rotation={[0, tilt, 0]}>
      <mesh castShadow>
        <boxGeometry args={[SPINE_W, SPINE_H, 0.1]} />
        <meshStandardMaterial color={spine.hue} roughness={0.5} metalness={0.16} />
      </mesh>
      <mesh position={[0, SPINE_H * 0.36, 0.052]}>
        <boxGeometry args={[SPINE_W * 0.82, 0.04, 0.007]} />
        <meshStandardMaterial color={spine.band} emissive={spine.band} emissiveIntensity={0.2} />
      </mesh>
      <Text
        position={[0, -SPINE_H * 0.06, 0.054]}
        rotation={[0, 0, Math.PI / 2]}
        fontSize={0.038}
        color="#f1f5f9"
        maxWidth={SPINE_H * 0.8}
        anchorX="center"
        anchorY="middle"
      >
        {spine.title.toUpperCase()}
      </Text>
    </group>
  )
}

function FeaturedPanel({ spine, y, emissive }: {
  spine: (typeof MEDIA_ARCHIVE_SPINES)[number]
  y: number
  emissive: number
}) {
  return (
    <group position={[FEATURED_X, y, 0.14]}>
      <mesh castShadow>
        <boxGeometry args={[0.76, 0.6, 0.04]} />
        <meshStandardMaterial color={CHROME_DARK} metalness={0.88} roughness={0.14} />
      </mesh>
      <mesh position={[0, 0, 0.022]}>
        <planeGeometry args={[0.68, 0.52]} />
        <meshStandardMaterial color={spine.hue} roughness={0.42} metalness={0.2} />
      </mesh>
      <mesh position={[0, 0, 0.026]}>
        <planeGeometry args={[0.68, 0.52]} />
        <meshPhysicalMaterial color="#0a1420" transmission={0.4} transparent opacity={0.35} roughness={0.04} metalness={0.1} />
      </mesh>
      <mesh position={[-0.31, 0, 0.03]}>
        <boxGeometry args={[0.012, 0.5, 0.008]} />
        <meshStandardMaterial color={spine.band} emissive={spine.band} emissiveIntensity={0.3 + emissive * 0.5} />
      </mesh>
      <Text position={[0.02, 0.08, 0.035]} fontSize={0.062} color="#f8fafc" maxWidth={0.58} anchorX="center" anchorY="middle">
        {spine.title.toUpperCase()}
      </Text>
      <Text position={[0.02, -0.12, 0.035]} fontSize={0.04} color="#93c5fd" maxWidth={0.56} anchorX="center" anchorY="middle">
        {spine.format.toUpperCase()}
      </Text>
    </group>
  )
}

function MediaArchiveWall({ emissive }: { emissive: number }) {
  const spines = MEDIA_ARCHIVE_SPINES.slice(0, SPINE_COLS * SPINE_ROWS)
  const featured = MEDIA_ARCHIVE_SPINES.slice(12, 15)
  const startX = SPINES_CENTER_X - ((SPINE_COLS - 1) * (SPINE_W + SPINE_GAP)) / 2

  return (
    <group position={[0.06, 1.52, -1.18]}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[2.7, 2.2, 0.3]} />
        <meshStandardMaterial color={WOOD_DARK} metalness={0.35} roughness={0.38} />
      </mesh>

      {ROW_Y.map((y) => (
        <group key={y}>
          <mesh position={[SPINES_CENTER_X, y - SPINE_H / 2 - 0.04, 0.12]}>
            <boxGeometry args={[1.42, 0.035, 0.24]} />
            <meshStandardMaterial color={CHROME_DARK} metalness={0.86} roughness={0.14} />
          </mesh>
          <mesh position={[SPINES_CENTER_X, y + SPINE_H / 2 + 0.05, 0.1]}>
            <boxGeometry args={[1.36, 0.014, 0.04]} />
            <meshStandardMaterial color="#7090e8" emissive="#7090e8" emissiveIntensity={0.18 + emissive * 0.4} />
          </mesh>
        </group>
      ))}

      {spines.map((spine, i) => {
        const row = Math.floor(i / SPINE_COLS)
        const col = i % SPINE_COLS
        const x = startX + col * (SPINE_W + SPINE_GAP)
        const pull = i === 5 ? 0.05 : 0
        const tilt = i === 10 ? 0.07 : 0
        return <ArchiveSpine key={spine.title} spine={spine} x={x} y={ROW_Y[row]} pull={pull} tilt={tilt} />
      })}

      {featured.map((spine, i) => (
        <FeaturedPanel key={spine.title} spine={spine} y={0.66 - i * 0.68} emissive={emissive} />
      ))}
    </group>
  )
}

function ViewingChair({ emissive }: { emissive: number }) {
  return (
    <group position={[-1.02, 0, 0.78]} rotation={[0, 0.34, 0]} scale={1.14}>
      <mesh position={[0, 0.24, 0]} castShadow>
        <boxGeometry args={[0.8, 0.48, 0.76]} />
        <meshStandardMaterial color="#1b2938" roughness={0.74} metalness={0.08} emissive="#0a1428" emissiveIntensity={emissive * 0.12} />
      </mesh>
      <mesh position={[-0.34, 0.42, 0.02]} castShadow>
        <boxGeometry args={[0.15, 0.36, 0.64]} />
        <meshStandardMaterial color="#223349" roughness={0.72} />
      </mesh>
      <mesh position={[0.34, 0.4, -0.04]} rotation={[0, 0, 0.05]} castShadow>
        <boxGeometry args={[0.15, 0.34, 0.64]} />
        <meshStandardMaterial color="#223349" roughness={0.72} />
      </mesh>
      <mesh position={[0.02, 0.44, -0.16]} rotation={[0.06, 0, 0]} castShadow>
        <boxGeometry args={[0.56, 0.28, 0.12]} />
        <meshStandardMaterial color="#2a3a4a" roughness={0.66} />
      </mesh>
      <mesh position={[0, 0.02, 0]}>
        <boxGeometry args={[0.56, 0.03, 0.56]} />
        <meshStandardMaterial color={CHROME_DARK} metalness={0.75} roughness={0.2} />
      </mesh>
    </group>
  )
}

function NowWatchingStand({ emissive }: { emissive: number }) {
  const edgeColor = '#7090e8'
  const glowRef = useRef<Mesh>(null)

  useFrame(({ clock }) => {
    if (!glowRef.current) return
    const t = clock.getElapsedTime()
    const pulse = 0.38 + Math.sin(t * 1.4) * 0.16 + emissive * 0.45
    const mat = glowRef.current.material as { emissiveIntensity?: number }
    if (mat.emissiveIntensity !== undefined) mat.emissiveIntensity = pulse
  })

  return (
    <group position={[1.08, 0.52, 0.82]} rotation={[0, -0.12, 0]}>
      <mesh position={[0, 0.42, 0]} castShadow>
        <boxGeometry args={[0.06, 0.84, 0.06]} />
        <meshStandardMaterial color={CHROME} metalness={0.92} roughness={0.1} />
      </mesh>
      <mesh position={[0, 0.86, 0]} rotation={[0.08, 0, 0]} castShadow>
        <boxGeometry args={[0.52, 0.72, 0.02]} />
        <meshPhysicalMaterial color="#0a1420" transmission={0.42} transparent opacity={0.62} roughness={0.05} metalness={0.1} />
      </mesh>
      <mesh position={[0, 0.86, 0.012]} rotation={[0.08, 0, 0]}>
        <boxGeometry args={[0.48, 0.68, 0.006]} />
        <meshStandardMaterial color="#141820" roughness={0.5} />
      </mesh>
      <mesh ref={glowRef} position={[0.22, 0.86, 0.015]} rotation={[0.08, 0, 0]}>
        <boxGeometry args={[0.01, 0.64, 0.48]} />
        <meshStandardMaterial color={edgeColor} emissive={edgeColor} emissiveIntensity={emissive * 0.5} />
      </mesh>
      <Text position={[0, 0.98, 0.02]} rotation={[0.08, 0, 0]} fontSize={0.062} color="#f8fafc" maxWidth={0.36} anchorX="center">
        {NOW_WATCHING.title.toUpperCase()}
      </Text>
      <Text position={[0, 0.78, 0.02]} rotation={[0.08, 0, 0]} fontSize={0.045} color="#93c5fd" maxWidth={0.34} anchorX="center">
        {NOW_WATCHING.mood}
      </Text>
      <Text position={[0, 0.64, 0.02]} rotation={[0.08, 0, 0]} fontSize={0.042} color="#cbd5e1" maxWidth={0.34} anchorX="center">
        {NOW_WATCHING.format}
      </Text>
      <mesh position={[0, 0.02, 0]}>
        <cylinderGeometry args={[0.15, 0.18, 0.05, 20]} />
        <meshPhysicalMaterial color={MARBLE} metalness={0.15} roughness={0.2} clearcoat={0.3} />
      </mesh>
    </group>
  )
}

type WatchingZoneProps = { highlighted: boolean }

export default function WatchingZone({ highlighted }: WatchingZoneProps) {
  const emissive = highlighted ? 0.45 : 0.12
  const cobaltGlow = highlighted ? 0.5 : 0.18

  return (
    <group>
      <mesh position={[0, 0.02, 0.08]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[3.85, 1.35]} />
        <meshStandardMaterial color="#0a1828" emissive="#7090e8" emissiveIntensity={cobaltGlow * 0.12} />
      </mesh>

      <mesh position={[0.04, 1.56, -1.5]} castShadow receiveShadow>
        <boxGeometry args={[2.92, 2.42, 0.08]} />
        <meshStandardMaterial color="#0d1620" metalness={0.42} roughness={0.34} />
      </mesh>

      <MediaArchiveWall emissive={emissive} />

      <ViewingChair emissive={emissive} />
      <NowWatchingStand emissive={emissive} />

      <mesh position={[0.1, 0.06, 0.52]} rotation={[0, 0.05, 0]}>
        <boxGeometry args={[2.3, 0.03, 0.07]} />
        <meshStandardMaterial color="#7090e8" emissive="#7090e8" emissiveIntensity={0.12 + cobaltGlow * 0.55} />
      </mesh>
    </group>
  )
}
