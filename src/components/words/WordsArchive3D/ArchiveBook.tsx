'use client'

import { Text } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import type { ThreeEvent } from '@react-three/fiber'
import { useRef, useState } from 'react'
import * as THREE from 'three'
import type { ArchiveBook as ArchiveBookData } from './wordsArchive.types'

const BOOK_W = 0.32
const BOOK_H = 0.46
const BOOK_D = 0.13

type ArchiveBookProps = {
  book: ArchiveBookData
  slot: [number, number, number]
  accent: string
  isHovered: boolean
  dimmed: boolean
  onHover: (bookId: string | null) => void
  onFocus: (bookId: string) => void
}

export default function ArchiveBook({
  book,
  slot,
  accent,
  isHovered,
  dimmed,
  onHover,
  onFocus,
}: ArchiveBookProps) {
  const groupRef = useRef<THREE.Group>(null)
  const coverRef = useRef<THREE.MeshStandardMaterial>(null)
  const [local, setLocal] = useState(false)
  const hot = isHovered || local
  const pointerDown = useRef<{ x: number; y: number } | null>(null)

  useFrame((_, delta) => {
    if (!groupRef.current) return
    const targetZ = slot[2] + (hot ? 0.22 : 0)
    const targetScale = hot ? 1.08 : 1
    const k = 1 - Math.exp(-9 * delta)
    groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, targetZ, k)
    const s = THREE.MathUtils.lerp(groupRef.current.scale.x, targetScale, k)
    groupRef.current.scale.setScalar(s)
    if (coverRef.current) {
      const target = hot ? 0.7 : dimmed ? 0.04 : 0.16
      coverRef.current.emissiveIntensity = THREE.MathUtils.lerp(coverRef.current.emissiveIntensity, target, k)
    }
  })

  const handleOver = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation()
    setLocal(true)
    onHover(book.id)
    document.body.style.cursor = 'pointer'
  }
  const handleOut = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation()
    setLocal(false)
    onHover(null)
    document.body.style.cursor = 'auto'
  }
  const handleDown = (event: ThreeEvent<PointerEvent>) => {
    pointerDown.current = { x: event.clientX, y: event.clientY }
  }
  const handleUp = (event: ThreeEvent<PointerEvent>) => {
    if (!pointerDown.current) return
    const dx = event.clientX - pointerDown.current.x
    const dy = event.clientY - pointerDown.current.y
    pointerDown.current = null
    if (Math.hypot(dx, dy) < 7) {
      event.stopPropagation()
      onFocus(book.id)
    }
  }

  return (
    <group
      ref={groupRef}
      position={[slot[0], slot[1], slot[2]]}
      onPointerOver={handleOver}
      onPointerOut={handleOut}
      onPointerDown={handleDown}
      onPointerUp={handleUp}
    >
      <mesh castShadow>
        <boxGeometry args={[BOOK_W, BOOK_H, BOOK_D]} />
        <meshStandardMaterial
          ref={coverRef}
          color="#15171d"
          emissive={accent}
          emissiveIntensity={0.16}
          roughness={0.62}
          metalness={0.24}
        />
      </mesh>
      {/* spine bands */}
      <mesh position={[0, BOOK_H * 0.34, BOOK_D / 2 + 0.002]}>
        <boxGeometry args={[BOOK_W * 0.82, 0.022, 0.004]} />
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={hot ? 0.9 : 0.4} />
      </mesh>
      <mesh position={[0, -BOOK_H * 0.36, BOOK_D / 2 + 0.002]}>
        <boxGeometry args={[BOOK_W * 0.5, 0.014, 0.004]} />
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={hot ? 0.7 : 0.28} />
      </mesh>
      <Text
        position={[0, 0.02, BOOK_D / 2 + 0.004]}
        fontSize={0.036}
        color="#e8eef5"
        maxWidth={BOOK_W * 0.86}
        textAlign="center"
        anchorX="center"
        anchorY="middle"
        lineHeight={1.05}
      >
        {book.title.toUpperCase()}
      </Text>
    </group>
  )
}
