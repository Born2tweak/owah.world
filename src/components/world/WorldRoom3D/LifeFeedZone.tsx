'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text, useTexture } from '@react-three/drei'
import type { Mesh, Texture } from 'three'
import { CHROME, CHROME_DARK, GLASS } from './roomMaterials'
import { lifeFeedAssets, type LifeFeedAsset, type LifeFeedAssetCategory } from './worldLifeFeedManifest'

/**
 * Memory sanctuary - a wall-mounted shrine on the right wall. Instagram
 * archive fragments hang as glass cards over an amber-lit field: one hero
 * image, six supporting memories, chrome rails framing the wall.
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

/** Hero on the left, two columns of supporting memories on the right. */
const CARD_SLOTS: { x: number; y: number; w: number; h: number; tilt: number; z: number }[] = [
  { x: -0.72, y: 1.85, w: 0.92, h: 1.3, tilt: 0, z: 0.16 },
  { x: 0.18, y: 2.5, w: 0.55, h: 0.55, tilt: 0.02, z: 0.14 },
  { x: 0.88, y: 2.5, w: 0.55, h: 0.55, tilt: -0.02, z: 0.15 },
  { x: 0.18, y: 1.85, w: 0.55, h: 0.55, tilt: -0.015, z: 0.15 },
  { x: 0.88, y: 1.85, w: 0.55, h: 0.55, tilt: 0.02, z: 0.14 },
  { x: 0.18, y: 1.2, w: 0.55, h: 0.55, tilt: 0.018, z: 0.16 },
  { x: 0.88, y: 1.2, w: 0.55, h: 0.55, tilt: -0.02, z: 0.14 },
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
        <boxGeometry args={[slot.w + 0.06, slot.h + 0.07, 0.03]} />
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
      <mesh position={[0, -slot.h / 2 - 0.028, 0.028]}>
        <boxGeometry args={[slot.w * 0.6, 0.014, 0.01]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={highlighted ? 0.42 : 0.22} />
      </mesh>
    </group>
  )
}

type LifeFeedZoneProps = { highlighted: boolean }

export default function LifeFeedZone({ highlighted }: LifeFeedZoneProps) {
  const memoryTextures = useTexture(memoryAssets.map((asset) => asset.src)) as Texture[]
  const emissive = highlighted ? 0.55 : 0.18
  const fieldRef = useRef<Mesh>(null)
  const haloRef = useRef<Mesh>(null)

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (fieldRef.current) {
      const breath = 0.14 + Math.sin(t * 0.7) * 0.06 + (highlighted ? 0.26 : 0)
      const mat = fieldRef.current.material as { emissiveIntensity?: number }
      if (mat.emissiveIntensity !== undefined) mat.emissiveIntensity = breath
    }
    if (haloRef.current) {
      const pulse = 0.26 + Math.sin(t * 1.1 + 0.8) * 0.1 + (highlighted ? 0.28 : 0)
      const mat = haloRef.current.material as { emissiveIntensity?: number }
      if (mat.emissiveIntensity !== undefined) mat.emissiveIntensity = pulse
    }
  })

  return (
    <group rotation={[0, -Math.PI / 2, 0]}>
      <mesh position={[0, 2.0, 0.05]} castShadow>
        <boxGeometry args={[2.85, 2.85, 0.08]} />
        <meshStandardMaterial color="#10151d" metalness={0.5} roughness={0.3} />
      </mesh>
      <mesh ref={fieldRef} position={[0, 2.0, 0.096]}>
        <planeGeometry args={[2.7, 2.7]} />
        <meshStandardMaterial color="#1c130a" emissive="#ffb347" emissiveIntensity={0.14} roughness={0.42} />
      </mesh>

      <mesh position={[0, 3.46, 0.1]}>
        <boxGeometry args={[2.92, 0.05, 0.1]} />
        <meshStandardMaterial color={CHROME} metalness={0.94} roughness={0.08} />
      </mesh>
      <mesh position={[0, 0.56, 0.1]}>
        <boxGeometry args={[2.92, 0.05, 0.1]} />
        <meshStandardMaterial color={CHROME_DARK} metalness={0.88} roughness={0.12} />
      </mesh>
      <mesh ref={haloRef} position={[0, 3.4, 0.105]}>
        <boxGeometry args={[2.7, 0.022, 0.04]} />
        <meshStandardMaterial color="#ffd9a0" emissive="#ffb347" emissiveIntensity={0.26} />
      </mesh>

      <Text position={[-1.28, 3.16, 0.105]} fontSize={0.085} color="#ffd7a3" anchorX="left" anchorY="middle" letterSpacing={0.14}>
        LIFE FEED
      </Text>
      <Text position={[1.28, 3.16, 0.105]} fontSize={0.045} color="#9fb4c2" anchorX="right" anchorY="middle" letterSpacing={0.1}>
        @ANDR1ANK
      </Text>
      <mesh position={[-1.28, 3.02, 0.105]}>
        <boxGeometry args={[0.42, 0.016, 0.01]} />
        <meshStandardMaterial color="#ffb347" emissive="#ffb347" emissiveIntensity={0.3 + emissive * 0.5} />
      </mesh>

      {memoryAssets.map((asset, i) => (
        <MemoryCard
          key={asset.id}
          asset={asset}
          highlighted={highlighted}
          slot={CARD_SLOTS[i % CARD_SLOTS.length]}
          texture={memoryTextures[i]}
        />
      ))}

      <Text position={[0, 0.78, 0.105]} fontSize={0.036} color="#cdbfa6" anchorX="center" anchorY="middle" letterSpacing={0.24}>
        LIVING MEMORY
      </Text>

      <pointLight position={[0, 2.1, 1.2]} intensity={highlighted ? 1.3 : 0.8} color="#ffb347" distance={4.2} decay={2} />
    </group>
  )
}
