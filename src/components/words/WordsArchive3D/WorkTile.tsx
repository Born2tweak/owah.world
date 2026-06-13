'use client'

import { useTexture } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import type { ThreeEvent } from '@react-three/fiber'
import { useRef, useState } from 'react'
import * as THREE from 'three'
import type { ArchiveWork } from './wordsArchive.types'
import { TILE_SIZE } from './wordsArchiveData'

type WorkTileProps = {
  work: ArchiveWork
  slot: [number, number]
  accent: string
  hovered: boolean
  focused: boolean
  related: boolean
  interactive: boolean
  onHover: (id: string | null) => void
  onActivate: (id: string) => void
}

export default function WorkTile({ work, slot, accent, hovered, focused, related, interactive, onHover, onActivate }: WorkTileProps) {
  const texture = useTexture(work.image)
  const group = useRef<THREE.Group>(null)
  const edge = useRef<THREE.MeshStandardMaterial>(null)
  const [local, setLocal] = useState(false)
  const hot = hovered || local
  const down = useRef<{ x: number; y: number } | null>(null)

  useFrame((_, delta) => {
    if (!group.current) return
    let z = 0
    let s = 1
    if (focused) {
      z = 1.5
      s = 1.7
    } else if (hot && interactive) {
      z = 0.16
      s = 1.06
    } else if (related && interactive) {
      z = 0.07
    }
    const k = 1 - Math.exp(-9 * delta)
    group.current.position.z = THREE.MathUtils.lerp(group.current.position.z, z, k)
    const ns = THREE.MathUtils.lerp(group.current.scale.x, s, k)
    group.current.scale.setScalar(ns)
    if (edge.current) {
      const target = focused ? 1.2 : hot ? 0.9 : related ? 0.7 : 0.0
      edge.current.emissiveIntensity = THREE.MathUtils.lerp(edge.current.emissiveIntensity, target, k)
    }
  })

  const over = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation()
    setLocal(true)
    onHover(work.id)
    document.body.style.cursor = 'pointer'
  }
  const out = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation()
    setLocal(false)
    onHover(null)
    document.body.style.cursor = 'auto'
  }
  const pd = (e: ThreeEvent<PointerEvent>) => {
    down.current = { x: e.clientX, y: e.clientY }
  }
  const pu = (e: ThreeEvent<PointerEvent>) => {
    if (!down.current) return
    const dx = e.clientX - down.current.x
    const dy = e.clientY - down.current.y
    down.current = null
    if (Math.hypot(dx, dy) < 7) {
      e.stopPropagation()
      onActivate(work.id)
    }
  }

  return (
    <group ref={group} position={[slot[0], slot[1], 0]} onPointerOver={over} onPointerOut={out} onPointerDown={pd} onPointerUp={pu}>
      {/* accent edge that lights on hover/related/focus */}
      <mesh position={[0, 0, -0.02]}>
        <boxGeometry args={[TILE_SIZE + 0.03, TILE_SIZE + 0.03, 0.05]} />
        <meshStandardMaterial ref={edge} color="#05070b" emissive={accent} emissiveIntensity={0} roughness={0.4} metalness={0.5} />
      </mesh>
      {/* image */}
      <mesh position={[0, 0, 0.012]}>
        <planeGeometry args={[TILE_SIZE, TILE_SIZE]} />
        <meshStandardMaterial map={texture} toneMapped={false} roughness={0.62} metalness={0.04} />
      </mesh>
      {/* glass sheen */}
      <mesh position={[0, 0, 0.02]}>
        <planeGeometry args={[TILE_SIZE, TILE_SIZE]} />
        <meshPhysicalMaterial color="#dbeafe" transmission={0.92} transparent opacity={hot ? 0.04 : 0.1} roughness={0.04} metalness={0.05} />
      </mesh>
    </group>
  )
}
