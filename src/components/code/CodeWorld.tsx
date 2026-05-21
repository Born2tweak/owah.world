'use client'

import { Environment, MeshReflectorMaterial, Stars } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { Suspense, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import WebGLCanvas from '@/components/landing/CDScene/WebGLCanvas'
import CurvedPath, { createCodeCurve } from './CurvedPath'
import ProjectPillar from './ProjectPillar'
import ProjectModal from './ProjectModal'
import ScrollRig from './ScrollRig'
import { CODE_PROJECTS } from '@/data/projects'

function CameraRig({
  curve,
  progress,
}: {
  curve: THREE.CatmullRomCurve3
  progress: number
}) {
  const lookTarget = useRef(new THREE.Vector3())
  const inertialOffset = useRef(new THREE.Vector3())

  useFrame((state, delta) => {
    const clamped = THREE.MathUtils.clamp(0.035 + progress * 0.94, 0, 0.995)
    const position = curve.getPointAt(clamped)
    const next = curve.getPointAt(Math.min(clamped + 0.035, 1))
    const tangent = curve.getTangentAt(clamped).normalize()
    const lateral = new THREE.Vector3().crossVectors(new THREE.Vector3(0, 1, 0), tangent).normalize()
    const drift = Math.sin(clamped * Math.PI * 5) * 0.85

    const desiredPosition = position.clone().add(new THREE.Vector3(0, 0.65, 0)).add(lateral.multiplyScalar(drift))
    const cinematicDrift = new THREE.Vector3(
      Math.sin(clamped * Math.PI * 7.5) * 0.08,
      Math.sin(clamped * Math.PI * 4.2) * 0.05,
      Math.cos(clamped * Math.PI * 6.8) * 0.05
    )
    inertialOffset.current.lerp(cinematicDrift, 1 - Math.exp(-1.8 * delta))
    lookTarget.current.copy(next).add(new THREE.Vector3(0, 0.4, 0)).add(inertialOffset.current.clone().multiplyScalar(0.4))

    state.camera.position.lerp(desiredPosition.clone().add(inertialOffset.current), 1 - Math.exp(-3.1 * delta))
    state.camera.lookAt(lookTarget.current)
  })

  return null
}

function ReflectiveFloor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, -12]} receiveShadow>
      <planeGeometry args={[120, 120]} />
      <MeshReflectorMaterial
        color="#050912"
        resolution={256}
        mirror={0.7}
        mixBlur={1}
        mixStrength={14}
        roughness={0.28}
        metalness={0.82}
        blur={[180, 48]}
        depthScale={0.45}
        minDepthThreshold={0.7}
        maxDepthThreshold={1.4}
      />
    </mesh>
  )
}

function Atmosphere() {
  return (
    <>
      <fog attach="fog" args={['#02050b', 14, 58]} />
      <ambientLight intensity={0.3} color="#b9ddff" />
      <directionalLight
        position={[6, 12, 6]}
        intensity={2.2}
        color="#f7fbff"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <spotLight position={[-9, 8, 10]} intensity={7} angle={0.34} penumbra={0.82} color="#90d8ff" />
      <pointLight position={[0, 4, -10]} intensity={5.5} color="#5ac6ff" distance={18} />
      <pointLight position={[0, 2, -26]} intensity={4} color="#c7d9ff" distance={20} />
      <pointLight position={[0, 3, -40]} intensity={4} color="#84baff" distance={18} />
      <Stars radius={110} depth={80} count={900} factor={3} saturation={0} speed={0.3} fade />
      <Environment preset="night" />
    </>
  )
}

function CrystalMarkers() {
  const placements: Array<[number, number, number, number]> = [
    [-9, 1.8, 9, 2.8],
    [8, 1.4, 2, 2.1],
    [-8.5, 1.6, -11, 2.6],
    [9, 1.9, -19, 2.3],
    [-7.5, 1.5, -28, 2.4],
    [7, 1.7, -37, 2.2],
  ]

  return (
    <group>
      {placements.map(([x, y, z, scale], index) => (
        <mesh key={index} position={[x, y, z]} scale={scale} castShadow>
          <octahedronGeometry args={[1, 0]} />
          <meshPhysicalMaterial
            color="#d7efff"
            metalness={0.24}
            roughness={0.02}
            transmission={0.7}
            thickness={1.2}
            clearcoat={1}
            clearcoatRoughness={0.01}
            opacity={0.92}
            transparent
          />
        </mesh>
      ))}
    </group>
  )
}

function SceneFallback() {
  return (
    <>
      <fog attach="fog" args={['#02050b', 14, 58]} />
      <ambientLight intensity={0.35} color="#b9ddff" />
      <pointLight position={[0, 4, 4]} intensity={2.8} color="#84cfff" distance={16} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, -12]}>
        <planeGeometry args={[120, 120]} />
        <meshStandardMaterial color="#050912" metalness={0.8} roughness={0.24} />
      </mesh>
    </>
  )
}

export default function CodeWorld() {
  const [progress, setProgress] = useState(0)
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [modalProjectId, setModalProjectId] = useState<string | null>(null)
  const curve = useMemo(() => createCodeCurve(), [])
  const orderedProjects = useMemo(() => [...CODE_PROJECTS].sort((a, b) => a.order - b.order), [])

  const pillars = useMemo(() => {
    return orderedProjects.map((project, index) => {
      const t = 0.065 + index * 0.155
      const anchor = curve.getPointAt(t)
      const tangent = curve.getTangentAt(t).normalize()
      const lateral = new THREE.Vector3().crossVectors(new THREE.Vector3(0, 1, 0), tangent).normalize()
      const side = index % 2 === 0 ? 1 : -1
      const lateralDistance = index < 2 ? 3.15 : 3.85
      const offset = lateral.multiplyScalar(side * lateralDistance)
      const position: [number, number, number] = [anchor.x + offset.x, 3.42, anchor.z + offset.z]
      const lookAnchor = anchor.clone().sub(offset.clone().multiplyScalar(0.2))
      const rotationY = Math.atan2(lookAnchor.x - position[0], lookAnchor.z - position[2])

      return { project, position, rotationY, pathT: t }
    })
  }, [curve, orderedProjects])

  const autoFocusedId = useMemo(() => {
    if (pillars.length === 0) return null

    let nearest = pillars[0]
    let nearestDelta = Math.abs(progress - pillars[0].pathT)

    for (let index = 1; index < pillars.length; index++) {
      const delta = Math.abs(progress - pillars[index].pathT)
      if (delta < nearestDelta) {
        nearest = pillars[index]
        nearestDelta = delta
      }
    }

    return nearest.project.id
  }, [pillars, progress])

  const focusedId = hoveredId ?? selectedId ?? autoFocusedId
  const modalProject = pillars.find((pillar) => pillar.project.id === modalProjectId)?.project ?? null

  return (
    <section className="code-world">
      <div className={`code-world__canvas${modalProject ? ' is-modalOpen' : ''}`}>
        <WebGLCanvas
          camera={{ position: [0, 2.8, 16], fov: 40 }}
          gl={{
            antialias: true,
            powerPreference: 'high-performance',
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 0.82,
          }}
          shadows
        >
          <color attach="background" args={['#02050b']} />
          <Suspense fallback={<SceneFallback />}>
            <Atmosphere />
            <CameraRig curve={curve} progress={progress} />
            <ReflectiveFloor />
            <CurvedPath curve={curve} />
            <CrystalMarkers />
            {pillars.map(({ project, position, rotationY, pathT }) => {
              const cameraEmphasis = THREE.MathUtils.clamp(1 - Math.abs(progress - pathT) / 0.24, 0.25, 1)
              return (
                <ProjectPillar
                  key={project.id}
                  project={project}
                  position={position}
                  rotationY={rotationY}
                  cameraEmphasis={cameraEmphasis}
                  isFocused={focusedId === project.id}
                  isSelected={selectedId === project.id}
                  onHoverChange={(isHovered) => {
                    setHoveredId((current) => (isHovered ? project.id : current === project.id ? null : current))
                  }}
                  onSelect={() => {
                    setSelectedId(project.id)
                    setModalProjectId(project.id)
                  }}
                />
              )
            })}
          </Suspense>
        </WebGLCanvas>
      </div>

      <ScrollRig
        progress={progress}
        setProgress={setProgress}
        focusedTitle={pillars.find((pillar) => pillar.project.id === focusedId)?.project.title ?? null}
        onInspectFocused={() => {
          if (!focusedId) return
          setSelectedId(focusedId)
          setModalProjectId(focusedId)
        }}
      />
      {modalProject ? <ProjectModal project={modalProject} onClose={() => setModalProjectId(null)} /> : null}

      <style jsx>{`
        .code-world {
          position: relative;
          height: 100vh;
          overflow: hidden;
          background:
            radial-gradient(circle at top, rgba(87, 199, 255, 0.08), transparent 28%),
            radial-gradient(circle at 50% 40%, rgba(199, 217, 255, 0.05), transparent 30%),
            #02050b;
        }

        .code-world__canvas {
          position: absolute;
          inset: 0;
          transition: filter 180ms ease, opacity 180ms ease;
        }

        .code-world__canvas.is-modalOpen {
          filter: brightness(0.62) saturate(0.82);
          opacity: 0.92;
        }
      `}</style>
    </section>
  )
}
