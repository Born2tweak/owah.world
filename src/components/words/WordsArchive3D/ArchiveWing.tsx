'use client'

import { Text } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import ArchiveBook from './ArchiveBook'
import ArchiveShelf from './ArchiveShelf'
import type { ArchiveBook as ArchiveBookData, Wing } from './wordsArchive.types'
import { DISPLAY_LOCAL, SLOT_ROWS_Y, bookSlot, booksForWing, wingAnchor, wingRotationY } from './wordsArchiveData'

function FeaturedBook({ book, accent }: { book: ArchiveBookData; accent: string }) {
  const ref = useRef<THREE.Group>(null)
  const matRef = useRef<THREE.MeshStandardMaterial>(null)

  useFrame((stateThree, delta) => {
    if (!ref.current) return
    ref.current.rotation.y += delta * 0.35
    const lift = Math.sin(stateThree.clock.elapsedTime * 1.1) * 0.02
    ref.current.position.y = DISPLAY_LOCAL[1] + lift
    if (matRef.current) {
      matRef.current.emissiveIntensity = 0.55 + Math.sin(stateThree.clock.elapsedTime * 1.6) * 0.12
    }
  })

  return (
    <group position={[DISPLAY_LOCAL[0], DISPLAY_LOCAL[1], DISPLAY_LOCAL[2]]}>
      <group ref={ref} scale={2.2}>
        <mesh castShadow>
          <boxGeometry args={[0.32, 0.46, 0.13]} />
          <meshStandardMaterial ref={matRef} color="#16181f" emissive={accent} emissiveIntensity={0.55} roughness={0.5} metalness={0.3} />
        </mesh>
        <mesh position={[0, 0.155, 0.067]}>
          <boxGeometry args={[0.26, 0.022, 0.004]} />
          <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={1.1} />
        </mesh>
        <Text position={[0, 0.0, 0.07]} fontSize={0.034} color="#f1f5f9" maxWidth={0.27} textAlign="center" anchorX="center" anchorY="middle" lineHeight={1.05}>
          {book.title.toUpperCase()}
        </Text>
      </group>
      {/* podium */}
      <mesh position={[0, -1.34, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.46, 0.54, 0.16, 32]} />
        <meshStandardMaterial color="#101218" metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh position={[0, -1.25, 0]}>
        <cylinderGeometry args={[0.4, 0.4, 0.01, 32]} />
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.7} />
      </mesh>
      <pointLight position={[0, 0.4, 0.4]} intensity={1.4} color={accent} distance={2.6} decay={2} />
    </group>
  )
}

type ArchiveWingProps = {
  wing: Wing
  active: boolean
  hoveredBookId: string | null
  focusedBookId: string | null
  onHover: (bookId: string | null) => void
  onFocus: (bookId: string) => void
}

export default function ArchiveWing({
  wing,
  active,
  hoveredBookId,
  focusedBookId,
  onHover,
  onFocus,
}: ArchiveWingProps) {
  const books = useMemo(() => booksForWing(wing.id), [wing.id])
  const anchor = wingAnchor(wing.azimuth)
  const rotationY = wingRotationY(wing.azimuth)
  const rowsUsed = Math.min(SLOT_ROWS_Y.length, Math.ceil(books.length / 4))
  const focusedBook = focusedBookId ? books.find((b) => b.id === focusedBookId) ?? null : null

  return (
    <group position={anchor} rotation={[0, rotationY, 0]}>
      {/* back panel */}
      <mesh position={[0, 1.55, -0.28]} castShadow receiveShadow>
        <boxGeometry args={[3.0, 3.05, 0.16]} />
        <meshStandardMaterial color="#0b0d12" metalness={0.55} roughness={0.34} />
      </mesh>
      <mesh position={[0, 1.55, -0.19]}>
        <planeGeometry args={[2.78, 2.84]} />
        <meshStandardMaterial color="#0e1117" emissive={wing.accent} emissiveIntensity={active ? 0.07 : 0.03} roughness={0.5} metalness={0.2} />
      </mesh>
      {/* chrome side pilasters */}
      {[-1.45, 1.45].map((x) => (
        <mesh key={x} position={[x, 1.55, -0.14]}>
          <boxGeometry args={[0.08, 3.05, 0.14]} />
          <meshStandardMaterial color="#3a3f48" metalness={0.92} roughness={0.18} />
        </mesh>
      ))}

      {/* header plaque */}
      <group position={[0, 3.18, -0.08]}>
        <mesh>
          <ringGeometry args={[0.085, 0.13, 28]} />
          <meshStandardMaterial color={wing.accent} emissive={wing.accent} emissiveIntensity={active ? 0.8 : 0.4} />
        </mesh>
        <Text position={[0, 0.0, 0.02]} fontSize={0.13} color="#f3f6fa" anchorX="center" anchorY="middle" letterSpacing={0.06}>
          {wing.label.toUpperCase()}
        </Text>
        <Text position={[0, -0.16, 0.02]} fontSize={0.05} color={wing.accent} anchorX="center" anchorY="middle" letterSpacing={0.14}>
          {wing.eyebrow.toUpperCase()}
        </Text>
      </group>

      {/* shelves */}
      {SLOT_ROWS_Y.slice(0, rowsUsed).map((y) => (
        <ArchiveShelf key={y} y={y} accent={wing.accent} />
      ))}

      {/* books */}
      {books.map((book, i) => {
        if (focusedBook && book.id === focusedBook.id) return null
        const slot = bookSlot(i).position
        return (
          <ArchiveBook
            key={book.id}
            book={book}
            slot={slot}
            accent={wing.accent}
            isHovered={hoveredBookId === book.id}
            dimmed={Boolean(focusedBook)}
            onHover={onHover}
            onFocus={onFocus}
          />
        )
      })}

      {focusedBook ? <FeaturedBook book={focusedBook} accent={wing.accent} /> : null}

      <pointLight position={[0, 2.4, 0.7]} intensity={active ? 1.1 : 0.4} color={wing.accent} distance={4.4} decay={2} />
    </group>
  )
}
