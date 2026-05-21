'use client'

import { Line } from '@react-three/drei'
import * as THREE from 'three'

export function createCodeCurve() {
  return new THREE.CatmullRomCurve3(
    [
      new THREE.Vector3(0, 2.6, 16),
      new THREE.Vector3(5, 2.2, 8),
      new THREE.Vector3(-6, 2.8, 0),
      new THREE.Vector3(6.5, 2.4, -10),
      new THREE.Vector3(-4.5, 2.9, -21),
      new THREE.Vector3(3.5, 2.6, -31),
      new THREE.Vector3(-2, 2.4, -42),
    ],
    false,
    'catmullrom',
    0.45
  )
}

export default function CurvedPath({ curve }: { curve: THREE.CatmullRomCurve3 }) {
  const points = curve.getPoints(220)

  return (
    <group>
      <Line points={points} color="#7ccfff" transparent opacity={0.38} lineWidth={1.2} />
      <Line
        points={points.map((point) => point.clone().setY(0.02))}
        color="#ffffff"
        transparent
        opacity={0.14}
        lineWidth={0.8}
      />
    </group>
  )
}
