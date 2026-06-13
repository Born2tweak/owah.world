'use client'

import { useFrame, useThree } from '@react-three/fiber'
import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import CubeFace from './CubeFace'
import type { ArchiveMode, FaceId } from './wordsArchive.types'
import { CUBE_SIZE, FACE_BY_ID, FACES, WORK_BY_ID, worksForFace } from './wordsArchiveData'

type ArchiveCubeProps = {
  mode: ArchiveMode
  activeFace: FaceId | null
  hoveredFace: FaceId | null
  hoveredWorkId: string | null
  focusedWorkId: string | null
  onFaceHover: (face: FaceId | null) => void
  onFaceClick: (face: FaceId) => void
  onWorkHover: (id: string | null) => void
  onWorkFocus: (id: string) => void
}

export default function ArchiveCube({
  mode,
  activeFace,
  hoveredFace,
  hoveredWorkId,
  focusedWorkId,
  onFaceHover,
  onFaceClick,
  onWorkHover,
  onWorkFocus,
}: ArchiveCubeProps) {
  const groupRef = useRef<THREE.Group>(null)
  const { gl } = useThree()
  const rot = useRef({ x: -0.18, y: 0.6 })
  const target = useRef({ x: -0.18, y: 0.6 })
  const drag = useRef<{ active: boolean; x: number; y: number }>({ active: false, x: 0, y: 0 })

  const relatedIds = useMemo(() => {
    const source = focusedWorkId ?? hoveredWorkId
    const work = source ? WORK_BY_ID[source] : null
    return new Set(work?.related ?? [])
  }, [focusedWorkId, hoveredWorkId])

  useEffect(() => {
    const el = gl.domElement
    const down = (e: PointerEvent) => {
      drag.current = { active: true, x: e.clientX, y: e.clientY }
    }
    const move = (e: PointerEvent) => {
      if (!drag.current.active) return
      const dx = e.clientX - drag.current.x
      const dy = e.clientY - drag.current.y
      drag.current.x = e.clientX
      drag.current.y = e.clientY
      // dragging only steers freely in overview
      target.current.y += dx * 0.006
      target.current.x = THREE.MathUtils.clamp(target.current.x + dy * 0.005, -0.6, 0.6)
    }
    const up = () => {
      drag.current.active = false
    }
    el.addEventListener('pointerdown', down)
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerup', up)
    return () => {
      el.removeEventListener('pointerdown', down)
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerup', up)
    }
  }, [gl])

  useFrame((_, delta) => {
    if (!groupRef.current) return
    if (mode === 'overview') {
      if (!drag.current.active) target.current.y += delta * 0.12
    } else if (activeFace) {
      target.current.y = FACE_BY_ID[activeFace].faceRotationY
      target.current.x = -0.02
    }
    const k = 1 - Math.exp(-5 * delta)
    rot.current.x = THREE.MathUtils.lerp(rot.current.x, target.current.x, k)
    rot.current.y = THREE.MathUtils.lerp(rot.current.y, target.current.y, k)
    groupRef.current.rotation.x = rot.current.x
    groupRef.current.rotation.y = rot.current.y
  })

  return (
    <group ref={groupRef}>
      {/* core glow */}
      <mesh>
        <boxGeometry args={[CUBE_SIZE * 0.96, CUBE_SIZE * 0.96, CUBE_SIZE * 0.96]} />
        <meshStandardMaterial color="#0a1018" emissive="#1a2a3a" emissiveIntensity={0.4} roughness={0.3} metalness={0.6} />
      </mesh>

      {FACES.map((face) => (
        <CubeFace
          key={face.id}
          face={face}
          works={worksForFace(face.id)}
          yaw={face.faceRotationY}
          active={activeFace === face.id && mode !== 'overview'}
          faceHovered={hoveredFace === face.id}
          dim={mode !== 'overview' && activeFace !== face.id}
          hoveredWorkId={hoveredWorkId}
          focusedWorkId={focusedWorkId}
          relatedIds={relatedIds}
          onFaceHover={onFaceHover}
          onFaceClick={onFaceClick}
          onWorkHover={onWorkHover}
          onWorkFocus={onWorkFocus}
        />
      ))}
    </group>
  )
}
