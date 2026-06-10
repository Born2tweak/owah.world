'use client'

import { Environment, MeshReflectorMaterial } from '@react-three/drei'
import { CYAN, CYAN_DEEP, CYAN_WASH, CHROME, GLASS, ICE_BLUE, MARBLE_VEIN, MARBLE_WARM } from './roomMaterials'

const QUILT_OFFSETS = [-6.8, -4.8, -2.8, -0.8, 1.2, 3.2, 5.2]
const CEILING_LIGHTS = [-4, -1.5, 1, 3.5]

export function RoomLighting() {
  return (
    <>
      <fog attach="fog" args={['#030810', 12, 36]} />
      <ambientLight intensity={0.28} color="#b8e0f5" />
      <hemisphereLight intensity={0.22} color="#c8e8f8" groundColor="#0a1820" />
      <directionalLight
        position={[3, 9, 7]}
        intensity={1.35}
        color="#f0f8ff"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={24}
        shadow-camera-left={-9}
        shadow-camera-right={9}
        shadow-camera-top={9}
        shadow-camera-bottom={-9}
      />
      <pointLight position={[-5.5, 3.2, -2.5]} intensity={1.9} color="#00d4ff" distance={14} />
      <pointLight position={[0, 3, -4]} intensity={1.5} color="#66eeff" distance={12} />
      <pointLight position={[5.5, 3.2, -2.5]} intensity={1.9} color="#88bbff" distance={14} />
      <spotLight position={[-2, 4.1, 4]} angle={0.45} penumbra={0.85} intensity={1.7} color="#c0f0ff" castShadow />
      <spotLight position={[6, 4.1, 5]} angle={0.4} penumbra={0.9} intensity={1.4} color="#d8e8ff" />
      {CEILING_LIGHTS.map((x) => (
        <pointLight key={`ceil-${x}`} position={[x, 3.9, -1]} intensity={0.55} color="#e8f8ff" distance={5} decay={2} />
      ))}
      <pointLight position={[-5.1, 0.35, -2.8]} intensity={0.7} color="#00c8e8" distance={4} />
      <pointLight position={[0, 0.35, -3.2]} intensity={0.55} color="#3dff9a" distance={4} />
      <pointLight position={[5.1, 0.35, -3.2]} intensity={0.6} color="#c77dff" distance={4} />
      <Environment preset="city" />
    </>
  )
}

function FloorVeining() {
  const veins = [
    { x: -3, z: -1, rot: 0.3, w: 4.5, h: 0.04 },
    { x: 2, z: 0.5, rot: -0.15, w: 5, h: 0.035 },
    { x: -1, z: 2, rot: 0.5, w: 3.5, h: 0.03 },
    { x: 4, z: -2, rot: -0.4, w: 3, h: 0.03 },
  ]
  return (
    <>
      {veins.map((v, i) => (
        <mesh key={i} position={[v.x, 0.012, v.z]} rotation={[-Math.PI / 2, 0, v.rot]}>
          <planeGeometry args={[v.w, v.h]} />
          <meshStandardMaterial color={MARBLE_VEIN} transparent opacity={0.22} metalness={0.4} roughness={0.15} />
        </mesh>
      ))}
      {[-6, -3, 0, 3, 6].map((x) => (
        <mesh key={`tx-${x}`} position={[x, 0.011, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.012, 13]} />
          <meshStandardMaterial color={ICE_BLUE} transparent opacity={0.12} metalness={0.5} roughness={0.1} />
        </mesh>
      ))}
      {[-4, -1, 2, 5].map((z) => (
        <mesh key={`tz-${z}`} position={[0, 0.011, z]} rotation={[-Math.PI / 2, 0, Math.PI / 2]}>
          <planeGeometry args={[0.01, 17]} />
          <meshStandardMaterial color={ICE_BLUE} transparent opacity={0.1} metalness={0.5} roughness={0.1} />
        </mesh>
      ))}
    </>
  )
}

function PaddedWallPanel({ x, depth = 0.1 }: { x: number; depth?: number }) {
  return (
    <group position={[x, 2.2, -5.02]}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1.55, 4.15, depth]} />
        <meshPhysicalMaterial
          color={CYAN_DEEP}
          metalness={0.28}
          roughness={0.38}
          emissive="#002838"
          emissiveIntensity={0.12}
          clearcoat={0.45}
          clearcoatRoughness={0.18}
        />
      </mesh>
      <mesh position={[0, 0, 0.04]}>
        <boxGeometry args={[1.35, 3.85, 0.04]} />
        <meshPhysicalMaterial color={CYAN_WASH} metalness={0.15} roughness={0.28} clearcoat={0.6} clearcoatRoughness={0.12} />
      </mesh>
      <mesh position={[0, 0, 0.07]}>
        <boxGeometry args={[1.2, 3.55, 0.02]} />
        <meshStandardMaterial color="#0a5068" roughness={0.55} metalness={0.1} />
      </mesh>
      <mesh position={[0, -2.05, 0.06]}>
        <boxGeometry args={[1.58, 0.05, 0.06]} />
        <meshStandardMaterial color={CHROME} metalness={0.95} roughness={0.06} />
      </mesh>
      <mesh position={[0, 2.05, 0.06]}>
        <boxGeometry args={[1.58, 0.04, 0.05]} />
        <meshStandardMaterial color={CHROME} metalness={0.92} roughness={0.08} />
      </mesh>
    </group>
  )
}

export default function RoomShell() {
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[18, 14]} />
        <MeshReflectorMaterial
          color="#d0e4ee"
          resolution={512}
          mirror={0.55}
          mixBlur={1.6}
          mixStrength={8}
          roughness={0.14}
          metalness={0.78}
          blur={[300, 90]}
          depthScale={0.5}
          minDepthThreshold={0.5}
          maxDepthThreshold={1.3}
        />
      </mesh>

      <mesh position={[0, 0.006, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[16.5, 12.5]} />
        <meshPhysicalMaterial color={MARBLE_WARM} metalness={0.42} roughness={0.08} clearcoat={0.35} clearcoatRoughness={0.15} transparent opacity={0.4} />
      </mesh>

      <FloorVeining />

      <mesh position={[0, 2.2, -5.2]} receiveShadow>
        <boxGeometry args={[14, 4.4, 0.28]} />
        <meshPhysicalMaterial color={CYAN_WASH} metalness={0.22} roughness={0.28} clearcoat={0.65} clearcoatRoughness={0.15} />
      </mesh>

      {QUILT_OFFSETS.map((x) => (
        <PaddedWallPanel key={x} x={x} />
      ))}

      <mesh position={[0, 0.12, -5.05]}>
        <boxGeometry args={[14, 0.08, 0.14]} />
        <meshStandardMaterial color={CHROME} metalness={0.96} roughness={0.06} />
      </mesh>

      {[-5.1, 0, 5.1].map((x) => (
        <mesh key={`shelf-led-${x}`} position={[x, 0.04, -4.85]}>
          <boxGeometry args={[2.8, 0.02, 0.04]} />
          <meshStandardMaterial
            color="#00d4ff"
            emissive="#00c8e8"
            emissiveIntensity={0.55}
            metalness={0.8}
            roughness={0.15}
          />
        </mesh>
      ))}

      <mesh position={[-7.1, 2.2, -1]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <boxGeometry args={[10, 4.4, 0.22]} />
        <meshPhysicalMaterial color={CYAN} metalness={0.18} roughness={0.32} clearcoat={0.5} clearcoatRoughness={0.2} />
      </mesh>
      <mesh position={[-7.02, 2.2, -1]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[9.2, 3.8]} />
        <meshPhysicalMaterial color={GLASS} metalness={0.9} roughness={0.04} transmission={0.35} transparent opacity={0.2} />
      </mesh>

      <mesh position={[7.1, 2.2, -1]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
        <boxGeometry args={[10, 4.4, 0.22]} />
        <meshPhysicalMaterial color={CYAN} metalness={0.18} roughness={0.32} clearcoat={0.5} clearcoatRoughness={0.2} />
      </mesh>
      <mesh position={[7.02, 2.2, -1]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[9.2, 3.8]} />
        <meshPhysicalMaterial color={GLASS} metalness={0.9} roughness={0.04} transmission={0.35} transparent opacity={0.2} />
      </mesh>

      {[
        [-7.05, -1, 5],
        [7.05, -1, 5],
        [0, -1, -5.15],
      ].map(([x, , z], i) => (
        <group key={i} position={[x, 0.1, z]} rotation={[0, i === 2 ? 0 : Math.PI / 2, 0]}>
          <mesh>
            <boxGeometry args={[i === 2 ? 14 : 10, 0.1, 0.1]} />
            <meshStandardMaterial color={CHROME} metalness={0.94} roughness={0.08} />
          </mesh>
          <mesh position={[0, 0.06, 0]}>
            <boxGeometry args={[i === 2 ? 13.6 : 9.6, 0.03, 0.03]} />
            <meshStandardMaterial color="#f0f8fc" metalness={0.85} roughness={0.1} emissive="#a8d8f0" emissiveIntensity={0.15} />
          </mesh>
        </group>
      ))}

      <mesh position={[0, 4.35, -1]}>
        <boxGeometry args={[14, 0.12, 10]} />
        <meshStandardMaterial color="#f0f8fc" metalness={0.15} roughness={0.24} />
      </mesh>

      {CEILING_LIGHTS.map((x) => (
        <group key={x} position={[x, 4.26, -1]}>
          <mesh>
            <boxGeometry args={[2.4, 0.05, 0.42]} />
            <meshStandardMaterial color="#e8f4fc" metalness={0.78} roughness={0.1} />
          </mesh>
          <mesh position={[0, -0.025, 0]}>
            <boxGeometry args={[2.0, 0.025, 0.32]} />
            <meshStandardMaterial color="#ffffff" emissive="#b8e8ff" emissiveIntensity={1.1} />
          </mesh>
          <mesh position={[0, -0.35, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <circleGeometry args={[1.1, 24]} />
            <meshStandardMaterial color="#88ddff" emissive="#66ccff" emissiveIntensity={0.25} transparent opacity={0.12} depthWrite={false} />
          </mesh>
        </group>
      ))}

      <mesh position={[6.9, 2, -1]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[9, 3.8]} />
        <meshPhysicalMaterial color={GLASS} metalness={0.92} roughness={0.03} transmission={0.45} transparent opacity={0.18} />
      </mesh>

      <mesh position={[-6.95, 2, -2.5]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[4, 3.2]} />
        <meshPhysicalMaterial color="#a8d0e0" metalness={0.88} roughness={0.05} transmission={0.3} transparent opacity={0.14} />
      </mesh>
    </group>
  )
}
