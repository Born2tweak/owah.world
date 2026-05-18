'use client'

import { Canvas } from '@react-three/fiber'
import { Environment, ContactShadows } from '@react-three/drei'
import CDMesh from './CDMesh'
import ChromeEnvironment from './ChromeEnvironment'

export default function CDScene() {
  return (
    <div style={{ width: '100%', height: '100vh', position: 'absolute', inset: 0 }}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={2} />
        <spotLight position={[10, 10, 10]} angle={0.2} penumbra={0.5} intensity={4} color="#ffffff" />
        <pointLight position={[-10, -10, -10]} intensity={2} color="#00ff88" />
        <directionalLight position={[0, 5, 5]} intensity={3} />
        
        {/* Environment map for realistic reflections on the CD */}
        <Environment preset="studio" />
        
        <CDMesh />
        <ChromeEnvironment />
        
        <ContactShadows 
          position={[0, -2.9, 0]} 
          opacity={0.6} 
          scale={20} 
          blur={2.5} 
          far={4.5} 
          color="#000000"
        />
      </Canvas>
    </div>
  )
}
