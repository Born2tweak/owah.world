'use client'

import {
  CHROME,
  CHROME_DARK,
  FABRIC_DARK,
  FABRIC_LIGHT,
  FABRIC_MID,
  FABRIC_SILK,
  GLASS,
  MARBLE,
  WOOD_DARK,
} from './roomMaterials'

type GarmentSpec = {
  x: number
  width: number
  height: number
  depth: number
  color: string
  jacket?: boolean
  dress?: boolean
}

/** Positions are local to fashion hotspot anchor [-5.1, 0, -2.8] in world space. */
const GARMENTS: GarmentSpec[] = [
  { x: -1.05, width: 0.42, height: 1.12, depth: 0.2, color: FABRIC_DARK, jacket: true },
  { x: -0.62, width: 0.3, height: 0.98, depth: 0.16, color: FABRIC_MID, dress: true },
  { x: -0.18, width: 0.36, height: 1.05, depth: 0.18, color: FABRIC_SILK, jacket: true },
  { x: 0.26, width: 0.26, height: 0.88, depth: 0.14, color: FABRIC_LIGHT },
  { x: 0.7, width: 0.34, height: 1.0, depth: 0.17, color: '#243038' },
  { x: 1.14, width: 0.28, height: 0.92, depth: 0.15, color: FABRIC_MID, dress: true },
]

function fabricMat(color: string, emissive: number) {
  return (
    <meshStandardMaterial
      color={color}
      roughness={0.68}
      metalness={0.05}
      emissive="#001820"
      emissiveIntensity={emissive}
    />
  )
}

function HangerGarment({ spec, emissive }: { spec: GarmentSpec; emissive: number }) {
  const railY = 2.05
  const hookDrop = 0.14
  const shoulderY = railY - hookDrop - 0.02
  const sw = spec.width

  return (
    <group position={[spec.x, 0, -0.75]}>
      <mesh position={[0, railY - hookDrop, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.042, 0.01, 8, 16, Math.PI]} />
        <meshStandardMaterial color={CHROME_DARK} metalness={0.92} roughness={0.12} />
      </mesh>
      <mesh position={[0, railY - hookDrop - 0.05, 0]}>
        <cylinderGeometry args={[0.007, 0.007, 0.08, 8]} />
        <meshStandardMaterial color={CHROME} metalness={0.98} roughness={0.06} />
      </mesh>

      <mesh position={[0, shoulderY, 0.01]} rotation={[0, 0, 0]}>
        <boxGeometry args={[sw * 1.1, 0.06, spec.depth * 0.7]} />
        {fabricMat(spec.color, emissive * 0.5)}
      </mesh>
      <mesh position={[-sw * 0.38, shoulderY - 0.02, 0.02]} rotation={[0, 0, 0.28]}>
        <boxGeometry args={[sw * 0.45, 0.05, spec.depth * 0.55]} />
        {fabricMat(spec.color, emissive * 0.4)}
      </mesh>
      <mesh position={[sw * 0.38, shoulderY - 0.02, 0.02]} rotation={[0, 0, -0.28]}>
        <boxGeometry args={[sw * 0.45, 0.05, spec.depth * 0.55]} />
        {fabricMat(spec.color, emissive * 0.4)}
      </mesh>

      {spec.jacket ? (
        <>
          <mesh position={[0, shoulderY - spec.height * 0.32, 0.03]} castShadow>
            <boxGeometry args={[sw * 1.3, spec.height * 0.52, spec.depth]} />
            {fabricMat(spec.color, emissive)}
          </mesh>
          <mesh position={[-sw * 0.42, shoulderY - spec.height * 0.38, 0.02]} rotation={[0, 0, 0.08]} castShadow>
            <boxGeometry args={[sw * 0.35, spec.height * 0.48, spec.depth * 0.85]} />
            {fabricMat(spec.color, emissive * 0.85)}
          </mesh>
          <mesh position={[sw * 0.42, shoulderY - spec.height * 0.38, 0.02]} rotation={[0, 0, -0.08]} castShadow>
            <boxGeometry args={[sw * 0.35, spec.height * 0.48, spec.depth * 0.85]} />
            {fabricMat(spec.color, emissive * 0.85)}
          </mesh>
          <mesh position={[0, shoulderY - spec.height * 0.75, 0.015]} castShadow>
            <boxGeometry args={[sw * 0.8, spec.height * 0.38, spec.depth * 0.88]} />
            {fabricMat(spec.color, emissive * 0.7)}
          </mesh>
        </>
      ) : spec.dress ? (
        <mesh position={[0, shoulderY - spec.height * 0.48, 0.015]} castShadow>
          <boxGeometry args={[sw * 0.75, spec.height * 0.82, spec.depth * 0.75]} />
          {fabricMat(spec.color, emissive)}
        </mesh>
      ) : (
        <mesh position={[0, shoulderY - spec.height * 0.48, 0.015]} castShadow>
          <boxGeometry args={[sw, spec.height * 0.88, spec.depth]} />
          {fabricMat(spec.color, emissive)}
        </mesh>
      )}
    </group>
  )
}

function Shoe({ x, y, z, rot, color, emissive }: { x: number; y: number; z: number; rot: number; color: string; emissive: number }) {
  return (
    <group position={[x, y, z]} rotation={[0, rot, 0]}>
      <mesh position={[0, 0.02, 0.02]} castShadow>
        <boxGeometry args={[0.2, 0.04, 0.12]} />
        <meshStandardMaterial color="#0a1018" roughness={0.45} metalness={0.2} />
      </mesh>
      <mesh position={[0, 0.06, -0.01]} castShadow>
        <boxGeometry args={[0.18, 0.08, 0.1]} />
        <meshStandardMaterial color={color} roughness={0.5} emissive="#001018" emissiveIntensity={emissive} />
      </mesh>
      <mesh position={[0, 0.05, 0.04]} castShadow>
        <boxGeometry args={[0.16, 0.06, 0.04]} />
        <meshStandardMaterial color={color} roughness={0.55} emissive="#001018" emissiveIntensity={emissive * 0.8} />
      </mesh>
      <mesh position={[0, 0.08, -0.05]} castShadow>
        <boxGeometry args={[0.1, 0.1, 0.06]} />
        <meshStandardMaterial color="#141820" roughness={0.4} />
      </mesh>
    </group>
  )
}

function ShoeShelves({ emissive }: { emissive: number }) {
  const rows = [
    { y: 0.22, shoes: [[-0.22, 0.08, 0.1], [0.08, 0.1, -0.2], [0.32, 0.07, 0.15]] },
    { y: 0.62, shoes: [[-0.18, 0.09, -0.1], [0.12, 0.08, 0.2], [0.36, 0.1, -0.15]] },
    { y: 1.02, shoes: [[-0.1, 0.07, 0.05], [0.2, 0.09, -0.1]] },
  ]

  return (
    <group position={[-1.25, 0, 0.7]}>
      <mesh position={[0, 0.55, 0]} castShadow>
        <boxGeometry args={[0.95, 1.15, 0.38]} />
        <meshStandardMaterial color={WOOD_DARK} metalness={0.4} roughness={0.42} />
      </mesh>
      <mesh position={[0, 0.02, 0.12]}>
        <boxGeometry args={[0.9, 0.02, 0.3]} />
        <meshStandardMaterial color="#00c8e8" emissive="#00c8e8" emissiveIntensity={0.2 + emissive * 0.5} />
      </mesh>
      {rows.map((row) => (
        <group key={row.y} position={[0, row.y, 0.08]}>
          <mesh position={[0, -0.01, 0]}>
            <boxGeometry args={[0.88, 0.025, 0.32]} />
            <meshPhysicalMaterial color={CHROME} metalness={0.9} roughness={0.08} clearcoat={0.5} />
          </mesh>
          <mesh position={[0, 0.005, 0]}>
            <boxGeometry args={[0.84, 0.008, 0.28]} />
            <meshPhysicalMaterial color={GLASS} metalness={0.1} roughness={0.02} transmission={0.6} transparent opacity={0.35} />
          </mesh>
          {row.shoes.map(([sx, , rot], i) => (
            <Shoe
              key={i}
              x={sx}
              y={0.04}
              z={0.04}
              rot={rot}
              color={i % 2 === 0 ? '#1a2030' : '#2a3540'}
              emissive={emissive}
            />
          ))}
        </group>
      ))}
    </group>
  )
}

function GlassVitrine({ emissive }: { emissive: number }) {
  const w = 1.15
  const h = 0.72
  const d = 0.72
  const posts: [number, number, number][] = [
    [-w / 2 + 0.03, h / 2, -d / 2 + 0.03],
    [w / 2 - 0.03, h / 2, -d / 2 + 0.03],
    [-w / 2 + 0.03, h / 2, d / 2 - 0.03],
    [w / 2 - 0.03, h / 2, d / 2 - 0.03],
  ]

  return (
    <group position={[1.0, 0, 1.15]}>
      <mesh position={[0, 0.06, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.35, 0.12, 0.85]} />
        <meshPhysicalMaterial color={MARBLE} metalness={0.25} roughness={0.16} clearcoat={0.4} />
      </mesh>
      {posts.map(([x, y, z], i) => (
        <mesh key={i} position={[x, y, z]}>
          <boxGeometry args={[0.035, h, 0.035]} />
          <meshStandardMaterial color={CHROME} metalness={0.96} roughness={0.05} />
        </mesh>
      ))}
      {[
        [0, h / 2, -d / 2 + 0.01, w, h],
        [0, h / 2, d / 2 - 0.01, w, h],
        [-w / 2 + 0.01, h / 2, 0, d, h],
        [w / 2 - 0.01, h / 2, 0, d, h],
      ].map(([x, y, z, pw, ph], i) => (
        <mesh key={`glass-${i}`} position={[x, y, z]} rotation={[0, i >= 2 ? Math.PI / 2 : 0, 0]}>
          <planeGeometry args={[pw, ph]} />
          <meshPhysicalMaterial
            color={GLASS}
            metalness={0.08}
            roughness={0.02}
            transmission={0.88}
            transparent
            opacity={0.25}
            reflectivity={0.9}
            ior={1.45}
          />
        </mesh>
      ))}
      <mesh position={[0, h + 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[w, d]} />
        <meshPhysicalMaterial color={GLASS} transmission={0.75} transparent opacity={0.2} roughness={0.03} metalness={0.1} />
      </mesh>
      <mesh position={[0, 0.22, 0]} castShadow>
        <cylinderGeometry args={[0.12, 0.14, 0.35, 16]} />
        <meshStandardMaterial color="#1a3040" metalness={0.35} roughness={0.28} emissive="#00a8c8" emissiveIntensity={emissive * 0.4} />
      </mesh>
      <mesh position={[0, 0.42, 0]}>
        <boxGeometry args={[0.28, 0.32, 0.2]} />
        <meshPhysicalMaterial color="#2a6880" metalness={0.45} roughness={0.2} clearcoat={0.6} emissive="#00c8e8" emissiveIntensity={emissive * 0.5} />
      </mesh>
      <mesh position={[0, 0.02, d / 2 + 0.02]}>
        <boxGeometry args={[1.2, 0.015, 0.06]} />
        <meshStandardMaterial color="#00e8ff" emissive="#00e8ff" emissiveIntensity={0.18 + emissive * 0.45} />
      </mesh>
    </group>
  )
}

type FashionZoneProps = { highlighted: boolean }

export default function FashionZone({ highlighted }: FashionZoneProps) {
  const emissive = highlighted ? 0.35 : 0.06

  return (
    <group>
      <mesh position={[0, 0.015, -0.4]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[3.8, 1.2]} />
        <meshStandardMaterial color="#0e2838" emissive="#00c8e8" emissiveIntensity={emissive * 0.3} roughness={0.4} metalness={0.15} />
      </mesh>

      <mesh position={[0, 1.0, -0.95]} receiveShadow>
        <boxGeometry args={[3.2, 2.0, 0.06]} />
        <meshPhysicalMaterial color="#0a3848" metalness={0.2} roughness={0.35} clearcoat={0.3} emissive="#002030" emissiveIntensity={0.08} />
      </mesh>

      <mesh position={[0, 2.05, -0.72]} rotation={[0, 0.08, Math.PI / 2]}>
        <cylinderGeometry args={[0.02, 0.02, 2.85, 16]} />
        <meshStandardMaterial color={CHROME} metalness={1} roughness={0.05} />
      </mesh>
      <mesh position={[-1.42, 2.05, -0.72]} rotation={[0, 0.08, Math.PI / 2]}>
        <sphereGeometry args={[0.028, 12, 12]} />
        <meshStandardMaterial color={CHROME} metalness={0.98} roughness={0.04} />
      </mesh>
      <mesh position={[1.42, 2.05, -0.72]} rotation={[0, 0.08, Math.PI / 2]}>
        <sphereGeometry args={[0.028, 12, 12]} />
        <meshStandardMaterial color={CHROME} metalness={0.98} roughness={0.04} />
      </mesh>

      {GARMENTS.map((spec) => (
        <HangerGarment key={spec.x} spec={spec} emissive={emissive} />
      ))}

      <ShoeShelves emissive={emissive} />
      <GlassVitrine emissive={emissive} />

      <mesh position={[0, 0.28, -1.05]} castShadow receiveShadow>
        <boxGeometry args={[0.7, 0.52, 0.35]} />
        <meshPhysicalMaterial color="#1a2830" roughness={0.5} metalness={0.2} clearcoat={0.25} />
      </mesh>
      <mesh position={[0, 0.58, -1.02]} castShadow>
        <boxGeometry args={[0.65, 0.08, 0.32]} />
        <meshStandardMaterial color={MARBLE} metalness={0.15} roughness={0.22} />
      </mesh>
    </group>
  )
}
