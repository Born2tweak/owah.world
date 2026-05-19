'use client'

import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import { EffectComposer, Bloom, ChromaticAberration, Vignette } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import * as THREE from 'three'
import CDMesh from './CDMesh'

type Placement = {
  position: [number, number, number]
  rotation: [number, number, number]
  scale: [number, number, number]
}

const glassMaterial = new THREE.MeshPhysicalMaterial({
  color: '#a9d8ff',
  metalness: 0.35,
  roughness: 0.015,
  transmission: 0.48,
  thickness: 0.95,
  transparent: true,
  opacity: 0.52,
  clearcoat: 1,
  clearcoatRoughness: 0.01,
  envMapIntensity: 5.2,
  side: THREE.DoubleSide,
})

const chromeMaterial = new THREE.MeshPhysicalMaterial({
  color: '#dcecff',
  metalness: 1,
  roughness: 0.08,
  clearcoat: 1,
  clearcoatRoughness: 0.02,
  envMapIntensity: 3.4,
  side: THREE.DoubleSide,
})

const darkChromeMaterial = new THREE.MeshPhysicalMaterial({
  color: '#08111f',
  metalness: 1,
  roughness: 0.12,
  clearcoat: 1,
  clearcoatRoughness: 0.04,
  envMapIntensity: 2.7,
  side: THREE.DoubleSide,
})

function ChromeBlade({ position, rotation, scale }: Placement) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!meshRef.current) return
    const t = state.clock.getElapsedTime()
    meshRef.current.position.y = position[1] + Math.sin(t * 0.16 + position[0]) * 0.12
    meshRef.current.rotation.z = rotation[2] + Math.sin(t * 0.12 + position[2]) * 0.025
  })

  return (
    <mesh ref={meshRef} position={position} rotation={rotation} scale={scale} castShadow receiveShadow>
      <cylinderGeometry args={[0, 1, 4, 3]} />
      <primitive object={darkChromeMaterial} attach="material" />
    </mesh>
  )
}

function CrystalShard({ position, rotation, scale }: Placement) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!meshRef.current) return
    const t = state.clock.getElapsedTime()
    meshRef.current.rotation.y = rotation[1] + Math.sin(t * 0.18 + position[0]) * 0.05
  })

  return (
    <mesh ref={meshRef} position={position} rotation={rotation} scale={scale} castShadow receiveShadow>
      <octahedronGeometry args={[1, 0]} />
      <primitive object={glassMaterial} attach="material" />
    </mesh>
  )
}

function ChromeSliver({ position, rotation, scale }: Placement) {
  return (
    <mesh position={position} rotation={rotation} scale={scale}>
      <boxGeometry args={[1, 6, 0.045]} />
      <primitive object={chromeMaterial} attach="material" />
    </mesh>
  )
}

function TealLaser({
  position,
  rotation,
  length,
}: {
  position: [number, number, number]
  rotation: [number, number, number]
  length: number
}) {
  return (
    <group position={position} rotation={rotation}>
      <mesh>
        <boxGeometry args={[length, 0.018, 0.018]} />
        <meshBasicMaterial color="#31fff1" transparent opacity={0.74} />
      </mesh>
      <pointLight color="#27fff0" intensity={1.6} distance={8} />
    </group>
  )
}

function ReflectiveFloor() {
  return (
    <group position={[0, -3.15, -5.5]} rotation={[-Math.PI / 2, 0, 0]}>
      <mesh>
        <planeGeometry args={[32, 18]} />
        <meshPhysicalMaterial
          color="#020916"
          metalness={0.75}
          roughness={0.18}
          clearcoat={1}
          clearcoatRoughness={0.05}
          envMapIntensity={1.8}
          transparent
          opacity={0.42}
        />
      </mesh>
    </group>
  )
}

function ArchitecturalFraming() {
  return (
    <group>
      <ChromeBlade position={[-8.7, 1.6, -12]} rotation={[0.4, 0.2, 0.34]} scale={[3.2, 14, 3.2]} />
      <ChromeBlade position={[9.2, -2.4, -14]} rotation={[-0.2, -0.5, -0.62]} scale={[2.6, 13, 2.6]} />
      <ChromeBlade position={[-5.9, -3.9, -6.6]} rotation={[-0.8, 0.35, 0.72]} scale={[1.1, 6.8, 1.1]} />
      <ChromeBlade position={[6.8, 3.1, -5.8]} rotation={[2.1, 0.1, -0.45]} scale={[0.9, 6.2, 0.9]} />

      <CrystalShard position={[-7.4, 3.1, -7.8]} rotation={[0.7, -0.2, 0.9]} scale={[1.8, 3.8, 0.55]} />
      <CrystalShard position={[7.9, 1.4, -7.1]} rotation={[0.2, 0.55, -0.65]} scale={[1.35, 3.4, 0.6]} />
      <CrystalShard position={[-9.3, -2.4, -8.8]} rotation={[1.1, 0.1, 0.25]} scale={[0.9, 2.5, 0.45]} />
      <CrystalShard position={[5.6, -3.0, -8.4]} rotation={[0.5, -0.7, -0.15]} scale={[1.1, 2.8, 0.42]} />
      <CrystalShard position={[-3.8, 4.4, -10.6]} rotation={[0.25, 0.5, 0.9]} scale={[0.7, 2.1, 0.32]} />
      <CrystalShard position={[3.2, -3.8, -9.8]} rotation={[0.9, -0.25, -0.35]} scale={[0.62, 1.8, 0.28]} />

      <ChromeSliver position={[-4.8, 2.8, -11]} rotation={[0.6, 0.1, -0.2]} scale={[0.1, 1.7, 1]} />
      <ChromeSliver position={[4.2, 4.4, -12.5]} rotation={[0.4, -0.45, 0.35]} scale={[0.08, 1.95, 1]} />
      <ChromeSliver position={[9.5, 4.8, -10]} rotation={[0.1, -0.8, -0.25]} scale={[0.09, 1.55, 1]} />
      <ChromeSliver position={[-10.2, -1.1, -10.8]} rotation={[0.2, 0.6, 0.65]} scale={[0.08, 1.45, 1]} />

      <TealLaser position={[-8.8, -1.6, -4.4]} rotation={[0, 0.1, 0.42]} length={22} />
      <TealLaser position={[7.2, 2.2, -5.2]} rotation={[0, -0.12, 2.72]} length={18} />
      <TealLaser position={[-2.2, -2.75, -3.7]} rotation={[0, 0, 0.05]} length={12} />

      <ReflectiveFloor />
    </group>
  )
}

export default function CDScene() {
  return (
    <div style={{ width: '100%', height: '100vh', position: 'absolute', inset: 0, zIndex: 1, background: '#01050d' }}>
      <Canvas
        camera={{ position: [0, 0, 10.5], fov: 39 }}
        gl={{
          antialias: true,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 0.82,
        }}
        shadows
      >
        <color attach="background" args={['#01050d']} />
        <fog attach="fog" args={['#010814', 17, 46]} />

        <Environment preset="studio" />

        <ambientLight intensity={0.42} color="#b9d7ff" />
        <spotLight
          position={[7.5, 10.5, 9]}
          intensity={10}
          angle={0.26}
          penumbra={0.74}
          color="#ffffff"
          castShadow
          shadow-bias={-0.0001}
        />
        <spotLight
          position={[-9, -5.8, 3.2]}
          intensity={6}
          angle={0.58}
          penumbra={1}
          color="#74a8ff"
        />
        <pointLight position={[-4.8, 2.5, 1.4]} intensity={3.2} color="#aecdff" distance={10} />
        <pointLight position={[4.5, -1.4, 2.2]} intensity={2.5} color="#28fff0" distance={8} />

        <ArchitecturalFraming />
        <group scale={0.98} position={[0, 0.18, 0.2]}>
          <CDMesh />
        </group>

        <EffectComposer enableNormalPass={false} multisampling={4}>
          <Bloom luminanceThreshold={0.78} luminanceSmoothing={0.18} intensity={0.36} mipmapBlur />
          <ChromaticAberration blendFunction={BlendFunction.NORMAL} offset={new THREE.Vector2(0.00055, 0.00055)} />
          <Vignette eskil={false} offset={0.14} darkness={0.82} />
        </EffectComposer>
      </Canvas>
    </div>
  )
}
