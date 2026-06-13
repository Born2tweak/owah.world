'use client'

/** A single shelf board with its brass under-light. Books are placed by the wing. */
export default function ArchiveShelf({ y, accent }: { y: number; accent: string }) {
  return (
    <group position={[0, y, 0]}>
      <mesh position={[0, -0.26, 0.04]} castShadow receiveShadow>
        <boxGeometry args={[2.74, 0.05, 0.46]} />
        <meshStandardMaterial color="#1b1e25" metalness={0.7} roughness={0.32} />
      </mesh>
      <mesh position={[0, -0.235, 0.27]}>
        <boxGeometry args={[2.64, 0.012, 0.02]} />
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[0, -0.29, 0.04]}>
        <boxGeometry args={[2.78, 0.02, 0.48]} />
        <meshStandardMaterial color="#0c0e12" metalness={0.6} roughness={0.4} />
      </mesh>
    </group>
  )
}
