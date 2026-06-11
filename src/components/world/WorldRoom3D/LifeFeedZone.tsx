'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group, Mesh } from 'three'
import { CHROME_DARK, GLASS, MARBLE } from './roomMaterials'
import { LIFE_SIGNALS } from './worldPersonalData'

/** Ambient activity layer - environmental storytelling, not dashboards. */

function SignalSegment({
  x,
  color,
  phase,
  highlighted,
  yOffset = 0,
}: {
  x: number
  color: string
  phase: number
  highlighted: boolean
  yOffset?: number
}) {
  const meshRef = useRef<Mesh>(null)

  useFrame(({ clock }) => {
    if (!meshRef.current) return
    const t = clock.getElapsedTime() + phase
    const pulse = 0.16 + Math.sin(t * 1.2) * 0.12 + (highlighted ? 0.28 : 0)
    const mat = meshRef.current.material as { emissiveIntensity?: number }
    if (mat.emissiveIntensity !== undefined) mat.emissiveIntensity = pulse
    meshRef.current.position.y = 0.02 + yOffset + Math.sin(t * 0.9) * 0.005
  })

  return (
    <mesh ref={meshRef} position={[x, 0.02 + yOffset, 0.05]}>
      <boxGeometry args={[0.46, 0.045, 0.024]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.22} />
    </mesh>
  )
}

type LifeFeedZoneProps = { highlighted: boolean }

export default function LifeFeedZone({ highlighted }: LifeFeedZoneProps) {
  const emissive = highlighted ? 0.55 : 0.18
  const barRef = useRef<Mesh>(null)
  const sweepRef = useRef<Mesh>(null)
  const groupRef = useRef<Group>(null)

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (barRef.current) {
      const sweep = 0.14 + Math.sin(t * 0.8) * 0.09 + (highlighted ? 0.22 : 0)
      const mat = barRef.current.material as { emissiveIntensity?: number }
      if (mat.emissiveIntensity !== undefined) mat.emissiveIntensity = sweep
    }
    if (sweepRef.current) {
      const x = Math.sin(t * 0.35) * 1.05
      sweepRef.current.position.x = x
      const mat = sweepRef.current.material as { emissiveIntensity?: number; opacity?: number }
      if (mat.emissiveIntensity !== undefined) {
        mat.emissiveIntensity = 0.1 + Math.sin(t * 0.6 + 1) * 0.06 + (highlighted ? 0.16 : 0)
      }
      if (mat.opacity !== undefined) mat.opacity = 0.38 + Math.sin(t * 0.5) * 0.12
    }
    if (groupRef.current) {
      groupRef.current.rotation.z = Math.sin(t * 0.25) * 0.008
    }
  })

  return (
    <group ref={groupRef} position={[0.1, 0.28, -0.12]} rotation={[0, -0.05, 0]}>
      <mesh position={[0, -0.03, 0]} castShadow>
        <boxGeometry args={[2.92, 0.08, 0.16]} />
        <meshPhysicalMaterial color={MARBLE} metalness={0.16} roughness={0.18} clearcoat={0.28} />
      </mesh>

      <mesh castShadow>
        <boxGeometry args={[2.78, 0.14, 0.08]} />
        <meshStandardMaterial color="#121820" metalness={0.5} roughness={0.3} />
      </mesh>

      <mesh position={[0, 0.05, 0.04]}>
        <boxGeometry args={[2.58, 0.1, 0.012]} />
        <meshPhysicalMaterial color={GLASS} transmission={0.72} transparent opacity={0.24} roughness={0.03} metalness={0.08} />
      </mesh>

      <mesh ref={barRef} position={[0, 0, 0.041]}>
        <planeGeometry args={[2.48, 0.07]} />
        <meshStandardMaterial color="#ffb347" emissive="#ffb347" emissiveIntensity={emissive * 0.35} transparent opacity={0.78} />
      </mesh>

      <mesh ref={sweepRef} position={[0, 0.01, 0.056]}>
        <boxGeometry args={[0.22, 0.03, 0.01]} />
        <meshStandardMaterial color="#ffb347" emissive="#ffb347" emissiveIntensity={0.12} transparent opacity={0.42} />
      </mesh>

      {LIFE_SIGNALS.map((signal, i) => (
        <SignalSegment
          key={signal.label}
          x={-1.06 + i * 0.7 + (i % 2 === 0 ? 0.04 : 0)}
          color={signal.color}
          phase={signal.phase}
          highlighted={highlighted}
          yOffset={i === 1 ? 0.006 : i === 3 ? -0.004 : 0}
        />
      ))}

      <mesh position={[0, 0.09, 0.045]}>
        <boxGeometry args={[2.56, 0.01, 0.025]} />
        <meshStandardMaterial color={CHROME_DARK} metalness={0.88} roughness={0.12} />
      </mesh>

      <mesh position={[-1.24, 0.07, 0.05]}>
        <boxGeometry args={[0.1, 0.018, 0.012]} />
        <meshStandardMaterial color="#3dff9a" emissive="#3dff9a" emissiveIntensity={emissive * 0.35} />
      </mesh>
      <mesh position={[0.26, 0.068, 0.044]}>
        <boxGeometry args={[0.1, 0.018, 0.012]} />
        <meshStandardMaterial color="#7090e8" emissive="#7090e8" emissiveIntensity={emissive * 0.3} />
      </mesh>
      <mesh position={[1.22, 0.074, 0.048]}>
        <boxGeometry args={[0.1, 0.018, 0.012]} />
        <meshStandardMaterial color="#c41e3a" emissive="#c41e3a" emissiveIntensity={emissive * 0.28} />
      </mesh>
    </group>
  )
}
