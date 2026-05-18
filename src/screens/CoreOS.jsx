import { useState, useEffect, useRef } from 'react'
import './CoreOS.css'

const IDENTITY_SIGNALS = [
  'design engineer',
  'systems thinker',
  'movement analyst',
  'pattern seeker',
  'world builder',
]

const SYSTEM_MODULES = [
  { id: 'state', glyph: '◈', label: 'CURRENT STATE', sublabel: 'live nervous system', status: 'active' },
  { id: 'archive', glyph: '◬', label: 'ARCHIVE', sublabel: 'memory system', status: 'loaded' },
  { id: 'systems', glyph: '⬡', label: 'SYSTEMS', sublabel: 'engineering layer', status: 'active' },
  { id: 'expression', glyph: '◎', label: 'EXPRESSION', sublabel: 'aura layer', status: 'active' },
  { id: 'patterns', glyph: '✦', label: 'PATTERNS', sublabel: 'symbolic layer', status: 'loaded' },
]

export default function CoreOS({ onNavigate }) {
  const [currentSignal, setCurrentSignal] = useState(0)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isRevealed, setIsRevealed] = useState(false)
  const canvasRef = useRef(null)

  // Cycle identity signals
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSignal(prev => (prev + 1) % IDENTITY_SIGNALS.length)
    }, 2800)
    return () => clearInterval(interval)
  }, [])

  // Reveal animation
  useEffect(() => {
    const timer = setTimeout(() => setIsRevealed(true), 200)
    return () => clearTimeout(timer)
  }, [])

  // Mouse tracking for reactive field
  useEffect(() => {
    const handleMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [])

  // Particle field canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId
    let particles = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // Initialize particles
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.3 + 0.05,
      })
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach(p => {
        p.x += p.vx
        p.y += p.vy

        // Wrap
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0, 229, 255, ${p.opacity})`
        ctx.fill()
      })

      // Draw connections between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 120) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(0, 229, 255, ${0.03 * (1 - dist / 120)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      animId = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <section className={`core-os ${isRevealed ? 'revealed' : ''}`}>
      {/* Particle field */}
      <canvas ref={canvasRef} className="core-particles" />

      {/* Reactive gradient field */}
      <div
        className="core-reactive-field"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(0, 229, 255, 0.04), transparent 60%)`,
        }}
      />

      {/* Grid background */}
      <div className="core-grid" />

      {/* Central identity block */}
      <div className="core-center">
        <div className="core-glyph-ring">
          <svg viewBox="0 0 200 200" className="core-glyph-svg">
            <circle cx="100" cy="100" r="90" className="core-ring core-ring--outer" />
            <circle cx="100" cy="100" r="70" className="core-ring core-ring--mid" />
            <circle cx="100" cy="100" r="50" className="core-ring core-ring--inner" />
            <circle cx="100" cy="100" r="6" className="core-ring-dot" />
            {/* Tick marks */}
            {Array.from({ length: 36 }).map((_, i) => {
              const angle = (i * 10) * (Math.PI / 180)
              const x1 = 100 + Math.cos(angle) * 85
              const y1 = 100 + Math.sin(angle) * 85
              const x2 = 100 + Math.cos(angle) * (i % 3 === 0 ? 95 : 90)
              const y2 = 100 + Math.sin(angle) * (i % 3 === 0 ? 95 : 90)
              return (
                <line
                  key={i}
                  x1={x1} y1={y1} x2={x2} y2={y2}
                  className="core-tick"
                  style={{ opacity: i % 3 === 0 ? 0.4 : 0.15 }}
                />
              )
            })}
          </svg>
        </div>

        <h1 className="core-title">
          <span className="core-title-glyph">◉</span>
          OWAH<span className="core-title-dot">.</span>WORLD
        </h1>

        <div className="core-signal-block">
          <span className="core-signal-prefix">{'>'} </span>
          <span className="core-signal-text" key={currentSignal}>
            {IDENTITY_SIGNALS[currentSignal]}
          </span>
          <span className="core-signal-cursor">▊</span>
        </div>

        <p className="core-tagline">
          a living techno-symbolic operating system
          <br />
          documenting the evolution of a human being.
        </p>
      </div>

      {/* System modules grid */}
      <div className="core-modules">
        <div className="core-modules-header">
          <span className="core-modules-label">SUBSYSTEMS</span>
          <span className="core-modules-line" />
        </div>
        <div className="core-modules-grid">
          {SYSTEM_MODULES.map((mod, i) => (
            <button
              key={mod.id}
              className="core-module-card"
              onClick={() => onNavigate(mod.id)}
              style={{ animationDelay: `${600 + i * 100}ms` }}
              id={`module-${mod.id}`}
            >
              <div className="core-module-top">
                <span className="core-module-glyph">{mod.glyph}</span>
                <span className={`core-module-status core-module-status--${mod.status}`}>
                  {mod.status}
                </span>
              </div>
              <span className="core-module-label">{mod.label}</span>
              <span className="core-module-sublabel">{mod.sublabel}</span>
              <div className="core-module-bar">
                <div className="core-module-bar-fill" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Ambient data stream */}
      <div className="core-datastream">
        <div className="core-stream-line" />
        <span className="core-stream-label">CONSCIOUSNESS.ACTIVE</span>
        <div className="core-stream-line" />
      </div>
    </section>
  )
}
