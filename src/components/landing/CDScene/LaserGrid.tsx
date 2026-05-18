'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function LaserGrid() {
  const gridRef = useRef<THREE.GridHelper>(null)

  useFrame((state) => {
    if (!gridRef.current) return
    const t = state.clock.getElapsedTime()
    // Slow forward scroll — recedes into the black void behind the crystal field
    gridRef.current.position.z = (t * 0.6) % 2
  })

  return (
    // y=-3.85: just above the floor plane at y=-4.0
    // Teal/cyan matches reference — distinctly different from pure green
    <group position={[0, -3.85, -2]}>
      <gridHelper
        ref={gridRef}
        args={[80, 40, '#00ddb8', '#002e2a']}
      />
    </group>
  )
}
