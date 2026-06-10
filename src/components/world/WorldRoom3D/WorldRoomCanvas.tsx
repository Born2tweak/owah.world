'use client'

import { ContactShadows } from '@react-three/drei'
import { Suspense } from 'react'
import * as THREE from 'three'
import WebGLCanvas from '@/components/landing/CDScene/WebGLCanvas'
import RoomCameraRig from './RoomCameraRig'
import RoomEnvironment from './RoomEnvironment'
import type { RoomZone } from './roomZones'
import type { WorldCategory } from '../world.types'

type WorldRoomCanvasProps = {
  activeZone: RoomZone
  hoveredZone: WorldCategory | null
  onHover: (zone: WorldCategory | null) => void
  onFocus: (zone: WorldCategory) => void
}

function SceneFallback() {
  return (
    <>
      <fog attach="fog" args={['#030810', 8, 28]} />
      <ambientLight intensity={0.35} color="#b8e0f5" />
      <pointLight position={[0, 3, 2]} intensity={2} color="#00d4ff" distance={14} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[18, 14]} />
        <meshStandardMaterial color="#dce8ef" metalness={0.6} roughness={0.25} />
      </mesh>
    </>
  )
}

export default function WorldRoomCanvas({
  activeZone,
  hoveredZone,
  onHover,
  onFocus,
}: WorldRoomCanvasProps) {
  return (
    <WebGLCanvas
      camera={{ position: [2.5, 2.55, 5.8], fov: 50, near: 0.1, far: 40 }}
      gl={{
        antialias: true,
        powerPreference: 'high-performance',
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 0.82,
      }}
      shadows
      dpr={[1, 1.5]}
    >
      <color attach="background" args={['#030810']} />
      <Suspense fallback={<SceneFallback />}>
        <RoomCameraRig activeZone={activeZone} />
        <RoomEnvironment
          activeZone={activeZone}
          hoveredZone={hoveredZone}
          onHover={onHover}
          onFocus={onFocus}
        />
        <ContactShadows
          position={[0, 0.008, -2.8]}
          opacity={0.42}
          scale={14}
          blur={2.2}
          far={3.8}
          color="#001820"
          resolution={512}
        />
      </Suspense>
    </WebGLCanvas>
  )
}
