'use client'

import { Environment, MeshReflectorMaterial } from '@react-three/drei'
import { CYAN, CYAN_DEEP, CYAN_WASH, CHROME, GLASS, ICE_BLUE, MARBLE_VEIN, MARBLE_WARM } from './roomMaterials'

const QUILT_OFFSETS = [-6.8, -4.8, -2.8, -0.8, 1.2, 3.2, 5.2]
const CEILING_LIGHTS = [-4, -1.5, 1, 3.5]
const COVE_SEGMENTS = [-5.1, 0, 5.1]

export function RoomLighting() {
  return (
    <>
      <fog attach="fog" args={['#030810', 11, 34]} />
      <ambientLight intensity={0.22} color="#d8eeff" />
      <hemisphereLight intensity={0.26} color="#d8f2ff" groundColor="#07131b" />
      <directionalLight
        position={[3, 9, 7]}
        intensity={1.5}
        color="#f8fbff"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={26}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      <pointLight position={[-5.5, 3.1, -2.6]} intensity={2.15} color="#00d4ff" distance={16} />
      <pointLight position={[0, 3.3, -3.7]} intensity={1.8} color="#7ce7ff" distance={14} />
      <pointLight position={[5.5, 3.1, -2.6]} intensity={2.1} color="#8fbfff" distance={16} />
      <spotLight position={[-2.4, 4.15, 4.2]} angle={0.44} penumbra={0.9} intensity={1.95} color="#dcf6ff" castShadow />
      <spotLight position={[5.9, 4.05, 4.8]} angle={0.38} penumbra={0.88} intensity={1.55} color="#e6f0ff" castShadow />
      <spotLight position={[-5.4, 4.05, 4.6]} angle={0.38} penumbra={0.9} intensity={1.6} color="#d8fbff" castShadow />
      {CEILING_LIGHTS.map((x) => (
        <pointLight key={`ceil-${x}`} position={[x, 4.02, -1]} intensity={0.62} color="#f2fbff" distance={5.8} decay={2} />
      ))}
      <pointLight position={[-5.1, 0.32, -2.9]} intensity={0.9} color="#00c8e8" distance={4.5} />
      <pointLight position={[0, 0.32, -3.2]} intensity={0.75} color="#3dff9a" distance={4.4} />
      <pointLight position={[5.1, 0.32, -3.2]} intensity={0.84} color="#7090e8" distance={4.6} />
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
          <meshStandardMaterial color={MARBLE_VEIN} transparent opacity={0.24} metalness={0.4} roughness={0.15} />
        </mesh>
      ))}
      {[-6, -3, 0, 3, 6].map((x) => (
        <mesh key={`tx-${x}`} position={[x, 0.011, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.012, 13]} />
          <meshStandardMaterial color={ICE_BLUE} transparent opacity={0.14} metalness={0.5} roughness={0.1} />
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

function PaddedWallPanel({ x, depth = 0.11 }: { x: number; depth?: number }) {
  return (
    <group position={[x, 2.2, -5.02]}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1.56, 4.15, depth]} />
        <meshPhysicalMaterial
          color={CYAN_DEEP}
          metalness={0.3}
          roughness={0.34}
          emissive="#002838"
          emissiveIntensity={0.12}
          clearcoat={0.5}
          clearcoatRoughness={0.16}
        />
      </mesh>
      <mesh position={[0, 0, 0.05]}>
        <boxGeometry args={[1.34, 3.84, 0.05]} />
        <meshPhysicalMaterial color={CYAN_WASH} metalness={0.15} roughness={0.24} clearcoat={0.62} clearcoatRoughness={0.1} />
      </mesh>
      <mesh position={[0, 0, 0.08]}>
        <boxGeometry args={[1.18, 3.48, 0.025]} />
        <meshStandardMaterial color="#0c5167" roughness={0.52} metalness={0.12} />
      </mesh>
      <mesh position={[0, -2.05, 0.07]}>
        <boxGeometry args={[1.6, 0.05, 0.06]} />
        <meshStandardMaterial color={CHROME} metalness={0.95} roughness={0.06} />
      </mesh>
      <mesh position={[0, 2.05, 0.07]}>
        <boxGeometry args={[1.6, 0.04, 0.05]} />
        <meshStandardMaterial color={CHROME} metalness={0.92} roughness={0.08} />
      </mesh>
    </group>
  )
}

function CoveLight({ x }: { x: number }) {
  return (
    <group position={[x, 4.28, -2.18]}>
      <mesh>
        <boxGeometry args={[3.1, 0.08, 0.34]} />
        <meshStandardMaterial color="#f4fbff" metalness={0.7} roughness={0.08} />
      </mesh>
      <mesh position={[0, -0.04, 0]}>
        <boxGeometry args={[2.76, 0.03, 0.18]} />
        <meshStandardMaterial color="#d3f4ff" emissive="#b4ecff" emissiveIntensity={1.1} />
      </mesh>
    </group>
  )
}

export default function RoomShell() {
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[18, 14]} />
        <MeshReflectorMaterial
          color="#dae8f0"
          resolution={768}
          mirror={0.56}
          mixBlur={1.8}
          mixStrength={8.6}
          roughness={0.13}
          metalness={0.78}
          blur={[320, 96]}
          depthScale={0.54}
          minDepthThreshold={0.5}
          maxDepthThreshold={1.3}
        />
      </mesh>

      <mesh position={[0, 0.006, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[16.7, 12.7]} />
        <meshPhysicalMaterial color={MARBLE_WARM} metalness={0.42} roughness={0.08} clearcoat={0.42} clearcoatRoughness={0.12} transparent opacity={0.46} />
      </mesh>

      <FloorVeining />

      <mesh position={[0, 2.2, -5.24]} receiveShadow castShadow>
        <boxGeometry args={[14.2, 4.45, 0.3]} />
        <meshPhysicalMaterial color={CYAN_WASH} metalness={0.22} roughness={0.24} clearcoat={0.68} clearcoatRoughness={0.12} />
      </mesh>

      <mesh position={[0, 2.2, -4.88]}>
        <boxGeometry args={[8.6, 3.7, 0.07]} />
        <meshPhysicalMaterial color={GLASS} transmission={0.22} transparent opacity={0.14} roughness={0.04} metalness={0.3} />
      </mesh>

      {QUILT_OFFSETS.map((x) => (
        <PaddedWallPanel key={x} x={x} />
      ))}

      <mesh position={[0, 0.14, -5.04]}>
        <boxGeometry args={[14.2, 0.11, 0.14]} />
        <meshStandardMaterial color={CHROME} metalness={0.96} roughness={0.06} />
      </mesh>

      {COVE_SEGMENTS.map((x) => (
        <CoveLight key={x} x={x} />
      ))}

      <mesh position={[-7.08, 2.2, -1]} rotation={[0, Math.PI / 2, 0]} receiveShadow castShadow>
        <boxGeometry args={[10.2, 4.45, 0.24]} />
        <meshPhysicalMaterial color={CYAN} metalness={0.18} roughness={0.3} clearcoat={0.52} clearcoatRoughness={0.18} />
      </mesh>
      <mesh position={[-6.98, 2.2, -1]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[9.2, 3.8]} />
        <meshPhysicalMaterial color={GLASS} metalness={0.9} roughness={0.04} transmission={0.36} transparent opacity={0.18} />
      </mesh>

      <mesh position={[7.08, 2.2, -1]} rotation={[0, -Math.PI / 2, 0]} receiveShadow castShadow>
        <boxGeometry args={[10.2, 4.45, 0.24]} />
        <meshPhysicalMaterial color={CYAN} metalness={0.18} roughness={0.3} clearcoat={0.52} clearcoatRoughness={0.18} />
      </mesh>
      <mesh position={[6.98, 2.2, -1]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[9.2, 3.8]} />
        <meshPhysicalMaterial color={GLASS} metalness={0.9} roughness={0.04} transmission={0.36} transparent opacity={0.18} />
      </mesh>

      <mesh position={[0, 2.3, -5.02]}>
        <boxGeometry args={[2.36, 4.1, 0.38]} />
        <meshStandardMaterial color="#0b1a24" metalness={0.48} roughness={0.3} />
      </mesh>
      <mesh position={[0, 2.22, -4.8]}>
        <boxGeometry args={[1.8, 3.72, 0.06]} />
        <meshPhysicalMaterial color={GLASS} transmission={0.5} transparent opacity={0.2} roughness={0.05} metalness={0.12} />
      </mesh>
      <mesh position={[0, 0.14, -4.7]}>
        <boxGeometry args={[1.86, 0.08, 0.6]} />
        <meshStandardMaterial color={CHROME} metalness={0.92} roughness={0.08} />
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
            <meshStandardMaterial color="#f0f8fc" metalness={0.85} roughness={0.1} emissive="#a8d8f0" emissiveIntensity={0.16} />
          </mesh>
        </group>
      ))}

      <mesh position={[0, 4.35, -1]}>
        <boxGeometry args={[14.2, 0.14, 10.2]} />
        <meshStandardMaterial color="#f5fbff" metalness={0.12} roughness={0.18} />
      </mesh>

      {CEILING_LIGHTS.map((x) => (
        <group key={x} position={[x, 4.25, -1]}>
          <mesh>
            <boxGeometry args={[2.45, 0.06, 0.46]} />
            <meshStandardMaterial color="#e8f4fc" metalness={0.78} roughness={0.1} />
          </mesh>
          <mesh position={[0, -0.03, 0]}>
            <boxGeometry args={[2.04, 0.03, 0.34]} />
            <meshStandardMaterial color="#ffffff" emissive="#b8e8ff" emissiveIntensity={1.18} />
          </mesh>
          <mesh position={[0, -0.35, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <circleGeometry args={[1.15, 24]} />
            <meshStandardMaterial color="#88ddff" emissive="#66ccff" emissiveIntensity={0.25} transparent opacity={0.12} depthWrite={false} />
          </mesh>
        </group>
      ))}

      <mesh position={[6.9, 2.1, -1]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[9.1, 3.9]} />
        <meshPhysicalMaterial color={GLASS} metalness={0.92} roughness={0.03} transmission={0.46} transparent opacity={0.16} />
      </mesh>

      <mesh position={[-6.94, 2.12, -2.44]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[4.4, 3.35]} />
        <meshPhysicalMaterial color="#a8d0e0" metalness={0.88} roughness={0.05} transmission={0.3} transparent opacity={0.12} />
      </mesh>
    </group>
  )
}
