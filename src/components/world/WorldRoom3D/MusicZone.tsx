'use client'

import { useTexture } from '@react-three/drei'
import { CHROME, CHROME_DARK, MARBLE, WOOD_DARK } from './roomMaterials'
import { ALBUM_CANON } from './worldPersonalData'
import PersonalAlbumFrame from './PersonalAlbumFrame'

/** Positions are local to music hotspot anchor [0, 0, -3.2] in world space. */

function SpeakerTower({ x, emissive }: { x: number; emissive: number }) {
  return (
    <group position={[x, 0, -0.35]}>
      <mesh position={[0, 0.06, 0]} castShadow>
        <boxGeometry args={[0.62, 0.12, 0.5]} />
        <meshPhysicalMaterial color={MARBLE} metalness={0.2} roughness={0.18} clearcoat={0.35} />
      </mesh>
      <mesh position={[0, 0.82, 0]} castShadow>
        <boxGeometry args={[0.52, 1.48, 0.44]} />
        <meshStandardMaterial color={WOOD_DARK} metalness={0.55} roughness={0.38} />
      </mesh>
      <mesh position={[0, 1.52, 0.02]}>
        <boxGeometry args={[0.54, 0.1, 0.46]} />
        <meshStandardMaterial color="#1e242c" metalness={0.65} roughness={0.28} />
      </mesh>
      <mesh position={[0, 0.82, 0.18]}>
        <boxGeometry args={[0.44, 1.32, 0.02]} />
        <meshStandardMaterial color="#0a1018" metalness={0.4} roughness={0.55} />
      </mesh>
      {[0.42, 0.72, 1.02, 1.28].map((y, i) => (
        <group key={y} position={[0, y, 0.19]}>
          <mesh>
            <cylinderGeometry args={[i === 0 ? 0.13 : 0.085, i === 0 ? 0.13 : 0.085, 0.04, 24]} />
            <meshStandardMaterial color="#101820" metalness={0.75} roughness={0.22} />
          </mesh>
          <mesh position={[0, 0, 0.018]}>
            <cylinderGeometry args={[i === 0 ? 0.065 : 0.042, i === 0 ? 0.065 : 0.042, 0.014, 20]} />
            <meshStandardMaterial
              color={i === 1 ? '#3dff9a' : '#1a2830'}
              emissive={i === 1 ? '#3dff9a' : '#000000'}
              emissiveIntensity={i === 1 ? emissive * 1.4 : 0}
            />
          </mesh>
        </group>
      ))}
      <mesh position={[0.24, 0.82, 0.02]}>
        <boxGeometry args={[0.018, 1.28, 0.36]} />
        <meshStandardMaterial color="#3dff9a" emissive="#3dff9a" emissiveIntensity={emissive * 0.4} />
      </mesh>
      <mesh position={[-0.24, 0.82, 0.02]}>
        <boxGeometry args={[0.018, 1.28, 0.36]} />
        <meshStandardMaterial color="#3dff9a" emissive="#3dff9a" emissiveIntensity={emissive * 0.4} />
      </mesh>
    </group>
  )
}

function ListeningLounge({ emissive }: { emissive: number }) {
  return (
    <group position={[-0.72, 0, 0.62]} rotation={[0, 0.22, 0]}>
      <mesh position={[0, 0.22, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.95, 0.44, 0.82]} />
        <meshStandardMaterial color="#1a2838" roughness={0.82} metalness={0.05} emissive="#0a1828" emissiveIntensity={emissive * 0.15} />
      </mesh>
      <mesh position={[-0.38, 0.38, 0.04]} castShadow>
        <boxGeometry args={[0.18, 0.32, 0.72]} />
        <meshStandardMaterial color="#1e3048" roughness={0.78} metalness={0.08} />
      </mesh>
      <mesh position={[0.38, 0.36, -0.02]} rotation={[0, 0, 0.06]} castShadow>
        <boxGeometry args={[0.18, 0.32, 0.72]} />
        <meshStandardMaterial color="#1e3048" roughness={0.78} metalness={0.08} />
      </mesh>
      <mesh position={[0.05, 0.4, -0.1]} rotation={[0.04, 0, 0]} castShadow>
        <boxGeometry args={[0.55, 0.28, 0.12]} />
        <meshStandardMaterial color="#243040" roughness={0.75} />
      </mesh>
      <mesh position={[0.42, 0.28, 0.28]} castShadow>
        <cylinderGeometry args={[0.06, 0.07, 0.04, 16]} />
        <meshStandardMaterial color="#2a3540" metalness={0.3} roughness={0.45} />
      </mesh>
      <mesh position={[0.42, 0.32, 0.28]}>
        <boxGeometry args={[0.1, 0.06, 0.08]} />
        <meshStandardMaterial color="#1a2030" metalness={0.5} roughness={0.35} />
      </mesh>
      {/* Headphones resting on arm — recently used */}
      <group position={[0.34, 0.44, 0.08]} rotation={[0.15, -0.2, 0.35]}>
        <mesh>
          <torusGeometry args={[0.07, 0.01, 8, 20, Math.PI]} />
          <meshStandardMaterial color={CHROME_DARK} metalness={0.9} roughness={0.12} />
        </mesh>
        <mesh position={[-0.06, -0.02, 0]}>
          <boxGeometry args={[0.06, 0.08, 0.07]} />
          <meshStandardMaterial color="#141820" metalness={0.6} roughness={0.35} />
        </mesh>
        <mesh position={[0.06, -0.02, 0]}>
          <boxGeometry args={[0.06, 0.08, 0.07]} />
          <meshStandardMaterial color="#141820" metalness={0.6} roughness={0.35} />
        </mesh>
      </group>
    </group>
  )
}

function VinylCrate({ emissive }: { emissive: number }) {
  const sleeveTex = useTexture('/world/music/Jeffery.jpg')

  return (
    <group position={[1.05, 0, 0.48]} rotation={[0, -0.25, 0]}>
      <mesh position={[0, 0.18, 0]} castShadow>
        <boxGeometry args={[0.52, 0.36, 0.38]} />
        <meshStandardMaterial color={WOOD_DARK} metalness={0.4} roughness={0.45} />
      </mesh>
      <mesh position={[0, 0.02, 0.14]}>
        <boxGeometry args={[0.48, 0.02, 0.08]} />
        <meshStandardMaterial color="#3dff9a" emissive="#3dff9a" emissiveIntensity={0.1 + emissive * 0.3} />
      </mesh>
      {[0.08, 0.02, -0.06].map((z, i) => (
        <mesh key={z} position={[0, 0.28 + i * 0.02, z]} rotation={[0, 0.1 * i, 0]}>
          <boxGeometry args={[0.34, 0.008, 0.32]} />
          <meshStandardMaterial color="#0a1018" metalness={0.85} roughness={0.15} />
        </mesh>
      ))}
      <mesh position={[0.22, 0.42, 0.12]} rotation={[0.15, -0.35, 0.08]}>
        <boxGeometry args={[0.28, 0.28, 0.012]} />
        <meshStandardMaterial map={sleeveTex} roughness={0.5} emissive="#001018" emissiveIntensity={emissive * 0.15} />
      </mesh>
      <mesh position={[0.28, 0.38, 0.14]} rotation={[0.2, -0.4, 0.1]}>
        <boxGeometry args={[0.26, 0.26, 0.008]} />
        <meshStandardMaterial color="#e8e4d8" roughness={0.88} />
      </mesh>
    </group>
  )
}

function MarathonPlaque({ emissive }: { emissive: number }) {
  return (
    <group position={[1.2, 0.42, 0.15]}>
      <mesh position={[0, 0.04, 0]} castShadow>
        <boxGeometry args={[0.42, 0.08, 0.28]} />
        <meshPhysicalMaterial color={MARBLE} metalness={0.2} roughness={0.2} clearcoat={0.3} />
      </mesh>
      <mesh position={[0, 0.1, 0.02]}>
        <boxGeometry args={[0.36, 0.14, 0.02]} />
        <meshStandardMaterial color="#b8860b" metalness={0.85} roughness={0.25} emissive="#8b6914" emissiveIntensity={emissive * 0.35} />
      </mesh>
    </group>
  )
}

function AlbumArchiveWall({ emissive }: { emissive: number }) {
  const cols = 6
  const colGap = 0.36
  const startX = -((cols - 1) * colGap) / 2
  const rowY = [1.55, 1.15]

  return (
    <group>
      <mesh position={[0, 1.35, -1.18]}>
        <boxGeometry args={[2.65, 0.85, 0.05]} />
        <meshStandardMaterial color="#0a1820" metalness={0.35} roughness={0.4} />
      </mesh>
      {ALBUM_CANON.map((album, i) => {
        const row = Math.floor(i / cols)
        const col = i % cols
        if (row >= rowY.length) return null
        const jitterX = (i % 3) * 0.008 - 0.008
        const jitterY = row === 0 && col === 2 ? 0.02 : 0
        const pullZ = album.id === 'jeffery' ? 0.04 : 0
        return (
          <group key={album.id} position={[startX + col * colGap + jitterX, rowY[row] + jitterY, -1.14 + pullZ]}>
            <PersonalAlbumFrame cover={album.cover} position={[0, 0, 0]} size={0.28} emissive={emissive} />
          </group>
        )
      })}
    </group>
  )
}

function TurntableStation({ emissive }: { emissive: number }) {
  const vinylTex = useTexture('/world/music/TheMarathon.jpg')

  return (
    <group position={[0.42, 0, 0.22]} rotation={[0, -0.08, 0]}>
      <mesh position={[0, 0.38, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.15, 0.09, 0.68]} />
        <meshPhysicalMaterial color={MARBLE} metalness={0.15} roughness={0.22} clearcoat={0.3} />
      </mesh>
      <mesh position={[0, 0.445, 0.02]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 0.028, 36]} />
        <meshStandardMaterial color="#080c10" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[0, 0.448, 0.02]} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.11, 0.28, 36]} />
        <meshStandardMaterial map={vinylTex} roughness={0.4} metalness={0.15} />
      </mesh>
      <mesh position={[0.22, 0.46, 0.1]} rotation={[0, 0, -0.28]}>
        <boxGeometry args={[0.32, 0.02, 0.025]} />
        <meshStandardMaterial color={CHROME} metalness={0.95} roughness={0.08} />
      </mesh>
      <mesh position={[0.36, 0.455, 0.16]}>
        <boxGeometry args={[0.07, 0.045, 0.045]} />
        <meshStandardMaterial color="#1a2030" metalness={0.6} roughness={0.3} />
      </mesh>
      <mesh position={[-0.18, 0.5, 0.08]} rotation={[0.2, 0.4, 0]}>
        <boxGeometry args={[0.18, 0.12, 0.015]} />
        <meshStandardMaterial color="#e8e4d8" roughness={0.9} emissive="#3dff9a" emissiveIntensity={emissive * 0.08} />
      </mesh>
      <mesh position={[-0.12, 0.52, 0.1]}>
        <boxGeometry args={[0.08, 0.02, 0.01]} />
        <meshStandardMaterial color="#1a2030" roughness={0.5} />
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
        <planeGeometry args={[3.2, 1.15]} />
        <meshStandardMaterial color="#0a2018" emissive="#3dff9a" emissiveIntensity={emissive * 0.18} />
      </mesh>

      <group position={[-1.28, 0, 0.04]}>
        <SpeakerTower x={0} emissive={emissive} />
      </group>
      <group position={[1.18, 0, -0.06]} rotation={[0, -0.05, 0]}>
        <SpeakerTower x={0} emissive={emissive} />
      </group>

      <ListeningLounge emissive={emissive} />
      <TurntableStation emissive={emissive} />
      <AlbumArchiveWall emissive={emissive} />
      <VinylCrate emissive={emissive} />
      <MarathonPlaque emissive={emissive} />

      <mesh position={[0.12, 0.06, 0.42]} rotation={[0, 0.06, 0]}>
        <boxGeometry args={[2.35, 0.03, 0.06]} />
        <meshStandardMaterial color="#3dff9a" emissive="#3dff9a" emissiveIntensity={0.15 + emissive * 0.65} />
      </mesh>

      <mesh position={[0.42, 0.43, 0.26]}>
        <boxGeometry args={[0.5, 0.008, 0.04]} />
        <meshStandardMaterial
          color="#3dff9a"
          emissive="#3dff9a"
          emissiveIntensity={0.25 + emissive * 0.5}
          transparent
          opacity={0.85}
        />
      </mesh>
    </group>
  )
}
