import { useState, useEffect, useRef, useCallback } from 'react'
import './BootSequence.css'

const BOOT_LINES = [
  { text: 'OWAH.WORLD v1.0.0', delay: 0, type: 'header' },
  { text: '─────────────────────────────', delay: 100, type: 'divider' },
  { text: '[SYS] initializing consciousness kernel...', delay: 200, type: 'system' },
  { text: '[SYS] loading identity matrix...', delay: 500, type: 'system' },
  { text: '[MEM] mounting memory archives ████████████ OK', delay: 900, type: 'success' },
  { text: '[NET] establishing signal pathways...', delay: 1200, type: 'system' },
  { text: '[VIS] rendering symbolic layer ████████ OK', delay: 1500, type: 'success' },
  { text: '[MOT] calibrating motion systems...', delay: 1800, type: 'system' },
  { text: '[PSY] loading pattern recognition ██████████ OK', delay: 2100, type: 'success' },
  { text: '[AUR] initializing expression engine...', delay: 2400, type: 'system' },
  { text: '[SIG] all subsystems nominal', delay: 2700, type: 'success' },
  { text: '─────────────────────────────', delay: 2900, type: 'divider' },
  { text: '> ENTERING OWAH.WORLD', delay: 3100, type: 'enter' },
]

export default function BootSequence({ onComplete }) {
  const [visibleLines, setVisibleLines] = useState([])
  const [phase, setPhase] = useState('booting')
  const containerRef = useRef(null)
  const onCompleteRef = useRef(onComplete)
  onCompleteRef.current = onComplete

  useEffect(() => {
    const timers = []

    BOOT_LINES.forEach((line) => {
      const t = setTimeout(() => {
        setVisibleLines(prev => [...prev, line])
      }, line.delay)
      timers.push(t)
    })

    timers.push(setTimeout(() => setPhase('ready'), 3500))
    timers.push(setTimeout(() => {
      setPhase('exiting')
      timers.push(setTimeout(() => onCompleteRef.current(), 800))
    }, 4200))

    return () => timers.forEach(clearTimeout)
  }, [])

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  }, [visibleLines])

  return (
    <div className={`boot-sequence ${phase}`}>
      <div className="boot-grid-bg" />
      <div className="boot-terminal" ref={containerRef}>
        {visibleLines.map((line, i) => (
          <div
            key={`${line.type}-${i}`}
            className={`boot-line boot-line--${line.type}`}
            style={{ animationDelay: `${i * 40}ms` }}
          >
            {line.text}
          </div>
        ))}
        {phase === 'booting' && (
          <span className="boot-cursor">▊</span>
        )}
      </div>
      <div className="boot-glyph">
        <svg viewBox="0 0 100 100" className="boot-glyph-svg">
          <circle cx="50" cy="50" r="45" className="boot-ring boot-ring--outer" />
          <circle cx="50" cy="50" r="30" className="boot-ring boot-ring--inner" />
          <circle cx="50" cy="50" r="4" className="boot-core" />
          <line x1="50" y1="5" x2="50" y2="20" className="boot-tick" />
          <line x1="50" y1="80" x2="50" y2="95" className="boot-tick" />
          <line x1="5" y1="50" x2="20" y2="50" className="boot-tick" />
          <line x1="80" y1="50" x2="95" y2="50" className="boot-tick" />
        </svg>
      </div>
    </div>
  )
}
