'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text, useTexture } from '@react-three/drei'
import type { Mesh, Texture } from 'three'
import { CHROME_DARK, GLASS, MARBLE } from './roomMaterials'
import { lifeFeedAssets, type LifeFeedAsset, type LifeFeedAssetCategory } from './worldLifeFeedManifest'

/**
 * Memory sanctuary - a freestanding illuminated photo totem in the seam
 * between the wardrobe and the music wall. Instagram archive fragments
 * float as glass cards against an amber-lit spine.
 */

const MEMORY_ARCHIVE_IDS = [
  'fit-night-leather-11',
  'fit-red-leather-mural-06',
  'fit-shadow-black-08',
  'archive-art-lounge-01',
  'lifestyle-sunset-water-03',
  'fit-black-jacket-03',
  'lifestyle-clear-water-02',
]

const memoryAssets = MEMORY_ARCHIVE_IDS.map((id) => lifeFeedAssets.find((asset) => asset.id === id)).filter(
  (asset): asset is LifeFeedAsset => Boolean(asset)
)

const categoryColors: Record<LifeFeedAssetCategory, string> = {
  fits: '#ffb347',
  lifestyle: '#38e7ff',
  archive: '#b7f7d2',
}

/** Hero on top, pairs and singles cascading down the spine. */
const CARD_SLOTS: { x: number; y: number; w: number; h: number; tilt: number; z: number }[] = [
  { x: 0, y: 2.42, w: 0.56, h: 0.7, tilt: 0, z: 0.1 },
  { x: -0.24, y: 1.76, w: 0.34, h: 0.42, tilt: -0.04, z: 0.08 },
  { x: 0.25, y: 1.82, w: 0.34, h: 0.42, tilt: 0.05, z: 0.12 },
  { x: 0.02, y: 1.22, w: 0.46, h: 0.5, tilt: 0.02, z: 0.09 },
  { x: -0.24, y: 0.66, w: 0.3, h: 0.36, tilt: 0.04, z: 0.11 },
  { x: 0.24, y: 0.6, w: 0.3, h: 0.36, tilt: -0.05, z: 0.07 },
  { x: 0.01, y: 0.18, w: 0.26, h: 0.2, tilt: 0, z: 0.1 },
]

function MemoryCard({
  asset,
  highlighted,
  slot,
  texture,
}: {
  asset: LifeFeedAsset
  highlighted: boolean
  slot: (typeof CARD_SLOTS)[number]
  texture: Texture
}) {
  const color = categoryColors[asset.category]

  return (
    <group position={[slot.x, slot.y, slot.z]} rotation={[0, slot.tilt, 0]}>
      <mesh castShadow>
        <boxGeometry args={[slot.w + 0.05, slot.h + 0.06, 0.03]} />
        <meshStandardMaterial color="#0d131b" metalness={0.56} roughness={0.26} />
      </mesh>
      <mesh position={[0, 0.004, 0.022]}>
        <planeGeometry args={[slot.w, slot.h]} />
        <meshStandardMaterial map={texture} color="#ffffff" roughness={0.34} metalness={0.02} />
      </mesh>
      <mesh position={[0, 0.004, 0.027]}>
        <planeGeometry args={[slot.w + 0.016, slot.h + 0.016]} />
        <meshPhysicalMaterial color={GLASS} transmission={0.7} transparent opacity={0.16} roughness={0.02} metalness={0.04} />
      </mesh>
      <mesh position={[0, -slot.h / 2 - 0.026, 0.028]}>
        <boxGeometry args={[slot.w * 0.66, 0.014, 0.01]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={highlighted ? 0.42 : 0.22} />
      </mesh>
    </group>
  )
}

type LifeFeedZoneProps = { highlighted: boolean }

export default function LifeFeedZone({ highlighted }: LifeFeedZoneProps) {
  const memoryTextures = useTexture(memoryAssets.map((asset) => asset.src)) as Texture[]
  const emissive = highlighted ? 0.55 : 0.18
  const spineRef = useRef<Mesh>(null)
  const haloRef = useRef<Mesh>(null)

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (spineRef.current) {
      const breath = 0.16 + Math.sin(t * 0.7) * 0.07 + (highlighted ? 0.3 : 0)
      const mat = spineRef.current.material as { emissiveIntensity?: number }
      if (mat.emissiveIntensity !== undefined) mat.emissiveIntensity = breath
    }
    if (haloRef.current) {
      const pulse = 0.24 + Math.sin(t * 1.1 + 0.8) * 0.1 + (highlighted ? 0.28 : 0)
      const mat = haloRef.current.material as { emissiveIntensity?: number }
      if (mat.emissiveIntensity !== undefined) mat.emissiveIntensity = pulse
    }
  })

  return (
    <group rotation={[0, 0.08, 0]}>
      <mesh position={[0, 0.06, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.04, 0.12, 0.56]} />
        <meshPhysicalMaterial color={MARBLE} metalness={0.16} roughness={0.18} clearcoat={0.28} />
      </mesh>
      <mesh position={[0, 0.135, 0.14]}>
        <boxGeometry args={[0.92, 0.018, 0.2]} />
        <meshStandardMaterial color="#ffb347" emissive="#ffb347" emissiveIntensity={0.14 + emissive * 0.4} />
      </mesh>

      <mesh position={[0, 1.66, -0.14]} castShadow>
        <boxGeometry args={[0.98, 3.06, 0.1]} />
        <meshStandardMaterial color="#10151d" metalness={0.5} roughness={0.3} />
      </mesh>
      <mesh ref={spineRef} position={[0, 1.66, -0.082]}>
        <planeGeometry args={[0.84, 2.9]} />
        <meshStandardMaterial color="#1c130a" emissive="#ffb347" emissiveIntensity={0.16} roughness={0.42} />
      </mesh>

      {[-0.51, 0.51].map((x) => (
        <mesh key={x} position={[x, 1.66, -0.1]}>
          <boxGeometry args={[0.035, 3.06, 0.07]} />
          <meshStandardMaterial color={CHROME_DARK} metalness={0.88} roughness={0.12} />
        </mesh>
      ))}
      <mesh ref={haloRef} position={[0, 3.22, -0.1]}>
        <boxGeometry args={[0.86, 0.025, 0.05]} />
        <meshStandardMaterial color="#ffd9a0" emissive="#ffb347" emissiveIntensity={0.24} />
      </mesh>

      <Text position={[-0.42, 3.06, 0.0]} fontSize={0.052} color="#ffd7a3" anchorX="left" anchorY="middle">
        LIFE FEED
      </Text>
      <Text position={[0.42, 3.06, 0.0]} fontSize={0.03} color="#9fb4c2" anchorX="right" anchorY="middle">
        @ANDR1ANK
      </Text>
      <Text position={[0, 0.34, 0.16]} fontSize={0.028} color="#cdbfa6" anchorX="center" anchorY="middle" letterSpacing={0.18}>
        LIVING MEMORY
      </Text>

      {memoryAssets.map((asset, i) => (
        <MemoryCard
          key={asset.id}
          asset={asset}
          highlighted={highlighted}
          slot={CARD_SLOTS[i % CARD_SLOTS.length]}
          texture={memoryTextures[i]}
        />
      ))}

      <pointLight position={[0, 1.9, 0.7]} intensity={highlighted ? 1.15 : 0.7} color="#ffb347" distance={3.4} decay={2} />
    </group>
  )
}
