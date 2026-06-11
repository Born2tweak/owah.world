'use client'

import {
  CHROME,
  CHROME_DARK,
  FABRIC_DARK,
  FABRIC_MID,
  FABRIC_SILK,
  GLASS,
  MARBLE,
} from './roomMaterials'

type Silhouette = 'military-coat' | 'pinstripe-wide' | 'leather-bomber' | 'long-drape' | 'asymmetric' | 'structured'

type GarmentSpec = {
  x: number
  width: number
  height: number
  depth: number
  color: string
  silhouette: Silhouette
  /** Pulled toward room — recently handled */
  forwardPull?: number
  yaw?: number
}

/** Darkwear archive — monochrome, structured, avant-garde (WORLD_PROFILE). */
const GARMENTS: GarmentSpec[] = [
  { x: -1.05, width: 0.44, height: 1.18, depth: 0.22, color: '#141820', silhouette: 'military-coat' },
  { x: -0.58, width: 0.34, height: 1.02, depth: 0.2, color: '#1a2030', silhouette: 'pinstripe-wide' },
  { x: -0.12, width: 0.38, height: 0.92, depth: 0.18, color: '#0e1018', silhouette: 'leather-bomber', forwardPull: 0.14, yaw: 0.08 },
  { x: 0.34, width: 0.3, height: 1.14, depth: 0.16, color: FABRIC_SILK, silhouette: 'long-drape' },
  { x: 0.78, width: 0.32, height: 1.0, depth: 0.17, color: FABRIC_DARK, silhouette: 'asymmetric' },
  { x: 1.2, width: 0.28, height: 0.95, depth: 0.15, color: FABRIC_MID, silhouette: 'structured' },
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

  const body = () => {
    switch (spec.silhouette) {
      case 'military-coat':
        return (
          <>
            <mesh position={[0, shoulderY - spec.height * 0.3, 0.03]} castShadow>
              <boxGeometry args={[sw * 1.45, spec.height * 0.58, spec.depth]} />
              {fabricMat(spec.color, emissive)}
            </mesh>
            <mesh position={[-sw * 0.48, shoulderY - spec.height * 0.35, 0.02]} rotation={[0, 0, 0.06]} castShadow>
              <boxGeometry args={[sw * 0.38, spec.height * 0.52, spec.depth * 0.9]} />
              {fabricMat(spec.color, emissive * 0.9)}
            </mesh>
            <mesh position={[sw * 0.48, shoulderY - spec.height * 0.35, 0.02]} rotation={[0, 0, -0.06]} castShadow>
              <boxGeometry args={[sw * 0.38, spec.height * 0.52, spec.depth * 0.9]} />
              {fabricMat(spec.color, emissive * 0.9)}
            </mesh>
            <mesh position={[0, shoulderY - spec.height * 0.78, 0.02]} castShadow>
              <boxGeometry args={[sw * 0.85, spec.height * 0.42, spec.depth * 0.92]} />
              {fabricMat(spec.color, emissive * 0.75)}
            </mesh>
            {[0.15, 0.35, 0.55].map((t) => (
              <mesh key={t} position={[sw * 0.42, shoulderY - spec.height * t, 0.04]}>
                <boxGeometry args={[0.02, 0.08, 0.02]} />
                <meshStandardMaterial color={CHROME_DARK} metalness={0.9} roughness={0.12} />
              </mesh>
            ))}
          </>
        )
      case 'pinstripe-wide':
        return (
          <>
            <mesh position={[0, shoulderY - spec.height * 0.42, 0.015]} castShadow>
              <boxGeometry args={[sw * 0.9, spec.height * 0.72, spec.depth * 0.8]} />
              {fabricMat(spec.color, emissive)}
            </mesh>
            <mesh position={[0, shoulderY - spec.height * 0.82, 0.01]} castShadow>
              <boxGeometry args={[sw * 1.35, spec.height * 0.38, spec.depth * 0.95]} />
              {fabricMat(spec.color, emissive * 0.85)}
            </mesh>
            {[-0.12, 0, 0.12].map((ox) => (
              <mesh key={ox} position={[ox, shoulderY - spec.height * 0.5, 0.025]}>
                <boxGeometry args={[0.008, spec.height * 0.65, 0.005]} />
                <meshStandardMaterial color="#2a3545" roughness={0.5} />
              </mesh>
            ))}
          </>
        )
      case 'leather-bomber':
        return (
          <>
            <mesh position={[0, shoulderY - spec.height * 0.38, 0.02]} castShadow>
              <boxGeometry args={[sw * 1.2, spec.height * 0.55, spec.depth]} />
              <meshStandardMaterial color={spec.color} roughness={0.35} metalness={0.25} emissive="#001018" emissiveIntensity={emissive} />
            </mesh>
            <mesh position={[0, shoulderY - spec.height * 0.62, 0.015]} castShadow>
              <boxGeometry args={[sw * 0.75, spec.height * 0.22, spec.depth * 0.85]} />
              <meshStandardMaterial color="#1a1820" roughness={0.4} metalness={0.2} emissive="#001018" emissiveIntensity={emissive * 0.7} />
            </mesh>
            <mesh position={[0, shoulderY - spec.height * 0.48, 0.04]}>
              <boxGeometry args={[sw * 0.5, 0.04, 0.02]} />
              <meshStandardMaterial color={CHROME_DARK} metalness={0.88} roughness={0.15} />
            </mesh>
          </>
        )
      case 'long-drape':
        return (
          <>
            <mesh position={[0, shoulderY - spec.height * 0.45, 0.015]} castShadow>
              <boxGeometry args={[sw * 0.8, spec.height * 0.78, spec.depth * 0.7]} />
              {fabricMat(spec.color, emissive)}
            </mesh>
            <mesh position={[0.08, shoulderY - spec.height * 0.55, 0.04]} rotation={[0, 0, -0.15]} castShadow>
              <boxGeometry args={[0.12, spec.height * 0.5, 0.04]} />
              {fabricMat('#1a2030', emissive * 0.6)}
            </mesh>
          </>
        )
      case 'asymmetric':
        return (
          <>
            <mesh position={[0.04, shoulderY - spec.height * 0.42, 0.015]} castShadow rotation={[0, 0, 0.04]}>
              <boxGeometry args={[sw * 1.1, spec.height * 0.78, spec.depth]} />
              {fabricMat(spec.color, emissive)}
            </mesh>
            <mesh position={[-sw * 0.35, shoulderY - spec.height * 0.55, 0.02]} rotation={[0, 0, 0.12]} castShadow>
              <boxGeometry args={[sw * 0.35, spec.height * 0.5, spec.depth * 0.8]} />
              {fabricMat('#141820', emissive * 0.8)}
            </mesh>
          </>
        )
      default:
        return (
          <mesh position={[0, shoulderY - spec.height * 0.48, 0.015]} castShadow>
            <boxGeometry args={[sw * 0.85, spec.height * 0.82, spec.depth * 0.78]} />
            {fabricMat(spec.color, emissive)}
          </mesh>
        )
    }
  }

  return (
    <group position={[spec.x, 0, -0.75 + (spec.forwardPull ?? 0)]} rotation={[0, spec.yaw ?? 0, 0]}>
      <mesh position={[0, railY - hookDrop, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.042, 0.01, 8, 16, Math.PI]} />
        <meshStandardMaterial color={CHROME_DARK} metalness={0.92} roughness={0.12} />
      </mesh>
      <mesh position={[0, railY - hookDrop - 0.05, 0]}>
        <cylinderGeometry args={[0.007, 0.007, 0.08, 8]} />
        <meshStandardMaterial color={CHROME} metalness={0.98} roughness={0.06} />
      </mesh>
      <mesh position={[0, shoulderY, 0.01]}>
        <boxGeometry args={[sw * 1.15, 0.06, spec.depth * 0.7]} />
        {fabricMat(spec.color, emissive * 0.5)}
      </mesh>
      <mesh position={[-sw * 0.4, shoulderY - 0.02, 0.02]} rotation={[0, 0, 0.3]}>
        <boxGeometry args={[sw * 0.48, 0.05, spec.depth * 0.55]} />
        {fabricMat(spec.color, emissive * 0.4)}
      </mesh>
      <mesh position={[sw * 0.4, shoulderY - 0.02, 0.02]} rotation={[0, 0, -0.3]}>
        <boxGeometry args={[sw * 0.48, 0.05, spec.depth * 0.55]} />
        {fabricMat(spec.color, emissive * 0.4)}
      </mesh>
      {body()}
    </group>
  )
}

function TabiBoot({ x, emissive }: { x: number; emissive: number }) {
  return (
    <group position={[x, 0.08, 0.05]}>
      <mesh castShadow>
        <boxGeometry args={[0.22, 0.06, 0.14]} />
        <meshStandardMaterial color="#0a1018" roughness={0.4} metalness={0.2} />
      </mesh>
      <mesh position={[-0.04, 0.1, -0.02]} castShadow>
        <boxGeometry args={[0.09, 0.14, 0.1]} />
        <meshStandardMaterial color="#141820" roughness={0.45} emissive="#001018" emissiveIntensity={emissive} />
      </mesh>
      <mesh position={[0.04, 0.1, -0.02]} castShadow>
        <boxGeometry args={[0.09, 0.14, 0.1]} />
        <meshStandardMaterial color="#141820" roughness={0.45} emissive="#001018" emissiveIntensity={emissive} />
      </mesh>
    </group>
  )
}

function PlatformClog({ x, emissive }: { x: number; emissive: number }) {
  return (
    <group position={[x, 0.1, -0.02]}>
      <mesh castShadow>
        <boxGeometry args={[0.2, 0.1, 0.16]} />
        <meshStandardMaterial color="#1a2030" roughness={0.35} metalness={0.15} />
      </mesh>
      <mesh position={[0, 0.12, 0]} castShadow>
        <boxGeometry args={[0.18, 0.14, 0.14]} />
        <meshStandardMaterial color="#2a2830" roughness={0.82} metalness={0.02} emissive="#001018" emissiveIntensity={emissive * 0.5} />
      </mesh>
    </group>
  )
}

function LeatherBoot({ x, emissive }: { x: number; emissive: number }) {
  return (
    <group position={[x, 0.06, 0.08]} rotation={[0, 0.2, 0]}>
      <mesh castShadow>
        <boxGeometry args={[0.2, 0.05, 0.13]} />
        <meshStandardMaterial color="#0a1018" roughness={0.4} />
      </mesh>
      <mesh position={[0, 0.12, -0.02]} castShadow>
        <boxGeometry args={[0.16, 0.18, 0.1]} />
        <meshStandardMaterial color="#1a1820" roughness={0.38} metalness={0.2} emissive="#001018" emissiveIntensity={emissive} />
      </mesh>
    </group>
  )
}

function FootwearPlinth({ emissive }: { emissive: number }) {
  return (
    <group position={[-1.32, 0, 0.82]} rotation={[0, 0.12, 0]}>
      <mesh position={[0, 0.04, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.05, 0.08, 0.55]} />
        <meshPhysicalMaterial color={MARBLE} metalness={0.2} roughness={0.18} clearcoat={0.35} />
      </mesh>
      <mesh position={[0, 0.02, 0.12]}>
        <boxGeometry args={[0.95, 0.02, 0.38]} />
        <meshStandardMaterial color="#00c8e8" emissive="#00c8e8" emissiveIntensity={0.15 + emissive * 0.45} />
      </mesh>
      <mesh position={[0, 0.22, 0.08]}>
        <boxGeometry args={[0.92, 0.008, 0.34]} />
        <meshPhysicalMaterial color={GLASS} transmission={0.55} transparent opacity={0.3} roughness={0.02} metalness={0.1} />
      </mesh>
      <group position={[-0.26, 0, 0.02]} rotation={[0, -0.25, 0]}>
        <TabiBoot x={0} emissive={emissive} />
      </group>
      <group position={[0.08, 0, -0.04]} rotation={[0, 0.35, 0]}>
        <PlatformClog x={0} emissive={emissive} />
      </group>
      <group position={[0.38, 0, 0.06]} rotation={[0, -0.15, 0]}>
        <LeatherBoot x={0} emissive={emissive} />
      </group>
      <mesh position={[0, 0.38, -0.18]}>
        <boxGeometry args={[0.85, 0.02, 0.04]} />
        <meshStandardMaterial color={CHROME} metalness={0.9} roughness={0.1} />
      </mesh>
    </group>
  )
}

function AccessoryVitrine({ emissive }: { emissive: number }) {
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
    <group position={[1.12, 0, 1.28]} rotation={[0, -0.1, 0]}>
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
          <meshPhysicalMaterial color={GLASS} transmission={0.88} transparent opacity={0.25} roughness={0.02} metalness={0.08} ior={1.45} />
        </mesh>
      ))}
      <mesh position={[0, 0.22, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <torusGeometry args={[0.14, 0.018, 12, 32]} />
        <meshStandardMaterial color="#8b1a1a" metalness={0.7} roughness={0.28} emissive="#c41e3a" emissiveIntensity={emissive * 0.55} />
      </mesh>
      <mesh position={[-0.22, 0.28, 0.05]} rotation={[0.3, 0.2, 0.5]}>
        <boxGeometry args={[0.04, 0.18, 0.02]} />
        <meshStandardMaterial color="#141820" metalness={0.5} roughness={0.35} />
      </mesh>
      <mesh position={[0.18, 0.26, -0.04]} rotation={[-0.2, -0.3, 0]}>
        <boxGeometry args={[0.12, 0.08, 0.04]} />
        <meshStandardMaterial color="#1a2030" roughness={0.55} metalness={0.15} />
      </mesh>
      <mesh position={[0, 0.02, d / 2 + 0.02]}>
        <boxGeometry args={[1.2, 0.015, 0.06]} />
        <meshStandardMaterial color="#c41e3a" emissive="#c41e3a" emissiveIntensity={0.12 + emissive * 0.35} />
      </mesh>
    </group>
  )
}

function DressingTable({ emissive }: { emissive: number }) {
  return (
    <group position={[-0.42, 0, 0.38]} rotation={[0, -0.18, 0]}>
      <mesh position={[0, 0.38, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.82, 0.04, 0.48]} />
        <meshPhysicalMaterial color={MARBLE} metalness={0.15} roughness={0.22} clearcoat={0.3} />
      </mesh>
      <mesh position={[-0.12, 0.42, 0.06]} rotation={[0.08, 0.2, 0.12]} castShadow>
        <boxGeometry args={[0.28, 0.06, 0.22]} />
        <meshStandardMaterial color="#141820" roughness={0.62} emissive="#001820" emissiveIntensity={emissive * 0.35} />
      </mesh>
      <mesh position={[0.18, 0.405, -0.04]}>
        <boxGeometry args={[0.22, 0.012, 0.16]} />
        <meshStandardMaterial color={CHROME_DARK} metalness={0.88} roughness={0.14} />
      </mesh>
      <mesh position={[0.2, 0.42, -0.02]} rotation={[0, 0.3, 0.15]}>
        <boxGeometry args={[0.14, 0.03, 0.05]} />
        <meshStandardMaterial color="#0a1018" metalness={0.5} roughness={0.35} />
      </mesh>
      <mesh position={[0.22, 0.425, 0.02]}>
        <torusGeometry args={[0.028, 0.006, 8, 16]} />
        <meshStandardMaterial color={CHROME} metalness={0.95} roughness={0.08} />
      </mesh>
      <mesh position={[-0.28, 0.42, -0.06]} rotation={[0.1, -0.15, 0]}>
        <boxGeometry args={[0.1, 0.025, 0.04]} />
        <meshStandardMaterial color="#1a2030" roughness={0.4} metalness={0.25} />
      </mesh>
    </group>
  )
}

function ArchiveDisplay({ emissive }: { emissive: number }) {
  return (
    <group position={[0.28, 0, -0.92]} rotation={[0, 0.22, 0]}>
      <mesh position={[0, 0.28, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.75, 0.52, 0.38]} />
        <meshPhysicalMaterial color="#1a2830" roughness={0.5} metalness={0.2} clearcoat={0.25} />
      </mesh>
      <mesh position={[0, 0.58, 0.02]} castShadow>
        <boxGeometry args={[0.68, 0.08, 0.34]} />
        <meshStandardMaterial color={MARBLE} metalness={0.15} roughness={0.22} />
      </mesh>
      <mesh position={[-0.28, 0.72, 0.08]} rotation={[-0.55, 0, 0]} castShadow>
        <boxGeometry args={[0.34, 0.04, 0.36]} />
        <meshStandardMaterial color="#1a2830" roughness={0.48} metalness={0.18} />
      </mesh>
      <mesh position={[0, 0.72, 0.04]} castShadow>
        <boxGeometry args={[0.22, 0.32, 0.12]} />
        <meshStandardMaterial color="#141820" roughness={0.55} emissive="#001820" emissiveIntensity={emissive * 0.4} />
      </mesh>
      <mesh position={[0.08, 0.88, 0.06]} rotation={[0, 0.15, 0]}>
        <boxGeometry args={[0.18, 0.04, 0.08]} />
        <meshStandardMaterial color="#1a2030" roughness={0.45} />
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

      <FootwearPlinth emissive={emissive} />
      <AccessoryVitrine emissive={emissive} />
      <DressingTable emissive={emissive} />
      <ArchiveDisplay emissive={emissive} />
    </group>
  )
}
