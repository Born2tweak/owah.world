'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function ChromeEnvironment() {
  const groupRef = useRef<THREE.Group>(null)
  
  // Generate a bunch of metallic shards/monoliths to float around
  // This gives the transparent CD highly complex geometry to reflect/refract
  const shards = Array.from({ length: 40 }).map((_, i) => {
    const position = [
      (Math.random() - 0.5) * 30,
      (Math.random() - 0.5) * 30,
      (Math.random() - 0.5) * 20 - 15, // Keep them strictly behind the CD
    ] as [number, number, number]
    
    const rotation = [
      Math.random() * Math.PI,
      Math.random() * Math.PI,
      Math.random() * Math.PI,
    ] as [number, number, number]
    
    const scale = [
      Math.random() * 2 + 1,
      Math.random() * 8 + 2,
      Math.random() * 2 + 1,
    ] as [number, number, number]

    return { position, rotation, scale, id: i }
  })

  useFrame((state) => {
    if (!groupRef.current) return
    const t = state.clock.getElapsedTime()
    
    // Slowly rotate the entire shard field to create shifting reflections
    groupRef.current.rotation.y = t * 0.05
    groupRef.current.rotation.x = Math.sin(t * 0.02) * 0.1
    
    // Add subtle bobbing
    groupRef.current.position.y = Math.sin(t * 0.5) * 0.5
  })

  return (
    <group ref={groupRef}>
      {shards.map((shard) => (
        <mesh 
          key={shard.id} 
          position={shard.position} 
          rotation={shard.rotation} 
          scale={shard.scale}
        >
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial 
            color="#ffffff" 
            metalness={1} 
            roughness={0.1} 
          />
        </mesh>
      ))}
    </group>
  )
}
