'use client'

/** Positions are local to life hotspot anchor [0, 2.6, -4.8] in world space. */

type LifeFeedZoneProps = { highlighted: boolean }

export default function LifeFeedZone({ highlighted }: LifeFeedZoneProps) {
  const emissive = highlighted ? 0.65 : 0.22

  return (
    <group position={[0, 0.25, -0.15]}>
      <mesh castShadow>
        <boxGeometry args={[2.5, 0.2, 0.08]} />
        <meshStandardMaterial
          color="#1a1810"
          emissive="#ffb347"
          emissiveIntensity={emissive * 0.35}
          metalness={0.45}
          roughness={0.32}
        />
      </mesh>
      <mesh position={[0, 0, 0.045]}>
        <planeGeometry args={[2.3, 0.1]} />
        <meshStandardMaterial color="#ffb347" emissive="#ffb347" emissiveIntensity={emissive} transparent opacity={0.88} />
      </mesh>
      <mesh position={[-0.95, 0, 0.05]}>
        <boxGeometry args={[0.35, 0.06, 0.02]} />
        <meshStandardMaterial color="#ffcc80" emissive="#ffb347" emissiveIntensity={emissive * 0.6} />
      </mesh>
      <mesh position={[0.4, 0, 0.05]}>
        <boxGeometry args={[0.5, 0.06, 0.02]} />
        <meshStandardMaterial color="#ffe0b0" emissive="#ffb347" emissiveIntensity={emissive * 0.4} />
      </mesh>
    </group>
  )
}
