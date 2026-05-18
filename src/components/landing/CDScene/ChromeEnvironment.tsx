'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'


function LaserBeam({
  pivot,
  length,
  baseAngle,
  speed,
  phase,
}: {
  pivot: [number, number, number]
  length: number
  baseAngle: number
  speed: number
  phase: number
}) {
  const ref = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.getElapsedTime()
    ref.current.rotation.z = baseAngle + Math.sin(t * speed + phase) * 0.28
  })

  return (
    <group ref={ref} position={pivot}>
      <mesh>
        <boxGeometry args={[length, 0.022, 0.022]} />
        <meshBasicMaterial color="#00ff88" transparent opacity={0.88} />
      </mesh>
    </group>
  )
}

// ─── Procedural chrome abstract environment ───────────────────────────────────
// Inspiration: the first reference image — organic fractal silver/chrome
// geometry. NO AI-generated images. We build it with real R3F geometry.
// Key: thin extruded planes at random angles = chrome shards catching light
// These stay strictly in the BACKGROUND (z < -3) so they don't clutter the CD.

function ChromeShard({ position, rotation, scale, brightness }: {
  position: [number, number, number]
  rotation: [number, number, number]
  scale: [number, number, number]
  brightness: number
}) {
  const meshRef = useRef<THREE.Mesh>(null)

  const material = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(brightness, brightness, brightness),
    metalness: 0.98,
    roughness: 0.02,
    clearcoat: 1.0,
    clearcoatRoughness: 0.01,
    reflectivity: 1.0,
  })

  return (
    <mesh ref={meshRef} position={position} rotation={rotation} scale={scale}>
      {/* Thin elongated box = a chrome shard/sliver */}
      <boxGeometry args={[1, 4, 0.04]} />
      <primitive object={material} attach="material" />
    </mesh>
  )
}

export default function ChromeEnvironment() {
  const groupRef = useRef<THREE.Group>(null)

  // Deterministic placement of shards — no Math.random in render
  const shards = Array.from({ length: 60 }, (_, i) => {
    // Pseudo-random from index
    const t = i * 2.399963 // golden angle spread
    const r = 8 + (i % 7) * 1.5
    const x = Math.cos(t) * r * (0.5 + (i % 5) * 0.3)
    const y = ((i % 9) - 4) * 3.5
    const z = -6 - (i % 8) * 2.5

    const rx = (i * 17 % 180) * (Math.PI / 180)
    const ry = (i * 37 % 360) * (Math.PI / 180)
    const rz = (i * 53 % 180) * (Math.PI / 180)

    const sx = 0.08 + (i % 5) * 0.04
    const sy = 1 + (i % 6) * 0.7
    const sz = 0.04

    // Alternating bright/dark for contrast
    const brightness = 0.5 + (i % 3) * 0.25

    return {
      id: i,
      position: [x, y, z] as [number, number, number],
      rotation: [rx, ry, rz] as [number, number, number],
      scale: [sx, sy, sz] as [number, number, number],
      brightness,
    }
  })

  useFrame((state) => {
    if (!groupRef.current) return
    const t = state.clock.getElapsedTime()
    // Very slow drift rotation to keep background alive
    groupRef.current.rotation.z = t * 0.02
    groupRef.current.rotation.y = Math.sin(t * 0.1) * 0.08
  })

  return (
    <group ref={groupRef}>
      {shards.map((s) => (
        <ChromeShard key={s.id} {...s} />
      ))}
      <LaserBeam pivot={[-8, 2, -2]} length={24} baseAngle={0.5} speed={0.25} phase={0} />
      <LaserBeam pivot={[6, -1, -3]} length={20} baseAngle={-0.8} speed={0.18} phase={1.2} />
      <LaserBeam pivot={[0, 4, -1]} length={22} baseAngle={1.2} speed={0.3} phase={2.5} />
    </group>
  )
}
