'use client'

import type { ThreeEvent } from '@react-three/fiber'
import WorkTile from './WorkTile'
import type { ArchiveWork, Face } from './wordsArchive.types'
import { CUBE_SIZE, faceTransform, gridSlot } from './wordsArchiveData'

type CubeFaceProps = {
  face: Face
  works: ArchiveWork[]
  active: boolean
  dim: boolean
  interactive: boolean
  hoveredWorkId: string | null
  focusedWorkId: string | null
  relatedIds: Set<string>
  onWorkHover: (id: string | null) => void
  onWorkActivate: (id: string) => void
  onFaceClick: (face: Face['id']) => void
}

/** One cube side — a 3x3 image mosaic, no text. */
export default function CubeFace({
  face,
  works,
  active,
  dim,
  interactive,
  hoveredWorkId,
  focusedWorkId,
  relatedIds,
  onWorkHover,
  onWorkActivate,
  onFaceClick,
}: CubeFaceProps) {
  const t = faceTransform(face.side)
  const opacity = dim ? 0.32 : 1

  return (
    <group position={t.position} rotation={t.rotation}>
      {/* backing panel (accent-tinted glass) */}
      <mesh
        position={[0, 0, -0.04]}
        onPointerOver={(e: ThreeEvent<PointerEvent>) => {
          e.stopPropagation()
          if (!active) document.body.style.cursor = 'pointer'
        }}
        onClick={(e: ThreeEvent<MouseEvent>) => {
          e.stopPropagation()
          if (!active) onFaceClick(face.id)
        }}
      >
        <boxGeometry args={[CUBE_SIZE, CUBE_SIZE, 0.08]} />
        <meshPhysicalMaterial
          color={face.accent}
          emissive={face.accent}
          emissiveIntensity={active ? 0.28 : 0.14}
          transmission={0.4}
          transparent
          opacity={opacity}
          roughness={0.16}
          metalness={0.2}
          clearcoat={0.5}
        />
      </mesh>

      {works.map((work, i) => (
        <WorkTile
          key={work.id}
          work={work}
          slot={gridSlot(i)}
          accent={face.accent}
          hovered={hoveredWorkId === work.id}
          focused={focusedWorkId === work.id}
          related={relatedIds.has(work.id)}
          interactive={interactive}
          onHover={onWorkHover}
          onActivate={onWorkActivate}
        />
      ))}
    </group>
  )
}
