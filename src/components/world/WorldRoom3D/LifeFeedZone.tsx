'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text, useTexture } from '@react-three/drei'
import type { Group, Mesh, Texture } from 'three'
import { CHROME_DARK, GLASS, MARBLE } from './roomMaterials'
import { LIFE_SIGNALS } from './worldPersonalData'
import { lifeFeedAssets, type LifeFeedAsset, type LifeFeedAssetCategory } from './worldLifeFeedManifest'

/** Ambient activity layer - environmental storytelling, not dashboards. */

const MEMORY_ARCHIVE_IDS = [
  'fit-night-leather-11',
  'fit-red-leather-mural-06',
  'fit-shadow-black-08',
  'archive-art-lounge-01',
  'lifestyle-sunset-water-03',
  'fit-black-jacket-03',
  'lifestyle-clear-water-02',
  'fit-city-navy-09',
  'archive-mural-wall-02',
]

const memoryAssets = MEMORY_ARCHIVE_IDS.map((id) => lifeFeedAssets.find((asset) => asset.id === id)).filter(
  (asset): asset is LifeFeedAsset => Boolean(asset)
)

const categoryColors: Record<LifeFeedAssetCategory, string> = {
  fits: '#ffb347',
  lifestyle: '#38e7ff',
  archive: '#b7f7d2',
}

function SignalSegment({
  x,
  color,
  phase,
  highlighted,
  yOffset = 0,
}: {
  x: number
  color: string
  phase: number
  highlighted: boolean
  yOffset?: number
}) {
  const meshRef = useRef<Mesh>(null)

  useFrame(({ clock }) => {
    if (!meshRef.current) return
    const t = clock.getElapsedTime() + phase
    const pulse = 0.16 + Math.sin(t * 1.2) * 0.12 + (highlighted ? 0.28 : 0)
    const mat = meshRef.current.material as { emissiveIntensity?: number }
    if (mat.emissiveIntensity !== undefined) mat.emissiveIntensity = pulse
    meshRef.current.position.y = 0.02 + yOffset + Math.sin(t * 0.9) * 0.005
  })

  return (
    <mesh ref={meshRef} position={[x, 0.02 + yOffset, 0.05]}>
      <boxGeometry args={[0.46, 0.045, 0.024]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.22} />
    </mesh>
  )
}

function MemoryReadout({ highlighted }: { highlighted: boolean }) {
  return (
    <group position={[0, 0.44, 0.055]}>
      <Text position={[-1.18, 0.02, 0]} fontSize={0.04} color="#ffd7a3" anchorX="left" anchorY="middle">
        @ANDR1ANK
      </Text>
      <Text position={[1.18, 0.02, 0]} fontSize={0.03} color="#9fb4c2" anchorX="right" anchorY="middle">
        LOCAL ARCHIVE
      </Text>
      <Text position={[0, -0.1, 0]} fontSize={0.034} color="#e2e8f0" anchorX="center" anchorY="middle" maxWidth={1.58}>
        LIVING MEMORY FRAGMENTS
      </Text>
      <mesh position={[0, -0.2, 0]}>
        <boxGeometry args={[highlighted ? 1.42 : 1.12, 0.012, 0.01]} />
        <meshStandardMaterial color="#ffb347" emissive="#ffb347" emissiveIntensity={highlighted ? 0.42 : 0.2} />
      </mesh>
    </group>
  )
}

function ArchiveMemoryPanel({
  asset,
  highlighted,
  index,
  texture,
}: {
  asset: LifeFeedAsset
  highlighted: boolean
  index: number
  texture: Texture
}) {
  const isHero = index === 0
  const column = (index - 1) % 4
  const row = Math.floor((index - 1) / 4)
  const color = categoryColors[asset.category]
  const x = isHero ? -0.9 : -0.28 + column * 0.37
  const y = isHero ? 0.75 : 0.77 - row * 0.34
  const width = isHero ? 0.54 : 0.28
  const height = isHero ? 0.72 : 0.28
  const tilt = isHero ? -0.07 : (column - 1.5) * 0.018

  return (
    <group position={[x, y, 0.09]} rotation={[0, tilt, 0]}>
      <mesh castShadow>
        <boxGeometry args={[width + 0.06, height + 0.08, 0.035]} />
        <meshStandardMaterial color="#0d131b" metalness={0.56} roughness={0.26} />
      </mesh>
      <mesh position={[0, 0.005, 0.026]}>
        <planeGeometry args={[width, height]} />
        <meshStandardMaterial map={texture} color="#ffffff" roughness={0.34} metalness={0.02} />
      </mesh>
      <mesh position={[0, 0.005, 0.031]}>
        <planeGeometry args={[width + 0.02, height + 0.02]} />
        <meshPhysicalMaterial color={GLASS} transmission={0.7} transparent opacity={0.18} roughness={0.02} metalness={0.04} />
      </mesh>
      <mesh position={[0, -height / 2 - 0.032, 0.034]}>
        <boxGeometry args={[width * 0.72, 0.018, 0.012]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={highlighted ? 0.42 : 0.22} />
      </mesh>
      {isHero && (
        <Text position={[0, -height / 2 - 0.075, 0.04]} fontSize={0.03} color="#f8fafc" anchorX="center" anchorY="middle" maxWidth={0.46}>
          {asset.label?.toUpperCase() ?? 'LIFE ARCHIVE'}
        </Text>
      )}
    </group>
  )
}

type LifeFeedZoneProps = { highlighted: boolean }

export default function LifeFeedZone({ highlighted }: LifeFeedZoneProps) {
  const memoryTextures = useTexture(memoryAssets.map((asset) => asset.src)) as Texture[]
  const emissive = highlighted ? 0.55 : 0.18
  const barRef = useRef<Mesh>(null)
  const sweepRef = useRef<Mesh>(null)
  const groupRef = useRef<Group>(null)

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (barRef.current) {
      const sweep = 0.14 + Math.sin(t * 0.8) * 0.09 + (highlighted ? 0.22 : 0)
      const mat = barRef.current.material as { emissiveIntensity?: number }
      if (mat.emissiveIntensity !== undefined) mat.emissiveIntensity = sweep
    }
    if (sweepRef.current) {
      const x = Math.sin(t * 0.35) * 1.05
      sweepRef.current.position.x = x
      const mat = sweepRef.current.material as { emissiveIntensity?: number; opacity?: number }
      if (mat.emissiveIntensity !== undefined) {
        mat.emissiveIntensity = 0.1 + Math.sin(t * 0.6 + 1) * 0.06 + (highlighted ? 0.16 : 0)
      }
      if (mat.opacity !== undefined) mat.opacity = 0.38 + Math.sin(t * 0.5) * 0.12
    }
    if (groupRef.current) {
      groupRef.current.rotation.z = Math.sin(t * 0.25) * 0.008
    }
  })

  return (
    <group ref={groupRef} position={[0.1, 0.28, -0.12]} rotation={[0, -0.05, 0]}>
      <mesh position={[0, -0.03, 0]} castShadow>
        <boxGeometry args={[2.92, 0.08, 0.16]} />
        <meshPhysicalMaterial color={MARBLE} metalness={0.16} roughness={0.18} clearcoat={0.28} />
      </mesh>

      <mesh castShadow>
        <boxGeometry args={[2.78, 0.14, 0.08]} />
        <meshStandardMaterial color="#121820" metalness={0.5} roughness={0.3} />
      </mesh>

      <mesh position={[0, 0.05, 0.04]}>
        <boxGeometry args={[2.58, 0.1, 0.012]} />
        <meshPhysicalMaterial color={GLASS} transmission={0.72} transparent opacity={0.24} roughness={0.03} metalness={0.08} />
      </mesh>

      <mesh ref={barRef} position={[0, 0, 0.041]}>
        <planeGeometry args={[2.48, 0.07]} />
        <meshStandardMaterial color="#ffb347" emissive="#ffb347" emissiveIntensity={emissive * 0.35} transparent opacity={0.78} />
      </mesh>

      <mesh ref={sweepRef} position={[0, 0.01, 0.056]}>
        <boxGeometry args={[0.22, 0.03, 0.01]} />
        <meshStandardMaterial color="#ffb347" emissive="#ffb347" emissiveIntensity={0.12} transparent opacity={0.42} />
      </mesh>

      {LIFE_SIGNALS.map((signal, i) => (
        <SignalSegment
          key={signal.label}
          x={-1.06 + i * 0.7 + (i % 2 === 0 ? 0.04 : 0)}
          color={signal.color}
          phase={signal.phase}
          highlighted={highlighted}
          yOffset={i === 1 ? 0.006 : i === 3 ? -0.004 : 0}
        />
      ))}

      <MemoryReadout highlighted={highlighted} />

      {memoryAssets.map((asset, i) => (
        <ArchiveMemoryPanel key={asset.id} asset={asset} highlighted={highlighted} index={i} texture={memoryTextures[i]} />
      ))}

      <mesh position={[0, 0.09, 0.045]}>
        <boxGeometry args={[2.56, 0.01, 0.025]} />
        <meshStandardMaterial color={CHROME_DARK} metalness={0.88} roughness={0.12} />
      </mesh>

      <mesh position={[-1.24, 0.07, 0.05]}>
        <boxGeometry args={[0.1, 0.018, 0.012]} />
        <meshStandardMaterial color="#3dff9a" emissive="#3dff9a" emissiveIntensity={emissive * 0.35} />
      </mesh>
      <mesh position={[0.26, 0.068, 0.044]}>
        <boxGeometry args={[0.1, 0.018, 0.012]} />
        <meshStandardMaterial color="#7090e8" emissive="#7090e8" emissiveIntensity={emissive * 0.3} />
      </mesh>
      <mesh position={[1.22, 0.074, 0.048]}>
        <boxGeometry args={[0.1, 0.018, 0.012]} />
        <meshStandardMaterial color="#c41e3a" emissive="#c41e3a" emissiveIntensity={emissive * 0.28} />
      </mesh>
    </group>
  )
}
