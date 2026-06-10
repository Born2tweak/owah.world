'use client'

import * as THREE from 'three'
import { CHROME, CHROME_DARK, MARBLE, WOOD_DARK } from './roomMaterials'

/** Positions are local to watching hotspot anchor [5.1, 0, -3.2] in world space. */
const POSTERS = [
  { x: -0.75, y: 1.55, w: 0.42, h: 0.62, color: '#2a1848', lines: ['#c77dff', '#7090e8'] },
  { x: 0.95, y: 1.55, w: 0.42, h: 0.62, color: '#1a2848', lines: ['#88aaff', '#c77dff'] },
  { x: -0.4, y: 0.85, w: 0.35, h: 0.48, color: '#301838', lines: ['#ff88cc'] },
  { x: 0.6, y: 0.85, w: 0.35, h: 0.48, color: '#182838', lines: ['#66ccff'] },
]

const SCREEN_TILES = [
  { x: -0.95, y: 0.45, w: 0.92, h: 0.72, color: '#1a2848', em: 0.35 },
  { x: 0, y: 0.45, w: 0.92, h: 0.72, color: '#243060', em: 0.5 },
  { x: 0.95, y: 0.45, w: 0.92, h: 0.72, color: '#1a2040', em: 0.4 },
  { x: -0.95, y: -0.42, w: 0.92, h: 0.72, color: '#2a1848', em: 0.45 },
  { x: 0, y: -0.42, w: 0.92, h: 0.72, color: '#304878', em: 0.55 },
  { x: 0.95, y: -0.42, w: 0.92, h: 0.72, color: '#1a2838', em: 0.38 },
]

type WatchingZoneProps = { highlighted: boolean }

export default function WatchingZone({ highlighted }: WatchingZoneProps) {
  const emissive = highlighted ? 0.55 : 0.18
  const purpleGlow = highlighted ? 0.65 : 0.22

  return (
    <group>
      <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[3.6, 1.1]} />
        <meshStandardMaterial color="#180828" emissive="#c77dff" emissiveIntensity={purpleGlow * 0.18} />
      </mesh>

      <mesh position={[0, 1.7, -1.38]} castShadow>
        <boxGeometry args={[3.45, 2.12, 0.16]} />
        <meshStandardMaterial color="#040608" metalness={0.8} roughness={0.15} />
      </mesh>
      <mesh position={[0, 1.7, -1.28]}>
        <boxGeometry args={[3.15, 1.85, 0.04]} />
        <meshStandardMaterial color="#0a0c14" metalness={0.7} roughness={0.12} />
      </mesh>

      {SCREEN_TILES.map((tile, i) => (
        <group key={i} position={[tile.x, 1.7 + tile.y, -1.24]}>
          <mesh>
            <planeGeometry args={[tile.w, tile.h]} />
            <meshStandardMaterial
              color={tile.color}
              emissive="#7090e8"
              emissiveIntensity={emissive * tile.em}
              metalness={0.3}
              roughness={0.15}
            />
          </mesh>
          <mesh position={[0, 0, 0.005]}>
            <planeGeometry args={[tile.w - 0.04, 0.04]} />
            <meshStandardMaterial color="#c77dff" emissive="#c77dff" emissiveIntensity={purpleGlow * 0.3} />
          </mesh>
        </group>
      ))}

      <mesh position={[0, 0.78, -1.28]}>
        <boxGeometry args={[3.25, 0.045, 0.07]} />
        <meshStandardMaterial color="#c77dff" emissive="#c77dff" emissiveIntensity={purpleGlow * 0.85} />
      </mesh>

      <mesh position={[0, 2.78, -1.3]} rotation={[0.15, 0, 0]}>
        <coneGeometry args={[1.2, 2.2, 4, 1, true]} />
        <meshStandardMaterial color="#c77dff" transparent opacity={0.035} depthWrite={false} side={THREE.DoubleSide} />
      </mesh>

      <group position={[0, 0, -0.45]}>
        <mesh position={[0, 0.32, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.45, 0.64, 0.6]} />
          <meshPhysicalMaterial color={MARBLE} metalness={0.12} roughness={0.24} clearcoat={0.25} />
        </mesh>
        <mesh position={[0, 0.12, 0.02]} castShadow>
          <boxGeometry args={[2.25, 0.24, 0.52]} />
          <meshStandardMaterial color={WOOD_DARK} metalness={0.35} roughness={0.42} />
        </mesh>
        <mesh position={[0, 0.52, 0.24]}>
          <boxGeometry args={[0.35, 0.08, 0.12]} />
          <meshStandardMaterial color="#1a2030" metalness={0.4} roughness={0.35} />
        </mesh>
        <mesh position={[0.15, 0.52, 0.28]}>
          <boxGeometry args={[0.12, 0.04, 0.06]} />
          <meshStandardMaterial color="#c77dff" emissive="#c77dff" emissiveIntensity={purpleGlow * 0.5} />
        </mesh>
        {[-0.55, 0, 0.55].map((x, i) => (
          <mesh key={i} position={[x, 0.22, 0.22]}>
            <boxGeometry args={[0.55, 0.02, 0.02]} />
            <meshStandardMaterial color={CHROME} metalness={0.9} roughness={0.12} />
          </mesh>
        ))}
        {[-0.5, 0, 0.5].map((x, i) => (
          <group key={`slot-${i}`} position={[x, 0.48, 0.18]}>
            <mesh>
              <boxGeometry args={[0.12, 0.34, 0.24]} />
              <meshStandardMaterial color={['#1a2030', '#3a2050', '#102838'][i]} roughness={0.45} metalness={0.2} />
            </mesh>
            <mesh position={[0, 0, 0.13]}>
              <cylinderGeometry args={[0.04, 0.04, 0.02, 12]} />
              <meshStandardMaterial color={CHROME_DARK} metalness={0.85} roughness={0.15} />
            </mesh>
          </group>
        ))}
      </group>

      {POSTERS.map((p, i) => (
        <group key={i} position={[p.x, p.y, -1.72]}>
          <mesh>
            <boxGeometry args={[p.w + 0.06, p.h + 0.06, 0.03]} />
            <meshStandardMaterial color={CHROME} metalness={0.88} roughness={0.14} />
          </mesh>
          <mesh position={[0, 0, 0.02]}>
            <planeGeometry args={[p.w, p.h]} />
            <meshStandardMaterial color={p.color} emissive="#c77dff" emissiveIntensity={purpleGlow * 0.3} />
          </mesh>
          {p.lines.map((lineColor, li) => (
            <mesh key={li} position={[0, p.h * 0.2 - li * 0.12, 0.025]}>
              <planeGeometry args={[p.w * 0.7, 0.03]} />
              <meshStandardMaterial color={lineColor} emissive={lineColor} emissiveIntensity={purpleGlow * 0.4} />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  )
}
