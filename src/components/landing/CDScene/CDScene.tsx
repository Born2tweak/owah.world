'use client'

import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import { EffectComposer, Bloom, ChromaticAberration, Vignette } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import * as THREE from 'three'
import CDMesh from './CDMesh'
import LaserGrid from './LaserGrid'

// Hoisted — never allocated inside render or useFrame
const _caOffset = new THREE.Vector2(0.0006, 0.0006)

// ─── Crystal Shard ─────────────────────────────────────────────────────────────
// The environment is a crystalline artifact chamber — not chrome blades.
// Each shard is diamond-refractive, iridescent, semi-transparent.
// Geometry: octahedron (main diamond form), tetrahedron (fragment), dodecahedron (deep bg)

interface ShardProps {
  position: [number, number, number]
  rotation: [number, number, number]
  scale: [number, number, number]
  geo: 'oct' | 'tet' | 'dodec'
}

function CrystalShard({ position, rotation, scale, geo }: ShardProps) {
  return (
    <mesh position={position} rotation={rotation} scale={scale} castShadow>
      {geo === 'oct' && <octahedronGeometry args={[1, 0]} />}
      {geo === 'tet' && <tetrahedronGeometry args={[1, 0]} />}
      {geo === 'dodec' && <dodecahedronGeometry args={[1, 0]} />}
      <meshPhysicalMaterial
        color="#eef4ff"
        metalness={0.0}
        roughness={0.02}
        transmission={0.78}
        ior={2.42}
        thickness={1.6}
        iridescence={0.22}
        iridescenceIOR={1.5}
        iridescenceThicknessRange={[120, 360]}
        clearcoat={1.0}
        clearcoatRoughness={0.01}
        envMapIntensity={3.2}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

// ─── Crystal Field ─────────────────────────────────────────────────────────────
// Authored composition reading the reference image:
// - Dense at ALL frame edges — crystals bleed past the viewport boundary
// - Foreground crystals overlap the CD edges (in front of it, creating depth layers)
// - Multiple depth layers: z=+1 (extreme fore), z=-2 (near), z=-6 (mid), z=-10 (deep bg)
// - NOT symmetrical — more mass left-bottom-back, more negative space upper-right
// - Single useFrame for the entire field — 1 callback, not 22

function CrystalField() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!groupRef.current) return
    const t = state.clock.getElapsedTime()
    // The chamber breathes — imperceptible without a stillness reference point
    groupRef.current.rotation.y = Math.sin(t * 0.034) * 0.022
    groupRef.current.position.y = Math.sin(t * 0.052) * 0.028
  })

  return (
    <group ref={groupRef}>

      {/* ── EXTREME FOREGROUND (z +0.5 → +1.5) ──────────────────────────────
          These sit BETWEEN the camera and the CD.
          At camera z=4.5 these are at ~3.5 units from camera → appear massive.
          They partially clip out of frame — creating the "inside the crystal" feeling */}

      {/* Massive left foreground pillar */}
      <CrystalShard
        position={[-7.8, 2.2, 0.8]}
        rotation={[0.4, 0.9, 0.2]}
        scale={[2.6, 5.0, 2.4]}
        geo="oct"
      />
      {/* Massive right foreground form */}
      <CrystalShard
        position={[7.0, -2.8, 0.5]}
        rotation={[-0.3, -1.1, 0.5]}
        scale={[2.2, 4.2, 2.0]}
        geo="oct"
      />
      {/* Upper right foreground */}
      <CrystalShard
        position={[5.5, 5.5, 1.2]}
        rotation={[0.8, -0.6, -0.7]}
        scale={[1.8, 3.4, 1.6]}
        geo="oct"
      />
      {/* Lower left foreground */}
      <CrystalShard
        position={[-6.0, -5.2, 1.0]}
        rotation={[-0.7, 0.8, 0.6]}
        scale={[2.0, 3.8, 1.8]}
        geo="oct"
      />

      {/* ── NEAR MIDGROUND (z -1.5 → -4.5) ──────────────────────────────────
          The primary visible crystal architecture surrounding the CD */}

      {/* Left wing — heavy, anchoring */}
      <CrystalShard
        position={[-6.2, 1.2, -2.5]}
        rotation={[0.5, 1.3, -0.3]}
        scale={[1.8, 3.5, 1.6]}
        geo="oct"
      />
      <CrystalShard
        position={[-7.8, -1.2, -3.8]}
        rotation={[0.3, 1.8, 0.4]}
        scale={[1.5, 2.8, 1.3]}
        geo="tet"
      />
      <CrystalShard
        position={[-4.8, 3.8, -3.2]}
        rotation={[1.2, 0.5, 0.7]}
        scale={[1.2, 2.3, 1.1]}
        geo="oct"
      />

      {/* Right wing — counter-balance */}
      <CrystalShard
        position={[6.2, 1.8, -2.2]}
        rotation={[-0.4, -1.4, 0.5]}
        scale={[1.7, 3.2, 1.5]}
        geo="oct"
      />
      <CrystalShard
        position={[7.5, -0.5, -4.0]}
        rotation={[0.6, -2.0, -0.3]}
        scale={[1.4, 2.6, 1.3]}
        geo="oct"
      />
      <CrystalShard
        position={[5.0, -3.5, -2.0]}
        rotation={[-0.9, -0.6, -0.7]}
        scale={[1.3, 2.4, 1.2]}
        geo="tet"
      />

      {/* Top crown */}
      <CrystalShard
        position={[-1.8, 5.8, -3.2]}
        rotation={[0.9, 0.6, 0.4]}
        scale={[1.5, 2.8, 1.3]}
        geo="oct"
      />
      <CrystalShard
        position={[2.8, 5.2, -3.8]}
        rotation={[-0.7, -0.5, 0.8]}
        scale={[1.3, 2.4, 1.2]}
        geo="tet"
      />
      <CrystalShard
        position={[0.2, 7.0, -5.0]}
        rotation={[0.3, 1.1, -0.4]}
        scale={[2.0, 3.6, 1.8]}
        geo="oct"
      />

      {/* Bottom floor crystals */}
      <CrystalShard
        position={[-2.8, -4.8, -2.8]}
        rotation={[-0.6, 0.9, 0.7]}
        scale={[1.6, 3.0, 1.4]}
        geo="oct"
      />
      <CrystalShard
        position={[2.2, -4.5, -3.2]}
        rotation={[0.8, -0.7, -0.5]}
        scale={[1.3, 2.4, 1.2]}
        geo="tet"
      />

      {/* Behind-CD mid (z=-3.5 to -4.5) — visible around CD edges */}
      <CrystalShard
        position={[-3.5, 1.5, -4.2]}
        rotation={[0.4, 0.7, 0.3]}
        scale={[1.4, 2.6, 1.2]}
        geo="oct"
      />
      <CrystalShard
        position={[3.2, -1.0, -4.0]}
        rotation={[-0.3, -0.9, 0.4]}
        scale={[1.2, 2.2, 1.1]}
        geo="tet"
      />

      {/* ── DEEP BACKGROUND (z -6 → -12) ────────────────────────────────────
          Large forms, fog reduces them to silhouettes — creates infinite depth */}

      <CrystalShard
        position={[-5.0, 2.5, -7.5]}
        rotation={[0.3, 0.7, 0.2]}
        scale={[2.8, 5.2, 2.5]}
        geo="dodec"
      />
      <CrystalShard
        position={[5.5, 0.5, -9.0]}
        rotation={[-0.2, -1.0, 0.4]}
        scale={[2.4, 4.5, 2.2]}
        geo="oct"
      />
      <CrystalShard
        position={[0.0, 4.0, -11.0]}
        rotation={[0.5, 1.3, -0.3]}
        scale={[3.2, 6.0, 3.0]}
        geo="dodec"
      />
      <CrystalShard
        position={[-4.0, -2.5, -6.5]}
        rotation={[0.4, 0.5, 0.6]}
        scale={[2.0, 3.8, 1.8]}
        geo="oct"
      />
      <CrystalShard
        position={[4.5, 3.5, -7.0]}
        rotation={[-0.3, -0.8, 0.3]}
        scale={[1.8, 3.4, 1.6]}
        geo="tet"
      />

      {/* ── MICRO FRAGMENTS (detail layer, near midground) ────────────────── */}

      <CrystalShard
        position={[-3.8, -1.8, -1.2]}
        rotation={[2.1, 0.9, 1.6]}
        scale={[0.45, 0.85, 0.42]}
        geo="tet"
      />
      <CrystalShard
        position={[3.5, 1.8, -1.5]}
        rotation={[1.6, -1.3, 0.9]}
        scale={[0.52, 0.95, 0.48]}
        geo="tet"
      />
      <CrystalShard
        position={[-1.8, -3.2, -0.9]}
        rotation={[0.9, 2.2, 1.3]}
        scale={[0.38, 0.72, 0.35]}
        geo="tet"
      />
      <CrystalShard
        position={[1.5, 3.8, -1.8]}
        rotation={[1.9, 0.6, -1.0]}
        scale={[0.48, 0.88, 0.44]}
        geo="tet"
      />
      <CrystalShard
        position={[-5.5, -2.5, -1.5]}
        rotation={[0.5, 1.8, 0.9]}
        scale={[0.6, 1.1, 0.55]}
        geo="tet"
      />
      <CrystalShard
        position={[4.8, 2.8, -1.8]}
        rotation={[-1.2, 0.4, 1.5]}
        scale={[0.55, 1.0, 0.5]}
        geo="tet"
      />
    </group>
  )
}

// ─── Artifact Floor ────────────────────────────────────────────────────────────
// The sacred chamber's ground plane — deep black mirror.
// Relies on environment map for reflections (no extra render pass).
function ArtifactFloor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -4.0, 0]} receiveShadow>
      <planeGeometry args={[80, 80]} />
      <meshPhysicalMaterial
        color="#010306"
        metalness={0.98}
        roughness={0.14}
        envMapIntensity={2.5}
      />
    </mesh>
  )
}

// ─── Scene ─────────────────────────────────────────────────────────────────────
export default function CDScene() {
  return (
    <div style={{ width: '100%', height: '100vh', position: 'absolute', inset: 0, background: '#010204' }}>
      <Canvas
        camera={{ position: [0, 0.2, 4.5], fov: 45, near: 0.1, far: 80 }}
        gl={{
          antialias: false,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 0.88,
        }}
        dpr={[1, 1.5]}
        shadows
      >
        <color attach="background" args={['#010204']} />
        {/* Fog starts far — let the crystal world be fully visible, only deep bg dissolves */}
        <fog attach="fog" args={['#010204', 20, 45]} />

        {/* Studio environment: gives every crystal face a sharp, commercial-quality reflection */}
        <Environment preset="studio" background={false} />

        {/* ─── LIGHTING ───────────────────────────────────────────────────────
            Reference reads: massive hot-white glare at top-left of CD.
            This is the god-ray that makes the scene feel divine and expensive. */}

        {/* KEY: Hot white overhead-left — the primary glare source matching reference */}
        <spotLight
          position={[-5, 16, 7]}
          intensity={32}
          angle={0.10}
          penumbra={0.72}
          color="#f8fbff"
          castShadow
          shadow-bias={-0.0001}
          shadow-mapSize={[1024, 1024]}
        />

        {/* SECONDARY FILL: Front-right — illuminates CD face and right crystal cluster */}
        <spotLight
          position={[5, 9, 10]}
          intensity={12}
          angle={0.22}
          penumbra={0.95}
          color="#e8f2ff"
        />

        {/* COLD RIM: From deep behind-right — silhouette separation against the void */}
        <spotLight
          position={[10, -6, -9]}
          intensity={11}
          angle={0.5}
          penumbra={1.0}
          color="#1e3ba8"
        />

        {/* LASER ATMOSPHERE: Teal bounce from the floor grid — creates environmental color */}
        <pointLight
          position={[0, -3.0, 0]}
          intensity={9}
          color="#00ddb8"
          distance={22}
          decay={1.8}
        />

        {/* TEAL CROSS: Second teal source at eye level — illuminates side crystal faces */}
        <pointLight
          position={[-4.0, 0.5, 2.0]}
          intensity={4}
          color="#00b8a0"
          distance={14}
          decay={2}
        />

        {/* FILL: Minimal ambient — shadows stay deep, high contrast maintained */}
        <ambientLight intensity={0.14} color="#5868a0" />

        {/* ─── WORLD ──────────────────────────────────────────────────────── */}
        <CrystalField />
        <ArtifactFloor />
        <LaserGrid />
        <CDMesh />

        {/* ─── POSTPROCESSING ─────────────────────────────────────────────────
            Philosophy: restrained luxury. Every effect has a precise purpose.
            Bloom: crystal specular highlights + CD glare only — not a glow haze.
            CA: physical glass lens character — barely perceptible.
            Vignette: compresses the eye toward the sacred center artifact. */}
        <EffectComposer enableNormalPass={false} multisampling={0}>
          <Bloom
            luminanceThreshold={0.86}
            luminanceSmoothing={0.06}
            intensity={0.55}
            mipmapBlur
          />
          <ChromaticAberration
            blendFunction={BlendFunction.NORMAL}
            offset={_caOffset}
          />
          <Vignette eskil={false} offset={0.12} darkness={1.35} />
        </EffectComposer>
      </Canvas>
    </div>
  )
}
