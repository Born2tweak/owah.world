'use client'

import { useFrame, useThree } from '@react-three/fiber'
import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import CubeFace from './CubeFace'
import type { ArchiveMode, FaceId } from './wordsArchive.types'
import { CUBE_SHIFT_X, FACE_BY_ID, FACES, WORK_BY_ID, faceOrientation, worksForFace } from './wordsArchiveData'

type ArchiveCubeProps = {
  mode: ArchiveMode
  activeFace: FaceId | null
  hoveredWorkId: string | null
  focusedWorkId: string | null
  onWorkHover: (id: string | null) => void
  onWorkFocus: (id: string) => void
  onFaceClick: (face: FaceId) => void
}

export default function ArchiveCube({ mode, activeFace, hoveredWorkId, focusedWorkId, onWorkHover, onWorkFocus, onFaceClick }: ArchiveCubeProps) {
  const group = useRef<THREE.Group>(null)
  const { gl } = useThree()
  const rot = useRef({ x: -0.2, y: 0.5 })
  const target = useRef({ x: -0.2, y: 0.5 })
  const shiftX = useRef(0)
  const drag = useRef({ active: false, x: 0, y: 0, moved: 0 })

  const relatedIds = useMemo(() => {
    const src = focusedWorkId ?? hoveredWorkId
    const w = src ? WORK_BY_ID[src] : null
    return new Set(w?.related ?? [])
  }, [focusedWorkId, hoveredWorkId])

  useEffect(() => {
    const el = gl.domElement
    const down = (e: PointerEvent) => {
      drag.current = { active: true, x: e.clientX, y: e.clientY, moved: 0 }
    }
    const move = (e: PointerEvent) => {
      if (!drag.current.active) return
      const dx = e.clientX - drag.current.x
      const dy = e.clientY - drag.current.y
      drag.current.x = e.clientX
      drag.current.y = e.clientY
      drag.current.moved += Math.abs(dx) + Math.abs(dy)
      // full 3D exploration in overview
      target.current.y += dx * 0.006
      target.current.x = THREE.MathUtils.clamp(target.current.x - dy * 0.006, -1.2, 1.2)
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

  useFrame((state, delta) => {
    if (!group.current) return
    if (mode === 'overview') {
      if (!drag.current.active) target.current.y += delta * 0.1
    } else if (activeFace) {
      const o = faceOrientation(FACE_BY_ID[activeFace].side)
      target.current.x = o.x
      target.current.y = o.y
    }
    const k = 1 - Math.exp(-5 * delta)
    rot.current.x = THREE.MathUtils.lerp(rot.current.x, target.current.x, k)
    rot.current.y = THREE.MathUtils.lerp(rot.current.y, target.current.y, k)
    group.current.rotation.x = rot.current.x
    group.current.rotation.y = rot.current.y

    const desiredShift = CUBE_SHIFT_X[mode]
    shiftX.current = THREE.MathUtils.lerp(shiftX.current, desiredShift, k)
    const bob = mode === 'overview' ? Math.sin(state.clock.elapsedTime * 0.6) * 0.06 : 0
    group.current.position.x = shiftX.current
    group.current.position.y = bob
  })

  return (
    <group ref={group}>
      {FACES.map((face) => (
        <CubeFace
          key={face.id}
          face={face}
          works={worksForFace(face.id)}
          active={activeFace === face.id && mode !== 'overview'}
          dim={mode !== 'overview' && activeFace !== face.id}
          interactive={mode !== 'overview' ? activeFace === face.id : true}
          hoveredWorkId={hoveredWorkId}
          focusedWorkId={focusedWorkId}
          relatedIds={relatedIds}
          onWorkHover={onWorkHover}
          onWorkActivate={(id) => (mode === 'overview' ? onFaceClick(face.id) : onWorkFocus(id))}
          onFaceClick={onFaceClick}
        />
      ))}
    </group>
  )
}
