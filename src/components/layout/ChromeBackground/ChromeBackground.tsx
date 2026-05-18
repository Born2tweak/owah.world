'use client'

import { useEffect, useRef } from 'react'
import styles from './ChromeBackground.module.css'

export default function ChromeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animFrame: number
    let t = 0

    function resize() {
      if (!canvas) return
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    function drawChrome() {
      if (!canvas || !ctx) return
      const { width, height } = canvas

      ctx.clearRect(0, 0, width, height)

      // Base gradient — deep chrome
      const base = ctx.createLinearGradient(0, 0, width, height)
      base.addColorStop(0,   '#1a1a1a')
      base.addColorStop(0.3, '#2a2a2a')
      base.addColorStop(0.6, '#1c1c1c')
      base.addColorStop(1,   '#111111')
      ctx.fillStyle = base
      ctx.fillRect(0, 0, width, height)

      // Reflective sweep — slow moving highlight
      const sweep = Math.sin(t * 0.003) * 0.5 + 0.5
      const sweepX = width * sweep
      const reflect = ctx.createRadialGradient(
        sweepX, height * 0.3, 0,
        sweepX, height * 0.3, width * 0.7
      )
      reflect.addColorStop(0,   'rgba(200, 200, 200, 0.06)')
      reflect.addColorStop(0.4, 'rgba(150, 150, 150, 0.03)')
      reflect.addColorStop(1,   'rgba(0, 0, 0, 0)')
      ctx.fillStyle = reflect
      ctx.fillRect(0, 0, width, height)

      // Secondary highlight — bottom edge shine
      const edgeShine = ctx.createLinearGradient(0, height * 0.7, 0, height)
      edgeShine.addColorStop(0,   'rgba(255, 255, 255, 0)')
      edgeShine.addColorStop(0.8, 'rgba(255, 255, 255, 0.02)')
      edgeShine.addColorStop(1,   'rgba(255, 255, 255, 0.05)')
      ctx.fillStyle = edgeShine
      ctx.fillRect(0, 0, width, height)

      t++
      animFrame = requestAnimationFrame(drawChrome)
    }

    resize()
    window.addEventListener('resize', resize)
    drawChrome()

    return () => {
      cancelAnimationFrame(animFrame)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <div className={styles.root} aria-hidden="true">
      <canvas ref={canvasRef} className={styles.canvas} />
      <div className={styles.grain} />
    </div>
  )
}
