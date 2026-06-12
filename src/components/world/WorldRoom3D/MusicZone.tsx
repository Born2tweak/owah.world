'use client'

import { Text, useTexture } from '@react-three/drei'
import { CHROME, CHROME_DARK, FABRIC_DARK, MARBLE, WOOD_DARK } from './roomMaterials'
import { ALBUM_CANON } from './worldPersonalData'
import PersonalAlbumFrame from './PersonalAlbumFrame'
import { useSpotify } from './useSpotify'

/** Positions are local to music hotspot anchor [0, 0, -3.2] in world space. */

function normalizeLabel(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '')
}

function SpeakerTower({ x, emissive }: { x: number; emissive: number }) {
  return (
    <group position={[x, 0, -0.35]} scale={1.12}>
      <mesh position={[0, 0.06, 0]} castShadow>
        <boxGeometry args={[0.72, 0.12, 0.58]} />
        <meshPhysicalMaterial color={MARBLE} metalness={0.2} roughness={0.18} clearcoat={0.35} />
      </mesh>
      <mesh position={[0, 0.92, 0]} castShadow>
        <boxGeometry args={[0.62, 1.72, 0.52]} />
        <meshStandardMaterial color={WOOD_DARK} metalness={0.48} roughness={0.34} />
      </mesh>
      <mesh position={[0, 1.72, 0.02]}>
        <boxGeometry args={[0.64, 0.12, 0.54]} />
        <meshStandardMaterial color="#1e242c" metalness={0.65} roughness={0.28} />
      </mesh>
      <mesh position={[0, 0.92, 0.22]}>
        <boxGeometry args={[0.52, 1.52, 0.02]} />
        <meshStandardMaterial color="#0a1018" metalness={0.42} roughness={0.48} />
      </mesh>
      {[0.48, 0.84, 1.2, 1.5].map((y, i) => (
        <group key={y} position={[0, y, 0.23]}>
          <mesh>
            <cylinderGeometry args={[i === 0 ? 0.15 : 0.1, i === 0 ? 0.15 : 0.1, 0.05, 24]} />
            <meshStandardMaterial color="#101820" metalness={0.75} roughness={0.22} />
          </mesh>
          <mesh position={[0, 0, 0.022]}>
            <cylinderGeometry args={[i === 0 ? 0.072 : 0.05, i === 0 ? 0.072 : 0.05, 0.016, 20]} />
            <meshStandardMaterial
              color={i === 1 ? '#3dff9a' : '#1a2830'}
              emissive={i === 1 ? '#3dff9a' : '#000000'}
              emissiveIntensity={i === 1 ? emissive * 1.3 : 0}
            />
          </mesh>
        </group>
      ))}
      <mesh position={[0.29, 0.92, 0.03]}>
        <boxGeometry args={[0.022, 1.46, 0.42]} />
        <meshStandardMaterial color="#3dff9a" emissive="#3dff9a" emissiveIntensity={emissive * 0.38} />
      </mesh>
      <mesh position={[-0.29, 0.92, 0.03]}>
        <boxGeometry args={[0.022, 1.46, 0.42]} />
        <meshStandardMaterial color="#3dff9a" emissive="#3dff9a" emissiveIntensity={emissive * 0.38} />
      </mesh>
    </group>
  )
}

function ListeningLounge({ emissive }: { emissive: number }) {
  return (
    <group position={[-1.02, 0, 0.78]} rotation={[0, 0.24, 0]} scale={1.16}>
      <mesh position={[0, 0.24, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.04, 0.48, 0.9]} />
        <meshStandardMaterial color={FABRIC_DARK} roughness={0.8} metalness={0.05} emissive="#0a1828" emissiveIntensity={emissive * 0.14} />
      </mesh>
      <mesh position={[-0.42, 0.42, 0.05]} castShadow>
        <boxGeometry args={[0.2, 0.36, 0.78]} />
        <meshStandardMaterial color="#1e3048" roughness={0.76} metalness={0.08} />
      </mesh>
      <mesh position={[0.42, 0.4, -0.02]} rotation={[0, 0, 0.06]} castShadow>
        <boxGeometry args={[0.2, 0.34, 0.78]} />
        <meshStandardMaterial color="#1e3048" roughness={0.76} metalness={0.08} />
      </mesh>
      <mesh position={[0.05, 0.46, -0.12]} rotation={[0.04, 0, 0]} castShadow>
        <boxGeometry args={[0.62, 0.3, 0.14]} />
        <meshStandardMaterial color="#243040" roughness={0.72} />
      </mesh>
      <mesh position={[0.46, 0.3, 0.28]} castShadow>
        <cylinderGeometry args={[0.08, 0.09, 0.05, 16]} />
        <meshStandardMaterial color="#2a3540" metalness={0.3} roughness={0.45} />
      </mesh>
      <mesh position={[0.46, 0.35, 0.28]}>
        <boxGeometry args={[0.14, 0.08, 0.1]} />
        <meshStandardMaterial color="#1a2030" metalness={0.5} roughness={0.35} />
      </mesh>
      <group position={[0.36, 0.5, 0.08]} rotation={[0.15, -0.2, 0.35]}>
        <mesh>
          <torusGeometry args={[0.08, 0.012, 8, 20, Math.PI]} />
          <meshStandardMaterial color={CHROME_DARK} metalness={0.9} roughness={0.12} />
        </mesh>
        <mesh position={[-0.07, -0.02, 0]}>
          <boxGeometry args={[0.07, 0.1, 0.08]} />
          <meshStandardMaterial color="#141820" metalness={0.6} roughness={0.35} />
        </mesh>
        <mesh position={[0.07, -0.02, 0]}>
          <boxGeometry args={[0.07, 0.1, 0.08]} />
          <meshStandardMaterial color="#141820" metalness={0.6} roughness={0.35} />
        </mesh>
      </group>
    </group>
  )
}

function AlbumArchiveWall({ activeAlbumId, emissive }: { activeAlbumId: string | null; emissive: number }) {
  const cols = 4
  const colGap = 0.46
  const startX = -((cols - 1) * colGap) / 2
  const rowY = [1.84, 1.34, 0.84]

  return (
    <group>
      <mesh position={[0, 1.38, -1.22]} castShadow receiveShadow>
        <boxGeometry args={[2.48, 1.9, 0.08]} />
        <meshStandardMaterial color="#0a1820" metalness={0.34} roughness={0.36} />
      </mesh>
      <mesh position={[0, 2.38, -1.18]}>
        <boxGeometry args={[2.12, 0.04, 0.08]} />
        <meshStandardMaterial color={CHROME} metalness={0.88} roughness={0.08} />
      </mesh>
      {ALBUM_CANON.map((album, i) => {
        const row = Math.floor(i / cols)
        const col = i % cols
        if (row >= rowY.length) return null
        const jitterX = col % 2 === 0 ? 0.012 : -0.01
        const jitterY = row === 0 && col === 1 ? 0.02 : row === 2 && col === 2 ? -0.015 : 0
        const pullZ = album.id === 'jeffery' || album.id === 'marathon' ? 0.05 : 0.02
        const isActive = album.id === activeAlbumId
        return (
          <group key={album.id} position={[startX + col * colGap + jitterX, rowY[row] + jitterY, -1.12 + pullZ]}>
            {isActive ? (
              <mesh position={[0, 0, -0.015]}>
                <boxGeometry args={[0.42, 0.42, 0.014]} />
                <meshStandardMaterial color="#09191b" emissive="#3dff9a" emissiveIntensity={0.55 + emissive * 1.8} metalness={0.2} roughness={0.2} />
              </mesh>
            ) : null}
            <PersonalAlbumFrame cover={album.cover} position={[0, 0, 0]} size={0.34} emissive={emissive} />
          </group>
        )
      })}
    </group>
  )
}

function TurntableStation({ emissive }: { emissive: number }) {
  const vinylTex = useTexture('/world/music/TheMarathon.jpg')

  return (
    <group position={[0.54, 0, 0.38]} rotation={[0, -0.08, 0]} scale={1.1}>
      <mesh position={[0, 0.42, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.28, 0.1, 0.78]} />
        <meshPhysicalMaterial color={MARBLE} metalness={0.15} roughness={0.22} clearcoat={0.3} />
      </mesh>
      <mesh position={[0, 0.49, 0.02]}>
        <cylinderGeometry args={[0.34, 0.34, 0.03, 36]} />
        <meshStandardMaterial color="#080c10" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[0, 0.508, 0.02]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.12, 0.31, 36]} />
        <meshStandardMaterial map={vinylTex} roughness={0.4} metalness={0.15} />
      </mesh>
      <mesh position={[0.26, 0.5, 0.12]} rotation={[0, 0, -0.28]}>
        <boxGeometry args={[0.36, 0.02, 0.025]} />
        <meshStandardMaterial color={CHROME} metalness={0.95} roughness={0.08} />
      </mesh>
      <mesh position={[0.4, 0.495, 0.18]}>
        <boxGeometry args={[0.08, 0.05, 0.05]} />
        <meshStandardMaterial color="#1a2030" metalness={0.6} roughness={0.3} />
      </mesh>
      <mesh position={[-0.22, 0.54, 0.12]} rotation={[0.2, 0.4, 0]}>
        <boxGeometry args={[0.2, 0.14, 0.016]} />
        <meshStandardMaterial color="#e8e4d8" roughness={0.9} emissive="#3dff9a" emissiveIntensity={emissive * 0.08} />
      </mesh>
      <mesh position={[-0.14, 0.56, 0.14]}>
        <boxGeometry args={[0.1, 0.02, 0.012]} />
        <meshStandardMaterial color="#1a2030" roughness={0.5} />
      </mesh>
    </group>
  )
}

function SpotifySignalPedestal({
  configured,
  emissive,
  recentTracks,
  source,
  topTracks,
  track,
}: {
  configured: boolean
  emissive: number
  recentTracks: string[]
  source: 'fallback' | 'spotify'
  topTracks: string[]
  track: { artist: string; title: string }
}) {
  const accent = source === 'spotify' ? '#3dff9a' : '#6cc7ff'
  const signalBars = source === 'spotify' ? [0.32, 0.5, 0.78, 0.58] : [0.24, 0.38, 0.46, 0.34]

  return (
    <group position={[0.28, 0.18, 0.95]} rotation={[0, -0.36, 0]}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1.2, 0.96, 0.08]} />
        <meshPhysicalMaterial color="#08131a" metalness={0.22} roughness={0.18} transmission={0.16} transparent opacity={0.9} />
      </mesh>
      <mesh position={[0, 0, 0.03]}>
        <boxGeometry args={[1.08, 0.84, 0.012]} />
        <meshStandardMaterial color="#0d1820" emissive={accent} emissiveIntensity={0.08 + emissive * 0.2} />
      </mesh>
      {signalBars.map((height, index) => (
        <mesh key={height} position={[-0.42 + index * 0.11, -0.18 + height / 2, 0.042]}>
          <boxGeometry args={[0.05, height, 0.015]} />
          <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.32 + emissive * (0.5 + index * 0.08)} />
        </mesh>
      ))}
      <Text position={[-0.02, 0.29, 0.05]} fontSize={0.065} anchorX="center" anchorY="middle" color="#d8f8ff" maxWidth={0.72}>
        {source === 'spotify' ? 'LIVE ROTATION' : 'CURATED ROTATION'}
      </Text>
      <Text position={[-0.02, 0.14, 0.05]} fontSize={0.058} anchorX="center" anchorY="middle" color="#ffffff" maxWidth={0.88}>
        {track.title}
      </Text>
      <Text position={[-0.02, 0.03, 0.05]} fontSize={0.044} anchorX="center" anchorY="middle" color="#9fc2d1" maxWidth={0.9}>
        {track.artist}
      </Text>
      <Text position={[0.14, -0.11, 0.05]} fontSize={0.034} anchorX="right" anchorY="middle" color="#9fd4df" maxWidth={0.86}>
        {recentTracks.slice(0, 2).join('  /  ')}
      </Text>
      <Text position={[0.14, -0.22, 0.05]} fontSize={0.03} anchorX="right" anchorY="middle" color="#7f9aaa" maxWidth={0.86}>
        {topTracks.slice(0, 2).join('  /  ')}
      </Text>
      <mesh position={[0.5, 0.33, 0.045]}>
        <boxGeometry args={[0.08, 0.08, 0.016]} />
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={configured ? 0.8 : 0.28} />
      </mesh>
    </group>
  )
}

type MusicZoneProps = { highlighted: boolean }

export default function MusicZone({ highlighted }: MusicZoneProps) {
  const spotify = useSpotify()
  const emissive = highlighted ? 0.45 : 0.1
  const activeAlbumId =
    ALBUM_CANON.find((album) => normalizeLabel(album.title) === normalizeLabel(spotify.nowPlaying?.album ?? ''))?.id ??
    ALBUM_CANON.find((album) => normalizeLabel(album.title) === normalizeLabel(spotify.nowPlaying?.title ?? ''))?.id ??
    null
  const liveTrack = spotify.nowPlaying ?? spotify.recentTracks[0] ?? spotify.topTracks[0] ?? null

  return (
    <group>
      <mesh position={[0, 0.02, 0.1]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[3.45, 1.45]} />
        <meshStandardMaterial color="#0a2018" emissive="#3dff9a" emissiveIntensity={emissive * 0.2} />
      </mesh>

      <mesh position={[0, 1.48, -1.38]} castShadow receiveShadow>
        <boxGeometry args={[2.76, 2.16, 0.06]} />
        <meshStandardMaterial color="#0b1418" metalness={0.4} roughness={0.35} />
      </mesh>

      <group position={[-1.48, 0, 0.04]}>
        <SpeakerTower x={0} emissive={emissive} />
      </group>
      <group position={[1.44, 0, 0]} rotation={[0, -0.05, 0]}>
        <SpeakerTower x={0} emissive={emissive} />
      </group>

      <ListeningLounge emissive={emissive} />
      <TurntableStation emissive={emissive} />
      <AlbumArchiveWall activeAlbumId={activeAlbumId} emissive={emissive} />

      {liveTrack ? (
        <SpotifySignalPedestal
          configured={spotify.configured}
          emissive={emissive}
          recentTracks={spotify.recentTracks.map((track) => track.title)}
          source={spotify.source}
          topTracks={spotify.topTracks.map((track) => track.title)}
          track={{ artist: liveTrack.artist, title: liveTrack.title }}
        />
      ) : null}

      <mesh position={[0.1, 0.06, 0.56]} rotation={[0, 0.06, 0]}>
        <boxGeometry args={[2.65, 0.03, 0.06]} />
        <meshStandardMaterial color="#3dff9a" emissive="#3dff9a" emissiveIntensity={0.16 + emissive * 0.65} />
      </mesh>
    </group>
  )
}
