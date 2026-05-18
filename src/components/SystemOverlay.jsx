import { useState, useEffect } from 'react'
import './SystemOverlay.css'

export default function SystemOverlay({ systemTime, currentScreen, screenTemp }) {
  const [frameCount, setFrameCount] = useState(0)

  useEffect(() => {
    let animId
    let count = 0
    const tick = () => {
      count++
      if (count % 2 === 0) {
        setFrameCount(prev => prev + 1)
      }
      animId = requestAnimationFrame(tick)
    }
    animId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(animId)
  }, [])

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    })
  }

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
  }

  return (
    <div className="system-overlay" aria-hidden="true">
      {/* Top-left: System ID */}
      <div className="so-corner so-top-left">
        <span className="so-label">OWAH.WORLD</span>
        <span className="so-dim">SYS.{currentScreen.toUpperCase()}</span>
        <span className="so-temp-dot" data-temp={screenTemp} />
      </div>

      {/* Top-right: Time */}
      <div className="so-corner so-top-right">
        <span className="so-time">{formatTime(systemTime)}</span>
        <span className="so-dim">{formatDate(systemTime)}</span>
      </div>

      {/* Bottom-left: Frame + coordinate */}
      <div className="so-corner so-bottom-left">
        <span className="so-dim">FRM {String(frameCount % 9999).padStart(4, '0')}</span>
        <span className="so-dim so-coord">00.00°N 00.00°W</span>
      </div>

      {/* Bottom-right: Signal status */}
      <div className="so-corner so-bottom-right">
        <span className="so-alive-dot" />
        <span className="so-dim">SIGNAL ACTIVE</span>
      </div>

      {/* Corner brackets — cybernetic frame */}
      <div className="so-bracket so-bracket--tl" />
      <div className="so-bracket so-bracket--tr" />
      <div className="so-bracket so-bracket--bl" />
      <div className="so-bracket so-bracket--br" />

      {/* Center crosshair — subtle */}
      <div className="so-crosshair">
        <div className="so-crosshair-h" />
        <div className="so-crosshair-v" />
        <div className="so-crosshair-dot" />
      </div>
    </div>
  )
}
