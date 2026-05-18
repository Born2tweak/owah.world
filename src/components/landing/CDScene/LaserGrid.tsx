'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function LaserGrid() {
  const gridRef = useRef<THREE.GridHelper>(null)

  useFrame((state) => {
    if (!gridRef.current) return
    // Subtle breathing/moving animation
    const t = state.clock.getElapsedTime()
    gridRef.current.position.y = -10 + Math.sin(t * 0.5) * 0.2
    // Move grid backwards slightly to simulate endless forward motion
    gridRef.current.position.z = (t * 0.5) % 1
  })

  return (
    <group position={[0, -10, 0]}>
      {/* Primary bright green laser grid */}
      <gridHelper
        ref={gridRef}
        args={[100, 50, '#00ff88', 'rgba(0, 255, 136, 0.2)']}
      />
      {/* Grid fade out in the distance */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.1, 0]}>
        <planeGeometry args={[100, 100]} />
        <meshBasicMaterial transparent color="#111" />
      </mesh>
    </group>
  )
}
