'use client'

import { Text, useTexture } from '@react-three/drei'
import type * as THREE from 'three'
import {
  CHROME,
  CHROME_DARK,
  FABRIC_DARK,
  FABRIC_SILK,
  GLASS,
  MARBLE,
} from './roomMaterials'
import { type PinterestFitPin, usePinterestFits } from './usePinterest'

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

function FitArchiveCard({
  accent,
  emissive,
  pin,
  texture,
  x,
  y,
}: {
  accent: string
  emissive: number
  pin: PinterestFitPin
  texture: THREE.Texture
  x: number
  y: number
}) {
  const height = 0.72
  const width = Math.min(Math.max(height * pin.aspect, 0.36), 0.6)

  return (
    <group position={[x, y, 0.062]} rotation={[0, 0, x > 0 ? 0.022 : -0.018]}>
      <mesh castShadow>
        <boxGeometry args={[width + 0.08, height + 0.2, 0.028]} />
        <meshStandardMaterial color="#111820" roughness={0.5} metalness={0.2} />
      </mesh>
      <mesh position={[0, 0.05, 0.018]}>
        <planeGeometry args={[width, height]} />
        <meshStandardMaterial map={texture} roughness={0.35} metalness={0.05} emissive="#001018" emissiveIntensity={emissive * 0.2} />
      </mesh>
      <mesh position={[0, 0.05, 0.022]}>
        <planeGeometry args={[width + 0.012, height + 0.012]} />
        <meshPhysicalMaterial color={GLASS} transmission={0.6} transparent opacity={0.12} roughness={0.02} metalness={0.06} />
      </mesh>
      <mesh position={[0, 0.41, 0.02]}>
        <boxGeometry args={[0.09, 0.032, 0.026]} />
        <meshStandardMaterial color={CHROME} metalness={0.95} roughness={0.08} />
      </mesh>
      <mesh position={[-width / 2 + 0.12, -0.39, 0.022]}>
        <boxGeometry args={[0.24, 0.018, 0.01]} />
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.22 + emissive * 0.5} />
      </mesh>
      <Text position={[-width / 2, -0.45, 0.026]} fontSize={0.034} color="#d9edf5" anchorX="left" anchorY="middle" maxWidth={width + 0.04} letterSpacing={0.06}>
        {pin.title.toUpperCase()}
      </Text>
    </group>
  )
}

/** Full-height Fits installation on the left room wall - the board carries real visual weight. */
function MoodboardPanel({ emissive, pins, source }: { emissive: number; pins: PinterestFitPin[]; source: 'fallback' | 'pinterest' }) {
  const selectedPins = pins.slice(0, 4)
  const textures = useTexture(selectedPins.map((pin) => pin.image))
  const accent = source === 'pinterest' ? '#e60023' : '#00c8e8'

  return (
    <group position={[-1.7, 1.52, 0.5]} rotation={[0, Math.PI / 2, 0]}>
      <mesh castShadow>
        <boxGeometry args={[1.94, 2.92, 0.07]} />
        <meshStandardMaterial color="#0a1018" metalness={0.45} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0, 0.038]}>
        <planeGeometry args={[1.82, 2.78]} />
        <meshStandardMaterial color="#10202c" emissive="#1a4458" emissiveIntensity={0.18 + emissive * 0.4} roughness={0.4} />
      </mesh>
      <mesh position={[0, 1.46, 0.02]}>
        <boxGeometry args={[1.86, 0.03, 0.06]} />
        <meshStandardMaterial color="#d3f4ff" emissive="#b4ecff" emissiveIntensity={0.3 + emissive * 0.5} />
      </mesh>
      <Text position={[-0.82, 1.24, 0.068]} fontSize={0.072} color="#cfeefb" anchorX="left" anchorY="middle" letterSpacing={0.12}>
        FITS / ARCHIVE
      </Text>
      <Text position={[0.82, 1.24, 0.068]} fontSize={0.032} color={source === 'pinterest' ? '#ffd6dd' : '#8ea6b4'} anchorX="right" anchorY="middle" letterSpacing={0.1}>
        {source === 'pinterest' ? 'PINTEREST · LIVE' : 'PINTEREST · SYNC'}
      </Text>
      <mesh position={[-0.82, 1.1, 0.066]}>
        <boxGeometry args={[0.34, 0.016, 0.01]} />
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.35 + emissive * 0.7} />
      </mesh>
      {selectedPins.map((pin, index) => (
        <FitArchiveCard
          key={pin.id}
          accent={index === 0 ? accent : pin.dominantColor}
          emissive={emissive}
          pin={pin}
          texture={Array.isArray(textures) ? textures[index] : textures}
          x={index % 2 === 0 ? -0.45 : 0.46}
          y={index < 2 ? 0.5 : -0.52}
        />
      ))}
      <Text position={[0, -1.28, 0.066]} fontSize={0.03} color="#7e99a8" anchorX="center" anchorY="middle" letterSpacing={0.22}>
        CURATED FROM THE FITS BOARD
      </Text>
    </group>
  )
}

type FashionZoneProps = { highlighted: boolean }

export default function FashionZone({ highlighted }: FashionZoneProps) {
  const fitsBoard = usePinterestFits()
  const emissive = highlighted ? 0.35 : 0.06

  return (
    <group>
      <mesh position={[0, 0.015, -0.28]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[4.15, 1.48]} />
        <meshStandardMaterial color="#0e2838" emissive="#00c8e8" emissiveIntensity={emissive * 0.3} roughness={0.4} metalness={0.15} />
      </mesh>

      <WardrobeLightbox emissive={emissive} />
      <FootwearPlinth emissive={emissive} />
      <MoodboardPanel emissive={emissive} pins={fitsBoard.pins} source={fitsBoard.source} />
    </group>
  )
}
