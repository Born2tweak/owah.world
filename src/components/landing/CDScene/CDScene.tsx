'use client'

import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import { EffectComposer, Bloom, ChromaticAberration, Vignette } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import * as THREE from 'three'
import CDMesh from './CDMesh'

// ─── Art-Directed Chrome Monoliths ──────────────────────────────────────────
// Replaces random procedural scattering with intentional, architectural framing.
function Monolith({ position, rotation, scale, material }: any) {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (!meshRef.current) return
    // Very subtle, heavy, slow drifting — feeling of massive weight, not floating pebbles
    const t = state.clock.getElapsedTime()
    meshRef.current.position.y = position[1] + Math.sin(t * 0.2 + position[0]) * 0.2
    meshRef.current.rotation.z = rotation[2] + Math.sin(t * 0.1) * 0.02
  })

  return (
    <mesh ref={meshRef} position={position} rotation={rotation} scale={scale} castShadow receiveShadow>
      {/* A tetrahedron or flattened cylinder gives a sharp, blade-like architectural feel */}
      <cylinderGeometry args={[0, 1, 4, 3]} />
      <primitive object={material} />
    </mesh>
  )
}

function ArchitecturalFraming() {
  // Shared luxury chrome/glass material for the monoliths
  const monolithMaterial = new THREE.MeshPhysicalMaterial({
    color: '#060a10', // Deep cold shadow base
    metalness: 1.0,
    roughness: 0.12,  // Sharp but slightly diffused reflections
    clearcoat: 1.0,
    clearcoatRoughness: 0.05,
    envMapIntensity: 2.0,
  })

  return (
    <group>
      {/* Background Left: Massive supporting monolith */}
      <Monolith 
        position={[-8, 2, -12]} 
        rotation={[0.4, 0.2, 0.3]} 
        scale={[4, 18, 4]} 
        material={monolithMaterial} 
      />
      {/* Background Right: Counter-balance angled blade */}
      <Monolith 
        position={[9, -4, -15]} 
        rotation={[-0.2, -0.5, -0.6]} 
        scale={[3, 15, 3]} 
        material={monolithMaterial} 
      />
      
      {/* Midground Left: Pointing inward toward the CD */}
      <Monolith 
        position={[-5, -6, -5]} 
        rotation={[-0.8, 0.4, 0.5]} 
        scale={[1.5, 8, 1.5]} 
        material={monolithMaterial} 
      />
      
      {/* Foreground Right: Dramatic depth of field out-of-focus element */}
      <Monolith 
        position={[6, 5, -2]} 
        rotation={[2.1, 0.1, -0.4]} 
        scale={[1, 6, 1]} 
        material={monolithMaterial} 
      />

      {/* Deep Background: Atmospheric framing */}
      <Monolith 
        position={[0, 12, -20]} 
        rotation={[0, 0, 1.57]} 
        scale={[3, 30, 3]} 
        material={monolithMaterial} 
      />
    </group>
  )
}

// ─── Scene ────────────────────────────────────────────────────────────────────
export default function CDScene() {
  return (
    <div style={{ width: '100%', height: '100vh', position: 'absolute', inset: 0, background: '#010204' }}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 40 }}
        gl={{
          antialias: false, 
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.1, // Controlled contrast
        }}
        shadows
      >
        <color attach="background" args={['#010204']} />
        
        {/* Subtle atmospheric perspective, pushing background monoliths into deep shadow */}
        <fog attach="fog" args={['#010204', 10, 30]} />

        {/* Studio Environment for sharp, high-end commercial reflections */}
        <Environment preset="studio" />
        
        {/* Cinematic Lighting: Cold, intentional, high contrast */}
        {/* Cold ambient fill */}
        <ambientLight intensity={0.4} color="#a0b0d0" />
        
        {/* Single Strong Hero Glare (Key Light) */}
        <spotLight 
          position={[8, 12, 10]} 
          intensity={15} 
          angle={0.2} 
          penumbra={0.8} 
          color="#ffffff" 
          castShadow 
          shadow-bias={-0.0001}
        />
        
        {/* Subtle cold rim light to define silhouettes against the dark */}
        <spotLight 
          position={[-10, -10, -5]} 
          intensity={8} 
          angle={0.5} 
          penumbra={1} 
          color="#80a0ff" 
        />
        
        {/* Core Elements */}
        <ArchitecturalFraming />
        <CDMesh />

        {/* Post Processing: Restrained, sharp, expensive feeling */}
        <EffectComposer disableNormalPass multisampling={4}>
          <Bloom 
            luminanceThreshold={0.8} // Only brightest glares bloom
            luminanceSmoothing={0.1} 
            intensity={0.6} // Subdued, elegant glow
            mipmapBlur 
          />
          <ChromaticAberration 
            blendFunction={BlendFunction.NORMAL} 
            offset={new THREE.Vector2(0.0005, 0.0005)} // Micro-aberration for physical lens feel
          />
          {/* Vignette focuses the eye on the center artifact */}
          <Vignette eskil={false} offset={0.1} darkness={1.1} />
        </EffectComposer>
      </Canvas>
    </div>
  )
}
