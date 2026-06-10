'use client'

import { useFrame, useThree } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'
import { ROOM_CAMERA_STATES, type RoomZone } from './roomZones'

type RoomCameraRigProps = {
  activeZone: RoomZone
}

export default function RoomCameraRig({ activeZone }: RoomCameraRigProps) {
  const { camera } = useThree()
  const lookTarget = useRef(new THREE.Vector3())
  const desiredPosition = useRef(new THREE.Vector3())
  const desiredFov = useRef(42)

  // R3F camera rigs intentionally mutate the scene camera each frame.
  // eslint-disable-next-line react-hooks/immutability -- drei/R3F camera animation pattern
  useFrame((_, delta) => {
    const state = ROOM_CAMERA_STATES[activeZone]
    desiredPosition.current.set(...state.position)
    lookTarget.current.set(...state.target)
    desiredFov.current = state.fov ?? 42

    const positionLerp = 1 - Math.exp(-2.8 * delta)
    const targetLerp = 1 - Math.exp(-2.4 * delta)
    const fovLerp = 1 - Math.exp(-3.2 * delta)

    camera.position.lerp(desiredPosition.current, positionLerp)

    const currentLook = new THREE.Vector3()
    camera.getWorldDirection(currentLook)
    const currentTarget = camera.position.clone().add(currentLook)
    currentTarget.lerp(lookTarget.current, targetLerp)
    camera.lookAt(currentTarget)

    if ('fov' in camera) {
      const persp = camera as THREE.PerspectiveCamera
      // eslint-disable-next-line react-hooks/immutability -- animate perspective FOV per zone
      persp.fov = THREE.MathUtils.lerp(persp.fov, desiredFov.current, fovLerp)
      persp.updateProjectionMatrix()
    }
  })

  return null
}
