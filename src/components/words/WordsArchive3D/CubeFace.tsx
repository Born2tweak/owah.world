'use client'

import { Text } from '@react-three/drei'
import type { ThreeEvent } from '@react-three/fiber'
import * as THREE from 'three'
import WorkTile from './WorkTile'
import type { ArchiveWork, Face } from './wordsArchive.types'
import { CUBE_SIZE, FACE_OFFSET, TILE_SLOTS } from './wordsArchiveData'

type CubeFaceProps = {
  face: Face
  works: ArchiveWork[]
  /** Orientation that places this face onto the cube's +Z plane, then rotates it outward. */
  yaw: number
  active: boolean
  faceHovered: boolean
  dim: boolean
  hoveredWorkId: string | null
  focusedWorkId: string | null
  relatedIds: Set<string>
  onFaceHover: (face: Face['id'] | null) => void
  onFaceClick: (face: Face['id']) => void
  onWorkHover: (id: string | null) => void
  onWorkFocus: (id: string) => void
}

export default function CubeFace({
  face,
  works,
  yaw,
  active,
  faceHovered,
  dim,
  hoveredWorkId,
  focusedWorkId,
  relatedIds,
  onFaceHover,
  onFaceClick,
  onWorkHover,
  onWorkFocus,
}: CubeFaceProps) {
  // Position the face group on its outward plane: rotate around Y by -yaw, push out by FACE_OFFSET.
  const groupRotation = new THREE.Euler(0, -yaw, 0)

  const lit = active || faceHovered
  const panelEmissive = active ? 0.5 : faceHovered ? 0.34 : dim ? 0.05 : 0.16

  return (
    <group rotation={groupRotation}>
      <group position={[0, 0, FACE_OFFSET]}>
        {/* face panel */}
        <mesh
          onPointerOver={(e: ThreeEvent<PointerEvent>) => {
            e.stopPropagation()
            onFaceHover(face.id)
          }}
          onPointerOut={(e: ThreeEvent<PointerEvent>) => {
            e.stopPropagation()
            onFaceHover(null)
          }}
          onClick={(e: ThreeEvent<MouseEvent>) => {
            e.stopPropagation()
            onFaceClick(face.id)
          }}
        >
          <boxGeometry args={[CUBE_SIZE, CUBE_SIZE, 0.06]} />
          <meshPhysicalMaterial
            color={face.accent}
            emissive={face.accent}
            emissiveIntensity={panelEmissive}
            transmission={0.55}
            transparent
            opacity={0.5}
            roughness={0.12}
            metalness={0.15}
            clearcoat={0.6}
          />
        </mesh>

        {/* centre label */}
        <Text position={[0, 0.16, 0.06]} fontSize={0.17} color="#ffffff" anchorX="center" anchorY="middle" letterSpacing={0.04} maxWidth={1.7} textAlign="center">
          {face.label.toUpperCase()}
        </Text>
        <Text position={[0, -0.12, 0.06]} fontSize={0.072} color="#f4f7fb" anchorX="center" anchorY="middle" maxWidth={1.5} textAlign="center" fillOpacity={lit ? 0.95 : 0.6}>
          {face.thesis}
        </Text>

        {/* work tiles */}
        {works.map((work, i) => (
          <WorkTile
            key={work.id}
            work={work}
            slot={TILE_SLOTS[i] ?? [0, 0]}
            accent={face.accent}
            hovered={hoveredWorkId === work.id}
            focused={focusedWorkId === work.id}
            related={relatedIds.has(work.id)}
            faceActive={active}
            onHover={onWorkHover}
            onFocus={onWorkFocus}
          />
        ))}
      </group>
    </group>
  )
}
