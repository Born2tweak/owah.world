'use client'

import { Suspense, useRef, useState, useEffect, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import type { ThreeEvent } from '@react-three/fiber'
import * as THREE from 'three'
import { useCDStore } from '@/lib/stores/cd.store'

const _lerpTarget = new THREE.Vector3()
const LABEL_SIZE = 2048

// Creates the physical label texture: large arc title + track rings + hub inscription
function buildLabelTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = LABEL_SIZE
  canvas.height = LABEL_SIZE
  const ctx = canvas.getContext('2d')!
  const cx = LABEL_SIZE / 2
  const cy = LABEL_SIZE / 2
  const discR = LABEL_SIZE * 0.499

  ctx.clearRect(0, 0, LABEL_SIZE, LABEL_SIZE)

  // ─── Data track separation rings (fine machined lines) ──────────────────
  // 28 concentric rings across the data zone, like the visible track bands on a CD
  const ringInR = discR * 0.365
  const ringOutR = discR * 0.955
  for (let i = 0; i <= 28; i++) {
    const r = ringInR + (ringOutR - ringInR) * (i / 28)
    ctx.strokeStyle = `rgba(255, 255, 255, ${i % 4 === 0 ? 0.22 : 0.08})`
    ctx.lineWidth = i % 4 === 0 ? 1.5 : 0.6
    ctx.beginPath()
    ctx.arc(cx, cy, r, 0, Math.PI * 2)
    ctx.stroke()
  }

  // ─── Large arc title: OWAH • WORLD ──────────────────────────────────────
  // Spans ~220° across the upper portion of the disc, matching the reference
  const titleText = 'OWAH  •  WORLD'
  const titleR = discR * 0.800
  const titleArc = Math.PI * 1.22
  const titleStart = -Math.PI / 2 - titleArc / 2

  ctx.font = `700 ${Math.round(LABEL_SIZE * 0.072)}px Syncopate, "Space Grotesk", "Helvetica Neue", Arial, sans-serif`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'

  const charWidths: number[] = []
  let totalW = 0
  for (const ch of titleText) {
    const w = ctx.measureText(ch).width
    charWidths.push(w)
    totalW += w
  }

  const arcLen = 2 * Math.PI * titleR * (titleArc / (2 * Math.PI))
  const wScale = arcLen / totalW
  let curAngle = titleStart

  for (let i = 0; i < titleText.length; i++) {
    const charArc = (charWidths[i] * wScale) / titleR
    const midAngle = curAngle + charArc / 2

    ctx.save()
    ctx.translate(
      cx + Math.cos(midAngle) * titleR,
      cy + Math.sin(midAngle) * titleR,
    )
    ctx.rotate(midAngle + Math.PI / 2)
    ctx.shadowColor = 'rgba(0, 0, 0, 0.75)'
    ctx.shadowBlur = 12
    ctx.fillStyle = 'rgba(255, 255, 255, 0.96)'
    ctx.fillText(titleText[i], 0, 0)
    ctx.restore()

    curAngle += charArc
  }

  // ─── Mid-radius inscription ring ──────────────────────────────────────────
  const midText = 'OWAH.WORLD  •  SYSTEM v1.0  •  LIVING DIGITAL WORLD  •  '
  const midR = discR * 0.620
  ctx.font = `400 ${Math.round(LABEL_SIZE * 0.0175)}px "Courier New", Courier, monospace`
  ctx.fillStyle = 'rgba(255, 255, 255, 0.52)'
  for (let i = 0; i < midText.length; i++) {
    const angle = (i / midText.length) * Math.PI * 2 - Math.PI / 2
    ctx.save()
    ctx.translate(cx + Math.cos(angle) * midR, cy + Math.sin(angle) * midR)
    ctx.rotate(angle + Math.PI / 2)
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(midText[i], 0, 0)
    ctx.restore()
  }

  // ─── Hub ring inscription ─────────────────────────────────────────────────
  const hubText = 'OWAH.WORLD   —   ℗ 2024   —   '
  const hubR = discR * 0.388
  ctx.font = `400 ${Math.round(LABEL_SIZE * 0.0135)}px "Courier New", Courier, monospace`
  ctx.fillStyle = 'rgba(255, 255, 255, 0.30)'
  for (let i = 0; i < hubText.length; i++) {
    const angle = (i / hubText.length) * Math.PI * 2 - Math.PI / 2
    ctx.save()
    ctx.translate(cx + Math.cos(angle) * hubR, cy + Math.sin(angle) * hubR)
    ctx.rotate(angle + Math.PI / 2)
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(hubText[i], 0, 0)
    ctx.restore()
  }

  const tex = new THREE.CanvasTexture(canvas)
  tex.needsUpdate = true
  return tex
}

function CDMeshInner() {
  const groupRef = useRef<THREE.Group>(null)
  const { setIsDragging } = useCDStore()

  const texture = useTexture('/textures/wattba.png', (tex) => {
    tex.colorSpace = THREE.SRGBColorSpace
  })

  const [labelTex, setLabelTex] = useState<THREE.CanvasTexture | null>(null)

  useEffect(() => {
    // Wait for fonts so Syne renders correctly in canvas
    document.fonts.ready.then(() => setLabelTex(buildLabelTexture()))
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

  // Normalized bounding-box UVs so the WATTBA texture maps squarely to the disc
  const cdGeometry = useMemo(() => {
    const geo = new THREE.ShapeGeometry(cdShape, 128)
    geo.computeBoundingBox()
    const uv  = geo.attributes.uv as THREE.BufferAttribute
    const pos = geo.attributes.position as THREE.BufferAttribute
    const minX  = geo.boundingBox!.min.x
    const minY  = geo.boundingBox!.min.y
    const rangeX = geo.boundingBox!.max.x - minX
    const rangeY = geo.boundingBox!.max.y - minY
    for (let i = 0; i < uv.count; i++) {
      uv.setXY(i, (pos.getX(i) - minX) / rangeX, (pos.getY(i) - minY) / rangeY)
    }
    uv.needsUpdate = true
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
      velocity.current.x *= 0.97
      velocity.current.y *= 0.97

      if (Math.abs(velocity.current.y) < 0.0008) {
        velocity.current.y = 0.0015
      }

      groupRef.current.rotation.y += velocity.current.y
      // Gentle sacred float: slow tilt oscillation
      groupRef.current.rotation.x = Math.sin(elapsed * 0.38) * 0.055 + 0.12

      localRotation.current.x = groupRef.current.rotation.x
      localRotation.current.y = groupRef.current.rotation.y

      const targetScale = hovered ? 1.01 : 1.0
      _lerpTarget.set(targetScale, targetScale, targetScale)
      groupRef.current.scale.lerp(_lerpTarget, 0.08)
    }

    groupRef.current.position.y = Math.sin(elapsed * 0.75) * 0.055
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
      {/* ─── Front face: polycarbonate with transmitted diamond environment ── */}
      {/* WATTBA diamond texture tints what passes through — matching the       */}
      {/* reference where you see the crystal background through the disc.      */}
      <mesh geometry={cdGeometry}>
        <meshPhysicalMaterial
          map={texture}
          transmission={0.58}
          ior={1.585}
          thickness={0.06}
          roughness={0.04}
          metalness={0}
          iridescence={0.85}
          iridescenceIOR={1.38}
          iridescenceThicknessRange={[160, 520]}
          envMapIntensity={2.2}
          clearcoat={1.0}
          clearcoatRoughness={0.014}
          side={THREE.FrontSide}
        />
      </mesh>

      {/* ─── Label overlay: arced OWAH•WORLD title + track rings ─────────── */}
      {labelTex && (
        <mesh geometry={cdGeometry}>
          <meshPhysicalMaterial
            map={labelTex}
            transparent={true}
            metalness={0.25}
            roughness={0.25}
            clearcoat={1.0}
            clearcoatRoughness={0.015}
            envMapIntensity={0.8}
            side={THREE.FrontSide}
            depthWrite={false}
            polygonOffset={true}
            polygonOffsetFactor={-2}
          />
        </mesh>
      )}

      {/* ─── Data track shimmer ring ──────────────────────────────────────── */}
      {/* r = 0.9→2.35 = the data zone of a physical CD. Intense iridescence  */}
      {/* with ultra-low roughness produces the rainbow diffraction band.      */}
      <mesh>
        <ringGeometry args={[0.9, 2.35, 256]} />
        <meshPhysicalMaterial
          color="#c0d0e8"
          roughness={0.012}
          metalness={0}
          iridescence={1.0}
          iridescenceIOR={1.42}
          iridescenceThicknessRange={[100, 780]}
          envMapIntensity={1.8}
          clearcoat={1.0}
          clearcoatRoughness={0.006}
          transparent={true}
          opacity={0.30}
          side={THREE.FrontSide}
          depthWrite={false}
          polygonOffset={true}
          polygonOffsetFactor={-3}
        />
      </mesh>

      {/* ─── Back face: iridescent chrome polycarbonate ───────────────────── */}
      <mesh geometry={cdGeometry}>
        <meshPhysicalMaterial
          color="#909090"
          metalness={0.98}
          roughness={0.032}
          iridescence={0.92}
          iridescenceIOR={1.85}
          iridescenceThicknessRange={[120, 700]}
          clearcoat={1.0}
          clearcoatRoughness={0.012}
          reflectivity={1.0}
          envMapIntensity={3.0}
          side={THREE.BackSide}
        />
      </mesh>

      {/* ─── Outer rim: mirror-smooth machined polycarbonate edge ─────────── */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[2.5, 2.5, 0.04, 256, 1, true]} />
        <meshPhysicalMaterial
          color="#b0b8c4"
          metalness={0.95}
          roughness={0.04}
          clearcoat={1.0}
          clearcoatRoughness={0.02}
          envMapIntensity={3.0}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* ─── Inner hole rim ───────────────────────────────────────────────── */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.22, 0.22, 0.04, 128, 1, true]} />
        <meshPhysicalMaterial
          color="#30303a"
          metalness={0.92}
          roughness={0.10}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* ─── Hub ring: dark brushed machined metal ────────────────────────── */}
      <mesh>
        <ringGeometry args={[0.22, 0.58, 128]} />
        <meshPhysicalMaterial
          color="#0e1218"
          metalness={0.96}
          roughness={0.20}
          envMapIntensity={1.8}
          clearcoat={0.25}
          clearcoatRoughness={0.12}
          side={THREE.FrontSide}
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
