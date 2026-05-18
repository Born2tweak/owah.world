'use client'

import { Canvas } from '@react-three/fiber'
import { Environment, ContactShadows, AccumulativeShadows, RandomizedLight } from '@react-three/drei'
import CDMesh from './CDMesh'
import ChromeEnvironment from './ChromeEnvironment'

export default function CDScene() {
  return (
    <div style={{ width: '100%', height: '100vh', position: 'absolute', inset: 0 }}>
      <Canvas
        camera={{ position: [0, 0, 7], fov: 42 }}
        gl={{ 
          antialias: true, 
          alpha: true,
          toneMapping: 3, // THREE.ACESFilmicToneMapping
          toneMappingExposure: 1.2,
        }}
        shadows
      >
        {/* 
          Lighting designed for two goals:
          1. Make the iridescent CD back look like a real mirror-CD (need strong directional)
          2. Make the diamond front sparkle (need point highlights from multiple angles)
        */}

        {/* Soft fill */}
        <ambientLight intensity={0.4} />

        {/* Main key — strong from upper-right to create dramatic shadow */}
        <directionalLight
          position={[6, 8, 4]}
          intensity={4}
          color="#ffffff"
          castShadow
        />

        {/* Rim light from left to catch CD edge iridescence */}
        <directionalLight
          position={[-6, 2, -2]}
          intensity={2.5}
          color="#cce8ff"
        />

        {/* Cool blue fill from below — like studio light bounced off a reflector */}
        <pointLight position={[0, -8, 3]} intensity={2} color="#aac8e8" />

        {/* Warm accent from back-right for depth separation */}
        <pointLight position={[8, 4, -6]} intensity={1.5} color="#ffeedd" />

        {/* Environment map — warehouse gives the best metallic reflections for CDs */}
        <Environment preset="warehouse" />

        <CDMesh />
        <ChromeEnvironment />

        <ContactShadows
          position={[0, -3.2, 0]}
          opacity={0.5}
          scale={14}
          blur={3}
          far={5}
          color="#000010"
        />
      </Canvas>
    </div>
  )
}
