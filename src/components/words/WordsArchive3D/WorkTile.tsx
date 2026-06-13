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
  faceActive: boolean
  onHover: (id: string | null) => void
  onFocus: (id: string) => void
}

export default function WorkTile({
  work,
  slot,
  accent,
  hovered,
  focused,
  related,
  faceActive,
  onHover,
  onFocus,
}: WorkTileProps) {
  const texture = useTexture(work.image)
  const groupRef = useRef<THREE.Group>(null)
  const frameRef = useRef<THREE.MeshStandardMaterial>(null)
  const [local, setLocal] = useState(false)
  const hot = hovered || local
  const pointerDown = useRef<{ x: number; y: number } | null>(null)

  useFrame((_, delta) => {
    if (!groupRef.current) return
    let z = 0.06
    let scale = 1
    if (focused) {
      z = 1.7
      scale = 1.85
    } else if (hot && faceActive) {
      z = 0.34
      scale = 1.1
    } else if (faceActive) {
      z = 0.16
    }
    const k = 1 - Math.exp(-9 * delta)
    groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, z, k)
    const s = THREE.MathUtils.lerp(groupRef.current.scale.x, scale, k)
    groupRef.current.scale.setScalar(s)
    if (frameRef.current) {
      const target = focused ? 1.2 : hot ? 0.85 : related ? 0.6 : faceActive ? 0.3 : 0.14
      frameRef.current.emissiveIntensity = THREE.MathUtils.lerp(frameRef.current.emissiveIntensity, target, k)
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
  const down = (e: ThreeEvent<PointerEvent>) => {
    pointerDown.current = { x: e.clientX, y: e.clientY }
  }
  const up = (e: ThreeEvent<PointerEvent>) => {
    if (!pointerDown.current) return
    const dx = e.clientX - pointerDown.current.x
    const dy = e.clientY - pointerDown.current.y
    pointerDown.current = null
    if (Math.hypot(dx, dy) < 7) {
      e.stopPropagation()
      onFocus(work.id)
    }
  }

  return (
    <group ref={groupRef} position={[slot[0], slot[1], 0.06]} onPointerOver={over} onPointerOut={out} onPointerDown={down} onPointerUp={up}>
      {/* frame / glow backing */}
      <mesh>
        <boxGeometry args={[TILE_SIZE + 0.08, TILE_SIZE + 0.08, 0.1]} />
        <meshStandardMaterial ref={frameRef} color="#0c1016" emissive={accent} emissiveIntensity={0.2} roughness={0.4} metalness={0.4} />
      </mesh>
      {/* image */}
      <mesh position={[0, 0, 0.055]}>
        <planeGeometry args={[TILE_SIZE, TILE_SIZE]} />
        <meshStandardMaterial map={texture} toneMapped={false} roughness={0.6} metalness={0.05} />
      </mesh>
      {/* glass sheen */}
      <mesh position={[0, 0, 0.06]}>
        <planeGeometry args={[TILE_SIZE, TILE_SIZE]} />
        <meshPhysicalMaterial color="#cfe6f2" transmission={0.9} transparent opacity={hot ? 0.05 : 0.12} roughness={0.05} metalness={0.1} />
      </mesh>
    </group>
  )
}
