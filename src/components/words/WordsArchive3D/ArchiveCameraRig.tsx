'use client'

import { useFrame, useThree } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'
import type { ArchiveMode } from './wordsArchive.types'
import { cameraForMode } from './wordsArchiveData'

type ArchiveCameraRigProps = {
  mode: ArchiveMode
  zoom: number
}

export default function ArchiveCameraRig({ mode, zoom }: ArchiveCameraRigProps) {
  const { camera } = useThree()
  const lookTarget = useRef(new THREE.Vector3())
  const desiredPosition = useRef(new THREE.Vector3())

  // R3F camera rigs intentionally mutate the scene camera each frame.
  // eslint-disable-next-line react-hooks/immutability -- drei/R3F camera animation pattern
  useFrame((_, delta) => {
    const state = cameraForMode(mode)
    desiredPosition.current.set(state.position[0] * zoom, state.position[1] * zoom, state.position[2] * zoom)
    lookTarget.current.set(...state.target)

    const posLerp = 1 - Math.exp(-3 * delta)
    const lookLerp = 1 - Math.exp(-3 * delta)
    camera.position.lerp(desiredPosition.current, posLerp)

    const currentLook = new THREE.Vector3()
    camera.getWorldDirection(currentLook)
    const currentTarget = camera.position.clone().add(currentLook)
    currentTarget.lerp(lookTarget.current, lookLerp)
    camera.lookAt(currentTarget)

    if ('fov' in camera) {
      const persp = camera as THREE.PerspectiveCamera
      // eslint-disable-next-line react-hooks/immutability -- animate FOV per mode
      persp.fov = THREE.MathUtils.lerp(persp.fov, state.fov, posLerp)
      persp.updateProjectionMatrix()
    }
  })

  return null
}
