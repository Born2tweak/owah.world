'use client'

import { useRef, useState, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { useTexture, Text } from '@react-three/drei'
import type { ThreeEvent } from '@react-three/fiber'
import * as THREE from 'three'
import { useCDStore } from '@/lib/stores/cd.store'

export default function CDMesh() {
  const groupRef = useRef<THREE.Group>(null)
  const { rotation, setIsDragging, setRotation } = useCDStore()

  const texture = useTexture('/textures/wattba.png', (tex) => {
    tex.colorSpace = THREE.SRGBColorSpace
  })

  const [hovered, setHovered] = useState(false)
  const pointerDown = useRef(false)
  const previousPointer = useRef({ x: 0, y: 0 })
  const velocity = useRef({ x: 0, y: 0 })

  const iridescentMaterial = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: 0x222222,
    metalness: 0.9,
    roughness: 0.1,
    iridescence: 1.0,
    iridescenceIOR: 1.5,
    iridescenceThicknessRange: [100, 400],
    clearcoat: 1.0,
    clearcoatRoughness: 0.1,
    side: THREE.BackSide,
  }), [])

  const coverMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    map: texture,
    roughness: 0.2,
    metalness: 0.1,
  }), [texture])

  useFrame((state) => {
    if (!groupRef.current) return

    if (pointerDown.current) {
      groupRef.current.rotation.x = rotation.x
      groupRef.current.rotation.y = rotation.y
      groupRef.current.scale.lerp(new THREE.Vector3(1.05, 1.05, 1.05), 0.1)
    } else {
      velocity.current.x *= 0.95
      velocity.current.y *= 0.95

      if (Math.abs(velocity.current.x) < 0.001 && Math.abs(velocity.current.y) < 0.001) {
        velocity.current.y = 0.002
      }

      groupRef.current.rotation.x += velocity.current.x
      groupRef.current.rotation.y += velocity.current.y

      const targetScale = hovered ? 1.02 : 1.0
      groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1)
      setRotation({ x: groupRef.current.rotation.x, y: groupRef.current.rotation.y })
    }

    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.5) * 0.1
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
    const deltaX = e.clientX - previousPointer.current.x
    const deltaY = e.clientY - previousPointer.current.y
    const factor = 0.01
    velocity.current = { x: deltaY * factor * 0.1, y: deltaX * factor * 0.1 }
    setRotation({ x: rotation.x + deltaY * factor, y: rotation.y + deltaX * factor })
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

  const textRadius = 1.3
  const textString = "OWAH.WORLD   "
  const textArray = textString.split("")

  return (
    <group
      ref={groupRef}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerMove={handlePointerMove}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      onPointerLeave={handlePointerUp}
      rotation={[0.3, -0.3, 0]}
    >
      {/* Front face — WATTBA artwork */}
      <mesh position={[0, 0, 0.01]} castShadow>
        <ringGeometry args={[0.4, 2.5, 64]} />
        <meshStandardMaterial 
          map={texture} 
          roughness={0.2}
          metalness={0.1}
          side={THREE.FrontSide}
        />
      </mesh>

      {/* Back face — Hyper-realistic glass/transparent material */}
      <mesh position={[0, 0, -0.01]}>
        <ringGeometry args={[0.4, 2.5, 64]} />
        <meshPhysicalMaterial 
          side={THREE.BackSide}
          transmission={1}
          opacity={1}
          metalness={0}
          roughness={0.05}
          ior={1.5}
          thickness={0.5}
          clearcoat={1}
          clearcoatRoughness={0.1}
          iridescence={1}
          iridescenceIOR={1.3}
          iridescenceThicknessRange={[100, 400]}
          color="#ffffff"
        />
      </mesh>

      {/* Render text on the back side (glass side) */}
      <group position={[0, 0, -0.02]} rotation={[0, Math.PI, 0]}>
        {textArray.map((char, i) => {
          const angle = (i / textArray.length) * Math.PI * 2
          return (
            <Text
              key={i}
              position={[
                Math.sin(angle) * textRadius,
                Math.cos(angle) * textRadius,
                0
              ]}
              rotation={[0, 0, -angle]}
              fontSize={0.2}
              color="white"
              anchorX="center"
              anchorY="middle"
              material-toneMapped={false}
            >
              {char}
            </Text>
          )
        })}
      </group>
    </group>
  )
}
