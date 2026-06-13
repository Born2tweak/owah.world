'use client'

import { MeshReflectorMaterial, Text } from '@react-three/drei'
import ArchiveWing from './ArchiveWing'
import type { ArchiveView } from './wordsArchive.types'
import { WINGS } from './wordsArchiveData'

const BRASS = '#caa45a'

export function ArchiveLighting() {
  return (
    <>
      <fog attach="fog" args={['#05060a', 9, 30]} />
      <ambientLight intensity={0.16} color="#cdbf9c" />
      <hemisphereLight intensity={0.18} color="#d8c79a" groundColor="#05060a" />
      <directionalLight position={[2, 8, 6]} intensity={0.7} color="#f4ead2" castShadow shadow-mapSize-width={2048} shadow-mapSize-height={2048} shadow-camera-far={28} />
      <spotLight position={[0, 6.2, 1]} angle={0.7} penumbra={0.9} intensity={1.4} color="#e8d6a8" castShadow />
      <pointLight position={[0, 3.2, -3]} intensity={1.2} color={BRASS} distance={12} decay={2} />
      <pointLight position={[0, 1.4, 3.5]} intensity={0.5} color="#3df0ff" distance={9} decay={2} />
    </>
  )
}

function CentralPedestal() {
  return (
    <group position={[0, 0, -2.6]}>
      <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.92, 1.08, 1.0, 48]} />
        <meshStandardMaterial color="#0a0b0f" metalness={0.72} roughness={0.26} />
      </mesh>
      <mesh position={[0, 1.01, 0]}>
        <cylinderGeometry args={[0.86, 0.86, 0.03, 48]} />
        <meshStandardMaterial color={BRASS} emissive={BRASS} emissiveIntensity={0.45} metalness={0.9} roughness={0.2} />
      </mesh>
      <mesh position={[0, 0.52, 0.93]} rotation={[0, 0, 0]}>
        <boxGeometry args={[1.2, 0.46, 0.02]} />
        <meshStandardMaterial color="#0c0d11" metalness={0.6} roughness={0.4} />
      </mesh>
      <Text position={[0, 0.6, 0.945]} fontSize={0.058} color="#d8c79a" maxWidth={1.1} textAlign="center" anchorX="center" anchorY="middle" lineHeight={1.3}>
        EVERY BOOK IS A CONVERSATION ACROSS TIME
      </Text>
      <Text position={[0, 0.46, 0.945]} fontSize={0.04} color="#7d7457" anchorX="center" anchorY="middle" letterSpacing={0.18}>
        EVERY IDEA, A SEED
      </Text>
      <pointLight position={[0, 1.6, 0.6]} intensity={0.9} color={BRASS} distance={3.4} decay={2} />
    </group>
  )
}

type ArchiveEnvironmentProps = {
  activeView: ArchiveView
  hoveredBookId: string | null
  focusedBookId: string | null
  onHover: (bookId: string | null) => void
  onFocus: (bookId: string) => void
}

export default function ArchiveEnvironment({
  activeView,
  hoveredBookId,
  focusedBookId,
  onHover,
  onFocus,
}: ArchiveEnvironmentProps) {
  return (
    <>
      <ArchiveLighting />

      {/* black marble floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[40, 40]} />
        <MeshReflectorMaterial
          color="#070809"
          resolution={512}
          mirror={0.4}
          mixBlur={1.6}
          mixStrength={3.6}
          roughness={0.36}
          metalness={0.66}
          blur={[256, 80]}
          depthScale={0.5}
          minDepthThreshold={0.5}
          maxDepthThreshold={1.3}
        />
      </mesh>
      <mesh position={[0, 0.004, -2.6]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.0, 6.7, 64]} />
        <meshStandardMaterial color="#0b0c10" metalness={0.6} roughness={0.34} transparent opacity={0.5} />
      </mesh>

      {/* domed ceiling cap so the chamber feels enclosed */}
      <mesh position={[0, 6.4, -2.2]} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[3, 9, 48]} />
        <meshStandardMaterial color="#06070b" metalness={0.4} roughness={0.6} side={2} />
      </mesh>

      <CentralPedestal />

      {WINGS.map((wing) => (
        <ArchiveWing
          key={wing.id}
          wing={wing}
          active={activeView === wing.id}
          hoveredBookId={hoveredBookId}
          focusedBookId={focusedBookId}
          onHover={onHover}
          onFocus={onFocus}
        />
      ))}
    </>
  )
}
