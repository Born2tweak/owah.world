'use client'

import { Text } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useMemo, useRef, useState } from 'react'
import type { ThreeEvent } from '@react-three/fiber'
import * as THREE from 'three'
import type { CodeProject } from '@/data/projects'

interface ProjectPillarProps {
  project: CodeProject
  position: [number, number, number]
  rotationY: number
  cameraEmphasis: number
  isFocused: boolean
  isSelected: boolean
  onHoverChange: (hovered: boolean) => void
  onSelect: () => void
}

export default function ProjectPillar({
  project,
  position,
  rotationY,
  cameraEmphasis,
  isFocused,
  isSelected,
  onHoverChange,
  onSelect,
}: ProjectPillarProps) {
  const groupRef = useRef<THREE.Group>(null)
  const coreRef = useRef<THREE.Mesh>(null)
  const shellRef = useRef<THREE.Mesh>(null)
  const frameRef = useRef<THREE.Mesh>(null)
  const scanPlaneRef = useRef<THREE.Mesh>(null)
  const detailPlaneRef = useRef<THREE.Mesh>(null)
  const haloRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)
  const pointerDownRef = useRef<{ x: number; y: number } | null>(null)
  const previewTexture = useMemo(() => {
    if (!project.previewImage) return null
    const texture = new THREE.TextureLoader().load(project.previewImage)
    texture.colorSpace = THREE.SRGBColorSpace
    return texture
  }, [project.previewImage])

  useFrame((state, delta) => {
    if (
      !groupRef.current ||
      !coreRef.current ||
      !haloRef.current ||
      !shellRef.current ||
      !frameRef.current ||
      !scanPlaneRef.current ||
      !detailPlaneRef.current
    ) {
      return
    }

    const t = state.clock.getElapsedTime()
    const activity = Math.max(cameraEmphasis, hovered ? 1 : 0.8)
    const focusBoost = isFocused ? 1 : 0
    const selectionBoost = isSelected ? 1 : 0
    const targetScale = 0.94 + activity * 0.08 + focusBoost * 0.03 + selectionBoost * 0.03
    const targetLift = focusBoost * 0.2 + (hovered ? 0.15 : 0) + Math.sin(t * 0.48 + project.order * 0.5) * 0.06
    const microDriftX = Math.sin(t * 0.24 + project.order * 1.6) * 0.05
    const microDriftZ = Math.cos(t * 0.27 + project.order * 1.1) * 0.045
    const coreMaterial = coreRef.current.material as THREE.MeshPhysicalMaterial
    const shellMaterial = shellRef.current.material as THREE.MeshPhysicalMaterial
    const frameMaterial = frameRef.current.material as THREE.MeshPhysicalMaterial
    const scanMaterial = scanPlaneRef.current.material as THREE.MeshBasicMaterial
    const detailMaterial = detailPlaneRef.current.material as THREE.MeshPhysicalMaterial
    const haloMaterial = haloRef.current.material as THREE.MeshBasicMaterial
    const shimmer = 0.03 + Math.sin(t * 0.8 + project.order * 0.65) * 0.015
    const baseEmissive = 0.18 + cameraEmphasis * 0.5
    const scanPulse = 0.5 + Math.sin(t * 0.95 + project.order * 0.8) * 0.5
    const scanY = -2.6 + scanPulse * 5.2

    groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 1 - Math.exp(-5 * delta))
    groupRef.current.position.x = THREE.MathUtils.damp(groupRef.current.position.x, position[0] + microDriftX, 2.6, delta)
    groupRef.current.position.y = THREE.MathUtils.damp(groupRef.current.position.y, position[1] + targetLift, 4.6, delta)
    groupRef.current.position.z = THREE.MathUtils.damp(groupRef.current.position.z, position[2] + microDriftZ, 2.4, delta)
    groupRef.current.rotation.y = THREE.MathUtils.damp(
      groupRef.current.rotation.y,
      rotationY + Math.sin(t * 0.21 + project.order * 0.7) * 0.03,
      3,
      delta
    )

    coreMaterial.emissiveIntensity = THREE.MathUtils.damp(
      coreMaterial.emissiveIntensity,
      baseEmissive + focusBoost * 0.32 + selectionBoost * 0.24 + (hovered ? 0.24 : 0) + shimmer,
      4.8,
      delta
    )
    shellMaterial.envMapIntensity = THREE.MathUtils.damp(
      shellMaterial.envMapIntensity,
      3.4 + cameraEmphasis * 2 + focusBoost * 1.05 + (hovered ? 0.6 : 0),
      3.8,
      delta
    )
    shellMaterial.opacity = THREE.MathUtils.damp(shellMaterial.opacity, 0.64 + cameraEmphasis * 0.2, 3.6, delta)
    frameMaterial.envMapIntensity = THREE.MathUtils.damp(
      frameMaterial.envMapIntensity,
      4.1 + cameraEmphasis * 2.4 + focusBoost * 0.85,
      3.4,
      delta
    )
    detailMaterial.emissiveIntensity = THREE.MathUtils.damp(
      detailMaterial.emissiveIntensity,
      0.11 + cameraEmphasis * 0.21 + focusBoost * 0.1 + shimmer * 0.4,
      3.4,
      delta
    )
    scanPlaneRef.current.position.y = THREE.MathUtils.damp(scanPlaneRef.current.position.y, scanY, 4.2, delta)
    scanMaterial.opacity = THREE.MathUtils.damp(
      scanMaterial.opacity,
      0.03 + cameraEmphasis * 0.05 + focusBoost * 0.04 + scanPulse * 0.02,
      3.2,
      delta
    )
    haloMaterial.opacity = THREE.MathUtils.damp(
      haloMaterial.opacity,
      0.06 + cameraEmphasis * 0.2 + focusBoost * 0.14 + (hovered ? 0.13 : 0),
      4,
      delta
    )
  })

  function handlePointerDown(event: ThreeEvent<PointerEvent>) {
    pointerDownRef.current = { x: event.clientX, y: event.clientY }
    event.stopPropagation()
  }

  function handlePointerUp(event: ThreeEvent<PointerEvent>) {
    const start = pointerDownRef.current
    pointerDownRef.current = null
    if (!start) return
    const dx = event.clientX - start.x
    const dy = event.clientY - start.y
    const moved = Math.hypot(dx, dy)
    if (moved > 7) return
    event.stopPropagation()
    onSelect()
  }

  return (
    <group ref={groupRef} position={position} rotation={[0, rotationY, 0]}>
      <mesh ref={haloRef} position={[0, 3.3, -0.04]} raycast={() => null}>
        <planeGeometry args={[3.1, 7.8]} />
        <meshBasicMaterial color={project.accent} transparent opacity={0.16} />
      </mesh>

      <mesh ref={shellRef} castShadow receiveShadow>
        <boxGeometry args={[2.15, 7.2, 0.36]} />
        <meshPhysicalMaterial
          color="#9ec8eb"
          metalness={0.78}
          roughness={0.05}
          transmission={0.46}
          thickness={1.3}
          clearcoat={1}
          clearcoatRoughness={0.02}
          envMapIntensity={3.4}
          ior={1.36}
        />
      </mesh>

      <mesh ref={frameRef} position={[0, 0, 0.03]} raycast={() => null}>
        <boxGeometry args={[2.27, 7.32, 0.08]} />
        <meshPhysicalMaterial
          color="#d9ecff"
          metalness={1}
          roughness={0.1}
          clearcoat={1}
          clearcoatRoughness={0.02}
          envMapIntensity={4}
          transparent
          opacity={0.88}
        />
      </mesh>

      <mesh
        ref={coreRef}
        position={[0, 0, 0.19]}
        onPointerOver={(event) => {
          event.stopPropagation()
          setHovered(true)
          onHoverChange(true)
        }}
        onPointerOut={(event) => {
          event.stopPropagation()
          setHovered(false)
          onHoverChange(false)
        }}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
      >
        <boxGeometry args={[1.84, 6.88, 0.08]} />
        <meshPhysicalMaterial
          color="#050f1e"
          metalness={0.88}
          roughness={0.12}
          clearcoat={1}
          clearcoatRoughness={0.02}
          emissive={new THREE.Color(project.accent)}
          emissiveIntensity={0.3}
        />
      </mesh>

      <mesh ref={detailPlaneRef} position={[0, 0, 0.24]} raycast={() => null}>
        <planeGeometry args={[1.58, 6.4]} />
        <meshPhysicalMaterial
          color="#0a1626"
          metalness={0.8}
          roughness={0.25}
          emissive={new THREE.Color(project.accent)}
          emissiveIntensity={0.12}
          transparent
          opacity={0.75}
        />
      </mesh>

      <mesh position={[0, -0.15, 0.249]} raycast={() => null}>
        <planeGeometry args={[1.48, 2.18]} />
        {previewTexture ? (
          <meshBasicMaterial map={previewTexture} transparent opacity={0.87} />
        ) : (
          <meshBasicMaterial color={project.accent} transparent opacity={0.32} />
        )}
      </mesh>

      <mesh ref={scanPlaneRef} position={[0, -2.4, 0.245]} raycast={() => null}>
        <planeGeometry args={[1.52, 0.22]} />
        <meshBasicMaterial color={project.accent} transparent opacity={0.04} />
      </mesh>

      <mesh position={[0, -3.71, 0]} raycast={() => null}>
        <cylinderGeometry args={[1.3, 1.5, 0.24, 6]} />
        <meshStandardMaterial color="#b8dfff" metalness={0.84} roughness={0.18} />
      </mesh>

      <Text position={[-0.68, 2.55, 0.25]} anchorX="left" anchorY="middle" fontSize={0.26} color="#f5fbff" letterSpacing={0.06}>
        {String(project.order).padStart(2, '0')}
      </Text>
      <Text position={[-0.68, 1.9, 0.25]} anchorX="left" anchorY="middle" maxWidth={1.3} fontSize={0.24} color={project.accent}>
        {project.title.toUpperCase()}
      </Text>
      <Text position={[-0.68, 1.45, 0.25]} anchorX="left" anchorY="middle" maxWidth={1.34} fontSize={0.1} color="#d8ecfb">
        {project.tagline}
      </Text>
      <Text position={[-0.68, -2.62, 0.25]} anchorX="left" anchorY="middle" fontSize={0.12} color="#9cccf4">
        {isSelected ? 'SELECTED' : isFocused ? 'FOCUSED' : project.status.replace('_', ' ').toUpperCase()}
      </Text>
    </group>
  )
}
