'use client'

import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import type * as THREE from 'three'
import CDMesh from './CDMesh'
import LaserGrid from './LaserGrid'

// ─── Chrome shard background ──────────────────────────────────────────────────
function ChromeShard({ position, rotation, scale, brightness }: {
  position: [number, number, number]
  rotation: [number, number, number]
  scale: [number, number, number]
  brightness: number
}) {
  return (
    <mesh position={position} rotation={rotation} scale={scale}>
      <boxGeometry args={[1, 4, 0.04]} />
      {/* R3F declarative material — no new() leaks */}
      <meshPhysicalMaterial
        color={[brightness, brightness, brightness]}
        metalness={0.98}
        roughness={0.02}
        clearcoat={1}
        clearcoatRoughness={0.01}
        reflectivity={1}
      />
    </mesh>
  )
}

function ChromeShards() {
  const groupRef = useRef<THREE.Group>(null)
  const shards = Array.from({ length: 55 }, (_, i) => {
    const t = i * 2.399963
    const r = 8 + (i % 7) * 1.5
    return {
      id: i,
      position: [
        Math.cos(t) * r * (0.5 + (i % 5) * 0.3),
        ((i % 9) - 4) * 3.5,
        -6 - (i % 8) * 2.5,
      ] as [number, number, number],
      rotation: [
        (i * 17 % 180) * (Math.PI / 180),
        (i * 37 % 360) * (Math.PI / 180),
        (i * 53 % 180) * (Math.PI / 180),
      ] as [number, number, number],
      scale: [0.08 + (i % 5) * 0.04, 1 + (i % 6) * 0.7, 0.04] as [number, number, number],
      brightness: 0.5 + (i % 3) * 0.25,
    }
  })

  useFrame((state) => {
    if (!groupRef.current) return
    const t = state.clock.getElapsedTime()
    groupRef.current.rotation.z = t * 0.02
    groupRef.current.rotation.y = Math.sin(t * 0.1) * 0.08
  })

  return (
    <group ref={groupRef}>
      {shards.map((s) => <ChromeShard key={s.id} {...s} />)}
    </group>
  )
}

// ─── Sweeping laser beams ─────────────────────────────────────────────────────
function LaserBeam({ pivot, length, baseAngle, speed, phase }: {
  pivot: [number, number, number]
  length: number
  baseAngle: number
  speed: number
  phase: number
}) {
  const ref = useRef<THREE.Group>(null)
  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.z = baseAngle + Math.sin(state.clock.getElapsedTime() * speed + phase) * 0.28
  })
  return (
    <group ref={ref} position={pivot}>
      <mesh>
        <boxGeometry args={[length, 0.022, 0.022]} />
        <meshBasicMaterial color="#00ff88" transparent={true} opacity={0.85} />
      </mesh>
    </group>
  )
}

// ─── Scene ────────────────────────────────────────────────────────────────────
export default function CDScene() {
  return (
    <div style={{ width: '100%', height: '100vh', position: 'absolute', inset: 0 }}>
      <Canvas
        camera={{ position: [0, 0, 7], fov: 42 }}
        gl={{
          antialias: true,
          alpha: true,
          toneMapping: 3,
          toneMappingExposure: 2.2,
        }}
        shadows
      >
        <ambientLight intensity={3.0} color="#d0e4f8" />
        <hemisphereLight args={["#c8d8f0", "#1a2a3a", 2.0]} />
        <directionalLight position={[5, 6, 4]} intensity={8} color="#ffffff" castShadow />
        <directionalLight position={[-4, 2, 3]} intensity={4} color="#c0d8f4" />
        <directionalLight position={[0, -3, -4]} intensity={3} color="#ffffff" />
        <directionalLight position={[3, -2, 5]} intensity={4} color="#e8f4ff" />
        <pointLight position={[0, -4, 3]} intensity={5} color="#00ff88" />
        <pointLight position={[2, 5, 5]} intensity={4} color="#fffaf0" />
        <pointLight position={[-3, 3, 2]} intensity={3} color="#b0d0ff" />

        <ChromeShards />
        <CDMesh />
        <LaserGrid />

        <LaserBeam pivot={[-8, 2, -2]} length={24} baseAngle={0.5} speed={0.25} phase={0} />
        <LaserBeam pivot={[6, -1, -3]} length={20} baseAngle={-0.8} speed={0.18} phase={1.2} />
        <LaserBeam pivot={[0, 4, -1]} length={22} baseAngle={1.2} speed={0.3} phase={2.5} />

        {/* ContactShadows removed — uses expensive FBO that stresses headless renderers */}
      </Canvas>
    </div>
  )
}
