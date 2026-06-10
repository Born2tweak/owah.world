'use client'

import { CHROME, CHROME_DARK, MARBLE, WOOD_DARK } from './roomMaterials'

/** Positions are local to music hotspot anchor [0, 0, -3.2] in world space. */

function SpeakerTower({ x, emissive }: { x: number; emissive: number }) {
  return (
    <group position={[x, 0, -0.35]}>
      <mesh position={[0, 0.06, 0]} castShadow>
        <boxGeometry args={[0.54, 0.11, 0.44]} />
        <meshPhysicalMaterial color={MARBLE} metalness={0.2} roughness={0.18} clearcoat={0.35} />
      </mesh>
      <mesh position={[0, 0.72, 0]} castShadow>
        <boxGeometry args={[0.44, 1.24, 0.38]} />
        <meshStandardMaterial color={WOOD_DARK} metalness={0.55} roughness={0.38} />
      </mesh>
      <mesh position={[0, 1.32, 0.02]}>
        <boxGeometry args={[0.46, 0.09, 0.4]} />
        <meshStandardMaterial color="#1e242c" metalness={0.65} roughness={0.28} />
      </mesh>
      <mesh position={[0, 0.72, 0.16]}>
        <boxGeometry args={[0.38, 1.1, 0.02]} />
        <meshStandardMaterial color="#0a1018" metalness={0.4} roughness={0.55} />
      </mesh>
      {[0.45, 0.72, 0.98].map((y, i) => (
        <group key={y} position={[0, y, 0.17]}>
          <mesh>
            <cylinderGeometry args={[i === 0 ? 0.11 : 0.075, i === 0 ? 0.11 : 0.075, 0.035, 24]} />
            <meshStandardMaterial color="#101820" metalness={0.75} roughness={0.22} />
          </mesh>
          <mesh position={[0, 0, 0.015]}>
            <cylinderGeometry args={[i === 0 ? 0.055 : 0.038, i === 0 ? 0.055 : 0.038, 0.012, 20]} />
            <meshStandardMaterial
              color={i === 1 ? '#3dff9a' : '#1a2830'}
              emissive={i === 1 ? '#3dff9a' : '#000000'}
              emissiveIntensity={i === 1 ? emissive * 1.2 : 0}
            />
          </mesh>
          <mesh position={[0, 0, 0.022]}>
            <ringGeometry args={[i === 0 ? 0.04 : 0.028, i === 0 ? 0.055 : 0.038, 24]} />
            <meshStandardMaterial color={CHROME_DARK} metalness={0.9} roughness={0.1} />
          </mesh>
        </group>
      ))}
      <mesh position={[0.21, 0.72, 0.02]}>
        <boxGeometry args={[0.015, 1.05, 0.32]} />
        <meshStandardMaterial color="#3dff9a" emissive="#3dff9a" emissiveIntensity={emissive * 0.35} />
      </mesh>
      <mesh position={[-0.21, 0.72, 0.02]}>
        <boxGeometry args={[0.015, 1.05, 0.32]} />
        <meshStandardMaterial color="#3dff9a" emissive="#3dff9a" emissiveIntensity={emissive * 0.35} />
      </mesh>
    </group>
  )
}

function AlbumPanel({
  x,
  color,
  accent,
  emissive,
}: {
  x: number
  color: string
  accent: string
  emissive: number
}) {
  return (
    <group position={[x, 1.35, -1.15]}>
      <mesh castShadow>
        <boxGeometry args={[0.34, 0.34, 0.045]} />
        <meshStandardMaterial color={CHROME_DARK} metalness={0.85} roughness={0.15} />
      </mesh>
      <mesh position={[0, 0, 0.028]}>
        <planeGeometry args={[0.28, 0.28]} />
        <meshStandardMaterial color={color} roughness={0.4} metalness={0.15} />
      </mesh>
      <mesh position={[0, 0, 0.03]}>
        <planeGeometry args={[0.2, 0.2]} />
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={emissive * 0.55} />
      </mesh>
      <mesh position={[0, -0.2, 0]}>
        <boxGeometry args={[0.02, 0.06, 0.02]} />
        <meshStandardMaterial color={CHROME} metalness={0.95} roughness={0.08} />
      </mesh>
    </group>
  )
}

type MusicZoneProps = { highlighted: boolean }

export default function MusicZone({ highlighted }: MusicZoneProps) {
  const emissive = highlighted ? 0.45 : 0.1

  return (
    <group>
      <mesh position={[0, 0.02, 0.05]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[2.8, 1]} />
        <meshStandardMaterial color="#0a2018" emissive="#3dff9a" emissiveIntensity={emissive * 0.22} />
      </mesh>

      <SpeakerTower x={-1.15} emissive={emissive} />
      <SpeakerTower x={1.15} emissive={emissive} />

      <mesh position={[0, 0.2, -0.3]} castShadow>
        <boxGeometry args={[0.98, 0.4, 0.58]} />
        <meshStandardMaterial color={WOOD_DARK} metalness={0.5} roughness={0.4} />
      </mesh>
      <mesh position={[0, 0.22, -0.28]}>
        <cylinderGeometry args={[0.2, 0.22, 0.05, 24]} />
        <meshStandardMaterial color="#0a1018" metalness={0.85} roughness={0.18} />
      </mesh>
      <mesh position={[0, 0.24, -0.26]}>
        <cylinderGeometry args={[0.14, 0.14, 0.02, 20]} />
        <meshStandardMaterial color="#3dff9a" emissive="#3dff9a" emissiveIntensity={emissive * 0.4} />
      </mesh>

      <group position={[0, 0, 0]}>
        <mesh position={[0, 0.38, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.2, 0.09, 0.72]} />
          <meshPhysicalMaterial color={MARBLE} metalness={0.15} roughness={0.22} clearcoat={0.3} />
        </mesh>
        <mesh position={[0, 0.445, 0.02]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.32, 0.32, 0.028, 36]} />
          <meshStandardMaterial color="#080c10" metalness={0.9} roughness={0.1} />
        </mesh>
        <mesh position={[0, 0.448, 0.02]} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.12, 0.3, 36]} />
          <meshStandardMaterial color="#1a2030" metalness={0.7} roughness={0.2} />
        </mesh>
        <mesh position={[0.24, 0.46, 0.1]} rotation={[0, 0, -0.38]}>
          <boxGeometry args={[0.34, 0.02, 0.025]} />
          <meshStandardMaterial color={CHROME} metalness={0.95} roughness={0.08} />
        </mesh>
        <mesh position={[0.38, 0.455, 0.16]}>
          <boxGeometry args={[0.07, 0.045, 0.045]} />
          <meshStandardMaterial color="#1a2030" metalness={0.6} roughness={0.3} />
        </mesh>
        <mesh position={[0, 0.5, 0.02]} rotation={[0.25, 0, 0]}>
          <boxGeometry args={[0.55, 0.015, 0.38]} />
          <meshPhysicalMaterial color={MARBLE} metalness={0.1} roughness={0.15} transmission={0.4} transparent opacity={0.35} />
        </mesh>
      </group>

      <mesh position={[0, 1.15, -1.15]}>
        <boxGeometry args={[2.55, 0.04, 0.09]} />
        <meshStandardMaterial color={CHROME} metalness={0.95} roughness={0.08} />
      </mesh>

      {[
        { x: -0.75, color: '#1a2030', accent: '#3dff9a' },
        { x: -0.25, color: '#243038', accent: '#88ffcc' },
        { x: 0.25, color: '#1a2830', accent: '#3dff9a' },
        { x: 0.75, color: '#2a3540', accent: '#66eeaa' },
      ].map((tile) => (
        <AlbumPanel key={tile.x} x={tile.x} color={tile.color} accent={tile.accent} emissive={emissive} />
      ))}

      <mesh position={[0, 0.06, 0.35]}>
        <boxGeometry args={[2.2, 0.03, 0.06]} />
        <meshStandardMaterial color="#3dff9a" emissive="#3dff9a" emissiveIntensity={0.18 + emissive * 0.7} />
      </mesh>
    </group>
  )
}
