'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const GRID_PRIMARY = '#6b3dff'
const GRID_SECONDARY = '#1a0a3d'
const HORIZON_GLOW = '#4400ff'

interface GridFloorProps {
  scrollProgress?: number
}

export default function GridFloor({ scrollProgress = 0 }: GridFloorProps) {
  const gridRef = useRef<THREE.GridHelper>(null)
  const glowRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    const drift = (t * 0.55 + scrollProgress * 28) % 4

    if (gridRef.current) {
      gridRef.current.position.z = -10 + drift
    }

    if (glowRef.current) {
      const material = glowRef.current.material as THREE.MeshBasicMaterial
      material.opacity = 0.08 + Math.sin(t * 0.7) * 0.02
    }
  })

  return (
    <group>
      <mesh ref={glowRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, -38]}>
        <planeGeometry args={[90, 50]} />
        <meshBasicMaterial color={HORIZON_GLOW} transparent opacity={0.1} />
      </mesh>
      <gridHelper ref={gridRef} args={[160, 80, GRID_PRIMARY, GRID_SECONDARY]} position={[0, 0, -10]} />
    </group>
  )
}
