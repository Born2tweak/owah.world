'use client'

import { useCallback, useState, type ReactNode } from 'react'
import { Canvas } from '@react-three/fiber'
import type { CanvasProps } from '@react-three/fiber'
import CanvasErrorBoundary from './CanvasErrorBoundary'

type WebGLCanvasProps = CanvasProps & {
  children: ReactNode
}

export default function WebGLCanvas({ children, gl, ...rest }: WebGLCanvasProps) {
  const [contextLost, setContextLost] = useState(false)

  const onCreated = useCallback<NonNullable<CanvasProps['onCreated']>>(
    (state) => {
      const canvas = state.gl.domElement

      const handleContextLost = (event: Event) => {
        event.preventDefault()
        setContextLost(true)
      }

      const handleContextRestored = () => {
        setContextLost(false)
      }

      canvas.addEventListener('webglcontextlost', handleContextLost, false)
      canvas.addEventListener('webglcontextrestored', handleContextRestored, false)
    },
    [],
  )

  if (contextLost) {
    return (
      <div
        role="alert"
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#01050d',
          color: 'rgba(232, 244, 255, 0.72)',
          fontFamily: 'var(--font-mono)',
          fontSize: 11,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
        }}
      >
        WebGL paused — tap reload or return shortly
      </div>
    )
  }

  return (
    <CanvasErrorBoundary>
      <Canvas gl={gl} onCreated={onCreated} {...rest}>
        {children}
      </Canvas>
    </CanvasErrorBoundary>
  )
}
