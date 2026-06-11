'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group, Mesh } from 'three'
import { CHROME_DARK, MARBLE } from './roomMaterials'
import { LIFE_SIGNALS } from './worldPersonalData'

/** Ambient activity layer — environmental storytelling, not dashboards. */

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
    const pulse = 0.15 + Math.sin(t * 1.2) * 0.12 + (highlighted ? 0.25 : 0)
    const mat = meshRef.current.material as { emissiveIntensity?: number }
    if (mat.emissiveIntensity !== undefined) mat.emissiveIntensity = pulse
    meshRef.current.position.y = 0.02 + yOffset + Math.sin(t * 0.9) * 0.004
  })

  return (
    <mesh ref={meshRef} position={[x, 0.02 + yOffset, 0.05]}>
      <boxGeometry args={[0.42, 0.04, 0.02]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.2} />
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
      const sweep = 0.12 + Math.sin(t * 0.8) * 0.08 + (highlighted ? 0.2 : 0)
      const mat = barRef.current.material as { emissiveIntensity?: number }
      if (mat.emissiveIntensity !== undefined) mat.emissiveIntensity = sweep
    }
    if (sweepRef.current) {
      const x = Math.sin(t * 0.35) * 0.95
      sweepRef.current.position.x = x
      const mat = sweepRef.current.material as { emissiveIntensity?: number; opacity?: number }
      if (mat.emissiveIntensity !== undefined) {
        mat.emissiveIntensity = 0.08 + Math.sin(t * 0.6 + 1) * 0.05 + (highlighted ? 0.15 : 0)
      }
      if (mat.opacity !== undefined) mat.opacity = 0.35 + Math.sin(t * 0.5) * 0.1
    }
    if (groupRef.current) {
      groupRef.current.rotation.z = Math.sin(t * 0.25) * 0.008
    }
  })

  return (
    <group ref={groupRef} position={[0.12, 0.25, -0.12]} rotation={[0, -0.06, 0]}>
      <mesh position={[0, -0.02, 0]} castShadow>
        <boxGeometry args={[2.6, 0.06, 0.12]} />
        <meshPhysicalMaterial color={MARBLE} metalness={0.15} roughness={0.22} clearcoat={0.25} />
      </mesh>

      <mesh castShadow>
        <boxGeometry args={[2.5, 0.12, 0.06]} />
        <meshStandardMaterial color="#121820" metalness={0.5} roughness={0.35} />
      </mesh>

      <mesh ref={barRef} position={[0, 0, 0.038]}>
        <planeGeometry args={[2.35, 0.06]} />
        <meshStandardMaterial color="#ffb347" emissive="#ffb347" emissiveIntensity={emissive * 0.35} transparent opacity={0.75} />
      </mesh>

      <mesh ref={sweepRef} position={[0, 0.01, 0.052]}>
        <boxGeometry args={[0.18, 0.025, 0.008]} />
        <meshStandardMaterial color="#ffb347" emissive="#ffb347" emissiveIntensity={0.12} transparent opacity={0.4} />
      </mesh>

      {LIFE_SIGNALS.map((signal, i) => (
        <SignalSegment
          key={signal.label}
          x={-0.95 + i * 0.62 + (i % 2 === 0 ? 0.04 : 0)}
          color={signal.color}
          phase={signal.phase}
          highlighted={highlighted}
          yOffset={i === 1 ? 0.006 : i === 3 ? -0.004 : 0}
        />
      ))}

      <mesh position={[0, 0.08, 0.04]}>
        <boxGeometry args={[2.4, 0.008, 0.02]} />
        <meshStandardMaterial color={CHROME_DARK} metalness={0.88} roughness={0.12} />
      </mesh>

      {/* Subtle zone cross-pollination — thin accent threads */}
      <mesh position={[-1.12, 0.065, 0.048]}>
        <boxGeometry args={[0.08, 0.015, 0.01]} />
        <meshStandardMaterial color="#3dff9a" emissive="#3dff9a" emissiveIntensity={emissive * 0.35} />
      </mesh>
      <mesh position={[0.28, 0.062, 0.042]}>
        <boxGeometry args={[0.08, 0.015, 0.01]} />
        <meshStandardMaterial color="#7090e8" emissive="#7090e8" emissiveIntensity={emissive * 0.3} />
      </mesh>
      <mesh position={[1.08, 0.068, 0.046]}>
        <boxGeometry args={[0.08, 0.015, 0.01]} />
        <meshStandardMaterial color="#c41e3a" emissive="#c41e3a" emissiveIntensity={emissive * 0.28} />
      </mesh>
    </group>
  )
}
