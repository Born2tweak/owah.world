'use client'

import { ContactShadows, Environment } from '@react-three/drei'
import { Suspense } from 'react'
import * as THREE from 'three'
import WebGLCanvas from '@/components/landing/CDScene/WebGLCanvas'
import ArchiveCameraRig from './ArchiveCameraRig'
import ArchiveCube from './ArchiveCube'
import type { ArchiveMode, FaceId } from './wordsArchive.types'

type WordsArchiveCanvasProps = {
  mode: ArchiveMode
  zoom: number
  activeFace: FaceId | null
  hoveredFace: FaceId | null
  hoveredWorkId: string | null
  focusedWorkId: string | null
  onFaceHover: (face: FaceId | null) => void
  onFaceClick: (face: FaceId) => void
  onWorkHover: (id: string | null) => void
  onWorkFocus: (id: string) => void
}

function ArchiveLighting() {
  return (
    <>
      <ambientLight intensity={0.7} color="#eef4ff" />
      <hemisphereLight intensity={0.6} color="#ffffff" groundColor="#aebfd0" />
      <directionalLight position={[4, 6, 5]} intensity={1.1} color="#ffffff" castShadow shadow-mapSize-width={2048} shadow-mapSize-height={2048} />
      <pointLight position={[-4, 2, 4]} intensity={0.5} color="#bcd8ff" distance={16} />
      <pointLight position={[0, -3, 3]} intensity={0.35} color="#ffe6c2" distance={12} />
    </>
  )
}

function Fallback() {
  return (
    <>
      <ambientLight intensity={0.8} />
      <mesh>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial color="#dbe6f2" metalness={0.4} roughness={0.4} />
      </mesh>
    </>
  )
}

export default function WordsArchiveCanvas(props: WordsArchiveCanvasProps) {
  const { mode, zoom, ...cube } = props
  return (
    <WebGLCanvas
      camera={{ position: [3.4, 2.2, 4.6], fov: 42, near: 0.1, far: 40 }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.05,
      }}
      shadows
      dpr={[1, 1.5]}
    >
      <Suspense fallback={<Fallback />}>
        <ArchiveLighting />
        <Environment preset="city" />
        <ArchiveCameraRig mode={mode} zoom={zoom} />
        <ArchiveCube mode={mode} {...cube} />
        <ContactShadows position={[0, -1.5, 0]} opacity={0.32} scale={9} blur={2.6} far={4} color="#24405e" resolution={1024} />
      </Suspense>
    </WebGLCanvas>
  )
}
