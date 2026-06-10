'use client'

import { useFrame } from '@react-three/fiber'
import type { ThreeEvent } from '@react-three/fiber'
import { useRef, useState, type ReactNode } from 'react'
import * as THREE from 'three'
import type { WorldCategory } from '../world.types'
import { ZONE_ACCENTS } from './roomZones'

type RoomZoneHotspotProps = {
  zone: WorldCategory
  position: [number, number, number]
  size: [number, number, number]
  isActive: boolean
  isHovered: boolean
  onHover: (zone: WorldCategory | null) => void
  onFocus: (zone: WorldCategory) => void
  children: ReactNode
}

export default function RoomZoneHotspot({
  zone,
  position,
  size,
  isActive,
  isHovered,
  onHover,
  onFocus,
  children,
}: RoomZoneHotspotProps) {
  const groupRef = useRef<THREE.Group>(null)
  const hitRef = useRef<THREE.Mesh>(null)
  const glowRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)
  const pointerDownRef = useRef<{ x: number; y: number } | null>(null)
  const accent = ZONE_ACCENTS[zone]

  useFrame((_, delta) => {
    if (!groupRef.current || !glowRef.current) return
    const material = glowRef.current.material as THREE.MeshBasicMaterial
    const highlight = hovered || isHovered || isActive ? 1 : 0
    material.opacity = THREE.MathUtils.damp(material.opacity, 0.08 + highlight * 0.22, 4, delta)
    const scale = 1 + highlight * 0.03
    groupRef.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 1 - Math.exp(-5 * delta))
  })

  const handlePointerDown = (event: ThreeEvent<PointerEvent>) => {
    pointerDownRef.current = { x: event.clientX, y: event.clientY }
  }

  const handlePointerUp = (event: ThreeEvent<PointerEvent>) => {
    if (!pointerDownRef.current) return
    const dx = event.clientX - pointerDownRef.current.x
    const dy = event.clientY - pointerDownRef.current.y
    pointerDownRef.current = null
    if (Math.hypot(dx, dy) < 7) {
      event.stopPropagation()
      onFocus(zone)
    }
  }

  return (
    <group ref={groupRef} position={position}>
      {children}
      <mesh ref={glowRef} position={[0, size[1] * 0.45, 0]}>
        <boxGeometry args={[size[0] * 1.08, size[1] * 1.05, size[2] * 1.08]} />
        <meshBasicMaterial color={accent} transparent opacity={0.08} depthWrite={false} />
      </mesh>
      <mesh
        ref={hitRef}
        position={[0, size[1] * 0.45, 0]}
        onPointerOver={(event) => {
          event.stopPropagation()
          setHovered(true)
          onHover(zone)
          document.body.style.cursor = 'pointer'
        }}
        onPointerOut={(event) => {
          event.stopPropagation()
          setHovered(false)
          onHover(null)
          document.body.style.cursor = 'auto'
        }}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
      >
        <boxGeometry args={size} />
        <meshBasicMaterial visible={false} />
      </mesh>
    </group>
  )
}
