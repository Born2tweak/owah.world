'use client'

import { useTexture } from '@react-three/drei'
import { CHROME_DARK } from './roomMaterials'

type PersonalAlbumFrameProps = {
  cover: string
  position: [number, number, number]
  size?: number
  emissive?: number
}

export default function PersonalAlbumFrame({
  cover,
  position,
  size = 0.3,
  emissive = 0.1,
}: PersonalAlbumFrameProps) {
  const texture = useTexture(cover)

  return (
    <group position={position}>
      <mesh castShadow>
        <boxGeometry args={[size + 0.04, size + 0.04, 0.035]} />
        <meshStandardMaterial color={CHROME_DARK} metalness={0.88} roughness={0.14} />
      </mesh>
      <mesh position={[0, 0, 0.02]}>
        <planeGeometry args={[size, size]} />
        <meshStandardMaterial map={texture} roughness={0.35} metalness={0.08} emissive="#001018" emissiveIntensity={emissive} />
      </mesh>
    </group>
  )
}
