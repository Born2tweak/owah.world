import { useState, useEffect, useRef } from 'react'
import './CoreOS.css'

const IDENTITY_SIGNALS = [
  'design engineer',
  'systems thinker',
  'movement analyst',
  'pattern seeker',
  'world builder',
  'interface architect',
  'biomechanics obsessive',
  'rhythm translator',
]

const SYSTEM_MODULES = [
  { id: 'state', glyph: '◈', label: 'CURRENT STATE', sublabel: 'live nervous system', status: 'live', temp: 'warm' },
  { id: 'archive', glyph: '◬', label: 'ARCHIVE', sublabel: 'memory system', status: 'loaded', temp: 'amber' },
  { id: 'systems', glyph: '⬡', label: 'SYSTEMS', sublabel: 'engineering layer', status: 'active', temp: 'cold' },
  { id: 'expression', glyph: '◎', label: 'EXPRESSION', sublabel: 'aura layer', status: 'active', temp: 'hot' },
  { id: 'patterns', glyph: '✦', label: 'PATTERNS', sublabel: 'symbolic layer', status: 'loaded', temp: 'neural' },
]

const AMBIENT_DATA = [
  'SYS.IDENTITY.LOADED',
  'MEM.ARCHIVE.4291.OK',
  'NET.SIGNAL.ACTIVE',
  'PSY.PATTERN.SYNC',
  'VIS.RENDER.60FPS',
  'AUR.EXPRESSION.HOT',
  'MOT.KINEMATIC.READY',
  'SIG.CONSCIOUSNESS.ON',
]

export default function CoreOS({ onNavigate }) {
  const [currentSignal, setCurrentSignal] = useState(0)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isRevealed, setIsRevealed] = useState(false)
  const [dataStream, setDataStream] = useState([])
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
    const timer = setTimeout(() => setIsRevealed(true), 100)
    return () => clearTimeout(timer)
  }, [])

  // Ambient data stream
  useEffect(() => {
    const interval = setInterval(() => {
      setDataStream(prev => {
        const next = [...prev, AMBIENT_DATA[Math.floor(Math.random() * AMBIENT_DATA.length)]]
        return next.slice(-6)
      })
    }, 1800)
    return () => clearInterval(interval)
  }, [])

  // Mouse tracking for reactive field
  useEffect(() => {
    const handleMove = (e) => {
      setMousePos({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      })
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
    let time = 0

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // Initialize particles
    for (let i = 0; i < 120; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        size: Math.random() * 1.5 + 0.3,
        opacity: Math.random() * 0.25 + 0.03,
        phase: Math.random() * Math.PI * 2,
      })
    }

    const draw = () => {
      time += 0.005
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach(p => {
        p.x += p.vx + Math.sin(time + p.phase) * 0.1
        p.y += p.vy + Math.cos(time + p.phase) * 0.08

        // Wrap
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0

        const breathe = Math.sin(time * 2 + p.phase) * 0.5 + 0.5

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0, 229, 255, ${p.opacity * (0.5 + breathe * 0.5)})`
        ctx.fill()
      })

      // Draw connections between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 100) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(0, 229, 255, ${0.025 * (1 - dist / 100)})`
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

      {/* Reactive gradient field — follows mouse */}
      <div
        className="core-reactive-field"
        style={{
          '--mx': mousePos.x,
          '--my': mousePos.y,
        }}
      />

      {/* Grid background */}
      <div className="core-grid" />

      {/* Diagonal hazard lines — top */}
      <div className="core-hazard core-hazard--top" />
      <div className="core-hazard core-hazard--bottom" />

      {/* Central identity block */}
      <div className="core-center">
        {/* Glyph ring — mechanical, refractive */}
        <div className="core-glyph-ring">
          <svg viewBox="0 0 200 200" className="core-glyph-svg">
            <circle cx="100" cy="100" r="95" className="core-ring core-ring--outer" />
            <circle cx="100" cy="100" r="75" className="core-ring core-ring--mid" />
            <circle cx="100" cy="100" r="55" className="core-ring core-ring--inner" />
            <circle cx="100" cy="100" r="5" className="core-ring-dot" />
            {/* Tick marks */}
            {Array.from({ length: 72 }).map((_, i) => {
              const angle = (i * 5) * (Math.PI / 180)
              const isMajor = i % 6 === 0
              const isMinor = i % 3 === 0
              const r1 = 90
              const r2 = isMajor ? 98 : isMinor ? 95 : 93
              return (
                <line
                  key={i}
                  x1={100 + Math.cos(angle) * r1}
                  y1={100 + Math.sin(angle) * r1}
                  x2={100 + Math.cos(angle) * r2}
                  y2={100 + Math.sin(angle) * r2}
                  className="core-tick"
                  style={{ opacity: isMajor ? 0.5 : isMinor ? 0.25 : 0.1 }}
                />
              )
            })}
            {/* Cardinal crosshairs */}
            <line x1="100" y1="2" x2="100" y2="15" className="core-crosshair" />
            <line x1="100" y1="185" x2="100" y2="198" className="core-crosshair" />
            <line x1="2" y1="100" x2="15" y2="100" className="core-crosshair" />
            <line x1="185" y1="100" x2="198" y2="100" className="core-crosshair" />
          </svg>
        </div>

        {/* MASSIVE title */}
        <h1 className="core-title">
          <span className="core-title-main">OWAH</span>
          <span className="core-title-dot">.</span>
          <span className="core-title-main">WORLD</span>
        </h1>

        {/* Signal typewriter */}
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
          <span className="core-tagline-accent">documenting the evolution of a human being.</span>
        </p>
      </div>

      {/* System modules grid */}
      <div className="core-modules">
        <div className="core-modules-header">
          <span className="core-modules-label">SUBSYSTEMS</span>
          <span className="core-modules-line" />
          <span className="core-modules-count">{SYSTEM_MODULES.length} ACTIVE</span>
        </div>
        <div className="core-modules-grid">
          {SYSTEM_MODULES.map((mod, i) => (
            <button
              key={mod.id}
              className={`core-module-card core-module-card--${mod.temp}`}
              onClick={() => onNavigate(mod.id)}
              style={{ animationDelay: `${400 + i * 80}ms` }}
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
              {/* Scan line on hover */}
              <div className="core-module-scan" />
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

      {/* Side data column — ambient readout */}
      <aside className="core-sidebar-data">
        {dataStream.map((line, i) => (
          <span key={`${line}-${i}`} className="core-sidebar-line">
            {line}
          </span>
        ))}
      </aside>
    </section>
  )
}
