'use client'

import { Suspense, useRef, useState, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import type { ThreeEvent } from '@react-three/fiber'
import * as THREE from 'three'
import { useCDStore } from '@/lib/stores/cd.store'

// Pre-allocated — never instantiated inside useFrame to avoid GC churn
const _lerpTarget = new THREE.Vector3()

function CDMeshInner() {
  const groupRef = useRef<THREE.Group>(null)
  // Only subscribe to setIsDragging — not `rotation`, which was the 60Hz re-render source
  const { setIsDragging } = useCDStore()

  const texture = useTexture('/textures/wattba.png', (tex) => {
    tex.colorSpace = THREE.SRGBColorSpace
  })

  const [hovered, setHovered] = useState(false)
  const pointerDown = useRef(false)
  const previousPointer = useRef({ x: 0, y: 0 })
  const velocity = useRef({ x: 0, y: 0 })
  // Local ref owns rotation during both drag and free-spin — never writes to Zustand per-frame
  const localRotation = useRef({ x: 0.25, y: -0.4 })

  const cdShape = useMemo(() => {
    const shape = new THREE.Shape()
    shape.absarc(0, 0, 2.5, 0, Math.PI * 2, false)
    const hole = new THREE.Path()
    hole.absarc(0, 0, 0.22, 0, Math.PI * 2, true)
    shape.holes.push(hole)
    return shape
  }, [])

  const cdGeometry = useMemo(() => new THREE.ShapeGeometry(cdShape, 128), [cdShape])

  useFrame((state) => {
    if (!groupRef.current) return
    const elapsed = state.clock.elapsedTime

    if (pointerDown.current) {
      groupRef.current.rotation.x = localRotation.current.x
      groupRef.current.rotation.y = localRotation.current.y
      _lerpTarget.set(1.05, 1.05, 1.05)
      groupRef.current.scale.lerp(_lerpTarget, 0.1)
    } else {
      velocity.current.x *= 0.95
      velocity.current.y *= 0.95

      if (Math.abs(velocity.current.x) < 0.001 && Math.abs(velocity.current.y) < 0.001) {
        velocity.current.y = 0.003
      }

      groupRef.current.rotation.y += velocity.current.y
      groupRef.current.rotation.x = Math.sin(elapsed * 0.35) * 0.18 - 0.12

      localRotation.current.x = groupRef.current.rotation.x
      localRotation.current.y = groupRef.current.rotation.y

      const targetScale = hovered ? 1.02 : 1.0
      _lerpTarget.set(targetScale, targetScale, targetScale)
      groupRef.current.scale.lerp(_lerpTarget, 0.1)
    }

    groupRef.current.position.y = Math.sin(elapsed * 1.5) * 0.1
  })

  const handlePointerDown = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation()
    pointerDown.current = true
    setIsDragging(true)
    previousPointer.current = { x: e.clientX, y: e.clientY }
    document.body.style.cursor = 'grabbing'
  }

  const handlePointerUp = () => {
    pointerDown.current = false
    setIsDragging(false)
    document.body.style.cursor = hovered ? 'grab' : 'auto'
  }

  const handlePointerMove = (e: ThreeEvent<PointerEvent>) => {
    if (!pointerDown.current) return
    const dx = e.clientX - previousPointer.current.x
    const dy = e.clientY - previousPointer.current.y
    const f = 0.01
    velocity.current = { x: dy * f * 0.1, y: dx * f * 0.1 }
    localRotation.current = {
      x: localRotation.current.x + dy * f,
      y: localRotation.current.y + dx * f,
    }
    previousPointer.current = { x: e.clientX, y: e.clientY }
  }

  const handlePointerOver = () => {
    setHovered(true)
    if (!pointerDown.current) document.body.style.cursor = 'grab'
  }

  const handlePointerOut = () => {
    setHovered(false)
    if (!pointerDown.current) document.body.style.cursor = 'auto'
  }

  return (
    <group
      ref={groupRef}
      rotation={[0.25, -0.4, 0]}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerMove={handlePointerMove}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      onPointerLeave={handlePointerUp}
    >
      {/* Front face — WATTBA artwork with iridescent clearcoat */}
      <mesh geometry={cdGeometry}>
        <meshPhysicalMaterial
          map={texture}
          metalness={0}
          roughness={0.06}
          iridescence={1.0}
          iridescenceIOR={2.2}
          iridescenceThicknessRange={[100, 600]}
          envMapIntensity={2.5}
          clearcoat={1.0}
          clearcoatRoughness={0.01}
          side={THREE.FrontSide}
        />
      </mesh>

      {/* Back face — iridescent chrome */}
      <mesh geometry={cdGeometry}>
        <meshPhysicalMaterial
          color="#aaaaaa"
          metalness={1.0}
          roughness={0.04}
          iridescence={1.0}
          iridescenceIOR={2.0}
          iridescenceThicknessRange={[80, 500]}
          clearcoat={1.0}
          clearcoatRoughness={0.02}
          reflectivity={1.0}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Outer rim — thin chrome edge */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[2.5, 2.5, 0.06, 128, 1, true]} />
        <meshPhysicalMaterial
          color="#cccccc"
          metalness={0.98}
          roughness={0.05}
          clearcoat={1.0}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Inner hole rim */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.22, 0.22, 0.06, 64, 1, true]} />
        <meshPhysicalMaterial
          color="#cccccc"
          metalness={0.98}
          roughness={0.05}
          clearcoat={1.0}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Hub label — translucent glass ring */}
      <mesh>
        <ringGeometry args={[0.22, 0.55, 64]} />
        <meshPhysicalMaterial
          color="#e0e8f0"
          transparent
          opacity={0.18}
          roughness={0.15}
          metalness={0.05}
          clearcoat={0.8}
          clearcoatRoughness={0.05}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  )
}

// Suspense boundary contains texture suspension — prevents it from
// propagating to the Canvas root and unmounting the whole scene
export default function CDMesh() {
  return (
    <Suspense fallback={null}>
      <CDMeshInner />
    </Suspense>
  )
}
