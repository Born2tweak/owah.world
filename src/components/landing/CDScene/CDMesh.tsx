'use client'

import { useRef, useState, useMemo, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Text, useTexture } from '@react-three/drei'
import type { ThreeEvent } from '@react-three/fiber'
import * as THREE from 'three'
import { useCDStore } from '@/lib/stores/cd.store'

// ─── Procedural diamond texture ─────────────────────────────────────────────
// Instead of AI-generated junk, we draw a proper WATTBA-style diamond mosaic
// directly on a canvas using real geometry and color.
function buildDiamondTexture(size = 1024): THREE.CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')!

  // Deep near-black base
  ctx.fillStyle = '#06090f'
  ctx.fillRect(0, 0, size, size)

  const cols = 22
  const rows = 22
  const cw = size / cols
  const ch = size / rows

  // Icy blue-silver palette like actual WATTBA diamonds
  const palette = [
    ['#c8e0f4', '#e8f4ff', '#b0c8e0'],  // light ice blue
    ['#9ab8d4', '#d0e8fa', '#7898b4'],  // mid ice
    ['#ddeeff', '#f0f8ff', '#c0d8f0'],  // near white
    ['#4a7098', '#7098b8', '#304860'],  // deep teal
    ['#a8c8e8', '#e0f0ff', '#88a8c8'],  // soft blue
  ]

  for (let row = 0; row < rows + 1; row++) {
    for (let col = 0; col < cols + 1; col++) {
      const x = col * cw
      const y = row * ch
      const isOffset = row % 2 === 1

      // Offset every other row for diamond stagger
      const cx = isOffset ? x + cw * 0.5 : x
      const cy = y

      // Pick a color group based on position + noise
      const seed = (row * 37 + col * 13) % palette.length
      const shades = palette[seed]

      // Draw a parallelogram/diamond facet
      // Each facet has 4 points forming a rhombus
      const hw = cw * 0.48
      const hh = ch * 0.48

      ctx.beginPath()
      ctx.moveTo(cx + hw * 0.5, cy)
      ctx.lineTo(cx + hw, cy + hh * 0.5)
      ctx.lineTo(cx + hw * 0.5, cy + hh)
      ctx.lineTo(cx, cy + hh * 0.5)
      ctx.closePath()

      // Multi-stop gradient for facet depth
      const angle = ((row + col) * 47) % 360
      const rad = (angle * Math.PI) / 180
      const gx1 = cx + Math.cos(rad) * hw
      const gy1 = cy + Math.sin(rad) * hh
      const gx2 = cx + Math.cos(rad + Math.PI) * hw
      const gy2 = cy + Math.sin(rad + Math.PI) * hh

      const grad = ctx.createLinearGradient(gx1, gy1, gx2, gy2)
      grad.addColorStop(0, shades[0])
      grad.addColorStop(0.3, shades[1])
      grad.addColorStop(0.7, shades[2])
      grad.addColorStop(1, shades[0])

      ctx.fillStyle = grad
      ctx.fill()

      // Sharp thin edge highlight (top-left facet edge = specular)
      ctx.beginPath()
      ctx.moveTo(cx + hw * 0.5, cy)
      ctx.lineTo(cx + hw, cy + hh * 0.5)
      ctx.strokeStyle = 'rgba(255,255,255,0.5)'
      ctx.lineWidth = 0.8
      ctx.stroke()

      // Dark gap between diamonds
      ctx.beginPath()
      ctx.moveTo(cx + hw * 0.5, cy)
      ctx.lineTo(cx + hw, cy + hh * 0.5)
      ctx.lineTo(cx + hw * 0.5, cy + hh)
      ctx.lineTo(cx, cy + hh * 0.5)
      ctx.closePath()
      ctx.strokeStyle = 'rgba(0,0,0,0.8)'
      ctx.lineWidth = 1.2
      ctx.stroke()
    }
  }

  // Bright specular highlights scattered randomly
  const numHighlights = 60
  for (let i = 0; i < numHighlights; i++) {
    const hx = Math.random() * size
    const hy = Math.random() * size
    const hr = Math.random() * 3 + 1
    const glow = ctx.createRadialGradient(hx, hy, 0, hx, hy, hr * 4)
    glow.addColorStop(0, 'rgba(255,255,255,0.9)')
    glow.addColorStop(0.4, 'rgba(200,230,255,0.3)')
    glow.addColorStop(1, 'rgba(0,0,0,0)')
    ctx.fillStyle = glow
    ctx.beginPath()
    ctx.arc(hx, hy, hr * 4, 0, Math.PI * 2)
    ctx.fill()
  }

  // Center hole mask (the CD has a hole, this blocks texture there)
  const cx2 = size / 2
  const cy2 = size / 2

  // Slight vignette to darken edges
  const vignette = ctx.createRadialGradient(cx2, cy2, size * 0.25, cx2, cy2, size * 0.7)
  vignette.addColorStop(0, 'rgba(0,0,0,0)')
  vignette.addColorStop(1, 'rgba(0,0,20,0.4)')
  ctx.fillStyle = vignette
  ctx.fillRect(0, 0, size, size)

  const tex = new THREE.CanvasTexture(canvas)
  tex.colorSpace = THREE.SRGBColorSpace
  tex.needsUpdate = true
  return tex
}

// ─── Component ───────────────────────────────────────────────────────────────
export default function CDMesh() {
  const groupRef = useRef<THREE.Group>(null)
  const { rotation, setIsDragging, setRotation } = useCDStore()

  const [hovered, setHovered] = useState(false)
  const pointerDown = useRef(false)
  const previousPointer = useRef({ x: 0, y: 0 })
  const velocity = useRef({ x: 0, y: 0 })

  // Build the diamond texture once on the client
  const diamondTex = useMemo(() => {
    if (typeof window === 'undefined') return null
    return buildDiamondTexture(1024)
  }, [])

  // ── Geometry: proper CD shape ──
  // A CD is a thin flat disk 120mm diameter, 5mm center hole label area, 1.2mm thick
  // We use CylinderGeometry (very thin) + subtract inner hole via ringGeometry approach
  // Best approach: two disk meshes (front face, back face) + a thin cylinder rim
  // Front = CircleGeometry with inner radius (annular via ShapeGeometry)
  const cdShape = useMemo(() => {
    const shape = new THREE.Shape()
    const outerR = 2.5
    shape.absarc(0, 0, outerR, 0, Math.PI * 2, false)

    const hole = new THREE.Path()
    hole.absarc(0, 0, 0.22, 0, Math.PI * 2, true) // ~9mm center hole
    shape.holes.push(hole)

    return shape
  }, [])

  const cdGeometry = useMemo(() => new THREE.ShapeGeometry(cdShape, 128), [cdShape])

  // ── Materials ──
  const frontMaterial = useMemo(() => {
    if (!diamondTex) return new THREE.MeshStandardMaterial({ color: '#333' })
    return new THREE.MeshStandardMaterial({
      map: diamondTex,
      roughness: 0.15,
      metalness: 0.2,
      side: THREE.FrontSide,
    })
  }, [diamondTex])

  // Back: hyper-realistic iridescent CD underside
  // Real CD back = silver metallic with rainbow iridescence + mirror sheen
  const backMaterial = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: '#888888',
    metalness: 1.0,
    roughness: 0.05,
    iridescence: 1.0,
    iridescenceIOR: 1.8,
    iridescenceThicknessRange: [80, 500],
    clearcoat: 1.0,
    clearcoatRoughness: 0.02,
    reflectivity: 1.0,
    side: THREE.BackSide,
  }), [])

  // Rim (thin cylinder edge)
  const rimMaterial = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: '#cccccc',
    metalness: 0.95,
    roughness: 0.1,
    clearcoat: 1.0,
    side: THREE.DoubleSide,
  }), [])

  // Hub label ring (the translucent center label area)
  const hubMaterial = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: '#ffffff',
    transparent: true,
    opacity: 0.15,
    roughness: 0.2,
    metalness: 0.1,
    transmission: 0.8,
    thickness: 0.5,
    side: THREE.DoubleSide,
  }), [])

  useFrame((state) => {
    if (!groupRef.current) return
    const t = state.clock.elapsedTime

    if (pointerDown.current) {
      groupRef.current.rotation.x = rotation.x
      groupRef.current.rotation.y = rotation.y
    } else {
      velocity.current.x *= 0.96
      velocity.current.y *= 0.96

      if (Math.abs(velocity.current.x) < 0.0005 && Math.abs(velocity.current.y) < 0.0005) {
        velocity.current.y = 0.003 // slow auto-spin
      }

      groupRef.current.rotation.x += velocity.current.x
      groupRef.current.rotation.y += velocity.current.y
      setRotation({ x: groupRef.current.rotation.x, y: groupRef.current.rotation.y })
    }

    // Gentle float
    groupRef.current.position.y = Math.sin(t * 0.8) * 0.12

    // Subtle scale breathe
    const s = hovered ? 1.04 : 1.0
    const cs = groupRef.current.scale.x
    groupRef.current.scale.setScalar(cs + (s - cs) * 0.08)
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
    velocity.current = { x: dy * f * 0.15, y: dx * f * 0.15 }
    setRotation({ x: rotation.x + dy * f, y: rotation.y + dx * f })
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

  // Circular text on the glass underside
  const labelStr = 'OWAH.WORLD'
  const labelChars = labelStr.split('')

  return (
    <group
      ref={groupRef}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerMove={handlePointerMove}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      onPointerLeave={handlePointerUp}
      rotation={[0.25, -0.4, 0]}
    >
      {/* Front face — diamond WATTBA mosaic */}
      <mesh geometry={cdGeometry}>
        <primitive object={frontMaterial} attach="material" />
      </mesh>

      {/* Back face — mirror iridescent chrome */}
      <mesh geometry={cdGeometry}>
        <primitive object={backMaterial} attach="material" />
      </mesh>

      {/* Physical thickness — the rim */}
      <mesh>
        <cylinderGeometry args={[2.5, 2.5, 0.06, 128, 1, true]} />
        <primitive object={rimMaterial} attach="material" />
      </mesh>

      {/* Center hole rim */}
      <mesh>
        <cylinderGeometry args={[0.22, 0.22, 0.06, 64, 1, true]} />
        <primitive object={rimMaterial} attach="material" />
      </mesh>

      {/* Label area hub ring (translucent ring near center) */}
      <mesh>
        <ringGeometry args={[0.22, 0.55, 64]} />
        <primitive object={hubMaterial} attach="material" />
      </mesh>

      {/* Circular "OWAH.WORLD" label text on back face */}
      <group position={[0, 0, -0.04]} rotation={[Math.PI, 0, 0]}>
        {labelChars.map((char, i) => {
          const angle = (i / labelChars.length) * Math.PI * 2 - Math.PI / 2
          const r = 1.5
          return (
            <Text
              key={i}
              position={[Math.cos(angle) * r, Math.sin(angle) * r, 0]}
              rotation={[0, 0, angle + Math.PI / 2]}
              fontSize={0.22}
              color="#e8f4ff"
              anchorX="center"
              anchorY="middle"
              material-toneMapped={false}
              letterSpacing={0.05}
            >
              {char}
            </Text>
          )
        })}
      </group>
    </group>
  )
}
