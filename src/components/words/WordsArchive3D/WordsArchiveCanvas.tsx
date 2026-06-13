'use client'

import { ContactShadows } from '@react-three/drei'
import { Suspense } from 'react'
import * as THREE from 'three'
import WebGLCanvas from '@/components/landing/CDScene/WebGLCanvas'
import ArchiveCameraRig from './ArchiveCameraRig'
import ArchiveEnvironment from './ArchiveEnvironment'
import type { ArchiveView } from './wordsArchive.types'

type WordsArchiveCanvasProps = {
  activeView: ArchiveView
  hoveredBookId: string | null
  focusedBookId: string | null
  onHover: (bookId: string | null) => void
  onFocus: (bookId: string) => void
}

function SceneFallback() {
  return (
    <>
      <fog attach="fog" args={['#05060a', 8, 26]} />
      <ambientLight intensity={0.3} color="#cdbf9c" />
      <pointLight position={[0, 3, 2]} intensity={1.5} color="#caa45a" distance={14} />
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[40, 40]} />
        <meshStandardMaterial color="#070809" metalness={0.6} roughness={0.4} />
      </mesh>
    </>
  )
}

export default function WordsArchiveCanvas({
  activeView,
  hoveredBookId,
  focusedBookId,
  onHover,
  onFocus,
}: WordsArchiveCanvasProps) {
  return (
    <WebGLCanvas
      camera={{ position: [0, 2.55, 4.6], fov: 54, near: 0.1, far: 44 }}
      gl={{
        antialias: true,
        powerPreference: 'high-performance',
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 0.92,
      }}
      shadows
      dpr={[1, 1.5]}
    >
      <color attach="background" args={['#05060a']} />
      <Suspense fallback={<SceneFallback />}>
        <ArchiveCameraRig activeView={activeView} focusedBookId={focusedBookId} />
        <ArchiveEnvironment
          activeView={activeView}
          hoveredBookId={hoveredBookId}
          focusedBookId={focusedBookId}
          onHover={onHover}
          onFocus={onFocus}
        />
        <ContactShadows position={[0, 0.01, -2.6]} opacity={0.5} scale={20} blur={2.8} far={5} color="#000000" resolution={1024} />
      </Suspense>
    </WebGLCanvas>
  )
}
