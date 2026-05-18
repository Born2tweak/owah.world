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

      // ─── Base: near-black deep chrome ─────────────────────────────────
      // Chrome is dark. The bright parts are reflections, not the base.
      ctx.fillStyle = '#06080d'
      ctx.fillRect(0, 0, width, height)

      // ─── Primary reflection band (the chrome "stripe") ─────────────────
      const bandY = height * (0.38 + Math.sin(t * 0.004) * 0.07)
      const band = ctx.createLinearGradient(0, bandY - height * 0.2, 0, bandY + height * 0.2)
      band.addColorStop(0,    'rgba(0,0,0,0)')
      band.addColorStop(0.3,  'rgba(80,100,120,0.04)')
      band.addColorStop(0.45, 'rgba(150,175,200,0.10)')
      band.addColorStop(0.5,  'rgba(210,225,240,0.18)')
      band.addColorStop(0.55, 'rgba(150,175,200,0.10)')
      band.addColorStop(0.7,  'rgba(80,100,120,0.04)')
      band.addColorStop(1,    'rgba(0,0,0,0)')
      ctx.fillStyle = band
      ctx.fillRect(0, 0, width, height)

      // ─── Top catch-light ───────────────────────────────────────────────
      const topGrad = ctx.createLinearGradient(0, 0, 0, height * 0.18)
      topGrad.addColorStop(0,   'rgba(160,185,210,0.14)')
      topGrad.addColorStop(1,   'rgba(0,0,0,0)')
      ctx.fillStyle = topGrad
      ctx.fillRect(0, 0, width, height)

      // ─── Sharp specular point (moving slowly) ─────────────────────────
      const specX = width  * (0.38 + Math.sin(t * 0.0025) * 0.18)
      const specY = height * (0.20 + Math.sin(t * 0.0018) * 0.04)
      const spec  = ctx.createRadialGradient(specX, specY, 0, specX, specY, width * 0.20)
      spec.addColorStop(0,    'rgba(255,255,255,0.22)')
      spec.addColorStop(0.25, 'rgba(210,228,245,0.10)')
      spec.addColorStop(0.6,  'rgba(170,195,220,0.03)')
      spec.addColorStop(1,    'rgba(0,0,0,0)')
      ctx.fillStyle = spec
      ctx.fillRect(0, 0, width, height)

      // ─── Deep vignette (corners dark — feels like being inside chrome) ─
      const vignette = ctx.createRadialGradient(
        width * 0.5, height * 0.5, height * 0.22,
        width * 0.5, height * 0.5, height * 0.88
      )
      vignette.addColorStop(0,   'rgba(0,0,0,0)')
      vignette.addColorStop(0.5, 'rgba(0,0,0,0.12)')
      vignette.addColorStop(1,   'rgba(0,0,0,0.65)')
      ctx.fillStyle = vignette
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
    </div>
  )
}
