'use client'

import { Suspense, useRef, useState, useEffect, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import type { ThreeEvent } from '@react-three/fiber'
import * as THREE from 'three'
import { useCDStore } from '@/lib/stores/cd.store'

const _lerpTarget = new THREE.Vector3()

// Generates the printed physical inscription (no glowing, just physical matte print)
function createVinylTextTexture() {
  const size = 1024
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')!
  
  ctx.clearRect(0, 0, size, size)
  
  // Elegant, understated typography
  ctx.font = '500 18px var(--font-title), "Syncopate", sans-serif'
  ctx.fillStyle = 'rgba(255, 255, 255, 0.6)' // Looks physically printed (matte)
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  
  const text = "O W A H . W O R L D   —   S A C R E D   A R T I F A C T   —   "
  const radius = size * 0.42
  const cx = size / 2
  const cy = size / 2
  
  for (let i = 0; i < text.length; i++) {
    const angle = (i / text.length) * Math.PI * 2 - Math.PI / 2
    ctx.save()
    ctx.translate(cx + Math.cos(angle) * radius, cy + Math.sin(angle) * radius)
    ctx.rotate(angle + Math.PI / 2)
    ctx.fillText(text[i], 0, 0)
    ctx.restore()
  }

  // Thin, precise machined lines
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)'
  ctx.lineWidth = 1
  for(let i = 0; i < 3; i++) {
    ctx.beginPath()
    ctx.arc(cx, cy, radius - 25 - (i * 3), 0, Math.PI * 2)
    ctx.stroke()
  }

  return new THREE.CanvasTexture(canvas)
}

function CDMeshInner() {
  const groupRef = useRef<THREE.Group>(null)
  const { setIsDragging } = useCDStore()

  const texture = useTexture('/textures/wattba.png', (tex) => {
    tex.colorSpace = THREE.SRGBColorSpace
  })

  const [vinylTex, setVinylTex] = useState<THREE.CanvasTexture | null>(null)

  useEffect(() => {
    setVinylTex(createVinylTextTexture())
  }, [])

  const [hovered, setHovered] = useState(false)
  const pointerDown = useRef(false)
  const previousPointer = useRef({ x: 0, y: 0 })
  const velocity = useRef({ x: 0, y: 0 })
  const localRotation = useRef({ x: 0.15, y: -0.3 })

  const cdShape = useMemo(() => {
    const shape = new THREE.Shape()
    shape.absarc(0, 0, 2.5, 0, Math.PI * 2, false)
    const hole = new THREE.Path()
    hole.absarc(0, 0, 0.22, 0, Math.PI * 2, true)
    shape.holes.push(hole)
    return shape
  }, [])

  const cdGeometry = useMemo(() => {
    const geo = new THREE.ShapeGeometry(cdShape, 128)
    geo.computeBoundingBox()
    const uvAttribute = geo.attributes.uv
    const posAttribute = geo.attributes.position
    const minX = geo.boundingBox!.min.x
    const minY = geo.boundingBox!.min.y
    const rangeX = geo.boundingBox!.max.x - minX
    const rangeY = geo.boundingBox!.max.y - minY
    
    for (let i = 0; i < uvAttribute.count; i++) {
      const x = posAttribute.getX(i)
      const y = posAttribute.getY(i)
      uvAttribute.setXY(i, (x - minX) / rangeX, (y - minY) / rangeY)
    }
    return geo
  }, [cdShape])

  useFrame((state) => {
    if (!groupRef.current) return
    const elapsed = state.clock.elapsedTime

    if (pointerDown.current) {
      groupRef.current.rotation.x = localRotation.current.x
      groupRef.current.rotation.y = localRotation.current.y
      _lerpTarget.set(1.02, 1.02, 1.02)
      groupRef.current.scale.lerp(_lerpTarget, 0.1)
    } else {
      velocity.current.x *= 0.96
      velocity.current.y *= 0.96

      if (Math.abs(velocity.current.x) < 0.001 && Math.abs(velocity.current.y) < 0.001) {
        velocity.current.y = 0.002 // Extremely slow, majestic rotation
      }

      groupRef.current.rotation.y += velocity.current.y
      // Gentle, controlled floating tilt
      groupRef.current.rotation.x = Math.sin(elapsed * 0.5) * 0.05 + 0.1

      localRotation.current.x = groupRef.current.rotation.x
      localRotation.current.y = groupRef.current.rotation.y

      const targetScale = hovered ? 1.01 : 1.0
      _lerpTarget.set(targetScale, targetScale, targetScale)
      groupRef.current.scale.lerp(_lerpTarget, 0.1)
    }

    groupRef.current.position.y = Math.sin(elapsed * 1.0) * 0.05
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
    const f = 0.008
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
      rotation={[0.15, -0.3, 0]}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerMove={handlePointerMove}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      onPointerLeave={handlePointerUp}
    >
      {/* Front face — WATTBA artwork embedded under cinematic polycarbonate */}
      <mesh geometry={cdGeometry}>
        <meshPhysicalMaterial
          map={texture}
          metalness={0.1}
          roughness={0.05} // Very glossy
          iridescence={0.8} // Reduced slightly from 1.0
          iridescenceIOR={1.5} // Standard polycarbonate IOR
          iridescenceThicknessRange={[100, 400]}
          envMapIntensity={2.5}
          clearcoat={1.0}
          clearcoatRoughness={0.02}
          side={THREE.FrontSide}
        />
      </mesh>

      {/* Front Vinyl Inscription Overlay (avoids z-fighting via polygonOffset) */}
      <mesh geometry={cdGeometry}>
        {vinylTex && (
          <meshPhysicalMaterial
            map={vinylTex}
            transparent={true}
            opacity={0.85} // Slightly reduced so it feels printed
            metalness={0.5} // Silver printed ink
            roughness={0.4} // Matte printed texture against glossy CD
            clearcoat={1.0} // Under the clearcoat
            side={THREE.FrontSide}
            depthWrite={false}
            polygonOffset={true}
            polygonOffsetFactor={-1}
          />
        )}
      </mesh>

      {/* Back face — Iridescent polycarbonate/chrome */}
      <mesh geometry={cdGeometry}>
        <meshPhysicalMaterial
          color="#888888"
          metalness={1.0}
          roughness={0.05}
          iridescence={1.0}
          iridescenceIOR={2.0}
          iridescenceThicknessRange={[80, 500]}
          clearcoat={1.0}
          clearcoatRoughness={0.02}
          reflectivity={1.0}
          envMapIntensity={3.0}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Outer rim — Machined edge */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[2.5, 2.5, 0.04, 128, 1, true]} />
        <meshPhysicalMaterial
          color="#999999"
          metalness={0.9}
          roughness={0.3}
          envMapIntensity={1.0}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Inner hole rim */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.22, 0.22, 0.04, 64, 1, true]} />
        <meshPhysicalMaterial
          color="#666666"
          metalness={0.9}
          roughness={0.4}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Hub label — Premium machined ring */}
      <mesh>
        <ringGeometry args={[0.22, 0.55, 64]} />
        <meshPhysicalMaterial
          color="#151515"
          metalness={0.95}
          roughness={0.3} // Brushed feel
          envMapIntensity={1.5}
          clearcoat={0.2}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  )
}

export default function CDMesh() {
  return (
    <Suspense fallback={null}>
      <CDMeshInner />
    </Suspense>
  )
}
