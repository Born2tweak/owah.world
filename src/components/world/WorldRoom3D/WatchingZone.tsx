'use client'

import { Text } from '@react-three/drei'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Mesh } from 'three'
import { CHROME, CHROME_DARK, MARBLE, WOOD_DARK } from './roomMaterials'
import { MEDIA_ARCHIVE_SPINES, NOW_WATCHING } from './worldPersonalData'

/** Museum media archive - cobalt showroom, not convention purple. */

function MediaArchiveShelf({ emissive }: { emissive: number }) {
  const cols = 5
  const rows = 3
  const spineW = 0.16
  const spineH = 0.62
  const gap = 0.05
  const rowOffsets = [0.72, 0.05, -0.62]
  const startX = -((cols - 1) * (spineW + gap)) / 2

  return (
    <group position={[0.06, 1.52, -1.18]}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[2.6, 2.2, 0.34]} />
        <meshStandardMaterial color={WOOD_DARK} metalness={0.35} roughness={0.38} />
      </mesh>
      {rowOffsets.map((y) => (
        <mesh key={y} position={[0, y, 0.11]}>
          <boxGeometry args={[2.36, 0.035, 0.22]} />
          <meshStandardMaterial color={CHROME_DARK} metalness={0.86} roughness={0.14} />
        </mesh>
      ))}
      {MEDIA_ARCHIVE_SPINES.slice(0, cols * rows).map((spine, i) => {
        const row = Math.floor(i / cols)
        const col = i % cols
        const x = startX + col * (spineW + gap) + (col % 2 === 0 ? 0.01 : -0.006)
        const y = rowOffsets[row]
        const pull = i === 6 || i === 11 ? 0.07 : i === 13 ? 0.05 : 0
        const tilt = i === 2 ? 0.09 : i === 8 ? -0.08 : 0
        return (
          <group key={spine.title} position={[x, y, 0.12 + pull]} rotation={[0, tilt, 0]}>
            <mesh castShadow>
              <boxGeometry args={[spineW, spineH, 0.09]} />
              <meshStandardMaterial color={spine.hue} roughness={0.52} metalness={0.14} />
            </mesh>
            <mesh position={[0, spineH * 0.18, 0.047]}>
              <boxGeometry args={[spineW * 0.84, 0.045, 0.007]} />
              <meshStandardMaterial color={spine.band} emissive={spine.band} emissiveIntensity={emissive * 0.24} />
            </mesh>
            <Text
              position={[0, -spineH * 0.05, 0.049]}
              rotation={[0, 0, Math.PI / 2]}
              fontSize={0.034}
              color="#f1f5f9"
              maxWidth={spineH * 0.84}
              anchorX="center"
              anchorY="middle"
            >
              {spine.title.toUpperCase()}
            </Text>
          </group>
        )
      })}
    </group>
  )
}

function SymbolicAccent({ x, y, accent, emissive }: { x: number; y: number; accent: string; emissive: number }) {
  return (
    <group position={[x, y, -1.86]}>
      <mesh>
        <boxGeometry args={[0.34, 0.44, 0.03]} />
        <meshStandardMaterial color={CHROME_DARK} metalness={0.88} roughness={0.14} />
      </mesh>
      <mesh position={[0, 0, 0.018]}>
        <planeGeometry args={[0.26, 0.36]} />
        <meshStandardMaterial color="#0a1018" roughness={0.6} metalness={0.15} />
      </mesh>
      <mesh position={[0, 0.02, 0.02]}>
        <planeGeometry args={[0.11, 0.11]} />
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={emissive * 0.35} transparent opacity={0.85} />
      </mesh>
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

function OpenArchiveCase({ emissive }: { emissive: number }) {
  return (
    <group position={[1.18, 0, 0.42]} rotation={[0, -0.32, 0]} scale={1.08}>
      <mesh position={[0, 0.14, 0]} castShadow>
        <boxGeometry args={[0.68, 0.28, 0.42]} />
        <meshStandardMaterial color={WOOD_DARK} metalness={0.35} roughness={0.38} />
      </mesh>
      <mesh position={[-0.24, 0.42, 0.06]} rotation={[-0.65, 0, 0]} castShadow>
        <boxGeometry args={[0.52, 0.04, 0.34]} />
        <meshStandardMaterial color="#1a2830" roughness={0.46} metalness={0.18} />
      </mesh>
      <mesh position={[0.02, 0.24, 0.06]} rotation={[0.18, -0.18, 0]}>
        <boxGeometry args={[0.2, 0.28, 0.08]} />
        <meshStandardMaterial color={MEDIA_ARCHIVE_SPINES[12]?.hue ?? '#1a2030'} roughness={0.48} />
      </mesh>
      <mesh position={[0.16, 0.2, 0.1]} rotation={[0.22, -0.3, 0.08]}>
        <boxGeometry args={[0.17, 0.24, 0.06]} />
        <meshStandardMaterial color={MEDIA_ARCHIVE_SPINES[14]?.hue ?? '#243040'} roughness={0.48} />
      </mesh>
      <mesh position={[0, 0.02, 0.16]}>
        <boxGeometry args={[0.52, 0.024, 0.07]} />
        <meshStandardMaterial color="#7090e8" emissive="#7090e8" emissiveIntensity={0.12 + emissive * 0.35} />
      </mesh>
    </group>
  )
}

function StackedMedia({ emissive }: { emissive: number }) {
  const heroItems = MEDIA_ARCHIVE_SPINES.slice(12, 15)

  return (
    <group position={[-0.08, 0.54, 0.3]} rotation={[0, -0.1, 0]}>
      {heroItems.map((item, i) => (
        <group key={item.title} position={[i * 0.17, i * 0.07, i * 0.03]} rotation={[0, 0.06 * i, 0.04 * i]}>
          <mesh castShadow>
            <boxGeometry args={[0.28, 0.38, 0.05]} />
            <meshStandardMaterial color={item.hue} roughness={0.45} metalness={0.22} />
          </mesh>
          <mesh position={[0, 0.12, 0.028]}>
            <boxGeometry args={[0.22, 0.05, 0.008]} />
            <meshStandardMaterial color={item.band} emissive={item.band} emissiveIntensity={i === 2 ? emissive * 0.28 : emissive * 0.18} />
          </mesh>
          <Text position={[0, -0.02, 0.03]} fontSize={0.038} color="#f8fafc" maxWidth={0.22} anchorX="center" anchorY="middle">
            {item.title}
          </Text>
        </group>
      ))}
    </group>
  )
}

function HeroMediaPedestal({ x, itemIndex, emissive }: { x: number; itemIndex: number; emissive: number }) {
  const item = MEDIA_ARCHIVE_SPINES[itemIndex]

  return (
    <group position={[x, 0.5, 0.19]} rotation={[0, x === 0 ? 0.1 : x > 0 ? -0.08 : 0.04, 0]}>
      <mesh castShadow>
        <boxGeometry args={[0.18, 0.42, 0.28]} />
        <meshStandardMaterial color={item?.hue ?? '#1a2030'} roughness={0.42} metalness={0.18} />
      </mesh>
      <mesh position={[0, 0, 0.145]}>
        <cylinderGeometry args={[0.05, 0.05, 0.03, 16]} />
        <meshStandardMaterial color={CHROME_DARK} metalness={0.88} roughness={0.14} />
      </mesh>
      <mesh position={[0, 0.14, 0.142]}>
        <boxGeometry args={[0.12, 0.05, 0.008]} />
        <meshStandardMaterial color={item?.band ?? '#7090e8'} emissive={item?.band ?? '#7090e8'} emissiveIntensity={0.1 + emissive * 0.25} />
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

      <MediaArchiveShelf emissive={emissive} />

      <SymbolicAccent x={-1.12} y={0.98} accent="#8b1a1a" emissive={emissive} />
      <SymbolicAccent x={-0.38} y={0.9} accent="#c41e3a" emissive={emissive} />
      <SymbolicAccent x={0.44} y={0.96} accent="#4a6fa5" emissive={emissive} />
      <SymbolicAccent x={1.16} y={0.9} accent="#6b4c9a" emissive={emissive} />

      <ViewingChair emissive={emissive} />
      <OpenArchiveCase emissive={emissive} />
      <StackedMedia emissive={emissive} />

      <group position={[0.04, 0, -0.32]} rotation={[0, -0.04, 0]}>
        <mesh position={[0, 0.34, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.55, 0.68, 0.72]} />
          <meshPhysicalMaterial color={MARBLE} metalness={0.12} roughness={0.24} clearcoat={0.25} />
        </mesh>
        <mesh position={[0, 0.12, 0.02]} castShadow>
          <boxGeometry args={[2.34, 0.24, 0.62]} />
          <meshStandardMaterial color={WOOD_DARK} metalness={0.35} roughness={0.38} />
        </mesh>
        <HeroMediaPedestal x={-0.68} itemIndex={4} emissive={emissive} />
        <HeroMediaPedestal x={0.02} itemIndex={8} emissive={emissive} />
        <HeroMediaPedestal x={0.72} itemIndex={10} emissive={emissive} />
      </group>

      <NowWatchingStand emissive={emissive} />

      <mesh position={[0.1, 0.06, 0.52]} rotation={[0, 0.05, 0]}>
        <boxGeometry args={[2.3, 0.03, 0.07]} />
        <meshStandardMaterial color="#7090e8" emissive="#7090e8" emissiveIntensity={0.12 + cobaltGlow * 0.55} />
      </mesh>
    </group>
  )
}
