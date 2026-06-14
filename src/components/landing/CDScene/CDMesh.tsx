'use client'

import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import type { ThreeEvent } from '@react-three/fiber'
import * as THREE from 'three'
import { useCDStore } from '@/lib/stores/cd.store'

const _lerpTarget = new THREE.Vector3()

/**
 * Engraved circular inscription. Layout / placement / sizing preserved;
 * only the font treatment is upgraded (Syncopate, engraved teal-silver).
 */
function createVinylTextTexture(fontFamily: string) {
  const size = 1024
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')!
  const cx = size / 2
  const cy = size / 2
  const radius = size * 0.39
  const text = 'O W A H . W O R L D   SYSTEM V1.0   LIVING DIGITAL WORLD   '

  ctx.clearRect(0, 0, size, size)
  ctx.font = `700 27px ${fontFamily}`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'

  for (let i = 0; i < text.length; i++) {
    const angle = (i / text.length) * Math.PI * 2 - Math.PI / 2
    ctx.save()
    ctx.translate(cx + Math.cos(angle) * radius, cy + Math.sin(angle) * radius)
    ctx.rotate(angle + Math.PI / 2)

    // engraved: dark recessed stroke, pale-silver face, faint top catch-light
    ctx.strokeStyle = 'rgba(0, 10, 20, 0.9)'
    ctx.lineWidth = 5
    ctx.strokeText(text[i], 0, 0.7)
    ctx.fillStyle = 'rgba(214, 236, 244, 0.94)'
    ctx.fillText(text[i], 0, 0)
    ctx.fillStyle = 'rgba(150, 224, 232, 0.32)'
    ctx.fillText(text[i], 0, -0.6)

    ctx.restore()
  }

  ctx.strokeStyle = 'rgba(180, 232, 240, 0.22)'
  ctx.lineWidth = 1
  for (let i = 0; i < 4; i++) {
    ctx.beginPath()
    ctx.arc(cx, cy, radius - 24 - i * 5, 0, Math.PI * 2)
    ctx.stroke()
  }

  return new THREE.CanvasTexture(canvas)
}

/** Resolve the app's loaded display family (Syncopate) for canvas use. */
function resolveTitleFont(): string {
  if (typeof window === 'undefined') return '"Arial", sans-serif'
  const probe = document.createElement('span')
  probe.style.cssText = 'position:absolute;visibility:hidden;font-family:var(--font-title)'
  document.body.appendChild(probe)
  const fam = getComputedStyle(probe).fontFamily
  document.body.removeChild(probe)
  return fam || '"Arial", sans-serif'
}

function createHologramTexture() {
  const size = 1024
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')!
  const cx = size / 2
  const cy = size / 2

  ctx.clearRect(0, 0, size, size)
  ctx.globalCompositeOperation = 'lighter'

  for (let i = 0; i < 22; i++) {
    const angle = (i / 22) * Math.PI * 2
    const grad = ctx.createLinearGradient(
      cx,
      cy,
      cx + Math.cos(angle) * size * 0.52,
      cy + Math.sin(angle) * size * 0.52
    )
    grad.addColorStop(0, 'rgba(255,255,255,0)')
    grad.addColorStop(0.34, i % 3 === 0 ? 'rgba(0,255,240,0.15)' : 'rgba(95,150,255,0.12)')
    grad.addColorStop(0.62, i % 3 === 1 ? 'rgba(255,205,80,0.13)' : 'rgba(255,74,220,0.11)')
    grad.addColorStop(1, 'rgba(255,255,255,0)')
    ctx.fillStyle = grad
    ctx.beginPath()
    ctx.moveTo(cx, cy)
    ctx.arc(cx, cy, size * 0.49, angle - 0.05, angle + 0.08)
    ctx.closePath()
    ctx.fill()
  }

  for (let r = 0.18; r <= 0.48; r += 0.045) {
    ctx.beginPath()
    ctx.arc(cx, cy, size * r, 0, Math.PI * 2)
    ctx.strokeStyle = 'rgba(210,245,255,0.10)'
    ctx.lineWidth = 2
    ctx.stroke()
  }

  const flare = ctx.createRadialGradient(size * 0.27, size * 0.25, 0, size * 0.27, size * 0.25, size * 0.34)
  flare.addColorStop(0, 'rgba(255,255,255,0.32)')
  flare.addColorStop(0.28, 'rgba(80,210,255,0.16)')
  flare.addColorStop(1, 'rgba(255,255,255,0)')
  ctx.fillStyle = flare
  ctx.fillRect(0, 0, size, size)

  return new THREE.CanvasTexture(canvas)
}

function createFacetTexture() {
  const size = 1024
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')!
  const cx = size / 2
  const cy = size / 2

  ctx.clearRect(0, 0, size, size)
  ctx.globalCompositeOperation = 'lighter'

  for (let i = 0; i < 96; i++) {
    const a = (i / 96) * Math.PI * 2
    const next = ((i + 1.35) / 96) * Math.PI * 2
    const inner = size * (0.16 + (i % 5) * 0.035)
    const outer = size * (0.38 + (i % 7) * 0.018)
    const tone = i % 4

    ctx.beginPath()
    ctx.moveTo(cx + Math.cos(a) * inner, cy + Math.sin(a) * inner)
    ctx.lineTo(cx + Math.cos(next) * outer, cy + Math.sin(next) * outer)
    ctx.lineTo(cx + Math.cos(a + 0.12) * outer, cy + Math.sin(a + 0.12) * outer)
    ctx.closePath()
    ctx.fillStyle = [
      'rgba(230,248,255,0.09)',
      'rgba(74,214,255,0.07)',
      'rgba(255,205,96,0.055)',
      'rgba(195,90,255,0.065)',
    ][tone]
    ctx.fill()
  }

  for (let i = 0; i < 42; i++) {
    const a = (i / 42) * Math.PI * 2
    const r = size * (0.22 + (i % 6) * 0.045)
    const w = size * (0.05 + (i % 4) * 0.015)
    const h = size * (0.035 + (i % 5) * 0.012)

    ctx.save()
    ctx.translate(cx + Math.cos(a) * r, cy + Math.sin(a) * r)
    ctx.rotate(a + (i % 3) * 0.55)
    const grad = ctx.createLinearGradient(-w, -h, w, h)
    grad.addColorStop(0, 'rgba(255,255,255,0.02)')
    grad.addColorStop(0.45, 'rgba(218,244,255,0.16)')
    grad.addColorStop(1, 'rgba(22,42,62,0.02)')
    ctx.fillStyle = grad
    ctx.beginPath()
    ctx.moveTo(0, -h)
    ctx.lineTo(w, 0)
    ctx.lineTo(0, h)
    ctx.lineTo(-w, 0)
    ctx.closePath()
    ctx.fill()
    ctx.restore()
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
  const hologramTex = useMemo(() => createHologramTexture(), [])
  const facetTex = useMemo(() => createFacetTexture(), [])

  useEffect(() => {
    let alive = true
    const family = resolveTitleFont()
    const build = () => {
      if (!alive) return
      const tex = createVinylTextTexture(family)
      setVinylTex((prev) => {
        if (prev) prev.dispose()
        return tex
      })
    }
    build()
    // re-render once the webfont (Syncopate) has actually loaded
    document.fonts?.ready?.then(build)
    return () => {
      alive = false
    }
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
        velocity.current.y = 0.002
      }

      groupRef.current.rotation.y += velocity.current.y
      groupRef.current.rotation.x = Math.sin(elapsed * 0.5) * 0.05 + 0.1

      localRotation.current.x = groupRef.current.rotation.x
      localRotation.current.y = groupRef.current.rotation.y

      const targetScale = hovered ? 1.01 : 1
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
      <mesh geometry={cdGeometry}>
        <meshBasicMaterial
          map={texture}
          color="#9fb7c9"
          toneMapped={false}
          side={THREE.FrontSide}
        />
      </mesh>

      <mesh geometry={cdGeometry} position={[0, 0, 0.002]} renderOrder={2}>
        <meshBasicMaterial
          map={facetTex}
          transparent
          opacity={0.58}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          side={THREE.FrontSide}
        />
      </mesh>

      <mesh geometry={cdGeometry} position={[0, 0, 0.004]} renderOrder={3}>
        {hologramTex && (
          <meshBasicMaterial
            map={hologramTex}
            transparent
            opacity={0.34}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
            side={THREE.FrontSide}
          />
        )}
      </mesh>

      <mesh geometry={cdGeometry} position={[0, 0, 0.006]} renderOrder={4}>
        {vinylTex && (
          <meshBasicMaterial
            map={vinylTex}
            transparent
            opacity={0.92}
            side={THREE.FrontSide}
            depthWrite={false}
            polygonOffset
            polygonOffsetFactor={-1}
          />
        )}
      </mesh>

      <mesh geometry={cdGeometry} renderOrder={0}>
        <meshPhysicalMaterial
          color="#888888"
          metalness={1}
          roughness={0.05}
          iridescence={1}
          iridescenceIOR={2}
          iridescenceThicknessRange={[80, 500]}
          clearcoat={1}
          clearcoatRoughness={0.02}
          reflectivity={1}
          envMapIntensity={3}
          side={THREE.BackSide}
        />
      </mesh>

      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[2.5, 2.5, 0.04, 128, 1, true]} />
        <meshPhysicalMaterial color="#d8edf8" metalness={0.95} roughness={0.16} envMapIntensity={2.4} clearcoat={1} side={THREE.DoubleSide} />
      </mesh>

      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.22, 0.22, 0.04, 64, 1, true]} />
        <meshPhysicalMaterial color="#8ea0b4" metalness={0.9} roughness={0.34} envMapIntensity={1.5} side={THREE.DoubleSide} />
      </mesh>

      <mesh>
        <ringGeometry args={[0.22, 0.55, 64]} />
        <meshPhysicalMaterial color="#101722" metalness={0.95} roughness={0.28} envMapIntensity={1.9} clearcoat={0.4} side={THREE.DoubleSide} />
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
