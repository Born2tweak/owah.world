'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Mesh } from 'three'
import { CHROME, CHROME_DARK, MARBLE, WOOD_DARK } from './roomMaterials'
import { MEDIA_ARCHIVE_SPINES } from './worldPersonalData'

/** Museum media archive — cobalt showroom, not convention purple. */

function MediaArchiveShelf({ emissive }: { emissive: number }) {
  const cols = 6
  const rows = 2
  const spineW = 0.14
  const spineH = 0.52
  const gap = 0.04
  const startX = -((cols - 1) * (spineW + gap)) / 2

  return (
    <group position={[0, 1.35, -1.15]}>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2.4, 1.35, 0.28]} />
        <meshStandardMaterial color={WOOD_DARK} metalness={0.35} roughness={0.42} />
      </mesh>
      {[0.35, -0.35].map((y) => (
        <mesh key={y} position={[0, y, 0.1]}>
          <boxGeometry args={[2.2, 0.025, 0.22]} />
          <meshStandardMaterial color={CHROME_DARK} metalness={0.85} roughness={0.15} />
        </mesh>
      ))}
      {MEDIA_ARCHIVE_SPINES.slice(0, cols * rows).map((spine, i) => {
        const row = Math.floor(i / cols)
        const col = i % cols
        const x = startX + col * (spineW + gap) + (i % 2 === 0 ? 0.006 : -0.004)
        const y = row === 0 ? 0.55 : -0.05
        const pull = i === 7 ? 0.05 : 0
        const tilt = i === 3 ? 0.08 : 0
        return (
          <group key={i} position={[x, y, 0.12 + pull]} rotation={[0, tilt, 0]}>
            <mesh>
              <boxGeometry args={[spineW, spineH, 0.08]} />
              <meshStandardMaterial color={spine.hue} roughness={0.55} metalness={0.12} />
            </mesh>
            <mesh position={[0, spineH * 0.15, 0.042]}>
              <boxGeometry args={[spineW * 0.85, 0.04, 0.005]} />
              <meshStandardMaterial
                color={spine.band}
                emissive={spine.band}
                emissiveIntensity={i === 7 ? emissive * 0.55 : emissive * 0.25}
              />
            </mesh>
          </group>
        )
      })}
    </group>
  )
}

function SymbolicAccent({ x, y, accent, emissive }: { x: number; y: number; accent: string; emissive: number }) {
  return (
    <group position={[x, y, -1.68]}>
      <mesh>
        <boxGeometry args={[0.28, 0.38, 0.025]} />
        <meshStandardMaterial color={CHROME_DARK} metalness={0.88} roughness={0.14} />
      </mesh>
      <mesh position={[0, 0, 0.015]}>
        <planeGeometry args={[0.22, 0.32]} />
        <meshStandardMaterial color="#0a1018" roughness={0.6} metalness={0.15} />
      </mesh>
      <mesh position={[0, 0.02, 0.018]}>
        <planeGeometry args={[0.08, 0.08]} />
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={emissive * 0.35} transparent opacity={0.85} />
      </mesh>
    </group>
  )
}

function ViewingChair({ emissive }: { emissive: number }) {
  return (
    <group position={[-0.68, 0, 0.52]} rotation={[0, 0.28, 0]}>
      <mesh position={[0, 0.22, 0]} castShadow>
        <boxGeometry args={[0.72, 0.44, 0.68]} />
        <meshStandardMaterial color="#1a2838" roughness={0.78} metalness={0.06} emissive="#0a1428" emissiveIntensity={emissive * 0.12} />
      </mesh>
      <mesh position={[-0.32, 0.38, 0.02]} castShadow>
        <boxGeometry args={[0.14, 0.32, 0.58]} />
        <meshStandardMaterial color="#1e3048" roughness={0.75} />
      </mesh>
      <mesh position={[0.32, 0.36, -0.04]} rotation={[0, 0, 0.05]} castShadow>
        <boxGeometry args={[0.14, 0.3, 0.58]} />
        <meshStandardMaterial color="#1e3048" roughness={0.75} />
      </mesh>
      <mesh position={[0.02, 0.4, -0.14]} rotation={[0.06, 0, 0]} castShadow>
        <boxGeometry args={[0.48, 0.26, 0.1]} />
        <meshStandardMaterial color="#243040" roughness={0.72} />
      </mesh>
    </group>
  )
}

function OpenArchiveCase({ emissive }: { emissive: number }) {
  return (
    <group position={[1.05, 0, 0.28]} rotation={[0, -0.32, 0]}>
      <mesh position={[0, 0.12, 0]} castShadow>
        <boxGeometry args={[0.48, 0.24, 0.32]} />
        <meshStandardMaterial color={WOOD_DARK} metalness={0.35} roughness={0.42} />
      </mesh>
      <mesh position={[-0.2, 0.32, 0.06]} rotation={[-0.65, 0, 0]} castShadow>
        <boxGeometry args={[0.42, 0.04, 0.28]} />
        <meshStandardMaterial color="#1a2830" roughness={0.48} metalness={0.18} />
      </mesh>
      <mesh position={[0.04, 0.22, 0.04]} rotation={[0.12, -0.2, 0]}>
        <boxGeometry args={[0.14, 0.2, 0.06]} />
        <meshStandardMaterial color={MEDIA_ARCHIVE_SPINES[2]?.hue ?? '#1a2030'} roughness={0.5} />
      </mesh>
      <mesh position={[0.12, 0.18, 0.08]} rotation={[0.2, -0.35, 0.08]}>
        <boxGeometry args={[0.12, 0.18, 0.05]} />
        <meshStandardMaterial color={MEDIA_ARCHIVE_SPINES[5]?.hue ?? '#243040'} roughness={0.48} />
      </mesh>
      <mesh position={[0, 0.02, 0.14]}>
        <boxGeometry args={[0.44, 0.02, 0.06]} />
        <meshStandardMaterial color="#7090e8" emissive="#7090e8" emissiveIntensity={0.1 + emissive * 0.35} />
      </mesh>
    </group>
  )
}

function StackedMedia({ emissive }: { emissive: number }) {
  return (
    <group position={[-0.15, 0.48, 0.22]} rotation={[0, -0.12, 0]}>
      {[0, 1, 2].map((i) => (
        <mesh key={i} position={[i * 0.04, i * 0.06, i * 0.02]} rotation={[0, 0.08 * i, 0.04 * i]}>
          <boxGeometry args={[0.22, 0.28, 0.06]} />
          <meshStandardMaterial
            color={MEDIA_ARCHIVE_SPINES[i + 8]?.hue ?? '#1a2030'}
            roughness={0.48}
            emissive="#001020"
            emissiveIntensity={i === 2 ? emissive * 0.2 : 0}
          />
        </mesh>
      ))}
    </group>
  )
}

function NowWatchingStand({ emissive }: { emissive: number }) {
  const edgeColor = '#7090e8'
  const glowRef = useRef<Mesh>(null)

  useFrame(({ clock }) => {
    if (!glowRef.current) return
    const t = clock.getElapsedTime()
    const pulse = 0.35 + Math.sin(t * 1.4) * 0.15 + emissive * 0.45
    const mat = glowRef.current.material as { emissiveIntensity?: number }
    if (mat.emissiveIntensity !== undefined) mat.emissiveIntensity = pulse
  })

  return (
    <group position={[0.92, 0.55, 0.38]} rotation={[0, -0.08, 0]}>
      <mesh position={[0, 0.35, 0]}>
        <boxGeometry args={[0.04, 0.7, 0.04]} />
        <meshStandardMaterial color={CHROME} metalness={0.92} roughness={0.1} />
      </mesh>
      <mesh position={[0, 0.72, 0]} rotation={[0.08, 0, 0]}>
        <boxGeometry args={[0.32, 0.42, 0.012]} />
        <meshPhysicalMaterial color="#0a1420" transmission={0.4} transparent opacity={0.55} roughness={0.05} metalness={0.1} />
      </mesh>
      <mesh position={[0, 0.72, 0.008]} rotation={[0.08, 0, 0]}>
        <boxGeometry args={[0.3, 0.4, 0.004]} />
        <meshStandardMaterial color="#141820" roughness={0.5} />
      </mesh>
      <mesh ref={glowRef} position={[0.14, 0.72, 0.01]} rotation={[0.08, 0, 0]}>
        <boxGeometry args={[0.008, 0.38, 0.42]} />
        <meshStandardMaterial color={edgeColor} emissive={edgeColor} emissiveIntensity={emissive * 0.5} />
      </mesh>
      <mesh position={[0, 0.72, 0.012]} rotation={[0.08, 0, 0]}>
        <planeGeometry args={[0.26, 0.34]} />
        <meshStandardMaterial color="#7090e8" emissive="#7090e8" emissiveIntensity={emissive * 0.18} transparent opacity={0.35} />
      </mesh>
      <mesh position={[0, 0.02, 0]}>
        <cylinderGeometry args={[0.12, 0.14, 0.04, 20]} />
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
      <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[3.6, 1.1]} />
        <meshStandardMaterial color="#0a1828" emissive="#7090e8" emissiveIntensity={cobaltGlow * 0.12} />
      </mesh>

      <MediaArchiveShelf emissive={emissive} />

      <SymbolicAccent x={-0.95} y={0.78} accent="#8b1a1a" emissive={emissive} />
      <SymbolicAccent x={-0.28} y={0.72} accent="#c41e3a" emissive={emissive} />
      <SymbolicAccent x={0.42} y={0.76} accent="#4a6fa5" emissive={emissive} />
      <SymbolicAccent x={1.02} y={0.71} accent="#6b4c9a" emissive={emissive} />

      <ViewingChair emissive={emissive} />
      <OpenArchiveCase emissive={emissive} />
      <StackedMedia emissive={emissive} />

      <group position={[0.08, 0, -0.42]} rotation={[0, -0.04, 0]}>
        <mesh position={[0, 0.32, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.45, 0.64, 0.6]} />
          <meshPhysicalMaterial color={MARBLE} metalness={0.12} roughness={0.24} clearcoat={0.25} />
        </mesh>
        <mesh position={[0, 0.12, 0.02]} castShadow>
          <boxGeometry args={[2.25, 0.24, 0.52]} />
          <meshStandardMaterial color={WOOD_DARK} metalness={0.35} roughness={0.42} />
        </mesh>
        {[-0.58, 0.04, 0.52].map((x, i) => (
          <group key={i} position={[x, 0.48, 0.18]} rotation={[0, i === 1 ? 0.12 : i === 2 ? -0.08 : 0, 0]}>
            <mesh>
              <boxGeometry args={[0.12, 0.34, 0.24]} />
              <meshStandardMaterial
                color={MEDIA_ARCHIVE_SPINES[i + 4]?.hue ?? '#1a2030'}
                roughness={0.45}
                metalness={0.2}
              />
            </mesh>
            <mesh position={[0, 0, 0.13]}>
              <cylinderGeometry args={[0.04, 0.04, 0.02, 12]} />
              <meshStandardMaterial color={CHROME_DARK} metalness={0.85} roughness={0.15} />
            </mesh>
          </group>
        ))}
      </group>

      <NowWatchingStand emissive={emissive} />

      <mesh position={[0.14, 0.06, 0.38]} rotation={[0, 0.05, 0]}>
        <boxGeometry args={[2.15, 0.03, 0.06]} />
        <meshStandardMaterial color="#7090e8" emissive="#7090e8" emissiveIntensity={0.12 + cobaltGlow * 0.55} />
      </mesh>
    </group>
  )
}
