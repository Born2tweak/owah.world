'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function LaserGrid() {
  const gridRef = useRef<THREE.GridHelper>(null)

  useFrame((state) => {
    if (!gridRef.current) return
    const t = state.clock.getElapsedTime()
    // Slow forward scroll — feels like flying over the grid
    gridRef.current.position.z = (t * 0.8) % 2
  })

  return (
    <group position={[0, -2.8, -2]}>
      {/* Neon green laser grid — visible in frame, perspective receding into distance */}
      <gridHelper
        ref={gridRef}
        args={[80, 40, '#00ff88', '#003316']}
      />
    </group>
  )
}
