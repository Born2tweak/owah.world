'use client'

import { Text } from '@react-three/drei'
import {
  CHROME,
  CHROME_DARK,
  FABRIC_DARK,
  FABRIC_SILK,
  GLASS,
  MARBLE,
} from './roomMaterials'

type Silhouette = 'military-coat' | 'pinstripe-wide' | 'leather-bomber' | 'long-drape' | 'asymmetric'

type GarmentSpec = {
  x: number
  width: number
  height: number
  depth: number
  color: string
  silhouette: Silhouette
  forwardPull?: number
  yaw?: number
}

/** Darkwear archive - five strong silhouettes, generous spacing, lit from behind. */
const GARMENTS: GarmentSpec[] = [
  { x: -1.32, width: 0.5, height: 1.38, depth: 0.24, color: '#141820', silhouette: 'military-coat' },
  { x: -0.66, width: 0.38, height: 1.06, depth: 0.22, color: '#1a2030', silhouette: 'pinstripe-wide' },
  { x: 0, width: 0.44, height: 0.96, depth: 0.2, color: '#0e1018', silhouette: 'leather-bomber', forwardPull: 0.16, yaw: 0.08 },
  { x: 0.66, width: 0.34, height: 1.32, depth: 0.18, color: FABRIC_SILK, silhouette: 'long-drape' },
  { x: 1.32, width: 0.38, height: 1.1, depth: 0.18, color: FABRIC_DARK, silhouette: 'asymmetric' },
]

const MOODBOARD_CARDS = [
  { y: 0.78, label: 'OUTERWEAR', accent: '#00c8e8' },
  { y: 0, label: 'DRAPE', accent: '#8ea6b4' },
  { y: -0.78, label: 'LEATHER', accent: '#c41e3a' },
]

function fabricMat(color: string, emissive: number) {
  return (
    <meshStandardMaterial
      color={color}
      roughness={0.66}
      metalness={0.05}
      emissive="#001820"
      emissiveIntensity={emissive}
    />
  )
}

function HangerGarment({ spec, emissive }: { spec: GarmentSpec; emissive: number }) {
  const railY = 2.18
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
    }
  }

  return (
    <group position={[spec.x, 0, -0.84 + (spec.forwardPull ?? 0)]} rotation={[0, spec.yaw ?? 0, 0]}>
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

/** Full-height lightbox wardrobe: chrome frame + illuminated back panel so silhouettes read. */
function WardrobeLightbox({ emissive }: { emissive: number }) {
  return (
    <group>
      <mesh position={[0, 1.3, -1.0]}>
        <boxGeometry args={[3.6, 2.56, 0.05]} />
        <meshStandardMaterial
          color="#9fd8ec"
          emissive="#bfeaff"
          emissiveIntensity={0.32 + emissive * 0.55}
          roughness={0.3}
          metalness={0.05}
        />
      </mesh>
      <mesh position={[0, 1.3, -1.06]} castShadow receiveShadow>
        <boxGeometry args={[3.78, 2.72, 0.08]} />
        <meshStandardMaterial color="#0a3848" metalness={0.25} roughness={0.32} />
      </mesh>

      <mesh position={[0, 2.18, -0.78]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.024, 0.024, 3.5, 16]} />
        <meshStandardMaterial color={CHROME} metalness={1} roughness={0.05} />
      </mesh>
      {[-1.74, 1.74].map((x) => (
        <mesh key={x} position={[x, 1.3, -0.84]}>
          <boxGeometry args={[0.08, 2.6, 0.08]} />
          <meshStandardMaterial color={CHROME} metalness={0.95} roughness={0.06} />
        </mesh>
      ))}
      <mesh position={[0, 2.62, -0.86]}>
        <boxGeometry args={[3.56, 0.07, 0.12]} />
        <meshStandardMaterial color={CHROME} metalness={0.92} roughness={0.08} />
      </mesh>
      <mesh position={[0, 2.56, -0.82]}>
        <boxGeometry args={[3.3, 0.025, 0.05]} />
        <meshStandardMaterial color="#d3f4ff" emissive="#b4ecff" emissiveIntensity={0.5 + emissive * 0.6} />
      </mesh>
      <mesh position={[0, 0.04, -0.86]}>
        <boxGeometry args={[3.56, 0.08, 0.3]} />
        <meshStandardMaterial color="#10222c" metalness={0.42} roughness={0.24} />
      </mesh>

      {GARMENTS.map((spec) => (
        <HangerGarment key={spec.x} spec={spec} emissive={emissive} />
      ))}
    </group>
  )
}

function TabiBoot({ emissive }: { emissive: number }) {
  return (
    <group position={[0, 0.1, 0]} scale={1.1}>
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

function PlatformClog({ emissive }: { emissive: number }) {
  return (
    <group position={[0, 0.12, 0]} scale={1.08}>
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

function LeatherBoot({ emissive }: { emissive: number }) {
  return (
    <group position={[0, 0.08, 0]} scale={1.08}>
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
    <group position={[-1.5, 0, 1.0]} rotation={[0, 0.14, 0]} scale={1.18}>
      <mesh position={[0, 0.05, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.18, 0.1, 0.66]} />
        <meshPhysicalMaterial color={MARBLE} metalness={0.2} roughness={0.18} clearcoat={0.35} />
      </mesh>
      <mesh position={[0, 0.02, 0.12]}>
        <boxGeometry args={[1.06, 0.02, 0.48]} />
        <meshStandardMaterial color="#00c8e8" emissive="#00c8e8" emissiveIntensity={0.16 + emissive * 0.45} />
      </mesh>
      <mesh position={[0, 0.24, 0.08]}>
        <boxGeometry args={[1.02, 0.01, 0.44]} />
        <meshPhysicalMaterial color={GLASS} transmission={0.55} transparent opacity={0.3} roughness={0.02} metalness={0.1} />
      </mesh>
      <group position={[-0.3, 0, 0.04]} rotation={[0, -0.25, 0]}>
        <TabiBoot emissive={emissive} />
      </group>
      <group position={[0.08, 0, -0.06]} rotation={[0, 0.35, 0]}>
        <PlatformClog emissive={emissive} />
      </group>
      <group position={[0.42, 0, 0.08]} rotation={[0, -0.15, 0]}>
        <LeatherBoot emissive={emissive} />
      </group>
    </group>
  )
}

/** Wall-mounted moodboard lightbox on the left room wall - archive cards, not flat posters. */
function MoodboardPanel({ emissive }: { emissive: number }) {
  return (
    <group position={[-1.7, 1.45, 0.5]} rotation={[0, Math.PI / 2, 0]}>
      <mesh castShadow>
        <boxGeometry args={[1.06, 2.6, 0.07]} />
        <meshStandardMaterial color="#0a1018" metalness={0.45} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0, 0.038]}>
        <planeGeometry args={[0.94, 2.46]} />
        <meshStandardMaterial color="#10202c" emissive="#1a4458" emissiveIntensity={0.18 + emissive * 0.4} roughness={0.4} />
      </mesh>
      <Text position={[-0.36, 1.12, 0.05]} fontSize={0.052} color="#9fd8ec" anchorX="left" anchorY="middle">
        ARCHIVE / DARKWEAR
      </Text>
      {MOODBOARD_CARDS.map((card) => (
        <group key={card.label} position={[0, card.y - 0.16, 0.055]}>
          <mesh castShadow>
            <boxGeometry args={[0.78, 0.6, 0.025]} />
            <meshStandardMaterial color="#141a22" roughness={0.55} metalness={0.18} />
          </mesh>
          <mesh position={[0, 0.31, 0.005]}>
            <boxGeometry args={[0.1, 0.04, 0.03]} />
            <meshStandardMaterial color={CHROME} metalness={0.95} roughness={0.08} />
          </mesh>
          <mesh position={[-0.34, 0, 0.016]}>
            <boxGeometry args={[0.014, 0.52, 0.008]} />
            <meshStandardMaterial color={card.accent} emissive={card.accent} emissiveIntensity={0.25 + emissive * 0.5} />
          </mesh>
          <mesh position={[0.05, 0.08, 0.014]} rotation={[0, 0, -0.06]}>
            <planeGeometry args={[0.56, 0.3]} />
            <meshStandardMaterial color="#1c2630" roughness={0.7} />
          </mesh>
          <Text position={[0.05, -0.2, 0.018]} fontSize={0.044} color="#cbd5e1" anchorX="center" anchorY="middle">
            {card.label}
          </Text>
        </group>
      ))}
    </group>
  )
}

type FashionZoneProps = { highlighted: boolean }

export default function FashionZone({ highlighted }: FashionZoneProps) {
  const emissive = highlighted ? 0.35 : 0.06

  return (
    <group>
      <mesh position={[0, 0.015, -0.28]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[4.15, 1.48]} />
        <meshStandardMaterial color="#0e2838" emissive="#00c8e8" emissiveIntensity={emissive * 0.3} roughness={0.4} metalness={0.15} />
      </mesh>

      <WardrobeLightbox emissive={emissive} />
      <FootwearPlinth emissive={emissive} />
      <MoodboardPanel emissive={emissive} />
    </group>
  )
}
